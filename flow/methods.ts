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
            maxWidth: 1000,
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
            maxWidth: 1000,
            arguments: [
                { name: "key", type: "keys", optional: false },
                {
                    name: "itemGenerator", type: "javascript", optional: false, defaultValue: `(item) => {
    
    const modifiedValue = "Change me!"
    
    return modifiedValue
}` }
            ]
        },
        addKey: {
            category: "Restructuring",
            maxWidth: 1000,
            arguments: [
                { name: "key", type: "text", optional: false },
                {
                    name: "itemGenerator", type: "javascript", optional: false, defaultValue: `(item) => {
    const newValue = "Change me!"

    return newValue
}` }
            ]
        },
        removeKey: {
            category: "Restructuring",
            arguments: [
                { name: "key", type: "keys", optional: false },
            ]
        },
        addItems: {
            category: "Restructuring",
            doubleSource: true,
            arguments: [
                { name: "dataToBeAdded", type: "sourceB", optional: false },
                { name: "fillMissingKeys", type: "checkbox" }
            ]
        },
        mergeItems: {
            category: "Restructuring",
            doubleSource: true,
            arguments: [
                { name: "dataToBeMerged", type: "sourceB", optional: false },
                { name: "commonKey", type: "keys", optional: false }
            ]
        },
        keysToValues: {
            category: "Restructuring",
            arguments: [
                { name: "keys", type: "multipleKeys", optional: false },
                { name: "newKeyForKeys", type: "text", optional: false },
                { name: "newKeyForValues", type: "text", optional: false }
            ]
        },
        valuesToKeys: {
            category: "Restructuring",
            arguments: [
                { name: "newKeys", type: "keys", optional: false },
                { name: "newValues", type: "keys", optional: false }
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
        filterValues: {
            category: "Selecting",
            maxWidth: 1000,
            arguments: [
                { name: "key", type: "keys", optional: false },
                {
                    name: "valueComparator", type: "javascript", defaultValue: `(value) => value > 10`, optional: false
                }
            ]
        },
        filterItems: {
            category: "Selecting",
            maxWidth: 1000,
            arguments: [
                {
                    name: "itemComparator", type: "javascript", defaultValue: `(item) => item.someNumber > 10`, optional: false
                }
            ]
        },
        describe: {
            category: "Analyzing",
            arguments: []
        },
        sortValues: {
            category: "Analyzing",
            arguments: [
                { name: "key", type: "keys", optional: false },
                { name: "order", type: "select", defaultValue: "ascending", options: ["ascending", "descending"], optional: false }
            ]
        },
        addProportions: {
            category: "Analyzing",
            arguments: [
                { name: "method", type: 'select', options: [undefined, "data", "item"], defaultValue: undefined, optional: false },
                { name: "key", type: "keys", condition: { name: "method", value: "data" } },
                { name: "newKey", type: "text", condition: { name: "method", value: "data" } },
                { name: "keyCategory", type: "multipleKeys", condition: { name: "method", value: "data" } },
                { name: "keys", type: "multipleKeys", condition: { name: "method", value: "item" } },
                { name: "suffix", type: "text", defaultValue: "Percent", condition: { name: "method", value: "item" } },
                { name: "nbDigits", type: "number", defaultValue: 2 }
            ]
        },
        addVariation: {
            category: "Analyzing",
            arguments: [
                { name: "key", type: "keys", optional: false },
                { name: "newKey", type: "text", optional: false },
                { name: "valueGenerator", type: "javascript", optional: false, defaultValue: `(a, b) => a - b` },
                { name: "order", type: "select", defaultValue: undefined, options: [undefined, "ascending", "descending"] },
                { name: "firstValue", type: "text", jsOption: true }
            ]
        },
        addQuantiles: {
            category: "Analyzing",
            arguments: [
                { name: "key", type: "keys", optional: false },
                { name: "newKey", type: "text", optional: false },
                { name: "nbQuantiles", type: "number", optional: false }
            ]
        },
        addBins: {
            category: "Analyzing",
            arguments: [
                { name: "key", type: "keys", optional: false },
                { name: "newKey", type: "text", optional: false },
                { name: "nbBins", type: "number", optional: false }
            ]
        },
        addOutliers: {
            category: "Analyzing",
            arguments: [
                { name: "key", type: "keys", optional: false },
                { name: "newKey", type: "text", optional: false }
            ]
        },
        excludeOutliers: {
            category: "Analyzing",
            arguments: [
                { name: "key", type: "keys", optional: false }
            ]
        },
        correlation: {
            category: "Analyzing",
            arguments: [
                { name: "key1", type: "keys" },
                { name: "key2", type: "multipleKeys" }
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
                    type: "multipleKeys"
                },
                {
                    name: "summary",
                    type: "multipleBoxes",
                    defaultValues: [true, true, true, true, true, true, true],
                    options: ["count", "min", "max", "sum", "mean", "median", "deviation"]
                }
            ]
        },
        getChart: {
            category: "Visualizing",
            justClone: true,
            htmlOutput: true,
            maxWidth: 1000,
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
        showTable: {
            category: "Visualizing",
            justClone: true,
            maxWidth: 1000,
            arguments: [
                {
                    name: "nbItemsInTable",
                    type: "number",
                    defaultValue: 5
                }
            ]
        }
    }
