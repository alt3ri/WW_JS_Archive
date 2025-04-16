"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFloorSettings = void 0);
const FbVector2_1 = require("../Var/FbVector2");
class FbFloorSettings {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Q0h = !1),
      (this.K0h = void 0),
      (this.$0h = !1),
      (this.X0h = void 0),
      (this.Rph = !1),
      (this.wph = void 0),
      (this.Y0h = !1),
      (this.z0h = 0),
      (this.J0h = !1),
      (this.Z0h = 0);
  }
  static Create(t) {
    if (t) return new FbFloorSettings(t);
  }
  get MeshPath() {
    return (
      this.Q0h ||
        ((this.Q0h = !0), (this.K0h = this.FbDataInternal.meshPath())),
      this.K0h
    );
  }
  get MaterialPath() {
    return (
      this.$0h ||
        ((this.$0h = !0), (this.X0h = this.FbDataInternal.materialPath())),
      this.X0h
    );
  }
  get Scale() {
    return (
      this.Rph ||
        ((this.Rph = !0),
        (this.wph = FbVector2_1.FbVector2.Create(this.FbDataInternal.scale()))),
      this.wph
    );
  }
  get ShowTime() {
    return (
      this.Y0h ||
        ((this.Y0h = !0), (this.z0h = this.FbDataInternal.showTime())),
      this.z0h
    );
  }
  get DisappearTime() {
    return (
      this.J0h ||
        ((this.J0h = !0), (this.Z0h = this.FbDataInternal.disappearTime())),
      this.Z0h
    );
  }
}
exports.FbFloorSettings = FbFloorSettings;
//# sourceMappingURL=FbFloorSettings.js.map
