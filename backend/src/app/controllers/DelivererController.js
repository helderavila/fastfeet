import Deliverer from '../models/Deliverer';
import User from '../models/User';

class DelivererController {
  async store(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'You are not a provider' });
    }

    const { name, email, avatar_id } = req.body;

    const deliverer = await Deliverer.create({
      avatar_id,
      name,
      email,
    });

    return res.json(deliverer);
  }
}

export default new DelivererController();
