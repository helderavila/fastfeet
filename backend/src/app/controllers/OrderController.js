import Order from '../models/Order';
import User from '../models/User';

class OrderController {
  async store(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can create orders' });
    }

    const order = await Order.create(req.body);

    return res.json(order);
  }
}

export default new OrderController();
