#!/usr/bin/env node
/**
 * FETCH URL - Alternative to MCP Fetch
 * Usage: node fetch-url.js <url>
 */

const https = require('https');
const http = require('http');

const url = process.argv[2];

if (!url) {
    console.error('Usage: node fetch-url.js <url>');
    process.exit(1);
}

const protocol = url.startsWith('https') ? https : http;

protocol.get(url, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log(data);
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
    process.exit(1);
});
