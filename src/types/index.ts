export type UserRole = 'student' | 'contributor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  created_at?: string;
}

export interface Subject {
  id: number;
  code: string;
  name: string;
  semester: number;
  department: string;
  paper_count?: number;
  created_at?: string;
}

export type ExamType = 'midterm' | 'endterm' | 'quiz' | 'supplementary';
export type PaperStatus = 'pending' | 'approved' | 'rejected';

export interface PaperTopic {
  id: number;
  name: string;
  count: number;
}

export interface Paper {
  id: number;
  subject_id: number;
  year: number;
  exam_type: ExamType;
  file_path: string;
  file_hash: string;
  uploaded_by: string;
  status: PaperStatus;
  reviewed_by?: string | null;
  created_at: string;
  subject_code?: string;
  subject_name?: string;
  semester?: number;
  department?: string;
  uploader_name?: string;
  uploader_email?: string;
  download_count: number;
  topics?: PaperTopic[];
}

export interface TopicRanking {
  topic_id: number;
  topic_name: string;
  total_count: number;
  paper_count: number;
}

export interface SubjectTopicsData {
  subject: Subject;
  rankedTopics: TopicRanking[];
  yearTrend: Record<string, any>[];
  rawYearTrend: { topic_name: string; year: number; count: number }[];
}

export interface PlatformStats {
  totalPapers: number;
  pendingPapers: number;
  approvedPapers: number;
  totalSubjects: number;
  totalDownloads: number;
  totalUsers: number;
}

export interface PaginatedPapersResponse {
  papers: Paper[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
