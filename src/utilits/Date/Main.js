export const FormatedDate = (date) => {
    const dateTime = new Date(date);

    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDate = dateTime.toLocaleString('en-US', options).toUpperCase();

    return formattedDate
}

export const FormatedDateTime = (date) => {
    const dateTime = new Date(date);

    const options = {
        month: 'short', day: '2-digit', year: 'numeric', 
        hour: 'numeric', minute: 'numeric'
    };
    const formattedDateTime = dateTime.toLocaleString('en-US', options).toUpperCase();

    return formattedDateTime;
}