# [Minimal Library Management System 📚](https://soft-fenglisu-ae0089.netlify.app/)

A minimal, client-side **Library Management System** built with **React**, **TypeScript**, **RTK Query (Redux Toolkit Query)** and **Tailwind CSS** (or plain CSS).  
This project demonstrates clean state management, a simple REST API integration, and a responsive minimalist UI to view/manage books and handle borrowing — **no authentication** required.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Pages / Routes](#pages--routes)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Contract (Suggested)](#api-contract-suggested)
- [Data Models (TypeScript)](#data-models-typescript)
- [UI / UX Notes](#ui--ux-notes)
- [Bonus / Optional Features](#bonus--optional-features)
- [Folder Structure Suggestion](#folder-structure-suggestion)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview
Build a lightweight library system where users can:
- View a list of books (table)
- Add, edit, and delete books
- Borrow books (manage copies and availability)
- View a borrow summary (aggregated totals per book)

The app interacts with a RESTful API for persistence and uses **RTK Query** for fetching/mutations and cache management.

---

## Features
### 1. Public Routes 🚀
All routes are publicly accessible — no login or auth.

### 2. Book Management 🛠️
- **Book List Table** with columns:
  - Title | Author | Genre | ISBN | Copies | Availability | Actions
- **Actions**:
  - Edit (open form, update via API, refresh UI)
  - Delete (confirmation dialog)
  - Borrow (open borrow form)
  - Add New Book (opens create form)
- **Business logic**:
  - `available` toggles or auto-calculated: if `copies === 0` → `available = false`
  - Create/Update/Delete should reflect instantly using RTK Query invalidation or optimistic updates

### 3. Borrow Book
- Borrow form fields:
  - Quantity (number, must be ≤ available copies)
  - Due Date (date)
- On successful borrow:
  - Deduct copies via API
  - If copies → 0, mark unavailable
  - Redirect to borrow summary and show success toast

### 4. Borrow Summary
- Aggregated list of borrowed books:
  - Book Title | ISBN | Total Quantity Borrowed
- Retrieved from an aggregation endpoint on server (or aggregated client-side if API doesn’t provide)

---

## Pages / Routes
Use React Router or similar.
