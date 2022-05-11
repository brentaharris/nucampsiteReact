export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-Us', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    }).format(new Date(Date.parse(date)))
};