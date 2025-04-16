"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.skipConditionCheckerMap =
    exports.TeleportStateConditionChecker =
    exports.QuestStateConditionChecker =
    exports.SystemFunctionConditionChecker =
      void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
class SystemFunctionConditionChecker {
  Parse(e) {
    return { ConditionType: 1, FunctionType: e[0] };
  }
  Check(e) {
    e = this.Parse(e).FunctionType;
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(e);
  }
}
exports.SystemFunctionConditionChecker = SystemFunctionConditionChecker;
class QuestStateConditionChecker {
  Parse(e) {
    return { ConditionType: 2, QuestId: e[0], CheckQuestState: e[1] };
  }
  Check(e) {
    var e = this.Parse(e),
      t = e.QuestId,
      e = e.CheckQuestState,
      t = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(t);
    return 0 === e ? !t : t;
  }
}
exports.QuestStateConditionChecker = QuestStateConditionChecker;
class TeleportStateConditionChecker {
  Parse(e) {
    return { ConditionType: 3, MarkId: e[0], CheckTeleportState: e[1] };
  }
  Check(e) {
    var e = this.Parse(e),
      t = e.MarkId,
      e = e.CheckTeleportState,
      t = ModelManager_1.ModelManager.MapModel.CheckTeleportUnlocked(t) ?? !1;
    return 0 === e ? !t : t;
  }
}
(exports.TeleportStateConditionChecker = TeleportStateConditionChecker),
  (exports.skipConditionCheckerMap = new Map([
    [1, new SystemFunctionConditionChecker()],
    [2, new QuestStateConditionChecker()],
    [3, new TeleportStateConditionChecker()],
  ]));
//# sourceMappingURL=SkipConditionDefine.js.map
