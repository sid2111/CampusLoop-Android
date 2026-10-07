"""Generate the fillable daily 'Out of Class Without Pass' register for Class IX A.

Run: python3 make_no_pass_register.py -> writes DPS_Bulandshahr_IX_A_Without_Pass_Register.pdf
"""
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

OUT = "DPS_Bulandshahr_IX_A_Without_Pass_Register.pdf"
SCHOOL = "DELHI PUBLIC SCHOOL BULANDSHAHR"
W, H = A4
M = 34
CW = W - 2 * M
NAVY = colors.HexColor("#0D3B66")
TINT = colors.HexColor("#E8EEF6")
FIELD_BG = colors.HexColor("#F7FAFF")
GREY = colors.HexColor("#555555")
LECTURES = 8

c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle(f"Out of Class Without Pass - Daily Register - Class IX A - {SCHOOL}")
c.setAuthor(SCHOOL)


def text(x, y, s, font="Helvetica", size=8, color=colors.black, align="l"):
    c.setFont(font, size)
    c.setFillColor(color)
    {"l": c.drawString, "c": c.drawCentredString, "r": c.drawRightString}[align](x, y, s)


def field(name, x, y, w, h, size=8, multiline=False, tip=None):
    kw = dict(name=name, tooltip=tip or name.replace("_", " "), x=x + 1, y=y + 1,
              width=w - 2, height=h - 2, borderWidth=0, fillColor=FIELD_BG,
              textColor=colors.black, fontName="Helvetica", fontSize=size, forceBorder=False)
    if multiline:
        kw["fieldFlags"] = "multiline"
    c.acroForm.textfield(**kw)


def section(y, title):
    c.setFillColor(NAVY)
    c.rect(M, y - 15, CW, 15, stroke=0, fill=1)
    text(M + 6, y - 11, title, "Helvetica-Bold", 9, colors.white)
    return y - 15


def labelled(x, y, label, wl, wf, name):
    text(x, y + 5, label, "Helvetica-Bold", 8.5)
    c.setStrokeColor(colors.black)
    c.line(x + wl, y + 1, x + wl + wf, y + 1)
    field(name, x + wl, y + 1, wf, 15, 9)


# ---- frame and header ----
c.setStrokeColor(NAVY)
c.setLineWidth(1.6)
c.rect(M - 8, M - 8, W - 2 * M + 16, H - 2 * M + 16)
c.setLineWidth(0.5)
top = H - M
text(W / 2, top - 18, SCHOOL, "Helvetica-Bold", 17, NAVY, "c")
text(W / 2, top - 32, "DAILY REGISTER - STUDENTS OUT OF CLASS WITHOUT PASS", "Helvetica-Bold", 10.5,
     colors.black, "c")

y = top - 56
c.setFillColor(TINT)
c.setStrokeColor(NAVY)
c.rect(M, y, CW, 16, stroke=1, fill=1)
text(M + 6, y + 5, "CLASS:  IX", "Helvetica-Bold", 9)
text(M + 80, y + 5, "SECTION:  A", "Helvetica-Bold", 9)
text(M + 165, y + 5, "DATE:", "Helvetica-Bold", 9)
field("date", M + 194, y, 78, 16, 9, tip="Date (DD/MM/YYYY)")
text(M + 282, y + 5, "DAY:", "Helvetica-Bold", 9)
field("day", M + 306, y, 70, 16, 9, tip="Day of the week")
text(M + 386, y + 5, "STRENGTH:", "Helvetica-Bold", 9)
field("strength", M + 442, y, CW - 446, 16, 9, tip="Students present today")

y -= 24
labelled(M + 4, y, "Class Teacher", 64, 180, "class_teacher")
labelled(M + 262, y, "Monitor on Duty", 76, CW - 262 - 80, "monitor")
y -= 12

