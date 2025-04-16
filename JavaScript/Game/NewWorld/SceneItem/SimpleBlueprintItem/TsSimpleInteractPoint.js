"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  TsSimpleInteractBase_1 = require("./TsSimpleInteractBase"),
  redColor = new UE.LinearColor(1, 0, 0, 1),
  blueColor = new UE.LinearColor(0, 0, 1, 1),
  DRAW_TIME = 0.05,
  DEFAULT_THICKNESS = 4,
  DEFAULT_ARROW_SIZE = 20,
  DRAW_LENGTH = 100,
  forwardOffset = new UE.VectorDouble(DRAW_LENGTH, 0, 0),
  upOffset = new UE.VectorDouble(0, 0, DRAW_LENGTH),
  textColor = new UE.Color(255, 128, 128, 255),
  TEXT_SIZE = 80,
  PROFILE_KEY = "TsSimpleInteractPoint_GetBestTransform";
class TsSimpleInteractPoint extends TsSimpleInteractBase_1.default {
  constructor() {
    super(...arguments),
      (this.OnWall = !0),
      (this.OutRotator = void 0),
      (this.TmpLocation = void 0);
  }
  Constructor() {
    super.Constructor(),
      (this.OutRotator = void 0),
      (this.TmpLocation = void 0);
  }
  OnBeginPlay() {
    (this.OutRotator = Rotator_1.Rotator.Create()),
      (this.TmpLocation = Vector_1.Vector.Create()),
      super.OnBeginPlay();
  }
  CheckLegal() {
    return !0;
  }
  OnDraw() {
    var t = this.D_K2_GetActorLocation(),
      s = this.D_GetTransform();
    this.OnWall
      ? UE.KismetSystemLibrary.D_DrawDebugArrow(
          this,
          t,
          s.TransformPosition(forwardOffset),
          DEFAULT_ARROW_SIZE,
          redColor,
          DRAW_TIME,
          DEFAULT_THICKNESS,
        )
      : UE.KismetSystemLibrary.D_DrawDebugArrow(
          this,
          t,
          s.TransformPosition(upOffset),
          DEFAULT_ARROW_SIZE,
          blueColor,
          DRAW_TIME,
          DEFAULT_THICKNESS,
        );
  }
  SetText(t) {
    (this.Text.HorizontalAlignment = 1),
      this.Text.SetWorldSize(TEXT_SIZE),
      this.Text.SetTextRenderColor(textColor),
      (this.Text.Text = "Point " + this.TypeId);
  }
  OnGetBestTransform(t, s, i, h) {
    return (
      this.UpdateData(),
      this.ActorLocation.FromUeVector(t.D_K2_GetActorLocation()),
      this.ActorLocation.Subtraction(this.SelfLocation, this.SelfToActor),
      (this.OnWall &&
        MathUtils_1.MathUtils.DotProduct(
          this.SelfToActor,
          this.GetActorForwardVector(),
        ) > h) ||
        (this.OnWall
          ? ((this.TmpVector1.X = h),
            (this.TmpVector1.Y = 0),
            (this.TmpVector1.Z = 0))
          : ((this.TmpVector1.X = 0),
            (this.TmpVector1.Y = 0),
            (this.TmpVector1.Z = i)),
        this.SelfTransform.TransformPosition(this.TmpVector1, this.TmpLocation),
        (this.TmpResult.Location = this.TmpLocation.ToUeVectorOld()),
        this.OnWall
          ? (((h = this.LineTrace).WorldContextObject = t),
            TraceElementCommon_1.TraceElementCommon.SetStartLocation(
              h,
              this.ActorLocation,
            ),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
              h,
              this.TmpResult.Location,
            ),
            (this.TmpResult.Success =
              !TraceElementCommon_1.TraceElementCommon.LineTrace(
                h,
                PROFILE_KEY,
              )),
            (h.WorldContextObject = void 0),
            this.TmpResult.Success &&
              (this.MoveOffset.FromUeVector(s),
              this.SelfLocation.Subtraction(
                this.ActorLocation,
                this.TmpVector1,
              ),
              (this.TmpResult.SquaredOffsetLength =
                MathUtils_1.MathUtils.Square(
                  this.SelfToActor.Size2D() - this.MoveOffset.Size2D(),
                ) +
                MathUtils_1.MathUtils.Square(
                  this.SelfToActor.Z + this.MoveOffset.Z,
                )),
              (i = this.SelfTransform.GetRotation()).RotateVector(
                Vector_1.Vector.ForwardVectorProxy,
                this.TmpVector1,
              ),
              i.RotateVector(Vector_1.Vector.UpVectorProxy, this.TmpVector2),
              this.TmpVector1.UnaryNegation(this.TmpVector1),
              MathUtils_1.MathUtils.LookRotationForwardFirst(
                this.TmpVector1,
                this.TmpVector2,
                this.OutRotator,
              ),
              (this.TmpResult.Rotator = this.OutRotator.ToUeRotator())))
          : ((this.TmpResult.Success = !0),
            this.MoveOffset.FromUeVector(s),
            this.SelfLocation.Subtraction(this.ActorLocation, this.TmpVector1),
            (this.TmpResult.SquaredOffsetLength =
              MathUtils_1.MathUtils.Square(
                this.SelfToActor.Size2D() - this.MoveOffset.Size2D(),
              ) +
              MathUtils_1.MathUtils.Square(
                this.SelfToActor.Z + this.MoveOffset.Z,
              )),
            this.SelfTransform.GetRotation().RotateVector(
              Vector_1.Vector.UpVectorProxy,
              this.TmpVector2,
            ),
            MathUtils_1.MathUtils.LookRotationForwardFirst(
              this.TmpVector1,
              this.TmpVector2,
              this.OutRotator,
            ),
            (this.TmpResult.Rotator = this.OutRotator.ToUeRotator()))),
      this.TmpResult
    );
  }
}
exports.default = TsSimpleInteractPoint;
//# sourceMappingURL=TsSimpleInteractPoint.js.map
