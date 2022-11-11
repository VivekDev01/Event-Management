import express from 'express';
import User from '../../models/user';
import Event from '../../models/event';
import { isSignedIn } from '../common/authCheck';
const router = express.Router();

router.post('/', isSignedIn, async (req, res, next) => {
  try {
    let user = await User.findOne({ username: res.locals.options.username });
    let event = await Event.findOne({ eventId: req.body.eventId });

    if (req.body.type === 'join-in') {
      if (!event) {
        res.json({ error: { type: 'eventNonExistent', message: 'Event no longer exists.' } });
      } else if (event.currentjoinings >= event.capacity) {
        res.json({ error: { type: 'eventFull', message: 'Event is already fully joined.' } });
      } else if (event.endDate < new Date()) {
        res.json({ error: { type: 'eventEnded', message: 'Event has already ended.' } });
      } else if (user.eventsjoined.includes(event.eventId)) {
        res.json({ error: { type: 'alreadyjoined', message: 'You have already joined into this event.' } });
      } else {
        //process joining
        event.currentjoinings += 1;
        await event.save();
        user.eventsjoined.push(event.eventId);
        user.history.push({
          action: `joined <a href="/event/id/${event.eventId}">${event.eventName}</a>`,
          time: Date.now()
        });
        await user.save();
        res.json({ success: true });
      }
    } else if (req.body.type === 'cancel') {
      event.currentjoinings -= 1;
      await event.save();
      user.eventsjoined = user.eventsjoined.filter(value => value !== event.eventId);
      user.history.push({
        action: `Cancelled joining for <a href="/event/id/${event.eventId}">${event.eventName}</a>`,
        time: Date.now()
      });
      await user.save();
      res.json({ success: true });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;