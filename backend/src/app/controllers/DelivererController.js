import * as Yup from 'yup';
import Deliverer from '../models/Deliverer';
import User from '../models/User';

class DelivererController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatar_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

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
