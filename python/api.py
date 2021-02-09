from __future__ import print_function

import base64
import csv
import json
import sys
from collections import Counter
from functools import wraps

import numpy as np
import pandas as pd
import zerorpc
from nestor import keyword as kex


def exception_handler(func):
    @wraps(func)
    def func_or_exception(*args, **kwargs):
        try:
            func(*args, **kwargs)
        except Exception as e:
            print(f"Function '{func.__name__}' threw an exception:\n")
            print(e)
            sys.stdout.flush()
            return e

    return func_or_exception


class Api(object):
    df = pd.DataFrame([])
    vocab_single_df = pd.DataFrame([])
    vocab_multi_df = pd.DataFrame([])
    output_df = pd.DataFrame([])
    raw_text = pd.Series(0, [])
    vocab_columns = ["tokens", "NE", "alias", "notes", "score"]
    classification_columns = ["I", "P", "PI", "S", "SI", "U", "X", "NA"]
    dashboardHeaders = {}

    def classification(self):
        return kex.nestorParams

    @exception_handler
    def upload(self, f):

        s = base64.b64decode(f).decode("utf-8-sig")
        rows = s.split("\n")
        del rows[-1]
        data = [
            np.array(
                [
                    '"{}"'.format(x)
                    for x in list(csv.reader([row], delimiter=",", quotechar='"'))[0]
                ]
            )
            for row in rows
        ]
        d = pd.DataFrame(data=data[1:], columns=data[0])
        d.columns = [c.replace('"', "") for c in d.columns.values]
        d.fillna(value='"', inplace=True)
        self.__class__.df = d.applymap(lambda x: x.replace('"', ""))

    @exception_handler
    def uploadJSON(self, jsonstring, headers):

        rows = jsonstring.split("\n")
        del rows[-1]
        data = [
            np.array(
                [
                    '"{}"'.format(x)
                    for x in list(csv.reader([row], delimiter=",", quotechar='"'))[0]
                ]
            )
            for row in rows
        ]
        d = pd.DataFrame(data=data[1:], columns=data[0])
        d.columns = [c.replace('"', "") for c in d.columns.values]
        d.fillna(value='"', inplace=True)
        self.__class__.df = d.applymap(lambda x: x.replace('"', ""))

        # 1. Create the output dataframe
        self.create_output(headers)
        # 2. Compute single tokens
        nlp_select = kex.NLPSelect(columns=headers)
        self.__class__.raw_text = nlp_select.transform(self.__class__.df)
        tex = kex.TokenExtractor()
        toks = tex.fit_transform(self.__class__.raw_text)
        tokens = [token for token in (tex.vocab_).tolist()]
        # 3. Create the vocab dataframe
        empty_array = np.chararray((len(tex.vocab_)))
        empty_array[:] = ""
        data = np.column_stack(
            (tex.vocab_, empty_array, empty_array, empty_array, tex.scores_)
        )
        self.__class__.vocab_single_df = pd.DataFrame(
            data=data, columns=self.__class__.vocab_columns
        )

        # 2. Compute multi tokens
        if self.__class__.raw_text.empty:
            nlp_select = kex.NLPSelect(columns=headers)
            self.__class__.raw_text = nlp_select.transform(self.__class__.df)
        tex2 = kex.TokenExtractor(ngram_range=(2, 2))
        vocab = kex.generate_vocabulary_df(tex)
        replaced_text = kex.token_to_alias(self.__class__.raw_text, vocab)
        toks2 = tex2.fit_transform(replaced_text)
        tokens = [token for token in (tex2.vocab_).tolist()]
        # 3. Create the vocab dataframe
        empty_array = np.chararray((len(tex2.vocab_)))
        empty_array[:] = ""
        data = np.column_stack(
            (tex2.vocab_, empty_array, empty_array, empty_array, tex2.scores_)
        )
        self.__class__.vocab_multi_df = pd.DataFrame(
            data=data, columns=self.__class__.vocab_columns
        )
        return tokens

    @exception_handler
    def headers(self):

        data = {}
        tooltips = []
        length = self.__class__.df.shape[0]
        tooltips_length = 5 if (length > 5) else (length)
        for index in range(len(list(self.__class__.df.columns))):
            tooltips.append([])
            tooltips[index] = [
                x
                for x in list(
                    self.__class__.df[list(self.__class__.df.columns)[index]].iloc[
                        np.arange(tooltips_length)
                    ]
                )
                if str(x) != "nan"
            ]
        data["tooltip"] = tooltips
        self.__class__.df.replace("", np.nan, inplace=True)
        filtered_data = self.__class__.df.dropna(axis="columns", how="all")
        data["headers"] = list(filtered_data.columns)
        empty_columns = list(
            set(self.__class__.df.columns).symmetric_difference(
                set(filtered_data.columns)
            )
        )
        data["empty_columns"] = empty_columns
        return json.dumps(data)

    @exception_handler
    def create_output(self, headers):

        d = pd.DataFrame(
            np.empty(
                (
                    self.__class__.df.shape[0],
                    len(self.__class__.classification_columns),
                ),
                dtype=np.str,
            ),
            columns=self.__class__.classification_columns,
        )
        data = json.loads(self.headers())
        self.__class__.output_df = pd.concat(
            [self.__class__.df[data["headers"]], d], axis=1, sort=False
        )
        self.__class__.output_df = self.__class__.output_df.fillna(" ")

    @exception_handler
    def single_tokens(self, headers):

        # 1. Create the output dataframe
        self.create_output(headers)
        # 2. Compute single tokens
        nlp_select = kex.NLPSelect(columns=headers)
        self.__class__.raw_text = nlp_select.transform(self.__class__.df)
        tex = kex.TokenExtractor()
        toks = tex.fit_transform(self.__class__.raw_text)
        tokens = [token for token in (tex.vocab_).tolist()]
        # 3. Create the vocab dataframe
        empty_array = np.chararray((len(tex.vocab_)))
        empty_array[:] = ""
        data = np.column_stack(
            (tex.vocab_, empty_array, empty_array, empty_array, tex.scores_)
        )
        self.__class__.vocab_single_df = pd.DataFrame(
            data=data, columns=self.__class__.vocab_columns
        )
        return tokens

    @exception_handler
    def multi_tokens(self, headers):

        # 1. Create the output dataframe if it doesnt exist yet
        if self.__class__.df.shape[0] == 0:
            self.create_output(headers)
        # 2. Compute multi tokens
        if self.__class__.raw_text.empty:
            nlp_select = kex.NLPSelect(columns=headers)
            self.__class__.raw_text = nlp_select.transform(self.__class__.df)
        tex = kex.TokenExtractor()
        toks = tex.fit_transform(self.__class__.raw_text)
        tex2 = kex.TokenExtractor(ngram_range=(2, 2))
        vocab = kex.generate_vocabulary_df(tex)
        replaced_text = kex.token_to_alias(self.__class__.raw_text, vocab)
        toks2 = tex2.fit_transform(replaced_text)
        tokens = [token for token in (tex2.vocab_).tolist()]
        # 3. Create the vocab dataframe
        empty_array = np.chararray((len(tex2.vocab_)))
        empty_array[:] = ""
        data = np.column_stack(
            (tex2.vocab_, empty_array, empty_array, empty_array, tex2.scores_)
        )
        self.__class__.vocab_multi_df = pd.DataFrame(
            data=data, columns=self.__class__.vocab_columns
        )
        return tokens

    @exception_handler
    def update_output_file(self, token):

        d = pd.DataFrame([])
        d["Column"] = self.__class__.output_df[
            self.__class__.output_df.columns[0:]
        ].apply(lambda x: ",".join(x), axis=1)
        words = [syn["value"] for syn in token["selectedSynonyms"]]
        words.append(token["label"])
        indexes = []
        for word in words:
            df = self.__class__.output_df[d["Column"].str.contains(word, case=False)]
            indexes += list(df.index.values)
        self.__class__.output_df.loc[
            :, self.__class__.classification_columns
        ] = self.__class__.output_df.loc[
            :, self.__class__.classification_columns
        ].applymap(
            lambda x: x.replace(token["alias"], "")
        )
        for index in indexes:
            if token["classification"]["label"]:
                if (
                    self.__class__.output_df.iloc[index][
                        token["classification"]["label"]
                    ]
                    and self.__class__.output_df.iloc[index][
                        token["classification"]["label"]
                    ]
                    != token["alias"]
                ):
                    self.__class__.output_df.loc[
                        index, token["classification"]["label"]
                    ] = (
                        self.__class__.output_df.iloc[index][
                            token["classification"]["label"]
                        ]
                        + ","
                        + token["alias"]
                    )
                else:
                    self.__class__.output_df.loc[
                        index, token["classification"]["label"]
                    ] = token["alias"]
            else:
                self.__class__.output_df.loc[index, "NA"] = "_untagged"

    @exception_handler
    def update_vocab(self, df, token):

        # 1. Update the vocab with the token
        df.iloc[token["index"]]["NE"] = token["classification"]["label"]
        df.iloc[token["index"]]["alias"] = token["alias"]
        df.iloc[token["index"]]["notes"] = token["note"]["value"]
        # 2. Update the vocab with its synonyms
        for synonym in token["selectedSynonyms"]:
            indexes = df[df["tokens"] == synonym["value"]].index.tolist()
            df.iloc[indexes[0]]["NE"] = token["classification"]["label"]
            df.iloc[indexes[0]]["alias"] = token["alias"]
            df.iloc[indexes[0]]["notes"] = token["note"]["value"]
        return df

    @exception_handler
    def update_data(self, token):

        # 1. Update readable file
        self.update_output_file(token)
        # 2. Update vocab
        if " " in token["label"]:
            self.__class__.vocab_multi_df = self.update_vocab(
                self.__class__.vocab_multi_df, token
            )
        else:
            self.__class__.vocab_single_df = self.update_vocab(
                self.__class__.vocab_single_df, token
            )

    @exception_handler
    def completeness(self):

        tex = kex.TokenExtractor()
        tag_df = kex.tag_extractor(
            tex,
            self.__class__.raw_text,
            vocab_df=self.__class__.vocab_single_df.replace(
                r"^\s*$", np.nan, regex=True
            )
            .set_index("tokens")
            .astype({"score": "float64"}),
        )
        tag_pct, tag_comp, tag_empt = kex.get_tag_completeness(tag_df)
        tag_pct_array = [tag for tag in tag_pct.items()]
        return (
            tag_comp.item(),
            tag_empt.item(),
            tag_pct_array,
            self.__class__.vocab_single_df.groupby("NE").nunique().alias.sum().item(),
            self.__class__.vocab_single_df[self.__class__.vocab_single_df.NE != ""]
            .NE.notna()
            .sum()
            .item(),
        )

    def export(self):
        return (
            list(self.__class__.output_df.columns),
            self.__class__.output_df.to_json(orient="values", index=True),
            list(self.__class__.vocab_single_df.columns),
            self.__class__.vocab_single_df.to_json(orient="values"),
            list(self.__class__.vocab_multi_df.columns),
            self.__class__.vocab_multi_df.to_json(orient="values"),
        )

    @exception_handler
    def updateDashboardHeaders(self, dashboardHeader):

        self.__class__.dashboardHeaders = dashboardHeader
        return json.dumps(self.__class__.dashboardHeaders)

    @exception_handler
    def getAssetsStats(self):

        d = []
        for key in self.__class__.dashboardHeaders["machineName"]:
            for index, row in self.__class__.output_df.iterrows():
                if row["P"] > "":
                    d.append(row[key])
        tmp = Counter(d).most_common(5)
        return tmp

    @exception_handler
    def getAssetSelected(self, headers, assetName):

        data = {}
        problems = []
        items = []
        solutions = []
        for index, row in self.__class__.output_df.iterrows():
            for key in self.__class__.dashboardHeaders["machineName"]:
                if row[key] == assetName:
                    if row["I"] > "":
                        newTokens = row["I"].split(",")
                        for word in newTokens:
                            items.append(word)
                    elif row["S"] > "":
                        newTokens = row["S"].split(",")
                        for word in newTokens:
                            solutions.append(word)
                    elif row["P"] > "":
                        newTokens = row["P"].split(",")
                        for word in newTokens:
                            problems.append(word)
        data["problems"] = [list(i) for i in Counter(problems).most_common(5)]
        data["solutions"] = [list(i) for i in Counter(solutions).most_common(5)]
        data["items"] = [list(i) for i in Counter(items).most_common(5)]
        return json.dumps(data)

    @exception_handler
    def clearAllAttributes(self):

        self.__class__.df = pd.DataFrame([])
        self.__class__.vocab_single_df = pd.DataFrame([])
        self.__class__.vocab_multi_df = pd.DataFrame([])
        self.__class__.output_df = pd.DataFrame([])
        self.__class__.raw_text = pd.Series(0, [])
        self.__class__.dashboardHeaders = {}


def main():

    addr = "tcp://127.0.0.1:4242"
    s = zerorpc.Server(Api())
    s.bind(addr)
    print("server started running on {}".format(addr))
    sys.stdout.flush()
    s.run()


if __name__ == "__main__":
    main()
