let utils = {}
utils.formatDate = function (date) {
  date = new Date(date)
  let year = date.getFullYear()
  let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
  let hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
  let min = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
  let sec = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
  date = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec
  return date
}
export default utils
