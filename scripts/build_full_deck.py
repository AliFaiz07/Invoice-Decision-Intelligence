"""
Comprehensive Generator for:
1. Invoice_Decision_Intelligence_AIS_Presentation.pptx (12 Widescreen Slides + Embedded Notes)
2. Invoice_Decision_Intelligence_Presentation_Notes.docx (Client-Ready Comprehensive Speaker Notes)
3. Invoice_Decision_Intelligence_Presentation.pdf (Native High-Fidelity PDF via PowerPoint COM)
"""

import os
import sys
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import docx
from docx.shared import Inches as DocxInches, Pt as DocxPt, RGBColor as DocxRGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

OUTPUT_DIR = r"C:\Users\ali\Downloads"
PPTX_PATH = os.path.join(OUTPUT_DIR, "Invoice_Decision_Intelligence_AIS_Presentation.pptx")
DOCX_PATH = os.path.join(OUTPUT_DIR, "Invoice_Decision_Intelligence_Presentation_Notes.docx")
PDF_PATH = os.path.join(OUTPUT_DIR, "Invoice_Decision_Intelligence_Presentation.pdf")
ARCH_IMG_PATH = os.path.join(OUTPUT_DIR, "Invoice Decision Intelligence Architecture.png")

# --- COLOR PALETTE ---
C_NAVY = RGBColor(10, 37, 64)        # #0A2540 - Primary Dark
C_SAP_BLUE = RGBColor(0, 102, 204)   # #0066CC - SAP Sapphire Blue
C_TEAL = RGBColor(2, 132, 199)       # #0284C7 - Accent Cyan/Teal
C_SLATE = RGBColor(30, 41, 59)       # #1E293B - Deep Text Slate
C_MUTED = RGBColor(100, 116, 139)    # #64748B - Muted Subtitle
C_LIGHT_BG = RGBColor(248, 250, 252) # #F8FAFC - Card Surface
C_BORDER = RGBColor(226, 232, 240)   # #E2E8F0 - Border Grey
C_WHITE = RGBColor(255, 255, 255)    # #FFFFFF - White
C_GREEN = RGBColor(16, 126, 62)      # #107E3E - Positive Green
C_AMBER = RGBColor(217, 119, 6)      # #D97706 - Warning Amber
C_RED = RGBColor(220, 38, 38)        # #DC2626 - Critical Red
C_PILL_BG = RGBColor(234, 243, 254)  # #EAF3FE - Tag Pill Background
C_PILL_TXT = RGBColor(0, 90, 180)    # #005AB4 - Tag Pill Text
C_DARK_CARD = RGBColor(19, 47, 76)   # #132F4C - Dark Card Surface

def add_header(slide, tag_text, title_text, subtitle_text):
    """Standard header for content slides."""
    # Tag Pill
    tag_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.42), Inches(3.0), Inches(0.26))
    tag_box.fill.solid()
    tag_box.fill.fore_color.rgb = C_PILL_BG
    tag_box.line.color.rgb = C_PILL_BG
    tf = tag_box.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.text = tag_text.upper()
    p.font.name = "Arial"
    p.font.size = Pt(8.5)
    p.font.bold = True
    p.font.color.rgb = C_PILL_TXT
    p.alignment = PP_ALIGN.CENTER

    # Title
    t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.72), Inches(11.733), Inches(0.45))
    tf = t_box.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.text = title_text
    p.font.name = "Arial"
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = C_NAVY

    # Subtitle
    s_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.20), Inches(11.733), Inches(0.35))
    tf = s_box.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.text = subtitle_text
    p.font.name = "Arial"
    p.font.size = Pt(10.5)
    p.font.color.rgb = C_MUTED

def add_footer(slide, current_slide, total_slides=12):
    """Standard footer across all slides."""
    # Thin divider line
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(6.98), Inches(11.733), Inches(0.015))
    line.fill.solid()
    line.fill.fore_color.rgb = RGBColor(226, 232, 240)
    line.line.color.rgb = RGBColor(226, 232, 240)

    f_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.05), Inches(11.733), Inches(0.3))
    tf = f_box.text_frame
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.text = f"Invoice Decision Intelligence  |  AIS Digital Team Presentation                                                                                                               Slide {current_slide} of {total_slides}"
    p.font.name = "Arial"
    p.font.size = Pt(8.5)
    p.font.color.rgb = RGBColor(148, 163, 184)

def add_card(slide, left, top, width, height, border_color=C_BORDER, fill_color=C_LIGHT_BG):
    """Add card shape background."""
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    card.fill.solid()
    card.fill.fore_color.rgb = fill_color
    card.line.color.rgb = border_color
    card.line.width = Pt(1)
    return card

def set_shape_text(shape, text, font_size=9, bold=False, color=C_SLATE, align=PP_ALIGN.LEFT):
    tf = shape.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.name = "Arial"
    p.font.size = Pt(font_size)
    p.font.bold = bold
    p.font.color.rgb = color
    p.alignment = align

def set_cell_format(cell, text, font_size=8.5, bold=False, color=C_SLATE, bg_color=None, align=PP_ALIGN.LEFT):
    cell.text = text
    p = cell.text_frame.paragraphs[0]
    p.font.name = "Arial"
    p.font.size = Pt(font_size)
    p.font.bold = bold
    p.font.color.rgb = color
    p.alignment = align
    cell.vertical_anchor = MSO_ANCHOR.MIDDLE
    if bg_color:
        cell.fill.solid()
        cell.fill.fore_color.rgb = bg_color

# Store notes for docx generation
NOTES_DICT = {}

