"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationCursorModule = void 0);
const UE = require("ue");
class UiNavigationCursorModule {
  constructor(t) {
    (this.Lwo = void 0), (this.Lwo = t);
  }
  GetCursorOffset() {
    return this.Lwo.OffsetType === 0
      ? new UE.Vector2D(0, 0.5)
      : this.Lwo.OffsetType === 1
        ? new UE.Vector2D(0.5, 1)
        : this.Lwo.OffsetType === 2
          ? new UE.Vector2D(1, 0.5)
          : this.Lwo.OffsetType === 3
            ? new UE.Vector2D(0.5, 0)
            : new UE.Vector2D(0, 0);
  }
  GetBoundOffset() {
    return this.Lwo.OffsetType === 0
      ? new UE.Vector2D(-this.Lwo.BoundOffset, 0)
      : this.Lwo.OffsetType === 1
        ? new UE.Vector2D(0, this.Lwo.BoundOffset)
        : this.Lwo.OffsetType === 2
          ? new UE.Vector2D(this.Lwo.BoundOffset, 0)
          : this.Lwo.OffsetType === 3
            ? new UE.Vector2D(0, -this.Lwo.BoundOffset)
            : new UE.Vector2D(0, 0);
  }
}
exports.UiNavigationCursorModule = UiNavigationCursorModule;
// # sourceMappingURL=UiNavigationCursorModule.js.map
