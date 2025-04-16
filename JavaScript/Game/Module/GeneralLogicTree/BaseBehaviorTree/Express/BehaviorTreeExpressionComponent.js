"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorTreeExpressionComponent = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  MapDefine_1 = require("../../../Map/MapDefine"),
  TrackDefine_1 = require("../../../Track/TrackDefine"),
  ReachAreaBehaviorNode_1 = require("../../BehaviorNode/ChildQuestNode/ReachAreaBehaviorNode"),
  GeneralLogicTreeController_1 = require("../../GeneralLogicTreeController"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTreeUtil"),
  CheckPointEffectController_1 = require("./CheckPointEffectController"),
  TrackEffectExpressController_1 = require("./TrackEffectExpressController"),
  TrackMarkExpressController_1 = require("./TrackMarkExpressController"),
  TrackTextExpressController_1 = require("./TrackTextExpressController");
class BehaviorTreeExpressionComponent {
  constructor(e) {
    (this.Yre = void 0),
      (this.yQt = void 0),
      (this.IQt = void 0),
      (this.TQt = void 0),
      (this.LQt = void 0),
      (this.DQt = (e, t, i, r) => {
        this.Yre.DisableExpression ||
          (6 === e.Type &&
            e.TreeIncId === this.Yre.TreeIncId &&
            (e = this.Yre.GetNode(e.NodeId)) &&
            (this.yQt.UpdateTrackTextData(e, i),
            this.TQt.UpdateTrackMarkExpression(this.Yre, e, i),
            this.IQt.UpdateTrackEffectExpression(e.NodeId, i),
            (e = this.RQt(e, i, r)),
            this.yQt.UpdateTextExpress(e)));
      }),
      (this.RSe = (e, t, i) => {
        var r, s, n;
        6 !== e.Type ||
          this.Yre.DisableExpression ||
          ((r = this.Yre.GetNode(e.NodeId)) &&
            "ChildQuest" === r.NodeType &&
            r.ContainTag(0) &&
            !r.ContainTag(2) &&
            (s = r.TrackTarget) &&
            ((r.ShowTipBeforeEnterActions &&
              i === Protocol_1.Aki.Protocol.FNs.Proto_CQNS_EnterAction) ||
            (!r.ShowTipBeforeEnterActions &&
              i === Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Progress)
              ? ((n = this.Yre.IsOccupied),
                r instanceof ReachAreaBehaviorNode_1.ReachAreaBehaviorNode &&
                  r.EffectPathKey &&
                  this.LQt.OnNodeStart(
                    e.NodeId,
                    r.EffectPathKey,
                    r.GetTargetPosition(),
                    n,
                  ),
                this.TQt.NodeTrackMarkStart(r.NodeId, this.Yre, s, n),
                (e = s.EffectOption) &&
                  this.IQt.NodeTrackEffectStart(
                    r.NodeId,
                    e,
                    this.Yre.IsTracking,
                  ))
              : i === Protocol_1.Aki.Protocol.FNs.Proto_CQNS_Finished &&
                (this.TQt.NodeTrackMarkEnd(r.NodeId),
                this.IQt.NodeTrackEffectEnd(r.NodeId),
                r instanceof ReachAreaBehaviorNode_1.ReachAreaBehaviorNode) &&
                this.LQt.OnNodeEnd(r.NodeId)));
      }),
      (this.UQt = (e, t, i) => {
        this.Yre.TreeIncId === e &&
          (this.yQt.OnSuspend(t, i), this.TQt.OnSuspend(i));
      }),
      (this.AQt = (e) => {
        this.Yre.TreeIncId === e &&
          (this.yQt.OnCancelSuspend(), this.TQt.OnCancelSuspend());
      }),
      (this.PQt = () => {
        this.IQt.OnBattleViewActive();
      }),
      (this.xQt = () => {
        this.IQt.OnBattleViewHide();
      }),
      (this.wQt = (t, i) => {
        if (t && 6 === t.Type && i && t.TreeIncId === this.Yre.TreeIncId) {
          let e = void 0;
          switch (i.nvs) {
            case "vEs":
              e = i.vEs.TEs;
              break;
            case "mEs":
              e = i.mEs.SEs;
              break;
            case "gEs":
              e = [];
              for (const r of i.gEs.DEs) e.concat(r.PEs);
              break;
            case "MEs":
              e = i.MEs.F4n;
          }
          this.TQt.GetNodeTrackMarkCreator(t.NodeId)?.OnNodeProgressChanged(e);
        }
      }),
      (this.BQt = (e) => {
        e = this.Yre.TreeIncId === e;
        this.yQt.OnBtApplyExpressionOccupation(e),
          this.TQt.OnBtApplyExpressionOccupation(e),
          this.IQt.OnBtApplyExpressionOccupation(e),
          this.LQt.OnBtApplyExpressionOccupation(e);
      }),
      (this.bQt = (e) => {
        e = this.Yre.TreeIncId === e;
        this.yQt.OnBtReleaseExpressionOccupation(e),
          this.TQt.OnBtReleaseExpressionOccupation(e),
          this.IQt.OnBtReleaseExpressionOccupation(e),
          this.LQt.OnBtReleaseExpressionOccupation(e);
      }),
      (this.Yre = e),
      (this.yQt = new TrackTextExpressController_1.TrackTextExpressController(
        e,
      )),
      (this.TQt = new TrackMarkExpressController_1.TrackMarkExpressController(
        e,
      )),
      (this.IQt =
        new TrackEffectExpressController_1.TrackEffectExpressController(this)),
      (this.LQt =
        new CheckPointEffectController_1.CheckPointEffectController());
  }
  Init() {
    this.tQt();
  }
  Dispose() {
    this.yQt.Clear(),
      this.TQt.Clear(),
      this.IQt.Clear(),
      this.LQt.EnableAllEffects(!1),
      this.iQt();
  }
  tQt() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ActiveBattleView,
      this.PQt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DisActiveBattleView,
        this.xQt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeApplyExpressionOccupation,
        this.BQt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeReleaseExpressionOccupation,
        this.bQt,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Yre,
        EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
        this.RSe,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Yre,
        EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
        this.wQt,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Yre,
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.DQt,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Yre,
        EventDefine_1.EEventName.GeneralLogicTreeSuspend,
        this.UQt,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Yre,
        EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
        this.AQt,
      );
  }
  iQt() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ActiveBattleView,
      this.PQt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DisActiveBattleView,
        this.xQt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeApplyExpressionOccupation,
        this.BQt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeReleaseExpressionOccupation,
        this.bQt,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Yre,
        EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
        this.RSe,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Yre,
        EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
        this.wQt,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Yre,
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.DQt,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Yre,
        EventDefine_1.EEventName.GeneralLogicTreeSuspend,
        this.UQt,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Yre,
        EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
        this.AQt,
      );
  }
  EnableTrack(e, t = 0) {
    this.yQt.EnableTrack(e, t),
      this.TQt.EnableTrack(e),
      this.IQt.EnableTrack(e),
      this.LQt.EnableAllEffects(e);
  }
  RefreshMapMark(e) {
    this.TQt.EnableTrack(e);
  }
  StartTextExpress(e = 0) {
    this.yQt.StartTextExpress(e);
  }
  EndTextExpress(e = 0) {
    this.yQt.EndTextExpress(e);
  }
  GetNodeTrackPosition(e) {
    return this.TQt.GetNodeTrackMarkCreator(e)?.GetTrackPosition();
  }
  GetTrackAreaInfo(e) {
    return this.TQt.GetNodeTrackMarkCreator(e)?.GetTrackAreaInfo();
  }
  GetDefaultMark(e) {
    return this.TQt.GetNodeTrackMarkCreator(e)?.GetDefaultMark();
  }
  GetTrackDistance(e) {
    var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    return t && (e = this.GetNodeTrackPosition(e))
      ? Math.round(Vector_1.Vector.Distance(e, t) * MapDefine_1.FLOAT_0_01)
      : TrackDefine_1.INVALID_TRACKDISTANCE;
  }
  GetRangeMarkSize(e) {
    e = this.TQt.GetNodeTrackMarkCreator(e);
    return e ? e.MarkRange : 0;
  }
  GetRangeMarkShowDis(e) {
    return this.TQt.GetNodeTrackMarkCreator(e).RangeMarkShowDis;
  }
  GetTrackEffectOption(e) {
    return this.TQt.GetNodeTrackMarkCreator(e).TrackEffectOption;
  }
  RQt(e, t, i) {
    return (
      0 === i &&
      t === Protocol_1.Aki.Protocol.BNs._5n &&
      this.Yre.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest &&
      ((i = ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id),
      this.Yre.TreeConfigId !== i) &&
      !(
        !e.ContainTag(0) ||
        e.ContainTag(3) ||
        ((t =
          GeneralLogicTreeController_1.GeneralLogicTreeController.GetNodeTrackText(
            this.Yre.TreeIncId,
            e.NodeId,
          )),
        StringUtils_1.StringUtils.IsEmpty(t)) ||
        (ModelManager_1.ModelManager.GeneralLogicTreeModel.SaveUpdateInfo(
          this.Yre.TreeIncId,
          e.NodeId,
        ),
        0)
      )
    );
  }
  CheckCanShow(e) {
    if (!this.Yre.DisableExpression) {
      var t = this.Yre.GetAllNodes();
      if (t && 0 !== t.size)
        for (var [, i] of t)
          if (!i.ContainTag(4) && i.ContainTag(0) && (!e || e(i))) return !0;
    }
    return !1;
  }
  CheckCanShowTrackExpression() {
    return this.CheckCanShow((e) => !e.ContainTag(2));
  }
  CreateMapMarks() {
    this.TQt.CreateMapMarks();
  }
}
exports.BehaviorTreeExpressionComponent = BehaviorTreeExpressionComponent;
//# sourceMappingURL=BehaviorTreeExpressionComponent.js.map
