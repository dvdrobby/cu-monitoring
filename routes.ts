/**
 * Redirect route
 * @type string
 */
export const DEFAULT_LOGIN_REDIRECT = "/"

/**
 * An Array of routes that are accessible to the public
 * These route do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/login"
]

/**
 * An Array of routes that are accessible only for admin
 * These route require authentication as admin
 * @type {string[]}
 */
export const adminRoutes = [
    "/users",
    "/users/role"
]

/**
 * An Array of routes that used for authentication
 * These route will redirect user to /
 * @type {string[]}
 */
export const authRoutes = [
    "/login"
]

/**
 * The prefix for API endpoint
 * Route that start with this prefix are used for API endpoint
 * @type {string}
 */
export const apiPrefix = "/api/"

