"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, r, o) {
    var i,
      n = arguments.length,
      s =
        n < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, r))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, r, o);
    else
      for (var c = e.length - 1; 0 <= c; c--)
        (i = e[c]) && (s = (n < 3 ? i(s) : 3 < n ? i(t, r, s) : i(t, r)) || s);
    return 3 < n && s && Object.defineProperty(t, r, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcDriveVehicleComponent = void 0);
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  VehicleInfoDefines_1 = require("../../../Vehicle/Common/VehicleInfoDefines"),
  CharacterDriveVehicleComponent_1 = require("../../Common/Component/CharacterDriveVehicleComponent"),
  DRIVE_MONTAGE_DEFAULT_OFFSET_X = 35,
  VEHICLE_PB = "dI_";
let NpcDriveVehicleComponent = class NpcDriveVehicleComponent extends CharacterDriveVehicleComponent_1.CharacterDriveVehicleComponent {
  constructor() {
    super(...arguments), (this.NpcPerformComp = void 0);
  }
  OnStart() {
    return (
      !!super.OnStart() &&
      ((this.NpcPerformComp = this.Entity.GetComponent(185)), !0)
    );
  }
  OnActivate() {
    this.NpcPerformComp?.IsBaseRoleNpc ||
      this.AttachOffset.Set(DRIVE_MONTAGE_DEFAULT_OFFSET_X, 0, 0),
      super.OnActivate();
    var e,
      t = this.Entity.GetComponent(0),
      r = t.ComponentDataMap.get(VEHICLE_PB)?.dI_;
    r &&
      (((e = new VehicleInfoDefines_1.EntityVehicleInfo()).EntityCreatureId =
        t.GetCreatureDataId()),
      (e.VehicleCreatureId = MathUtils_1.MathUtils.LongToNumber(r.TI_)),
      (e.Seat = r.fhl),
      ControllerHolder_1.ControllerHolder.VehicleController.VehicleUpdateEntity(
        e,
      ));
  }
  InitEnterEffectAsset() {}
  PostEnterVehiclePerform(e) {
    super.PostEnterVehiclePerform(e), this.NpcPerformComp?.OnEnterVehicle();
  }
  LeaveVehiclePerform(e) {
    this.NpcPerformComp?.OnLeaveVehicle(), super.LeaveVehiclePerform(e);
  }
};
(NpcDriveVehicleComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(228)],
  NpcDriveVehicleComponent,
)),
  (exports.NpcDriveVehicleComponent = NpcDriveVehicleComponent);
//# sourceMappingURL=NpcDriveVehicleComponent.js.map
