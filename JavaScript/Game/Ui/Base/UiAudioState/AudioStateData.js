"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AudioStateData = void 0);
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
class AudioStateData {
  constructor() {
    (this.L_r = 0), (this.jGi = 0);
  }
  set Alpha(t) {
    this.L_r = t;
  }
  set Level(t) {
    this.jGi = t;
  }
  get Alpha() {
    return MathUtils_1.MathUtils.Clamp(this.L_r, 0, 1);
  }
  get Level() {
    return MathUtils_1.MathUtils.Clamp(this.jGi, 0, 1);
  }
}
exports.AudioStateData = AudioStateData;
//# sourceMappingURL=AudioStateData.js.map
