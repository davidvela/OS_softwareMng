jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 softwareSet in the list
// * All 3 softwareSet have at least one TeamSet

sap.ui.require([
	"sap/ui/test/Opa5",
	"so/mng/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"so/mng/test/integration/pages/App",
	"so/mng/test/integration/pages/Browser",
	"so/mng/test/integration/pages/Master",
	"so/mng/test/integration/pages/Detail",
	"so/mng/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "so.mng.view."
	});

	sap.ui.require([
		"so/mng/test/integration/MasterJourney",
		"so/mng/test/integration/NavigationJourney",
		"so/mng/test/integration/NotFoundJourney",
		"so/mng/test/integration/BusyJourney",
		"so/mng/test/integration/FLPIntegrationJourney"
	], function () {
		QUnit.start();
	});
});
