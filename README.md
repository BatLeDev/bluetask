<div align="center">

# BlueTask - A TODO list app

[![Logo](https://github.com/BatLeDev/bluetask/blob/master/src/assets/logo.png)](http://bluetask.batledev.com)

</div>

[BlueTask](bluetask.batledev.com) is a powerful task management application designed to help you organize and keep track of your tasks efficiently. With a user-friendly interface, BlueTask ensures you never forget an important task.

## Features

- **Create, Modify, Archive, and Delete Tasks:** Manage your tasks effortlessly with intuitive controls.
- **User Authentication:** Secure your tasks with a login and registration system.
- **Task Labels:** Organize tasks with customizable labels.
- **Trash Bin:** Recover accidentally deleted tasks from the trash bin.

## Initial Project

BlueTask started as a project for a web development course. The initial requirements were to create a TODO application with various functionalities, such as task description, start and end dates, status, and priority management.
  
For more details on the initial project, visit: [Course Project](https://matthieu495.gitlab.io/r4.a.10/section/tp4/).

## Project Expansion

I decided to expand on this project to gain more experience in web development, including:

- **Hosting**
- **Deployment**
- **Database management**

Choosing **Vuetify** for the CSS framework was a strategic decision because:

- I had prior experience with Vuetify at [Koumoul](http://https://koumoul.com/), where I used it extensively.
- It supported my future career plans, as I aimed to secure a work-study program at the same company, necessitating proficiency in Vuetify.

## Mobile App

For another course project, I developed a mobile android application. The app was a simplified version of BlueTask, focusing on task management and user authentication. You can find the project [here](https://github.com/BatLeDev/bluetask-android)

## TODO

- [ ] **Long Tasks:** Support tasks with a lot of lines.
- [ ] **Task Search:** Search tasks by name.
- [ ] **Task Sharing:** Share tasks with other users.

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

...coming soon

## Credits

- **Design:** Inspired by this [Figma design](https://www.figma.com/community/file/1336799126437101680) and [Google Keep](https://keep.google.com/u/0/#home).
- **Illustrations:** Provided by [Storyset](https://storyset.com).

BlueTask is a continuously evolving project, and I am open to feedback and suggestions.  
Thank you for exploring [BlueTask](bluetask.batledev.com). Happy tasking!
