/**
 * Converts a File object to a base64 string.
 * @param {File} file
 * @returns {Promise<string>} base64 string without the data URI prefix
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Strip "data:image/...;base64," prefix
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

export function base64ToDataUri(base64: string): string | null {
  if (!base64) return null;
  // If it already starts with data: return as-is
  if (base64.startsWith("data:")) return base64;
  return `data:image/jpeg;base64,${base64}`;
}
