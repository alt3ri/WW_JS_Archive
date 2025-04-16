"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeTimer = void 0);
const UnionChangeTimerHelper_1 = require("./UnionChangeTimerHelper");
class FbChangeTimer {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.wEh = !1),
      (this.PEh = void 0),
      (this.UEh = !1),
      (this.DEh = void 0);
  }
  static Create(e) {
    if (e) return new FbChangeTimer(e);
  }
  get TimerType() {
    return (
      this.wEh ||
        ((this.wEh = !0), (this.PEh = this.FbDataInternal.timerType())),
      this.PEh
    );
  }
  get ChangeType() {
    var e, i;
    return (
      !this.UEh &&
        ((this.UEh = !0),
        (e = this.FbDataInternal.changeTypeType()),
        (i =
          UnionChangeTimerHelper_1.UnionChangeTimerHelper.GetUnionChangeTimerObject(
            e,
          ))) &&
        (this.DEh =
          UnionChangeTimerHelper_1.UnionChangeTimerHelper.ReadUnionChangeTimer(
            e,
            this.FbDataInternal.changeType(i),
          )),
      this.DEh
    );
  }
}
exports.FbChangeTimer = FbChangeTimer;
//# sourceMappingURL=FbChangeTimer.js.map
