"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.isShapesOverlapping =
    exports.getCylinderCorners =
    exports.getBoxCorners =
    exports.getNormalVector2D =
    exports.isClockwise =
    exports.rotateVertex =
    exports.isInSimpleShape =
    exports.isInRangeConfig =
    exports.Vector3Op =
    exports.transformInfoToFixed =
    exports.toEuler =
    exports.degreesToRadians =
    exports.toVectorInfo =
    exports.toVector3R =
    exports.RectOp =
    exports.Vector2Op =
    exports.toVector2R =
      void 0);
const Util_1 = require("../Misc/Util");
function toVector2R(t) {
  return t ? (t.X && t.Y ? t : { X: t.X ?? 0, Y: t.Y ?? 0 }) : { X: 0, Y: 0 };
}
exports.toVector2R = toVector2R;
class Vector2Op {
  static New(t, r) {
    return { X: t, Y: r };
  }
  static CacheNew(t, r) {
    let e = this.ve.get(r),
      o = (e || ((e = new Map()), this.ve.set(r, e)), e.get(t));
    return o || ((o = this.New(t, r)), e.set(t, o)), o;
  }
  static Clone(t) {
    return this.New(t.X, t.Y);
  }
  static Assign(t, r) {
    (t.X = r.X), (t.Y = r.Y);
  }
  static Round(t) {
    return this.New(Math.round(t.X), Math.round(t.Y));
  }
  static RoundS(t) {
    return (t.X = Math.round(t.X)), (t.Y = Math.round(t.Y)), t;
  }
  static Format(t) {
    return t
      ? void 0 === t.X || void 0 === t.Y
        ? Vector2Op.New(t.X ?? 0, t.Y ?? 0)
        : t
      : Vector2Op.Zero;
  }
  static Str(t) {
    return `(${t.X}, ${t.Y})`;
  }
  static Add(t, r) {
    return this.New(t.X + r.X, t.Y + r.Y);
  }
  static Sub(t, r) {
    return this.New(t.X - r.X, t.Y - r.Y);
  }
  static Len(t) {
    return Math.sqrt(t.X * t.X + t.Y * t.Y);
  }
  static Mul(t, r) {
    return this.New(t.X * r, t.Y * r);
  }
  static Div(t, r) {
    return this.New(t.X / r, t.Y / r);
  }
  static SquareDistance(t, r) {
    var e = t.X - r.X,
      t = t.Y - r.Y;
    return e * e + t * t;
  }
  static Distance(t, r) {
    var e = t.X - r.X,
      t = t.Y - r.Y;
    return Math.sqrt(e * e + t * t);
  }
  static Equal(t, r) {
    return Math.abs(t.X - r.X) < 1e-4 && Math.abs(t.Y - r.Y) < 1e-4;
  }
  static Intersect(t, r, e, o) {
    var n = r.X - t.X,
      r = r.Y - t.Y,
      a = o.X - e.X,
      o = o.Y - e.Y,
      c = -a * r + n * o;
    return (
      0 != c &&
      ((r = (-r * (t.X - e.X) + n * (t.Y - e.Y)) / c),
      (n = (a * (t.Y - e.Y) - o * (t.X - e.X)) / c),
      0 <= r) &&
      r <= 1 &&
      0 <= n &&
      n <= 1
    );
  }
}
(exports.Vector2Op = Vector2Op),
  ((_a = Vector2Op).One = _a.New(1, 1)),
  (Vector2Op.Zero = _a.New(0, 0)),
  (Vector2Op.ve = new Map());
