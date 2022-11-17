# Backend to support a blog

### Deploy

- I need to figure out a way to deploy this server while still using `PostGraphile`. 
- Currently this server is functioning as an express/knex api.

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

