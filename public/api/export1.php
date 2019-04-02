<?php
include 'config.php';
$FILE_NAME = 'report1.xls';

$body = '';

function clear_date($date) {
    $new_date = str_replace('00.00.0000', '', $date);
    return $new_date;
}

function conv_text($text) {
    return iconv( "utf-8", "windows-1251", $text);
}

for ($i = 0; $i < count($data); $i++) {
    $tr = "<tr>"
            ."<td>"                 .($i+1).                                    "</td>"
            ."<td>"                 .$data[$i]['regNum'].                       "</td>"
            ."<td>"                 .conv_text($data[$i]['name']).              "</td>"
            ."<td align='right'>"   .conv_text($data[$i]['decisionNum']).       "</td>"
            ."<td>"                 .clear_date($data[$i]['decisionDate']).     "</td>"
            ."<td align='right'>"   .conv_text($data[$i]['claimNum']).          "</td>"
            ."<td>"                 .clear_date($data[$i]['claimDate']).        "</td>"
            ."<td align='right'>"   .conv_text($data[$i]['inqueryNum']).        "</td>"
            ."<td>"                 .clear_date($data[$i]['inqueryDate']).      "</td>"
            ."<td align='right'>"   .conv_text($data[$i]['actNum']).            "</td>"
            ."<td>"                 .clear_date($data[$i]['actDate']).          "</td>"
            ."<td>"                 .$needSum.                                  "</td>" //?????Ask Parkhomenko
            ."<td>"                 .$ndfl.                                     "</td>"
            ."<td>"                 .$post.                                     "</td>"
            ."<td>"                 .$nds.                                      "</td>"
            ."<td>"                 .clear_date($data[$i]['signingDate']).        "</td>"
            ."<td>"                 .clear_date($data[$i]['considerationDate']).  "</td>"
            ."<td align='right'>"   .conv_text($data[$i]['protocolNum']).          "</td>"
            ."<td>"                 .clear_date($data[$i]['protocolDate']).        "</td>"
            ."<td align='right'>"   .conv_text($data[$i]['redressDecisionNum']).          "</td>"
            ."<td>"                 .clear_date($data[$i]['redressDecisionDate']).        "</td>"
            ."<td>"                 .clear_date($data[$i]['redressDecisionDate']).        "</td>"
            ."<td>"                 .$needSum.        "</td>" //????Ask Parkhomenko
            . "</tr>";
    $body = $body.$tr;
}

