
const calculateDeadline = async(type) => {
    // determine deadline based on type
    const deadline = new Date();
    switch (type) {
        case "daily":
            deadline.setDate(deadline.getDate() + 1);
            break;
        case "weekly":
            deadline.setDate(deadline.getDate() + (7 - deadline.getDay())); // sunday
            break;
        case "monthly":
            const endOfMonth = new Date(deadline.getFullYear(), deadline.getMonth() + 1, 0)
            deadline.setTime(endOfMonth.getTime())
            break;
    }
    deadline.setHours(23, 59, 59, 999) // end of day
    return deadline
}

module.exports = { calculateDeadline }