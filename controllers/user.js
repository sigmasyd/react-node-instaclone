const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (user,SECRET_KEY,expiresIn) => {
	const {id, name, email, username} = user;
	const payload = {id,name,email,username};
	return jwt.sign(payload,SECRET_KEY,{expiresIn});
}

const register = async (input) => {
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
	const salt = await bcryptjs.genSaltSync(10);
	newUser.password = await bcryptjs.hash(password,salt);

	try{
		const user = new User(newUser);
		user.save();
		return user;
	} catch(error){
		console.log(error);
	}

	console.log("Registrando usuarios",newUser,foundEmail);
	return null;
};

const login = async (input) => {
	const {email,password} = input;
	//console.log(`Email ${email} y pwd: ${password}`);
	const userFound = await User.findOne({email: email.toLowerCase()});
	if(!userFound) throw Error("Error en el email o contraseña");

	const passwordSuccess = await bcryptjs.compare(password,userFound.password);
	if(!passwordSuccess) throw new Error("Error en el email o contraseña");

	return {
		token: createToken(userFound,process.env.SECRET_KEY,"24h")
	}
}

module.exports = {
	register,
	login,
}