"use strict";
var _a, _b, _c;
function toVector2R(t) {
  return t ? (t.X && t.Y ? t : { X: t.X ?? 0, Y: t.Y ?? 0 }) : { X: 0, Y: 0 };
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Vector3Op =
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
      s = (t.X > r.X && ((e = r.X), (c = t.X)), t.Y),
      a = r.Y;
    return (
      t.Y > r.Y && ((s = r.Y), (a = t.Y)),
      { Min: Vector2Op.New(e, s), Max: Vector2Op.New(c, a) }
    );
  }
  static RoundS(t) {
    return Vector2Op.RoundS(t.Min), Vector2Op.RoundS(t.Max), t;
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
  static Normalize(t) {
    var r = this.Magnitude(t),
      e = this.Magnitude({ X: t.X, Y: t.Y, Z: 0 }),
      c = t.Z,
      s = e / r,
      a = t.Y / e;
    return { X: (t.X / e) * s, Y: a * s, Z: c / r };
  }
}
(exports.Vector3Op = Vector3Op),
  ((_c = Vector3Op).One = _c.New(1, 1, 1)),
  (Vector3Op.Zero = _c.New(0, 0, 0));
//# sourceMappingURL=Geometry.js.map
