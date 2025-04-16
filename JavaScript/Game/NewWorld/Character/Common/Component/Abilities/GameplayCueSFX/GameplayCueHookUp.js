"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueHookUp = void 0);
const UE = require("ue"),
  FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil"),
  GameplayCueHookCommonItem_1 = require("./CommonItem/GameplayCueHookCommonItem"),
  GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueHookUp extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments), (this.$$o = void 0);
  }
  OnInit() {}
  OnTick(e) {}
  OnCreate() {
    this.$$o = GameplayCueHookCommonItem_1.GameplayCueHookCommonItem.Spawn(
      this.ActorInternal,
      FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket),
      this.STl(),
      this.CueConfig.Resources,
    );
  }
  OnDestroy() {
    this.$$o.Destroy();
  }
  STl() {
    return this.ActorInternal.D_GetTransform().TransformPositionNoScale(
      new UE.VectorDouble(
        this.CueConfig.Location.X,
        this.CueConfig.Location.Y,
        this.CueConfig.Location.Z,
      ),
    );
  }
}
exports.GameplayCueHookUp = GameplayCueHookUp;
//# sourceMappingURL=GameplayCueHookUp.js.map
