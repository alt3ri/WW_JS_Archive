"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.singletonManager = exports.SingletonManager = void 0);
const Interface_1 = require("./Interface"),
  ServiceCollection_1 = require("./ServiceCollection");
class SingletonManager {
  constructor() {
    this.m7 = [];
  }
  Register(e, r, t = "Eager") {
    this.m7.push([e, new Interface_1.SyncDescriptor(r, [], "Delayed" === t)]);
  }
  GetAll() {
    return this.m7;
  }
  GetServiceCollection() {
    var e,
      r,
      t = new ServiceCollection_1.ServiceCollection();
    for ([e, r] of this.GetAll()) t.Set(e, r);
    return t;
  }
}
(exports.SingletonManager = SingletonManager),
  (exports.singletonManager = new SingletonManager());
//# sourceMappingURL=Extension.js.map
