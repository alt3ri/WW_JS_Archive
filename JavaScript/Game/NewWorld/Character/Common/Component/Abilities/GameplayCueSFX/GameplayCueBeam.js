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
      (this.MXo = void 0),
      (this.SXo = void 0),
      (this.EXo = void 0);
  }
  OnInit() {
    this.SXo = new Array();
    var s = this.CueConfig.Socket.split("#");
    for (let e = 0, t = s?.length; e < t; e++)
      this.SXo.push(FNameUtil_1.FNameUtil.GetDynamicFName(s[e]));
    (this.MXo = this.Entity.CheckGetComponent(157)
      ?.GetBuffByHandle(this.ActiveHandleId)
      ?.GetInstigator()
      .CheckGetComponent(3)?.Actor),
      this.MXo ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 29, "无法获取Buff特效连线创建者")),
      this.MXo === this.ActorInternal &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 29, "Buff特效连线两端不能是同一个人");
  }
  OnTick(e) {
    let t = !1;
    (this.MXo.bHidden || this.ActorInternal.bHidden) && (t = !0),
      this.EXo.GetOwner().SetActorHiddenInGame(t);
    var s = this.SXo[0]
        ? this.MXo.Mesh.GetSocketLocation(this.SXo[0])
        : this.MXo.K2_GetActorLocation(),
      i = this.SXo[1]
        ? this.ActorInternal.Mesh.GetSocketLocation(this.SXo[1])
        : this.ActorInternal.K2_GetActorLocation();
    GameplayCueController_1.GameplayCueController.TickBeam(this.EXo, [s, i], e);
  }
  OnCreate() {
    this.EXo =
      GameplayCueController_1.GameplayCueController.SpawnGameplayCueBeam(
        this.MXo,
        this.CueConfig.Path,
      );
  }
  OnDestroy() {
    GameplayCueController_1.GameplayCueController.DestroyGameplayCueBeam(
      this.EXo,
    );
  }
}
exports.GameplayCueBeam = GameplayCueBeam;
//# sourceMappingURL=GameplayCueBeam.js.map
