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
      secretOrKey:'secretobiensecreto'
    },
    (payload, next)=>{
        var user = payload;
        return next(null, user);
    }
  )
)

function initApi(db){
  var userRouter = require('./usuario/user')(db);
  var fichaRouter = require('./ficha/ficha')(db);


  router.use('/user', userRouter);
  var jwtAuthMiddleware = passport.authenticate('jwt',{session:false});

  router.use('/ficha', jwtAuthMiddleware, fichaRouter);


    router.get('/', (req, res, next)=>{
      res.status(200).json({"version":"API v1.0"})
  });





    // http://localhost:3000/version
    router.get('/ver', jwtAuthMiddleware, function(req, res){
        res.status(200).json({"version":"API v1.3"});
      } );

 return router;
}
module.exports = initApi;
