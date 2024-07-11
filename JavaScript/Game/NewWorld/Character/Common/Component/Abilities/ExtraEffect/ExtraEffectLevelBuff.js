"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExtraEffectLevelBuff = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log");
const AbilityUtils_1 = require("../AbilityUtils");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
const LevelBuffSceneItem_1 = require("./LevelBuffs/LevelBuffSceneItem");
const LevelBuffSetWalkableFloorAngle_1 = require("./LevelBuffs/LevelBuffSetWalkableFloorAngle");
const levelBuffClassMap = {
  LevelBuffSceneItem: LevelBuffSceneItem_1.LevelBuffSceneItem,
  LevelBuffSetWalkableFloorAngle:
    LevelBuffSetWalkableFloorAngle_1.LevelBuffSetWalkableFloorAngle,
};
class ExtraEffectLevelBuff extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.IQo = void 0);
  }
  InitParameters(e) {
    const t = e.ExtraEffectParameters[0];
    const l = e.ExtraEffectParameters.slice(1);
    const s = AbilityUtils_1.AbilityUtils.GetLevelValue(
      e.ExtraEffectGrowParameters1,
      this.Level,
      0,
    );
    var e = AbilityUtils_1.AbilityUtils.GetLevelValue(
      e.ExtraEffectGrowParameters2,
      this.Level,
      0,
    );
    const f = levelBuffClassMap[t];
    f
      ? (this.IQo = new f(this.OwnerEntity, this.BuffId, l, s, e))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          29,
          "没有注册玩法效果",
          ["ClassName", t],
          ["Buff", this.BuffId],
        );
  }
  OnCreated() {
    this.IQo?.OnCreated();
  }
  OnExecute() {}
  OnRemoved(e) {
    this.IQo?.OnRemoved(e);
  }
  OnStackIncreased(e, t) {
    this.IQo?.OnStackChanged(e, t, !1);
  }
  OnStackDecreased(e, t, l) {
    this.IQo?.OnStackChanged(e, t, l);
  }
}
exports.ExtraEffectLevelBuff = ExtraEffectLevelBuff;
// # sourceMappingURL=ExtraEffectLevelBuff.js.map
