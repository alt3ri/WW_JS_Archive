"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrackTextExpressController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LogicNodeBase_1 = require("../../BehaviorNode/LogicNode/LogicNodeBase"),
  GeneralLogicTreeDefine_1 = require("../../Define/GeneralLogicTreeDefine"),
  GeneralLogicTreeController_1 = require("../../GeneralLogicTreeController");
class TrackTextExpressController {
  constructor(e) {
    (this.Yre = void 0),
      (this.fXt = void 0),
      (this.pXt = void 0),
      (this.vXt = void 0),
      (this.MXt = void 0),
      (this.EXt = !1),
      (this.Yre = e),
      (this.pXt = new GeneralLogicTreeDefine_1.TreeTrackTextExpressionInfo()),
      (this.fXt = e.UiTrackTextInfo),
      (this.MXt = []),
      (this.vXt = new Map());
  }
  Clear() {
    this.pXt.Clear(),
      this.fXt.Clear(),
      (this.MXt.length = 0),
      this.vXt.clear(),
      this.EndTextExpress();
  }
  EnableTrack(e, t = 0) {
    if (e) this.StartTextExpress();
    else {
      let e = 1 === t ? 2 : 0;
      this.EndTextExpress(e);
    }
  }
  StartTextExpress(e = 0) {
    this.vXt.set(e, !0), this.Yre.IsOccupied || this.SXt(e);
  }
  SXt(e) {
    var t;
    this.EXt ||
      ((t = this.Yre.CreateShowBridge()),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
        t,
        e,
      ),
      (this.EXt = !0));
  }
  EndTextExpress(e = 0) {
    2 === e ? this.vXt.clear() : this.vXt.delete(e),
      0 === this.vXt.size && this.yXt(e);
  }
  yXt(e) {
    this.EXt &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText,
        this.Yre.TreeIncId,
        e,
      ),
      GeneralLogicTreeController_1.GeneralLogicTreeController.TryReleaseExpressionOccupation(
        this.Yre.TreeIncId,
      ),
      (this.EXt = !1));
  }
  UpdateTextExpress(e) {
    this.EXt &&
      !e &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText,
        this.Yre.CreateShowBridge(),
      );
  }
  UpdateTrackTextData(e, t) {
    if (e instanceof LogicNodeBase_1.LogicNodeBase)
      switch (t) {
        case Protocol_1.Aki.Protocol.BNs._5n:
          e.ContainTag(0) && this.IXt(e.NodeId, e.CustomUiConfig);
          break;
        case Protocol_1.Aki.Protocol.BNs.Proto_CompletedSuccess:
        case Protocol_1.Aki.Protocol.BNs.Proto_CompletedFailed:
        case Protocol_1.Aki.Protocol.BNs.Proto_Destroy:
          this.IXt(e.NodeId, void 0);
      }
    else this.Yre.ContainTag(10) || this.TXt();
  }
  IXt(i, e) {
    var t = this.MXt.findIndex((e, t) => e.SourceOfAdd === i);
    if (e)
      t < 0
        ? this.MXt.push(new GeneralLogicTreeDefine_1.BtCustomUiConfig(i, e))
        : (this.MXt[t].CustomUiConfig = e);
    else {
      if (t < 0) return;
      this.MXt.splice(t, 1);
    }
    this.Yre.RemoveTag(10), this.Yre.RemoveTag(11);
    let s = void 0;
    0 !== this.MXt.length
      ? (this.Yre.AddTag(10),
        (e = this.MXt[0].CustomUiConfig),
        this.pXt.CopyConfig(e),
        (s = e.TrackRadius?.TrackRadius),
        e.UiType === IQuest_1.EQuestScheduleUiType.LevelPlay &&
          this.Yre.AddTag(11),
        this.fXt.Clear(),
        this.fXt.SetMainTitle(this.pXt.MainTitle),
        this.pXt.SubTitles?.forEach((e) => {
          this.fXt.AddSubTitle(e);
        }))
      : this.TXt(),
      ModelManager_1.ModelManager.LevelPlayModel.ChangeLevelPlayTrackRange(
        this.Yre.TreeConfigId,
        s,
      );
  }
  TXt() {
    var e, t, i;
    this.fXt.Clear();
    let s = 0;
    for ([e, t] of this.Yre.GetNodesByGroupId(1))
      t.ContainTag(0) &&
        ((i = {
          TidTitle: t.TrackTextConfig,
          QuestScheduleType: {
            Type: IQuest_1.EQuestScheduleType.ChildQuestCompleted,
            ChildQuestId: e,
            ShowTracking: !0,
          },
        }),
        this.fXt.SetMainTitle(i),
        this.fXt.AddSubTitle(i),
        s++);
    1 === s ? this.fXt.ClearSubTitle() : this.fXt.SetMainTitle(void 0);
  }
  OnBtApplyExpressionOccupation(e) {
    e || this.yXt(3);
  }
  OnBtReleaseExpressionOccupation(e) {
    e || (0 !== this.vXt.size && this.SXt(3));
  }
  OnSuspend(e, t) {
    switch (t) {
      case 1:
        this.LXt(e, t);
        break;
      case 2:
        this.yXt(4);
    }
  }
  LXt(e, t) {
    e = this.Yre.GetNode(e);
    e &&
      e.ContainTag(0) &&
      e instanceof LogicNodeBase_1.LogicNodeBase &&
      (this.fXt.Clear(), 1 === t) &&
      e.SuspendTrackText &&
      !StringUtils_1.StringUtils.IsEmpty(
        PublicUtil_1.PublicUtil.GetConfigTextByKey(e.SuspendTrackText),
      ) &&
      (this.fXt.SetMainTitle({
        TidTitle: e.SuspendTrackText,
        QuestScheduleType: { Type: IQuest_1.EQuestScheduleType.None },
      }),
      this.fXt.ClearSubTitle());
  }
  OnCancelSuspend() {
    this.DXt(), 0 !== this.vXt.size && this.SXt(3);
  }
  DXt() {
    this.Yre.ContainTag(10) &&
      (this.fXt.Clear(),
      this.fXt.SetMainTitle(this.pXt.MainTitle),
      this.pXt.SubTitles?.forEach((e) => {
        this.fXt.AddSubTitle(e);
      }));
  }
}
exports.TrackTextExpressController = TrackTextExpressController;
//# sourceMappingURL=TrackTextExpressController.js.map
