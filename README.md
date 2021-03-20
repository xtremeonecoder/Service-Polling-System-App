# Service Polling System - React Application

As a part of scaling the number of services running within a modern tech companies, people need a way to make sure that all the services are running smoothly. This is a simple service polling system that keeps a list of services, and periodically does a HTTP GET operation to each in the background and saves the response ("OK" or "FAIL"). Apart from the polling logic, the application also gets all the services visualised and easily managed in a basic UI presenting the all services together with their status as well as status modification date and time.

A simple React Application for managing different web services smoothly in large-scale tech companies. The application is developed on the top of Node.js environment using React Framework and other essential NPM Packages, such as - Lodash, @Hapi/Joi, React-Bootstrap, CoreUI and so forth. The application uses Axios Framework for connecting to Backend REST API, sending HTTP requests and receiving HTTP responses as a JSON data structure. It uses CoreUI Framework in the kernel.

## Technologies Used:

- Backend: Node.js RESTfull API: [**_Repo_**](https://github.com/xtremeonecoder/Service-Polling-System-Api)
- Frontend: Object Oriented Javascript
- Frontend: React
- Frontend: CoreUI Framework
- Frontend: Javascript Object Notation (JSON)
- Frontend: Axios (HTTP Client)
- Frontend: Redux (Statement Management)
- Frontend: Bootstrap
- Frontend: Font Awesome
- Frontend: CSS & SASS
- Frontend: HTML5

## Application Development and Testing Platform:

- Operating System: Windows
- Application Environment: Node.js (6.14.11 and 7.6.3)
- Tested on Local Development Server
- Application Built on Webpack
- Compiling Javascript Codes: Babel

## Application Features:

1. A comprehensive **_CRUD_** (Create, Retrieve, Update and Delete) panel for **_Web Services Management_**.

   - Data Table view of all the available **_Web Services_**.
   - Details view of a specific **_Web Service_**.
   - Create new **_Web Service_** feature.
   - Update existing **_Web Service_** feature.
   - Delete existing **_Web Service_** feature.

2. Added services and their polling status will be stored into the database, therefore when the server is restarted all the data will be kept.
3. An automated job/task will be running in the server background and polling all the services.
4. Default period for **_Service Poller_** is set to 30 seconds. You can change the period between 1 to 60 seconds using **_Settings Panel_**.
5. You can **_Start_** or **_Stop_** the **_Service Poller_** any time using **_Settings Panel_** (0 for stop, and 1 for start).
6. The background automatic job/task saves the polling status of the services into the database along with the date and time.
7. The background automatic job/task can be controlled from the frontend application using settings panel.
8. A comprehensive **_Settings Panel_** with handy features (Create, Retrieve and Update) for **_Service Polling Task Scheduler_**.

   - Data Table view of all the available **_Settings_**.
   - Details view of a specific **_Settings_**.
   - Automatically creates necessary **_Settings_** on installation.
   - Update existing **_Settings_** feature.

9. The results from the poller are not automatically shown to the user, rather user has to reload the **_Services Page_** to see results.
10. The application provides informative and nice looking animations on add/remove services enabling the popup notification and optimistic approach.
11. The application protects the poller from misbehaving services (i.e. answering really slowly, expected errors, unexpected errors, bad requests).
12. Service URL Validation ("sdgf" is probably not a valid service).
13. The application supports multi users functionalities. Users can register using their email.

    - Users have to register with the application before using it.
    - User cannot access to the application until they login.
    - Users can only see their own services.
    - Users cannot see the services added by another users.

## How to install the application:

1. Install node.js on your machine.
2. Clone the repository, then keep the folder somewhere in you machine.
3. Rename the directory as something like - **_service-poller-frontend_**.
4. CD to the directory of Backend API **_service-poller-api_**.
5. Open **_terminal_** or **_command-line_** window from the project root directory.
6. Run **_service-poller-api_** using **_terminal_** window (command: `npm start`).
7. CD to the directory of Frontend Application **_service-poller-frontend_**.
8. Or open **_terminal_** or **_command-line_** window from the project root directory.
9. Install the **_service-poller-frontend_** applications using following instruction:

   - First check your **_NPM Version_** using `npm -v`.
   - If your **_NPM Version_** is **_6.x.x_** or **_less than 7.x.x_**, use `npm install` for installing the application.
   - If your **_NPM Version_** is **_7.x.x_**, seems you are using **_Beta Version_**. In that case, using `npm install` will end you up with following unexpected peer dependency errors during installation. This is a problem in **_NPM Beta Version_**. But they have some tools for resolving that.

   ![NPM Beta Version Error During Installation](https://github.com/xtremeonecoder/Service-Polling-System-App/blob/master/documentation/installation-error.jpg)

   - In that case, use `npm install --legacy-peer-deps` for installing the application.
   - Check this article: [**_here_**](https://blog.npmjs.org/post/626173315965468672/npm-v7-series-beta-release-and-semver-major)
   - If you are using **_NPM Beta Version_**, another alternative is - you can downgrade your **_NPM_** to **_6.x.x_** using `npm install -g npm@6.14.11`.

10. The installation process may take several minutes, once installation finished.
11. Run **_service-poller-frontend_** using **_terminal_** or **_command-line_** window (command: `npm start`).
12. **_http://localhost/4000_** is the url for exploring the backend api.
13. **_http://localhost/3000_** is the url for exploring the frontend application.

## Application Dashboard

Once you are done with all the installation process, you will experience a frontend application **_Login Page_** as follows -

![Service Polling System - Login Page](https://github.com/xtremeonecoder/Service-Polling-System-App/blob/master/documentation/login-page.jpg)

User **_Registration Page_** as follows -

![Service Polling System - Registration Page](https://github.com/xtremeonecoder/Service-Polling-System-App/blob/master/documentation/register-page.jpg)

Once you login, you will get **_Application Dashboard_** as follows -

![Service Polling System - Dashboard](https://github.com/xtremeonecoder/Service-Polling-System-App/blob/master/documentation/application-dashboard.jpg)

Application **_Web Service List_** and **_Polling Results_** as follows -

![Service Polling System - Web Services](https://github.com/xtremeonecoder/Service-Polling-System-App/blob/master/documentation/web-services-page.jpg)

Add or Edit **_Web Service_** as follows -

![Service Polling System - Add/Edit Web Services](https://github.com/xtremeonecoder/Service-Polling-System-App/blob/master/documentation/service-add-edit.jpg)

Edit **_Application Settings_** as follows -

![Service Polling System - Edit Settings](https://github.com/xtremeonecoder/Service-Polling-System-App/blob/master/documentation/settings-page.jpg)
