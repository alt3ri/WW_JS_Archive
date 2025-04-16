"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkConfigComponent = void 0);
const MapComponent_1 = require("../../Base/MapComponent");
class MarkConfigComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments),
      (this.MapMarkConfig = void 0),
      (this.DynamicConfig = void 0),
      (this.TreasureBoxDetectorMarkConfig = void 0);
  }
  get ComponentType() {
    return 15;
  }
  get Config() {
    return (
      this.MapMarkConfig ??
      this.DynamicConfig ??
      this.TreasureBoxDetectorMarkConfig
    );
  }
}
exports.MarkConfigComponent = MarkConfigComponent;
//# sourceMappingURL=MarkConfigComponent.js.map
