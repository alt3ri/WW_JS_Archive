"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, r, i) {
    var o,
      n = arguments.length,
      s =
        n < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, r))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(t, e, r, i);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (o = t[h]) && (s = (n < 3 ? o(s) : 3 < n ? o(e, r, s) : o(e, r)) || s);
    return 3 < n && s && Object.defineProperty(e, r, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingBoatPerformComponent = void 0);
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CharacterAttributeTypes_1 = require("../../Character/Common/Component/Abilities/CharacterAttributeTypes"),
  GongduolaPerformComponent_1 = require("../Gongduola/GongduolaPerformComponent"),
  FishingBoatConfig_1 = require("./FishingBoatConfig");
let FishingBoatPerformComponent = class FishingBoatPerformComponent extends GongduolaPerformComponent_1.GongduolaPerformComponent {
  constructor() {
    super(...arguments),
      (this.osn = void 0),
      (this.fh_ = Vector_1.Vector.Create()),
      (this.Vc_ = () => {
        this.IsSprint ||
          this.Config.SetBaseStateMoveConfig(
            this.ActorComp.Actor.VehicleMovementComponent,
          );
      });
  }
  OnInit() {
    return !!super.OnInit() && (this.IsHidePassenger = !0);
  }
  OnStart() {
    return (
      !!super.OnStart() &&
      ((this.osn = this.Entity.GetComponent(170)),
      this.osn &&
        this.osn.AddListener(
          CharacterAttributeTypes_1.EAttributeId.vVn,
          this.Vc_,
          "FishingBoatPerformComponent",
        ),
      !0)
    );
  }
  OnActivate() {
    super.OnActivate();
    var t = this.ActorComp?.CreatureData?.GetCreatureDataId() ?? 0;
    ModelManager_1.ModelManager.FishingModel.GetShipData().RefreshShipEntity(t);
  }
  OnEnd() {
    return (
      this.osn &&
        this.osn.RemoveListener(
          CharacterAttributeTypes_1.EAttributeId.vVn,
          this.Vc_,
        ),
      super.OnEnd()
    );
  }
  InitVehicleConfig() {
    var t = this.LoadVehicleConfigAsset();
    return (
      !!t?.IsValid() &&
      ((this.Config = new FishingBoatConfig_1.FishingBoatConfig(
        this.Entity,
        t,
      )),
      (this.ConfigInternal = this.Config.DeepCopy()),
      this.Config.Init())
    );
  }
  CheckCanPerformHit() {
    for (const t of this.PassengerInfoMap.values())
      if (t.IsDriver && t.IsRolePassenger()) return !0;
    return !1;
  }
  OnBulletHit(t, e) {
    this.ActorComp &&
      (((e = e.AttackerActorComp)?.Valid &&
        (this.ActorComp.ActorLocationProxy.Subtraction(
          e.ActorLocationProxy,
          this.fh_,
        ),
        this.fh_.Normalize())) ||
        this.ActorComp.ActorForwardProxy.Multiply(-1, this.fh_),
      (this.CollisionStrength = 1),
      this.fh_.GetSafeNormal2D(this.fh_),
      (e =
        Math.acos(this.fh_.CosineAngle2D(this.ActorComp.ActorForwardProxy)) *
        MathUtils_1.MathUtils.RadToDeg),
      (this.CollisionDirection =
        e * Math.sign(this.fh_.DotProduct(this.ActorComp.ActorRightProxy))),
      this.BeginCollisionPerform());
  }
  FishingBoatEnterSprint(t, e, r) {
    this.Config.RefreshSprintConfig(t, e, r), this.TryEnterSprint();
  }
  CheckCanSprint() {
    return !(
      this.IsInSprintStartAction || this.ActorComp.InputDirectProxy.X < 0
    );
  }
  TryEnterSprint() {
    return !!this.CheckCanSprint() && (this.IsEnterSprint = !0);
  }
  HandlePendingDestroy() {
    ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(
      this.Entity,
    );
  }
};
(FishingBoatPerformComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(271)],
  FishingBoatPerformComponent,
)),
  (exports.FishingBoatPerformComponent = FishingBoatPerformComponent);
//# sourceMappingURL=FishingBoatPerformComponent.js.map
