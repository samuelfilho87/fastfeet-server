import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const userExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }

    const {
      id,
      name,
      street,
      number,
      complements,
      state,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complements,
      state,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object()
      .shape({
        id: Yup.number(),
        name: Yup.string(),
        street: Yup.string(),
        number: Yup.string(),
        complements: Yup.string(),
        state: Yup.string(),
        city: Yup.string(),
        zip_code: Yup.string(),
      })
      .test(
        value =>
          !!(
            value.name ||
            value.street ||
            value.number ||
            value.complements ||
            value.state ||
            value.city ||
            value.zip_code
          )
      );

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id, name } = req.body;

    const recipient = await Recipient.findByPk(id);

    if (name && name !== recipient.name) {
      const userExists = await Recipient.findOne({ where: { name } });

      if (userExists) {
        return res.status(400).json({ error: 'Recipient already exists.' });
      }
    }

    const {
      street,
      number,
      complements,
      state,
      city,
      zip_code,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complements,
      state,
      city,
      zip_code,
    });
  }
}

export default new RecipientController();
