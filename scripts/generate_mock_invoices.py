"""
scripts/generate_mock_invoices.py
Generates realistic B2B Indian invoices (PDF), RFC 822 emails (.eml),
Government E-Invoice payloads (.json), and channel metadata.
"""

import os
import sys
import json
import base64
import email.message
from datetime import datetime
import subprocess

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
MOCK_DATA_DIR = os.path.join(BASE_DIR, 'mock-data')
INBOUND_DIR = os.path.join(MOCK_DATA_DIR, 'inbound')

CHROME_PATHS = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
]

def find_browser():
    for p in CHROME_PATHS:
        if os.path.exists(p):
            return p
    return None

BROWSER_PATH = find_browser()

BUYER_INFO = {
    "name": "Enterprise Industrial Manufacturing Ltd",
    "address": "Plant 1010, Sector 4, Electronic City Phase II",
    "city": "Bengaluru",
    "state": "Karnataka",
    "pincode": "560100",
    "stateCode": "29",
    "gstin": "29AABCT1332L1ZV",
    "pan": "AABCT1332L"
}

SUPPLIER_PROFILES = {
    "10002450": {
        "name": "Schneider Electric India Pvt Ltd",
        "address": "Schneider Electric House, Mindspace Airoli West",
        "city": "Navi Mumbai",
        "state": "Maharashtra",
        "pincode": "400708",
        "stateCode": "27",
        "gstin": "27AAACS1234F1Z5",
        "pan": "AAACS1234F",
        "bank": "HDFC Bank, Fort Branch, A/C: 50200019283741, IFSC: HDFC0000060"
    },
    "10003120": {
        "name": "Siemens India Ltd",
        "address": "Siemens Technology Park, Dr. Annie Besant Road, Worli",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400018",
        "stateCode": "27",
        "gstin": "27AAACS9876E1Z2",
        "pan": "AAACS9876E",
        "bank": "Deutsche Bank AG, Nariman Point, A/C: 1092837465, IFSC: DEUT0796BOM"
    },
    "10001050": {
        "name": "Tata Consultancy Services Ltd",
        "address": "TCS House, Raveline Street, Fort",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400001",
        "stateCode": "27",
        "gstin": "27AAACT1999A1Z1",
        "pan": "AAACT1999A",
        "bank": "State Bank of India, CAG Branch Mumbai, A/C: 30192847561, IFSC: SBIN0009995"
    },
    "10002100": {
        "name": "Wipro Enterprises Ltd",
        "address": "Doddakannelli, Sarjapur Road",
        "city": "Bengaluru",
        "state": "Karnataka",
        "pincode": "560035",
        "stateCode": "29",
        "gstin": "29AAACW4455Q1Z8",
        "pan": "AAACW4455Q",
        "bank": "ICICI Bank, Koramangala Branch, A/C: 000205001294, IFSC: ICIC0000002"
    },
    "10004580": {
        "name": "Bharti Airtel Enterprise Services",
        "address": "Bharti Crescent, 1 Nelson Mandela Road, Vasant Kunj",
        "city": "New Delhi",
        "state": "Delhi",
        "pincode": "110070",
        "stateCode": "07",
        "gstin": "07AAACB0001A1Z9",
        "pan": "AAACB0001A",
        "bank": "Kotak Mahindra Bank, Connaught Place, A/C: 8492019485, IFSC: KKBK0000172"
    },
    "10005500": {
        "name": "Amazon Web Services India Pvt Ltd",
        "address": "Level 11, Tower 2, Worldmark, Aerocity",
        "city": "New Delhi",
        "state": "Delhi",
        "pincode": "110037",
        "stateCode": "07",
        "gstin": "07AAACA1234M1Z0",
        "pan": "AAACA1234M",
        "bank": "Citibank N.A., New Delhi Branch, A/C: 0549281729, IFSC: CITI0000002"
    },
    "10009999": {
        "name": "Apex Facility Management Services",
        "address": "Apex Towers, Senapati Bapat Road, Shivaji Nagar",
        "city": "Pune",
        "state": "Maharashtra",
        "pincode": "411005",
        "stateCode": "27",
        "gstin": "27AAACA9999P1Z3",
        "pan": "AAACA9999P",
        "bank": "Bank of Baroda, Shivaji Nagar Branch, A/C: 29480200001928, IFSC: BARB0SHIVAJ"
    },
    "10006200": {
        "name": "Infosys Limited",
        "address": "Electronics City, Hosur Road",
        "city": "Bengaluru",
        "state": "Karnataka",
        "pincode": "560100",
        "stateCode": "29",
        "gstin": "29AAACI4040R1Z2",
        "pan": "AAACI4040R",
        "bank": "Axis Bank, Electronics City Branch, A/C: 919020048291048, IFSC: UTIB0000452"
    }
}

