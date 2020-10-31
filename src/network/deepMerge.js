function deepMerge(obj1, obj2) {
    var key;
    for(key in obj2) {
        obj1[key] = obj1[key] && (obj1[key].toString() === "[object Object]" || obj1[key].constructor===Array)?
        deepMerge(obj1[key], obj2[key]) : obj1[key] = obj2[key];
    }
    return obj1;
}