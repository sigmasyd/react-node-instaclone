const User = require("../models/user");

const resolvers = {
	Query: {
		// User
		getUser: ()=>{
			console.log("Obteniendo usuario");
			return null;
		}
	},
	Mutation: {
		// User
		register: async (_,{input})=>{
			const newUser = input;
			newUser.email = newUser.email.toLowerCase();
			newUser.username = newUser.username.toLowerCase();

			const {email,username,password} = newUser;

			// Revisamos si email esta en uso
			const foundEmail = await User.findOne({email});  // {username} == {"username":username}
			if(foundEmail) throw new Error("El email ya esta en uso");

			// Revisamos si el username esta en uso
			const foundUsername = await User.findOne({username}); // {username} == {"username":username}
			if(foundUsername) throw new Error("Usuario ya esta en uso");

			// Encriptar password

			try{
				const user = new User(newUser);
				user.save();
				return user;
			} catch(error){
				console.log(error);
			}

			console.log("Registrando usuarios",newUser,foundEmail);
			return null;
		}
	}
}

module.exports = resolvers;