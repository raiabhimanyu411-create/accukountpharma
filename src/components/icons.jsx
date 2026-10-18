// Stroke icons drawn on a 24 × 24 grid.
export const icons = {
  phone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M10 5h4M11 19h2" />
    </>
  ),
  web: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="1" />
      <path d="M8 22h8M12 17v5M6 7h4M6 11h10" />
    </>
  ),
  scan: (
    <>
      <path d="M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5M2 12h20" />
      <path d="M7 7h3v3H7zM14 7h3v3h-3zM7 14h3v3H7zM14 14h3v3h-3z" />
    </>
  ),
  check: (
    <>
      <path d="M5 12l4 4L20 5" />
      <path d="M20 12v7H3V3h12" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h19M7 17v-4M12 17V9M17 17V5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </>
  ),
  box: (
    <>
      <path d="M3 7l9-5 9 5v10l-9 5-9-5zM3 7l9 5 9-5M12 12v10M8 4l9 5" />
    </>
  ),
  shelves: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M4 9h16M4 15h16M8 6h3M13 12h3M8 18h3" />
    </>
  ),
  matrix: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8 4h2M14 4h2M20 8v2M20 14v2M8 8h3v3H8zM14 8h2v2h-2zM8 14h2v2H8zM13 13h3v3h-3z" />
    </>
  ),
  din: (
    <>
      <path d="M3 8V4h4M17 4h4v4M21 16v4h-4M7 20H3v-4" />
      <text
        x="12"
        y="14.6"
        fill="currentColor"
        stroke="none"
        fontSize="7.4"
        fontWeight="700"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
      >
        DIN
      </text>
    </>
  ),
  docCheck: (
    <>
      <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h6M14 3l5 5v4M14 3v5h5M8 12h6M8 16h3" />
      <path d="M14 18l2.5 2.5L21 16" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
    </>
  ),
  tap: (
    <>
      <path d="M9 11V5a2 2 0 0 1 4 0v6M13 10a2 2 0 0 1 4 0v1.5M17 11.5a2 2 0 0 1 4 0V16a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-4.8-2.4L4.3 15a2 2 0 0 1 3.2-2.4L9 14.5" />
      <path d="M6 5.5a5 5 0 0 1 2-3M16 2.5a5 5 0 0 1 2 3" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
    </>
  ),
  truck: (
    <>
      <path d="M2 6h12v10H2zM14 9h4l3 3.5V16h-7" />
      <circle cx="6" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  clipboard: (
    <>
      <path d="M9 4H6a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3" />
      <path d="M9 3h6v3H9zM8.5 11h7M8.5 14.5h7M8.5 18h4" />
    </>
  ),
  bin: (
    <>
      <path d="M3 5h18v4H3zM5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M10 13h4" />
    </>
  ),
  cart: (
    <>
      <path d="M2 3h3l2.4 11.2a1 1 0 0 0 1 .8h9.4a1 1 0 0 0 1-.8L21 7H6.2" />
      <circle cx="9.5" cy="19.5" r="1.5" />
      <circle cx="17" cy="19.5" r="1.5" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18M8 6V4h8v2M5.5 6l1 14a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1l1-14M10 10v7M14 10v7" />
    </>
  ),
  mortar: (
    <>
      <path d="M3 10h18a9 9 0 0 1-18 0zM8 19.5 7 22h10l-1-2.5M14 10l5-7" />
      <path d="M9.5 12.5v4M9.5 12.5h1.6a1.2 1.2 0 0 1 0 2.4H9.5M11 14.9l2 1.6" />
    </>
  ),
  register: (
    <>
      <path d="M4 11h16l1 9H3zM7 11V7h10v4M9 4h6v3H9zM7 15h2M11 15h2M15 15h2" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
      <circle cx="12" cy="12" r="6.5" />
    </>
  ),
  store: (
    <>
      <path d="M3 9.5 12 4l9 5.5M5 9v11h14V9M9 20v-5h6v5M10.5 11.5h3M12 10v3" />
    </>
  ),
  boxShield: (
    <>
      <path d="M3 7l8-4 8 4v5M3 7v9l8 4M3 7l8 4 8-4M11 11v9" />
      <path d="M17 13l4 1.5v2.7c0 2-1.7 3.4-4 4.3-2.3-.9-4-2.3-4-4.3v-2.7z" />
    </>
  ),
  fastClock: (
    <>
      <circle cx="14" cy="12" r="7.5" />
      <path d="M14 8v4l2.5 2M2 9h4M1 12h4M2 15h4" />
    </>
  ),
  barcodeClock: (
    <>
      <path d="M3 4v14M6 4v14M9 4v9M12 4v6M15 4v4M18 4v4" />
      <circle cx="17" cy="16" r="5" />
      <path d="M17 13.5V16l1.5 1.2" />
    </>
  ),
  network: (
    <>
      <path d="M9 3h6v5H9zM3 16h6v5H3zM15 16h6v5h-6zM12 8v4M6 16v-4h12v4" />
    </>
  ),
  checklist: (
    <>
      <path d="M5 3h14v18H5zM8 8l1.2 1.2L11.5 7M8 13l1.2 1.2 2.3-2.2M8 18l1.2 1.2 2.3-2.2M14 8h2.5M14 13h2.5M14 18h2.5" />
    </>
  ),
  dbGear: (
    <>
      <ellipse cx="10" cy="5.5" rx="7" ry="2.6" />
      <path d="M3 5.5v12c0 1.4 3.1 2.6 7 2.6M17 5.5V11M3 11.5c0 1.4 3.1 2.6 7 2.6" />
      <circle cx="18" cy="17.5" r="2" />
      <path d="M18 13.5v1.5M18 20v1.5M14 17.5h1.5M20.5 17.5H22M15.2 14.7l1 1M19.8 19.3l1 1M15.2 20.3l1-1M19.8 15.7l1-1" />
    </>
  ),
  laptopGear: (
    <>
      <path d="M4 5h16v11H4zM2 19h20" />
      <circle cx="12" cy="10.5" r="2" />
      <path d="M12 7v1.2M12 12.8V14M8.5 10.5h1.2M14.3 10.5h1.2" />
    </>
  ),
  stopwatch: (
    <>
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 9.5v4l2.5 1.5M10 2.5h4M12 2.5V6M18.5 6.5l1.5-1.5" />
    </>
  ),
  reportCheck: (
    <>
      <path d="M13 3H5v18h7M13 3l5 5v3M13 3v5h5M8 17v-3M11 17v-5M14 14v-1" />
      <circle cx="17.5" cy="17.5" r="3.5" />
      <path d="M16 17.5l1 1 2-2" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  mail: (
    <>
      <path d="M3 5h18v14H3zM3 6l9 7 9-7" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2" />
    </>
  ),
  language: (
    <>
      <path d="M3 3h13v12H9l-4 4v-4H3zM8 7h5M10 6v5M8 11l2-3 3 3M17 12h4v9h-8v-3" />
    </>
  ),
  barcode: (
    <>
      <path d="M3 4v16M6 4v16M10 4v16M12 4v16M16 4v16M19 4v16M21 4v16" />
    </>
  ),
  text: (
    <>
      <path d="M3 7V3h4M17 3h4v4M21 17v4h-4M7 21H3v-4M7 16l5-9 5 9M9 13h6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M17 13a5 5 0 0 1 4 5v3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2l9 4v6c0 5-9 10-9 10S3 17 3 12V6zM7 12l3 3 6-7" />
    </>
  ),
  leaf: (
    <>
      {/* Canadian maple leaf, filled so it reads at badge size. */}
      <path
        fill="currentColor"
        stroke="none"
        d="M12 1.5 13.7 4.6 15.6 3.6 14.7 9 17.7 6.1 18.4 7.9 21.4 7.3 20.4 10.4 21.8 11.3 17.4 15 18 16.8 12.6 16 12.7 22.5H11.3L11.4 16 6 16.8 6.6 15 2.2 11.3 3.6 10.4 2.6 7.3 5.6 7.9 6.3 6.1 9.3 9 8.4 3.6 10.3 4.6Z"
      />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2" width="6" height="13" rx="3" />
      <path d="M6 10v2a6 6 0 0 0 12 0v-2M12 18v4M8 22h8" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3L2 21h20zM12 9v5M12 17v1" />
    </>
  ),
  document: (
    <>
      <path d="M5 2h9l5 5v15H5zM14 2v6h5M8 12h8M8 16h8" />
    </>
  ),
  location: (
    <>
      <path d="M12 22S4 13 4 9a8 8 0 0 1 16 0c0 4-8 13-8 13z" />
      <circle cx="12" cy="9" r="3" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12M7 10l5 5 5-5M3 16v5h18v-5" />
    </>
  ),
  transfer: (
    <>
      <path d="M3 7h17l-4-4M21 17H4l4 4" />
    </>
  ),
  pill: (
    <>
      <path d="M4.6 12.4l7.8-7.8a4.6 4.6 0 0 1 6.5 6.5l-7.8 7.8a4.6 4.6 0 0 1-6.5-6.5zM8.5 8.5l6.5 6.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4" />
    </>
  ),
  return: (
    <>
      <path d="M7 4L2 9l5 5M2 9h12a7 7 0 0 1 0 14" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 3v18M12 3v18M20 3v18M1 7h6M9 15h6M17 10h6" />
    </>
  ),
}
