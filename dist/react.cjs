'use strict';

var chunkZCVEUCE2_cjs = require('./chunk-ZCVEUCE2.cjs');
require('./chunk-TKXNGZDK.cjs');
var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

var styleElement = null;
var CSS_CONTENT = `.app-root {\n  min-height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n  padding: 3rem 1.5rem;\n  /* 背景颜色由 body[data-ausdata-theme] 控制，这里保持透明即可 */\n  background: transparent;\n  color: inherit;\n  box-sizing: border-box;\n}\n\n.business-search {\n  width: 100%;\n  max-width: 960px;\n  margin: 0 auto;\n}\n\n.business-search-header {\n  margin-bottom: 2rem;\n  text-align: center;\n}\n\n.business-search-title {\n  font-size: clamp(2rem, 3vw, 2.6rem);\n  font-weight: 650;\n  letter-spacing: -0.03em;\n  margin: 0 0 0.75rem;\n  color: #f9fafb;\n}\n\n.business-search-subtitle {\n  margin: 0 auto;\n  font-size: 0.95rem;\n  color: #9ca3af;\n  max-width: 480px;\n}\n\n.business-search-header-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 1rem;\n  flex-wrap: wrap;\n}\n\n/* New panel container for form and controls */\n.business-search-panel {\n  background: transparent;\n  border-radius: 0.85rem;\n  padding: 1.5rem 1.75rem;\n  border: 1px solid rgba(55, 65, 81, 0.4);\n  backdrop-filter: none;\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n  margin: 0 auto 1rem; /* Center panel and add bottom margin */\n  max-width: 720px;\n}\n\n.business-style-controls {\n  display: flex; /* Use flex instead of inline-flex for better consistency */\n  gap: 1.5rem; /* Increase gap between controls */\n  align-items: center;\n  font-size: 0.8rem;\n  justify-content: center; /* Center controls within their container */\n  border-top: 1px solid rgba(55, 65, 81, 0.6); /* Add a separator line */\n  padding-top: 1.25rem;\n  width: 100%; /* Ensure it takes full width of the panel */\n}\n\n.business-style-controls label {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  color: #9ca3af;\n}\n\n.business-style-controls select {\n  border-radius: 5px;\n  border: 1px solid rgba(148, 163, 184, 0.9);\n  background-color: #020617;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E");\n  background-repeat: no-repeat;\n  background-position: right 0.5rem center;\n  background-size: 0.75rem;\n  color: #e5e7eb;\n  padding: 0.35rem 2rem 0.35rem 0.7rem;\n  font-size: 0.8rem;\n  outline: none;\n  appearance: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  cursor: pointer;\n  transition: border-color 0.2s ease, background-color 0.2s ease;\n}\n\n.business-style-controls select:hover {\n  border-color: rgba(148, 163, 184, 1);\n  background-color: rgba(15, 23, 42, 0.95);\n}\n\n.business-style-controls select:focus {\n  border-color: rgba(79, 70, 229, 0.8);\n  background-color: rgba(15, 23, 42, 0.95);\n}\n\n.business-search-form {\n  /* No longer needs its own background/border/padding, handled by panel */\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.business-search-label {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n  align-items: center; /* Center label text and input row */\n}\n\n.business-search-label span {\n  font-size: 0.85rem;\n  text-transform: uppercase;\n  letter-spacing: 0.12em;\n  color: #9ca3af;\n}\n\n.business-search-input-row {\n  display: flex;\n  gap: 0.75rem;\n  align-items: center;\n  width: 100%;\n  max-width: 580px; /* Control max width of the search bar itself */\n}\n\n.business-search-input-wrapper {\n  position: relative;\n  flex: 1;\n  max-width: 100%; /* Remove fixed width, let the panel control it */\n}\n\n.business-search-input {\n  width: 100%;\n  border-radius: 0.375rem;\n  border: 1px solid #d1d5db;\n  background: #0b1120;\n  color: #e5e7eb;\n  padding: 0.5rem 0.75rem 0.5rem 2.4rem;\n  font-size: 0.9rem;\n  outline: none;\n  transition:\n    border-color 0.15s ease,\n    background-color 0.15s ease,\n    color 0.15s ease;\n}\n\n.business-search-input::placeholder {\n  color: #6b7280;\n}\n\n.business-search-input:focus {\n  border-color: #818cf8;\n  background: #020617;\n}\n\n.business-search-input-icon {\n  position: absolute;\n  left: 0.7rem;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 0.9rem;\n  height: 0.9rem;\n  pointer-events: none;\n  color: #6b7280;\n}\n\n.business-search-button {\n  /* 尽量接近原生按钮，只做轻微统一 */\n  border-radius: 0.375rem;\n  border: 1px solid #d1d5db;\n  padding: 0.45rem 0.9rem;\n  font-size: 0.9rem;\n  font-weight: 500;\n  font-family: inherit;\n  background: buttonface;\n  color: inherit;\n  cursor: pointer;\n  white-space: nowrap;\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  transition:\n    background-color 0.12s ease,\n    border-color 0.12s ease,\n    color 0.12s ease,\n    opacity 0.12s ease;\n}\n\n/* 视觉主题：minimal（当前默认整体风格） */\n.business-search-tone-minimal .business-search-panel {\n  background: rgba(15, 23, 42, 0.9);\n  border-color: rgba(55, 65, 81, 0.9);\n}\n\n.business-search-tone-minimal .business-search-button {\n  background: #111827;\n  border-color: #4b5563;\n  color: #f9fafb;\n}\n\n.business-search-tone-minimal .business-search-input {\n  background: #020617;\n  border-color: #4b5563;\n}\n\n.business-search-tone-minimal .business-search-button:hover:not(:disabled) {\n  background: #020617;\n  border-color: #6b7280;\n}\n\n.business-search-tone-minimal .business-table-wrapper {\n  background: radial-gradient(circle at top left, #020617 0, #020617 45%, #000 100%);\n}\n\n.business-search-tone-minimal .business-card {\n  background: rgba(15, 23, 42, 0.95);\n  border-color: rgba(55, 65, 81, 0.9);\n}\n\n.business-search-tone-minimal .business-list-item {\n  background: rgba(15, 23, 42, 0.95);\n  border-color: rgba(55, 65, 81, 0.9);\n}\n\n.business-search-tone-minimal .business-table tbody tr:hover {\n  background: rgba(15, 23, 42, 0.9);\n}\n\n.business-search-tone-minimal .business-card:hover {\n  background: rgba(15, 23, 42, 0.9);\n  border-color: rgba(75, 85, 99, 0.95);\n}\n\n.business-search-tone-minimal .business-list-item:hover {\n  background: rgba(15, 23, 42, 0.98);\n  border-color: rgba(75, 85, 99, 0.95);\n}\n\n/* 视觉主题：brand（稍微突出一些品牌色，但保持无阴影） */\n.business-search-tone-brand .business-search-panel {\n  background: rgba(15, 23, 42, 0.95);\n  border-color: rgba(79, 70, 229, 0.8);\n}\n\n.business-search-tone-brand .business-search-button {\n  background: #4f46e5;\n  border-color: #4f46e5;\n  color: #f9fafb;\n}\n\n.business-search-tone-brand .business-search-button:hover:not(:disabled) {\n  background: #4338ca;\n  border-color: #4338ca;\n}\n\n.business-search-tone-brand .business-table-wrapper {\n  border-color: rgba(79, 70, 229, 0.85);\n}\n\n.business-search-tone-brand .business-card {\n  background: rgba(15, 23, 42, 0.97);\n  border-color: rgba(79, 70, 229, 0.85);\n}\n\n.business-search-tone-brand .business-list-item {\n  background: rgba(15, 23, 42, 0.97);\n  border-color: rgba(79, 70, 229, 0.85);\n}\n\n.business-search-tone-brand .business-table tbody tr:hover {\n  background: rgba(15, 23, 42, 0.9);\n}\n\n.business-search-tone-brand .business-card:hover {\n  background: rgba(15, 23, 42, 0.9);\n  border-color: rgba(79, 70, 229, 0.95);\n}\n\n.business-search-tone-brand .business-list-item:hover {\n  background: rgba(15, 23, 42, 0.98);\n  border-color: rgba(79, 70, 229, 0.95);\n}\n\n/* 视觉主题：light（纯白，适合集成到浅色页面） */\n.business-search-tone-light .business-search-panel {\n  background: #ffffff;\n  border-color: #e5e7eb;\n  color: #111827;\n}\n\n.business-search-tone-light .business-search-title {\n  color: #111827;\n}\n\n.business-search-tone-light .business-search-subtitle {\n  color: #4b5563;\n}\n\n.business-search-tone-light .business-search-input {\n  background: #f9fafb;\n  border-color: #d1d5db;\n  color: #111827;\n}\n\n.business-search-tone-light .business-search-input::placeholder {\n  color: #9ca3af;\n}\n\n.business-search-tone-light .business-search-button {\n  background: #2563eb;\n  border-color: #2563eb;\n  color: #ffffff;\n}\n\n.business-search-tone-light .business-search-button:hover:not(:disabled) {\n  background: #1d4ed8;\n  border-color: #1d4ed8;\n}\n\n.business-search-tone-light .business-table-wrapper {\n  background: #ffffff;\n  border-color: #e5e7eb;\n}\n\n.business-search-tone-light .business-table thead {\n  background: #f9fafb;\n}\n\n.business-search-tone-light .business-table th {\n  color: #6b7280;\n}\n\n.business-search-tone-light .business-table th,\n.business-search-tone-light .business-table td {\n  color: #111827;\n  border-bottom-color: #e5e7eb;\n}\n\n.business-search-tone-light .business-style-controls select,\n.business-search-tone-light .business-pagination-controls select {\n  background-color: #ffffff;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");\n  border-color: #d1d5db;\n  color: #111827;\n}\n\n.business-search-tone-light .business-style-controls select:hover {\n  background-color: #f9fafb;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");\n  border-color: #9ca3af;\n}\n\n.business-search-tone-light .business-style-controls select:focus {\n  background-color: #f9fafb;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");\n  border-color: #2563eb;\n}\n\n.business-search-tone-light .business-pagination-controls select:hover {\n  background-color: #f9fafb;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");\n  border-color: #9ca3af;\n}\n\n.business-search-tone-light .business-pagination-controls select:focus {\n  background-color: #f9fafb;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");\n  border-color: #2563eb;\n}\n\n.business-search-tone-light .business-pagination-buttons button {\n  border-color: #d1d5db;\n  color: #111827;\n}\n\n.business-search-tone-light .business-card {\n  background: #ffffff;\n  border-color: #e5e7eb;\n}\n\n.business-search-tone-light .business-card-name {\n  color: #111827;\n}\n\n.business-search-tone-light .business-card-abn,\n.business-search-tone-light .business-card-meta,\n.business-search-tone-light .business-card-score {\n  color: #4b5563;\n}\n\n.business-search-tone-light .business-card-address {\n  color: #111827;\n}\n\n.business-search-tone-light .business-list-item {\n  background: #ffffff;\n  border-color: #e5e7eb;\n}\n\n.business-search-tone-light .business-list-name {\n  color: #111827;\n}\n\n.business-search-tone-light .business-list-item:hover {\n  background: #f9fafb;\n  border-color: #d1d5db;\n}\n\n.business-search-tone-light .business-table tbody tr:hover {\n  background: #f9fafb;\n}\n\n.business-search-tone-light .business-card:hover {\n  background: #f9fafb;\n  border-color: #d1d5db;\n}\n\n/* 视觉主题：dark（更纯黑的深色） */\n.business-search-tone-dark .business-search-panel {\n  background: #020617;\n  border-color: #111827;\n}\n\n.business-search-tone-dark .business-table-wrapper {\n  background: #020617;\n  border-color: #111827;\n}\n\n.business-search-tone-dark .business-search-button {\n  background: #020617;\n  border-color: #4b5563;\n  color: #e5e7eb;\n}\n\n.business-search-tone-dark .business-search-input {\n  background: #020617;\n  border-color: #4b5563;\n  color: #e5e7eb;\n}\n\n.business-search-tone-dark .business-search-button:hover:not(:disabled) {\n  background: #020617;\n  border-color: #9ca3af;\n}\n\n.business-search-tone-dark .business-table tbody tr:hover {\n  background: rgba(15, 23, 42, 0.9);\n}\n\n.business-search-tone-dark .business-card {\n  background: #020617;\n  border-color: #111827;\n}\n\n.business-search-tone-dark .business-card:hover {\n  background: rgba(15, 23, 42, 0.9);\n  border-color: rgba(75, 85, 99, 0.95);\n}\n\n.business-search-tone-dark .business-list-item {\n  background: #020617;\n  border-color: #111827;\n}\n\n.business-search-tone-dark .business-list-item:hover {\n  background: rgba(15, 23, 42, 0.98);\n  border-color: rgba(75, 85, 99, 0.95);\n}\n\n/* 视觉主题：eye（护眼，偏暖色） */\n.business-search-tone-eye .business-search-panel {\n  background: #f3f4e4;\n  border-color: #e5e7c8;\n  color: #374151;\n}\n\n.business-search-tone-eye .business-search-title {\n  color: #1f2933;\n}\n\n.business-search-tone-eye .business-search-subtitle {\n  color: #4b5563;\n}\n\n.business-search-tone-eye .business-search-input {\n  background: #fdfdf6;\n  border-color: #d4d7b0;\n  color: #374151;\n}\n\n.business-search-tone-eye .business-search-input::placeholder {\n  color: #9ca38f;\n}\n\n.business-search-tone-eye .business-search-button {\n  background: #374151;\n  border-color: #374151;\n  color: #f9faf3;\n}\n\n.business-search-tone-eye .business-search-button:hover:not(:disabled) {\n  background: #111827;\n  border-color: #111827;\n}\n\n.business-search-tone-eye .business-table-wrapper {\n  background: #fdfdf6;\n  border-color: #e5e7c8;\n}\n\n.business-search-tone-eye .business-table th {\n  background: #f3f4e4;\n  color: #6b7280;\n}\n\n.business-search-tone-eye .business-table th,\n.business-search-tone-eye .business-table td {\n  color: #374151;\n  border-bottom-color: #e5e7c8;\n}\n\n.business-search-tone-eye .business-style-controls select,\n.business-search-tone-eye .business-pagination-controls select {\n  background-color: #fdfdf6;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");\n  border-color: #d4d7b0;\n  color: #374151;\n}\n\n.business-search-tone-eye .business-style-controls select:hover {\n  background-color: #f3f4e4;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");\n  border-color: #9ca38f;\n}\n\n.business-search-tone-eye .business-style-controls select:focus {\n  background-color: #f3f4e4;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");\n  border-color: #374151;\n}\n\n.business-search-tone-eye .business-pagination-controls select:hover {\n  background-color: #f3f4e4;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");\n  border-color: #9ca38f;\n}\n\n.business-search-tone-eye .business-pagination-controls select:focus {\n  background-color: #f3f4e4;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");\n  border-color: #374151;\n}\n\n.business-search-tone-eye .business-pagination-buttons button {\n  border-color: #d4d7b0;\n  color: #374151;\n}\n\n.business-search-tone-eye .business-card {\n  background: #fdfdf6;\n  border-color: #e5e7c8;\n}\n\n.business-search-tone-eye .business-card-name {\n  color: #1f2933;\n}\n\n.business-search-tone-eye .business-card-abn,\n.business-search-tone-eye .business-card-meta,\n.business-search-tone-eye .business-card-score {\n  color: #4b5563;\n}\n\n.business-search-tone-eye .business-card-address {\n  color: #374151;\n}\n\n.business-search-tone-eye .business-list-item {\n  background: #fdfdf6;\n  border-color: #e5e7c8;\n}\n\n.business-search-tone-eye .business-list-name {\n  color: #1f2933;\n}\n\n.business-search-tone-eye .business-list-item:hover {\n  background: #f3f4e4;\n  border-color: #d4d7b0;\n}\n\n.business-search-tone-eye .business-table tbody tr:hover {\n  background: #f3f4e4;\n}\n\n.business-search-tone-eye .business-card:hover {\n  background: #f3f4e4;\n  border-color: #d4d7b0;\n}\n\n.business-search-button:disabled {\n  opacity: 0.7;\n  cursor: default;\n}\n\n.business-search-button span {\n  font-size: 1rem;\n}\n\n.business-search-button-dot {\n  width: 0.4rem;\n  height: 0.4rem;\n  border-radius: 999px;\n  background-color: #bbf7d0;\n  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);\n}\n\n.business-search-meta {\n  display: flex;\n  justify-content: center; /* Center the meta info */\n  align-items: center;\n  font-size: 0.8rem;\n  color: #9ca3af;\n  gap: 0.75rem;\n  margin-bottom: 1.5rem; /* Add some space below */\n}\n\n.business-search-meta span {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n\n.business-search-meta-pill {\n  padding: 0.25rem 0.65rem;\n  border-radius: 999px;\n  background: rgba(15, 23, 42, 0.9);\n  border: 1px solid rgba(55, 65, 81, 0.8);\n  color: #e5e7eb;\n  font-size: 0.75rem;\n}\n\n.business-search-status {\n  margin-bottom: 1rem;\n  font-size: 0.85rem;\n}\n\n.business-search-status span {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  color: #9ca3af;\n}\n\n.business-search-status-dot {\n  width: 0.5rem;\n  height: 0.5rem;\n  border-radius: 999px;\n  background: #22c55e;\n}\n\n.business-search-error {\n  margin-bottom: 1rem;\n  padding: 0.8rem 1rem;\n  border-radius: 0.9rem;\n  border: 1px solid rgba(248, 113, 113, 0.6);\n  background: rgba(127, 29, 29, 0.85);\n  color: #fee2e2;\n  font-size: 0.85rem;\n}\n\n.business-search-empty {\n  margin-top: 1rem;\n  padding: 1.5rem 1.25rem;\n  border-radius: 1.2rem;\n  border: 1px dashed rgba(75, 85, 99, 0.85);\n  background: rgba(15, 23, 42, 0.85);\n  color: #9ca3af;\n  font-size: 0.9rem;\n}\n\n.business-search-empty strong {\n  color: #e5e7eb;\n}\n\n.business-search-results {\n  margin-top: 1.25rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.9rem;\n}\n\n.business-search-results-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  gap: 0.75rem;\n  font-size: 0.9rem;\n  color: #9ca3af;\n}\n\n.business-pagination-controls {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 0.8rem;\n}\n\n.business-pagination-controls label {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n  color: #9ca3af;\n}\n\n.business-pagination-controls select {\n  border-radius: 5px;\n  border: 1px solid rgba(148, 163, 184, 0.9);\n  background-color: #020617;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E");\n  background-repeat: no-repeat;\n  background-position: right 0.35rem center;\n  background-size: 0.75rem;\n  color: #e5e7eb;\n  padding: 0.15rem 1.5rem 0.15rem 0.55rem;\n  font-size: 0.8rem;\n  outline: none;\n  appearance: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  cursor: pointer;\n  transition: border-color 0.2s ease, background-color 0.2s ease;\n}\n\n.business-pagination-controls select:hover {\n  border-color: rgba(148, 163, 184, 1);\n  background-color: rgba(15, 23, 42, 0.95);\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E");\n}\n\n.business-pagination-controls select:focus {\n  border-color: rgba(79, 70, 229, 0.8);\n  background-color: rgba(15, 23, 42, 0.95);\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E");\n}\n\n.business-pagination-page {\n  color: #9ca3af;\n}\n\n.business-pagination-page strong {\n  color: #e5e7eb;\n}\n\n.business-pagination-buttons {\n  display: inline-flex;\n  gap: 0.35rem;\n}\n\n.business-pagination-buttons button {\n  border-radius: 5px;\n  border: 1px solid rgba(148, 163, 184, 0.9);\n  background: transparent;\n  color: #e5e7eb;\n  padding: 0.2rem 0.7rem;\n  font-size: 0.75rem;\n  cursor: pointer;\n  transition:\n    background-color 0.15s ease,\n    border-color 0.15s ease,\n    opacity 0.15s ease;\n}\n\n.business-pagination-buttons button:hover:not(:disabled) {\n  background: rgba(31, 41, 55, 0.9);\n  border-color: rgba(156, 163, 175, 0.9);\n}\n\n.business-pagination-buttons button:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n\n.business-badge {\n  padding: 0.2rem 0.55rem;\n  border-radius: 999px;\n  font-size: 0.7rem;\n  border: 1px solid rgba(75, 85, 99, 0.9);\n  color: #e5e7eb;\n}\n\n.business-badge.status-active {\n  border-color: rgba(34, 197, 94, 0.9);\n  color: #bbf7d0;\n  background: rgba(22, 101, 52, 0.7);\n}\n\n.business-badge.status-cancelled,\n.business-badge.status-inactive {\n  border-color: rgba(248, 113, 113, 0.9);\n  color: #fecaca;\n  background: rgba(127, 29, 29, 0.8);\n}\n\n/* 在表格中，Status 使用普通文本样式，不使用胶囊徽章 */\n.business-table .business-badge {\n  padding: 0;\n  border: none;\n  border-radius: 0;\n  background: transparent;\n  font-size: 0.85rem;\n  color: inherit;\n}\n\n.business-card-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 0.9rem;\n}\n\n.business-card {\n  border-radius: 1rem;\n  border: 1px solid rgba(55, 65, 81, 0.9);\n  background: rgba(15, 23, 42, 0.95);\n  padding: 0.9rem 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n  transition: background 0.2s ease, border-color 0.2s ease;\n  cursor: pointer;\n}\n\n.business-card:hover {\n  background: rgba(15, 23, 42, 0.98);\n  border-color: rgba(75, 85, 99, 0.95);\n}\n\n.business-card-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  gap: 0.75rem;\n}\n\n.business-card-name {\n  font-weight: 600;\n  color: #f9fafb;\n  font-size: 0.95rem;\n}\n\n.business-card-abn {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',\n    'Courier New', monospace;\n  font-size: 0.75rem;\n  color: #9ca3af;\n}\n\n.business-card-badges {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  justify-content: flex-end;\n}\n\n.business-card-meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem 1.25rem;\n  font-size: 0.8rem;\n  color: #9ca3af;\n}\n\n.business-card-meta span {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n\n.business-card-meta-label {\n  color: #6b7280;\n}\n\n.business-card-address {\n  font-size: 0.8rem;\n  color: #e5e7eb;\n}\n\n.business-card-score {\n  font-size: 0.75rem;\n  color: #9ca3af;\n}\n\n.business-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n\n.business-list-item {\n  border-radius: 0.75rem;\n  border: 1px solid rgba(55, 65, 81, 0.9);\n  background: rgba(15, 23, 42, 0.95);\n  padding: 0.85rem 1rem;\n  transition: background 0.2s ease, border-color 0.2s ease;\n}\n\n.business-list-item:hover {\n  background: rgba(15, 23, 42, 0.98);\n  border-color: rgba(75, 85, 99, 0.95);\n}\n\n.business-list-main {\n  display: flex;\n  flex-direction: column;\n  gap: 0.4rem;\n}\n\n.business-list-name-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n\n.business-list-name {\n  font-weight: 600;\n  color: #f9fafb;\n  font-size: 0.95rem;\n  flex: 1;\n  min-width: 200px;\n}\n\n.business-list-badges {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem;\n  justify-content: flex-end;\n}\n\n.business-list-details {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.8rem;\n  color: #9ca3af;\n  flex-wrap: wrap;\n}\n\n.business-list-abn {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',\n    'Courier New', monospace;\n  font-size: 0.8rem;\n  color: #9ca3af;\n}\n\n.business-list-separator {\n  color: #4b5563;\n  font-size: 0.7rem;\n}\n\n.business-list-industry {\n  color: #9ca3af;\n}\n\n.business-list-location {\n  color: #9ca3af;\n}\n\n.business-table-wrapper {\n  border-radius: 5px;\n  border: 1px solid rgba(55, 65, 81, 0.9);\n  background: radial-gradient(circle at top left, #020617 0, #020617 45%, #000 100%);\n  overflow: auto;\n}\n\n.business-table {\n  width: 100%;\n  border-collapse: collapse;\n  min-width: 720px;\n}\n\n.business-table thead {\n  background: rgba(15, 23, 42, 0.95);\n}\n\n.business-table th,\n.business-table td {\n  padding: 0.7rem 0.9rem;\n  font-size: 0.8rem;\n  text-align: left;\n  border-bottom: 1px solid rgba(31, 41, 55, 0.9);\n  color: #e5e7eb;\n}\n\n.business-table th {\n  font-weight: 600;\n  color: #9ca3af;\n  white-space: nowrap;\n}\n\n.business-table tbody tr:last-of-type td {\n  border-bottom: none;\n}\n\n.business-table tbody tr:hover {\n  background: rgba(15, 23, 42, 0.9);\n}\n\n.business-table-name {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15rem;\n}\n\n.business-table-name-main {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #f9fafb;\n}\n\n/* 在浅色主题下，名称使用深色文字，避免白底白字 */\n.business-search-tone-light .business-table-name-main,\n.business-search-tone-eye .business-table-name-main {\n  color: #111827;\n}\n\n.business-table-name-sub {\n  font-size: 0.75rem;\n  color: #9ca3af;\n}\n\n.business-table-abn {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',\n    'Courier New', monospace;\n  font-size: 0.8rem;\n  color: #9ca3af;\n}\n\n/* 在表格中，ABN 使用普通文字样式，避免过度"代码风格" */\n.business-table .business-table-abn {\n  font-family: inherit;\n  font-size: 0.9rem;\n  color: inherit;\n}\n\n@media (max-width: 768px) {\n  .app-root {\n    padding: 2.25rem 1rem;\n    align-items: stretch;\n  }\n\n  .business-search-form {\n    padding: 0;\n  }\n\n  .business-search-input-row {\n    flex-direction: column;\n    align-items: stretch;\n  }\n\n  .business-search-button {\n    justify-content: center;\n    width: 100%;\n  }\n\n  .business-search-results {\n    gap: 0.75rem;\n  }\n\n  .business-pagination-controls {\n    flex-wrap: wrap;\n    justify-content: flex-end;\n  }\n\n  .business-table {\n    min-width: 640px;\n  }\n}\n\n/* Clickable business name styles */\n.business-clickable {\n  cursor: pointer;\n  transition: color 0.2s ease, opacity 0.2s ease;\n  text-decoration: none;\n}\n\n.business-clickable:hover {\n  color: #60a5fa;\n  opacity: 0.9;\n}\n\n.business-clickable:focus {\n  outline: 2px solid #60a5fa;\n  outline-offset: 2px;\n  border-radius: 2px;\n}\n\n.business-search-tone-light .business-clickable:hover {\n  color: #2563eb;\n}\n\n.business-search-tone-eye .business-clickable:hover {\n  color: #374151;\n}\n\n/* Business Detail Modal */\n.business-detail-modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.75);\n  backdrop-filter: blur(4px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 10000;\n  padding: 1rem;\n  animation: fadeIn 0.2s ease;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n.business-detail-modal {\n  background: rgba(15, 23, 42, 0.98);\n  border: 1px solid rgba(55, 65, 81, 0.9);\n  border-radius: 1rem;\n  max-width: 600px;\n  width: 100%;\n  max-height: 90vh;\n  overflow-y: auto;\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2);\n  animation: slideUp 0.3s ease;\n  position: relative;\n}\n\n@keyframes slideUp {\n  from {\n    transform: translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n.business-detail-modal-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1.5rem;\n  border-bottom: 1px solid rgba(55, 65, 81, 0.9);\n  position: sticky;\n  top: 0;\n  background: rgba(15, 23, 42, 0.98);\n  z-index: 1;\n}\n\n.business-detail-modal-header h2 {\n  margin: 0;\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #f9fafb;\n  flex: 1;\n  padding-right: 1rem;\n}\n\n.business-detail-modal-close {\n  background: transparent;\n  border: none;\n  color: #9ca3af;\n  font-size: 2rem;\n  line-height: 1;\n  cursor: pointer;\n  padding: 0;\n  width: 2rem;\n  height: 2rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.25rem;\n  transition: color 0.2s ease, background-color 0.2s ease;\n}\n\n.business-detail-modal-close:hover {\n  color: #f9fafb;\n  background-color: rgba(55, 65, 81, 0.5);\n}\n\n.business-detail-modal-content {\n  padding: 1.5rem;\n}\n\n.business-detail-section {\n  margin-bottom: 2rem;\n}\n\n.business-detail-section:last-child {\n  margin-bottom: 0;\n}\n\n.business-detail-section h3 {\n  margin: 0 0 1rem 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #e5e7eb;\n  border-bottom: 1px solid rgba(55, 65, 81, 0.5);\n  padding-bottom: 0.5rem;\n}\n\n.business-detail-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}\n\n.business-detail-item {\n  display: flex;\n  flex-direction: column;\n  gap: 0.25rem;\n}\n\n.business-detail-item-full {\n  grid-column: 1 / -1;\n}\n\n.business-detail-label {\n  font-size: 0.75rem;\n  color: #9ca3af;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  font-weight: 500;\n}\n\n.business-detail-value {\n  font-size: 0.95rem;\n  color: #f9fafb;\n  word-break: break-word;\n}\n\n.business-detail-badge {\n  display: inline-block;\n  padding: 0.25rem 0.5rem;\n  background: rgba(55, 65, 81, 0.5);\n  border-radius: 0.25rem;\n  font-size: 0.85rem;\n  margin-right: 0.5rem;\n  margin-bottom: 0.5rem;\n  color: #e5e7eb;\n}\n\n/* Light theme modal styles */\n.business-search-tone-light .business-detail-modal {\n  background: #ffffff;\n  border-color: #e5e7eb;\n}\n\n.business-search-tone-light .business-detail-modal-header {\n  background: #ffffff;\n  border-bottom-color: #e5e7eb;\n}\n\n.business-search-tone-light .business-detail-modal-header h2 {\n  color: #111827;\n}\n\n.business-search-tone-light .business-detail-modal-close {\n  color: #6b7280;\n}\n\n.business-search-tone-light .business-detail-modal-close:hover {\n  color: #111827;\n  background-color: #f3f4f6;\n}\n\n.business-search-tone-light .business-detail-section h3 {\n  color: #374151;\n  border-bottom-color: #e5e7eb;\n}\n\n.business-search-tone-light .business-detail-label {\n  color: #6b7280;\n}\n\n.business-search-tone-light .business-detail-value {\n  color: #111827;\n}\n\n.business-search-tone-light .business-detail-badge {\n  background: #f3f4f6;\n  color: #374151;\n}\n\n/* Eye theme modal styles */\n.business-search-tone-eye .business-detail-modal {\n  background: #fdfdf6;\n  border-color: #e5e7c8;\n}\n\n.business-search-tone-eye .business-detail-modal-header {\n  background: #fdfdf6;\n  border-bottom-color: #e5e7c8;\n}\n\n.business-search-tone-eye .business-detail-modal-header h2 {\n  color: #1f2933;\n}\n\n.business-search-tone-eye .business-detail-modal-close {\n  color: #6b7280;\n}\n\n.business-search-tone-eye .business-detail-modal-close:hover {\n  color: #1f2933;\n  background-color: #f3f4e4;\n}\n\n.business-search-tone-eye .business-detail-section h3 {\n  color: #374151;\n  border-bottom-color: #e5e7c8;\n}\n\n.business-search-tone-eye .business-detail-label {\n  color: #6b7280;\n}\n\n.business-search-tone-eye .business-detail-value {\n  color: #374151;\n}\n\n.business-search-tone-eye .business-detail-badge {\n  background: #f3f4e4;\n  color: #4b5563;\n}\n\n/* Responsive modal */\n@media (max-width: 768px) {\n  .business-detail-modal {\n    max-width: 100%;\n    margin: 0.5rem;\n    max-height: 95vh;\n  }\n\n  .business-detail-modal-header {\n    padding: 1rem;\n  }\n\n  .business-detail-modal-header h2 {\n    font-size: 1.25rem;\n  }\n\n  .business-detail-modal-content {\n    padding: 1rem;\n  }\n\n  .business-detail-grid {\n    grid-template-columns: 1fr;\n  }\n}\n\n`;
async function injectStyles(force = false) {
  if (typeof document === "undefined") {
    return;
  }
  const existingStyle = document.getElementById("ausdata-sdk-styles");
  if (existingStyle && !force) {
    return;
  }
  if (existingStyle && force) {
    existingStyle.remove();
  }
  let cssContent = getStylesContent();
  if (!cssContent || cssContent.includes("will be injected")) {
    cssContent = await tryLoadStyles();
  }
  if (!cssContent || cssContent.trim() === "") {
    return;
  }
  styleElement = document.createElement("style");
  styleElement.id = "ausdata-sdk-styles";
  styleElement.textContent = cssContent;
  document.head.appendChild(styleElement);
}
async function tryLoadStyles() {
  try {
    const response = await fetch("/node_modules/@ausdata/sdk/dist/styles.css");
    if (response.ok) {
      return await response.text();
    }
  } catch {
  }
  try {
    const response = await fetch("/dist/styles.css");
    if (response.ok) {
      return await response.text();
    }
  } catch {
  }
  try {
    const response = await fetch("/_next/static/chunks/styles.css");
    if (response.ok) {
      return await response.text();
    }
  } catch {
  }
  return "";
}
function getStylesContent() {
  if (CSS_CONTENT.includes("will be injected")) {
    return "";
  }
  return CSS_CONTENT;
}
var THEMES = [
  "minimal",
  "brand",
  "light",
  "dark",
  "eye"
];
var VARIANTS = [
  { value: "table", label: "Table" },
  { value: "card", label: "Card" },
  { value: "list", label: "List" }
];
function AusdataUIContent({
  apiKey: propApiKey,
  baseUrl: propBaseUrl,
  defaultTheme = "minimal",
  defaultVariant = "table",
  dense = false,
  showControlPanel = true,
  title = "Ausdata Business Search",
  className,
  style
}) {
  const [query, setQuery] = react.useState("");
  const [results, setResults] = react.useState([]);
  const [loading, setLoading] = react.useState(false);
  const [error, setError] = react.useState(null);
  const [hasSearched, setHasSearched] = react.useState(false);
  const [total, setTotal] = react.useState(0);
  const [page, setPage] = react.useState(1);
  const [pageSize, setPageSize] = react.useState(10);
  const [currentTheme, setCurrentTheme] = react.useState(defaultTheme);
  const [variant, setVariant] = react.useState(defaultVariant);
  const [selectedBusiness, setSelectedBusiness] = react.useState(null);
  const [showDetailModal, setShowDetailModal] = react.useState(false);
  const apiKey = react.useMemo(() => {
    if (propApiKey) return propApiKey;
    if (typeof globalThis.process !== "undefined") {
      const processEnv = globalThis.process.env;
      if (processEnv?.NEXT_PUBLIC_AUSDATA_API_KEY) {
        return processEnv.NEXT_PUBLIC_AUSDATA_API_KEY;
      }
    }
    const directEnv = globalThis.process?.env;
    if (directEnv?.NEXT_PUBLIC_AUSDATA_API_KEY) {
      return directEnv.NEXT_PUBLIC_AUSDATA_API_KEY;
    }
    if (typeof window !== "undefined") {
      const nextData = window.__NEXT_DATA__;
      if (nextData?.env?.NEXT_PUBLIC_AUSDATA_API_KEY) {
        return nextData.env.NEXT_PUBLIC_AUSDATA_API_KEY;
      }
    }
    try {
      const viteEnv = globalThis.import?.meta?.env;
      if (viteEnv?.VITE_AUSDATA_API_KEY) {
        return viteEnv.VITE_AUSDATA_API_KEY;
      }
    } catch {
    }
    if (typeof window !== "undefined") {
      const env = window.__ENV__ || globalThis.process?.env;
      if (env) {
        return env.NEXT_PUBLIC_AUSDATA_API_KEY || env.VITE_AUSDATA_API_KEY;
      }
    }
    if (typeof window === "undefined") {
      const processEnv = globalThis.process?.env;
      if (processEnv) {
        return processEnv.AUSDATA_API_KEY || processEnv.NEXT_PUBLIC_AUSDATA_API_KEY;
      }
    }
    return void 0;
  }, [propApiKey]);
  const baseUrl = react.useMemo(() => {
    if (propBaseUrl) return propBaseUrl;
    if (typeof window !== "undefined") {
      if (window.__NEXT_DATA__) return "/api";
      if (typeof globalThis.import !== "undefined") return "/api";
    }
    return "/api";
  }, [propBaseUrl]);
  react.useEffect(() => {
    injectStyles().catch((error2) => {
      if (process.env.NODE_ENV === "development") {
        console.warn('[@ausdata/sdk] Style injection failed. You can import styles manually: import "@ausdata/sdk/styles"', error2);
      }
    });
  }, []);
  react.useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.getAttribute("data-ausdata-theme");
    document.body.setAttribute("data-ausdata-theme", currentTheme);
    return () => {
      if (prev) {
        document.body.setAttribute("data-ausdata-theme", prev);
      } else {
        document.body.removeAttribute("data-ausdata-theme");
      }
    };
  }, [currentTheme]);
  const performSearch = react.useCallback(async (searchTerm, nextPage, size) => {
    if (!apiKey) {
      setError("API key is required. Please provide apiKey prop or set NEXT_PUBLIC_AUSDATA_API_KEY / VITE_AUSDATA_API_KEY environment variable.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const client = new chunkZCVEUCE2_cjs.Ausdata(apiKey, { baseUrl });
      const business = new chunkZCVEUCE2_cjs.BusinessModule(client);
      const offset = (nextPage - 1) * size;
      const response = await business.search({ q: searchTerm, limit: size, offset });
      setResults(response.results ?? []);
      setTotal(response.total ?? response.results?.length ?? 0);
      setPage(nextPage);
    } catch (err) {
      let message = err instanceof Error ? err.message : "Unknown error while searching";
      if (message.includes("Failed to fetch") || message.includes("Network request failed") || message.includes("CORS") || message.includes("network")) {
        if (baseUrl.startsWith("http")) {
          message = `Network error: Cannot connect to API. This is likely a CORS issue. Please set up an API proxy route at '/api/[...path]' or use the '/api' baseUrl with a proxy configuration.`;
        } else {
          message = `Network error: Cannot connect to API. Please ensure you have set up an API route at '/api/[...path]' for Next.js, or configure a proxy for your framework.`;
        }
      }
      setError(message);
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [apiKey, baseUrl]);
  const handleSearch = react.useCallback(async (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setError("Please enter a business name or ABN.");
      setResults([]);
      return;
    }
    setPage(1);
    await performSearch(trimmed, 1, pageSize);
  }, [query, pageSize, performSearch]);
  const handlePageChange = react.useCallback(async (direction) => {
    const trimmed = query.trim();
    if (!trimmed || loading) return;
    const maxPage = Math.max(1, Math.ceil(total / pageSize));
    const nextPage = direction === "prev" ? page - 1 : page + 1;
    if (nextPage < 1 || nextPage > maxPage) return;
    await performSearch(trimmed, nextPage, pageSize);
  }, [query, loading, total, pageSize, page, performSearch]);
  const handlePageSizeChange = react.useCallback(async (event) => {
    const newSize = Number(event.target.value) || 10;
    setPageSize(newSize);
    const trimmed = query.trim();
    if (!trimmed) return;
    await performSearch(trimmed, 1, newSize);
  }, [query, performSearch]);
  const handleBusinessClick = react.useCallback((business) => {
    setSelectedBusiness(business);
    setShowDetailModal(true);
  }, []);
  const handleCloseModal = react.useCallback(() => {
    setShowDetailModal(false);
    setSelectedBusiness(null);
  }, []);
  react.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && showDetailModal) {
        handleCloseModal();
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [showDetailModal, handleCloseModal]);
  const themeClass = `business-search-tone-${currentTheme}`;
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: `app-root ${themeClass} ${className ?? ""}`, style, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-search", children: [
    title && /* @__PURE__ */ jsxRuntime.jsxs("header", { className: "business-search-header", children: [
      /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "business-search-title", children: title }),
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "business-search-subtitle", children: "Search Australian businesses by name or ABN, with enriched ABR details when available." })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-search-panel", children: [
      /* @__PURE__ */ jsxRuntime.jsx("form", { onSubmit: handleSearch, className: "business-search-form", children: /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "business-search-label", children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Search business" }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-search-input-row", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-search-input-wrapper", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-search-input-icon", children: "\u{1F50D}" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              "input",
              {
                type: "text",
                className: "business-search-input",
                value: query,
                onChange: (e) => setQuery(e.target.value),
                placeholder: 'Try "Commonwealth Bank", "Woolworths", or an 11\u2011digit ABN'
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("button", { type: "submit", className: "business-search-button", disabled: loading, children: [
            loading && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-search-button-dot" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: loading ? "Searching\u2026" : "Search" })
          ] })
        ] })
      ] }) }),
      showControlPanel && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-style-controls", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("label", { htmlFor: "ausdata-theme-select", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Theme" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "select",
            {
              id: "ausdata-theme-select",
              value: currentTheme,
              onChange: (e) => setCurrentTheme(e.target.value),
              children: THEMES.map((theme) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: theme, children: theme.charAt(0).toUpperCase() + theme.slice(1) }, theme))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("label", { htmlFor: "ausdata-variant-select", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Layout" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "select",
            {
              id: "ausdata-variant-select",
              value: variant,
              onChange: (e) => setVariant(e.target.value),
              children: VARIANTS.map((v) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: v.value, children: v.label }, v.value))
            }
          )
        ] })
      ] })
    ] }),
    total > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "business-search-meta", children: /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
      "Showing ",
      /* @__PURE__ */ jsxRuntime.jsx("strong", { children: results.length }),
      " of",
      " ",
      /* @__PURE__ */ jsxRuntime.jsx("strong", { children: total || results.length }),
      " matches"
    ] }) }),
    error && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "business-search-error", children: error }),
    !loading && !error && hasSearched && results.length === 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-search-empty", children: [
      /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "No results found." }),
      " ",
      "Try refining the business name, adding a state, or searching directly by 11\u2011digit ABN."
    ] }),
    results.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs("section", { className: "business-search-results", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-search-results-header", children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
          "Showing ",
          /* @__PURE__ */ jsxRuntime.jsx("strong", { children: results.length }),
          " of",
          " ",
          /* @__PURE__ */ jsxRuntime.jsx("strong", { children: total || results.length })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-pagination-controls", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("label", { children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Rows per page" }),
            /* @__PURE__ */ jsxRuntime.jsxs(
              "select",
              {
                value: pageSize,
                onChange: handlePageSizeChange,
                disabled: loading,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("option", { value: 10, children: "10" }),
                  /* @__PURE__ */ jsxRuntime.jsx("option", { value: 25, children: "25" }),
                  /* @__PURE__ */ jsxRuntime.jsx("option", { value: 50, children: "50" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "business-pagination-page", children: [
            "Page ",
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: page }),
            " of",
            " ",
            /* @__PURE__ */ jsxRuntime.jsx("strong", { children: Math.max(1, Math.ceil(total / pageSize)) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-pagination-buttons", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: () => handlePageChange("prev"),
                disabled: loading || page <= 1,
                children: "\u2039 Prev"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                onClick: () => handlePageChange("next"),
                disabled: loading || total > 0 && page >= Math.ceil(total / pageSize),
                children: "Next \u203A"
              }
            )
          ] })
        ] })
      ] }),
      variant === "table" ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "business-table-wrapper", children: /* @__PURE__ */ jsxRuntime.jsxs("table", { className: "business-table", children: [
        /* @__PURE__ */ jsxRuntime.jsx("thead", { children: /* @__PURE__ */ jsxRuntime.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("th", { children: "Name" }),
          /* @__PURE__ */ jsxRuntime.jsx("th", { children: "ABN" }),
          /* @__PURE__ */ jsxRuntime.jsx("th", { children: "Status" }),
          /* @__PURE__ */ jsxRuntime.jsx("th", { children: "Type" }),
          /* @__PURE__ */ jsxRuntime.jsx("th", { children: "Location" })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx("tbody", { children: results.map((biz, index) => {
          const statusKey = (biz.status || "").toLowerCase();
          const statusClass = statusKey === "active" ? "status-active" : statusKey === "cancelled" || statusKey === "inactive" ? "status-cancelled" : "";
          return /* @__PURE__ */ jsxRuntime.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-table-name", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  className: "business-table-name-main business-clickable",
                  onClick: () => handleBusinessClick(biz),
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleBusinessClick(biz);
                    }
                  },
                  children: biz.name
                }
              ),
              biz.industry && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-table-name-sub", children: biz.industry })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "business-table-abn", children: [
              "ABN ",
              biz.abn
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx("td", { children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: `business-badge ${statusClass}`, children: biz.status || "Unknown" }) }),
            /* @__PURE__ */ jsxRuntime.jsx("td", { children: biz.type || "\u2014" }),
            /* @__PURE__ */ jsxRuntime.jsx("td", { children: biz.address ? biz.address : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              biz.state,
              " ",
              biz.postcode
            ] }) })
          ] }, `${biz.abn}-${index}`);
        }) })
      ] }) }) : variant === "card" ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "business-card-grid", children: results.map((biz, index) => {
        const statusKey = (biz.status || "").toLowerCase();
        const statusClass = statusKey === "active" ? "status-active" : statusKey === "cancelled" || statusKey === "inactive" ? "status-cancelled" : "";
        return /* @__PURE__ */ jsxRuntime.jsxs("article", { className: "business-card", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-card-header", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: "business-card-name business-clickable",
                  onClick: () => handleBusinessClick(biz),
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleBusinessClick(biz);
                    }
                  },
                  children: biz.name
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-card-abn", children: [
                "ABN ",
                biz.abn
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-card-badges", children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: `business-badge ${statusClass}`, children: biz.status || "Unknown" }),
              biz.type && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-badge", children: biz.type === "IND" ? "Individual" : biz.type === "CO" ? "Company" : biz.type })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-card-meta", children: [
            biz.industry && /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-card-meta-label", children: "Industry" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { children: biz.industry })
            ] }),
            biz.score !== void 0 && /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-card-meta-label", children: "Match score" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { children: biz.score })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "business-card-address", children: biz.address ? biz.address : `${biz.state ?? ""} ${biz.postcode ?? ""}`.trim() }),
          biz.gst && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-card-score", children: [
            "GST: ",
            biz.gst
          ] })
        ] }, `${biz.abn}-${index}`);
      }) }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "business-list", children: results.map((biz, index) => {
        const statusKey = (biz.status || "").toLowerCase();
        const statusClass = statusKey === "active" ? "status-active" : statusKey === "cancelled" || statusKey === "inactive" ? "status-cancelled" : "";
        return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "business-list-item", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-list-main", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-list-name-row", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                className: "business-list-name business-clickable",
                onClick: () => handleBusinessClick(biz),
                role: "button",
                tabIndex: 0,
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleBusinessClick(biz);
                  }
                },
                children: biz.name
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-list-badges", children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: `business-badge ${statusClass}`, children: biz.status || "Unknown" }),
              biz.type && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-badge", children: biz.type === "IND" ? "Individual" : biz.type === "CO" ? "Company" : biz.type })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-list-details", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "business-list-abn", children: [
              "ABN ",
              biz.abn
            ] }),
            biz.industry && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-list-separator", children: "\u2022" }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-list-industry", children: biz.industry })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-list-separator", children: "\u2022" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-list-location", children: biz.address ? biz.address : `${biz.state ?? ""} ${biz.postcode ?? ""}`.trim() })
          ] })
        ] }) }, `${biz.abn}-${index}`);
      }) })
    ] }),
    showDetailModal && selectedBusiness && /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: "business-detail-modal-overlay",
        onClick: handleCloseModal,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "business-detail-title",
        children: /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            className: "business-detail-modal",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-modal-header", children: [
                /* @__PURE__ */ jsxRuntime.jsx("h2", { id: "business-detail-title", children: selectedBusiness.name }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  "button",
                  {
                    className: "business-detail-modal-close",
                    onClick: handleCloseModal,
                    "aria-label": "Close",
                    children: "\xD7"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-modal-content", children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-section", children: [
                  /* @__PURE__ */ jsxRuntime.jsx("h3", { children: "Basic Information" }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-grid", children: [
                    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-item", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-label", children: "ABN" }),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-value", children: selectedBusiness.abn })
                    ] }),
                    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-item", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-label", children: "Status" }),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: `business-badge ${(selectedBusiness.status || "").toLowerCase() === "active" ? "status-active" : ""}`, children: selectedBusiness.status || "Unknown" })
                    ] }),
                    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-item", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-label", children: "Type" }),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-value", children: selectedBusiness.type === "IND" ? "Individual" : selectedBusiness.type === "CO" ? "Company" : selectedBusiness.type || "\u2014" })
                    ] }),
                    selectedBusiness.industry && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-item", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-label", children: "Industry" }),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-value", children: selectedBusiness.industry })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-section", children: [
                  /* @__PURE__ */ jsxRuntime.jsx("h3", { children: "Location" }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-grid", children: [
                    selectedBusiness.address && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-item business-detail-item-full", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-label", children: "Address" }),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-value", children: selectedBusiness.address })
                    ] }),
                    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-item", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-label", children: "State" }),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-value", children: selectedBusiness.state || "\u2014" })
                    ] }),
                    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-item", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-label", children: "Postcode" }),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-value", children: selectedBusiness.postcode || "\u2014" })
                    ] })
                  ] })
                ] }),
                (selectedBusiness.gst || selectedBusiness.businessNames || selectedBusiness.score !== void 0) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-section", children: [
                  /* @__PURE__ */ jsxRuntime.jsx("h3", { children: "Additional Information" }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-grid", children: [
                    selectedBusiness.gst && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-item business-detail-item-full", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-label", children: "GST" }),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-value", children: selectedBusiness.gst })
                    ] }),
                    selectedBusiness.businessNames && selectedBusiness.businessNames.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-item business-detail-item-full", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-label", children: "Trading Names" }),
                      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "business-detail-value", children: selectedBusiness.businessNames.map((name, idx) => /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-badge", children: name }, idx)) })
                    ] }),
                    selectedBusiness.score !== void 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-item", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-label", children: "Match Score" }),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-value", children: selectedBusiness.score })
                    ] }),
                    selectedBusiness.abnStatus && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "business-detail-item", children: [
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-label", children: "ABN Status" }),
                      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "business-detail-value", children: selectedBusiness.abnStatus })
                    ] })
                  ] })
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] }) });
}
function AusdataUI(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(AusdataUIContent, { ...props });
}

exports.AusdataUI = AusdataUI;
//# sourceMappingURL=react.cjs.map
//# sourceMappingURL=react.cjs.map