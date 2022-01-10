var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

var userService = require('../Component/auth/userService');

passport.use(new LocalStrategy(
    async function(username, password, done) {
        const user = await userService.findByUsername(username);
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.isBan === true){
            return done(null, false, { message: 'Ban account.' });
        }
        if (!await userService.validPassword(password,user))
            return done(null, false, { message: 'Incorrect password.' });

            return done(null, user);

    },
));

passport.serializeUser(function(user, done) {
    done(null, {_id: user._id, username : user.username, lastname:user.lastname,firstname : user.firstname, phone : user.phone ,isBan: user.isBan, password:user.password , cart: user.cart});
});

passport.deserializeUser(async function(user, done) {
    done(null, user);
});


module.exports = passport