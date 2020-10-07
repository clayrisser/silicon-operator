import { VeleroOperator } from '@operators/velero-schedule-replicator';
import config from './config';

(async () => {
  const velero = new VeleroOperator(config);
  await velero.start();

  function exit(_reason: string) {
    velero.stop();
    process.exit(0);
  }

  process
    .on('SIGTERM', () => exit('SIGTERM'))
    .on('SIGINT', () => exit('SIGINT'));
})().catch(console.error);
