<?php
include 'config.php';

$id = $_POST['id'];
//$id = 7;

try {
    $check_sql = "DELETE from checks WHERE id = $id ";
    $stmt_check = $pdo->prepare($check_sql);
    $stmt_check->execute();

    try {
        $sums_sql = "DELETE FROM sums WHERE id_check = $id";
        $stmt_sums = $pdo->prepare($sums_sql);
        $stmt_sums->execute();
        
        
        echo json_encode(array("id"=>$id, "error"=>'')); 
        
    } catch (Exception $e) 
    {
        $error = $e->getMessage();
        echo json_encode(array("id"=>0, "error"=>$error)); 
    }
} 
catch (Exception $e) {
    $error = $e->getMessage();
    echo json_encode(array("id"=>0, "error"=>$error)); 
}
exit();