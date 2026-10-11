# LOC Document Portal – Class IX A

A self-contained PHP web application for collecting CBSE **LOC (List of
Candidates)** documents from students, with an admin panel to review every
student's data and download everything as Excel or as a ZIP of per-student
folders.

**No database and no setup.** Data is kept in plain JSON files inside
`storage/` and documents in `uploads/`, so the folder only has to be uploaded
to the server. Plain PHP 8.1+ with the standard `zip`, `fileinfo` and
`simplexml` extensions; no frameworks, Composer packages or database server.

## Features

* **Students are created from the Excel sheet** (`Student_Info_Sheet.xlsx`,
  Class IX A, 38 students) with every column from the sheet stored:
  S.No, Registration NO, Name, DOB, Address, Father Name, Phone, Mother Name,
  gender, house, Admission Date, Registration Date, class, Section, Class Type,
  Blood Group, Status, Quota, Category, Previous School Name, Aadhar_Card,
  Admission class, mother_aadhar, father_aadhar, UDISE.
* **Student login** – username *and* password are the admission number
  (Registration NO, e.g. `16-8152`). Students can change their password.
* **Student dashboard** – view own details and upload / replace eight files:
  `Aadhar Card`, `Birth Certificate`, `Father Aadhar Card`, `Marksheet`,
  `Mother Aadhar Card` (PDF, JPG or PNG) and `Photograph`, `Signature`,
  `Thumb Impression` (JPG or PNG image), 5 MB each.
* **Admin panel** – list of all students with per-document status, search,
  view each student's full data and documents, **edit every field** of a
  student, add a student manually, delete a student, upload/delete documents
  on a student's behalf, set or reset a student's password.
* **Download Excel** – all student details (same columns as the sheet) plus
  username and the upload status/time of each document.
* **Download ZIP** – one folder per student, named with the student's name,
  containing the files named exactly `Aadhar Card.pdf`, `Birth Certificate.jpg`,
  `Photograph.jpg`, `Signature.png`, … (extension matches the uploaded file), plus
  `Student_Details.xlsx` and a `MISSING_DOCUMENTS.txt` report at the root.
* **Import** – admin can upload a new Excel with the same headings at any time
  to add more students (existing students are updated and keep their
  password and documents).

## Installation (upload and go)

1. Copy the student information sheet to `loc_portal/data/Student_Info_Sheet.xlsx`
   (it is deliberately not committed to git because it contains Aadhaar
   numbers, phone numbers and addresses).
2. Upload the whole `loc_portal` folder to your web server by FTP or the
   hosting file manager (e.g. into `public_html/loc_portal`).
3. If your host does not already allow PHP to write there, make `storage/` and
   `uploads/` writable (permission 755 or 775 is usually enough on cPanel).
4. Open `https://your-site/loc_portal/` in a browser. On the first visit the
   Class IX A students are created automatically from the sheet.

There is nothing else to configure. Optional: edit `config.php` to change the
school name, admin username/password or upload limits. Students can also be
added later from **Admin → Import** (upload a sheet) or **Admin → Add student**.

Default admin login: `admin` / `Admin@123` – change it immediately via
**Password** in the admin menu.

### Apache / Nginx

`uploads/`, `storage/`, `data/` and `lib/` ship with `.htaccess` files that deny
direct access (Apache). On Nginx add equivalent `location` blocks, e.g.

```nginx
location ~ ^/loc_portal/(uploads|storage|data|lib)/ { deny all; }
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
├── seed.php              optional CLI: create students from the Excel sheet
├── admin/
│   ├── index.php         student list with document status + export buttons
│   ├── student.php       full details & documents of one student
│   ├── edit.php          add a student / edit every field
│   ├── export_excel.php  Excel download
│   ├── export_zip.php    ZIP of student folders
│   ├── import.php        import students from an uploaded Excel
│   └── password.php      admin change-password
├── lib/
│   ├── app.php           bootstrap, auth, layout helpers
│   ├── store.php         JSON file storage (no database)
│   ├── students.php      records, import, document storage, folder naming
│   ├── xlsx_reader.php   dependency-free .xlsx reader
│   └── xlsx_writer.php   dependency-free .xlsx writer
├── assets/style.css
├── data/Student_Info_Sheet.xlsx   source sheet (place it here; git-ignored)
├── storage/              students.json / documents.json / admins.json (auto-created)
└── uploads/<student id>/<doc_type>.<ext>
```

## Local testing

```bash
cd loc_portal
php -S localhost:8080
# open http://localhost:8080/  (students are imported on first visit)
```
