import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { limit = null, page = 1, q } = req.query;

    const { count, rows: recipients } = await Recipient.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      where: q ? { name: { [Op.iLike]: `%${q}%` } } : null,
      order: [['name']],
    });

    return res.json({ count: Math.ceil(count / limit), recipients });
  }

  async show(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient do not exists' });
    }
    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      complement: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      id,
      name,
      street,
      complement,
      city,
      state,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({ id, name, street, complement, city, state, zip_code });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(3),
      street: Yup.string().min(10),
      number: Yup.string().min(1),
      complement: Yup.string(),
      city: Yup.string().min(3),
      zip_code: Yup.string().min(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient do not exists' });
    }

    await recipient.update(req.body);

    const {
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    } = await Recipient.findByPk(req.params.id);
    return res.json({
      id,
      name,
      street,
      number,
      complement,
      city,
      state,
      zip_code,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient do not exists' });
    }

    recipient.destroy({ where: { id } });

    return res.json();
  }
}

export default new RecipientController();
