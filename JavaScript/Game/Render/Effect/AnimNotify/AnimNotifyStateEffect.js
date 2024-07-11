"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const SkeletalMeshEffectContext_1 = require("../../../Effect/EffectContext/SkeletalMeshEffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const UiEffectAnsContext_1 = require("../../../Module/UiModel/UiModelComponent/Common/UiModelAns/UiAnimNotifyStateContext/UiEffectAnsContext");
const RenderConfig_1 = require("../../Config/RenderConfig");
class AnimNotifyStateEffectParams {
  constructor(t, e) {
    (this.EffectHandle = t), (this.UiEffectAnsContext = e);
  }
}
class AnimNotifyStateEffect extends UE.KuroEffectMakerANS {
  constructor() {
    super(...arguments),
      (this.NeedAnyTag = !1),
      (this.PlayNeedTags = void 0),
      (this.EffectDataAssetRef = void 0),
      (this.AutoDetachTime = -0),
      (this.SocketName = void 0),
      (this.UseSocketTransform = !1),
      (this.UseClipboardTransform = !1),
      (this.DetachWhenSkillEnd = !1),
      (this.IsWeaponEffect = !1),
      (this.WhenSkillEnd = 0),
      (this.FasterStop = !0),
      (this.RecycleWhenEnd = !1),
      (this.AlwaysLoop = !1),
      (this.PlayOnEnd = !1),
      (this.WithOutTag = void 0),
      (this.ParamsMap = new Map()),
      (this.IsInited = !1),
      (this.LastMeshComp = void 0);
  }
  K2_ValidateAssets() {
    return !0;
  }
  Init() {
    this.IsInited || ((this.ParamsMap = new Map()), (this.IsInited = !0));
  }
  K2_NotifyBegin(e, t, i) {
    this.Init();
    const s = (this.LastMeshComp = e).GetOwner();
    if (
      s?.IsA(UE.TsUiSceneRoleActor_C.StaticClass()) ||
      s?.IsA(UE.TsSkeletalObserver_C.StaticClass())
    ) {
      if (e.IsComponentTickEnabled()) {
        const f = new UiEffectAnsContext_1.UiEffectAnsContext(
          this.EffectDataAssetRef.ToAssetPathName(),
          e,
          this.SocketName,
          this.Attached,
          this.AttachLocationOnly,
          this.Location,
          this.Rotation,
          this.Scale,
          this.PlayOnEnd,
        );
        let t = void 0;
        (t =
          (s?.IsA(UE.TsUiSceneRoleActor_C.StaticClass()),
          s.Model.CheckGetComponent(6))).AddAns("UiEffectAnsContext", f),
          this.ParamsMap.set(e, new AnimNotifyStateEffectParams(void 0, f));
      }
      return !0;
    }
    return !!this.PlayOnEnd || this.SpawnEffectInternal(e, t);
  }
  SpawnEffectInternal(t, e) {
    let i = t.GetOwner();
    if (i instanceof TsBaseCharacter_1.default && !this.GameplayTagsCheck(i))
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RenderEffect",
            51,
            "AnimNotifyStateEffect：特效GameplayTag检查失败",
            ["meshComp", t?.GetName()],
            ["outer", t.GetOwner()?.GetName()],
            ["animation", e?.GetName()],
          ),
        !1
      );
    i = t.GetOwner();
    let s = void 0;
    let f =
      (((s =
        i instanceof TsBaseCharacter_1.default &&
        i.CharacterActorComponent?.Entity
          ? new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
              i.CharacterActorComponent?.Entity.Id,
            )
          : new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
              void 0,
            )).SkeletalMeshComp = t),
      (s.SourceObject = i),
      (s.CreateFromType = 1),
      i?.ActorHasTag(AnimNotifyStateEffect.TagFlagNoNiagara) &&
        (s.PlayFlag |= 1),
      3);
    return (
      i instanceof TsBaseCharacter_1.default &&
        i.CharacterActorComponent?.Entity?.GetComponent(33) &&
        (f = 0),
      (GlobalData_1.GlobalData.IsUiSceneOpen ||
        i.Tags.Contains(RenderConfig_1.RenderConfig.UIName)) &&
        (f = 1),
      EffectSystem_1.EffectSystem.InitializeWithPreview(!1),
      !this.ParamsMap.has(t) &&
        !(
          !(e = EffectSystem_1.EffectSystem.SpawnEffect(
            i,
            new UE.Transform(),
            this.EffectDataAssetRef.ToAssetPathName(),
            "[AnimNotifyStateEffect.SpawnEffectInternal]",
            s,
            f,
            (t) => {
              EffectSystem_1.EffectSystem.SetEffectNotRecord(t, !0);
            },
          )) ||
          !EffectSystem_1.EffectSystem.IsValid(e) ||
          (this.AttachEffectToSkill(i, e),
          this.AttachEffectToWeapon(t, i, e),
          this.SetupTransform(EffectSystem_1.EffectSystem.GetEffectActor(e), t),
          EffectSystem_1.EffectSystem.ForceCheckPendingInit(e),
          this.ParamsMap.set(t, new AnimNotifyStateEffectParams(e, void 0)),
          0)
        )
    );
  }
  AttachEffectToSkill(e, i) {
    if (e instanceof TsBaseCharacter_1.default) {
      e = e.CharacterActorComponent?.Entity?.GetComponent(33);
      if (e) {
        let t = 0;
        (!this.DetachWhenSkillEnd && this.WhenSkillEnd === 0) ||
          (this.DetachWhenSkillEnd && this.WhenSkillEnd === 0
            ? (t = 2)
            : this.DetachWhenSkillEnd || this.WhenSkillEnd !== 0
              ? this.DetachWhenSkillEnd && this.WhenSkillEnd === 1
                ? (t = 3)
                : this.DetachWhenSkillEnd && this.WhenSkillEnd === 2
                  ? (t = 4)
                  : this.DetachWhenSkillEnd || this.WhenSkillEnd !== 1
                    ? this.DetachWhenSkillEnd ||
                      this.WhenSkillEnd !== 2 ||
                      (t = 6)
                    : (t = 5)
              : (t = 1)),
          e.AttachEffectToSkill(i, t, this.SocketName, -1);
      }
    }
  }
  AttachEffectToWeapon(t, e, i) {
    if (this.IsWeaponEffect && e instanceof TsBaseCharacter_1.default) {
      e = e.CharacterActorComponent?.Entity?.GetComponent(69);
      if (e?.Valid)
        for (const s of e.GetWeaponMesh().CharacterWeapons)
          s.Mesh === t && s.AddBuffEffect(i);
    }
  }
  K2_NotifyTick(t, e, i) {
    if (
      this.Attached &&
      this.AttachLocationOnly &&
      this.SocketName !== AnimNotifyStateEffect.NameNone
    ) {
      let s = this.ParamsMap.get(t)?.EffectHandle;
      if (!s || !EffectSystem_1.EffectSystem.IsValid(s)) return !0;
      (s = EffectSystem_1.EffectSystem.GetEffectActor(s)),
        (t = t.GetSocketTransform(this.SocketName, 0));
      s.K2_SetActorLocation(t.TransformPosition(this.Location), !1, void 0, !1);
    }
    return !0;
  }
  K2_NotifyEnd(t, e) {
    const i = t.GetOwner();
    const s = this.ParamsMap.get(t);
    if (!s) return !1;
    if (
      (this.ParamsMap.delete(t),
      i?.IsA(UE.TsUiSceneRoleActor_C.StaticClass()) ||
        i?.IsA(UE.TsSkeletalObserver_C.StaticClass()))
    ) {
      if (!s.UiEffectAnsContext)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "RenderEffect",
              44,
              "AnimNotifyStateEffect未成对，UiEffectAnsContext为空",
            ),
          !1
        );
      i?.IsA(UE.TsUiSceneRoleActor_C.StaticClass());
      var f = i.Model;
      f &&
        f
          .CheckGetComponent(6)
          .ReduceAns("UiEffectAnsContext", s.UiEffectAnsContext);
    }
    if (
      this.PlayOnEnd &&
      i instanceof TsBaseCharacter_1.default &&
      !i.CharacterActorComponent?.Entity?.GetComponent(185)?.HasAnyTag(
        GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
          this.WithOutTag,
        ),
      )
    )
      return (f = this.SpawnEffectInternal(t, e)), this.ParamsMap.delete(t), f;
    return (
      s.EffectHandle &&
        EffectSystem_1.EffectSystem.StopEffectById(
          s.EffectHandle,
          `[动画:${e.GetName()}，AnimNotifyStateEffect.K2_NotifyEnd]`,
          this.FasterStop,
        ),
      !0
    );
  }
  GameplayTagsCheck(t) {
    const e = t.CharacterActorComponent?.Entity?.GetComponent(185);
    if (e) {
      const i = this.PlayNeedTags.Num();
      if (this.NeedAnyTag) {
        for (let t = 0; t < i; t++) {
          const s = this.PlayNeedTags.GetKey(t);
          const f = this.PlayNeedTags.Get(s);
          if (e.HasTag(s.TagId) === f) return !0;
        }
        return !1;
      }
      for (let t = 0; t < i; t++) {
        const r = this.PlayNeedTags.GetKey(t);
        const a = this.PlayNeedTags.Get(r);
        if (e.HasTag(r.TagId) !== a) return !1;
      }
    }
    return !0;
  }
  K2_PostChangeProperty(t) {
    if (t.op_Equality(RenderConfig_1.RenderConfig.UseSocketTransform2))
      (this.UseSocketTransform = !1),
        this.LastMeshComp &&
          ((e = this.LastMeshComp.GetSocketTransform(this.SocketName, 3)),
          (this.Location = e.GetLocation()),
          (this.Rotation = e.GetRotation().Rotator()),
          (this.Scale = e.GetScale3D()));
    else if (
      t.op_Equality(RenderConfig_1.RenderConfig.UseClipboardTransform2)
    ) {
      const f = ((this.UseClipboardTransform = !1), puerts_1.$ref)("");
      UE.KuroRenderingRuntimeBPPluginBPLibrary.ClipboardPaste_EditorOnly(f);
      var e = (t) => {
        const e = (0, puerts_1.$unref)(f);
        const i = e.indexOf(t, -1);
        if (i >= 0) {
          const s = e.indexOf(")", i);
          if (s >= 0) return e.substring(i + t.length, s);
        }
        return "";
      };
      var t = e("Translation=(");
      var i = (0, puerts_1.$ref)(this.Location);
      const s = (0, puerts_1.$ref)(!1);
      var t =
        (UE.KismetStringLibrary.Conv_StringToVector(t, i, s),
        (0, puerts_1.$unref)(s) && (this.Location = (0, puerts_1.$unref)(i)),
        e("Rotation=("));
      var i = (0, puerts_1.$ref)(this.Rotation);
      var t =
        (UE.KismetStringLibrary.Conv_StringToRotator(t, i, s),
        (0, puerts_1.$unref)(s) && (this.Rotation = (0, puerts_1.$unref)(i)),
        e("Scale3D=("));
      var i = (0, puerts_1.$ref)(this.Scale);
      UE.KismetStringLibrary.Conv_StringToVector(t, i, s),
        (0, puerts_1.$unref)(s) && (this.Scale = (0, puerts_1.$unref)(i));
    }
    return !0;
  }
  GetNotifyName() {
    const t = this.EffectDataAssetRef.ToAssetPathName();
    return t ? UE.BlueprintPathsLibrary.GetBaseFilename(t, !0) : "特效数据状态";
  }
  SetupTransform(t, e) {
    let i, s;
    this.Attached &&
    !this.AttachLocationOnly &&
    this.SocketName !== AnimNotifyStateEffect.NameNone
      ? (t.K2_AttachToComponent(e, this.SocketName, 0, 0, 0, !1),
        (i = new UE.Transform(this.Rotation, this.Location, this.Scale)),
        (s = (0, puerts_1.$ref)(new UE.HitResult())),
        t.K2_SetActorRelativeTransform(i, !1, s, !0))
      : ((i = e.GetSocketTransform(this.SocketName, 0)),
        (s = (0, puerts_1.$ref)(new UE.HitResult())),
        t.K2_SetActorLocationAndRotation(
          i.TransformPosition(this.Location),
          i.TransformRotation(this.Rotation.Quaternion()).Rotator(),
          !1,
          s,
          !0,
        ),
        t.SetActorScale3D(this.Scale));
  }
}
(AnimNotifyStateEffect.NameNone = new UE.FName("None")),
  (AnimNotifyStateEffect.TagFlagNoNiagara = new UE.FName("NoNiagara")),
  (exports.default = AnimNotifyStateEffect);
// # sourceMappingURL=AnimNotifyStateEffect.js.map
