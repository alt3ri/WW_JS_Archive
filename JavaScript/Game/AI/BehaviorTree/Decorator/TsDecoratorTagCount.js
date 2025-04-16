"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../GlobalData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class TsDecoratorTagCount extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.BlackboardKeyTarget = ""),
      (this.Tag = void 0),
      (this.Range = void 0),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKeyTarget = ""),
      (this.TsTag = void 0),
      (this.TsRange = void 0);
  }
  Constructor() {
    (this.IsInitTsVariables = !1),
      (this.TsBlackboardKeyTarget = ""),
      (this.TsTag = void 0),
      (this.TsRange = void 0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKeyTarget = this.BlackboardKeyTarget),
      (this.TsTag = this.Tag),
      (this.TsRange = new MathUtils_1.FastUeFloatRange(this.Range)));
  }
  PerformConditionCheckAI(t, r) {
    var i = t.AiController;
    if (!i)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        !1
      );
    this.InitTsVariables();
    let o = i.CharActorComp;
    if (this.TsBlackboardKeyTarget) {
      t =
        ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(
          i.CharAiDesignComp.Entity.Id,
          this.TsBlackboardKeyTarget,
        );
      if (!t) return !1;
      i =
        ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(
          t,
        );
      if (!i) return !1;
      o = i;
    }
    t = o.Entity.CheckGetComponent(203).GetTagCount(this.TsTag.TagId);
    return MathUtils_1.MathUtils.InFastUeRange(t, this.TsRange);
  }
}
exports.default = TsDecoratorTagCount;
//# sourceMappingURL=TsDecoratorTagCount.js.map
