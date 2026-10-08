# Invoice Decision Intelligence — UX Principles & Design System
**Document ID:** PROD-UX-003  
**Design Reference:** SAP Fiori Morning Horizon UX Guidelines  
**Version:** 1.0.0  

---

## 1. Core Visual Principles: "Expensive Because It Is Restrained"

Enterprise financial applications handling millions of dollars must convey authority, stability, and auditability. The user interface must strictly adhere to the following principles:

1. **Restrained Semantic Palette:**
   - **Neutral Canvas:** `#F5F6F8` light gray canvas prevents eye fatigue across 8-hour operational shifts.
   - **Card & Surface Backgrounds:** Solid `#FFFFFF` with 1px subtle borders (`#D9E0E8`).
   - **Brand Blue:** `#0070F2` (SAP Horizon Blue) utilized solely for interactive controls, selected states, and navigational anchors.
   - **Semantic Signals:**
     - Positive / Matched: `#107E3E` (Dark Green) / Background `#EAF6EE`.
     - Critical / Attention: `#D04900` (Dark Amber) / Background `#FDF3EB`.
     - Negative / Hold / Rejection: `#BB0000` (Dark Red) / Background `#FDE8E8`.
     - Information: `#0070F2` / Background `#EBF3FB`.

2. **Prohibited Visual Patterns:**
   - ❌ **No Glassmorphism / Frosted Blur:** Illegible for data-dense tables.
   - ❌ **No Neon Accents or Rainbow Gradients:** Incompatible with corporate accounting standards.
   - ❌ **No Oversized Rounded Cards or Giant KPI Tiles:** Wastes screen real estate.
   - ❌ **No "AI Magic" Imagery:** No glowing sparkles or robot icons; intelligence is communicated via facts, data deltas, and actionable explanations.

3. **Typography & Density Hierarchy:**
   - Typeface: SAP "72", system sans-serif fallback.
   - Header 1 (View Title): 18px / 600 weight.
   - Section Header: 13px / 600 weight / Uppercase tracking.
   - Body & Table Text: 13px / 400 weight.
   - Compact Metadata: 11px / 500 weight.

---

## 2. Desktop-First Responsiveness

The primary personas (AP Clerks, Finance Controllers, Procurement Managers) operate on dual enterprise monitors:
- **Primary Optimization:** 1440px and 1920px viewports.
- **Secondary Tablet Optimization:** 1024px to 1280px with collapsible side panels.
- **Master-Detail Split:** 340px master list + fluid detail workspace.
