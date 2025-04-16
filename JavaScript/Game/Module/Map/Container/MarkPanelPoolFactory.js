"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemViewPoolFactory = void 0);
const Time_1 = require("../../../../Core/Common/Time"),
  MAX_PANEL_HANDLE_CACHE_TIME = 1e4;
class MarkItemViewPoolFactory {
  static J2t(t) {
    let e = this.c8_.get(t);
    return e || ((e = new MarkPanelPool()), this.c8_.set(t, e)), e;
  }
  static Get(t) {
    return this.J2t(t).Get();
  }
  static Push(t, e) {
    this.J2t(t).Push(e);
  }
  static Recycle(t, e) {
    this.J2t(t).Recycle(e);
  }
  static Tick() {
    for (const t of this.c8_.values()) t.Tick();
  }
  static Dispose() {
    for (const t of this.c8_.values()) t.Dispose();
    this.c8_.clear();
  }
}
(exports.MarkItemViewPoolFactory = MarkItemViewPoolFactory).c8_ = new Map();
class MarkItemViewPoolBase {
  constructor() {
    this.Handles = [];
  }
  Get() {
    if (0 < this.Handles.length) return this.Handles.shift().Obj;
  }
  Push(t) {
    t = { RecycleTimeStamp: Time_1.Time.ServerTimeStamp, Obj: t };
    this.Handles.push(t);
  }
  Recycle(t) {
    t = { RecycleTimeStamp: Time_1.Time.ServerTimeStamp, Obj: t };
    this.Handles.push(t);
  }
  Tick() {
    this.OnTick();
  }
  OnTick() {}
  Dispose() {
    this.OnDispose();
  }
  OnDispose() {}
}
class MarkPanelPool extends MarkItemViewPoolBase {
  OnTick() {
    for (let t = this.Handles.length - 1; 0 <= t; --t) {
      var e = this.Handles[t];
      Time_1.Time.ServerTimeStamp - e.RecycleTimeStamp >
        MAX_PANEL_HANDLE_CACHE_TIME &&
        (e.Obj.RecycleToPool(), this.Handles.splice(t, 1));
    }
  }
  OnDispose() {
    for (const t of this.Handles) t.Obj.RecycleToPool();
    this.Handles.length = 0;
  }
}
//# sourceMappingURL=MarkPanelPoolFactory.js.map
