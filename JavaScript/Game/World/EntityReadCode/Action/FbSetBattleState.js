"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetBattleState = void 0);
const UnionStateOptionHelper_1 = require("./UnionStateOptionHelper");
class FbSetBattleState {
  constructor(t) {
    (this.FbDataInternal = t), (this.Mvh = !1), (this.Evh = void 0);
  }
  static Create(t) {
    if (t) return new FbSetBattleState(t);
  }
  get StateOption() {
    var t, e;
    return (
      !this.Mvh &&
        ((this.Mvh = !0),
        (t = this.FbDataInternal.stateOptionType()),
        (e =
          UnionStateOptionHelper_1.UnionStateOptionHelper.GetUnionStateOptionObject(
            t,
          ))) &&
        (this.Evh =
          UnionStateOptionHelper_1.UnionStateOptionHelper.ReadUnionStateOption(
            t,
            this.FbDataInternal.stateOption(e),
          )),
      this.Evh
    );
  }
}
exports.FbSetBattleState = FbSetBattleState;
//# sourceMappingURL=FbSetBattleState.js.map
