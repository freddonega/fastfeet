import Mail from '../../lib/Mail';

class NewPackageMail {
  get key() {
    return 'NewPackageMail';
  }

  async handle({ data }) {
    const { the_package } = data;
    const { recipient } = the_package;
    await Mail.sendMail({
      to: `${the_package.deliveryman.name} <${the_package.deliveryman.email}>`,
      subject: 'Nova Encomenda',
      template: 'new-package',
      context: {
        provider: the_package.deliveryman.name,
        recipient: {
          name: recipient.name,
          product: the_package.product,
          address: `${recipient.street}, ${recipient.number} - ${recipient.complement} - ${recipient.street} - ${recipient.city} (${recipient.zip_code})`,
        },
      },
    });
  }
}

export default new NewPackageMail();
