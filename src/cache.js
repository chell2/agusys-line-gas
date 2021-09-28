(SheetCache = function (sheetName) {
    this.sheetName = sheetName;

    /**
     * キャッシュのput
     *
     * 参照の高速化を図るため、キーはindexとする
     */
    this.put = function (index, value) {
        var library = LibrarySS.get(); // ※独自クラス
        var sheet = library.getCacheSheet(this.sheetName);
        var range = sheet.getCells(index, 1, 1, 10);

        if (typeof value == "object") {
            value = JSON.stringify(value);
        }

        // 10000chars / 1cell
        // ※1セル50000文字までという制限があるため
        var values = [];
        while (value) {
            values.push(value.substr(0, 10000));
            value = value.substr(10000);
        }
        while (values.length < 10) {
            values.push("");
        }

        range.setValues([values]);
    };

    /**
     * キャッシュのget
     */
    this.get = function (index, type) {
        if (!type) type = SheetCache.TYPE_STRING;

        var library = LibrarySS.get();
        var sheet = library.getCacheSheet(this.sheetName);
        var range = sheet.getCells(index, 1, 1, 10);

        var values = range.getValues()[0];
        var value = values.join("");
        if (!value) return null;

        switch (type) {
            case SheetCache.TYPE_JSON:
                value = JSON.parse(value);
                break;
        }

        return value;
    };
}).prototype = p = new Object();

/**
 * create instance
 */
SheetCache.create = function (sheetName) {
    if (!SheetCache._instances) SheetCache._instances = {};
    if (SheetCache._instances[sheetName])
        return SheetCache._instances[sheetName];

    return (SheetCache._instances[sheetName] = new SheetCache(sheetName));
};

/**
 * cache data types
 */
SheetCache.TYPE_JSON = "json";
SheetCache.TYPE_STRING = "string";
SheetCache.TYPE_INT = "int";
SheetCache.TYPE_BOOL = "bool";
