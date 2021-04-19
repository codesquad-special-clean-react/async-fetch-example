const getToday = () => {
    const today = new Date();

    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    month = (month < 9) ? `0${month}` : month;
    date = (date < 9) ? `0${date}` : date;

    return `${year}-${month}-${date}`
}