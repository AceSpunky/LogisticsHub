sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageBox, MessageToast) => {
    "use strict";

    // ── Mock Data ──────────────────────────────────────────────────────────────

    const oMockData = {
        consolidationSuggestions: [
            {
                id: "CONS-001",
                headerTitle: "Consolidate 3 FUs → 1 FO",
                lane: "LANE-DE-MUC-DE-FRA",
                selectionProfile: "SP-ROAD-EU-01",
                capacityUtilPct: "89",
                savingVsSingle: "€1,280",
                confidencePct: "94",
                vehicleType: "13.6m Curtainsider",
                suggestedCarrier: "DB Schenker",
                estimatedCostEur: "€980",
                totalWeightVol: "19.4t / 45m³",
                fuCount: 3,
                freightUnits: [
                    { id: "FU-0030", customer: "SO-2024-0501", weightT: "6.2", pallets: 8,  serviceLevel: "standard", serviceLevelState: "None" },
                    { id: "FU-0031", customer: "SO-2024-0502", weightT: "7.8", pallets: 10, serviceLevel: "standard", serviceLevelState: "None" },
                    { id: "FU-0032", customer: "SO-2024-0503", weightT: "5.4", pallets: 7,  serviceLevel: "standard", serviceLevelState: "None" }
                ]
            },
            {
                id: "CONS-002",
                headerTitle: "Consolidate 2 FUs → 1 FO",
                lane: "LANE-DE-BER-DE-HAM",
                selectionProfile: "SP-ROAD-EU-03",
                capacityUtilPct: "92",
                savingVsSingle: "€720",
                confidencePct: "88",
                vehicleType: "13.6m Curtainsider",
                suggestedCarrier: "Dachser",
                estimatedCostEur: "€1,150",
                totalWeightVol: "20.7t / 50m³",
                fuCount: 2,
                freightUnits: [
                    { id: "FU-0033", customer: "SO-2024-0504", weightT: "11.2", pallets: 14, serviceLevel: "economy", serviceLevelState: "None" },
                    { id: "FU-0034", customer: "SO-2024-0505", weightT: "9.5",  pallets: 11, serviceLevel: "economy", serviceLevelState: "None" }
                ]
            }
        ],

        unassignedGroups: [
            {
                groupKey: "LANE-DE-MUC-DE-FRA | SP-ROAD-EU-01",
                count: 3,
                freightUnits: [
                    { id: "FU-0030", customer: "SO-2024-0501", origin: "Munich",      destination: "Frankfurt",  serviceLevel: "standard", serviceLevelState: "None",    hazmat: false, weightT: "6.2",  volumeM3: 15, pallets: 8,  lane: "LANE-DE-MUC-DE-FRA",   selectionProfile: "SP-ROAD-EU-01",    plannedPickup: "14 Mar 2024", selected: false },
                    { id: "FU-0031", customer: "SO-2024-0502", origin: "Munich",      destination: "Frankfurt",  serviceLevel: "standard", serviceLevelState: "None",    hazmat: false, weightT: "7.8",  volumeM3: 18, pallets: 10, lane: "LANE-DE-MUC-DE-FRA",   selectionProfile: "SP-ROAD-EU-01",    plannedPickup: "14 Mar 2024", selected: false },
                    { id: "FU-0032", customer: "SO-2024-0503", origin: "Munich",      destination: "Frankfurt",  serviceLevel: "standard", serviceLevelState: "None",    hazmat: false, weightT: "5.4",  volumeM3: 12, pallets: 7,  lane: "LANE-DE-MUC-DE-FRA",   selectionProfile: "SP-ROAD-EU-01",    plannedPickup: "14 Mar 2024", selected: false }
                ]
            },
            {
                groupKey: "LANE-DE-BER-DE-HAM | SP-ROAD-EU-03",
                count: 2,
                freightUnits: [
                    { id: "FU-0033", customer: "SO-2024-0504", origin: "Berlin",      destination: "Hamburg",    serviceLevel: "economy",  serviceLevelState: "None",    hazmat: false, weightT: "11.2", volumeM3: 28, pallets: 14, lane: "LANE-DE-BER-DE-HAM",   selectionProfile: "SP-ROAD-EU-03",    plannedPickup: "15 Mar 2024", selected: false },
                    { id: "FU-0034", customer: "SO-2024-0505", origin: "Berlin",      destination: "Hamburg",    serviceLevel: "economy",  serviceLevelState: "None",    hazmat: false, weightT: "9.5",  volumeM3: 22, pallets: 11, lane: "LANE-DE-BER-DE-HAM",   selectionProfile: "SP-ROAD-EU-03",    plannedPickup: "15 Mar 2024", selected: false }
                ]
            },
            {
                groupKey: "LANE-SG-SIN-TH-BKK | SP-ROAD-APAC-01",
                count: 1,
                freightUnits: [
                    { id: "FU-0003", customer: "SO-2024-0456", origin: "Singapore",   destination: "Bangkok",    serviceLevel: "standard", serviceLevelState: "None",    hazmat: false, weightT: "18.5", volumeM3: 42, pallets: 20, lane: "LANE-SG-SIN-TH-BKK",   selectionProfile: "SP-ROAD-APAC-01",  plannedPickup: "11 Mar 2024", selected: false }
                ]
            },
            {
                groupKey: "LANE-US-HOU-US-DAL | SP-ROAD-US-01",
                count: 1,
                freightUnits: [
                    { id: "FU-0010", customer: "SO-2024-0461", origin: "Houston",     destination: "Dallas",     serviceLevel: "standard", serviceLevelState: "None",    hazmat: false, weightT: "22.0", volumeM3: 55, pallets: 26, lane: "LANE-US-HOU-US-DAL",   selectionProfile: "SP-ROAD-US-01",    plannedPickup: "19 Mar 2024", selected: false }
                ]
            },
            {
                groupKey: "LANE-US-LAX-US-DEN | SP-ROAD-US-01",
                count: 1,
                freightUnits: [
                    { id: "FU-0024", customer: "SO-2024-0489", origin: "Los Angeles", destination: "Denver",     serviceLevel: "premium",  serviceLevelState: "Success", hazmat: true,  weightT: "16.0", volumeM3: 40, pallets: 19, lane: "LANE-US-LAX-US-DEN",   selectionProfile: "SP-ROAD-US-01",    plannedPickup: "03 Apr 2024", selected: false }
                ]
            },
            {
                groupKey: "LANE-DE-DUS-NL-RTM | SP-ROAD-EU-01",
                count: 1,
                freightUnits: [
                    { id: "FU-0025", customer: "SO-2024-0492", origin: "Düsseldorf",  destination: "Rotterdam",  serviceLevel: "standard", serviceLevelState: "None",    hazmat: false, weightT: "9.8",  volumeM3: 24, pallets: 12, lane: "LANE-DE-DUS-NL-RTM",   selectionProfile: "SP-ROAD-EU-01",    plannedPickup: "11 Mar 2024", selected: false }
                ]
            }
        ],

        activeFreightOrders: [
            { id: "FO-L001", carrier: "DB Schenker",           fuIds: "FU-0001",                   route: "Hamburg → Rotterdam",    vehicleType: "13.6m Curtainsider", weightVol: "18.5t / 42m³", status: "Completed",  statusState: "Success", shippeoId: "SHP-2024-L001" },
            { id: "FO-L005", carrier: "Dachser",               fuIds: "FU-0008",                   route: "Munich → Bremerhaven",   vehicleType: "13.6m Curtainsider", weightVol: "22.0t / 55m³", status: "Shipped", statusState: "Warning", shippeoId: "SHP-2024-L005" },
            { id: "FO-L009", carrier: "DHL Freight",           fuIds: "FU-0015",                   route: "Frankfurt → Paris",      vehicleType: "13.6m Curtainsider", weightVol: "14.2t / 38m³", status: "Completed",  statusState: "Success", shippeoId: "SHP-2024-L009" },
            { id: "FO-L010", carrier: "Norbert Dentressangle", fuIds: "FU-0016",                   route: "Paris → Madrid",         vehicleType: "Mega Trailer",        weightVol: "14.2t / 38m³", status: "Shipped", statusState: "Warning", shippeoId: "SHP-2024-L010" },
            { id: "FO-L012", carrier: "Trans.eu Logistics",    fuIds: "FU-0020",                   route: "Berlin → Warsaw",        vehicleType: "13.6m Curtainsider", weightVol: "19.8t / 48m³", status: "Shipped", statusState: "Warning", shippeoId: "SHP-2024-L012" },
            { id: "FO-L014", carrier: "Kuehne + Nagel",        fuIds: "FU-0022",                   route: "Amsterdam → Rotterdam",  vehicleType: "13.6m Curtainsider", weightVol: "16.0t / 40m³", status: "Delayed",    statusState: "Error",   shippeoId: "SHP-2024-L014" },
            { id: "FO-L017", carrier: "DSV Road",              fuIds: "FU-0026",                   route: "Düsseldorf → Lyon",      vehicleType: "13.6m Curtainsider", weightVol: "17.3t / 44m³", status: "Completed",  statusState: "Success", shippeoId: "SHP-2024-L017" },
            { id: "FO-L019", carrier: "DB Schenker",           fuIds: "FU-0028",                   route: "Stuttgart → Vienna",     vehicleType: "13.6m Curtainsider", weightVol: "12.8t / 32m³", status: "Shipped", statusState: "Warning", shippeoId: "SHP-2024-L019" },
            { id: "FO-L021", carrier: "Geodis",                fuIds: "FU-0029",                   route: "Paris → Brussels",       vehicleType: "Solo Truck",          weightVol: "9.5t / 24m³",  status: "Completed",  statusState: "Success", shippeoId: "SHP-2024-L021" },
            { id: "FO-L023", carrier: "DHL Freight",           fuIds: "FU-0033, FU-0034",          route: "Berlin → Hamburg",       vehicleType: "13.6m Curtainsider", weightVol: "20.7t / 50m³", status: "Planned",    statusState: "None",    shippeoId: "SHP-2024-L023" },
            { id: "FO-L025", carrier: "Rhenus Logistics",      fuIds: "FU-0035",                   route: "Cologne → Antwerp",      vehicleType: "Solo Truck",          weightVol: "8.2t / 20m³",  status: "Shipped", statusState: "Warning", shippeoId: "SHP-2024-L025" },
            { id: "FO-L027", carrier: "Ceva Logistics",        fuIds: "FU-0036",                   route: "Milan → Zurich",         vehicleType: "13.6m Curtainsider", weightVol: "15.6t / 36m³", status: "Delayed",    statusState: "Error",   shippeoId: "SHP-2024-L027" },
            { id: "FO-L030", carrier: "Kuehne + Nagel",        fuIds: "FU-0037",                   route: "Rotterdam → Copenhagen", vehicleType: "Mega Trailer",        weightVol: "23.4t / 58m³", status: "Completed",  statusState: "Success", shippeoId: "SHP-2024-L030" },
            { id: "FO-L032", carrier: "Dachser",               fuIds: "FU-0038",                   route: "Munich → Prague",        vehicleType: "13.6m Curtainsider", weightVol: "11.0t / 28m³", status: "Shipped", statusState: "Warning", shippeoId: "SHP-2024-L032" },
            { id: "FO-L034", carrier: "XPO Logistics",         fuIds: "FU-0039",                   route: "Madrid → Lisbon",        vehicleType: "Solo Truck",          weightVol: "7.4t / 18m³",  status: "Planned",    statusState: "None",    shippeoId: "SHP-2024-L034" },
            { id: "FO-L036", carrier: "Trans.eu Logistics",    fuIds: "FU-0030, FU-0031, FU-0032", route: "Munich → Frankfurt",     vehicleType: "13.6m Curtainsider", weightVol: "19.4t / 45m³", status: "Planned",    statusState: "None",    shippeoId: "SHP-2024-L036" }
        ]
    };

    // ── Controller ─────────────────────────────────────────────────────────────

    return Controller.extend("com.lipton.logisticshub.controller.FUFOOptimizer", {

        /**
         * Initializes the FUFOOptimizer controller, binds the model to the view,
         * and attaches a post-render delegate to apply full-width tab styling.
         * @memberof com.lipton.logisticshub.controller.FUFOOptimizer
         * @public
         * @returns {void}
         */
        onInit() {
            const oModel = new JSONModel(oMockData);
            this.getView().setModel(oModel, "fufo");

            this.getView().addEventDelegate({
                onAfterRendering: () => {
                    const oTabBar = this.byId("fuFoTabBar");
                    const sKey = oTabBar && oTabBar.getSelectedKey();
                    if (sKey === "existing" || sKey === "suggestions") {
                        oTabBar.addStyleClass("lhFullWidthTab");
                    }
                }
            }, this);
        },

        /**
         * Creates a Freight Order from the selected consolidation suggestion and
         * displays a confirmation message with the order details.
         * @memberof com.lipton.logisticshub.controller.FUFOOptimizer
         * @public
         * @param {sap.ui.base.Event} oEvent - The press event from the Create FO button
         * @returns {void}
         */
        onCreateFO(oEvent) {
            const sSuggestionId = oEvent.getSource().data("suggestionId");
            const oSuggestions = this.getView().getModel("fufo").getProperty("/consolidationSuggestions");
            const oSuggestion = oSuggestions.find(s => s.id === sSuggestionId);
            if (oSuggestion) {
                MessageBox.success(
                    `Freight Order created for ${oSuggestion.fuCount} FUs.\n` +
                    `Carrier: ${oSuggestion.suggestedCarrier}\n` +
                    `Lane: ${oSuggestion.lane}\n` +
                    `Est. Cost: ${oSuggestion.estimatedCostEur}`,
                    { title: "FO Created – " + sSuggestionId }
                );
            }
        },

        /**
         * Handles selection and deselection of a Freight Unit in the unassigned list
         * and updates the selected flag in the model.
         * @memberof com.lipton.logisticshub.controller.FUFOOptimizer
         * @public
         * @param {sap.ui.base.Event} oEvent - The selectionChange event from the list control
         * @returns {void}
         */
        onFUSelect(oEvent) {
            const oItem = oEvent.getParameter("listItem");
            const bSelected = oEvent.getParameter("selected");
            const oContext = oItem.getBindingContext("fufo");
            const sFuId = oContext.getProperty("id");
            this.getView().getModel("fufo").setProperty(oContext.getPath() + "/selected", bSelected);
            MessageToast.show(bSelected ? `${sFuId} selected` : `${sFuId} deselected`);
        },

        /**
         * Handles tab selection in the FU/FO tab bar and toggles the full-width
         * CSS class based on the selected tab key.
         * @memberof com.lipton.logisticshub.controller.FUFOOptimizer
         * @public
         * @param {sap.ui.base.Event} oEvent - The select event from the IconTabBar control
         * @returns {void}
         */
        onTabSelect(oEvent) {
            const sKey = oEvent.getParameter("key");
            const oTabBar = this.byId("fuFoTabBar");
            if (sKey === "existing" || sKey === "suggestions") {
                oTabBar.addStyleClass("lhFullWidthTab");
            } else {
                oTabBar.removeStyleClass("lhFullWidthTab");
            }
        },

        /**
         * Filters the active Freight Orders table by ID, carrier, route, or status.
         * @memberof com.lipton.logisticshub.controller.FUFOOptimizer
         * @public
         * @param {sap.ui.base.Event} oEvent - The liveChange event from the SearchField control
         * @returns {void}
         */
        onFOSearch(oEvent) {
            const sQuery = oEvent.getParameter("newValue").toLowerCase();
            const oModel = this.getView().getModel("fufo");
            const aAllOrders = oMockData.activeFreightOrders;
            const aFiltered = sQuery
                ? aAllOrders.filter(o =>
                    o.id.toLowerCase().includes(sQuery) ||
                    o.carrier.toLowerCase().includes(sQuery) ||
                    o.route.toLowerCase().includes(sQuery) ||
                    o.status.toLowerCase().includes(sQuery)
                )
                : aAllOrders;
            oModel.setProperty("/activeFreightOrders", aFiltered);
        }
    });
});
