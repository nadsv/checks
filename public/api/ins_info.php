<?php
try {
    $h = hytech_connect("tcpip:/10.46.0.37:13000");
    $rn = $_GET['rn'];
    $buff=file_get_contents("ins_info.sql");
    $query=str_replace("#rn",$rn,$buff);
    
    $rh = hytech_query($query, $h);
    
    $res = hytech_fetch_assoc( $rh, 0 );
    
    if ($res) {
        $info['inn'] = $res['INN'];
        $info['name'] = iconv("Windows-1251", "UTF-8", $res['NAME']);
        $info['address'] = iconv("Windows-1251", "UTF-8", $res['CADDR']);
        $info['chief'] = iconv("Windows-1251", "UTF-8", $res['CEO']);
        $info['region'] = iconv("Windows-1251", "UTF-8", $res['REGION']);
        $info['employees_number'] = $res['NUMBER'];
        $info['expenses1'] = $res['y1'];
        $info['expenses2'] = $res['y2'];
        $info['expenses3'] = $res['y3'];
    } else {
        $info['inn'] = '';
        $info['name'] = '';
        $info['address'] = '';
        $info['chief'] = '';
        $info['region'] = 'Курск';
        $info['employees_number'] = '';
        $info['expenses1'] = '';
        $info['expenses2'] = '';
        $info['expenses3'] = '';
    }
} catch (Exception $e) {
            $info['inn'] = '';
            $info['name'] = '';
            $info['address'] = '';
            $info['chief'] = '';
            $info['region'] = 'Курск';
            $info['employees_number'] = '';
            $info['expenses1'] = '';
            $info['expenses2'] = '';
            $info['expenses3'] = '';
        }
           
    $data=json_encode($info);
    echo $data; 
    