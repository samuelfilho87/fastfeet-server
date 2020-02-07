import { Op } from 'sequelize';
import Recipient from '../models/Recipient';
import Order from '../models/Order';
import File from '../models/File';

class DeliverymanDeliveyCompleteController {
  async index(req, res) {
    const orders = await Order.findAll({
      where: {
        deliveryman_id: req.params.id,
        end_date: { [Op.ne]: null },
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
      ],
    });

    return res.json(orders);
  }

  async update(req, res) {
    let delivery = await Order.findByPk(req.params.delivery_id);

    /**
     * Checks whether delivery has been canceled
     */
    if (delivery.canceled_at) {
      return res.status(401).json({ error: 'Delivery has been canceled.' });
    }

    /**
     * Checks delivery has not started
     */
    if (!delivery.start_date) {
      return res.status(401).json({ error: 'Delivery has not started.' });
    }

    /**
     * Checks whether delivery was made
     */
    if (delivery.end_date) {
      return res.status(401).json({ error: 'Delivery was made.' });
    }

    /**
     * Checks if have a signature
     */
    if (!req.file) {
      return res.status(401).json({ error: 'Signature submission required.' });
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    delivery.signature_id = file.id;

    delivery.end_date = new Date();

    await delivery.save();

    delivery = await Order.findByPk(req.params.delivery_id, {
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
      ],
    });

    return res.json(delivery);
  }
}

export default new DeliverymanDeliveyCompleteController();
