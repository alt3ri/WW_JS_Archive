"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SimpleNpcFlowConditionChecker = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager");
class SimpleNpcFlowConditionChecker {
  static GetFlowActorIndex(e) {
    switch (e) {
      case 140:
        return 0;
      case 141:
        return 1;
      case 142:
        return 2;
      case 143:
        return 3;
      case 144:
        return 4;
      case 145:
        return 5;
      case 146:
        return 6;
      case 147:
        return 7;
      case 148:
        return 8;
      case 149:
        return 9;
    }
    return -1;
  }
  static CheckCondition(e) {
    switch (e.CheckType) {
      case 1:
        return this.eor(e.CheckValue);
      case 2:
        return this.tor(e.CheckValue);
      case 3:
        return this.ior(0);
      case 4:
        return this.ior(1);
      case 5:
        return this.ior(2);
      case 6:
        return this.ior(3);
      case 7:
        return this.oor(e.CheckValue);
      case 8:
        return this.ror(e.CheckValue);
    }
    return !0;
  }
  static eor(e) {
    return !0;
  }
  static tor(e) {
    return !0;
  }
  static ior(e) {
    return ModelManager_1.ModelManager.TimeOfDayModel.GameTime.DayState === e;
  }
  static oor(e) {
    return (
      0 === e ||
      2 === ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e)
    );
  }
  static ror(e) {
    return (
      0 === e || ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e)
    );
  }
  static CheckFirstEnter(e) {
    return !this.nor.has(e);
  }
  static SetFirstEnter(e) {
    this.nor.add(e);
  }
}
(exports.SimpleNpcFlowConditionChecker = SimpleNpcFlowConditionChecker).nor =
  new Set();
//# sourceMappingURL=SimpleNpcFlowConditionChecker.js.map
