"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrackTextExpressController = void 0);
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const IQuest_1 = require("../../../../../UniverseEditor/Interface/IQuest");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LogicNodeBase_1 = require("../../BehaviorNode/LogicNode/LogicNodeBase");
const GeneralLogicTreeDefine_1 = require("../../Define/GeneralLogicTreeDefine");
const GeneralLogicTreeController_1 = require("../../GeneralLogicTreeController");
class TrackTextExpressController {
  constructor(e) {
    (this.Yre = void 0),
      (this.fQt = void 0),
      (this.pQt = void 0),
      (this.vQt = void 0),
      (this.MQt = void 0),
      (this.SQt = !1),
      (this.Yre = e),
      (this.pQt = new GeneralLogicTreeDefine_1.TreeTrackTextExpressionInfo()),
      (this.fQt = e.UiTrackTextInfo),
      (this.MQt = []),
      (this.vQt = new Map());
  }
  Clear() {
    this.pQt.Clear(),
      this.fQt.Clear(),
      (this.MQt.length = 0),
      this.vQt.clear(),
      this.EndTextExpress();
  }
  EnableTrack(e, t = 0) {
    if (e) this.StartTextExpress();
    else {
      const e = t === 1 ? 2 : 0;
      this.EndTextExpress(e);
    }
  }
  StartTextExpress(e = 0) {
    this.vQt.set(e, !0), this.Yre.IsOccupied || this.EQt(e);
  }
  EQt(e) {
    let t;
    this.SQt ||
      ((t = this.Yre.CreateShowBridge()),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
        t,
        e,
      ),
      (this.SQt = !0));
  }
  EndTextExpress(e = 0) {
    e === 2 ? this.vQt.clear() : this.vQt.delete(e),
      this.vQt.size === 0 && this.yQt(e);
  }
  yQt(e) {
    this.SQt &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText,
        this.Yre.TreeIncId,
        e,
      ),
      GeneralLogicTreeController_1.GeneralLogicTreeController.TryReleaseExpressionOccupation(
        this.Yre.TreeIncId,
      ),
      (this.SQt = !1));
  }
  UpdateTextExpress(e) {
    this.SQt &&
      !e &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText,
        this.Yre.CreateShowBridge(),
      );
  }
  UpdateTrackTextData(e, t) {
    if (e instanceof LogicNodeBase_1.LogicNodeBase)
      switch (t) {
        case Protocol_1.Aki.Protocol.N2s.Lkn:
          e.ContainTag(0) && this.IQt(e.NodeId, e.CustomUiConfig);
          break;
        case Protocol_1.Aki.Protocol.N2s.Proto_CompletedSuccess:
        case Protocol_1.Aki.Protocol.N2s.Proto_CompletedFailed:
        case Protocol_1.Aki.Protocol.N2s.Proto_Destroy:
          this.IQt(e.NodeId, void 0);
      }
    else this.Yre.ContainTag(10) || this.TQt();
  }
  IQt(i, e) {
    const t = this.MQt.findIndex((e, t) => e.SourceOfAdd === i);
    if (e)
      t < 0
        ? this.MQt.push(new GeneralLogicTreeDefine_1.BtCustomUiConfig(i, e))
        : (this.MQt[t].CustomUiConfig = e);
    else {
      if (t < 0) return;
      this.MQt.splice(t, 1);
    }
    this.Yre.RemoveTag(10);
    let s = void 0;
    this.MQt.length !== 0
      ? (this.Yre.AddTag(10),
        (e = this.MQt[0].CustomUiConfig),
        this.pQt.CopyConfig(e),
        (s = e.TrackRadius?.TrackRadius),
        this.fQt.Clear(),
        this.fQt.SetMainTitle(this.pQt.MainTitle),
        this.pQt.SubTitles?.forEach((e) => {
          this.fQt.AddSubTitle(e);
        }))
      : this.TQt(),
      ModelManager_1.ModelManager.LevelPlayModel.ChangeLevelPlayTrackRange(
        this.Yre.TreeConfigId,
        s,
      );
  }
  TQt() {
    let e, t, i;
    this.fQt.Clear();
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
        this.fQt.SetMainTitle(i),
        this.fQt.AddSubTitle(i),
        s++);
    s === 1 ? this.fQt.ClearSubTitle() : this.fQt.SetMainTitle(void 0);
  }
  OnBtApplyExpressionOccupation(e) {
    e || this.yQt(3);
  }
  OnBtReleaseExpressionOccupation(e) {
    e || (this.vQt.size !== 0 && this.EQt(3));
  }
  OnSuspend(e, t) {
    switch (t) {
      case 1:
        this.LQt(e, t);
        break;
      case 2:
        this.yQt(4);
    }
  }
  LQt(e, t) {
    e = this.Yre.GetNode(e);
    e &&
      e.ContainTag(0) &&
      e instanceof LogicNodeBase_1.LogicNodeBase &&
      (this.fQt.Clear(), t === 1) &&
      e.SuspendTrackText &&
      !StringUtils_1.StringUtils.IsEmpty(
        PublicUtil_1.PublicUtil.GetConfigTextByKey(e.SuspendTrackText),
      ) &&
      (this.fQt.SetMainTitle({
        TidTitle: e.SuspendTrackText,
        QuestScheduleType: { Type: IQuest_1.EQuestScheduleType.None },
      }),
      this.fQt.ClearSubTitle());
  }
  OnCancelSuspend() {
    this.DQt(), this.vQt.size !== 0 && this.EQt(3);
  }
  DQt() {
    this.Yre.ContainTag(10) &&
      (this.fQt.Clear(),
      this.fQt.SetMainTitle(this.pQt.MainTitle),
      this.pQt.SubTitles?.forEach((e) => {
        this.fQt.AddSubTitle(e);
      }));
  }
}
exports.TrackTextExpressController = TrackTextExpressController;
// # sourceMappingURL=TrackTextExpressController.js.map
