"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMathMLSymbolEquation = exports.makeMathJaxSymbolEquation = exports.sortUnit = exports.makeMathJaxEquation = void 0;
const frac = '\\frac';
const dot = '\\cdot';
const delta = '\\Delta';
const theta = '\\theta';
const arrow = '\\to';
const enthalpyUnit = '\\frac{kJ}{mol}';
const entropyUnit = '\\frac{J}{mol \\cdot K}';
const gibsUnit = '\\frac{kJ}{mol}';
// const enthalpyUnitUnicode = 'kJ/mol';
// const entropyUnitUnicode = 'J/(mol \\cdot K)';
// const gibsUnitUnicode = 'kJ/mol';
const substancesToString = (substances) => {
    const substancesString = substances.reduce((string, { name, form, coefficient }) => {
        if (name === '')
            return string;
        const coefficientString = coefficient === 1 ? '' : coefficient;
        return `${string} ${coefficientString}${name} (${form}) +`;
    }, '');
    return substancesString.substring(0, substancesString.length - 1);
};
const makeMathJaxEquation = (reactans, products) => {
    const reactantString = substancesToString(reactans);
    const productString = substancesToString(products);
    return reactantString + arrow + productString;
};
exports.makeMathJaxEquation = makeMathJaxEquation;
const sortSymbol = (target) => {
    switch (target) {
        case 'enthalpy':
            return `H^${theta}`;
        case 'entropy':
            return `S^${theta}`;
        case 'gibs':
            return `G^${theta}`;
        default:
            return '';
    }
};
const sortUnit = (target) => {
    switch (target) {
        case 'enthalpy':
            return enthalpyUnit;
        case 'entropy':
            return entropyUnit;
        case 'gibs':
            return gibsUnit;
        default:
            return '';
    }
};
exports.sortUnit = sortUnit;
const substanceValuesToString = (substances, target) => {
    const substancesString = substances.reduce((string, substance) => {
        var _a;
        if (substance === null)
            return string;
        if ((substance === null || substance === void 0 ? void 0 : substance.name) === '')
            return string;
        const coefficientString = substance.coefficient === 1 ? '' : substance.coefficient;
        return `${string}${coefficientString} ${coefficientString && dot} ${substance[target] !== null ? (_a = substance[target]) === null || _a === void 0 ? void 0 : _a.toFixed(3) : '?'} ${(0, exports.sortUnit)(target)} +`;
    }, '');
    return substancesString.substring(0, substancesString.length - 1);
};
const substanceSymbolToString = (substances, target) => {
    const substancesString = substances.reduce((string, { name, form, coefficient }) => {
        const coefficientString = coefficient === 1 ? '' : coefficient;
        return `${string}${coefficientString} ${coefficientString && dot} ${sortSymbol(target)}({${name}}_{(${form})}) +`;
    }, '');
    return substancesString.substring(0, substancesString.length - 1);
};
const makeMathJaxCalcEquation = (reactans, products, target, calcVals) => {
    var _a;
    const reactantString = substanceValuesToString(reactans, target);
    const productString = substanceValuesToString(products, target);
    return `${delta} ${sortSymbol(target)} = (${productString}) - (${reactantString}) = ${calcVals[target] === null ? '?' : (_a = calcVals[target]) === null || _a === void 0 ? void 0 : _a.toFixed(3)} ${(0, exports.sortUnit)(target)}`;
};
const makeMathJaxSymbolEquation = (reactans, products, target) => {
    const reactantString = substanceSymbolToString(reactans, target);
    const productString = substanceSymbolToString(products, target);
    const equationLatex = `${delta} ${sortSymbol(target)} = (${productString}) - (${reactantString})`;
    return equationLatex;
};
exports.makeMathJaxSymbolEquation = makeMathJaxSymbolEquation;
const sortMathMLSymbol = (target) => {
    switch (target) {
        case 'enthalpy':
            return `
          <msup>
            <mi>&#x0394;H</mi>
            <mo>&#x03b8;</mo>
          </msup>
      `;
        case 'entropy':
            return `
        <msup>
          <mi>&#x0394;S</mi>
          <mo>&#x03b8;</mo>
        </msup>
      `;
        case 'gibs':
            return `
        <msup>
          <mi>&#x0394;G</mi>
          <mo>&#x03b8;</mo>
        </msup>
      `;
        default:
            return '';
    }
};
const sortMathMLUnit = (target) => {
    switch (target) {
        case 'enthalpy':
            return `
          <mfrac>
            <mn>kJ</mn>
            <mo>mol</mo>
          </mfrac>
      `;
        case 'entropy':
            return `
        <mfrac>
          <mrow>
            <mn>J</mn>
          </mrow>
          <mrow>
            <mi>mol</mi>
            <mo>&#x22C5;</mo>
            <mi>K</mi>
          </mrow>
        </mfrac>
      `;
        case 'gibs':
            return `
        <mfrac>
          <mn>kJ</mn>
          <mo>mol</mo>
        </mfrac>
      `;
        default:
            return '';
    }
};
const extractSuperscript = (target) => {
    const regex = new RegExp(/(?<=(\^\{))(.*?)(?=\})/, 'g');
    const superScript = regex.exec(target);
    if (superScript)
        return superScript[0];
    return '';
};
const extractSubscript = (target) => {
    const regex = new RegExp(/(?<=(\_\{))(.*?)(?=\})/g);
    const subScript = regex.exec(target);
    if (!subScript) {
        const regexNoBrackets = new RegExp(/(?<=\_)[0-9]/g);
        const subScript2 = target.match(regexNoBrackets);
        if (subScript2)
            return subScript2[0];
        return '';
    }
    return subScript[0];
};
const extractName = (target) => {
    const regex = new RegExp(/[A-Z][a-z]?/g);
    const result = target.match(regex);
    if (result)
        return result[0];
    return '';
};
const extractAtoms = (target) => {
    const regex = new RegExp(/(([A-Z][a-z]|[A-Z])((\_\{.*?\})|(\_[0-9]))|(\^\{.*?\}))|([A-Z][a-z](\^\{.*?\}))|([A-Z][a-z]|[A-Z])|(\(.*?\)((\_\{.*?\})|(\_[0-9]))|(\^\{.*?\}))/g);
    return target.match(regex);
};
const latexToMathML = (subUi) => {
    // Find substances
    // Segment their each atoms
    // Segment super and subscripts
    if (!subUi.name)
        return '';
    const { name } = subUi;
    const atoms = extractAtoms(name) || [];
    const parsedAtoms = atoms.map((atom) => {
        const superScript = extractSuperscript(atom);
        const subScript = extractSubscript(atom);
        const name = extractName(atom);
        if (superScript !== '' && subScript !== '')
            return `
        <msup>
          <msub>
            <mi>${name}</mi>
            <mn>${subScript}</mn>
          </msub>
          <mi>${superScript}</mi>
        </msup>
      `;
        if (superScript === '' && subScript !== '')
            return `
        <msub>
          <mi>${name}</mi>
          <mn>${subScript}</mn>
        </msub>
      `;
        if (superScript !== '' && subScript === '')
            return `
        <msup>
          <mi>${name}</mi>
          <mo>${superScript}</mo>
        </msup>
      `;
        return `
      <mi>${name}</mi>
    `;
    });
    const resultString = parsedAtoms.reduce((prev, mathMLObject) => prev + mathMLObject, '');
    return resultString;
};
const numtoMathML = (subUI, target) => {
    if (!(subUI === null || subUI === void 0 ? void 0 : subUI.name))
        return '';
    const num = subUI[target];
    const numIsNegative = num !== null && num < 0;
    const MathMLObj = `
      <mi>${numIsNegative ? '<mo>(</mo>' : ''}${num}</mi> ${sortMathMLUnit(target)} ${numIsNegative ? '<mo>)</mo>' : ''}
    `;
    return MathMLObj;
};
const makeMathMLSymbolEquation = (reactants, products, target) => {
    const parsedReactants = reactants.map((sub) => latexToMathML(sub));
    const parsedProducts = products.map((sub) => latexToMathML(sub));
    const thermoSymbolMathML = sortMathMLSymbol(target);
    const reactantsString = parsedReactants.reduce((prev, mathMLObject, index) => {
        const sub = reactants[index];
        if (sub === null)
            return '';
        const { coefficient } = reactants[index];
        const { form } = sub;
        return `${prev}${index !== 0 ? '<mo>+</mo>' : ''}${coefficient !== 1 && `<mo>${coefficient}</mo><mo>&#x22C5;</mo>`}${thermoSymbolMathML}<mo>(</mo>${mathMLObject}<mo>(</mo><mo>${form}</mo><mo>)</mo><mo>)</mo>`;
    }, '');
    const productsString = parsedProducts.reduce((prev, mathMLObject, index) => {
        const sub = products[index];
        if (sub === null)
            return '';
        const { coefficient } = products[index];
        const { form } = sub;
        return `${prev}
            ${index !== 0 ? '<mo>+</mo>' : ''}
            ${coefficient !== 1 && `<mo>${coefficient}</mo><mo>&#x22C5;</mo>`}
            ${thermoSymbolMathML}<mo>(</mo>${mathMLObject}<mo>(</mo><mo>${form}</mo><mo>)</mo><mo>)</mo>`;
    }, '');
    const result = `
    <math style="font-style: italic" xmlns="http://www.w3.org/1998/Math/MathML">
      ${thermoSymbolMathML}
      <mo>=</mo>
      <mo>(</mo>
      ${productsString}
      <mo>)</mo>
      <mo>-</mo>
      <mo>(</mo>
      ${reactantsString}
      <mo>)</mo>
    </math>
  `;
    return result;
};
exports.makeMathMLSymbolEquation = makeMathMLSymbolEquation;
const makeMathMLCalcEquation = (reactants, products, calcVals, target) => {
    var _a;
    const parsedReactants = reactants.map((sub) => numtoMathML(sub, target));
    const parsedProducts = products.map((sub) => numtoMathML(sub, target));
    const thermoSymbolMathML = sortMathMLSymbol(target);
    const reactantsString = parsedReactants.reduce((prev, mathMLObject, index) => {
        const sub = reactants[index];
        if (sub === null)
            return '';
        const { coefficient } = reactants[index];
        return `${prev}${index !== 0 && '<mo>+</mo>'}${coefficient !== 1 && `<mo>${coefficient}</mo><mo>&#x22C5;</mo>`}${mathMLObject}`;
    }, '');
    const productsString = parsedProducts.reduce((prev, mathMLObject, index) => {
        const sub = products[index];
        if (sub === null)
            return '';
        const { coefficient } = products[index];
        return `${prev}
            ${index !== 0 && '<mo>+</mo>'}
            ${coefficient !== 1 && `<mo>${coefficient}</mo><mo>&#x22C5;</mo>`}
            ${mathMLObject}`;
    }, '');
    const result = `
    <math style="font-style: italic" xmlns="http://www.w3.org/1998/Math/MathML">
      ${thermoSymbolMathML}
      <mo>=</mo>
      <mo>(</mo>
      ${productsString}
      <mo>)</mo>
      <mo>-</mo>
      <mo>(</mo>
      ${reactantsString}
      <mo>)</mo>
      <mo>=</mo>
      <mo>${(_a = calcVals[target]) === null || _a === void 0 ? void 0 : _a.toFixed(2)}</mo>
      ${sortMathMLUnit(target)}
    </math>
  `;
    return result;
};
//# sourceMappingURL=index.js.map