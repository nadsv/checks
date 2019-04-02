<?php
include 'config.php';

$request = json_decode($_POST['data']); 

$id = $request->id + 0; 
    
$type = $request->checkType + 0 ;
$reg_num = $request->regNum;
$inn = $request->inn;
$name= htmlspecialchars($request->name, ENT_QUOTES);
$address= htmlspecialchars($request->address, ENT_QUOTES);
$region= htmlspecialchars($request->region, ENT_QUOTES);
$chief= htmlspecialchars($request->chief, ENT_QUOTES);
$unschaduled = $request->unschaduled +0 ;
$days = isset($request->days) ? $request->days + 0  : 0;
$check_state = $request->state + 0 ;
$check_start = $request->checkStart;
$check_end = $request->checkStart;
$period_start = $request->periodStart;
$period_end  = $request->periodEnd;
$specialists= htmlspecialchars($request->specialists, ENT_QUOTES);
$note= htmlspecialchars($request->note, ENT_QUOTES);
$expenses1 = $request->expenses1 + 0 ;
$expenses2 = $request->expenses2 + 0 ;
$expenses3 = $request->expenses3 + 0 ;
$employees_number = $request->employeesNumber + 0;
$error = '';

if ( !$id ) {
        try {
            $sql = "INSERT INTO checks(type, reg_num, inn, name, check_state, unscheduled, "
                    . "specialists, check_start, check_end, period_start, period_end, "
                    . "employees_number, address, region, chief, note, expenses1, expenses2, expenses3) "
                    . "VALUES ($type, $reg_num, $inn, '$name', $check_state, $unschaduled, "
                    . "'$specialists', '$check_start', '$check_end', '$period_start', '$period_end', "
                    . "$employees_number, '$address', '$region', '$chief', '$note', $expenses1, $expenses2, $expenses3)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(array());
            $id = $pdo->lastInsertId();
        } 
        catch(Exception $e) {
            $id = 0;
            $error = $e->getMessage();
        }
    } else {
        try {
            $sql ="UPDATE `checks` SET `type`=$type,"
                    . "`reg_num`='$reg_num', `inn`='$inn',`name`='$name',"
                    . "`check_state`=$check_state,`unscheduled`=$unschaduled,`specialists`='$specialists',"
                    . "`check_start`='$check_start',`check_end`='$check_end',`period_start`='$period_start',"
                    . "`period_end`='$period_end',`employees_number`=$employees_number,`address`='$address',"
                    . "`region`='$region',`chief`='$chief', "
                    . "`expenses1`=$expenses1,`expenses2`=$expenses2,`expenses3`=$expenses3,"
                    . "`note`='$note' WHERE id = $id" ;
            $stmt = $pdo->prepare($sql);
            $stmt->execute(array());
        }
        catch(Exception $e) {
            $id = 0;
            $error = $e->getMessage();
        }
    }
echo json_encode(array("id"=>$id, 'error'=> $error));




    