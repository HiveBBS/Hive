# Software Requirements

## Vision

_What is the vision of this app?_

We want to create a bulletin board system. Users will be able to access a wide audience when posting items for sale, and can also subscribe to a variety of topics. When new posts are made within the subscribed topic, the user will receive a notification of the new posting.

## Scope (In/Out)

IN - _What will your app do?_

-   The app will allow users to:

    -   sign up using base64 authentication
    -   sign in using JWT authorization
    -   post messages/items for sale
    -   subscribe to a topic using socket.io

-   The app will provide basic CRUD functionality
-   Socket emit events will be triggered by new database posts
-   Only the user posting the item can delete them item from the board

OUT - _What will your app not do?_

-   This app will not process payment info to/from buyers/sellers
-   This app will not host addresses for shipping purposes
-   This app will not allow users to save posts

### Minimum Viable Product

The bulletin board system will allow a user to:

-   sign up
-   sign in
-   subscribe to a channel or topic to receive notifications
-   add an item for sale to a database that generates a message to subscribers

### Stretch Goals

-   Create multiple channels on a variety of topics
-   Post a message to a message board
-   Allow images to be included in message board postings
-   Send a direct message to another user

## Functional Requirements

1. User can sign up to create a profile
1. User can log in and log out of their profile
1. User can post, update, and delete items for sale

### Data Flow

<!-- Describe the flow of data in your application. Write out what happens from the time the user begins using the app to the time the user is done with the app. Think about the “Happy Path” of the application. Describe through visuals and text what requests are made, and what data is processed, in addition to any other details about how the user moves through the site. -->

<!-- ![item-search](./item-search-data-flow.png)

Item Search Data Flow

* Frontend: User's search data is collected and forwarded to the Backend API. User does not require authentication to search.
* Backend API: Requests search resources from a third-party API server.
* Backend API: Receives response resources from the third-party API server, transforms the shape into our domain model, adds a token to the data payload and returns the data to the Frontend.

![login](./login-data-flow.png)

Login Data Flow

* Frontend: User's login data is collected, hashed and securely sent to the Backend API. User does not require authentication to login.
* Backend: Queries the DB technology for User data matching the User's login credentials.
* Backend: Authenticates the User and sends a token to the Frontend.

![CRUD](./CRUD-item-data-flow.png)

CRUD Item Data Flow

* Frontend: User's item data is collected and forwarded to the Backend API. User requires authentication to use any Backend CRUD operations.
* Backend: Routes the request and prepares the resource for CRUD operations.
* Database: Based on the operation, the Database will CRUD the resource, returning success or failure to the Backend API.
* Backend: Returns a token and CRUD status code to the Frontend. -->

## Non-Functional Requirements

1. Security
   We will be adding authentication using base64, and authorization using JWT.

2. Testability
