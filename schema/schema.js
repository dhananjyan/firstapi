const {
    GraphQLDateTime
  } = require('graphql-iso-date')
const graphql = require('graphql')
const User = require('../modules/user')
const Event = require('../modules/event')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema, GraphQLInt, GraphQLBoolean } = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString }
    })
})

  
const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        start: { type: GraphQLDateTime },
        end: { type: GraphQLDateTime },
        allDay: { type: GraphQLBoolean },
        provider: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return Event.findById(parent.userId)
            }
        }
    })
})
const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
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
        event: {
            type: EventType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return Event.findById(args.id)
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                // return books
                return Event.find({})
            }
        },
    }
})

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
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
        },
        addEvent: {
            type: EventType,
            args: {
                title: { type: GraphQLString },
                start: { type: GraphQLDateTime },
                end: { type: GraphQLDateTime },
                allDay: { type: GraphQLBoolean },
                provider: { type: GraphQLString },
                userId: { type: GraphQLID }
            },
            resolve(parent,args) {
                let event = new Event({
                    title: args.title,
                    start: args.start,
                    end: args.end,
                    allDay: args.allDay,
                    provider: args.provider,
                    userId: args.userId
                })
                return event.save()
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: mutation
})