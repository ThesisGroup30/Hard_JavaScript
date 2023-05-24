/**
 * @param {string} expression
 * @param {string[]} evalvars
 * @param {number[]} evalints
 * @return {string[]}
 */
var basicCalculatorIV = function(expression, evalvars, evalints) {
  const tokens = tokenize(expression);
  const vars = {};
  for (let i = 0; i < evalvars.length; i++) {
    vars[evalvars[i]] = evalints[i];
  }
  const result = evaluate(tokens, vars);
  return formatResult(result);
};

function tokenize(expression) {
  const tokens = [];
  let i = 0;
  while (i < expression.length) {
    if (expression[i] === ' ') {
      i++;
      continue;
    }
    if (expression[i] === '(' || expression[i] === ')' || expression[i] === '+' || expression[i] === '-') {
      tokens.push(expression[i]);
      i++;
      continue;
    }
    let j = i + 1;
    while (j < expression.length && /[a-z]/.test(expression[j])) {
      j++;
    }
    if (j === i + 1) {
      tokens.push(expression[i]);
    } else {
      tokens.push(expression.substring(i, j));
    }
    i = j;
  }
  return tokens;
}

function evaluate(tokens, vars) {
  const stack = [];
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === '(') {
      let j = i + 1;
      let count = 1;
      while (j < tokens.length && count > 0) {
        if (tokens[j] === '(') {
          count++;
        } else if (tokens[j] === ')') {
          count--;
        }
        j++;
      }
      const expr = evaluate(tokens.slice(i + 1, j - 1), vars);
      stack.push(expr);
      i = j;
    } else if (/[a-z]/.test(tokens[i])) {
      const varName = tokens[i];
      const varValue = vars[varName] || 0;
      stack.push(new Term(varName, varValue));
      i++;
    } else {
      const op = tokens[i];
      i++;
      const term = parseTerm(tokens, i, vars);
      i += term.length;
      if (op === '+') {
        stack.push(term);
      } else {
        stack.push(new Term(term.vars, -term.coeff));
      }
    }
  }
  const result = stack.reduce((acc, term) => acc.add(term), new Polynomial());
  return result;
}

function parseTerm(tokens, start, vars) {
  let i = start;
  let coeff = 1;
  let varsSet = new Set();
  while (i < tokens.length && /[a-z0-9]/.test(tokens[i])) {
    if (/[a-z]/.test(tokens[i])) {
      varsSet.add(tokens[i]);
    } else {
      coeff *= parseInt(tokens[i]);
    }
    i++;
  }
  const vars = Array.from(varsSet).sort().join('*');
  return new Term(vars, coeff);
}

function formatResult(result) {
  return result.terms.map(term => {
    const vars = term.vars ? term.vars.split('*').sort().join('*') : '';
    const coeff = term.coeff.toString();
    return `${coeff}${vars ? '*' + vars : ''}`;
  });
}

class Polynomial {
  constructor() {
    this.terms = [];
  }

  add(term)
