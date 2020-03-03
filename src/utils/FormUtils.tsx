/*
 * This utility module provides methods related to a
 * managing forms.
 */

/** Returns an object containing all neccessary properties for a form field */
let createFormField = (
  key: string,
  label: string,
  options: {
    keyboardType?: string
    autoCapitalize?: string,
    isSecure?: boolean,
    value?: string,
    returnKeyType?: any
  } = null
): any => {

  let allOptions = {
    keyboardType: 'default',
    autoCapitalize: 'sentences',
    isSecure: false,
    value: '',
  }

  options && Object.entries(options).forEach(([key, val], index) => {
    if (val) allOptions[key] = val;
  });

  return { key, label, opts: allOptions }
}

export {
  createFormField
}
