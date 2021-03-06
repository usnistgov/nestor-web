# Python API description

## Classification

**Code** :
```python
def classification(self): 
        return kex.nestorParams
```
**Description** : Returns the classification list defined in the nestor python package.

## upload

**Code** :
```python
def upload(self, f):
        try:
            s = base64.b64decode(f).decode('utf-8-sig')
            rows = s.split('\n')
            del rows[-1]
            data = [np.array([ '"{}"'.format(x) for x in 
list(csv.reader([row], delimiter=',', quotechar='"'))[0] ]) for row in rows]
            d = pd.DataFrame(data=data[1:],columns=data[0])
            d.columns = [c.replace('"', '') for c in d.columns.values]
            d.fillna(value='"', inplace=True)
            self.__class__.df = d.applymap(lambda x: x.replace('"', ''))
        except Exception as e:
            print(e)
            sys.stdout.flush()
            return e
```
**Description** : Description	 Creates the pandas data frame containing the csv file uploaded by the user.

## uploadJSON

**Code** :
```python
def uploadJSON(self, jsonstring, headers):
        try:
            rows = jsonstring.split('\n')
            del rows[-1]
            data = [np.array(['"{}"'.format(x) for x in list(csv.reader(
                [row], delimiter=',', quotechar='"'))[0]]) for row in rows]
            d = pd.DataFrame(data=data[1:], columns=data[0])
            d.columns = [c.replace('"', '') for c in d.columns.values]
            d.fillna(value='"', inplace=True)
            self.__class__.df = d.applymap(lambda x: x.replace('"', ''))

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
            empty_array[:] = ''
            data = np.column_stack(
                (tex.vocab_, empty_array, empty_array, empty_array, tex.scores_))
            self.__class__.vocab_single_df = pd.DataFrame(
                data=data, columns=self.__class__.vocab_columns)

            # 2. Compute multi tokens
            if (self.__class__.raw_text.empty):
                nlp_select = kex.NLPSelect(columns=headers)
                self.__class__.raw_text = nlp_select.transform(
                    self.__class__.df)
            tex2 = kex.TokenExtractor(ngram_range=(2, 2))
            vocab = kex.generate_vocabulary_df(tex)
            replaced_text = kex.token_to_alias(self.__class__.raw_text, vocab)
            toks2 = tex2.fit_transform(replaced_text)
            tokens = [token for token in (tex2.vocab_).tolist()]
            # 3. Create the vocab dataframe
            empty_array = np.chararray((len(tex2.vocab_)))
            empty_array[:] = ''
            data = np.column_stack(
                (tex2.vocab_, empty_array, empty_array, empty_array, tex2.scores_))
            self.__class__.vocab_multi_df = pd.DataFrame(
                data=data, columns=self.__class__.vocab_columns)
            return tokens
        except Exception as e:
            print(e)
            sys.stdout.flush()
            return e
```
**Description** : This function is called when the user opens a project from the database.
It is creating the pandas data frame containing the same data than in the csv file uploaded when creating the project.
Then it returns the singleTokens and multiTokens lists scored by ‘tf-idf’.


## headers

**Code** :
```python
def headers(self):
        try:
            data = {}
            tooltips = []
            length = self.__class__.df.shape[0]
            tooltips_length = 5 if (length>5) else (length)
            for index in range(len(list(self.__class__.df.columns))):
                tooltips.append([])
                tooltips[index] = (list(self.__class__.df[list(
self.__class__.df.columns)[index]].iloc[np.arange(tooltips_length)]))
            data['tooltip'] = tooltips
            self.__class__.df.replace('', np.nan, inplace=True)
            filtered_data = self.__class__.df.dropna(axis='columns', how='all')
            data['headers'] = list(filtered_data.columns)
            empty_columns = list(set(self.__class__.df.columns).
symmetric_difference(set(filtered_data.columns)))
            data['empty_columns'] = empty_columns
            return json.dumps(data)
        except Exception as e:
            print(e)
            sys.stdout.flush()
            return e


```
**Description** : Returns a json containing an array of the non-empty columns 
names in the csv, the first 5 values for these columns, and an array of columns
names that are empty

