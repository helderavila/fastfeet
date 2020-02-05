import Mail from '../../lib/Mail';

class CreateOrderEmail {
  get key() {
    return 'CreateOrderEmail';
  }

  async handle({ data }) {
    const { deliverer, recipient, product } = data;

    await Mail.sendEmail({
      to: `${deliverer.name} <${deliverer.email}>`,
      subject: 'Uma nova encomenda disponivel!',
      template: 'create',
      context: {
        deliverer: deliverer.name,
        product,
        name: recipient.name,
        street: recipient.street,
        number: recipient.number,
        state: recipient.state,
        city: recipient.city,
        postcode: recipient.postcode,
      },
    });
  }
}

export default new CreateOrderEmail();
