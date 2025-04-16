"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkResourceComponent = void 0);
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  MapComponent_1 = require("../../Base/MapComponent");
class MarkResourceComponent extends MapComponent_1.MapComponent {
  get ComponentType() {
    return 11;
  }
  set TopRightIconPath(t) {
    this.PropertyMap.set(0, t);
  }
  get TopRightIconPath() {
    return this.PropertyMap.tryGet(0, "");
  }
  set RangeSize(t) {
    this.PropertyMap.set(2, t);
  }
  get RangeSize() {
    return this.PropertyMap.tryGet(2, 0);
  }
  set RangeSetAsFirstChild(t) {
    this.PropertyMap.set(6, t);
  }
  get RangeSetAsFirstChild() {
    return this.PropertyMap.tryGet(6, !1);
  }
  set OutOfBoundDirection(t) {
    this.PropertyMap.set(3, t);
  }
  get OutOfBoundDirection() {
    return (
      this.PropertyMap.tryGet(3, void 0, !1) ?? Vector2D_1.Vector2D.ZeroVector
    );
  }
  get IsOutOfBoundDirectionDirty() {
    return this.PropertyMap.isDirty(3);
  }
  SetOutOfBoundDirectionClean() {
    this.PropertyMap.cleanDirty(3);
  }
  set ChildIconPath(t) {
    this.PropertyMap.set(4, t);
  }
  get ChildIconPath() {
    return this.PropertyMap.tryGet(4, "", !1);
  }
  get IsChildIconPathDirty() {
    return this.PropertyMap.isDirty(4);
  }
  SetChildIconPathClean() {
    this.PropertyMap.cleanDirty(4);
  }
}
exports.MarkResourceComponent = MarkResourceComponent;
//# sourceMappingURL=MarkResourceComponent.js.map
