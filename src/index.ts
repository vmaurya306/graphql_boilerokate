import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import path from "path";
import { typeDefs } from "./graphql/schema/typedefs";
import { resolvers } from "./graphql/resolver";
import { connectToDatabase } from "./config/connection";


const startServer = async () => {
  const router = express();
  router.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));

  const publicPath = path.join(__dirname, "public");
  router.use(express.static(publicPath));
  /** Error handling */
  router.use(express.json());
  router.use((req, res, next) => {
    next();
  });

  await connectToDatabase('mongodb://localhost:27017/graphql-boilerplate').then(() => {
   console.log("Database Connected")
  });
  
  const httpServer = http.createServer(router);

  const server: any = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  router.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json({ limit: "50mb" }),
    expressMiddleware(
      server,
      {
        context: async ({ req, res }) => {
       return {
           abc: "abc",
       };
        },
      }
    )
  );

  await new Promise<void>((resolve) =>
    httpServer.listen(
      {
        port: 4721,
      },
      resolve
    )
  );
  // tslint:disable-next-line
  console.log("🚀 Server ready at http://localhost:4721/");
};
startServer();
