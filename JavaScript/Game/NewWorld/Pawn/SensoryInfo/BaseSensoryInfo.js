"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseSensoryInfo = void 0);
class BaseSensoryInfo {
  constructor() {
    (this.SensoryInfoType = 1), (this.SensoryRange = 0), (this.InRange = !1);
  }
  Init(...s) {
    this.OnInit(s);
  }
  Tick(s) {
    2 & this.SensoryInfoType && this.OnTick(s);
  }
  Clear() {
    (this.InRange = !1), (this.SensoryRange = 0), this.OnClear();
  }
  CheckInRange() {
    return this.InRange;
  }
  ClearCacheList() {}
}
exports.BaseSensoryInfo = BaseSensoryInfo;
//# sourceMappingURL=BaseSensoryInfo.js.map
