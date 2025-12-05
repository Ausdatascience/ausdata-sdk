#!/usr/bin/env node

/**
 * CLI tool for @ausdata/sdk
 * 
 * Usage:
 *   npx @ausdata/sdk generate-api-route
 *   npx @ausdata/sdk init
 */

import { generateApiRoute } from './generate-api-route.js';

const command = process.argv[2];

if (command === 'generate-api-route' || command === 'init') {
  generateApiRoute();
} else if (command === '--help' || command === '-h' || !command) {
  console.log('@ausdata/sdk CLI');
  console.log('\nCommands:');
  console.log('  generate-api-route  Generate Next.js API route for proxy');
  console.log('  init                Alias for generate-api-route');
  console.log('\nUsage:');
  console.log('  npx @ausdata/sdk generate-api-route');
  console.log('  npx @ausdata/sdk init');
} else {
  console.error(`Unknown command: ${command}`);
  console.log('Run "npx @ausdata/sdk --help" for usage information.');
  process.exit(1);
}