class RectOp {
  static New(t, r) {
    return {
      Min: { X: t.X - r.X / 2, Y: t.Y - r.Y / 2 },
      Max: { X: t.X + r.X / 2, Y: t.Y + r.Y / 2 },
    };
  }
  static NewByMin(t, r) {
    return { Min: t, Max: Vector2Op.Add(t, r) };
  }
  static NewByPos(t, r) {
    if (t.X < r.X && t.Y < r.Y) return { Min: t, Max: r };
    let e = t.X,
      o = r.X,
      n = (t.X > r.X && ((e = r.X), (o = t.X)), t.Y),
      a = r.Y;
    return (
      t.Y > r.Y && ((n = r.Y), (a = t.Y)),
      { Min: Vector2Op.New(e, n), Max: Vector2Op.New(o, a) }
    );
  }
  static RoundS(t) {
    return Vector2Op.RoundS(t.Min), Vector2Op.RoundS(t.Max), t;
  }
  static Equal(t, r) {
    return Vector2Op.Equal(t.Min, r.Min) && Vector2Op.Equal(t.Max, r.Max);
  }
  static Clone(t) {
    return { Min: Vector2Op.Clone(t.Min), Max: Vector2Op.Clone(t.Max) };
  }
  static Str(t) {
    return (
      `中心: ${Vector2Op.Str(this.GetCenter(t))} 大小: ` +
      Vector2Op.Str(this.GetSize(t))
    );
  }
  static GetCenter(t) {
    return Vector2Op.New((t.Min.X + t.Max.X) / 2, (t.Min.Y + t.Max.Y) / 2);
  }
  static GetSize(t) {
    return Vector2Op.New(t.Max.X - t.Min.X, t.Max.Y - t.Min.Y);
  }
  static ToDrawPoints(t) {
    var r = t.Min,
      t = t.Max;
    return [r, { X: r.X, Y: t.Y }, t, { X: t.X, Y: r.Y }, r];
  }
  static Contains(t, r) {
    return t.Min.X <= r.X && r.X < t.Max.X && t.Min.Y <= r.Y && r.Y < t.Max.Y;
  }
  static IntersectLine(t, r, e) {
    var o = t.Min,
      t = t.Max,
      n = o,
      a = { X: t.X, Y: o.Y },
      c = t,
      o = { X: o.X, Y: t.Y };
    return (
      Vector2Op.Intersect(r, e, n, a) ||
      Vector2Op.Intersect(r, e, a, c) ||
      Vector2Op.Intersect(r, e, c, o) ||
      Vector2Op.Intersect(r, e, o, n)
    );
  }
  static IntersectOrIncludeLine(t, r, e) {
    var o, n, a;
    return (
      !(!RectOp.Contains(t, r) && !RectOp.Contains(t, e)) ||
      ((a = t.Min),
      (n = { X: (t = t.Max).X, Y: (o = a).Y }),
      (t = { X: a.X, Y: (a = t).Y }),
      Vector2Op.Intersect(r, e, o, n)) ||
      Vector2Op.Intersect(r, e, n, a) ||
      Vector2Op.Intersect(r, e, a, t) ||
      Vector2Op.Intersect(r, e, t, o)
    );
  }
}
function toVector3R(t) {
  return t ? { X: t.X ?? 0, Y: t.Y ?? 0, Z: t.Z ?? 0 } : { X: 0, Y: 0, Z: 0 };
}
function toVectorInfo(t) {
  return t
    ? t.X && t.Y && t.Z
      ? t
      : { X: t.X ?? 0, Y: t.Y ?? 0, Z: t.Z ?? 0 }
    : { X: 0, Y: 0, Z: 0 };
}
function degreesToRadians(t) {
  return (t * Math.PI) / 180;
}
function toEuler(t) {
  var r, e;
  return t
    ? (({ X: t = 0, Y: r = 0, Z: e = 0 } = t),
      {
        X: degreesToRadians(t),
        Y: degreesToRadians(r),
        Z: degreesToRadians(e),
      })
    : { X: 0, Y: 0, Z: 0 };
}
function transposeMatrix(e) {
  return e[0].map((t, r) => e.map((t) => t[r]));
}
function transformInfoToFixed(t, r) {
  t = (0, Util_1.deepCopyData)(t);
  const e = r ?? 2;
  r = (t) => {
    var r = 10 ** e;
    return (
      t.X && (t.X = Math.round(t.X * r) / r),
      t.Y && (t.Y = Math.round(t.Y * r) / r),
      t.Z && (t.Z = Math.round(t.Z * r) / r),
      t
    );
  };
  return (
    t.Pos && (t.Pos = r(t.Pos)),
    t.Rot && (t.Rot = r(t.Rot)),
    t.Scale && (t.Scale = r(t.Scale)),
    t
  );
}
(exports.RectOp = RectOp),
  ((_b = RectOp).One = _b.New(Vector2Op.Zero, Vector2Op.One)),
  (RectOp.Zero = _b.New(Vector2Op.Zero, Vector2Op.Zero)),
  (exports.toVector3R = toVector3R),
  (exports.toVectorInfo = toVectorInfo),
  (exports.degreesToRadians = degreesToRadians),
  (exports.toEuler = toEuler),
  (exports.transformInfoToFixed = transformInfoToFixed);
