import OrderProblem from '../models/OrderProblem';

class OrderWithProblemController {
  async index(req, res) {
    const orderProblem = await OrderProblem.findAll();

    // Verufuca se tem encomendas com problema
    if (!orderProblem) {
      return res.status(400).json({ error: 'Doesnt have orders with problem' });
    }

    return res.json(orderProblem);
  }
}

export default new OrderWithProblemController();
