# LOC Document Portal – Class IX A

A self-contained PHP web application for collecting CBSE **LOC (List of
Candidates)** documents from students, with an admin panel to review every
student's data and download everything as Excel or as a ZIP of per-student
folders.

No frameworks or Composer packages are needed: plain PHP 8.1+ with the
`pdo_sqlite`, `zip`, `fileinfo` and `simplexml` extensions (all standard on
shared hosting).

## Features

* **Students are created from the Excel sheet** (`Student_Info_Sheet.xlsx`,
  Class IX A, 38 students) with every column from the sheet stored:
  S.No, Registration NO, Name, DOB, Address, Father Name, Phone, Mother Name,
  gender, house, Admission Date, Registration Date, class, Section, Class Type,
  Blood Group, Status, Quota, Category, Previous School Name, Aadhar_Card,
  Admission class, mother_aadhar, father_aadhar, UDISE.
* **Student login** – username *and* password are the admission number
  (Registration NO, e.g. `16-8152`). Students can change their password.
* **Student dashboard** – view own details and upload / replace five documents:
  `Aadhar Card`, `Birth Certificate`, `Father Aadhar Card`, `Marksheet`,
  `Mother Aadhar Card` (PDF, JPG or PNG, 5 MB each).
* **Admin panel** – list of all students with per-document status, search,
  view each student's full data and documents, upload/delete documents on a
  student's behalf, reset a student's password to their admission number.
* **Download Excel** – all student details (same columns as the sheet) plus
  username and the upload status/time of each document.
* **Download ZIP** – one folder per student, named with the student's name,
  containing the documents named exactly `Aadhar Card.pdf`,
  `Birth Certificate.jpg`, … (extension matches the uploaded file), plus
  `Student_Details.xlsx` and a `MISSING_DOCUMENTS.txt` report at the root.
* **Import** – admin can upload a new Excel with the same headings at any time
  to add more students (existing students are updated and keep their
  password and documents).

## Installation

1. Copy the `loc_portal` folder to your web server (e.g. `public_html/loc_portal`).
2. Make `db/` and `uploads/` writable by the web server:
   ```bash
   chmod 775 db uploads
   ```
3. Edit `config.php` if needed (school name, admin username/password, upload
   limits).
4. Copy the student information sheet to `data/Student_Info_Sheet.xlsx`
   (it is deliberately not committed to git because it contains Aadhaar
   numbers, phone numbers and addresses), then create the Class IX A
   students from it:
   ```bash
   php seed.php
   ```
   (or log in as admin → **Import** and upload the sheet there).
5. Open `https://your-site/loc_portal/` in a browser.

Default admin login: `admin` / `Admin@123` – change it immediately via
**Password** in the admin menu.

### Apache / Nginx

`uploads/`, `db/`, `data/` and `lib/` ship with `.htaccess` files that deny
direct access (Apache). On Nginx add equivalent `location` blocks, e.g.

```nginx
location ~ ^/loc_portal/(uploads|db|data|lib)/ { deny all; }
```

Documents are only ever served through `download.php` after login.

## File layout

```
loc_portal/
├── config.php            settings (school, admin, document list, columns)
├── index.php             login (student / admin)
├── student.php           student dashboard + uploads
├── password.php          student change-password
├── download.php          authenticated file download / preview
├── logout.php
├── seed.php              CLI: create students from the Excel sheet
├── admin/
│   ├── index.php         student list with document status + export buttons
│   ├── student.php       full details & documents of one student
│   ├── export_excel.php  Excel download
│   ├── export_zip.php    ZIP of student folders
│   ├── import.php        import students from an uploaded Excel
│   └── password.php      admin change-password
├── lib/
│   ├── app.php           bootstrap, DB schema, auth, layout helpers
│   ├── students.php      import, document storage, folder naming
│   ├── xlsx_reader.php   dependency-free .xlsx reader
│   └── xlsx_writer.php   dependency-free .xlsx writer
├── assets/style.css
├── data/Student_Info_Sheet.xlsx   source sheet (place it here; git-ignored)
├── db/                   SQLite database (created automatically)
└── uploads/<student id>/<doc_type>.<ext>
```

## Local testing

```bash
cd loc_portal
php seed.php
php -S localhost:8080
# open http://localhost:8080/
```
