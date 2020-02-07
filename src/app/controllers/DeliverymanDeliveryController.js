import { Op } from 'sequelize';
import { startOfDay, endOfDay, isBefore, isAfter } from 'date-fns';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

class DeliverymanDeliveryController {
  async index(req, res) {
    const orders = await Order.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: null,
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
      ],
    });

    return res.json(orders);
  }

  async update(req, res) {
    /**
     * Check the number of deliveries initiated on the day
     */
    const numberOfDeliveriesStart = await Order.count({
      where: {
        deliveryman_id: req.params.id,
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
        end_date: null,
        canceled_at: null,
      },
    });

    if (numberOfDeliveriesStart === 5) {
      return res
        .status(401)
        .json({ error: 'Five withdrawals allowed per day' });
    }

    /**
     * Check after 8:00 and before 18:00
     */
    if (
      isBefore(new Date(), new Date().setHours(8, 0, 0)) ||
      isAfter(new Date(), new Date().setHours(18, 0, 0))
    ) {
      return res
        .status(401)
        .json({ error: 'Withdrawals are only allowed between 8 am and 6 pm.' });
    }

    const delivery = await Order.findByPk(req.params.delivery_id, {
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
      ],
    });

    /**
     * Checks whether delivery has been canceled
     */
    if (delivery.canceled_at) {
      return res.status(401).json({ error: 'Delivery has been canceled.' });
    }

    /**
     * Checks whether delivery was made
     */
    if (delivery.end_date) {
      return res.status(401).json({ error: 'Delivery was made.' });
    }

    /**
     * Checks whether delivery has started
     */
    if (delivery.start_date) {
      return res.status(401).json({ error: 'Delivery has started.' });
    }

    delivery.start_date = new Date();

    await delivery.save();

    return res.json(delivery);
  }
}

export default new DeliverymanDeliveryController();
