/**
 * Shared domain contracts used by public pages, Roddy's dashboard and the future backend.
 * Change these in small, reviewed PRs — see docs/team/INTEGRATION_CONTRACT.md.
 * Database schema lives in docs/architecture/DATA_MODEL.md; these are the read models the UI needs.
 */

export type Id = string;
export type IsoDate = string;

/** Content lifecycle. `demo` / `draft-sample` items must render a visible label. */
export type ContentStatus = "published" | "draft-sample" | "demo";

/** Money is always integer minor units + ISO currency. `null` = price not yet approved. */
export type Money = { amountMinor: number; currency: "GHS" | "USD" | "EUR" | "GBP" };

export type Role = "student" | "coach" | "admin";

export type UserSummary = {
  id: Id;
  displayName: string;
  email: string;
  roles: Role[];
  avatarUrl?: string | null;
};

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type CourseSummary = {
  id: Id;
  slug: string;
  title: string;
  subtitle: string;
  level: CourseLevel;
  tags: string[];
  lessonsCount: number | null;
  durationHours: number | null;
  price: Money | null;
  status: ContentStatus;
};

export type CourseModule = { title: string; lessons: { title: string; durationMinutes: number | null }[] };

export type CourseDetail = CourseSummary & {
  description: string[];
  outcomes: string[];
  modules: CourseModule[];
};

export type EnrollmentStatus = "active" | "pending_payment" | "revoked" | "expired";

export type Enrollment = {
  id: Id;
  userId: Id;
  courseId: Id;
  status: EnrollmentStatus;
  grantedAt: IsoDate | null;
  source: "purchase" | "free" | "admin_grant";
};

export type LessonProgress = {
  userId: Id;
  lessonId: Id;
  completedAt: IsoDate | null;
  positionSeconds: number;
};

export type CohortStatus = "upcoming" | "enrolling" | "full" | "running" | "closed";

export type Cohort = {
  id: Id;
  slug: string;
  name: string;
  startsAt: IsoDate;
  endsAt: IsoDate | null;
  seatsTotal: number | null;
  seatsRemaining: number | null;
  status: CohortStatus;
  price: Money | null;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: IsoDate;
  readingMinutes: number;
  status: ContentStatus;
  body: string[];
};

export type EventSummary = {
  id: Id;
  slug: string;
  title: string;
  startsAt: IsoDate;
  format: "physical" | "online" | "hybrid";
  location: string | null;
  status: "upcoming" | "sold_out" | "past" | "cancelled";
  price: Money | null;
};

export type Product = {
  id: Id;
  slug: string;
  name: string;
  description: string;
  price: Money | null;
  inventory: number | null;
  status: ContentStatus;
};

export type OrderStatus = "pending" | "paid" | "failed" | "refunded" | "cancelled";

export type OrderSummary = {
  id: Id;
  userId: Id;
  status: OrderStatus;
  total: Money;
  createdAt: IsoDate;
};

/** Discriminated result for any async data adapter (lets UIs render loading/empty/error). */
export type Loadable<T> =
  | { state: "ready"; data: T }
  | { state: "empty" }
  | { state: "error"; message: string };

/** Lead/inquiry kinds accepted by the public forms. */
export type LeadKind = "collaboration" | "coaching" | "cohort_waitlist" | "event_interest" | "academy";

/** Result returned by every public form Server Action. Never reports success that didn't happen. */
export type FormResult =
  | { status: "idle" }
  | { status: "invalid"; fieldErrors: Record<string, string> }
  | { status: "not_configured"; message: string }
  | { status: "sent"; message: string }
  | { status: "error"; message: string };
