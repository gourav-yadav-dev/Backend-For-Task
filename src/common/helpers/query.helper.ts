import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT } from '../constants/index.js';
import type { PaginationMeta, PaginationQuery } from './pagination.helper.js';

export function parsePaginationQuery(query: Record<string, unknown>): PaginationQuery {
  const page = Math.max(1, Number(query.page) || DEFAULT_PAGE);
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number(query.limit) || DEFAULT_LIMIT));
  const search = typeof query.search === 'string' ? query.search.trim() : undefined;
  const sortBy = typeof query.sortBy === 'string' ? query.sortBy : undefined;
  const sortOrder =
    query.sortOrder === 'DESC' || query.sortOrder === 'ASC'
      ? query.sortOrder
      : undefined;

  return { page, limit, search, sortBy, sortOrder };
}

export function buildPaginationMeta(
  page: number,
  limit: number,
  total: number,
): PaginationMeta {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

export function getOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}
