import dayjs from "dayjs";

const REGEX_FUNCTIONS = {
  suma: (...props) => props.reduce((acc, val) => acc + val, 0),
  days_between: (...props) => Math.abs(dayjs(props[0]).diff(dayjs(props[1]), "days")) || 0,
};

export default {
  evaluate(expression, variables) {
    try {
      for (const variable of variables) {
        expression = expression.replaceAll(variable.label, variable.value);
      }

      for (const functionName in REGEX_FUNCTIONS) {
        const regex = new RegExp(functionName + "\\((.*?)\\)", "g");
        expression = expression.replace(regex, (match, args) => {
          const argsArray = args.split(",").map((a) => a.trim());
          return REGEX_FUNCTIONS[functionName](...argsArray);
        });
      }

      return eval(expression);
    } catch (error) {
      return 0;
    }
  },
};
