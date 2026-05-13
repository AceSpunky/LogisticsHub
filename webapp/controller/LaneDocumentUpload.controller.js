sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
], (Controller, JSONModel, MessageToast, MessageBox, Fragment) => {
    "use strict";

    const mDocuments = {
        "33532": [
            { docId: "D001", docName: "Commercial Invoice", docDescription: "Invoice for shipment value declaration", docType: "Invoice", icon: "sap-icon://pdf-attachment", uploadedBy: "Anna K.", uploadedOn: "2025-01-10", status: "Approved", statusState: "Success", fileSize: "312 KB" },
            { docId: "D002", docName: "Bill of Lading", docDescription: "Transport document and title of goods", docType: "Bill of Lading", icon: "sap-icon://pdf-attachment", uploadedBy: "Peter M.", uploadedOn: "2025-01-12", status: "Approved", statusState: "Success", fileSize: "180 KB" },
            { docId: "D003", docName: "Packing List", docDescription: "Detailed itemisation of shipment contents", docType: "Packing List", icon: "sap-icon://excel-attachment", uploadedBy: "Anna K.", uploadedOn: "2025-01-10", status: "Pending Review", statusState: "Warning", fileSize: "95 KB" }
        ],
        "33527": [
            { docId: "D004", docName: "Commercial Invoice", docDescription: "Invoice for shipment value declaration", docType: "Invoice", icon: "sap-icon://pdf-attachment", uploadedBy: "Anna K.", uploadedOn: "2025-02-05", status: "Approved", statusState: "Success", fileSize: "298 KB" },
            { docId: "D005", docName: "Certificate of Origin", docDescription: "Certifies country of manufacture", docType: "Certificate", icon: "sap-icon://pdf-attachment", uploadedBy: "Jan W.", uploadedOn: "2025-02-06", status: "Approved", statusState: "Success", fileSize: "140 KB" }
        ],
        "33525": [
            { docId: "D006", docName: "Commercial Invoice", docDescription: "Invoice for shipment value declaration", docType: "Invoice", icon: "sap-icon://pdf-attachment", uploadedBy: "Anna K.", uploadedOn: "2025-02-10", status: "Approved", statusState: "Success", fileSize: "310 KB" },
            { docId: "D007", docName: "Packing List", docDescription: "Detailed itemisation of shipment contents", docType: "Packing List", icon: "sap-icon://excel-attachment", uploadedBy: "Anna K.", uploadedOn: "2025-02-10", status: "Approved", statusState: "Success", fileSize: "88 KB" },
            { docId: "D008", docName: "Customs Declaration", docDescription: "Goods declaration for customs clearance", docType: "Customs", icon: "sap-icon://word-attachment", uploadedBy: "Marie D.", uploadedOn: "2025-02-11", status: "Approved", statusState: "Success", fileSize: "220 KB" }
        ],
        "33513": [
            { docId: "D009", docName: "Bill of Lading", docDescription: "Transport document and title of goods", docType: "Bill of Lading", icon: "sap-icon://pdf-attachment", uploadedBy: "Peter M.", uploadedOn: "2025-03-01", status: "Approved", statusState: "Success", fileSize: "175 KB" },
            { docId: "D010", docName: "Commercial Invoice", docDescription: "Invoice for shipment value declaration", docType: "Invoice", icon: "sap-icon://pdf-attachment", uploadedBy: "Anna K.", uploadedOn: "2025-03-01", status: "Approved", statusState: "Success", fileSize: "305 KB" }
        ],
        "33437": [
            { docId: "D011", docName: "Bill of Lading", docDescription: "Transport document and title of goods", docType: "Bill of Lading", icon: "sap-icon://pdf-attachment", uploadedBy: "Peter M.", uploadedOn: "2025-03-15", status: "Approved", statusState: "Success", fileSize: "182 KB" },
            { docId: "D012", docName: "Packing List", docDescription: "Detailed itemisation of shipment contents", docType: "Packing List", icon: "sap-icon://excel-attachment", uploadedBy: "Anna K.", uploadedOn: "2025-03-15", status: "Approved", statusState: "Success", fileSize: "92 KB" },
            { docId: "D013", docName: "Insurance Certificate", docDescription: "Cargo insurance coverage document", docType: "Insurance", icon: "sap-icon://pdf-attachment", uploadedBy: "Jan W.", uploadedOn: "2025-03-16", status: "Pending Review", statusState: "Warning", fileSize: "410 KB" }
        ],
        "23250": [
            { docId: "D014", docName: "Commercial Invoice", docDescription: "Invoice for shipment value declaration", docType: "Invoice", icon: "sap-icon://pdf-attachment", uploadedBy: "Marie D.", uploadedOn: "2025-01-20", status: "Approved", statusState: "Success", fileSize: "290 KB" },
            { docId: "D015", docName: "Certificate of Origin", docDescription: "Certifies country of manufacture", docType: "Certificate", icon: "sap-icon://pdf-attachment", uploadedBy: "Jan W.", uploadedOn: "2025-01-21", status: "Approved", statusState: "Success", fileSize: "135 KB" }
        ],
        "20903": [
            { docId: "D016", docName: "Bill of Lading", docDescription: "Transport document and title of goods", docType: "Bill of Lading", icon: "sap-icon://pdf-attachment", uploadedBy: "Peter M.", uploadedOn: "2025-04-02", status: "Approved", statusState: "Success", fileSize: "177 KB" },
            { docId: "D017", docName: "Customs Declaration", docDescription: "Goods declaration for customs clearance", docType: "Customs", icon: "sap-icon://word-attachment", uploadedBy: "Marie D.", uploadedOn: "2025-04-03", status: "Pending Review", statusState: "Warning", fileSize: "215 KB" }
        ],
        "20885": [
            { docId: "D018", docName: "BSC Form", docDescription: "Bordereau de Suivi des Cargaisons tracking form", docType: "BSC", icon: "sap-icon://pdf-attachment", uploadedBy: "Anna K.", uploadedOn: "2025-04-10", status: "Approved", statusState: "Success", fileSize: "520 KB" }
        ]
    };

    const aGsis = [
        {
            gsiId: "33532",
            gsiName: "GOLD CROWN KENYA - TOGO - Groupe le Champion",
            gsiOwner: "Lipton Services Poland",
            revisionStatus: "Reviewed",
            revisionStatusState: "Information",
            status: "Approved",
            statusState: "Success",
            pendingStatus: "",
            version: 1,
            description: "shipment from 3PM Mombasa to Groupe le Champion, Togo POD: Lome, Togo (TGLFW)"
        },
        {
            gsiId: "33527",
            gsiName: "MALI - OMEGA INVESTISSEMENTS SARL - POLAND TO MALI (SENEGAL PORT)",
            gsiOwner: "Lipton Services Poland",
            revisionStatus: "Reviewed",
            revisionStatusState: "Information",
            status: "Approved",
            statusState: "Success",
            pendingStatus: "",
            version: 1,
            description: "GSI for shipments from Poland to Dakar, Senegal (Mali customer: OMEGA INVESTISSEMENTS SARL)"
        },
        {
            gsiId: "33525",
            gsiName: "FMCG DISTRIBUTION, POLAND - DAKAR, SENEGAL",
            gsiOwner: "Lipton Services Poland",
            revisionStatus: "Reviewed",
            revisionStatusState: "Information",
            status: "Approved",
            statusState: "Success",
            pendingStatus: "",
            version: 1,
            description: "GSI for shipments from Poland to Dakar, Senegal, customer: FAST MOVING COSUMER GOODS SENEGAL"
        },
        {
            gsiId: "33513",
            gsiName: "NIGER - ETS IBRAHIM DAMBADJI",
            gsiOwner: "Lipton Services Poland",
            revisionStatus: "Reviewed",
            revisionStatusState: "Information",
            status: "Approved",
            statusState: "Success",
            pendingStatus: "",
            version: 8,
            description: "GSI for shipments from Poland to Niger (shipment to Cotonou, Benin)"
        },
        {
            gsiId: "33437",
            gsiName: "Gold Crown Kenya - ETS IBRAHIM DAMBADJI",
            gsiOwner: "Lipton Services Poland",
            revisionStatus: "Reviewed",
            revisionStatusState: "Information",
            status: "Approved",
            statusState: "Success",
            pendingStatus: "",
            version: 3,
            description: "shipment from 3PM Mombasa to ETS IBRAHIM DAMBADJI based in Niger POD POD: Cotonou- Benin"
        },
        {
            gsiId: "23250",
            gsiName: "Poland - Congo",
            gsiOwner: "Lipton Services Poland",
            revisionStatus: "Reviewed",
            revisionStatusState: "Information",
            status: "Approved",
            statusState: "Success",
            pendingStatus: "",
            version: 1,
            description: "Shipments from Poland to Congo ( ETS D L Trading )"
        },
        {
            gsiId: "20903",
            gsiName: "KENYA 3PM - CONGO DRC / ETS ESENGO",
            gsiOwner: "Lipton Services Poland",
            revisionStatus: "Reviewed",
            revisionStatusState: "Information",
            status: "Approved",
            statusState: "Success",
            pendingStatus: "Pending",
            version: 2,
            description: "GSI for shipments from Gold Crown to ETS ESENGO in DRC"
        },
        {
            gsiId: "20885",
            gsiName: "BSC",
            gsiOwner: "Lipton Services Poland",
            revisionStatus: "Reviewed",
            revisionStatusState: "Information",
            status: "Approved",
            statusState: "Success",
            pendingStatus: "",
            version: 1,
            description: "Bordereau de Suivi des Cargaisons (BSC) or Cargo Tracking"
        }
    ];

    return Controller.extend("com.lipton.logisticshub.controller.LaneDocumentUpload", {
        onInit() {
            const oFirstLane = aGsis[0];
            const aFirstDocs = mDocuments[oFirstLane.gsiId] || [];

            const oModel = new JSONModel({
                count: aGsis.length,
                gsis: aGsis,
                selectedLane: oFirstLane,
                selectedLaneDocuments: aFirstDocs,
                selectedLaneDocumentsCount: aFirstDocs.length
            });
            this.getView().setModel(oModel, "laneDocuments");

            // Set visual selection on first list item after list renders
            this.byId("lanesList").attachEventOnce("updateFinished", () => {
                const oList = this.byId("lanesList");
                const aItems = oList.getItems();
                if (aItems.length > 0) {
                    oList.setSelectedItem(aItems[0]);
                }
            });
        },

        onLaneSelect(oEvent) {
            const oLane = oEvent.getParameter("listItem")
                .getBindingContext("laneDocuments")
                .getObject();
            const aDocuments = mDocuments[oLane.gsiId] || [];
            const oModel = this.getView().getModel("laneDocuments");

            oModel.setProperty("/selectedLane", oLane);
            oModel.setProperty("/selectedLaneDocuments", aDocuments);
            oModel.setProperty("/selectedLaneDocumentsCount", aDocuments.length);
        },

        onUploadDocument() {
            if (!this._oUploadDialog) {
                Fragment.load({
                    id: this.getView().getId(),
                    name: "com.lipton.logisticshub.view.fragment.LaneDocumentUploadDialog",
                    controller: this
                }).then((oDialog) => {
                    this.getView().addDependent(oDialog);
                    this._oUploadDialog = oDialog;
                    oDialog.open();
                });
            } else {
                this._oUploadDialog.open();
            }
        },

        onConfirmUpload() {
            const oFileUploader = this.byId("fileUploader");
            const sFileName = oFileUploader.getValue();

            if (!sFileName) {
                MessageToast.show("Please select a file to upload.");
                return;
            }

            const oModel = this.getView().getModel("laneDocuments");
            const sGsiId = oModel.getProperty("/selectedLane/gsiId");
            const oDocTypeSelect = this.byId("docTypeSelect");
            const sDocType = oDocTypeSelect.getSelectedItem().getText();

            const mIconMap = {
                "Bill of Lading": "sap-icon://pdf-attachment",
                "Commercial Invoice": "sap-icon://pdf-attachment",
                "Certificate of Origin": "sap-icon://pdf-attachment",
                "Insurance Certificate": "sap-icon://pdf-attachment",
                "Customs Declaration": "sap-icon://word-attachment",
                "Packing List": "sap-icon://excel-attachment",
                "Other": "sap-icon://doc-attachment"
            };

            const oNewDoc = {
                docId: `D${Date.now()}`,
                docName: sFileName,
                docDescription: "",
                docType: sDocType,
                icon: mIconMap[sDocType] || "sap-icon://doc-attachment",
                uploadedBy: "Current User",
                uploadedOn: new Date().toISOString().split("T")[0],
                status: "Pending Review",
                statusState: "Warning",
                fileSize: "—"
            };

            const aUpdated = [...(mDocuments[sGsiId] || []), oNewDoc];
            mDocuments[sGsiId] = aUpdated;
            oModel.setProperty("/selectedLaneDocuments", aUpdated);
            oModel.setProperty("/selectedLaneDocumentsCount", aUpdated.length);

            oFileUploader.clear();
            this._oUploadDialog.close();
            MessageToast.show(`"${sFileName}" uploaded successfully.`);
        },

        onCancelUpload() {
            this.byId("fileUploader").clear();
            this._oUploadDialog.close();
        },

        onFileSizeExceed() {
            MessageToast.show("File exceeds the 10 MB size limit.");
        },

        onFileTypeMismatch() {
            MessageToast.show("Invalid file type. Please upload PDF, Excel, Word, PNG, or JPG.");
        },

        onDownloadDocument(oEvent) {
            const sName = oEvent.getSource().getBindingContext("laneDocuments").getProperty("docName");
            MessageToast.show(`Downloading: ${sName}`);
        },

        onDeleteDocument(oEvent) {
            const oContext = oEvent.getSource().getBindingContext("laneDocuments");
            const sDocName = oContext.getProperty("docName");
            const sDocId = oContext.getProperty("docId");

            MessageBox.confirm(`Delete "${sDocName}"?`, {
                onClose: (sAction) => {
                    if (sAction !== MessageBox.Action.OK) return;

                    const oModel = this.getView().getModel("laneDocuments");
                    const sGsiId = oModel.getProperty("/selectedLane/gsiId");
                    const aUpdated = (mDocuments[sGsiId] || []).filter(d => d.docId !== sDocId);

                    mDocuments[sGsiId] = aUpdated;
                    oModel.setProperty("/selectedLaneDocuments", aUpdated);
                    oModel.setProperty("/selectedLaneDocumentsCount", aUpdated.length);
                    MessageToast.show(`"${sDocName}" deleted.`);
                }
            });
        }
    });
});
