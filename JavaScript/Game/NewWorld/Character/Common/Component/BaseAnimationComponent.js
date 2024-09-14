"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var a,
      r = arguments.length,
      h =
        r < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, e, i, s);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (a = t[n]) && (h = (r < 3 ? a(h) : 3 < r ? a(e, i, h) : a(e, i)) || h);
    return 3 < r && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseAnimationComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../../GlobalData"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterAnimOptimizationSetting_1 = require("../../../Setting/CharacterAnimOptimizationSetting"),
  CharacterNameDefines_1 = require("../CharacterNameDefines"),
  SPLIT_LINE = -90,
  FORCE_DISABLE_ANIM_OPTIMIZATION_TIME = 100,
  animAssetsSetRef = (0, puerts_1.$ref)(UE.NewSet(UE.AnimationAsset)),
  RUN_F = "Run_F",
  RUN_POSE_F = "Run_Pose_F",
  WALK_F = "Walk_F",
  WALK_POSE_F = "Walk_Pose_F",
  xAngleLimits = [
    -31 * MathUtils_1.MathUtils.DegToRad,
    31 * MathUtils_1.MathUtils.DegToRad,
  ],
  yAngleLimits = [
    -18 * MathUtils_1.MathUtils.DegToRad,
    31 * MathUtils_1.MathUtils.DegToRad,
  ];
