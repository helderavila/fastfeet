import Order from '../models/Order';
import Deliverer from '../models/Deliverer';

class OrderOpenedController {
  async index(req, res) {
    const delivererExists = await Deliverer.findByPk(req.params.id);

    if (!delivererExists) {
      return res.status(401).json({ error: 'Deliverer not found' });
    }

    const orders = await Order.findAll({
      where: {
        deliverer_id: req.params.id,
        start_date: null,
        canceled_at: null,
        end_date: null,
      },
    });

    if (!orders) {
      return res.status(400).json({ error: 'Orders not found' });
    }
    return res.json(orders);
  }
}

export default new OrderOpenedController();
