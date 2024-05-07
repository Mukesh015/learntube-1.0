"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.features = void 0;
const typedef_1 = require("./typedef");
const resolvers_1 = require("./resolvers");
const queries_1 = require("./queries");
exports.features = { queries: queries_1.queries, typeDefs: typedef_1.typeDefs, resolvers: resolvers_1.resolvers };
