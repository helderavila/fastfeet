import { Op } from 'sequelize';
import Order from '../models/Order';

class OrderClosedController {
  async index(req, res) {
    const orders = await Order.findAll({
      where: {
        deliverer_id: req.params.id,
        end_date: {
          [Op.not]: null,
        },
      },
    });

    return res.json(orders);
  }
}

export default new OrderClosedController();
