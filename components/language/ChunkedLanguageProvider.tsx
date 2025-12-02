"use client";

// 🕊️ DIVINE PARSING ORACLE - CHUNKED I18N SYSTEM
// ARCHITECTURE: MODULAR_LOADING_FRAMEWORK
// FEATURES: LAZY_LOADING, CACHING, ROUTE_BASED_LOADING
// ADAPTED FOR: Electrical Enterprise

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Language = "es" | "en";
type TranslationStrings = Record<string, any>;
type LoadedNamespace = Record<string, TranslationStrings>;

// Core Divine Parsing Oracle Interface
interface DivineParsingOracleContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (
    key: string,
    namespace?: string | Record<string, any>,
    variables?: Record<string, any>,
  ) => string;
  isLoading: boolean;
  loadedNamespaces: string[];
  invokeOracle: (namespace: string) => Promise<void>;
  invokeOracles: (namespaces: string[]) => Promise<void>;
  getLoadedNamespaces: () => string[];
  isOracleActive: (namespace: string) => boolean;
  error: string | null;
}

// Dynamic imports for translations (will be populated as files are created)
const translationRegistry: Record<string, TranslationStrings> = {};

// Helper to safely import translation files
const loadTranslation = async (
  language: Language,
  namespace: string,
): Promise<TranslationStrings> => {
  try {
    const key = `${language}-${namespace}`;
    
    // Check if already loaded
    if (translationRegistry[key]) {
      return translationRegistry[key];
    }

    // Dynamic import
    const translationModule = await import(`../../locales/${language}/${namespace}.json`);
    const translations = translationModule.default || translationModule;
    
    // Cache it
    translationRegistry[key] = translations;
    
    return translations;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Translation not found: ${language}/${namespace}`);
    }
    return {};
  }
};

const invokeOracle = async (
  language: Language,
  namespace: string,
): Promise<TranslationStrings> => {
  return loadTranslation(language, namespace);
};

const invokeOracles = async (
  language: Language,
  namespaces: string[],
): Promise<LoadedNamespace> => {
  const results: LoadedNamespace = {};
  
  const promises = namespaces.map(async (namespace) => {
    const translations = await invokeOracle(language, namespace);
    results[namespace] = translations;
  });

  await Promise.all(promises);
  return results;
};

// Browser language detection
const detectBrowserLanguage = (): Language => {
  if (typeof window === "undefined") return "es";

  try {
    if (!navigator?.language) return "es";
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("en")) return "en";
    return "es";
  } catch {
    return "es";
  }
};

const LANGUAGE_STORAGE_KEY = "electrical-enterprise-language";

const getStoredLanguage = (): Language | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "es" || stored === "en") {
      return stored as Language;
    }
    return null;
  } catch {
    return null;
  }
};

const setStoredLanguage = (language: Language): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Silently fail
  }
};

// Divine Parsing Oracle Context
const DivineParsingOracleContext = createContext<
  DivineParsingOracleContextType | undefined
>(undefined);

const DivineParsingOracleProvider: React.FC<{
  children: React.ReactNode;
  initialNamespaces?: string[];
  initialLanguage?: Language;
}> = ({ children, initialNamespaces = ["common"], initialLanguage }) => {
  const getInitialLanguage = (): Language => {
    if (initialLanguage) return initialLanguage;
    if (typeof window === "undefined") return "es";
    return getStoredLanguage() || detectBrowserLanguage();
  };

  const initialLang = getInitialLanguage();

  const [language, setLanguageState] = useState<Language>(initialLang);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedNamespaces, setLoadedNamespaces] =
    useState<string[]>(initialNamespaces);
  const [loadedTranslations, setLoadedTranslations] = useState<LoadedNamespace>(
    {},
  );

  // Initialize language and load base namespaces
  useEffect(() => {
    const initializeOracle = async () => {
      try {
        setError(null);
        setIsLoading(true);

        const stored = getStoredLanguage();
        if (stored && stored !== language) {
          setLanguageState(stored);
          setStoredLanguage(stored);
        }

        if (initialNamespaces.length > 0) {
          const translations = await invokeOracles(language, initialNamespaces);
          setLoadedTranslations(translations);
        }
      } catch (err) {
        setError("Failed to initialize translation oracle");
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      initializeOracle();
    }
  }, [initialNamespaces, language]);

  // Language change handler
  const setLanguage = useCallback(
    async (newLanguage: Language) => {
      try {
        setError(null);
        setIsLoading(true);

        setLanguageState(newLanguage);
        setStoredLanguage(newLanguage);

        if (loadedNamespaces.length > 0) {
          const newTranslations = await invokeOracles(
            newLanguage,
            loadedNamespaces,
          );
          setLoadedTranslations(newTranslations);
        }
      } catch (err) {
        setError("Failed to change language");
      } finally {
        setIsLoading(false);
      }
    },
    [loadedNamespaces],
  );

  // Namespace loading functions
  const invokeOracleSingle = useCallback(
    async (namespace: string) => {
      if (loadedNamespaces.includes(namespace)) {
        return;
      }

      try {
        const translations = await invokeOracle(language, namespace);
        setLoadedTranslations((prev) => ({
          ...prev,
          [namespace]: translations,
        }));
        setLoadedNamespaces((prev) => [...prev, namespace]);
      } catch (err) {
        setError(`Failed to load translations for ${namespace}`);
      }
    },
    [language, loadedNamespaces],
  );

  const invokeOraclesMultiple = useCallback(
    async (namespaces: string[]) => {
      const newNamespaces = namespaces.filter(
        (ns) => !loadedNamespaces.includes(ns),
      );

      if (newNamespaces.length === 0) {
        return;
      }

      try {
        setIsLoading(true);
        const newTranslations = await invokeOracles(language, newNamespaces);
        setLoadedTranslations((prev) => ({
          ...prev,
          ...newTranslations,
        }));
        setLoadedNamespaces((prev) => [...prev, ...newNamespaces]);
      } catch (err) {
        setError("Failed to load translation namespaces");
      } finally {
        setIsLoading(false);
      }
    },
    [language, loadedNamespaces],
  );

  // Helper to get nested value from object
  const getNestedValue = (obj: any, path: string): any => {
    const keys = path.split(".");
    let current = obj;

    for (const key of keys) {
      if (current === null || current === undefined) {
        return undefined;
      }
      current = current[key];
    }

    return current;
  };

  // Translation function with fallback chain
  const t = useMemo(() => {
    return (
      key: string,
      namespace?: string | Record<string, any>,
      variables?: Record<string, any>,
    ): string => {
      let actualNamespace = "common";
      let actualVariables: Record<string, any> | undefined = variables;

      if (typeof namespace === "string") {
        actualNamespace = namespace;
      } else if (typeof namespace === "object" && namespace !== null) {
        actualVariables = namespace;
      }

      const performInterpolation = (text: string): string => {
        if (!actualVariables) return text;
        return text.replace(
          /\{(\w+)\}/g,
          (_, k) => actualVariables![k]?.toString() || `{${k}}`,
        );
      };

      try {
        // Try direct lookup
        const namespaceTranslations = loadedTranslations[actualNamespace];
        if (namespaceTranslations) {
          const flatValue = (namespaceTranslations as any)[key];
          if (typeof flatValue === "string" && flatValue.trim().length > 0) {
            return performInterpolation(flatValue);
          }

          const nestedValue = getNestedValue(namespaceTranslations, key);
          if (typeof nestedValue === "string" && nestedValue.trim().length > 0) {
            return performInterpolation(nestedValue);
          }
        }

        // Fallback to common namespace
        if (actualNamespace !== "common") {
          const commonTranslations = loadedTranslations["common"];
          if (commonTranslations) {
            const commonValue = (commonTranslations as any)[key];
            if (typeof commonValue === "string" && commonValue.trim().length > 0) {
              return performInterpolation(commonValue);
            }
          }
        }

        // Final fallback - format key
        return performInterpolation(
          key.replace(/_/g, " ").replace(/([A-Z])/g, " $1").trim(),
        );
      } catch (error) {
        return performInterpolation(key);
      }
    };
  }, [language, loadedTranslations]);

  // Utility functions
  const getLoadedNamespaces = useCallback(
    () => loadedNamespaces,
    [loadedNamespaces],
  );

  const isOracleActive = useCallback(
    (namespace: string) => loadedNamespaces.includes(namespace),
    [loadedNamespaces],
  );

  const contextValue: DivineParsingOracleContextType = {
    language,
    setLanguage,
    t,
    isLoading,
    loadedNamespaces,
    invokeOracle: invokeOracleSingle,
    invokeOracles: invokeOraclesMultiple,
    getLoadedNamespaces,
    isOracleActive,
    error,
  };

  return (
    <DivineParsingOracleContext.Provider value={contextValue}>
      {children}
    </DivineParsingOracleContext.Provider>
  );
};

// Divine hook for components
export function useDivineParsing(namespaces: string[] = []) {
  const context = useContext(DivineParsingOracleContext);

  useEffect(() => {
    if (context && namespaces.length > 0) {
      const unloadedNamespaces = namespaces.filter(
        (ns) => !context.loadedNamespaces.includes(ns),
      );
      if (unloadedNamespaces.length > 0) {
        context.invokeOracles(unloadedNamespaces);
      }
    }
  }, [namespaces, context]);

  if (!context) {
    return {
      language: "es" as Language,
      setLanguage: () => {},
      t: (key: string) => key,
      isLoading: false,
      loadedNamespaces: [] as string[],
      invokeOracle: async () => {},
      invokeOracles: async () => ({}),
      getLoadedNamespaces: () => [],
      isOracleActive: () => false,
      error: null,
    };
  }

  return context;
}

export { DivineParsingOracleProvider };

