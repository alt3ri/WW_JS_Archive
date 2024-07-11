"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneComponentPool = void 0);
const MeshComponentUtils_1 = require("./MeshComponentUtils");
class SceneComponentPool {
  constructor() {
    (this.iJo = new Array()),
      (this.oJo = new Array()),
      (this.AttachComponentInternal = void 0),
      (this.ActorInternal = void 0),
      (this.MaxPoolSize = 0);
  }
  ActiveComponent(t) {}
  CleanComponent(t) {}
  CreateComponent() {}
  GetComponents(t, i = !0, e = !1) {
    t = t > this.MaxPoolSize ? this.MaxPoolSize : t;
    let h = i ? 0 : t;
    var o = new Array();
    if (i) {
      let s = t;
      i = this.oJo.length;
      if (i < t) (s = i), (h = t - i);
      else {
        var r = i - t;
        for (let t = 0; t < r; ++t) {
          var n = this.oJo.pop();
          this.BasePoolPush(n);
        }
      }
      for (let t = 0; t < s; ++t)
        this.PoolPushInternal(this.oJo[t], o, !1),
          e && this.CleanComponent(this.oJo[t]);
    }
    if (0 < h) {
      let s = 0;
      i = this.iJo.length;
      h > i && ((s = h - i), (h = i));
      for (let t = 0; t < h; ++t) {
        var l = this.iJo.pop();
        this.PoolPushInternal(l, o, !1), this.UsedPoolPush(l);
      }
      for (let t = 0; t < s; ++t) {
        var a = this.CreateComponent();
        this.PoolPushInternal(a, o, !1), this.UsedPoolPush(a);
      }
    }
    for (const s of o) this.ActiveComponent(s);
    return o;
  }
  BackComponent(t) {
    let s = !0;
    for (const e of t) {
      var i;
      this.oJo.concat(e)
        ? ((i = this.oJo.indexOf(e)), this.iJo.push(e), this.oJo.slice(i, 1))
        : (s = !1);
    }
    return s;
  }
  Init(t, s, i, e, h = !1, o = !1) {
    if (s && i && 0 < t) {
      (this.ActorInternal = i),
        (this.MaxPoolSize = t),
        (this.AttachComponentInternal = s);
      var i = e.length,
        r = t < i ? t : i;
      for (let t = 0; t < r; ++t) {
        var n = e[t];
        if (
          (MeshComponentUtils_1.MeshComponentUtils.RelativeAttachComponentOnSafe(
            n,
            this.AttachComponentInternal,
          ),
          this.iJo.push(),
          !this.PoolPush(n, h, o))
        )
          break;
      }
    }
  }
  CheckPoolRange() {
    return this.iJo.length + this.oJo.length < this.MaxPoolSize;
  }
  PoolPush(t, s = !1, i = !0) {
    return (
      !!this.CheckPoolRange() &&
      (s ? this.BasePoolPush(t, i) : this.UsedPoolPush(t, i), !0)
    );
  }
  BasePoolPush(t, s = !0) {
    this.PoolPushInternal(t, this.iJo, s);
  }
  UsedPoolPush(t, s = !1) {
    this.PoolPushInternal(t, this.oJo, s);
  }
  PoolPushInternal(t, s, i = !0) {
    s.push(t), i && this.CleanComponent(t);
  }
  Shrink() {
    for (const t of this.iJo) t.K2_DestroyComponent(this.ActorInternal);
    this.iJo.splice(0, this.iJo.length);
  }
  GetUsedLength() {
    return this.oJo.length;
  }
}
exports.SceneComponentPool = SceneComponentPool;
//# sourceMappingURL=SceneComponentPool.js.map
