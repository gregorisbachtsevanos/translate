import { Messages, Locale, I18nConfig } from "./types";
import { getValue } from "./utils";

export function createI18n<TMessages extends Messages>(
	config: I18nConfig<TMessages>
) {
	let currentLocale = config.defaultLocale;
	let messages: Record<Locale, TMessages> = config.messages || {};

	const loadLocale = async (locale: Locale) => {
		if (!messages[locale] && config.loader) {
			messages[locale] = await config.loader(locale);
		}
	};

	const setLocale = async (locale: Locale) => {
		currentLocale = locale;
		await loadLocale(locale);
	};

	const t = (key: string, fallback?: string): string => {
		const value = getValue(messages[currentLocale], key);
		return value ?? fallback ?? key;
	};

	const getLocale = () => currentLocale;

	return {
		t,
		setLocale,
		getLocale,
		loadLocale,
	};
}
