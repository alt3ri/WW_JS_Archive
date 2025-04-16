"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRenjuConfig = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbRenjuConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.bNh = !1),
      (this.LNh = void 0),
      (this.FOh = !1),
      (this.NOh = void 0),
      (this.ANh = !1),
      (this.xNh = 0),
      (this.V1h = !1),
      (this.j1h = void 0),
      (this.L_h = !1),
      (this.A_h = void 0);
  }
  static Create(t) {
    if (t) return new FbRenjuConfig(t);
  }
  get Controller() {
    return (
      this.bNh ||
        ((this.bNh = !0), (this.LNh = this.FbDataInternal.controller())),
      this.LNh
    );
  }
  get Order() {
    return (
      this.FOh || ((this.FOh = !0), (this.NOh = this.FbDataInternal.order())),
      this.NOh
    );
  }
  get RenjuCount() {
    return (
      this.ANh ||
        ((this.ANh = !0), (this.xNh = this.FbDataInternal.renjuCount())),
      this.xNh
    );
  }
  get EntityIds() {
    if (!this.V1h) {
      (this.V1h = !0), (this.j1h = new Array());
      var i = this.FbDataInternal.entityIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.j1h.push(this.FbDataInternal.entityIds(t));
    }
    return this.j1h;
  }
  get Actions() {
    if (!this.L_h) {
      (this.L_h = !0), (this.A_h = new Array());
      var i = this.FbDataInternal.actionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actions(t, new fb_action_1.ActionInfo());
          this.A_h.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.A_h;
  }
}
exports.FbRenjuConfig = FbRenjuConfig;
//# sourceMappingURL=FbRenjuConfig.js.map
