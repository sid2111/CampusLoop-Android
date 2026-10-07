"""Generate the fillable 'Restriction on Leaving Class' order for a Class IX A student.

Run: python3 make_restriction_order.py -> writes DPS_Bulandshahr_IX_A_Out_Of_Class_Ban_Order.pdf
"""
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import simpleSplit
from reportlab.pdfgen import canvas

OUT = "DPS_Bulandshahr_IX_A_Out_Of_Class_Ban_Order.pdf"
SCHOOL = "DELHI PUBLIC SCHOOL BULANDSHAHR"
W, H = A4
M = 34
CW = W - 2 * M
NAVY = colors.HexColor("#0D3B66")
RED = colors.HexColor("#B3261E")
TINT = colors.HexColor("#E8EEF6")
FIELD_BG = colors.HexColor("#F7FAFF")
GREY = colors.HexColor("#555555")
PAGES = 2

c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle(f"Restriction on Leaving Class - Class IX A - {SCHOOL}")
c.setAuthor(SCHOOL)
page = 0


def text(x, y, s, font="Helvetica", size=8, color=colors.black, align="l"):
    c.setFont(font, size)
    c.setFillColor(color)
    {"l": c.drawString, "c": c.drawCentredString, "r": c.drawRightString}[align](x, y, s)


def para(x, y, s, width, font="Helvetica", size=8, leading=10.5):
    for ln in simpleSplit(s, font, size, width):
        text(x, y, ln, font, size)
        y -= leading
    return y


def field(name, x, y, w, h, size=8, multiline=False, tip=None):
    kw = dict(name=name, tooltip=tip or name.replace("_", " "), x=x + 1, y=y + 1,
              width=w - 2, height=h - 2, borderWidth=0, fillColor=FIELD_BG,
              textColor=colors.black, fontName="Helvetica", fontSize=size, forceBorder=False)
    if multiline:
        kw["fieldFlags"] = "multiline"
    c.acroForm.textfield(**kw)


def checkbox(name, x, y, label, size=9, tip=None):
    c.acroForm.checkbox(name=name, tooltip=tip or label, x=x, y=y - 1, size=size,
                        buttonStyle="check", borderColor=colors.black, fillColor=colors.white,
                        textColor=colors.black, borderWidth=0.6, forceBorder=True)
    text(x + size + 4, y + 1, label, "Helvetica", 8)


def section(y, title):
    c.setFillColor(NAVY)
    c.rect(M, y - 15, CW, 15, stroke=0, fill=1)
    text(M + 6, y - 11, title, "Helvetica-Bold", 9, colors.white)
    return y - 15


def labelled(x, y, label, wl, wf, name, tip=None):
    text(x, y + 5, label, "Helvetica-Bold", 8)
    c.setStrokeColor(colors.black)
    c.line(x + wl, y + 1, x + wl + wf, y + 1)
    field(name, x + wl, y + 1, wf, 15, 9, tip=tip)


def box(y, h, name, label=None):
    if label:
        y -= 12
        text(M + 4, y, label, "Helvetica-Bold", 8)
        y -= 3
    c.setStrokeColor(colors.black)
    c.rect(M, y - h, CW, h, stroke=1, fill=0)
    field(name, M, y - h, CW, h, 8, multiline=True)
    return y - h


def header():
    global page
    page += 1
    c.setStrokeColor(RED)
    c.setLineWidth(1.6)
    c.rect(M - 8, M - 8, W - 2 * M + 16, H - 2 * M + 16)
    c.setLineWidth(0.5)
    top = H - M
    text(W / 2, top - 18, SCHOOL, "Helvetica-Bold", 17, NAVY, "c")
    text(W / 2, top - 33, "ORDER OF RESTRICTION - STUDENT NOT PERMITTED TO LEAVE CLASS", "Helvetica-Bold",
         10.5, RED, "c")
    y = top - 57
    c.setFillColor(TINT)
    c.setStrokeColor(NAVY)
    c.rect(M, y, CW, 16, stroke=1, fill=1)
    text(M + 6, y + 5, "CLASS:  IX", "Helvetica-Bold", 9)
    text(M + 78, y + 5, "SECTION:  A", "Helvetica-Bold", 9)
    text(M + 160, y + 5, "REF. NO.:", "Helvetica-Bold", 9)
    field(f"p{page}_ref_no", M + 206, y, 78, 16, 9, tip="Order reference number")
    text(M + 292, y + 5, "DATE OF ISSUE:", "Helvetica-Bold", 9)
    field(f"p{page}_issue_date", M + 366, y, 74, 16, 9, tip="Date of issue (DD/MM/YYYY)")
    text(M + CW - 6, y + 5, f"PAGE {page} / {PAGES}", "Helvetica-Bold", 9, GREY, "r")
    return y - 8


