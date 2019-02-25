
import { schema } from 'normalizr';

const reaction = new schema.Entity('reactions');
const module = new schema.Entity(
  'modules',
  { reactions: [reaction] },
  { idAttribute: 'mod_name' },
);

export const moduleSchema = [module];
