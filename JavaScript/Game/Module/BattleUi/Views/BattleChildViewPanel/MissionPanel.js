"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MissionPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
  QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BattleQuestUpdateTipsView_1 = require("../MissionView/BattleQuestUpdateTipsView"),
  BehaviorTreeView_1 = require("../MissionView/BehaviorTreeView"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel"),
  MISSION_IN = "MissionIn",
  MISSION_OUT = "MissionOut";
class PendingProcess {
  constructor(e) {
    (this.ProcessType = e),
      (this.ProcessId = 0),
      (this.Finished = !1),
      (this.ProcessId = ++PendingProcess.Id);
  }
}
PendingProcess.Id = 0;
class TreeViewStartTrackProcess extends PendingProcess {
  constructor(e, t) {
    super(0), (this.ShowBridge = e), (this.Reason = t);
  }
}
class TreeViewEndTrackProcess extends PendingProcess {
  constructor(e, t) {
    super(1), (this.TreeIncId = e), (this.Reason = t);
  }
}
class TreeViewUpdateShowProcess extends PendingProcess {
  constructor(e) {
    super(2), (this.ShowBridge = e);
  }
}
class ShowQuestUpdateTipsProcess extends PendingProcess {
  constructor(e) {
    super(3), (this.Info = e);
  }
}
class MissionPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.HZe = void 0),
      (this.jZe = void 0),
      (this.WZe = void 0),
      (this.KZe = void 0),
      (this.QZe = void 0),
      (this.SequencePlayer = void 0),
      (this.oxn = 0),
      (this.rct = void 0),
      (this.$5e = !1),
      (this.XZe = (e, t) => {
        this.GetActive() || this.$Ze(e.TreeIncId),
          this.YZe(new TreeViewStartTrackProcess(e, t));
      }),
      (this.JZe = (e, t) => {
        this.GetActive() || this.$Ze(e),
          this.YZe(new TreeViewEndTrackProcess(e, t));
      }),
      (this.zZe = (e) => {
        this.YZe(new TreeViewUpdateShowProcess(e));
      }),
      (this.ZZe = (e) => {
        this.YZe(new ShowQuestUpdateTipsProcess(e));
      }),
      (this.nye = () => {
        this.$5e = !0;
      }),
      (this.nxn = (e) => {
        this.QZe && e === this.QZe.ProcessId && this._et(e);
      }),
      (this.eet = (e) => {
        var t = e.ShowBridge,
          i = t.TreeIncId,
          s =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              i,
            );
        if (s) {
          var r = s.BtType,
            h = this.tet(r, e.Reason);
          switch (h) {
            case 0:
              if (
                ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
              )
                break;
              var n = this.GetItem(2);
              return (
                n?.SetUIActive(!0),
                n?.SetAlpha(1),
                n?.SetAnchorOffsetX(0),
                this.HZe.get(h).StartShow(e.ProcessId, t)
              );
            case 1:
              return this.iet(e.ProcessId, r, i, s.TreeConfigId, t);
          }
        }
        return !0;
      }),
      (this.oet = (e) => {
        var t = this.HZe.get(0),
          i = e.TreeIncId;
        return i === t.TreeIncId
          ? t.EndShow(e.ProcessId, e.Reason)
          : (t = this.ret(i)) < 0 ||
              ((i = this.HZe.get(1)),
              this.WZe.splice(t, 1),
              0 === this.WZe.length
                ? i.EndShow(e.ProcessId)
                : this.net(e.ProcessId));
      }),
      (this.owt = (e) => {
        switch (e) {
          case MISSION_IN:
            var t = this.QZe;
            1 === this.oxn
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Log",
                    19,
                    "MissionPanel:QuestUpdateStart - MISSION_IN Start",
                  ),
                this.jZe.OnBeforePlayShowSequence(t.Info),
                this.GetItem(1)?.SetUIActive(!0),
                this.GetItem(2)?.SetUIActive(!1))
              : 3 === this.oxn &&
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Log",
                    19,
                    "MissionPanel:QuestUpdateEnd - MISSION_IN Start",
                  ),
                (t = t.Info.ShowBridge),
                this.aet(t),
                this.GetItem(1)?.SetUIActive(!1),
                this.GetItem(2)?.SetUIActive(!0));
            break;
          case MISSION_OUT:
            1 === this.oxn
              ? (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Log",
                    19,
                    "MissionPanel:VerticalLayout - MISSION_OUT 开始播放",
                  ),
                this.GetItem(1)?.SetUIActive(!1),
                this.GetItem(2)?.SetUIActive(!0))
              : 3 === this.oxn &&
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Log",
                    19,
                    "MissionPanel:QuestUpdateEnd - MISSION_OUT Start",
                  ),
                this.GetItem(1)?.SetUIActive(!0),
                this.GetItem(2)?.SetUIActive(!1),
                this.jZe.OnBeforePlayHideSequence());
        }
      }),
      (this.yct = (e) => {
        switch (e) {
          case MISSION_IN:
            var t = this.QZe;
            if (1 === this.oxn) {
              (this.oxn = 2),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Log",
                    19,
                    "MissionPanel:QuestUpdateStart - MISSION_IN End",
                  );
              var i = t.Info.ShowBridge;
              if (i) {
                let e =
                  ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestUpdateShowTime(
                    i.QuestType,
                  );
                (e = e || TimerSystem_1.MIN_TIME),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "Log",
                      19,
                      "MissionPanel:QuestUpdateStay - Stay",
                    ),
                  (this.rct = TimerSystem_1.TimerSystem.Delay(
                    this.sxn,
                    1e3 * e,
                  ));
              } else this.sxn();
            } else
              3 === this.oxn &&
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Log",
                    19,
                    "MissionPanel:QuestUpdateEnd - MISSION_IN End",
                  ),
                this.axn(t));
            break;
          case MISSION_OUT:
            1 === this.oxn
              ? this.SequencePlayer.PlayLevelSequenceByName(MISSION_IN)
              : 3 === this.oxn &&
                (Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Log",
                    19,
                    "MissionPanel:QuestUpdateEnd - MISSION_OUT End",
                  ),
                this.SequencePlayer.PlayLevelSequenceByName(MISSION_IN),
                this.hxn()) &&
                this.SequencePlayer.StopCurrentSequence(!0, !0);
        }
      }),
      (this.fqn = () => {
        switch (
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Log", 19, "MissionPanel:Press Track"),
          this.oxn)
        ) {
          case 1:
            this.SequencePlayer.StopCurrentSequence(!1, !0);
            break;
          case 2:
            TimerSystem_1.TimerSystem.Has(this.rct) &&
              TimerSystem_1.TimerSystem.Remove(this.rct);
        }
        this.sxn();
      }),
      (this.sxn = () => {
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Log",
            19,
            "MissionPanel:切换到QuestUpdateEnd - MISSION_OUT 开始播放",
          ),
          (this.oxn = 3),
          this.SequencePlayer.PlayLevelSequenceByName(MISSION_OUT);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.RootItem.SetAnchorOffsetX(0),
      this.GetItem(1)?.SetUIActive(!1),
      this.GetItem(2).SetUIActive(!0);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(), (this.HZe = new Map());
    var e = this.GetItem(0),
      t = await this.NewDynamicChildViewAsync(
        e.GetOwner(),
        BehaviorTreeView_1.BehaviorTreeView,
      ),
      t =
        (t.SetActive(!1),
        this.HZe.set(0, t),
        LguiUtil_1.LguiUtil.CopyItem(e, e.GetParentAsUIItem())),
      e = await this.NewDynamicChildViewAsync(
        t.GetOwner(),
        BehaviorTreeView_1.BehaviorTreeView,
      );
    e.SetActive(!1),
      this.HZe.set(1, e),
      (this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.SequencePlayer.BindSequenceStartEvent(this.owt),
      this.SequencePlayer.BindSequenceCloseEvent(this.yct);
  }
  InitializeTemp() {
    (this.WZe = []), (this.KZe = []);
  }
  async InitializeAsync() {
    var e = this.GetItem(1);
    this.jZe = await this.NewDynamicChildViewAsync(
      e.GetOwner(),
      BattleQuestUpdateTipsView_1.BattleQuestUpdateTipsView,
    );
  }
  Reset() {
    (this.WZe = void 0), this.jZe?.Destroy(), (this.jZe = void 0);
    for (var [, e] of this.HZe) e.Destroy();
    this.HZe.clear(), super.Reset();
  }
  OnShowBattleChildViewPanel() {
    for (var [, e] of this.HZe) e.OnPanelShow();
    this.jZe.OnPanelShow(),
      this.SequencePlayer.GetCurrentSequence() &&
        this.SequencePlayer.ResumeSequence(),
      TimerSystem_1.TimerSystem.Has(this.rct) &&
        TimerSystem_1.TimerSystem.IsPause(this.rct) &&
        TimerSystem_1.TimerSystem.Resume(this.rct);
  }
  OnHideBattleChildViewPanel() {
    for (var [, e] of this.HZe) e.OnPanelHide();
    this.jZe.OnPanelHide(),
      this.SequencePlayer.GetCurrentSequence() &&
        this.SequencePlayer.PauseSequence(),
      TimerSystem_1.TimerSystem.Has(this.rct) &&
        TimerSystem_1.TimerSystem.Pause(this.rct);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
      this.XZe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText,
        this.JZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText,
        this.zZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.QuestUpdateInfoAdd,
        this.ZZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MissionPanelProcessEnd,
        this.nxn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.QuestUpdateTipsClickTrack,
        this.fqn,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
      this.XZe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText,
        this.JZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeUpdateShowTrackText,
        this.zZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.QuestUpdateInfoAdd,
        this.ZZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.nye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MissionPanelProcessEnd,
        this.nxn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.QuestUpdateTipsClickTrack,
        this.fqn,
      );
  }
  $Ze(i) {
    if (0 !== this.KZe.length)
      for (let t = 0; t < this.KZe.length; t++) {
        var s = this.KZe[t];
        let e = !1;
        switch (s.ProcessType) {
          case 0:
          case 2:
            e = s.ShowBridge.TreeIncId === i;
            break;
          case 1:
            e = s.TreeIncId === i;
            break;
          case 3:
            e = s.Info.TreeIncId === i;
        }
        var r = this.QZe && this.QZe.ProcessId === s.ProcessId;
        e && !r && this.KZe.splice(t, 1);
      }
  }
  YZe(e) {
    this.KZe.push(e);
  }
  KOn(e) {
    this.KZe.unshift(e);
  }
  OnTickBattleChildViewPanel(e) {
    this.$5e &&
      (MissionPanel.vJe.Start(),
      this.QOn(),
      this.XOn(e),
      MissionPanel.vJe.Stop());
  }
  QOn() {
    if (0 !== this.KZe.length && !this.QZe) {
      switch (((this.QZe = this.KZe[0]), this.QZe.ProcessType)) {
        case 0:
          this.QZe.Finished = this.eet(this.QZe);
          break;
        case 1:
          this.QZe.Finished = this.oet(this.QZe);
          break;
        case 2:
          this.QZe.Finished = this.het(this.QZe);
          break;
        case 3:
          this.QZe.Finished = this.let(this.QZe);
      }
      this.QZe?.Finished && this._et(this.QZe.ProcessId);
    }
  }
  XOn(e) {
    if (this.HZe)
      for (var [, t] of this.HZe) t.OnRefresh(e, this.QZe?.ProcessId ?? 0);
  }
  _et(e) {
    0 !== this.KZe.length &&
      this.KZe[0].ProcessId === e &&
      (this.KZe.shift(), (this.QZe = void 0));
  }
  tet(e, t) {
    let i = 1;
    switch (e) {
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest:
        i = 1 === t ? 1 : 0;
        break;
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeLevelPlay:
      case Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst:
        i = 1;
    }
    return i;
  }
  het(e) {
    this.aet(e.ShowBridge);
    for (var [, t] of this.HZe)
      if (t.TreeIncId === e.ShowBridge.TreeIncId)
        return t.OnLogicTreeUpdateShow(e.ProcessId, e.ShowBridge);
    return !0;
  }
  aet(t) {
    var e = this.WZe.find((e) => e.ShowBridge.TreeIncId === t.TreeIncId);
    e && (e.ShowBridge = t);
  }
  ret(t) {
    return this.WZe.findIndex((e) => e.ShowBridge.TreeIncId === t);
  }
  uet() {
    this.WZe.sort((e, t) =>
      e.ShowPriority !== t.ShowPriority
        ? e.ShowPriority > t.ShowPriority
          ? 1
          : -1
        : e.BtType !== t.BtType
          ? e.BtType > t.BtType
            ? 1
            : -1
          : e.ShowBridge.TreeIncId > t.ShowBridge.TreeIncId
            ? 1
            : -1,
    );
  }
  iet(e, t, i, s, r) {
    return !this.cet(t, i, s, r) || this.net(e);
  }
  cet(e, t, i, s) {
    return (
      this.HZe.get(1).TreeIncId !== t &&
      !(
        0 <= this.ret(t) ||
        ((t = {
          ShowPriority:
            GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(
              e,
              i,
            ).GetUiPriority(),
          BtType: e,
          ShowBridge: s,
        }),
        this.WZe.push(t),
        0)
      )
    );
  }
  net(e) {
    this.uet();
    var t = this.WZe[this.WZe.length - 1];
    return this.HZe.get(1).StartShow(e, t.ShowBridge);
  }
  let(e) {
    var t,
      i,
      s = e.Info;
    return (
      !s ||
      !(t = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
        s.TreeIncId,
      )) ||
      !(
        t.GetNode(s.NodeId) &&
        ((t =
          ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id),
        (i = s.ShowBridge.TreeConfigId),
        s.IsGmFinished
          ? (t !== i &&
              QuestController_1.QuestNewController.RequestTrackQuest(i, !0, 0),
            this.axn(e),
            0)
          : t === i
            ? (this.axn(e), 0)
            : (this.hxn()
                ? ((this.oxn = 1),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("Log", 19, "MissionPanel: In 开始"),
                  this.SequencePlayer.PlayLevelSequenceByName(MISSION_IN))
                : ((this.oxn = 1),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("Log", 19, "MissionPanel: Out 开始"),
                  this.SequencePlayer.PlayLevelSequenceByName(MISSION_OUT)),
              1))
      )
    );
  }
  axn(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Log", 19, "MissionPanel:QuestUpdateTipsEnd -  AllOver"),
      this.jZe.OnAfterPlayHideSequence(),
      this.nxn(e.ProcessId),
      this.KOn(new TreeViewUpdateShowProcess(e.Info.ShowBridge)),
      (this.oxn = 0);
  }
  hxn() {
    for (var [, e] of this.HZe)
      if (e.IsShowingBehaviorTreeView && e.CheckVisible()) return !1;
    return !0;
  }
}
(exports.MissionPanel = MissionPanel).vJe = Stats_1.Stat.Create(
  "[BattleView]MissionPanelTick",
);
//# sourceMappingURL=MissionPanel.js.map
