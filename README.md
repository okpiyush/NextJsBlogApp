# Blog API 
<a href = "https://next-js-blog-app-nine.vercel.app/">Live Preview</a>

```markdown
This is the Blog API, a RESTful API built with Next.js and MongoDB for managing user authentication, blog posts, and comments. The API includes role-based access control, JWT-based authentication, and an intuitive CRUD interface for blogs and comments.

## Prerequisites

- **Node.js** and **npm** installed.
- **MongoDB** for data storage.
- **Postman** (optional) for API testing.
- Ensure the server runs on `http://localhost:3000` or modify as necessary.

---

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Setup](#project-setup)
- [API Endpoints](#api-endpoints)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Blog Endpoints](#blog-endpoints)
  - [Comment Endpoints](#comment-endpoints)
- [Conditional Rendering for UI Elements](#conditional-rendering-for-ui-elements)
- [Edit Modal for Blog Posts](#edit-modal-for-blog-posts)
- [Testing with Postman](#testing-with-postman)
- [License](#license)

---

```

## Docker


1. Step 1 
  ```bash
    docker build -t nextjsblogapp .
  ```

2. Step 2 (If you face a Problem in this step , Please use a different port id (3001:3001 or 4001:4001))
  ```bash
    docker run -p 3000:3000 nextjsblogapp
  ```

## Installation


1. Clone the repository:
   ```bash
   git clone https://github.com/okpiyush/NextJsBlogApp.git
   cd NextJsBlogApp
   ```

2. Install dependencies:

   ```bash
    npm install --legacy-peer-deps
   ```

3. Make the build for the file:

   ```bash
    npm run build
   ```
4. Start the server 
    ```bash
      npm start -- -p 3000
    ````
---


## Project Setup

- **Database**: MongoDB serves as the primary database, storing user data, blogs, and comments.
- **Authentication**: JWT-based, with tokens required for accessing certain endpoints.
- **Role-Based Access Control**: Users with specific roles (e.g., 'admin') have additional permissions.

---

## Enviornment Setup
- **.env**: Store sensitive information like MongoDB URI, JWT secret key, and other environment-specific
- make a `.env` file inside the application
- add the below Enviornment Variables in it

  ```
  MONGODB_URL=mongodb+srv://Piyush:SlcAzhReC1wU0iY4@cluster0.nifprd1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 

  JWT_SECRET=ThisIsMySecret
  ``` 


## API Endpoints

### Authentication Endpoints

- **`POST /api/login`**  
  Logs in a user.
  ```json
  {
    "username": "Piyush",
    "password": "PiyushIsGreat"
  }
  ```

- **`POST /api/registration`**  
  Registers a new user.
  ```json
  {
    "username": "PiyushTest1",
    "password": "Piyush"
  }
  ```

### Blog Endpoints

- **`GET /api/blogs/get-blogs`**  
  Retrieves all blogs.

- **`POST /api/blogs/add-blogs`**  
  Adds a new blog for the logged-in user.
  ```json
  {
    "title": "This is my first blog",
    "content": "This is the content to my blog",
    "token": "user_jwt_token"
  }
  ```

- **`GET /api/blogs/get-blog?id=x`**  
  Retrieves a single blog based on the blog ID (`id` query parameter).

- **`DELETE /api/blogs/delete-blog`**  
  Deletes a specific blog. Requires authorization.
  ```json
  {
    "id": "6728be19588efc769bc98e31",
    "token": "user_jwt_token"
  }
  ```

- **`PUT /api/blogs/update-blog`**  
  Updates an existing blog.
  ```json
  {
    "id": "6728be19588efc769bc98e31",
    "title": "Updated Title",
    "content": "Updated Content",
    "token": "user_jwt_token"
  }
  ```

### Comment Endpoints

- **`POST /api/comment/add-comment`**  
  Adds a comment to a blog.
  ```json
  {
    "comment": "This is such a good read",
    "commentOf": "6729b35d7f8b8996884eb33e",
    "token": "user_jwt_token"
  }
  ```

- **`PUT /api/comment/update-comment`**  
  Updates an existing comment.
  ```json
  {
    "id": "6729cc96b6bf6527c24e4583",
    "comment": "Updated the content",
    "token": "user_jwt_token"
  }
  ```

---

## Conditional Rendering for UI Elements

To conditionally render the 'Edit' and 'Delete' buttons on the blog platform:

- **Edit Button**: Shown only if the user ID in local storage matches the `belongs` field in the blog API response.
- **Delete Button**: Rendered if:
  - The user is the owner of the blog (based on ID match).
  - OR the user has an `admin` role.

---

## Edit Modal for Blog Posts

To enable editing of blog posts:
1. Add an **Edit Modal overlay** component.
2. Populate the modal with the existing content of the selected blog post.
3. Allow users to modify and save changes.

---

## Testing with Postman

This API can be tested using Postman. Import the provided Postman JSON collection file and use the predefined requests for testing.

### Postman Collection Example

```json
{
	"info": {
		"_postman_id": "37aa6406-9929-424c-ad10-a72bf8620215",
		"name": "Blog API Test Suite",
		"schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json"
	},
	"item": [
		{
			"name": "Login 1",
			"request": {
				"method": "POST",
				"url": "http://localhost:3000/api/login",
				"body": {
					"mode": "raw",
					"raw": "{ \"username\":\"Piyush\", \"password\": \"PiyushIsGreat\" }"
				}
			}
		},
		{
			"name": "Get All Blogs",
			"request": {
				"method": "GET",
				"url": "http://localhost:3000/api/blogs/get-blogs"
			}
		},
		// Additional requests are included in the collection
	]
}
```

---

## License

This project is licensed under the MIT License.
```

---

This `README.md` file covers setup, configuration, API details, and Postman testing instructions Let me know if there’s anything else you’d like added or modified!