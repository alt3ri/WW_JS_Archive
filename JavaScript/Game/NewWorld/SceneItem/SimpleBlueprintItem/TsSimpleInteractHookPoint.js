"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const TsSimpleInteractBase_1 = require("./TsSimpleInteractBase");
const redColor = new UE.LinearColor(1, 0, 0, 1);
const blueColor = new UE.LinearColor(0, 0, 1, 1);
const DRAW_TIME = 0.05;
const DEFAULT_THICKNESS = 4;
const DEFAULT_ARROW_SIZE = 20;
const DRAW_LENGTH = 100;
const forwardOffset = new UE.Vector(DRAW_LENGTH, 0, 0);
const upOffset = new UE.Vector(0, 0, DRAW_LENGTH);
const textColor = new UE.Color(255, 128, 128, 255);
const TEXT_SIZE = 80;
const PROFILE_KEY = "TsSimpleInteractHookPoint_GetBestTransform";
class TsSimpleInteractHookPoint extends TsSimpleInteractBase_1.default {
  constructor() {
    super(...arguments), (this.TmpLocation = void 0);
  }
  CheckLegal() {
    return !0;
  }
  OnDraw() {
    const t = this.K2_GetActorLocation();
    const e = this.GetTransform();
    UE.KismetSystemLibrary.DrawDebugArrow(
      this,
      t,
      e.TransformPosition(forwardOffset),
      DEFAULT_ARROW_SIZE,
      redColor,
      DRAW_TIME,
      DEFAULT_THICKNESS,
    ),
      UE.KismetSystemLibrary.DrawDebugArrow(
        this,
        t,
        e.TransformPosition(upOffset),
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
      (this.Text.Text = "HookPoint " + this.TypeId);
  }
  OnGetBestTransform(t, e, s, i) {
    return (
      this.ActorLocation.FromUeVector(t.K2_GetActorLocation()),
      this.ActorLocation.Subtraction(this.SelfLocation, this.SelfToActor),
      (this.TmpVector1.X = i),
      (this.TmpVector1.Y = 0),
      (this.TmpVector1.Z = 0),
      this.TmpLocation || (this.TmpLocation = Vector_1.Vector.Create()),
      this.SelfTransform.TransformPosition(this.TmpVector1, this.TmpLocation),
      (this.TmpResult.Location = this.TmpLocation.ToUeVector()),
      (this.LineTrace.WorldContextObject = t),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(
        this.LineTrace,
        this.ActorLocation,
      ),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(
        this.LineTrace,
        this.TmpResult.Location,
      ),
      (this.TmpResult.Success =
        !TraceElementCommon_1.TraceElementCommon.LineTrace(
          this.LineTrace,
          PROFILE_KEY,
        )),
      (this.LineTrace.WorldContextObject = void 0),
      this.TmpResult.Success,
      this.TmpResult
    );
  }
}
exports.default = TsSimpleInteractHookPoint;
// # sourceMappingURL=TsSimpleInteractHookPoint.js.map
