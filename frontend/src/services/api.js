const BASE = 'http://localhost:8000/api';

async function safeFetch(path, opts) {
  try {
    const r = await fetch(BASE + path, opts);
    if (!r.ok) throw new Error('bad response');
    return await r.json();
  } catch (e) {
    return null; // backend unavailable -> caller falls back to mock
  }
}

export const getDashboard = () => safeFetch('/dashboard');
export const runAnalysis = () => safeFetch('/analyze', { method: 'POST' });
export const generateReport = () => safeFetch('/report/generate', { method: 'POST' });
export const uploadImage = (file) => {
  const fd = new FormData();
  fd.append('file', file);
  return safeFetch('/upload/image', { method: 'POST', body: fd });
};
