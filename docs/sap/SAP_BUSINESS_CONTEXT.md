# SAP S/4HANA Business Context & Entity Model
**Document ID:** SAP-CTX-001  
**Functional Domain:** Sourcing & Procurement / Logistics Invoice Verification (LIV)  
**Standard SAP Alignment:** S/4HANA Public Cloud 2023, MM-IV, FI-AP, QM  
**Version:** 1.0.0  

---

## 1. The SAP Procurement & Invoicing Process Strip

In SAP S/4HANA, an invoice never exists in isolation. It is a financial settlement document anchored to an upstream procurement chain:

```text
+-------------------+      +-------------------+      +-------------------+      +-------------------+
|  1. BUSINESS      |      |  2. PURCHASE      |      |  3. GOODS         |      |  4. QUALITY       |
|     PARTNER       | ---> |     ORDER         | ---> |     RECEIPT       | ---> |     INSPECTION    |
| (BUT000 / LFA1)   |      |  (EKKO / EKPO)    |      | (MATDOC / MSEG)   |      |  (QALS / QAVE)    |
+-------------------+      +-------------------+      +-------------------+      +-------------------+
                                                                                           |
+-------------------+      +-------------------+      +-------------------+                |
|  7. FINANCE       |      |  6. BUSINESS      |      |  5. SUPPLIER      |                |
|     POSTING       | <--- |     OWNER         | <--- |     INVOICE       | <--------------+
| (BKPF / BSEG)     |      | (EKKO-ERNAM/CSKS) |      |  (RBKP / RSEG)    |
+-------------------+      +-------------------+      +-------------------+
```

---

## 2. SAP Business Object Mapping & Attributes

### 1. Business Partner / Supplier (`LFA1` / `BUT000`)
- **Primary Keys:** `Supplier` (`LIFNR`), `BusinessPartner` (`PARTNER`).
- **Critical Attributes:** Tax Number 3 (`STCD3` - GSTIN in India), Payment Terms (`ZTERM`), Reconciliation Account (`AKONT`), Deletion/Block flags (`LOEVM`/`SPERR`).
- **Contextual Role:** Verifies the legal entity issuing the invoice is an active, authorized vendor.

### 2. Purchase Order (`EKKO` / `EKPO`)
- **Primary Keys:** `PurchaseOrder` (`EBELN`), `PurchaseOrderItem` (`EBELP`).
- **Critical Attributes:** Company Code (`BUKRS`), Purchasing Org (`EKORG`), Purchasing Group (`EKGRP`), Order Quantity (`MENGE`), Net Price (`NETPR`), Condition Records (`PB00`), Account Assignment Category (`KNTTP`).
- **Contextual Role:** Formal contract specifying agreed quantities, unit prices, delivery schedule, and requisitioner user ID (`EKKO-ERNAM`).

### 3. Goods Receipt (`MSEG` / `MATDOC`)
- **Primary Keys:** `MaterialDocument` (`MBLNR`), `MaterialDocumentYear` (`MJAHR`).
- **Movement Type:** `101` (Goods receipt for purchase order), `102` (Reversal).
- **Critical Attributes:** Quantity in Entry Unit (`ERFMG`), Unit of Measure (`ERFME`), Plant (`WERKS`), Storage Location (`LGORT`), Delivery Note (`XBLNR`).
- **Contextual Role:** Physical confirmation that materials or service entry sheets have been certified as received.

### 4. Quality Inspection Lot (`QALS`)
- **Primary Keys:** `InspectionLot` (`PRUEFLOS`).
- **Critical Attributes:** Inspection Lot Status, Inspected Quantity, Accepted Quantity, Rejected Quantity, Usage Decision (`VBEWERTUNG`).
- **Contextual Role:** Confirms whether delivered goods are commercially usable or rejected due to defects.

### 5. Supplier Invoice (`RBKP` / `RSEG`)
- **Primary Keys:** `SupplierInvoice` (`BELNR`), `FiscalYear` (`GJAHR`).
- **Posting Logic:** Evaluates 3-way match against EKPO and MSEG.
- **Tolerance Keys:**
  - `DQ`: Exceed amount: quantity variance ($Q_{INV} > Q_{GR}$).
  - `PP`: Price variance ($\Delta P > \text{threshold}$).
  - `BD`: Small difference auto-clearing.
- **Contextual Role:** Generates financial entry debiting GR/IR clearing account (`WRX`) and crediting vendor open item.

### 6. Non-PO Invoices (Cost Center Direct Accounting)
- When no PO exists, the invoice is diverted to Cost Center accounting (`CSKS` / `CSKT`).
- Staged in S/4HANA as a **Parked Invoice** (`MIR7` / `F-47`) pending Cost Center Manager approval.
