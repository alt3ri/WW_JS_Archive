"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueFixHook = void 0);
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil"),
  GameplayCueHookCommonItem_1 = require("./CommonItem/GameplayCueHookCommonItem"),
  GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueFixHook extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments),
      (this.$$o = void 0),
      (this.VWs = void 0),
      (this._1n = () => {
        var t;
        this.IsActive &&
          this.VWs &&
          (this.$$o && (this.$$o.Destroy(), (this.$$o = void 0)),
          (t = this.MTl()),
          (this.$$o =
            GameplayCueHookCommonItem_1.GameplayCueHookCommonItem.Spawn(
              this.ActorInternal,
              FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket),
              t,
              this.CueConfig.Resources,
            )));
      });
  }
  OnInit() {}
  OnTick(t) {
    this.$$o && this.$$o.Tick(this.STl());
  }
  OnCreate() {
    var t = this.EntityHandle.Entity?.GetComponent(1)?.IsAutonomousProxy,
      e = t ? this.MTl() : this.STl();
    (this.$$o = GameplayCueHookCommonItem_1.GameplayCueHookCommonItem.Spawn(
      this.ActorInternal,
      FNameUtil_1.FNameUtil.GetDynamicFName(this.CueConfig.Socket),
      e,
      this.CueConfig.Resources,
    )),
      t &&
        !this.yTl() &&
        ((this.VWs = this.ETl()), this.VWs) &&
        this.VWs.RoleTeleport.Add(this._1n);
  }
  OnDestroy() {
    this.$$o && (this.$$o.Destroy(), (this.$$o = void 0)),
      this.VWs?.RoleTeleport.Remove(this._1n),
      (this.VWs = void 0);
  }
  STl() {
    return this.EntityHandle.Entity.GetComponent(97)
      .GetCurrentTargetLocation()
      .ToUeVector();
  }
  MTl() {
    return this.EntityHandle.Entity.GetComponent(97)
      .GetCurrentPathwayEndLocation()
      .ToUeVector();
  }
  yTl() {
    return this.EntityHandle.Entity.GetComponent(97).GetIsInLastPathway();
  }
  ETl() {
    return this.EntityHandle.Entity.GetComponent(
      97,
    ).GetCurrentTargetEnterPortalCapture();
  }
}
exports.GameplayCueFixHook = GameplayCueFixHook;
//# sourceMappingURL=GameplayCueFixHook.js.map
