# SAP Invoice Decision Intelligence — API Contracts & Payload Specifications
**Document ID:** SPEC-S4H-BTP-API-005  
**Version:** 1.0.0  

---

## 1. Canonical Invoice Payload Specification

When an invoice arrives through Physical Scan, Email, or Government E-Invoicing, the intake adapter normalizes the incoming data into this canonical structure:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CanonicalSupplierInvoice",
  "type": "object",
  "required": [
    "invoiceId",
    "invoiceNumber",
    "sourceChannel",
    "supplierTaxId",
    "invoiceDate",
    "currency",
    "totalNetAmount",
    "taxAmount",
    "totalGrossAmount",
    "lineItems"
  ],
  "properties": {
    "invoiceId": { "type": "string", "example": "INV-2026-00451" },
    "invoiceNumber": { "type": "string", "example": "SEI/2026/0892" },
    "sourceChannel": { 
      "type": "string", 
      "enum": ["PHYSICAL_SCAN", "EMAIL_INBOUND", "GOVERNMENT_EINVOICE"] 
    },
    "channelMetadata": {
      "type": "object",
      "properties": {
        "scannerLocation": { "type": "string" },
        "emailSender": { "type": "string" },
        "emailSubject": { "type": "string" },
        "emailReceivedAt": { "type": "string", "format": "date-time" },
        "irn": { "type": "string" },
        "acknowledgementNumber": { "type": "string" },
        "acknowledgementDate": { "type": "string", "format": "date-time" }
      }
    },
    "supplierTaxId": { "type": "string", "example": "27AAACS1234F1Z5" },
    "supplierName": { "type": "string", "example": "Schneider Electric India Pvt Ltd" },
    "buyerTaxId": { "type": "string", "example": "29AABCT1332L1ZV" },
    "invoiceDate": { "type": "string", "format": "date", "example": "2026-10-04" },
    "dueDate": { "type": "string", "format": "date", "example": "2026-11-03" },
    "currency": { "type": "string", "example": "INR" },
    "purchaseOrderReference": { "type": "string", "example": "4500012456" },
    "totalNetAmount": { "type": "number", "example": 845000.00 },
    "taxAmount": { "type": "number", "example": 152100.00 },
    "totalGrossAmount": { "type": "number", "example": 997100.00 },
    "lineItems": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["itemNumber", "description", "quantity", "unitOfMeasure", "unitPrice", "netAmount"],
        "properties": {
          "itemNumber": { "type": "string", "example": "00010" },
          "description": { "type": "string", "example": "Industrial Switchgear 415V" },
          "materialNumber": { "type": "string", "example": "MAT-ELEC-415" },
          "quantity": { "type": "number", "example": 100 },
          "unitOfMeasure": { "type": "string", "example": "EA" },
          "unitPrice": { "type": "number", "example": 8450.00 },
          "netAmount": { "type": "number", "example": 845000.00 },
          "taxRate": { "type": "number", "example": 18.0 }
        }
      }
    }
  }
}
```

---

## 2. Business Owner Action Payload

```json
{
  "invoiceId": "INV-2026-00451",
  "action": "ACCEPT",
  "userId": "averma@enterprise.com",
  "userName": "Amit Verma",
  "role": "BUSINESS_OWNER",
  "department": "IT Infrastructure & Cloud",
  "costCenter": "CC-1020-IT",
  "reason": "Commercial service delivered as per requisition. Verified with local site manager.",
  "timestamp": "2026-10-05T14:22:00.000Z"
}
```

---

## 3. SAP Posting Simulation Payload (`API_SUPPLIERINVOICE_PROCESS_SRV`)

```json
{
  "CompanyCode": "1010",
  "DocumentDate": "/Date(1728086400000)/",
  "PostingDate": "/Date(1728172800000)/",
  "InvoicingParty": "10002450",
  "DocumentCurrency": "INR",
  "InvoiceGrossAmount": "997100.00",
  "SupplierInvoiceIDByInvcgParty": "SEI/2026/0892",
  "AccountingDocumentType": "RE",
  "to_SuplrInvcItemPurOrdRef": [
    {
      "SupplierInvoiceItem": "0001",
      "PurchaseOrder": "4500012456",
      "PurchaseOrderItem": "00010",
      "Plant": "1010",
      "QuantityInPurchaseOrderUnit": "90",
      "PurchaseOrderQuantityUnit": "EA",
      "SupplierInvoiceItemAmount": "760500.00",
      "TaxCode": "V1"
    }
  ]
}
```