def build_all_slides():
    prs = pptx.Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # =========================================================================
    # SLIDE 1: Title Slide (Dark Theme)
    # =========================================================================
    slide1 = prs.slides.add_slide(blank_layout)
    bg1 = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = C_NAVY
    bg1.line.color.rgb = C_NAVY

    # Decorative top bar
    top_bar = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(0.08))
    top_bar.fill.solid()
    top_bar.fill.fore_color.rgb = C_SAP_BLUE
    top_bar.line.color.rgb = C_SAP_BLUE

    # Pill tag
    t1_tag = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.0), Inches(0.9), Inches(3.6), Inches(0.32))
    t1_tag.fill.solid()
    t1_tag.fill.fore_color.rgb = C_DARK_CARD
    t1_tag.line.color.rgb = C_TEAL
    tf = t1_tag.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "ENTERPRISE ARCHITECTURE & DECISION INTELLIGENCE"
    p.font.name = "Arial"
    p.font.size = Pt(8.5)
    p.font.bold = True
    p.font.color.rgb = C_TEAL
    p.alignment = PP_ALIGN.CENTER

    # Main Title
    t1_box = slide1.shapes.add_textbox(Inches(1.0), Inches(1.35), Inches(11.3), Inches(1.1))
    tf = t1_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Invoice Decision Intelligence"
    p.font.name = "Arial"
    p.font.size = Pt(40)
    p.font.bold = True
    p.font.color.rgb = C_WHITE

    # Subtitle
    sub1_box = slide1.shapes.add_textbox(Inches(1.0), Inches(2.45), Inches(11.3), Inches(0.6))
    tf = sub1_box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Intelligent Invoice Validation, Exception Management & Finance Decision Support on SAP BTP"
    p.font.name = "Arial"
    p.font.size = Pt(17)
    p.font.color.rgb = RGBColor(147, 197, 253)

    # Info card container
    card1 = add_card(slide1, Inches(1.0), Inches(3.3), Inches(11.333), Inches(2.6), border_color=RGBColor(30, 58, 138), fill_color=C_DARK_CARD)

    # Info grid inside card
    meta_box = slide1.shapes.add_textbox(Inches(1.4), Inches(3.5), Inches(10.5), Inches(1.5))
    tf = meta_box.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = "PROJECT METADATA & EXECUTIVE PROFILE"
    p.font.name = "Arial"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = C_TEAL
    
    items = [
        ("Prepared For:", "Digital Team, Abhiyanta India Solutions (AIS)", "Platform Architecture:", "SAP BTP Cloud Foundry & S/4HANA Cloud (Clean Core)"),
        ("Prepared By:", "Ali Faiz", "Role / Capacity:", "AI/ML Intern, Enterprise Technology"),
        ("Date:", "October 12, 2026", "Operational Status:", "Live Prototype on SAP BTP Cloud Foundry (Dev Space)")
    ]
    for row in items:
        p = tf.add_paragraph()
        run1 = p.add_run()
        run1.text = f"{row[0]} "
        run1.font.bold = True
        run1.font.size = Pt(10)
        run1.font.color.rgb = RGBColor(203, 213, 225)
        
        run2 = p.add_run()
        run2.text = f"{row[1]:<45}"
        run2.font.bold = False
        run2.font.size = Pt(10)
        run2.font.color.rgb = C_WHITE
        
        run3 = p.add_run()
        run3.text = f"{row[2]} "
        run3.font.bold = True
        run3.font.size = Pt(10)
        run3.font.color.rgb = RGBColor(203, 213, 225)
        
        run4 = p.add_run()
        run4.text = f"{row[3]}"
        run4.font.bold = False
        run4.font.size = Pt(10)
        run4.font.color.rgb = C_WHITE

    # Badges at bottom of card
    pills = ["SAP BTP CLEAN CORE", "DETERMINISTIC 3-WAY LIV", "EXPLAINABLE AI (XAI)", "48H STATUTORY SLA", "FIORI HORIZON UX"]
    pill_w = Inches(2.05)
    for i, pill in enumerate(pills):
        p_shape = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.4 + i * 2.15), Inches(5.2), pill_w, Inches(0.35))
        p_shape.fill.solid()
        p_shape.fill.fore_color.rgb = RGBColor(15, 30, 60)
        p_shape.line.color.rgb = C_TEAL
        p_shape.line.width = Pt(1)
        tf = p_shape.text_frame
        p = tf.paragraphs[0]
        p.text = pill
        p.font.name = "Arial"
        p.font.size = Pt(8)
        p.font.bold = True
        p.font.color.rgb = RGBColor(186, 230, 253)
        p.alignment = PP_ALIGN.CENTER

    # Footer slide 1
    f1_box = slide1.shapes.add_textbox(Inches(1.0), Inches(6.8), Inches(11.3), Inches(0.4))
    tf = f1_box.text_frame
    p = tf.paragraphs[0]
    p.text = "Abhiyanta India Solutions (AIS)  |  Confidential  |  Client-Ready Architecture Briefing"
    p.font.name = "Arial"
    p.font.size = Pt(8.5)
    p.font.color.rgb = RGBColor(100, 116, 139)

    slide1.notes_slide.notes_text_frame.text = (
        "SLIDE 1: TITLE PAGE & EXECUTIVE INTRODUCTION\n\n"
        "1. What the presenter should explain:\n"
        "Welcome team. Today I am presenting 'Invoice Decision Intelligence', an enterprise platform designed for SAP BTP and S/4HANA. "
        "The project addresses the critical friction between multi-channel invoice intake and Logistics Invoice Verification (LIV). "
        "I am presenting this to the Digital Team at Abhiyanta India Solutions as an AI/ML Intern on October 12, 2026.\n\n"
        "2. Business Meaning:\n"
        "In enterprise finance, invoices arrive through diverse channels: dock scanners, emails, and statutory government portals. "
        "Finance teams are overwhelmed by manual reconciliation, tolerance breaches, duplicate risk, and compliance deadlines. "
        "This platform provides a cognitive decision layer that standardizes intake, evaluates 3-way matching rules deterministically, and provides explainable decision support.\n\n"
        "3. Technical Details & Reality Boundary:\n"
        "The prototype is live and deployed on SAP BTP Cloud Foundry in our organization's Dev space. "
        "It uses Node.js TypeScript with SAP Fiori Horizon UX. All SAP business data and OData calls are currently driven by a high-fidelity "
        "in-memory simulator ('MockSAPAdapter') pre-seeded with 10 real enterprise scenarios. We do not claim live connections to SAP S/4HANA or GSTN in this demo.\n\n"
        "4. Likely Questions from the Digital Team:\n"
        "Q: Is this connected to an actual S/4HANA system right now?\n"
        "A: In the current demo, no. It connects through an ISAPAdapter interface using MockSAPAdapter for repeatable, audit-ready demonstration. "
        "The production adapter (S4HanaCloudAdapter) using SAP Cloud SDK is architected and ready for destination binding in Phase 2."
    )

    # =========================================================================
    # SLIDE 2: Executive Summary (4 Grid Cards)
    # =========================================================================
    slide2 = prs.slides.add_slide(blank_layout)
    add_header(slide2, "Executive Briefing", "Executive Summary: Cognitive Layer for AP Decisioning", 
               "Bridging multi-channel invoice intake and SAP S/4HANA with audit-transparent intelligence")
    add_footer(slide2, 2)

    cards_data2 = [
        ("1. Business Problem", C_RED, [
            "• Multi-Channel Chaos: Invoices arrive via paper gate scans, vendor emails, and government IRP e-invoices with disparate schemas.",
            "• Manual Matching Latency: AP clerks spend hours cross-referencing PO line items, Goods Receipts (GR), and QM inspection lots.",
            "• Financial Leakage: Undetected unit price creeps (Tolerance PP), quantity over-billing (Tolerance DQ), and duplicate payments.",
            "• Statutory Pressure: 48-hour legal SLA on Indian GST e-invoices creates severe cancellation and audit liabilities."
        ]),
        ("2. Proposed Solution", C_SAP_BLUE, [
            "• Canonical Normalization: Converts physical scans, email fixtures, and IRP JSON into a single canonical invoice model.",
            "• Deterministic 3-Way LIV: Cross-references PO, GR, and Quality records against SAP tolerance keys (DQ, PP, BD).",
            "• Evidence-First XAI: Separates auditable FACTS from SYSTEM RECOMMENDATIONS, producing 4-step auditable rationales.",
            "• Segregation of Duties: Strict workflow boundaries separating business validation, finance review (MIR7/MIRO), and payment."
        ]),
        ("3. Current Demo Proof", C_GREEN, [
            "• Live on SAP BTP: Successfully deployed and running on SAP BTP Cloud Foundry (EU10-005 landscape, Dev space).",
            "• 10 Enterprise Scenarios: Pre-seeded with realistic cases (clean match, quantity variance, price breach, duplicate, QM defect, SLA).",
            "• 138 Automated Tests: 100% test pass rate verifying 3-way matching, tolerance enforcement, state transitions, and audit trails.",
            "• SAP Fiori Horizon UI: Complete 10-view enterprise workspace with interactive Decision Center and Joule-style assistant."
        ]),
        ("4. Production Path", C_AMBER, [
            "• Clean-Core SAP SDK: Replace MockSAPAdapter with S4HanaCloudAdapter via @sap-cloud-sdk/http-client and BTP Destinations.",
            "• Cognitive Intake: Integrate SAP Document Information Extraction (DOX) via SAP AI Core and SAP CPI mail listener.",
            "• Statutory Integration: Connect SAP Document and Reporting Compliance (DRC) or licensed GSP/ASP for live GSTR-2B sync.",
            "• Enterprise Approval: Route business validations to SAP Build Process Automation (SBPA) and Fiori My Inbox."
        ])
    ]

    gw = Inches(5.66)
    gh = Inches(2.4)
    coords2 = [
        (Inches(0.8), Inches(1.8)),
        (Inches(6.866), Inches(1.8)),
        (Inches(0.8), Inches(4.45)),
        (Inches(6.866), Inches(4.45))
    ]

    for idx, (title, color_top, bullets) in enumerate(cards_data2):
        left, top = coords2[idx]
        add_card(slide2, left, top, gw, gh)
        
        # Color bar indicator on top of card
        bar = slide2.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, gw, Inches(0.06))
        bar.fill.solid()
        bar.fill.fore_color.rgb = color_top
        bar.line.color.rgb = color_top
        
        # Title
        t_box = slide2.shapes.add_textbox(left + Inches(0.2), top + Inches(0.12), gw - Inches(0.4), Inches(0.35))
        tf = t_box.text_frame
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = "Arial"
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        
        # Bullets
        b_box = slide2.shapes.add_textbox(left + Inches(0.2), top + Inches(0.48), gw - Inches(0.4), gh - Inches(0.55))
        tf = b_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        for i, b in enumerate(bullets):
            p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
            p.text = b
            p.font.name = "Arial"
            p.font.size = Pt(9)
            p.font.color.rgb = C_SLATE
            p.space_after = Pt(3)

    slide2.notes_slide.notes_text_frame.text = (
        "SLIDE 2: EXECUTIVE SUMMARY\n\n"
        "1. What the presenter should explain:\n"
        "This slide gives executive leadership the high-level picture in four clear quadrants: the business problem, our proposed solution, "
        "what we have verified in our live demo, and the clear path to production.\n\n"
        "2. Business Meaning:\n"
        "Enterprise invoice processing is broken because intake is fragmented across paper, email, and portals. AP clerks act as human routers, "
        "spending valuable time on routine 3-way matching and missing subtle price creep or duplicate submissions. "
        "Our solution introduces cognitive automation on SAP BTP to eliminate routine manual effort while putting impenetrable guardrails around high-risk transactions.\n\n"
        "3. Technical Details:\n"
        "Highlight that our current proof is not just mock UI screens. It is a live Node.js application deployed on SAP BTP Cloud Foundry, "
        "backed by 138 passing automated tests. It evaluates real SAP Logistics Invoice Verification tolerance keys (DQ for quantity, PP for price). "
        "For production, we cleanly replace the in-memory store with SAP Cloud SDK and SAP Document Information Extraction.\n\n"
        "4. Likely Questions:\n"
        "Q: What is the main differentiator between this and a standard OCR tool?\n"
        "A: OCR merely extracts text. Decision Intelligence understands the procurement context: cross-referencing against SAP POs, Goods Receipts, "
        "Quality inspection lots, duplicate indices, and statutory GST data to make audit-ready business recommendations."
    )

    # =========================================================================
    # SLIDE 3: Business Problem (4 Horizontal Problem Cards)
    # =========================================================================
    slide3 = prs.slides.add_slide(blank_layout)
    add_header(slide3, "Problem Context", "The Enterprise Challenge: Friction & Leakage in AP", 
               "Core operational vulnerabilities across intake channels, 3-way matching, compliance, and governance")
    add_footer(slide3, 3)

    prob_cards = [
        ("A. Multi-Channel Ingestion Chaos", C_NAVY, 
         "Invoices enter through disparate, uncoordinated pipelines: physical paper scanned at security gates, PDF attachments in shared AP mailboxes, and statutory JSON payloads from the government Invoice Registration Portal (IRP). "
         "There is no unified intake ledger, resulting in missing invoices, lost attachments, and zero real-time operational visibility into inbound processing liability."),
        
        ("B. Manual 3-Way Reconciliation Bottlenecks", C_SAP_BLUE, 
         "AP specialists manually compare paper/PDF line items against SAP Purchase Orders and Material Documents (GRs). Verifying whether delivered goods passed plant quality inspections (SAP QM inspection lots) requires switching between multiple SAP GUI/Fiori screens. "
         "This manual bottleneck delays month-end financial closing and incurs costly vendor dispute cycles."),
        
        ("C. Financial Leakage & Statutory Compliance Exposure", C_AMBER, 
         "Subtle price creep exceeding contracted PO rates (Tolerance PP) frequently goes unnoticed. Duplicate invoices submitted via alternate channels bypass standard checks, leading to double disbursements. "
         "Furthermore, under statutory GST rules, buyers face blocked Input Tax Credit (ITC) if vendor filings do not match GSTR-2B, alongside strict 48-hour e-invoice cancellation windows."),
        
        ("D. Ambiguous Ownership & Separation-of-Duties Risk", C_RED, 
         "Organizations frequently conflate operational delivery confirmation (Business Owner validation) with financial posting (MIR7 park / MIRO post) and cash release (F110 payment). "
         "Without clear technical role boundaries and tamper-proof audit trails, enterprises face severe SOX 404 deficiencies, audit penalties, and unauthorized disbursements.")
    ]

    card_y = Inches(1.8)
    card_h = Inches(1.15)
    gap_y = Inches(0.14)

    for idx, (p_title, p_color, p_desc) in enumerate(prob_cards):
        top_pos = card_y + idx * (card_h + gap_y)
        add_card(slide3, Inches(0.8), top_pos, Inches(11.733), card_h)
        
        # Left accent block
        left_accent = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top_pos, Inches(0.12), card_h)
        left_accent.fill.solid()
        left_accent.fill.fore_color.rgb = p_color
        left_accent.line.color.rgb = p_color

        # Card content
        c_box = slide3.shapes.add_textbox(Inches(1.1), top_pos + Inches(0.1), Inches(11.2), card_h - Inches(0.15))
        tf = c_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        
        p = tf.paragraphs[0]
        p.text = p_title
        p.font.name = "Arial"
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = p_color
        p.space_after = Pt(2)
        
        p2 = tf.add_paragraph()
        p2.text = p_desc
        p2.font.name = "Arial"
        p2.font.size = Pt(9)
        p2.font.color.rgb = C_SLATE

    slide3.notes_slide.notes_text_frame.text = (
        "SLIDE 3: BUSINESS PROBLEM & OPERATIONAL FRICTION\n\n"
        "1. What the presenter should explain:\n"
        "Here we articulate the four structural pain points of enterprise AP. Note that these are industry-standard procurement challenges, "
        "not customer-specific defect reports. They reflect the real realities of manufacturing, services, and large retail enterprises running SAP.\n\n"
        "2. Business Meaning:\n"
        "Focus on the financial leakage aspect: when suppliers invoice 15% higher unit prices or bill for 100 units when only 90 arrived at the warehouse dock, "
        "ordinary automated OCR systems that simply transcribe text do not stop the payment. In SAP, tolerance keys like PP (Price Variance) and DQ (Quantity Variance) "
        "exist for this reason, but manual entry creates delays and mistakes.\n\n"
        "3. Compliance Context:\n"
        "In India and similar statutory regimes, e-invoicing is legally mandated for B2B transactions. The buyer has a strict 48-hour window from IRN generation "
        "to dispute or accept invoices before statutory tax locks occur. Furthermore, Input Tax Credit (ITC) under Section 16(2)(aa) of the CGST Act is at risk "
        "if the vendor has not reflected the invoice in GSTR-2B.\n\n"
        "4. Likely Questions:\n"
        "Q: Why cannot standard SAP MIRO handle this automatically?\n"
        "A: Standard SAP MIRO performs checks when an invoice is keyed into the system. However, getting the invoice data into SAP requires extensive manual data entry, "
        "and handling exceptions requires complex offline coordination between AP, purchasing, and warehouse managers."
    )

    # =========================================================================
    # SLIDE 4: Proposed Solution (3 Architectural Pillars)
    # =========================================================================
    slide4 = prs.slides.add_slide(blank_layout)
    add_header(slide4, "Solution Framework", "The Proposed Solution: Decision Intelligence on SAP BTP", 
               "Unifying multi-channel intake, deterministic reconciliation, and explainable decision support")
    add_footer(slide4, 4)

    pillars = [
        ("1. Cognitive Intake & Normalization", C_SAP_BLUE, [
            ("Multi-Channel Adapters", "Dedicated intake listeners for physical gate scans, vendor AP mailboxes, and government IRP webhooks."),
            ("Canonical Schema Mapping", "Transforms diverse vendor layouts, currencies, and tax breakdowns into a uniform enterprise invoice model."),
            ("Source Traceability", "Retains exact raw files, PDF attachments, and 64-char IRN hashes to preserve complete legal provenance."),
            ("Confidence Gating", "Evaluates extraction completeness, flagging low-confidence fields before financial evaluation.")
        ]),
        ("2. Deterministic LIV & Risk Engine", C_TEAL, [
            ("Automated 3-Way Reconciliation", "Simultaneously reconciles invoice line items against SAP Purchase Orders and Material Documents (GR)."),
            ("SAP Tolerance Enforcement", "Evaluates native SAP Logistics Invoice Verification keys: DQ (Quantity), PP (Price), BD (Small Diff)."),
            ("Quality Defect Gatekeeper", "Cross-references SAP QM inspection lots; halts invoices containing failed or rejected plant materials."),
            ("Hard Duplicate Prevention", "Hashes supplier ID, invoice number, and fiscal year against SAP historical index (RBKP/BSIP).")
        ]),
        ("3. Explainable AI & Governance", C_GREEN, [
            ("4-Part Decision Explainer", "Every recommendation details: 1) What was checked, 2) What was found, 3) Why recommended, 4) Next action."),
            ("Evidence Ledger (Facts vs Recs)", "Strict SOX 404 boundary separating verifiable ERP facts from algorithmic guidance."),
            ("Segregation of Duties", "Strictly decouples Requisitioner delivery validation from Finance posting (MIR7/MIRO) and Treasury payout."),
            ("Immutable Audit Trail", "Records all actor decisions, automated state transitions, and timestamps in an unalterable event log.")
        ])
    ]

    col_w = Inches(3.72)
    col_h = Inches(5.0)
    col_x_start = Inches(0.8)
    col_gap = Inches(0.28)

    for c_idx, (p_title, p_color, items) in enumerate(pillars):
        c_left = col_x_start + c_idx * (col_w + col_gap)
        add_card(slide4, c_left, Inches(1.8), col_w, col_h)
        
        # Pillar Header Box
        p_hdr = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, c_left, Inches(1.8), col_w, Inches(0.55))
        p_hdr.fill.solid()
        p_hdr.fill.fore_color.rgb = p_color
        p_hdr.line.color.rgb = p_color
        tf = p_hdr.text_frame
        p = tf.paragraphs[0]
        p.text = p_title
        p.font.name = "Arial"
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER
        
        # Content box inside pillar
        cnt_box = slide4.shapes.add_textbox(c_left + Inches(0.18), Inches(2.45), col_w - Inches(0.36), col_h - Inches(0.75))
        tf = cnt_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        
        for i_idx, (i_head, i_desc) in enumerate(items):
            p = tf.paragraphs[0] if i_idx == 0 else tf.add_paragraph()
            p.text = f"• {i_head}"
            p.font.name = "Arial"
            p.font.size = Pt(9.5)
            p.font.bold = True
            p.font.color.rgb = C_NAVY
            p.space_after = Pt(1)
            
            p_sub = tf.add_paragraph()
            p_sub.text = f"  {i_desc}"
            p_sub.font.name = "Arial"
            p_sub.font.size = Pt(8.5)
            p_sub.font.color.rgb = C_SLATE
            p_sub.space_after = Pt(8)

    slide4.notes_slide.notes_text_frame.text = (
        "SLIDE 4: PROPOSED SOLUTION & ARCHITECTURAL PILLARS\n\n"
        "1. What the presenter should explain:\n"
        "This slide presents the three foundational pillars of the Invoice Decision Intelligence architecture: "
        "Cognitive Intake, Deterministic LIV Engine, and Explainable AI Governance.\n\n"
        "2. Business Meaning:\n"
        "Emphasize the harmony between automation and control. We automate the repetitive, error-prone tasks (matching 100 items on a PO to 100 items on a GR), "
        "while providing bulletproof explainability when anomalies occur. The system does not replace human approvers; it empowers them with complete context.\n\n"
        "3. Technical Details:\n"
        "Note the critical architectural principle: 'Deterministic LIV & Risk Engine'. The 3-way matching and tolerance checks are deterministic business rules, "
        "not speculative machine learning. We do not use generative AI to guess whether a price tolerance was breached. The AI layer is reserved for "
        "document understanding, pattern anomalies, and generating structured, natural explanations of the evidence.\n\n"
        "4. Likely Questions:\n"
        "Q: Why is it called 'Decision Intelligence' rather than just 'Automation'?\n"
        "A: Automation simply executes a script. Decision Intelligence combines data ingestion, business rule evaluation, risk scoring, "
        "and human-in-the-loop workflows to recommend and explain the optimal next action for enterprise users."
    )

    # =========================================================================
    # SLIDE 5: End-to-End Workflow (Chevron Process + Decision Branches)
    # =========================================================================
    slide5 = prs.slides.add_slide(blank_layout)
    add_header(slide5, "Operational Lifecycle", "End-to-End Workflow: Intake to Settlement", 
               "Orchestrated lifecycle across ingestion, normalization, 3-way reconciliation, decisioning, and posting")
    add_footer(slide5, 5)

    # 5 Process Chevrons across the top
    proc_steps = [
        ("STAGE 1: INTAKE", "Scan / Email / IRP\nIngest raw payloads"),
        ("STAGE 2: NORMALIZE", "Map to Canonical Model\nVerify line-item fields"),
        ("STAGE 3: ENRICH", "Fetch SAP PO, GR & QM\nQuery supplier master"),
        ("STAGE 4: RECONCILE", "Execute 3-Way Match\nCheck LIV tolerance keys"),
        ("STAGE 5: DECISION", "AI Explainer & Triage\nRoute to next workflow")
    ]
    step_w = Inches(2.22)
    step_gap = Inches(0.15)
    start_x = Inches(0.8)

    for s_idx, (s_title, s_sub) in enumerate(proc_steps):
        s_left = start_x + s_idx * (step_w + step_gap)
        c_step = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, s_left, Inches(1.8), step_w, Inches(1.1))
        c_step.fill.solid()
        c_step.fill.fore_color.rgb = C_NAVY if s_idx == 4 else C_LIGHT_BG
        c_step.line.color.rgb = C_SAP_BLUE if s_idx == 4 else C_BORDER
        c_step.line.width = Pt(1.5 if s_idx == 4 else 1)
        
        # Step number badge
        badge = slide5.shapes.add_shape(MSO_SHAPE.OVAL, s_left + Inches(0.1), Inches(1.9), Inches(0.24), Inches(0.24))
        badge.fill.solid()
        badge.fill.fore_color.rgb = C_SAP_BLUE if s_idx != 4 else C_TEAL
        badge.line.color.rgb = C_SAP_BLUE if s_idx != 4 else C_TEAL
        tf = badge.text_frame
        p = tf.paragraphs[0]
        p.text = str(s_idx + 1)
        p.font.name = "Arial"
        p.font.size = Pt(8)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER
        
        # Step text
        s_box = slide5.shapes.add_textbox(s_left + Inches(0.38), Inches(1.85), step_w - Inches(0.42), Inches(0.95))
        tf = s_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = s_title
        p.font.name = "Arial"
        p.font.size = Pt(8.5)
        p.font.bold = True
        p.font.color.rgb = C_WHITE if s_idx == 4 else C_NAVY
        
        p2 = tf.add_paragraph()
        p2.text = s_sub
        p2.font.name = "Arial"
        p2.font.size = Pt(7.5)
        p2.font.color.rgb = RGBColor(203, 213, 225) if s_idx == 4 else C_MUTED

    # Decision Branching Container
    branch_card = add_card(slide5, Inches(0.8), Inches(3.1), Inches(11.733), Inches(3.75))
    
    # Title inside branch card
    b_title_box = slide5.shapes.add_textbox(Inches(1.0), Inches(3.2), Inches(11.3), Inches(0.3))
    tf = b_title_box.text_frame
    p = tf.paragraphs[0]
    p.text = "INTELLIGENT DECISION TRIAGE & DOWNSTREAM WORKFLOW BRANCHING"
    p.font.name = "Arial"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_NAVY

    branches = [
        ("BRANCH A: AUTO-PROCEED", C_GREEN, "Exact 3-Way Match (99% Conf)", 
         "PO, GR, and Invoice match 100%. QM lot passed. No duplicate. Straight-through automated posting via S/4HANA MIRO creating accounting document BELNR."),
        
        ("BRANCH B: BUSINESS VALIDATION", C_SAP_BLUE, "Requisitioner Sign-off Required", 
         "Statutory e-invoice under 48h SLA or Non-PO service expense. Routed to department owner for delivery confirmation before financial settlement."),
        
        ("BRANCH C: MANUAL REVIEW", C_AMBER, "Commercial Discrepancy (Tolerance Breach)", 
         "Quantity over-billing (LIV DQ) or price variance (LIV PP > 2%). Routed to AP Workbench; enables MIR7 Parking with payment block R until credit memo."),
        
        ("BRANCH D: HOLD / REJECT", C_RED, "Critical Risk / Quality Defect", 
         "Failed QM inspection lot (scrap), duplicate invoice submission (RBKP/BSIP match), or vendor hijacking. Hard freeze preventing financial loss.")
    ]

    bw = Inches(2.7)
    bh = Inches(3.0)
    bgap = Inches(0.25)
    b_start_x = Inches(1.0)

    for b_idx, (b_name, b_col, b_cond, b_action) in enumerate(branches):
        bx = b_start_x + b_idx * (bw + bgap)
        b_box = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, Inches(3.6), bw, bh)
        b_box.fill.solid()
        b_box.fill.fore_color.rgb = C_WHITE
        b_box.line.color.rgb = b_col
        b_box.line.width = Pt(1.5)
        
        # Color banner
        top_ban = slide5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, bx, Inches(3.6), bw, Inches(0.35))
        top_ban.fill.solid()
        top_ban.fill.fore_color.rgb = b_col
        top_ban.line.color.rgb = b_col
        tf = top_ban.text_frame
        p = tf.paragraphs[0]
        p.text = b_name
        p.font.name = "Arial"
        p.font.size = Pt(8.5)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER

        # Body
        body_box = slide5.shapes.add_textbox(bx + Inches(0.12), Inches(4.05), bw - Inches(0.24), bh - Inches(0.5))
        tf = body_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        
        p = tf.paragraphs[0]
        p.text = f"Condition:\n{b_cond}"
        p.font.name = "Arial"
        p.font.size = Pt(8.5)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        p.space_after = Pt(6)
        
        p2 = tf.add_paragraph()
        p2.text = f"Action & Impact:\n{b_action}"
        p2.font.name = "Arial"
        p2.font.size = Pt(8)
        p2.font.color.rgb = C_SLATE

    slide5.notes_slide.notes_text_frame.text = (
        "SLIDE 5: END-TO-END WORKFLOW & DECISION BRANCHING\n\n"
        "1. What the presenter should explain:\n"
        "Walk the audience through the five sequential stages across the top, and then emphasize the four decision branches at the bottom. "
        "Make it clear that this is an orchestrated pipeline, not a one-size-fits-all automation.\n\n"
        "2. Business Meaning:\n"
        "Every invoice does not follow the same path. Low-risk, high-confidence invoices (Branch A) flow straight through to MIRO posting without human intervention. "
        "Non-PO or high-value statutory e-invoices (Branch B) require explicit business-owner sign-off. Commercial discrepancies (Branch C) are parked in MIR7 "
        "so payment is blocked while AP investigates. Critical risks like duplicates or quality defects (Branch D) are placed on hard freeze.\n\n"
        "3. Technical Controls:\n"
        "Emphasize that the system preserves segregation of duties: business owner sign-off in Branch B does NOT automatically post or pay the invoice. "
        "It updates the validation status so the finance team can proceed with Logistics Invoice Verification (MIRO).\n\n"
        "4. Likely Questions:\n"
        "Q: Can the business owner bypass the AP clerk?\n"
        "A: No. Business validation only confirms operational delivery. Financial accounting rules, tax verification, and G/L determination remain strictly under finance governance."
    )

    # =========================================================================
    # SLIDE 6: System Architecture (Embedded Diagram + Architectural Principles)
    # =========================================================================
    slide6 = prs.slides.add_slide(blank_layout)
    add_header(slide6, "System Architecture", "System Architecture: SAP BTP & S/4HANA Reference Model", 
               "Decoupled clean-core architecture isolating decision intelligence from the core enterprise ERP")
    add_footer(slide6, 6)

    # Embed Architecture Image on Left Side (Aspect Ratio 1448x1086 = 1.333)
    img_left = Inches(0.8)
    img_top = Inches(1.8)
    img_h = Inches(5.0)
    img_w = Inches(6.667) # exactly 1.333 aspect ratio preserved!

    # Container frame for image
    img_card = add_card(slide6, img_left, img_top, img_w, img_h, border_color=C_BORDER, fill_color=C_WHITE)
    
    if os.path.exists(ARCH_IMG_PATH):
        slide6.shapes.add_picture(ARCH_IMG_PATH, img_left + Inches(0.05), img_top + Inches(0.05), img_w - Inches(0.1), img_h - Inches(0.1))
    else:
        # Fallback if image not found
        fallback_box = slide6.shapes.add_textbox(img_left + Inches(0.5), img_top + Inches(2.0), img_w - Inches(1.0), Inches(1.0))
        tf = fallback_box.text_frame
        p = tf.paragraphs[0]
        p.text = "[Architecture Diagram Image: Invoice Decision Intelligence Architecture.png]"
        p.font.color.rgb = C_MUTED

    # Right Side Architectural Callout Cards
    r_left = Inches(7.7)
    r_w = Inches(4.833)
    r_h = Inches(1.15)
    r_gap = Inches(0.13)

    arch_callouts = [
        ("1. Clean Core Decoupling (SAP BTP)", C_SAP_BLUE, 
         "Runs on SAP BTP Cloud Foundry as an independent microservice tier. Zero custom ABAP or modification to core S/4HANA tables, keeping the ERP clean for seamless quarterly cloud upgrades."),
        
        ("2. Decoupled ISAPAdapter Pattern", C_TEAL, 
         "All ERP interactions pass through a strict ISAPAdapter TypeScript interface. Seamlessly toggles between in-memory MockSAPAdapter (for demo/testing) and S4HanaCloudAdapter (for live OData V2/V4 calls)."),
        
        ("3. Multi-Channel Ingestion Tier", C_NAVY, 
         "Extensible adapters ingest scanned invoices (SAP DOX), vendor mailboxes (SAP Integration Suite / CPI), and government IRP webhooks, converting raw streams into canonical invoice entities."),
        
        ("4. Audit Ledger & Persistence Model", C_GREEN, 
         "Captures every actor action, state transition, and AI score snapshot in an immutable event ledger. Prototype uses in-memory repository with planned SAP HANA Cloud HDI container via SAP CAP.")
    ]

    for idx, (c_title, c_color, c_text) in enumerate(arch_callouts):
        top_pos = Inches(1.8) + idx * (r_h + r_gap)
        add_card(slide6, r_left, top_pos, r_w, r_h)
        
        # Color bar
        bar = slide6.shapes.add_shape(MSO_SHAPE.RECTANGLE, r_left, top_pos, Inches(0.1), r_h)
        bar.fill.solid()
        bar.fill.fore_color.rgb = c_color
        bar.line.color.rgb = c_color
        
        c_box = slide6.shapes.add_textbox(r_left + Inches(0.2), top_pos + Inches(0.08), r_w - Inches(0.3), r_h - Inches(0.12))
        tf = c_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        
        p = tf.paragraphs[0]
        p.text = c_title
        p.font.name = "Arial"
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = c_color
        p.space_after = Pt(2)
        
        p2 = tf.add_paragraph()
        p2.text = c_text
        p2.font.name = "Arial"
        p2.font.size = Pt(8.5)
        p2.font.color.rgb = C_SLATE

    slide6.notes_slide.notes_text_frame.text = (
        "SLIDE 6: SYSTEM ARCHITECTURE & CLEAN CORE PRINCIPLES\n\n"
        "1. What the presenter should explain:\n"
        "Direct attention to the official architecture diagram on the left, which has been preserved in its original aspect ratio. "
        "Explain how the architecture separates the intake tier, the BTP application tier, and the enterprise ERP tier.\n\n"
        "2. Business Meaning:\n"
        "Enterprise IT leaders care deeply about 'SAP Clean Core'. Customizing standard SAP transaction MIRO with Z-tables or custom exits "
        "creates technical debt and breaks S/4HANA upgrades. Our architecture runs outside the core on SAP BTP, communicating strictly through standard APIs.\n\n"
        "3. Technical Details & Reality Boundary:\n"
        "Be completely transparent about the implementation status shown on this slide: "
        "- In the live prototype, the BTP application server is running on SAP BTP Cloud Foundry.\n"
        "- The S/4HANA communication is decoupled via 'ISAPAdapter'. In the current deployment, 'DEMO_MODE=true' activates 'MockSAPAdapter', "
        "which uses an in-memory relational store pre-seeded with Business Partners, POs, Goods Receipts, and Quality Lots.\n"
        "- The production adapter ('S4HanaCloudAdapter') is written to use '@sap-cloud-sdk/http-client' against destination 'S4HANA_2023_CLOUD' in Phase 2.\n\n"
        "4. Likely Questions:\n"
        "Q: How will the system scale under heavy document load?\n"
        "A: SAP BTP Cloud Foundry handles horizontal auto-scaling for the Node.js application container. Heavy OCR extraction will be offloaded "
        "asynchronously to SAP Document Information Extraction (DOX) via SAP AI Core."
    )

    # =========================================================================
    # SLIDE 7: AI Capabilities & Intelligence Layer (The Reality Matrix)
    # =========================================================================
    slide7 = prs.slides.add_slide(blank_layout)
    add_header(slide7, "AI/ML Capability Classification", "AI Capabilities & Intelligence Layer: Reality Matrix", 
               "Clear classification distinguishing deterministic business rules, calibrated heuristics, and planned GenAI")
    add_footer(slide7, 7)

    # Table layout: 8 rows, 4 columns
    tbl_shape = slide7.shapes.add_table(8, 4, Inches(0.8), Inches(1.8), Inches(11.733), Inches(5.0))
    table = tbl_shape.table
    table.columns[0].width = Inches(2.2)
    table.columns[1].width = Inches(3.2)
    table.columns[2].width = Inches(3.8)
    table.columns[3].width = Inches(2.533)

    headers7 = ["Capability Domain", "Business Purpose", "Current Prototype Implementation", "Status & Technology"]
    for c_i, h_txt in enumerate(headers7):
        set_cell_format(table.cell(0, c_i), h_txt, font_size=9, bold=True, color=C_WHITE, bg_color=C_NAVY, align=PP_ALIGN.LEFT)

    matrix_rows = [
        ("Document Extraction & OCR", 
         "Extract header, line items, and tax from PDF/images into structured fields.", 
         "Pre-parsed high-fidelity canonical fixtures with field confidence scores.", 
         "Simulated Prototype\n(Planned: SAP DOX via AI Core)"),
        
        ("Canonical Normalization", 
         "Unify physical scans, email streams, and IRP JSON into a single data schema.", 
         "Active ingestion adapters mapping diverse inputs to CanonicalSupplierInvoice.", 
         "Implemented & Verified\n(Deterministic TypeScript)"),
        
        ("Deterministic 3-Way LIV", 
         "Reconcile Invoice line items against SAP PO, Goods Receipts, and QM lots.", 
         "Full evaluation of native SAP LIV tolerance keys: DQ, PP, and BD.", 
         "Implemented & Verified\n(Deterministic Business Rules)"),
        
        ("Duplicate & Fraud Gatekeeper", 
         "Prevent double payments and vendor entity mismatch fraud.", 
         "Deterministic hashing against SAP historical index (RBKP/BSIP) and master data.", 
         "Implemented & Verified\n(Deterministic Gatekeeper)"),
        
        ("Risk & Confidence Scoring", 
         "Quantify probability of financial leakage and assign risk tiers (LOW to CRITICAL).", 
         "Multi-factor heuristic scoring engine calibrating confidence (0% to 100%).", 
         "Implemented & Verified\n(Calibrated Heuristic Engine)"),
        
        ("Explainable AI (XAI) Explainer", 
         "Provide transparent, 4-step audit-compliant rationale for every recommendation.", 
         "Structured explainer generator: 1) Input, 2) 3-Way, 3) Risk, 4) Recommended Action.", 
         "Implemented & Verified\n(Rule-Grounded XAI Generator)"),
        
        ("Contextual Assistant (Joule)", 
         "Provide interactive conversational Q&A on invoice details and exceptions.", 
         "Page-aware drawer with pre-configured contextual enterprise queries.", 
         "Simulated Concept\n(Planned: SAP Joule on BTP)")
    ]

    for r_i, row in enumerate(matrix_rows):
        bg = C_LIGHT_BG if r_i % 2 == 0 else C_WHITE
        # Highlight status color
        status_color = C_GREEN if "Implemented" in row[3] else C_AMBER
        
        set_cell_format(table.cell(r_i + 1, 0), row[0], font_size=8.5, bold=True, color=C_NAVY, bg_color=bg)
        set_cell_format(table.cell(r_i + 1, 1), row[1], font_size=8, bold=False, color=C_SLATE, bg_color=bg)
        set_cell_format(table.cell(r_i + 1, 2), row[2], font_size=8, bold=False, color=C_SLATE, bg_color=bg)
        set_cell_format(table.cell(r_i + 1, 3), row[3], font_size=8, bold=True, color=status_color, bg_color=bg)

    slide7.notes_slide.notes_text_frame.text = (
        "SLIDE 7: AI CAPABILITIES & INTELLIGENCE LAYER MATRIX\n\n"
        "1. What the presenter should explain:\n"
        "This slide is our technical integrity matrix. We explicitly clarify which capabilities are implemented using deterministic rules, "
        "which use calibrated heuristics, which are simulated for the demo, and which represent future generative AI scope.\n\n"
        "2. Business Meaning:\n"
        "In enterprise finance and internal audit, calling an 'if-else' check 'Generative AI' destroys credibility. "
        "Auditors demand to know: Is this a deterministic rule or a probabilistic model? We prove that our 3-way matching and duplicate checks "
        "are 100% deterministic rules, while our confidence scoring uses multi-factor heuristics, and our Joule assistant is a simulated interface.\n\n"
        "3. Technical Truth:\n"
        "- Document OCR: We use pre-built JSON fixtures mapped to raw PDFs. We do not make live calls to OCR endpoints in this build.\n"
        "- 3-Way Matching: Implemented in 'ThreeWayReconciliationService.ts', testing tolerance keys DQ and PP exactly as SAP S/4HANA does.\n"
        "- XAI Explainer: Generates structured, deterministic 4-step narratives without hallucination risk.\n"
        "- Joule: Simulated page-aware assistant demonstrating the UX pattern, ready for SAP BTP Generative AI Hub integration in production.\n\n"
        "4. Likely Questions:\n"
        "Q: Why not use an LLM directly for 3-way matching?\n"
        "A: LLMs are probabilistic and can hallucinate numbers. A CFO will never accept a financial posting where 100 units versus 90 units is decided by a probabilistic neural net. "
        "Deterministic business logic must govern the math; AI is reserved for unstructured extraction, anomaly detection, and natural language explanation."
    )

    # =========================================================================
    # SLIDE 8: Real Application Scenarios (Verified Project Data)
    # =========================================================================
    slide8 = prs.slides.add_slide(blank_layout)
    add_header(slide8, "Tested Scenarios", "Invoice Validation & Decision Scenarios: Verified Fixtures", 
               "Real enterprise test cases pre-seeded, evaluated, and verified in the application repository")
    add_footer(slide8, 8)

    scenarios = [
        ("Case 1: Clean 3-Way Match", "INV-2026-00001", "Schneider Electric India", "₹59,000", C_GREEN, 
         "PO 4500012456", "Physical Gate Scan", "AUTO_PROCEED (99% Conf, LOW Risk)",
         "• 100 EA MCB 32A ordered @ ₹500.\n• GR 5000018901: 100 EA received at Plant 1010.\n• QM Lot 100004510: 100 EA passed (0 defects).\n• Outcome: Direct MIRO posting with accounting document BELNR."),
        
        ("Case 2: Quantity Over-Delivery", "INV-2026-00002", "Siemens India Ltd", "₹1,41,600", C_AMBER, 
         "PO 4500012500", "Physical Gate Scan", "MANUAL_REVIEW (70% Conf, MEDIUM Risk)",
         "• PO ordered 100 EA PLC modules @ ₹1,200.\n• GR 5000018915: Only 90 EA received at warehouse.\n• Invoiced for full 100 EA (10 units unreceived).\n• Outcome: Breaches LIV key DQ; Park in SAP (MIR7) with Payment Block R."),
        
        ("Case 3: Duplicate Submission", "INV-2026-00007", "AWS India Pvt Ltd", "₹4,01,200", C_RED, 
         "PO 4500012850", "AP Email Inbound", "HOLD (99% Conf, CRITICAL Risk)",
         "• Billed for AWS Cloud Hosting Services.\n• Hash match against historical index RBKP/BSIP.\n• Document already posted under BELNR 5105600101.\n• Outcome: Hard freeze preventing duplicate disbursement of ₹4,01,200."),
        
        ("Case 4: Statutory E-Invoice SLA", "INV-2026-00008", "Schneider Electric India", "₹9,97,100", C_SAP_BLUE, 
         "PO 4500012900", "Government E-Invoice (IRP)", "BUSINESS_VALIDATION_REQ (MEDIUM Risk)",
         "• 64-char IRN hash with 48h GST countdown timer.\n• Clean 3-way match, but requires human sign-off.\n• Requisitioner Amit Verma must validate delivery.\n• Outcome: Affirmative owner sign-off enables instant MIRO posting.")
    ]

    sc_w = Inches(5.66)
    sc_h = Inches(2.38)
    sc_coords = [
        (Inches(0.8), Inches(1.8)),
        (Inches(6.866), Inches(1.8)),
        (Inches(0.8), Inches(4.45)),
        (Inches(6.866), Inches(4.45))
    ]

    for s_i, (s_title, s_id, s_supp, s_amt, s_col, s_po, s_chan, s_rec, s_details) in enumerate(scenarios):
        lx, ty = sc_coords[s_i]
        add_card(slide8, lx, ty, sc_w, sc_h)
        
        # Color bar on top
        bar = slide8.shapes.add_shape(MSO_SHAPE.RECTANGLE, lx, ty, sc_w, Inches(0.06))
        bar.fill.solid()
        bar.fill.fore_color.rgb = s_col
        bar.line.color.rgb = s_col
        
        # Header Box
        h_box = slide8.shapes.add_textbox(lx + Inches(0.18), ty + Inches(0.1), sc_w - Inches(0.36), Inches(0.35))
        tf = h_box.text_frame
        p = tf.paragraphs[0]
        p.text = f"{s_title}  |  {s_id}"
        p.font.name = "Arial"
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        
        # Metadata banner line
        m_box = slide8.shapes.add_textbox(lx + Inches(0.18), ty + Inches(0.42), sc_w - Inches(0.36), Inches(0.28))
        tf = m_box.text_frame
        p = tf.paragraphs[0]
        p.text = f"Supplier: {s_supp}  •  Amount: {s_amt}  •  PO: {s_po}  •  Channel: {s_chan}"
        p.font.name = "Arial"
        p.font.size = Pt(8)
        p.font.bold = True
        p.font.color.rgb = C_MUTED
        
        # Recommendation badge
        rec_box = slide8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, lx + Inches(0.18), ty + Inches(0.72), sc_w - Inches(0.36), Inches(0.28))
        rec_box.fill.solid()
        rec_box.fill.fore_color.rgb = C_WHITE
        rec_box.line.color.rgb = s_col
        rec_box.line.width = Pt(1)
        tf = rec_box.text_frame
        p = tf.paragraphs[0]
        p.text = f"Engine Recommendation: {s_rec}"
        p.font.name = "Arial"
        p.font.size = Pt(8)
        p.font.bold = True
        p.font.color.rgb = s_col
        p.alignment = PP_ALIGN.LEFT
        
        # Details bullets
        d_box = slide8.shapes.add_textbox(lx + Inches(0.18), ty + Inches(1.05), sc_w - Inches(0.36), Inches(1.2))
        tf = d_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        for line_i, line in enumerate(s_details.split('\n')):
            p = tf.paragraphs[0] if line_i == 0 else tf.add_paragraph()
            p.text = line
            p.font.name = "Arial"
            p.font.size = Pt(8)
            p.font.color.rgb = C_SLATE
            p.space_after = Pt(1.5)

    slide8.notes_slide.notes_text_frame.text = (
        "SLIDE 8: REAL ENTERPRISE SCENARIOS & APPLICATION FIXTURES\n\n"
        "1. What the presenter should explain:\n"
        "Here we show four real scenarios taken directly from the project fixtures in 'mock-data/'. "
        "These are not hypothetical concepts; they are actual JSON invoice records and mock SAP Purchase Orders pre-seeded in our application.\n\n"
        "2. Business Meaning:\n"
        "- Case 1 (Happy Path): Proves straight-through processing for standard operational procurement. 100 ordered, 100 received, 100 accepted by QA. Immediate posting.\n"
        "- Case 2 (Quantity Variance): Shows warehouse protection. Siemens billed for 100 units, but only 90 arrived. Tolerance key DQ stops payment on the 10 unreceived units.\n"
        "- Case 3 (Duplicate Bill): Shows fraud and error prevention. AWS invoice 1090 was already paid in a previous run. Hard freeze blocks an accidental ₹4.01 lakh duplicate disbursement.\n"
        "- Case 4 (Statutory E-Invoice): Demonstrates our primary demo story. A ₹9.97 lakh statutory e-invoice with active 48-hour GST countdown requiring requisitioner sign-off.\n\n"
        "3. Technical Integrity:\n"
        "All invoice numbers (INV-2026-00001, etc.), supplier names, amounts, and PO numbers match the project code exactly. "
        "No fictional values have been fabricated.\n\n"
        "4. Likely Questions:\n"
        "Q: What other scenarios does the application support?\n"
        "A: The catalog contains 10 scenarios in total, including Price Variance (+15% TCS consulting), Quality Defects (5 rejected filters for Wipro), "
        "Non-PO telecom billing (Bharti Airtel), Vendor Master Mismatch (Apex billing against Siemens PO), and GSTR-2B Input Tax Credit mismatch (Infosys)."
    )

    # =========================================================================
    # SLIDE 9: SAP Finance Process & Business Controls (Segregation of Duties)
    # =========================================================================
    slide9 = prs.slides.add_slide(blank_layout)
    add_header(slide9, "Finance Governance & Controls", "SAP Finance Process & Business Controls", 
               "Clear separation between departmental delivery validation, finance posting, and treasury disbursement")
    add_footer(slide9, 9)

    tiers = [
        ("TIER 1: BUSINESS VALIDATION", C_SAP_BLUE, "Departmental Requisitioner", 
         [
             "• Validates operational delivery, service satisfaction, and scope completion.",
             "• Identifies the budget owner (e.g. IT Department Head for software licenses).",
             "• Affirmative action confirms commercial legitimacy from the business perspective.",
             "• CRITICAL CONTROL: Business validation DOES NOT post to financial ledgers or release cash."
         ]),
        ("TIER 2: LOGISTICS INVOICE VERIFICATION", C_TEAL, "Finance / Accounts Payable (AP)", 
         [
             "• Evaluates 3-way matching rules, tolerance keys (DQ, PP), and tax breakdowns.",
             "• Standard SAP Transactions: MIR7 (Park Invoice) vs MIRO (Post Invoice).",
             "• Generates official S/4HANA Accounting Document Number (BELNR).",
             "• Applies payment block key 'R' (Invoice Verification) if exceptions remain unresolved."
         ]),
        ("TIER 3: TREASURY & DISBURSEMENT", C_NAVY, "Corporate Treasury / Cash Management", 
         [
             "• Completely separate downstream payment batch execution program (SAP F110).",
             "• Checks payment terms, cash availability, and checks whether block key 'R' is released.",
             "• Executes electronic bank transfer and generates SAP Clearing Document (BSAK).",
             "• ZERO AUTONOMOUS DISBURSEMENT: The AI system cannot trigger bank payouts."
         ])
    ]

    tw = Inches(3.72)
    th = Inches(3.6)
    t_start_x = Inches(0.8)
    t_gap = Inches(0.28)

    for t_i, (t_title, t_col, t_role, t_bullets) in enumerate(tiers):
        tx = t_start_x + t_i * (tw + t_gap)
        add_card(slide9, tx, Inches(1.8), tw, th)
        
        # Header banner
        tb_hdr = slide9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, tx, Inches(1.8), tw, Inches(0.65))
        tb_hdr.fill.solid()
        tb_hdr.fill.fore_color.rgb = t_col
        tb_hdr.line.color.rgb = t_col
        tf = tb_hdr.text_frame
        p = tf.paragraphs[0]
        p.text = t_title
        p.font.name = "Arial"
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER
        
        p2 = tf.add_paragraph()
        p2.text = f"Governing Actor: {t_role}"
        p2.font.name = "Arial"
        p2.font.size = Pt(8)
        p2.font.color.rgb = RGBColor(224, 242, 254)
        p2.alignment = PP_ALIGN.CENTER

        # Bullets
        tb_box = slide9.shapes.add_textbox(tx + Inches(0.18), Inches(2.55), tw - Inches(0.36), th - Inches(0.8))
        tf = tb_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        for b_idx, bullet in enumerate(t_bullets):
            p = tf.paragraphs[0] if b_idx == 0 else tf.add_paragraph()
            p.text = bullet
            p.font.name = "Arial"
            p.font.size = Pt(8.5)
            p.font.color.rgb = C_SLATE
            p.space_after = Pt(5)

    # Bottom Governance Banner
    gov_card = add_card(slide9, Inches(0.8), Inches(5.55), Inches(11.733), Inches(1.3), border_color=C_GREEN, fill_color=RGBColor(240, 253, 244))
    gov_box = slide9.shapes.add_textbox(Inches(1.0), Inches(5.62), Inches(11.3), Inches(1.15))
    tf = gov_box.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = "ENTERPRISE INTERNAL CONTROLS & SOX 404 AUDIT INTEGRITY"
    p.font.name = "Arial"
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = C_GREEN
    
    p2 = tf.add_paragraph()
    p2.text = (
        "• Segregation of Duties (SoD): Enforces strict technical segregation between business requisitioners, AP accounting clerks, and treasury officers.\n"
        "• Immutable Audit Trail: Every user sign-off, dispute comment, AI confidence evaluation, and ERP posting payload is timestamped and cryptographically linked.\n"
        "• Reversibility & Error Handling: Simulated SAP posting maintains full reversibility: parked documents (MIR7) can be deleted, and posted documents (MIRO) require credit memos (MR8M)."
    )
    p2.font.name = "Arial"
    p2.font.size = Pt(8.5)
    p2.font.color.rgb = C_SLATE

    slide9.notes_slide.notes_text_frame.text = (
        "SLIDE 9: SAP FINANCE PROCESS & SEGREGATION OF DUTIES\n\n"
        "1. What the presenter should explain:\n"
        "This slide is essential for communicating with finance and audit stakeholders. We demonstrate an exact understanding of SAP financial controls "
        "and explain why business validation, finance posting, and treasury disbursement must never be treated as one interchangeable approval.\n\n"
        "2. Business Meaning:\n"
        "In many ill-conceived AI prototypes, an algorithm validates an invoice and immediately triggers a bank payout. "
        "In enterprise finance, that is a severe SOX 404 audit failure. We enforce strict separation of duties:\n"
        "- Tier 1: The business owner confirms that services or goods arrived.\n"
        "- Tier 2: The finance team verifies tax, G/L distribution, and creates the accounting document (MIRO) or parked document (MIR7).\n"
        "- Tier 3: Treasury executes payment runs (F110) in batch based on payment terms and cash flow.\n\n"
        "3. Technical Nuance:\n"
        "Notice the payment block key 'R'. In standard SAP, when an invoice is parked or posted with unresolved variances, SAP sets payment block 'R'. "
        "This allows the liability to be recognized on the balance sheet without letting cash leave the company.\n\n"
        "4. Likely Questions:\n"
        "Q: Does the system simulate the creation of SAP document numbers?\n"
        "A: Yes. In our simulation engine, posting via MIRO generates an official 10-digit accounting document number (e.g., BELNR 5105600120), "
        "and payment via F110 generates a clearing document, proving complete end-to-end accounting traceability."
    )

    # =========================================================================
    # SLIDE 10: Current Demo vs Production Scope (Gap Analysis Table)
    # =========================================================================
    slide10 = prs.slides.add_slide(blank_layout)
    add_header(slide10, "Gap Analysis & Transition", "Current Demo vs. Production Scope: Enterprise Transition Matrix", 
               "Transparent technical comparison between prototype capabilities and production enterprise requirements")
    add_footer(slide10, 10)

    tbl_shape10 = slide10.shapes.add_table(7, 4, Inches(0.8), Inches(1.8), Inches(11.733), Inches(5.0))
    table10 = tbl_shape10.table
    table10.columns[0].width = Inches(2.2)
    table10.columns[1].width = Inches(3.2)
    table10.columns[2].width = Inches(3.6)
    table10.columns[3].width = Inches(2.733)

    headers10 = ["Functional Domain", "Current Demo Implementation", "Production Enterprise Target", "Transition Effort & Steps"]
    for c_i, h_txt in enumerate(headers10):
        set_cell_format(table10.cell(0, c_i), h_txt, font_size=9, bold=True, color=C_WHITE, bg_color=C_NAVY, align=PP_ALIGN.LEFT)

    gap_rows = [
        ("ERP Connectivity & Master Data", 
         "MockSAPAdapter with in-memory Map store simulating Business Partners, POs, GRs, QM.", 
         "Live SAP S/4HANA Cloud (2023) via SAP Cloud SDK (@sap-cloud-sdk/http-client).", 
         "Toggle DEMO_MODE=false; configure BTP Destination S4HANA_2023_CLOUD with OAuth SAML."),
        
        ("Physical & Email Ingestion", 
         "Local JSON fixture normalizer with sample PDFs and RFC 822 email files.", 
         "SAP Document Information Extraction (DOX) via SAP AI Core + CPI Mail Adapter.", 
         "Connect DOX REST API (POST /v2/document/jobs); deploy CPI iFlow with IMAP listener."),
        
        ("Government E-Invoicing (IRP)", 
         "Simulated 64-char IRN parser with active 48-hour countdown SLA timer.", 
         "SAP Document and Reporting Compliance (DRC) / GSTN IRP Gateway webhook.", 
         "Connect DRC communication scenario to stream incoming statutory IRN webhooks."),
        
        ("Statutory GST Reconciliation", 
         "MockGSTAdapter with auto-drafted GSTR-2B JSON statements identifying ITC risks.", 
         "Automated monthly sync via licensed GSP/ASP Gateway (Cleartax / Cygnet API).", 
         "Integrate GSP REST endpoints (/gstr2b/b2b) to reconcile monthly supplier filings."),
        
        ("Approval Workflow & Tasks", 
         "In-app Fiori modal state mutation updating businessValidationStatus.", 
         "SAP Build Process Automation (SBPA) routing tasks to SAP Fiori My Inbox.", 
         "Connect SBPA Workflow Instances API (/workflow-instances) with SSO user identity."),
        
        ("Data Persistence & Storage", 
         "In-memory InvoiceRepository (state resets on container restart).", 
         "Persistent SAP HANA Cloud HDI container via SAP CAP (@sap/cds).", 
         "Define CDS entities (schema.cds) and deploy managed service bindings on BTP.")
    ]

    for r_i, row in enumerate(gap_rows):
        bg = C_LIGHT_BG if r_i % 2 == 0 else C_WHITE
        set_cell_format(table10.cell(r_i + 1, 0), row[0], font_size=8.5, bold=True, color=C_NAVY, bg_color=bg)
        set_cell_format(table10.cell(r_i + 1, 1), row[1], font_size=8, bold=False, color=C_SLATE, bg_color=bg)
        set_cell_format(table10.cell(r_i + 1, 2), row[2], font_size=8, bold=False, color=C_SLATE, bg_color=bg)
        set_cell_format(table10.cell(r_i + 1, 3), row[3], font_size=8, bold=False, color=C_TEAL, bg_color=bg)

    slide10.notes_slide.notes_text_frame.text = (
        "SLIDE 10: CURRENT DEMO VS PRODUCTION SCOPE (GAP ANALYSIS)\n\n"
        "1. What the presenter should explain:\n"
        "This slide is the architectural blueprint for moving from prototype to production. We address every technical layer: "
        "ERP connectivity, ingestion pipelines, statutory e-invoicing, GST reconciliation, approval workflows, and persistence.\n\n"
        "2. Business Meaning:\n"
        "By clearly separating demo simulation from production requirements, we build immense trust with the Digital Team and IT leadership. "
        "We show that the prototype was deliberately designed with clean interfaces so that replacing mock adapters with production services "
        "requires zero rewrites of core decision logic.\n\n"
        "3. Technical Transition Steps:\n"
        "- S/4HANA: Switching from MockSAPAdapter to S4HanaCloudAdapter requires only setting 'DEMO_MODE=false' and configuring a BTP destination.\n"
        "- Ingestion: We replace our local JSON normalizer with calls to SAP Document Information Extraction (DOX) using the standard 'sap.invoice:latest' schema.\n"
        "- Approvals: We migrate our in-app modal to SAP Build Process Automation so managers approve in their standard Fiori Launchpad My Inbox.\n"
        "- Persistence: We transition from our in-memory Node.js repository to SAP HANA Cloud using the SAP Cloud Application Programming Model (CAP).\n\n"
        "4. Likely Questions:\n"
        "Q: What is the estimated effort to complete the SAP BTP Destination integration?\n"
        "A: Because the S4HanaCloudAdapter interface is already coded, configuring the BTP destination and testing standard OData calls with S/4HANA Cloud takes approximately 2 to 3 weeks in Phase 2."
    )

    # =========================================================================
    # SLIDE 11: Business Value, Governance, and Risk Controls
    # =========================================================================
    slide11 = prs.slides.add_slide(blank_layout)
    add_header(slide11, "Value & Risk Governance", "Business Value, Governance, and Risk Controls", 
               "Maximizing touchless processing efficiency while enforcing rigorous financial and audit guardrails")
    add_footer(slide11, 11)

    # Left Column: Strategic Value Drivers (4 cards)
    # Right Column: Risk Controls & Guardrails (4 cards)
    col_w11 = Inches(5.66)
    col_h11 = Inches(5.0)

    # Left Container
    card_v = add_card(slide11, Inches(0.8), Inches(1.8), col_w11, col_h11)
    
    # Left Header
    vh_box = slide11.shapes.add_textbox(Inches(1.0), Inches(1.95), col_w11 - Inches(0.4), Inches(0.35))
    tf = vh_box.text_frame
    p = tf.paragraphs[0]
    p.text = "STRATEGIC VALUE DRIVERS (EXPECTED IMPACT)"
    p.font.name = "Arial"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_GREEN

    value_items = [
        ("Touchless Straight-Through Processing", 
         "Automates routine, error-free invoices (Scenario 1) from intake to MIRO posting, allowing AP teams to focus on commercial dispute resolution."),
        
        ("Working Capital & Leakage Protection", 
         "Stops undetected price creep exceeding tolerance limits (Scenario 5) and quantity over-billing (Scenario 2), directly protecting operating margins."),
        
        ("Statutory Penalty & Tax Credit Mitigation", 
         "Real-time countdown monitoring on 48h GST e-invoices avoids cancellation penalties; reconciles GSTR-2B to protect at-risk Input Tax Credit (ITC)."),
        
        ("Audit Defense & SOX 404 Governance", 
         "Every decision carries an auditable 4-part rationale, completely eliminating the regulatory risk of opaque 'black-box' automated decisions.")
    ]

    for v_i, (v_title, v_desc) in enumerate(value_items):
        v_box = slide11.shapes.add_textbox(Inches(1.0), Inches(2.4 + v_i * 1.1), col_w11 - Inches(0.4), Inches(0.95))
        tf = v_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = f"• {v_title}"
        p.font.name = "Arial"
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        p.space_after = Pt(2)
        
        p2 = tf.add_paragraph()
        p2.text = f"  {v_desc}"
        p2.font.name = "Arial"
        p2.font.size = Pt(8.5)
        p2.font.color.rgb = C_SLATE

    # Right Container
    card_r = add_card(slide11, Inches(6.866), Inches(1.8), col_w11, col_h11)
    
    # Right Header
    rh_box = slide11.shapes.add_textbox(Inches(7.066), Inches(1.95), col_w11 - Inches(0.4), Inches(0.35))
    tf = rh_box.text_frame
    p = tf.paragraphs[0]
    p.text = "ENTERPRISE RISK CONTROLS & GOVERNANCE GUARDRAILS"
    p.font.name = "Arial"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_RED

    risk_items = [
        ("Zero Autonomous Cash Disbursement", 
         "System strictly restricts autonomous actions to data validation and parking/posting. Bank release remains exclusively under Treasury payment programs (F110)."),
        
        ("Deterministic Gatekeeper Precedence", 
         "Deterministic business rules (Tolerance Keys, Duplicate Hashes, QM Status) take absolute precedence over heuristic confidence scores."),
        
        ("Granular Role-Based Access Control (RBAC)", 
         "Enforces segregation of duties across Requisitioners (Business Approval), AP Clerks (Exception Triage), and Finance Approvers (MIRO Posting)."),
        
        ("Privacy & Data Boundary Protection", 
         "Strict governance ensures financial payloads and banking coordinates are never transmitted to unapproved public or external LLM APIs.")
    ]

    for r_i, (r_title, r_desc) in enumerate(risk_items):
        r_box = slide11.shapes.add_textbox(Inches(7.066), Inches(2.4 + r_i * 1.1), col_w11 - Inches(0.4), Inches(0.95))
        tf = r_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = f"• {r_title}"
        p.font.name = "Arial"
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = C_NAVY
        p.space_after = Pt(2)
        
        p2 = tf.add_paragraph()
        p2.text = f"  {r_desc}"
        p2.font.name = "Arial"
        p2.font.size = Pt(8.5)
        p2.font.color.rgb = C_SLATE

    slide11.notes_slide.notes_text_frame.text = (
        "SLIDE 11: BUSINESS VALUE, GOVERNANCE, AND RISK CONTROLS\n\n"
        "1. What the presenter should explain:\n"
        "This slide presents the executive business case alongside the defensive risk controls. "
        "Notice that we present value drivers as expected, potential outcomes rather than inventing fabricated ROI percentages or cost savings.\n\n"
        "2. Business Meaning:\n"
        "Enterprise technology executives are often skeptical of AI business cases that promise '90% cost reduction'. "
        "Instead, we articulate value through operational pillars: reducing manual touch points on clean invoices, catching commercial leaks (price creep and duplicate billing), "
        "and protecting statutory tax credits under GST rules.\n\n"
        "3. Governance Guardrails:\n"
        "Walk through the four guardrails on the right. Highlight that 'Zero Autonomous Cash Disbursement' is an unbreakable architectural constraint. "
        "The system prepares invoices for financial review and posting, but the actual disbursement of funds always remains governed by authorized treasury processes.\n\n"
        "4. Likely Questions:\n"
        "Q: How does the system handle privacy regarding vendor bank details and prices?\n"
        "A: The application runs within the customer's secure SAP BTP subaccount. It does not transmit invoice data to external public LLMs or unauthenticated third-party services."
    )

    # =========================================================================
    # SLIDE 12: Roadmap and Next Steps (Phased Path to Deployment)
    # =========================================================================
    slide12 = prs.slides.add_slide(blank_layout)
    add_header(slide12, "Strategic Roadmap", "Roadmap & Next Steps: Phased Path to Deployment", 
               "Structured four-phase rollout plan from verified prototype to enterprise production go-live")
    add_footer(slide12, 12)

    # 4 Phase Cards across the middle
    phases = [
        ("PHASE 1: PROTOTYPE VALIDATION", "Current State (Achieved)", C_GREEN, [
            "• Live deployment on SAP BTP Cloud Foundry.",
            "• 10 pre-seeded enterprise scenarios verified.",
            "• 138 passing automated test suites.",
            "• Align with AIS Digital Team on target architecture."
        ]),
        ("PHASE 2: SAP CONNECTIVITY & DOX", "Quarter 1 Target", C_SAP_BLUE, [
            "• Configure BTP Destination S4HANA_2023_CLOUD.",
            "• Activate S4HanaCloudAdapter via SAP Cloud SDK.",
            "• Integrate SAP Document Information Extraction.",
            "• Deploy CPI iFlow for automated email intake."
        ]),
        ("PHASE 3: CONTROLLED PILOT & SBPA", "Quarter 2 Target", C_TEAL, [
            "• Connect SAP Build Process Automation (SBPA).",
            "• Deploy SAP HANA Cloud persistence via CAP.",
            "• Pilot with 2 business departments (IT & Facilities).",
            "• Validate user acceptance and audit logging."
        ]),
        ("PHASE 4: ENTERPRISE PRODUCTION", "Quarter 3 Target", C_NAVY, [
            "• Connect licensed GSP/ASP for live GST reconciliation.",
            "• Implement high-availability and DR controls.",
            "• Conduct formal InfoSec & SOX 404 audits.",
            "• Enterprise cutover and full production go-live."
        ])
    ]

    pw = Inches(2.7)
    ph = Inches(2.9)
    p_start_x = Inches(0.8)
    p_gap = Inches(0.3)

    for p_i, (p_title, p_time, p_col, p_bullets) in enumerate(phases):
        px = p_start_x + p_i * (pw + p_gap)
        add_card(slide12, px, Inches(1.8), pw, ph)
        
        # Header banner
        p_hdr = slide12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, px, Inches(1.8), pw, Inches(0.65))
        p_hdr.fill.solid()
        p_hdr.fill.fore_color.rgb = p_col
        p_hdr.line.color.rgb = p_col
        tf = p_hdr.text_frame
        p = tf.paragraphs[0]
        p.text = p_title
        p.font.name = "Arial"
        p.font.size = Pt(8.5)
        p.font.bold = True
        p.font.color.rgb = C_WHITE
        p.alignment = PP_ALIGN.CENTER
        
        p2 = tf.add_paragraph()
        p2.text = p_time
        p2.font.name = "Arial"
        p2.font.size = Pt(7.5)
        p2.font.color.rgb = RGBColor(224, 242, 254)
        p2.alignment = PP_ALIGN.CENTER

        # Bullets
        pb_box = slide12.shapes.add_textbox(px + Inches(0.12), Inches(2.52), pw - Inches(0.24), ph - Inches(0.75))
        tf = pb_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        for b_idx, bullet in enumerate(p_bullets):
            p = tf.paragraphs[0] if b_idx == 0 else tf.add_paragraph()
            p.text = bullet
            p.font.name = "Arial"
            p.font.size = Pt(8)
            p.font.color.rgb = C_SLATE
            p.space_after = Pt(4)

    # Bottom Discussion & Alignment Container
    disc_card = add_card(slide12, Inches(0.8), Inches(4.85), Inches(11.733), Inches(2.0), border_color=C_SAP_BLUE, fill_color=C_LIGHT_BG)
    disc_box = slide12.shapes.add_textbox(Inches(1.0), Inches(4.95), Inches(11.3), Inches(1.8))
    tf = disc_box.text_frame
    tf.word_wrap = True
    
    p = tf.paragraphs[0]
    p.text = "ALIGNMENT & DISCUSSION TOPICS WITH THE AIS DIGITAL TEAM"
    p.font.name = "Arial"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_NAVY
    
    p2 = tf.add_paragraph()
    p2.text = (
        "1. SAP S/4HANA Target Environment: Confirm target S/4HANA release (Cloud Public Edition vs Private Cloud vs On-Premise) and available BTP destination bindings.\n"
        "2. Intake Prioritization: Evaluate whether the pilot should prioritize Physical Gate Scans (Plant Operations) or AP Email Inbound (Shared Services).\n"
        "3. Statutory GST Strategy: Identify preferred GSP/ASP partner (Cleartax, Cygnet, or standard SAP DRC) for automated GSTR-2B reconciliation feeds.\n"
        "4. Workflow Governance: Align on SAP Build Process Automation tenant entitlements and Fiori My Inbox task routing."
    )
    p2.font.name = "Arial"
    p2.font.size = Pt(8.5)
    p2.font.color.rgb = C_SLATE
    p2.space_after = Pt(4)

    p3 = tf.add_paragraph()
    p3.text = "Thank you! Open for technical discussion, architecture review, and live demonstration."
    p3.font.name = "Arial"
    p3.font.size = Pt(9.5)
    p3.font.bold = True
    p3.font.color.rgb = C_SAP_BLUE

    slide12.notes_slide.notes_text_frame.text = (
        "SLIDE 12: ROADMAP, NEXT STEPS, AND TEAM DISCUSSION\n\n"
        "1. What the presenter should explain:\n"
        "Conclude the presentation by reviewing our realistic, phased delivery roadmap and opening the floor to strategic discussion with the AIS Digital Team.\n\n"
        "2. Business Meaning:\n"
        "We are not presenting a finished, rigid software package; we are presenting an active, tested innovation asset that is ready for enterprise integration. "
        "The phased roadmap ensures that risks are mitigated early in controlled pilot environments before moving to full-scale production.\n\n"
        "3. Discussion Questions for the Digital Team:\n"
        "Direct the team to the four specific alignment topics:\n"
        "- What S/4HANA sandbox or development tenant should we target for BTP destination testing?\n"
        "- Does AIS have existing SAP AI Core entitlements for Document Information Extraction (DOX)?\n"
        "- What is the preferred strategy for Indian GST GSTR-2B statement ingestion?\n"
        "- How should task routing in SAP Build Process Automation be configured for department requisitioners?\n\n"
        "4. Closing Note:\n"
        "Thank the team, emphasize readiness to demonstrate the live application running on SAP BTP Cloud Foundry, and invite technical and business questions."
    )

    # Save presentation
    prs.save(PPTX_PATH)
    print(f"PowerPoint Presentation saved successfully: {PPTX_PATH}")
    return prs

