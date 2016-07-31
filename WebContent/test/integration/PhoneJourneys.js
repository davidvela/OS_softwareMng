jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

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
		"so/mng/test/integration/NavigationJourneyPhone",
		"so/mng/test/integration/NotFoundJourneyPhone",
		"so/mng/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});

