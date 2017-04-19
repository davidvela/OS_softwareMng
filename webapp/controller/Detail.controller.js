/*global location */
sap.ui.define([
	"so/mng/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"so/mng/model/formatter",
	"sap/m/MessageToast"
], function(BaseController, JSONModel, formatter, MessageToast) {
	"use strict";

	return BaseController.extend("so.mng.controller.Detail", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		onInit: function() {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page is busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var oViewModel = new JSONModel({
				busy: false,
				delay: 0,
				lineItemListTitle: this.getResourceBundle().getText("detailLineItemTableHeading")
			});

			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

			this.setModel(oViewModel, "detailView");

			this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));

			/***************************************************************/
			/* VIZ GRAPHIC		                                           */
			/***************************************************************/
			//var oball = this.getView().byId("ballTotal");
			//oball.setTotal(formatter.floatValue("80") );
			
			/*var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
			oVizFrame.setVizProperties({
			    title: {
			        visible: false,
			        text: 'Statistics'
			    },
			    tooltip: {
			        visible: false
			    }
			});*/
		},

		onStat: function(oEvent) {
			//Statistics
			//this.onInit();
			//var tab = this.getView().byId("iconTabBarFilter5");
			//tab.redender();
			//tab

		},

		onStatClick: function(oEvent) {
			var oDialog1 = new sap.m.Dialog();
			oDialog1.setTitle("Statistics");

			var StatPath = oEvent.getSource().getBindingContext().getPath();
			var oStat = oEvent.getSource().getBindingContext().getModel().getData(StatPath);
			var StatPath2 = "StatSet('" + "SO002" + "')";

			//Future design
			/*switch (oStat.Type) {
				case "User Access": 
                case "My SQL Traces":
                case "Performance":*/

			// user access - viz graphic
			//*************************************************************************************************
			// create a VizFrame
			//*************************************************************************************************
			var dataModel = {
				StatSet:[   //for Software Manager
				      {time: "April - 16", times: "40", type: "Access"},
				      {time: "April - 16", times: "4", type: "Dump" }
				      ]
		    };
			
			 var soId = oEvent.getSource().getBindingContext().getObject().softwareID; 
            switch (soId) {
            	case "SO001": 
            	    dataModel.StatSet[0].times = 205;
            		dataModel.StatSet[1].times = 30;
            		break;
                case "SO002": 
            	    dataModel.StatSet[0].times = 20;
            		dataModel.StatSet[1].times = 2;
            		break;
                case "SO003": 
            	    dataModel.StatSet[0].times = 30;
            		dataModel.StatSet[1].times = 3;
            		break;
            	case "SO004": 
            	    dataModel.StatSet[0].times = 40;
            		dataModel.StatSet[1].times = 4;
            		break;	
            	default:
            }
		
			var oDataset = new sap.viz.ui5.data.FlattenedDataset({
				// a Bar Chart requires exactly one dimension (x-axis)
				'dimensions': [{
					'name': 'Period(month) - AC',
					'value': "{time}"
				},
				{
					'name': 'Period(month) - DM',
					'value': "{type}"
				}
				],
				'measures': [
					// measure 1
					{
						'name': 'Access', // 'name' is used as label in the Legend
						'value': '{times}' // 'value' defines the binding for the displayed value
					}
				],
				// 'data' is used to bind the whole data collection that is to be displayed in the chart
				'data': {
					'path': StatPath2
				} //}).bindData("{StatSet}");
			}).bindData("/StatSet");
			
			var loModel2 = new sap.ui.model.json.JSONModel(dataModel);
		    oDataset.setModel(loModel2);
		    //var loModel = this.getView().getModel();
		    //var loModel =  new sap.ui.model.json.JSONModel(oEvent.getSource().getBindingContext().getObject().StatSet); 
			//oDataset.setModel(loModel);
		    
		    
			var oVizFrame = new sap.viz.ui5.controls.VizFrame({
				'uiConfig': {
					'applicationSet': 'fiori'
				},
				'vizType': 'stacked_bar' 	//Supported chart types: bubble, combination, column, bar, line, stacked_bar, stacked_column, bullet, vertical_bullet, timebubble.
                
			});

			oVizFrame.setVizProperties({
				title: {
					visible: true,
					text: 'User Access'
				},
				plotArea : {
                   'colorPalette' : ['#5cbae6','#FF0000','#CCFF66','#FF0000','#FFC300']
                }
			});

			// attach the model to the chart and display it
			oVizFrame.setDataset(oDataset);


			// set feeds
			var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "primaryValues",
					'type': "Measure",
					'values': ["Access"]
				}),
				feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "categoryAxis",
					'type': "Dimension",
					'values': ["Period(month) - AC"]
				}),
				feedAxisLabels2 = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid': "color",
					'type': "Dimension",
					'values': ["Period(month) - DM"]
				});
                    
                        
			oVizFrame.addFeed(feedPrimaryValues);
			oVizFrame.addFeed(feedAxisLabels);
			oVizFrame.addFeed(feedAxisLabels2);


			//chart types: bubble, combination, column, bar, line, stacked_bar, stacked_column, bullet, vertical_bullet, timebubble.
			//var oBt0   = new sap.m.Button(	{text:"bubble",  		press: function() { oVizFrame.setVizType(this.getText());}   		});
			//var oBt1   = new sap.m.Button(	{text:"combination", 	press: function() { oVizFrame.setVizType(this.getText());}   		});
			var oBt2   = new sap.m.Button(	{text:"column",  		press: function() { oVizFrame.setVizType(this.getText());}   		});
			//var oBt3   = new sap.m.Button(	{text:"bar",  			press: function() { oVizFrame.setVizType(this.getText());}   		});
			var oBt4   = new sap.m.Button(	{text:"line",  			press: function() { oVizFrame.setVizType(this.getText());}   		});
			var oBt5   = new sap.m.Button(	{text:"stacked_bar",  	press: function() { oVizFrame.setVizType(this.getText());}   		});
			var oBt6   = new sap.m.Button(	{text:"stacked_column", press: function() { oVizFrame.setVizType(this.getText());}   		});
			var oBt7   = new sap.m.Button(	{text:"bullet",  		press: function() { oVizFrame.setVizType(this.getText());}   		});
			var oBt8   = new sap.m.Button(	{text:"vertical_bullet",press: function() { oVizFrame.setVizType(this.getText());}   		});
			//var oBt9   = new sap.m.Button(	{text:"timebubble",  	press: function() { oVizFrame.setVizType(this.getText());}   		}); 
            //oDialog1.addContent(oBt0);oDialog1.addContent(oBt1);
            oDialog1.addContent(oBt2);//oDialog1.addContent(oBt3);
            oDialog1.addContent(oBt4);oDialog1.addContent(oBt5);
            oDialog1.addContent(oBt6);oDialog1.addContent(oBt7);oDialog1.addContent(oBt8);
            
			oDialog1.addContent(oVizFrame);
			oDialog1.addButton(new sap.m.Button({
				text: "OK",
				press: function() {
					$("#vidFrame").attr("src", "");
					oDialog1.close();
				}
			}));
			oDialog1.open();
		},
		
		
		onCROption: function(oEvent) {
			MessageToast.show("Edit functionallity will be implemented ");
		    
		   /* var oItem = oEvent.getSource();
            var loId = oItem.getBindingContext().getObject().softwareID; 
            var locrId = "01";
            if ( loId === '' &&  locrId === '') {
                MessageToast.show("Please select a CR line ");
                return; 
            }
			var oRouter =
				sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Detail_CR", {
				objectId: loId,
				crId: locrId
			});*/
		},

        HB_Press: function(oEvent){
            MessageToast.show("Number of Access and Dumps Last Month");
        },
		onShowLink: function(oEvent) {
			//var splashWeb = 'https://standard.experiencesplash.com/home/projects/e2852930baa0365/research/participant/adc4be3c1b75b16f0baa1af8';	
			//splashWeb = "http://www.cesigrup.com&output=embed";
			//document.getElementById("application-SoftwareManagement-display-component---detail--boxWeb2").src = splashWeb;

			//document.getElementById("boxWeb2").src = splashWeb;
			//document.getElementById("application-SoftwareManagement-display-component---detail--boxWeb3").load( splashWeb );

			//document.getElementById("application-SoftwareManagement-display-component---detail--boxWeb").attr("src",splashWeb);
			/*var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("objectDetails", {
				objectId: "1" ,  //	oItem.getBindingContext().getObject().ProductID
				details : '2'
			});*/

			// check links - if youtube - open in the frame. else open a new tab 
			var oDialog1 = new sap.m.Dialog();
			oDialog1.setTitle("Cloud Resource");

			var rscPath = oEvent.getSource().getBindingContext().getPath();
			var oRsc = oEvent.getSource().getBindingContext().getModel().getData(rscPath);

			var oText = new sap.m.Text({
				text: oRsc.Link
			});
			var oText2 = new sap.m.Text();

			var oLink2 = new sap.m.Link("l2");
			oLink2.setText("Link to URL");
			oLink2.setTooltip("Target: _blank");
			oLink2.setHref(oRsc.Link);
			oLink2.setTarget("_blank");

			var centerLayout = new sap.m.VBox();
			centerLayout.setAlignItems("Center");
			centerLayout.setJustifyContent("Center");
			centerLayout.addItem(oText);

			switch (oRsc.Type) {
				case "picture":
					oText2.setText("picture");
					var oPic = new sap.m.Image({
						src: oRsc.Link
					}); //, width : "800px" , height : "600px"});
					centerLayout.addItem(oLink2);
					centerLayout.addItem(oPic);
					break;
				case "video":
					oText2.setText("video");
					var html = new sap.ui.core.HTML();
					var oString = "<div id=\"divPdf\"><iframe id='vidFrame' src = '" + oRsc.Link + "width= '800px' height= '200' ></iframe>";
					html.setContent(oString);
					centerLayout.addItem(oLink2);
					centerLayout.addItem(html);
					break;
				case "web":
					oText2.setText("web");
					centerLayout.addItem(oLink2);

					break;
				default:
					//default //oText2.setText("nothing");
			}

			oDialog1.addContent(centerLayout);
			oDialog1.addButton(new sap.m.Button({
				text: "OK",
				press: function() {
					$("#vidFrame").attr("src", "");
					oDialog1.close();
				}
			}));
			oDialog1.open();

		},

		showTeamDialog: function(oEvent) {

			var oDialog1 = new sap.m.Dialog();
			oDialog1.setTitle("Team Member");
			//var oText = new sap.m.Text({ text: "Hello World!"});

			var teamPath = oEvent.getSource().getBindingContext().getPath();
			var oTeam = oEvent.getSource().getBindingContext().getModel().getData(teamPath);

			var oHeader = new sap.m.ObjectHeader();
			oHeader.setTitle(oTeam.TeamMember);
			oHeader.insertAttribute(new sap.m.ObjectAttribute({
				text: oTeam.Phone,
				title: "Tlf"
			}), 0);
			oHeader.insertAttribute(new sap.m.ObjectAttribute({
				text: oTeam.Email,
				title: "email"
			}), 0);
			oHeader.insertAttribute(new sap.m.ObjectAttribute({
				text: oTeam.Role,
				title: "Role"
			}), 0);

			//  oHeader.setIcon(oTeam.Picture);
			var oPic = new sap.m.Image({
				src: oTeam.Picture,
				width: "200px",
				height: "200px"
			});

			var centerLayout = new sap.m.VBox();
			centerLayout.setAlignItems("Center");
			centerLayout.setJustifyContent("Center");
			centerLayout.addItem(oHeader);
			centerLayout.addItem(oPic);

			//oDialog1.addContent(oHeader);
			oDialog1.addContent(centerLayout);
			oDialog1.addButton(new sap.m.Button({
				text: "OK",
				press: function() {
					oDialog1.close();
				}
			}));
			oDialog1.open();

		},

		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */

		/**
		 * Event handler when the share by E-Mail button has been clicked
		 * @public
		 */

		onNewTest: function() {
			MessageToast.show("New Test functionallity will be implemented ");
		},
		onMoreTest: function() {
			MessageToast.show("More Button functionallity will be implemented ");
		},

		oReopen: function() {
			MessageToast.show("Re-open functionallity will be implemented ");
			//var oItem = oEvent.getSource();
		},

		onMoreCR: function() {
			MessageToast.show("More Button functionallity will be implemented ");
		},

		onShareEmailPress: function() {
			var oViewModel = this.getModel("detailView");

			sap.m.URLHelper.triggerEmail(
				null,
				oViewModel.getProperty("/shareSendEmailSubject"),
				oViewModel.getProperty("/shareSendEmailMessage")
			);
		},

		/**
		 * Event handler when the share in JAM button has been clicked
		 * @public
		 */
		onShareInJamPress: function() {
			var oViewModel = this.getModel("detailView"),
				oShareDialog = sap.ui.getCore().createComponent({
					name: "sap.collaboration.components.fiori.sharing.dialog",
					settings: {
						object: {
							id: location.href,
							share: oViewModel.getProperty("/shareOnJamTitle")
						}
					}
				});

			oShareDialog.open();
		},

		/**
		 * Updates the item count within the line item table's header
		 * @param {object} oEvent an event containing the total number of items in the list
		 * @private
		 */
		onListUpdateFinished: function(oEvent) {
			var sTitle,
				iTotalItems = oEvent.getParameter("total"),
				oViewModel = this.getModel("detailView");

			// only update the counter if the length is final
			if (this.byId("lineItemsList").getBinding("items").isLengthFinal()) {
				if (iTotalItems) {
					sTitle = this.getResourceBundle().getText("detailLineItemTableHeadingCount", [iTotalItems]);
				} else {
					//Display 'Line Items' instead of 'Line items (0)'
					sTitle = this.getResourceBundle().getText("detailLineItemTableHeading");
				}
				oViewModel.setProperty("/lineItemListTitle", sTitle);
			}
		},

		/* =========================================================== */
		/* begin: internal methods                                     */
		/* =========================================================== */

		/**
		 * Binds the view to the object path and expands the aggregated line items.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched: function(oEvent) {
			var sObjectId = oEvent.getParameter("arguments").objectId;
			this.getModel().metadataLoaded().then(function() {
				var sObjectPath = this.getModel().createKey("softwareSet", {
					softwareID: sObjectId
				});
				this._bindView("/" + sObjectPath);
			}.bind(this));
		},

		/**
		 * Binds the view to the object path. Makes sure that detail view displays
		 * a busy indicator while data for the corresponding element binding is loaded.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound to the view.
		 * @private
		 */
		_bindView: function(sObjectPath) {
			// Set busy indicator during view binding
			var oViewModel = this.getModel("detailView");

			// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
			oViewModel.setProperty("/busy", false);

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oViewModel.setProperty("/busy", true);
					},
					dataReceived: function() {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		_onBindingChange: function() {
			var oView = this.getView(),
				oElementBinding = oView.getElementBinding();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("detailObjectNotFound");
				// if object could not be found, the selection in the master list
				// does not make sense anymore.
				this.getOwnerComponent().oListSelector.clearMasterListSelection();
				return;
			}

			var sPath = oElementBinding.getPath(),
				oResourceBundle = this.getResourceBundle(),
				oObject = oView.getModel().getObject(sPath),
				sObjectId = oObject.softwareID,
				sObjectName = oObject.SoftwareName,
				oViewModel = this.getModel("detailView");
                
            var oball = this.getView().byId("ballTotal");
			oball.setTotal(formatter.floatValue(this.getView().getModel().getData(sPath).TotalCounter) );    
            
            var oballf = this.getView().byId("ballFraction");
			oballf.setFraction(formatter.floatValue(this.getView().getModel().getData(sPath).DumpsCounter) );  
			
			this.getOwnerComponent().oListSelector.selectAListItem(sPath);

			oViewModel.setProperty("/saveAsTileTitle", oResourceBundle.getText("shareSaveTileAppTitle", [sObjectName]));
			oViewModel.setProperty("/shareOnJamTitle", sObjectName);
			oViewModel.setProperty("/shareSendEmailSubject",
				oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
			oViewModel.setProperty("/shareSendEmailMessage",
				oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
		},

		_onMetadataLoaded: function() {
			// Store original busy indicator delay for the detail view
			var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
				oViewModel = this.getModel("detailView"),
				oLineItemTable = this.byId("lineItemsList"),
				iOriginalLineItemTableBusyDelay = oLineItemTable.getBusyIndicatorDelay();

			// Make sure busy indicator is displayed immediately when
			// detail view is displayed for the first time
			oViewModel.setProperty("/delay", 0);
			oViewModel.setProperty("/lineItemTableDelay", 0);

			oLineItemTable.attachEventOnce("updateFinished", function() {
				// Restore original busy indicator delay for line item table
				oViewModel.setProperty("/lineItemTableDelay", iOriginalLineItemTableBusyDelay);
			});

			// Binding the view will set it to not busy - so the view is always busy if it is not bound
			oViewModel.setProperty("/busy", true);
			// Restore original busy indicator delay for the detail view
			oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
		}

	});

});