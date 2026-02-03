<?php
include 'config.php';

$todos = mysqli_query($conn, "SELECT * FROM todos ORDER BY id DESC");

$total = mysqli_num_rows(mysqli_query($conn, "SELECT * FROM todos"));
$selesai = mysqli_num_rows(mysqli_query($conn, "SELECT * FROM todos WHERE status=1"));

$progress = ($total > 0) ? ($selesai / $total) * 100 : 0;
?>

<!DOCTYPE html>
<html>
<head>
    <title>Test Todo Sisda Cimancis</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container mt-5" style="max-width: 600px;">

    <div class="card shadow">
        <div class="card-header bg-primary text-white text-center">
            <h4 class="mb-0">📝 Todo List</h4>
        </div>

        <div class="card-body">

            <!-- Progress -->
            <p class="mb-1">Progress</p>
            <div class="progress mb-3">
                <div class="progress-bar" style="width: <?= $progress ?>%">
                    <?= round($progress) ?>%
                </div>
            </div>

            <!-- Form Tambah -->
            <form action="tambah.php" method="POST" class="d-flex mb-3">
                <input type="text" name="judul" class="form-control me-2" placeholder="Tambah todo baru..." required>
                <button class="btn btn-success">Tambah</button>
            </form>

            <!-- List Todo -->
            <?php if ($total == 0) : ?>
                <div class="alert alert-info text-center">
                    Belum ada todo 📭
                </div>
            <?php endif; ?>

            <ul class="list-group">
                <?php while ($row = mysqli_fetch_assoc($todos)) : ?>
                    <li class="list-group-item d-flex justify-content-between align-items-center">

                        <div>
                            <span class="<?= $row['status'] ? 'text-decoration-line-through text-muted' : '' ?>">
                                <?= $row['judul'] ?>
                            </span>
                            <span class="badge <?= $row['status'] ? 'bg-success' : 'bg-warning text-dark' ?>">
                                <?= $row['status'] ? 'Selesai' : 'Belum' ?>
                            </span>
                        </div>

                        <div>
                            <?php if (!$row['status']) : ?>
                                <a href="selesai.php?id=<?= $row['id'] ?>" class="btn btn-sm btn-outline-success">
                                    selesai
                                </a>
                            <?php endif; ?>

                            <a href="hapus.php?id=<?= $row['id'] ?>" 
                               onclick="return confirmHapus()" 
                               class="btn btn-sm btn-outline-danger">
                                hapus
                            </a>
                        </div>
                    </li>
                <?php endwhile; ?>
            </ul>

        </div>

        <div class="card-footer text-center text-muted">
            <?= $selesai ?> dari <?= $total ?> todo selesai
        </div>
    </div>

</div>

<script src="script.js"></script>
</body>
</html>
