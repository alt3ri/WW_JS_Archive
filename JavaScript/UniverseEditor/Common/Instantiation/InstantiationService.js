"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Trace = exports.InstantiationService = void 0);
const Async_1 = require("../Misc/Async"),
  LifeCycle_1 = require("../Misc/LifeCycle"),
  LinkedList_1 = require("../Misc/LinkedList"),
  Log_1 = require("../Misc/Log"),
  Service_1 = require("../Service"),
  Graph_1 = require("./Graph"),
  Instantiation_1 = require("./Instantiation"),
  Interface_1 = require("./Interface"),
  ServiceCollection_1 = require("./ServiceCollection"),
  ENABLE_ALL_TRACING = !1;
class CyclicDependencyError extends Error {
  constructor(e) {
    super("cyclic dependency between services"),
      (this.Graph = e),
      (this.message = e.FindCycleSlow()
        ? `UNABLE to detect cycle, dumping graph: 
` + e.ToString()
        : "");
  }
}
class InstantiationService {
  constructor(
    e = new ServiceCollection_1.ServiceCollection(),
    t,
    r = ENABLE_ALL_TRACING,
  ) {
    (this.vAa = e),
      (this.MAa = t),
      (this.SAa = r),
      (this.EAa = new Set()),
      this.vAa.Set(Service_1.IInstantiationService, this),
      (this.yAa = r ? (t ? t.yAa : new Graph_1.Graph((e) => e)) : void 0);
  }
  MakeCompileHappy() {}
  CreateChild(e) {
    return new InstantiationService(e, this, this.SAa);
  }
  CreateInstance(e, ...t) {
    let r = void 0,
      n = void 0;
    return (
      (n =
        e instanceof Interface_1.SyncDescriptor
          ? ((r = Trace.TraceCreation(this.SAa, e.Ctor)),
            this.IAa(e.Ctor, e.StaticArguments.concat(t), r))
          : ((r = Trace.TraceCreation(this.SAa, e)), this.IAa(e, t, r))),
      r.Stop(),
      n
    );
  }
  IAa(e, t, r) {
    var n = (0, Instantiation_1.getServiceDependencies)(e).sort(
        (e, t) => e.Index - t.Index,
      ),
      i = [];
    for (const o of n) {
      var s = this.TAa(o.Id, r);
      if (!s)
        throw new Error(
          `[createInstance] ${e.name} depends on UNKNOWN service ${o.Id}.`,
        );
      i.push(s);
    }
    var c,
      n = 0 < n.length ? n[0].Index : t.length;
    let a = t;
    return (
      t.length !== n &&
        ((0, Log_1.error)(
          `[createInstance] First service dependency of ${e.name} at position ${n + 1} conflicts with ${t.length} static arguments`,
        ),
        (c = n - t.length),
        (a = 0 < c ? t.concat(new Array(c)) : t.slice(0, n))),
      Reflect.construct(e, a.concat(i))
    );
  }
  LAa(e, t) {
    if (this.vAa.Get(e) instanceof Interface_1.SyncDescriptor)
      this.vAa.Set(e, t);
    else {
      if (!this.MAa)
        throw new Error("illegalState - setting UNKNOWN service instance " + e);
      this.MAa.LAa(e, t);
    }
  }
  DAa(e) {
    var t = this.vAa.Get(e);
    return !t && this.MAa ? this.MAa.DAa(e) : t;
  }
  TAa(e, t) {
    this.yAa &&
      this._private_GlobalGraphImplicitDependency &&
      this.yAa.InsertEdge(
        this._private_GlobalGraphImplicitDependency,
        String(e),
      );
    var r = this.DAa(e);
    return r instanceof Interface_1.SyncDescriptor
      ? this.AAa(e, r, t.Branch(e, !0))
      : (t.Branch(e, !1), r);
  }
  AAa(e, t, r) {
    if (this.EAa.has(e))
      throw new Error(
        "illegalState - cyclic dependency between services: " + e,
      );
    this.EAa.add(e);
    try {
      return this.RAa(e, t, r);
    } finally {
      this.EAa.delete(e);
    }
  }
  RAa(e, t, r) {
    var n = new Graph_1.Graph((e) => e.Id.toString());
    let i = 0;
    for (var s = [{ Id: e, Desc: t, Trace: r }]; s.length; ) {
      var c = s.pop();
      if ((n.LookupOrInsertNode(c), 1e3 < i++))
        throw new CyclicDependencyError(n);
      for (const f of (0, Instantiation_1.getServiceDependencies)(
        c.Desc.Ctor,
      )) {
        var a = this.DAa(f.Id);
        if (!a) throw new Error(`unresolved dependency '${f.Id}'`);
        this.yAa?.InsertEdge(String(c.Id), String(f.Id)),
          a instanceof Interface_1.SyncDescriptor &&
            ((a = { Id: f.Id, Desc: a, Trace: c.Trace.Branch(f.Id, !0) }),
            n.InsertEdge(c, a),
            s.push(a));
      }
    }
    for (;;) {
      var o = n.Leaves();
      if (0 === o.length) {
        if (n.IsEmpty()) break;
        throw new CyclicDependencyError(n);
      }
      for (const l of o) {
        var h,
          v = l.Data;
        this.DAa(v.Id) instanceof Interface_1.SyncDescriptor &&
          ((h = this.UAa(
            v.Id,
            v.Desc.Ctor,
            v.Desc.StaticArguments,
            v.Desc.SupportsDelayedInstantiation,
            v.Trace,
          )),
          this.LAa(v.Id, h)),
          n.RemoveNode(v);
      }
    }
    return this.DAa(e);
  }
  UAa(e, t, r, n, i) {
    if (this.vAa.Get(e) instanceof Interface_1.SyncDescriptor)
      return this.xAa(e, t, r, n, i);
    if (this.MAa) return this.MAa.UAa(e, t, r, n, i);
    throw new Error("illegalState - creating UNKNOWN service " + t.name);
  }
  xAa(e, s, c, t, a) {
    if (!t) return this.IAa(s, c, a);
    const o = new InstantiationService(void 0, this, this.SAa),
      h = new Map(),
      i = new Async_1.IdleValue(() => {
        var e,
          t,
          r = o.IAa(s, c, a);
        for ([e, t] of h) {
          var n = r[e];
          if ("function" == typeof n) for (const i of t) n.apply(r, i);
        }
        return h.clear(), r;
      });
    return new Proxy(Object.create(null), {
      get(e, t) {
        if (
          !i.IsInitialized &&
          "string" == typeof t &&
          (t.startsWith("onDid") || t.startsWith("onWill"))
        ) {
          let n = h.get(t);
          n || ((n = new LinkedList_1.LinkedList()), h.set(t, n));
          return (e, t, r) => {
            e = n.Push([e, t, r]);
            return (0, LifeCycle_1.toDisposable)(e);
          };
        }
        if (t in e) return e[t];
        var r = i.Value;
        let n = r[t];
        return "function" == typeof n && ((n = n.bind(r)), (e[t] = n)), n;
      },
      set(e, t, r) {
        return (i.Value[t] = r), !0;
      },
      getPrototypeOf(e) {
        return s.prototype;
      },
    });
  }
  InvokeFunction(e, ...t) {
    const r = Trace.TraceInvocation(this.SAa, e);
    let n = !1;
    try {
      return e(
        {
          Get: (e) => {
            if (n)
              throw new Error(
                "service accessor is only valid during the invocation of its target method",
              );
            var t = this.TAa(e, r);
            if (t) return t;
            throw new Error(`[invokeFunction] unknown service '${e}'`);
          },
        },
        ...t,
      );
    } finally {
      (n = !0), r.Stop();
    }
  }
}
exports.InstantiationService = InstantiationService;
class Trace {
  constructor(e, t) {
    (this.Type = e), (this.Name = t), (this.il = Date.now()), (this.PAa = []);
  }
  static TraceInvocation(e, t) {
    return e
      ? new Trace(
          2,
          t.name || new Error().stack.split("\n").slice(3, 4).join("\n"),
        )
      : Trace.wAa;
  }
  static TraceCreation(e, t) {
    return e ? new Trace(1, t.name) : Trace.wAa;
  }
  Branch(e, t) {
    var r = new Trace(3, e.toString());
    return this.PAa.push([e, t, r]), r;
  }
  Stop() {
    var e = Date.now() - this.il;
    Trace.BAa += e;
    let h = !1;
    var t = [
      `${1 === this.Type ? "CREATE" : "CALL"} ` + this.Name,
      "" +
        (function e(t, r) {
          var n,
            i,
            s,
            c,
            a = [],
            o = new Array(t + 1).join("\t");
          for ([n, i, s] of r.PAa)
            i && s
              ? ((h = !0),
                a.push(o + "CREATES -> " + n),
                (c = e(t + 1, s)) && a.push(c))
              : a.push(o + "uses -> " + n);
          return a.join("\n");
        })(1, this),
      `DONE, took ${e.toFixed(2)}ms (grand total ${Trace.BAa.toFixed(2)}ms)`,
    ];
    (2 < e || h) && Trace.All.add(t.join("\n"));
  }
}
((exports.Trace = Trace).All = new Set()),
  (Trace.wAa = new (class extends Trace {
    constructor() {
      super(0, void 0);
    }
    Stop() {}
    Branch() {
      return this;
    }
  })()),
  (Trace.BAa = 0);
//# sourceMappingURL=InstantiationService.js.map