def number_to_words(n):
    # Simple Indian number formatting for display
    return f"INR {n:,.2f} Only"

def generate_invoice_html(inv, supp, po_ref=None, irn=None):
    is_igst = supp["stateCode"] != BUYER_INFO["stateCode"]
    total_tax = inv.get("taxAmount", 0)
    cgst_amt = 0 if is_igst else total_tax / 2
    sgst_amt = 0 if is_igst else total_tax / 2
    igst_amt = total_tax if is_igst else 0

    items_html = ""
    for idx, item in enumerate(inv.get("lineItems", []), 1):
        rate = item.get("unitPrice", 0)
        qty = item.get("quantity", 0)
        net = item.get("netAmount", 0)
        desc = item.get("description", "Material / Service Item")
        uom = item.get("unitOfMeasure", "EA")
        hsn = item.get("materialNumber", "85371000")
        tax_pct = item.get("taxRate", 18.0)

        items_html += f"""
        <tr>
            <td style="text-align:center;">{idx}</td>
            <td><strong>{desc}</strong><br><small style="color:#555;">HSN/SAC: {hsn}</small></td>
            <td style="text-align:center;">{qty} {uom}</td>
            <td style="text-align:right;">₹{rate:,.2f}</td>
            <td style="text-align:right;">₹{net:,.2f}</td>
            <td style="text-align:center;">{tax_pct:.1f}%</td>
            <td style="text-align:right;">₹{(net * (tax_pct/100)):,.2f}</td>
            <td style="text-align:right;"><strong>₹{(net * (1 + tax_pct/100)):,.2f}</strong></td>
        </tr>
        """

    irn_block = ""
    if irn:
        irn_block = f"""
        <div style="background:#f0f7ff; border:1px solid #c7ddff; border-radius:4px; padding:8px 12px; margin-bottom:12px; font-size:11px;">
            <div style="font-weight:bold; color:#0a6ed1; margin-bottom:2px;">GOVERNMENT GST E-INVOICE / IRP VERIFIED</div>
            <div><strong>IRN:</strong> <code style="word-break:break-all; font-family:monospace; color:#333;">{irn}</code></div>
            <div><strong>Ack No:</strong> {inv.get('channelMetadata', {}).get('acknowledgementNumber', '112026009841')} &nbsp;|&nbsp; <strong>Ack Date:</strong> {inv.get('channelMetadata', {}).get('acknowledgementDate', '2026-10-04')}</div>
        </div>
        """

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>TAX INVOICE - {inv['invoiceNumber']}</title>
<style>
    @page {{
        size: A4 portrait;
        margin: 12mm;
    }}
    body {{
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        color: #222;
        background: #fff;
        font-size: 11px;
        line-height: 1.4;
        margin: 0;
        padding: 0;
    }}
    .invoice-container {{
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        border: 1px solid #ccc;
        padding: 16px;
        box-sizing: border-box;
    }}
    .header-table {{
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 12px;
    }}
    .header-table td {{
        vertical-align: top;
    }}
    .title {{
        font-size: 18px;
        font-weight: 800;
        color: #0b2265;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }}
    .badge {{
        display: inline-block;
        background: #0a6ed1;
        color: #fff;
        padding: 2px 8px;
        border-radius: 3px;
        font-size: 10px;
        font-weight: bold;
    }}
    .meta-box {{
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        padding: 10px;
        border-radius: 4px;
        font-size: 11px;
    }}
    .two-col {{
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 12px;
    }}
    .two-col td {{
        width: 50%;
        vertical-align: top;
        padding: 6px;
    }}
    .items-table {{
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 14px;
    }}
    .items-table th {{
        background: #f1f5f9;
        color: #334155;
        font-weight: 700;
        font-size: 10px;
        text-transform: uppercase;
        border: 1px solid #cbd5e1;
        padding: 6px 8px;
    }}
    .items-table td {{
        border: 1px solid #cbd5e1;
        padding: 6px 8px;
        font-size: 10.5px;
    }}
    .totals-table {{
        width: 100%;
        border-collapse: collapse;
    }}
    .totals-table td {{
        padding: 4px 8px;
        font-size: 11px;
    }}
    .footer-note {{
        margin-top: 14px;
        border-top: 1px solid #e2e8f0;
        padding-top: 8px;
        font-size: 9.5px;
        color: #64748b;
    }}
</style>
</head>
<body>
<div class="invoice-container">
    <table class="header-table">
        <tr>
            <td style="width:60%;">
                <div class="title">TAX INVOICE</div>
                <div style="font-size:14px; font-weight:700; color:#1e293b; margin-top:4px;">{supp['name']}</div>
                <div style="color:#475569; font-size:11px;">{supp['address']}, {supp['city']} - {supp['pincode']}, {supp['state']}</div>
                <div style="margin-top:4px;">
                    <strong>GSTIN:</strong> {supp['gstin']} &nbsp;|&nbsp; <strong>PAN:</strong> {supp['pan']} &nbsp;|&nbsp; <strong>State Code:</strong> {supp['stateCode']}
                </div>
            </td>
            <td style="width:40%; text-align:right;">
                <span class="badge">ORIGINAL FOR RECIPIENT</span>
                <div style="margin-top:6px; font-size:12px;"><strong>Invoice No:</strong> <span style="color:#0a6ed1; font-weight:700;">{inv['invoiceNumber']}</span></div>
                <div style="font-size:11px;"><strong>Invoice Date:</strong> {inv.get('invoiceDate', '2026-10-01')}</div>
                <div style="font-size:11px;"><strong>Due Date:</strong> {inv.get('dueDate', '2026-10-31')}</div>
                <div style="font-size:11px; margin-top:3px;"><strong>PO Reference:</strong> <span style="font-weight:700; color:#b25900;">{po_ref if po_ref else 'NON-PO INVOICE'}</span></div>
            </td>
        </tr>
    </table>

    {irn_block}

    <table class="two-col">
        <tr>
            <td>
                <div class="meta-box">
                    <strong style="color:#0f172a; text-transform:uppercase; font-size:10px; letter-spacing:0.5px;">Billed To (Customer):</strong>
                    <div style="font-weight:700; font-size:12px; margin-top:2px;">{BUYER_INFO['name']}</div>
                    <div>{BUYER_INFO['address']}</div>
                    <div>{BUYER_INFO['city']}, {BUYER_INFO['state']} - {BUYER_INFO['pincode']}</div>
                    <div style="margin-top:4px;"><strong>GSTIN:</strong> {BUYER_INFO['gstin']} &nbsp;|&nbsp; <strong>State Code:</strong> {BUYER_INFO['stateCode']}</div>
                </div>
            </td>
            <td>
                <div class="meta-box">
                    <strong style="color:#0f172a; text-transform:uppercase; font-size:10px; letter-spacing:0.5px;">Shipped To / Consignee:</strong>
                    <div style="font-weight:700; font-size:12px; margin-top:2px;">{BUYER_INFO['name']}</div>
                    <div>Plant 1010 Receiving Bay 2</div>
                    <div>{BUYER_INFO['city']}, {BUYER_INFO['state']} - {BUYER_INFO['pincode']}</div>
                    <div style="margin-top:4px;"><strong>Plant Code:</strong> 1010 &nbsp;|&nbsp; <strong>Storage Loc:</strong> 101A</div>
                </div>
            </td>
        </tr>
    </table>

    <table class="items-table">
        <thead>
            <tr>
                <th style="width:30px;">#</th>
                <th>Description of Goods / Services</th>
                <th style="width:70px;">Qty</th>
                <th style="width:75px;">Unit Price</th>
                <th style="width:85px;">Taxable Value</th>
                <th style="width:50px;">Tax Rate</th>
                <th style="width:75px;">Tax Amount</th>
                <th style="width:90px;">Total (INR)</th>
            </tr>
        </thead>
        <tbody>
            {items_html}
        </tbody>
    </table>

    <table style="width:100%; border-collapse:collapse;">
        <tr>
            <td style="width:55%; vertical-align:top;">
                <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:10px; border-radius:4px;">
                    <div style="font-weight:700; font-size:10px; text-transform:uppercase; color:#475569;">Bank & Payment Details:</div>
                    <div style="margin-top:4px; font-size:10.5px;">{supp['bank']}</div>
                    <div style="margin-top:4px; font-size:10.5px;"><strong>Payment Terms:</strong> 30 Days Net from Invoice Date</div>
                    <div style="margin-top:4px; font-size:10.5px;"><strong>Currency:</strong> Indian Rupee (INR)</div>
                </div>
                <div style="margin-top:8px; font-size:10px; color:#475569;">
                    <strong>Amount Chargeable (in words):</strong><br>
                    <em>{number_to_words(inv.get('totalGrossAmount', 0))}</em>
                </div>
            </td>
            <td style="width:45%; vertical-align:top;">
                <table class="totals-table">
                    <tr>
                        <td style="color:#64748b;">Total Taxable Amount:</td>
                        <td style="text-align:right; font-weight:600;">₹{inv.get('totalNetAmount', 0):,.2f}</td>
                    </tr>
                    {"<tr><td style='color:#64748b;'>Integrated Tax (IGST 18%):</td><td style='text-align:right; font-weight:600;'>₹" + f"{igst_amt:,.2f}" + "</td></tr>" if is_igst else f"<tr><td style='color:#64748b;'>Central Tax (CGST 9%):</td><td style='text-align:right; font-weight:600;'>₹{cgst_amt:,.2f}</td></tr><tr><td style='color:#64748b;'>State Tax (SGST 9%):</td><td style='text-align:right; font-weight:600;'>₹{sgst_amt:,.2f}</td></tr>"}
                    <tr style="border-top:1px solid #cbd5e1; border-bottom:2px solid #0f172a;">
                        <td style="font-weight:700; font-size:12px; color:#0f172a; padding-top:6px; padding-bottom:6px;">Total Invoice Value:</td>
                        <td style="text-align:right; font-weight:800; font-size:13px; color:#0a6ed1; padding-top:6px; padding-bottom:6px;">₹{inv.get('totalGrossAmount', 0):,.2f}</td>
                    </tr>
                </table>
                <div style="text-align:right; margin-top:20px;">
                    <div style="font-size:10px; color:#475569;">For <strong>{supp['name']}</strong></div>
                    <div style="margin-top:24px; font-size:10px; font-weight:bold; color:#0f172a;">Authorized Signatory</div>
                </div>
            </td>
        </tr>
    </table>

    <div class="footer-note">
        This is a computer-generated tax invoice issued in accordance with Rule 46 of the CGST Rules, 2017.
        Internal Key: <strong>{inv['invoiceId']}</strong> &nbsp;|&nbsp; Certified True Copy.
    </div>
</div>
</body>
</html>
"""

def generate_pdf(html_content, output_pdf_path):
    temp_html = output_pdf_path + ".temp.html"
    with open(temp_html, 'w', encoding='utf-8') as f:
        f.write(html_content)

    cmd = [
        BROWSER_PATH,
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        f"--print-to-pdf={output_pdf_path}",
        temp_html
    ]

    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(temp_html):
        os.remove(temp_html)

    if res.returncode == 0 and os.path.exists(output_pdf_path):
        return True
    else:
        print(f"Error generating PDF {output_pdf_path}: {res.stderr}")
        return False

def generate_eml(inv, supp, pdf_bytes, eml_path):
    msg = email.message.EmailMessage()
    sender = inv.get("channelMetadata", {}).get("emailSender", f"billing@{supp['name'].lower().replace(' ', '')}.com")
    subject = inv.get("channelMetadata", {}).get("emailSubject", f"Tax Invoice {inv['invoiceNumber']} - Ref PO {inv.get('purchaseOrderReference', 'N/A')}")
    message_id = inv.get("channelMetadata", {}).get("emailMessageId", f"<{inv['invoiceId']}@vendor.mail.sap>")

    msg['From'] = f"{supp['name']} Accounts <{sender}>"
    msg['To'] = "Accounts Payable <ap-invoices@enterprise.com>"
    msg['Subject'] = subject
    msg['Date'] = email.utils.formatdate(usegmt=True)
    msg['Message-ID'] = message_id
    msg['X-SPF-Status'] = "PASS"
    msg['X-DKIM-Status'] = "PASS"

    body_text = f"""Dear Enterprise Accounts Payable Team,

Please find attached our official tax invoice {inv['invoiceNumber']} for ₹{inv.get('totalGrossAmount', 0):,.2f}.

Invoice Details:
- Invoice ID: {inv['invoiceId']}
- Vendor: {supp['name']}
- Purchase Order: {inv.get('purchaseOrderReference', 'Non-PO / Service')}
- Amount: ₹{inv.get('totalGrossAmount', 0):,.2f}
- Due Date: {inv.get('dueDate', '30 Days Net')}

Kindly process and schedule payment according to agreed terms.

Sincerely,
Accounts Receivable Department
{supp['name']}
Tel: +91 22 6790 0000 | Email: {sender}
"""

    msg.set_content(body_text)

    # Attach PDF
    att_name = inv.get("channelMetadata", {}).get("attachmentName", f"{inv['invoiceId']}.pdf")
    msg.add_attachment(
        pdf_bytes,
        maintype='application',
        subtype='pdf',
        filename=att_name
    )

    with open(eml_path, 'wb') as f:
        f.write(msg.as_bytes())

def generate_irp_payload(inv, supp):
    is_igst = supp["stateCode"] != BUYER_INFO["stateCode"]
    items = []
    tot_val = 0
    tot_ass = 0
    tot_igst = 0
    tot_cgst = 0
    tot_sgst = 0

    for idx, item in enumerate(inv.get("lineItems", []), 1):
        net = item.get("netAmount", 0)
        rate = item.get("unitPrice", 0)
        qty = item.get("quantity", 0)
        tax_pct = item.get("taxRate", 18.0)
        item_tax = net * (tax_pct / 100)
        item_tot = net + item_tax

        tot_ass += net
        tot_val += item_tot
        if is_igst:
            tot_igst += item_tax
        else:
            tot_cgst += item_tax / 2
            tot_sgst += item_tax / 2

        items.append({
            "SlNo": str(idx),
            "PrdDesc": item.get("description", "Material Item"),
            "IsServc": "Y" if "Consulting" in item.get("description", "") or "Service" in item.get("description", "") else "N",
            "HsnCd": item.get("materialNumber", "85371000")[:8].replace("-", "") if item.get("materialNumber") else "85371000",
            "Qty": qty,
            "Unit": item.get("unitOfMeasure", "NOS"),
            "UnitPrice": rate,
            "TotAmt": net,
            "Discount": 0,
            "AssAmt": net,
            "GstRt": tax_pct,
            "IgstAmt": item_tax if is_igst else 0,
            "CgstAmt": 0 if is_igst else item_tax / 2,
            "SgstAmt": 0 if is_igst else item_tax / 2,
            "TotItemVal": item_tot
        })

    irn = inv.get("channelMetadata", {}).get("irn", f"mock_irn_{inv['invoiceId']}_64char_checksum_hash_d9f481a8b27c3e")
    ack_no = inv.get("channelMetadata", {}).get("acknowledgementNumber", "112026009841")
    ack_dt = inv.get("channelMetadata", {}).get("acknowledgementDate", "2026-10-04 05:00:00")

    payload = {
        "Version": "1.1",
        "Irn": irn,
        "AckNo": int(ack_no) if ack_no.isdigit() else 112026009841,
        "AckDt": ack_dt,
        "TranDtls": {
            "TaxSch": "GST",
            "SupTyp": "B2B"
        },
        "DocDtls": {
            "Typ": "INV",
            "No": inv["invoiceNumber"],
            "Dt": inv.get("invoiceDate", "2026-10-04")
        },
        "SellerDtls": {
            "Gstin": supp["gstin"],
            "LglNm": supp["name"],
            "Addr1": supp["address"],
            "Loc": supp["city"],
            "Pin": int(supp["pincode"]),
            "Stcd": supp["stateCode"]
        },
        "BuyerDtls": {
            "Gstin": BUYER_INFO["gstin"],
            "LglNm": BUYER_INFO["name"],
            "Addr1": BUYER_INFO["address"],
            "Loc": BUYER_INFO["city"],
            "Pin": int(BUYER_INFO["pincode"]),
            "Stcd": BUYER_INFO["stateCode"]
        },
        "ItemList": items,
        "ValDtls": {
            "AssVal": tot_ass,
            "CgstVal": tot_cgst,
            "SgstVal": tot_sgst,
            "IgstVal": tot_igst,
            "TotInvVal": tot_val
        },
        "RefDtls": {
            "PoRef": inv.get("purchaseOrderReference", "")
        }
    }
    return payload

def main():
    print("===============================================================")
    print("  SAP INVOICE DECISION INTELLIGENCE — INBOUND GENERATOR")
    print("===============================================================")
    print(f"Base Directory: {BASE_DIR}")
    print(f"Browser for PDF conversion: {BROWSER_PATH}")

    if not BROWSER_PATH:
        print("ERROR: Neither Chrome nor Edge executable was found.")
        sys.exit(1)

    # 1. Ensure target directory structure exists
    dirs = [
        os.path.join(INBOUND_DIR, "physical-gate-scanner", "documents"),
        os.path.join(INBOUND_DIR, "physical-gate-scanner", "metadata"),
        os.path.join(INBOUND_DIR, "vendor-ap-mailbox", "emails"),
        os.path.join(INBOUND_DIR, "vendor-ap-mailbox", "attachments"),
        os.path.join(INBOUND_DIR, "vendor-ap-mailbox", "metadata"),
        os.path.join(INBOUND_DIR, "government-einvoice-irp", "documents"),
        os.path.join(INBOUND_DIR, "government-einvoice-irp", "payloads"),
        os.path.join(INBOUND_DIR, "government-einvoice-irp", "metadata"),
    ]
    for d in dirs:
        os.makedirs(d, exist_ok=True)

    # 2. Collect all invoice records from mock-data/invoices
    invoices = []
    inv_dirs = [
        ('PHYSICAL_SCAN', os.path.join(MOCK_DATA_DIR, 'invoices', 'physical')),
        ('EMAIL_INBOUND', os.path.join(MOCK_DATA_DIR, 'invoices', 'email')),
        ('GOVERNMENT_EINVOICE', os.path.join(MOCK_DATA_DIR, 'invoices', 'einvoice')),
    ]

    for default_channel, folder in inv_dirs:
        if not os.path.exists(folder):
            continue
        for f in os.listdir(folder):
            if f.endswith('.json'):
                p = os.path.join(folder, f)
                with open(p, 'r', encoding='utf-8') as fp:
                    inv = json.load(fp)
                    if not inv.get("sourceChannel"):
                        inv["sourceChannel"] = default_channel
                    invoices.append(inv)

    print(f"Found {len(invoices)} invoices across existing datasets.")

    # 3. Generate documents for each invoice
    for inv in invoices:
        inv_id = inv["invoiceId"]
        supp_id = inv.get("supplierId", "10002450")
        supp = SUPPLIER_PROFILES.get(supp_id, SUPPLIER_PROFILES["10002450"])
        channel = inv.get("sourceChannel", "PHYSICAL_SCAN")
        po_ref = inv.get("purchaseOrderReference")

        irn = inv.get("channelMetadata", {}).get("irn")
        html = generate_invoice_html(inv, supp, po_ref, irn)

        if channel == "PHYSICAL_SCAN":
            pdf_path = os.path.join(INBOUND_DIR, "physical-gate-scanner", "documents", f"{inv_id}.pdf")
            generate_pdf(html, pdf_path)

            # Metadata
            meta = {
                "invoiceId": inv_id,
                "sourceChannel": "PHYSICAL_GATE_SCANNER",
                "sourceFile": f"{inv_id}.pdf",
                "plant": "1010",
                "scannerLocation": inv.get("channelMetadata", {}).get("scannerLocation", "Plant 1010 Security Gate 2 Scanner"),
                "operatorId": inv.get("channelMetadata", {}).get("operatorId", "OP-4491"),
                "captureTimestamp": inv.get("intakeTimestamp", "2026-09-30T09:15:00.000Z"),
                "ocrStatus": "CAPTURED",
                "ocrResolution": f"{inv.get('channelMetadata', {}).get('scanDpi', 300)} DPI",
                "ocrConfidence": 98.4
            }
            meta_path = os.path.join(INBOUND_DIR, "physical-gate-scanner", "metadata", f"{inv_id}.json")
            with open(meta_path, 'w', encoding='utf-8') as fp:
                json.dump(meta, fp, indent=2)

            print(f"[PHYSICAL] Generated {inv_id}.pdf and metadata")

        elif channel == "EMAIL_INBOUND":
            att_name = inv.get("channelMetadata", {}).get("attachmentName", f"{inv_id}.pdf")
            att_path = os.path.join(INBOUND_DIR, "vendor-ap-mailbox", "attachments", f"{inv_id}.pdf")
            generate_pdf(html, att_path)

            with open(att_path, 'rb') as fp:
                pdf_bytes = fp.read()

            eml_path = os.path.join(INBOUND_DIR, "vendor-ap-mailbox", "emails", f"email_{inv_id}.eml")
            generate_eml(inv, supp, pdf_bytes, eml_path)

            meta = {
                "invoiceId": inv_id,
                "sourceChannel": "VENDOR_AP_MAILBOX",
                "mailbox": "ap-invoices@enterprise.com",
                "senderEmail": inv.get("channelMetadata", {}).get("emailSender", f"billing@{supp['name'].lower().replace(' ', '')}.com"),
                "spfStatus": "PASS",
                "dkimStatus": "PASS",
                "attachmentCount": 1,
                "attachmentName": att_name,
                "attachmentFile": f"{inv_id}.pdf",
                "receivedTimestamp": inv.get("channelMetadata", {}).get("emailReceivedAt", inv.get("intakeTimestamp"))
            }
            meta_path = os.path.join(INBOUND_DIR, "vendor-ap-mailbox", "metadata", f"{inv_id}.json")
            with open(meta_path, 'w', encoding='utf-8') as fp:
                json.dump(meta, fp, indent=2)

            print(f"[EMAIL] Generated email_{inv_id}.eml, {inv_id}.pdf, and metadata")

        elif channel == "GOVERNMENT_EINVOICE":
            pdf_path = os.path.join(INBOUND_DIR, "government-einvoice-irp", "documents", f"{inv_id}.pdf")
            generate_pdf(html, pdf_path)

            payload = generate_irp_payload(inv, supp)
            payload_path = os.path.join(INBOUND_DIR, "government-einvoice-irp", "payloads", f"{inv_id}.json")
            with open(payload_path, 'w', encoding='utf-8') as fp:
                json.dump(payload, fp, indent=2)

            meta = {
                "invoiceId": inv_id,
                "sourceChannel": "GOVERNMENT_EINVOICE_IRP",
                "irn": payload["Irn"],
                "acknowledgementNumber": str(payload["AckNo"]),
                "acknowledgementDate": payload["AckDt"],
                "sourceStatus": "RECEIVED",
                "reconciliationStatus": "PENDING",
                "documentFile": f"{inv_id}.pdf"
            }
            meta_path = os.path.join(INBOUND_DIR, "government-einvoice-irp", "metadata", f"{inv_id}.json")
            with open(meta_path, 'w', encoding='utf-8') as fp:
                json.dump(meta, fp, indent=2)

            print(f"[GOVERNMENT] Generated {inv_id}.pdf, IRP payload, and metadata")

    print("SUCCESS: Inbound documents generation complete.")

if __name__ == '__main__':
    main()
