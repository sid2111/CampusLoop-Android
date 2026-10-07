"""Generate the fillable Discipline Proforma PDF for Class IX A, DPS Bulandshahr.

Run: python3 make_proforma.py  -> writes DPS_Bulandshahr_IX_A_Discipline_Proforma.pdf
"""
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

OUT = "DPS_Bulandshahr_IX_A_Discipline_Proforma.pdf"
SCHOOL = "DELHI PUBLIC SCHOOL BULANDSHAHR"
W, H = A4
M = 34                      # page margin
CW = W - 2 * M              # content width
NAVY = colors.HexColor("#0D3B66")
TINT = colors.HexColor("#E8EEF6")
FIELD_BG = colors.HexColor("#F7FAFF")
GREY = colors.HexColor("#555555")

COMPLAINT_CODES = [
    ("LC", "Late coming"), ("UN", "Improper uniform / grooming"),
    ("HW", "Homework / assignment not done"), ("NB", "Incomplete notebooks"),
    ("BK", "Books / material not brought"), ("CD", "Disturbing / inattentive in class"),
    ("MB", "Misbehaviour / indiscipline"), ("DR", "Disrespect to teacher / staff"),
    ("AL", "Abusive language"), ("FB", "Fighting / bullying"),
    ("MP", "Mobile phone / gadget"), ("BC", "Bunking class"),
    ("AB", "Absent without leave"), ("DP", "Damage to school property"),
    ("UM", "Unfair means in exam"), ("OT", "Other (specify)"),
]
ACTION_CODES = [
    ("VW", "Verbal warning"), ("WW", "Written warning"), ("DN", "Note in school diary"),
    ("PI", "Parent informed (phone)"), ("PC", "Parent called to school"),
    ("DT", "Detention"), ("RC", "Referred to counsellor"),
    ("RO", "Referred to coordinator"), ("RP", "Referred to Principal"), ("SU", "Suspension"),
]
SUBJECTS = ["English", "Hindi", "Sanskrit", "Mathematics", "Science",
            "Social Science", "Artificial Intelligence / IT"]
EXAMS = ["PT-1", "PT-2", "Half Yearly", "PT-3", "Annual"]


