# Backend to support a blog

### Deploy

- I need to figure out a way to deploy this server while still using `PostGraphile`. 
- Currently this server is functioning as an express/knex api.

## Returning an array of comments with the post

- I need to figure out a way to join tables in a way that allows me to access the comments associated with the specific post
- The logic that i have right now doesn't quite work so i will need to figure this out

### **Routes**

- `/users`
- `/posts`
- `/posts/comments`

### **Tables**

- Users
- Posts (ref users)
- Comments (ref posts & users)

### **PostGraphile**

- Command
  - `postgraphile -c postgres://localhost:5432/relational-1`

