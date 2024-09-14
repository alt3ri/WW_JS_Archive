"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapMultiFloorComponent = void 0);
const MapComponent_1 = require("../../Map/Base/MapComponent");
class WorldMapMultiFloorComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments),
      (this.MultiMapFloorContainerUiActive = !1),
      (this.MultiMapFloorLayout = void 0),
      (this.UpdateMultiMapPromise = void 0),
      (this.IsShowMultiMap = !1),
      (this.ShowMultiMapGroupId = 0),
      (this.MultiMapFloorContainer = void 0);
  }
  get ComponentType() {
    return 6;
  }
}
exports.WorldMapMultiFloorComponent = WorldMapMultiFloorComponent;
//# sourceMappingURL=WorldMapMultiFloorComponent.js.map
