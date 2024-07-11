"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiSceneHandleData = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
class UiSceneHandleData {
  constructor() {
    (this.Cxo = void 0),
      (this.CustomPromise = new CustomPromise_1.CustomPromise());
  }
  SetSequence(e) {
    this.Cxo = e;
  }
  DestroyUiCameraSequence() {
    this.Cxo?.DestroyUiCameraSequence(), (this.Cxo = void 0);
  }
}
exports.UiSceneHandleData = UiSceneHandleData;
//# sourceMappingURL=UiSceneHandleData.js.map
