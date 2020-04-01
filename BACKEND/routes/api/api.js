var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportJWT = require('passport-jwt');
var extractJWT = passportJWT.ExtractJwt;
var jwtStrategy = passportJWT.Strategy;



passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey:'secret'
    },
    (payload, next)=>{
        var user = payload;
        return next(null, user);
    }
  )
)


function initApi(db){

    /// Routers de Entidades
    var userRouter = require('./usuario/user')(db);
    router.use('/', userRouter);
  
    var jwtAuthMiddleware = passport.authenticate('jwt',{session:false});

    // http://localhost:3000/api/version
  router.get('/version', jwtAuthMiddleware, function(req, res){
    console.log(req.user);
      res.status(200).json({"version":"API v1.0"});
    } );
 return router;
}
module.exports = initApi;

