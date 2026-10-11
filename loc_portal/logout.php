<?php
require __DIR__ . '/lib/app.php';
logout();
redirect(base_url() . '/index.php');
