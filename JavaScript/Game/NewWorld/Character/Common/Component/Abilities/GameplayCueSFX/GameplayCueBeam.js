"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueBeam = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil"),
  GameplayCueController_1 = require("./Controller/GameplayCueController"),
  GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueBeam extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments),
      (this.f$o = void 0),
      (this.p$o = void 0),
      (this.v$o = void 0);
  }
  OnInit() {
    this.p$o = new Array();
    var s = this.CueConfig.Socket.split("#");
    for (let e = 0, t = s?.length; e < t; e++)
      this.p$o.push(FNameUtil_1.FNameUtil.GetDynamicFName(s[e]));
    (this.f$o = this.Entity.CheckGetComponent(159)
      ?.GetBuffByHandle(this.ActiveHandleId)
      ?.GetInstigator()
      .CheckGetComponent(3)?.Actor),
      this.f$o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 29, "无法获取Buff特效连线创建者")),
      this.f$o === this.ActorInternal &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 29, "Buff特效连线两端不能是同一个人");
  }
  OnTick(e) {
    let t = !1;
    (this.f$o.bHidden || this.ActorInternal.bHidden) && (t = !0),
      this.v$o.GetOwner().SetActorHiddenInGame(t);
    var s = this.p$o[0]
        ? this.f$o.Mesh.GetSocketLocation(this.p$o[0])
        : this.f$o.K2_GetActorLocation(),
      i = this.p$o[1]
        ? this.ActorInternal.Mesh.GetSocketLocation(this.p$o[1])
        : this.ActorInternal.K2_GetActorLocation();
    GameplayCueController_1.GameplayCueController.TickBeam(this.v$o, [s, i], e);
  }
  OnCreate() {
    this.v$o =
      GameplayCueController_1.GameplayCueController.SpawnGameplayCueBeam(
        this.f$o,
        this.CueConfig.Path,
      );
  }
  OnDestroy() {
    GameplayCueController_1.GameplayCueController.DestroyGameplayCueBeam(
      this.v$o,
    );
  }
}
exports.GameplayCueBeam = GameplayCueBeam;
//# sourceMappingURL=GameplayCueBeam.js.map
