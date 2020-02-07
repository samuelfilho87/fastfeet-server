import Mail from '../../lib/Mail';

class NewOrderMail {
  get key() {
    return 'NewOrderMail';
  }

  async handle({ data }) {
    const { product, recipient, deliveryman } = data;

    const address = `${recipient.street}, nº: ${recipient.number}`;
    const complement = recipient.complements;
    const finaladdress = `${recipient.city} / ${recipient.state} - CEP: ${recipient.zip_code}`;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova encomenda',
      template: 'neworder',
      context: {
        deliveryman: deliveryman.name,
        recipient: recipient.name,
        product,
        address,
        complement,
        finaladdress,
      },
    });
  }
}

export default new NewOrderMail();
