"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, r, t, o) {
    var i,
      n = arguments.length,
      s =
        n < 3
          ? r
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(r, t))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, r, t, o);
    else
      for (var c = e.length - 1; 0 <= c; c--)
        (i = e[c]) && (s = (n < 3 ? i(s) : 3 < n ? i(r, t, s) : i(r, t)) || s);
    return 3 < n && s && Object.defineProperty(r, t, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcVehiclePerformComponent = void 0);
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BaseVehiclePerformComponent_1 = require("../../../Vehicle/Common/BaseVehiclePerformComponent"),
  VehicleConfig_1 = require("../../../Vehicle/Common/VehicleConfig");
let NpcVehiclePerformComponent = class NpcVehiclePerformComponent extends BaseVehiclePerformComponent_1.BaseVehiclePerformComponent {
  constructor() {
    super(...arguments), (this.ActorComp = void 0);
  }
  OnStart() {
    return (
      !!super.OnStart() &&
      ((this.ActorComp = this.Entity.GetComponent(3)),
      !!this.InitVehicleConfig())
    );
  }
  InitVehicleConfig() {
    var e = this.LoadVehicleConfigAsset();
    return (
      (this.Config = new VehicleConfig_1.VehicleConfig(this.Entity, e)),
      (this.ConfigInternal = this.Config.DeepCopy()),
      this.Config.Init()
    );
  }
  TryEnter(e, r) {
    if (!this.EnterConditionCheck(e, r)) return !1;
    var t = e.GetComponent(0);
    if (t?.IsRole()) {
      var o = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(
        t.GetPlayerId(),
      );
      if (!o) return !1;
      o = o.DeepCopy();
      (o.EntityCreatureId = t.GetCreatureDataId()),
        (o.VehicleCreatureId = this.ActorComp.CreatureData.GetCreatureDataId()),
        (o.Seat = r),
        ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(o);
    }
    return this.Enter(e, r), !0;
  }
  TryLeave(e, r = 0) {
    if (!this.LeaveConditionCheck(e)) return !1;
    var t = e.GetComponent(0);
    if (t?.IsRole()) {
      t = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(
        t.GetPlayerId(),
      );
      if (!t) return !1;
      t = t.DeepCopy();
      (t.VehicleCreatureId = 0),
        (t.ExitType = r),
        ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(t);
    }
    return this.Leave(e, r), !0;
  }
  GetVehicleVelocity(e) {
    this.ActorComp && e.DeepCopy(this.ActorComp.ActorVelocityProxy);
  }
};
(NpcVehiclePerformComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(229)],
  NpcVehiclePerformComponent,
)),
  (exports.NpcVehiclePerformComponent = NpcVehiclePerformComponent);
//# sourceMappingURL=NpcVehiclePerformComponent.js.map
