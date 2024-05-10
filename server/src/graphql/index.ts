import { ApolloServer } from '@apollo/server';
import { User } from './user';
import { features } from './features';
async function creategraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            ${User.typeDefs}
            ${features.typeDefs}
            type Query{
                ${User.queries}
                ${features.queries}
            }
      
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
                ...features.resolvers.queries
            },
            

        },
        introspection: process.env.NODE_ENV !== 'production'
    });

    await gqlServer.start();
    return gqlServer;
}

export default creategraphqlServer;