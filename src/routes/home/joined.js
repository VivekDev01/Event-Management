import express from 'express';
import User from '../../models/user';
import Event from '../../models/event';
import { parseEvents } from '../common/eventParser';
import { isSignedIn } from '../common/authCheck';

const router = express.Router();

router.get('/joined-events', isSignedIn, async (req, res, next) => {
  try {
    let user = await User.findOne({
      username: res.locals.options.username
    });

    let events = await Event.find({
      eventId: {
        $in: user.eventsjoined
      },
      endDate: {
        $gt: new Date()
      }
    }).sort({
      startDate: 1
    });
  
    res.locals.options.events = parseEvents(events);
  
    res.locals.options.page = 'joined-events';
    res.render('joined', res.locals.options);
  } catch (err) {
    next(err);
  }
});

export default router;