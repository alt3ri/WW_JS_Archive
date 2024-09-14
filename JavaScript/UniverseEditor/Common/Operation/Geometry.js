"use strict";
var _a, _b, _c;
function toVector2R(t) {
  return t ? (t.X && t.Y ? t : { X: t.X ?? 0, Y: t.Y ?? 0 }) : { X: 0, Y: 0 };
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getNormalVector2D =
    exports.isClockwise =
    exports.isInSimpleShape =
    exports.isInRangeConfig =
    exports.Vector3Op =
    exports.toVectorInfo =
    exports.toVector3R =
    exports.RectOp =
    exports.Vector2Op =
    exports.toVector2R =
      void 0),
  (exports.toVector2R = toVector2R);
class Vector2Op {
  static New(t, r) {
    return { X: t, Y: r };
  }
  static CacheNew(t, r) {
    let e = this.ve.get(r),
      c = (e || ((e = new Map()), this.ve.set(r, e)), e.get(t));
    return c || ((c = this.New(t, r)), e.set(t, c)), c;
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
  static Intersect(t, r, e, c) {
    var n = r.X - t.X,
      r = r.Y - t.Y,
      s = c.X - e.X,
      c = c.Y - e.Y,
      o = -s * r + n * c;
    return (
      0 != o &&
      ((r = (-r * (t.X - e.X) + n * (t.Y - e.Y)) / o),
      (n = (s * (t.Y - e.Y) - c * (t.X - e.X)) / o),
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
      c = r.X,
      n = (t.X > r.X && ((e = r.X), (c = t.X)), t.Y),
      s = r.Y;
    return (
      t.Y > r.Y && ((n = r.Y), (s = t.Y)),
      { Min: Vector2Op.New(e, n), Max: Vector2Op.New(c, s) }
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
    var c = t.Min,
      t = t.Max,
      n = c,
      s = { X: t.X, Y: c.Y },
      o = t,
      c = { X: c.X, Y: t.Y };
    return (
      Vector2Op.Intersect(r, e, n, s) ||
      Vector2Op.Intersect(r, e, s, o) ||
      Vector2Op.Intersect(r, e, o, c) ||
      Vector2Op.Intersect(r, e, c, n)
    );
  }
  static IntersectOrIncludeLine(t, r, e) {
    var c, n, s;
    return (
      !(!RectOp.Contains(t, r) && !RectOp.Contains(t, e)) ||
      ((s = t.Min),
      (n = { X: (t = t.Max).X, Y: (c = s).Y }),
      (t = { X: s.X, Y: (s = t).Y }),
      Vector2Op.Intersect(r, e, c, n)) ||
      Vector2Op.Intersect(r, e, n, s) ||
      Vector2Op.Intersect(r, e, s, t) ||
      Vector2Op.Intersect(r, e, t, c)
    );
  }
}
function toVector3R(t) {
  return t
    ? t.X && t.Y && t.Z
      ? t
      : { X: t.X ?? 0, Y: t.Y ?? 0, Z: t.Z ?? 0 }
    : { X: 0, Y: 0, Z: 0 };
}
function toVectorInfo(t) {
  return t
    ? t.X && t.Y && t.Z
      ? t
      : { X: t.X ?? 0, Y: t.Y ?? 0, Z: t.Z ?? 0 }
    : { X: 0, Y: 0, Z: 0 };
}
(exports.RectOp = RectOp),
  ((_b = RectOp).One = _b.New(Vector2Op.Zero, Vector2Op.One)),
  (RectOp.Zero = _b.New(Vector2Op.Zero, Vector2Op.Zero)),
  (exports.toVector3R = toVector3R),
  (exports.toVectorInfo = toVectorInfo);
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
  static Normalize(t) {
    var r = this.Magnitude(t),
      e = this.Magnitude({ X: t.X, Y: t.Y, Z: 0 }),
      c = t.Z,
      n = e / r,
      s = t.Y / e;
    return { X: (t.X / e) * n, Y: s * n, Z: c / r };
  }
  static Abs(t) {
    return { X: Math.abs(t.X), Y: Math.abs(t.Y), Z: Math.abs(t.Z) };
  }
  static IsZero(t) {
    return !t.X && !t.Y && !t.Z;
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
  var c = r.Radius;
  return (
    Vector3Op.PowDistance(
      { X: t.X ?? 0, Y: t.Y ?? 0, Z: t.Z ?? 0 },
      {
        X: (e.X ?? 0) + (r.Center.X ?? 0),
        Y: (e.Y ?? 0) + (r.Center.Y ?? 0),
        Z: (e.Z ?? 0) + (r.Center.Z ?? 0),
      },
    ) <=
    c * c
  );
}
function isInBoxRange(t, r, e) {
  var c = (e.X ?? 0) + (r.Center.X ?? 0) - (r.Size.X ?? 0) / 2,
    n = (e.X ?? 0) + (r.Center.X ?? 0) + (r.Size.X ?? 0) / 2,
    s = (e.Y ?? 0) + (r.Center.Y ?? 0) - (r.Size.Y ?? 0) / 2,
    o = (e.Y ?? 0) + (r.Center.Y ?? 0) + (r.Size.Y ?? 0) / 2,
    a = (e.Z ?? 0) + (r.Center.Z ?? 0) - (r.Size.Z ?? 0) / 2,
    e = (e.Z ?? 0) + (r.Center.Z ?? 0) + (r.Size.Z ?? 0) / 2;
  return (
    (t.X ?? 0) > c &&
    (t.X ?? 0) < n &&
    (t.Y ?? 0) > s &&
    (t.Y ?? 0) < o &&
    (t.Z ?? 0) > a &&
    (t.Z ?? 0) < e
  );
}
function isInCylinderRanger(t, r, e) {
  var e = Math.sqrt(
      ((e.X ?? 0) - (r.Center.X ?? 0)) ** 2 +
        ((e.Y ?? 0) - (r.Center.Y ?? 0)) ** 2,
    ),
    c = (t.Z ?? 0) + (r.Center.Z ?? 0) - r.Height / 2,
    n = (t.Z ?? 0) + (r.Center.Z ?? 0) + r.Height / 2;
  return e < r.Radius && (t.Z ?? 0) > c && (t.Z ?? 0) < n;
}
function isInSimpleShape(t, r, e) {
  let c = !1;
  var n = e ?? { X: 0, Y: 0, Z: 0 };
  switch (r.Type) {
    case "Box":
      c = isInBoxRange(t, r, n);
      break;
    case "Sphere":
      c = isInSphereRange(t, r, n);
      break;
    case "Cylinder":
      c = isInCylinderRanger(t, r, n);
  }
  return c;
}
function isClockwise(r) {
  let e = 0;
  var c = r.length;
  for (let t = 0; t < r.length; t++) {
    var n = r[t]?.X ?? 0,
      s = r[(t + 1) % c]?.X ?? 0,
      o = r[t]?.Y ?? 0,
      a = r[(t + 1) % c]?.Y ?? 0;
    e += (s - n) * (a + o);
  }
  return e < 0;
}
function getNormalVector2D(t, r) {
  return r ? { X: t.Y, Y: -t.X, Z: 0 } : { X: -t.Y, Y: t.X, Z: 0 };
}
(exports.Vector3Op = Vector3Op),
  ((_c = Vector3Op).One = _c.New(1, 1, 1)),
  (Vector3Op.Zero = _c.New(0, 0, 0)),
  (exports.isInRangeConfig = isInRangeConfig),
  (exports.isInSimpleShape = isInSimpleShape),
  (exports.isClockwise = isClockwise),
  (exports.getNormalVector2D = getNormalVector2D);
//# sourceMappingURL=Geometry.js.map
