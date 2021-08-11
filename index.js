const mongoose = require('mongoose');
const {ApolloServer} = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolver");

require("dotenv").config({path: ".env"});

mongoose.connect(process.env.BBDD,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: true,
	useCreateIndex: true,
},(err,_)=>{
	if(err){
		console.log("Error de conexion");
	}else{
		console.log("Conexion correcta");
		server();
	}
});

function server(){
	const serverApollo = new ApolloServer({typeDefs,resolvers});

	serverApollo.listen().then(({url})=>{
		console.log("##########################");
		console.log(`Servidor ON: ${url}`);
		console.log("##########################");
	});
}