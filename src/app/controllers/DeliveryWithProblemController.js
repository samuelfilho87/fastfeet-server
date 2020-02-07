import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Problems from '../schemas/Problems';
import Queue from '../../lib/Queue';
import CancelationMail from '../jobs/CancelationMail';

class DeliveryWithProblemController {
  async index(req, res) {
    const deliveryWithProblemsId = await Problems.find({
      delivery_id: { $gte: 1 },
    }).distinct('delivery_id');

    const deliveries = await Order.findAll({
      where: {
        id: deliveryWithProblemsId,
      },
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complements',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async delete(req, res) {
    const problem = await Problems.findById(req.params.id);

    const order = await Order.findByPk(problem.delivery_id, {
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complements',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    order.canceled_at = new Date();

    await Queue.add(CancelationMail.key, {
      order,
    });

    return res.json(order);
  }
}

export default new DeliveryWithProblemController();
