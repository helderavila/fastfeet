import * as Yup from 'yup';
import Recipient from '../models/Recipient';
import User from '../models/User';

class RecipientController {
  // Método para mostrar todos os recipients
  async index(req, res) {
    const recipients = await Recipient.findAll();
    // Verifica se existe destinarios no banco de dados
    if (!recipients) {
      return res.status(400).json({ error: 'Recipient not found' });
    }
    return res.json(recipients);
  }

  // Método para mostrar um recipient
  async show(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findOne({ where: { id } });
    // Verifica se existe um destinario no banco de dados
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    return res.json({
      recipient,
    });
  }

  // Método para cadastrar um recipient
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      postcode: Yup.string().required(),
    });

    // Verifica se os dados sao validos
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, number, postcode } = req.body;

    const recipient = await Recipient.findOne({
      where: { name, number, postcode },
    });
    // Verifica se ja nao existe um destinario no banco de dados
    if (recipient) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    // Verifica se o usuario é um admin
    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const { id } = await Recipient.create(req.body);
    return res.json({
      id,
      name,
      number,
      postcode,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      postcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error' });
    }

    const { id } = req.params;

    const recipientExists = await Recipient.findOne({ where: { id } });

    if (!recipientExists) {
      return res.status(401).json({ error: 'Recipient not found' });
    }

    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const recipient = await recipientExists.update(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
