"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapComponent = void 0);
const PropertyMap_1 = require("../Container/PropertyMap"),
  MapLogger_1 = require("../Misc/MapLogger");
class MapComponent {
  constructor(t) {
    (this.Parent = t),
      (this.PropertyMap = new PropertyMap_1.PropertyMap()),
      (this.KQa = 0);
  }
  static GenComponentId() {
    return (MapComponent._Xe = MapComponent._Xe + 1), MapComponent._Xe;
  }
  get ComponentId() {
    return (
      0 === this.KQa && (this.KQa = MapComponent.GenComponentId()), this.KQa
    );
  }
  set ComponentId(t) {
    this.KQa = t;
  }
  get Enable() {
    return this.PropertyMap.tryGet("Enable", !1);
  }
  set Enable(t) {
    this.PropertyMap.set("Enable", t),
      this.PropertyMap.isDirty("Enable") &&
        (t
          ? (this.$Qa && ((this.$Qa = !1), this.OnStart()), this.OnEnable())
          : this.OnDisable());
  }
  get $Qa() {
    return this.PropertyMap.tryGet("FirstEnable", !0);
  }
  set $Qa(t) {
    this.PropertyMap.set("FirstEnable", t);
  }
  get XQa() {
    return this.PropertyMap.tryGet("EnableTick", !1);
  }
  set XQa(t) {
    this.PropertyMap.set("EnableTick", t);
  }
  Remove() {
    this.OnRemove();
  }
  OnRemove() {}
  Add() {
    this.OnAdd();
  }
  OnAdd() {}
  OnEnable() {}
  OnStart() {}
  OnDisable() {}
  Tick(t) {
    this.Enable && this.XQa && this.OnTick(t);
  }
  OnTick(t) {}
  Update() {
    this.Enable && this.OnUpdate();
  }
  OnUpdate() {}
  LogInfo(t, e, ...n) {
    MapLogger_1.MapLogger.Info(t, e, ...n);
  }
  LogWarn(t, e, ...n) {
    MapLogger_1.MapLogger.Warn(t, e, ...n);
  }
  LogError(t, e, ...n) {
    MapLogger_1.MapLogger.Error(t, e, ...n);
  }
}
(exports.MapComponent = MapComponent)._Xe = 0;
//# sourceMappingURL=MapComponent.js.map
