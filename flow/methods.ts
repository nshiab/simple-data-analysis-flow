interface Arg {
    name: string
    type:
        | "checkbox"
        | "select"
        | "keys"
        | "multipleKeys"
        | "number"
        | "text"
        | "javascript"
        | "sourceB"
        | "multipleBoxes"
    optional?: boolean
    width?: number
    jsOption?: boolean
    options?: (string | undefined)[]
    defaultValue?: string
    condition?: { name: string; value: string }
}

interface Method {
    category: string
    maxWidth?: number
    doubleSource?: boolean
    justClone?: boolean
    htmlOutput?: boolean
    arguments: Arg[]
}

const methods: {
    [key: string]: Method
} = {
    newSimpleData: {
        category: "Importing",
        arguments: [],
    },
    dropFile: {
        category: "Importing",
        arguments: [
            {
                name: "autoType",
                type: "checkbox",
            },
            {
                name: "firstItem",
                type: "number",
            },
            {
                name: "lastItem",
                type: "number",
            },
            {
                name: "fillMissingKeys",
                type: "checkbox",
            },
        ],
    },
    loadDataFromUrl: {
        category: "Importing",
        arguments: [
            {
                name: "url",
                type: "text",
                optional: false,
            },
            {
                name: "autoType",
                type: "checkbox",
            },
            {
                name: "firstItem",
                type: "number",
            },
            {
                name: "lastItem",
                type: "number",
            },
            {
                name: "fillMissingKeys",
                type: "checkbox",
            },
        ],
    },
    formatAllKeys: {
        category: "Cleaning",
        arguments: [],
    },
    renameKey: {
        category: "Cleaning",
        arguments: [
            { name: "oldKey", type: "keys", optional: false },
            { name: "newKey", type: "text", optional: false },
        ],
    },
    checkValues: {
        category: "Cleaning",
        arguments: [
            { name: "nbItemsToCheck", type: "number" },
            { name: "randomize", type: "checkbox" },
        ],
    },
    excludeMissingValues: {
        category: "Cleaning",
        arguments: [{ name: "key", type: "keys" }],
    },
    keepMissingValues: {
        category: "Cleaning",
        arguments: [{ name: "key", type: "keys" }],
    },
    removeDuplicates: {
        category: "Cleaning",
        arguments: [
            { name: "key", type: "keys" },
            { name: "nbToKeep", type: "number" },
        ],
    },
    keepDuplicates: {
        category: "Cleaning",
        arguments: [{ name: "key", type: "keys" }],
    },
    valuesToString: {
        category: "Cleaning",
        arguments: [{ name: "key", type: "keys", optional: false }],
    },
    valuesToInteger: {
        category: "Cleaning",
        arguments: [
            { name: "key", type: "keys", optional: false },
            { name: "thousandSeparator", type: "text", width: 10 },
            { name: "decimalSeparator", type: "text", width: 10 },
            { name: "skipErrors", type: "checkbox" },
        ],
    },
    valuesToFloat: {
        category: "Cleaning",
        arguments: [
            { name: "key", type: "keys", optional: false },
            { name: "thousandSeparator", type: "text", width: 10 },
            { name: "decimalSeparator", type: "text", width: 10 },
            { name: "skipErrors", type: "checkbox" },
        ],
    },
    valuesToDate: {
        category: "Cleaning",
        arguments: [
            { name: "key", type: "keys", optional: false },
            { name: "format", type: "text", optional: false },
            { name: "skipErrors", type: "checkbox" },
        ],
    },
    datesToString: {
        category: "Cleaning",
        arguments: [
            { name: "key", type: "keys", optional: false },
            { name: "format", type: "text", optional: false },
            { name: "skipErrors", type: "checkbox" },
        ],
    },
    replaceValues: {
        category: "Cleaning",
        arguments: [
            { name: "key", type: "keys", optional: false },
            { name: "oldValue", type: "text", optional: false, jsOption: true },
            { name: "newValue", type: "text", optional: false, jsOption: true },
            {
                name: "method",
                type: "select",
                options: [undefined, "entireString", "partialString"],
            },
            { name: "skipErrors", type: "checkbox" },
        ],
    },
    roundValues: {
        category: "Cleaning",
        arguments: [
            { name: "key", type: "keys", optional: false },
            { name: "nbDigits", type: "number" },
            { name: "skipErrors", type: "checkbox" },
        ],
    },
    modifyValues: {
        category: "Cleaning",
        maxWidth: 400,
        arguments: [
            { name: "key", type: "keys", optional: false },
            {
                name: "valueGenerator",
                type: "javascript",
                optional: false,
                defaultValue: `(value) => {
    
    const modifiedValue = value
    
    return modifiedValue
}`,
            },
        ],
    },
    modifyItems: {
        category: "Cleaning",
        maxWidth: 400,
        arguments: [
            { name: "key", type: "keys", optional: false },
            {
                name: "itemGenerator",
                type: "javascript",
                optional: false,
                defaultValue: `(item) => {
    
    const modifiedValue = "Change me!"
    
    return modifiedValue
}`,
            },
        ],
    },
    addKey: {
        category: "Restructuring",
        maxWidth: 400,
        arguments: [
            { name: "key", type: "text", optional: false },
            {
                name: "itemGenerator",
                type: "javascript",
                optional: false,
                defaultValue: `(item) => {
    const newValue = "Change me!"

    return newValue
}`,
            },
        ],
    },
    removeKey: {
        category: "Restructuring",
        arguments: [{ name: "key", type: "keys", optional: false }],
    },
    addItems: {
        category: "Restructuring",
        doubleSource: true,
        arguments: [
            { name: "dataToBeAdded", type: "sourceB", optional: false },
            { name: "fillMissingKeys", type: "checkbox" },
        ],
    },
    mergeItems: {
        category: "Restructuring",
        doubleSource: true,
        arguments: [
            { name: "dataToBeMerged", type: "sourceB", optional: false },
            { name: "commonKey", type: "keys", optional: false },
        ],
    },
    keysToValues: {
        category: "Restructuring",
        arguments: [
            { name: "keys", type: "multipleKeys", optional: false },
            { name: "newKeyForKeys", type: "text", optional: false },
            { name: "newKeyForValues", type: "text", optional: false },
        ],
    },
    valuesToKeys: {
        category: "Restructuring",
        arguments: [
            { name: "newKeys", type: "keys", optional: false },
            { name: "newValues", type: "keys", optional: false },
        ],
    },
    selectKeys: {
        category: "Selecting",
        arguments: [
            {
                name: "keys",
                type: "multipleKeys",
                optional: false,
            },
        ],
    },
    filterValues: {
        category: "Selecting",
        maxWidth: 400,
        arguments: [
            { name: "key", type: "keys", optional: false },
            {
                name: "valueComparator",
                type: "javascript",
                defaultValue: `(value) => value > 10`,
                optional: false,
            },
        ],
    },
    filterItems: {
        category: "Selecting",
        maxWidth: 400,
        arguments: [
            {
                name: "itemComparator",
                type: "javascript",
                defaultValue: `(item) => item.someNumber > 10`,
                optional: false,
            },
        ],
    },
    describe: {
        category: "Analyzing",
        arguments: [],
    },
    sortValues: {
        category: "Analyzing",
        arguments: [
            { name: "key", type: "keys", optional: false },
            {
                name: "order",
                type: "select",
                options: ["ascending", "descending"],
                optional: false,
            },
        ],
    },
    "addProportions-data": {
        category: "Analyzing",
        arguments: [
            {
                name: "method",
                type: "select",
                options: ["data"],
                optional: false,
            },
            {
                name: "key",
                type: "keys",
                optional: false,
            },
            {
                name: "newKey",
                type: "text",
                optional: false,
            },
            {
                name: "keyCategory",
                type: "multipleKeys",
            },
            { name: "nbDigits", type: "number" },
        ],
    },
    "addProportions-item": {
        category: "Analyzing",
        arguments: [
            {
                name: "method",
                type: "select",
                options: ["item"],
                optional: false,
            },
            {
                name: "keys",
                type: "multipleKeys",
                optional: false,
            },
            {
                name: "suffix",
                type: "text",
            },
            { name: "nbDigits", type: "number" },
        ],
    },
    addVariation: {
        category: "Analyzing",
        maxWidth: 400,
        arguments: [
            { name: "key", type: "keys", optional: false },
            { name: "newKey", type: "text", optional: false },
            {
                name: "valueGenerator",
                type: "javascript",
                optional: false,
                defaultValue: `(a, b) => a - b`,
            },
            {
                name: "order",
                type: "select",
                options: [undefined, "ascending", "descending"],
            },
            { name: "firstValue", type: "text", jsOption: true },
        ],
    },
    addQuantiles: {
        category: "Analyzing",
        arguments: [
            { name: "key", type: "keys", optional: false },
            { name: "newKey", type: "text", optional: false },
            { name: "nbQuantiles", type: "number", optional: false },
        ],
    },
    addBins: {
        category: "Analyzing",
        arguments: [
            { name: "key", type: "keys", optional: false },
            { name: "newKey", type: "text", optional: false },
            { name: "nbBins", type: "number", optional: false },
        ],
    },
    addOutliers: {
        category: "Analyzing",
        arguments: [
            { name: "key", type: "keys", optional: false },
            { name: "newKey", type: "text", optional: false },
        ],
    },
    excludeOutliers: {
        category: "Analyzing",
        arguments: [{ name: "key", type: "keys", optional: false }],
    },
    correlation: {
        category: "Analyzing",
        arguments: [
            { name: "key1", type: "keys" },
            { name: "key2", type: "multipleKeys" },
        ],
    },
    summarize: {
        category: "Analyzing",
        arguments: [
            {
                name: "keyValue",
                type: "keys",
            },
            {
                name: "keyCategory",
                type: "multipleKeys",
            },
            {
                name: "summary",
                type: "multipleBoxes",
                options: [
                    "count",
                    "min",
                    "max",
                    "sum",
                    "mean",
                    "median",
                    "deviation",
                ],
            },
            { name: "nbDigits", type: "number" },
        ],
    },
    getChart: {
        category: "Visualizing",
        justClone: true,
        htmlOutput: true,
        maxWidth: 600,
        arguments: [
            {
                name: "x",
                type: "keys",
                optional: false,
            },
            {
                name: "y",
                type: "keys",
                optional: false,
            },
            {
                name: "type",
                type: "select",
                options: [
                    undefined,
                    "dot",
                    "line",
                    "bar",
                    "barVertical",
                    "barHorizontal",
                    "box",
                    "boxVertical",
                    "boxHorizontal",
                ],
                optional: false,
            },
            {
                name: "color",
                type: "keys",
            },
            {
                name: "marginLeft",
                type: "number",
            },
            {
                name: "marginBottom",
                type: "number",
            },
            {
                name: "width",
                type: "number",
            },
            {
                name: "height",
                type: "number",
            },
            {
                name: "trend",
                type: "checkbox",
            },
            { name: "showTrendEquation", type: "checkbox" },
            { name: "title", type: "text" },
        ],
    },
    showTable: {
        category: "Visualizing",
        justClone: true,
        maxWidth: 5000,
        arguments: [
            {
                name: "nbItemsInTable",
                type: "number",
            },
        ],
    },
    getKeys: {
        category: "Others",
        arguments: [],
    },
    getData: {
        category: "Others",
        arguments: [],
    },
    getLength: {
        category: "Others",
        arguments: [],
    },
    getDataAsArrays: {
        category: "Others",
        arguments: [],
    },
    getArray: {
        category: "Others",
        arguments: [{ name: "key", type: "keys", optional: false }],
    },
    getUniqueValues: {
        category: "Others",
        arguments: [{ name: "key", type: "keys", optional: false }],
    },
    getItem: {
        category: "Others",
        maxWidth: 400,
        arguments: [
            {
                name: "conditions",
                type: "javascript",
                optional: false,
                defaultValue: `{someKey: "someValue"}`,
            },
        ],
    },
    getMin: {
        category: "Others",
        arguments: [{ name: "key", type: "keys", optional: false }],
    },
    getMax: {
        category: "Others",
        arguments: [{ name: "key", type: "keys", optional: false }],
    },
    getMean: {
        category: "Others",
        arguments: [{ name: "key", type: "keys", optional: false }],
    },
    getMedian: {
        category: "Others",
        arguments: [{ name: "key", type: "keys", optional: false }],
    },
    getSum: {
        category: "Others",
        arguments: [{ name: "key", type: "keys", optional: false }],
    },
}

export default methods
export type { Method, Arg }
