"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskCalculateBackwardPosition extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.Distance = 0),
      (this.BlackboardKey = ""),
      (this.IsInitTsVariables = !1),
      (this.TsDistance = 0),
      (this.TsBlackboardKey = "");
  }
  Constructor() {
    super.Constructor(),
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
      var r = r.CharActorComp,
        s = r.ActorLocationProxy;
      let e = r.ActorForwardProxy;
      var o =
          ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(
            r.Entity.Id,
            "InputDirect",
          ),
        o =
          (o &&
            ((e = Vector_1.Vector.Create(o)).IsNearlyZero() &&
              (e = r.ActorForwardProxy),
            ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(
              r.Entity.Id,
              "InputDirect",
            )),
          Vector_1.Vector.Create(e));
      o.MultiplyEqual(-this.TsDistance),
        o.AdditionEqual(s),
        ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(
          r.Entity.Id,
          this.TsBlackboardKey,
          o.X,
          o.Y,
          o.Z,
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
//# sourceMappingURL=TsTaskCalculateBackwardPosition.js.map
