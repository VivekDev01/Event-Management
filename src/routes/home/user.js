import express from 'express';
import User from '../../models/user';
import { isSignedIn, isStaff, isStudent } from '../common/authCheck';
import { parseUsers } from '../common/userParser';
const router = express.Router();

router.get('/users-joined', isStudent && isStaff, async (req, res, next) => {
  try {
    // let users = await User.find({
    //   username: res.locals.options.username
    // });

    // let events = await Event.find({
    //   eventId: {
    //     $in: user.eventsjoined
    //   },
    //   endDate: {
    //     $gt: new Date()
    //   }
    // }).sort({
    //   startDate: 1
    // });
  
    

User.find({}, function(err, users){
    if(err){
        console.log(err);
    }
    else{
        res.locals.options.users = parseUsers(users);
  
        res.locals.options.page = 'users-joined';
        // res.render("users-joined" , {users: users});
        // res.send(users);
        res.render('users-joined', res.locals.options);

    }
});

    // res.send(users);
    // res.render('users-joined', res.locals.options);
  } catch (err) {
    next(err);
  } 
});

export default router;


