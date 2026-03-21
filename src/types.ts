export type Messages = Record<string, any>;

export type Locale = string;

export type I18nConfig<TMessages extends Messages> = {
	defaultLocale: Locale;
	messages?: Record<Locale, TMessages>;
	loader?: (locale: Locale) => Promise<TMessages>;
};
