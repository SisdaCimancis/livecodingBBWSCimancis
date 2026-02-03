<?php
include 'config.php';

$judul = $_POST['judul'];
mysqli_query($conn, "INSERT INTO todos (judul) VALUES ('$judul')");

header("Location: index.php");
