"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  TsSimpleInteractBase_1 = require("./TsSimpleInteractBase"),
  redColor = new UE.LinearColor(1, 0, 0, 1),
  yellowColor = new UE.LinearColor(1, 1, 0, 1),
  greenColor = new UE.LinearColor(0, 1, 0, 1),
  DRAW_TIME = 0.05,
  DEFAULT_THICKNESS = 4,
  DEFAULT_ARROW_SIZE = 100,
  DRAW_LENGTH = 200,
  forwardOffset = Vector_1.Vector.Create(DRAW_LENGTH, 0, 0),
  drawPoints = [
    new UE.Vector(0, -1, -1),
    new UE.Vector(0, -1, 1),
    new UE.Vector(0, 1, -1),
    new UE.Vector(0, 1, 1),
  ],
  textColor = new UE.Color(255, 128, 128, 255),
  TEXT_SIZE = 200,
  LEGAL_CHECK_PERIOD = 100,
  SMALL_VALUE = 0.1,
  PROFILE_KEY_CEHCK_LEGAL = "TsSimpleInteractPlane_CheckLegal",
  PROFILE_KEY = "TsSimpleInteractPlane_GetBestTransform";
class TsSimpleInteractPlane extends TsSimpleInteractBase_1.default {
  constructor() {
    super(...arguments),
      (this.PlaneHalfHeight = 500),
      (this.PlaneHalfWidth = 500),
      (this.SelfForward = void 0),
      (this.SelfBackward = void 0),
      (this.SelfRight = void 0),
      (this.SelfUp = void 0),
      (this.IsHorizontalPlane = !1),
      (this.TmpResultLocation = void 0),
      (this.TmpResultRotator = void 0),
      (this.ForwardSizeSquared2D = -0),
      (this.Forward2D = void 0),
      (this.NormalRotator = void 0),
      (this.TmpLocation = void 0),
      (this.StartLocation = void 0),
      (this.EndLocation = void 0);
  }
  OnBeginPlay() {
    (this.SelfForward = Vector_1.Vector.Create()),
      (this.SelfRight = Vector_1.Vector.Create()),
      (this.SelfUp = Vector_1.Vector.Create()),
      (this.SelfBackward = Vector_1.Vector.Create()),
      (this.Forward2D = Vector_1.Vector.Create()),
      (this.TmpResultLocation = Vector_1.Vector.Create()),
      (this.TmpResultRotator = Rotator_1.Rotator.Create()),
      (this.TmpLocation = Vector_1.Vector.Create()),
      (this.StartLocation = Vector_1.Vector.Create()),
      (this.EndLocation = Vector_1.Vector.Create()),
      (this.NormalRotator = Rotator_1.Rotator.Create()),
      super.OnBeginPlay();
  }
  UpdateData() {
    super.UpdateData();
    var t = this.SelfTransform.GetRotation();
    t.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.SelfForward),
      t.RotateVector(Vector_1.Vector.RightVectorProxy, this.SelfRight),
      this.SelfForward.CrossProduct(this.SelfRight, this.SelfUp),
      (this.ForwardSizeSquared2D =
        1 - MathUtils_1.MathUtils.Square(this.SelfForward.Z)),
      this.IsHorizontalPlane ||
        (this.Forward2D.DeepCopy(this.SelfForward),
        (this.Forward2D.Z = 0),
        this.Forward2D.DivisionEqual(this.ForwardSizeSquared2D),
        MathUtils_1.MathUtils.LookRotationForwardFirst(
          this.SelfBackward,
          Vector_1.Vector.UpVectorProxy,
          this.NormalRotator,
        ));
  }
  CheckLegal() {
    if (
      (this.TmpLocation || (this.TmpLocation = Vector_1.Vector.Create()),
      this.StartLocation || (this.StartLocation = Vector_1.Vector.Create()),
      this.EndLocation || (this.EndLocation = Vector_1.Vector.Create()),
      void 0 !== this.IsLegal)
    ) {
      var t = UE.EditorLevelLibrary.GetSelectedLevelActors();
      if (0 === t.Num() || t.Get(0) !== this) return this.IsLegal;
    }
    this.LineTrace || this.InitTraceInfo();
    var h = Math.ceil((2 * this.PlaneHalfHeight) / LEGAL_CHECK_PERIOD) + 1,
      i = 1 < h ? (2 * this.PlaneHalfHeight) / (h - 1) : 0;
    let s = -this.PlaneHalfHeight;
    for (let t = 0; t < h; ++t) {
      if (
        ((this.TmpLocation.X = 0),
        (this.TmpLocation.Y = -this.PlaneHalfWidth),
        (this.TmpLocation.Z = s),
        this.SelfTransform.TransformPositionNoScale(
          this.TmpLocation,
          this.StartLocation,
        ),
        (this.TmpLocation.Y = this.PlaneHalfWidth),
        this.SelfTransform.TransformPositionNoScale(
          this.TmpLocation,
          this.EndLocation,
        ),
        (this.LineTrace.WorldContextObject = this),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          this.LineTrace,
          this.StartLocation,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          this.LineTrace,
          this.EndLocation,
        ),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.LineTrace,
          PROFILE_KEY_CEHCK_LEGAL,
        ))
      )
        return !1;
      s += i;
    }
    var e = Math.ceil((2 * this.PlaneHalfWidth) / LEGAL_CHECK_PERIOD) + 1,
      a = 1 < e ? (2 * this.PlaneHalfWidth) / (e - 1) : 0;
    let r = -this.PlaneHalfWidth;
    for (let t = 0; t < e; ++t) {
      if (
        ((this.TmpLocation.X = 0),
        (this.TmpLocation.Y = r),
        (this.TmpLocation.Z = -this.PlaneHalfHeight),
        this.SelfTransform.TransformPositionNoScale(
          this.TmpLocation,
          this.StartLocation,
        ),
        (this.TmpLocation.Z = this.PlaneHalfHeight),
        this.SelfTransform.TransformPositionNoScale(
          this.TmpLocation,
          this.EndLocation,
        ),
        (this.LineTrace.WorldContextObject = this),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          this.LineTrace,
          this.StartLocation,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          this.LineTrace,
          this.EndLocation,
        ),
        TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.LineTrace,
          PROFILE_KEY_CEHCK_LEGAL,
        ))
      )
        return !1;
      r += a;
    }
    return !0;
  }
  OnDraw() {
    var i = this.IsLegal ? greenColor : yellowColor,
      s = ((this.TmpLocation.X = 0), drawPoints.length);
    for (let h = 0; h < s; ++h) {
      (this.TmpLocation.Y = drawPoints[h].Y * this.PlaneHalfWidth),
        (this.TmpLocation.Z = drawPoints[h].Z * this.PlaneHalfHeight),
        this.SelfTransform.TransformPositionNoScale(
          this.TmpLocation,
          this.StartLocation,
        );
      for (let t = h + 1; t < s; ++t)
        (this.TmpLocation.Y = drawPoints[t].Y * this.PlaneHalfWidth),
          (this.TmpLocation.Z = drawPoints[t].Z * this.PlaneHalfHeight),
          this.SelfTransform.TransformPositionNoScale(
            this.TmpLocation,
            this.EndLocation,
          ),
          UE.KismetSystemLibrary.DrawDebugLine(
            this,
            this.StartLocation.ToUeVector(),
            this.EndLocation.ToUeVector(),
            i,
            DRAW_TIME,
            DEFAULT_THICKNESS,
          );
    }
    this.SelfTransform.TransformPositionNoScale(
      forwardOffset,
      this.EndLocation,
    ),
      UE.KismetSystemLibrary.DrawDebugArrow(
        this,
        this.K2_GetActorLocation(),
        this.EndLocation.ToUeVector(),
        DEFAULT_ARROW_SIZE,
        redColor,
        DRAW_TIME,
        DEFAULT_THICKNESS,
      );
  }
  SetText(t) {
    (this.Text.HorizontalAlignment = 1),
      this.Text.SetWorldSize(TEXT_SIZE),
      this.Text.SetTextRenderColor(textColor),
      (this.Text.Text = "Plane " + this.TypeId);
  }
  OnGetBestTransform(t, h, i, s) {
    this.UpdateData();
    var e = this.TmpResult;
    return (
      this.ActorLocation.FromUeVector(t.K2_GetActorLocation()),
      this.ActorLocation.Subtraction(this.SelfLocation, this.SelfToActor),
      (e.Success = this.SelfToActor.DotProduct(this.SelfForward) > s),
      e.Success &&
        (this.MoveOffset.FromUeVector(h),
        this.IsHorizontalPlane
          ? ((h = this.GetBestTransformHorizontal(i, s)),
            (e.Location = h[0].ToUeVector()),
            (e.Rotator = h[1].ToUeRotator()),
            (e.SquaredOffsetLength = h[2]))
          : ((h = this.GetBestTransformNotHorizontal(i, s)),
            (e.Location = h[0].ToUeVector()),
            (e.Rotator = h[1].ToUeRotator()),
            (e.SquaredOffsetLength = h[2])),
        (this.LineTrace.WorldContextObject = t),
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(
          this.LineTrace,
          this.ActorLocation,
        ),
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(
          this.LineTrace,
          e.Location,
        ),
        (e.Success = !TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.LineTrace,
          PROFILE_KEY,
        )),
        e.Success),
      e
    );
  }
  GetBestTransformHorizontal(t, h) {
    var i = this.SelfRight.DotProduct(this.SelfToActor),
      s = this.SelfUp.DotProduct(this.SelfToActor),
      e = i + this.SelfRight.DotProduct(this.MoveOffset),
      a = s + this.SelfUp.DotProduct(this.MoveOffset),
      r = Math.abs(e),
      o = Math.abs(a),
      _ = this.PlaneHalfWidth,
      l = this.PlaneHalfHeight;
    if (r < _ && o < l)
      return (
        this.ActorLocation.Addition(this.MoveOffset, this.TmpResultLocation),
        (o =
          (r = this.SelfLocation.Z + this.SelfForward.X * h) -
          this.TmpResultLocation.Z),
        (this.TmpResultLocation.Z = r),
        MathUtils_1.MathUtils.LookRotationForwardFirst(
          this.SelfBackward,
          this.MoveOffset,
          this.TmpResultRotator,
        ),
        [this.TmpResultLocation, this.TmpResultRotator, o * o]
      );
    var r = Math.abs(i),
      o = Math.abs(s),
      M =
        MathUtils_1.MathUtils.Square(r + _) +
        MathUtils_1.MathUtils.Square(o + l),
      n = this.MoveOffset.SizeSquared2D();
    if (M <= n) {
      (this.TmpResultLocation.X = h),
        (this.TmpResultLocation.Y = 0 < e ? -_ : _),
        (this.TmpResultLocation.Z = 0 < a ? -l : l),
        this.SelfTransform.TransformPositionNoScale(
          this.TmpResultLocation,
          this.TmpResultLocation,
        ),
        this.TmpResultLocation.Subtraction(this.ActorLocation, this.TmpVector1),
        MathUtils_1.MathUtils.LookRotationForwardFirst(
          this.SelfBackward,
          this.TmpVector1,
          this.TmpResultRotator,
        );
      const E =
        MathUtils_1.MathUtils.Square(
          this.TmpResultLocation.Z - (this.ActorLocation.Z + this.MoveOffset.Z),
        ) + MathUtils_1.MathUtils.Square(Math.sqrt(n) - Math.sqrt(M));
      return [this.TmpResultLocation, this.TmpResultRotator, E];
    }
    if (this.FindHitMatrixAndCircle(_, l, i, s, n, e, a)) {
      (this.TmpResultLocation.X = h),
        this.TmpResultLocation.Subtraction(this.ActorLocation, this.TmpVector1),
        MathUtils_1.MathUtils.LookRotationForwardFirst(
          this.SelfBackward,
          this.TmpVector1,
          this.TmpResultRotator,
        );
      const E = MathUtils_1.MathUtils.Square(
        this.TmpResultLocation.Z - (this.ActorLocation.Z + this.MoveOffset.Z),
      );
      return [this.TmpResultLocation, this.TmpResultRotator, E];
    }
    (this.TmpResultLocation.X = h),
      (this.TmpResultLocation.Y = 0 < e ? _ : -_),
      (this.TmpResultLocation.Z = 0 < a ? l : -l),
      this.SelfTransform.TransformPositionNoScale(
        this.TmpResultLocation,
        this.TmpResultLocation,
      ),
      this.TmpResultLocation.Subtraction(this.ActorLocation, this.TmpVector1),
      MathUtils_1.MathUtils.LookRotationForwardFirst(
        this.SelfBackward,
        this.TmpVector1,
        this.TmpResultRotator,
      ),
      (M =
        MathUtils_1.MathUtils.Square(r - _) +
        MathUtils_1.MathUtils.Square(o - l));
    const E =
      MathUtils_1.MathUtils.Square(
        this.TmpResultLocation.Z - (this.ActorLocation.Z + this.MoveOffset.Z),
      ) +
      n +
      M -
      2 * Math.sqrt(n * M);
    return [this.TmpResultLocation, this.TmpResultRotator, E];
  }
  FindHitMatrixAndCircle(h, i, s, e, a, r, o) {
    let _ = 10 * a;
    for (let t = 0; t < 2; ++t) {
      var l,
        M,
        n = 0 === t ? h : -h,
        E = a - MathUtils_1.MathUtils.Square(s - n);
      0 < E &&
        ((l = e - (E = Math.sqrt(E))),
        Math.abs(l) < i &&
          (M =
            MathUtils_1.MathUtils.Square(n - r) +
            MathUtils_1.MathUtils.Square(l - o)) < _ &&
          ((_ = M),
          (this.TmpResultLocation.Y = n),
          (this.TmpResultLocation.Z = l)),
        (l = e + E),
        Math.abs(l) < i) &&
        (M =
          MathUtils_1.MathUtils.Square(n - r) +
          MathUtils_1.MathUtils.Square(l - o)) < _ &&
        ((_ = M),
        (this.TmpResultLocation.Y = n),
        (this.TmpResultLocation.Z = l));
    }
    for (let t = 0; t < 2; ++t) {
      var U,
        c,
        m = 0 === t ? i : -i,
        C = a - MathUtils_1.MathUtils.Square(e - m);
      0 < C &&
        ((U = s - (C = Math.sqrt(C))),
        Math.abs(s) < h &&
          (c =
            MathUtils_1.MathUtils.Square(U - r) +
            MathUtils_1.MathUtils.Square(m - o)) < _ &&
          ((_ = c),
          (this.TmpResultLocation.Y = U),
          (this.TmpResultLocation.Z = m)),
        (U = s + C),
        Math.abs(U) < i) &&
        (c =
          MathUtils_1.MathUtils.Square(U - r) +
          MathUtils_1.MathUtils.Square(m - o)) < _ &&
        ((_ = c),
        (this.TmpResultLocation.Y = U),
        (this.TmpResultLocation.Z = m));
    }
    return _ < 10 * a;
  }
  GetBestTransformNotHorizontal(t, h) {
    this.TmpVector1.DeepCopy(this.SelfToActor),
      (this.TmpVector1.Z += this.MoveOffset.Z);
    var i = this.SelfForward.DotProduct(this.TmpVector1),
      s = MathUtils_1.MathUtils.Square(i - h) / this.ForwardSizeSquared2D,
      e = this.MoveOffset.SizeSquared2D(),
      a = this.PlaneHalfWidth,
      r = this.PlaneHalfHeight;
    if (e <= s)
      return (
        this.TmpVector2.DeepCopy(this.Forward2D),
        this.TmpVector2.MultiplyEqual(Math.sqrt(e)),
        this.TmpVector1.SubtractionEqual(this.TmpVector2),
        (this.TmpResultLocation.X = h),
        (this.TmpResultLocation.Y = MathUtils_1.MathUtils.Clamp(
          this.SelfRight.DotProduct(this.TmpVector1),
          -a,
          a,
        )),
        (this.TmpResultLocation.Z = MathUtils_1.MathUtils.Clamp(
          this.SelfUp.DotProduct(this.TmpVector1),
          -r,
          r,
        )),
        this.SelfTransform.TransformPositionNoScale(
          this.TmpResultLocation,
          this.TmpResultLocation,
        ),
        this.TmpResultLocation.Subtraction(this.ActorLocation, this.TmpVector1),
        [
          this.TmpResultLocation,
          this.NormalRotator,
          MathUtils_1.MathUtils.Square(
            this.TmpVector1.Size2D() - Math.sqrt(e),
          ) +
            MathUtils_1.MathUtils.Square(this.TmpVector1.Z - this.MoveOffset.Z),
        ]
      );
    Vector_1.Vector.UpVectorProxy.CrossProduct(
      this.SelfForward,
      this.TmpVector1,
    ),
      Vector_1.Vector.UpVectorProxy.CrossProduct(
        this.TmpVector1,
        this.TmpVector2,
      ),
      this.TmpVector2.MultiplyEqual(
        Math.sign(i - h) * Math.sqrt(s / this.TmpVector2.SizeSquared()),
      ),
      this.TmpVector2.AdditionEqual(this.ActorLocation),
      (this.TmpVector2.Z += this.MoveOffset.Z),
      this.TmpVector1.MultiplyEqual(
        Math.sqrt((e - s) / this.TmpVector1.SizeSquared()),
      ),
      this.TmpVector2.Addition(this.TmpVector1, this.TmpVector3),
      this.SelfTransform.InverseTransformPositionNoScale(
        this.TmpVector3,
        this.TmpVector3,
      );
    let o =
      MathUtils_1.MathUtils.Square(
        Math.max(0, Math.abs(this.TmpVector3.Y) - a),
      ) +
      MathUtils_1.MathUtils.Square(
        Math.max(0, Math.abs(this.TmpVector3.Z) - r),
      );
    (this.TmpVector3.Y =
      Math.sign(this.TmpVector3.Y) * Math.min(Math.abs(this.TmpVector3.Y), a)),
      (this.TmpVector3.Z =
        Math.sign(this.TmpVector3.Z) *
        Math.min(Math.abs(this.TmpVector3.Z), r)),
      this.TmpVector2.Subtraction(this.TmpVector1, this.TmpVector4),
      this.SelfTransform.InverseTransformPositionNoScale(
        this.TmpVector4,
        this.TmpVector4,
      );
    i =
      MathUtils_1.MathUtils.Square(
        Math.max(0, Math.abs(this.TmpVector4.Y) - a),
      ) +
      MathUtils_1.MathUtils.Square(
        Math.max(0, Math.abs(this.TmpVector4.Z) - r),
      );
    return (
      o > i || (Math.abs(o - i) < SMALL_VALUE && 0.5 <= Math.random())
        ? ((o = i),
          (this.TmpVector4.Y =
            Math.sign(this.TmpVector4.Y) *
            Math.min(Math.abs(this.TmpVector4.Y), a)),
          (this.TmpVector4.Z =
            Math.sign(this.TmpVector4.Z) *
            Math.min(Math.abs(this.TmpVector4.Z), r)),
          this.SelfTransform.InverseTransformPositionNoScale(
            this.TmpVector4,
            this.TmpResultLocation,
          ))
        : ((this.TmpVector3.Y =
            Math.sign(this.TmpVector3.Y) *
            Math.min(Math.abs(this.TmpVector3.Y), a)),
          (this.TmpVector3.Z =
            Math.sign(this.TmpVector3.Z) *
            Math.min(Math.abs(this.TmpVector3.Z), r)),
          this.SelfTransform.InverseTransformPositionNoScale(
            this.TmpVector3,
            this.TmpResultLocation,
          )),
      [this.TmpResultLocation, this.NormalRotator, o]
    );
  }
}
exports.default = TsSimpleInteractPlane;
//# sourceMappingURL=TsSimpleInteractPlane.js.map
