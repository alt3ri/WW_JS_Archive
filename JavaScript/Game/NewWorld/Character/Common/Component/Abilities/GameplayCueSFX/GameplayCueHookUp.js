"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueHookUp = void 0);
const UE = require("ue"),
  FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil"),
  GameplayCueController_1 = require("./Controller/GameplayCueController"),
  GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueHookUp extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments), (this.$$o = void 0);
  }
  OnInit() {}
  OnTick(e) {}
  OnCreate() {
    this.$$o =
      GameplayCueController_1.GameplayCueController.SpawnGameplayCueHook(
        this.ActorInternal,
        FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket),
        this.GetTargetPosition(),
        this.CueConfig.Resources,
      );
  }
  OnDestroy() {
    GameplayCueController_1.GameplayCueController.DestroyGameplayCueHook(
      this.$$o,
    );
  }
  GetTargetPosition() {
    return this.ActorInternal.GetTransform().TransformPositionNoScale(
      new UE.Vector(
        this.CueConfig.Location.X,
        this.CueConfig.Location.Y,
        this.CueConfig.Location.Z,
      ),
    );
  }
}
exports.GameplayCueHookUp = GameplayCueHookUp;
//# sourceMappingURL=GameplayCueHookUp.js.map
