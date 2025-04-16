"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbPassengerTeleportConfig_1 = require("./FbPassengerTeleportConfig"),
  FbVehiclePassengerConfig_1 = require("./FbVehiclePassengerConfig"),
  UnionVehicleFeatureHelper_1 = require("./UnionVehicleFeatureHelper");
class FbVehicleComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.bSh = !1),
      (this.TAe = void 0),
      (this.ijl = !1),
      (this.rjl = void 0),
      (this.ojl = !1),
      (this.njl = void 0),
      (this.sjl = !1),
      (this.ajl = void 0),
      (this.KEc = !1),
      (this.XEc = void 0),
      (this.Z8l = !1),
      (this.eHl = void 0),
      (this.RXh = !1),
      (this.wXh = void 0),
      (this.PXh = !1),
      (this.UXh = void 0),
      (this.hjl = !1),
      (this.ljl = void 0);
  }
  static Create(t) {
    if (t) return new FbVehicleComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Config() {
    return (
      this.bSh || ((this.bSh = !0), (this.TAe = this.FbDataInternal.config())),
      this.TAe
    );
  }
  get VehicleBornTag() {
    if (!this.ijl) {
      (this.ijl = !0), (this.rjl = new Array());
      var i = this.FbDataInternal.vehicleBornTagLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.rjl.push(this.FbDataInternal.vehicleBornTag(t));
    }
    return this.rjl;
  }
  get VehicleRiddenTag() {
    if (!this.ojl) {
      (this.ojl = !0), (this.njl = new Array());
      var i = this.FbDataInternal.vehicleRiddenTagLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.njl.push(this.FbDataInternal.vehicleRiddenTag(t));
    }
    return this.njl;
  }
  get RoleRiddingTag() {
    if (!this.sjl) {
      (this.sjl = !0), (this.ajl = new Array());
      var i = this.FbDataInternal.roleRiddingTagLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.ajl.push(this.FbDataInternal.roleRiddingTag(t));
    }
    return this.ajl;
  }
  get TeleportPlayersWhenDestroyed() {
    return (
      this.KEc ||
        ((this.KEc = !0),
        (this.XEc =
          FbPassengerTeleportConfig_1.FbPassengerTeleportConfig.Create(
            this.FbDataInternal.teleportPlayersWhenDestroyed(),
          ))),
      this.XEc
    );
  }
  get VehicleFeatures() {
    if (!this.Z8l) {
      (this.Z8l = !0), (this.eHl = new Array());
      var i = this.FbDataInternal.vehicleFeaturesLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.vehicleFeaturesType(t),
            s =
              UnionVehicleFeatureHelper_1.UnionVehicleFeatureHelper.GetUnionVehicleFeatureObject(
                e,
              );
          s &&
            void 0 !==
              (e =
                UnionVehicleFeatureHelper_1.UnionVehicleFeatureHelper.ReadUnionVehicleFeature(
                  e,
                  this.FbDataInternal.vehicleFeatures(t, s),
                )) &&
            this.eHl.push(e);
        }
    }
    return this.eHl;
  }
  get SeatCount() {
    return (
      this.RXh ||
        ((this.RXh = !0), (this.wXh = this.FbDataInternal.seatCount())),
      this.wXh
    );
  }
  get DriverSeat() {
    return (
      this.PXh ||
        ((this.PXh = !0), (this.UXh = this.FbDataInternal.driverSeat())),
      this.UXh
    );
  }
  get DefaultPassengers() {
    if (!this.hjl) {
      (this.hjl = !0), (this.ljl = new Array());
      var i = this.FbDataInternal.defaultPassengersLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.defaultPassengers(
            t,
            new fb_component_1.VehiclePassengerConfig(),
          );
          this.ljl.push(
            FbVehiclePassengerConfig_1.FbVehiclePassengerConfig.Create(e),
          );
        }
    }
    return this.ljl;
  }
}
exports.FbVehicleComponent = FbVehicleComponent;
//# sourceMappingURL=FbVehicleComponent.js.map
