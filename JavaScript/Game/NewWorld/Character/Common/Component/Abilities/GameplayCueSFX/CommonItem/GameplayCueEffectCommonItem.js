"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueEffectCommonItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../../../Core/Common/Log"),
  EffectContext_1 = require("../../../../../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../../../../../Effect/EffectSystem");
class GameplayCueEffectCommonItem {
  constructor(t, e, s) {
    (this.OQt = t),
      (this.TargetPosition = e),
      (this.Paths = s),
      (this.m$o = 0),
      (this.ege = void 0),
      (this.Lrt = !0);
  }
  static Spawn(t, e, s) {
    (t = new this(t, e, s)), (e = t.$Kl());
    if (EffectSystem_1.EffectSystem.IsValid(e))
      return (t.m$o = e), t.SetVisible(!1), t;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        67,
        "[GameplayCueEffectCommonItem]特效播放失败, 请检查资源路径",
        ["path", s],
      );
  }
  Destroy() {
    (this.ege = void 0),
      EffectSystem_1.EffectSystem.IsValid(this.m$o) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          this.m$o,
          "[GameplayCueEffectCommonItem.Destroy]",
          !0,
        );
  }
  Refresh(t, e, s) {
    this.SetVisible(t),
      t &&
        (e && s
          ? this.ege?.D_K2_SetActorLocationAndRotation(
              e.ToUeVector(),
              s.ToUeRotator(),
              !1,
              void 0,
              !0,
            )
          : (e &&
              this.ege?.D_K2_SetActorLocation(e.ToUeVector(), !1, void 0, !0),
            s && this.ege?.K2_SetActorRotation(s.ToUeRotator(), !1)));
  }
  SetVisible(t) {
    this.Lrt !== t && ((this.Lrt = t), this.ege?.SetActorHiddenInGame(!t));
  }
  $Kl() {
    var t;
    return 0 === this.Paths.length
      ? 0
      : ((t = EffectSystem_1.EffectSystem.SpawnEffect(
          this.OQt,
          new UE.TransformDouble(this.TargetPosition),
          this.Paths[0],
          "[GameplayCueEffectCommonItem.CreateEffect]",
          new EffectContext_1.EffectContext(this.OQt.EntityId),
          0,
        )),
        (this.ege = EffectSystem_1.EffectSystem.GetEffectActor(t)),
        t);
  }
}
exports.GameplayCueEffectCommonItem = GameplayCueEffectCommonItem;
//# sourceMappingURL=GameplayCueEffectCommonItem.js.map
