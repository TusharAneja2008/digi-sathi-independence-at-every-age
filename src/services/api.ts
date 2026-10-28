import {
  User,
  Subject,
  Paper,
  SubjectTopicsData,
  PlatformStats,
  PaginatedPapersResponse,
} from '../types/index.js';

const API_BASE = '/api';

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem('pyqvault_token');
  }

  setToken(token: string) {
    localStorage.setItem('pyqvault_token', token);
  }

  clearToken() {
    localStorage.removeItem('pyqvault_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMsg = data?.error?.message || `Request failed with status ${res.status}`;
      throw new Error(errorMsg);
    }

    return data.data !== undefined ? data.data : data;
  }

  // Auth
  async login(credentials: { email: string; password: string }) {
    return this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(payload: { name: string; email: string; password: string; role?: string }) {
    return this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getMe() {
    return this.request<{ user: User }>('/auth/me');
  }

  // Subjects
  async getSubjects(filters: { semester?: number; department?: string; search?: string } = {}) {
    const params = new URLSearchParams();
    if (filters.semester) params.append('semester', filters.semester.toString());
    if (filters.department) params.append('department', filters.department);
    if (filters.search) params.append('search', filters.search);

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<{ subjects: Subject[] }>(`/subjects${query}`);
  }

  async getSubjectById(id: number | string) {
    return this.request<{ subject: Subject }>(`/subjects/${id}`);
  }

  async createSubject(data: { code: string; name: string; semester: number; department: string }) {
    return this.request<{ subject: Subject }>('/subjects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSubjectTopics(idOrCode: string | number) {
    return this.request<SubjectTopicsData>(`/subjects/${idOrCode}/topics`);
  }

  // Papers
  async getPapers(filters: {
    subject?: string;
    year?: number;
    exam?: string;
    q?: string;
    page?: number;
    limit?: number;
  } = {}) {
    const params = new URLSearchParams();
    if (filters.subject) params.append('subject', filters.subject);
    if (filters.year) params.append('year', filters.year.toString());
    if (filters.exam) params.append('exam', filters.exam);
    if (filters.q) params.append('q', filters.q);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<PaginatedPapersResponse>(`/papers${query}`);
  }

  async getPaperById(id: number | string) {
    return this.request<{ paper: Paper }>(`/papers/${id}`);
  }

  async uploadPaper(formData: FormData) {
    return this.request<{ paper: Paper; message: string }>('/papers', {
      method: 'POST',
      body: formData,
    });
  }

  getDownloadUrl(id: number | string): string {
    return `${API_BASE}/papers/${id}/download`;
  }

  getPreviewUrl(id: number | string): string {
    return `${API_BASE}/papers/${id}/preview`;
  }

  // Admin
  async getAdminPapers(status: string = 'pending') {
    return this.request<{ papers: Paper[] }>(`/admin/papers?status=${status}`);
  }

  async updatePaperStatus(id: number, status: 'approved' | 'rejected') {
    return this.request<{ paper: Paper; message: string; analysisTriggered: boolean; topicsCount?: number }>(
      `/admin/papers/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }
    );
  }

  async getAdminStats() {
    return this.request<{ stats: PlatformStats }>('/admin/stats');
  }

  // Health
  async getHealth() {
    const res = await fetch('/health');
    return res.json();
  }
}

export const api = new ApiClient();
