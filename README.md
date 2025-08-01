# README.md

## Project Overview

This project is a web application that provides users with various features, including a dashboard, profile management, and settings customization.

## New Features

### Settings Page

A new settings page has been implemented, allowing users to customize their preferences and manage their account settings. This page includes a form for updating user settings and provides real-time feedback on changes.

### API Endpoint

A new API endpoint has been created to handle settings updates. This endpoint validates user inputs and ensures that changes are processed securely.

## API Documentation

### Update User Settings

- **Endpoint:** `/api/user/settings`
- **Method:** `POST`
- **Request Body:**
  
  {
    "settingKey": "value"
  }
  
- **Response:**
  - **200 OK:** Settings updated successfully.
  - **400 Bad Request:** Invalid input.
  - **500 Internal Server Error:** An error occurred while processing the request.

## Testing

Unit tests have been added for the new API endpoint and settings page to ensure proper functionality and error handling.

### Test Files
- `src/tests/api/user/settings.test.ts`: Unit tests for the settings API.
- `src/tests/dashboard/settings/page.test.tsx`: Integration tests for the settings page.
- `src/tests/dashboard/settings/SettingsForm.test.tsx`: Unit tests for the SettingsForm component.

## Usage

To run the application, clone the repository and install the dependencies:


git clone <repository-url>
cd <repository-directory>
npm install
npm run dev


Visit `http://localhost:3000` to access the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.