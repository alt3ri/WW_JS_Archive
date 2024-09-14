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
      (this.DebugLog = !1),
      (this.IsInitTsVariables = !1),
      (this.TsCheckTags = void 0),
      (this.TsCheckTagValues = void 0),
      (this.TsLogic = void 0),
      (this.TsBlackBoardKeyTarget = ""),
      (this.TsDebugLog = !1);
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      (this.IsInitTsVariables = !0),
        (this.TsLogic = this.Logic),
        (this.TsBlackBoardKeyTarget = this.BlackboardKeyTarget),
        (this.TsDebugLog = this.DebugLog),
        (this.TsCheckTags = new Array()),
        (this.TsCheckTagValues = new Array());
      for (let t = this.Checks.Num() - 1; 0 <= t; --t) {
        var e = this.Checks.GetKey(t),
          r = this.Checks.Get(e);
        this.TsCheckTags.push(e?.TagId), this.TsCheckTagValues.push(r);
      }
    }
  }
  PerformConditionCheckAI(t, e) {
    var r = t.AiController;
    if (!r)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        !1
      );
    if (!r.CharActorComp)
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
    this.InitTsVariables(),
      this.TsDebugLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BehaviorTree", 6, "TagCheck", [
          "controller",
          t?.GetName(),
        ]);
    let i = r.CharActorComp.Entity;
    if (this.TsBlackBoardKeyTarget) {
      t = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
        i.Id,
        this.TsBlackBoardKeyTarget,
      );
      if (!t)
        return (
          this.TsDebugLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("BehaviorTree", 6, "TagCheck false. Blackboard1"),
          !1
        );
      if (!(i = EntitySystem_1.EntitySystem.Get(t))?.Valid)
        return (
          this.TsDebugLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("BehaviorTree", 6, "TagCheck false. Blackboard2"),
          !1
        );
    }
    var o = i.GetComponent(190);
    if (1 === this.TsLogic) {
      for (let t = this.TsCheckTags.length - 1; 0 <= t; --t) {
        var s = this.TsCheckTags[t],
          h = this.TsCheckTagValues[t];
        if (o?.HasTag(s) === h)
          return (
            this.TsDebugLog &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("BehaviorTree", 6, "TagCheck true. Or", [
                "tag",
                s,
              ]),
            !0
          );
      }
      return (
        this.TsDebugLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("BehaviorTree", 6, "TagCheck false. Or", [
            "tagCount",
            this.TsCheckTags?.length,
          ]),
        !1
      );
    }
    for (let t = this.TsCheckTags.length - 1; 0 <= t; --t) {
      var a = this.TsCheckTags[t],
        l = this.TsCheckTagValues[t];
      if (o?.HasTag(a) !== l)
        return (
          this.TsDebugLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("BehaviorTree", 6, "TagCheck false. And", [
              "tag",
              a,
            ]),
          !1
        );
    }
    return (
      this.TsDebugLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BehaviorTree", 6, "TagCheck true. And", [
          "tagCount",
          this.TsCheckTags?.length,
        ]),
      !0
    );
  }
}
exports.default = TsDecoratorTagCheck;
//# sourceMappingURL=TsDecoratorTagCheck.js.map
