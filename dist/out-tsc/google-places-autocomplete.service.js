"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../typings/globals/google.maps/index.d.ts" />
var core_1 = require('@angular/core');
var place_suggestion_1 = require('./place-suggestion');
var place_details_1 = require('./place-details');
// Service that wraps the google autocomplete service.
// https://developers.google.com/maps/documentation/javascript/reference#AutocompleteService
var GooglePlacesAutocompleteService = (function () {
    function GooglePlacesAutocompleteService() {
        // The google PlacesService somehow needs an HTMLDivElement as an argument. Create a dummy div.
        this._googlePlacesService = new google.maps.places.PlacesService(document.createElement('div'));
        this._googleAutocomplete = new google.maps.places.AutocompleteService();
        this.country = 'NL'; // Default.
    }
    GooglePlacesAutocompleteService.prototype.getSuggestions = function (str) {
        var _this = this;
        var request = {
            input: str,
            componentRestrictions: {
                country: this.country
            },
            types: ['address']
        };
        return new Promise(function (resolve, reject) {
            _this._googleAutocomplete.getPlacePredictions(request, function (results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    var suggestions = results.map(function (r) { return _this.parseGooglePrediction(r); });
                    resolve(suggestions);
                }
                else {
                    reject(status);
                }
            });
        });
    };
    /**
     * Get place details based on google place_id.
     */
    GooglePlacesAutocompleteService.prototype.getSuggestionDetails = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return _this._googlePlacesService.getDetails({
                placeId: id
            }, function (placeResult, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    var address = _this.parseGooglePlaceResult(placeResult);
                    resolve(address);
                }
                else {
                    reject(status);
                }
            });
        });
    };
    /**
     * Map google result to PlaceSuggestion object
     */
    GooglePlacesAutocompleteService.prototype.parseGooglePrediction = function (googleResult) {
        var suggestion = new place_suggestion_1.PlaceSuggestion();
        suggestion.description = googleResult.description;
        suggestion.id = googleResult.place_id;
        suggestion.type = place_suggestion_1.PlaceType[googleResult.types[0]];
        return suggestion;
    };
    /**
     * Map google result to PlaceDetail object
     */
    GooglePlacesAutocompleteService.prototype.parseGooglePlaceResult = function (placeResult) {
        // For convenience first create a map of the google address components. ie: { 'locality' : 'Utrecht', ... }
        var map = placeResult.address_components.reduce(function (map, addrComponent) {
            map[addrComponent.types[0]] = addrComponent.long_name;
            return map;
        }, {});
        var placeDetail = new place_details_1.PlaceDetails(placeResult.place_id);
        // Copy fields to the address object.
        Object.assign(placeDetail.address, {
            street: map.route,
            houseNumber: map.street_number,
            postalCode: map.postal_code,
            city: map.locality,
            country: map.country,
            coords: {
                lat: placeResult.geometry.location.lat(),
                lng: placeResult.geometry.location.lng()
            }
        });
        return placeDetail;
    };
    GooglePlacesAutocompleteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GooglePlacesAutocompleteService);
    return GooglePlacesAutocompleteService;
}());
exports.GooglePlacesAutocompleteService = GooglePlacesAutocompleteService;
//# sourceMappingURL=google-places-autocomplete.service.js.map