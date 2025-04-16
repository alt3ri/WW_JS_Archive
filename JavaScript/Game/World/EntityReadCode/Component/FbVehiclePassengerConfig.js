"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehiclePassengerConfig = void 0);
class FbVehiclePassengerConfig {
  constructor(s) {
    (this.FbDataInternal = s),
      (this._jl = !1),
      (this.cjl = 0),
      (this.hMh = !1),
      (this.lMh = 0);
  }
  static Create(s) {
    if (s) return new FbVehiclePassengerConfig(s);
  }
  get PassengerNpc() {
    return (
      this._jl ||
        ((this._jl = !0), (this.cjl = this.FbDataInternal.passengerNpc())),
      this.cjl
    );
  }
  get Seat() {
    return (
      this.hMh || ((this.hMh = !0), (this.lMh = this.FbDataInternal.seat())),
      this.lMh
    );
  }
}
exports.FbVehiclePassengerConfig = FbVehiclePassengerConfig;
//# sourceMappingURL=FbVehiclePassengerConfig.js.map
