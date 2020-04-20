import * as Yup from 'yup';

import { Op } from 'sequelize';
import DeliveryProblem from '../models/DeliveryProblem';
import Package from '../models/Package';

class ProblemController {
  async index(req, res) {
    const { limit = null, page = 1, q } = req.query;

    const { count, rows: problems } = await DeliveryProblem.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      where: q ? { name: { [Op.like]: `%${q}%` } } : null,
      order: [['package_id']],
      include: [
        {
          model: Package,
          as: 'package',
          attributes: ['id'],
          where: { canceled_at: null },
        },
      ],
    });

    return res.json({ count: Math.ceil(count / limit), problems });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { package_id } = req.params;
    const the_package = await Package.findByPk(package_id);

    if (!the_package) {
      return res.status(404).json({ error: 'Package do not exists' });
    }

    const { description } = req.body;

    const problem = await DeliveryProblem.create({ description, package_id });

    return res.json(problem);
  }
}

export default new ProblemController();
