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
      (this.yKt = void 0),
      (this.IKt = void 0),
      (this.TKt = void 0),
      (this.LKt = void 0),
      (this.DKt = (e, t, i, s) => {
        6 === e.Type &&
          e.TreeIncId === this.Yre.TreeIncId &&
          (e = this.Yre.GetNode(e.NodeId)) &&
          (this.yKt.UpdateTrackTextData(e, i),
          this.TKt.UpdateTrackMarkExpression(this.Yre, e, i),
          this.IKt.UpdateTrackEffectExpression(e.NodeId, i),
          (e = this.RKt(e, i, s)),
          this.yKt.UpdateTextExpress(e));
      }),
      (this.REe = (e, t, i) => {
        if (6 === e.Type && e.TreeIncId === this.Yre.TreeIncId) {
          var s,
            r,
            n = this.Yre.GetNode(e.NodeId);
          if (n)
            switch (i) {
              case Protocol_1.Aki.Protocol.W2s.Proto_CQNS_Progress:
                n.ContainTag(0) &&
                  (s = n.TrackTarget) &&
                  ((r = this.Yre.IsOccupied),
                  n instanceof ReachAreaBehaviorNode_1.ReachAreaBehaviorNode &&
                    n.EffectPathKey &&
                    this.LKt.OnNodeStart(
                      e.NodeId,
                      n.EffectPathKey,
                      n.GetTargetPosition(),
                      r,
                    ),
                  this.TKt.NodeTrackMarkStart(n.NodeId, this.Yre, s, r),
                  (r = s.EffectOption)) &&
                  this.IKt.NodeTrackEffectStart(
                    n.NodeId,
                    r,
                    this.Yre.IsTracking,
                  );
                break;
              case Protocol_1.Aki.Protocol.W2s.Proto_CQNS_Finished:
                this.TKt.NodeTrackMarkEnd(n.NodeId),
                  this.IKt.NodeTrackEffectEnd(n.NodeId),
                  n instanceof ReachAreaBehaviorNode_1.ReachAreaBehaviorNode &&
                    this.LKt.OnNodeEnd(n.NodeId);
            }
        }
      }),
      (this.UKt = (e, t, i) => {
        this.Yre.TreeIncId === e &&
          (this.yKt.OnSuspend(t, i), this.TKt.OnSuspend(i));
      }),
      (this.AKt = (e) => {
        this.Yre.TreeIncId === e &&
          (this.yKt.OnCancelSuspend(), this.TKt.OnCancelSuspend());
      }),
      (this.PKt = () => {
        this.IKt.OnBattleViewActive();
      }),
      (this.xKt = () => {
        this.IKt.OnBattleViewHide();
      }),
      (this.wKt = (t, i) => {
        if (t && 6 === t.Type && i && t.TreeIncId === this.Yre.TreeIncId) {
          let e = void 0;
          switch (i.Gms) {
            case "Qfs":
              e = i.Qfs.tvs;
              break;
            case "Hfs":
              e = i.Hfs.Jfs;
              break;
            case "Wfs":
              e = [];
              for (const s of i.Wfs.ovs) e.concat(s.svs);
              break;
            case "Yfs":
              e = i.Yfs.rkn;
          }
          this.TKt.GetNodeTrackMarkCreator(t.NodeId)?.OnNodeProgressChanged(e);
        }
      }),
      (this.BKt = (e) => {
        e = this.Yre.TreeIncId === e;
        this.yKt.OnBtApplyExpressionOccupation(e),
          this.TKt.OnBtApplyExpressionOccupation(e),
          this.IKt.OnBtApplyExpressionOccupation(e),
          this.LKt.OnBtApplyExpressionOccupation(e);
      }),
      (this.bKt = (e) => {
        e = this.Yre.TreeIncId === e;
        this.yKt.OnBtReleaseExpressionOccupation(e),
          this.TKt.OnBtReleaseExpressionOccupation(e),
          this.IKt.OnBtReleaseExpressionOccupation(e),
          this.LKt.OnBtReleaseExpressionOccupation(e);
      }),
      (this.Yre = e),
      (this.yKt = new TrackTextExpressController_1.TrackTextExpressController(
        e,
      )),
      (this.TKt = new TrackMarkExpressController_1.TrackMarkExpressController(
        e,
      )),
      (this.IKt =
        new TrackEffectExpressController_1.TrackEffectExpressController(this)),
      (this.LKt =
        new CheckPointEffectController_1.CheckPointEffectController());
  }
  Init() {
    this.tKt();
  }
  Dispose() {
    this.yKt.Clear(), this.TKt.Clear(), this.IKt.Clear(), this.iKt();
  }
  tKt() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
      this.REe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        this.PKt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DisActiveBattleView,
        this.xKt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
        this.wKt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeApplyExpressionOccupation,
        this.BKt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeReleaseExpressionOccupation,
        this.bKt,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Yre,
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.DKt,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Yre,
        EventDefine_1.EEventName.GeneralLogicTreeSuspend,
        this.UKt,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Yre,
        EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
        this.AKt,
      );
  }
  iKt() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
      this.REe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        this.PKt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DisActiveBattleView,
        this.xKt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
        this.wKt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeApplyExpressionOccupation,
        this.BKt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeReleaseExpressionOccupation,
        this.bKt,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Yre,
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.DKt,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Yre,
        EventDefine_1.EEventName.GeneralLogicTreeSuspend,
        this.UKt,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Yre,
        EventDefine_1.EEventName.GeneralLogicTreeCancelSuspend,
        this.AKt,
      );
  }
  EnableTrack(e, t = 0) {
    this.yKt.EnableTrack(e, t),
      this.TKt.EnableTrack(e),
      this.IKt.EnableTrack(e),
      this.LKt.EnableAllEffects(e);
  }
  StartTextExpress(e = 0) {
    this.yKt.StartTextExpress(e);
  }
  EndTextExpress(e = 0) {
    this.yKt.EndTextExpress(e);
  }
  GetNodeTrackPosition(e) {
    return this.TKt.GetNodeTrackMarkCreator(e)?.GetTrackPosition();
  }
  GetDefaultMark(e) {
    return this.TKt.GetNodeTrackMarkCreator(e)?.GetDefaultMark();
  }
  GetTrackDistance(e) {
    var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    return t && (e = this.GetNodeTrackPosition(e))
      ? Math.round(Vector_1.Vector.Distance(e, t) * MapDefine_1.FLOAT_0_01)
      : TrackDefine_1.INVALID_TRACKDISTANCE;
  }
  GetRangeMarkSize(e) {
    e = this.TKt.GetNodeTrackMarkCreator(e);
    return e ? e.MarkRange : 0;
  }
  GetRangeMarkShowDis(e) {
    return this.TKt.GetNodeTrackMarkCreator(e).RangeMarkShowDis;
  }
  GetTrackEffectOption(e) {
    return this.TKt.GetNodeTrackMarkCreator(e).TrackEffectOption;
  }
  RKt(e, t, i) {
    return (
      0 === i &&
      t === Protocol_1.Aki.Protocol.N2s.Lkn &&
      this.Yre.BtType === Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest &&
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
        this.Yre.RemoveTag(8),
        0)
      )
    );
  }
  CheckCanShow() {
    var e;
    let t = 0,
      i = !1;
    for ([, e] of this.Yre.GetAllNodes())
      e.ContainTag(2) && (i = !0), e.ContainTag(0) && (t += 1);
    return 0 !== t || !i;
  }
  CreateMapMarks() {
    this.TKt.CreateMapMarks();
  }
}
exports.BehaviorTreeExpressionComponent = BehaviorTreeExpressionComponent;
//# sourceMappingURL=BehaviorTreeExpressionComponent.js.map
