const formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; //0-11
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return [year, month, day].map(formateNumber).join('/') + ' ' + [hour, minute, second].map(formateNumber).join(':')
}
//01,02...11,12
const formateNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n;
}
module.exports = {
    formatTime: formatTime
}