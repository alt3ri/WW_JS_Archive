"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Event = void 0);
const Log_1 = require("../Common/Log"),
  Stats_1 = require("../Common/Stats");
class Event {
  constructor(t) {
    (this.rK = t),
      (this.nK = new Map()),
      (this.sK = void 0),
      (this.aK = void 0),
      (this.hK = new Array()),
      (this.wJa = new Map());
  }
  BJa(t, e, i, n) {
    let s = n.get(t);
    s || ((s = new Map()), n.set(t, s)), s.set(i, e);
  }
  bJa(t, e, i) {
    var n = i.get(t);
    n && (n.delete(e), 0 === n.size) && i.delete(t);
  }
  qJa(t, e, i) {
    i = i.get(t);
    if (i) return i.get(e);
  }
  AddHoldKeyHandle(t, e, i) {
    this.BJa(t, i, e, this.wJa);
  }
  RemoveHoldKeyHandle(t, e) {
    this.bJa(t, e, this.wJa);
  }
  GetHoldKeyByHandle(t, e) {
    return this.qJa(t, e, this.wJa);
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
  Emit(i, ...n) {
    if (this.cK(i))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Event",
            1,
            "事件重复派发，请检查事件链是否产生循环调用",
            ["name", this.rK[i]],
            ["emitting", this.hK],
          ),
        !1
      );
    this.mK(i, !0);
    var s = this.nK.get(i);
    if (s) {
      let t = void 0;
      !Stats_1.Stat.Enable ||
        ((o = this.rK[i]), (t = Event.dK.get(o))) ||
        ((t = Stats_1.Stat.Create("Event." + this.rK[i])), Event.dK.set(o, t)),
        t?.Start();
      let e = void 0;
      for (const v of s) {
        var r = v[0],
          h = r.deref();
        if (h) {
          if (!(e = e || this._K.get(i)) || !e.has(r)) {
            1 === v[1] && this.O7(i, r);
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
            Log_1.Log.Error("Event", 1, "事件处理方法已被回收", [
              "name",
              this.rK[i],
            ]),
            s.delete(r),
            0 === s.size && this.nK.delete(i);
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
        ((s = e.name),
        Event.CK.set(
          e,
          s && 0 < s.length ? Stats_1.Stat.Create("EventHandle." + s) : void 0,
        )),
      !this.cK(t))
    )
      return this.fK(t, n, i);
    var e = this.nK.get(t),
      s = this._K.get(t);
    if (e && e.has(n))
      return s && s.has(n)
        ? (s.delete(n), !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Event",
              1,
              "事件已存在，请检查同一个事件名同一个处理函数的注册逻辑",
              ["name", this.rK[t]],
            ),
          !1);
    let r = this.uK.get(t);
    return r && r.has(n)
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Event",
            1,
            "事件重复注册在待修改列表，请检查同一个事件名同一个处理函数的注册逻辑",
            ["name", this.rK[t]],
          ),
        !1)
      : (r || ((r = new Map()), this.uK.set(t, r)), r.set(n, i), !0);
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
    let s = this._K.get(t);
    return s && s.has(e)
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Event",
            1,
            "事件重复移除在待移除列表，请检查同一个事件名同一个处理函数的移除逻辑",
            ["name", this.rK[t]],
          ),
        !1)
      : (s || ((s = new Set()), this._K.set(t, s)), s.add(e), !0);
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
    var e = Math.floor(t / 32);
    return e < this.hK.length && !!(this.hK[e] & (1 << t % 32));
  }
  mK(t, e) {
    for (var i = Math.floor(t / 32), t = t % 32; this.hK.length < i; )
      this.hK.push(0);
    this.hK.length === i
      ? this.hK.push(e ? 1 << t : 0)
      : e
        ? (this.hK[i] |= 1 << t)
        : (this.hK[i] &= ~(1 << t));
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
