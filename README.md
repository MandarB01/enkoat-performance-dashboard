# EnKoat Performance Dashboard

A data visualization dashboard built with React, TypeScript, and Vite. It is designed for analyzing roofing project metrics and performance data across different states, aiding in tracking and decision-making.

## Features

- Interactive data visualizations using Chart.js
- Geographic visualization with Google Maps integration
- Date-based filtering of project data
- State and roof type filtering capabilities
- Export functionality (PDF and CSV formats)
- Real-time summary metrics
- Responsive design for all screen sizes

## Tech Stack

- **Framework:** React + TypeScript
- **Build Tool:** Vite
- **Charting:** Chart.js
- **Forms:** Formik
- **Maps:** Google Maps JavaScript API
- **Data Generation:** @faker-js/faker
- **Export Capabilities:** jsPDF, PapaParse
- **Styling:** Pure CSS with responsive design

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Google Maps API key (for map visualization)
  - To obtain an API key, visit the [Google Cloud Console](https://console.cloud.google.com/).
  - Create a new project or select an existing one.
  - Navigate to "APIs & Services" > "Credentials" and create a new API key.
  - Ensure that the **Maps JavaScript API** and **Geocoding API** are enabled for your key in the "APIs & Services" > "Library" section.
  - It's recommended to restrict your API key to prevent unauthorized use (e.g., by HTTP referrers).

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd enkoat-performance-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Google Maps API key:

```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Mock Data

The dashboard uses mock data generated using @faker-js/faker to simulate real-world roofing projects. The mock data includes:

- 1000+ roofing projects
- Project details such as:
  - Project ID
  - Contractor information
  - Roof size and type
  - Location (city and state)
  - Project date
  - Estimated energy savings

Mock data is generated in `src/data/mockData.ts` and includes helper functions for:

- Generating unique project IDs
- Creating realistic contractor names and companies
- Simulating roof sizes and types
- Generating geographical distribution across states
- Calculating estimated energy savings

## Future Improvements

1. **Authentication & Authorization**

   - Implement user authentication
   - Role-based access control
   - Saved filter preferences per user

2. **Enhanced Data Visualization**

   - Additional chart types
   - Custom chart themes
   - Advanced filtering options

3. **Backend Integration**

   - Replace mock data with real API integration
   - Real-time data updates
   - Data persistence

4. **Testing**
   - Unit tests for components
   - Integration tests
   - End-to-end testing
   - Performance testing

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Lint code
- `npm run preview` - Preview production build

