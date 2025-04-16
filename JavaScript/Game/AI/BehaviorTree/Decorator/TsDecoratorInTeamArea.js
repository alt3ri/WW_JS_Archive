"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
class TsDecoratorInTeamArea extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments), (this.TmpVector = void 0);
  }
  Constructor() {
    this.TmpVector = void 0;
  }
  PerformConditionCheckAI(r, e) {
    var o,
      t,
      i = r.AiController;
    return i
      ? !(o = i.AiHateList.GetCurrentTarget())?.Valid ||
          !(
            o.Entity.GetComponent(3) &&
            ((o = i.CharAiDesignComp.Entity.Id),
            this.TmpVector || (this.TmpVector = Vector_1.Vector.Create()),
            this.TmpVector.FromUeVector(
              ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(
                o,
                "TeamTargetLocation",
              ),
            ),
            (t = i.AiTeam.GetAiTeamAreaMemberData(i)))
          ) ||
          AiContollerLibrary_1.AiControllerLibrary.InTeamArea(i, t)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            r.GetClass().GetName(),
          ]),
        !1);
  }
}
exports.default = TsDecoratorInTeamArea;
//# sourceMappingURL=TsDecoratorInTeamArea.js.map
