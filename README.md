# Full CRUD React Application with API Integration and Local Storage/Redux

A project designed to demonstrate full CRUD operations in a React.js application. The app integrates with an external API, supports form handling, local storage (or Redux), and includes optimization using various React hooks.

---

## Task Overview

Create a React.js application that performs full CRUD operations (Create, Read, Update, Delete) on a list of users. The app should fetch initial data from an external API and allow users to perform CRUD actions on this data. Local changes should persist in the browser’s local storage or Redux.

---

## Requirements

### 1. Initial Data Fetch
- Use Axios to fetch a list of users from an external API (e.g., https://jsonplaceholder.typicode.com/users) on component mount.
- Store the fetched data using `useState`.
- Display data in a table with columns: **Name, Email, Phone, Actions (Edit/Delete)**.

### 2. Local Storage / Redux Integration
- After fetching data, save it in local storage (or Redux) using `useEffect`.
- On reload, load data from local storage if available, otherwise fetch from the API.
- Use `useState` and `useEffect` to manage and sync data.

### 3. Add New User
- Provide a form to add a new user with fields: **Name, Email, Phone**.
- Use `useReducer` to manage the form state.
- Add the new user to the list and update local storage.
- Clear form inputs after submission.

### 4. Edit User
- Implement an **Edit** button for each user row.
- Populate form with existing user data on edit click.
- Toggle between add and edit modes using `useState`.
- Update data in the list and local storage after editing.

### 5. Delete User
- Implement a **Delete** button for each user.
- Remove the user from the list and update local storage.
- Optimize rendering using `useMemo`.

### 6. Search Functionality
- Add a search bar to filter users by name.
- Use `useRef` to optimize the input field.
- Use `useCallback` to memoize the search function.

### 7. Error Handling
- Display meaningful messages for API fetch failures.
- Use `useState` for managing error state and render conditionally.

### 8. Custom Hook (Bonus)
- Create a reusable `useLocalStorage` hook for interacting with local storage.

---

## Bonus Features
- Follow best practices in React development.
- Implement form validation (e.g., required fields for Name and Email).
- Optimistic UI updates for editing/deleting.
- Redux implementation instead of local storage.

---

## Skills Demonstrated
- React Hooks (`useState`, `useEffect`, `useReducer`, `useRef`, `useMemo`, `useCallback`)
- Axios and API integration
- CRUD logic implementation
- Local Storage / Redux state persistence
- Form state management and validation
- Custom Hooks
- Performance optimization

---

> This project showcases a wide range of React.js capabilities and is ideal for demonstrating intermediate to advanced React proficiency.