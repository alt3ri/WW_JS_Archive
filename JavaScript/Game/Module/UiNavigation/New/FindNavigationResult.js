"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FindNavigationResult = void 0);
class FindNavigationResult {
  constructor() {
    (this.Result = 0), (this.Listener = void 0);
  }
  IsFindNavigation() {
    return this.Result === 1;
  }
  IsInLoopingProcess() {
    return this.Result === 4;
  }
  IsNotFindNavigation() {
    return this.Result === 2;
  }
}
exports.FindNavigationResult = FindNavigationResult;
// # sourceMappingURL=FindNavigationResult.js.map
