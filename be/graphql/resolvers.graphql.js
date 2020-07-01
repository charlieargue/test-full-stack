const { UserInputError } = require('apollo-server')
const User = require('../models/user')

const resolvers = {
    Query: {
        allUsers: () => {
            return User.find({})
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