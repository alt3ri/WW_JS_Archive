"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChessmanPickInteraction = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbChessmanPickInteraction {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.V$h = !1),
      (this.j$h = void 0),
      (this.H$h = !1),
      (this.W$h = void 0),
      (this.Q$h = !1),
      (this.K$h = 0),
      (this.$$h = !1),
      (this.X$h = void 0);
  }
  static Create(t) {
    if (t) return new FbChessmanPickInteraction(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CheckedActions() {
    if (!this.V$h) {
      (this.V$h = !0), (this.j$h = new Array());
      var i = this.FbDataInternal.checkedActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.checkedActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.j$h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.j$h;
  }
  get UncheckedActions() {
    if (!this.H$h) {
      (this.H$h = !0), (this.W$h = new Array());
      var i = this.FbDataInternal.uncheckedActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.uncheckedActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.W$h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.W$h;
  }
  get TargetChessboard() {
    return (
      this.Q$h ||
        ((this.Q$h = !0), (this.K$h = this.FbDataInternal.targetChessboard())),
      this.K$h
    );
  }
  get AvailablePosEffect() {
    return (
      this.$$h ||
        ((this.$$h = !0),
        (this.X$h = this.FbDataInternal.availablePosEffect())),
      this.X$h
    );
  }
}
exports.FbChessmanPickInteraction = FbChessmanPickInteraction;
//# sourceMappingURL=FbChessmanPickInteraction.js.map
