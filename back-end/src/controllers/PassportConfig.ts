import passport from 'passport';
import { Strategy } from 'passport-jwt';
import { HCPUserModel } from '../model/HCPUser';
import * as Conf from '../Conf';

export function setupPassport(passport: passport.PassportStatic)
{
	passport.use(
		new Strategy(Conf.jwtOptions, async (payload, done) => {
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
