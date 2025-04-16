"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSpawnMonsterConfig = void 0);
const UnionSpawnMonsterCompleteConditionHelper_1 = require("./UnionSpawnMonsterCompleteConditionHelper"),
  UnionSpawnMonsterPreConditionHelper_1 = require("./UnionSpawnMonsterPreConditionHelper");
class FbSpawnMonsterConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.tgh = !1),
      (this.FFe = 0),
      (this.Gfh = !1),
      (this.Ofh = 0),
      (this.Kqh = !1),
      (this.$qh = void 0),
      (this.Xqh = !1),
      (this.Yqh = void 0),
      (this.Hgh = !1),
      (this.Wgh = void 0);
  }
  static Create(t) {
    if (t) return new FbSpawnMonsterConfig(t);
  }
  get Id() {
    return (
      this.tgh || ((this.tgh = !0), (this.FFe = this.FbDataInternal.id())),
      this.FFe
    );
  }
  get DelayTime() {
    return (
      this.Gfh ||
        ((this.Gfh = !0), (this.Ofh = this.FbDataInternal.delayTime())),
      this.Ofh
    );
  }
  get TargetsToAwake() {
    if (!this.Kqh) {
      (this.Kqh = !0), (this.$qh = new Array());
      var i = this.FbDataInternal.targetsToAwakeLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.$qh.push(this.FbDataInternal.targetsToAwake(t));
    }
    return this.$qh;
  }
  get CompleteCondition() {
    var t, i;
    return (
      !this.Xqh &&
        ((this.Xqh = !0),
        (t = this.FbDataInternal.completeConditionType()),
        (i =
          UnionSpawnMonsterCompleteConditionHelper_1.UnionSpawnMonsterCompleteConditionHelper.GetUnionSpawnMonsterCompleteConditionObject(
            t,
          ))) &&
        (this.Yqh =
          UnionSpawnMonsterCompleteConditionHelper_1.UnionSpawnMonsterCompleteConditionHelper.ReadUnionSpawnMonsterCompleteCondition(
            t,
            this.FbDataInternal.completeCondition(i),
          )),
      this.Yqh
    );
  }
  get PreCondition() {
    var t, i;
    return (
      !this.Hgh &&
        ((this.Hgh = !0),
        (t = this.FbDataInternal.preConditionType()),
        (i =
          UnionSpawnMonsterPreConditionHelper_1.UnionSpawnMonsterPreConditionHelper.GetUnionSpawnMonsterPreConditionObject(
            t,
          ))) &&
        (this.Wgh =
          UnionSpawnMonsterPreConditionHelper_1.UnionSpawnMonsterPreConditionHelper.ReadUnionSpawnMonsterPreCondition(
            t,
            this.FbDataInternal.preCondition(i),
          )),
      this.Wgh
    );
  }
}
exports.FbSpawnMonsterConfig = FbSpawnMonsterConfig;
//# sourceMappingURL=FbSpawnMonsterConfig.js.map
