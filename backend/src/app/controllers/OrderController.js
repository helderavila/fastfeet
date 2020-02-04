import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliverer from '../models/Deliverer';
import Mail from '../../lib/Mail';

class OrderController {
  async store(req, res) {
    const { deliverer_id, product, recipient_id } = req.body;

    const deliverer = await Deliverer.findByPk(deliverer_id);
    const recipient = await Recipient.findByPk(recipient_id);

    const order = await Order.create(req.body);

    await Mail.sendEmail({
      to: `${deliverer.name} <${deliverer.email}>`,
      subject: 'Uma nova encomenda disponivel!',
      template: 'create',
      context: {
        deliverer: deliverer.name,
        product,
        name: recipient.name,
        street: recipient.street,
        number: recipient.number,
        state: recipient.state,
        city: recipient.city,
        postcode: recipient.postcode,
      },
    });

    return res.json(order);
  }

  async index(req, res) {
    const orders = await Order.findAll();
    return res.json(orders);
  }

  async update(req, res) {
    const { id } = req.params;

    const orderExists = await Order.findOne({ where: { id } });

    if (!orderExists) {
      return res.status(401).json({ error: 'Order not found' });
    }

    const order = await orderExists.update(req.body);
    return res.json(order);
  }

  async delete(req, res) {
    const checkOrderExists = await Order.findByPk(req.params.id);

    if (!checkOrderExists) {
      return res.status(401).json({ error: 'Order not found' });
    }

    const order = await checkOrderExists.destroy();

    return res.json(order);
  }
}

export default new OrderController();
