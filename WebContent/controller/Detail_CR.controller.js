sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";

	return Controller.extend("so.mng.controller.Detail_CR", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf so.mng.view.Detail_CR
		 */
		onInit: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Detail_CR").attachPatternMatched(this._onObjectMatched, this);
			
			//this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			//for the CR -> crId
			
		},
		_onObjectMatched: function(oEvent) {
			this.getView().bindElement({
				path: "/softwareSet('" +
					oEvent.getParameter("arguments").objectId + "')"
			});
			
			/*var sObjectId = oEvent.getParameter("arguments").objectId;
			this.getModel().metadataLoaded().then(function() {
				var sObjectPath = this.getModel().createKey("softwareSet", {
					softwareID: sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));*/
		},
		onNavBack: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter =
					sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("object", true);
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf so.mng.view.Detail_CR
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf so.mng.view.Detail_CR
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf so.mng.view.Detail_CR
		 */
		//	onExit: function() {
		//
		//	}

	});

});