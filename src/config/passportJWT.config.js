import passport from "passport";
import jwt, { ExtractJwt } from "passport-jwt";

const JWTStrategy = jwt.Strategy;

const initializePassportJWT = () => {

  passport.use( "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "CoderKeyQueNadieDebeSaber",
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["coderCookieToken"];
  }
  return token;
};

export default initializePassportJWT;