"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckClientQuestNode = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckClientQuestNode extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    if (0 === e.LimitParams.size)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelCondition",
            16,
            "配置错误！条件的参数不应该为空",
            ["inConditionInfo.Id", e.Id],
          ),
        !1
      );
    var o = Number(e.LimitParams.get("任务Id")),
      a = Number(e.LimitParams.get("步骤Id")),
      n = Number(e.LimitParams.get("状态"));
    if (isNaN(o) || isNaN(n) || isNaN(a))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不合法", [
            "inConditionInfo.Id",
            e.Id,
          ]),
        !1
      );
    switch (n) {
      case 0:
        var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(o);
        return 3 === t
          ? !1
          : t <= 2 ||
              ((t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(o))
                ? !(t = t.GetNode(a)) ||
                  t.Status < Protocol_1.Aki.Protocol.BNs._5n
                : (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Quest",
                      18,
                      "任务步骤条件检测：找不到进行中的任务",
                    ),
                  !1));
      case 1:
        var t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(o);
        return t?.IsProgressing ? !!(t = t.GetNode(a)) && t.IsProcessing : !1;
      case 2:
        return 3 === ModelManager_1.ModelManager.QuestNewModel.GetQuestState(o)
          ? !0
          : !!(t =
              ModelManager_1.ModelManager.QuestNewModel.GetQuest(o)?.GetNode(
                a,
              )) && t.IsSuccess;
      default:
        return !1;
    }
  }
  CheckNew(e, r) {
    var o = e;
    if (!o) return !1;
    let a = !1;
    switch (
      ModelManager_1.ModelManager.QuestNewModel.GetQuestState(o.QuestId)
    ) {
      case 0:
      case 1:
        a = !1;
        break;
      case 3:
        a = !0;
        break;
      case 2:
        var n = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
          o.QuestId,
        )?.GetNode(o.ChildQuestId);
        a = n?.IsSuccess ?? !1;
    }
    return "Eq" === (o.Compare ?? "Eq") ? a : !a;
  }
}
exports.LevelConditionCheckClientQuestNode = LevelConditionCheckClientQuestNode;
//# sourceMappingURL=LevelConditionCheckClientQuestNode.js.map
