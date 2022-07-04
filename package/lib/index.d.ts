import { SubstanceUI } from './Substance';
import { CalculatedValues } from './SubstanceHandlers';
declare type SubstanceType = 'enthalpy' | 'entropy' | 'gibs';
export declare const makeMathJaxEquation: (reactans: SubstanceUI[], products: SubstanceUI[]) => string;
export declare const sortUnit: (target: SubstanceType) => string;
export declare const makeMathJaxCalcEquation: (reactans: SubstanceUI[], products: SubstanceUI[], target: 'enthalpy' | 'entropy' | 'gibs', calcVals: CalculatedValues) => string;
export declare const makeMathJaxSymbolEquation: (reactans: SubstanceUI[], products: SubstanceUI[], target: 'enthalpy' | 'entropy' | 'gibs') => string;
export declare const makeMathMLSymbolEquation: (reactants: SubstanceUI[], products: SubstanceUI[], target: SubstanceType) => string;
export declare const makeMathMLCalcEquation: (reactants: SubstanceUI[], products: SubstanceUI[], calcVals: CalculatedValues, target: SubstanceType) => string;
export {};
//# sourceMappingURL=index.d.ts.map