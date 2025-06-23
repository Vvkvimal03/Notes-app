# 📝 Notes Application

A simple and modern notes app built with **React 19**, **Tailwind CSS**, and **Context API**, featuring secure user login and full CRUD (Create, Read, Update, Delete) operations. Notes are stored in `localStorage` and displayed in a sleek, responsive interface using **MUI DataGrid**.

---

## ✨ Features

### 🔐 Authentication
- Login using email and password
- Validations powered by `react-hook-form` and `yup`
- Token storage in `localStorage` for persistent sessions
- Protected routes using `react-router-dom`
- Logout support with session clear

### 🗂️ Notes Management
- View notes in a table (powered by MUI DataGrid)
- Create new notes using a modal form
- Edit notes with pre-filled data
- Delete notes with confirmation dialog
- Data is stored and retrieved from `localStorage`
- Sample notes auto-loaded on first visit

### 🎨 UI/UX
- Fully responsive layout styled with **Tailwind CSS**
- Smooth interactions and clean, intuitive design
- Loading indicators and form validations
- Confirmation modals for delete actions

---

## 🛠 Tech Stack

| Tech             | Usage                         |
|------------------|-------------------------------|
| React 19         | UI & Component logic          |
| Tailwind CSS     | Primary styling framework     |
| MUI DataGrid     | Tabular notes display         |
| react-hook-form  | Form handling                 |
| yup              | Schema-based validation       |
| Context API      | Global auth state             |
| react-router-dom | Routing and route protection  |
| localStorage     | Persistent notes & auth data  |

---

## Demo Credentials

Use the following credentials to log in:

Email: user@example.com
Password: password123