import * as Yup from 'yup';

import { Op } from 'sequelize';
import NewPackageMail from '../jobs/NewPackageMail';
import Queue from '../../lib/Queue';

import Package from '../models/Package';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import DeliveryProblem from '../models/DeliveryProblem';

class PackageController {
  async index(req, res) {
    const { limit = 6, page = 1, q } = req.query;
    const withProblems = Number(req.query.withProblems);
    const { count, rows: packages } = await Package.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      where: q ? { product: { [Op.iLike]: `%${q}%` } } : null,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'city',
            'state',
            'zip_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: DeliveryProblem,
          as: 'problems',
          attributes: ['id'],
          required: withProblems,
        },
      ],
    });

    return res.json({ count: Math.ceil(count / limit), packages });
  }

  async show(req, res) {
    const the_package = await Package.findByPk(req.params.id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'city',
            'state',
            'zip_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!the_package) {
      return res.status(404).json({ error: 'Package do not exists' });
    }
    return res.json(the_package);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().required(),
      recipient_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliveryman_id, recipient_id } = req.body;

    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!deliverymanExists) {
      return res.status(404).json({ error: 'Deliveryman does not exists.' });
    }

    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      return res.status(404).json({ error: 'Recipient does not exists.' });
    }

    const { id, product } = await Package.create(req.body);

    const { deliveryman, recipient } = await Package.findByPk(id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'city',
            'state',
            'zip_code',
          ],
        },
      ],
    });

    await Queue.add(NewPackageMail.key, {
      the_package: {
        id,
        product,
        deliveryman,
        recipient,
      },
    });

    return res.json({ id, product, deliveryman, recipient });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      deliveryman_id: Yup.number().min(1),
      recipient_id: Yup.number().min(1),
      product: Yup.string().min(4),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const the_package = await Package.findByPk(req.params.id);

    if (!the_package) {
      return res.status(404).json({ error: 'Package do not exists' });
    }

    const { deliveryman_id, recipient_id } = req.body;

    const deliverymanExists = await Deliveryman.findByPk(deliveryman_id);

    if (!deliverymanExists) {
      return res.status(404).json({ error: 'Deliveryman does not exists.' });
    }

    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      return res.status(404).json({ error: 'Recipient does not exists.' });
    }

    await the_package.update(req.body);

    const { product, deliveryman, recipient } = await Package.findByPk(id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'city',
            'state',
            'zip_code',
          ],
        },
      ],
    });
    return res.json({ id, product, deliveryman, recipient });
  }

  async delete(req, res) {
    const { id } = req.params;
    const the_package = await Package.findByPk(id);

    if (!the_package) {
      return res.status(404).json({ error: 'Package do not exists' });
    }

    the_package.destroy({ where: { id } });

    return res.json();
  }
}

export default new PackageController();
