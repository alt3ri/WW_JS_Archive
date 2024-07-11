"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskCalculateBackwardPosition extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.Distance = 0),
      (this.BlackboardKey = ""),
      (this.IsInitTsVariables = !1),
      (this.TsDistance = 0),
      (this.TsBlackboardKey = "");
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsDistance = this.Distance),
      (this.TsBlackboardKey = this.BlackboardKey));
  }
  ReceiveExecuteAI(e, t) {
    var r = e.AiController;
    if (r) {
      this.InitTsVariables();
      var r = r.CharActorComp;
      const o = r.ActorLocationProxy;
      let e = r.ActorForwardProxy;
      var a =
        BlackboardController_1.BlackboardController.GetVectorValueByEntity(
          r.Entity.Id,
          "InputDirect",
        );
      var a =
        (a &&
          ((e = Vector_1.Vector.Create(a)).IsNearlyZero() &&
            (e = r.ActorForwardProxy),
          BlackboardController_1.BlackboardController.RemoveValueByEntity(
            r.Entity.Id,
            "InputDirect",
          )),
        Vector_1.Vector.Create(e));
      a.MultiplyEqual(-this.TsDistance),
        a.AdditionEqual(o),
        BlackboardController_1.BlackboardController.SetVectorValueByEntity(
          r.Entity.Id,
          this.TsBlackboardKey,
          a.X,
          a.Y,
          a.Z,
        ),
        this.FinishExecute(!0);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          e.GetClass().GetName(),
        ]),
        this.FinishExecute(!1);
  }
}
exports.default = TsTaskCalculateBackwardPosition;
// # sourceMappingURL=TsTaskCalculateBackwardPosition.js.map
