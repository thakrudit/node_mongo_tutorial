const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/person');
// const menu_item = require('./models/menu_item');


passport.use(new LocalStrategy(async(username, password, done) => {
    try {
        const user = await person.findOne({ username });
        if(!user){
            return done(null, false, {message: "Incorrect Username"});
        }
        
        // const isPasswordMatch = user.password===password ? true : false;
        const isPasswordMatch = await user.comarePassword(password);
        if(isPasswordMatch){
            return done(null, user);
        }
        return done(null, false, {message: "Incorrect Password"});

    } catch (err) {
        return done( err, );        
    }
}));

module.exports = passport;