# ---- lecture-wise table ----
y = section(y, "A.  LECTURE-WISE RECORD  (to be filled by the subject teacher at the end of each lecture)")
cols = [
    ("Lect.\nNo.", 30, False), ("Time", 44, False), ("Subject", 58, False),
    ("Subject\nTeacher", 66, False), ("No. of\nStudents\nOut", 40, False),
    ("Names of Students Out Without Pass\n(with Roll No.)", 190, True),
    ("Time Out -\nTime Back", 52, True),
]
cols.append(("Teacher's\nSign", CW - sum(w for _, w, _ in cols), False))
head_h, row_h = 32, 50
c.setStrokeColor(colors.black)
c.setFillColor(TINT)
c.rect(M, y - head_h, CW, head_h, stroke=1, fill=1)
x = M
for head, w, _ in cols:
    lines = head.split("\n")
    ty = y - head_h / 2 + (len(lines) - 1) * 4.5 - 3
    for ln in lines:
        text(x + w / 2, ty, ln, "Helvetica-Bold", 7.5, colors.black, "c")
        ty -= 9
    c.line(x, y, x, y - head_h - LECTURES * row_h)
    x += w
c.line(M + CW, y, M + CW, y - head_h - LECTURES * row_h)
y -= head_h
keys = ["lecture", "time", "subject", "teacher", "count", "names", "time_out_back", "sign"]
for r in range(1, LECTURES + 1):
    yb = y - row_h
    c.line(M, yb, M + CW, yb)
    x = M
    for (head, w, ml), key in zip(cols, keys):
        if key == "lecture":
            text(x + w / 2, yb + row_h / 2 - 4, str(r), "Helvetica-Bold", 11, NAVY, "c")
        elif key != "sign":
            size = 10 if key == "count" else 8
            field(f"L{r}_{key}", x, yb, w, row_h, size, ml,
                  tip=f"Lecture {r} - {head.replace(chr(10), ' ')}")
        x += w
    y = yb

# total row
c.setFillColor(TINT)
c.rect(M, y - 20, CW, 20, stroke=1, fill=1)
w_lbl = sum(w for _, w, _ in cols[:4])
text(M + w_lbl - 6, y - 13, "TOTAL (all 8 lectures)", "Helvetica-Bold", 8.5, colors.black, "r")
c.line(M + w_lbl, y, M + w_lbl, y - 20)
c.line(M + w_lbl + 40, y, M + w_lbl + 40, y - 20)
field("total_count", M + w_lbl, y - 20, 40, 20, 10, tip="Total students out without pass")
text(M + w_lbl + 46, y - 13, "Students out in more than one lecture:", "Helvetica-Bold", 7.5)
field("repeat_count", M + w_lbl + 196, y - 20, CW - w_lbl - 196, 20, 9,
      tip="Number of students out in more than one lecture")
y -= 32

# ---- summary ----
y = section(y, "B.  SUMMARY & ACTION  (to be filled by the Class Teacher)")
for label, name in [("Names of repeat defaulters (out in 2 or more lectures)", "repeat_names"),
                    ("Action taken / Remarks", "action_taken")]:
    y -= 12
    text(M + 4, y, label, "Helvetica-Bold", 8)
    y -= 30
    c.rect(M, y, CW, 27, stroke=1, fill=0)
    field(name, M, y, CW, 27, 8, multiline=True)

y -= 42
gap = CW / 3
for i, n in enumerate(["Class Teacher", "Coordinator", "Principal"]):
    x = M + i * gap + 14
    c.line(x, y, x + gap - 28, y)
    text(x + (gap - 28) / 2, y - 10, n, "Helvetica-Bold", 8, colors.black, "c")

text(M, M + 2, "Write 0 / NIL if no student went out. A student leaving class must carry a valid pass.",
     "Helvetica-Oblique", 7, GREY)
text(W - M, M + 2, SCHOOL + "  |  Class IX A", "Helvetica-Oblique", 7, GREY, "r")
c.showPage()
c.save()
print("wrote", OUT)
