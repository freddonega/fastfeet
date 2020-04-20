import Package from '../models/Package';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveryConfirmController {
  async store(req, res) {
    const { deliveryman_id, id } = req.params;
    const { signature_id } = req.body;

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

export default new DeliveryConfirmController();
