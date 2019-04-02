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
$report_num = $_POST['report']; 

$cond1 = ($regNum != '')?"AND reg_num = '$regNum' ":'';
$cond2 = ($inn != '')?"AND inn = '$inn' ":'';
$cond3 = ($region != '')?"AND region LIKE '$region%' ":"AND region LIKE '%' ";
$cond4 = ($name != '')?"AND name LIKE '%$name%' ":"AND name LIKE '%' ";
$cond5 = ($specialists != '')?"AND specialists LIKE '%$specialists%' ":"AND specialists LIKE '%' ";
$cond6 = ($start != '' && $end != '')?"AND check_start >= '$start' AND check_start <= '$end' " : '';
$cond7 = ($checkType != '')?"AND type = '$checkType' ":'';

try {
    $sql =  "select c.id, c.reg_num regNum, "
            . "c.act_num actNum, "
            . "DATE_FORMAT(c.act_date,'%d.%m.%Y') actDate,"
            . "c.type checkType, "
            . "c.inn, "
            . "c.name, "
            . "c.type checkType, "
            . "c.unscheduled, "
            . "c.specialists, "
            . "DATE_FORMAT(c.check_start,'%d.%m.%Y') checkStart, "
            . "DATE_FORMAT(c.check_end,'%d.%m.%Y') checkEnd, "
            . "DATE_FORMAT(c.period_start,'%d.%m.%Y') periodStart, "
            . "DATE_FORMAT(c.period_end,'%d.%m.%Y') periodEnd, "
            . "c.employees_number employeesNumber, "
            . "c.address, "
            . "c.region, "
            . "c.chief, "
            . "c.expenses1, "
            . "c.expenses2, "
            . "c.expenses3, "
            . "c.note, "
            . "c.decision_num decisionNum, "
            . "DATE_FORMAT(c.decision_date,'%d.%m.%Y') decisionDate, "
            . "c.claim_num claimNum, "
            . "DATE_FORMAT(c.claim_date,'%d.%m.%Y') claimDate, "
            . "c.inquiry_num inquiryNum, "
            . "DATE_FORMAT(c.inquiry_date,'%d.%m.%Y') inquiryDate, "
            . "DATE_FORMAT(c.signing_date,'%d.%m.%Y') signingDate, "
            . "DATE_FORMAT(c.consideration_date,'%d.%m.%Y') considerationDate, "
            . "c.protocol_num protocolNum, "
            . "DATE_FORMAT(c.protocol_date,'%d.%m.%Y') protocolDate, "
            . "c.redress_decision_num redressDecisionNum, "
            . "DATE_FORMAT(c.redress_decision_date,'%d.%m.%Y') redressDecisionDate, "
            . "DATE_FORMAT(c.redress_decision_delivery_date,'%d.%m.%Y') redressDecisionDeliveryDate, "
            . "DATE_FORMAT(c.redress_decision_start_date,'%d.%m.%Y') redressDecisionStartDate, "
            . "c.redress_claim_num redressClaimNum, "
            . "DATE_FORMAT(c.redress_claim_date,'%d.%m.%Y') redressClaimDate, "
            . "c.redress_claim_sum redressClaimSum, "
            . "DATE_FORMAT(c.redress_claim_end_date,'%d.%m.%Y') redressClaimEndDate, "
            . "c.payment_num paymentNum, "
            . "DATE_FORMAT(c.payment_date,'%d.%m.%Y') paymentDate,"
            . "c.letter_for_jurist_num letterForJuristNum, "
            . "DATE_FORMAT(c.letter_for_jurist_date,'%d.%m.%Y') letterForJuristDate, "
            . "c.lawsuit_num lawSuitNum, "
            . "DATE_FORMAT(c.lawsuit_date,'%d.%m.%Y') lawSuitDate, "
            . "c.judgment_num judgmentNum, "
            . "DATE_FORMAT(c.judgment_date,'%d.%m.%Y') judgmentDate, "
            . "c.note2 judgmentNote, "
            . "c.approved_sum approvedSum, "
            . "c.denied_sum deniedSum, "
            . "DATE_FORMAT(c.judgment_payment_date,'%d.%m.%Y') judgmentPaymentDate,"
            . "c.judgment_payment_num judgmentPaymentNum, "
            . "c.ndfl, "
            . "c.post, "
            . "c.nds, "
            . "s.need_sum needSum, "
            . "s.vol_sum volSum, "
            . "s.suit_sum suitSum "
            . "FROM checks as c " 
            . "LEFT JOIN (SELECT id_check, SUM(need_sum) need_sum, SUM(vol_sum) vol_sum, SUM(suit_sum) suit_sum FROM sums GROUP BY id_check) s "
            . "ON c.id= s.id_check WHERE 1 "
            . $cond1 
            . $cond2
            . $cond3
            . $cond4
            . $cond5
            . $cond6
            . $cond7
            .'ORDER BY c.reg_num DESC';
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    include "export1.php";

    echo json_encode(array('checks'=>$data, 'error'=>''));
}
catch(Exception $e) {
    $message = $e->getMessage();
    echo json_encode(array("error"=>'Ошибка поиска данных '.$message));
}


exit();