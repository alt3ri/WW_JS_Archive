"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChessmanComponent = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbChessmanComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.VXh = !1),
      (this.jXh = void 0),
      (this.HXh = !1),
      (this.WXh = void 0);
  }
  static Create(t) {
    if (t) return new FbChessmanComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get StartMovingActions() {
    if (!this.VXh) {
      (this.VXh = !0), (this.jXh = new Array());
      var i = this.FbDataInternal.startMovingActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.startMovingActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.jXh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.jXh;
  }
  get EndMovingActions() {
    if (!this.HXh) {
      (this.HXh = !0), (this.WXh = new Array());
      var i = this.FbDataInternal.endMovingActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.endMovingActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.WXh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.WXh;
  }
}
exports.FbChessmanComponent = FbChessmanComponent;
//# sourceMappingURL=FbChessmanComponent.js.map
