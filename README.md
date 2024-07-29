# Yoga Canvas

**Yoga Canvas** is a React-based application that allows users to create, and manage customized yoga lesson plans. Users can add poses, organize them into lists, and reorder them as needed. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features
* **Add Asanas:** Users can search and add yoga poses to their lesson plans.

* **Manage Lists:** Users can create multiple lists for different lesson plans, reorder poses within lists, and remove poses or entire lists.

* **Toggle Asana Names:** Users can toggle the visibility of asana names.

* **Dynamic Pose Loading:** The app dynamically loads poses and their corresponding SVG images from a JSON list.

## Project Status and Future Plans

Although this project is currently functional, it is still being actively updated and improved. Planned updates include:

* **UI Optimization:** Enhancing the user interface for a more seamless experience.

* **Additional Poses:** Adding more asanas for a wider variety of poses.

* **New Features:** Implementing additional features based on user feedback and suggestions.

## Built with
* [ReactJS](https://react.dev/) - A JavaScript library for building user interfaces

* [Framer Motion](https://www.framer.com/motion/) - A library used to implement drag-and-drop functionality

## Setup

Follow these steps to run **Yoga Canvas** on your machine.

### Prerequisites

* [Node.js](https://nodejs.org/en)
* npm (Node Package Manager)

### Installation

1. Clone the repository:
```git clone https://github.com/lseegets/yoga-canvas.git```

2. Navigate to the project directory:
```cd yoga-canvas```

3. Install the dependencies:
`npm install`

4. Start the development server:
`npm start`

## Usage

### Managing Poses

* **Create New List** Click the "New List" button to create a new list for a new lesson plan.

* **Search and Add Poses** Use the search bar to find and add poses to your active list.

* **Reorder Poses:** Drag and drop poses within a list to reorder them.

* **Toggle Button:** Use the toggle button to show or hide pose names.

* **Remove Poses:** Click the "×" button on a pose to remove it from the list.

### Managing Lists

* **Set Active List:** Click on a list header to set it as the active list.

* **Rename Lists:** Click on the list name to make it editable and type the new name.

* **Toggle Button:** Use the toggle button to show or hide list names.

* **Remove Lists:** Click the "×" button on a list to remove the entire list.
