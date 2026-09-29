/** Append ° to product "360" mentions in display copy. Leaves URLs/ids alone. */
export const withDegreeMark = (value: string): string => {
  if (
    value.startsWith("/") ||
    value.startsWith("#") ||
    value.startsWith("http") ||
    value === "safri360" ||
    value === "safri-360" ||
    value === "service-360" ||
    value.startsWith("service-") ||
    value.includes("/uploads/")
  ) {
    return value;
  }

  if (value === "360") return "360°";

  return value
    .replace(/Safri 360(?!°)/g, "Safri 360°")
    .replace(/(?<![A-Za-z0-9_/.-])360(?!°)/g, "360°");
};

const SKIP_KEYS = new Set([
  "id",
  "path",
  "ctaPath",
  "teaserCtaPath",
  "primaryCtaPath",
  "secondaryCtaPath",
  "slug",
]);

export const normalizeDegreeMarks = <T>(value: T, key?: string): T => {
  if (typeof value === "string") {
    if (key && SKIP_KEYS.has(key)) return value;
    return withDegreeMark(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeDegreeMarks(item)) as T;
  }

  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = normalizeDegreeMarks(v, k);
    }
    return out as T;
  }

  return value;
};
