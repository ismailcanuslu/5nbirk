export function storeAuthState(auth) {
    localStorage.setItem('auth', JSON.stringify(auth));
}

export function storeToken(token) {
    if (token) {
        localStorage.setItem('token', JSON.stringify(token));
    } else {
        localStorage.removeItem('token');
    }
}

export const loadAuthState = async () => {
    const defaultState = { id: 0 };
    const authStateInStorage = localStorage.getItem('auth');

    if (authStateInStorage) {
        try {
            return JSON.parse(authStateInStorage);
        } catch {
            return defaultState;
        }
    }

    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
    const tokenCookie = cookies.find(cookie => cookie.startsWith("5nbirk-token="));

    if (tokenCookie) {
        const token = tokenCookie.split("=")[1];


        const response = await fetch("api/verify-token", {
            method: "GET",
            headers: {
                Authorization: `AnyPrefix ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const user = await response.json();
            storeAuthState(user);
            return { token, user };
        }
    }

    return null;
};
