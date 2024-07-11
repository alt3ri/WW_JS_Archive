"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueCameraEffect = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueCameraEffect extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments), (this.hJ = 0);
  }
  OnCreate() {
    this.CueConfig.Path &&
      this.Entity.GetComponent(3).IsAutonomousProxy &&
      (0 !== this.hJ &&
        ModelManager_1.ModelManager.ScreenEffectModel.EndScreenEffect(this.hJ),
      (this.hJ = ModelManager_1.ModelManager.ScreenEffectModel.PlayScreenEffect(
        this.CueConfig.Path,
      )));
  }
  OnDestroy() {
    0 !== this.hJ &&
      (ModelManager_1.ModelManager.ScreenEffectModel.EndScreenEffect(this.hJ),
      (this.hJ = 0));
  }
  OnEnable() {
    this.Create();
  }
  OnDisable() {
    this.Destroy();
  }
}
exports.GameplayCueCameraEffect = GameplayCueCameraEffect;
//# sourceMappingURL=GameplayCueCameraEffect.js.map
