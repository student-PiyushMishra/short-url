import usersModel from "../models/user.js"

async function makeAUser(req,res,next){
	if(req.body.fullName, req.body.email, req.body.password){
          await usersModel.create({
		fullName: req.body.fullName,
		email: req.body.email,
		password: req.body.password
	  })
	  next();
	}
 	return null;
}

export default makeAUser;
