"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SeamlessTravelTreadmill =
    exports.DEFAULT_SEAMLESS_TRANSITION_HEIGHT =
      void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  Global_1 = require("../../Global"),
  DEFAULT_FLOOR_MESH_PATH = "/Engine/BasicShapes/Plane.Plane",
  floorMeshMaterialOffsetParam = new UE.FName("Offset"),
  floorMeshMaterialAlphaParam = new UE.FName("Alpha"),
  DEFAULT_APPEAR_ALPHA_DELTA = 0.5,
  DEFAULT_DISAPPEAR_ALPHA_DELTA = 0.5,
  DEFAULT_FLOOR_SCALE_X = 100,
  DEFAULT_FLOOR_SCALE_Y = 100,
  DEFAULT_FLOOR_SCALE_Z = 1;
exports.DEFAULT_SEAMLESS_TRANSITION_HEIGHT = 2e4;
class FloorMaterialParams {
  constructor(t) {
    (this.Offset = new UE.LinearColor(0, 0, 0, 0)),
      (this.Alpha = 0),
      (this.AlphaDelta = 0),
      (this.OQt = void 0),
      (this.Y0e = void 0),
      (this.OnAppearStartHandle = void 0),
      (this.OnAppearEndHandle = void 0),
      (this.OnDisappearStartHandle = void 0),
      (this.OnDisappearEndHandle = void 0),
      (this.OQt = t);
  }
  Bind(t) {
    !t.IsValid() || this.Y0e || (this.Y0e = t);
  }
  Reset() {
    (this.Offset.R = 0),
      (this.Offset.G = 0),
      (this.Alpha = 0),
      (this.AlphaDelta = 0),
      (this.OnAppearStartHandle = void 0),
      (this.OnAppearEndHandle = void 0),
      (this.OnDisappearStartHandle = void 0),
      (this.OnDisappearEndHandle = void 0);
  }
  Update(t) {
    this.OQt.IsInit &&
      (0 !== this.AlphaDelta &&
        (this.OnAppearStartHandle && 0 === this.Alpha && 0 < this.AlphaDelta
          ? this.OnAppearStartHandle()
          : this.OnDisappearStartHandle &&
            1 === this.Alpha &&
            this.AlphaDelta < 0 &&
            this.OnDisappearStartHandle(),
        (t = this.AlphaDelta * t * MathUtils_1.MathUtils.MillisecondToSecond),
        (this.Alpha = MathUtils_1.MathUtils.Clamp(this.Alpha + t, 0, 1)),
        this.Y0e?.SetScalarParameterValue(
          floorMeshMaterialAlphaParam,
          this.Alpha,
        ),
        this.Alpha <= 0 || 1 <= this.Alpha) &&
        (this.OnAppearEndHandle && 1 === this.Alpha && 0 < this.AlphaDelta
          ? this.OnAppearEndHandle()
          : this.OnDisappearEndHandle &&
            0 === this.Alpha &&
            this.AlphaDelta < 0 &&
            this.OnDisappearEndHandle(),
        (this.AlphaDelta = 0)),
      this.IsVisible()) &&
      this.Y0e?.SetVectorParameterValue(
        floorMeshMaterialOffsetParam,
        this.Offset,
      );
  }
  IsVisible() {
    return 0 < this.Alpha;
  }
}
class SeamlessTravelTreadmill {
  constructor() {
    (this.ActorComp = void 0),
      (this.Context = void 0),
      (this.Floor = void 0),
      (this.FloorExtend = Vector_1.Vector.Create()),
      (this.FloorMatParams = void 0),
      (this.IsInitInternal = !1),
      (this.IsLockMove = !1),
      (this.IsActiveInternal = !1),
      (this.LockOnLocation = Vector_1.Vector.Create()),
      (this.LocationDelta = Vector_1.Vector.Create()),
      (this.TmpVector = Vector_1.Vector.Create()),
      (this.TmpTransform = Transform_1.Transform.Create());
  }
  get IsInit() {
    return this.IsInitInternal;
  }
  get IsActive() {
    return this.IsActiveInternal;
  }
  Init(t, s) {
    (this.ActorComp = Global_1.Global.BaseCharacter?.CharacterActorComponent),
      this.ActorComp
        ? ((this.IsActiveInternal = !1),
          (this.Context = t),
          this.IsInit ? s(!0) : this.LoadFloor(s))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Teleport",
            51,
            "[万向跑步机]初始化失败，无效的ActorComp",
            ["ActorName", Global_1.Global.BaseCharacter?.GetName()],
          );
  }
  Tick(t) {
    this.IsInit &&
      this.Floor?.IsValid() &&
      this.ActorComp?.Valid &&
      this.IsActive &&
      (this.ActorComp.ActorLocationProxy.Subtraction(
        this.LockOnLocation,
        this.LocationDelta,
      ),
      this.UpdateFloorMatUV(this.LocationDelta),
      this.LockActorMove(),
      this.FloorMatParams?.Update(t));
  }
  Destroy() {
    this.Floor?.IsValid() && ActorSystem_1.ActorSystem.Put(this.Floor),
      (this.ActorComp = void 0),
      (this.Context = void 0),
      (this.Floor = void 0),
      this.FloorExtend.Reset(),
      (this.FloorMatParams = void 0),
      (this.IsLockMove = !1),
      (this.IsActiveInternal = !1),
      this.LockOnLocation.Reset(),
      this.LocationDelta.Reset(),
      this.TmpVector.Reset(),
      this.TmpTransform.Reset();
  }
  Reset() {
    (this.ActorComp = void 0),
      (this.IsLockMove = !1),
      (this.IsActiveInternal = !1),
      this.FloorMatParams && this.FloorMatParams.Reset(),
      this.LockOnLocation.Reset(),
      this.LocationDelta.Reset(),
      this.TmpVector.Reset(),
      this.TmpTransform.Reset();
  }
  GetInitFloorTransform(t) {
    var s = this.LockOnLocation,
      s =
        ((s.Z -= this.ActorComp.HalfHeight + this.FloorExtend.Z),
        t.SetLocation(s),
        this.TmpVector.Set(
          DEFAULT_FLOOR_SCALE_X,
          DEFAULT_FLOOR_SCALE_Y,
          DEFAULT_FLOOR_SCALE_Z,
        ),
        this.Context.FloorParams?.FloorScale &&
          this.TmpVector.DeepCopy(this.Context.FloorParams?.FloorScale),
        t.SetScale3D(this.TmpVector),
        Rotator_1.Rotator.Create());
    t.SetRotation(s.Quaternion());
  }
  HandleFalseInit(t) {
    t(!1), (this.IsInitInternal = !0);
  }
  LoadFloor(h) {
    const e =
      this.Context.FloorParams?.FloorMeshPath ?? DEFAULT_FLOOR_MESH_PATH;
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.StaticMesh, (t) => {
      var s, i;
      t?.IsValid() &&
      this.ActorComp?.Actor?.IsValid() &&
      (this.GetInitFloorTransform(this.TmpTransform),
      (this.Floor = ActorSystem_1.ActorSystem.Get(
        UE.StaticMeshActor.StaticClass(),
        this.TmpTransform.ToUeTransform(),
        this.ActorComp.Actor,
      )),
      this.Floor?.IsValid())
        ? ((s = this.TmpTransform.GetScale3D()),
          (i = t.GetBounds()),
          (this.FloorExtend.X = i.BoxExtent.X * s.X),
          (this.FloorExtend.Y = i.BoxExtent.Y * s.Y),
          (this.FloorExtend.Z = i.BoxExtent.Z),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Character",
              51,
              "[万向跑步机]加载地板Mesh",
              ["Bound", this.FloorExtend],
              ["Path", e],
            ),
          this.Floor.StaticMeshComponent.SetMobility(2),
          this.Floor.StaticMeshComponent.SetStaticMesh(t),
          this.Floor.StaticMeshComponent.SetEnableGravity(!1),
          this.LoadFloorMaterial(h),
          this.Context.FloorParams || this.Floor.SetActorHiddenInGame(!0))
        : this.HandleFalseInit(h);
    });
  }
  LoadFloorMaterial(s) {
    if (this.Context.FloorParams?.FloorMaterialPath) {
      this.FloorMatParams = new FloorMaterialParams(this);
      const i = this.Context.FloorParams?.FloorMaterialPath;
      ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.MaterialInstance, (t) => {
        t?.IsValid() &&
        this.Floor?.IsValid() &&
        (this.Floor.StaticMeshComponent.SetMaterial(0, t),
        (t = this.Floor.StaticMeshComponent.CreateDynamicMaterialInstance(
          0,
          t,
        ))?.IsValid())
          ? (s(!0),
            (this.IsInitInternal = !0),
            this.FloorMatParams.Bind(t),
            this.Floor.StaticMeshComponent.SetMaterial(0, t),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Character", 51, "[万向跑步机]加载地板材质", [
                "Path",
                i,
              ]))
          : this.HandleFalseInit(s);
      });
    } else
      this.HandleFalseInit(s),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Character", 51, "[万向跑步机]没有配置材质，不加载");
  }
  UpdateFloorMatUV(t) {
    var s, i;
    this.IsLockMove &&
      this.FloorMatParams &&
      ((s = 2 * this.FloorExtend.X),
      (i = 2 * this.FloorExtend.Y),
      (this.FloorMatParams.Offset.R += (t.X % s) / s),
      (this.FloorMatParams.Offset.G += (t.Y % i) / i));
  }
  LockActorMove() {
    this.ActorComp &&
      this.IsLockMove &&
      (this.TmpVector.DeepCopy(this.ActorComp.ActorLocationProxy),
      (this.TmpVector.X = this.LockOnLocation.X),
      (this.TmpVector.Y = this.LockOnLocation.Y),
      this.ActorComp.SetActorLocation(
        this.TmpVector.ToUeVector(),
        "万向跑步机锁定位置",
      ));
  }
  AppearEffect(s) {
    if (this.FloorMatParams) {
      let t = DEFAULT_APPEAR_ALPHA_DELTA;
      this.Context.FloorParams?.FloorAppearTime &&
        (t = 1 / this.Context.FloorParams.FloorAppearTime),
        (this.FloorMatParams.OnAppearEndHandle = s),
        (this.FloorMatParams.AlphaDelta = t),
        (this.IsActiveInternal = !0);
    } else s();
  }
  DisappearEffect(s) {
    if (this.FloorMatParams) {
      let t = DEFAULT_DISAPPEAR_ALPHA_DELTA;
      this.Context.FloorParams?.FloorDisappearTime &&
        (t = 1 / this.Context.FloorParams.FloorDisappearTime),
        (this.FloorMatParams.OnDisappearEndHandle = () => {
          s(), (this.IsActiveInternal = !1);
        }),
        (this.FloorMatParams.AlphaDelta = -t);
    } else s();
  }
  EnableLockMove(t) {
    this.IsLockMove = t;
  }
  ResetLockOnLocation(t) {
    this.ActorComp &&
      (t
        ? this.LockOnLocation.DeepCopy(t)
        : this.LockOnLocation.DeepCopy(this.ActorComp.ActorLocationProxy),
      this.Floor?.IsValid() &&
        (this.GetInitFloorTransform(this.TmpTransform),
        this.Floor.K2_SetActorTransform(
          this.TmpTransform.ToUeTransform(),
          !1,
          void 0,
          !0,
        )),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("Movement", 51, "[万向跑步机]重置Lock位置", [
        "LockLocation",
        this.LockOnLocation,
      ]);
  }
  GetFloorActor() {
    if (this.Floor?.IsValid()) return this.Floor;
  }
}
exports.SeamlessTravelTreadmill = SeamlessTravelTreadmill;
//# sourceMappingURL=SeamlessTravelTreadmill.js.map
