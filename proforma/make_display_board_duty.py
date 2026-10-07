"""Generate the fillable Display Board Duty chart for Class IX A.

Run: python3 make_display_board_duty.py -> writes DPS_Bulandshahr_IX_A_Display_Board_Duty.pdf
"""
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import simpleSplit
from reportlab.pdfgen import canvas

OUT = "DPS_Bulandshahr_IX_A_Display_Board_Duty.pdf"
SCHOOL = "DELHI PUBLIC SCHOOL BULANDSHAHR"
W, H = A4
M = 34
CW = W - 2 * M
NAVY = colors.HexColor("#0D3B66")
GREEN = colors.HexColor("#2E7D32")
TINT = colors.HexColor("#E8EEF6")
FIELD_BG = colors.HexColor("#F7FAFF")
GREY = colors.HexColor("#555555")
PAGES = 2
DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
CORNERS = [
    "Date, Day & Attendance", "Thought of the Day", "Word of the Day",
    "News Headlines", "GK / Quiz Question", "Birthday Wishes", "Subject Corner",
]

c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle(f"Display Board Duty Chart - Class IX A - {SCHOOL}")
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


def table(y, prefix, cols, rows, row_h, head_h=24, labels=None, label_font=8, size=8, skip=()):
    """cols = [(header, width, multiline)]. labels fill the first column; columns named in skip
    stay blank for a handwritten signature."""
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
        x += w
    y -= head_h
    for r in range(rows):
        x = M
        for i, (head, w, ml) in enumerate(cols):
            c.rect(x, y - row_h, w, row_h)
            key = "".join(ch for ch in head.split("\n")[0].lower() if ch.isalnum())
            if i == 0 and labels:
                for j, ln in enumerate(simpleSplit(labels[r], "Helvetica-Bold", label_font, w - 6)):
                    text(x + 4, y - 11 - j * 9, ln, "Helvetica-Bold", label_font, NAVY)
            elif head not in skip:
                field(f"{prefix}_r{r + 1}_{key}", x, y - row_h, w, row_h, size, ml,
                      tip=f"{labels[r] if labels else 'Row ' + str(r + 1)} - {head.replace(chr(10), ' ')}")
            x += w
        y -= row_h
    return y


def header():
    global page
    page += 1
    c.setStrokeColor(GREEN)
    c.setLineWidth(1.6)
    c.rect(M - 8, M - 8, W - 2 * M + 16, H - 2 * M + 16)
    c.setLineWidth(0.5)
    top = H - M
    text(W / 2, top - 18, SCHOOL, "Helvetica-Bold", 17, NAVY, "c")
    text(W / 2, top - 33, "CLASS DISPLAY BOARD - STUDENT DUTY CHART", "Helvetica-Bold", 10.5, GREEN, "c")
    y = top - 57
    c.setFillColor(TINT)
    c.setStrokeColor(NAVY)
    c.rect(M, y, CW, 16, stroke=1, fill=1)
    text(M + 6, y + 5, "CLASS:  IX", "Helvetica-Bold", 9)
    text(M + 78, y + 5, "SECTION:  A", "Helvetica-Bold", 9)
    text(M + 160, y + 5, "MONTH:", "Helvetica-Bold", 9)
    field(f"p{page}_month", M + 198, y, 82, 16, 9, tip="Month")
    text(M + 290, y + 5, "SESSION:", "Helvetica-Bold", 9)
    field(f"p{page}_session", M + 336, y, 70, 16, 9, tip="Session e.g. 2026-27")
    text(M + CW - 6, y + 5, f"PAGE {page} / {PAGES}", "Helvetica-Bold", 9, GREY, "r")
    return y - 8


def footer(note):
    text(M, M + 2, note, "Helvetica-Oblique", 7, GREY)
    text(W - M, M + 2, SCHOOL + "  |  Class IX A", "Helvetica-Oblique", 7, GREY, "r")
    c.showPage()


def signatures(y, names):
    gap = CW / len(names)
    for i, n in enumerate(names):
        x = M + i * gap + 12
        c.setStrokeColor(colors.black)
        c.line(x, y, x + gap - 24, y)
        text(x + (gap - 24) / 2, y - 10, n, "Helvetica-Bold", 8, colors.black, "c")