def footer():
    text(M, M + 2, "Copy to: Class Teacher | All subject teachers of IX A | Parent | Coordinator | "
         "Student's file", "Helvetica-Oblique", 7, GREY)
    text(W - M, M + 2, SCHOOL + "  |  Class IX A", "Helvetica-Oblique", 7, GREY, "r")
    c.showPage()


def signatures(y, names):
    gap = CW / len(names)
    for i, n in enumerate(names):
        x = M + i * gap + 12
        c.line(x, y, x + gap - 24, y)
        text(x + (gap - 24) / 2, y - 10, n, "Helvetica-Bold", 8, colors.black, "c")


# ======================= PAGE 1 =======================
y = header()
y = section(y, "A.  STUDENT PARTICULARS")

# photograph box on the right
pw, ph = 86, 116
px, py = M + CW - pw - 4, y - ph - 6
c.setStrokeColor(colors.black)
c.setDash(3, 2)
c.rect(px, py, pw, ph)
c.setDash()
text(px + pw / 2, py + ph / 2 + 4, "Affix recent", "Helvetica", 7.5, GREY, "c")
text(px + pw / 2, py + ph / 2 - 6, "photograph", "Helvetica", 7.5, GREY, "c")

lw = CW - pw - 16
y -= 22
for label, name in [("Student's Name", "student_name"), ("Roll No.", "roll_no"),
                    ("Admission No.", "admission_no"), ("Father's / Guardian's Name", "father_name"),
                    ("Parent's Contact No.", "parent_contact"), ("Class Teacher", "class_teacher")]:
    labelled(M + 4, y, label, 124, lw - 128, name)
    y -= 20
y -= 2
labelled(M + 4, y, "Residential Address", 124, CW - 132, "address")
y -= 12

y = section(y, "B.  REASON FOR RESTRICTION  (tick all that apply)")
reasons = [
    ("r_without_pass", "Repeatedly going out of class without pass"),
    ("r_misuse_pass", "Misuse of class pass / overstaying outside"),
    ("r_roaming", "Found roaming in corridors / other classes"),
    ("r_bunking", "Bunking lecture(s)"),
    ("r_canteen", "Found in canteen / playground during lecture"),
    ("r_washroom", "Excessive washroom visits during lectures"),
    ("r_lab", "Absent from lab / activity without permission"),
    ("r_other", "Other (specify below)"),
]
y -= 16
for i, (name, label) in enumerate(reasons):
    col, row = i % 2, i // 2
    checkbox(name, M + 8 + col * CW / 2, y - row * 16, label)
y -= 3 * 16 + 24
labelled(M + 4, y, "No. of earlier incidents", 112, 40, "incident_count")
labelled(M + 172, y, "Dates of incidents (as per daily register)", 186, CW - 176 - 186, "incident_dates")
y -= 4
y = box(y, 36, "reason_details", "Details of misconduct")
y -= 4

y = section(y - 6, "C.  EARLIER ACTION TAKEN")
cols = [("Date", 70), ("Action (warning / diary note / parent informed / called)", 260), ("By (Teacher)", 120)]
cols.append(("Remarks", CW - sum(w for _, w in cols)))
c.setFillColor(TINT)
c.rect(M, y - 16, CW, 16, stroke=1, fill=1)
x = M
for head, w in cols:
    text(x + w / 2, y - 11, head, "Helvetica-Bold", 7.5, colors.black, "c")
    x += w
y -= 16
for r in range(1, 5):
    x = M
    for head, w in cols:
        c.rect(x, y - 18, w, 18)
        field(f"prior_r{r}_{head.split()[0].lower()}", x, y - 18, w, 18, 8,
              tip=f"Earlier action {r} - {head}")
        x += w
    y -= 18
y -= 4

y = section(y - 6, "D.  DETAILS OF RESTRICTION")
y -= 20
labelled(M + 4, y, "Effective From", 70, 80, "ban_from", "Restriction start date")
labelled(M + 170, y, "To", 16, 80, "ban_to", "Restriction end date")
labelled(M + 284, y, "Total Days", 52, 40, "ban_days")
labelled(M + 392, y, "Review On", 50, CW - 396 - 50, "review_date")
y -= 20
text(M + 4, y + 2, "Applicable to:", "Helvetica-Bold", 8)
checkbox("all_lectures", M + 76, y, "All lectures")
text(M + 160, y + 2, "or only lectures:", "Helvetica", 8)
for n in range(1, 9):
    checkbox(f"lecture_{n}", M + 228 + (n - 1) * 30, y, str(n), tip=f"Lecture {n}")
