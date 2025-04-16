"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VehiclePassengerInfo =
    exports.VehicleRideSharingInfo =
    exports.ScenePlayerVehicleInfo =
    exports.EntityVehicleInfo =
    exports.VehicleInfoDefines =
    exports.INVALID_SEAT =
      void 0);
const UE = require("ue");
exports.INVALID_SEAT = 999;
class VehicleInfoDefines {
  static GetSeatSocketName(e) {
    let s = this.Drl;
    return e < 10 && (s += "0"), (s += (e + 1).toString()), new UE.FName(s);
  }
}
(exports.VehicleInfoDefines = VehicleInfoDefines).Drl = "SeatProp";
class EntityVehicleInfo {
  constructor() {
    (this.EntityCreatureId = 0),
      (this.VehicleCreatureId = 0),
      (this.Seat = -1),
      (this.ExitType = 0);
  }
  DeepCopy() {
    var e = new EntityVehicleInfo();
    return (
      (e.EntityCreatureId = this.EntityCreatureId),
      (e.VehicleCreatureId = this.VehicleCreatureId),
      (e.Seat = this.Seat),
      e
    );
  }
  Equals(e) {
    return (
      this.EntityCreatureId === e.EntityCreatureId &&
      this.VehicleCreatureId === e.VehicleCreatureId &&
      this.Seat === e.Seat
    );
  }
}
class ScenePlayerVehicleInfo extends (exports.EntityVehicleInfo =
  EntityVehicleInfo) {
  constructor() {
    super(...arguments), (this.PlayerId = 0);
  }
  DeepCopy() {
    var e = new ScenePlayerVehicleInfo();
    return (
      (e.PlayerId = this.PlayerId),
      (e.EntityCreatureId = this.EntityCreatureId),
      (e.VehicleCreatureId = this.VehicleCreatureId),
      (e.Seat = this.Seat),
      e
    );
  }
  Equals(e) {
    return this.PlayerId === e.PlayerId && super.Equals(e);
  }
}
exports.ScenePlayerVehicleInfo = ScenePlayerVehicleInfo;
class VehicleRideSharingInfo {
  constructor() {
    (this.PlayerId = 0),
      (this.RoleId = 0),
      (this.RoleCreatureId = 0),
      (this.Seat = -1);
  }
}
exports.VehicleRideSharingInfo = VehicleRideSharingInfo;
class VehiclePassengerInfo {
  constructor() {
    (this.VehicleEntity = void 0),
      (this.PassengerEntity = void 0),
      (this.VehicleType = "Gongduola"),
      (this.IsDriver = !1),
      (this.Seat = -1),
      (this.ExitType = 0);
  }
  IsRolePassenger(e = !1) {
    var s = this.PassengerEntity?.GetComponent(3);
    return e ? !!s?.IsRoleAndCtrlByMe : !!s?.CreatureData.IsRole();
  }
  IsNpcPassenger() {
    return this.PassengerEntity?.GetComponent(3)?.CreatureData.IsNpc() ?? !1;
  }
}
exports.VehiclePassengerInfo = VehiclePassengerInfo;
//# sourceMappingURL=VehicleInfoDefines.js.map
