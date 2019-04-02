<?php
include 'config.php';

$request = json_decode($_POST['data']); 

$id = isset($request->id) ? $request->id : 0; 
   
$decisionDate = $request->decisionDate;
$decisionNum = htmlspecialchars($request->decisionNum, ENT_QUOTES);
$claimDate = $request->claimDate;
$claimNum = htmlspecialchars($request->claimNum, ENT_QUOTES);
$inquiryDate = $request->inquiryDate;
$inquiryNum = htmlspecialchars($request->inquiryNum, ENT_QUOTES);
$actDate = $request->actDate;
$actNum = htmlspecialchars($request->actNum, ENT_QUOTES);
$signingDate = $request->signingDate;
$considerationDate = $request->considerationDate;
$redressDecisionDate = $request->redressDecisionDate;
$redressDecisionNum = htmlspecialchars($request->redressDecisionNum, ENT_QUOTES);
$redressDecisionSum = $request->redressDecisionSum + 0;
$redressDecisionDeliveryDate = $request->redressDecisionDeliveryDate;
$redressDecisionStartDate = $request->redressDecisionStartDate;
$redressClaimDate = $request->redressClaimDate;
$redressClaimNum = htmlspecialchars($request->redressClaimNum, ENT_QUOTES);
$redressClaimSum = $request->redressClaimSum + 0;
$redressClaimEndDate = $request->redressClaimEndDate;
$paymentDate = $request->paymentDate;
$paymentNum = htmlspecialchars($request->paymentNum, ENT_QUOTES);
$paymentSum = $request->paymentSum + 0;


if ( $id ) {
    try {
        $sql = "UPDATE `checks` SET "
                . "`decision_num`='$decisionNum',`decision_date`='$decisionDate',"
                . "`claim_num`='$claimNum',`claim_date`='$claimDate',"
                . "`inquiry_num`='$inquiryNum',`inquiry_date`='$inquiryDate',"
                . "`act_num`='$actNum',`act_date`='$actDate',"
                . "`signing_date`='$signingDate',`consideration_date`='$considerationDate',"
                . "`redress_decision_date`='$redressDecisionDate',`redress_decision_num`='$redressDecisionNum',`redress_decision_sum`=$redressDecisionSum,"
                . "`redress_decision_delivery_date`='$redressDecisionDeliveryDate',`redress_decision_start_date`='$redressDecisionStartDate',"
                . "`redress_claim_num`='$redressClaimNum',`redress_claim_date`='$redressClaimDate',`redress_claim_sum`='$redressClaimSum',"
                . "`redress_claim_end_date`='$redressClaimEndDate',"
                . "`payment_num`='$paymentNum',`payment_date`='$paymentDate',`payment_sum`=$paymentSum  WHERE id=$id";
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





    