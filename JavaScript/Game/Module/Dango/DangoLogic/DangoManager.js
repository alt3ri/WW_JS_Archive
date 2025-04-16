"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoManager = void 0);
const DangoData_1 = require("./DangoData");
class DangoManager {
  static GetDangoData(a) {
    var t;
    return this.Xgc.has(a)
      ? this.Xgc.get(a)
      : ((t = DangoData_1.DangoData.Create(a)), this.Xgc.set(a, t), t);
  }
}
(exports.DangoManager = DangoManager).Xgc = new Map();
//# sourceMappingURL=DangoManager.js.map
