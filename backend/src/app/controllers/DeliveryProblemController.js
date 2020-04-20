import CancelPackageMail from '../jobs/CancelPackageMail';
import Queue from '../../lib/Queue';

import DeliveryProblem from '../models/DeliveryProblem';
import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliveryProblemController {
  async show(req, res) {
    const { id } = req.params;
    const the_package = await Package.findOne({
      where: { id },
      include: [
        {
          model: DeliveryProblem,
          as: 'problems',
        },
      ],
    });

    if (!the_package) {
      return res.status(404).json({ error: 'Package do not exists' });
    }

    return res.json(the_package.problems);
  }

  async delete(req, res) {
    const { id } = req.params;

    const problem = await DeliveryProblem.findByPk(id);

    if (!problem) {
      return res.status(404).json({ error: 'Delivery problem do not exists' });
    }

    const the_package = await Package.findOne({
      where: { id: problem.package_id, end_date: null },
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
          model: DeliveryProblem,
          as: 'problems',
          attributes: ['id', 'description'],
        },
      ],
    });

    if (!the_package) {
      return res.status(404).json({ error: 'Package do not exists' });
    }

    the_package.canceled_at = new Date();
    await the_package.save();

    await Queue.add(CancelPackageMail.key, {
      the_package,
      problem,
    });

    return res.json(the_package);
  }
}

export default new DeliveryProblemController();
