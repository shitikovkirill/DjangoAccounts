import LIVR from 'livr';

LIVR.Validator.defaultAutoTrim(true);

const validateFields = (fields, rules) => {
  const validator = new LIVR.Validator(rules);
  validator.validate(fields);
  return validator.getErrors() || {};
};

const validateField = (field, value, rule) => {
  if (rule) {
    const validator = new LIVR.Validator({ [field]: rule});
    validator.validate({[field]: value });
    return validator.getErrors() || {};
  }
  return {};
};

export { validateFields, validateField }