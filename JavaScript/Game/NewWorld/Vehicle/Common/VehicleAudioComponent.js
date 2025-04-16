"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, i) {
    var o,
      s = arguments.length,
      r =
        s < 3
          ? t
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(t, n))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, n, i);
    else
      for (var u = e.length - 1; 0 <= u; u--)
        (o = e[u]) && (r = (s < 3 ? o(r) : 3 < s ? o(t, n, r) : o(t, n)) || r);
    return 3 < s && r && Object.defineProperty(t, n, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehicleAudioComponent = void 0);
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  BaseAudioComponent_1 = require("../../Character/Common/Component/BaseAudioComponent");
let VehicleAudioComponent = class VehicleAudioComponent extends BaseAudioComponent_1.BaseAudioComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.OnVehicleBeenEntered = (e) => {}),
      (this.OnVehicleBeenLeaved = (e) => {});
  }
  OnInit() {
    return (
      super.OnInit(),
      (this.ActorComp = this.Entity.CheckGetComponent(231)),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnVehicleBeenEntered,
        this.OnVehicleBeenEntered,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnVehicleBeenLeaved,
        this.OnVehicleBeenLeaved,
      ),
      !0
    );
  }
  OnEnd() {
    return (
      super.OnEnd(),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnVehicleBeenEntered,
        this.OnVehicleBeenEntered,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnVehicleBeenLeaved,
        this.OnVehicleBeenLeaved,
      ),
      !0
    );
  }
  OnStart() {
    return (
      super.OnStart(),
      !(!this.ActorComp?.Valid || !this.ActorComp.Owner || (this.b2l(), 0))
    );
  }
  b2l() {}
  UpdateVehicleMoveSound(e, t) {}
};
(VehicleAudioComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(239)],
  VehicleAudioComponent,
)),
  (exports.VehicleAudioComponent = VehicleAudioComponent);
//# sourceMappingURL=VehicleAudioComponent.js.map
