"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationCursorModule = void 0);
const UE = require("ue");
class UiNavigationCursorModule {
  constructor(t) {
    (this.yBo = void 0), (this.yBo = t);
  }
  GetCursorOffset() {
    return 0 === this.yBo.OffsetType
      ? new UE.Vector2D(0, 0.5)
      : 1 === this.yBo.OffsetType
        ? new UE.Vector2D(0.5, 1)
        : 2 === this.yBo.OffsetType
          ? new UE.Vector2D(1, 0.5)
          : 3 === this.yBo.OffsetType
            ? new UE.Vector2D(0.5, 0)
            : new UE.Vector2D(0, 0);
  }
  GetBoundOffset() {
    return 0 === this.yBo.OffsetType
      ? new UE.Vector2D(-this.yBo.BoundOffset, 0)
      : 1 === this.yBo.OffsetType
        ? new UE.Vector2D(0, this.yBo.BoundOffset)
        : 2 === this.yBo.OffsetType
          ? new UE.Vector2D(this.yBo.BoundOffset, 0)
          : 3 === this.yBo.OffsetType
            ? new UE.Vector2D(0, -this.yBo.BoundOffset)
            : new UE.Vector2D(0, 0);
  }
}
exports.UiNavigationCursorModule = UiNavigationCursorModule;
//# sourceMappingURL=UiNavigationCursorModule.js.map
