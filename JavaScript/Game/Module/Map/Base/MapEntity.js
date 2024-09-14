"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapEntity = void 0);
const PropertyMap_1 = require("../Container/PropertyMap"),
  MapComponentContainer_1 = require("./MapComponentContainer");
class MapEntity {
  constructor() {
    (this.MapComponentContainer =
      new MapComponentContainer_1.MapComponentContainer()),
      (this.PropertyMap = new PropertyMap_1.PropertyMap());
  }
  Init() {
    this.OnInit();
  }
  Tick(t) {
    this.MapComponentContainer.Tick(t), this.OnTick();
  }
  Update() {
    this.MapComponentContainer.Update(), this.OnUpdate();
  }
  Dispose() {
    this.MapComponentContainer.RemoveAll(), this.OnDispose();
  }
  OnInit() {}
  OnUpdate() {}
  OnTick() {}
  OnDispose() {}
  AddComponent(t) {
    return this.MapComponentContainer.AddComponent(t, this);
  }
  GetComponent(t) {
    return this.MapComponentContainer.GetComponent(t);
  }
  RemoveComponent(t) {
    this.MapComponentContainer.RemoveComponent(t);
  }
}
exports.MapEntity = MapEntity;
//# sourceMappingURL=MapEntity.js.map
