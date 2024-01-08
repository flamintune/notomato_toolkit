const DB = require('./db.json')
const { saveToDatabase } = require('./utils')

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         username:
 *           type: string
 *           example: johndoe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         password:
 *           type: string
 *           example: s3cr3tp4ssw0rd
 *         createdAt:
 *           type: string
 *           example: 1/1/2024, 10:00:00 AM
 *         updatedAt:
 *           type: string
 *           example: 1/1/2024, 10:00:00 AM
 */

// Get all users
const getAllUsers = () => {
    try {
        return DB.users
    } catch (error) {
        throw { status: 500, message: error }
    }
}

// Get one user by ID
const getOneUser = userId => {
    try {
        const user = DB.users.find(user => user.id === userId)
        if (!user) {
            throw {
                status: 404,
                message: `Can't find user with the id '${userId}'`,
            }
        }
        return user
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }
}

// Create a new user
const createNewUser = newUser => {
    try {
        const isEmailTaken = DB.users.some(user => user.email === newUser.email)
        if (isEmailTaken) {
            throw {
                status: 400,
                message: `Email '${newUser.email}' is already taken`,
            }
        }
        newUser.id = generateUniqueId(); // Replace with your ID generation logic
        newUser.createdAt = new Date().toLocaleString()
        newUser.updatedAt = new Date().toLocaleString()
        DB.users.push(newUser)
        saveToDatabase(DB)
        return newUser
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }
}

// Update a user by ID
const updateOneUser = (userId, changes) => {
    try {
        const indexForUpdate = DB.users.findIndex(user => user.id === userId)
        if (indexForUpdate === -1) {
            throw {
                status: 404,
                message: `Can't find user with the id '${userId}'`,
            }
        }
        const updatedUser = {
            ...DB.users[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString(),
        }
        DB.users[indexForUpdate] = updatedUser
        saveToDatabase(DB)
        return updatedUser
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }
}

// Delete a user by ID
const deleteOneUser = userId => {
    try {
        const indexForDeletion = DB.users.findIndex(user => user.id === userId)
        if (indexForDeletion === -1) {
            throw {
                status: 404,
                message: `Can't find user with the id '${userId}'`,
            }
        }
        DB.users.splice(indexForDeletion, 1)
        saveToDatabase(DB)
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error }
    }
}

//todo use uuid to generate id
function generateUniqueId() {
    return 'xxx-xxx-xxx'.replace(/[x]/g, () => {
        return Math.floor(Math.random() * 16).toString(16);
    });
}

module.exports = {
    getAllUsers,
    createNewUser,
    getOneUser,
    updateOneUser,
    deleteOneUser,
}