$report_data = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">'
        . '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
        . '<x:Name>Report Sheet</x:Name><x:WorksheetOptions><x:Panes></x:Panes>'
        . "</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body><table border='1px'>"
        .'<thead>
            <tr>
                <td rowspan="2" align="center"><b>� �.�.</b></td>
                <td colspan="2" align="center"><b>������������</b></td>
                <td colspan="2" align="center"><b>������� � ���������� ��������</b></td>
                <td colspan="2" align="center"><b>���������� � �������������� ����������</b></td>
                <td colspan="2" align="center"><b>������� � ����������� ��������</b></td>
                <td colspan="6" align="center"><b>��� ������� ��������</b></td>
                <td rowspan="2" align="center"><b>���� ���������� (���������) ���� �������� �������� �������������</b></td>
                <td rowspan="2" align="center"><b>���� ������������ ���������� �������� ��������</b></td>
                <td colspan="2" align="center"><b>�������� ������������ ���������� �������� ��������</b></td>
                <td colspan="5" align="center"><b>������� � ���������� ������� ��������� ������������ ��������</b></td>
                <td colspan="4" align="center"><b>���������� � ���������� ������� ��������� ������������ ��������</b></td>
                <td colspan="3" align="center"><b>��������� ������������� � ������������ ������� ������� ��������� �������</b></td>
                <td colspan="2" align="center"><b>����������� ���������� � �������� ����� ������������� ��������� ��� ��������� ��������������� ��������� (���������������� ������)</b></td>
                <td colspan="3" align="center"><b>������� ��������� � ��������� ������� ��������� ������������ ��������</b></td>
                <td colspan="4" align="center"><b>����������� ����</b></td>
                <td colspan="3" align="center"><b>��������� �� ������������ ����� ��������� ��������������� ��������� (�������� ���������)</b></td>
            </tr>
            <tr>
                <td align="center"><b>���. �����</b></td>
                <td align="center"><b>������������ ������������</b></td>
                <td align="center"><b>�</b></td>
                <td align="center"><b>����</b></td>
                <td align="center"><b>�</b></td>
                <td align="center"><b>����</b></td>
                <td align="center"><b>�</b></td>
                <td align="center"><b>����</b></td>
                <td align="center"><b>�</b></td>
                <td align="center"><b>����</b></td>
                <td align="center"><b>����� ������� ��������� ��������, ����� (���., ���.)</b></td>
                <td align="center"><b>���� (���., ���.)</b></td>
                <td align="center"><b>�������� �������. �������� ���� (���., ���.)</b></td>
                <td align="center"><b>�������� �������. ��� (���., ���.)</b></td>
                <td align="center"><b>�</b></td>
                <td align="center"><b>����</b></td>
                <td align="center"><b>�</b></td>
                <td align="center"><b>����</b></td>
                <td align="center"><b>����� (���., ���.)</b></td>
                <td align="center"><b>���� �������� ���������� ������� ������������</b></td>
                <td align="center"><b>���� ���������� � ���� ���������� �������</b></td>
                <td align="center"><b>�</b></td>
                <td align="center"><b>����</b></td>
                <td align="center"><b>����� (���., ���.)</b></td>
                <td align="center"><b>���� ���������� ���������� ����������</b></td>
                <td align="center"><b>�</b></td>
                <td align="center"><b>����</b></td>
                <td align="center"><b>����� (���., ���.)</b></td>
                <td align="center"><b>�</b></td>
                <td align="center"><b>����</b></td>
                <td align="center"><b>�</b></td>
                <td align="center"><b>����</b></td>
                <td align="center"><b>����� (���., ���.)</b></td>
                <td align="center"><b>�</b></td>
                <td align="center"><b>����</b></td>
                <td align="center"><b>������������� (���., ���.)</b></td>
                <td align="center"><b>�������� (���., ���.)</b></td>
                <td align="center"><b>�</b></td>
                <td align="center"><b>����</b></td>
                <td align="center"><b>����� (���., ���.)</b></td>
            </tr>
            <tr>
                <td align="center"><b>1</b></td>
                <td align="center"><b>2</b></td>
                <td align="center"><b>3</b></td>
                <td align="center"><b>4</b></td>
                <td align="center"><b>5</b></td>
                <td align="center"><b>6</b></td>
                <td align="center"><b>7</b></td>
                <td align="center"><b>8</b></td>
                <td align="center"><b>9</b></td>
                <td align="center"><b>10</b></td>
                <td align="center"><b>11</b></td>
                <td align="center"><b>12</b></td>
                <td align="center"><b>13</b></td>
                <td align="center"><b>14</b></td>
                <td align="center"><b>15</b></td>
                <td align="center"><b>16</b></td>
                <td align="center"><b>17</b></td>
                <td align="center"><b>18</b></td>
                <td align="center"><b>19</b></td>
                <td align="center"><b>20</b></td>
                <td align="center"><b>21</b></td>
                <td align="center"><b>22</b></td>
                <td align="center"><b>23</b></td>
                <td align="center"><b>24</b></td>
                <td align="center"><b>25</b></td>
                <td align="center"><b>26</b></td>
                <td align="center"><b>27</b></td>
                <td align="center"><b>28</b></td>
                <td align="center"><b>29</b></td>
                <td align="center"><b>30</b></td>
                <td align="center"><b>31</b></td>
                <td align="center"><b>32</b></td>
                <td align="center"><b>33</b></td>
                <td align="center"><b>34</b></td>
                <td align="center"><b>35</b></td>
                <td align="center"><b>36</b></td>
                <td align="center"><b>37</b></td>
                <td align="center"><b>38</b></td>
                <td align="center"><b>39</b></td>
                <td align="center"><b>40</b></td>
                <td align="center"><b>41</b></td>
                <td align="center"><b>42</b></td>
                <td align="center"><b>43</b></td>
            </tr>
        </thead>
        <tbody>'
            .$body.
        '</tbody>
    </table></body></html>';

file_put_contents($FILE_NAME, $report_data);