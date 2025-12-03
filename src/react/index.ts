/**
 * Ausdata SDK React
 * React components for Ausdata Business Search
 */

// Main UI component
export { AusdataUI } from './components/AusdataUI';
export type { AusdataUIProps } from './components/AusdataUI';

// Re-export core types for convenience
export type {
  BusinessEntity,
  SearchBusinessParams,
  SearchBusinessResponseData,
  AusdataError,
} from '../index';