let BaseAnimationComponent = class BaseAnimationComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Actor = void 0),
      (this.Mesh = void 0),
      (this.ActorComp = void 0),
      (this.SightTargetItemId = 0),
      (this.SightTargetPoint = void 0),
      (this.EnableSightDirectInternal = !1),
      (this.R2r = [...xAngleLimits]),
      (this.U2r = [...yAngleLimits]),
      (this.SightDirect = Vector_1.Vector.Create()),
      (this.LookAtBlendSpaceVector2D = Vector2D_1.Vector2D.Create()),
      (this.EnableBlendSpaceLookAtInner = !1),
      (this.SightDirect2 = Vector_1.Vector.Create()),
      (this.SightDirectIsEqual = !0),
      (this.MainAnimInstanceInternal = void 0),
      (this.SpecialAnimInstanceInternal = void 0),
      (this.IsPlayer = !1),
      (this.ForceDisableAnimOptimizationSet = new Set()),
      (this.DefaultVisibilityBasedAnimTickOption = 3);
  }
  static get Dependencies() {
    return [2, 0];
  }
  get EnableSightDirect() {
    return this.EnableSightDirectInternal;
  }
  set EnableSightDirect(t) {
    this.EnableSightDirectInternal === t ||
      (this.EnableSightDirectInternal = t) ||
      (this.SightDirect.DeepCopy(Vector_1.Vector.RightVectorProxy),
      this.SightDirect2.DeepCopy(Vector_1.Vector.RightVectorProxy),
      (this.SightDirectIsEqual = !0));
  }
  get EnableBlendSpaceLookAt() {
    return this.EnableBlendSpaceLookAtInner;
  }
  get MainAnimInstance() {
    return this.MainAnimInstanceInternal;
  }
  get SpecialAnimInstance() {
    return this.SpecialAnimInstanceInternal;
  }
  OnInit() {
    return (this.R2r = [...xAngleLimits]), (this.U2r = [...yAngleLimits]), !0;
  }
  SetSightLimit(t, e) {
    (this.R2r = [
      t[0] * MathUtils_1.MathUtils.DegToRad,
      t[1] * MathUtils_1.MathUtils.DegToRad,
    ]),
      (this.U2r = [
        e[0] * MathUtils_1.MathUtils.DegToRad,
        e[1] * MathUtils_1.MathUtils.DegToRad,
      ]);
  }
  ResetSightLimit() {
    (this.R2r = [...xAngleLimits]), (this.U2r = [...yAngleLimits]);
  }
  SetSightTargetItem(t) {
    (this.SightTargetPoint = void 0),
      (this.SightTargetItemId = t ? t.Entity.Id : 0);
  }
  GetSightTargetItem() {
    var t;
    if (this.SightTargetItemId)
      return (
        (t = EntitySystem_1.EntitySystem.GetComponent(
          this.SightTargetItemId,
          1,
        )) || (this.SightTargetItemId = 0),
        t
      );
  }
  SetSightTargetPoint(t) {
    (this.SightTargetItemId = 0), (this.SightTargetPoint = t);
  }
  GetSightTargetPoint() {
    return this.SightTargetPoint;
  }
  GetSightDirect() {
    return this.SightDirect.ToUeVector();
  }
  GetTsSightDirect() {
    return this.SightDirect;
  }
  GetTsLookAt() {
    return this.LookAtBlendSpaceVector2D;
  }
  GetMontageResPathByName(t) {
    return !t || t.includes("/")
      ? t
      : this.ActorComp.ModelResPath && 0 < this.ActorComp.ModelResPath.length
        ? this.ActorComp.ModelResPath + `/${t}.` + t
        : void 0;
  }
  CheckNpcAnimationAssets() {
    if (
      GlobalData_1.GlobalData.IsPlayInEditor &&
      this.ActorComp?.Valid &&
      1 !== this.Mesh.AnimationMode &&
      this.ActorComp.CreatureData.GetEntityType() ===
        Protocol_1.Aki.Protocol.kks.Proto_Npc
    ) {
      var t = this.MainAnimInstance;
      if (t?.IsValid()) {
        (0, puerts_1.$unref)(animAssetsSetRef).Empty(),
          UE.KuroStaticLibrary.GetAnimAssetsByAnimInstance(t, animAssetsSetRef);
        var e = (0, puerts_1.$unref)(animAssetsSetRef);
        if (0 !== e.Num())
          for (let t = 0; t < e.Num(); ++t) {
            var i,
              s = e.Get(t);
            s.IsA(UE.AnimSequence.StaticClass()) &&
              ((i = (s = s).GetName()).includes(RUN_F) ||
                i.includes(RUN_POSE_F) ||
                i.includes(WALK_F) ||
                i.includes(WALK_POSE_F)) &&
              s.bEnableRootMotion &&
              Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Pawn",
                30,
                "Npc移动相关动画资源错误使用了RootMotion",
                ["AssetName", this.ActorComp.Actor.GetName()],
                ["AnimName", i],
              );
          }
      }
    }
  }
  GetAnimInstanceFromMesh() {
    this.Vwr(),
      (this.MainAnimInstanceInternal =
        this.Mesh.GetLinkedAnimGraphInstanceByTag(
          CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
        )),
      this.MainAnimInstanceInternal ||
        (this.MainAnimInstanceInternal = this.Mesh.GetAnimInstance()),
      (this.SpecialAnimInstanceInternal =
        this.Mesh.GetLinkedAnimGraphInstanceByTag(
          CharacterNameDefines_1.CharacterNameDefines.ABP_SPECIAL,
        ));
  }
  StartAnimInstance() {
    this.MainAnimInstanceInternal instanceof UE.KuroAnimInstance &&
      this.MainAnimInstanceInternal.OnComponentStart(),
      this.SpecialAnimInstanceInternal &&
        this.SpecialAnimInstanceInternal instanceof UE.KuroAnimInstance &&
        this.SpecialAnimInstanceInternal.OnComponentStart(),
      this.A2r();
  }
  ClampSightDirect(t, e) {
    var i = t.Z / t.Size(),
      s = MathUtils_1.MathUtils.Clamp(Math.asin(i), this.U2r[0], this.U2r[1]),
      i = Math.sin(s),
      s = Math.cos(s),
      a = t.Y,
      t = -t.X,
      r =
        Math.abs(a) > MathUtils_1.MathUtils.KindaSmallNumber ||
        Math.abs(t) > MathUtils_1.MathUtils.KindaSmallNumber
          ? MathUtils_1.MathUtils.Clamp(
              Math.atan2(t, a),
              this.R2r[0],
              this.R2r[1],
            )
          : 0,
      a = Math.cos(r) * s,
      t = Math.sin(r) * s;
    (e.X = -t), (e.Y = a), (e.Z = i);
  }
  A2r() {
    var e = this.ActorComp.Actor.K2_GetComponentsByClass(
      UE.SkeletalMeshComponent.StaticClass(),
    );
    for (let t = 0; t < e.Num(); ++t) {
      var i,
        s = e.Get(t);
      s instanceof UE.SkeletalMeshComponent &&
        ((i = s.GetAnimInstance()) &&
          i instanceof UE.KuroAnimInstance &&
          i !== this.MainAnimInstance &&
          i.OnComponentStart(),
        (i = s.GetLinkedAnimGraphInstanceByTag(
          CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
        ))) &&
        i instanceof UE.KuroAnimInstance &&
        i !== this.MainAnimInstance &&
        i.OnComponentStart();
    }
  }
  Vwr() {
    this.Actor.Mesh.GetLinkedAnimGraphInstanceByTag(
      FNameUtil_1.FNameUtil.NONE,
    ) &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Character",
        58,
        "检测出该Actor有空的动画LinkGraph节点,将会影响同步,GAS等功能,请找对应策划修复",
        ["Actor", this.ActorComp.Owner.GetName()],
        ["AnimInstance", this.Actor.Mesh.GetAnimInstance()?.GetName()],
      );
  }
  static LerpDirect2dByMaxAngle(t, e, i, s) {
    let a = MathUtils_1.MathUtils.GetAngleByVector2D(t),
      r =
        (a < SPLIT_LINE && (a += 360),
        MathUtils_1.MathUtils.GetAngleByVector2D(e));
    r < SPLIT_LINE && (r += 360);
    (t = Math.asin(t.Z) * MathUtils_1.MathUtils.RadToDeg),
      (e = Math.asin(e.Z) * MathUtils_1.MathUtils.RadToDeg);
    let h = r - a,
      n = e - t;
    (e = Math.sqrt(h * h + n * n)),
      i < e && ((h *= i / e), (n *= i / e)),
      (i = a + h),
      (e = (t + n) * MathUtils_1.MathUtils.DegToRad),
      (s.Z = Math.sin(e)),
      (t = Math.cos(e));
    (s.X = Math.cos(i * MathUtils_1.MathUtils.DegToRad) * t),
      (s.Y = Math.sin(i * MathUtils_1.MathUtils.DegToRad) * t);
  }
  static LerpVector2dByAlpha(t, e, i, s) {
    let a = MathUtils_1.MathUtils.GetAngleByVector2D(t),
      r =
        (a < SPLIT_LINE && (a += 360),
        MathUtils_1.MathUtils.GetAngleByVector2D(e));
    r < SPLIT_LINE && (r += 360);
    var t = Math.asin(t.Z) * MathUtils_1.MathUtils.RadToDeg,
      e = Math.asin(e.Z) * MathUtils_1.MathUtils.RadToDeg,
      h = r - a,
      e = e - t,
      i = ((h *= i), (e *= i), a + h),
      h = (t + e) * MathUtils_1.MathUtils.DegToRad,
      t = ((s.Z = Math.sin(h)), Math.cos(h));
    (s.X = Math.cos(i * MathUtils_1.MathUtils.DegToRad) * t),
      (s.Y = Math.sin(i * MathUtils_1.MathUtils.DegToRad) * t);
  }
  IsMontagePlaying() {
    return this.MainAnimInstanceInternal.IsAnyMontagePlaying();
  }
  LoadAsync(t, e) {
    return ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.AnimMontage, e);
  }
  Play(t, e) {
    this.MainAnimInstanceInternal.Montage_Play(t),
      e && this.MainAnimInstanceInternal.OnMontageEnded.Add(e);
  }
  PlayOnce(t, e) {
    this.MainAnimInstanceInternal.Montage_Play(t),
      this.MainAnimInstanceInternal.Montage_SetNextSection(
        CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
        CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
        t,
      ),
      e && this.MainAnimInstanceInternal.OnMontageEnded.Add(e);
  }
  PlayFromLoop(t, e) {
    this.MainAnimInstanceInternal.Montage_Play(t),
      this.MainAnimInstanceInternal.Montage_JumpToSection(
        CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
        t,
      ),
      e && this.MainAnimInstanceInternal.OnMontageEnded.Add(e);
  }
  PlayFromEnd(t, e) {
    this.MainAnimInstanceInternal.Montage_Play(t),
      this.MainAnimInstanceInternal.Montage_JumpToSection(
        CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
        t,
      ),
      e && this.MainAnimInstanceInternal.OnMontageEnded.Add(e);
  }
  Stop(t = !1, e) {
    t
      ? this.MainAnimInstanceInternal.Montage_JumpToSection(
          CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
          e,
        )
      : this.MainAnimInstanceInternal.Montage_SetNextSection(
          CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
          CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
          e,
        );
  }
  StopMontage(t = 0) {
    this.MainAnimInstanceInternal.Montage_Stop(t);
  }
  ForceStop(t, e) {
    this.MainAnimInstanceInternal.Montage_Stop(t ?? 0, e);
  }
  ForceStopWithBlendOut(t, e) {
    var i = this.MainAnimInstanceInternal.Montage_GetPosition(e),
      i = e.SequenceLength - i,
      t = 1e3 * t;
    t < i && this.MainAnimInstanceInternal.Montage_SetPlayRate(e, i / t),
      this.MainAnimInstanceInternal.Montage_SetNextSection(
        CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION,
        CharacterNameDefines_1.CharacterNameDefines.END_SECTION,
        e,
      );
  }
  AddOnMontageEnded(t) {
    t && this.MainAnimInstanceInternal?.OnMontageEnded.Add(t);
  }
  RemoveOnMontageEnded(t) {
    t && this.MainAnimInstanceInternal?.OnMontageEnded.Remove(t);
  }
  ClearOnMontageEnded() {
    this.MainAnimInstanceInternal?.OnMontageEnded &&
      this.MainAnimInstanceInternal?.OnMontageEnded.Clear();
  }
  GetCurrentSection() {
    return this.MainAnimInstanceInternal.Montage_GetCurrentSection();
  }
  PlayMontageByName(t, e) {
    return (
      !!this.GetMontageResPathByName(t)?.includes("/") &&
      this.LoadAsync(t, e) !== ResourceSystem_1.ResourceSystem.InvalidId
    );
  }
  PlayMontageById(t, e) {
    let i = void 0;
    return (
      !!(i = t.IsAbp
        ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(t.MontageId)
        : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(
            t.MontageId,
          )) &&
      this.LoadAsync(i.ActionMontage, e) !==
        ResourceSystem_1.ResourceSystem.InvalidId
    );
  }
  InitBaseInfo() {}
  GetAnimDefaultTickOption() {
    return this.DefaultVisibilityBasedAnimTickOption;
  }
  StartForceDisableAnimOptimization(t, e = !0) {
    return this.ForceDisableAnimOptimizationSet.has(t)
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Character", 36, "动画优化强制关闭-重复", [
            "reason",
            t,
          ]),
        !1)
      : (this.ForceDisableAnimOptimizationSet.add(t),
        this.RefreshAnimOptimization(),
        e &&
          TimerSystem_1.TimerSystem.Delay(() => {
            this.CancelForceDisableAnimOptimization(t);
          }, FORCE_DISABLE_ANIM_OPTIMIZATION_TIME),
        !0);
  }
  CancelForceDisableAnimOptimization(t) {
    this.ForceDisableAnimOptimizationSet.delete(t) &&
      this.RefreshAnimOptimization();
  }
  RefreshAnimOptimization() {
    var t = this.Entity.GetComponent(161)?.IsInFighting ?? !1,
      e = 0 < this.ForceDisableAnimOptimizationSet.size,
      i = e || t,
      s = this.Actor.K2_GetComponentsByClass(
        UE.SkeletalMeshComponent.StaticClass(),
      ),
      a = this.RefreshVisibilityBasedAnimTickOption(e, t);
    for (let t = 0; t < s.Num(); t++) {
      var r = s.Get(t);
      (r.bEnableUpdateRateOptimizations = !i),
        (r.VisibilityBasedAnimTickOption = a);
    }
  }
  RefreshVisibilityBasedAnimTickOption(t, e) {
    let i = this.DefaultVisibilityBasedAnimTickOption;
    if (t || e) {
      if (e) return 0;
      for (const s of this.ForceDisableAnimOptimizationSet)
        i = Math.min(
          i,
          CharacterAnimOptimizationSetting_1.DisableAnimOptimizationTypeDefines[
            s
          ],
        );
    }
    return i;
  }
};
(BaseAnimationComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(37)],
  BaseAnimationComponent,
)),
  (exports.BaseAnimationComponent = BaseAnimationComponent);
//# sourceMappingURL=BaseAnimationComponent.js.map
