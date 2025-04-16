"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Event = void 0);
const Log_1 = require("../Common/Log"),
  Stats_1 = require("../Common/Stats"),
  Macro_1 = require("../Preprocessor/Macro"),
  DEFAULT_SMALL_NAME_THRESHOLD = 4096;
class Event {
  constructor(t, e = DEFAULT_SMALL_NAME_THRESHOLD) {
    (this.rK = t),
      (this.RF_ = e),
      (this.nK = new Map()),
      (this.IHl = new Map()),
      (this.sK = void 0),
      (this.aK = void 0),
      (this.AF_ = void 0),
      (this.PF_ = new Set()),
      (this.unh = new Map()),
      (this.AF_ = new Int8Array(Math.ceil(this.RF_)));
  }
  cnh(t, e, i, n) {
    let r = n.get(t);
    r || ((r = new Map()), n.set(t, r)), r.set(i, e);
  }
  mnh(t, e, i) {
    var n = i.get(t);
    n && (n.delete(e), 0 === n.size) && i.delete(t);
  }
  dnh(t, e, i) {
    i = i.get(t);
    if (i) return i.get(e);
  }
  AddHoldKeyHandle(t, e, i) {
    this.cnh(t, i, e, this.unh);
  }
  RemoveHoldKeyHandle(t, e) {
    this.mnh(t, e, this.unh);
  }
  GetHoldKeyByHandle(t, e) {
    return this.dnh(t, e, this.unh);
  }
  Has(t, e) {
    var i,
      e = Event.lK.get(e);
    return (
      !!e &&
      ((i = this.nK.get(t)) && i.has(e)
        ? !(i = this._K.get(t)) || !i.has(e)
        : void 0 !== (i = this.uK.get(t)) && i.has(e))
    );
  }
  Add(t, e) {
    return this.YW(t, e, 0);
  }
  Once(t, e) {
    return this.YW(t, e, 1);
  }
  Remove(t, e) {
    e = Event.lK.get(e);
    return !!e && this.O7(t, e);
  }
  ClearObject(t) {
    var e = this.nK.get(t);
    if (e) for (const i of e.keys()) this.O7(t, i);
    return !0;
  }
  Emit(i, ...n) {
    if (this.cK(i))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Event",
            1,
            "事件重复派发，请检查事件链是否产生循环调用",
            ["name", this.rK[i]],
            [
              "emittingEventInArray",
              [...this.AF_.entries()]
                .filter((t) => 0 !== t[1])
                .map((t) => t[0]),
            ],
            ["emittingEventInSet", this.PF_],
          ),
        !1
      );
    this.mK(i, !0);
    var r = this.nK.get(i);
    if (r) {
      let t = void 0;
      !Stats_1.Stat.Enable ||
        ((o = this.rK[i]), (t = Event.dK.get(o))) ||
        ((t = Stats_1.Stat.CreateNoFlameGraph("Event." + this.rK[i])),
        Event.dK.set(o, t)),
        t?.Start();
      let e = void 0;
      for (const v of r) {
        var s = v[0],
          h = s.deref();
        if (h) {
          if (!(e = e || this._K.get(i)) || !e.has(s)) {
            1 === v[1] && this.O7(i, s);
            var a = Event.CK.get(h);
            a?.Start();
            try {
              h(...n);
            } catch (t) {
              t instanceof Error
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.ErrorWithStack(
                    "Event",
                    1,
                    "事件处理方法执行异常",
                    t,
                    ["name", this.rK[i]],
                    ["error", t.message],
                  )
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Event",
                    1,
                    "事件处理方法执行异常",
                    ["name", this.rK[i]],
                    ["error", t],
                  );
            }
            a?.Stop();
          }
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Event",
              1,
              "事件处理方法已被回收",
              ["eventName", this.rK[i]],
              ["stack", void 0],
            ),
            r.delete(s),
            0 === r.size && this.nK.delete(i);
      }
      t?.Stop();
    }
    this.mK(i, !1);
    var o = this._K.get(i);
    if (o) {
      for (const t of o.values()) this.gK(i, t);
      o.clear(), this._K.delete(i);
    }
    o = this.uK.get(i);
    if (o) {
      for (const e of o) this.fK(i, e[0], e[1]);
      o.clear(), this.uK.delete(i);
    }
    return !0;
  }
  YW(t, e, i) {
    if (void 0 === this.rK[t])
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Event", 1, "事件名不存在，请检查事件名是否正确", [
            "name",
            t,
          ]),
        !1
      );
    let n = Event.lK.get(e);
    if (
      (n || ((n = new WeakRef(e)), Event.lK.set(e, n)),
      Stats_1.Stat.Enable &&
        !Event.CK.has(e) &&
        ((r = e.name),
        Event.CK.set(
          e,
          r && 0 < r.length
            ? Stats_1.Stat.CreateNoFlameGraph("EventHandle." + r)
            : void 0,
        )),
      !this.cK(t))
    )
      return this.fK(t, n, i);
    var e = this.nK.get(t),
      r = this._K.get(t);
    if (e && e.has(n))
      return r && r.has(n)
        ? (r.delete(n), !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Event",
              1,
              "事件已存在，请检查同一个事件名同一个处理函数的注册逻辑",
              ["name", this.rK[t]],
            ),
          !1);
    let s = this.uK.get(t);
    return s && s.has(n)
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Event",
            1,
            "事件重复注册在待修改列表，请检查同一个事件名同一个处理函数的注册逻辑",
            ["name", this.rK[t]],
          ),
        !1)
      : (s || ((s = new Map()), this.uK.set(t, s)), s.set(n, i), !0);
  }
  fK(t, e, i) {
    let n = this.nK.get(t);
    if (n) {
      if (n.has(e))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Event",
              1,
              "事件重复注册，请检查同一个事件名同一个处理函数的注册逻辑",
              ["name", this.rK[t]],
            ),
          !1
        );
    } else (n = new Map()), this.nK.set(t, n);
    return n.set(e, i), !0;
  }
  O7(t, e) {
    if (!this.cK(t)) return this.gK(t, e);
    var i = this.nK.get(t),
      n = this.uK.get(t);
    if (!i || !i.has(e))
      return n && n.has(e)
        ? (n.delete(e), !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Event",
              1,
              "事件不存在，请检查同一个事件名同一个处理函数的移除逻辑",
              ["name", this.rK[t]],
            ),
          !1);
    let r = this._K.get(t);
    return r && r.has(e)
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Event",
            1,
            "事件重复移除在待移除列表，请检查同一个事件名同一个处理函数的移除逻辑",
            ["name", this.rK[t]],
          ),
        !1)
      : (r || ((r = new Set()), this._K.set(t, r)), r.add(e), !0);
  }
  gK(t, e) {
    var i = this.nK.get(t);
    return i && i.delete(e)
      ? (0 === i.size && this.nK.delete(t), !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Event",
            1,
            "事件不存在，请检查同一个事件名同一个处理函数的移除逻辑",
            ["name", this.rK[t]],
          ),
        !1);
  }
  cK(t) {
    return t >= this.RF_ || t < 0 ? this.xF_(t) : 0 !== this.AF_[t];
  }
  xF_(t) {
    return this.PF_.has(t);
  }
  mK(t, e) {
    t >= this.RF_ || t < 0 ? this.UF_(t, e) : (this.AF_[t] = e ? 1 : 0);
  }
  UF_(t, e) {
    e ? this.PF_.add(t) : this.PF_.delete(t);
  }
  get uK() {
    return this.sK || (this.sK = new Map()), this.sK;
  }
  get _K() {
    return this.aK || (this.aK = new Map()), this.aK;
  }
}
((exports.Event = Event).lK = new WeakMap()),
  (Event.dK = new Map()),
  (Event.CK = new WeakMap());
//# sourceMappingURL=Event.js.map
