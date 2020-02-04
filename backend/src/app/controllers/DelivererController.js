import * as Yup from 'yup';
import Deliverer from '../models/Deliverer';

class DelivererController {
  async store(req, res) {
    // Schema de validação
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatar_id: Yup.number().required(),
    });
    // Verificar se o schema e valido
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { name, email, avatar_id } = req.body;

    const deliverer = await Deliverer.create({
      avatar_id,
      name,
      email,
    });

    return res.json(deliverer);
  }

  async index(req, res) {
    const deliverers = await Deliverer.findAll();

    return res.json(deliverers);
  }

  async update(req, res) {
    // Schema de validação
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    // Verificar se o schema é valido
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { email } = req.body;
    const deliverer = await Deliverer.findByPk(req.params.id);

    // Verificar se o email é diferente do email atual
    if (email && email !== deliverer.email) {
      // Verificar se o entregador existe
      const delivererExists = await Deliverer.findOne({ where: { email } });
      if (delivererExists) {
        return res.status(400).json({ error: 'Deliverer already exists' });
      }
    }

    const { id, name } = await deliverer.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const delivererExists = await Deliverer.findByPk(req.params.id);

    if (!delivererExists) {
      return res.status(400).json({ error: 'Deliverer not found' });
    }

    const deliverer = delivererExists.destroy();

    return res.json({ ok: 'true', deliverer });
  }
}

export default new DelivererController();
