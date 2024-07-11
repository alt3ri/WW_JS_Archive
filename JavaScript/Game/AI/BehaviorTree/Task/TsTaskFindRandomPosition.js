"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../GlobalData"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskFindRandomPosition extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.StartPositionOffset = void 0),
      (this.MinRange = 0),
      (this.MaxRange = 0),
      (this.UseFullRange = !1),
      (this.SaveBlackBoardKey = ""),
      (this.IsInitTsVariables = !1),
      (this.TsStartPositionOffset = void 0),
      (this.TsMinRange = 0),
      (this.TsMaxRange = 0),
      (this.TsUseFullRange = !1),
      (this.TsSaveBlackBoardKey = "");
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsStartPositionOffset = Vector_1.Vector.Create(
        this.StartPositionOffset,
      )),
      (this.TsMinRange = this.MinRange),
      (this.TsMaxRange = this.MaxRange),
      (this.TsUseFullRange = this.UseFullRange),
      (this.TsSaveBlackBoardKey = this.SaveBlackBoardKey));
  }
  ReceiveExecuteAI(t, s) {
    this.InitTsVariables();
    var i,
      e = t.AiController;
    e
      ? ((e = e.CharActorComp),
        this.TsSaveBlackBoardKey &&
          ((i = this.CalculateTargetPosition(e)),
          BlackboardController_1.BlackboardController.SetVectorValueByEntity(
            e.Entity.Id,
            this.TsSaveBlackBoardKey,
            i.X,
            i.Y,
            i.Z,
          )),
        this.FinishExecute(!0))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  CalculateTargetPosition(t) {
    var s = t.ActorLocationProxy,
      t = t.ActorForwardProxy,
      i = MathUtils_1.MathUtils.GetRandomFloatNumber(
        0,
        MathUtils_1.PI_DEG_DOUBLE,
      ),
      t = Vector_1.Vector.Create(t),
      i =
        (t.RotateAngleAxis(i, Vector_1.Vector.UpVectorProxy, t),
        Vector_1.Vector.Create(this.TsStartPositionOffset)),
      s =
        (i.AdditionEqual(s),
        t.MultiplyEqual(
          this.TsUseFullRange
            ? this.TsMaxRange
            : MathUtils_1.MathUtils.GetRandomFloatNumber(
                this.TsMinRange,
                this.TsMaxRange,
              ),
        ));
    return i.AdditionEqual(s);
  }
}
exports.default = TsTaskFindRandomPosition;
//# sourceMappingURL=TsTaskFindRandomPosition.js.map
