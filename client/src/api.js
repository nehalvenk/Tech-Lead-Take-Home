const BASE = 'http://localhost:3001/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const fetchSubmissions = ({ search = '', status = 'all', startDate = '', endDate = '' } = {}) => {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (status && status !== 'all') params.set('status', status);
  if (startDate) params.set('startDate', startDate);
  if (endDate) params.set('endDate', endDate);
  return request(`/submissions?${params}`);
};

export const createSubmission = (data) =>
  request('/submissions', { method: 'POST', body: JSON.stringify(data) });

export const updateSubmission = (id, data) =>
  request(`/submissions/${id}`, { method: 'PUT', body: JSON.stringify(data) });
