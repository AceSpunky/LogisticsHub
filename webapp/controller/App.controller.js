sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller, Fragment, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("com.lipton.logisticshub.controller.App", {
        /**
         * Initializes the App controller and attaches route pattern-matched handlers
         * to synchronize the side navigation selected item with the active route.
         * @memberof com.lipton.logisticshub.controller.App
         * @public
         * @returns {void}
         */
        onInit() {
            const oRouter = this.getOwnerComponent().getRouter();
            const mRouteToItem = {
                "Dashboard":          "dashboardItem",
                "SOSTOTracker":       "soStoTrackerItem",
                "FUFOOptimizer":      "fuFoOptimizerItem",
                "DocumentHub":        "documentHubItem",
                "Integrations":       "integrationsItem",
                "OceanBooking":         "oceanBookingItem",
                "OceanBookingCreate":   "oceanBookingItem",
                "LaneDocumentUpload":   "laneDocUploadItem"
            };

            Object.entries(mRouteToItem).forEach(([sRoute, sItemId]) => {
                oRouter.getRoute(sRoute).attachPatternMatched(() => {
                    this.byId("sideNavigation").setSelectedItem(this.byId(sItemId));
                }, this);
            });
        },

        /**
         * Toggles the expanded state of the side navigation panel.
         * @memberof com.lipton.logisticshub.controller.App
         * @public
         * @returns {void}
         */
        onMenuButtonPress() {
            const oToolPage = this.byId("toolPage");
            oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
        },

        /**
         * Navigates to the route for the selected nav item, or opens a dialog
         * when the item does not correspond to a routed view.
         * @memberof com.lipton.logisticshub.controller.App
         * @public
         * @param {sap.ui.base.Event} oEvent - The selection change event from the SideNavigation control
         * @returns {void}
         */
        onNavigationItemSelect(oEvent) {
            const sKey = oEvent.getParameter("item").getKey();

            if (sKey === "MasterDataUpload") {
                this._openMasterDataUploadDialog();
                return;
            }

            this.getOwnerComponent().getRouter().navTo(sKey);
        },

        /**
         * Lazily loads and opens the Master Data Upload dialog.
         * @memberof com.lipton.logisticshub.controller.App
         * @private
         * @returns {void}
         */
        _openMasterDataUploadDialog() {
            if (!this._oMasterDataUploadDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "com.lipton.logisticshub.view.fragment.MasterDataUploadDialog",
                    controller: this
                }).then((oDialog) => {
                    this._oMasterDataUploadDialog = oDialog;
                    this.getView().addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                this._oMasterDataUploadDialog.open();
            }
        },

        /**
         * Validates inputs and submits the master data file for processing.
         * @memberof com.lipton.logisticshub.controller.App
         * @public
         * @returns {void}
         */
        onMasterDataUploadSubmit() {
            const oSelect = this.byId("masterDataTypeSelect");
            const oFileUploader = this.byId("masterDataFileUploader");

            const sDataType = oSelect.getSelectedItem()?.getText();
            const sFileName = oFileUploader.getValue();

            if (!sFileName) {
                MessageBox.warning("Please select a file before submitting.");
                return;
            }

            MessageToast.show(`Uploading "${sFileName}" as ${sDataType}...`);
            oFileUploader.setValue("");
            this._oMasterDataUploadDialog.close();
        },

        /**
         * Closes the Master Data Upload dialog.
         * @memberof com.lipton.logisticshub.controller.App
         * @public
         * @returns {void}
         */
        onMasterDataUploadClose() {
            this._oMasterDataUploadDialog.close();
        }
    });
});
