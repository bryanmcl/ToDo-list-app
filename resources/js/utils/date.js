export const formatDate = (dateStr, locale = "en-US") => {
    const date = new Date(dateStr);
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};

export const formatDateTime = (dateStr, locale = "en-US") => {
    const date = new Date(dateStr);
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
};