class Vector3Op {
  static New(t, r, e) {
    return { X: t, Y: r, Z: e };
  }
  static Format(t) {
    return t
      ? void 0 === t.X || void 0 === t.Y || void 0 === t.Z
        ? Vector3Op.New(t.X ?? 0, t.Y ?? 0, t.Z ?? 0)
        : t
      : Vector3Op.Zero;
  }
  static Add(t, r) {
    return {
      X: (t.X ?? 0) + (r.X ?? 0),
      Y: (t.Y ?? 0) + (r.Y ?? 0),
      Z: (t.Z ?? 0) + (r.Z ?? 0),
    };
  }
  static Sub(t, r) {
    return {
      X: (t.X ?? 0) - (r.X ?? 0),
      Y: (t.Y ?? 0) - (r.Y ?? 0),
      Z: (t.Z ?? 0) - (r.Z ?? 0),
    };
  }
  static Cross(t, r) {
    return {
      X: t.Y * r.Z - t.Z * r.Y,
      Y: t.Z * r.X - t.X * r.Z,
      Z: t.X * r.Y - t.Y * r.X,
    };
  }
  static Dot(t, r) {
    return t.X * r.X + t.Y * r.Y + t.Z * r.Z;
  }
  static Mul(t, r) {
    return { X: t.X * r, Y: t.Y * r, Z: t.Z * r };
  }
  static Div(t, r) {
    return { X: t.X / r, Y: t.Y / r, Z: t.Z / r };
  }
  static Magnitude(t) {
    return Math.sqrt(t.X ** 2 + t.Y ** 2 + t.Z ** 2);
  }
  static Distance(t, r) {
    return Math.sqrt((t.X - r.X) ** 2 + (t.Y - r.Y) ** 2 + (t.Z - r.Z) ** 2);
  }
  static PowDistance(t, r) {
    return (t.X - r.X) ** 2 + (t.Y - r.Y) ** 2 + (t.Z - r.Z) ** 2;
  }
  static Clamp(t, r, e) {
    return {
      X: Math.min(Math.max(t.X, r.X), e.X),
      Y: Math.min(Math.max(t.Y, r.Y), e.Y),
      Z: Math.min(Math.max(t.Z, r.Z), e.Z),
    };
  }
  static Normalize(t) {
    var r = this.Magnitude(t);
    return 0 === r
      ? { X: 0, Y: 0, Z: 0 }
      : { X: t.X / r, Y: t.Y / r, Z: t.Z / r };
  }
  static Abs(t) {
    return { X: Math.abs(t.X), Y: Math.abs(t.Y), Z: Math.abs(t.Z) };
  }
  static IsZero(t) {
    return !t.X && !t.Y && !t.Z;
  }
  static Angle(t, r) {
    var e = t.X * r.X + t.Y * r.Y + t.Z * r.Z,
      t = Math.sqrt(t.X ** 2 + t.Y ** 2 + t.Z ** 2),
      r = Math.sqrt(r.X ** 2 + r.Y ** 2 + r.Z ** 2),
      e = Math.max(-1, Math.min(1, e / (t * r)));
    return Math.acos(e) * (180 / Math.PI);
  }
  static ApplyMatrix(t, r, e = !1) {
    e = e ? transposeMatrix(r) : r;
    return {
      X: e[0][0] * t.X + e[0][1] * t.Y + e[0][2] * t.Z,
      Y: e[1][0] * t.X + e[1][1] * t.Y + e[1][2] * t.Z,
      Z: e[2][0] * t.X + e[2][1] * t.Y + e[2][2] * t.Z,
    };
  }
  static GetRotationMatrix(t) {
    var { X: t = 0, Y: r = 0, Z: e = 0 } = t,
      o = Math.cos(r),
      r = Math.sin(r),
      n = Math.cos(e),
      e = Math.sin(e),
      a = Math.cos(t),
      t = Math.sin(t);
    return [
      [n * o, n * r * t - e * a, n * r * a + e * t],
      [e * o, e * r * t + n * a, e * r * a - n * t],
      [-r, o * t, o * a],
    ];
  }
  static Rotate(t, r) {
    r = this.GetRotationMatrix(r);
    return this.ApplyMatrix(t, r);
  }
  static Vector3ToFixed(t, r) {
    r = 10 ** (r ?? 2);
    return {
      X: Math.round(t.X * r) / r,
      Y: Math.round(t.Y * r) / r,
      Z: Math.round(t.Z * r) / r,
    };
  }
  static EulerToQuaternion(t) {
    var r = (Math.PI / 180) * 0.5,
      e = (t.X % 360) * r,
      o = (t.Y % 360) * r,
      t = (t.Z % 360) * r,
      r = Math.sin(e),
      e = Math.cos(e),
      n = Math.sin(o),
      o = Math.cos(o),
      a = Math.sin(t),
      t = Math.cos(t);
    return {
      X: +t * r * n - a * e * o,
      Y: -t * r * o - a * e * n,
      Z: +t * e * n - a * r * o,
      W: +t * e * o + a * r * n,
    };
  }
  static RotateVectorByQuaternion(t, r) {
    var e = t.X,
      o = t.Y,
      t = t.Z,
      n = r.X,
      a = r.Y,
      c = r.Z,
      r = r.W,
      i = r * e + a * t - c * o,
      s = r * o + c * e - n * t,
      p = r * t + n * o - a * e,
      e = -n * e - a * o - c * t;
    return {
      X: i * r + e * -n + s * -c - p * -a,
      Y: s * r + e * -a + p * -n - i * -c,
      Z: p * r + e * -c + i * -a - s * -n,
    };
  }
  static ProjectToAxis(t, r) {
    var e = [];
    for (const n of t) {
      var o = this.Dot(n, r),
        o = this.Mul(r, o);
      e.push(o);
    }
    return e;
  }
  static GetMaxComponent(t) {
    return Math.max(t.X, t.Y, t.Z);
  }
}
function isInRangeConfig(t, r) {
  var e = r.Center,
    r = r.Radius;
  return (
    Vector3Op.PowDistance(
      { X: t.X ?? 0, Y: t.Y ?? 0, Z: t.Z ?? 0 },
      { X: e.X ?? 0, Y: e.Y ?? 0, Z: e.Z ?? 0 },
    ) <=
    r * r
  );
}
function isInSphereRange(t, r, e) {
  var o = r.Radius;
  return (
    Vector3Op.PowDistance(
      { X: t.X ?? 0, Y: t.Y ?? 0, Z: t.Z ?? 0 },
      {
        X: (e.X ?? 0) + (r.Center.X ?? 0),
        Y: (e.Y ?? 0) + (r.Center.Y ?? 0),
        Z: (e.Z ?? 0) + (r.Center.Z ?? 0),
      },
    ) <=
    o * o
  );
}
function isInBoxRange(t, r, e) {
  var o = (e.X ?? 0) + (r.Center.X ?? 0) - (r.Size.X ?? 0) / 2,
    n = (e.X ?? 0) + (r.Center.X ?? 0) + (r.Size.X ?? 0) / 2,
    a = (e.Y ?? 0) + (r.Center.Y ?? 0) - (r.Size.Y ?? 0) / 2,
    c = (e.Y ?? 0) + (r.Center.Y ?? 0) + (r.Size.Y ?? 0) / 2,
    i = (e.Z ?? 0) + (r.Center.Z ?? 0) - (r.Size.Z ?? 0) / 2,
    e = (e.Z ?? 0) + (r.Center.Z ?? 0) + (r.Size.Z ?? 0) / 2;
  return (
    (t.X ?? 0) > o &&
    (t.X ?? 0) < n &&
    (t.Y ?? 0) > a &&
    (t.Y ?? 0) < c &&
    (t.Z ?? 0) > i &&
    (t.Z ?? 0) < e
  );
}
function isInCylinderRange(t, r, e) {
  var e = Math.sqrt(
      ((t.X ?? 0) - ((e.X ?? 0) + (r.Center.X ?? 0))) ** 2 +
        ((t.Y ?? 0) - ((e.Y ?? 0) + (r.Center.Y ?? 0))) ** 2,
    ),
    o = (t.Z ?? 0) + (r.Center.Z ?? 0) - r.Height / 2,
    n = (t.Z ?? 0) + (r.Center.Z ?? 0) + r.Height / 2;
  return e < r.Radius && (t.Z ?? 0) > o && (t.Z ?? 0) < n;
}
function isInHollowSphereRange(t, r, e) {
  var o = r.Radius,
    n = r.InnerRadius,
    t = Vector3Op.PowDistance(
      { X: t.X ?? 0, Y: t.Y ?? 0, Z: t.Z ?? 0 },
      {
        X: (e.X ?? 0) + (r.Center.X ?? 0),
        Y: (e.Y ?? 0) + (r.Center.Y ?? 0),
        Z: (e.Z ?? 0) + (r.Center.Z ?? 0),
      },
    );
  return t <= o * o && n * n <= t;
}
function isInHollowCylinderRange(t, r, e) {
  var o = Math.sqrt(
      ((t.X ?? 0) - ((e.X ?? 0) + (r.Center.X ?? 0))) ** 2 +
        ((t.Y ?? 0) - ((e.Y ?? 0) + (r.Center.Y ?? 0))) ** 2,
    ),
    n = (e.Z ?? 0) + (r.Center.Z ?? 0) - r.Height / 2,
    e = (e.Z ?? 0) + (r.Center.Z ?? 0) + r.Height / 2;
  return (
    o <= r.Radius && o >= r.InnerRadius && (t.Z ?? 0) > n && (t.Z ?? 0) < e
  );
}
function isInSimpleShape(t, r, e) {
  let o = !1;
  var n = e ?? { X: 0, Y: 0, Z: 0 };
  switch (r.Type) {
    case "Box":
      o = isInBoxRange(t, r, n);
      break;
    case "Sphere":
      o = isInSphereRange(t, r, n);
      break;
    case "Cylinder":
      o = isInCylinderRange(t, r, n);
      break;
    case "HollowSphere":
      o = isInHollowSphereRange(t, r, n);
      break;
    case "HollowCylinder":
      o = isInHollowCylinderRange(t, r, n);
  }
  return o;
}
function rotateVertex(t, r) {
  var t = toVector3R(t),
    r = toVector3R(r),
    e = Math.cos(degreesToRadians(r.X)),
    o = Math.sin(degreesToRadians(r.X)),
    n = Math.cos(degreesToRadians(r.Y)),
    a = Math.sin(degreesToRadians(r.Y)),
    c = Math.cos(degreesToRadians(r.Z)),
    r = Math.sin(degreesToRadians(r.Z)),
    i = t.Y * e - t.Z * o,
    o = t.Y * o + t.Z * e,
    e = t.X * n + o * a;
  return { X: e * c - i * r, Y: e * r + i * c, Z: -t.X * a + o * n };
}
function isClockwise(r) {
  let e = 0;
  var o = r.length;
  for (let t = 0; t < r.length; t++) {
    var n = r[t]?.X ?? 0,
      a = r[(t + 1) % o]?.X ?? 0,
      c = r[t]?.Y ?? 0,
      i = r[(t + 1) % o]?.Y ?? 0;
    e += (a - n) * (i + c);
  }
  return e < 0;
}
function getNormalVector2D(t, r) {
  return r ? { X: t.Y, Y: -t.X, Z: 0 } : { X: -t.Y, Y: t.X, Z: 0 };
}
function getBoxCorners(t, r) {
  const { Center: e, Size: o } = t;
  var { X: t = 0, Y: n = 0, Z: a = 0 } = o;
  return [
    { X: -t, Y: -n, Z: -a },
    { X: -t, Y: -n, Z: a },
    { X: -t, Y: n, Z: -a },
    { X: -t, Y: n, Z: a },
    { X: t, Y: -n, Z: -a },
    { X: t, Y: -n, Z: a },
    { X: t, Y: n, Z: -a },
    { X: t, Y: n, Z: a },
  ].map((t) => {
    t = Vector3Op.Rotate(t, toVector3R(r));
    return Vector3Op.Add(t, toVector3R(e));
  });
}
function getCylinderCorners(t, r) {
  var { Radius: e, Height: o } = t,
    n = { X: 0, Y: 0, Z: -o / 2 },
    o = { X: 0, Y: 0, Z: o / 2 },
    t = toVector3R(t.Center),
    a = Vector3Op.Add(t, Vector3Op.Rotate(n, r)),
    c = Vector3Op.Add(t, Vector3Op.Rotate(o, r)),
    i = [];
  for (let t = 0; t < 2 * Math.PI; t += Math.PI / 12) {
    var s = { X: Math.cos(t) * e, Y: Math.sin(t) * e, Z: 0 },
      s = Vector3Op.Rotate(s, r);
    i.push(Vector3Op.Add(s, a)), i.push(Vector3Op.Add(s, c));
  }
  return i;
}
function getAxis(t) {
  return Vector3Op.Rotate({ X: 0, Y: 0, Z: 1 }, t);
}
function calculateNormal(t, r, e) {
  (r = Vector3Op.Sub(r, t)),
    (e = Vector3Op.Sub(e, t)),
    (t = Vector3Op.Cross(r, e));
  return Vector3Op.Normalize(t);
}
function getCrossProductAxes(r, e) {
  var o = [];
  for (let t = 0; t < r.length; t++) {
    var n = calculateNormal(r[t], r[(t + 1) % r.length], r[(t + 2) % r.length]);
    o.push(n);
  }
  for (let t = 0; t < e.length; t++) {
    var a = calculateNormal(e[t], e[(t + 1) % e.length], e[(t + 2) % e.length]);
    o.push(a);
  }
  for (let t = 0; t < r.length; t++) {
    var c = Vector3Op.Sub(r[(t + 1) % r.length], r[t]);
    for (let t = 0; t < e.length; t++) {
      var i = Vector3Op.Sub(e[(t + 1) % e.length], e[t]),
        i = Vector3Op.Cross(c, i);
      0.001 < Vector3Op.Magnitude(i) && o.push(Vector3Op.Normalize(i));
    }
  }
  return o;
}
function isSeparatingAxisOverlapping(t, r, e) {
  var t = Vector3Op.ProjectToAxis(t, e),
    r = Vector3Op.ProjectToAxis(r, e),
    o = Math.min(...t.map((t) => Vector3Op.Dot(t, e))),
    t = Math.max(...t.map((t) => Vector3Op.Dot(t, e))),
    n = Math.min(...r.map((t) => Vector3Op.Dot(t, e))),
    r = Math.max(...r.map((t) => Vector3Op.Dot(t, e)));
  return !(t < n || r < o);
}
function isBoxesOverlapping(t, r, e = Vector3Op.Zero, o = Vector3Op.Zero) {
  var n, a, c, i, s, p, u, V, O, h, l, M;
  if (e === Vector3Op.Zero && o === Vector3Op.Zero)
    return (
      ({
        X: n = 0,
        Y: a = 0,
        Z: c = 0,
      } = Vector3Op.Sub(toVector3R(t.Center), toVector3R(t.Size))),
      ({
        X: i = 0,
        Y: s = 0,
        Z: p = 0,
      } = Vector3Op.Add(toVector3R(t.Center), toVector3R(t.Size))),
      ({
        X: u = 0,
        Y: V = 0,
        Z: O = 0,
      } = Vector3Op.Sub(toVector3R(r.Center), toVector3R(r.Size))),
      ({
        X: h = 0,
        Y: l = 0,
        Z: M = 0,
      } = Vector3Op.Add(toVector3R(r.Center), toVector3R(r.Size))),
      n <= h && u <= i && a <= l && V <= s && c <= M && O <= p
    );
  var x = getBoxCorners(t, e ?? Vector3Op.Zero),
    v = getBoxCorners(r, o ?? Vector3Op.Zero);
  for (const g of [
    { X: 1, Y: 0, Z: 0 },
    { X: 0, Y: 1, Z: 0 },
    { X: 0, Y: 0, Z: 1 },
    ...getCrossProductAxes(x, v),
  ])
    if (!isSeparatingAxisOverlapping(x, v, g)) return !1;
  return !0;
}
function isSpheresOverlapping(t, r) {
  var e = Vector3Op.PowDistance(toVector3R(t.Center), toVector3R(r.Center)),
    t = t.Radius + r.Radius;
  return e <= t * t;
}
function isBoxOverlappingSphere(t, r, e = Vector3Op.Zero) {
  var o = toVector3R(r.Center),
    n = toVector3R(t.Center),
    t = toVector3R(t.Size);
  if (e === Vector3Op.Zero) {
    var a = Vector3Op.Clamp(o, Vector3Op.Sub(n, t), Vector3Op.Add(n, t));
    const c = Vector3Op.PowDistance(a, o);
    return c <= r.Radius * r.Radius;
  }
  (a = Vector3Op.GetRotationMatrix(e)),
    (e = Vector3Op.ApplyMatrix(Vector3Op.Sub(o, n), a, !0)),
    (o = Vector3Op.Clamp(
      e,
      { X: -t.X, Y: -t.Y, Z: -t.Z },
      { X: t.X, Y: t.Y, Z: t.Z },
    ));
  const c = Vector3Op.PowDistance(e, o);
  return c <= r.Radius * r.Radius;
}
function isCylindersOverlapping(t, r, e = Vector3Op.Zero, o = Vector3Op.Zero) {
  var n,
    a =
      Math.abs(t.Center.Z ?? 0 - (r.Center.Z ?? 0)) <=
      (t.Height + r.Height) / 2;
  if (e === Vector3Op.Zero && o === Vector3Op.Zero)
    return (
      (c = Vector3Op.PowDistance(toVector3R(t.Center), toVector3R(r.Center))),
      (n = t.Radius + r.Radius),
      a && c <= n * n
    );
  var a = getAxis(e),
    c = getAxis(o),
    i = getCylinderCorners(t, e),
    s = getCylinderCorners(r, o);
  for (const p of [a, c, ...getCrossProductAxes(i, s)])
    if (!isSeparatingAxisOverlapping(i, s, p)) return !1;
  return !0;
}
function isCylinderOverlappingSphere(t, r, e = Vector3Op.Zero) {
  var o = toVector3R(t.Center),
    n = toVector3R(r.Center),
    a = t.Height / 2,
    c = { X: 0, Y: 0, Z: -a },
    a = { X: 0, Y: 0, Z: a },
    c = Vector3Op.Add(o, Vector3Op.Rotate(c, e)),
    a = Vector3Op.Add(o, Vector3Op.Rotate(a, e)),
    e = Vector3Op.Sub(a, c),
    a = Vector3Op.Magnitude(e),
    i = Vector3Op.Normalize(e);
  return (
    !(
      Math.abs(Vector3Op.Dot(Vector3Op.Sub(n, o), i)) >
      t.Height / 2 + r.Radius
    ) &&
    ((o = Vector3Op.Dot(Vector3Op.Sub(n, c), i) / a),
    (i = Math.max(0, Math.min(1, o))),
    (a = Vector3Op.Add(c, Vector3Op.Mul(e, i))),
    Vector3Op.PowDistance(a, n) <= (r.Radius + t.Radius) ** 2)
  );
}
function isBoxOverlappingCylinderPrecise(t, r) {
  var e = Vector3Op.Sub(toVector3R(t.Center), toVector3R(t.Size)),
    o = Vector3Op.Add(toVector3R(t.Center), toVector3R(t.Size));
  const n = { X: r.Center.X ?? 0, Y: r.Center.Y ?? 0, Z: 0 },
    a = r.Radius * r.Radius;
  var c = [
      { X: e.X, Y: e.Y, Z: 0 },
      { X: e.X, Y: o.Y, Z: 0 },
      { X: o.X, Y: e.Y, Z: 0 },
      { X: o.X, Y: o.Y, Z: 0 },
    ].some((t) => {
      return Vector3Op.PowDistance({ X: t.X, Y: t.Y, Z: 0 }, n) <= a;
    }),
    e = n.X >= e.X && n.X <= o.X && n.Y >= e.Y && n.Y <= o.Y;
  return (
    !(!c && !e) &&
    ((o = toVector3R(t.Center)),
    (c = toVector3R(t.Size)),
    (e = o.Z - c.Z),
    (t = o.Z + c.Z),
    (o = (r.Center.Z ?? 0) - r.Height / 2),
    (c = (r.Center.Z ?? 0) + r.Height / 2),
    o <= t) &&
    e <= c
  );
}
function isBoxOverlappingCylinder(
  t,
  r,
  e = Vector3Op.Zero,
  o = Vector3Op.Zero,
) {
  if (e === Vector3Op.Zero && o === Vector3Op.Zero)
    return isBoxOverlappingCylinderPrecise(t, r);
  var n = getBoxCorners(t, e),
    a = getCylinderCorners(r, o);
  for (const c of getCrossProductAxes(n, a))
    if (!isSeparatingAxisOverlapping(n, a, c)) return !1;
  return !0;
}
function isShapesOverlapping(t, r) {
  if ("Sphere" === t.Type && "Sphere" === r.Type)
    return isSpheresOverlapping(t, r);
  if ("Box" === t.Type && "Box" === r.Type)
    return isBoxesOverlapping(t, r, t.Rotator, r.Rotator);
  if ("Cylinder" === t.Type && "Cylinder" === r.Type)
    return isCylindersOverlapping(t, r, t.Rotator, r.Rotator);
  if ("Box" === t.Type && "Sphere" === r.Type)
    return isBoxOverlappingSphere(t, r, t.Rotator);
  if ("Sphere" === t.Type && "Box" === r.Type)
    return isBoxOverlappingSphere(r, t, r.Rotator);
  if ("Cylinder" === t.Type && "Sphere" === r.Type)
    return isCylinderOverlappingSphere(t, r, t.Rotator);
  if ("Sphere" === t.Type && "Cylinder" === r.Type)
    return isCylinderOverlappingSphere(r, t, r.Rotator);
  if ("Box" === t.Type && "Cylinder" === r.Type)
    return isBoxOverlappingCylinder(t, r, t.Rotator, r.Rotator);
  if ("Cylinder" === t.Type && "Box" === r.Type)
    return isBoxOverlappingCylinder(r, t, r.Rotator, t.Rotator);
  throw new Error(`不支持重叠检测的形状类型：${t.Type} 和 ` + r.Type);
}
(exports.Vector3Op = Vector3Op),
  ((_c = Vector3Op).One = _c.New(1, 1, 1)),
  (Vector3Op.Zero = _c.New(0, 0, 0)),
  (exports.isInRangeConfig = isInRangeConfig),
  (exports.isInSimpleShape = isInSimpleShape),
  (exports.rotateVertex = rotateVertex),
  (exports.isClockwise = isClockwise),
  (exports.getNormalVector2D = getNormalVector2D),
  (exports.getBoxCorners = getBoxCorners),
  (exports.getCylinderCorners = getCylinderCorners),
  (exports.isShapesOverlapping = isShapesOverlapping);
//# sourceMappingURL=Geometry.js.map
