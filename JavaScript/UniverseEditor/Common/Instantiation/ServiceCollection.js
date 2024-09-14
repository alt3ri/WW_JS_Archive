"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ServiceCollection = void 0);
class ServiceCollection {
  constructor(...t) {
    this.Zho = new Map();
    for (var [e, r] of t) this.Zho.set(e, r);
  }
  Set(t, e) {
    var r = this.Zho.get(t);
    return this.Zho.set(t, e), r;
  }
  Has(t) {
    return this.Zho.has(t);
  }
  Get(t) {
    return this.Zho.get(t);
  }
}
exports.ServiceCollection = ServiceCollection;
//# sourceMappingURL=ServiceCollection.js.map
