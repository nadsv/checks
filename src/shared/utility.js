export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = ( value, rules ) => {
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    value = `${value}`;

    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }

    return isValid;
}

export const regions = [
    {value: 'Беловский', displayValue: 'Беловский'},
    {value: 'Больше-Солдатский', displayValue: 'Больше-Солдатский'},
    {value: 'Глушковский', displayValue: 'Глушковский'},
    {value: 'Горшеченский', displayValue: 'Горшеченский'},
    {value: 'Дмитриевский', displayValue: 'Дмитриевский'},
    {value: 'Железногорский', displayValue: 'Железногорский'},
    {value: 'Золотухинский', displayValue: 'Золотухинский'},
    {value: 'Касторенский', displayValue: 'Касторенский'},
    {value: 'Конышевский', displayValue: 'Конышевский'},
    {value: 'Кореневский', displayValue: 'Кореневский'},
    {value: 'Курск', displayValue: 'Курск'},
    {value: 'Курский', displayValue: 'Курский'},
    {value: 'Курчатовский', displayValue: 'Курчатовский'},
    {value: 'Льговский', displayValue: 'Льговский'},
    {value: 'Мантуровский', displayValue: 'Мантуровский'},
    {value: 'Медвенский', displayValue: 'Медвенский'},
    {value: 'Обоянский', displayValue: 'Обоянский'},
    {value: 'Октябрьский', displayValue: 'Октябрьский'},
    {value: 'Поныровский', displayValue: 'Поныровский'},
    {value: 'Пристенский', displayValue: 'Пристенский'},
    {value: 'Рыльский', displayValue: 'Рыльский'},
    {value: 'Советский', displayValue: 'Советский'},
    {value: 'Солнцевский', displayValue: 'Солнцевский'},
    {value: 'Суджанский', displayValue: 'Суджанский'},
    {value: 'Тимский', displayValue: 'Тимский'},
    {value: 'Фатежский', displayValue: 'Фатежский'},
    {value: 'Хомутовский', displayValue: 'Хомутовский'},
    {value: 'Черемисиновский', displayValue: 'Черемисиновский'},
    {value: 'Щигровский', displayValue: 'Щигровский'}
];

export const types = [
        {value: 'Пособие по временной нетрудоспособности (банк)', displayValue: 'Пособие по временной нетрудоспособности (банк)'},
        {value: 'Пособие по временной нетрудоспособности (почта)', displayValue: 'Пособие по временной нетрудоспособности (почта)'},
        {value: 'Пособие по беременности и родам', displayValue: 'Пособие по беременности и родам'},
        {value: 'Ранние сроки беременности', displayValue: 'Ранние сроки беременности'},
        {value: 'Единовременное пособие при рождении ребенка', displayValue: 'Единовременное пособие при рождении ребенка'},
        {value: 'Ежемесячное пособие по уходу за ребенком', displayValue: 'Ежемесячное пособие по уходу за ребенком'},
        {value: 'Социальное пособие на погребение', displayValue: 'Социальное пособие на погребение'},
        {value: 'Оплата 4-х дополнительных дней по уходу за ребенком инвалидом', displayValue: 'Оплата 4-х дополнительных дней по уходу за ребенком инвалидом'},
        {value: 'Пособие по временной нетрудоспособности НС и финансирование предупредительных мер', displayValue: 'Пособие по временной нетрудоспособности НС и финансирование предупредительных мер'},
        {value: 'Оплата отпуска для санаторно-курортного лечения', displayValue: 'Оплата отпуска для санаторно-курортного лечения'},
        {value: 'Возмещение гарантированного перечня услуг на погребение', displayValue: 'Возмещение гарантированного перечня услуг на погребение'},
        {value: 'Установленные недоплаты по выплате страхового обеспечения', displayValue: 'Установленные недоплаты по выплате страхового обеспечения'}
];

export const reportTypes = [
        {value: 1, displayValue: 'Журнал учета выездных проверок'},
        {value: 2, displayValue: 'Сводный отчет по выездным проверкам'}
]

export function decodeHtml(str)
{
    const map =
    {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'"
    };
    return (str) ? str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) {return map[m];}) : '';
}

export const PASSWORD = '1'

export function formatDate(date) {
  let newDate = new Date(date)
  var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return newDate.toLocaleDateString('ru-Ru', options);
}
