"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, r) {
    var o,
      s = arguments.length,
      n =
        s < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, r);
    else
      for (var _ = t.length - 1; 0 <= _; _--)
        (o = t[_]) && (n = (s < 3 ? o(n) : 3 < s ? o(e, i, n) : o(e, i)) || n);
    return 3 < s && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiWeaponMovementComponent = void 0);
const UE = require("ue"),
  QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  COLLISION_PROFILE_NAME = new UE.FName("DropItem"),
  GROUND_MAX_XY_VEL_SQUARED = 4,
  GROUND_MAX_Z_VEL = 2,
  MAX_DROP_HEIGHT = 1e4,
  ON_WATER_MAX_DIST = 5;
let AiWeaponMovementComponent = class AiWeaponMovementComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.EIe = void 0),
      (this.EnableMovement = void 0),
      (this.jhn = 1),
      (this.Whn = -0),
      (this.mWi = void 0);
  }
  OnInitData() {
    (this.EIe = this.Entity.GetComponent(0)), (this.Whn = 0.01);
    var t = this.EIe.GetPbEntityInitData(),
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "WeaponComponent");
    return (
      t?.WeaponId &&
        ((t = ModelManager_1.ModelManager.AiWeaponModel.GetStaticWeaponConfig(
          t.WeaponId,
        )),
        (this.Whn = t.Mass)),
      (this.EnableMovement = !0),
      !(this.jhn = 0)
    );
  }
  OnStart() {
    return (this.Hte = this.Entity.GetComponent(185)), !0;
  }
  OnTick(t) {
    this.EnableMovement && this.UpdateMovement(t);
  }
  UpdateMovement(t) {
    switch (
      (this.Hte.SetActorLocation(this.Hte.StaticMesh.K2_GetComponentLocation()),
      this.jhn)
    ) {
      case 0:
        this.UpdateItemBorn(t);
        break;
      case 1:
        this.UpdateItemFall(t);
        break;
      case 2:
        this.UpdateItemStay(t);
    }
  }
  UpdateItemBorn(t) {
    var e = MathUtils_1.MathUtils.CommonTempVector;
    e.FromConfigVector(
      this.EIe.GetInitLinearVelocity() ?? Vector_1.Vector.ZeroVector,
    ),
      e.IsNearlyZero() ? (this.jhn = 2) : (this.Khn(), (this.jhn = 1));
  }
  UpdateItemFall(t) {
    (this.Qhn() || this.Xhn() || this.$hn()) &&
      ((this.jhn = 2),
      this.Yhn(),
      ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        this.Entity.GetComponent(144)?.CollectSampleAndSend(!0));
  }
  UpdateItemStay(t) {
    this.EnableMovement = !1;
  }
  Khn() {
    var t,
      e = this.Hte.StaticMesh,
      i =
        (e.SetCollisionProfileName(COLLISION_PROFILE_NAME),
        e.SetCollisionEnabled(2),
        e.SetSimulatePhysics(!0),
        0 <= this.Whn &&
          e.SetMassOverrideInKg(FNameUtil_1.FNameUtil.NONE, this.Whn, !0),
        e.SetEnableGravity(!0),
        e.SetConstraintMode(6),
        e.SetUseCCD(!0),
        MathUtils_1.MathUtils.CommonTempVector);
    i.FromConfigVector(
      this.EIe.GetInitLinearVelocity() ?? Vector_1.Vector.ZeroVector,
    ),
      i.SizeSquared2D() <= GROUND_MAX_XY_VEL_SQUARED &&
        ((t = Vector_1.Vector.Create()),
        i.GetSignVector(t),
        t.MultiplyEqual(Math.sqrt(GROUND_MAX_XY_VEL_SQUARED + 1)),
        (t.Z = 0),
        i.AdditionEqual(t)),
      e.SetPhysicsLinearVelocity(i.ToUeVector());
  }
  Yhn() {
    var t = this.Hte.StaticMesh;
    t.SetCollisionEnabled(0),
      t.SetSimulatePhysics(!1),
      t.SetEnableGravity(!1),
      t.SetPhysicsLinearVelocity(Vector_1.Vector.ZeroVector),
      t.SetPhysicsAngularVelocity(Vector_1.Vector.ZeroVector),
      t.SetConstraintMode(0),
      t.SetUseCCD(!1);
  }
  Jhn() {
    this.mWi || (this.mWi = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.mWi.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.mWi.bIsSingle = !0),
      (this.mWi.bIgnoreSelf = !0),
      this.mWi.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
      this.mWi.SetDrawDebugTrace(2),
      (this.mWi.DrawTime = 5),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        this.mWi,
        ColorUtils_1.ColorUtils.LinearGreen,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        this.mWi,
        ColorUtils_1.ColorUtils.LinearRed,
      );
  }
  zhn(t) {
    this.Jhn();
    var e = this.Hte.ActorLocationProxy,
      e =
        (this.mWi.SetStartLocation(e.X, e.Y, e.Z),
        this.mWi.SetEndLocation(e.X, e.Y, e.Z + t),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.mWi,
          "AiWeaponMovementComponent.TraceHitWater",
        )),
      t = e && !!this.mWi.HitResult?.bBlockingHit;
    return this.mWi.ClearCacheData(), t;
  }
  Qhn() {
    var t;
    return (
      !(0 < this.Hte.StaticMesh.GetComponentVelocity().Z) &&
      ((t = (t = this.EIe.GetInitLocation())
        ? this.Hte.ActorLocationProxy.Z - t.Z
        : 0),
      Math.abs(t) > MAX_DROP_HEIGHT ||
        ((t = (t =
          Global_1.Global.BaseCharacter?.CharacterActorComponent.ActorLocation)
          ? this.Hte.ActorLocationProxy.Z - t.Z
          : 0),
        Math.abs(t) > MAX_DROP_HEIGHT))
    );
  }
  Xhn() {
    var t = this.Hte.StaticMesh.GetComponentVelocity();
    return (
      t.Z <= 0 &&
      Math.abs(t.Z) <= GROUND_MAX_Z_VEL &&
      t.SizeSquared2D() <= GROUND_MAX_XY_VEL_SQUARED
    );
  }
  $hn() {
    return !!(
      this.Hte.StaticMesh.GetComponentVelocity().Z <= 0 &&
      this.zhn(-ON_WATER_MAX_DIST)
    );
  }
};
(AiWeaponMovementComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(110)],
  AiWeaponMovementComponent,
)),
  (exports.AiWeaponMovementComponent = AiWeaponMovementComponent);
//# sourceMappingURL=AiWeaponMovementComponent.js.map
