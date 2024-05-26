export async function isAuth(req, res, next){

  console.log('req.cookies from middleware', req.cookies)
  console.log('req.cookies from middleware', req.isAuthenticated)

  next();
}