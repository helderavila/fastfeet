import {
  isBefore,
  isAfter,
  setSeconds,
  setMinutes,
  setHours,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';
import Order from '../models/Order';

class OrderCheckInController {
  async update(req, res) {
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

    const date = new Date();

    const checkOrderDate = await Order.findAll({
      where: {
        deliverer_id: req.body.deliverer_id,
        start_date: {
          [Op.between]: [startOfDay(date), endOfDay(date)],
        },
      },
    });

    if (checkOrderDate.length > 4) {
      return res
        .status(401)
        .json({ error: 'You can only takes 5 orders today' });
    }

    order.start_date = new Date();
    await order.save();

    return res.json({ ok: true });
  }
}

export default new OrderCheckInController();