# ======================= PAGE 1 =======================
y = header()
y -= 20
labelled(M + 4, y, "Teacher In-charge", 84, 170, "teacher_incharge")
labelled(M + 272, y, "Student Board Captain", 104, CW - 276 - 104, "board_captain",
         "Student Board Captain (name and roll no.)")
y -= 20
labelled(M + 4, y, "Theme of the Month", 92, CW - 100, "month_theme",
         "Theme of the month, e.g. Save Water, Independence Day")
y -= 12

y = section(y, "A.  WEEKLY THEME BOARD - TEAM ALLOTMENT")
cols = [("Week", 54, False), ("Dates\n(From - To)", 62, True), ("Topic / Theme", 92, True),
        ("Team Members\n(Name & Roll No.)", 150, True), ("Team\nLeader", 68, True),
        ("Display\nDate", 50, False)]
cols.append(("Teacher's\nSign", CW - sum(w for _, w, _ in cols), False))
y = table(y, "week", cols, 5, 44, head_h=26, labels=[f"Week {i}" for i in range(1, 6)],
          skip=("Teacher's\nSign",))
y -= 10

y = section(y, "B.  DAILY BOARD CORNERS - STUDENT ON DUTY  (write name & roll no.)")
cols = [("Board Corner", 103, False)] + [(d, (CW - 103) / 6, True) for d in DAYS]
y = table(y, "corner", cols, len(CORNERS), 34, head_h=18, labels=CORNERS, size=7.5)
y -= 24
labelled(M + 4, y, "Substitute (if student on duty is absent)", 176, CW - 184, "substitutes",
         "Substitute students")
footer("Update daily corners before assembly; change the theme board every Monday.")

# ======================= PAGE 2 =======================
y = header()
y = section(y, "C.  DUTIES & GUIDELINES FOR THE DISPLAY BOARD TEAM")
y -= 14
rules = [
    "Update the daily corners every morning before the assembly bell; remove the previous day's material.",
    "Write neatly and legibly in large letters. Check spelling, grammar and facts with the subject teacher.",
    "Content must be original or properly credited. No offensive, political or inappropriate material.",
    "Use board pins and charts only - do not use cello tape, glue or markers directly on the board or wall.",
    "The weekly theme team prepares content in advance and gets it approved by the Teacher In-charge.",
    "Handle display material, charts and stationery with care; return unused items to the Board Captain.",
    "If you are absent on your duty day, inform the Board Captain so the substitute can take over.",
    "Keep the board area clean. Report any damage to the board to the Class Teacher immediately.",
]
for i, rule in enumerate(rules, 1):
    text(M + 6, y, f"{i}.", "Helvetica-Bold", 8)
    y = para(M + 20, y, rule, CW - 26) - 3
y -= 4

y = section(y, "D.  WEEKLY EVALUATION OF THE THEME BOARD  (by Teacher In-charge)")
cols = [("Week", 54, False), ("Content\n(5)", 56, False), ("Creativity\n(5)", 56, False),
        ("Neatness\n(5)", 56, False), ("Timely\nUpdate (5)", 56, False), ("Total\n(20)", 50, False)]
cols.append(("Remarks", CW - sum(w for _, w, _ in cols), True))
y = table(y, "eval", cols, 5, 24, head_h=26, labels=[f"Week {i}" for i in range(1, 6)], size=9)
y -= 10

y = section(y, "E.  DISPLAY MATERIAL ISSUED")
cols = [("Date", 64, False), ("Item (charts, pins, sketch pens, etc.)", 196, False),
        ("Qty", 40, False), ("Issued To", 120, False)]
cols.append(("Returned (Y/N)", CW - sum(w for _, w, _ in cols), False))
y = table(y, "material", cols, 5, 20, head_h=16)
y -= 10

y = section(y, "F.  BEST BOARD TEAM OF THE MONTH")
y -= 20
labelled(M + 4, y, "Winning Week / Team", 98, 120, "best_team")
labelled(M + 236, y, "Team Leader", 60, CW - 240 - 60, "best_team_leader")
y -= 20
labelled(M + 4, y, "Remarks / Appreciation", 108, CW - 116, "best_team_remarks")

y -= 46
signatures(y, ["Board Captain", "Teacher In-charge", "Class Teacher", "Coordinator"])
footer("Marks in section D may be counted towards the class activity / co-scholastic assessment.")

c.save()
print("wrote", OUT)
