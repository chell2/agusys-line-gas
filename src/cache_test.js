var cache = SheetCache.create("cache.recipe");
var cached = cache.get(101);
if (cached !== null) return cached;

var library = LibrarySS.get(); // ※独自クラス
var sheet = library.getSomeSheet();
var range = sheet.getDataRange();
var values = range.getValues();

cache.put(101, values[101]);
