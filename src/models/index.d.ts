import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type EquationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Equation {
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Equation, EquationMetaData>);
  static copyOf(source: Equation, mutator: (draft: MutableModel<Equation, EquationMetaData>) => MutableModel<Equation, EquationMetaData> | void): Equation;
}