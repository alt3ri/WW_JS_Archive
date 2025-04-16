"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  Quat_1 = require("../../../../Core/Utils/Math/Quat"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter"),
  SkeletalMeshEffectContext_1 = require("../../../Effect/EffectContext/SkeletalMeshEffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  TsEffectActor_1 = require("../../../Effect/TsEffectActor"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CharacterUtils_1 = require("../../../NewWorld/Character/CharacterUtils"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  EffectUtil_1 = require("../../../Utils/EffectUtil"),
  RenderConfig_1 = require("../../Config/RenderConfig"),
  DISTANCE_EFFECT_ON_FLOOR = 1,
  DISTANCE_FOOT_TO_EFFECT = 10,
  DETECT_DEPTH = 100,
  PROFILE_KEY = "AnimNotifyEffect";
class AnimNotifyEffect extends UE.KuroEffectMakerAN {
  constructor() {
    super(...arguments),
      (this.NeedAnyTag = !1),
      (this.PlayNeedTags = void 0),
      (this.EffectDataAssetRef = void 0),
      (this.LocationType = 0),
      (this.RightOrLeftFoot = !0),
      (this.DebugTrace = !1),
      (this.SocketName = void 0),
      (this.UseSocketTransform = !1),
      (this.TraceFrom = void 0),
      (this.TraceTo = void 0),
      (this.UseClipboardTransform = !1),
      (this.DetachWhenSkillEnd = !1),
      (this.WhenSkillEnd = 0),
      (this.WhenSkillEndEnableTime = 0),
      (this.IgnoreWhenInvisible = !1),
      (this.LastSkeletalMesh = void 0);
  }
  Constructor() {
    this.LastSkeletalMesh = void 0;
  }
  K2_ValidateAssets() {
    return !0;
  }
  K2_Notify(t, e) {
    if (
      (AnimNotifyEffect.NotifyStat.Start(),
      (this.LastSkeletalMesh = t),
      this.IgnoreWhenInvisible && !t.IsVisible())
    )
      return !1;
    var i = this.LastSkeletalMesh.GetOwner(),
      f = this.EffectDataAssetRef.ToAssetPathName();
    if (!f?.length)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "特效路径无效",
            ["meshComp", t?.GetName()],
            ["outer", i?.GetName()],
            ["animation", e?.GetName()],
          ),
        AnimNotifyEffect.NotifyStat.Stop(),
        !1
      );
    if (
      !Info_1.Info.IsInCg() &&
      i instanceof TsBaseCharacter_1.default &&
      !this.GameplayTagsCheck(i)
    )
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RenderEffect",
            50,
            "AnimNotifyEffect: 特效GameplayTag检查失败",
            ["meshComp", t?.GetName()],
            ["outer", i?.GetName()],
            ["animation", e?.GetName()],
          ),
        AnimNotifyEffect.NotifyStat.Stop(),
        !1
      );
    EffectSystem_1.EffectSystem.InitializeWithPreview(!1);
    let o = Info_1.Info.IsGameRunning() ? 3 : 0,
      n =
        (Info_1.Info.IsInCg() && (o = 0),
        GlobalData_1.GlobalData.IsUiSceneOpen ||
        i.Tags.Contains(RenderConfig_1.RenderConfig.UIName)
          ? (o = 1)
          : ((i instanceof TsBaseCharacter_1.default &&
              i.CharacterActorComponent?.Entity?.GetComponent(38)) ||
              (i instanceof TsEffectActor_1.default &&
                0 === i.GetEffectType()) ||
              (i?.IsA(UE.EffectSystemActor.StaticClass()) &&
                0 === i.GetEffectType())) &&
            (o = 0),
        AnimNotifyEffect.CreateEffectContextStat.Start(),
        void 0),
      s =
        (((n =
          i instanceof TsBaseCharacter_1.default &&
          i.CharacterActorComponent?.Entity
            ? new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
                i.CharacterActorComponent?.Entity.Id,
              )
            : i.IsA(UE.TsEffectActor_C.StaticClass())
              ? new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
                  i.OwnerEntityId,
                )
              : i.IsA(UE.EffectSystemActor.StaticClass())
                ? new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
                    i.GetOwnerEntityId(),
                  )
                : new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
                    void 0,
                  )).SkeletalMeshComp = t),
        (n.SourceObject = i),
        (n.DisablePostProcess = this.IsDisablePostProcess(t)),
        (n.CreateFromType = 1),
        i?.ActorHasTag(AnimNotifyEffect.TagFlagNoNiagara) && (n.PlayFlag |= 1),
        AnimNotifyEffect.CreateEffectContextStat.Stop(),
        AnimNotifyEffect.SpawnEffectStat.Start(),
        void 0);
    Info_1.Info.IsGameRunning()
      ? i instanceof TsBaseCharacter_1.default &&
        (s = i.CharacterActorComponent?.GetReplaceEffect(f))
      : (s = EffectUtil_1.EffectUtil.GetPreviewReplaceEffectPath(f));
    e = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
      i,
      new UE.TransformDouble(),
      s || f,
      "[AnimNotifyEffect.K2_Notify]",
      n,
      o,
    );
    return (
      EffectSystem_1.EffectSystem.SetEffectNotRecord(e, !0),
      AnimNotifyEffect.SpawnEffectStat.Stop(),
      this.AttachEffectAndSetupTransform(i, e),
      AnimNotifyEffect.NotifyStat.Stop(),
      !0
    );
  }
  AttachEffectAndSetupTransform(t, e) {
    e &&
      EffectSystem_1.EffectSystem.IsValid(e) &&
      (AnimNotifyEffect.AttachEffectToSkillStat.Start(),
      this.AttachEffectToSkill(t, e),
      AnimNotifyEffect.AttachEffectToSkillStat.Stop(),
      AnimNotifyEffect.SetupTransformStat.Start(),
      this.SetupTransform(EffectSystem_1.EffectSystem.GetEffectActor(e), t),
      AnimNotifyEffect.SetupTransformStat.Stop(),
      EffectSystem_1.EffectSystem.ForceCheckPendingInit(e));
  }
  GameplayTagsCheck(t) {
    var e = t.CharacterActorComponent?.Entity?.GetComponent(203);
    if (e) {
      var i = this.PlayNeedTags.Num();
      if (this.NeedAnyTag) {
        for (let t = 0; t < i; t++) {
          var f = this.PlayNeedTags.GetKey(t),
            o = this.PlayNeedTags.Get(f);
          if (e.HasTag(f.TagId) === o) return !0;
        }
        return !1;
      }
      for (let t = 0; t < i; t++) {
        var n = this.PlayNeedTags.GetKey(t),
          s = this.PlayNeedTags.Get(n);
        if (e.HasTag(n.TagId) !== s) return !1;
      }
    }
    return !0;
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
          e.AttachEffectToSkill(
            i,
            t,
            this.SocketName,
            this.WhenSkillEndEnableTime,
          );
      }
    }
  }
  K2_PostChangeProperty(t) {
    if (t.op_Equality(RenderConfig_1.RenderConfig.UseSocketTransform))
      (this.UseSocketTransform = !1),
        this.LastSkeletalMesh &&
          ((e = this.LastSkeletalMesh.D_GetSocketTransform(this.SocketName, 3)),
          (this.Location = e.GetLocation().op_ToVector()),
          (this.Rotation = e.GetRotation().Rotator()),
          (this.Scale = e.GetScale3D().op_ToVector()));
    else if (t.op_Equality(RenderConfig_1.RenderConfig.UseClipboardTransform)) {
      const o = ((this.UseClipboardTransform = !1), puerts_1.$ref)("");
      UE.KuroRenderingRuntimeBPPluginBPLibrary.ClipboardPaste_EditorOnly(o);
      var e = (t) => {
          var e = (0, puerts_1.$unref)(o),
            i = e.indexOf(t, -1);
          if (0 <= i) {
            var f = e.indexOf(")", i);
            if (0 <= f) return e.substring(i + t.length, f);
          }
          return "";
        },
        t = e("Translation=("),
        i = (0, puerts_1.$ref)(this.Location),
        f = (0, puerts_1.$ref)(!1),
        t =
          (UE.KismetStringLibrary.Conv_StringToVector(t, i, f),
          (0, puerts_1.$unref)(f) && (this.Location = (0, puerts_1.$unref)(i)),
          e("Rotation=(")),
        i = (0, puerts_1.$ref)(this.Rotation),
        t =
          (UE.KismetStringLibrary.Conv_StringToRotator(t, i, f),
          (0, puerts_1.$unref)(f) && (this.Rotation = (0, puerts_1.$unref)(i)),
          e("Scale3D=(")),
        i = (0, puerts_1.$ref)(this.Scale);
      UE.KismetStringLibrary.Conv_StringToVector(t, i, f),
        (0, puerts_1.$unref)(f) && (this.Scale = (0, puerts_1.$unref)(i));
    }
    return !0;
  }
  GetNotifyName() {
    var t = this.EffectDataAssetRef.ToAssetPathName();
    return t ? UE.BlueprintPathsLibrary.GetBaseFilename(t, !0) : "特效数据通知";
  }
  SetupTransform(t, e) {
    switch (this.LocationType) {
      case 0:
        this.Attached && this.SocketName !== AnimNotifyEffect.NameNone
          ? (t.K2_AttachToComponent(
              this.LastSkeletalMesh,
              this.SocketName,
              0,
              0,
              0,
              !1,
            ),
            (f = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location)),
            (i = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Scale)),
            (f = new UE.TransformDouble(this.Rotation, f, i)),
            t.D_K2_SetActorRelativeTransform(f, !1, void 0, !0))
          : ((i = this.LastSkeletalMesh.D_GetSocketTransform(
              this.SocketName,
              0,
            )),
            (f = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location)),
            t.D_K2_SetActorLocationAndRotation(
              i.TransformPosition(f),
              i.TransformRotation(this.Rotation.Quaternion()).Rotator(),
              !1,
              void 0,
              !0,
            ),
            (f = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Scale)),
            t.D_SetActorScale3D(f));
        break;
      case 1:
        var i = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location),
          f = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Scale),
          i = new UE.TransformDouble(this.Rotation, i, f);
        e instanceof TsBaseCharacter_1.default
          ? this.TraceDetectClimbStep(e, i)
          : (AnimNotifyEffect.TmpVector || AnimNotifyEffect.InitTraceInfo(),
            AnimNotifyEffect.TmpVector.FromUeVector(
              this.LastSkeletalMesh.D_GetRightVector(),
            ),
            AnimNotifyEffect.SocketLocation.FromUeVector(
              this.LastSkeletalMesh.D_GetSocketLocation(
                this.RightOrLeftFoot
                  ? AnimNotifyEffect.SocketNameRightFoot
                  : AnimNotifyEffect.SocketNameLeftFoot,
              ),
            ),
            ((f = AnimNotifyEffect.LineTrace).WorldContextObject = e),
            TraceElementCommon_1.TraceElementCommon.SetStartLocation(
              f,
              AnimNotifyEffect.SocketLocation,
            ),
            AnimNotifyEffect.TmpVector.MultiplyEqual(DETECT_DEPTH),
            AnimNotifyEffect.TmpVector.AdditionEqual(
              AnimNotifyEffect.SocketLocation,
            ),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
              f,
              AnimNotifyEffect.TmpVector,
            ),
            f.SetDrawDebugTrace(this.DebugTrace ? 2 : 0),
            TraceElementCommon_1.TraceElementCommon.LineTrace(f, PROFILE_KEY) &&
              (TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
                f.HitResult,
                0,
                AnimNotifyEffect.TmpVector,
              ),
              TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
                f.HitResult,
                0,
                AnimNotifyEffect.TmpVector2,
              ),
              AnimNotifyEffect.TmpVector2.Multiply(
                DISTANCE_EFFECT_ON_FLOOR,
                AnimNotifyEffect.TmpVector3,
              ),
              AnimNotifyEffect.TmpVector3.AdditionEqual(
                AnimNotifyEffect.TmpVector,
              ),
              i.SetLocation(AnimNotifyEffect.TmpVector3.ToUeVector()),
              MathUtils_1.MathUtils.LookRotationUpFirst(
                Vector_1.Vector.UpVectorProxy,
                AnimNotifyEffect.TmpVector2,
                AnimNotifyEffect.TmpQuat,
              ),
              i.SetRotation(AnimNotifyEffect.TmpQuat.ToUeQuat()))),
          t.D_K2_SetActorTransform(i, !1, void 0, !1);
        break;
      case 2:
        AnimNotifyEffect.TmpVector || AnimNotifyEffect.InitTraceInfo();
        var f = this.LastSkeletalMesh.D_GetSocketTransform(this.SocketName, 0),
          i = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.TraceFrom),
          o = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.TraceTo),
          i = f.TransformPosition(i),
          f = f.TransformPosition(o),
          o = AnimNotifyEffect.LineTrace,
          i =
            ((o.WorldContextObject = e),
            TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, i),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, f),
            o.SetDrawDebugTrace(this.DebugTrace ? 2 : 0),
            TraceElementCommon_1.TraceElementCommon.LineTrace(o, PROFILE_KEY));
        i &&
          (TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
            o.HitResult,
            0,
            AnimNotifyEffect.TmpVector,
          ),
          TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
            o.HitResult,
            0,
            AnimNotifyEffect.TmpVector2,
          ),
          AnimNotifyEffect.TmpVector4.FromUeVector(e.GetActorRightVector()),
          AnimNotifyEffect.TmpVector2.CrossProduct(
            AnimNotifyEffect.TmpVector4,
            AnimNotifyEffect.TmpVector3,
          ),
          (f = UE.KismetMathLibrary.D_MakeRotFromZX(
            AnimNotifyEffect.TmpVector2.ToUeVector(),
            AnimNotifyEffect.TmpVector3.ToUeVector(),
          )),
          t.D_K2_SetActorLocationAndRotation(
            AnimNotifyEffect.TmpVector.ToUeVector(),
            f,
            !1,
            void 0,
            !0,
          ),
          (i = new UE.Transform(this.Rotation, this.Location, this.Scale)),
          t.K2_AddActorLocalTransform(i, !1, void 0, !0));
    }
  }
  static InitTraceInfo() {
    (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpVector2 = Vector_1.Vector.Create()),
      (this.TmpVector3 = Vector_1.Vector.Create()),
      (this.TmpVector4 = Vector_1.Vector.Create()),
      (this.TmpQuat = Quat_1.Quat.Create()),
      (this.SocketLocation = Vector_1.Vector.Create()),
      (this.SocketNameLeftFoot = new UE.FName("Bip001LFoot")),
      (this.SocketNameRightFoot = new UE.FName("Bip001RFoot"));
    var t = UE.NewObject(UE.TraceLineElement.StaticClass());
    (t.bIsSingle = !0),
      (t.bIgnoreSelf = !0),
      (t.bTraceComplex = !0),
      (t.DrawTime = 5),
      t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        t,
        ColorUtils_1.ColorUtils.LinearGreen,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        t,
        ColorUtils_1.ColorUtils.LinearRed,
      ),
      (this.LineTrace = t);
  }
  TraceDetectClimbStep(t, e) {
    AnimNotifyEffect.TmpVector || AnimNotifyEffect.InitTraceInfo();
    var i = AnimNotifyEffect.LineTrace,
      f = t.Mesh,
      f =
        ((i.WorldContextObject = t),
        AnimNotifyEffect.SocketLocation.FromUeVector(
          f.D_GetSocketLocation(
            this.RightOrLeftFoot
              ? AnimNotifyEffect.SocketNameRightFoot
              : AnimNotifyEffect.SocketNameLeftFoot,
          ),
        ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          i,
          AnimNotifyEffect.SocketLocation,
        ),
        t.CharacterActorComponent.ActorForwardProxy.Multiply(
          DETECT_DEPTH,
          AnimNotifyEffect.TmpVector,
        ),
        AnimNotifyEffect.TmpVector.AdditionEqual(
          AnimNotifyEffect.SocketLocation,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          i,
          AnimNotifyEffect.TmpVector,
        ),
        i.SetDrawDebugTrace(this.DebugTrace ? 2 : 0),
        TraceElementCommon_1.TraceElementCommon.LineTrace(i, PROFILE_KEY));
    return f
      ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          i.HitResult,
          0,
          AnimNotifyEffect.TmpVector2,
        ),
        TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
          i.HitResult,
          0,
          AnimNotifyEffect.TmpVector3,
        ),
        MathUtils_1.MathUtils.LookRotationUpFirst(
          Vector_1.Vector.UpVectorProxy,
          AnimNotifyEffect.TmpVector3,
          AnimNotifyEffect.TmpQuat,
        ),
        e.SetRotation(AnimNotifyEffect.TmpQuat.ToUeQuat()),
        AnimNotifyEffect.TmpVector3.MultiplyEqual(AnimNotifyEffect.TmpVector3),
        AnimNotifyEffect.TmpVector2.AdditionEqual(AnimNotifyEffect.TmpVector3),
        e.SetLocation(AnimNotifyEffect.TmpVector2.ToUeVector()),
        !0)
      : (MathUtils_1.MathUtils.LookRotationUpFirst(
          Vector_1.Vector.UpVectorProxy,
          t.CharacterActorComponent.ActorForwardProxy,
          AnimNotifyEffect.TmpQuat,
        ),
        e.SetRotation(AnimNotifyEffect.TmpQuat.ToUeQuat()),
        t.CharacterActorComponent.ActorForwardProxy.Multiply(
          DISTANCE_FOOT_TO_EFFECT,
          AnimNotifyEffect.TmpVector3,
        ),
        AnimNotifyEffect.SocketLocation.Addition(
          AnimNotifyEffect.TmpVector3,
          AnimNotifyEffect.TmpVector2,
        ),
        e.SetLocation(AnimNotifyEffect.TmpVector2.ToUeVector()),
        !1);
  }
  IsDisablePostProcess(t) {
    var t = t.GetOwner();
    return (
      t instanceof TsBaseCharacter_1.default &&
      !!(t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
        t.EntityId,
      ))?.Valid &&
      !CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(
        t,
      )
    );
  }
}
(AnimNotifyEffect.TmpVector = void 0),
  (AnimNotifyEffect.TmpVector2 = void 0),
  (AnimNotifyEffect.TmpVector3 = void 0),
  (AnimNotifyEffect.TmpVector4 = void 0),
  (AnimNotifyEffect.TmpQuat = void 0),
  (AnimNotifyEffect.SocketLocation = void 0),
  (AnimNotifyEffect.SocketNameLeftFoot = void 0),
  (AnimNotifyEffect.SocketNameRightFoot = void 0),
  (AnimNotifyEffect.LineTrace = void 0),
  (AnimNotifyEffect.NotifyStat = Stats_1.Stat.Create("K2_Notify")),
  (AnimNotifyEffect.CreateEffectContextStat = Stats_1.Stat.Create(
    "K2_Notify.CreateEffectContext",
  )),
  (AnimNotifyEffect.SpawnEffectStat = Stats_1.Stat.Create(
    "K2_Notify.SpawnEffect",
  )),
  (AnimNotifyEffect.AttachEffectToSkillStat = Stats_1.Stat.Create(
    "K2_Notify.AttachEffectToSkill",
  )),
  (AnimNotifyEffect.SetupTransformStat = Stats_1.Stat.Create(
    "K2_Notify.SetupTransform",
  )),
  (AnimNotifyEffect.NameNone = new UE.FName("None")),
  (AnimNotifyEffect.TagFlagNoNiagara = new UE.FName("NoNiagara")),
  (exports.default = AnimNotifyEffect);
//# sourceMappingURL=AnimNotifyEffect.js.map
