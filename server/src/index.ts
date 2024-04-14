import express, { Request, Response } from 'express';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import cors from "cors";
import bodyParser from 'body-parser';
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
        }`,
        resolvers: {
            Query: {
                hello: () => 'Hello World!',
                say: (_: any, { args }: any) => `Hello ${args}! how are you`
            }
        }
    });

    await gqlServer.start();
    app.get('/', (req: Request, res: Response) => {
        res.json({ message: "Server is up and running" });
    });

    app.use("/graphql", expressMiddleware(gqlServer));
    app.use("/", UserRouter);

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