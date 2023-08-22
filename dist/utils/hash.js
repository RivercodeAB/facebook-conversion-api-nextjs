"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha256Hash = void 0;
const { createHash } = require('crypto');
const sha256Hash = (string) => createHash('sha256').update(string).digest('hex');
exports.sha256Hash = sha256Hash;
