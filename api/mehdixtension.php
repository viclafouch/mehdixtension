<?php

    /**
     * This file is uploaded on my server : https://www.victor-de-la-fouchardiere.fr/mehdixtension.php
     */

    $data = [
        'status' => 503,
        'method' => false
    ];

    /**
     * Basic verification
     * @param Array of 2 props
     */

    if (isset($_GET['text'], $_GET['type'])) {

        $type = $_GET['type'];
        $hashs = ['sha256', 'md5', 'whirlpool'];

        if (!in_array($type, $hashs)) {
            $type = $hashs[0];
        }

        $hash = hash($type, $_GET['text']);

        if ($hash) {
            $data = [
                'status' => 200,
                'method' => 'POST',
                'response' => $hash
            ];
        }
    }

    echo json_encode($data, JSON_NUMERIC_CHECK | JSON_PRESERVE_ZERO_FRACTION | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);