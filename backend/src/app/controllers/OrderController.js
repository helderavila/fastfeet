import Order from '../models/Order';

class OrderController {
  async store(req, res) {
    const order = await Order.create(req.body);

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
