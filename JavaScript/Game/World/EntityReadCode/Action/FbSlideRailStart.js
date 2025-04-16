"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSlideRailStart = void 0);
class FbSlideRailStart {
  constructor(t) {
    (this.FbDataInternal = t), (this.rqc = !1), (this.oqc = 0);
  }
  static Create(t) {
    if (t) return new FbSlideRailStart(t);
  }
  get RailEntityId() {
    return (
      this.rqc ||
        ((this.rqc = !0), (this.oqc = this.FbDataInternal.railEntityId())),
      this.oqc
    );
  }
}
exports.FbSlideRailStart = FbSlideRailStart;
//# sourceMappingURL=FbSlideRailStart.js.map
