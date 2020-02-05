import OrderProblem from '../models/OrderProblem';
import Deliverer from '../models/Deliverer';
import Order from '../models/Order';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

class OrderProblems {
  async index(req, res) {
    const order = await OrderProblem.findAll({
      where: {
        order_id: req.params.orderId,
      },
    });
    // Verifica se existe problema com a ordem
    if (!order) {
      return res
        .status(400)
        .json({ error: 'Doesnt have problem with that order' });
    }

    return res.json(order);
  }

  async update(req, res) {
    const orderId = await OrderProblem.findByPk(req.params.problemId);
    const order = await Order.findByPk(orderId.order_id);
    const deliverer = await Deliverer.findByPk(order.deliverer_id);

    order.canceled_at = new Date();

    order.save();

    await Queue.add(CancellationMail.key, {
      order,
      deliverer,
      orderId,
    });

    return res.json(order);
  }
}

export default new OrderProblems();
