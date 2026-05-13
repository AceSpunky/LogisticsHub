sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
    "use strict";

    // ── Mock Data ──────────────────────────────────────────────────────────────

    const aAllDocuments = [
        { id: "DOC-001", name: "CMR FO-L001",              typeLabel: "CMR",                      source: "sap",     sourceLabel: "SAP",     sourceState: "Information", referenceId: "FO-L001",      refSub: "Hamburg → Rotterdam",    uploadedAt: "10 Feb 2024", status: "confirmed", statusLabel: "Confirmed", statusState: "Success", statusIcon: "sap-icon://accept",   canDownload: true,  canUpload: false },
        { id: "DOC-002", name: "Export Declaration DE",    typeLabel: "Export Declaration",        source: "sap",     sourceLabel: "SAP",     sourceState: "Information", referenceId: "SO-2024-0456", refSub: "BASF Corporation",        uploadedAt: "10 Feb 2024", status: "confirmed", statusLabel: "Confirmed", statusState: "Success", statusIcon: "sap-icon://accept",   canDownload: true,  canUpload: false },
        { id: "DOC-003", name: "B/L MSCA123456789",        typeLabel: "Bill of Lading",           source: "cargoo",  sourceLabel: "Cargoo",  sourceState: "Success",     referenceId: "OCN-001",      refSub: "Rotterdam → Singapore",  uploadedAt: "14 Feb 2024", status: "confirmed", statusLabel: "Confirmed", statusState: "Success", statusIcon: "sap-icon://accept",   canDownload: true,  canUpload: false },
        { id: "DOC-004", name: "Commercial Invoice 0456",  typeLabel: "Commercial Invoice",        source: "sap",     sourceLabel: "SAP",     sourceState: "Information", referenceId: "SO-2024-0456", refSub: "BASF Corporation",        uploadedAt: "09 Feb 2024", status: "confirmed", statusLabel: "Confirmed", statusState: "Success", statusIcon: "sap-icon://accept",   canDownload: true,  canUpload: false },
        { id: "DOC-005", name: "CMR FO-L005",              typeLabel: "CMR",                      source: "sap",     sourceLabel: "SAP",     sourceState: "Information", referenceId: "FO-L005",      refSub: "Munich → Bremerhaven",   uploadedAt: "20 Feb 2024", status: "confirmed", statusLabel: "Confirmed", statusState: "Success", statusIcon: "sap-icon://accept",   canDownload: true,  canUpload: false },
        { id: "DOC-006", name: "Export Declaration DE",    typeLabel: "Export Declaration",        source: "sap",     sourceLabel: "SAP",     sourceState: "Information", referenceId: "SO-2024-0461", refSub: "Siemens Energy AG",       uploadedAt: "20 Feb 2024", status: "confirmed", statusLabel: "Confirmed", statusState: "Success", statusIcon: "sap-icon://accept",   canDownload: true,  canUpload: false },
        { id: "DOC-007", name: "B/L HLCU999001234",        typeLabel: "Bill of Lading",           source: "cargoo",  sourceLabel: "Cargoo",  sourceState: "Success",     referenceId: "OCN-002",      refSub: "Bremerhaven → Houston",  uploadedAt: "25 Feb 2024", status: "pending",   statusLabel: "Pending",   statusState: "Warning", statusIcon: "sap-icon://pending",  canDownload: false, canUpload: true  },
        { id: "DOC-008", name: "Commercial Invoice 0461",  typeLabel: "Commercial Invoice",        source: "sap",     sourceLabel: "SAP",     sourceState: "Information", referenceId: "SO-2024-0461", refSub: "Siemens Energy AG",       uploadedAt: "19 Feb 2024", status: "confirmed", statusLabel: "Confirmed", statusState: "Success", statusIcon: "sap-icon://accept",   canDownload: true,  canUpload: false },
        { id: "DOC-009", name: "CMR FO-L009",              typeLabel: "CMR",                      source: "sap",     sourceLabel: "SAP",     sourceState: "Information", referenceId: "FO-L009",      refSub: "Frankfurt → Paris",      uploadedAt: "01 Mar 2024", status: "confirmed", statusLabel: "Confirmed", statusState: "Success", statusIcon: "sap-icon://accept",   canDownload: true,  canUpload: false },
        { id: "DOC-010", name: "CMR FO-L010",              typeLabel: "CMR",                      source: "carrier", sourceLabel: "Carrier", sourceState: "Warning",     referenceId: "FO-L010",      refSub: "Paris → Madrid",         uploadedAt: "05 Mar 2024", status: "confirmed", statusLabel: "Confirmed", statusState: "Success", statusIcon: "sap-icon://accept",   canDownload: true,  canUpload: false },
        { id: "DOC-011", name: "B/L CMDU456789012",        typeLabel: "Bill of Lading",           source: "cargoo",  sourceLabel: "Cargoo",  sourceState: "Success",     referenceId: "OCN-004",      refSub: "Rotterdam → Los Angeles",uploadedAt: "08 Mar 2024", status: "missing",   statusLabel: "Missing",   statusState: "Error",   statusIcon: "sap-icon://alert",    canDownload: false, canUpload: true  },
        { id: "DOC-012", name: "Import Declaration US",    typeLabel: "Import Declaration",        source: "manual",  sourceLabel: "Manual",  sourceState: "None",        referenceId: "SO-2024-0489", refSub: "Shell Energy Europe",     uploadedAt: "10 Mar 2024", status: "pending",   statusLabel: "Pending",   statusState: "Warning", statusIcon: "sap-icon://pending",  canDownload: false, canUpload: true  },
        { id: "DOC-013", name: "DGD FO-L014",              typeLabel: "Dangerous Goods Decl.",    source: "sap",     sourceLabel: "SAP",     sourceState: "Information", referenceId: "FO-L014",      refSub: "Amsterdam → Rotterdam",  uploadedAt: "09 Mar 2024", status: "confirmed", statusLabel: "Confirmed", statusState: "Success", statusIcon: "sap-icon://accept",   canDownload: true,  canUpload: false },
        { id: "DOC-014", name: "Packing List 0492",        typeLabel: "Packing List",             source: "sap",     sourceLabel: "SAP",     sourceState: "Information", referenceId: "SO-2024-0492", refSub: "Henkel AG",               uploadedAt: "11 Mar 2024", status: "confirmed", statusLabel: "Confirmed", statusState: "Success", statusIcon: "sap-icon://accept",   canDownload: true,  canUpload: false },
        { id: "DOC-015", name: "SWB COSCO789012345",       typeLabel: "Sea Waybill",              source: "cargoo",  sourceLabel: "Cargoo",  sourceState: "Success",     referenceId: "OCN-005",      refSub: "Rotterdam → Shanghai",   uploadedAt: "12 Mar 2024", status: "confirmed", statusLabel: "Confirmed", statusState: "Success", statusIcon: "sap-icon://accept",   canDownload: true,  canUpload: false }
    ];

    const oInitialModel = {
        statusCards: [
            { value: "all",       label: "All Documents",  count: "15", state: "None"    },
            { value: "confirmed", label: "Confirmed",      count: "12", state: "Success" },
            { value: "pending",   label: "Pending Review", count: "2",  state: "Warning" },
            { value: "missing",   label: "Missing",        count: "1",  state: "Error"   }
        ],
        sourceFilterActive: {
            sap:     false,
            cargoo:  false,
            carrier: false,
            manual:  false
        },
        allDocuments:      aAllDocuments,
        filteredDocuments: aAllDocuments,
        statusFilter:      "all",
        sourceFilter:      "",
        searchQuery:       ""
    };

    // ── Controller ─────────────────────────────────────────────────────────────

    return Controller.extend("com.lipton.logisticshub.controller.DocumentHub", {

        /**
         * Initializes the DocumentHub controller and binds the document model to the view.
         * @memberof com.lipton.logisticshub.controller.DocumentHub
         * @public
         * @returns {void}
         */
        onInit() {
            const oModel = new JSONModel(oInitialModel);
            this.getView().setModel(oModel, "docHub");

        },

        // ── Status tile press → filter table by status ───────────────────────
        /**
         * Handles a status card press and filters the document table by the selected status value.
         * @memberof com.lipton.logisticshub.controller.DocumentHub
         * @public
         * @param {sap.ui.base.Event} oEvent - The press event from the status card control
         * @returns {void}
         */
        onStatusCardPress(oEvent) {
            const sFilter = oEvent.getSource().data("statusFilter");
            this.getView().getModel("docHub").setProperty("/statusFilter", sFilter);
            this._applyFilters();
        },

        // ── Source ObjectStatus (inverted) press → toggle source filter ────────
        /**
         * Toggles the active source filter when a source ObjectStatus chip is pressed.
         * Pressing the already-active source clears the filter; pressing a different source switches to it.
         * @memberof com.lipton.logisticshub.controller.DocumentHub
         * @public
         * @param {sap.ui.base.Event} oEvent - The press event from the source filter control
         * @returns {void}
         */
        onSourceFilterPress(oEvent) {
            const oStatus = oEvent.getSource();
            const sSource = oStatus.data("source");
            const oModel = this.getView().getModel("docHub");
            const bCurrentlyActive = oModel.getProperty("/sourceFilterActive/" + sSource);

            // Reset all source filters then toggle the pressed one (or clear if already active)
            oModel.setProperty("/sourceFilterActive", { sap: false, cargoo: false, carrier: false, manual: false });

            if (!bCurrentlyActive) {
                oModel.setProperty("/sourceFilterActive/" + sSource, true);
                oModel.setProperty("/sourceFilter", sSource);
            } else {
                oModel.setProperty("/sourceFilter", "");
            }
            this._applyFilters();
        },

        // ── Search field live change ───────────────────────────────────────────
        /**
         * Handles live changes in the document search field and re-applies all active filters.
         * @memberof com.lipton.logisticshub.controller.DocumentHub
         * @public
         * @param {sap.ui.base.Event} oEvent - The liveChange event from the SearchField control
         * @returns {void}
         */
        onDocSearch(oEvent) {
            this.getView().getModel("docHub").setProperty("/searchQuery", oEvent.getParameter("newValue"));
            this._applyFilters();
        },

        // ── Action buttons ────────────────────────────────────────────────────
        /**
         * Handles the download action for a document row.
         * @memberof com.lipton.logisticshub.controller.DocumentHub
         * @public
         * @param {sap.ui.base.Event} oEvent - The press event from the download button
         * @returns {void}
         */
        onDocDownload(oEvent) {
            const sId = oEvent.getSource().data("docId");
            MessageToast.show("Downloading " + sId + "…");
        },

        /**
         * Handles the upload action for a document row, opening the upload dialog.
         * @memberof com.lipton.logisticshub.controller.DocumentHub
         * @public
         * @param {sap.ui.base.Event} oEvent - The press event from the upload button
         * @returns {void}
         */
        onDocUpload(oEvent) {
            const sId = oEvent.getSource().data("docId");
            MessageToast.show("Opening upload dialog for " + sId + "…");
        },

        /**
         * Opens the document in its originating source system.
         * @memberof com.lipton.logisticshub.controller.DocumentHub
         * @public
         * @param {sap.ui.base.Event} oEvent - The press event from the open source button
         * @returns {void}
         */
        onDocOpenSource(oEvent) {
            const sId = oEvent.getSource().data("docId");
            MessageToast.show("Opening " + sId + " in source system…");
        },

        // ── Private: combine all active filters and rebuild filteredDocuments ──
        /**
         * Combines the active status, source, and search query filters and updates
         * the filteredDocuments array in the model.
         * @memberof com.lipton.logisticshub.controller.DocumentHub
         * @private
         * @returns {void}
         */
        _applyFilters() {
            const oModel = this.getView().getModel("docHub");
            const sStatusFilter = oModel.getProperty("/statusFilter");
            const sSourceFilter = oModel.getProperty("/sourceFilter");
            const sQuery        = (oModel.getProperty("/searchQuery") || "").toLowerCase();

            let aFiltered = aAllDocuments;

            if (sStatusFilter && sStatusFilter !== "all") {
                aFiltered = aFiltered.filter(d => d.status === sStatusFilter);
            }
            if (sSourceFilter) {
                aFiltered = aFiltered.filter(d => d.source === sSourceFilter);
            }
            if (sQuery) {
                aFiltered = aFiltered.filter(d =>
                    d.name.toLowerCase().includes(sQuery)        ||
                    d.referenceId.toLowerCase().includes(sQuery) ||
                    d.refSub.toLowerCase().includes(sQuery)      ||
                    d.typeLabel.toLowerCase().includes(sQuery)
                );
            }

            oModel.setProperty("/filteredDocuments", aFiltered);
        }
    });
});
