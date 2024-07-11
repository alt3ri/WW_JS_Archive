"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreeExpressAssistant = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest");
const IVar_1 = require("../../../../UniverseEditor/Interface/IVar");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerAssistantBase_1 = require("./ControllerAssistantBase");
const ONE_HUNDRED = 100;
class TreeExpressAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.Vze = (e, t) => {
        e &&
          e.BtType &&
          e.TreeIncId &&
          this.ApplyOccupyTreeExpression(e.BtType, e.TreeIncId, e.ShowByCustom);
      }),
      (this.a$t = (e) => {
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
      this.Vze,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText,
        this.a$t,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
      this.Vze,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText,
        this.a$t,
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
            (s = s.Entity.GetComponent(156)) &&
            ((n = s.GetCurrentValue(Protocol_1.Aki.Protocol.KBs.Proto_Life)),
            (s = s.GetCurrentValue(Protocol_1.Aki.Protocol.KBs.Tkn)),
            (n = Math.floor((n / s) * ONE_HUNDRED)),
            (a = (a = PublicUtil_1.PublicUtil.GetConfigTextByKey(
              r.TidTitle,
            )).replace("{q_count}", n + "%")));
          break;
        case IQuest_1.EQuestScheduleType.ChildQuestCompletedCount: {
          const i =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t,
            );
          if (!i) break;
          var s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r.TidTitle);
          var n = r.QuestScheduleType.AssociatedChildQuestIds;
          var o = n.length;
          let e = 0;
          for (const _ of n) i.GetNode(_)?.IsSuccess && e++;
          a = `${s}(${e}/${o})`;
          break;
        }
        case IQuest_1.EQuestScheduleType.Score:
          a = PublicUtil_1.PublicUtil.GetConfigTextByKey(r.TidTitle);
          n = this.lOn(
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
            (((n = (o = r.QuestScheduleType).Var.Type) !== "Int" &&
              n !== "Float" &&
              n !== "String" &&
              n !== "Boolean") ||
              ((n = this.h$t(s, o.Var)),
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
            (a = this.l$t(s, a, o)));
      }
    return a;
  }
  lOn(t) {
    let r = "";
    if (t)
      for (let e = 0; e < t.length; e++) {
        var a = t[e];
        var a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "T_Num" + a,
        );
        r += `<texture=${a}/>`;
      }
    return r;
  }
  l$t(e, t, r) {
    if (r && r.length !== 0)
      for (const s of r) {
        var a;
        (s.Source !== "Self" && s.Source !== "Other") ||
          ((a = this.h$t(e, s)),
          void 0 !== s && (t = t.replace(`{${s.Name}}`, a)));
      }
    return t;
  }
  h$t(e, t) {
    const r = t.Source;
    const a = t.Type;
    if (r === "Constant") return String(t.Value);
    if (r === "Self" || r === "Other") {
      const s = e.GetTreeVarByKey(t.Name);
      if (void 0 === s) return "";
      if (s.xMs === (0, IVar_1.getVarConfigIndex)(a))
        switch (a) {
          case "Boolean":
            return String(s.bMs);
          case "Int":
            return String(MathUtils_1.MathUtils.LongToNumber(s.BMs));
          case "Float":
            return String(s.GMs);
          case "String":
            return s.qMs ?? "";
        }
    }
    return "";
  }
  GetNodeTrackText(e, t, r, a) {
    e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
    if (!e) return "";
    const s = e.GetNode(t);
    if (!s) return "";
    const i = r ?? s.TrackTextConfig;
    if (void 0 === i || i.length === 0) return "";
    let n = void 0;
    switch (s.TrackTextRule) {
      case 0:
        n = PublicUtil_1.PublicUtil.GetConfigTextByKey(i);
        break;
      case 1:
        var o = PublicUtil_1.PublicUtil.GetConfigTextByKey(i);
        var _ = s.GetProgress() ?? "0";
        var l = s.GetProgressMax() ?? "0";
        n = o.replace("{q_count}", _).replace("{q_countMax}", l);
        break;
      case 2:
        o = PublicUtil_1.PublicUtil.GetConfigTextByKey(i);
        n = s.GetCustomTrackText(o);
    }
    return (n = n && this.l$t(e, n, a)) ?? "";
  }
  ApplyOccupyTreeExpression(e, t, r) {
    switch (e) {
      case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest:
        break;
      case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInst:
      case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay:
        r && this._$t(t);
    }
  }
  _$t(e) {
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
// # sourceMappingURL=TreeExpressAssistant.js.map
