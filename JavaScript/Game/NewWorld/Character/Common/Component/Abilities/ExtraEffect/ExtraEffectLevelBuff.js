"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExtraEffectLevelBuff = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  AbilityUtils_1 = require("../AbilityUtils"),
  ExtraEffectBase_1 = require("./ExtraEffectBase"),
  LevelBuffSceneItem_1 = require("./LevelBuffs/LevelBuffSceneItem"),
  LevelBuffSetWalkableFloorAngle_1 = require("./LevelBuffs/LevelBuffSetWalkableFloorAngle"),
  levelBuffClassMap = {
    LevelBuffSceneItem: LevelBuffSceneItem_1.LevelBuffSceneItem,
    LevelBuffSetWalkableFloorAngle:
      LevelBuffSetWalkableFloorAngle_1.LevelBuffSetWalkableFloorAngle,
  };
class ExtraEffectLevelBuff extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments), (this.EXo = void 0);
  }
  InitParameters(e) {
    var t = e.ExtraEffectParameters[0],
      l = e.ExtraEffectParameters.slice(1),
      s = AbilityUtils_1.AbilityUtils.GetLevelValue(
        e.ExtraEffectGrowParameters1,
        this.Level,
        0,
      ),
      e = AbilityUtils_1.AbilityUtils.GetLevelValue(
        e.ExtraEffectGrowParameters2,
        this.Level,
        0,
      ),
      f = levelBuffClassMap[t];
    f
      ? (this.EXo = new f(this.OwnerEntity, this.BuffId, l, s, e))
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
    this.EXo?.OnCreated();
  }
  OnExecute() {}
  OnRemoved(e) {
    this.EXo?.OnRemoved(e);
  }
  OnStackIncreased(e, t) {
    this.EXo?.OnStackChanged(e, t, !1);
  }
  OnStackDecreased(e, t, l) {
    this.EXo?.OnStackChanged(e, t, l);
  }
}
exports.ExtraEffectLevelBuff = ExtraEffectLevelBuff;
//# sourceMappingURL=ExtraEffectLevelBuff.js.map
