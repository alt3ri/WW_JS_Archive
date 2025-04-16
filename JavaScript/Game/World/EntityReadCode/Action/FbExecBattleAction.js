"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbExecBattleAction = void 0);
const UnionExecBattleOptionHelper_1 = require("./UnionExecBattleOptionHelper");
class FbExecBattleAction {
  constructor(t) {
    (this.FbDataInternal = t), (this.qvh = !1), (this.kvh = void 0);
  }
  static Create(t) {
    if (t) return new FbExecBattleAction(t);
  }
  get BattleOption() {
    var t, e;
    return (
      !this.qvh &&
        ((this.qvh = !0),
        (t = this.FbDataInternal.battleOptionType()),
        (e =
          UnionExecBattleOptionHelper_1.UnionExecBattleOptionHelper.GetUnionExecBattleOptionObject(
            t,
          ))) &&
        (this.kvh =
          UnionExecBattleOptionHelper_1.UnionExecBattleOptionHelper.ReadUnionExecBattleOption(
            t,
            this.FbDataInternal.battleOption(e),
          )),
      this.kvh
    );
  }
}
exports.FbExecBattleAction = FbExecBattleAction;
//# sourceMappingURL=FbExecBattleAction.js.map
