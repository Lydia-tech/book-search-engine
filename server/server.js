const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors');
// require('dotenv').config();

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
// 	const app = express();
// 	app.use(express.urlencoded({ extended: false }));
// 	app.use(express.json({ limit: '2mb' }));
// 	app.use(cors());
// 	const server = new ApolloServer({
// 		typeDefs,
// 		resolvers,
// 		context: authMiddleware
// 	});

// 	server.applyMiddleware({ app, path: '/api' });
// 	if (process.env.NODE_ENV === 'production') {
// 		app.use(express.static(path.join(__dirname, '../client/build')));
// 	}
// 	app.get('*', (req, res) => {
// 		res.sendFile(path.join(__dirname, '../client/build/index.html'));
// 	});
// 	db.once('open', () => {
// 	app.listen(process.env.PORT, () => {
// 		console.log(`API server running on port ${process.env.PORT}!`);
// 		console.log(`Use GraphQL at http://localhost:${process.env.PORT}${server.graphqlPath}`);
// 	})
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 3001;
const app = express();
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware
});

server.applyMiddleware({ app, path: '/api' });

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '2mb' }));
app.use(cors());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
	app.listen(PORT, () => {
		console.log(`API server running on port ${PORT}!`);
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
});
