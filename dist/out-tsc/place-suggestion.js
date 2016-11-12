"use strict";
var PlaceSuggestion = (function () {
    function PlaceSuggestion() {
    }
    PlaceSuggestion.prototype.toString = function () {
        return this.description;
    };
    return PlaceSuggestion;
}());
exports.PlaceSuggestion = PlaceSuggestion;
(function (PlaceType) {
    PlaceType[PlaceType["StreetAddress"] = 0] = "StreetAddress";
    PlaceType[PlaceType["Route"] = 1] = "Route";
})(exports.PlaceType || (exports.PlaceType = {}));
var PlaceType = exports.PlaceType;
//# sourceMappingURL=place-suggestion.js.map