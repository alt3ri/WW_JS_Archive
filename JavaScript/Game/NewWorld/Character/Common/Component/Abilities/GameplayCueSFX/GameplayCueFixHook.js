"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueFixHook = void 0);
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil"),
  GameplayCueController_1 = require("./Controller/GameplayCueController"),
  GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueFixHook extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments),
      (this.$$o = void 0),
      (this.VWs = void 0),
      (this.OnRoleTeleport = () => {
        var t;
        this.IsActive &&
          this.VWs &&
          (this.$$o &&
            (GameplayCueController_1.GameplayCueController.DestroyGameplayCueHook(
              this.$$o,
            ),
            (this.$$o = void 0)),
          (t = this.GetCurrentPathwayEndLocation()),
          (this.$$o =
            GameplayCueController_1.GameplayCueController.SpawnGameplayCueHook(
              this.ActorInternal,
              FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket),
              t,
              this.CueConfig.Resources,
            )));
      });
  }
  OnInit() {}
  OnTick(t) {}
  OnCreate() {
    var t = this.GetCurrentPathwayEndLocation();
    (this.$$o =
      GameplayCueController_1.GameplayCueController.SpawnGameplayCueHook(
        this.ActorInternal,
        FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket),
        t,
        this.CueConfig.Resources,
      )),
      this.GetIsInLastPathway() ||
        ((this.VWs = this.GetTargetEnterPortalCapture()),
        this.VWs && this.VWs.RoleTeleport.Add(this.OnRoleTeleport));
  }
  OnDestroy() {
    this.$$o &&
      (GameplayCueController_1.GameplayCueController.DestroyGameplayCueHook(
        this.$$o,
      ),
      (this.$$o = void 0)),
      this.VWs?.RoleTeleport.Remove(this.OnRoleTeleport),
      (this.VWs = void 0);
  }
  GetCurrentPathwayEndLocation() {
    return this.EntityHandle.Entity.GetComponent(90)
      .GetCurrentPathwayEndLocation()
      .ToUeVector();
  }
  GetIsInLastPathway() {
    return this.EntityHandle.Entity.GetComponent(90).GetIsInLastPathway();
  }
  GetTargetEnterPortalCapture() {
    return this.EntityHandle.Entity.GetComponent(
      90,
    ).GetCurrentTargetEnterPortalCapture();
  }
}
exports.GameplayCueFixHook = GameplayCueFixHook;
//# sourceMappingURL=GameplayCueFixHook.js.map
