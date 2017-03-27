function isObject(obj) {
    if (obj == null) return false;

    if (typeof obj !== "object" || obj.nodeType) {
        return false;
    }

    if ( obj.constructor &&
            !({}).hasOwnProperty.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
        return false;
    }

    return true;
}

function isArray(arr) {
    return Array.isArray(arr);
}

function isString(str) {
    return typeof str === "string";
}

function checkStr(test) {
    return (test instanceof RegExp) || isString(test);
}

function replaceCall(source, replace) {
    var result = source;

    replace.forEach(function(item) {
        if (item.match && item.value !== undefined) {
            result = result.replace(item.match, item.value);
        }
    });

    return result;
}

module.exports = function(source, map) {
    this.cacheable();

    var query = this.query, replace;

    if (isObject(query) || isArray(query)) {
        replace = isObject(query) ? [query] : query;
        source = replaceCall(source, replace);
    }

    this.callback(null, source, map);
};
