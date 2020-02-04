import OrderProblem from '../models/OrderProblem';

class OrderWithProblemController {
  async index(req, res) {
    const orderProblem = await OrderProblem.findAll();

    return res.json(orderProblem);
  }
}

export default new OrderWithProblemController();
