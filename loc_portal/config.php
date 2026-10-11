<?php
/**
 * LOC Document Portal – configuration.
 *
 * Copy/adjust the values below for your server. Everything else in the
 * application reads from this file.
 */

return [
    // Shown in page headers and the exported files.
    'school_name'   => 'Delhi Public School, Bulandshahr',
    'portal_name'   => 'LOC Document Portal',
    'class_label'   => 'Class IX A',

    // SQLite database file (created automatically on first run).
    'db_path'       => __DIR__ . '/db/loc_portal.sqlite',

    // Where uploaded documents are stored. Must be writable by PHP and
    // should NOT be web-accessible (an .htaccess is shipped for Apache).
    'upload_dir'    => __DIR__ . '/uploads',

    // Excel sheet used by seed.php / admin import to create students.
    'seed_excel'    => __DIR__ . '/data/Student_Info_Sheet.xlsx',

    // Default admin login created on first run (change after first login!).
    'admin_username' => 'admin',
    'admin_password' => 'Admin@123',

    // Document types every student must upload. The key is used for
    // storage; the label is the exact file name used in the ZIP export.
    'documents' => [
        'aadhar_card'        => 'Aadhar Card',
        'birth_certificate'  => 'Birth Certificate',
        'father_aadhar_card' => 'Father Aadhar Card',
        'marksheet'          => 'Marksheet',
        'mother_aadhar_card' => 'Mother Aadhar Card',
    ],

    // Upload restrictions.
    'max_upload_bytes' => 5 * 1024 * 1024, // 5 MB per file
    'allowed_mime' => [
        'application/pdf' => 'pdf',
        'image/jpeg'      => 'jpg',
        'image/png'       => 'png',
    ],

    // Student record columns, in the same order as the Excel sheet.
    // db column => Excel heading
    'student_fields' => [
        'sno'                  => 'S.No',
        'admission_no'         => 'Registration NO',
        'name'                 => 'Name',
        'dob'                  => 'DOB',
        'address'              => 'Address',
        'father_name'          => 'Father Name',
        'phone'                => 'Phone',
        'mother_name'          => 'Mother Name',
        'gender'               => 'gender',
        'house'                => 'house',
        'admission_date'       => 'Admission Date',
        'registration_date'    => 'Registration Date',
        'class'                => 'class',
        'section'              => 'Section',
        'class_type'           => 'Class Type',
        'blood_group'          => 'Blood Group',
        'status'               => 'Status',
        'quota'                => 'Quota',
        'category'             => 'Category',
        'previous_school'      => 'Previous School Name',
        'aadhar_card'          => 'Aadhar_Card',
        'admission_class'      => 'Admission class',
        'mother_aadhar'        => 'mother_aadhar',
        'father_aadhar'        => 'father_aadhar',
        'udise'                => 'UDISE',
    ],
];
