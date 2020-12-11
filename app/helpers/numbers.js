export const sanitize = num => (typeof num === 'number' ? num : 0);
export const truncateDecimal = num => Math.round(num * 100) / 100;
