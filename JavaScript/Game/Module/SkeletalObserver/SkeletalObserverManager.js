"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkeletalObserverManager = void 0);
const SkeletalObserverHandle_1 = require("./SkeletalObserverHandle");
class SkeletalObserverManager {
  static NewSkeletalObserver(e) {
    var t = new SkeletalObserverHandle_1.SkeletalObserverHandle();
    return t.CreateSkeletalObserverHandle(e), this.cSo.push(t), t;
  }
  static DestroySkeletalObserver(e) {
    var t = this.cSo.indexOf(e);
    t < 0 || (e.ResetSkeletalObserverHandle(), this.cSo.splice(t, 1));
  }
  static ClearAllSkeletalObserver() {
    for (const e of this.cSo) e.ResetSkeletalObserverHandle();
    this.cSo.length = 0;
  }
  static GetLastSkeletalObserver() {
    var e = this.cSo.length - 1;
    if (!(e < 0)) return this.cSo[e];
  }
}
(exports.SkeletalObserverManager = SkeletalObserverManager).cSo = [];
//# sourceMappingURL=SkeletalObserverManager.js.map
