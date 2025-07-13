function logOut(req,res) {
  res.clearCookie("Bearer")
  res.redirect('/auth/out')
}

export default logOut
