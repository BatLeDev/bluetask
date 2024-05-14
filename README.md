<div align="center">

# BlueTask - A TODO list app

![Logo](https://github.com/BatLeDev/bluetask-webapp/blob/master/src/assets/logo.png)

</div>

[BlueTask](bluetask.batledev.com) is a powerful task management application designed to help you organize and keep track of your tasks efficiently. With a user-friendly interface and robust features, BlueTask ensures you never miss a deadline.

## Features
- **Create, Modify, Archive, and Delete Tasks:** Manage your tasks effortlessly with intuitive controls.
- **User Authentication:** Secure your tasks with a login and registration system.
- **Task Labels:** Organize tasks with customizable labels.
- **Trash Bin:** Recover accidentally deleted tasks from the trash bin.

## Project Background
BlueTask started as a project for a web development course, with the initial instructions found [here](https://matthieu495.gitlab.io/r4.a.10/section/tp4/). The goal was to create a TODO application using Vue.js, featuring:

- Task description
- Start and end dates
- Task status (To Do, In Progress, Completed)
- Task priority (High, Medium, Low)

The application needed to:

- Add tasks via a form
- Delete tasks with a delete button
- Display tasks based on their status, priority, start date, and end date
  
For more details on the initial project, visit: [Course Project](https://matthieu495.gitlab.io/r4.a.10/section/tp4/).


I decided to expand on this project to gain more experience in web development, including hosting, database management, and deployment. Choosing Vuetify for the CSS framework was a strategic decision to align with my previous work experience at [Koumoul](https://github.com/koumoul-dev), where I used Vuetify extensively. This decision also supported my future career plans, as I aimed to secure an work-study program at the same company, necessitating proficiency in Vuetify.

## Technologies Used
- **Firebase Firestore:** For database management
- **Vue.js:** The main framework.
- **Vuetify:** For the UI components.
- **Vuefire:** To integrate Firebase with Vue.js.

## Installation
1. **Create a Firestore Database:**
   - Set up a Firebase project and enable Firestore.
   - Copy the Firebase configuration details for Javascript.

2. **Environment Variables:**
   - Create a .env file in the project root with the following variables (given by Firebase)
```bash
VUE_APP_FIREBASE_API_KEY=your_api_key
VUE_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VUE_APP_FIREBASE_PROJECT_ID=your_project_id
VUE_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VUE_APP_FIREBASE_APP_ID=your_app_id
```

3. **Run in Development Mode:**
```bash
npm i
npm run dev
```

4. **Generate Production Files:**
```bash
npm run build
```

## Screenshots
Task List
Task Details
Add Task
Edit Task
Archive Task
Trash Bin

## Credits
- **Design:** Inspired by this [Figma design](https://www.figma.com/community/file/1336799126437101680) and [Google Keep](https://keep.google.com/u/0/#home).
- **Illustrations:** Provided by [Storyset](https://storyset.com).

BlueTask is a continuously evolving project, and I am open to feedback and suggestions.
Thank you for exploring [BlueTask](bluetask.batledev.com). Happy tasking!
