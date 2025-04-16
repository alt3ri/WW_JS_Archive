"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueBeam = void 0);
const Log_1 = require("../../../../../../../Core/Common/Log"),
  FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil"),
  GameplayCueBeamCommonItem_1 = require("./CommonItem/GameplayCueBeamCommonItem"),
  GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueBeam extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments),
      (this.NBa = void 0),
      (this.p$o = void 0),
      (this.v$o = void 0);
  }
  OnInit() {
    this.p$o = new Array();
    var s = this.CueConfig.Socket.split("#");
    for (let e = 0, t = s?.length; e < t; e++)
      this.p$o.push(FNameUtil_1.FNameUtil.GetDynamicFName(s[e]));
    (this.NBa = this.Instigator?.Entity?.CheckGetComponent(3)?.Actor),
      this.Instigator ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 28, "无法获取Buff特效连线创建者")),
      this.NBa === this.ActorInternal &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 28, "Buff特效连线两端不能是同一个人");
  }
  OnTick(e) {
    var t, s;
    this.NBa.bHidden || this.ActorInternal.bHidden
      ? this.v$o.GetOwner().SetActorHiddenInGame(!0)
      : ((t = this.p$o[0]
          ? this.NBa.Mesh.D_GetSocketLocation(this.p$o[0])
          : this.NBa.D_K2_GetActorLocation()),
        (s = this.p$o[1]
          ? this.ActorInternal.Mesh.D_GetSocketLocation(this.p$o[1])
          : this.ActorInternal.D_K2_GetActorLocation()),
        this.v$o.Tick([t, s], e));
  }
  OnCreate() {
    this.v$o = GameplayCueBeamCommonItem_1.GameplayCueBeamCommonItem.Spawn(
      this.NBa,
      this.CueConfig.Path,
    );
  }
  OnDestroy() {
    this.v$o.Destroy();
  }
}
exports.GameplayCueBeam = GameplayCueBeam;
//# sourceMappingURL=GameplayCueBeam.js.map
