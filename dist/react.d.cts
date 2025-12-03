import * as react_jsx_runtime from 'react/jsx-runtime';
export { AusdataError, BusinessEntity, SearchBusinessParams, SearchBusinessResponseData } from './index.cjs';
import './server.cjs';

/**
 * AusdataUI Component
 * Complete, ready-to-use business search interface with all features built-in
 *
 * @example
 * ```tsx
 * import { AusdataUI } from '@ausdata/sdk/react';
 *
 * export default function BusinessPage() {
 *   return <AusdataUI apiKey="your-api-key" />;
 * }
 * ```
 */
declare const THEMES: readonly ["minimal", "brand", "light", "dark", "eye"];
declare const VARIANTS: readonly [{
    readonly value: "table";
    readonly label: "Table";
}, {
    readonly value: "card";
    readonly label: "Card";
}];
type Theme = (typeof THEMES)[number];
type Variant = (typeof VARIANTS)[number]['value'];
interface AusdataUIProps {
    /** Required: Your Ausdata API key */
    apiKey?: string;
    /** Base URL for the API (optional, defaults to '/api' for proxy) */
    baseUrl?: string;
    /** Default theme (default: 'minimal') */
    defaultTheme?: Theme;
    /** Default variant: 'table' or 'card' (default: 'table') */
    defaultVariant?: Variant;
    /** Compact mode (default: false) */
    dense?: boolean;
    /** Show control panel for theme/variant selection (default: true) */
    showControlPanel?: boolean;
    /** Page title (default: 'Ausdata Business Search') */
    title?: string;
    /** Custom CSS class name for the container */
    className?: string;
    /** Custom styles for the container */
    style?: React.CSSProperties;
}
declare function AusdataUI(props: AusdataUIProps): react_jsx_runtime.JSX.Element;

export { AusdataUI, type AusdataUIProps };
