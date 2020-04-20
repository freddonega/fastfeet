import Mail from '../../lib/Mail';

class CancelPackageMail {
  get key() {
    return 'CancelPackageMail';
  }

  async handle({ data }) {
    const { the_package, problem } = data;
    const { recipient } = the_package;
    const { description } = problem;

    await Mail.sendMail({
      to: `${the_package.deliveryman.name} <${the_package.deliveryman.email}>`,
      subject: 'Entrega Cancelada',
      template: 'cancel-package',
      context: {
        provider: the_package.deliveryman.name,
        recipient: {
          name: recipient.name,
          product: the_package.product,
          address: `${recipient.street}, ${recipient.number} - ${recipient.complement} - ${recipient.street} - ${recipient.city} (${recipient.zip_code})`,
        },
        description,
      },
    });
  }
}

export default new CancelPackageMail();
