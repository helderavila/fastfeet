import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { deliverer, order, orderId } = data;

    await Mail.sendEmail({
      to: `${deliverer.name} <${deliverer.email}>`,
      subject: 'Uma encomenda sua foi cancelada!',
      template: 'cancellation',
      context: {
        deliverer: deliverer.name,
        id: order.id,
        product: order.product,
        reason: orderId.description,
      },
    });
  }
}

export default new CancellationMail();
