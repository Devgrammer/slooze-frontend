const API_BASE = import.meta.env.VITE_BASE_API_URLD ;


export const API_URLS = {
    // Authentication
    LOGIN: `${API_BASE}/auth/login`,
    REGISTER: `${API_BASE}/auth/register`,
    LOGOUT: `${API_BASE}/auth/logout`,
    IMAGEKIT_AUTH:`${API_BASE}/imagekit/auth`,

    // Products
    PRODUCTS: {
        ADD: `${API_BASE}/products/add-product`,
        BY_ID: `${API_BASE}/products/:id`,
        UPDATE: `${API_BASE}/products/:id`,
        DELETE: `${API_BASE}/products/:id`,
    }
}