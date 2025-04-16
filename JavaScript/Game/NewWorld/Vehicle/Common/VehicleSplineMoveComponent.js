"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    var n,
      s = arguments.length,
      r =
        s < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, i, o);
    else
      for (var l = e.length - 1; 0 <= l; l--)
        (n = e[l]) && (r = (s < 3 ? n(r) : 3 < s ? n(t, i, r) : n(t, i)) || r);
    return 3 < s && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleSplineMoveComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Time_1 = require("../../../../Core/Common/Time"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  BaseSplineMoveComponent_1 = require("../../Common/Component/BaseSplineMoveComponent");
let VehicleSplineMoveComponent = class VehicleSplineMoveComponent extends BaseSplineMoveComponent_1.BaseSplineMoveComponent {
  constructor() {
    super(...arguments),
      (this.CharActorComp = void 0),
      (this.PerformComp = void 0),
      (this.ExtraMoveParams = void 0),
      (this.OnVehicleBeenLeaved = (e) => {
        e.IsRolePassenger(!0) && this.ForceStopSplineMove();
      });
  }
  OnStart() {
    return (
      super.OnStart(),
      (0, RegisterComponent_1.isComponentInstance)(this.ActorComp, 231) &&
        (this.CharActorComp = this.ActorComp),
      (this.PerformComp = this.Entity.GetComponent(234)),
      !0
    );
  }
  OnTick(e) {
    var t = this.CurrentSplineMoveParams;
    t
      ? (!this.SplineMoveParamsMap.has(t.Id) &&
          t.EarliestLeaveTime <= Time_1.Time.NowSeconds &&
          !this.SelectNextSplineMove()) ||
        (this.UpdateSplineLocationAndDirection(),
        this.UpdateLastSplineLocationAndDirection(),
        (t = e * MathUtils_1.MathUtils.MillisecondToSecond),
        this.PositionAdjust(this.SplineTimeKey, t),
        this.InputAdjust(),
        this.LastLocation.DeepCopy(this.TargetLocation))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Movement", 6, "Tick in No SplineMove!"),
        (this.DisableKey = this.Disable(
          "[SplineMoveComponent.OnTick] this.CurrentSplineMoveParams为false",
        )));
  }
  OnEnd() {
    return this.OnSplineMoveDisable(), super.OnEnd();
  }
  InputAdjust() {
    var e = this.CharActorComp.InputDirectProxy;
    "SlideTrack" === this.CurrentSplineMoveType &&
      this.InputAdjustSlideTrack(e);
  }
  InputAdjustSlideTrack(e) {}
  SetExtraMoveParams(e) {
    this.ExtraMoveParams = e;
  }
  ResetExtraMoveParams() {
    this.ExtraMoveParams = void 0;
  }
  StartMoveConditionCheck(e, t) {
    var i = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
    return (
      !(!i || !this.PerformComp?.IsDriver(i)) &&
      super.StartMoveConditionCheck(e, t)
    );
  }
  ApplySplineMoveDaConfig() {}
  ResetSplineMoveDaConfig() {
    this.PerformComp?.ResetVehicleConfig(!0);
  }
  OnSplineMoveEnable(e, t) {
    this.ApplySplineMoveDaConfig(),
      ControllerHolder_1.ControllerHolder.VehicleController.SetRiderSharingEnable(
        !1,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnVehicleBeenLeaved,
        this.OnVehicleBeenLeaved,
      );
  }
  OnSplineMoveDisable() {
    this.ResetSplineMoveDaConfig(),
      ControllerHolder_1.ControllerHolder.VehicleController.SetRiderSharingEnable(
        !0,
      ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnVehicleBeenLeaved,
        this.OnVehicleBeenLeaved,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnVehicleBeenLeaved,
          this.OnVehicleBeenLeaved,
        );
  }
  OnSelectNextSplineMoveEnd() {
    this.CharActorComp?.ClearInput(),
      this.LastLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
  }
};
(VehicleSplineMoveComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(107)],
  VehicleSplineMoveComponent,
)),
  (exports.VehicleSplineMoveComponent = VehicleSplineMoveComponent);
//# sourceMappingURL=VehicleSplineMoveComponent.js.map
