sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller, JSONModel, History, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("com.lipton.logisticshub.controller.OceanBookingCreate", {
        /**
         * Initializes the OceanBookingCreate controller, sets up the booking model,
         * and attaches a pattern-matched handler to reset the form on each navigation.
         * @memberof com.lipton.logisticshub.controller.OceanBookingCreate
         * @public
         * @returns {void}
         */
        onInit() {
            const oModel = new JSONModel({
                delegateEnabled: false,
                documents: []
            });
            this.getView().setModel(oModel, "bookingCreate");

            this.getOwnerComponent().getRouter()
                .getRoute("OceanBookingCreate")
                .attachPatternMatched(this._onRouteMatched, this);
        },

        /**
         * Called when the OceanBookingCreate route is matched; resets the booking form.
         * @memberof com.lipton.logisticshub.controller.OceanBookingCreate
         * @private
         * @returns {void}
         */
        _onRouteMatched() {
            const oBooking = this.getOwnerComponent()._pendingBooking;
            if (oBooking) {
                this._populateForm(oBooking);
            } else {
                this._resetForm();
            }
        },

        /**
         * Resets all form controls to their default state, clearing value states,
         * resetting the container count, and deselecting radio groups and checkboxes.
         * @memberof com.lipton.logisticshub.controller.OceanBookingCreate
         * @private
         * @returns {void}
         */
        _resetForm() {
            this.byId("ratesConsumerSelect").setSelectedKey("");
            this.byId("departureWindowPicker").setDateValue(null);
            this.byId("departureWindowPicker").setSecondDateValue(null);
            this.byId("placeOfReceiptCombo").setValue("");
            this.byId("finalDestinationCombo").setValue("");
            this.byId("commodityCombo").setValue("");
            this.byId("hsCodeInput").setValue("");
            this.byId("portOfLoadingCombo").setValue("");
            this.byId("portOfDischargeCombo").setValue("");
            this.byId("articleDescInput").setValue("");
            this.byId("weightInput").setValue("");
            this.byId("containerTypeCombo").setValue("");
            this.byId("delegateToCombo").setValue("");
            this.byId("emailsInput").removeAllTokens();
            this.byId("containersInput").setValue(1);
            this.byId("socCheckbox").setSelected(false);
            this.byId("movTypeFCLFCL").setSelected(true);
            this.byId("movTypeLCLFCL").setSelected(false);
            this.byId("movTypeLCLLCL").setSelected(false);
            this.byId("flowRadioGroup").setSelectedIndex(0);
            const oModel = this.getView().getModel("bookingCreate");
            oModel.setProperty("/delegateEnabled", false);
            oModel.setProperty("/documents", []);
            [
                "ratesConsumerSelect", "departureWindowPicker", "placeOfReceiptCombo",
                "finalDestinationCombo", "commodityCombo", "hsCodeInput", "portOfLoadingCombo",
                "portOfDischargeCombo", "articleDescInput", "weightInput", "containerTypeCombo",
                "delegateToCombo", "emailsInput"
            ].forEach(sId => {
                const oCtrl = this.byId(sId);
                if (oCtrl && oCtrl.setValueState) { oCtrl.setValueState("None"); }
            });
        },

        _populateForm(oBooking) {
            const mRatesKeys = {
                "Shipper Demo": "shipperDemo",
                "Carrier Group A": "carrierGroupA",
                "Trade Partner B": "tradePartnerB"
            };
            this.byId("ratesConsumerSelect").setSelectedKey(mRatesKeys[oBooking.ratesConsumer] || "");

            const oPicker = this.byId("departureWindowPicker");
            oPicker.setDateValue(new Date(oBooking.departureDateFrom));
            oPicker.setSecondDateValue(new Date(oBooking.departureDateTo));
            oPicker.setValueState("None");

            this.byId("placeOfReceiptCombo").setValue(oBooking.placeOfReceipt || "");
            this.byId("finalDestinationCombo").setValue(oBooking.finalDestination || "");
            this.byId("commodityCombo").setValue(oBooking.commodity || "");
            this.byId("portOfLoadingCombo").setValue(oBooking.portOfLoading || "");
            this.byId("portOfDischargeCombo").setValue(oBooking.portOfDischarge || "");
            this.byId("containerTypeCombo").setValue(oBooking.containerType || "");
            this.byId("hsCodeInput").setValue(oBooking.hsCode || "");
            this.byId("articleDescInput").setValue(oBooking.articleDescription || "");
            this.byId("weightInput").setValue(oBooking.weight || "");
            this.byId("containersInput").setValue(parseInt(oBooking.containerCount, 10) || 1);
            this.byId("socCheckbox").setSelected(oBooking.soc || false);

            this.byId("movTypeFCLFCL").setSelected(oBooking.movementType === "FCL/FCL");
            this.byId("movTypeLCLFCL").setSelected(oBooking.movementType === "LCL/FCL");
            this.byId("movTypeLCLLCL").setSelected(oBooking.movementType === "LCL/LCL");

            this.byId("delegateToCombo").setValue("");
            this.byId("emailsInput").removeAllTokens();
            this.byId("flowRadioGroup").setSelectedIndex(0);
            const oModel = this.getView().getModel("bookingCreate");
            oModel.setProperty("/delegateEnabled", false);
            oModel.setProperty("/documents", oBooking.documents || []);

            [
                "ratesConsumerSelect", "placeOfReceiptCombo", "finalDestinationCombo",
                "commodityCombo", "hsCodeInput", "portOfLoadingCombo", "portOfDischargeCombo",
                "articleDescInput", "weightInput", "containerTypeCombo"
            ].forEach(sId => {
                const oCtrl = this.byId(sId);
                if (oCtrl && oCtrl.setValueState) { oCtrl.setValueState("None"); }
            });
        },

        /**
         * Navigates back to the previous page in history, or to the OceanBooking
         * list route if there is no navigation history.
         * @memberof com.lipton.logisticshub.controller.OceanBookingCreate
         * @public
         * @returns {void}
         */
        onNavBack() {
            const sPreviousHash = History.getInstance().getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent().getRouter().navTo("OceanBooking");
            }
        },

        /**
         * Handles flow type selection (Self/Delegate) and toggles the delegate
         * input section visibility in the model.
         * @memberof com.lipton.logisticshub.controller.OceanBookingCreate
         * @public
         * @param {sap.ui.base.Event} oEvent - The select event from the RadioButtonGroup control
         * @returns {void}
         */
        onFlowSelect(oEvent) {
            const sText = oEvent.getParameter("selectedButton").getText();
            const bDelegate = sText === "Delegate";
            this.getView().getModel("bookingCreate").setProperty("/delegateEnabled", bDelegate);
        },

        /**
         * Opens the Add Item panel to add a new cargo line item to the booking.
         * @memberof com.lipton.logisticshub.controller.OceanBookingCreate
         * @public
         * @returns {void}
         */
        onAddItem() {
            MessageToast.show("Add Item panel will open here.");
        },

        /**
         * Opens the Link Order Item dialog to associate a sales order item with the booking.
         * @memberof com.lipton.logisticshub.controller.OceanBookingCreate
         * @public
         * @returns {void}
         */
        onLinkOrderItem() {
            MessageToast.show("Link Order Item dialog will open here.");
        },

        /**
         * Adds an additional container type row to the booking cargo section.
         * @memberof com.lipton.logisticshub.controller.OceanBookingCreate
         * @public
         * @returns {void}
         */
        onAddContainerType() {
            MessageToast.show("Additional container type row added.");
        },

        /**
         * Expands the carrier haulage details section of the booking form.
         * @memberof com.lipton.logisticshub.controller.OceanBookingCreate
         * @public
         * @returns {void}
         */
        onShowCarrierHaulage() {
            MessageToast.show("Carrier haulage details expanded.");
        },

        /**
         * Handles token update events on the email input field for delegate notification addresses.
         * @memberof com.lipton.logisticshub.controller.OceanBookingCreate
         * @public
         * @param {sap.ui.base.Event} oEvent - The tokenUpdate event from the MultiInput control
         * @returns {void}
         */
        onEmailTokenUpdate(oEvent) {
            // Token validation logic can be added here
        },

        onDownloadDocument(oEvent) {
            const oCtx = oEvent.getSource().getBindingContext("bookingCreate");
            const sName = oCtx.getProperty("description");
            MessageToast.show(`Downloading: ${sName}`);
        },

        /**
         * Validates required fields and triggers a carrier availability search for the booking.
         * @memberof com.lipton.logisticshub.controller.OceanBookingCreate
         * @public
         * @returns {void}
         */
        onCarrierSearch() {
            if (!this._validateRequiredFields()) {
                MessageBox.warning("Please fill in all required fields before searching for carriers.");
                return;
            }
            MessageToast.show("Searching for available carriers…");
        },

        /**
         * Validates required fields and submits the ocean booking after user confirmation.
         * Navigates back to the OceanBooking list on success.
         * @memberof com.lipton.logisticshub.controller.OceanBookingCreate
         * @public
         * @returns {void}
         */
        onSubmitBooking() {
            if (!this._validateRequiredFields()) {
                MessageBox.error("Please fill in all required fields before submitting.");
                return;
            }
            MessageBox.confirm("Are you sure you want to submit this booking?", {
                onClose: (sAction) => {
                    if (sAction === MessageBox.Action.OK) {
                        MessageToast.show("Booking submitted successfully.");
                        this.getOwnerComponent().getRouter().navTo("OceanBooking");
                    }
                }
            });
        },

        /**
         * Prompts the user to confirm discarding the current booking and navigates back on confirmation.
         * @memberof com.lipton.logisticshub.controller.OceanBookingCreate
         * @public
         * @returns {void}
         */
        onCancel() {
            MessageBox.confirm("Discard this booking and go back?", {
                onClose: (sAction) => {
                    if (sAction === MessageBox.Action.OK) {
                        this.onNavBack();
                    }
                }
            });
        },

        /**
         * Validates all required form fields, setting error value states on empty controls.
         * @memberof com.lipton.logisticshub.controller.OceanBookingCreate
         * @private
         * @returns {boolean} <code>true</code> if all required fields are filled, <code>false</code> otherwise
         */
        _validateRequiredFields() {
            let bValid = true;
            const aRequiredIds = [
                "ratesConsumerSelect",
                "placeOfReceiptCombo",
                "finalDestinationCombo",
                "commodityCombo",
                "hsCodeInput",
                "portOfDischargeCombo",
                "articleDescInput",
                "weightInput",
                "containerTypeCombo",
                "emailsInput"
            ];
            aRequiredIds.forEach(sId => {
                const oControl = this.byId(sId);
                if (!oControl) { return; }
                const sValue = oControl.getValue ? oControl.getValue() : oControl.getSelectedKey();
                if (!sValue || sValue.trim() === "") {
                    if (oControl.setValueState) {
                        oControl.setValueState("Error");
                        oControl.setValueStateText("This field is required.");
                    }
                    bValid = false;
                } else {
                    if (oControl.setValueState) {
                        oControl.setValueState("None");
                    }
                }
            });

            const oPicker = this.byId("departureWindowPicker");
            if (!oPicker.getDateValue()) {
                oPicker.setValueState("Error");
                oPicker.setValueStateText("Please select a departure window.");
                bValid = false;
            } else {
                oPicker.setValueState("None");
            }

            return bValid;
        }
    });
});