def build_docx_speaker_notes():
    """Generates the companion Word document with comprehensive speaker notes."""
    doc = docx.Document()
    
    # Page Setup: Standard Letter, 1 inch margins
    sections = doc.sections
    for section in sections:
        section.top_margin = DocxInches(1.0)
        section.bottom_margin = DocxInches(1.0)
        section.left_margin = DocxInches(1.0)
        section.right_margin = DocxInches(1.0)

    # Document Header / Title
    p_title = doc.add_paragraph()
    r = p_title.add_run("Invoice Decision Intelligence")
    r.font.name = "Arial"
    r.font.size = DocxPt(24)
    r.font.bold = True
    r.font.color.rgb = DocxRGBColor(10, 37, 64)
    
    p_sub = doc.add_paragraph()
    r = p_sub.add_run("Comprehensive Speaker Notes & Architectural Briefing Document\n")
    r.font.name = "Arial"
    r.font.size = DocxPt(13)
    r.font.bold = True
    r.font.color.rgb = DocxRGBColor(0, 102, 204)
    
    # Metadata Block
    p_meta = doc.add_paragraph()
    p_meta.add_run("Prepared for: ").bold = True
    p_meta.add_run("Digital Team, Abhiyanta India Solutions (AIS)\n")
    p_meta.add_run("Prepared by: ").bold = True
    p_meta.add_run("Ali Faiz, AI/ML Intern\n")
    p_meta.add_run("Date: ").bold = True
    p_meta.add_run("October 12, 2026\n")
    p_meta.add_run("Application Status: ").bold = True
    p_meta.add_run("Live Prototype on SAP BTP Cloud Foundry (Dev Space)\n")
    p_meta.add_run("Target Environment: ").bold = True
    p_meta.add_run("SAP BTP Cloud Foundry & SAP S/4HANA Cloud (Clean Core Reference Architecture)\n")
    
    # Divider line
    p_div = doc.add_paragraph()
    r = p_div.add_run("―" * 55)
    r.font.color.rgb = DocxRGBColor(200, 200, 200)

    # Detailed notes for all 12 slides
    slides_notes_data = [
        {
            "slide_num": 1,
            "title": "Title Page: Enterprise Architecture & Decision Intelligence",
            "talking_points": [
                "Introduce yourself as Ali Faiz, AI/ML Intern at Abhiyanta India Solutions.",
                "Frame the presentation: 'Invoice Decision Intelligence' is an enterprise cognitive layer bridging multi-channel invoice intake and SAP S/4HANA Logistics Invoice Verification (LIV).",
                "Highlight the deployment context: the solution is actively deployed and running on SAP BTP Cloud Foundry in our organization's Dev space.",
                "Emphasize the core theme: this is not another generic OCR scanning tool; it is a procurement-aware decision engine that enforces SAP tolerance rules, segregates duties, and generates explainable rationales."
            ],
            "business_meaning": (
                "In enterprise procurement, AP teams spend up to 70% of their operational time cross-referencing routine invoices against Purchase Orders and warehouse receipts. "
                "Meanwhile, subtle price creep, duplicate invoice submissions, and statutory GST compliance deadlines create massive financial leakage. "
                "This solution delivers a centralized decision layer that automates the ordinary and surfaces the exceptional with complete auditability."
            ),
            "technical_details": (
                "The application is implemented in Node.js TypeScript with SAP Fiori Horizon UX. It is deployed as a cloud microservice on SAP BTP Cloud Foundry. "
                "All ERP interactions are abstracted through an 'ISAPAdapter' interface. In the current prototype, 'MockSAPAdapter' provides a relational in-memory database "
                "pre-seeded with 10 real enterprise scenarios. We explicitly clarify that live SAP S/4HANA and GSTN connections are planned for Phase 2."
            ),
            "qa": [
                ("Is this solution currently live on SAP BTP?", 
                 "Yes. The application container is actively deployed and running on SAP BTP Cloud Foundry (EU10-005 landscape) under the organization 'Abhiyanta India Solutions Private Limited' in the 'Dev' space."),
                ("Does it replace SAP S/4HANA MIRO?", 
                 "No. It operates as an upstream decision intelligence layer that prepares, verifies, and triggers standard S/4HANA MIRO posting via released OData APIs, maintaining full SAP Clean Core compliance.")
            ]
        },
        {
            "slide_num": 2,
            "title": "Executive Summary: Cognitive Layer for AP Decisioning",
            "talking_points": [
                "Walk through the four quadrants: Problem, Solution, Demo Proof, and Production Roadmap.",
                "Emphasize that the demo is thoroughly tested: 138 automated test cases verify matching logic, state transitions, and audit logging.",
                "Explain the clean-core design: the application lives on BTP without touching core ERP tables."
            ],
            "business_meaning": (
                "Executive leaders need confidence that automation will not introduce unmonitored risk into financial statements. "
                "This summary shows that we combine high-throughput automation for clean invoices with impenetrable gatekeepers for anomalies, "
                "backed by a clear transition path to enterprise production."
            ),
            "technical_details": (
                "The prototype validates native SAP LIV tolerance keys: DQ for quantity over-delivery and PP for price tolerance breaches. "
                "The test suite covers full end-to-end lifecycles including parking (MIR7), posting (MIRO), and simulated clearing (BSAK/F110)."
            ),
            "qa": [
                ("What makes this different from an OCR solution?", 
                 "OCR extracts raw characters from images. Decision Intelligence correlates that text against ERP master data, PO line items, Goods Receipts, quality inspection lots, duplicate indices, and statutory tax rules to recommend business actions."),
                ("Can the system scale to handle millions of invoices?", 
                 "Yes. On SAP BTP Cloud Foundry, the stateless Node.js application container scales horizontally, while document extraction is offloaded to SAP Document Information Extraction (DOX) via SAP AI Core.")
            ]
        },
        {
            "slide_num": 3,
            "title": "The Enterprise Challenge: Friction & Leakage in AP",
            "talking_points": [
                "Detail the four structural pain points: Multi-Channel Ingestion, Manual 3-Way Reconciliation, Financial Leakage, and Ambiguous Decision Ownership.",
                "Emphasize that these are standard enterprise procurement vulnerabilities across global manufacturing and shared services.",
                "Explain the severe compliance pressure in India: the 48-hour statutory window for e-invoicing and Section 16(2)(aa) Input Tax Credit rules."
            ],
            "business_meaning": (
                "Manual AP processes create dual exposure: operational inefficiency (slow cycle times, delayed month-end close) and direct financial loss "
                "(paying for unreceived goods, unapproved price increases, and duplicate submissions). Furthermore, tax authorities penalize companies that fail to reconcile GST within statutory deadlines."
            ),
            "technical_details": (
                "In traditional setups, AP clerks must manually toggle between SAP transactions ME23N (Display PO), MIGO (Display Goods Receipt), "
                "QA33 (Quality Inspection), and MIRO (Enter Invoice). This fragmented experience creates human error and fatigue."
            ),
            "qa": [
                ("Why don't standard SAP tolerance keys prevent these issues automatically?", 
                 "Standard SAP tolerance keys trigger warnings or blocks during manual entry in transaction MIRO. However, clerks often override blocks manually under pressure to clear backlogs, and keying in data takes 10 to 15 minutes per complex invoice.")
            ]
        },
        {
            "slide_num": 4,
            "title": "Proposed Solution: Decision Intelligence on SAP BTP",
            "talking_points": [
                "Present the three architectural pillars: Cognitive Intake, Deterministic LIV Engine, and Explainable AI Governance.",
                "Clarify that 3-way matching is deterministic, not speculative machine learning.",
                "Explain the concept of 'Evidence-First XAI': separating auditable FACTS from SYSTEM RECOMMENDATIONS."
            ],
            "business_meaning": (
                "Enterprise finance requires deterministic certainty. An algorithm cannot 'guess' whether a bill of materials was received. "
                "Our solution enforces deterministic SAP business rules for calculations, while utilizing AI for document understanding, anomaly pattern detection, and generating transparent audit explanations."
            ),
            "technical_details": (
                "Canonical normalization maps diverse incoming document schemas into a single typed interface ('CanonicalSupplierInvoice'). "
                "Every evaluation retains the raw document link, original channel metadata, and full calculation traces."
            ),
            "qa": [
                ("How does the system handle invoices that do not have a Purchase Order?", 
                 "The engine detects the absence of a PO reference, categorizes the invoice as 'NON_PO_PROCESS', and automatically routes it to the departmental Cost Center approver based on predefined G/L rules.")
            ]
        },
        {
            "slide_num": 5,
            "title": "End-to-End Workflow: Intake to Settlement",
            "talking_points": [
                "Walk through the 5 stages: Intake, Normalization, Context Enrichment, Reconciliation, and Decision Triage.",
                "Detail the four decision branches: Branch A (Auto-Proceed), Branch B (Business Validation), Branch C (Manual Review), and Branch D (Hold/Reject).",
                "Emphasize that the system preserves segregation of duties throughout the lifecycle."
            ],
            "business_meaning": (
                "Different invoices require different levels of human oversight. Straightforward utility bills or clean PO matches should flow touchlessly, "
                "freeing skilled finance professionals to investigate high-risk exceptions, price discrepancies, and damaged warehouse deliveries."
            ),
            "technical_details": (
                "The workflow maintains explicit state transitions: DRAFT -> NORMALIZED -> RECONCILED -> (BUSINESS_VALIDATED) -> PARKED / POSTED -> PAID. "
                "Every state transition is validated and recorded in the audit ledger."
            ),
            "qa": [
                ("Can an invoice be automatically paid without finance review?", 
                 "Never. The system strictly halts autonomous actions at posting (MIRO). Bank disbursement (F110) remains a separate downstream process controlled exclusively by corporate treasury.")
            ]
        },
        {
            "slide_num": 6,
            "title": "System Architecture: SAP BTP & S/4HANA Reference Model",
            "talking_points": [
                "Direct attention to the embedded architecture diagram, which preserves the original aspect ratio and layout.",
                "Highlight Clean Core compliance: zero modifications to core S/4HANA tables.",
                "Explain the ISAPAdapter decoupling pattern and how it supports both local simulation and cloud production."
            ],
            "business_meaning": (
                "Enterprise IT architects reject monolithic customizations that jeopardize ERP upgrades. "
                "By keeping all decision intelligence on SAP BTP and integrating via standard APIs, the architecture aligns with SAP's Clean Core mandate."
            ),
            "technical_details": (
                "In the current prototype, 'MockSAPAdapter' provides full relational integrity in memory. In production, 'S4HanaCloudAdapter' "
                "utilizes '@sap-cloud-sdk/http-client' to communicate with standard S/4HANA OData services: API_BUSINESS_PARTNER, API_PURCHASEORDER_PROCESS_SRV, "
                "API_MATERIAL_DOCUMENT_SRV, and API_SUPPLIERINVOICE_PROCESS_SRV."
            ),
            "qa": [
                ("What SAP BTP services are required in production?", 
                 "Cloud Foundry Runtime (or Kyma Runtime), SAP Destination Service, SAP Document Information Extraction (DOX) via SAP AI Core, SAP Integration Suite (CPI), SAP Build Process Automation (SBPA), and SAP HANA Cloud.")
            ]
        },
        {
            "slide_num": 7,
            "title": "AI Capabilities & Intelligence Layer: Reality Matrix",
            "talking_points": [
                "Walk through the reality matrix line by line.",
                "Explicitly point out what is implemented, what is simulated, and what is planned.",
                "Reinforce why ordinary validation rules are not labeled as AI."
            ],
            "business_meaning": (
                "Technical credibility requires honesty. We do not disguise deterministic 'if-then' tolerance checks as generative AI. "
                "Instead, we clearly articulate how deterministic rules, heuristic scoring, and future generative AI work together in a layered defense."
            ),
            "technical_details": (
                "The confidence score is computed via a multi-factor heuristic model in 'AIDecisionEngine.ts' that starts at 100% and applies mathematical penalties "
                "for missing receipts, tolerance breaches, duplicate suspects, and quality lot rejections. Risk tiers are assigned based on financial thresholds."
            ),
            "qa": [
                ("Is there any generative AI in the current build?", 
                 "The current build uses deterministic rule-grounded generation for the 4-part decision explainer. Grounded generative AI using SAP BTP Generative AI Hub is planned for Phase 3 to provide open-ended natural language invoice summarization.")
            ]
        },
        {
            "slide_num": 8,
            "title": "Invoice Validation & Decision Scenarios: Verified Fixtures",
            "talking_points": [
                "Present the 4 featured scenarios using exact data from the application repository.",
                "Scenario 1: Schneider Electric (INV-2026-00001, ₹59,000) - Clean 3-way match, Auto-Proceed.",
                "Scenario 2: Siemens India (INV-2026-00002, ₹1,41,600) - Quantity shortfall, Tolerance DQ breached, Manual Review / MIR7.",
                "Scenario 3: AWS India (INV-2026-00007, ₹4,01,200) - Duplicate bill detection against historical index, Critical Hold.",
                "Scenario 4: Schneider Electric (INV-2026-00008, ₹9,97,100) - Statutory e-invoice under 48h SLA, Business Owner Validation."
            ],
            "business_meaning": (
                "These scenarios prove that the system handles diverse real-world procurement conditions: perfect deliveries, missing warehouse units, "
                "fraudulent duplicate billings, and tight statutory compliance windows."
            ),
            "technical_details": (
                "The duplicate check in Scenario 3 hashes Supplier ID, Invoice Reference Number, and Fiscal Year against an in-memory set seeded with "
                "historical posted invoice '10005500:AWS/2026/1090:2026'. This mirrors SAP's standard table checks in RBKP and BSIP."
            ),
            "qa": [
                ("How does the system simulate quality inspection failures?", 
                 "In Scenario 6 (Wipro Enterprises), the system inspects SAP Quality Lot 100004580, which records 5 rejected HEPA air filters. The engine flags this defect and places the invoice on HOLD until a credit memo is issued.")
            ]
        },
        {
            "slide_num": 9,
            "title": "SAP Finance Process & Business Controls",
            "talking_points": [
                "Explain the 3-tier segregation of duties: Business Owner Validation vs Finance LIV Review vs Treasury Disbursement.",
                "Clarify why business approval does not equal financial posting or payment.",
                "Explain standard SAP transactions: MIR7 (Park), MIRO (Post), and F110 (Automatic Payment Run)."
            ],
            "business_meaning": (
                "Segregation of Duties (SoD) is the cornerstone of corporate governance and SOX 404 compliance. "
                "Allowing a departmental requisitioner to authorize a bank payment creates severe fraud exposure. Our system strictly confines requisitioners "
                "to operational delivery confirmation, leaving financial posting to AP and cash disbursement to Treasury."
            ),
            "technical_details": (
                "When an invoice has commercial discrepancies, our system recommends parking via MIR7. Parking creates an official accounting document "
                "with payment block 'R', ensuring the liability is recorded while preventing unauthorized payment."
            ),
            "qa": [
                ("What happens if a posted invoice needs to be canceled?", 
                 "In standard SAP finance, posted invoices (MIRO) cannot be simply deleted; they must be reversed using transaction MR8M or compensated via a formal vendor credit memo. Our system models this exact governance pattern.")
            ]
        },
        {
            "slide_num": 10,
            "title": "Current Demo vs. Production Scope (Gap Analysis Matrix)",
            "talking_points": [
                "Walk through the gap analysis table across all six functional domains.",
                "Contrast the mock adapters with their production SAP replacements.",
                "Explain the transition effort: changing environment variables, configuring BTP destinations, and deploying standard integration services."
            ],
            "business_meaning": (
                "Clear gap analysis builds trust with IT leadership. We show that the architecture was engineered from day one to replace mock adapters "
                "with enterprise cloud services without redesigning the application logic."
            ),
            "technical_details": (
                "The transition from MockSAPAdapter to S4HanaCloudAdapter requires setting 'DEMO_MODE=false' and configuring the SAP BTP Destination 'S4HANA_2023_CLOUD' "
                "with OAuth 2.0 SAML Bearer Assertion. The code structure in 'src/integrations/sap/S4HanaCloudAdapter.ts' is already in place."
            ),
            "qa": [
                ("How will invoice OCR be handled in production?", 
                 "In production, physical PDFs and scans will be sent via REST API to SAP Document Information Extraction (DOX) on SAP AI Core using the pre-trained 'sap.invoice:latest' schema.")
            ]
        },
        {
            "slide_num": 11,
            "title": "Business Value, Governance, and Risk Controls",
            "talking_points": [
                "Contrast the Strategic Value Drivers on the left with the Enterprise Risk Controls on the right.",
                "Emphasize that value is presented as operational benefits, not unverified ROI metrics.",
                "Walk through the governance guardrails: Zero Autonomous Disbursement, Deterministic Gatekeeper Precedence, and RBAC."
            ],
            "business_meaning": (
                "Value creation must be balanced with risk mitigation. By accelerating clean invoices and catching commercial leaks early, "
                "enterprises achieve working capital protection and audit compliance without taking unmonitored operational risks."
            ),
            "technical_details": (
                "The engine enforces hard gatekeeper precedence: if a duplicate invoice hash or quality defect is detected, "
                "the invoice is placed on HOLD regardless of high extraction confidence scores."
            ),
            "qa": [
                ("How does the system ensure data privacy?", 
                 "All data processing occurs within the customer's enterprise SAP BTP tenant. No financial data, tax IDs, or payment details are transmitted to external third-party consumer AI services.")
            ]
        },
        {
            "slide_num": 12,
            "title": "Roadmap, Next Steps, and Strategic Alignment",
            "talking_points": [
                "Present the 4-phase roadmap: Phase 1 (Achieved), Phase 2 (SAP Connectivity & DOX), Phase 3 (Controlled Pilot & SBPA), Phase 4 (Production Go-Live).",
                "Highlight the four key discussion topics for the AIS Digital Team.",
                "Thank the team and open the floor for technical review and live demonstration."
            ],
            "business_meaning": (
                "A phased roadmap ensures manageable risk and demonstrable milestones. Each phase delivers tangible technical outcomes "
                "before advancing to full enterprise cutover."
            ),
            "technical_details": (
                "Phase 2 will focus on binding SAP BTP Destinations and verifying OData calls with an S/4HANA sandbox. "
                "Phase 3 will introduce persistent SAP HANA Cloud storage and SAP Build Process Automation workflows."
            ),
            "qa": [
                ("What is the immediate next step after today's presentation?", 
                 "Align with the Digital Team on the target SAP S/4HANA test landscape and initiate BTP Destination configuration for Phase 2 integration.")
            ]
        }
    ]

    for item in slides_notes_data:
        # Heading 1 for each slide
        h1 = doc.add_paragraph()
        r = h1.add_run(f"SLIDE {item['slide_num']}: {item['title']}")
        r.font.name = "Arial"
        r.font.size = DocxPt(14)
        r.font.bold = True
        r.font.color.rgb = DocxRGBColor(10, 37, 64)
        h1.paragraph_format.space_before = DocxPt(14)
        h1.paragraph_format.space_after = DocxPt(4)

        # Section 1: What to Explain / Key Talking Points
        h2 = doc.add_paragraph()
        r = h2.add_run("1. Key Talking Points & Presenter Script")
        r.font.name = "Arial"
        r.font.size = DocxPt(11)
        r.font.bold = True
        r.font.color.rgb = DocxRGBColor(0, 102, 204)
        h2.paragraph_format.space_after = DocxPt(2)

        for pt in item["talking_points"]:
            p = doc.add_paragraph(style='List Bullet')
            r = p.add_run(pt)
            r.font.name = "Arial"
            r.font.size = DocxPt(10)
            p.paragraph_format.space_after = DocxPt(2)

        # Section 2: Business Meaning
        h2 = doc.add_paragraph()
        r = h2.add_run("2. Strategic Business Meaning")
        r.font.name = "Arial"
        r.font.size = DocxPt(11)
        r.font.bold = True
        r.font.color.rgb = DocxRGBColor(0, 102, 204)
        h2.paragraph_format.space_before = DocxPt(4)
        h2.paragraph_format.space_after = DocxPt(2)

        p = doc.add_paragraph()
        r = p.add_run(item["business_meaning"])
        r.font.name = "Arial"
        r.font.size = DocxPt(10)
        p.paragraph_format.space_after = DocxPt(4)

        # Section 3: Technical Details & Reality Boundary
        h2 = doc.add_paragraph()
        r = h2.add_run("3. Technical Details & Reality Boundaries (Demo vs. Production)")
        r.font.name = "Arial"
        r.font.size = DocxPt(11)
        r.font.bold = True
        r.font.color.rgb = DocxRGBColor(0, 102, 204)
        h2.paragraph_format.space_before = DocxPt(4)
        h2.paragraph_format.space_after = DocxPt(2)

        p = doc.add_paragraph()
        r = p.add_run(item["technical_details"])
        r.font.name = "Arial"
        r.font.size = DocxPt(10)
        p.paragraph_format.space_after = DocxPt(4)

        # Section 4: Anticipated Questions & Accurate Answers
        h2 = doc.add_paragraph()
        r = h2.add_run("4. Anticipated Questions from the Digital Team & Technical Answers")
        r.font.name = "Arial"
        r.font.size = DocxPt(11)
        r.font.bold = True
        r.font.color.rgb = DocxRGBColor(0, 102, 204)
        h2.paragraph_format.space_before = DocxPt(4)
        h2.paragraph_format.space_after = DocxPt(2)

        for q, a in item["qa"]:
            p = doc.add_paragraph()
            r_q = p.add_run(f"Q: {q}\n")
            r_q.font.bold = True
            r_q.font.color.rgb = DocxRGBColor(30, 41, 59)
            r_q.font.size = DocxPt(9.5)
            
            r_a = p.add_run(f"A: {a}")
            r_a.font.color.rgb = DocxRGBColor(71, 85, 105)
            r_a.font.size = DocxPt(9.5)
            p.paragraph_format.space_after = DocxPt(4)

        # Divider between slides
        p_div = doc.add_paragraph()
        r = p_div.add_run("―" * 55)
        r.font.color.rgb = DocxRGBColor(220, 220, 220)
        p_div.paragraph_format.space_after = DocxPt(8)

    doc.save(DOCX_PATH)
    print(f"Word Speaker Notes saved successfully: {DOCX_PATH}")

