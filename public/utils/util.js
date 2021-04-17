export const selector = (v, el = document) => el.querySelector(v);

export const allSelector = (v, el = document) => el.querySelectorAll(v);

export const getNowDate = () => {
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

export const delay = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}
