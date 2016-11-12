"use strict";
var Address = (function () {
    function Address() {
    }
    Address.prototype.toString = function () {
        var _this = this;
        // Get all *filled* fields from this object and concatenate them.
        return ['street', 'houseNumber', 'city', 'country']
            .map(function (k) { return _this[k]; }) // Get all values for given keys
            .filter(function (v) { return !!v; }) // Check if the value is truthy (not null/undefined/empty string)
            .join(' ');
    };
    Address.prototype.isComplete = function () {
        var _this = this;
        return ['street', 'houseNumber', 'city', 'postalCode', 'country']
            .every(function (k) { return !!_this[k]; });
    };
    return Address;
}());
exports.Address = Address;
//# sourceMappingURL=address.js.map