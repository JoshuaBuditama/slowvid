import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
const secret = "secret"; //process.env.SECRET || 'some other secret as default'; // TODO
import { HCPUserModel } from '../model/HCPUser';

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: secret
};

export function setupPassport(passport: passport.PassportStatic)
{
	passport.use(
		new Strategy(opts, async (payload, done) => {
			try {
				const user = await HCPUserModel.findById(payload.id);
				if (user) {
					return done(null, {
						id: user.id,
						email: user.emailAddress,
					});
				}
				else {
					return done(null, false);
				}
			} catch (err: any) {
				console.error(err);
			}
		})
	);
}
