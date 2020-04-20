import { Op } from 'sequelize';
import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  isAfter,
  isBefore,
  getTime,
} from 'date-fns';

import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveriesController {
  async index(req, res) {
    const { limit, page, delivered } = req.query;
    const { id } = req.params;

    const { count, rows } = await Package.findAndCountAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: Number(delivered) ? { [Op.ne]: null } : null,
      },
      include: [
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
      order: ['created_at'],
      limit,
      offset: (page - 1) * limit,
    });

    if (!rows) {
      return res.status(404).json({ error: 'Deliveries not found' });
    }

    return res.json({ count, rows });
  }

  async show(req, res) {
    const { limit, page } = req.query;
    const { id } = req.params;

    const deliveries = await Package.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: { [Op.ne]: null },
      },
      order: ['created_at'],
      limit,
      offset: (page - 1) * limit,
    });

    if (!deliveries) {
      return res.status(404).json({ error: 'Deliveries not found' });
    }

    return res.json(deliveries);
  }

  async update(req, res) {
    const { deliveryman_id, id } = req.params;

    const deliveryExists = await Package.findOne({
      where: { deliveryman_id, id, canceled_at: null, start_date: null },
    });

    if (!deliveryExists) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    const start_date = new Date();
    const timeDate = getTime(start_date);

    const available = {
      min: setSeconds(setMinutes(setHours(timeDate, 8), 0), 0),
      max: setSeconds(setMinutes(setHours(timeDate, 18), 1), 0),
    };

    if (
      !(isAfter(timeDate, available.min) && isBefore(timeDate, available.max))
    ) {
      return res
        .status(401)
        .json({ error: 'Deliveries must start between 8 am and 6 pm' });
    }

    const count = await Package.findAll({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(start_date), endOfDay(start_date)],
        },
      },
    });

    if (count >= 5) {
      return res.status(401).json({ error: 'Maximum of 5 deliveries reached' });
    }

    await deliveryExists.update({ start_date });

    const delivery = await Package.findByPk(id, {
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
            'zip_code',
          ],
        },
      ],
    });

    return res.json(delivery);
  }

  async delete(req, res) {
    const { deliveryman_id, id } = req.params;
    const { signature_id } = req.body;

    console.log(req.body);

    const end_date = new Date();

    const deliveryExists = await Package.findOne({
      where: { deliveryman_id, id, canceled_at: null, end_date: null },
    });

    if (!deliveryExists) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    await deliveryExists.update({ end_date, signature_id });

    const delivery = await Package.findByPk(id, {
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

    return res.json(delivery);
  }
}

export default new DeliveriesController();
