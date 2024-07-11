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
      (this.DQt = (e, t, i, s) => {
        6 === e.Type &&
          e.TreeIncId === this.Yre.TreeIncId &&
          (e = this.Yre.GetNode(e.NodeId)) &&
          (this.yQt.UpdateTrackTextData(e, i),
          this.TQt.UpdateTrackMarkExpression(this.Yre, e, i),
          this.IQt.UpdateTrackEffectExpression(e.NodeId, i),
          (e = this.RQt(e, i, s)),
          this.yQt.UpdateTextExpress(e));
      }),
      (this.RSe = (e, t, i) => {
        if (6 === e.Type && e.TreeIncId === this.Yre.TreeIncId) {
          var s,
            r,
            n = this.Yre.GetNode(e.NodeId);
          if (n)
            switch (i) {
              case Protocol_1.Aki.Protocol.bNs.Proto_CQNS_Progress:
                n.ContainTag(0) &&
                  (s = n.TrackTarget) &&
                  ((r = this.Yre.IsOccupied),
                  n instanceof ReachAreaBehaviorNode_1.ReachAreaBehaviorNode &&
                    n.EffectPathKey &&
                    this.LQt.OnNodeStart(
                      e.NodeId,
                      n.EffectPathKey,
                      n.GetTargetPosition(),
                      r,
                    ),
                  this.TQt.NodeTrackMarkStart(n.NodeId, this.Yre, s, r),
                  (r = s.EffectOption)) &&
                  this.IQt.NodeTrackEffectStart(
                    n.NodeId,
                    r,
                    this.Yre.IsTracking,
                  );
                break;
              case Protocol_1.Aki.Protocol.bNs.Proto_CQNS_Finished:
                this.TQt.NodeTrackMarkEnd(n.NodeId),
                  this.IQt.NodeTrackEffectEnd(n.NodeId),
                  n instanceof ReachAreaBehaviorNode_1.ReachAreaBehaviorNode &&
                    this.LQt.OnNodeEnd(n.NodeId);
            }
        }
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
          switch (i.zfs) {
            case "uEs":
              e = i.uEs.vEs;
              break;
            case "aEs":
              e = i.aEs.mEs;
              break;
            case "lEs":
              e = [];
              for (const s of i.lEs.SEs) e.concat(s.yEs);
              break;
            case "dEs":
              e = i.dEs.P4n;
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
      EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
      this.RSe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        this.PQt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DisActiveBattleView,
        this.xQt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
        this.wQt,
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
      EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
      this.RSe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        this.PQt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DisActiveBattleView,
        this.xQt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
        this.wQt,
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
  StartTextExpress(e = 0) {
    this.yQt.StartTextExpress(e);
  }
  EndTextExpress(e = 0) {
    this.yQt.EndTextExpress(e);
  }
  GetNodeTrackPosition(e) {
    return this.TQt.GetNodeTrackMarkCreator(e)?.GetTrackPosition();
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
      t === Protocol_1.Aki.Protocol.DNs.t5n &&
      this.Yre.BtType === Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest &&
      !(
        !e.ContainTag(0) ||
        e.ContainTag(3) ||
        ((i =
          GeneralLogicTreeController_1.GeneralLogicTreeController.GetNodeTrackText(
            this.Yre.TreeIncId,
            e.NodeId,
          )),
        StringUtils_1.StringUtils.IsEmpty(i)) ||
        (ModelManager_1.ModelManager.GeneralLogicTreeModel.SaveUpdateInfo(
          this.Yre.TreeIncId,
          e.NodeId,
          this.Yre.CreateShowBridge(),
        ),
        this.Yre.RemoveTag(9),
        0)
      )
    );
  }
  CheckCanShow() {
    var e,
      t = this.Yre.GetAllNodes();
    if (!t) return !1;
    if (0 === t.size) return !1;
    let i = 0,
      s = !1;
    for ([, e] of t)
      e.IsProcessing && e.ContainTag(2) && (s = !0),
        e.ContainTag(0) && (i += 1);
    return 0 !== i || !s;
  }
  CreateMapMarks() {
    this.TQt.CreateMapMarks();
  }
}
exports.BehaviorTreeExpressionComponent = BehaviorTreeExpressionComponent;
//# sourceMappingURL=BehaviorTreeExpressionComponent.js.map
