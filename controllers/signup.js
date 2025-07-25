import usersModel from "../models/user.js"

async function makeAUser(req,res,next){
	if(req.body.fullName, req.body.email, req.body.password){
    const user = await usersModel.find({email: req.body.email})
    if(user.length!=0){res.render('info',{info:"Error: Duplicate Email",msg:"This email already exists, if yours kindly go to login (click me)...",href:"/auth/login"})}
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
