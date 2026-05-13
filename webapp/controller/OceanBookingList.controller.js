sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    const oMockData = {
        count: 5,
        bookings: [
            {
                bookingRef: "BKG-2024-001",
                ratesConsumer: "Shipper Demo",
                departureWindow: "12.06.2024 – 07.07.2024",
                departureDateFrom: "2024-06-12",
                departureDateTo: "2024-07-07",
                placeOfReceipt: "Santos, Brazil, (BRSSZ), DOOR",
                portOfLoading: "Santos (BRSSZ)",
                finalDestination: "Rotterdam, Netherlands, (NLRTM), PORT",
                portOfDischarge: "Rotterdam (NLRTM)",
                commodity: "Green Coffee",
                hsCode: "0901.11",
                articleDescription: "Green Coffee beans, unroasted (Arabica), origin: Santos port region, Brazil. Moisture content max 12.5%. Packed in 60kg GrainPro-lined jute bags on wooden pallets. Certificate of Origin required. Phytosanitary certificate attached.",
                movementType: "FCL/FCL",
                containerCount: "2",
                containerType: "20' Dry 8'6",
                weight: "43200",
                soc: false,
                status: "Confirmed",
                statusState: "Success",
                documents: [
                    { name: "Bill of Lading", description: "BKG-2024-001-BL-v1.pdf", type: "Bill of Lading", dateUploaded: "10.06.2024", fileSize: "284 KB", status: "Available", statusState: "Success", icon: "sap-icon://pdf-attachment" },
                    { name: "Commercial Invoice", description: "BKG-2024-001-INV-001.pdf", type: "Commercial Invoice", dateUploaded: "10.06.2024", fileSize: "156 KB", status: "Available", statusState: "Success", icon: "sap-icon://pdf-attachment" },
                    { name: "Packing List", description: "BKG-2024-001-PL-001.pdf", type: "Packing List", dateUploaded: "11.06.2024", fileSize: "98 KB", status: "Available", statusState: "Success", icon: "sap-icon://pdf-attachment" },
                    { name: "Certificate of Origin", description: "BKG-2024-001-COO-001.pdf", type: "Certificate of Origin", dateUploaded: "11.06.2024", fileSize: "210 KB", status: "Available", statusState: "Success", icon: "sap-icon://pdf-attachment" },
                    { name: "Phytosanitary Certificate", description: "BKG-2024-001-PHYTO-001.pdf", type: "Phytosanitary Certificate", dateUploaded: "12.06.2024", fileSize: "175 KB", status: "Available", statusState: "Success", icon: "sap-icon://pdf-attachment" }
                ]
            },
            {
                bookingRef: "BKG-2024-002",
                ratesConsumer: "Shipper Demo",
                departureWindow: "15.06.2024 – 10.07.2024",
                departureDateFrom: "2024-06-15",
                departureDateTo: "2024-07-10",
                placeOfReceipt: "Rio de Janeiro, Brazil, (BRRIO), DOOR",
                portOfLoading: "Rio de Janeiro (BRRIO)",
                finalDestination: "Hamburg, Germany, (DEHAM), PORT",
                portOfDischarge: "Hamburg (DEHAM)",
                commodity: "Cocoa Beans",
                hsCode: "1801.00",
                articleDescription: "Cocoa beans, whole, raw, not roasted or otherwise processed. Origin: Rio de Janeiro state, Brazil. Fermented and sun-dried. Packed in 65kg polypropylene bags. Fumigation certificate and quality inspection report to accompany shipment.",
                movementType: "LCL/FCL",
                containerCount: "1",
                containerType: "40' HC",
                weight: "28000",
                soc: false,
                status: "Pending",
                statusState: "Warning",
                documents: [
                    { name: "Commercial Invoice", description: "BKG-2024-002-INV-001.pdf", type: "Commercial Invoice", dateUploaded: "14.06.2024", fileSize: "143 KB", status: "Available", statusState: "Success", icon: "sap-icon://pdf-attachment" },
                    { name: "Packing List", description: "BKG-2024-002-PL-001.xlsx", type: "Packing List", dateUploaded: "14.06.2024", fileSize: "67 KB", status: "Available", statusState: "Success", icon: "sap-icon://excel-attachment" },
                    { name: "Bill of Lading", description: "BKG-2024-002-BL-draft.pdf", type: "Bill of Lading", dateUploaded: "15.06.2024", fileSize: "291 KB", status: "Pending Review", statusState: "Warning", icon: "sap-icon://pdf-attachment" }
                ]
            },
            {
                bookingRef: "BKG-2024-003",
                ratesConsumer: "Shipper Demo",
                departureWindow: "20.06.2024 – 15.07.2024",
                departureDateFrom: "2024-06-20",
                departureDateTo: "2024-07-15",
                placeOfReceipt: "Buenos Aires, Argentina, (ARBUE), DOOR",
                portOfLoading: "Buenos Aires (ARBUE)",
                finalDestination: "Felixstowe, UK, (GBFXT), PORT",
                portOfDischarge: "Felixstowe (GBFXT)",
                commodity: "Raw Sugar",
                hsCode: "1701.14",
                articleDescription: "Raw cane sugar, not containing added flavouring or colouring. Polarisation min 96°. Origin: Buenos Aires province, Argentina. Packed in 50kg multi-wall paper bags, palletised and stretch-wrapped. ICUMSA 600-1200. SOC container – shipper's own equipment.",
                movementType: "FCL/FCL",
                containerCount: "4",
                containerType: "20' Dry 8'6",
                weight: "92000",
                soc: true,
                status: "In Transit",
                statusState: "Information",
                documents: [
                    { name: "Bill of Lading", description: "BKG-2024-003-BL-v2.pdf", type: "Bill of Lading", dateUploaded: "18.06.2024", fileSize: "305 KB", status: "Available", statusState: "Success", icon: "sap-icon://pdf-attachment" },
                    { name: "Commercial Invoice", description: "BKG-2024-003-INV-002.pdf", type: "Commercial Invoice", dateUploaded: "18.06.2024", fileSize: "162 KB", status: "Available", statusState: "Success", icon: "sap-icon://pdf-attachment" },
                    { name: "Packing List", description: "BKG-2024-003-PL-002.pdf", type: "Packing List", dateUploaded: "19.06.2024", fileSize: "88 KB", status: "Available", statusState: "Success", icon: "sap-icon://pdf-attachment" },
                    { name: "Insurance Certificate", description: "BKG-2024-003-INS-001.pdf", type: "Insurance Certificate", dateUploaded: "19.06.2024", fileSize: "224 KB", status: "Available", statusState: "Success", icon: "sap-icon://pdf-attachment" },
                    { name: "Certificate of Origin", description: "BKG-2024-003-COO-001.pdf", type: "Certificate of Origin", dateUploaded: "20.06.2024", fileSize: "198 KB", status: "Available", statusState: "Success", icon: "sap-icon://pdf-attachment" },
                    { name: "Fumigation Certificate", description: "BKG-2024-003-FUM-001.pdf", type: "Fumigation Certificate", dateUploaded: "20.06.2024", fileSize: "134 KB", status: "Available", statusState: "Success", icon: "sap-icon://pdf-attachment" }
                ]
            },
            {
                bookingRef: "BKG-2024-004",
                ratesConsumer: "Carrier Group A",
                departureWindow: "01.07.2024 – 25.07.2024",
                departureDateFrom: "2024-07-01",
                departureDateTo: "2024-07-25",
                placeOfReceipt: "Santos, Brazil, (BRSSZ), DOOR",
                portOfLoading: "Santos (BRSSZ)",
                finalDestination: "Antwerp, Belgium, (BEANR), PORT",
                portOfDischarge: "Antwerp (BEANR)",
                commodity: "Green Coffee",
                hsCode: "0901.11",
                articleDescription: "Green Coffee beans, unroasted, specialty grade (SCA score 85+). Varietal: Bourbon and Catuaí blend. Origin: Santos port region, Brazil. Vacuum-sealed in 30kg GrainPro bags inside 60kg jute outer bags. Full traceability documentation and cup score sheet included.",
                movementType: "LCL/LCL",
                containerCount: "3",
                containerType: "40' HC",
                weight: "67500",
                soc: false,
                status: "Draft",
                statusState: "None",
                documents: [
                    { name: "Draft Commercial Invoice", description: "BKG-2024-004-INV-draft.pdf", type: "Commercial Invoice", dateUploaded: "30.06.2024", fileSize: "119 KB", status: "Draft", statusState: "None", icon: "sap-icon://pdf-attachment" }
                ]
            },
            {
                bookingRef: "BKG-2024-005",
                ratesConsumer: "Shipper Demo",
                departureWindow: "05.07.2024 – 30.07.2024",
                departureDateFrom: "2024-07-05",
                departureDateTo: "2024-07-30",
                placeOfReceipt: "Cartagena, Colombia, (COCTG), DOOR",
                portOfLoading: "Cartagena (COCTG)",
                finalDestination: "Rotterdam, Netherlands, (NLRTM), PORT",
                portOfDischarge: "Rotterdam (NLRTM)",
                commodity: "Green Coffee",
                hsCode: "0901.11",
                articleDescription: "Green Coffee beans, unroasted, Colombian origin (Huila region). Washed process, single-origin lot. Packed in 70kg hermetic GrainPro bags. Export certificate from Federación Nacional de Cafeteros required. Arrival inspection at NLRTM bonded warehouse.",
                movementType: "FCL/FCL",
                containerCount: "2",
                containerType: "20' Dry 8'6",
                weight: "38800",
                soc: false,
                status: "Cancelled",
                statusState: "Error",
                documents: [
                    { name: "Bill of Lading", description: "BKG-2024-005-BL-v1.pdf", type: "Bill of Lading", dateUploaded: "04.07.2024", fileSize: "278 KB", status: "Cancelled", statusState: "Error", icon: "sap-icon://pdf-attachment" },
                    { name: "Commercial Invoice", description: "BKG-2024-005-INV-001.pdf", type: "Commercial Invoice", dateUploaded: "04.07.2024", fileSize: "151 KB", status: "Cancelled", statusState: "Error", icon: "sap-icon://pdf-attachment" }
                ]
            }
        ]
    };

    return Controller.extend("com.lipton.logisticshub.controller.OceanBookingList", {
        /**
         * Initializes the OceanBookingList controller and binds the bookings model to the view.
         * @memberof com.lipton.logisticshub.controller.OceanBookingList
         * @public
         * @returns {void}
         */
        onInit() {
            const oModel = new JSONModel(oMockData);
            this.getView().setModel(oModel, "oceanBookings");
        },

        /**
         * Navigates to the OceanBookingCreate route to start a new booking.
         * @memberof com.lipton.logisticshub.controller.OceanBookingList
         * @public
         * @returns {void}
         */
        onCreateBooking() {
            this.getOwnerComponent()._pendingBooking = null;
            this.getOwnerComponent().getRouter().navTo("OceanBookingCreate");
        },

        /**
         * Handles a press on a booking list item to navigate to the booking detail view.
         * @memberof com.lipton.logisticshub.controller.OceanBookingList
         * @public
         * @param {sap.ui.base.Event} oEvent - The press event from the booking list item
         * @returns {void}
         */
        onBookingPress(oEvent) {
            const oItem = oEvent.getSource();
            const oCtx = oItem.getBindingContext("oceanBookings");
            this.getOwnerComponent()._pendingBooking = oCtx.getObject();
            this.getOwnerComponent().getRouter().navTo("OceanBookingCreate");
        }
    });
});
