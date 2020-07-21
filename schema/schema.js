const graphql = require('graphql')
const User = require('../modules/user')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema, GraphQLInt } = graphql;

// const BookType = new GraphQLObjectType({
//     name: 'Book',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         genre: { type: GraphQLString },
//         author: {
//             type: AuthorType,
//             resolve(parent, args) {
//                 // return _.find(authors, {id: parent.authorId})
//                 return Book.findById(parent.authorId)
//             }
//         }
//     })
// })

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString }
    })
})

// const AuthorType = new GraphQLObjectType({
//     name: 'Author',
//     fields: () => ({
//         id: { type: GraphQLID },
//         age: { type: GraphQLInt },
//         name: { type: GraphQLString },
//         books: {
//             type: new GraphQLList(BookType),
//             resolve(parent, args) {
//                 // return _.filter(books, {authorId: parent.id })
//                 return Author.find({authorId: parent.id})
//             }
//         }
//     })
// })

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // book: {
        //     type: BookType,
        //     args: { id: {type: GraphQLID}},
        //     resolve(parent, args) {
        //         //code to get the data from db/other source\
        //         // return _.find(books, {id: args.id})
        //         return Book.findById(args.id)
        //     }
        // },
        // author: {
        //     type: AuthorType,
        //     args: { id: { type: GraphQLID}},
        //     resolve(parent,args) {
        //         // return _.find(authors, {id: args.id})
        //         return Author.findById(args.id)
        //     }
        // },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return User.findById(args.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                // return books
                return User.find({})
            }
        },
        // books: {
        //     type: new GraphQLList(BookType),
        //     resolve(parent, args) {
        //         // return books
        //         return Book.find({})
        //     }
        // },
        // authors: {
        //     type: new GraphQLList(AuthorType),
        //     resolve(parent, args) {
        //         // return authors
        //         return Author.find({})
        //     }
        // }
    }
})

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        // addAuthor: {
        //     type: AuthorType,
        //     args: {
        //         name: { type: GraphQLString },
        //         age: { type: GraphQLInt },
        //     },
        //     resolve(parent, args) {
        //         let author = new Author({
        //             name: args.name,
        //             age: args.age
        //         })
        //         return author.save()
        //     }
        // },
        addUser:{
            type: UserType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            resolve(parent, args) {
                let user = new User({
                    username: args.username,
                    password: args.password,
                    email: args.email
                })
                return user.save()
            }
        },
        login: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parent, args ) {
                const user = User.findOne({ username: args.username, password: args.password })
                return  user                       
            }
        }
        // addBook: {
        //     type: BookType,
        //     args: {
        //         name: { type: GraphQLString },
        //         genre: { type: GraphQLString },
        //         authorId: { type: GraphQLID }
        //     },
        //     resolve(parent, args) {
        //         let book = new Book({
        //             name: args.name,
        //             genre: args.genre,
        //             authorId: args.authorId
        //         })
        //         return book.save()
        //     }
        // }
    }
})

module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: mutation
})