"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapComponent = void 0);
const PropertyMap_1 = require("../Container/PropertyMap"),
  MapLogger_1 = require("../Misc/MapLogger");
class MapComponent {
  constructor(t) {
    (this.Parent = t),
      (this.PropertyMap = new PropertyMap_1.PropertyMap()),
      (this.mYa = 0);
  }
  static GenComponentId() {
    return (MapComponent._Xe = MapComponent._Xe + 1), MapComponent._Xe;
  }
  get ComponentId() {
    return (
      0 === this.mYa && (this.mYa = MapComponent.GenComponentId()), this.mYa
    );
  }
  set ComponentId(t) {
    this.mYa = t;
  }
  get ParentEntity() {
    return this.Parent;
  }
  get Enable() {
    return this.PropertyMap.tryGet("Enable", !1);
  }
  set Enable(t) {
    this.PropertyMap.set("Enable", t),
      this.PropertyMap.isDirty("Enable") &&
        (t
          ? (this.dYa && ((this.dYa = !1), this.OnStart()), this.OnEnable())
          : this.OnDisable());
  }
  get dYa() {
    return this.PropertyMap.tryGet("FirstEnable", !0);
  }
  set dYa(t) {
    this.PropertyMap.set("FirstEnable", t);
  }
  get CYa() {
    return this.PropertyMap.tryGet("EnableTick", !1);
  }
  set CYa(t) {
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
  Init() {
    this.OnInit();
  }
  OnInit() {}
  Tick(t) {
    this.Enable && this.CYa && this.OnTick(t);
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