## create-output

**Code** :
```python
def create_output(self, headers):
        try:
            d = pd.DataFrame(np.empty((self.__class__.df.shape[0], 
len(self.__class__.classification_columns)), dtype = np.str), 
columns=self.__class__.classification_columns)
            self.__class__.output_df = pd.concat([self.__class__.df[headers], d],
 axis=1, sort=False)
        except Exception as e:
            print(e)
            sys.stdout.flush()
            return e
```
**Description** : Creates the readable-tags csv file data frame 

## single-tokens

**Code** :
```python
def single_tokens(self, headers):
        try:
            #1. Create the output dataframe
            self.create_output(headers)
            #2. Compute single tokens
            nlp_select = kex.NLPSelect(columns = headers)
            self.__class__.raw_text = nlp_select.transform(self.__class__.df)
            tex = kex.TokenExtractor()
            toks = tex.fit_transform(self.__class__.raw_text)
            tokens = [token for token in (tex.vocab_).tolist()]
            #3. Create the vocab dataframe
            empty_array = np.chararray((len(tex.vocab_)))
            empty_array[:] = ''
            data = np.column_stack((tex.vocab_,empty_array, empty_array, 
empty_array,tex.scores_))
            self.__class__.vocab_single_df = pd.DataFrame(data=data,
 columns=self.__class__.vocab_columns)
            return tokens
        except Exception as e:
            print(e)
            sys.stdout.flush()
            return e

```
**Description** : Description	Returns the single tokens list ordered by tf-idf scores 

## multi-tokens

**Code** :
```python
def multi_tokens(self, headers):
        try:
            #1. Create the output dataframe if it doesnt exist yet
            if self.__class__.df.shape[0] == 0:
                self.create_output(headers)
            #2. Compute multi tokens
            if (self.__class__.raw_text.empty):
                nlp_select = kex.NLPSelect(columns = headers)
                self.__class__.raw_text = nlp_select.transform(self.__class__.df)
            tex = kex.TokenExtractor()
            toks = tex.fit_transform(self.__class__.raw_text)
            tex2 = kex.TokenExtractor(ngram_range=(2, 2))
            vocab = kex.generate_vocabulary_df(tex)
            replaced_text = kex.token_to_alias(self.__class__.raw_text, vocab)
            toks2 = tex2.fit_transform(replaced_text)
            tokens = [token for token in (tex2.vocab_).tolist()]
            #3. Create the vocab dataframe
            empty_array = np.chararray((len(tex2.vocab_)))
            empty_array[:] = ''
            data = np.column_stack((tex2.vocab_,empty_array, empty_array, empty_array,tex2.scores_))
            self.__class__.vocab_multi_df = pd.DataFrame(data=data, columns=self.__class__.vocab_columns)
            return tokens
        except Exception as e:
            print(e)
            sys.stdout.flush()
            return e
```
**Description** : Returns the multi tokens list ordered by tf-idf scores

## update-output-file

**Code** :
```python
def update_output_file(self, token):
        try:
            d = pd.DataFrame([])
            d['Column'] = self.__class__.output_df[self.__class__.output_df
.columns[0:]].apply(lambda x: ','.join(x),axis=1)
            words = [syn['value'] for syn in token['selectedSynonyms']]
            words.append(token["label"])
            indexes = []
            for word in words:
                df = self.__class__.output_df[d['Column'].str.contains
(word, case=False)]
                indexes += list(df.index.values)
            self.__class__.output_df.loc[:, self.__class__.classification_columns]
 = self.__class__.output_df.loc[:, self.__class__.
classification_columns].applymap(lambda x: x.replace(token['alias'], ''))
            for index in indexes:
                    if token['classification'] ['label']:
                        if self.__class__.output_df.iloc[index][token
['classification'] ['label']] and self.__class__.output_df
.iloc[index][token['classification'] ['label']] != token['alias']:
                            self.__class__.output_df.set_value(index, token['classification']['label'],self.__class__.output_df.iloc
[index][token['classification'] ['label']] + "," + token['alias'])
                        else:
                            self.__class__.output_df.set_value(index,
 token['classification']['label'],token['alias'])                    
                    else:
                        self.__class__.output_df.set_value(index, 'NA','_untagged')
        except Exception as e:
            print(e)
            sys.stdout.flush()
            return e
```
**Description** : Updates the readable-tags csv file data frame 