y -= 18
text(M + 4, y + 2, "Also includes:", "Helvetica-Bold", 8)
checkbox("inc_break", M + 76, y, "Restricted area during breaks")
checkbox("inc_activity", M + 230, y, "Inter-class activities / errands")
checkbox("inc_pass", M + 400, y, "No class pass issued")
y -= 14

y = section(y, "E.  CONDITIONS OF RESTRICTION")
y -= 14
conditions = [
    "No class pass shall be issued to the student during the restriction period.",
    "The student shall not leave the classroom during any lecture covered by this order, including "
    "for errands, collecting material or visiting another class.",
    "Exception: in a genuine medical emergency the student may leave only with the subject teacher's "
    "permission, escorted by the class monitor or staff, and the coordinator must be informed.",
    "Every subject teacher of Class IX A shall ensure compliance and record any violation in the daily "
    "'Out of Class Without Pass' register and inform the Class Teacher the same day.",
    "Any violation will invite stricter action, including calling the parents to school, an extension "
    "of this order, or suspension as decided by the Principal.",
    "The order will be reviewed on the review date. It may be lifted early on sustained good conduct.",
]
for i, cond in enumerate(conditions, 1):
    text(M + 6, y, f"{i}.", "Helvetica-Bold", 8)
    y = para(M + 20, y, cond, CW - 26) - 3
y -= 2
footer()

# ======================= PAGE 2 =======================
y = header()
y = section(y, "F.  ACKNOWLEDGEMENT BY SUBJECT TEACHERS OF CLASS IX A")
cols = [("Lect.", 32), ("Subject", 110), ("Teacher's Name", 160), ("Date Informed", 80)]
cols.append(("Signature", CW - sum(w for _, w in cols)))
c.setFillColor(TINT)
c.rect(M, y - 16, CW, 16, stroke=1, fill=1)
x = M
for head, w in cols:
    text(x + w / 2, y - 11, head, "Helvetica-Bold", 7.5, colors.black, "c")
    x += w
y -= 16
for r in range(1, 9):
    x = M
    for i, (head, w) in enumerate(cols):
        c.rect(x, y - 19, w, 19)
        if i == 0:
            text(x + w / 2, y - 13, str(r), "Helvetica-Bold", 9, NAVY, "c")
        elif head != "Signature":
            field(f"teacher_r{r}_{head.split()[0].lower()}", x, y - 19, w, 19, 8,
                  tip=f"Lecture {r} - {head}")
        x += w
    y -= 19
y -= 8

y = section(y, "G.  UNDERTAKING BY STUDENT")
y -= 13
y = para(M + 6, y, "I have read the above order. I understand that I am not permitted to leave the class "
         "during the restriction period and that any violation will lead to stricter disciplinary action. "
         "I will follow the school rules.", CW - 12)
y -= 18
signatures(y, ["Student's Signature", "Date"])
y -= 22

y = section(y, "H.  ACKNOWLEDGEMENT BY PARENT / GUARDIAN")
y -= 13
y = para(M + 6, y, "I have been informed of the above restriction placed on my ward and the reasons for it. "
         "I will counsel my ward to follow the school rules and cooperate with the school.", CW - 12)
y -= 18
labelled(M + 4, y, "Parent's Name", 66, 150, "parent_name")
labelled(M + 236, y, "Mobile", 34, 90, "parent_mobile")
labelled(M + 376, y, "Date", 24, CW - 380 - 24, "parent_date")
y = box(y - 4, 26, "parent_remarks", "Parent's remarks (if any)")
y -= 30
signatures(y, ["Parent's Signature"])
y -= 22

y = section(y, "I.  REVIEW  (to be filled on the review date)")
y -= 16
text(M + 6, y + 1, "Decision:", "Helvetica-Bold", 8)
checkbox("rev_lifted", M + 56, y, "Restriction lifted")
checkbox("rev_extended", M + 160, y, "Extended")
labelled(M + 226, y - 4, "till", 18, 70, "extended_till")
labelled(M + 330, y - 4, "Lifted / Reviewed on", 92, CW - 334 - 92, "review_done_on")
y = box(y - 4, 22, "review_remarks", "Remarks on conduct during restriction")
y -= 32
signatures(y, ["Class Teacher", "Coordinator", "Principal"])
footer()

c.save()
print("wrote", OUT)
