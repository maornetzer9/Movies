// TODO: Check if you need this.

/**
 * Converts minutes to a formatted string of hours and minutes.
 * @param {number} totalMinutes - The total number of minutes to convert.
 * @returns {string} - A string representing the equivalent hours and minutes.
 */
export const convertMinutesToHours = (totalMinutes) => {
    
    // Calculate the number of full hours
    const hours = Math.floor(totalMinutes / 60);
    // Calculate the remaining minutes
    const minutes = totalMinutes % 60;
    // Return the formatted string
    return `${hours}.${minutes}`;
}

// Example usage:
const minutes = 272;
const result = convertMinutesToHours(minutes);
console.log(result); 