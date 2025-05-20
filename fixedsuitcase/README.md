# FIRSTstudent Student Assignment Platform

## Description
A Vue 3 web frontend for FIRSTstudent's HALO platform to manage student-to-bus assignments. The application provides a user-friendly interface to view bus information and assign students to buses, with support for English and Spanish.

## Features
- Toolbar with FIRSTstudent logo, navigation, and language switcher (EN/ES).
- Home view with a read-only DataTable of buses, including available seats.
- Assignments view with a form to assign students to buses, validating district and sibling assignments.
- Page Not Found view for invalid routes.
- i18n support for English and Spanish.
- Built with PrimeVue (Material preset), PrimeFlex, PrimeIcons, VueRouter, Vue-i18n, and Axios.

## Author
- Name: Raúl Bellido Salas
- Student Code: u202310931

## Setup
1. Install dependencies: `npm install`
2. Run JSON-Server: `cd server && npx json-server --watch db.json --routes routes.json --port 3000`
3. Run Vite: `npm run dev`
4. Open `http://localhost:5173`

## Project Structure
- `crm/`: Student-related models and services.
- `public/`: General UI components and pages (Home, Not Found).
- `shared/`: Reusable components and services (e.g., language switcher).
- `transportation/`: Bus and assignment-related components, pages, models, and services.