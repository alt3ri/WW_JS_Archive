"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetBattleTag = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbSetEntityTag_1 = require("./FbSetEntityTag");
class FbSetBattleTag {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Avh = !1),
      (this.xvh = void 0);
  }
  static Create(t) {
    if (t) return new FbSetBattleTag(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get SetTags() {
    if (!this.Avh) {
      (this.Avh = !0), (this.xvh = new Array());
      var e = this.FbDataInternal.setTagsLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.setTags(
            t,
            new fb_action_1.SetEntityTag(),
          );
          this.xvh.push(FbSetEntityTag_1.FbSetEntityTag.Create(i));
        }
    }
    return this.xvh;
  }
}
exports.FbSetBattleTag = FbSetBattleTag;
//# sourceMappingURL=FbSetBattleTag.js.map
