// Small inline SVG set; all icons are decorative beside visible, accessible labels.
const paths = {
 home: '<path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/>',
 download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
 arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
 phone: '<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2z"/>',
 location: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
 email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
 github: '<path fill="currentColor" stroke="none" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.51-1.28-1.24-1.63-1.24-1.63-1.01-.69.08-.67.08-.67 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.6 1.2 3.23.92.1-.72.39-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.43-2.22 1.15-3-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.12 2.95.71.78 1.14 1.78 1.14 3 0 4.3-2.61 5.24-5.1 5.52.4.35.75 1.02.75 2.06V22c0 .3.2.64.77.53A11.1 11.1 0 0 0 12 .9Z"/>',
 linkedin: '<path fill="currentColor" stroke="none" d="M20.5 2h-17C2.67 2 2 2.65 2 3.45v17.1c0 .8.67 1.45 1.5 1.45h17c.83 0 1.5-.65 1.5-1.45V3.45c0-.8-.67-1.45-1.5-1.45ZM8 19H5V9.5h3V19ZM6.5 8.2a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-4.6c0-1.1-.02-2.5-1.52-2.5-1.53 0-1.77 1.2-1.77 2.42V19h-3V9.5h2.88v1.3h.04c.4-.76 1.38-1.55 2.83-1.55 3.02 0 3.54 1.99 3.54 4.57V19Z"/>',
 gear: '<path d="m9 3-1 3-3 1 1 3-2 2 2 2-1 3 3 1 1 3h6l1-3 3-1-1-3 2-2-2-2 1-3-3-1-1-3z"/><circle cx="12" cy="12" r="3"/>',
 chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/><path d="M10 10h4v4h-4z"/>',
 code: '<path d="m7 6-6 6 6 6m10-12 6 6-6 6M14 3l-4 18"/>',
 terminal: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 8 4 4-4 4m7 0h5"/>',
};
export const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
