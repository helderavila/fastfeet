import { isBefore, isAfter, setSeconds, setMinutes, setHours } from 'date-fns';
import Order from '../models/Order';

class PackageController {
  async start(req, res) {
    const checkId = await Order.findOne({
      where: { deliverer_id: req.body.deliverer_id },
    });

    if (!checkId) {
      return res.status(401).json({ error: 'You cant acess anothers orders' });
    }

    const order = await Order.findOne({ where: { id: req.params.orderId } });

    const dateAfter = setSeconds(setMinutes(setHours(new Date(), 8), 0), 0);
    const dateBefore = setSeconds(setMinutes(setHours(new Date(), 18), 0), 0);

    const checkDate =
      isAfter(new Date(), dateAfter) && isBefore(new Date(), dateBefore);

    if (!checkDate) {
      return res
        .status(401)
        .json({ error: 'The package can only be taken between 9am and 6pm' });
    }
    order.start_date = new Date();

    await order.save();

    return res.json({ ok: true });
  }

  async end(req, res) {
    const checkId = await Order.findOne({
      where: { deliverer_id: req.body.deliverer_id },
    });

    if (!checkId) {
      return res.status(401).json({ error: 'You cant acess anothers orders' });
    }

    const order = await Order.findOne({ where: { id: req.params.orderId } });

    order.end_date = new Date();

    order.save();

    return res.json(order);
  }
}

export default new PackageController();
