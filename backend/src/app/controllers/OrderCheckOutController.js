import Order from '../models/Order';
import Signature from '../models/Signature';

class OrderCheckOutController {
  async update(req, res) {
    const checkId = await Order.findOne({
      where: { deliverer_id: req.body.deliverer_id },
    });

    if (!checkId) {
      return res.status(401).json({ error: 'You cant acess anothers orders' });
    }

    const order = await Order.findOne({ where: { id: req.params.orderId } });

    if (order.start_date === null) {
      return res
        .status(401)
        .json({ error: 'You cant checkout without checkin' });
    }

    const signature = await Signature.findByPk(req.body.signature_id);

    if (!signature) {
      return res.status(401).json({ error: 'Signature not found' });
    }

    order.end_date = new Date();

    order.save();

    return res.json(order);
  }
}

export default new OrderCheckOutController();
