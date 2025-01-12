"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreeExpressAssistant = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest"),
  IVar_1 = require("../../../../UniverseEditor/Interface/IVar"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerAssistantBase_1 = require("./ControllerAssistantBase"),
  ONE_HUNDRED = 100;
class TreeExpressAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.eet = (e, t) => {
        e &&
          e.BtType &&
          e.TreeIncId &&
          this.ApplyOccupyTreeExpression(e.BtType, e.TreeIncId, e.ShowByCustom);
      }),
      (this.aYt = (e) => {
        e &&
          e.BtType &&
          e.TreeIncId &&
          this.ApplyOccupyTreeExpression(e.BtType, e.TreeIncId, e.ShowByCustom);
      });
  }
  OnDestroy() {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
      this.eet,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText,
        this.aYt,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
      this.eet,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText,
        this.aYt,
      );
  }
  IsShowNodeStatus(e) {
    let t = !1;
    if (e)
      switch (e.QuestScheduleType.Type) {
        case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
          t = e.QuestScheduleType.ShowComplete;
          break;
        case IQuest_1.EQuestScheduleType.TimeLeft:
        case IQuest_1.EQuestScheduleType.Condition:
          t = !0;
      }
    return t;
  }
  GetTitleTrackNodeId(e) {
    let t = 0;
    return (t =
      e &&
      e.QuestScheduleType.Type ===
        IQuest_1.EQuestScheduleType.ChildQuestCompleted
        ? e.QuestScheduleType.ChildQuestId
        : t);
  }
  IsShowTrackDistance(e, t) {
    let r = !1;
    return (r =
      t &&
      t.QuestScheduleType.Type ===
        IQuest_1.EQuestScheduleType.ChildQuestCompleted
        ? !!this.IsShowNodeTrackDistance(e, t.QuestScheduleType.ChildQuestId) &&
          t.QuestScheduleType.ShowTracking
        : r);
  }
  IsShowNodeTrackDistance(e, t) {
    e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
    return !!e && e.GetNode(t)?.ContainTag(0);
  }
  GetTitleText(t, r) {
    let a = "";
    if (r)
      switch (r.QuestScheduleType.Type) {
        case IQuest_1.EQuestScheduleType.None:
          a = PublicUtil_1.PublicUtil.GetConfigTextByKey(r.TidTitle);
          break;
        case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
          var s = r.QuestScheduleType;
          a = this.GetNodeTrackText(t, s.ChildQuestId, r.TidTitle, s.Vars);
          break;
        case IQuest_1.EQuestScheduleType.Condition:
        case IQuest_1.EQuestScheduleType.TimeLeft:
          a = PublicUtil_1.PublicUtil.GetConfigTextByKey(r.TidTitle);
          break;
        case IQuest_1.EQuestScheduleType.EntityHP:
          var s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            r.QuestScheduleType.EntityId,
          );
          s &&
            (s = s.Entity.GetComponent(158)) &&
            ((n = s.GetCurrentValue(Protocol_1.Aki.Protocol.Bks.Proto_Life)),
            (s = s.GetCurrentValue(Protocol_1.Aki.Protocol.Bks.e5n)),
            (n = Math.floor((n / s) * ONE_HUNDRED)),
            (a = (a = PublicUtil_1.PublicUtil.GetConfigTextByKey(
              r.TidTitle,
            )).replace("{q_count}", n + "%")));
          break;
        case IQuest_1.EQuestScheduleType.ChildQuestCompletedCount: {
          var i =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t,
            );
          if (!i) break;
          var s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r.TidTitle),
            n = r.QuestScheduleType.AssociatedChildQuestIds,
            o = n.length;
          let e = 0;
          for (const _ of n) i.GetNode(_)?.IsSuccess && e++;
          a = `${s}(${e}/${o})`;
          break;
        }
        case IQuest_1.EQuestScheduleType.Score:
          a = PublicUtil_1.PublicUtil.GetConfigTextByKey(r.TidTitle);
          n = this.Ukn(
            ModelManager_1.ModelManager.ScoreModel.GetCurrentScore()?.toString(),
          );
          a = (a = a.replace("{currentScore}", "" + n)).replace(
            "{targetScore}",
            "" + ModelManager_1.ModelManager.ScoreModel.GetTargetScore(),
          );
          break;
        case IQuest_1.EQuestScheduleType.TowerChallengeTitle:
          ModelManager_1.ModelManager.TowerModel.CheckInTower() &&
            (a = ModelManager_1.ModelManager.TowerModel.GetCurrentFloorName());
          break;
        case IQuest_1.EQuestScheduleType.Var:
          s =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t,
            );
          s &&
            (("Int" !== (n = (o = r.QuestScheduleType).Var.Type) &&
              "Float" !== n &&
              "String" !== n &&
              "Boolean" !== n) ||
              ((n = this.hYt(s, o.Var)),
              (a = (a = PublicUtil_1.PublicUtil.GetConfigTextByKey(
                r.TidTitle,
              )).replace("{q_count}", n))));
          break;
        case IQuest_1.EQuestScheduleType.MultiVar:
          s =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t,
            );
          s &&
            ((o = r.QuestScheduleType.Vars),
            (a = PublicUtil_1.PublicUtil.GetConfigTextByKey(r.TidTitle)),
            (a = this.lYt(s, a, o)));
      }
    return a;
  }
  Ukn(t) {
    let r = "";
    if (t)
      for (let e = 0; e < t.length; e++) {
        var a = t[e],
          a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "T_Num" + a,
          );
        r += `<texture=${a}/>`;
      }
    return r;
  }
  lYt(e, t, r) {
    if (r && 0 !== r.length)
      for (const s of r) {
        var a;
        ("Self" !== s.Source && "Other" !== s.Source) ||
          ((a = this.hYt(e, s)),
          void 0 !== s && (t = t.replace(`{${s.Name}}`, a)));
      }
    return t;
  }
  hYt(e, t) {
    var r = t.Source,
      a = t.Type;
    if ("Constant" === r) return String(t.Value);
    if ("Self" === r || "Other" === r) {
      var s = e.GetTreeVarByKey(t.Name);
      if (void 0 === s) return "";
      if (s.XIs === (0, IVar_1.getVarConfigIndex)(a))
        switch (a) {
          case "Boolean":
            return String(s.YIs);
          case "Int":
            return String(MathUtils_1.MathUtils.LongToNumber(s.JIs));
          case "Float":
            return String(s.ZIs);
          case "String":
            return s.zIs ?? "";
        }
    }
    return "";
  }
  GetNodeTrackText(e, t, r, a) {
    e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
    if (!e) return "";
    var s = e.GetNode(t);
    if (!s) return "";
    var i = r ?? s.TrackTextConfig;
    if (void 0 === i || 0 === i.length) return "";
    let n = void 0;
    switch (s.TrackTextRule) {
      case 0:
        n = PublicUtil_1.PublicUtil.GetConfigTextByKey(i);
        break;
      case 1:
        var o = PublicUtil_1.PublicUtil.GetConfigTextByKey(i),
          _ = s.GetProgress() ?? "0",
          l = s.GetProgressMax() ?? "0";
        n = o.replace("{q_count}", _).replace("{q_countMax}", l);
        break;
      case 2:
        o = PublicUtil_1.PublicUtil.GetConfigTextByKey(i);
        n = s.GetCustomTrackText(o);
    }
    return (n = n && this.lYt(e, n, a)) ?? "";
  }
  ApplyOccupyTreeExpression(e, t, r) {
    switch (e) {
      case Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest:
        break;
      case Protocol_1.Aki.Protocol.tps.Proto_BtTypeInst:
      case Protocol_1.Aki.Protocol.tps.Proto_BtTypeLevelPlay:
        r && this._Yt(t);
    }
  }
  _Yt(e) {
    ModelManager_1.ModelManager.GeneralLogicTreeModel.ApplyExpressionOccupation(
      e,
    );
  }
  TryReleaseExpressionOccupation(e) {
    ModelManager_1.ModelManager.GeneralLogicTreeModel.TryReleaseExpressionOccupation(
      e,
    );
  }
}
exports.TreeExpressAssistant = TreeExpressAssistant;
//# sourceMappingURL=TreeExpressAssistant.js.map
