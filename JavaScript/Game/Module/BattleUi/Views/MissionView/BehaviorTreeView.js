"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorTreeView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputSettings_1 = require("../../../../InputSettings/InputSettings"),
  InputSettingsManager_1 = require("../../../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  BehaviorTreeShowBridge_1 = require("../../../GeneralLogicTree/BaseBehaviorTree/BehaviorTreeShowBridge"),
  GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController"),
  GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
  BattleUiDefine_1 = require("../../BattleUiDefine"),
  BattleChildView_1 = require("../BattleChildView/BattleChildView"),
  MissionPanelStep_1 = require("./MissionPanelStep");
class BehaviorTreeView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.mct = void 0),
      (this.dct = void 0),
      (this.Cct = void 0),
      (this.TotalTitleSequencePlayer = void 0),
      (this.QuestFinishSequencePlayer = void 0),
      (this.fct = void 0),
      (this.$ut = void 0),
      (this.IsShowingBehaviorTreeView = !1),
      (this.$On = !1),
      (this.pct = !1),
      (this.Zut = 0),
      (this.YOn = 0),
      (this.vct = 0),
      (this.mxn = (e) => {
        "Start" === e &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("BattleUiSet", 19, "开始调用ProcessItem节点Active"),
          this.SetUiActive(!0),
          this.GetText(8).IsUIActiveSelf()
            ? this.fct?.SetUiActive(!1)
            : this.fct?.PlayStartSequence(
                this.Zut,
                this.$ut.TreeIncId,
                this.$ut.TrackTextConfig,
              ));
      }),
      (this.dxn = (e) => {
        switch (e) {
          case "Start":
            this.GetText(8).IsUIActiveSelf() &&
              this.fct?.PlayStartSequence(
                this.Zut,
                this.$ut.TreeIncId,
                this.$ut.TrackTextConfig,
              );
            break;
          case "Close":
            this.SetUiActive(!1), this.Ict();
        }
      }),
      (this.dXn = (e) => {
        "Start" === e &&
          (this.GetText(6).SetText(this.$ut?.QuestName ?? ""),
          this.mct.SetUIActive(!1),
          this.dct.SetUIActive(!0));
      }),
      (this.Lct = (e) => {
        switch (e) {
          case "Start":
            this.QuestFinishSequencePlayer.PlayLevelSequenceByName("Close");
            break;
          case "Close":
            this.mct.SetUIActive(!0), this.dct.SetUIActive(!1), this.Ict();
        }
      }),
      (this.fxn = () => {
        var e,
          t = this.GetText(8);
        return this.$ut &&
          this.$ut.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest &&
          (e =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              this.$ut.TreeIncId,
            )) &&
          (e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
            e.TreeConfigId,
          ))
          ? (t.SetText(e.Name), t.SetUIActive(!0), !0)
          : (t.SetUIActive(!1), !1);
      }),
      (this.pqn = (e) => {
        this.TreeIncId !== e ||
          this.GetText(8).IsUIActiveSelf() ||
          this.GetSprite(0)?.SetUIActive(!1);
      }),
      (this.vqn = (e) => {
        this.TreeIncId !== e || this.GetText(8).IsUIActiveSelf() || this.Ost();
      }),
      (this.Ect = () => {
        this.$ut && this.GetText(6).SetText(this.$ut.QuestName);
      }),
      (this.Sct = () => {
        var e,
          t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMarkConfig(
            this.$ut?.TrackIconConfigId ?? 0,
          );
        t &&
          (e = this.GetUiNiagara(7)) &&
          (e.SetColor(UE.Color.FromHex(t.TrackTextStartEffectColor)),
          e.ActivateSystem(!0));
      }),
      (this.Rct = (e) => {
        e === this.$ut?.TreeIncId && this.zOn(0);
      }),
      (this.Uct = (e) => {
        6 === e.Type &&
          e.TreeIncId === this.$ut?.TreeIncId &&
          (this.Act(), this.Rct(this.$ut.TreeIncId));
      }),
      (this.Pct = (e) => {
        7 === e && this.Act();
      }),
      (this.xct = (e) => {
        7 === e && this.Act();
      }),
      (this.bMe = (e, t) => {
        1 === t && this.wct();
      }),
      (this.wct = () => {
        if (this.$ut && !this.pct)
          switch (((this.pct = !0), this.vct)) {
            case 1:
              var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(114);
              e.SetCloseFunction(() => {
                var e;
                this.$ut?.IsRollbackWaiting() &&
                  ((e = this.$ut.GetBlackboard()),
                  EventSystem_1.EventSystem.EmitWithTarget(
                    e,
                    EventDefine_1.EEventName
                      .GeneralLogicTreeRollbackWaitingUpdate,
                  ));
              }),
                e.FunctionMap.set(1, () => {
                  this.pct = !1;
                }),
                e.FunctionMap.set(2, () => {
                  !this.$ut || this.$ut?.IsRollbackWaiting()
                    ? (this.pct = !1)
                    : GeneralLogicTreeController_1.GeneralLogicTreeController.RequestGiveUp(
                        this.$ut.TreeIncId,
                        () => {
                          this.pct = !1;
                        },
                      );
                }),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  e,
                );
              break;
            case 2:
              e = this.$ut.GetCurrentCommunicateId();
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.CommunicateAgain,
                e,
              ),
                this.Act(),
                (this.pct = !1);
              break;
            case 3:
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ChallengeAgain,
              ),
                this.Act(),
                (this.pct = !1);
          }
      }),
      (this.Bct = () => {
        this.$ut?.BtType === Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
            this.$ut.BtType,
            this.$ut.TreeIncId,
          );
      }),
      (this.XBo = () => {
        this.Act();
      });
  }
  get TreeIncId() {
    return this.$ut?.TreeIncId;
  }
  get BtType() {
    return this.$ut?.BtType;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UINiagara],
      [8, UE.UIText],
    ]),
      (this.BtnBindInfo = [[3, this.wct]]);
  }
  OnStart() {
    this.SetUiActive(!0),
      this.GetText(2).SetAlpha(1),
      this.GetItem(1).SetUIActive(!1),
      (this.mct = this.GetItem(5)),
      this.mct.SetUIActive(!0),
      (this.dct = this.GetItem(4)),
      this.dct.SetUIActive(!1),
      this.GetText(6).OnSelfLanguageChange.Bind(this.Ect),
      this.GetText(8).OnSelfLanguageChange.Bind(this.fxn),
      (this.TotalTitleSequencePlayer =
        new LevelSequencePlayer_1.LevelSequencePlayer(this.mct)),
      this.TotalTitleSequencePlayer.BindSequenceStartEvent(this.mxn),
      this.TotalTitleSequencePlayer.BindSequenceCloseEvent(this.dxn),
      (this.QuestFinishSequencePlayer =
        new LevelSequencePlayer_1.LevelSequencePlayer(this.dct)),
      this.QuestFinishSequencePlayer.BindSequenceStartEvent(this.dXn),
      this.QuestFinishSequencePlayer.BindSequenceCloseEvent(this.Lct),
      (this.Cct = this.RootItem.GetOwner().GetComponentByClass(
        UE.UIButtonComponent.StaticClass(),
      ));
    this.GetUiNiagara(7).SetNiagaraUIActive(!0, !1);
    var e = this.GetItem(1);
    (this.fct = new MissionPanelStep_1.MissionPanelStep()), this.fct.Init(e);
  }
  OnBeforeDestroy() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      InputMappingsDefine_1.actionMappings.玩法放弃,
      this.bMe,
    ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.任务追踪,
        this.bMe,
      );
  }
  Reset() {
    this.fct && (this.fct.Dispose(), (this.fct = void 0)),
      this.RootActor?.OnSequencePlayEvent.Unbind(),
      this.TotalTitleSequencePlayer?.Clear(),
      (this.TotalTitleSequencePlayer = void 0);
  }
  OnPanelShow() {
    (this.$On = !0),
      this.Ore(),
      this.QuestFinishSequencePlayer.GetCurrentSequence() &&
        this.QuestFinishSequencePlayer.ResumeSequence(),
      this.TotalTitleSequencePlayer.GetCurrentSequence() &&
        this.TotalTitleSequencePlayer.ResumeSequence(),
      this.fct?.ResumeSequence(),
      this.Act(),
      this.fxn();
  }
  OnPanelHide() {
    (this.$On = !1),
      this.kre(),
      this.QuestFinishSequencePlayer.GetCurrentSequence() &&
        this.QuestFinishSequencePlayer.PauseSequence(),
      this.TotalTitleSequencePlayer.GetCurrentSequence() &&
        this.TotalTitleSequencePlayer.PauseSequence(),
      this.fct?.PauseSequence();
  }
  Ore() {
    this.Cct?.OnClickCallBack.Bind(this.Bct),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
        this.Uct,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.Uct,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeAddTag,
        this.Pct,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeRemoveTag,
        this.xct,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh,
        this.Rct,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MissionPanelStepTitleAnimStart,
        this.pqn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MissionPanelStepTitleAnimEnd,
        this.vqn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnQuestStageNameChange,
        this.fxn,
      ),
      Info_1.Info.IsInTouch() ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.InputControllerChange,
          this.XBo,
        );
  }
  kre() {
    this.Cct?.OnClickCallBack.Unbind(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
        this.Uct,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.Uct,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeAddTag,
        this.Pct,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeRemoveTag,
        this.xct,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeViewForceRefresh,
        this.Rct,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MissionPanelStepTitleAnimStart,
        this.pqn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MissionPanelStepTitleAnimEnd,
        this.vqn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnQuestStageNameChange,
        this.fxn,
      ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.InputControllerChange,
          this.XBo,
        );
  }
  UpdateSelfData(e) {
    this.Gct(e), this.Ost(), this.Act();
  }
  Gct(e) {
    this.$ut &&
      this.$ut !== e &&
      BehaviorTreeShowBridge_1.BehaviorTreeShowBridge.Recycle(this.$ut),
      (this.$ut = e);
  }
  Ost() {
    var e, t;
    this.$ut &&
      (e = this.$ut.TrackIconConfigId) &&
      ((t = this.GetSprite(0)),
      this.CheckVisible()
        ? (t.SetUIActive(!0),
          this.SetSpriteByPath(
            ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(e),
            t,
            !1,
          ))
        : t.SetUIActive(!1));
  }
  JOn() {
    this.$ut && this.fct.Update(this.$ut.TreeIncId, this.$ut.TrackTextConfig);
  }
  Act() {
    let t = void (this.vct = 0);
    var i = this.GetText(2),
      e = this.$ut?.TreeIncId;
    switch (
      (e &&
        (t =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
            e,
          )) &&
        (this.vct = t.GetCurrentNodeShortcutShow()),
      this.vct)
    ) {
      case 0:
        InputDistributeController_1.InputDistributeController.UnBindAction(
          InputMappingsDefine_1.actionMappings.玩法放弃,
          this.bMe,
        ),
          InputDistributeController_1.InputDistributeController.UnBindAction(
            InputMappingsDefine_1.actionMappings.任务追踪,
            this.bMe,
          ),
          i.SetUIActive(!1);
        break;
      case 1: {
        let e = t.GetGiveUpText();
        if (
          ((e =
            e ||
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "GeneralLogicTreeGiveUp",
            )),
          Info_1.Info.IsInKeyBoard())
        ) {
          var s = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
            InputMappingsDefine_1.actionMappings.玩法放弃,
          );
          if (!s) {
            i.SetUIActive(!1);
            break;
          }
          var s = s.GetPcKey();
          if (!s) {
            i.SetUIActive(!1),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("GeneralLogicTree", 19, "pcKey为空", [
                  "actionMapping",
                  InputMappingsDefine_1.actionMappings.玩法放弃,
                ]);
            break;
          }
          var s = `<texture=${s.GetKeyIconPath()}/>` + e;
          i.SetText(s);
        } else
          Info_1.Info.IsInGamepad()
            ? ((s =
                this.Nct(InputMappingsDefine_1.actionMappings.玩法放弃, e) ??
                e),
              i.SetText(s))
            : ((s =
                `<texture=${ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("FightMissionStop")}/>` +
                e),
              i.SetText(s));
        i.SetAlpha(1),
          i.SetUIActive(!0),
          InputDistributeController_1.InputDistributeController.UnBindAction(
            InputMappingsDefine_1.actionMappings.玩法放弃,
            this.bMe,
          ),
          InputDistributeController_1.InputDistributeController.BindAction(
            InputMappingsDefine_1.actionMappings.玩法放弃,
            this.bMe,
          );
        break;
      }
      case 3: {
        let e = t.GetGiveUpText();
        if (
          ((e =
            e ||
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "ChallengeAgain",
            )),
          Info_1.Info.IsInKeyBoard())
        ) {
          s = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
            InputMappingsDefine_1.actionMappings.重新挑战,
          );
          if (!s) {
            i.SetUIActive(!1);
            break;
          }
          s = s.GetPcKey();
          if (!s) {
            i.SetUIActive(!1),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("GeneralLogicTree", 19, "pcKey为空", [
                  "actionMapping",
                  InputMappingsDefine_1.actionMappings.重新挑战,
                ]);
            break;
          }
          s = `<texture=${s.GetKeyIconPath()}/>` + e;
          i.SetText(s);
        } else
          Info_1.Info.IsInGamepad()
            ? ((s =
                this.Nct(InputMappingsDefine_1.actionMappings.重新挑战, e) ??
                e),
              i.SetText(s))
            : ((s =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "ChallengeAgain_mobile",
                ) ?? e),
              i.SetText(s));
        i.SetAlpha(1), i.SetUIActive(!0);
        break;
      }
      case 2: {
        s = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
          InputMappingsDefine_1.actionMappings.任务追踪,
        );
        if (!s) {
          i.SetUIActive(!1),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "GeneralLogicTree",
                19,
                "找不到actionBinding配置",
                [
                  "actionMapping",
                  InputMappingsDefine_1.actionMappings.任务追踪,
                ],
              );
          break;
        }
        InputDistributeController_1.InputDistributeController.UnBindAction(
          InputMappingsDefine_1.actionMappings.任务追踪,
          this.bMe,
        ),
          InputDistributeController_1.InputDistributeController.BindAction(
            InputMappingsDefine_1.actionMappings.任务追踪,
            this.bMe,
          );
        var n = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          "QuestCommunicateCallback",
        );
        let e = n;
        if (Info_1.Info.IsInKeyBoard()) {
          s = s.GetPcKey();
          if (!s) {
            i.SetUIActive(!1),
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("GeneralLogicTree", 19, "pcKey为空", [
                  "actionMapping",
                  InputMappingsDefine_1.actionMappings.任务追踪,
                ]);
            break;
          }
          s = s.GetKeyIconPath();
          e = `<texture=${s}/>` + n;
        } else
          Info_1.Info.IsInGamepad() &&
            (e =
              this.Nct(InputMappingsDefine_1.actionMappings.任务追踪, n) ?? n);
        i.SetText(e), i.SetAlpha(1), i.SetUIActive(!0);
        break;
      }
    }
  }
  Nct(i, s) {
    var e =
      InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
        i,
      );
    if (e) {
      var n = new Map();
      if ((e.GetCurrentPlatformKeyNameMap(n), n)) {
        let e = i,
          t = i;
        for (var [h, r] of n) {
          (h = InputSettings_1.InputSettings.GetKey(h)),
            (r = InputSettings_1.InputSettings.GetKey(r));
          h && (e = h.GetKeyIconPath()), r && (t = r.GetKeyIconPath());
          break;
        }
        return `<texture=${e}/>+<texture=${t}/>` + s;
      }
    }
  }
  gxn(e) {
    return (
      (this.Zut = e),
      TimerSystem_1.TimerSystem.Next(this.Sct),
      this.TotalTitleSequencePlayer.StopCurrentSequence(!0, !0),
      this.TotalTitleSequencePlayer.PlayLevelSequenceByName("Start"),
      "Disabled" !==
        ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode() &&
        this.TotalTitleSequencePlayer.StopCurrentSequence(!0, !0),
      !1
    );
  }
  StartShow(e, t) {
    return (
      (this.IsShowingBehaviorTreeView = !0),
      this.UpdateSelfData(t),
      this.fxn(),
      this.gxn(e)
    );
  }
  EndShow(e, t) {
    return (
      (this.IsShowingBehaviorTreeView = !1),
      this.GetActive()
        ? ((this.Zut = e),
          2 === t
            ? this.QuestFinishSequencePlayer.PlayLevelSequenceByName("Start")
            : (this.TotalTitleSequencePlayer.StopCurrentSequence(!0, !0),
              this.TotalTitleSequencePlayer.PlayLevelSequenceByName("Close")),
          this.Gct(void 0),
          !1)
        : (this.Gct(void 0), !0)
    );
  }
  OnLogicTreeUpdateShow(e, t) {
    var i = this.$ut.TrackTextConfig,
      s = t.TrackTextConfig;
    return i.CheckTextEqual(s)
      ? (this.UpdateSelfData(t), this.JOn(), !0)
      : ((this.Zut = e),
        this.fct.ExecuteSequenceOnUpdate(e, t, () => {
          this.UpdateSelfData(t);
        }),
        !1);
  }
  OnRefresh(e, t) {
    this.$On &&
      (this.YOn > BattleUiDefine_1.REFRESH_POSITION_INTERVAL &&
        ((this.YOn -= BattleUiDefine_1.REFRESH_POSITION_INTERVAL), this.zOn(t)),
      (this.YOn += e));
  }
  zOn(e) {
    (e && e === this.Zut) ||
      (this.CheckVisible()
        ? (this.JOn(), this.SetUiActive(!0))
        : this.SetUiActive(!1));
  }
  CheckVisible() {
    var e;
    return !(
      !this.$ut ||
      !this.IsShowingBehaviorTreeView ||
      !(e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(
        this.$ut.BtType,
        this.$ut.TreeConfigId,
      )) ||
      (this.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest
        ? !e.CanShowInUiPanel() || this.$ut.CheckShowConfigEmpty()
        : ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
          !e.CanShowInUiPanel())
    );
  }
  Ict() {
    this.Zut &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.MissionPanelProcessEnd,
        this.Zut,
      ),
      (this.Zut = 0));
  }
}
exports.BehaviorTreeView = BehaviorTreeView;
//# sourceMappingURL=BehaviorTreeView.js.map
