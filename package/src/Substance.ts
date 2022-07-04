export enum ChemicalForm {
  solid = 's',
  gas = 'g',
  aquatic = 'aq',
  liquid = 'l',
}

export type Substance = {
  form: ChemicalForm;
  enthalpy: number | null;
  gibs: number | null;
  entropy: number | null;
  name: string;
};

export type SubstanceData = {
  form: 's' | 'g' | 'aq' | 'l';
  enthalpy: number | null;
  gibs: number | null;
  entropy: number | null;
  name: string;
};

export interface SubstanceUI extends Substance {
  coefficient: number | 1;
  type: 'reactant' | 'product';
};

export type ThermoDynamicForm = 'enthalpy' | 'entropy' | 'gibs';
