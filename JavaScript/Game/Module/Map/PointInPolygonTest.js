"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PointInPolygonTest = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils");
class PointInPolygonTest {
  constructor() {
    (this.$Di =
      "/Game/Aki/Data/PathLine/Pathline_EdgeWall/BP_BasePathLine_Edgewall.BP_BasePathLine_Edgewall_C"),
      (this.IsSplineInit = !1),
      (this.YDi = new BinSet()),
      (this.JDi = new Array()),
      (this.zDi = Vector2D_1.Vector2D.Create());
  }
  InitSpline() {
    var t = this.$Di;
    this.IsSplineInit ||
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, (t) => {
        this.zwe(t), (this.IsSplineInit = !0), this.Zwe(this.JDi, 30, this.YDi);
      });
  }
  zwe(t) {
    t = ActorSystem_1.ActorSystem.Get(
      t,
      MathUtils_1.MathUtils.DefaultTransform,
    );
    let e = void 0;
    t.IsA(UE.BP_BasePathLine_Edgewall_C.StaticClass()) &&
      ((i = (e = t).OriginalLocation),
      t.K2_SetActorLocationAndRotation(
        i,
        Rotator_1.Rotator.ZeroRotator,
        !1,
        void 0,
        !1,
      ));
    var r = e.Spline,
      i = r.GetNumberOfSplinePoints();
    this.JDi.slice(0, i);
    for (let t = 0, e = i; t < e; t++) {
      var s = r.GetWorldLocationAtSplinePoint(t);
      this.JDi.push(new Vector2D_1.Vector2D(s.X, s.Y));
    }
    t.K2_DestroyActor();
  }
  eBe(t, e, r, i, s) {
    let o = r,
      h = i;
    i < r && ((o = i), (h = r)),
      s.Bins[t].MinX > o && (s.Bins[t].MinX = o),
      s.Bins[t].MaxX < h && (s.Bins[t].MaxX = h),
      (s.Bins[t].EdgeSet[e].MinX = o),
      (s.Bins[t].EdgeSet[e].MaxX = h);
  }
  BinTest(t) {
    if (!this.IsSplineInit) return !0;
    this.zDi.Set(t.X, t.Y);
    var e = this.zDi,
      t = this.YDi,
      r = this.JDi;
    if (e.Y < t.MinY || e.Y >= t.MaxY || e.X < t.MinX || e.X >= t.MaxX)
      return !1;
    var i = Math.floor((e.Y - t.MinY) * t.InvDeltaY),
      t = t.Bins[i];
    if (e.X < t.MinX || e.X > t.MaxX) return !1;
    var s,
      o,
      h,
      a = t.EdgeSet,
      l = t.Count;
    let n = 0,
      c = !1;
    for (let t = 0; t < l; t++, n++) {
      if (e.X < a[n].MinX) {
        do {
          (!a[n].FullCross &&
            ((s = a[n].Id), e.Y <= r[s].Y == e.Y <= r[(s + 1) % r.length].Y)) ||
            (c = !c),
            (n += 1);
        } while (++t < l);
        return c;
      }
      e.X < a[n].MaxX &&
        ((o = r[(h = a[n].Id)]),
        (h = r[(h + 1) % r.length]),
        a[n].FullCross || e.Y <= o.Y != e.Y <= h.Y) &&
        o.X - ((o.Y - e.Y) * (h.X - o.X)) / (h.Y - o.Y) >= e.X &&
        (c = !c);
    }
    return c;
  }
  Zwe(e, t, o) {
    var r = new Array(t);
    (o.BinNum = t),
      (o.Bins = new Array(t)),
      (o.MinX = o.MaxX = e[0].X),
      (o.MinY = o.MaxY = e[0].Y);
    for (let t = 1; t < e.length; t++) {
      var i = e[t];
      o.MinX > i.X ? (o.MinX = i.X) : o.MaxX < i.X && (o.MaxX = i.X),
        o.MinY > i.Y ? (o.MinY = i.Y) : o.MaxY < i.Y && (o.MaxY = i.Y);
    }
    (o.MinY -= MathUtils_1.MathUtils.SmallNumber * (o.MaxY - o.MinY)),
      (o.MaxY += MathUtils_1.MathUtils.SmallNumber * (o.MaxY - o.MinY)),
      (o.DeltaY = (o.MaxY - o.MinY) / t),
      (o.InvDeltaY = 1 / o.DeltaY);
    let h = e[e.length - 1],
      a = void 0,
      l = void 0,
      n = void 0;
    for (let t = 0; t < e.length; t++) {
      if (((a = e[t]), h.Y !== a.Y)) {
        n = h.Y < a.Y ? ((l = a), h) : ((l = h), a);
        var s = Math.floor((n.Y - o.MinY) * o.InvDeltaY),
          c = (l.Y - o.MinY) * o.InvDeltaY;
        let e = Math.floor(c);
        c - e == 0 && (e -= 1);
        for (let t = s; t <= e; t++) r[t] = (r[t] ?? 0) + 1;
      }
      h = a;
    }
    for (let e = 0; e < t; e++) {
      o.Bins[e] = new Bin();
      var _ = new Array(r[e]);
      for (let t = 0; t < r[e]; t++) _[t] = new Edge();
      (o.Bins[e].EdgeSet = _),
        (o.Bins[e].MinX = o.MaxX),
        (o.Bins[e].MaxX = o.MinX),
        (o.Bins[e].Count = 0);
    }
    h = e[e.length - 1];
    let u = e.length - 1;
    for (let t = 0; t < e.length; t++) {
      if (((a = e[t]), h.Y !== a.Y)) {
        var v =
            ((n = h.Y < a.Y ? ((l = a), h) : ((l = h), a)).Y - o.MinY) *
            o.InvDeltaY,
          d = Math.floor(v),
          f = (l.Y - o.MinY) * o.InvDeltaY;
        let e = Math.floor(f),
          r = (f - e == 0 && (e -= 1), n.X);
        var M = (o.DeltaY * (l.X - n.X)) / (l.Y - n.Y);
        let i = r,
          s = !1;
        for (let t = d; t < e; t++, r = i) {
          i = n.X + (t + 1 - v) * M;
          var y = o.Bins[t].Count;
          o.Bins[t].Count++,
            (o.Bins[t].EdgeSet[y].Id = u),
            (o.Bins[t].EdgeSet[y].FullCross = s),
            this.eBe(t, y, r, i, o),
            (s = !0);
        }
        (r = i), (i = l.X);
        f = o.Bins[e].Count++;
        (o.Bins[e].EdgeSet[f].Id = u),
          (o.Bins[e].EdgeSet[f].FullCross = !1),
          this.eBe(e, f, r, i, o);
      }
      (h = a), (u = t);
    }
    for (let t = 0; t < o.BinNum; t++)
      o.Bins[t].EdgeSet.sort((t, e) =>
        t.MinX === e.MinX ? 0 : t.MinX < e.MinX ? -1 : 1,
      );
  }
}
exports.PointInPolygonTest = PointInPolygonTest;
class Edge {
  constructor() {
    (this.Id = 0), (this.FullCross = !1), (this.MinX = 0), (this.MaxX = 0);
  }
}
class Bin {
  constructor() {
    (this.EdgeSet = void 0), (this.MinX = 0), (this.MaxX = 0), (this.Count = 0);
  }
}
class BinSet {
  constructor() {
    (this.BinNum = 0),
      (this.MinX = 0),
      (this.MaxX = 0),
      (this.MaxY = 0),
      (this.DeltaY = 0),
      (this.InvDeltaY = 0),
      (this.Bins = void 0),
      (this.MinY = 0);
  }
}
//# sourceMappingURL=PointInPolygonTest.js.map
