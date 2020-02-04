import OrderProblem from '../models/OrderProblem';

class OrderProblems {
  async index(req, res) {
    const order = await OrderProblem.findAll({
      where: {
        order_id: req.params.orderId,
      },
    });

    return res.json(order);
  }
}

export default new OrderProblems();
