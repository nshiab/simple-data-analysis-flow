export default
    {
        newSimpleData: {
            category: "Importing"
        },
        loadDataFromUrl: {
            category: "Importing",
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
                },
                {
                    name: "firstItem",
                    type: "number",
                    defaultValue: undefined
                },
                {
                    name: "lastItem",
                    type: "number",
                    defaultValue: undefined
                }
            ]
        },
        formatAllKeys: {
            category: "Cleaning",
            arguments: []
        },
        renameKey: {
            category: "Cleaning",
            arguments: [
                { name: "oldKey", type: "keys", optional: false },
                { name: "newKey", type: "text", optional: false }
            ]
        },
        checkValues: {
            category: "Cleaning",
            arguments: [
                { name: "nbItemsToCheck", type: "number" },
                { name: "randomize", type: "checkbox" }
            ]
        },
        selectKeys: {
            category: "Selecting",
            arguments: [
                {
                    name: "keys",
                    type: "multipleKeys",
                    optional: false
                }
            ]
        },
        summarize: {
            category: "Analyzing",
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
            category: "Cleaning",
            arguments: [
                { name: "key", type: "keys" }
            ]
        },
        keepMissingValues: {
            category: "Cleaning",
            arguments: [
                { name: "key", type: "keys" }
            ]
        },
        removeDuplicates: {
            category: "Cleaning",
            arguments: [
                { name: "key", type: "keys" },
                { name: "nbToKeep", type: "number", defaultValue: 1 }
            ]
        },
        keepDuplicates: {
            category: "Cleaning",
            arguments: [
                { name: "key", type: "keys" }
            ]
        },
        valuesToString: {
            category: "Cleaning",
            arguments: [
                { name: "key", type: "keys", optional: false },
            ]
        },
        valuesToInteger: {
            category: "Cleaning",
            arguments: [
                { name: "key", type: "keys", optional: false },
                { name: "thousandSeparator", type: "text", defaultValue: ",", width: 10 },
                { name: "decimalSeparator", type: "text", defaultValue: ".", width: 10 },
                { name: "skipErrors", type: "checkbox" }
            ]
        },
        valuesToFloat: {
            category: "Cleaning",
            arguments: [
                { name: "key", type: "keys", optional: false },
                { name: "thousandSeparator", type: "text", defaultValue: ",", width: 10 },
                { name: "decimalSeparator", type: "text", defaultValue: ".", width: 10 },
                { name: "skipErrors", type: "checkbox" }
            ]
        },
        valuesToDate: {
            category: "Cleaning",
            arguments: [
                { name: "key", type: "keys", optional: false },
                { name: "format", type: "text", optional: false },
                { name: "skipErrors", type: "checkbox" }
            ]
        },
        datesToString: {
            category: "Cleaning",
            arguments: [
                { name: "key", type: "keys", optional: false },
                { name: "format", type: "text", optional: false },
                { name: "skipErrors", type: "checkbox" }
            ]
        },
        replaceValues: {
            category: "Cleaning",
            arguments: [
                { name: "key", type: "keys", optional: false },
                { name: "oldValue", type: "text", optional: false, jsOption: true },
                { name: "newValue", type: "text", optional: false, jsOption: true },
                { name: "method", type: "select", defaultValue: undefined, options: [undefined, "entireString", "partialString"] },
            ]
        },
        roundValues: {
            category: "Cleaning",
            arguments: [
                { name: "key", type: "keys", optional: false },
                { name: "nbDigits", type: "number", defaultValue: 1 }
            ]
        },
        modifyValues: {
            category: "Cleaning",
            arguments: [
                { name: "key", type: "keys", optional: false },
                {
                    name: "valueGenerator", type: "javascript", optional: false, defaultValue: `(value) => {
    
    const modifiedValue = value
    
    return modifiedValue
}` }
            ]
        },
        modifyItems: {
            category: "Cleaning",
            arguments: [
                { name: "key", type: "keys", optional: false },
                {
                    name: "itemGenerator", type: "javascript", optional: false, defaultValue: `(item) => {
    
    const modifiedValue = "Change me!"
    
    return modifiedValue
}` }
            ]
        },
        getChart: {
            category: "Visualizing",
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
                },
                {
                    name: "color",
                    type: "keys",
                    defaultValue: undefined
                },
                {
                    name: "marginLeft",
                    type: "number",
                    defaultValue: undefined
                }

            ]
        },
        describe: {
            category: "Analyzing",
            arguments: []
        },
        showTable: {
            category: "Visualizing",
            justClone: true,
            arguments: [
                {
                    name: "nbItemsInTable",
                    type: "number",
                    defaultValue: 5
                }
            ]
        }
    }
