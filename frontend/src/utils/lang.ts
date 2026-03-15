import { Language } from '../constants';

/**
 * Gets the localized value of a field from an item.
 * Falls back to the English version, then the base field if available.
 */
export function getLocalized(item: any, field: string, lang: Language): string {
  if (!item) return '';

  const localizedKey = `${field}_${lang}`;
  const englishKey = `${field}_en`;

  return item[localizedKey] || item[englishKey] || item[field] || '';
}
