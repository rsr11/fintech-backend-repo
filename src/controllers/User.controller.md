# User.controller.js

Brief documentation for the `UserRegistration` controller exported from `src/controllers/User.controller.js`.

**File**: [src/controllers/User.controller.js](src/controllers/User.controller.js)

**Summary**: This controller provides a single exported async handler `UserRegistration` used to register a new user. It reads `name`, `email`, and `password` from the request body, checks for an existing user by email, and creates a new `User` document when none exists.

**Exported functions**:
- `UserRegistration(req, res, next)`:
  - Purpose: Register a new user.
  - Dependencies: imports `User` (Mongoose model) from `src/models/User.model.js`.
  - Behavior:
    - Extracts `name`, `email`, and `password` from `req.body`.
    - Calls `User.findOne({ email })` to check for existing users.
    - If a user already exists, responds with HTTP 409 and JSON `{ msg: "User already exist!" }`.
    - If no user exists, calls `User.create({ name, email, password })` and responds with HTTP 202 and the created user's `name` and `email`.
    - Errors are currently logged to console inside the `catch` block; no error response is explicitly returned to the client.

**Request**:
- Method: `POST`
- Example route mount: `route.post('/registration', UserRegistration)` (see `src/routes/auth.route.js`).
- Expected JSON body:

```json
{
  "name": "Alice Example",
  "email": "alice@example.com",
  "password": "Secur3P@ssw0rd"
}
```

**Responses**:
- `202 Accepted` — registration accepted; response body: `{ "name": "Alice Example", "email": "alice@example.com" }`.
- `409 Conflict` — user already exists; response body: `{ "msg": "User already exist!" }`.
- `5xx` — on unexpected errors the controller currently only logs the error (no error response sent). In practice, the handler should return a `500` or call `next(error)`.

**Example (curl)**:

```bash
curl -X POST http://localhost:3000/registration \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"Secur3P@ss"}'
```

**Notes & Suggested Improvements**:
- The controller should `return` after sending the `409` response to avoid continuing execution.
- Use `res.status(201).json(...)` instead of `202` when creating a resource (201 = Created).
- Add input validation (e.g., Joi or express-validator) to verify `name`, `email`, and `password` before database calls.
- Improve error handling: in `catch` call `next(error)` or send a proper `500` response with a safe error message.
- Avoid sending raw errors to clients; log server-side errors and return generic messages.
- Consider returning a JWT or session info after successful registration if the app requires immediate authentication.
- Ensure unique index on the `email` field in `User.model.js` to enforce uniqueness at DB level.

**Model notes**:
- Password hashing is handled in `src/models/User.model.js` via a `pre('save')` hook that salts and hashes `password` with `bcrypt`.

---

If you want, I can update the controller with the suggested improvements (validation, proper responses, and error handling).
