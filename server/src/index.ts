import express, { Request, Response } from 'express';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import cors from "cors";
import bodyParser from 'body-parser';
import axios from 'axios';
import UserRouter from './routes/static';
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

async function init() {
    const DB: string | undefined = process.env.DB;
    const PORT: string | undefined = process.env.PORT;
    if (!DB || !PORT) {
        console.error("Environment variables DB and PORT must be provided.");
        return;
    }

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String!
                say(args: String): String!
                isCreator(usernameToFind: String!): Boolean!
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello World!',
                say: (_: any, { args }: any) => `Hello ${args}! how are you`,
                isCreator: async (_: any, { usernameToFind }: { usernameToFind: string }) => {
                    try {
                        const response = await axios.post('http://localhost:9063/api/getuserdetails', {
                            usernameToFind: usernameToFind
                        });
                        const userData = response.data;
                        if (userData && userData.length > 0) {
            
                            return userData[0].isCreator;
                        } else {
                            throw new Error('User not found');
                        }
                    } catch (error) {
                        console.error('Error fetching isCreator:', error);
                        throw new Error('Error fetching isCreator');
                    }
                }
            }
        }
    });
    

    await gqlServer.start();
    app.use("/graphql", expressMiddleware(gqlServer));
    app.use("/api", UserRouter);
    try {
        await mongoose.connect(DB);
        console.log("DB connected");
    } catch (error) {
        console.log("DB connection failed", error);
    }

    app.listen(PORT, () => {
        console.log(`server is running on http://localhost:${PORT}`);
    });
}

init();