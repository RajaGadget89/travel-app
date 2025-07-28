# Feature Registry

> **This document describes each major feature of the website and how it works. For implementation status and issue tracking, see `@progress.md`.**

---

## Feature Summary Table

| Feature Name         | Description                                 | User Flow Summary                        | Related Modules/Components         | Status (see @progress.md) |
|---------------------|---------------------------------------------|------------------------------------------|------------------------------------|--------------------------|
| Landing Page        | Main entry point, video hero, trip cards    | User lands, sees hero, browses trips     | HeroSection, TopMenuBar, TripCard, YouTubeBackground | Done - Dynamic cards with CTA scroll |
| Trip Detail Page    | Shows details for a selected trip           | User clicks trip card, views details     | TripDetail, TripCard | Done - Dynamic routes with proper typing |
| Booking Form        | Multi-step form for booking a trip          | User fills form, uploads payment slip    | BookingForm (planned)              | See Module Status Table   |
| Google Sheets API   | Stores booking data externally              | Form submission sends data to Google     | API integration, backend           | See Module Status Table   |
| Error Handling      | User feedback for errors                    | User sees error messages as needed       | All forms, API responses           | See Module Status Table   |
| Admin/Auth System   | (Not in MVP)                                | N/A                                      | N/A                                | Not Planned              |

---

## Feature Details

### 1. Landing Page
- **Description:** The main entry point for users, featuring a video hero section, top menu, and a list of available travel packages as cards.
- **User Flow:** User visits the site, sees a full-screen video, clicks CTA button to scroll to trips, and browses available trips grouped by category.
- **Related Modules:** `HeroSection`, `TopMenuBar`, `TripCard`, `YouTubeBackground`
- **Status:** Done - Dynamic trip cards from data source, CTA scroll functionality, responsive design with category grouping

### 2. Trip Detail Page
- **Description:** Displays detailed information about a selected trip, including itinerary, price, and booking option.
- **User Flow:** User clicks on a trip card, is taken to the detail page via dynamic routing, and can proceed to booking.
- **Related Modules:** `TripDetail`, `TripCard`
- **Status:** Done - Dynamic routes with Next.js App Router typing, proper error handling with notFound()

### 3. Booking Form
- **Description:** A multi-step form that collects user information, allows payment slip upload, and confirms booking.
- **User Flow:** User fills out the form, uploads payment slip, submits, and receives confirmation.
- **Related Modules:** `BookingForm` (planned)
- **Status:** See Module Status Table in `@progress.md`

### 4. Google Sheets API Integration
- **Description:** Handles storage of booking data by sending form submissions to a connected Google Sheet.
- **User Flow:** On booking form submission, data is sent to Google Sheets via API.
- **Related Modules:** Backend API integration
- **Status:** See Module Status Table in `@progress.md`

### 5. Error Handling & User Feedback
- **Description:** Provides user feedback for errors (e.g., form validation, API failures).
- **User Flow:** User receives clear error messages and guidance when something goes wrong.
- **Related Modules:** All forms, API responses
- **Status:** See Module Status Table in `@progress.md`

### 6. Admin/Auth System (Not in MVP)
- **Description:** No admin or authentication system is planned for the MVP version.
- **User Flow:** N/A
- **Related Modules:** N/A
- **Status:** Not Planned (see `@progress.md`)

---

> For the latest implementation status and issue tracking, always refer to `@progress.md`. 