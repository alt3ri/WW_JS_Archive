"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkViewLifeCircleComponent = void 0);
const MapComponent_1 = require("../../Base/MapComponent"),
  PropertyMap_1 = require("../../Container/PropertyMap");
class MarkViewLifeCircleComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments),
      (this.ChildViewVisibleStateMap = new PropertyMap_1.PropertyMap());
  }
  get ComponentType() {
    return 12;
  }
  SetChildViewVisibility(e, t) {
    this.ChildViewVisibleStateMap.set(e, t);
  }
  IsChildViewVisible(e, t = !1) {
    return this.ChildViewVisibleStateMap.tryGet(e, t, !1);
  }
  SetChildViewVisibleClean(e) {
    this.ChildViewVisibleStateMap.cleanDirty(e);
  }
  IsChildViewStateDirty(e) {
    return this.ChildViewVisibleStateMap.isDirty(e);
  }
  SetAllChildViewStateDirty() {
    this.ChildViewVisibleStateMap.setAllDirty();
  }
  OnRemove() {
    this.ChildViewVisibleStateMap.clear();
  }
  set EnableVerticalPointer(e) {
    this.PropertyMap.set(0, e);
  }
  get EnableVerticalPointer() {
    return this.PropertyMap.tryGet(0, !0);
  }
  set VerticalPointerType(e) {
    this.PropertyMap.set(1, e);
  }
  get VerticalPointerType() {
    return this.PropertyMap.tryGet(1, 0);
  }
  set IsInAoiRange(e) {
    this.PropertyMap.set(2, e);
  }
  get IsInAoiRange() {
    return this.PropertyMap.tryGet(2, !1);
  }
  set IsSelected(e) {
    this.PropertyMap.set(3, e);
  }
  get IsSelected() {
    return this.PropertyMap.tryGet(3, !1);
  }
  get IsSelectedDirty() {
    return this.PropertyMap.isDirty(3);
  }
  set IsTracked(e) {
    this.PropertyMap.set(4, e);
  }
  get IsTracked() {
    return this.PropertyMap.tryGet(4, !1);
  }
  get IsTrackedDirty() {
    return this.PropertyMap.isDirty(4);
  }
}
exports.MarkViewLifeCircleComponent = MarkViewLifeCircleComponent;
//# sourceMappingURL=MarkViewLifeCircleComponent.js.map
