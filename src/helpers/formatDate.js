function formatDate(data){
    if(!data) return
    const date = new Date(data);
    const dateFormat = date.toISOString().substring(0, 10);
    return dateFormat;
}

export default formatDate;
