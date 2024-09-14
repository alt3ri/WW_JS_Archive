"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapComponentContainer = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  MapBaseDefine_1 = require("./MapBaseDefine");
class MapComponentContainer {
  constructor() {
    (this.YQa = new Map()), (this.zQa = new Map());
  }
  AddComponent(e, t) {
    var o = MapBaseDefine_1.mapComponentRegisterInfo.get(e);
    if (void 0 !== o) return (o = new o(t ?? this)), this.YW(e, o), o;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Map",
        64,
        "[世界地图]MapComponentContainer.Add->构造组件失败, 请检查类型是否已经注册到MapBaseDefine.mapComponentRegisterInfo中",
        ["componentType", e],
      );
  }
  YW(e, t) {
    var o = t.ComponentId;
    return this.YQa.has(o)
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Map",
            64,
            "[世界地图]MapComponentContainer.AddInternal->添加组件失败，重复组件Id",
            ["componentId", o],
          ),
        !1)
      : (this.YQa.set(o, t),
        this.zQa.has(e) || this.zQa.set(e, []),
        this.zQa.get(e).push(t),
        t.Add(),
        (t.Enable = !0));
  }
  GetComponent(e) {
    e = this.GetAllGeneric(e);
    if (void 0 !== e) return e[0];
  }
  GetComponentById(e) {
    if (this.YQa.has(e)) return this.YQa.get(e);
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "Map",
        64,
        "[世界地图]MapComponentContainer.GetById->获取组件失败，不存在该组件Id",
        ["componentId", e],
      );
  }
  GetComponentByFilter(e, t) {
    e = this.GetAllGeneric(e);
    if (e) for (const o of e) if (t(o)) return o;
  }
  GetAllGeneric(e) {
    e = this.GetAll(e);
    if (void 0 !== e) return e;
  }
  GetAll(e) {
    if (this.zQa.has(e)) {
      var t = this.zQa.get(e);
      if (!(t.length <= 0) || this.zQa.has(e)) return t;
    }
    Log_1.Log.CheckWarn() &&
      Log_1.Log.Warn(
        "Map",
        64,
        "[世界地图]MapComponentContainer.Get->获取组件失败，不存在该类型组件",
        ["componentType", e],
      );
  }
  RemoveComponent(e) {
    var t = this.GetAll(e);
    if (void 0 !== t)
      for (let e = t.length - 1; 0 <= e; --e) {
        var o = t[e],
          n = o.ComponentId;
        this.YQa.delete(n), t.splice(e, 1), (o.Enable = !1), o.Remove();
      }
  }
  RemoveById(e) {
    var t,
      o = this.YQa.get(e);
    void 0 !== o &&
      (this.YQa.delete(e),
      (e = o.ComponentType),
      (t = (e = this.GetAll(e)).indexOf(o)),
      e.splice(t, 1),
      (o.Enable = !1),
      o.Remove());
  }
  RemoveAll() {
    for (var [, e] of this.YQa) (e.Enable = !1), e.Remove();
    this.YQa.clear(), this.zQa.clear();
  }
  Tick(e) {
    for (var [, t] of this.YQa) t.Tick(e);
  }
  Update() {
    for (var [, e] of this.YQa) e.Update();
  }
}
exports.MapComponentContainer = MapComponentContainer;
//# sourceMappingURL=MapComponentContainer.js.map
