const FONT_LOADER_RULE = "next-font-loader";
const CSS_LOADER_RULE = "css-loader";

const isCSSLoader = (value) => value != null && typeof value === "string" && value.includes(CSS_LOADER_RULE);

/**
 * Make sure all CSS rules are objects in a subset.
 */
const normalizeRules = (rules) => {
  rules.forEach((rule, i) => {
    if (isCSSLoader(rule)) {
      rules[i] = { loader: rule };
    }
  });

  return rules;
};

const filterAndFlattenRules = (rules) =>
  normalizeRules(rules).reduce((acc, rule) => acc.concat(filterCSSRules(rule)), []);

const filterCSSRules = (rule) => {
  const foundRules = [];

  if (rule.oneOf) {
    foundRules.push(...filterAndFlattenRules(rule.oneOf));
  }

  if (Array.isArray(rule.use)) {
    // Replace string values with object loaders.
    const subRules = normalizeRules(rule.use);

    // Ignore font loaders.
    if (!subRules.some((subRule) => subRule === FONT_LOADER_RULE || subRule.loader === FONT_LOADER_RULE)) {
      foundRules.push(...filterAndFlattenRules(subRules));
    }
  }

  if (isCSSLoader(rule.loader)) {
    foundRules.push(rule);
  }

  return foundRules;
};

const CSSCamelCaseLoader = (config) => {
  const CSSRules = filterAndFlattenRules(normalizeRules(config.module.rules));

  CSSRules.forEach((rule) => {
    if (rule.options == null) rule.options = {};
    if (rule.options.modules == null) rule.options.modules = {};
    rule.options.modules.exportLocalsConvention = "camelCase";
  });

  return config;
};

module.exports = {
  CSSCamelCaseLoader,
};
