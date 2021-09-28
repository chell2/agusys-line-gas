/**
 * ２地点間の距離を求める
 * 球面三角法：geometory.computeDistanceBetweenのロジック
 * @param float fromLat 緯度１
 * @param float fromLon 経度１
 * @param float toLat 緯度２
 * @param float toLon 経度２
 * @return float result 距離(m)
 */
var fromLat = 33.319269; //例）久留米市役所
var fromLon = 130.508308;
var toLat = 33.344977; //例）北野総合支所
var toLon = 130.585792;
function distance(
    fromLat: number,
    fromLon: number,
    toLat: number,
    toLon: number
) {
    // 緯度経度をラジアンに変換
    var radFromLat = fromLat * (Math.PI / 180); // 緯度１
    var radFromLon = fromLon * (Math.PI / 180); // 経度１
    var radToLat = toLat * (Math.PI / 180); // 緯度２
    var radToLon = toLon * (Math.PI / 180); // 経度２

    const R = 6378137.0; // 赤道半径

    var averageLat = (radFromLat - radToLat) / 2;
    var averageLon = (radFromLon - radToLon) / 2;
    Logger.log(radFromLat);
    Logger.log(radFromLon);
    // Math.PI 円周率
    // Math.sqrt(x):平方根、　Math.pow(base, exponent):累乗（baseのexponent乗）
    var result =
        R *
        2 *
        Math.asin(
            Math.sqrt(
                Math.pow(Math.sin(averageLat), 2) +
                    Math.cos(radFromLat) *
                        Math.cos(radToLat) *
                        Math.pow(Math.sin(averageLon), 2)
            )
        );
    Logger.log(result);
    return result;
}
