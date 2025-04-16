"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreeExpressAssistant = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  IQuest_1 = require("../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  LevelGamePlayUtils_1 = require("../../../LevelGamePlay/LevelGamePlayUtils"),
  LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InteractBehaviorNode_1 = require("../BehaviorNode/ChildQuestNode/InteractBehaviorNode"),
  ControllerAssistantBase_1 = require("./ControllerAssistantBase"),
  ONE_HUNDRED = 100;
class TreeExpressAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this.eet = (e, t) => {
        e && this.ApplyOccupyTreeExpression(e.BtType, e.Id, e.IsInChallenge);
      }),
      (this.aYt = (e) => {
        e && this.ApplyOccupyTreeExpression(e.BtType, e.Id, e.IsInChallenge);
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
    switch (e.Type) {
      case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
        t = e.ShowComplete;
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
      e && e.Type === IQuest_1.EQuestScheduleType.ChildQuestCompleted
        ? e.ChildQuestId
        : t);
  }
  IsShowTrackDistance(e, t) {
    let r = !1;
    return (r =
      t && t.Type === IQuest_1.EQuestScheduleType.ChildQuestCompleted
        ? !!this.IsShowNodeTrackDistance(e, t.ChildQuestId) && t.ShowTracking
        : r);
  }
  IsShowNodeTrackDistance(e, t) {
    e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
    return !!e && (e.GetNode(t)?.ContainTag(0) ?? !1);
  }
  GetTitleText(t, r, e, a) {
    let s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
    var i = e;
    if (i) {
      const c =
        ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t);
      switch (i.Type) {
        case IQuest_1.EQuestScheduleType.ChildQuestCompleted:
          var o = i;
          s =
            o.TitlePreState && a
              ? this.GetNodeTrackText(
                  t,
                  o.ChildQuestId,
                  o.TitlePreState?.TidPreStateTitle,
                  o.Vars,
                  o.OnlyShowWhileRunning,
                )
              : this.GetNodeTrackText(
                  t,
                  o.ChildQuestId,
                  r,
                  o.Vars,
                  o.OnlyShowWhileRunning,
                );
          break;
        case IQuest_1.EQuestScheduleType.TimeLeft:
          (s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r)),
            i.ShowTime &&
              ((o = Math.floor(c.GetChallengeRemainTime(i.TimerType))),
              (s = s.replace("{q_count}", "" + o)));
          break;
        case IQuest_1.EQuestScheduleType.EntityHP:
          var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            i.EntityId,
          );
          o
            ? ((o = o.Entity.GetComponent(171)),
              (s = o
                ? ((n = o.GetCurrentValue(
                    Protocol_1.Aki.Protocol.Vks.Proto_Life,
                  )),
                  (o = o.GetCurrentValue(Protocol_1.Aki.Protocol.Vks.l5n)),
                  (n = Math.floor((n / o) * ONE_HUNDRED)),
                  (s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r)).replace(
                    "{q_count}",
                    n + "%",
                  ))
                : ""))
            : (s = "");
          break;
        case IQuest_1.EQuestScheduleType.ChildQuestCompletedCount: {
          const c =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t,
            );
          if (!c) break;
          var o = PublicUtil_1.PublicUtil.GetConfigTextByKey(r),
            n = i.AssociatedChildQuestIds,
            l = n.length;
          let e = 0;
          for (const u of n) c.GetNode(u)?.IsSuccess && e++;
          s = `${o}(${e}/${l})`;
          break;
        }
        case IQuest_1.EQuestScheduleType.Score:
          s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r);
          n = this.ConvertStringToScoreTexture(
            ModelManager_1.ModelManager.ScoreModel.GetCurrentScore()?.toString(),
          );
          s = (s = s.replace("{currentScore}", "" + n)).replace(
            "{targetScore}",
            "" + ModelManager_1.ModelManager.ScoreModel.GetTargetScore(),
          );
          break;
        case IQuest_1.EQuestScheduleType.TowerChallengeTitle:
          ModelManager_1.ModelManager.TowerModel.CheckInTower() &&
            (s = ModelManager_1.ModelManager.TowerModel.GetCurrentFloorName());
          break;
        case IQuest_1.EQuestScheduleType.Var: {
          const c =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t,
            );
          if (!c) break;
          s = this.di1(
            r,
            i.Var,
            void 0 !== i.ShowAsWordArt,
            LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(
              c.BtType,
              c.TreeIncId,
              c.TreeConfigId,
            ),
          );
          break;
        }
        case IQuest_1.EQuestScheduleType.MultiVar:
        case IQuest_1.EQuestScheduleType.Condition: {
          const c =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t,
            );
          if (!c) break;
          o = i.Vars;
          if (
            ((s = PublicUtil_1.PublicUtil.GetConfigTextByKey(r)),
            !o || 0 === o.length)
          )
            break;
          var _ = i?.ShowAsWordArt;
          for (const v of o)
            s = this.p2_(
              s,
              v,
              void 0 !== _,
              LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(
                c.BtType,
                c.TreeIncId,
                c.TreeConfigId,
              ),
            );
          break;
        }
        case IQuest_1.EQuestScheduleType.ProgressValue:
          var l = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            i.TargetProgressEntity,
          );
          l
            ? ((n = l.Entity.GetComponent(127)),
              (s = n
                ? ((o = n.GetProgressData()?.CurrentValue ?? 0),
                  (n =
                    0 === (l = n.GetProgressData()?.MaxValue ?? 0)
                      ? 0
                      : Math.round((o / l) * 100)),
                  (l = Math.round(o)),
                  (s = (s =
                    PublicUtil_1.PublicUtil.GetConfigTextByKey(r)).replace(
                    "{percent}",
                    n + "%",
                  )).replace("{real_progress}", "" + l))
                : ""))
            : (s = "");
      }
    }
    return s;
  }
  di1(e, t, r, a) {
    a = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, a);
    return void 0 === a ? "" : this.FormatStepTextByVarValueByKey(e, t, a, r);
  }
  p2_(e, t, r, a) {
    a = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, a);
    return void 0 === a ? "" : this.mi1(e, t, a, r);
  }
  GetNodeTrackText(e, t, r, a, s) {
    var i =
      ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e);
    if (!i) return "";
    var o = i.GetNode(t);
    if (!o) return "";
    if (s && !o.IsProcessing) return "";
    var n = r ?? o.TrackTextConfig;
    if (void 0 === n || 0 === n.length) return "";
    let l = void 0;
    switch (o.TrackTextRule) {
      case 0:
        l = PublicUtil_1.PublicUtil.GetConfigTextByKey(n);
        break;
      case 1:
        var _ = PublicUtil_1.PublicUtil.GetConfigTextByKey(n),
          c = o.GetProgress() ?? "0",
          u = o.GetProgressMax() ?? "0";
        l = _.replace("{q_count}", c).replace("{q_countMax}", u);
        break;
      case 2:
        _ = PublicUtil_1.PublicUtil.GetConfigTextByKey(n);
        l = o.GetCustomTrackText(_);
    }
    if (
      !(l =
        "ChildQuest" === o.NodeType &&
        o instanceof InteractBehaviorNode_1.InteractBehaviorNode &&
        o.AlwaysFalseChildNode
          ? (o.OccupationInfo ?? l)
          : l)
    )
      return "";
    if (a && 0 !== a.length)
      for (const v of a)
        l = this.p2_(
          l,
          v,
          !1,
          LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(
            i.BtType,
            i.TreeIncId,
            i.TreeConfigId,
          ),
        );
    return l;
  }
  FormatStepTextByVarValueByKey(e, t, r, a) {
    e = PublicUtil_1.PublicUtil.GetConfigTextByKey(e);
    return this.mi1(e, t, r, a);
  }
  mi1(e, t, r, a) {
    let s = e,
      i = r.toString();
    switch (
      (a &&
        "number" == typeof r &&
        (i = this.ConvertStringToScoreTexture(r.toString())),
      t.Source)
    ) {
      case "Global":
        s = s.replace(`{${t.Keyword}}`, i);
        break;
      case "Other":
      case "Self":
        s = s.replace(`{${t.Name}}`, i);
    }
    return (s = s.replace("{q_count}", i));
  }
  ConvertStringToScoreTexture(e) {
    let t = "";
    if (e)
      for (const a of e) {
        var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "T_Num" + a,
        );
        t += `<texture=${r}/>`;
      }
    return t;
  }
  ApplyOccupyTreeExpression(e, t, r) {
    switch (e) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst:
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
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
