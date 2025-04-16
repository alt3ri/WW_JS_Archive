"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExitOrbitalCamera = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExitOrbitalCamera {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, r) {
    return (this.bb_pos = t), (this.bb = r), this;
  }
  static getRootAsExitOrbitalCamera(t, r) {
    return (r || new ExitOrbitalCamera()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsExitOrbitalCamera(t, r) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (r || new ExitOrbitalCamera()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  static startExitOrbitalCamera(t) {
    t.startObject(0);
  }
  static endExitOrbitalCamera(t) {
    return t.endObject();
  }
  static createExitOrbitalCamera(t) {
    return (
      ExitOrbitalCamera.startExitOrbitalCamera(t),
      ExitOrbitalCamera.endExitOrbitalCamera(t)
    );
  }
}
exports.ExitOrbitalCamera = ExitOrbitalCamera;
//# sourceMappingURL=exit-orbital-camera.js.map
