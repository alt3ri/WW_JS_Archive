"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiRegistry = void 0);
const LevelAiDecoratorCheckInTodTimeSpan_1 = require("./Decorators/LevelAiDecoratorCheckInTodTimeSpan"),
  LevelAiDecoratorCheckLevelPlayState_1 = require("./Decorators/LevelAiDecoratorCheckLevelPlayState"),
  LevelAiDecoratorCheckTodTimePeriod_1 = require("./Decorators/LevelAiDecoratorCheckTodTimePeriod"),
  LevelAiDecoratorCheckWeather_1 = require("./Decorators/LevelAiDecoratorCheckWeather"),
  LevelAiDecoratorCompareVar_1 = require("./Decorators/LevelAiDecoratorCompareVar"),
  LevelAiDecoratorEntityState_1 = require("./Decorators/LevelAiDecoratorEntityState"),
  LevelAiDecoratorQuestState_1 = require("./Decorators/LevelAiDecoratorQuestState"),
  LevelAiDecoratorQuestStepState_1 = require("./Decorators/LevelAiDecoratorQuestStepState"),
  LevelAiTaskEntityTurnTo_1 = require("./Tasks/LevelAiTaskEntityTurnTo"),
  LevelAiTaskLeisureInteract_1 = require("./Tasks/LevelAiTaskLeisureInteract"),
  LevelAiTaskLog_1 = require("./Tasks/LevelAiTaskLog"),
  LevelAiTaskPlayBubble_1 = require("./Tasks/LevelAiTaskPlayBubble"),
  LevelAiTaskPlayMontage_1 = require("./Tasks/LevelAiTaskPlayMontage"),
  LevelAiTaskSetVar_1 = require("./Tasks/LevelAiTaskSetVar"),
  LevelAiTaskTurnTo_1 = require("./Tasks/LevelAiTaskTurnTo");
class LevelAiRegistry {
  constructor() {
    (this.STe = new Map()), (this.yTe = new Map());
  }
  static Instance() {
    return (
      LevelAiRegistry.cj ||
        ((LevelAiRegistry.cj = new LevelAiRegistry()),
        LevelAiRegistry.cj.RegisterLevelAi()),
      LevelAiRegistry.cj
    );
  }
  RegisterLevelAi() {
    this.VZ(), this.HZ();
  }
  VZ() {
    this.STe.set("Log", LevelAiTaskLog_1.LevelAiTaskLog),
      this.STe.set("SetVar", LevelAiTaskSetVar_1.LevelAiTaskSetVar),
      this.STe.set(
        "PlayRegisteredMontage",
        LevelAiTaskPlayMontage_1.LevelAiTaskPlayMontage,
      ),
      this.STe.set("PlayBubble", LevelAiTaskPlayBubble_1.LevelAiTaskPlayBubble),
      this.STe.set("EntityLookAt", LevelAiTaskTurnTo_1.LevelAiTaskTurnTo),
      this.STe.set(
        "EntityTurnTo",
        LevelAiTaskEntityTurnTo_1.LevelAiTaskEntityTurnTo,
      ),
      this.STe.set(
        "NpcLeisureInteract",
        LevelAiTaskLeisureInteract_1.LevelAiTaskLeisureInteract,
      );
  }
  HZ() {
    this.yTe.set(
      "CompareVar",
      LevelAiDecoratorCompareVar_1.LevelAiDecoratorCompareVar,
    ),
      this.yTe.set(
        "CompareQuestState",
        LevelAiDecoratorQuestState_1.LevelAiDecoratorQuestState,
      ),
      this.yTe.set(
        "CompareEntityState",
        LevelAiDecoratorEntityState_1.LevelAiDecoratorEntityState,
      ),
      this.yTe.set(
        "HourToHour",
        LevelAiDecoratorCheckInTodTimeSpan_1.LevelAiDecoratorCheckInTodTimeSpan,
      ),
      this.yTe.set(
        "CompareWeather",
        LevelAiDecoratorCheckWeather_1.LevelAiDecoratorCheckWeather,
      ),
      this.yTe.set(
        "CompareTimePeriod",
        LevelAiDecoratorCheckTodTimePeriod_1.LevelAiDecoratorCheckTodTimePeriod,
      ),
      this.yTe.set(
        "CheckLevelPlayState",
        LevelAiDecoratorCheckLevelPlayState_1.LevelAiDecoratorCheckLevelPlayState,
      ),
      this.yTe.set(
        "CheckChildQuestFinished",
        LevelAiDecoratorQuestStepState_1.LevelAiDecoratorQuestStepState,
      );
  }
  FindTaskCtor(e) {
    return this.STe.get(e);
  }
  FindDecoratorCtor(e) {
    return this.yTe.get(e);
  }
}
(exports.LevelAiRegistry = LevelAiRegistry).cj = void 0;
//# sourceMappingURL=LevelAiRegistry.js.map
