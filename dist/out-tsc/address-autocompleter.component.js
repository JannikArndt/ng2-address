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
var core_1 = require('@angular/core');
var google_places_autocomplete_service_1 = require('./google-places-autocomplete.service');
var address_1 = require('./address');
var KEYS = {
    ARROW_UP: 38,
    ARROW_DOWN: 40,
    ENTER: 13
};
var AddressAutocompleterComponent = (function () {
    function AddressAutocompleterComponent(autoCompleteService) {
        this.onAddress = new core_1.EventEmitter();
        this.autoCompleteService = autoCompleteService;
        this.suggestions = [];
    }
    AddressAutocompleterComponent.prototype.ngOnInit = function () {
        this.autoCompleteService.country = this.country;
    };
    AddressAutocompleterComponent.prototype.ngOnChanges = function (changes) {
        if (changes['country']) {
            this.autoCompleteService.country = changes['country'].currentValue;
            this.inputString = null;
            this.address = null;
        }
    };
    AddressAutocompleterComponent.prototype.onKeyUp = function (keyCode, fieldStreet) {
        if (keyCode === KEYS.ENTER) {
            fieldStreet.blur();
            return;
        }
        // On pressing up or down
        if (keyCode === KEYS.ARROW_UP || keyCode === KEYS.ARROW_DOWN) {
            if (this.suggestions.length) {
                this.updateSuggestionSelection(keyCode);
                this.inputString = this.selectedSuggestion.description;
            }
            return;
        }
        this.onChangeInput(fieldStreet.value, fieldStreet);
    };
    AddressAutocompleterComponent.prototype.onChangeInput = function (str, inputField) {
        var _this = this;
        // User cleared the input field, or this is the first key pressed (which isnt a
        // character).
        if (!str) {
            this.selectedSuggestion = null;
            this.suggestions = [];
            return;
        }
        this
            .autoCompleteService
            .getSuggestions(str)
            .then(function (results) {
            _this.suggestions = results;
            _this.selectedSuggestion = results[0];
            // On mobile, scroll input element to the top, so the suggestions are more
            // visible.
            if ('ontouchstart' in window) {
                _this.scrollToElement(inputField);
            }
        })
            .catch(function (status) {
            _this.suggestions = [];
            _this.selectedSuggestion = null;
        });
    };
    // Scroll element to top on touchscreens, to make place for suggestion list.
    AddressAutocompleterComponent.prototype.scrollToElement = function (element) {
        var curtop = 0;
        while (element) {
            curtop += element.offsetTop;
            element = element.offsetParent;
        }
        window.scrollTo(0, curtop);
    };
    /**
     * Use arrow keys to select previous or next suggestion
     */
    AddressAutocompleterComponent.prototype.updateSuggestionSelection = function (keyCode) {
        var selectedIndex = this.suggestions.indexOf(this.selectedSuggestion);
        if (keyCode === KEYS.ARROW_DOWN) {
            selectedIndex++;
        }
        else if (keyCode === KEYS.ARROW_UP) {
            selectedIndex--;
        }
        // Clamping selection between 0 and num suggestions.
        selectedIndex = Math.min(this.suggestions.length - 1, Math.max(0, selectedIndex));
        this.selectedSuggestion = this.suggestions[selectedIndex];
    };
    AddressAutocompleterComponent.prototype.onBlurStreet = function () {
        if (this.selectedSuggestion) {
            this.useSuggestion(this.selectedSuggestion);
        }
    };
    AddressAutocompleterComponent.prototype.useSuggestion = function (suggestion) {
        var _this = this;
        // Replace input field with current selected suggestion.
        this.inputString = suggestion.description;
        // Clear current suggestion list
        this.suggestions = [];
        // Get the address details (components) based on the google placeid
        var placeId = suggestion.id;
        return this
            .autoCompleteService
            .getSuggestionDetails(placeId)
            .then(function (placeDetail) {
            var address = placeDetail.address;
            if (_this.address && (address.toString() !== _this.address.toString())) {
                // remove manual housenumber, postalcode override
                _this.manualHouseNumber = '';
                _this.manualPostalCode = '';
            }
            _this.address = address;
            _this
                .onAddress
                .emit(address);
        });
    };
    AddressAutocompleterComponent.prototype.onBlurHouseNumber = function (houseNumber) {
        var _this = this;
        this
            .autoCompleteService
            .getSuggestions(houseNumber + " " + this.inputString)
            .then(function (results) {
            var bestSuggestion = results[0];
            _this
                .autoCompleteService
                .getSuggestionDetails(bestSuggestion.id)
                .then(function (placeDetail) {
                // The new suggestion is based on street + housenumber. In 99% of the cases this
                // means the autocomplete engine found an postalcode as well.
                if (placeDetail.address.isComplete()) {
                    _this.useSuggestion(bestSuggestion);
                }
                else {
                    _this.manualHouseNumber = houseNumber;
                    _this.address.houseNumber = houseNumber;
                    _this
                        .onAddress
                        .emit(_this.address);
                }
            });
        });
    };
    AddressAutocompleterComponent.prototype.onBlurPostalCode = function (postalCode) {
        if (postalCode) {
            this.manualPostalCode = postalCode;
            this.address.postalCode = postalCode;
            this
                .onAddress
                .emit(this.address);
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AddressAutocompleterComponent.prototype, "onAddress", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AddressAutocompleterComponent.prototype, "placeholderStreet", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AddressAutocompleterComponent.prototype, "placeholderHouseNumber", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AddressAutocompleterComponent.prototype, "placeholderPostalCode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AddressAutocompleterComponent.prototype, "country", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', address_1.Address)
    ], AddressAutocompleterComponent.prototype, "address", void 0);
    AddressAutocompleterComponent = __decorate([
        core_1.Component({
            selector: 'address-autocompleter',
            templateUrl: 'address-autocompleter.component.html',
            styles: ["\n      .selected {\n        background-color: hsla(200, 100%, 50%, 0.2);\n      }\n  "],
            providers: [google_places_autocomplete_service_1.GooglePlacesAutocompleteService]
        }), 
        __metadata('design:paramtypes', [google_places_autocomplete_service_1.GooglePlacesAutocompleteService])
    ], AddressAutocompleterComponent);
    return AddressAutocompleterComponent;
}());
exports.AddressAutocompleterComponent = AddressAutocompleterComponent;
//# sourceMappingURL=address-autocompleter.component.js.map