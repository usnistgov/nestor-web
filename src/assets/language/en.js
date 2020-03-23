export default {
  home: {
    header: "The application designed to help manufacturers",
    button: {
      newProject: "New project",
      openProject: "Manage Projects"
    },
    navbar: {
      home: "Home",
      taggingTool: "Tagging Tool",
      dashboard: "Dashboard",
      save: "Save"
    },
    sidebar: {
      settings: "Settings",
      data: "Data",
      headers: "Headers",
      classification: "Classification",
      tokensNumber: "Number of Tokens",
      similarity: "Similarity",
      pattern: "Pattern",
      overview: "Overview",
      tag: "Tag",
      singleWord: "Single Word",
      multiWord: "Multi Word",
      report: "Report",
      export: "Export"
    }
  },
  taggingTool: {
    alerts: {
      upload: {
        header: "File",
        message: "Please select a csv file"
      },
      classification: {
        header: "",
        message: ""
      },
      headers: {
        header: "No selected headers",
        message: "Please select at least one header"
      },
      tokens: {
        header: "",
        message: ""
      },
      similarity: {
        header: "",
        message: ""
      },
      pattern: {
        header: "",
        message: ""
      },
      tag: {
        header: "Tagging limit",
        message:
          "You have reached the tagging limit you set earlier, feel free to continue"
      },
      tagging: {
        header: "No tokens to annotate",
        message: "Please complete the settings steps to be able to start"
      },
      export: {
        header: "No tokens",
        message: "Please tag words to be able to export files"
      }
    },
    settings: {
      upload: {
        startBox: {
          title: "Start tagging a new file",
          selectLabel: "Click to select a file",
          buttonLabel: "Start"
        },
        continueBox: {
          title: "Continue tagging an existing file",
          selectLabel: "Click to select a file",
          buttonLabel: "Continue"
        }
      },
      classification: {
        name: "Classification",
        title: "Classification",
        titleInfo: "You will use these types and rules to tag your MVOs"
      },
      headers: {
        name: "Headers",
        title: "What columns of your document do you want to tag ?",
        titleInfo: "This list represents the columns title in your csv",
        subtitle: "Empty columns",
        emptyTooltip: "You can not select an empty column"
      },
      tokens: {
        name: "Tokens",
        title: "How many tokens do you want to tag ?",
        titleInfo:
          "This number will help provide an estimation of the time needed to tag your document. Please note that the token extraction limit is set to 5000 tokens, even if your document contains more than 5000 tokens.",
        subtitle: {
          message1: "Please note that if you tag ",
          message2: " tokens you will tag ",
          message3: " % of the file"
        }
      },
      similarity: {
        name: "Similarity",
        title: "How similar to the token are the suggestions ? ",
        titleInfo:
          "This setting is temporarily disabled because not implemented yet."
      },
      pattern: {
        name: "Pattern",
        title:
          "How similar to the token you are tagging are the selected suggestions ?",
        titleInfo: "Threshold similarity for already selected suggestions"
      }
    },
    tagging: {
      singleToken: {
        tokenTooltip: "I am the original token, please enter a preferred alias",
        addButton: "Add",
        synonymSectionTitle: "Synonyms",
        note: {
          displayLabel: "Show note",
          hideLabel: "Hide note"
        },
        modal: {
          title: "Single Tokens",
          buttonLabel: "Close",
          placeholder: "Search",
          placeholderAria: "Search"
        }
      }
    },
    report: {
      firstRow: {
        title: "Words",
        tagged: "Tagged",
        notTagged: "Not tagged",
        tags: "Tags",
        autoTagged: "Automatically tagged"
      },
      secondRow: {
        title: "Docs",
        complete: "Complete",
        partlyTagged: "Partly Tagged",
        empty: "Empty"
      },
      thirdRow: {
        title: "Distribution over MVOs"
      }
    },
    export: {
      firstRow: "Export your progress"
    }
  },
  dashboard: {},
  save: {
    header: "Save your tagging work done"
  }
};
