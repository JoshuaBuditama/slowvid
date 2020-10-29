import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
const secret = "secret"; //process.env.SECRET || 'some other secret as default'; // TODO
import { HCPUserModel } from '../model/HCPUser';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret
};

//this sets how we handle tokens coming from the requests that come
// and also defines the key to be used when verifying the token.
export function setupPassport(passport: passport.PassportStatic)
{
	passport.use(
		new Strategy(opts, (payload, done) => {
			HCPUserModel.findById(payload.id)
				.then(user => {
					if (user) {
						return done(null, {
							id: user.id,
							email: user.emailAddress,
						});
					}
					return done(null, false);
				}).catch(err => console.error(err));
		})
	);
}
