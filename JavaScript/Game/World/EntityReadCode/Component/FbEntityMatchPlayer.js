"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityMatchPlayer = void 0);
const UnionMatchRoleOptionHelper_1 = require("../Match/UnionMatchRoleOptionHelper");
class FbEntityMatchPlayer {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.qDh = !1),
      (this.PAe = void 0),
      (this.Okh = !1),
      (this.Fkh = !1);
  }
  static Create(t) {
    if (t) return new FbEntityMatchPlayer(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MatchRoleOption() {
    if (!this.qDh) {
      (this.qDh = !0), (this.PAe = new Array());
      var i = this.FbDataInternal.matchRoleOptionLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.matchRoleOptionType(t),
            s =
              UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.GetUnionMatchRoleOptionObject(
                e,
              );
          s &&
            void 0 !==
              (e =
                UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.ReadUnionMatchRoleOption(
                  e,
                  this.FbDataInternal.matchRoleOption(t, s),
                )) &&
            this.PAe.push(e);
        }
    }
    return this.PAe;
  }
  get ChangeRoleTrigger() {
    return (
      this.Okh ||
        ((this.Okh = !0), (this.Fkh = this.FbDataInternal.changeRoleTrigger())),
      this.Fkh
    );
  }
}
exports.FbEntityMatchPlayer = FbEntityMatchPlayer;
//# sourceMappingURL=FbEntityMatchPlayer.js.map
