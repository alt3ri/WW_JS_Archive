"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getPlatform = exports.setPlatform = exports.Platform = void 0);
class Platform {
  constructor() {
    this.LogLevel = 0;
  }
}
exports.Platform = Platform;
let pf = void 0;
function setPlatform(t) {
  pf = t;
}
function getPlatform() {
  if (pf) return pf;
  throw new Error("Platform is not set");
}
(exports.setPlatform = setPlatform), (exports.getPlatform = getPlatform);
// # sourceMappingURL=Platform.js.map
