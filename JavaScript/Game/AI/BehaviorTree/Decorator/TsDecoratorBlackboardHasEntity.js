"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  BlackboardController_1 = require("../../../World/Controller/BlackboardController"),
  ServerGmController_1 = require("../../../World/Controller/ServerGmController");
class TsDecoratorBlackboardHasEntity extends UE.BTDecorator_BlueprintBase {
  constructor() {
    super(...arguments),
      (this.BlackboardKey = ""),
      (this.CompareValue = !0),
      (this.IsInitTsVariables = !1),
      (this.TsBlackboardKey = ""),
      (this.TsCompareValue = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsBlackboardKey = this.BlackboardKey),
      (this.TsCompareValue = this.CompareValue));
  }
  PerformConditionCheckAI(r, t) {
    var e = r.AiController,
      o =
        ServerGmController_1.ServerGmController.AnimalDebug &&
        "NearerPlayerId" === this.BlackboardKey;
    if (
      (o &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AI",
          6,
          "AnimalDebug BlackboardHasEntity",
          ["Tree", this.TreeAsset?.GetName()],
          ["aiController", !!e],
          ["aiComp", !!e?.CharAiDesignComp],
          ["SelfId", e?.CharActorComp?.Entity.Id],
        ),
      !e)
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            r.GetClass().GetName(),
          ]),
        !1
      );
    r = e.CharAiDesignComp;
    if (!r) return !1;
    if ((this.InitTsVariables(), this.TsBlackboardKey)) {
      e = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
        r.Entity.Id,
        this.TsBlackboardKey,
      );
      if (
        (o &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("AI", 6, "AnimalDebug BlackboardHasEntity2", [
              "value",
              e,
            ]),
          e) &&
          ((o = EntitySystem_1.EntitySystem.GetComponent(
            e,
            3,
          )?.CreatureData.GetEntityType()),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info(
            "AI",
            6,
            "AnimalDebug BlackboardHasEntity3",
            ["entityType", o],
            ["Player", Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()],
            [
              "MainAnims",
              r.Entity.GetComponent(
                163,
              )?.MainAnimInstance?.GetMainAnimsDebugText(),
            ],
          ),
        e && EntitySystem_1.EntitySystem.Get(e))
      )
        return this.TsCompareValue;
    }
    return !this.TsCompareValue;
  }
}
exports.default = TsDecoratorBlackboardHasEntity;
//# sourceMappingURL=TsDecoratorBlackboardHasEntity.js.map
