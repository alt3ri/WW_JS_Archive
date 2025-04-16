"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInterludeActions = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("./FbActionInfo");
class FbInterludeActions {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.uvh = !1),
      (this.dvh = void 0),
      (this.mvh = !1),
      (this.Cvh = void 0),
      (this.gvh = !1),
      (this.fvh = !1),
      (this.pvh = !1),
      (this.vvh = !1);
  }
  static Create(t) {
    if (t) return new FbInterludeActions(t);
  }
  get InterludeActionList() {
    if (!this.uvh) {
      (this.uvh = !0), (this.dvh = new Array());
      var i = this.FbDataInternal.interludeActionListLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.interludeActionList(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.dvh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.dvh;
  }
  get DestroyEntityIds() {
    if (!this.mvh) {
      (this.mvh = !0), (this.Cvh = new Array());
      var i = this.FbDataInternal.destroyEntityIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.Cvh.push(this.FbDataInternal.destroyEntityIds(t));
    }
    return this.Cvh;
  }
  get IsFadeIn() {
    return (
      this.gvh ||
        ((this.gvh = !0), (this.fvh = this.FbDataInternal.isFadeIn())),
      this.fvh
    );
  }
  get IsFadeOut() {
    return (
      this.pvh ||
        ((this.pvh = !0), (this.vvh = this.FbDataInternal.isFadeOut())),
      this.vvh
    );
  }
}
exports.FbInterludeActions = FbInterludeActions;
//# sourceMappingURL=FbInterludeActions.js.map
