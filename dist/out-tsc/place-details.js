"use strict";
var address_1 = require('./address');
var PlaceDetails = (function () {
    function PlaceDetails(id) {
        this.id = id;
        this.address = new address_1.Address();
    }
    return PlaceDetails;
}());
exports.PlaceDetails = PlaceDetails;
//# sourceMappingURL=place-details.js.map