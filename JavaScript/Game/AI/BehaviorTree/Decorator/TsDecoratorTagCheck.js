"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  GlobalData_1 = require("../../../GlobalData"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController");
class TsDecoratorTagCheck extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.BlackboardKeyTarget = ""),
      (this.Checks = void 0),
      (this.Logic = 0),
      (this.IsBattleTag = !0),
      (this.IsInitTsVariables = !1),
      (this.TsCheckTags = void 0),
      (this.TsCheckTagValues = void 0),
      (this.TsLogic = void 0),
      (this.TsBlackBoardKeyTarget = "");
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      (this.IsInitTsVariables = !0),
        (this.TsLogic = this.Logic),
        (this.TsBlackBoardKeyTarget = this.BlackboardKeyTarget),
        (this.TsCheckTags = new Array()),
        (this.TsCheckTagValues = new Array());
      for (let t = this.Checks.Num() - 1; 0 <= t; --t) {
        var r = this.Checks.GetKey(t),
          e = this.Checks.Get(r);
        this.TsCheckTags.push(r?.TagId), this.TsCheckTagValues.push(e);
      }
    }
  }
  PerformConditionCheckAI(t, r) {
    var e = t.AiController;
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        !1
      );
    if (!e.CharActorComp)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "BehaviorTree",
            6,
            "错误的Controller类型",
            ["Type", t.GetClass().GetName()],
            ["Id", t.GetEntity().Id],
          ),
        !1
      );
    this.InitTsVariables();
    let i = e.CharActorComp.Entity;
    if (this.TsBlackBoardKeyTarget) {
      t = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
        i.Id,
        this.TsBlackBoardKeyTarget,
      );
      if (!t) return !1;
      if (!(i = EntitySystem_1.EntitySystem.Get(t))?.Valid) return !1;
    }
    var o = i.GetComponent(188);
    if (1 === this.TsLogic) {
      for (let t = this.TsCheckTags.length - 1; 0 <= t; --t) {
        var s = this.TsCheckTags[t],
          h = this.TsCheckTagValues[t];
        if (o?.HasTag(s) === h) return !0;
      }
      return !1;
    }
    for (let t = this.TsCheckTags.length - 1; 0 <= t; --t) {
      var a = this.TsCheckTags[t],
        l = this.TsCheckTagValues[t];
      if (o?.HasTag(a) !== l) return !1;
    }
    return !0;
  }
}
exports.default = TsDecoratorTagCheck;
//# sourceMappingURL=TsDecoratorTagCheck.js.map
