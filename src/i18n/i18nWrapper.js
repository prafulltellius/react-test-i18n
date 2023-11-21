import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import ChainedBackend  from "i18next-chained-backend";
import addResourcesToBackend from "i18next-resources-to-backend";
// import { initReactI18next } from "react-i18next";
import { setI18nInstance } from "./i18Instances";

const globalConfig = import.meta.env;

class I18nWrapper {
    constructor() {
      // Initialize i18next instance
      this.isInitialized = false;
      this.i18nInstance = i18next.createInstance();
      this.i18nInstance.use(ChainedBackend)
      this.config = { backend: { backends: [], backendOptions: [] } };
    }
  
    /**
     * Add a plugin to the i18next instance.
     * @param {Function} Plugin - The i18next plugin to be added.
     * @returns {I18nWrapper} - The current instance for chaining.
     */
    use(Plugin) {
      if (this.isInitialized) {
        throw new Error("Do not integrate plugins after initialization");
      }
      this.i18nInstance.use(Plugin);
      return this;
    }
  
    /**
     * Add a language detector to the i18next instance.
     * @param {Object} options - Configuration options for the language detector.
     * @returns {I18nWrapper} - The current instance for chaining.
     */
    useLanguageDetector({ LanguageDetectorPlugin = LanguageDetector, config = {} } = {}) {
      this.use(LanguageDetectorPlugin);
      this.config = { ...this.config, detection: config };
      return this;
    }
  
    /**
     * Configure i18next for Webpack code splitting.
     * @param {Object} options - Configuration options for code splitting.
     * @returns {I18nWrapper} - The current instance for chaining.
     * @throws {Error} - If the configuration is undefined.
     */
    useWebpackCodeSplitting({ configuration = undefined, languageVsDefaultNameSpace } = {}) {
      if (configuration === undefined) {
        throw new Error("Configuration should be either an object or a function. Found undefined");
      }
      this.config.backend.backends.push(addResourcesToBackend((language, namespace) => {
        if (typeof configuration === 'function') {
          return configuration(language, namespace);
        }
        const finalizedNameSpace = namespace || languageVsDefaultNameSpace[language];
        /*@vite-ignore*/
        return import(`locales/${language}/${finalizedNameSpace}.json`);
      }));
      return this;
    }
  
    /**
     * Add a backend plugin to i18next.
     * @param {Object} options - Configuration options for the backend plugin.
     * @returns {I18nWrapper} - The current instance for chaining.
     */
    useBackendPlugins({ plugin = HttpApi, configurations = {} } = {}) {
      this.config.backend.backends.push(plugin);
      this.config.backend.backendOptions.push(configurations);
      return this;
    }
  
    // /**
    //  * Configure i18next for React integration.
    //  * @param {Object} reactConfig - Configuration options for React integration.
    //  * @returns {I18nWrapper} - The current instance for chaining.
    //  */
    // useReact(reactConfig) {
    //   this.clientFramework = 'react';
    //   this.use(initReactI18next);
    //   this.config = { ...this.config, react: reactConfig };
    //   return this;
    // }
  
    /**
     * Initialize i18next with the provided configuration.
     * @param {Object} override - Additional configuration to override defaults.
     * @returns {I18nWrapper} - The current instance for chaining.
     */
    init(override) {
      this.isInitialized = true;
      this.i18nInstance.init({
        ...this.config,
        ...override
      }).then(() => {
        if (globalConfig.NODE_ENV === 'development') {
          console.log("i18n Initialized successfully");
        }
      }).catch((error) => {
        if (globalConfig.NODE_ENV === 'development') {
          console.error("Error in i18n");
          console.error(error);
        }
        console.error("There is an error encountered with i18n. Please check the config");
      });
      
      setI18nInstance(this.i18nInstance);
      // Expose translation function globally
      window.__ = this.i18nInstance.t;
  
    }
  }
  
export default new I18nWrapper();  