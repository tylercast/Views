const fs = require('fs');
const path = require('path');

const USERS_DB = path.join(__dirname, '..', 'users.json');

function registerUser(email, name, password) {
    const users = JSON.parse(fs.readFileSync(USERS_DB, 'utf-8'));

    // Check if email already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        return { success: false, message: "Email already registered." };
    }

    // Create new user object
    const newUser = { email, name, password };
    users.push(newUser);

    // Save updated users
    fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2));

    return { success: true };
}

module.exports = {
    registerUser
};
function authenticateUser(email, password) {
    const users = JSON.parse(fs.readFileSync(USERS_DB, 'utf-8'));

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        return { success: true, user };
    } else {
        return { success: false };
    }
}

module.exports = {
    registerUser,
    authenticateUser
};
