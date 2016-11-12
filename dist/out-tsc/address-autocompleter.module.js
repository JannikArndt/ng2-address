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
var forms_1 = require('@angular/forms');
var platform_browser_1 = require('@angular/platform-browser');
var address_autocompleter_component_1 = require('./address-autocompleter.component');
var google_places_autocomplete_service_1 = require('./google-places-autocomplete.service');
var focus_directive_1 = require('./focus-directive');
var AddressAutoCompleter = (function () {
    function AddressAutoCompleter() {
    }
    AddressAutoCompleter = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
            declarations: [address_autocompleter_component_1.AddressAutocompleterComponent, focus_directive_1.FocusDirective],
            bootstrap: [address_autocompleter_component_1.AddressAutocompleterComponent],
            providers: [google_places_autocomplete_service_1.GooglePlacesAutocompleteService]
        }), 
        __metadata('design:paramtypes', [])
    ], AddressAutoCompleter);
    return AddressAutoCompleter;
}());
exports.AddressAutoCompleter = AddressAutoCompleter;
//# sourceMappingURL=address-autocompleter.module.js.map