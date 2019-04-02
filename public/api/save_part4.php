<?php
include 'config.php';

$id_check = $_POST['id']; 
$ndfl = $_POST['ndfl'] + 0;
$nds = $_POST['nds'] + 0;
$post = $_POST['post'] + 0;

try {
    if ($id_check) { 
        $length = count($_POST);
        $delete = "DELETE FROM `sums` WHERE id_check = $id_check";
        $stmt = $pdo->prepare($delete);
        $stmt->execute(array());

        $start = "INSERT INTO `sums`( `id_check`, `name`, `need_sum`, `vol_sum`, `suit_sum`) VALUES ";
        for ($i = 0; $i < $length; $i++) {
            $form_name = 'form' . $i;
            if (isset($_POST[$form_name])) {
                $data = json_decode($_POST[$form_name]); 
                $name= htmlspecialchars($data->name, ENT_QUOTES);
                $need_sum = $data->needSum + 0;
                $vol_sum = $data->volSum + 0;
                $suit_sum = $data->suitSum + 0;
                $rows[$i] = "($id_check, '$name', $need_sum, $vol_sum, $suit_sum)";
            }
        }

        
        
        if (!isset($rows)) {
            $ndfl = 0;
            $nds = 0;
            $post = 0;
        } else {
            $insert = $start . implode ( ',' , $rows );

            $stmt = $pdo->prepare($insert);
            $stmt->execute(array());
        }
        
        $update = "UPDATE checks SET ndfl=$ndfl, nds=$nds, post=$post WHERE id=$id_check";
        $stmt = $pdo->prepare($update);
        $stmt->execute();
    }

    echo json_encode(array("id"=>$id_check, "error"=>''));
}
catch(Exception $e) {
            $id = 0;
            $error = $e->getMessage();
            echo json_encode(array("id"=>0, "error"=>$error)); 
        }




    