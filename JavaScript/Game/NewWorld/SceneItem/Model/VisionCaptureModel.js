"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionCaptureModel = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class VisionCaptureModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.jsr = void 0);
  }
  OnInit() {
    return (this.jsr = new Map()), !0;
  }
  AddVisionCapture(e, o) {
    this.jsr.has(e) &&
      Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "SceneGameplay",
        7,
        "[VisionCaptureModel]重复添加收服声骸",
        ["Capture Owner ID:", e],
      ),
      this.jsr.set(e, o);
  }
  RemoveVisionCapture(e) {
    this.jsr.delete(e);
  }
  GetVisionCapture(e) {
    return this.jsr.get(e);
  }
  OnClear() {
    return !(this.jsr = void 0);
  }
}
exports.VisionCaptureModel = VisionCaptureModel;
//# sourceMappingURL=VisionCaptureModel.js.map
