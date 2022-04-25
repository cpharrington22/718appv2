// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Equation } = initSchema(schema);

export {
  Equation
};