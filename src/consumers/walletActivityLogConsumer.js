import { MESSAGE_KEY } from '../constant';
import { Hero } from '../models';
import { tryParseJSONObject } from '../utils';

const walletActivityLogConsumer = async (channel) => {
  try {
    const queueMessageKey = MESSAGE_KEY.WALLET_ACTIVITY_LOG;
    await channel.assertQueue(queueMessageKey, {
      durable: true,
    });

    channel.prefetch(1);
    channel.consume(
      queueMessageKey,
      async (msg) => {
        const messageBody = msg.content.toString();
        const data = tryParseJSONObject(messageBody);
        if (!data) {
          console.log('Invalid data');
          channel.ack(msg);
          return;
        }

        channel.ack(msg);
      },
      { noAck: false }
    );
  } catch (error) {
    console.log('queue consumer error: ', error);
  }
  return null;
};

export default walletActivityLogConsumer;
