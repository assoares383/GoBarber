interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    }
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'alexandre.soares@tcode.com.br',
      name: 'Alexandre Soares'
    }
  }
} as IMailConfig;