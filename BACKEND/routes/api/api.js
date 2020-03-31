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
        console.log(payload);
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
      res.status(200).json({"version":"API v1.0"});
      console.log(req.user);
    } );
 return router;
}
//module.exports = router;
module.exports = initApi;

