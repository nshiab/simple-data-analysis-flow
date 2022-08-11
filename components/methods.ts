export default
    {
        loadDataFromUrl: {
            arguments: [
                {
                    name: "url",
                    type: "text",
                    optional: false
                },
                {
                    name: "autoType",
                    type: "checkbox",
                    defaultValue: false
                }
            ]
        },
        removeDuplicates: {
            arguments: [],
        },
        summarize: {
            arguments: [
                {
                    name: "keyValue",
                    type: "keys",
                    defaultValue: undefined
                },
                {
                    name: "keyCategory",
                    type: "keys",
                    defaultValue: undefined
                },
                {
                    name: "summary",
                    type: "select",
                    defaultValue: undefined,
                    options: [undefined, "count", "min", "max", "sum", "mean", "median", "deviation"]
                }
            ]
        },
        excludeMissingValues: {
            arguments: []
        },
        getChart: {
            justClone: true,
            htmlOutput: true,
            arguments: [
                {
                    name: "x",
                    type: "keys",
                    defaultValue: undefined,
                    optional: false
                },
                {
                    name: "y",
                    type: "keys",
                    defaultValue: undefined,
                    optional: false
                },
                {
                    name: "type",
                    type: "select",
                    defaultValue: undefined,
                    options: [undefined, "dot", "line", "bar", "barVertical", "barHorizontal", "box", "boxVertical", "boxHorizontal"],
                    optional: false
                }

            ]
        },
        describe: {
            arguments: []
        },
        showTable: {
            justClone: true,
            arguments: [
                {
                    name: "nbItemsInTable",
                    type: "text",
                    defaultValue: 5
                }
            ]
        }
    }
