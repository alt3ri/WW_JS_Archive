"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  EffectContext_1 = require("../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem");
class AnimNotifyStateTrail extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments),
      (this.TrailingConfigData = void 0),
      (this.UseWeapon = !1),
      (this.WeaponCaseIndex = 0),
      (this.Handle = 0);
  }
  K2_ValidateAssets() {
    return !0;
  }
  K2_NotifyBegin(t, e, i) {
    if (((this.Handle = 0), !t))
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("RenderEffect", 26, "拖尾特效传入空参数", ["动画", e]),
        !1
      );
    if (!this.TrailingConfigData)
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("RenderEffect", 26, "拖尾特效缺失配置", [
            "动画",
            e.GetName(),
          ]),
        !1
      );
    let r = t;
    if (this.UseWeapon) {
      var f = "WeaponCase" + this.WeaponCaseIndex,
        s = t
          .GetOwner()
          .K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      let e = !1;
      for (let t = 0; t < s.Num(); t++)
        if (s.Get(t).GetName() === f) {
          (r = s.Get(t)), (e = !0);
          break;
        }
      if (!e)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Render", 26, "AnimNotifyStateTrail未找到武器"),
          !1
        );
    }
    var e = r.GetOwner(),
      o = new EffectContext_1.EffectContext(void 0);
    return (
      e instanceof TsBaseCharacter_1.default &&
        e.CharacterActorComponent?.Entity &&
        (o.EntityId = e.CharacterActorComponent?.Entity.Id),
      (o.SourceObject = r.GetOwner()),
      (this.Handle = EffectSystem_1.EffectSystem.SpawnEffect(
        e,
        t.K2_GetComponentToWorld(),
        this.TrailingConfigData.ToAssetPathName(),
        "[AnimNotifyStateTrail.K2_NotifyBegin]",
        o,
        3,
        void 0,
        (t, e) => {
          5 === t && EffectSystem_1.EffectSystem.SetupEffectTrailSpec(e, r);
        },
      )),
      !!EffectSystem_1.EffectSystem.IsValid(this.Handle) &&
        (EffectSystem_1.EffectSystem.SetEffectNotRecord(this.Handle, !0), !0)
    );
  }
  K2_NotifyEnd(t, e) {
    return !(
      !EffectSystem_1.EffectSystem.IsValid(this.Handle) ||
      (EffectSystem_1.EffectSystem.StopEffectById(
        this.Handle,
        "AnimNotifyTrail: K2_NotifyEnd",
        !1,
      ),
      (this.Handle = 0))
    );
  }
}
exports.default = AnimNotifyStateTrail;
//# sourceMappingURL=AnimNotifyStateTrail.js.map