def convert_pptx_to_pdf():
    """Converts PPTX to PDF using PowerPoint COM automation."""
    import win32com.client
    abs_pptx = os.path.abspath(PPTX_PATH)
    abs_pdf = os.path.abspath(PDF_PATH)
    
    print(f"Starting PowerPoint COM conversion: {abs_pptx} -> {abs_pdf}")
    app = win32com.client.Dispatch("PowerPoint.Application")
    try:
        deck = app.Presentations.Open(abs_pptx, WithWindow=False)
        # 32 = ppSaveAsPDF
        deck.SaveAs(abs_pdf, 32)
        deck.Close()
        print(f"PDF generated successfully: {abs_pdf}")
    except Exception as e:
        print(f"Error during PowerPoint COM conversion: {e}")
        raise
    finally:
        app.Quit()

def export_slide_images_for_qa():
    """Exports each slide as high-res PNG to inspect visual quality."""
    import win32com.client
    abs_pptx = os.path.abspath(PPTX_PATH)
    qa_dir = os.path.join(OUTPUT_DIR, "presentation_qa_slides")
    os.makedirs(qa_dir, exist_ok=True)
    
    app = win32com.client.Dispatch("PowerPoint.Application")
    try:
        deck = app.Presentations.Open(abs_pptx, WithWindow=False)
        for i in range(1, deck.Slides.Count + 1):
            slide_path = os.path.join(qa_dir, f"slide_{i:02d}.png")
            deck.Slides(i).Export(slide_path, "PNG", 1920, 1080)
            print(f"Exported QA slide image: {slide_path}")
        deck.Close()
    finally:
        app.Quit()

if __name__ == "__main__":
    print("=== STARTING PRESENTATION GENERATION ===")
    build_all_slides()
    build_docx_speaker_notes()
    convert_pptx_to_pdf()
    export_slide_images_for_qa()
    print("=== PRESENTATION GENERATION COMPLETE ===")
