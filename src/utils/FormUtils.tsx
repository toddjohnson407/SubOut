/*
 * This utility module provides methods related to a
 * managing forms.
 */

/** Returns an object containing all neccessary properties for a form field */
let createFormField = (
  key: string,
  label: string,
  autoCapitalize: string = 'none',
  isSecure: boolean = false,
  value: string = '',
): any => ({ key, label, autoCapitalize, isSecure, value })

export {
  createFormField
}