## update-vocab

**Code** :
```python
def update_vocab(self, df, token):
        try:
            #1. Update the vocab with the token
            df.iloc[token['index']]['NE'] = token['classification'] ['label']
            df.iloc[token['index']]['alias'] = token['alias']
            df.iloc[token['index']]['notes'] = token['note']['value']
            #2. Update the vocab with its synonyms
            for synonym in token['selectedSynonyms']:
                indexes = df[df['tokens']==synonym['value']].index.tolist()
                df.iloc[indexes[0]]['NE'] = token['classification'] ['label']
                df.iloc[indexes[0]]['alias'] = token['alias']
                df.iloc[indexes[0]]['notes'] = token['note']['value']
            return df
        except Exception as e:
            print(e)
            sys.stdout.flush()
            return e
```
**Description** : Updates the vocabs data frame

## Update data

**Code** :
```python
def update_data(self, token):
        try:
            #1. Update readable file
            self.update_output_file(token)
            #2. Update vocab
            if (' ' in token['label']):
                self.__class__.vocab_multi_df = self.update_vocab
(self.__class__.vocab_multi_df, token) 
            else:
                self.__class__.vocab_single_df = self.update_vocab
(self.__class__.vocab_single_df, token)
        except Exception as e:
            print(e)
            sys.stdout.flush()
            return e
```

**Description** : Updates the readable tags and the vocabs data frames
(this function is called every time the users tags a new token) 

## completeness

**Code** :
```python
def completeness(self):
        try:
            tex = kex.TokenExtractor()
            tag_df = kex.tag_extractor(tex, self.__class__.raw_text, vocab_df=self.__class__.vocab_single_df.replace(r'^\s*$', np.nan, regex=True).set_index('tokens').astype({'score': 'float64'}))
            tag_pct, tag_comp, tag_empt = kex.get_tag_completeness(tag_df)
            tag_pct_array = [tag for tag in tag_pct.items()]
            return tag_comp.item(), tag_empt.item(), tag_pct_array, self.__class__.vocab_single_df.groupby("NE").nunique().alias.sum().item(), self.__class__.vocab_single_df[self.__class__.vocab_single_df.NE!=''].NE.notna().sum().item()
        except Exception as e:
            print(e)
            sys.stdout.flush()
            return e
```
**Description** : Description	Returns the data for the Report page,
the proportion of complete work orders, the proportion of totally empty work 
orders, the total amount of work orders, the ppv, the proportion of tagged tokens. 

## export

**Code** :
```python
def export(self):
        return list(self.__class__.output_df.columns), self.__class__.output_df.to_json(orient='values', index=True),list(self.__class__.vocab_single_df.columns), self.__class__.vocab_single_df.to_json(orient='values'),list(self.__class__.vocab_multi_df.columns), self.__class__.vocab_multi_df.to_json(orient='values')

```
**Description** : Description	Returns three data frames, the readable tags,
the single tokens vocab, the multi tokens vocab that will be written into csv 
files to save the users progress.

## ClearAllAttributes

**Code** :
```python
    def clearAllAttributes(self):
        try:
            self.__class__.df = pd.DataFrame([])
            self.__class__.vocab_single_df = pd.DataFrame([])
            self.__class__.vocab_multi_df = pd.DataFrame([])
            self.__class__.output_df = pd.DataFrame([])
            self.__class__.raw_text = pd.Series(0, [])
        except Exception as e:
            print(e)
            sys.stdout.flush()
            return e
```
**Description** : This function clears the states of the script attributes 
