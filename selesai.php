<?php
include 'config.php';

$id = $_GET['id'];
mysqli_query($conn, "UPDATE todos SET status=1 WHERE id='$id'");

header("Location: index.php");
