"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInteractAudioComponent = void 0);
const FbAudioEventConfig_1 = require("./FbAudioEventConfig");
class FbInteractAudioComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.V5h = !1),
      (this.j5h = void 0),
      (this.H5h = !1),
      (this.W5h = void 0);
  }
  static Create(t) {
    if (t) return new FbInteractAudioComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get CollisionMaterial() {
    return (
      this.V5h ||
        ((this.V5h = !0), (this.j5h = this.FbDataInternal.collisionMaterial())),
      this.j5h
    );
  }
  get InteractEventConfig() {
    return (
      this.H5h ||
        ((this.H5h = !0),
        (this.W5h = FbAudioEventConfig_1.FbAudioEventConfig.Create(
          this.FbDataInternal.interactEventConfig(),
        ))),
      this.W5h
    );
  }
}
exports.FbInteractAudioComponent = FbInteractAudioComponent;
//# sourceMappingURL=FbInteractAudioComponent.js.map
