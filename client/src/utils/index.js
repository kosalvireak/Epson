
import axios from "axios";
export function getDateUtils(date, onlyDate, includeTime) {
    const fDate = new Date(date);
    var day = fDate.getDate();
    var month = fDate.getMonth() + 1;
    var year = fDate.getFullYear();
    if (onlyDate) {
        var formattedDate = day + "/" + month + "/" + year;
        return formattedDate;
    }
    else if (includeTime) {
        var hours = fDate.getHours();
        var mn = fDate.getMinutes();
        var sec = fDate.getSeconds();
        var formattedDate =
            day + "/" + month + "/" + year + " - " + hours + ":" + mn + ":" + sec;
        return formattedDate;
    }
}
export function setAuthToken(token) {
    if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
    } else {
        delete axios.defaults.headers.common["x-auth-token"];
    }
};
