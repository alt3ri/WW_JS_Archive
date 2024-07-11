"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const CollisionUtils_1 = require("../../../../../Core/Utils/CollisionUtils");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const GameQualitySettingsManager_1 = require("../../../../GameQualitySettings/GameQualitySettingsManager");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const CombineMeshTool_1 = require("../../Common/Blueprint/Utils/CombineMeshTool");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const CharacterDitherEffectController_1 = require("../../Common/Component/Effect/CharacterDitherEffectController");
const SimpleNpcController_1 = require("../Logics/SimpleNpcController");
const SimpleNpcFlowLogic_1 = require("../Logics/SimpleNpcFlowLogic");
const SimpleNpcLoadController_1 = require("../Logics/SimpleNpcLoadController");
const PROFILE_KEY = "SimpleNpc_FindFloor";
const DEFAULT_HALF_HEIGHT = 85;
const DEFAULT_RADIUS = 25;
const DEFAULT_MESH_YAW = -90;
const FIND_FLOOR_RAY_LENGTH = 500;
const MIN_EDITOR_MOVE_CHANGED = 900;
const LOGIC_TICK_INTERVAL = 100;
class TsSimpleNpc extends UE.KuroEffectActor {
  constructor() {
    super(...arguments),
      (this.CapsuleCollision = void 0),
      (this.Mesh = void 0),
      (this.CharRenderingComponent = void 0),
      (this.DA = void 0),
      (this.DisappearOnSunny = !1),
      (this.DisappearOnCloudy = !1),
      (this.DisappearOnRainy = !1),
      (this.DisappearOnThunderRain = !1),
      (this.DisappearOnSnowy = !1),
      (this.LodLevel = 0),
      (this.DebugDitherValue = -0),
      (this.TempDistanceSquared = -0),
      (this.CurDither = -0),
      (this.IsNotUnload = !1),
      (this.FlowLogic = void 0),
      (this.TempLocation = void 0),
      (this.CachedLocation = void 0),
      (this.TempAnimInstance = void 0),
      (this.TempAnimAsset = void 0),
      (this.TempDaPath = void 0),
      (this.NeedResetCollision = !1),
      (this.IsDirty = !1),
      (this.StartLocation = void 0),
      (this.StartLocationProxy = void 0),
      (this.InstanceId = 0),
      (this.DitherEffectControllerInternal = void 0),
      (this.IsInLogicRangeInternal = void 0),
      (this.RegisterLoopTimerId = void 0),
      (this.LastGameSeconds = -0),
      (this.IsModelLoadedInternal = !1),
      (this.IsShowShadow = void 0),
      (this.IsTickEnabled = void 0),
      (this.CachedComponents = void 0);
  }
  get DitherEffectController() {
    return (
      this.DitherEffectControllerInternal ||
        (this.DitherEffectControllerInternal =
          new CharacterDitherEffectController_1.CharacterDitherEffectController(
            this,
            this.CharRenderingComponent,
          )),
      this.DitherEffectControllerInternal
    );
  }
  EditorInit() {
    super.EditorInit(),
      (this.bEditorTickBySelected = !0),
      (this.CachedLocation = Vector_1.Vector.Create()),
      (this.TempLocation = Vector_1.Vector.Create()),
      this.CachedLocation.FromUeVector(this.K2_GetActorLocation()),
      this.Mesh &&
        ((this.TempAnimInstance = this.Mesh.AnimScriptInstance),
        (this.TempAnimAsset = this.Mesh.AnimationData.AnimToPlay)),
      (this.TempDaPath = this.DA.AssetPathName?.toString()),
      this.LoadModel(),
      this.Tags.Contains(
        CharacterNameDefines_1.CharacterNameDefines.PFT_NO_SPAWN,
      ) ||
        this.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.PFT_NO_SPAWN),
      (this.bSetActorComponentTickEnabledByFocus = !0),
      this.EditorSetActorComponentsTickEnabled(!1);
  }
  EditorTick(i) {
    if (this.TempLocation)
      if (
        (this.TempLocation.FromUeVector(this.K2_GetActorLocation()),
        Vector_1.Vector.DistSquared(this.CachedLocation, this.TempLocation) >
          MIN_EDITOR_MOVE_CHANGED)
      )
        this.CachedLocation.DeepCopy(this.TempLocation), (this.IsDirty = !0);
      else {
        if (this.Mesh)
          if (this.Mesh.AnimationMode === 0) {
            if (
              ((this.TempAnimAsset = void 0),
              this.Mesh.AnimScriptInstance !== this.TempAnimInstance)
            )
              return (
                (this.TempAnimInstance = this.Mesh.AnimScriptInstance),
                void (this.IsDirty = !0)
              );
          } else if (
            this.Mesh.AnimationMode === 1 &&
            ((this.TempAnimInstance = void 0),
            this.Mesh.AnimationData.AnimToPlay !== this.TempAnimAsset)
          )
            return (
              (this.TempAnimAsset = this.Mesh.AnimationData.AnimToPlay),
              void (this.IsDirty = !0)
            );
        this.TempDaPath !== this.DA.AssetPathName?.toString()
          ? ((this.TempDaPath = this.DA.AssetPathName.toString()),
            (this.IsDirty = !0))
          : this.IsDirty
            ? ((this.IsDirty = !1),
              this.LoadModel(),
              UE.KuroStaticLibrary.SetActorModify(this))
            : this.NeedResetCollision &&
              ((this.NeedResetCollision = !1),
              this.SetDefaultCollision(),
              this.ResetMeshLocation());
      }
    else this.EditorInit();
  }
  ReceiveBeginPlay() {
    this.InitData();
  }
  InitData() {
    this.FindComponents(),
      this.InitCollisionInfo(),
      this.InitBaseInfo(),
      this.InitRenderInfo(),
      this.InitDaInfo(),
      this.SetTickEnabled(!1),
      this.SetMainShadowEnabled(!1),
      SimpleNpcController_1.SimpleNpcController.Add(this),
      this.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE);
  }
  InitCollisionInfo() {
    (this.CapsuleCollision.bCanCharacterStandOn = !1),
      (this.CapsuleCollision.CanCharacterStepUpOn = 0),
      this.CapsuleCollision.SetCollisionObjectType(0),
      this.CapsuleCollision.SetCollisionResponseToAllChannels(0),
      CollisionUtils_1.CollisionUtils.SetCollisionResponseToPawn(
        this.CapsuleCollision,
        0,
        2,
      );
  }
  InitBaseInfo() {
    (this.FlowLogic = new SimpleNpcFlowLogic_1.SimpleNpcFlowLogic(this)),
      (this.StartLocation = this.K2_GetActorLocation()),
      (this.StartLocationProxy = Vector_1.Vector.Create(this.StartLocation)),
      (this.IsInLogicRangeInternal = !1),
      (this.RegisterLoopTimerId = void 0);
    let i = Global_1.Global.BaseCharacter;
    i &&
      ((i = i.CharacterActorComponent.ActorLocationProxy),
      (this.TempDistanceSquared = Vector_1.Vector.DistSquared(
        this.StartLocationProxy,
        i,
      ))),
      (this.InstanceId = ++TsSimpleNpc.InstanceCount),
      GlobalData_1.GlobalData.IsPlayInEditor &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("World", 30, "创建SimpleNpc", ["Id", this.InstanceId]);
  }
  InitRenderInfo() {
    this.CharRenderingComponent.Init(3),
      this.SetPrimitiveEntityType(2),
      this.SetAnimUROParams();
  }
  InitDaInfo() {
    ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(this.DA)
      ? ((this.IsNotUnload = !0), (this.IsModelLoadedInternal = !1))
      : ((this.IsModelLoadedInternal = !0),
        GlobalData_1.GlobalData.IsPlayInEditor ||
          (this.CacheComponents(), this.CloseSkeletalMeshShadow()),
        this.CharRenderingComponent.UpdateNpcDitherComponent(),
        SimpleNpcController_1.SimpleNpcController.CheckNpcShowState(this, !0));
  }
  ReceiveEndPlay() {
    SimpleNpcController_1.SimpleNpcController.Remove(this),
      void 0 !== this.RegisterLoopTimerId &&
        (TimerSystem_1.TimerSystem.Remove(this.RegisterLoopTimerId),
        (this.RegisterLoopTimerId = void 0)),
      this.FlowLogic && (this.FlowLogic.Dispose(), (this.FlowLogic = void 0)),
      (this.DA = void 0),
      (this.DitherEffectControllerInternal = void 0),
      (this.CachedComponents = void 0),
      GlobalData_1.GlobalData.IsPlayInEditor &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "World",
          30,
          "销毁SimpleNpc",
          ["Id", this.InstanceId],
          ["DeleteCount", ++TsSimpleNpc.DeleteCount],
        );
  }
  FindComponents() {
    (this.CapsuleCollision && this.CapsuleCollision.IsValid()) ||
      (this.CapsuleCollision = this.GetComponentByClass(
        UE.CapsuleComponent.StaticClass(),
      )),
      (this.Mesh && this.Mesh.IsValid()) ||
        (this.Mesh = this.GetComponentByClass(
          UE.SkeletalMeshComponent.StaticClass(),
        )),
      (this.CharRenderingComponent && this.CharRenderingComponent.IsValid()) ||
        (this.CharRenderingComponent = this.GetComponentByClass(
          UE.CharRenderingComponent_C.StaticClass(),
        ));
  }
  LoadModel() {
    this.FindComponents(), (this.IsNotUnload = !0), this.LoadModelByDA();
  }
  DebugSetNpcDitherValue(i) {
    this.SetDitherEffect(i, 1);
  }
  SetDefaultCollision() {
    let i;
    this.Mesh?.SkeletalMesh
      ? ((i = this.Mesh.SkeletalMesh.GetBounds()),
        (this.CapsuleCollision.CapsuleHalfHeight = i
          ? i.BoxExtent.GetMax()
          : DEFAULT_HALF_HEIGHT))
      : (this.CapsuleCollision.CapsuleHalfHeight = DEFAULT_HALF_HEIGHT),
      (this.CapsuleCollision.CapsuleRadius = DEFAULT_RADIUS);
  }
  ResetMeshLocation() {
    this.Mesh.K2_SetRelativeTransform(
      new UE.Transform(
        new UE.Rotator(0, DEFAULT_MESH_YAW, 0),
        new UE.Vector(0, 0, -this.CapsuleCollision.CapsuleHalfHeight),
        Vector_1.Vector.OneVector,
      ),
      !1,
      void 0,
      !1,
    );
  }
  FindFloor() {
    this.FindComponents();
    const i = this.CapsuleCollision.GetScaledCapsuleHalfHeight();
    const t = this.CapsuleCollision.GetScaledCapsuleRadius();
    var s = this.K2_GetActorLocation();
    var e = new UE.Vector(s.X, s.Y, s.Z - FIND_FLOOR_RAY_LENGTH - (i - t));
    let h =
      (TsSimpleNpc.SphereTrace ||
        ((TsSimpleNpc.SphereTrace = UE.NewObject(
          UE.TraceSphereElement.StaticClass(),
        )),
        (TsSimpleNpc.SphereTrace.bIsSingle = !0),
        (TsSimpleNpc.SphereTrace.bIgnoreSelf = !0),
        TsSimpleNpc.SphereTrace.SetTraceTypeQuery(
          QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
        )),
      TsSimpleNpc.SphereTrace);
    var s =
      ((h.WorldContextObject = this),
      (h.Radius = t),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(h, s),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(h, e),
      TraceElementCommon_1.TraceElementCommon.SphereTrace(h, PROFILE_KEY));
    var e = h.HitResult;
    s &&
      e.bBlockingHit &&
      ((h = new UE.Vector()),
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(e, 0, h),
      (h.Z += i - t),
      this.K2_SetActorLocation(h, !1, void 0, !1));
  }
  LoadModelByDA() {
    let i;
    return !(
      !this.CapsuleCollision ||
      !this.Mesh ||
      !ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(this.DA) ||
      !(i = this.DA.AssetPathName?.toString()) ||
      (ResourceSystem_1.ResourceSystem.LoadAsync(
        i,
        UE.PD_NpcSetupData_C,
        (i) => {
          this.IsNotUnload && this.HandleLoadedDaConfig(i),
            this.SetTickEnabled(this.IsInLogicRangeInternal),
            this.SetMainShadowEnabled(this.IsInLogicRangeInternal);
        },
      ),
      0)
    );
  }
  HandleLoadedDaConfig(i, t = !1) {
    i
      ? this.CapsuleCollision &&
        this.Mesh &&
        (CombineMeshTool_1.CombineMeshTool.LoadDaConfig(
          this,
          this.CapsuleCollision.GetRelativeTransform(),
          this.Mesh,
          i,
        ),
        t ||
          (this.CharRenderingComponent.UpdateNpcDitherComponent(),
          SimpleNpcController_1.SimpleNpcController.CheckNpcShowState(
            this,
            !0,
          )),
        GlobalData_1.GlobalData.IsPlayInEditor ||
          (this.CacheComponents(), this.CloseSkeletalMeshShadow()),
        (this.NeedResetCollision = !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          30,
          "[TsSimpleNpc.HandleLoadedDaConfig] DA资源类型错误",
        );
  }
  StartFlowLogic() {
    this.FlowLogic && this.FlowLogic.StartFlowLogic();
  }
  SetDitherEffect(i, t = 3) {
    this.DitherEffectController.SetDitherEffect(i, t);
  }
  ShowDialog(i, t = -1) {
    this.FlowLogic &&
      this.FlowLogic.AddHeadView().then(() => {
        this.FlowLogic.ShowDialog(i, t);
      });
  }
  HideDialog() {
    this.FlowLogic && this.FlowLogic.HideDialog();
  }
  TryPlayMontage(i) {
    return !!this.FlowLogic && this.FlowLogic.TryPlayMontage(i);
  }
  StopMontage() {
    this.FlowLogic && this.FlowLogic.StopMontage();
  }
  FilterFlowWorldState(i) {
    this.FlowLogic?.FilterFlowWorldState(i);
  }
  get IsHiding() {
    return !this.IsNotUnload;
  }
  get SelfLocation() {
    return this.StartLocation;
  }
  get SelfLocationProxy() {
    return this.StartLocationProxy;
  }
  get IsInLogicRange() {
    return this.IsInLogicRangeInternal;
  }
  ChangeLogicRangeState(i) {
    this.IsInLogicRangeInternal !== i &&
      (i
        ? (this.IsModelLoadedInternal ||
            (SimpleNpcLoadController_1.SimpleNpcLoadController.AddSimpleNpc(
              this,
            ),
            (this.IsModelLoadedInternal = !0)),
          this.SetLogicTickRunning(!0))
        : this.SetLogicTickRunning(!1)),
      (this.IsInLogicRangeInternal = i);
  }
  SetLogicTickRunning(i) {
    i
      ? void 0 === this.RegisterLoopTimerId &&
        ((this.LastGameSeconds = Time_1.Time.WorldTimeSeconds),
        (this.RegisterLoopTimerId = TimerSystem_1.TimerSystem.Forever(() => {
          this.OnLogicTick();
        }, LOGIC_TICK_INTERVAL)))
      : void 0 !== this.RegisterLoopTimerId &&
        (TimerSystem_1.TimerSystem.Has(this.RegisterLoopTimerId) &&
          TimerSystem_1.TimerSystem.Remove(this.RegisterLoopTimerId),
        (this.RegisterLoopTimerId = void 0),
        this.FlowLogic) &&
        this.FlowLogic.ForceStopFlow();
  }
  OnLogicTick() {
    const i = Time_1.Time.WorldTimeSeconds;
    const t = i - this.LastGameSeconds;
    (this.LastGameSeconds = i), this.FlowLogic && this.FlowLogic.Tick(t);
  }
  CacheComponents() {
    this.CachedComponents = this.K2_GetComponentsByClass(
      UE.ActorComponent.StaticClass(),
    );
  }
  SetTickEnabled(s) {
    if (s !== this.IsTickEnabled) {
      this.IsTickEnabled = s;
      const e =
        this.CachedComponents ||
        this.K2_GetComponentsByClass(UE.ActorComponent.StaticClass());
      for (let i = 0, t = e.Num(); i < t; i++) {
        const h = e.Get(i);
        h && h.SetComponentTickEnabled(s);
      }
    }
  }
  CloseSkeletalMeshShadow() {
    if (this.CachedComponents)
      for (let i = 0, t = this.CachedComponents.Num(); i < t; i++) {
        const s = this.CachedComponents.Get(i);
        s && s instanceof UE.SkeletalMeshComponent && s.SetCastShadow(!1);
      }
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "NPC",
          25,
          "You must call CloseSkeletalMeshShadow after CacheComponents",
        );
  }
  SetMainShadowEnabled(s) {
    if (s === this.IsShowShadow)
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          25,
          "SetShadowEnabled, value === this.IsShowShadow",
          ["Value", s],
          ["IsShowShadow", this.IsShowShadow],
        );
    else {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          25,
          "SetShadowEnabled, value !== this.IsShowShadow",
          ["Value", s],
          ["IsShowShadow", this.IsShowShadow],
        ),
        (this.IsShowShadow = s);
      const e =
        this.CachedComponents ||
        this.K2_GetComponentsByClass(UE.ActorComponent.StaticClass());
      if (e)
        for (let i = 0, t = e.Num(); i < t; i++) {
          const h = e.Get(i);
          h &&
            h instanceof UE.SkinnedMeshComponent &&
            !(h instanceof UE.SkeletalMeshComponent) &&
            (h.SetCastShadow(s), Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info("Entity", 25, "SetShadowEnabled, SetCastShadow", [
              "Value",
              s,
            ]);
        }
    }
  }
  get IsLodShow() {
    return !(
      Info_1.Info.IsGameRunning() &&
      GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
        .GetCurrentQualityInfo()
        .GetGameQualitySettingLevel() < this.LodLevel
    );
  }
  SetAnimUROParams() {
    const t = new UE.AnimUpdateRateParameters();
    const s = ((t.bShouldUseLodMap = !0), this.Mesh.LODInfo.Num());
    t.LODToFrameSkipMap.Empty();
    for (let i = 0; i < s; i++) t.LODToFrameSkipMap.Add(i, i < 2 ? 0 : i - 1);
    (t.BaseNonRenderedUpdateRate = 8), (t.MaxEvalRateForInterpolation = s);
    const e = (0, puerts_1.$ref)(t);
    const h = this.K2_GetComponentsByClass(
      UE.SkeletalMeshComponent.StaticClass(),
    );
    for (let i = 0; i < h.Num(); i++) {
      const o = h.Get(i);
      (o.bEnableUpdateRateOptimizations = !0),
        o.SetAnimUpdateRateParameters(e),
        (o.VisibilityBasedAnimTickOption = 3);
    }
    (0, puerts_1.$unref)(e);
  }
}
(TsSimpleNpc.InstanceCount = 0),
  (TsSimpleNpc.DeleteCount = 0),
  (TsSimpleNpc.SphereTrace = void 0),
  (exports.default = TsSimpleNpc);
// # sourceMappingURL=TsSimpleNpc.js.map
