export const userService = {
    login,
    logout,
    checkAuth,
};

function login(email, password) {
    // let error;
    if (!(email && password)) {
        return;
    }
    if (localStorage.getItem(email)) {
        if (password === localStorage.getItem(email)) {
            localStorage.setItem('authorized', 'yes');
            return true;
        } else {
            throw new Error('You entered an incorrect password');
        }
    } else {
        let promptData = window.confirm(`The user you specified was not found\nWant to create this user?`);
        if (promptData) {
            localStorage.setItem('authorized', 'yes');
            localStorage.setItem(email, password);
            return true;
        }
    }
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('authorized');
    return true;
}

function checkAuth() {
    return localStorage.getItem('authorized') === 'yes';
}