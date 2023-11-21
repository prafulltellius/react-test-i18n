 import { getI18nInstance } from "./i18Instances";
 
 /**
     * Change the language and optionally update the HTML lang attribute.
     * @param {string} value - The language code to switch to.
     * @param {boolean} doesChangeHTML - Whether to update the HTML lang attribute.
     */
 export function changeLanguage(value, doesChangeHTML = false) {
    const i18Instances =getI18nInstance();
    i18Instances.changeLanguage(value).then(() => {
      if (doesChangeHTML) {
        document.documentElement.setAttribute("lang", value);
      }
    });
  }

  /**
   * Get the current language.
   * @returns {string} - The current language code.
   */
 export function getLanguage() {
    const i18Instances =getI18nInstance();
    return i18Instances.language;
  }