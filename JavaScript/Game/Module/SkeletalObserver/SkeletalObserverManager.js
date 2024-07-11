"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkeletalObserverManager = void 0);
const SkeletalObserverHandle_1 = require("./SkeletalObserverHandle");
class SkeletalObserverManager {
  static NewSkeletalObserver(e) {
    var t = new SkeletalObserverHandle_1.SkeletalObserverHandle();
    return t.CreateSkeletalObserverHandle(e), this.CSo.push(t), t;
  }
  static DestroySkeletalObserver(e) {
    var t = this.CSo.indexOf(e);
    t < 0 || (e.ResetSkeletalObserverHandle(), this.CSo.splice(t, 1));
  }
  static ClearAllSkeletalObserver() {
    for (const e of this.CSo) e.ResetSkeletalObserverHandle();
    this.CSo.length = 0;
  }
  static GetLastSkeletalObserver() {
    var e = this.CSo.length - 1;
    if (!(e < 0)) return this.CSo[e];
  }
}
(exports.SkeletalObserverManager = SkeletalObserverManager).CSo = [];
//# sourceMappingURL=SkeletalObserverManager.js.map
