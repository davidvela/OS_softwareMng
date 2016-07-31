/*global location */
sap.ui.define([
		"so/mng /controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"so/mng /model/formatter",
	    "sap/m/MessageToast"
	    ], function (BaseController, JSONModel, formatter , MessageToast ) {
		"use strict";

		return BaseController.extend("so.mng .controller.Detail", {

			formatter: formatter,

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			onInit : function () {
				// Model used to manipulate control states. The chosen values make sure,
				// detail page is busy indication immediately so there is no break in
				// between the busy indication for loading the view's meta data
				var oViewModel = new JSONModel({
					busy : false,
					delay : 0,
					lineItemListTitle : this.getResourceBundle().getText("detailLineItemTableHeading")
				});

				this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);

				this.setModel(oViewModel, "detailView");

				this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
				
				/***************************************************************/
				/* VIZ GRAPHIC		                                           */
				/***************************************************************/

	            /*
	            ,
	     'sap/viz/ui5/controls/common/feeds/FeedItem',
        'sap/viz/ui5/data/FlattenedDataset',
        'sap/viz/ui5/format/ChartFormatter'
	            FeedItem, FlattenedDataset, ChartFormatter 
	            var oVizFrame = this.getView().byId("idVizFrameColumn");
            	oVizFrame.setVizType('column');
            	oVizFrame.setUiConfig({          "applicationSet": "fiori"           });
				
				var oDataset = new sap.viz.ui5.data.FlattenedDataset({
					'dimensions' : [{ 'name' : 'Date',		'value' : "{Date}"		}],
					'measures'   : [{ 'name' : 'Acess',  'value' : '{Type}'   }],
					              '   data' : {  'path' : "/StatSet"             }				}).bindData("/StatSet");
				
				// create a VizFrame
				//var oVizFrame = new sap.viz.ui5.controls.VizFrame({
				//	'uiConfig' : {	          oVizFrame.setVizType('column');
				//	'vizType' : 'bar' 	//Supported chart types: bubble, combination, column, bar, line, stacked_bar, stacked_column, bullet, vertical_bullet, timebubble.
				//});				
		
				oVizFrame.setDataset(oDataset);
				var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid' : "primaryValues",
					'type' : "Measure",
					'values' : ["Type"]
				}), feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
					'uid' : "axisLabels",
					'type' : "Dimension",
					'values' : ["Date"]
				});
		
				oVizFrame.addFeed(feedPrimaryValues);
				oVizFrame.addFeed(feedAxisLabels);
		
				oVizFrame.attachSelectData(function(event) {
					var data = event.getParameter('data');
					for (var i = 0; i < data.length; i++) {
						//console.log(oDataset.findContext(data[i].data));
					}
				});
		
				var properties = {		'legend' : {'visible' : true} };
				var scales = [{	'feed': 'primaryValues',	'palette': ['#ff0000']			}];
		
				var customizations = {id:"sap.viz.custom",customOverlayProperties: {}};
				oVizFrame.setVizScales(scales);
				oVizFrame.vizUpdate({ //'data' : data,
					'properties' : properties,	'scales' : scales,	'customizations' : customizations
					//'feeds' : feeds
				});*/
			},
			
			onShowLink : function(oEvent) {
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
                
                var oText = new sap.m.Text({ text: oRsc.Link });
                var oText2 = new sap.m.Text( );
                
                var  oLink2 = new sap.m.Link("l2");
    			oLink2.setText("Link to URL");
    			oLink2.setTooltip("Target: _blank");
    			oLink2.setHref( oRsc.Link );
    			oLink2.setTarget("_blank");
                
                var centerLayout = new sap.m.VBox( );
            		centerLayout.setAlignItems("Center");
            		centerLayout.setJustifyContent("Center");
                centerLayout.addItem(oText);
                
                switch(oRsc.Type) {
                case "picture":
                    oText2.setText("picture");
                    var oPic = new sap.m.Image({src:  oRsc.Link }); //, width : "800px" , height : "600px"});
                    centerLayout.addItem(oLink2);
                    centerLayout.addItem(oPic);
                    break;
                case "video":
                    oText2.setText("video");
                    var html = new sap.ui.core.HTML();  
                    var oString = "<div id=\"divPdf\"><iframe id='vidFrame' src = '"+ oRsc.Link +"width= '800px' height= '200' ></iframe>";
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
				oDialog1.addButton(new sap.m.Button({text: "OK", press:function(){    
				    $("#vidFrame").attr("src", "");
				    oDialog1.close();}}));
				oDialog1.open();

			
			},
			
			showTeamDialog: function(oEvent) {

				/*this._Dialog = sap.ui.xmlfragment("OpenSAPBPL.fragments.Dialog", this);
				oEvent.getSource().addDependent(this._Dialog);
				this._Dialog.open();*/
				
				//var playerPath = oEvent.getSource().getParent().getBindingContext().getPath();
				//var playerName = oEvent.getSource().getBindingContext().getModel().getData(playerPath).PlayerName;
				/*var playerName = oEvent.getSource().getBindingContext().getModel().getData(playerPath).PlayerName;
				var injuryStatus = oEvent.getSource().getBindingContext().getModel().getData(playerPath+ "/Injured").Injury;
				if (!injuryStatus){
				var selectStatus = oEvent.getSource().getBindingContext().getModel().getData(playerPath).Selected;
				var teamPath = this.getView().getBindingContext().getPath();
				var count = this.getView().getBindingContext().getModel().getData(teamPath).SelectedPlayers;
				if (selectStatus) {
				    
				<VBox>
                <ObjectHeader title="{PlayerName}" number="{Position}" numberUnit="{Nationality}">
                    <attributes>
                        <ObjectAttribute text="Number: {Number}"/>
                        <ObjectAttribute text="Foot: {Foot}"/>
                    </attributes>
                </ObjectHeader>
                </VBox>
                
                <VBox>
                    <HBox width="90%">
                        <Text text="{Description}"/>
                        <Image src="{Image}" width="100px"/>
                    </HBox>
                    <HBox>
                        <Input type="Text" value="{PlayerNote}"/>
                        <Button text="Change Note" press="playerNoteEdit"/>
                    </HBox>
                </VBox>
                
                <VBox>
                <Label text="Selected?"></Label>
                <Switch customTextOn="Yes" customTextOff="No" change="onSelectPlayer" state="{Selected}"/>
                </VBox>    
			    
			        object header - icon - name 
			        position, phone and email  
			                
			    */
					
				var oDialog1 = new sap.m.Dialog();
				oDialog1.setTitle("Team Member");
				//var oText = new sap.m.Text({ text: "Hello World!"});
                
                var teamPath = oEvent.getSource().getBindingContext().getPath();
				var oTeam = oEvent.getSource().getBindingContext().getModel().getData(teamPath);
                
                var oHeader = new sap.m.ObjectHeader(); 
                oHeader.setTitle(oTeam.TeamMember);
                oHeader.insertAttribute(new sap.m.ObjectAttribute({text: oTeam.Phone, title: "Tlf" }),   0);
                oHeader.insertAttribute(new sap.m.ObjectAttribute({text: oTeam.Email, title: "email" }), 0);
                oHeader.insertAttribute(new sap.m.ObjectAttribute({ text: oTeam.Role, title: "Role"}),   0);

              //  oHeader.setIcon(oTeam.Picture);
                var oPic = new sap.m.Image({src:  oTeam.Picture, width : "200px" , height:"200px" });
                
                
                var centerLayout = new sap.m.VBox( );
            	centerLayout.setAlignItems("Center");
                centerLayout.setJustifyContent("Center");
                centerLayout.addItem(oHeader);
                centerLayout.addItem(oPic);

				//oDialog1.addContent(oHeader);
				oDialog1.addContent(centerLayout);
				oDialog1.addButton(new sap.m.Button({text: "OK", press:function(){oDialog1.close();}}));
				oDialog1.open();

				
			},
			




			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */

			/**
			 * Event handler when the share by E-Mail button has been clicked
			 * @public
			 */
			 
			 			
			onNewTest  : function() {
				MessageToast.show("New Test functionallity will be implemented ");
			},
			onMoreTest  : function() {
				MessageToast.show("More Button functionallity will be implemented ");
			},
			
			oReopen  : function() {
				MessageToast.show("Re-open functionallity will be implemented ");
			},
			
			onClose  : function() {
				MessageToast.show("Edit functionallity will be implemented ");
			},
			
			onMoreCR  : function() {
				MessageToast.show("More Button functionallity will be implemented ");
			},
			

			onShareEmailPress : function () {
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
			onShareInJamPress : function () {
				var oViewModel = this.getModel("detailView"),
					oShareDialog = sap.ui.getCore().createComponent({
						name : "sap.collaboration.components.fiori.sharing.dialog",
						settings : {
							object :{
								id : location.href,
								share : oViewModel.getProperty("/shareOnJamTitle")
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
			onListUpdateFinished : function (oEvent) {
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
			_onObjectMatched : function (oEvent) {
				var sObjectId =  oEvent.getParameter("arguments").objectId;
				this.getModel().metadataLoaded().then( function() {
					var sObjectPath = this.getModel().createKey("softwareSet", {
						softwareID :  sObjectId
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
			_bindView : function (sObjectPath) {
				// Set busy indicator during view binding
				var oViewModel = this.getModel("detailView");

				// If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
				oViewModel.setProperty("/busy", false);

				this.getView().bindElement({
					path : sObjectPath,
					events: {
						change : this._onBindingChange.bind(this),
						dataRequested : function () {
							oViewModel.setProperty("/busy", true);
						},
						dataReceived: function () {
							oViewModel.setProperty("/busy", false);
						}
					}
				});
			},

			_onBindingChange : function () {
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

				this.getOwnerComponent().oListSelector.selectAListItem(sPath);

				oViewModel.setProperty("/saveAsTileTitle",oResourceBundle.getText("shareSaveTileAppTitle", [sObjectName]));
				oViewModel.setProperty("/shareOnJamTitle", sObjectName);
				oViewModel.setProperty("/shareSendEmailSubject",
					oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
				oViewModel.setProperty("/shareSendEmailMessage",
					oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
			},

			_onMetadataLoaded : function () {
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

	}
);