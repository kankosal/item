import walletActivityLogConsumer from './walletActivityLogConsumer';

const consumerLoader = async (channel) => {
  await walletActivityLogConsumer(channel);
};

export default consumerLoader;
