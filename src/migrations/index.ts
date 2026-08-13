import * as migration_20260813_184147_init from './20260813_184147_init';
import * as migration_20260813_192347_email_optional from './20260813_192347_email_optional';

export const migrations = [
  {
    up: migration_20260813_184147_init.up,
    down: migration_20260813_184147_init.down,
    name: '20260813_184147_init',
  },
  {
    up: migration_20260813_192347_email_optional.up,
    down: migration_20260813_192347_email_optional.down,
    name: '20260813_192347_email_optional'
  },
];
