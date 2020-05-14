export function deepClone(obj) {
    if (typeof (obj) == 'object') {
        var result = obj instanceof Array ? [] : {};
        for (var i in obj) {
            var attr = obj[i];
            result[i] = deepClone(attr);
        }
        return result;
    } else {
        return obj;
    }
}