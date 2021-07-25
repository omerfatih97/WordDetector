
function getParameterValue(_key, _action) {
    var result;

    result = $.ajax({ url: baseCacheEnumURL + '/' + _action, data: { key: _key }, async: false }).responseText;
    return result;
}
