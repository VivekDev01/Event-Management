import express from 'express';
import User from '../../models/user';
import { isSignedIn, isStaff } from '../common/authCheck';
import { parseUsers } from '../common/userParser';
const router = express.Router();

router.get('/users-joined', isStaff, async (req, res, next) => {
  try {
    let users = await User.find({
      username: res.locals.options.username
    });

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
  
    res.locals.options.users = parseUsers(users);
  
    res.locals.options.page = 'users-joined';
    // res.send(users);
    res.render('users-joined', res.locals.options);
  } catch (err) {
    next(err);
  } 
});

export default router;

// User.find({userType:"student"}, function(err, users){
//     if(err){
//         console.log(err);
//     }
//     else{
//         res.render("users-joined" , {joinedUsers: users});
//         // res.send(users);
//     }
// });
