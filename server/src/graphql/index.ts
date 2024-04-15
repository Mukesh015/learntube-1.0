import { ApolloServer } from '@apollo/server';
import { User } from './user';
async function creategraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            ${User.typeDefs}
            type Query{
                ${User.queries}
            }
      
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },

        },
    });

    await gqlServer.start();
    return gqlServer;
}

export default creategraphqlServer;