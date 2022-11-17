# Backend to support a blog

### Deploy

- I need to figure out a way to deploy this server while still using `PostGraphile`.
- Currently this server is functioning as an express/knex api.

## Returning an array of comments with the post

- I need to figure out how to properly select comment rows to return them as one query when getting all posts

- Currently the table is joined but the data isn't flowing how i'm expecting

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
