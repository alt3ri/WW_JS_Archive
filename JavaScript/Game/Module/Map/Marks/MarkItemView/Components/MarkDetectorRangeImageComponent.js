"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkDetectorRangeImageComponent = void 0);
const UE = require("ue"),
  MarkComponent_1 = require("./MarkComponent");
class MarkDetectorRangeImageComponent extends MarkComponent_1.MarkComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  get RangeImage() {
    return this.GetTexture(0);
  }
}
exports.MarkDetectorRangeImageComponent = MarkDetectorRangeImageComponent;
//# sourceMappingURL=MarkDetectorRangeImageComponent.js.map
