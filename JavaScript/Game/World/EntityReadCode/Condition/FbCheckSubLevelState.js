"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckSubLevelState = void 0);
const fb_condition_1 = require("../../../../Game/World/EntityFb/fb-condition"),
  FbCheckSubLevelStateConfig_1 = require("./FbCheckSubLevelStateConfig");
class FbCheckSubLevelState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.q8_ = !1),
      (this.O8_ = void 0),
      (this.G8_ = !1),
      (this.F8_ = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckSubLevelState(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ConditionCount() {
    return (
      this.q8_ ||
        ((this.q8_ = !0), (this.O8_ = this.FbDataInternal.conditionCount())),
      this.O8_
    );
  }
  get CheckList() {
    if (!this.G8_) {
      (this.G8_ = !0), (this.F8_ = new Array());
      var e = this.FbDataInternal.checkListLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.checkList(
            t,
            new fb_condition_1.CheckSubLevelStateConfig(),
          );
          this.F8_.push(
            FbCheckSubLevelStateConfig_1.FbCheckSubLevelStateConfig.Create(i),
          );
        }
    }
    return this.F8_;
  }
}
exports.FbCheckSubLevelState = FbCheckSubLevelState;
//# sourceMappingURL=FbCheckSubLevelState.js.map
