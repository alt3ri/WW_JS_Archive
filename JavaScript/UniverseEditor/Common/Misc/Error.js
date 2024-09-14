"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AggregateError = void 0);
class AggregateError extends Error {
  constructor(r, e) {
    super(e), (this.Errors = r), (this.Message = e);
  }
}
exports.AggregateError = AggregateError;
//# sourceMappingURL=Error.js.map
