# Project logs:

### Project setup:

#### Backend:

-   Sanity install and setup (schemas)
-   Google OAuth setup
-   Sanity tokens & CORS setup

#### Frontend:

-   React project setup
-   Tailwinds install and setup

### Implementation:

#### Home, Sidebar and Navbar components:

Project folder structure setup & components creation

-   Home
    -   Adding Pin component...
    -   ....routes to user profile and pins
    -   Sidebar toggle and responsive design
-   Sidebar
    -   Adding categories...
    -   ...and navigation to categories
-   Navbar
    -   Creation of a searchbar input
    -   Adding site logo and user icons
    -   Responsive design

#### Feed View:

-   Feeding the view with content
-   querying based on category select...
-   ...or fetching all

#### Pin Component:

-   Adding events to pin (hover, click)
-   Added:
    -   download button
    -   save button
    -   delete button
    -   link to destination
    -   user image, name
-   Implementing functionalities:
    -   download, save, delete
    -   link to user profile

#### Create Pin:

-   Added input fields for pin creation
-   Implemented pin creation

#### Pin Details:

-   Fetching pin from Sanity
    -   show Spinner while fetching or pin doesn't exist...
    -   ... else show pin
-   Adding details:
    -   download button
    -   destination link
    -   title, about, posted by
    -   (?) no save option yet (?)
-   Adding comment section:
    -   showing comments written
    -   input field / posting button
-   Fetching more pins from same category (else show spinner)

#### User Profile:

-   Added random banner image...
    -   ...user name & pic...
    -   ...logout button & function.
-   Fetching user created/saved pins

#### Search and Categories:

-   Replaced initial (temporary) categories with "production" ones
-   Populating Feed page based on categories
-   Completing Search component:
    -   Retrieving search term...
    -   ...populating search page

#### Deployment:

-   Creating production build:
    -   "npm run build" in react project (frontend)
-   Using netlify:
    -   Added CORS origin in sanity
    -   ...app url in google credentials
-   Fixed user = null and redirect to login page
-   <a href="https://shareme-xwd.netlify.app/">Enjoy !</a>

---
