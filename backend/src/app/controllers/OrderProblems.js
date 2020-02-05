import OrderProblem from '../models/OrderProblem';
import Deliverer from '../models/Deliverer';
import Order from '../models/Order';
import Mail from '../../lib/Mail';

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

    await Mail.sendEmail({
      to: `${deliverer.name} <${deliverer.email}>`,
      subject: 'Uma encomenda sua foi cancelada!',
      template: 'cancellation',
      context: {
        deliverer: deliverer.name,
        id: order.id,
        product: order.product,
        reason: orderId.description,
      },
    });

    return res.json(order);
  }
}

export default new OrderProblems();
