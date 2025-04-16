"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckOnlinePlayer = void 0);
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper");
class FbCheckOnlinePlayer {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.czh = !1),
      (this.uzh = void 0);
  }
  static Create(e) {
    if (e) return new FbCheckOnlinePlayer(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get OnlinePlayerConditionTargetOption() {
    var e, i;
    return (
      !this.czh &&
        ((this.czh = !0),
        (e = this.FbDataInternal.onlinePlayerConditionTargetOptionType()),
        (i =
          UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.GetUnionOnlinePlayerConditionTargetObject(
            e,
          ))) &&
        (this.uzh =
          UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.ReadUnionOnlinePlayerConditionTarget(
            e,
            this.FbDataInternal.onlinePlayerConditionTargetOption(i),
          )),
      this.uzh
    );
  }
}
exports.FbCheckOnlinePlayer = FbCheckOnlinePlayer;
//# sourceMappingURL=FbCheckOnlinePlayer.js.map
