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
      email: 'assoares383@tcodepro.dev',
      name: 'Alexandre Soares'
    }
  }
} as IMailConfig;