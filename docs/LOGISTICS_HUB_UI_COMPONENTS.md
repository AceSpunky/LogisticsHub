# LogisticsHub – UI Component Reference

## Contents

- [Navigation](#navigation)
- [FU/FO Optimizer](#fufo-optimizer)
- [Ocean Booking](#ocean-booking)
- [Lane Document Upload](#lane-document-upload)
- [Document Hub](#document-hub)
- [Master Data Upload](#master-data-upload)
- [Integrations](#integrations)

---

## Navigation

The application shell is built with the `sap.tnt` library and lives in the main `App` view, wrapping all section views.

### ToolPage
The root layout container. Manages the side navigation panel and the main content area, handling the expanded/collapsed state of the sidebar.

### ToolHeader
The top application bar. Contains the hamburger menu `Button` that toggles the sidebar and the application title `Title`.

### SideNavigation
The collapsible left-hand navigation rail. Fires an `itemSelect` event when the user picks a destination, triggering a router navigation to the corresponding view.

### NavigationList + NavigationListItem
The list of destinations rendered inside the `SideNavigation`. Each `NavigationListItem` carries a label, an icon, and a key used to resolve the router target.

| Item | Key | State |
|---|---|---|
| Dashboard | `Dashboard` | Disabled |
| SO/STO Tracker | `SOSTOTracker` | Disabled |
| FU/FO Optimizer | `FUFOOptimizer` | Enabled (default) |
| Document Hub | `DocumentHub` | Enabled |
| Lane Document Upload | `LaneDocumentUpload` | Enabled |
| Ocean Booking | `OceanBooking` | Enabled |
| Master Data Upload | `MasterDataUpload` | Enabled — opens a dialog instead of navigating |
| Integrations | _(hidden)_ | Nav item commented out; view exists but is not reachable |

### NavContainer
The content area of the `ToolPage`. Acts as the routing target — the router swaps views in and out of this container as the user navigates.

---

## FU/FO Optimizer

### MessageStrip
Highlights active system notifications — such as pending consolidation opportunities or sync warnings — at the top of the view so they are immediately visible on load.

### IconTabBar
Organises the three working areas into labelled, icon-tagged tabs with live counts. Tabs load their content from dedicated XML fragments, keeping each area isolated.

| Tab |  |
|---|---|
| Consolidation Suggestions |
| Unassigned Freight Units | 
| Active Freight Orders |

---

### Tab 1: Consolidation Suggestions

#### VBox
Repeats one Panel per consolidation suggestion without any List wrapper or additional chrome.

#### Panel _(expandable)_
Each suggestion lives in a collapsible panel. Collapsed by default to reduce visual noise; the user expands only what they need to act on.

#### OverflowToolbar _(panel header)_
Hosts the suggestion title, lane and selection profile context, and three status indicators on the left — with a **Create FO** button pinned to the right. Overflows gracefully on narrower screens.

#### ObjectStatus · ObjectNumber · MessageStrip
Used to highlight important information such as errors, warnings, and notifications. Capacity utilisation, cost saving, and confidence score each carry a semantic state, providing a visual hierarchy that lets the user categorise and prioritise suggestions at a glance.

#### HBox / VBox _(panel body)_
A wrapping `HBox` presents four key details — Vehicle Type, Suggested Carrier, Estimated Cost, and Total Weight/Volume — as fixed-width columns side by side.

#### Table _(inner)_
Lists the Freight Units that belong to each suggestion. Columns: FU #, Customer/Order, Weight, Pallets, Service Level.

---

### Tab 2: Unassigned Freight Units

#### VBox
Repeats one Panel group per lane/profile combination without a List wrapper.

#### Panel _(always expanded)_
Groups Freight Units that share a lane and selection profile. Non-collapsible — all cards remain visible for quick selection and comparison.

#### OverflowToolbar _(panel header)_
Displays the group key on the left and the FU count on the right.

#### GridList + GridListItem
Lays out the FU cards in a responsive multi-column grid inside each panel. Each `GridListItem` represents one Freight Unit.

#### HBox / VBox _(card layout)_
The card header `HBox` places the FU ID and customer name on the left with the selection `CheckBox` on the right. A second `HBox` renders the service-level and HAZ badges beneath it.

#### ObjectStatus · ObjectNumber · MessageStrip
Used to highlight important information such as errors, warnings, and notifications. The service-level badge and HAZ indicator carry semantic states that create a visual hierarchy, making it immediately clear which FUs carry risk or priority before the user reads any detail.

#### HBox rows _(metadata)_
Route, Lane, Selection Profile, Weight/Vol/Pallets, and Planned Pickup are each rendered as a fixed-width right-aligned label alongside its value — producing a clean two-column alignment.

#### CheckBox
Placed in the card header to allow individual FU selection for downstream Freight Order creation.

---

### Tab 3: Active Freight Orders

#### Table _(responsive)_
Displays all active freight orders. Columns: FO #, Carrier, FU(s), Route, Vehicle Type, Weight/Vol, Status, Shippeo ID.

#### OverflowToolbar _(table header)_
Holds the section title and a `SearchField` that filters rows in real time.

#### ObjectStatus · ObjectNumber · MessageStrip
Used to highlight important information such as errors, warnings, and notifications. The Status column uses semantic states with inverted styling, making order health immediately scannable across all rows without reading each cell individually.

---

## Ocean Booking

Ocean Booking is split across two views: a list view and a create/edit form. The `OceanBooking` nav item routes to the list; a **Create New Booking** button in the list navigates to the form.

---

### Ocean Booking List

#### Table _(growing)_
Full-width table bound to `oceanBookings>/bookings`. Loads rows in pages of 20 (`growing="true"`, `growingThreshold="20"`). Alternate row colours are on. Columns: Booking Ref, Departure Window, Origin, Destination, Commodity, Movement Type, Containers, Status.

Each row is type `Navigation` — pressing it fires `.onBookingPress` to open the booking detail/edit form.

#### OverflowToolbar _(header)_
Shows a live count title **Bookings (n)** on the left and a prominent **Create New Booking** button (`type="Emphasized"`) on the right.

#### ObjectIdentifier _(Booking Ref cell)_
Two-line cell: primary text is the booking reference, secondary text is the Rates Consumer — giving the user context without expanding the row.

#### VBox _(Origin / Destination cells)_
Each of the Origin and Destination columns stacks two values: a `Text` for the place name (Place of Receipt / Final Destination) above an `ObjectStatus` for the port code (Port of Loading / Port of Discharge).

#### ObjectStatus _(Status cell)_
Semantic state driven by `statusState` binding — colour-codes booking health (e.g. Draft, Confirmed, Pending) across all rows without requiring the user to read each value.

---

### Ocean Booking Create

A `Page` with `showNavButton="true"` and a back-nav handler (`.onNavBack`). Content is arranged in a two-column `GridList` (CSS Grid, `repeat(2, 1fr)`) with a full-width documents section below. A sticky `footer` `OverflowToolbar` holds the form actions.

#### GridList + GridBasicLayout _(two-column form grid)_
Hosts the three card sections. `GridItemLayoutData` controls span: Booking Criteria spans two rows (tall card on the left); Container Configuration and Flow & Carrier Selection each occupy one row on the right.

---

#### Card 1: Booking Criteria

##### OverflowToolbar _(card header)_
Title **Booking Criteria** (H4) on the left; **Add Item** and **Link Order Item** buttons on the right.

##### HBox / VBox _(two-column field layout)_
Fields are split 50/50 inside an `HBox`. Left column: Rates Consumer, Departure Window, Place of Receipt, Final Destination, Commodity, Movement Type. Right column: HS Code, Port of Loading, Port of Discharge, Article Description.

| Control | Field |
|---|---|
| `Select` | Rates Consumer (Shipper Demo / Carrier Group A / Trade Partner B) |
| `DateRangeSelection` | Departure Window |
| `ComboBox` | Place of Receipt (Brazil, Argentina, Colombia options) |
| `ComboBox` | Final Destination (Rotterdam, Hamburg, Felixstowe, Antwerp) |
| `ComboBox` | Commodity (Green Coffee, Cocoa Beans, Raw Sugar, Soybeans, Corn/Maize) |
| `RadioButton` × 3 | Movement Type — FCL/FCL (default) · LCL/FCL · LCL/LCL |
| `Input` | HS Code (max 10 chars) |
| `ComboBox` | Port of Loading |
| `ComboBox` | Port of Discharge |
| `TextArea` | Article Description (9 rows) |

---

#### Card 2: Container Configuration

##### OverflowToolbar _(card header)_
Title **Container Configuration** (H4); **Add Container Type** and **Show Carrier Haulage Details** buttons.

##### HBox _(SOC + Containers + Weight row)_
Three controls side by side with flex grow ratios — SOC `CheckBox` (fixed), Containers `StepInput` (grow 1), Weight `Input` (grow 2).

| Control | Field |
|---|---|
| `CheckBox` | SOC (Shipper Owned Container) |
| `StepInput` | Containers (min 1, max 99, step 1) |
| `Input` (Number) | Weight (kg) |
| `ComboBox` | Container Type (20' Dry, 40' Dry, 40' HC, 45' HC, 20'/40' Reefer) |

---

#### Card 3: Flow & Carrier Selection

##### RadioButtonGroup _(Flow)_
Three options in a 3-column group — **Book** (default), **Delegate**, **Book outside Cargoo**. Selecting **Delegate** enables the Delegate To combo; other selections disable it (bound via `delegateEnabled` flag on `bookingCreate` model).

| Control | Field |
|---|---|
| `RadioButtonGroup` | Flow — Book · Delegate · Book outside Cargoo |
| `ComboBox` | Delegate To (enabled only when Delegate is selected) |
| `MultiInput` | Emails — token-based email address entry |

---

#### Documents Section _(full-width)_

A second `GridList` spanning a single full-width column below the three-card grid.

##### OverflowToolbar _(section header)_
Title **Documents (n)** with live count expression binding.

##### Table _(booking documents)_
Bound to `bookingCreate>/documents`. Columns: icon, Document Name, Type, Date Uploaded, File Size, Status, Download.

| Cell | Control |
|---|---|
| Icon | `sap.ui.core.Icon` (blue file icon) |
| Document Name | `ObjectIdentifier` (name + description) |
| Status | `ObjectStatus` (semantic state) |
| Download | Icon-only `Button` (transparent) |

---

#### Footer OverflowToolbar
Sticky page footer with two right-aligned buttons: **Cancel** (default type) and **Submit Booking** (emphasized).

---

## Lane Document Upload

A master–detail split layout inside a single `Page`. An `HBox` divides the page horizontally: the master panel (≈25 %) lists GSI lanes; the detail panel (≈75 %) shows the selected lane's header and its documents.

---

### Master Panel — Lane List

#### List _(SingleSelectMaster)_
Bound to `laneDocuments>/gsis`. Selection fires `.onLaneSelect`, which updates the detail panel. No-data text: "No lanes found".

#### CustomListItem
Each lane is rendered as a `CustomListItem` containing a `VBox` with three elements:

| Element | Content |
|---|---|
| `Text` | GSI identifier (e.g. "GSI 1042") |
| `Title` (H6) | Lane name (wrapping enabled) |
| `ObjectStatus` | Revision status with semantic state |

---

### Detail Panel — Lane Object Header

#### ObjectHeader _(responsive)_
Displays the selected lane's key metadata at a glance.

| Slot | Content |
|---|---|
| Intro | GSI ID |
| Title | Lane name |
| Number / Unit | Version number + "Version" label |
| `ObjectAttribute` × 2 | GSI Owner · Description |
| `ObjectStatus` × 3 | Revision status · Approval status · Pending changes (visible only when a pending value exists) |

---

### Detail Panel — Documents Card

#### OverflowToolbar _(card header)_
Title **Documents (n)** with live count; **Upload Document** button (emphasized, with upload icon) on the right — fires `.onUploadDocument` to open the upload dialog.

#### Table _(lane documents)_
Bound to `laneDocuments>/selectedLaneDocuments`. Alternate row colours on. Columns: icon, Document Name, Document Type, Uploaded By, Uploaded On, File Size, Status, Actions.

| Cell | Control |
|---|---|
| Icon | `sap.ui.core.Icon` (blue file icon) |
| Document Name | `ObjectIdentifier` (name + description) |
| Status | `ObjectStatus` (semantic state) |
| Actions | `HBox` with **Download** and **Delete** icon-only buttons |

---

### Fragment: LaneDocumentUploadDialog

A draggable `Dialog` (500 px wide) opened by `.onUploadDocument`.

| Field | Control |
|---|---|
| Document Type | `Select` — Bill of Lading · Commercial Invoice · Packing List · Certificate of Origin · Customs Declaration · Insurance Certificate · Other |
| Description | `TextArea` (3 rows, optional) |
| File | `FileUploader` — accepts PDF, Excel, Word, PNG, JPG; max 10 MB |

A `MessageStrip` (Information type) below the file uploader reminds the user of accepted formats and size limit.

Footer buttons: **Upload** (emphasized) / **Cancel**.

---

## Document Hub

### MessageStrip
Surfaces the most critical alert — a missing document blocking a shipment — at the very top of the view so it cannot be overlooked.

### GridList + GridListItem _(status summary)_
Four clickable tiles distributed equally across the full width. Clicking a tile filters the document table to show only documents matching that status.

#### ObjectStatus · ObjectNumber · MessageStrip
Used to highlight important information such as errors, warnings, and notifications. Each tile pairs a large `ObjectStatus` label above a large `ObjectNumber` count. Together they form a visual hierarchy — green Confirmed, orange Pending, red Missing — so the user can assess document health and navigate to the relevant subset in a single glance.


### OverflowToolbar _(filter bar)_
Sits between the summary tiles and the table. Contains:

- **Label** — "Source:" section heading
- **ObjectStatus × 4** — inverted source-filter badges (SAP, Cargoo, Carrier, Manual); toggling one filters the table by source
- **ToolbarSpacer** — pushes the search field to the right
- **SearchField** — live search across document name, reference, and type

### Table _(responsive)_
Shows the filtered document list, updated whenever a status tile, source badge, or search input changes. Columns: Document, Source, Reference, Uploaded, Status, Actions.

#### ObjectStatus
Inverted source badges in the filter bar mirror the Source column styling — the user can visually trace a filter badge directly to the matching column values.

#### ObjectIdentifier
Used in the Document and Reference columns to show a primary title and secondary sub-text in a compact two-line format.

#### HBox _(action column)_
Each row ends with a contextual action cell containing up to three icon-only `Button` controls — Download, Upload, and Open in Source System.

---

## Master Data Upload

Accessed via the **Master Data Upload** `NavigationListItem` in the sidebar. Rather than routing to a view, selecting this item opens a modal `Dialog` (the `MasterDataUploadDialog` fragment) directly from `App.controller.js`.

### Fragment: MasterDataUploadDialog

A draggable `Dialog` (500 px wide).

#### IllustratedMessage
Displayed at the top of the dialog using `sapIllus-UploadToCloud` (medium size). Title: "Upload Your Master Data Here". Provides visual context and guides the user's intent before they interact with the form controls.

#### Select — Data Type
Required field. Options:

| Key | Label |
|---|---|
| `laneMapping` | Lane Mapping |
| `carrierMapping` | Carrier Mapping |

#### FileUploader — Select File
Required. Accepts `.xlsx` and `.csv` files. Bound to `masterDataFileUploader`.

Footer buttons: **Submit** (emphasized, with upload icon, fires `.onMasterDataUploadSubmit`) / **Cancel** (fires `.onMasterDataUploadClose`).

---

## Integrations

> **Note:** The Integrations `NavigationListItem` is currently commented out in `App.view.xml`. The view and controller exist but the section is not reachable from the UI.

### GridList + GridListItem _(system tiles)_
Three tiles — SAP S/4HANA, Cargoo, Shippeo — in a fixed-width multi-column grid. Each tile contains a status badge, key metrics, and action buttons.

#### ObjectStatus · ObjectNumber · MessageStrip
Used to highlight important information such as errors, warnings, and notifications. The status badge on each tile (Active / Degraded / Offline) uses inverted styling with a semantic state, immediately signalling overall system health — green for healthy, orange for degraded, red for offline — before the user reads any detail in the panels below.

#### HBox / VBox _(tile body)_
A header `HBox` pairs the system title with its status badge. A `VBox` of key-value `HBox` rows presents the four system metrics. An action `HBox` at the bottom holds two `Button` controls.

---

### Panels

Each integration system has a dedicated expandable `Panel` with a responsive `Table` inside. `ObjectStatus` highlights status values (Active / Degraded / Offline / Shipped / Planned) using semantic states so health is scannable without reading each row. Action `Button` controls appear where applicable (e.g. View Shipments per carrier row).
