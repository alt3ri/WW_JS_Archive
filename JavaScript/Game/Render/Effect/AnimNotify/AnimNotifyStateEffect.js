"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  SkeletalMeshEffectContext_1 = require("../../../Effect/EffectContext/SkeletalMeshEffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  TsEffectActor_1 = require("../../../Effect/TsEffectActor"),
  GlobalData_1 = require("../../../GlobalData"),
  UiEffectAnsContext_1 = require("../../../Module/UiModel/UiModelComponent/Common/UiModelAns/UiAnimNotifyStateContext/UiEffectAnsContext"),
  EffectUtil_1 = require("../../../Utils/EffectUtil"),
  RenderConfig_1 = require("../../Config/RenderConfig");
class AnimNotifyStateEffectParams {
  constructor(t, e, i) {
    (this.EffectHandle = t),
      (this.UiEffectAnsContext = e),
      (this.HasSeekTo = i);
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
      (this.SyncEventTimeToEffectTime = !1),
      (this.WithOutTag = void 0),
      (this.IgnoreWhenInvisible = !1),
      (this.ParamsMap = new Map()),
      (this.IsInited = !1),
      (this.LastMeshComp = void 0);
  }
  Constructor() {
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
    if (this.IgnoreWhenInvisible && !e.IsVisible()) return !1;
    this.Init(), Info_1.Info.IsPlayInEditor && (this.LastMeshComp = e);
    var s = e.GetOwner();
    if (
      s?.IsA(UE.TsUiSceneRoleActor_C.StaticClass()) ||
      s?.IsA(UE.TsSkeletalObserver_C.StaticClass())
    ) {
      if (e.IsComponentTickEnabled()) {
        var f = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location),
          f = new UiEffectAnsContext_1.UiEffectAnsContext(
            this.EffectDataAssetRef.ToAssetPathName(),
            e,
            this.SocketName,
            this.Attached,
            this.AttachLocationOnly,
            f,
            this.Rotation,
            new UE.VectorDouble(this.Scale),
            this.PlayOnEnd,
            (t, e) => {
              EffectSystem_1.EffectSystem.IsValid(e) &&
                this.ParamsMap.has(t) &&
                (this.SyncEventTimeToEffectTime &&
                  EffectSystem_1.EffectSystem.FreezeHandle(e, !0, !0),
                (this.ParamsMap.get(t).EffectHandle = e));
            },
          );
        let t = void 0;
        (t =
          (s?.IsA(UE.TsUiSceneRoleActor_C.StaticClass()),
          s.Model.CheckGetComponent(6))).AddAns("UiEffectAnsContext", f),
          this.ParamsMap.set(e, new AnimNotifyStateEffectParams(void 0, f, !1));
      }
    } else if (!this.PlayOnEnd) {
      if (this.ParamsMap.has(e)) return !1;
      s = this.SpawnEffectInternal(e, t);
      if (!s) return !1;
      this.SyncEventTimeToEffectTime &&
        EffectSystem_1.EffectSystem.FreezeHandle(s, !0, !0),
        this.ParamsMap.set(e, new AnimNotifyStateEffectParams(s, void 0, !1));
    }
    return !0;
  }
  SpawnEffectInternal(t, e, i = !1) {
    var s = t.GetOwner();
    if (s instanceof TsBaseCharacter_1.default && !this.GameplayTagsCheck(s))
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RenderEffect",
            50,
            "AnimNotifyStateEffect：特效GameplayTag检查失败",
            ["meshComp", t?.GetName()],
            ["outer", t.GetOwner()?.GetName()],
            ["animation", e?.GetName()],
          ),
        0
      );
    s = t.GetOwner();
    let f = void 0,
      r =
        (((f =
          s instanceof TsBaseCharacter_1.default &&
          s.CharacterActorComponent?.Entity
            ? new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
                s.CharacterActorComponent?.Entity.Id,
              )
            : s.IsA(UE.TsEffectActor_C.StaticClass())
              ? new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
                  s.OwnerEntityId,
                )
              : s.IsA(UE.EffectSystemActor.StaticClass())
                ? new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
                    s.GetOwnerEntityId(),
                  )
                : new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
                    void 0,
                  )).SkeletalMeshComp = t),
        (f.SourceObject = s),
        (f.CreateFromType = 1),
        s?.ActorHasTag(AnimNotifyStateEffect.TagFlagNoNiagara) &&
          (f.PlayFlag |= 1),
        Info_1.Info.IsGameRunning() ? 3 : 0);
    Info_1.Info.IsInCg() && (r = 0),
      GlobalData_1.GlobalData.IsUiSceneOpen ||
      s.Tags.Contains(RenderConfig_1.RenderConfig.UIName)
        ? (r = 1)
        : ((s instanceof TsBaseCharacter_1.default &&
            s.CharacterActorComponent?.Entity?.GetComponent(38)) ||
            (s instanceof TsEffectActor_1.default && 0 === s.GetEffectType()) ||
            (s?.IsA(UE.EffectSystemActor.StaticClass()) &&
              0 === s.GetEffectType())) &&
          (r = 0),
      EffectSystem_1.EffectSystem.InitializeWithPreview(!1);
    e = this.EffectDataAssetRef.ToAssetPathName();
    let n = void 0,
      h =
        (Info_1.Info.IsGameRunning()
          ? s instanceof TsBaseCharacter_1.default &&
            (n = s.CharacterActorComponent?.GetReplaceEffect(e))
          : (n = EffectUtil_1.EffectUtil.GetPreviewReplaceEffectPath(e)),
        0);
    return (
      (h = i
        ? EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
            s,
            new UE.TransformDouble(),
            n || e,
            "[AnimNotifyStateEffect.SpawnEffectInternal]",
            f,
            r,
          )
        : EffectSystem_1.EffectSystem.SpawnEffect(
            s,
            new UE.TransformDouble(),
            n || e,
            "[AnimNotifyStateEffect.SpawnEffectInternal]",
            f,
            r,
          )),
      EffectSystem_1.EffectSystem.SetEffectNotRecord(h, !0),
      h && EffectSystem_1.EffectSystem.IsValid(h)
        ? (this.AttachEffectToSkill(s, h),
          this.AttachEffectToWeapon(t, s, h),
          this.SetupTransform(EffectSystem_1.EffectSystem.GetEffectActor(h), t),
          EffectSystem_1.EffectSystem.ForceCheckPendingInit(h),
          h)
        : 0
    );
  }
  AttachEffectToSkill(e, i) {
    if (e instanceof TsBaseCharacter_1.default) {
      e = e.CharacterActorComponent?.Entity?.GetComponent(38);
      if (e) {
        let t = 0;
        (!this.DetachWhenSkillEnd && 0 === this.WhenSkillEnd) ||
          (this.DetachWhenSkillEnd && 0 === this.WhenSkillEnd
            ? (t = 2)
            : this.DetachWhenSkillEnd || 0 !== this.WhenSkillEnd
              ? this.DetachWhenSkillEnd && 1 === this.WhenSkillEnd
                ? (t = 3)
                : this.DetachWhenSkillEnd && 2 === this.WhenSkillEnd
                  ? (t = 4)
                  : this.DetachWhenSkillEnd || 1 !== this.WhenSkillEnd
                    ? this.DetachWhenSkillEnd ||
                      2 !== this.WhenSkillEnd ||
                      (t = 6)
                    : (t = 5)
              : (t = 1)),
          e.AttachEffectToSkill(i, t, this.SocketName, -1);
      }
    }
  }
  AttachEffectToWeapon(t, e, i) {
    if (this.IsWeaponEffect && e instanceof TsBaseCharacter_1.default) {
      e = e.CharacterActorComponent?.Entity?.GetComponent(79);
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
      var s = this.ParamsMap.get(t);
      if (!s) return !1;
      s = s.EffectHandle;
      if (!s || !EffectSystem_1.EffectSystem.IsValid(s)) return !1;
      var s = EffectSystem_1.EffectSystem.GetEffectActor(s),
        f = t.D_GetSocketTransform(this.SocketName, 0),
        r = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location);
      s.D_K2_SetActorLocation(f.TransformPosition(r), !1, void 0, !1);
    }
    if (this.SyncEventTimeToEffectTime) {
      s = this.ParamsMap.get(t);
      if (!s) return !1;
      f = s.EffectHandle;
      if (!f || !EffectSystem_1.EffectSystem.IsValid(f)) return !1;
      s.HasSeekTo &&
        ((s.HasSeekTo = !1),
        EffectSystem_1.EffectSystem.FreezeHandle(f, !1, !0)),
        EffectSystem_1.EffectSystem.IsHandleFreeze(f) &&
          EffectSystem_1.EffectSystem.HandleSeekToTime(
            f,
            this.CurrentTimeLength,
            !1,
            !0,
          ) &&
          (s.HasSeekTo = !0);
    }
    return !0;
  }
  K2_NotifyEnd(t, e) {
    var i = t.GetOwner();
    if (
      i?.IsA(UE.TsUiSceneRoleActor_C.StaticClass()) ||
      i?.IsA(UE.TsSkeletalObserver_C.StaticClass())
    ) {
      const f = this.ParamsMap.get(t);
      if (f && f.UiEffectAnsContext) {
        i?.IsA(UE.TsUiSceneRoleActor_C.StaticClass());
        var s = i.Model;
        if (s)
          return (
            s
              .CheckGetComponent(6)
              .ReduceAns("UiEffectAnsContext", f.UiEffectAnsContext),
            this.ParamsMap.delete(t),
            !0
          );
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RenderEffect",
            25,
            "AnimNotifyStateEffect未成对，model为空",
          );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            43,
            "AnimNotifyStateEffect未成对，UiEffectAnsContext为空",
          );
      return !1;
    }
    if (this.PlayOnEnd) {
      if (this.IgnoreWhenInvisible && !t.IsVisible()) return !1;
      if (i instanceof TsBaseCharacter_1.default)
        if (
          !i.CharacterActorComponent?.Entity?.GetComponent(203)?.HasAnyTag(
            GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(
              this.WithOutTag,
            ),
          )
        )
          return 0 !== this.SpawnEffectInternal(t, e, !0);
    }
    const f = this.ParamsMap.get(t);
    return (
      !!f &&
      (this.ParamsMap.delete(t),
      f.EffectHandle &&
        EffectSystem_1.EffectSystem.StopEffectById(
          f.EffectHandle,
          `[动画:${e.GetName()}，AnimNotifyStateEffect.K2_NotifyEnd]`,
          this.FasterStop,
        ),
      !0)
    );
  }
  GameplayTagsCheck(t) {
    var e = t.CharacterActorComponent?.Entity?.GetComponent(203);
    if (e) {
      var i = this.PlayNeedTags.Num();
      if (this.NeedAnyTag) {
        for (let t = 0; t < i; t++) {
          var s = this.PlayNeedTags.GetKey(t),
            f = this.PlayNeedTags.Get(s);
          if (e.HasTag(s.TagId) === f) return !0;
        }
        return !1;
      }
      for (let t = 0; t < i; t++) {
        var r = this.PlayNeedTags.GetKey(t),
          n = this.PlayNeedTags.Get(r);
        if (e.HasTag(r.TagId) !== n) return !1;
      }
    }
    return !0;
  }
  K2_PostChangeProperty(t) {
    if (t.op_Equality(RenderConfig_1.RenderConfig.UseSocketTransform2))
      (this.UseSocketTransform = !1),
        this.LastMeshComp &&
          ((e = this.LastMeshComp.D_GetSocketTransform(this.SocketName, 3)),
          (i = UE.KismetMathLibrary.Conv_VectorDoubleToVector(e.GetLocation())),
          (this.Location = i),
          (this.Rotation = e.GetRotation().Rotator()),
          (i = UE.KismetMathLibrary.Conv_VectorDoubleToVector(e.GetScale3D())),
          (this.Scale = i));
    else if (
      t.op_Equality(RenderConfig_1.RenderConfig.UseClipboardTransform2)
    ) {
      const f = ((this.UseClipboardTransform = !1), puerts_1.$ref)("");
      UE.KuroRenderingRuntimeBPPluginBPLibrary.ClipboardPaste_EditorOnly(f);
      var e = (t) => {
          var e = (0, puerts_1.$unref)(f),
            i = e.indexOf(t, -1);
          if (0 <= i) {
            var s = e.indexOf(")", i);
            if (0 <= s) return e.substring(i + t.length, s);
          }
          return "";
        },
        i = e("Translation=("),
        t = (0, puerts_1.$ref)(this.Location),
        s = (0, puerts_1.$ref)(!1),
        i =
          (UE.KismetStringLibrary.Conv_StringToVector(i, t, s),
          (0, puerts_1.$unref)(s) && (this.Location = (0, puerts_1.$unref)(t)),
          e("Rotation=(")),
        t = (0, puerts_1.$ref)(this.Rotation),
        i =
          (UE.KismetStringLibrary.Conv_StringToRotator(i, t, s),
          (0, puerts_1.$unref)(s) && (this.Rotation = (0, puerts_1.$unref)(t)),
          e("Scale3D=(")),
        t = (0, puerts_1.$ref)(this.Scale);
      UE.KismetStringLibrary.Conv_StringToVector(i, t, s),
        (0, puerts_1.$unref)(s) && (this.Scale = (0, puerts_1.$unref)(t));
    }
    return !0;
  }
  GetNotifyName() {
    var t = this.EffectDataAssetRef.ToAssetPathName();
    return t ? UE.BlueprintPathsLibrary.GetBaseFilename(t, !0) : "特效数据状态";
  }
  SetupTransform(t, e) {
    var i, s;
    this.Attached &&
    !this.AttachLocationOnly &&
    this.SocketName !== AnimNotifyStateEffect.NameNone
      ? (t.K2_AttachToComponent(e, this.SocketName, 0, 0, 0, !1),
        (i = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location)),
        (s = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Scale)),
        (i = new UE.TransformDouble(this.Rotation, i, s)),
        (s = (0, puerts_1.$ref)(new UE.HitResult())),
        t.D_K2_SetActorRelativeTransform(i, !1, s, !0))
      : ((i = e.D_GetSocketTransform(this.SocketName, 0)),
        (s = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location)),
        t.D_K2_SetActorLocationAndRotation(
          i.TransformPosition(s),
          i.TransformRotation(this.Rotation.Quaternion()).Rotator(),
          !1,
          void 0,
          !0,
        ),
        (e = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Scale)),
        t.D_SetActorScale3D(e));
  }
}
(AnimNotifyStateEffect.NameNone = new UE.FName("None")),
  (AnimNotifyStateEffect.TagFlagNoNiagara = new UE.FName("NoNiagara")),
  (exports.default = AnimNotifyStateEffect);
//# sourceMappingURL=AnimNotifyStateEffect.js.map
