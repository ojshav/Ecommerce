import { useCallback, useRef } from 'react';

type Item = { id: string; text: string };
type BatchResponse = { items: { id: string; translatedText: string }[] };

export function useAmazonTranslate(apiBase = import.meta.env.VITE_API_BASE_URL || '') {
  const cacheRef = useRef(new Map<string, string>());

  const translateBatch = useCallback(
    async (items: Item[], targetLang: string, contentType: 'text/plain' | 'text/html' = 'text/plain'): Promise<Record<string, string>> => {
      const out: Record<string, string> = {};
      const toSend: Item[] = [];
      for (const it of items) {
        const key = `${targetLang}:${contentType}:${it.text}`;
        if (cacheRef.current.has(key)) {
          out[it.id] = cacheRef.current.get(key)!;
        } else {
          toSend.push(it);
        }
      }
      if (toSend.length === 0) return out;
      const res = await fetch(`${apiBase}/api/translate/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: toSend, targetLang, sourceLang: 'en', contentType })
      });
      if (!res.ok) return out; // fail open
      const data: BatchResponse = await res.json();
      for (const { id, translatedText } of data.items) {
        const text = toSend.find((x) => x.id === id)?.text ?? '';
        const key = `${targetLang}:${contentType}:${text}`;
        cacheRef.current.set(key, translatedText);
        out[id] = translatedText;
      }
      return out;
    },
    [apiBase]
  );

  return { translateBatch };
}
