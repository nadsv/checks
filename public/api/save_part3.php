<?php
include 'config.php';

$request = json_decode($_POST['data']); 

$id = isset($request->id) ? $request->id : 0; 
   
$letterForJuristDate = $request->letterForJuristDate;
$letterForJuristNum = htmlspecialchars($request->letterForJuristNum, ENT_QUOTES);
$lawSuitDate = $request->lawSuitDate;
$lawSuitNum = htmlspecialchars($request->lawSuitNum, ENT_QUOTES);
$lawSuitSum = $request->lawSuitSum + 0;
$judgmentDate = $request->judgmentDate;
$judgmentNum = htmlspecialchars($request->judgmentNum, ENT_QUOTES);
$approvedSum = $request->approvedSum + 0;
$deniedSum = $request->deniedSum + 0;
$judgmentNote = htmlspecialchars($request->judgmentNote, ENT_QUOTES);
$judgmentPaymentDate = $request->judgmentPaymentDate;
$judgmentPaymentNum = htmlspecialchars($request->judgmentPaymentNum, ENT_QUOTES);
$judgmentPaymentSum = $request->judgmentPaymentSum + 0;

if ( $id ) {
    try {
        $sql = "UPDATE `checks` SET "
                . "`letter_for_jurist_num`='$letterForJuristNum',`letter_for_jurist_date`='$letterForJuristDate',"
                . "`lawsuit_num`='$lawSuitNum',`lawsuit_date`='$lawSuitDate', `lawsuit_sum`=$lawSuitSum, "
                . "`judgment_num`='$judgmentNum',`judgment_date`='$judgmentDate',"
                . "`approved_sum`=$approvedSum,`denied_sum`=$deniedSum, "
                . "note2='$judgmentNote', "
                . "`judgment_payment_num`='$judgmentPaymentNum',`judgment_payment_date`='$judgmentPaymentDate',`judgment_payment_sum`=$judgmentPaymentSum"
                . " WHERE id=$id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array());
        echo json_encode(array("id"=>$id, "error"=>''));
    }
    catch(Exception $e) {
            $id = 0;
            $error = $e->getMessage();
            echo json_encode(array("id"=>0, "error"=>$error)); 
        }
}





    