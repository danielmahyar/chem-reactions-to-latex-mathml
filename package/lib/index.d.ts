import { SubstanceUI } from './Substance';
declare type SubstanceType = 'enthalpy' | 'entropy' | 'gibs';
export declare const makeMathJaxEquation: (reactans: SubstanceUI[], products: SubstanceUI[]) => string;
export declare const sortUnit: (target: SubstanceType) => string;
export declare const makeMathJaxSymbolEquation: (reactans: SubstanceUI[], products: SubstanceUI[], target: 'enthalpy' | 'entropy' | 'gibs') => string;
export declare const makeMathMLSymbolEquation: (reactants: SubstanceUI[], products: SubstanceUI[], target: SubstanceType) => string;
export {};
//# sourceMappingURL=index.d.ts.map