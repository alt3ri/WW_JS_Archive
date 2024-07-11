"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const GlobalData_1 = require("../../../GlobalData");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const PI = 3.14;
class TsTaskFindPositionInRange extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.RangeCenterKey = ""),
      (this.RangeRadius = 0),
      (this.BlackboardKey = ""),
      (this.IsInitTsVariables = !1),
      (this.TsRangeCenterKey = ""),
      (this.TsRangeRadius = 0),
      (this.TsBlackboardKey = ""),
      (this.RangeCenter = void 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsRangeCenterKey = this.RangeCenterKey),
      (this.TsRangeRadius = this.RangeRadius),
      (this.TsBlackboardKey = this.BlackboardKey));
  }
  ReceiveExecuteAI(t, e) {
    this.InitTsVariables();
    var s = t.AiController;
    if (s) {
      s = s.CharActorComp;
      if (s?.Valid) {
        var s = s.Entity;
        const i = s.Id;
        if (this.TsRangeCenterKey) {
          var r =
            BlackboardController_1.BlackboardController.GetVectorValueByEntity(
              i,
              this.TsRangeCenterKey,
            );
          if (!r)
            return (
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("BehaviorTree", 30, "不存在BlackboardKey", [
                  "Key",
                  this.TsRangeCenterKey,
                ]),
              void this.FinishExecute(!1)
            );
          this.RangeCenter = Vector_1.Vector.Create(r);
        } else {
          r = s.GetComponent(0).GetInitLocation();
          this.RangeCenter = Vector_1.Vector.Create(r.X, r.Y, r.Z);
        }
        (s = Vector_1.Vector.Create()),
          (r = this.RandomPointInCircle(this.TsRangeRadius));
        (s.X = this.RangeCenter.X + r.X),
          (s.Y = this.RangeCenter.Y + r.Y),
          BlackboardController_1.BlackboardController.SetVectorValueByEntity(
            i,
            this.TsBlackboardKey,
            s.X,
            s.Y,
            s.Z,
          ),
          this.FinishExecute(!0);
      } else this.FinishExecute(!1);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          t.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
  RandomPointInCircle(t) {
    let e;
    return t <= 0
      ? { X: 0, Y: 0 }
      : ((t = MathUtils_1.MathUtils.GetRandomRange(0, t * t)),
        (e = MathUtils_1.MathUtils.GetRandomRange(0, 2 * PI)),
        { X: (t = Math.sqrt(t)) * Math.cos(e), Y: t * Math.sin(e) });
  }
}
exports.default = TsTaskFindPositionInRange;
// # sourceMappingURL=TsTaskFindPositionInRange.js.map
