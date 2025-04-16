"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSceneActorRefGroup = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("../Action/FbActionInfo");
class FbSceneActorRefGroup {
  constructor(t) {
    (this.FbDataInternal = t),
      (this._vh = !1),
      (this.cvh = void 0),
      (this.L_h = !1),
      (this.A_h = void 0);
  }
  static Create(t) {
    if (t) return new FbSceneActorRefGroup(t);
  }
  get EntityState() {
    return (
      this._vh ||
        ((this._vh = !0), (this.cvh = this.FbDataInternal.entityState())),
      this.cvh
    );
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
}
exports.FbSceneActorRefGroup = FbSceneActorRefGroup;
//# sourceMappingURL=FbSceneActorRefGroup.js.map
