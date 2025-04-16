"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEventRotator = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbEventRotator {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.rqh = !1),
      (this.oqh = void 0),
      (this.nqh = !1),
      (this.sqh = void 0);
  }
  static Create(t) {
    if (t) return new FbEventRotator(t);
  }
  get StartActions() {
    if (!this.rqh) {
      (this.rqh = !0), (this.oqh = new Array());
      var i = this.FbDataInternal.startActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.startActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.oqh.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
    }
    return this.oqh;
  }
  get EndActions() {
    if (!this.nqh) {
      (this.nqh = !0), (this.sqh = new Array());
      var i = this.FbDataInternal.endActionsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var o = this.FbDataInternal.endActions(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.sqh.push(FbActionInfo_1.FbActionInfo.Create(o));
        }
    }
    return this.sqh;
  }
}
exports.FbEventRotator = FbEventRotator;
//# sourceMappingURL=FbEventRotator.js.map
