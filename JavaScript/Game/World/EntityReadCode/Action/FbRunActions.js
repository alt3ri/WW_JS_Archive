"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRunActions = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbActionInfo_1 = require("./FbActionInfo");
class FbRunActions {
  constructor(t) {
    (this.FbDataInternal = t), (this.oyh = !1), (this.nyh = void 0);
  }
  static Create(t) {
    if (t) return new FbRunActions(t);
  }
  get ActionList() {
    if (!this.oyh) {
      (this.oyh = !0), (this.nyh = new Array());
      var i = this.FbDataInternal.actionListLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.actionList(
            t,
            new fb_action_1.ActionInfo(),
          );
          this.nyh.push(FbActionInfo_1.FbActionInfo.Create(s));
        }
    }
    return this.nyh;
  }
}
exports.FbRunActions = FbRunActions;
//# sourceMappingURL=FbRunActions.js.map
