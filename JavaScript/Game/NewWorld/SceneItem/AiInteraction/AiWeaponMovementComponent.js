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
      for (var a = t.length - 1; 0 <= a; a--)
        (o = t[a]) && (n = (s < 3 ? o(n) : 3 < s ? o(e, i, n) : o(e, i)) || n);
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
      (this.SIe = void 0),
      (this.EnableMovement = void 0),
      (this.lln = 1),
      (this._ln = -0),
      (this.Cji = void 0);
  }
  OnInitData() {
    (this.SIe = this.Entity.GetComponent(0)), (this._ln = 0.01);
    var t = this.SIe.GetPbEntityInitData(),
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "WeaponComponent");
    return (
      t?.WeaponId &&
        ((t = ModelManager_1.ModelManager.AiWeaponModel.GetStaticWeaponConfig(
          t.WeaponId,
        )),
        (this._ln = t.Mass)),
      (this.EnableMovement = !0),
      !(this.lln = 0)
    );
  }
  OnStart() {
    return (
      (this.Hte = this.Entity.GetComponent(182)),
      ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        this.Entity.GetComponent(142)?.TryDisable(
          "[AiWeaponMovementComponent.OnStart]",
        ),
      !0
    );
  }
  OnTick(t) {
    this.EnableMovement && this.UpdateMovement(t);
  }
  UpdateMovement(t) {
    switch (
      (this.Hte.SetActorLocation(this.Hte.StaticMesh.K2_GetComponentLocation()),
      this.lln)
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
      this.SIe.GetInitLinearVelocity() ?? Vector_1.Vector.ZeroVector,
    ),
      e.IsNearlyZero() ? (this.lln = 2) : (this.uln(), (this.lln = 1));
  }
  UpdateItemFall(t) {
    (this.cln() || this.mln() || this.dln()) &&
      ((this.lln = 2),
      this.Cln(),
      ModelManager_1.ModelManager.GameModeModel.IsMulti ||
        this.Entity.GetComponent(142)?.ForceSendPendingMoveInfos());
  }
  UpdateItemStay(t) {
    this.EnableMovement = !1;
  }
  uln() {
    var t,
      e = this.Hte.StaticMesh,
      i =
        (e.SetCollisionProfileName(COLLISION_PROFILE_NAME),
        e.SetCollisionEnabled(2),
        e.SetSimulatePhysics(!0),
        0 <= this._ln &&
          e.SetMassOverrideInKg(FNameUtil_1.FNameUtil.NONE, this._ln, !0),
        e.SetEnableGravity(!0),
        e.SetConstraintMode(6),
        e.SetUseCCD(!0),
        MathUtils_1.MathUtils.CommonTempVector);
    i.FromConfigVector(
      this.SIe.GetInitLinearVelocity() ?? Vector_1.Vector.ZeroVector,
    ),
      i.SizeSquared2D() <= GROUND_MAX_XY_VEL_SQUARED &&
        ((t = Vector_1.Vector.Create()),
        i.GetSignVector(t),
        t.MultiplyEqual(Math.sqrt(GROUND_MAX_XY_VEL_SQUARED + 1)),
        (t.Z = 0),
        i.AdditionEqual(t)),
      e.SetPhysicsLinearVelocity(i.ToUeVector());
  }
  Cln() {
    var t = this.Hte.StaticMesh;
    t.SetCollisionEnabled(0),
      t.SetSimulatePhysics(!1),
      t.SetEnableGravity(!1),
      t.SetPhysicsLinearVelocity(Vector_1.Vector.ZeroVector),
      t.SetPhysicsAngularVelocity(Vector_1.Vector.ZeroVector),
      t.SetConstraintMode(0),
      t.SetUseCCD(!1);
  }
  gln() {
    this.Cji || (this.Cji = UE.NewObject(UE.TraceLineElement.StaticClass())),
      (this.Cji.WorldContextObject = GlobalData_1.GlobalData.World),
      (this.Cji.bIsSingle = !0),
      (this.Cji.bIgnoreSelf = !0),
      this.Cji.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water),
      this.Cji.SetDrawDebugTrace(2),
      (this.Cji.DrawTime = 5),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        this.Cji,
        ColorUtils_1.ColorUtils.LinearGreen,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        this.Cji,
        ColorUtils_1.ColorUtils.LinearRed,
      );
  }
  fln(t) {
    this.gln();
    var e = this.Hte.ActorLocationProxy,
      e =
        (this.Cji.SetStartLocation(e.X, e.Y, e.Z),
        this.Cji.SetEndLocation(e.X, e.Y, e.Z + t),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.Cji,
          "AiWeaponMovementComponent.TraceHitWater",
        )),
      t = e && !!this.Cji.HitResult?.bBlockingHit;
    return this.Cji.ClearCacheData(), t;
  }
  cln() {
    var t;
    return (
      !(0 < this.Hte.StaticMesh.GetComponentVelocity().Z) &&
      ((t = (t = this.SIe.GetInitLocation())
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
  mln() {
    var t = this.Hte.StaticMesh.GetComponentVelocity();
    return (
      t.Z <= 0 &&
      Math.abs(t.Z) <= GROUND_MAX_Z_VEL &&
      t.SizeSquared2D() <= GROUND_MAX_XY_VEL_SQUARED
    );
  }
  dln() {
    return !!(
      this.Hte.StaticMesh.GetComponentVelocity().Z <= 0 &&
      this.fln(-ON_WATER_MAX_DIST)
    );
  }
};
(AiWeaponMovementComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(108)],
  AiWeaponMovementComponent,
)),
  (exports.AiWeaponMovementComponent = AiWeaponMovementComponent);
//# sourceMappingURL=AiWeaponMovementComponent.js.map
