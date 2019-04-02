<?php
include 'config.php';

$regNum = $_POST['regNum'];
$start = $_POST['start'];
$end = $_POST['end'];
$checkType = $_POST['checkType'];
$inn = $_POST['inn'];
$region =  htmlspecialchars($_POST['region'], ENT_QUOTES);
$name =  htmlspecialchars($_POST['name'], ENT_QUOTES);
$specialists = htmlspecialchars($_POST['specialists'], ENT_QUOTES);

$cond1 = ($regNum != '')?"AND reg_num = '$regNum' ":'';
$cond2 = ($inn != '')?"AND inn = '$inn' ":'';
$cond3 = ($region != '')?"AND region LIKE '$region%' ":"AND region LIKE '%' ";
$cond4 = ($name != '')?"AND name LIKE '%$name%' ":"AND name LIKE '%' ";
$cond5 = ($specialists != '')?"AND specialists LIKE '%$specialists%' ":"AND specialists LIKE '%' ";
$cond6 = ($start != '' && $end != '')?"AND check_start >= '$start' AND check_start <= '$end' " : '';
$cond7 = ($checkType != '')?"AND type = '$checkType' ":'';

try {
    $sql = "select id, reg_num regNum, "
            . "name, "
            . "IF(unscheduled=2, '+', '') unscheduled, "
            . "specialists, "
            . "region, "
            . "DATE_FORMAT(check_start,'%d.%m.%Y') checkStart, "
            . "DATE_FORMAT(check_end,'%d.%m.%Y') checkEnd, "
            . "DATE_FORMAT(period_start,'%d.%m.%Y') periodStart, "
            . "DATE_FORMAT(period_end,'%d.%m.%Y')  periodEnd "
            . "from checks WHERE 1 "
            . $cond1 
            . $cond2
            . $cond3
            . $cond4
            . $cond5
            . $cond6
            . $cond7
            .'ORDER BY reg_num DESC';
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(array('checks'=>$data, 'error'=>''));
}
catch(Exception $e) {
    $message = $e->getMessage();
    echo json_encode(array("error"=>'Ошибка поиска данных '.$message));
}


exit();