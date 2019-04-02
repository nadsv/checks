fix all;

var @year1 = year(today())-3;
var @year2 = year(today())-2;
var @year3 = year(today())-1;
var @rn = '#rn';

select REG_NUM, S3R1C2+S3R4C2+S3R5C2+S3R6C2 +S3R71C2+S3R72C2+S3R3C3+S3R8C2 + //ÂÍ
       T6R3C2+T6R8C2+T6R5C2+T6R10C2 y1,  //ÍÑ,
       double(0) y2, double(0) y3
from F4OZM
where REG_NUM=@rn and YEAR_NUM = @year1 and QUART_NUM=4
union
select REG_NUM, 0, S3R1C2+S3R4C2+S3R5C2+S3R6C2 +S3R71C2+S3R72C2+S3R3C3+S3R8C2 + //ÂÍ
       T6R3C2+T6R8C2+T6R5C2+T6R10C2,  //ÍÑ
       0
from F4OZM
where REG_NUM=@rn and YEAR_NUM = @year2 and QUART_NUM=4
union
select REG_NUM, 0, 0, S3R1C2+S3R4C2+S3R5C2+S3R6C2 +S3R71C2+S3R72C2+S3R3C3+S3R8C2 + //ÂÍ
       T6R3C2+T6R8C2+T6R5C2+T6R10C2  //ÍÑ
from F4OZM
where REG_NUM=@rn and YEAR_NUM = @year3 and QUART_NUM=4;
results table '**c';

select e.REG_NUM,
       htStrReplace(e.INN,'C') INN,
       e.ABBR NAME,
       e.CADDR,
       e.CEO,
       char(iif(r.ID==27 or r.ID==35 or r.ID==36, 'Êóðñê', r.NAME),100) REGION,
       c.y1,
       c.y2,
       c.y3,
       f.T1R1C2 NUMBER
from EIP e, TREGION r, c, F4INFO f
where e.REG_NUM=@rn and r.ID=e.RN_CODE
       and c.REG_NUM*=e.REG_NUM and e.REG_NUM =*f.REG_NUM
       and f.YEAR_NUM=@year3 and f.QUART_NUM=4;