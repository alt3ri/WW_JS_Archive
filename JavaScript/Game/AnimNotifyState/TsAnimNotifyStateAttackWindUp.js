"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  ObjectUtils_1 = require("../../Core/Utils/ObjectUtils"),
  TsBaseCharacter_1 = require("../Character/TsBaseCharacter"),
  SkeletalMeshEffectContext_1 = require("../Effect/EffectContext/SkeletalMeshEffectContext"),
  EffectSystem_1 = require("../Effect/EffectSystem"),
  GlobalData_1 = require("../GlobalData"),
  entityEffectMap = new Map();
class TsAnimNotifyStateAttackWindUp extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.Info = void 0);
  }
  Constructor() {}
  K2_NotifyBegin(e, i, f) {
    if (!this.Info) return !1;
    var r = e.GetOwner(),
      s = r?.CharacterActorComponent;
    if (!s?.Valid) return !1;
    var a = s.Entity,
      n = a.GetComponent(60),
      c = a.GetComponent(207);
    if (!n?.Valid) return !1;
    (c = c?.CreateAnimNotifyContent(i.GetName(), this.exportIndex)),
      n.SetWindupAttackInfo(this.Info, c ?? 0n),
      n.SetCounterAttackEndTime(f),
      (i = this.Info.Effect);
    if (ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(i)) {
      let t = void 0;
      ((t =
        r instanceof TsBaseCharacter_1.default &&
        r.CharacterActorComponent?.Entity
          ? new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
              r.CharacterActorComponent?.Entity.Id,
            )
          : new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
              void 0,
            )).SkeletalMeshComp = e),
        (t.SourceObject = r),
        (t.CreateFromType = 1);
      (c = i.ToAssetPathName()),
        (n = s.GetSocketTransform(this.Info.SocketName)),
        (f = EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          n,
          c,
          "[TsAnimNotifyStateAttackWindUp.K2_NotifyBegin]",
          t,
          0,
        ));
      entityEffectMap.set(a.Id, f),
        this.Info.EffectAttach &&
          this.SetupEffectTransform(
            EffectSystem_1.EffectSystem.GetEffectActor(f),
            s.SkeletalMesh,
          );
    }
    return !0;
  }
  SetupEffectTransform(t, e) {
    t.K2_AttachToComponent(e, this.Info.SocketName, 0, 0, 0, !1);
    e = UE.KismetMathLibrary.Conv_TransformToTransformDouble(
      this.Info.RelativeTransform,
    );
    t.D_K2_SetActorRelativeTransform(e, !1, void 0, !0);
  }
  K2_NotifyEnd(t, e) {
    if (!this.Info) return !1;
    t = t.GetOwner()?.CharacterActorComponent;
    if (!t?.Valid) return !1;
    var t = t.Entity,
      i = t.GetComponent(60);
    if (!t.GetComponent(39)?.Valid || !i?.Valid) return !1;
    i.WindupAttackEnd();
    i = entityEffectMap.get(t.Id);
    return (
      i &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          i,
          "[TsAnimNotifyStateAttackWindUp.K2_NotifyEnd]",
          !1,
        ),
        entityEffectMap.delete(t.Id)),
      !0
    );
  }
  GetNotifyName() {
    return "前摇配置";
  }
}
exports.default = TsAnimNotifyStateAttackWindUp;
//# sourceMappingURL=TsAnimNotifyStateAttackWindUp.js.map
