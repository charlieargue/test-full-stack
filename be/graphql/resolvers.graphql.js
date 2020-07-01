const { UserInputError } = require('apollo-server')
const User = require('../models/user')

const resolvers = {
    Query: {
        allUsers: () => {
            return User.find({})
        },
        filteredUsers: async (root, args) => {
            try {
                return await User.find({
                    $or: [
                        {
                            "name": {
                                "$regex": args.search || "",
                                "$options": "i"
                            },
                        },
                        {
                            "address": {
                                "$regex": args.search || "",
                                "$options": "i"
                            },
                        },
                        {
                            "description": {
                                "$regex": args.search || "",
                                "$options": "i"
                            },
                        }
                    ]
                })
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

        },
    },
    Mutation: {
        createUser: async (root, args) => {
            const user = new User({
                name: args.name,
                address: args.address,
            })
            try {
                return await user.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        editUser: async (root, args) => {
            const user = await User.findOne({ _id: args.id })
            user.name = args.name
            user.address = args.address
            user.description = args.description

            try {
                return await user.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        deleteUser: async (root, args) => {
            const user = await User.findOne({ _id: args.id })
            try {
                return await user.remove()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
    }
}

module.exports = resolvers