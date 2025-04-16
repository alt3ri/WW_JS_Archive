"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PunishReportSettlementViewParams =
    exports.FlySettlementViewParams =
    exports.ChallengeCountDownViewParams =
    exports.SilentAreaShowInfo =
    exports.TreeTrackTextExpressionInfo =
    exports.BtCustomUiConfig =
    exports.btChildQuestNodeStatusLogString =
    exports.btNodeStatusLogString =
    exports.btTypeLogString =
    exports.NodeInfo =
    exports.NPCFARAWAY_TIMERTYPE =
    exports.OUTRANGEFAILED_TIMERTYPE =
    exports.CHALLENGELEVELPLAY_TRACKICONID =
    exports.COMMONLEVELPLAY_TRACKICONID =
    exports.INVALID_INTERACTOPTION_ID =
      void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  MissionViewDefine_1 = require("../../BattleUi/Views/MissionView/MissionViewDefine");
(exports.INVALID_INTERACTOPTION_ID = -1),
  (exports.COMMONLEVELPLAY_TRACKICONID = 8),
  (exports.CHALLENGELEVELPLAY_TRACKICONID = 9),
  (exports.OUTRANGEFAILED_TIMERTYPE = "FailedNodeOutRangeTimerType"),
  (exports.NPCFARAWAY_TIMERTYPE = "NpcFarAwayOutRangeTimerType");
class NodeInfo extends Protocol_1.Aki.Protocol.qNs {
  constructor() {
    super(...arguments), (this.NodeId = 0);
  }
}
(exports.NodeInfo = NodeInfo),
  (exports.btTypeLogString = {
    [Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid]: "无效",
    [Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest]: "任务",
    [Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay]: "玩法",
    [Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst]: "副本",
  }),
  (exports.btNodeStatusLogString = {
    [Protocol_1.Aki.Protocol.BNs.Proto_NotActive]: "0-未激活",
    [Protocol_1.Aki.Protocol.BNs._5n]: "1-激活",
    [Protocol_1.Aki.Protocol.BNs.Proto_Completing]: "2-完成中",
    [Protocol_1.Aki.Protocol.BNs.Proto_CompletedSuccess]: "3-成功完成",
    [Protocol_1.Aki.Protocol.BNs.Proto_CompletedFailed]: "4-失败完成",
    [Protocol_1.Aki.Protocol.BNs.Proto_Destroy]: "6-销毁",
  }),
  (exports.btChildQuestNodeStatusLogString = {
    [Protocol_1.Aki.Protocol.FNs.Proto_CQNS_NotActive]: "0-未激活",
    [Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Enter]: "1-进入",
    [Protocol_1.Aki.Protocol.FNs.Proto_CQNS_EnterAction]: "2-执行进入行为中",
    [Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Progress]: "3-进行中",
    [Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Finished]: "4-完成",
    [Protocol_1.Aki.Protocol.FNs.Proto_CQNS_FinishAction]: "5-完成行为",
  });
class BtCustomUiConfig {
  constructor(o, t) {
    (this.SourceOfAdd = o), (this.CustomUiConfig = t);
  }
}
exports.BtCustomUiConfig = BtCustomUiConfig;
class TreeTrackTextExpressionInfo {
  constructor() {
    (this.MainTitle = void 0), (this.SubTitles = []), (this.MainTitle = void 0);
  }
  Clear() {
    (this.MainTitle = void 0), this.ClearSubTitle();
  }
  SetMainTitle(o) {
    this.MainTitle = o
      ? new MissionViewDefine_1.BehaviorTreeStepTextInfo(
          o.TidTitle,
          o.QuestScheduleType,
        )
      : void 0;
  }
  AddSubTitle(o) {
    this.SubTitles.push(
      new MissionViewDefine_1.BehaviorTreeStepTextInfo(
        o.TidTitle,
        o.QuestScheduleType,
        o.ShowConditions,
        o.ConditionText,
      ),
    );
  }
  ClearSubTitle() {
    this.SubTitles = [];
  }
  CopyConfig(o) {
    this.SetMainTitle(o.MainTitle), this.ClearSubTitle();
    for (const t of o.SubTitles) this.AddSubTitle(t);
  }
  IsSubTitle(t) {
    return (
      !(!this.SubTitles || 0 === this.SubTitles.length) &&
      void 0 !==
        this.SubTitles.find((o) => {
          o = o.QuestScheduleType;
          return void 0 !== o && o.ChildQuestId === t;
        })
    );
  }
}
exports.TreeTrackTextExpressionInfo = TreeTrackTextExpressionInfo;
class SilentAreaShowInfo {
  constructor(o, t) {
    (this.SourceOfAdd = o), (this.ShowInfo = t);
  }
}
exports.SilentAreaShowInfo = SilentAreaShowInfo;
class ChallengeCountDownViewParams {
  constructor(o, t) {
    (this.TimerEndTime = o), (this.UiTitleKey = t);
  }
}
exports.ChallengeCountDownViewParams = ChallengeCountDownViewParams;
class FlySettlementViewParams {
  constructor(o, t, e, s, r, i) {
    (this.Score = o),
      (this.RankS = t),
      (this.RankA = e),
      (this.RankB = s),
      (this.BestRecordScore = r),
      (this.IncId = i);
  }
}
exports.FlySettlementViewParams = FlySettlementViewParams;
class PunishReportSettlementViewParams {
  constructor(o, t) {
    (this.TreeConfigId = o), (this.States = t);
  }
}
exports.PunishReportSettlementViewParams = PunishReportSettlementViewParams;
//# sourceMappingURL=GeneralLogicTreeDefine.js.map
