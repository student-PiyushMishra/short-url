function restrictToLoggedInUsers(req, res, next) {
	if(!req.cookies.auth){return res.redirect("/auth/out")}
        next();
}

export default restrictToLoggedInUsers;

