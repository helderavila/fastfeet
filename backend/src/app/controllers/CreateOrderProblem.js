import OrderProblem from '../models/OrderProblem';

class CreateOrderProblemController {
  async store(req, res) {
    const order = await OrderProblem.create({
      order_id: req.params.orderId,
      description: req.body.description,
    });

    return res.json(order);
  }
}

export default new CreateOrderProblemController();
