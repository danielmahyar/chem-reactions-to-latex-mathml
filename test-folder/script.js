const app = require('@danielmahyar/chemical-latex-to-mathml')

const substance = {
	form: 's',
	enthalpy: 200,
	gibs: 200,
	entropy: 200,
	name: 'Aq',
	coefficient: 2,
	type: 'reactant'
}
   

const string = app.makeMathJaxSymbolEquation([substance, substance], [substance], 'enthalpy')
console.log(string)