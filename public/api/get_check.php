<?php
include 'config.php';

$id = $_GET['id'];
//$id = 7;

try {
    $check_sql = "select id, reg_num regNum, "
            . "act_num actNum, "
            . "act_date actDate, "
            . "type checkType, "
            . "inn, "
            . "name, "
            . "type checkType, "
            . "unscheduled, "
            . "specialists, "
            . "check_start checkStart, "
            . "check_end checkEnd, "
            . "period_start periodStart, "
            . "period_end periodEnd, "
            . "employees_number employeesNumber, "
            . "address, "
            . "region, "
            . "chief, "
            . "expenses1, "
            . "expenses2, "
            . "expenses3, "
            . "note, "
            . "decision_num decisionNum, "
            . "decision_date decisionDate, "
            . "claim_num claimNum, "
            . "claim_date claimDate, "
            . "inquiry_num inquiryNum, "
            . "inquiry_date inquiryDate, "
            . "signing_date signingDate, "
            . " `consideration_date` considerationDate, "
            . "`protocol_num` protocolNum, "
            . "`protocol_date` protocolDate, "
            . "`redress_decision_num` redressDecisionNum, "
            . "`redress_decision_date` redressDecisionDate, "
            . "`redress_decision_delivery_date` redressDecisionDeliveryDate, "
            . "`redress_decision_start_date` redressDecisionStartDate, "
            . "`redress_claim_num` redressClaimNum, "
            . "`redress_claim_date` redressClaimDate, "
            . "`redress_claim_sum` redressClaimSum, "
            . "`redress_claim_end_date` redressClaimEndDate, "
            . "`payment_num` paymentNum, "
            . "`payment_date` paymentDate, "
            . "`letter_for_jurist_num` letterForJuristNum, "
            . "`letter_for_jurist_date` letterForJuristDate, "
            . "`lawsuit_num` lawSuitNum, "
            . "`lawsuit_date` lawSuitDate, "
            . "`judgment_num` judgmentNum, "
            . "`judgment_date` judgmentDate, "
            . "`note2` judgmentNote, "
            . "`approved_sum` approvedSum, "
            . "`denied_sum` deniedSum, "
            . "`judgment_payment_date` judgmentPaymentDate, "
            . "`judgment_payment_num` judgmentPaymentNum, "
            . "ndfl, "
            . "post, "
            . "nds "
            . "from checks WHERE id = $id ";
    $stmt_check = $pdo->prepare($check_sql);
    $stmt_check->execute();

    $check = $stmt_check->fetchAll(PDO::FETCH_ASSOC);


    try {
        $benefit_sql = "select name, need_sum needSum, vol_sum volSum, suit_sum suitSum from sums where id_check = $id";
        $stmt_benefit = $pdo->prepare($benefit_sql);
        $stmt_benefit->execute();
        
        $needSum = 0;
        $volSum = 0;
        $suitSum = 0;

        $benefits = $stmt_benefit->fetchAll(PDO::FETCH_ASSOC);
        foreach($benefits as $benefit) {
            $needSum = $needSum + $benefit['needSum'];
            $volSum = $volSum + $benefit['volSum'];
            $suitSum = $suitSum + $benefit['suitSum'];
        }
        $check[0]['benefits'] = $benefits;
        $check[0]['redressDecisionSum'] = $needSum;
        $check[0]['paymentSum'] = $volSum;
        $check[0]['judgmentPaymentSum'] = $suitSum;
        
        echo json_encode(array("check"=>$check[0], "error"=>'')); 
        
    } catch (Exception $e) 
    {
        $error = $e->getMessage();
        echo json_encode(array("data"=>'', "error"=>$error)); 
    }
} 
catch (Exception $e) {
    $error = $e->getMessage();
    echo json_encode(array("data"=>'', "error"=>$error)); 
}
exit();