class Proforma:
    def __init__(self, path):
        self.c = canvas.Canvas(path, pagesize=A4)
        self.c.setTitle(f"Discipline Proforma - Class IX A - {SCHOOL}")
        self.c.setAuthor(SCHOOL)
        self.c.setSubject("Student discipline and academic record")
        self.page = 0
        self.n = 0

    # ---------- primitives ----------
    def field(self, name, x, y, w, h, size=8, multiline=False, tip=None):
        self.n += 1
        kw = dict(name=f"{name}", tooltip=tip or name.replace("_", " "),
                  x=x + 1, y=y + 1, width=w - 2, height=h - 2,
                  borderWidth=0, fillColor=FIELD_BG, textColor=colors.black,
                  fontName="Helvetica", fontSize=size, forceBorder=False)
        if multiline:
            kw["fieldFlags"] = "multiline"
        self.c.acroForm.textfield(**kw)

    def text(self, x, y, s, font="Helvetica", size=8, color=colors.black, align="l"):
        c = self.c
        c.setFont(font, size)
        c.setFillColor(color)
        {"l": c.drawString, "c": c.drawCentredString, "r": c.drawRightString}[align](x, y, s)

    def section(self, y, title):
        c = self.c
        c.setFillColor(NAVY)
        c.rect(M, y - 15, CW, 15, stroke=0, fill=1)
        self.text(M + 6, y - 11, title, "Helvetica-Bold", 9, colors.white)
        return y - 15

    def header(self):
        self.page += 1
        c = self.c
        c.setStrokeColor(NAVY)
        c.setLineWidth(1.6)
        c.rect(M - 8, M - 8, W - 2 * M + 16, H - 2 * M + 16)
        c.setLineWidth(0.5)
        top = H - M
        self.text(W / 2, top - 18, SCHOOL, "Helvetica-Bold", 17, NAVY, "c")
        self.text(W / 2, top - 32, "STUDENT DISCIPLINE & ACADEMIC PROFORMA", "Helvetica-Bold", 10.5,
                  colors.black, "c")
        # class / session strip
        y = top - 56
        c.setFillColor(TINT)
        c.setStrokeColor(NAVY)
        c.rect(M, y, CW, 16, stroke=1, fill=1)
        self.text(M + 6, y + 5, "CLASS:  IX", "Helvetica-Bold", 9)
        self.text(M + 90, y + 5, "SECTION:  A", "Helvetica-Bold", 9)
        self.text(M + 190, y + 5, "SESSION:", "Helvetica-Bold", 9)
        self.field(f"p{self.page}_session", M + 236, y, 70, 16, 9, tip="Session e.g. 2026-27")
        self.text(M + 318, y + 5, "ROLL NO:", "Helvetica-Bold", 9)
        self.field(f"p{self.page}_roll", M + 364, y, 40, 16, 9, tip="Roll number")
        self.text(M + 412, y + 5, "PAGE " + str(self.page) + " / 3", "Helvetica-Bold", 9, GREY)
        return y - 8

    def footer(self, note="Fill legibly. Use codes from the key; describe incident briefly."):
        self.text(M, M + 2, note, "Helvetica-Oblique", 7, GREY)
        self.text(W - M, M + 2, SCHOOL + "  |  Class IX A", "Helvetica-Oblique", 7, GREY, "r")
        self.c.showPage()

    def table(self, y, cols, rows, row_h, prefix, head_h=24, first_col_numbers=True, size=8,
              row_labels=None):
        """cols = [(header, width, multiline)]. Draws grid and adds a field per cell."""
        c = self.c
        c.setStrokeColor(colors.black)
        c.setLineWidth(0.5)
        c.setFillColor(TINT)
        c.rect(M, y - head_h, CW, head_h, stroke=1, fill=1)
        x = M
        for head, w, _ in cols:
            lines = head.split("\n")
            ty = y - head_h / 2 + (len(lines) - 1) * 4.5 - 3
            for ln in lines:
                self.text(x + w / 2, ty, ln, "Helvetica-Bold", 7.5, colors.black, "c")
                ty -= 9
            c.line(x, y, x, y - head_h - rows * row_h)
            x += w
        c.line(M + CW, y, M + CW, y - head_h - rows * row_h)
        y -= head_h
        for r in range(rows):
            yb = y - row_h
            c.line(M, yb, M + CW, yb)
            x = M
            for ci, (head, w, ml) in enumerate(cols):
                if ci == 0 and row_labels:
                    self.text(x + 4, yb + row_h / 2 - 3, row_labels[r], "Helvetica-Bold", 8)
                elif ci == 0 and first_col_numbers:
                    self.text(x + w / 2, yb + row_h / 2 - 3, str(r + 1 + self._rowoffset),
                              "Helvetica", 8, colors.black, "c")
                else:
                    key = head.split("\n")[0].replace(" ", "").replace("/", "").replace("(", "")[:10]
                    self.field(f"{prefix}_r{r + 1}_{key}", x, yb, w, row_h, size, ml,
                               tip=f"{head.replace(chr(10), ' ')} - row {r + 1}")
                x += w
            y = yb
        return y

    _rowoffset = 0

    def labelled(self, x, y, label, w_label, w_field, name, h=16):
        self.text(x, y + 5, label, "Helvetica-Bold", 8)
        self.c.setStrokeColor(colors.black)
        self.c.line(x + w_label, y + 1, x + w_label + w_field, y + 1)
        self.field(name, x + w_label, y + 1, w_field, h - 1, 9)

    def legend(self, y, title, items, ncol):
        y = self.section(y, title) - 4
        colw = CW / ncol
        nrow = -(-len(items) // ncol)
        for i, (code, desc) in enumerate(items):
            col, row = divmod(i, nrow)
            yy = y - 11 - row * 11
            self.text(M + 6 + col * colw, yy, code, "Helvetica-Bold", 8, NAVY)
            self.text(M + 26 + col * colw, yy, desc, "Helvetica", 8)
        return y - 11 * nrow - 8

    def signatures(self, y, names):
        gap = CW / len(names)
        for i, n in enumerate(names):
            x = M + i * gap + 10
            self.c.setStrokeColor(colors.black)
            self.c.line(x, y, x + gap - 20, y)
            self.text(x + (gap - 20) / 2, y - 10, n, "Helvetica-Bold", 8, colors.black, "c")

    # ---------- pages ----------
    COMPLAINT_COLS = [
        ("S.\nNo.", 24, False), ("Date", 50, False), ("Teacher Name\n& Subject", 92, True),
        ("Code", 30, False), ("Details of Complaint / Incident", 165, True),
        ("Action\nTaken", 50, True), ("Parent\nInformed\n(Y/N)", 40, False),
        ("Status\n(Open/\nResolved)", 72, False),
    ]

    def page1(self):
        y = self.header()
        y = self.section(y, "A.  STUDENT PARTICULARS")
        y -= 22
        half = CW / 2
        rows = [
            [("Student's Name", 78, half - 88, "student_name"), ("Admission No.", 70, half - 74, "admission_no")],
            [("Date of Birth", 78, half - 88, "dob"), ("Gender", 70, half - 74, "gender")],
            [("Father's Name", 78, half - 88, "father_name"), ("Mother's Name", 70, half - 74, "mother_name")],
            [("Contact No.", 78, half - 88, "contact_no"), ("Alt. Contact", 70, half - 74, "alt_contact")],
            [("House", 78, half - 88, "house"), ("Class Teacher", 70, half - 74, "class_teacher")],
        ]
        for left, right in rows:
            self.labelled(M + 4, y, *left)
            self.labelled(M + half + 4, y, *right)
            y -= 21
        self.labelled(M + 4, y, "Residential Address", 90, CW - 98, "address")
        y -= 21
        self.labelled(M + 4, y, "Medical / Special Needs", 104, CW - 112, "medical_notes")
        y -= 14

        y = self.section(y, "B.  DISCIPLINE / COMPLAINT RECORD   (to be filled by the concerned teacher)")
        self._rowoffset = 0
        y = self.table(y, self.COMPLAINT_COLS, 14, 30, "complaint", head_h=30)
        self.footer()

    def page2(self):
        y = self.header()
        y = self.section(y, "B.  DISCIPLINE / COMPLAINT RECORD  (continued)")
        self._rowoffset = 14
        y = self.table(y, self.COMPLAINT_COLS, 12, 30, "complaint2", head_h=30)
        self._rowoffset = 0
        y -= 10
        y = self.legend(y, "KEY - COMPLAINT CODES", COMPLAINT_CODES, 3)
        y = self.legend(y, "KEY - ACTION TAKEN CODES", ACTION_CODES, 3)
        self.footer()

    def page3(self):
        y = self.header()
        y = self.section(y, "C.  ACADEMIC RECORD   (marks obtained / maximum marks)")
        cols = [("Subject", 128, False)] + [(e, 61, False) for e in EXAMS] + [
            ("Overall\nGrade", 45, False), ("Subject Teacher\nRemarks", 45, True)]
        cols[-1] = ("Teacher's\nRemarks", CW - 128 - 61 * 5 - 45, True)
        y = self.table(y, cols, len(SUBJECTS) + 2, 21, "marks", head_h=24, first_col_numbers=False,
                       row_labels=SUBJECTS + ["Total / %", "Attendance (days)"])
        y -= 10

        y = self.section(y, "D.  ACADEMIC CONCERNS  (homework, notebooks, class performance, tests)")
        acols = [("S.\nNo.", 24, False), ("Date", 52, False), ("Subject", 70, False),
                 ("Teacher", 78, False), ("Concern / Observation", 200, True),
                 ("Remedial Action /\nParent Response", CW - 424, True)]
        y = self.table(y, acols, 6, 26, "concern", head_h=24)
        y -= 10

        y = self.section(y, "E.  OVERALL ASSESSMENT")
        y -= 18
        self.text(M + 4, y + 4, "Conduct Grade (A/B/C/D):", "Helvetica-Bold", 8)
        self.field("conduct_grade", M + 112, y, 40, 16, 9)
        self.text(M + 168, y + 4, "Total Complaints:", "Helvetica-Bold", 8)
        self.field("total_complaints", M + 246, y, 36, 16, 9)
        self.text(M + 298, y + 4, "Overall Result / Grade:", "Helvetica-Bold", 8)
        self.field("overall_result", M + 400, y, CW - 404, 16, 9)
        for x0, x1 in [(M + 112, M + 152), (M + 246, M + 282), (M + 400, M + CW - 4)]:
            self.c.line(x0, y + 1, x1, y + 1)
        y -= 8
        for label, name in [("Class Teacher's Remarks", "ct_remarks"),
                            ("Counsellor / Coordinator's Remarks", "coord_remarks"),
                            ("Parent's Remarks", "parent_remarks")]:
            y -= 12
            self.text(M + 4, y, label, "Helvetica-Bold", 8)
            y -= 30
            self.c.rect(M, y, CW, 27, stroke=1, fill=0)
            self.field(name, M, y, CW, 27, 8, multiline=True)
        y -= 44
        self.signatures(y, ["Class Teacher", "Coordinator", "Parent / Guardian", "Principal"])
        self.footer("Conduct grade: A - Excellent, B - Good, C - Needs improvement, D - Unsatisfactory.")

    def build(self):
        self.page1()
        self.page2()
        self.page3()
        self.c.save()


if __name__ == "__main__":
    Proforma(OUT).build()
    print("wrote", OUT)
