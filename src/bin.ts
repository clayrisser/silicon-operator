import { Helm2CattleOperator } from '@operators/helm2cattle';
import { VeleroOperator } from '@operators/velero-schedule-replicator';
import config from './config';

(async () => {
  const helm2CattleOperator = new Helm2CattleOperator(config);
  const veleroOperator = new VeleroOperator(config);
  await Promise.all([helm2CattleOperator.start(), veleroOperator.start()]);

  function exit(_reason: string) {
    helm2CattleOperator.stop();
    veleroOperator.stop();
    process.exit(0);
  }

  process
    .on('SIGTERM', () => exit('SIGTERM'))
    .on('SIGINT', () => exit('SIGINT'));
})().catch(console.error);
