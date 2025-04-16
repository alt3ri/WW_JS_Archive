"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbQteCallback = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbQteCallback {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.L_h = !1),
      (this.A_h = void 0),
      (this.XYh = !1),
      (this.YYh = void 0);
  }
  static Create(t) {
    if (t) return new FbQteCallback(t);
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var i = this.FbDataInternal.actionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(e));
        }
    }
    return this.A_h;
  }
  get SendSelfEvent() {
    return (
      this.XYh ||
        ((this.XYh = !0), (this.YYh = this.FbDataInternal.sendSelfEvent())),
      this.YYh
    );
  }
}
exports.FbQteCallback = FbQteCallback;
//# sourceMappingURL=FbQteCallback.js.map
