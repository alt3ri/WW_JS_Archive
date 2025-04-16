"use strict";
var VehicleMovementSyncComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, o, n) {
      var r,
        i = arguments.length,
        l =
          i < 3
            ? t
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(t, o))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        l = Reflect.decorate(e, t, o, n);
      else
        for (var c = e.length - 1; 0 <= c; c--)
          (r = e[c]) &&
            (l = (i < 3 ? r(l) : 3 < i ? r(t, o, l) : r(t, o)) || l);
      return 3 < i && l && Object.defineProperty(t, o, l), l;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleMovementSyncComponent = void 0);
const Time_1 = require("../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../Core/Net/Net"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CombatLog_1 = require("../../../Utils/CombatLog"),
  BaseMovementSyncComponent_1 = require("../../Character/Common/Component/BaseMovementSyncComponent"),
  VehiclePathMoveController_1 = require("../Controller/VehiclePathMoveController");
let VehicleMovementSyncComponent =
  (VehicleMovementSyncComponent_1 = class VehicleMovementSyncComponent extends (
    BaseMovementSyncComponent_1.BaseMovementSyncComponent
  ) {
    constructor() {
      super(...arguments),
        (this.InputComp = void 0),
        (this.VehicleMoveComp = void 0),
        (this.Li_ = 0);
    }
    OnStart() {
      return (
        !!super.OnStart() &&
        ((this.InputComp = this.Entity.GetComponent(237)),
        (this.VehicleMoveComp = this.Entity.GetComponent(233)),
        !0)
      );
    }
    DefaultEnableMovementSync() {
      return !0;
    }
    GetCurrentMoveSample() {
      var e,
        t = super.GetCurrentMoveSample();
      return (
        ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          ((e = this.ActorComp.ActorVelocityProxy),
          (t.f8n = { X: e.X, Y: e.Y, Z: e.Z })),
        t
      );
    }
    ApplyMoveSample(e, t, o, n, r, i, l, c, s, h, m) {
      super.ApplyMoveSample(e, t, o, n, r, i, l, c, s, h, m),
        this.VehicleMoveComp?.SetForceSpeed(n);
    }
    CustomAfterTickInternal(e) {
      var t,
        o =
          VehiclePathMoveController_1.VehiclePathMoveController.GetEntitySplineMoveInfo(
            this.Entity,
          );
      o
        ? Time_1.Time.NowSeconds - this.Li_ >=
            VehicleMovementSyncComponent_1.VehiclePathRatioSyncInterval &&
          (((t = Protocol_1.Aki.Protocol.g0_.create()).F4n =
            this.ActorComp.CreatureData.GetCreatureDataId()),
          (t.Ii_ = o.SplineId),
          (t.Ti_ = 1e4 * o.State.PathRatio),
          (t.l8n = {
            X: this.ActorComp.ActorLocationProxy.X,
            Y: this.ActorComp.ActorLocationProxy.Y,
            Z: this.ActorComp.ActorLocationProxy.Z,
          }),
          CombatLog_1.CombatLog.Info("Move", this.Entity, "SendSplineMove", [
            "Ratio",
            o.State.PathRatio,
          ]),
          (this.Li_ = Time_1.Time.NowSeconds),
          Net_1.Net.Call(28550, t, () => {}))
        : super.CustomAfterTickInternal(e);
    }
    HandleSplineMoveNotify(e, t) {
      VehiclePathMoveController_1.VehiclePathMoveController.GetEntitySplineMoveInfo(
        this.Entity,
      ) &&
        (CombatLog_1.CombatLog.Info("Move", this.Entity, "ReceiveSplineMove", [
          "Ratio",
          1e-4 * t,
        ]),
        VehiclePathMoveController_1.VehiclePathMoveController.SyncEntityPathRatio(
          this.Entity,
          e,
          1e-4 * t,
        ));
    }
    CustomPreTickInternal(e) {
      VehiclePathMoveController_1.VehiclePathMoveController.GetEntitySplineMoveInfo(
        this.Entity,
      ) || super.CustomPreTickInternal(e);
    }
  });
(VehicleMovementSyncComponent.VehiclePathRatioSyncInterval = 2),
  (VehicleMovementSyncComponent = VehicleMovementSyncComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(240)],
      VehicleMovementSyncComponent,
    )),
  (exports.VehicleMovementSyncComponent = VehicleMovementSyncComponent);
//# sourceMappingURL=VehicleMovementSyncComponent.js.map
