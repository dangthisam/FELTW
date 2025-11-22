// src/utils/date.js
export function formatDateTime(isoOrDate) {
  const d = (typeof isoOrDate === 'string') ? new Date(isoOrDate) : isoOrDate;
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString(); 
}
