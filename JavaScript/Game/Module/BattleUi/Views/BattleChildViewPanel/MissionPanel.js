"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MissionPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  DangoAbyssBattlePanel_1 = require("../../../Dango/DangoAbyss/View/DangoAbyssBattlePanel"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BattleQuestUpdateTipsView_1 = require("../MissionView/BattleQuestUpdateTipsView"),
  MissionViewItem_1 = require("../MissionView/MissionViewItem"),
  PendingProcessController_1 = require("../MissionView/PendingProcessController"),
  QuestUpdateTipsController_1 = require("../MissionView/QuestUpdateTipsController"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel");
class MissionPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.ILr = new Map()),
      (this.LU_ = new Map()),
      (this.WZe = []),
      (this.k2c = void 0),
      (this.wU_ = () => !this.GetActive()),
      (this.RU_ = async (e) => {
        var i = e.ShowData;
        let t = void 0;
        switch (i.DataSource) {
          case 0:
            var s = i.Id,
              s =
                ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
                  s,
                );
            if (
              !s ||
              s.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeInvalid
            )
              return !0;
            t =
              s.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest ||
              1 === e.Reason
                ? 1
                : 0;
            break;
          case 1:
            t = 1;
        }
        if (void 0 !== t)
          switch (t) {
            case 0:
              if (
                ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
              )
                break;
              return this.LU_.get(t).StartShow(e.ProcessId, i, e.IsSkipAnim);
            case 1:
              return this.iet(e.ProcessId, i, e.IsSkipAnim);
          }
        return !0;
      }),
      (this.AU_ = async (e) => {
        for (var [, i] of this.LU_)
          if (i.ShowDataId === e.ShowData.Id)
            return i.OnLogicTreeUpdateShow(
              e.ProcessId,
              e.ShowData,
              e.IsSkipAnim,
            );
        return this.aet(e.ShowData), !0;
      }),
      (this.PU_ = async (e) => {
        var i = this.LU_.get(0),
          t = e.Id;
        return t === i.ShowDataId
          ? i.EndShow(e.ProcessId, e.IsSkipAnim, e.Reason)
          : (i = this.ret(t)) < 0 ||
              ((t = this.LU_.get(1)),
              this.WZe.splice(i, 1),
              await t.EndShow(e.ProcessId, e.IsSkipAnim),
              0 === this.WZe.length) ||
              this.net(e.ProcessId, e.IsSkipAnim);
      }),
      (this.xU_ = async (e) => this.UU_(1).ShowQuestUpdateTipsHandle(e)),
      (this.adc = async (e) => {
        return (
          await this.LU_.get(e.ViewId).ChildStepConditionIndexChange(
            e.StepId,
            e.CurConditionTextIndex,
          ),
          !0
        );
      }),
      (this.DU_ = () => {
        for (var [, e] of this.LU_)
          if (
            ModelManager_1.ModelManager.BattleUiModel.IsShowingMissionViewItems?.get(
              e.ViewType,
            ) &&
            e.CheckVisible()
          )
            return !1;
        return !0;
      }),
      (this.BU_ = () => {
        var e = this.UU_(0).GetCurrentProcess();
        e
          ? 3 !== e.ProcessType
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Quest",
                18,
                "MissionPanel:任务更新提示结束动画开始时当前正在处理的操作类型异常",
                ["processType", e.ProcessType],
              )
            : this.aet(e.Info.MissionViewShowData)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Quest",
              18,
              "MissionPanel:任务更新提示结束动画开始时找不到当前正在处理的操作",
            );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  async InitializeAsync() {
    await this.kU_(), await Promise.all([this.O2c()]);
    var e = this.GetItem(0),
      i = LguiUtil_1.LguiUtil.CopyItem(e, e.GetParentAsUIItem()),
      e = await this.NewDynamicChildViewAsync(
        e.GetOwner(),
        MissionViewItem_1.MissionViewItem,
        0,
      ),
      e =
        (await e.HideAsync(),
        this.LU_.set(0, e),
        await this.NewDynamicChildViewAsync(
          i.GetOwner(),
          MissionViewItem_1.MissionViewItem,
          1,
        ));
    await e.HideAsync(),
      this.LU_.set(1, e),
      this.sY_(),
      this.RootItem.SetAnchorOffsetX(0),
      this.GetItem(1)?.SetUIActive(!1),
      this.GetItem(2).SetUIActive(!0);
  }
  sY_() {
    var e = ModelManager_1.ModelManager.BattleUiModel.MissionViewData,
      i = this.UU_(0);
    if (e)
      for (var [, t] of e)
        if (t)
          switch (t.DataSource) {
            case 0:
              i.BehaviorTreeStartShow(t, 0, !0);
              break;
            case 1:
              i.FishingEntrustStartShow(t, 0);
          }
  }
  async kU_() {
    var e = new PendingProcessController_1.PendingProcessController(
        this.wU_,
        this.RU_,
        this.PU_,
        this.AU_,
        this.xU_,
        this.adc,
      ),
      e = (this.ILr.set(0, e), this.GetItem(1)),
      i = this.GetItem(2),
      e = await this.NewDynamicChildViewAsync(
        e.GetOwner(),
        BattleQuestUpdateTipsView_1.BattleQuestUpdateTipsView,
      ),
      e = new QuestUpdateTipsController_1.QuestUpdateTipsController(
        new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem),
        e,
        this.DU_,
        i,
      );
    this.ILr.set(1, e);
  }
  UU_(e) {
    return this.ILr.get(e);
  }
  Reset() {
    this.WZe.length = 0;
    for (var [, e] of this.LU_) e.Destroy();
    this.LU_.clear();
    for (var [, i] of this.ILr) i.OnDestroy();
    super.Reset();
  }
  OnShowBattleChildViewPanel() {
    for (var [, e] of this.LU_) e.OnPanelShow();
    this.UU_(1).OnPanelShow();
  }
  OnHideBattleChildViewPanel() {
    for (var [, e] of this.LU_) e.OnPanelHide();
    this.UU_(1).OnPanelHide();
  }
  AddEvents() {
    for (var [, e] of this.ILr) e.AddEvents();
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.QuestUpdateTipsEndSequenceStart,
      this.BU_,
    );
  }
  RemoveEvents() {
    for (var [, e] of this.ILr) e.RemoveEvents();
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.QuestUpdateTipsEndSequenceStart,
      this.BU_,
    );
  }
  OnTickBattleChildViewPanel(e) {
    ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed &&
      (MissionPanel.vJe.Start(),
      this.UU_(0).ProcessCacheList(),
      this.XOn(e),
      MissionPanel.vJe.Stop());
  }
  XOn(e) {
    if (this.LU_) {
      var i,
        t = this.UU_(0).GetCurrentProcess();
      for ([, i] of this.LU_) i.OnRefresh(e, t?.ProcessId ?? 0);
    }
  }
  aet(e) {
    var i = this.ret(e.Id);
    i < 1 || (this.WZe[i] = e);
  }
  ret(i) {
    return this.WZe.findIndex((e) => e.Id === i);
  }
  async iet(e, i, t) {
    var s = this.ret(i.Id);
    if (0 <= s) {
      if (((this.WZe[s] = i), this.LU_.get(1).ShowDataId !== i.Id)) return !0;
    } else this.WZe.push(i);
    return this.net(e, t);
  }
  async net(e, i) {
    this.WZe.sort((e, i) =>
      e.DataSource !== i.DataSource
        ? e.DataSource - i.DataSource
        : e.ShowPriority - i.ShowPriority,
    );
    var t = this.WZe[this.WZe.length - 1];
    return this.LU_.get(1).StartShow(e, t, i);
  }
  async O2c() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    33 ===
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
        ?.InstSubType &&
      ((e = this.GetItem(3)),
      (this.k2c = await this.NewDynamicChildViewByResourceId(
        e,
        "UiItem_AnniversaryCelebrationMission",
        DangoAbyssBattlePanel_1.DangoAbyssBattlePanel,
      )),
      this.k2c.SetVisible(0, !0));
  }
}
(exports.MissionPanel = MissionPanel).vJe = Stats_1.Stat.Create(
  "[BattleView]MissionPanelTick",
);
//# sourceMappingURL=MissionPanel.js.map
