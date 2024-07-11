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
  GlobalData_1 = require("../../../GlobalData"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
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
      (this.LastSkeletalMesh = void 0);
  }
  K2_ValidateAssets() {
    return !0;
  }
  K2_Notify(t, i) {
    this.LastSkeletalMesh = t;
    var e = this.LastSkeletalMesh.GetOwner(),
      f = this.EffectDataAssetRef.ToAssetPathName();
    if (!f?.length)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RenderEffect",
            3,
            "特效路径无效",
            ["meshComp", t?.GetName()],
            ["outer", e?.GetName()],
            ["animation", i?.GetName()],
          ),
        !1
      );
    if (
      !Info_1.Info.IsInCg() &&
      e instanceof TsBaseCharacter_1.default &&
      !this.GameplayTagsCheck(e)
    )
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "RenderEffect",
            51,
            "AnimNotifyEffect: 特效GameplayTag检查失败",
            ["meshComp", t?.GetName()],
            ["outer", e?.GetName()],
            ["animation", i?.GetName()],
          ),
        !1
      );
    EffectSystem_1.EffectSystem.InitializeWithPreview(!1);
    let o = 3,
      n =
        (e instanceof TsBaseCharacter_1.default &&
          e.CharacterActorComponent?.Entity?.GetComponent(33) &&
          (o = 0),
        (GlobalData_1.GlobalData.IsUiSceneOpen ||
          e.Tags.Contains(RenderConfig_1.RenderConfig.UIName)) &&
          (o = 1),
        void 0);
    ((n =
      e instanceof TsBaseCharacter_1.default &&
      e.CharacterActorComponent?.Entity
        ? new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
            e.CharacterActorComponent?.Entity.Id,
          )
        : new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
            void 0,
          )).SkeletalMeshComp = t),
      (n.SourceObject = e),
      (n.CreateFromType = 1),
      e?.ActorHasTag(AnimNotifyEffect.TagFlagNoNiagara) && (n.PlayFlag |= 1);
    i = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
      e,
      new UE.Transform(),
      f,
      "[AnimNotifyEffect.K2_Notify]",
      n,
      o,
      (t) => {
        EffectSystem_1.EffectSystem.SetEffectNotRecord(t, !0);
      },
    );
    return !(
      !i ||
      !EffectSystem_1.EffectSystem.IsValid(i) ||
      (this.AttachEffectToSkill(e, i),
      this.SetupTransform(EffectSystem_1.EffectSystem.GetEffectActor(i), e),
      EffectSystem_1.EffectSystem.ForceCheckPendingInit(i),
      0)
    );
  }
  GameplayTagsCheck(t) {
    var i = t.CharacterActorComponent?.Entity?.GetComponent(185);
    if (i) {
      var e = this.PlayNeedTags.Num();
      if (this.NeedAnyTag) {
        for (let t = 0; t < e; t++) {
          var f = this.PlayNeedTags.GetKey(t),
            o = this.PlayNeedTags.Get(f);
          if (i.HasTag(f.TagId) === o) return !0;
        }
        return !1;
      }
      for (let t = 0; t < e; t++) {
        var n = this.PlayNeedTags.GetKey(t),
          s = this.PlayNeedTags.Get(n);
        if (i.HasTag(n.TagId) !== s) return !1;
      }
    }
    return !0;
  }
  AttachEffectToSkill(i, e) {
    if (i instanceof TsBaseCharacter_1.default) {
      i = i.CharacterActorComponent?.Entity?.GetComponent(33);
      if (i) {
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
          i.AttachEffectToSkill(
            e,
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
          ((i = this.LastSkeletalMesh.GetSocketTransform(this.SocketName, 3)),
          (this.Location = i.GetLocation()),
          (this.Rotation = i.GetRotation().Rotator()),
          (this.Scale = i.GetScale3D()));
    else if (t.op_Equality(RenderConfig_1.RenderConfig.UseClipboardTransform)) {
      const o = ((this.UseClipboardTransform = !1), puerts_1.$ref)("");
      UE.KuroRenderingRuntimeBPPluginBPLibrary.ClipboardPaste_EditorOnly(o);
      var i = (t) => {
          var i = (0, puerts_1.$unref)(o),
            e = i.indexOf(t, -1);
          if (0 <= e) {
            var f = i.indexOf(")", e);
            if (0 <= f) return i.substring(e + t.length, f);
          }
          return "";
        },
        t = i("Translation=("),
        e = (0, puerts_1.$ref)(this.Location),
        f = (0, puerts_1.$ref)(!1),
        t =
          (UE.KismetStringLibrary.Conv_StringToVector(t, e, f),
          (0, puerts_1.$unref)(f) && (this.Location = (0, puerts_1.$unref)(e)),
          i("Rotation=(")),
        e = (0, puerts_1.$ref)(this.Rotation),
        t =
          (UE.KismetStringLibrary.Conv_StringToRotator(t, e, f),
          (0, puerts_1.$unref)(f) && (this.Rotation = (0, puerts_1.$unref)(e)),
          i("Scale3D=(")),
        e = (0, puerts_1.$ref)(this.Scale);
      UE.KismetStringLibrary.Conv_StringToVector(t, e, f),
        (0, puerts_1.$unref)(f) && (this.Scale = (0, puerts_1.$unref)(e));
    }
    return !0;
  }
  GetNotifyName() {
    var t = this.EffectDataAssetRef.ToAssetPathName();
    return t ? UE.BlueprintPathsLibrary.GetBaseFilename(t, !0) : "特效数据通知";
  }
  SetupTransform(t, i) {
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
            (e = new UE.Transform(this.Rotation, this.Location, this.Scale)),
            t.K2_SetActorRelativeTransform(e, !1, void 0, !0))
          : ((e = this.LastSkeletalMesh.GetSocketTransform(this.SocketName, 0)),
            t.K2_SetActorLocationAndRotation(
              e.TransformPosition(this.Location),
              e.TransformRotation(this.Rotation.Quaternion()).Rotator(),
              !1,
              void 0,
              !0,
            ),
            t.SetActorScale3D(this.Scale));
        break;
      case 1:
        var e = new UE.Transform(this.Rotation, this.Location, this.Scale);
        i instanceof TsBaseCharacter_1.default
          ? this.TraceDetectClimbStep(i, e)
          : (AnimNotifyEffect.TmpVector || AnimNotifyEffect.InitTraceInfo(),
            AnimNotifyEffect.TmpVector.FromUeVector(
              this.LastSkeletalMesh.GetRightVector(),
            ),
            AnimNotifyEffect.SocketLocation.FromUeVector(
              this.LastSkeletalMesh.GetSocketLocation(
                this.RightOrLeftFoot
                  ? AnimNotifyEffect.SocketNameRightFoot
                  : AnimNotifyEffect.SocketNameLeftFoot,
              ),
            ),
            ((f = AnimNotifyEffect.LineTrace).WorldContextObject = i),
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
              e.SetLocation(AnimNotifyEffect.TmpVector3.ToUeVector()),
              MathUtils_1.MathUtils.LookRotationUpFirst(
                Vector_1.Vector.UpVectorProxy,
                AnimNotifyEffect.TmpVector2,
                AnimNotifyEffect.TmpQuat,
              ),
              e.SetRotation(AnimNotifyEffect.TmpQuat.ToUeQuat()))),
          t.K2_SetActorTransform(e, !1, void 0, !1);
        break;
      case 2:
        AnimNotifyEffect.TmpVector || AnimNotifyEffect.InitTraceInfo();
        var f = this.LastSkeletalMesh.GetSocketTransform(this.SocketName, 0),
          e = f.TransformPosition(this.TraceFrom),
          f = f.TransformPosition(this.TraceTo),
          o = AnimNotifyEffect.LineTrace,
          e =
            ((o.WorldContextObject = i),
            TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, e),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, f),
            o.SetDrawDebugTrace(this.DebugTrace ? 2 : 0),
            TraceElementCommon_1.TraceElementCommon.LineTrace(o, PROFILE_KEY));
        e &&
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
          AnimNotifyEffect.TmpVector4.FromUeVector(i.GetActorRightVector()),
          AnimNotifyEffect.TmpVector2.CrossProduct(
            AnimNotifyEffect.TmpVector4,
            AnimNotifyEffect.TmpVector3,
          ),
          (f = UE.KismetMathLibrary.MakeRotFromZX(
            AnimNotifyEffect.TmpVector2.ToUeVector(),
            AnimNotifyEffect.TmpVector3.ToUeVector(),
          )),
          t.K2_SetActorLocationAndRotation(
            AnimNotifyEffect.TmpVector.ToUeVector(),
            f,
            !1,
            void 0,
            !0,
          ),
          (e = new UE.Transform(this.Rotation, this.Location, this.Scale)),
          t.K2_AddActorLocalTransform(e, !1, void 0, !0));
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
  TraceDetectClimbStep(t, i) {
    AnimNotifyEffect.TmpVector || AnimNotifyEffect.InitTraceInfo();
    var e = AnimNotifyEffect.LineTrace,
      f = t.Mesh,
      f =
        ((e.WorldContextObject = t),
        AnimNotifyEffect.SocketLocation.FromUeVector(
          f.GetSocketLocation(
            this.RightOrLeftFoot
              ? AnimNotifyEffect.SocketNameRightFoot
              : AnimNotifyEffect.SocketNameLeftFoot,
          ),
        ),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          e,
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
          e,
          AnimNotifyEffect.TmpVector,
        ),
        e.SetDrawDebugTrace(this.DebugTrace ? 2 : 0),
        TraceElementCommon_1.TraceElementCommon.LineTrace(e, PROFILE_KEY));
    return f
      ? (TraceElementCommon_1.TraceElementCommon.GetHitLocation(
          e.HitResult,
          0,
          AnimNotifyEffect.TmpVector2,
        ),
        TraceElementCommon_1.TraceElementCommon.GetImpactNormal(
          e.HitResult,
          0,
          AnimNotifyEffect.TmpVector3,
        ),
        MathUtils_1.MathUtils.LookRotationUpFirst(
          Vector_1.Vector.UpVectorProxy,
          AnimNotifyEffect.TmpVector3,
          AnimNotifyEffect.TmpQuat,
        ),
        i.SetRotation(AnimNotifyEffect.TmpQuat.ToUeQuat()),
        AnimNotifyEffect.TmpVector3.MultiplyEqual(AnimNotifyEffect.TmpVector3),
        AnimNotifyEffect.TmpVector2.AdditionEqual(AnimNotifyEffect.TmpVector3),
        i.SetLocation(AnimNotifyEffect.TmpVector2.ToUeVector()),
        !0)
      : (MathUtils_1.MathUtils.LookRotationUpFirst(
          Vector_1.Vector.UpVectorProxy,
          t.CharacterActorComponent.ActorForwardProxy,
          AnimNotifyEffect.TmpQuat,
        ),
        i.SetRotation(AnimNotifyEffect.TmpQuat.ToUeQuat()),
        t.CharacterActorComponent.ActorForwardProxy.Multiply(
          DISTANCE_FOOT_TO_EFFECT,
          AnimNotifyEffect.TmpVector3,
        ),
        AnimNotifyEffect.SocketLocation.Addition(
          AnimNotifyEffect.TmpVector3,
          AnimNotifyEffect.TmpVector2,
        ),
        i.SetLocation(AnimNotifyEffect.TmpVector2.ToUeVector()),
        !1);
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
  (AnimNotifyEffect.NotifyStat = void 0),
  (AnimNotifyEffect.CreateEffectContextStat = void 0),
  (AnimNotifyEffect.SpawnEffectStat = void 0),
  (AnimNotifyEffect.AttachEffectToSkillStat = void 0),
  (AnimNotifyEffect.SetupTransformStat = void 0),
  (AnimNotifyEffect.NameNone = new UE.FName("None")),
  (AnimNotifyEffect.TagFlagNoNiagara = new UE.FName("NoNiagara")),
  (exports.default = AnimNotifyEffect);
//# sourceMappingURL=AnimNotifyEffect.js.map
