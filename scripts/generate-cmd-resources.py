from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether

OUT = Path(__file__).resolve().parents[1] / "public" / "resources"
OUT.mkdir(parents=True, exist_ok=True)
PURPLE = colors.HexColor("#52258B")
INK = colors.HexColor("#201832")
MUTED = colors.HexColor("#655C73")
MIST = colors.HexColor("#F4F0F9")
LINE = colors.HexColor("#DDD4E8")
pdfmetrics.registerFont(TTFont("DV", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DV-B", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))

base = getSampleStyleSheet()
S = {
    "title": ParagraphStyle("title", fontName="DV-B", fontSize=25, leading=31, textColor=INK, alignment=1, spaceAfter=15),
    "kicker": ParagraphStyle("kicker", fontName="DV-B", fontSize=10, leading=14, textColor=PURPLE, alignment=1, spaceAfter=9),
    "sub": ParagraphStyle("sub", fontName="DV", fontSize=11.5, leading=17, textColor=MUTED, alignment=1, spaceAfter=18),
    "h1": ParagraphStyle("h1", fontName="DV-B", fontSize=18, leading=23, textColor=PURPLE, spaceBefore=9, spaceAfter=8, keepWithNext=True),
    "h2": ParagraphStyle("h2", fontName="DV-B", fontSize=12, leading=16, textColor=INK, spaceBefore=7, spaceAfter=4, keepWithNext=True),
    "body": ParagraphStyle("body", fontName="DV", fontSize=9.4, leading=14, textColor=INK, spaceAfter=7),
    "bullet": ParagraphStyle("bullet", fontName="DV", fontSize=9.2, leading=13.5, textColor=INK, leftIndent=14, firstLineIndent=-8, bulletIndent=3, spaceAfter=4),
    "callout": ParagraphStyle("callout", fontName="DV-B", fontSize=10.3, leading=15, textColor=PURPLE, backColor=MIST, borderColor=LINE, borderWidth=.7, borderPadding=10, spaceBefore=7, spaceAfter=10),
}

def header_footer(canvas, doc):
    w, h = A4
    canvas.saveState()
    canvas.setStrokeColor(LINE); canvas.line(18*mm, h-15*mm, w-18*mm, h-15*mm)
    canvas.setFillColor(PURPLE); canvas.setFont("DV-B", 7.2)
    canvas.drawString(18*mm, h-11.5*mm, "SMART CLINIC EXCHANGE | TERTIARY HEALTH INFORMATION EXCHANGE")
    canvas.setFillColor(MUTED); canvas.setFont("DV", 7)
    canvas.drawString(18*mm, 10*mm, "Implemented by Primed E-Health")
    canvas.drawRightString(w-18*mm, 10*mm, f"Page {doc.page}")
    canvas.restoreState()

def document(path, title):
    return SimpleDocTemplate(str(path), pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=22*mm, bottomMargin=18*mm, title=title, author="Primed E-Health")

def cover(story, kicker, title, subtitle):
    story += [Spacer(1, 42*mm), Paragraph(kicker, S["kicker"]), Paragraph(title, S["title"]), Paragraph(subtitle, S["sub"]), Spacer(1, 8*mm), Paragraph("Powered by the Committee of Chief Medical Directors<br/>Born from the NCC 2021 Health-Tech Hackathon", S["callout"]), Spacer(1, 9*mm), Paragraph("One ID. One wallet. Multiple hospitals.", S["callout"]), PageBreak()]

def h1(story, text): story.append(Paragraph(text, S["h1"]))
def h2(story, text): story.append(Paragraph(text, S["h2"]))
def body(story, text): story.append(Paragraph(text, S["body"]))
def bullets(story, items):
    for item in items: story.append(Paragraph(item, S["bullet"], bulletText="•"))

def make_mou():
    story = []
    cover(story, "THIE PARTICIPATION AGREEMENT", "Hospital Participation Memorandum of Understanding", "A clear framework for joining Nigeria's connected tertiary hospital network.")
    h1(story, "1. Parties and purpose")
    body(story, "This Memorandum of Understanding is made between <b>Primed E-Health Heritage Ltd</b> (Technology and Operations Lead) and <b>[Participating Institution]</b>, in collaboration with the Committee of Chief Medical Directors. It establishes a cooperative framework for participation in the Tertiary Health Information Exchange under the Smart Clinic Exchange.")
    h1(story, "2. Shared objectives")
    bullets(story, ["Create a secure patient identity linked to the hospital's existing patient number.", "Improve appointment access, referrals, follow-up and continuity of care.", "Enable consent-based retrieval and exchange of agreed health-record information.", "Coordinate digital and hospital payment options with transparent reconciliation.", "Expand access to approved services and specialists across participating institutions."])
    h1(story, "3. Scope of participation")
    for title, text in [("Patient identity and registration", "Generate or retrieve the Exchange ID, link it to the hospital's local record number, and reduce avoidable duplicate registration."), ("Appointments and referrals", "Receive and manage appointments, inter-hospital referrals and follow-up through agreed workflows."), ("Health-record connectivity", "Connect agreed elements of the local EMR or record system and allow consent-based record requests, beginning with approved summaries."), ("Payments and wallet", "Support approved digital payment and wallet workflows while retaining the hospital's existing payment system and institutional controls."), ("Telemedicine and specialist access", "Enable eligible virtual consultations, specialist support and cross-network care coordination.")]:
        h2(story, title); body(story, text)
    h1(story, "4. Financial principles")
    body(story, "The hospital retains ownership of its existing revenue. Any Exchange contribution, connection fee, embedded charge, transaction share or hospital-specific commercial arrangement must be documented in a signed schedule or addendum.")
    bullets(story, ["No undisclosed deductions.", "Transparent transaction and reconciliation reports.", "Hospital-specific fees and settlement rules agreed before activation.", "Patient affordability and operational sustainability considered together."])
    story.append(PageBreak())
    h1(story, "5. Implementation pathway")
    for n, title, text in [(1, "Alignment", "The CMD nominates representatives from Records, ICT, Finance and CMAC/clinical leadership."), (2, "Configuration", "Patient access, identity, appointment and payment workflows are agreed."), (3, "Integration", "The Exchange is linked manually and/or technically to the local record or EMR environment."), (4, "Training", "Desk officers and departmental representatives complete role-based sessions."), (5, "Go-live", "The hospital activates with monitored support, reporting and a joint review.")]:
        story.append(KeepTogether([Paragraph(f"{n}. {title}", S["h2"]), Paragraph(text, S["body"])]))
    h1(story, "6. Data governance and privacy")
    bullets(story, ["The institution retains ownership of its clinical and administrative data.", "Only the minimum agreed information required for coordinated care is processed.", "Patient access and sharing are subject to consent, role-based access and applicable law.", "Data handling must comply with the Nigeria Data Protection Act 2023 and applicable health-sector requirements."])
    h1(story, "7. Mutual responsibilities")
    h2(story, "The participating institution will")
    bullets(story, ["Nominate an accountable focal person and departmental representatives.", "Facilitate agreed onboarding, training, technical assessment and implementation sessions.", "Maintain its clinical authority, approvals and internal governance responsibilities."])
    h2(story, "Primed E-Health will")
    bullets(story, ["Provide the Exchange platform, onboarding, training and implementation coordination.", "Protect institutional and patient information through appropriate security and access controls.", "Provide technical support, performance visibility and transparent financial reporting."])
    h1(story, "8. Term and general provisions")
    body(story, "The initial term is five years from signature, renewable by mutual written agreement. Either party may terminate for an uncured material breach after written notice and a reasonable cure period. Patient-care continuity, data protection and outstanding reconciliations must be responsibly concluded. Non-public information is confidential. Disputes should first be addressed through good-faith negotiation and, if unresolved, mutually agreed mediation. Nigerian law applies.")
    story.append(Paragraph("This MOU records a collaborative framework and intention to participate. Hospital-specific technical, operational and commercial obligations should be confirmed in signed schedules or definitive agreements.", S["callout"]))
    story.append(PageBreak()); h1(story, "9. Signatures")
    body(story, "<b>FOR PRIMED E-HEALTH HERITAGE LTD</b><br/><br/>Name: Dr. Abdulhafiz Are<br/><br/>Title: Chief Executive Officer<br/><br/>Signature: __________________________________<br/><br/>Date: ______________________________________<br/><br/>Stamp:")
    body(story, "<b>FOR THE PARTICIPATING INSTITUTION</b><br/><br/>Name: ______________________________________<br/><br/>Title: _______________________________________<br/><br/>Signature: __________________________________<br/><br/>Date: ______________________________________<br/><br/>Stamp:")
    h2(story, "Witnesses")
    body(story, "Name: __________________________  Signature: __________________________  Date: __________________")
    document(OUT / "THIE-Hospital-Participation-MOU.pdf", "THIE Hospital Participation MOU").build(story, onFirstPage=header_footer, onLaterPages=header_footer)

def make_pack():
    story = []
    cover(story, "CMD INFORMATION PACK", "Smart Clinic Exchange: Hospital Leadership Guide", "The complete executive picture for CMDs and hospital administrators.")
    h1(story, "The proposition in one minute")
    body(story, "A hospital should remain independent without operating in isolation. Smart Clinic Exchange connects participating hospitals through one patient identity, one wallet and coordinated access to appointments, records, referrals and specialist care.")
    story.append(Paragraph("Your hospital keeps its leadership, clinical authority, local EMR, data ownership and payment controls. The Exchange becomes the access and connectivity layer around your existing services.", S["callout"]))
    h1(story, "What the hospital gains")
    bullets(story, ["<b>More patient reach:</b> communities, employers, schools and families can discover approved hospital services.", "<b>More specialist capacity:</b> appropriate cases can connect to doctors across the network.", "<b>More completed appointments:</b> phone, WhatsApp, digital booking and desk support reduce lost enquiries.", "<b>New revenue channels:</b> appointments, diagnostics, pharmacy, checkups, referrals and approved digital services.", "<b>Better continuity:</b> patients can request approved summaries and remain connected after discharge.", "<b>Better visibility:</b> structured reporting for registrations, appointments, payments and referrals."])
    h1(story, "National rollout progress")
    h2(story, "Lagos cohort - activated")
    bullets(story, ["<b>National Orthopaedic Hospital, Igbobi:</b> first participating-hospital MOU signed and Exchange desk established.", "<b>Federal Medical Centre, Ebute-Metta:</b> commencement approved and patient-access channels prepared.", "<b>Federal Neuro-Psychiatric Hospital, Yaba:</b> CMD alignment achieved and departmental commencement pathway initiated."])
    h2(story, "Abuja cohort - next")
    body(story, "Federal Medical Centre, Abuja (Jabi) is positioned for the next coordinated activation. Every hospital can choose the cohort and implementation timeline that best fits its readiness.")
    story.append(PageBreak())
    h1(story, "The connected patient journey")
    for n, title, text in [(1, "Identify", "The patient receives or retrieves one Exchange ID."), (2, "Link", "The ID connects to the hospital's existing local record number."), (3, "Access", "The patient books directly or receives desk-officer support."), (4, "Pay", "The patient uses an approved app, wallet or retained hospital payment route."), (5, "Continue", "Approved summaries, referrals and follow-up remain accessible across the network.")]:
        story.append(KeepTogether([Paragraph(f"{n}. {title}", S["h2"]), Paragraph(text, S["body"])]))
    h1(story, "What changes - and what does not")
    bullets(story, ["The Exchange adds a unified patient identity; the hospital retains its local number and EMR.", "The Exchange adds digital appointment and referral access; the hospital retains clinical authority.", "The Exchange adds wallet connectivity; the hospital retains its payment system and controls.", "The Exchange adds cross-network reporting; the hospital retains data ownership and governance."])
    h1(story, "Four implementation workstreams")
    for title, text in [("Patient registration and appointments", "Agree the patient journey, nominate desk officers, train them and establish assisted access."), ("Records and EMR connectivity", "Records and ICT teams map the local identifier and agree manual, API or vendor-supported integration."), ("Finance and payments", "Finance representatives agree the model, service catalogue, settlement rules and reconciliation reports."), ("Governance and adoption", "The CMD sponsors first-week alignment; departmental owners accept targets and join concise weekly reviews.")]:
        story.append(KeepTogether([Paragraph(title, S["h2"]), Paragraph(text, S["body"])]))
    story.append(PageBreak())
    h1(story, "A practical 14-day pathway")
    bullets(story, ["<b>Days 1-2:</b> CMD confirmation, focal-person nomination and joint kickoff.", "<b>Days 3-5:</b> patient-flow, identity, records, payment and service-catalogue mapping.", "<b>Days 6-8:</b> EMR/vendor technical session and configuration.", "<b>Days 9-10:</b> role-based training.", "<b>Days 11-12:</b> controlled testing.", "<b>Days 13-14:</b> activation, monitoring and rapid correction."])
    h1(story, "Commercial options")
    body(story, "The hospital-specific commercial model is agreed before activation. Options may include a connectivity fee, an embedded appointment or registration model, or a small agreed share on selected clinical services. Existing hospital revenue remains protected and all settlements must be visible in agreed reports.")
    story.append(Paragraph("The 100x statement on the public page is a long-term growth ambition, not a guaranteed return. Every projection must use the hospital's real volumes, service mix, tariffs and agreed assumptions.", S["callout"]))
    h1(story, "CMD decision checklist")
    bullets(story, ["Nominate one accountable hospital focal person.", "Provide representatives from Records, ICT, Finance and CMAC/clinical leadership.", "Choose a suitable cohort and target activation window.", "Approve the first joint virtual alignment sessions.", "Authorize local EMR/vendor participation.", "Review and sign the participation MOU and hospital-specific schedules."])
    h1(story, "Your next step")
    body(story, "Register interest through the THIE CMD portal, choose a 15-minute briefing time, and confirm through Google Calendar or WhatsApp. The programme team will prepare a hospital-specific opportunity and implementation discussion.")
    story.append(Paragraph("Programme contact: +234 805 205 8628", S["callout"]))
    document(OUT / "SmartClinic-Exchange-CMD-Information-Pack.pdf", "Smart Clinic Exchange CMD Information Pack").build(story, onFirstPage=header_footer, onLaterPages=header_footer)

make_mou()
make_pack()
