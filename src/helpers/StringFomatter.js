export const formatDate = (strDate) => {
    var date = new Date(strDate)
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = date.toLocaleDateString("en-US", options)
    return formattedDate;
}

export const capitalizeFirstLetter = (str) => {
    console.log(str)
    return str.charAt(0).toUpperCase() + str.slice(1);
}