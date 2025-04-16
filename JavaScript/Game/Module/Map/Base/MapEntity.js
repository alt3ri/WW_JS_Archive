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
    this.OnInit(), this.MapComponentContainer.Init();
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
  GetOrAddComponent(t) {
    var e = this.GetComponent(t);
    return e || this.AddComponent(t);
  }
  EnsureComponent(t) {
    this.GetOrAddComponent(t);
  }
  RemoveComponent(t) {
    this.MapComponentContainer.RemoveComponent(t);
  }
  ReloadComponent(t) {
    this.RemoveComponent(t), this.AddComponent(t);
  }
}
exports.MapEntity = MapEntity;
//# sourceMappingURL=MapEntity.js.map
