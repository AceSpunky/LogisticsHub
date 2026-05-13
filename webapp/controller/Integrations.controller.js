sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
    "use strict";

    // ── Mock Data ──────────────────────────────────────────────────────────────

    const oMockData = {

        carrierIntegrations: [
            { carrier: "DB Schenker",          scac: "DBSC", apiStatus: "active",   statusLabel: "Active",   statusState: "Success", lastSync: "09 Mar 2024, 15:55", activeShipments: 12 },
            { carrier: "DHL Freight",           scac: "DHLF", apiStatus: "active",   statusLabel: "Active",   statusState: "Success", lastSync: "09 Mar 2024, 15:58", activeShipments: 8  },
            { carrier: "Dachser",               scac: "DACH", apiStatus: "active",   statusLabel: "Active",   statusState: "Success", lastSync: "09 Mar 2024, 15:50", activeShipments: 6  },
            { carrier: "Kuehne + Nagel",        scac: "KUNE", apiStatus: "degraded", statusLabel: "Degraded", statusState: "Warning", lastSync: "09 Mar 2024, 14:30", activeShipments: 9  },
            { carrier: "DSV",                   scac: "DSVL", apiStatus: "active",   statusLabel: "Active",   statusState: "Success", lastSync: "09 Mar 2024, 15:57", activeShipments: 5  },
            { carrier: "Rhenus Logistics",      scac: "RHNS", apiStatus: "active",   statusLabel: "Active",   statusState: "Success", lastSync: "09 Mar 2024, 15:45", activeShipments: 3  },
            { carrier: "Hellmann Worldwide",    scac: "HELL", apiStatus: "active",   statusLabel: "Active",   statusState: "Success", lastSync: "09 Mar 2024, 15:52", activeShipments: 4  },
            { carrier: "Geodis",                scac: "GEOD", apiStatus: "active",   statusLabel: "Active",   statusState: "Success", lastSync: "09 Mar 2024, 15:56", activeShipments: 7  },
            { carrier: "Norbert Dentressangle", scac: "NORT", apiStatus: "active",   statusLabel: "Active",   statusState: "Success", lastSync: "09 Mar 2024, 15:54", activeShipments: 2  },
            { carrier: "Trans.eu",              scac: "TREU", apiStatus: "active",   statusLabel: "Active",   statusState: "Success", lastSync: "09 Mar 2024, 15:53", activeShipments: 3  },
            { carrier: "Nippon Express",        scac: "NPPE", apiStatus: "active",   statusLabel: "Active",   statusState: "Success", lastSync: "09 Mar 2024, 15:48", activeShipments: 1  },
            { carrier: "Transplace",            scac: "TPLA", apiStatus: "active",   statusLabel: "Active",   statusState: "Success", lastSync: "09 Mar 2024, 15:51", activeShipments: 2  },
            { carrier: "XPO Logistics",         scac: "XPOL", apiStatus: "offline",  statusLabel: "Offline",  statusState: "Error",   lastSync: "09 Mar 2024, 08:00", activeShipments: 0  },
            { carrier: "J.B. Hunt Transport",   scac: "JBHT", apiStatus: "active",   statusLabel: "Active",   statusState: "Success", lastSync: "09 Mar 2024, 15:59", activeShipments: 1  },
            { carrier: "Werner Enterprises",    scac: "WERN", apiStatus: "active",   statusLabel: "Active",   statusState: "Success", lastSync: "09 Mar 2024, 15:47", activeShipments: 1  },
            { carrier: "Panalpina (DSV Air)",   scac: "PANA", apiStatus: "active",   statusLabel: "Active",   statusState: "Success", lastSync: "09 Mar 2024, 15:44", activeShipments: 0  },
            { carrier: "CEVA Logistics",        scac: "CEVA", apiStatus: "active",   statusLabel: "Active",   statusState: "Success", lastSync: "09 Mar 2024, 15:46", activeShipments: 2  }
        ],

        oceanShipments: [
            { ref: "CG-2024-089", vesselLine: "MSC OSCAR / MSC · FE240-W",                          route: "Rotterdam → Singapore",    container: "MSCU3456789",  status: "in-transit", statusLabel: "Shipped", statusState: "Warning", blNumber: "MSCA123456789",   positionEvent: "Indian Ocean (12.4°N, 65.1°E)"                       },
            { ref: "CG-2024-092", vesselLine: "BUDAPEST BRIDGE / Hapag-Lloyd · AL240-N",            route: "Bremerhaven → Houston",    container: "(pending)",    status: "planned",    statusLabel: "Planned",    statusState: "None",    blNumber: "(pending)",       positionEvent: "Booking confirmed, awaiting vessel arrival"           },
            { ref: "CG-2024-094", vesselLine: "CMA CGM JULES VERNE / CMA CGM · FE243-W",            route: "Rotterdam → Singapore",    container: "CMAU7891234",  status: "in-transit", statusLabel: "Shipped", statusState: "Warning", blNumber: "CMDU456789012",   positionEvent: "Red Sea (20.1°N, 38.5°E)"                            },
            { ref: "CG-2024-095", vesselLine: "ANTOINE DE SAINT EXUPERY / CMA CGM · AE248-W",       route: "Rotterdam → Los Angeles",  container: "(pending)",    status: "planned",    statusLabel: "Planned",    statusState: "None",    blNumber: "—",               positionEvent: "Waiting for road pre-carriage delivery"               },
            { ref: "CG-2024-097", vesselLine: "COSCO SHIPPING UNIVERSE / COSCO · SEA240-E",         route: "Rotterdam → Shanghai",     container: "COSU9876543",  status: "in-transit", statusLabel: "Shipped", statusState: "Warning", blNumber: "COSCO789012345",  positionEvent: "Mediterranean Sea (35.2°N, 18.4°E)"                  }
        ],

        integrationEvents: [
            { time: "15:58", integration: "Shippeo", integrationState: "None",        description: "DHL Freight · FO-L009 — Delivered at Paris hub"                        },
            { time: "15:45", integration: "Cargoo",  integrationState: "Information", description: "OCN-001 (MSC OSCAR) — Departed Port Said, new ETA confirmed"            },
            { time: "14:30", integration: "Shippeo", integrationState: "Warning",     description: "Kuehne + Nagel API degraded — retry in progress"                       },
            { time: "12:00", integration: "S/4HANA", integrationState: "Information", description: "FU sync complete — 5 new FUs pulled (FU-0030 to FU-0034)"              },
            { time: "09:00", integration: "Shippeo", integrationState: "Error",       description: "XPO Logistics API offline — support ticket raised"                      },
            { time: "08:30", integration: "Cargoo",  integrationState: "Information", description: "OCN-005 (COSCO UNIVERSE) — Departed Rotterdam port"                     }
        ]
    };

    // ── Controller ─────────────────────────────────────────────────────────────

    return Controller.extend("com.lipton.logisticshub.controller.Integrations", {

        /**
         * Initializes the Integrations controller and binds the integrations model to the view.
         * @memberof com.lipton.logisticshub.controller.Integrations
         * @public
         * @returns {void}
         */
        onInit() {
            const oModel = new JSONModel(oMockData);
            this.getView().setModel(oModel, "integrations");
        },

        // ── Tile action buttons ───────────────────────────────────────────────
        /**
         * Triggers a manual data synchronization with SAP S/4HANA.
         * @memberof com.lipton.logisticshub.controller.Integrations
         * @public
         * @returns {void}
         */
        onSapSync()      { MessageToast.show("SAP S/4HANA sync triggered…"); },

        /**
         * Opens the SAP S/4HANA integration configuration screen.
         * @memberof com.lipton.logisticshub.controller.Integrations
         * @public
         * @returns {void}
         */
        onSapConfigure() { MessageToast.show("Opening SAP S/4HANA configuration…"); },

        /**
         * Opens the Cargoo external portal.
         * @memberof com.lipton.logisticshub.controller.Integrations
         * @public
         * @returns {void}
         */
        onCargooPortal()    { MessageToast.show("Opening Cargoo portal…"); },

        /**
         * Opens the Cargoo integration configuration screen.
         * @memberof com.lipton.logisticshub.controller.Integrations
         * @public
         * @returns {void}
         */
        onCargooConfigure() { MessageToast.show("Opening Cargoo configuration…"); },

        /**
         * Opens the Shippeo external portal.
         * @memberof com.lipton.logisticshub.controller.Integrations
         * @public
         * @returns {void}
         */
        onShippeoPortal()    { MessageToast.show("Opening Shippeo portal…"); },

        /**
         * Opens the Shippeo integration configuration screen.
         * @memberof com.lipton.logisticshub.controller.Integrations
         * @public
         * @returns {void}
         */
        onShippeoConfigure() { MessageToast.show("Opening Shippeo configuration…"); },

        // ── Carrier table search ──────────────────────────────────────────────
        /**
         * Filters the carrier integrations table by carrier name, SCAC code, or status label.
         * @memberof com.lipton.logisticshub.controller.Integrations
         * @public
         * @param {sap.ui.base.Event} oEvent - The liveChange event from the SearchField control
         * @returns {void}
         */
        onCarrierSearch(oEvent) {
            const sQuery = oEvent.getParameter("newValue").toLowerCase();
            const oModel = this.getView().getModel("integrations");
            const aAll = oMockData.carrierIntegrations;
            const aFiltered = sQuery
                ? aAll.filter(c =>
                    c.carrier.toLowerCase().includes(sQuery) ||
                    c.scac.toLowerCase().includes(sQuery)    ||
                    c.statusLabel.toLowerCase().includes(sQuery)
                )
                : aAll;
            oModel.setProperty("/carrierIntegrations", aFiltered);
        },

        // ── Carrier row action ────────────────────────────────────────────────
        /**
         * Opens the shipment list filtered to the carrier identified by the row's SCAC code.
         * @memberof com.lipton.logisticshub.controller.Integrations
         * @public
         * @param {sap.ui.base.Event} oEvent - The press event from the carrier row action button
         * @returns {void}
         */
        onViewCarrierShipments(oEvent) {
            const sScac = oEvent.getSource().data("scac");
            MessageToast.show("Viewing shipments for " + sScac + "…");
        }
    });
});
