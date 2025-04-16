"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MissionViewItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Queue_1 = require("../../../../../Core/Container/Queue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  InputSettings_1 = require("../../../../InputSettings/InputSettings"),
  InputSettingsManager_1 = require("../../../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  GeneralLogicTreeController_1 = require("../../../GeneralLogicTree/GeneralLogicTreeController"),
  GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil"),
  BattleUiDefine_1 = require("../../BattleUiDefine"),
  BattleChildView_1 = require("../BattleChildView/BattleChildView"),
  FishingEntrustNavigationItem_1 = require("./FishingEntrustNavigationItem"),
  MissionPanelStep_1 = require("./MissionPanelStep"),
  MissionViewStepTextUtil_1 = require("./MissionViewStepTextUtil");
class ShortcutKeyController {
  constructor() {
    (this.v9a = 0),
      (this.ShortcutTextComp = void 0),
      (this.vct = 0),
      (this.pct = !1),
      (this.bMe = (t, i) => {
        1 === i && this.OnShortcutKeyClick();
      }),
      (this.UpdateShortcutButton = () => {
        let i = void (this.vct = 0);
        switch (
          (0 === this.ShowData?.DataSource &&
            (i =
              ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
                this.ShowData.Id,
              )) &&
            (this.vct = i.GetCurrentNodeShortcutShow()),
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
              this.ShortcutTextComp.SetUIActive(!1);
            break;
          case 1: {
            let t = i.GetGiveUpText();
            if (
              ((t =
                t ||
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "GeneralLogicTreeGiveUp",
                )),
              Info_1.Info.IsInKeyBoard())
            ) {
              var e =
                InputSettingsManager_1.InputSettingsManager.GetActionBinding(
                  InputMappingsDefine_1.actionMappings.玩法放弃,
                );
              if (!e) {
                this.ShortcutTextComp.SetUIActive(!1);
                break;
              }
              e = e.GetPcKey();
              if (!e) {
                this.ShortcutTextComp.SetUIActive(!1),
                  Log_1.Log.CheckError() &&
                    Log_1.Log.Error("GeneralLogicTree", 18, "pcKey为空", [
                      "actionMapping",
                      InputMappingsDefine_1.actionMappings.玩法放弃,
                    ]);
                break;
              }
              e = `<texture=${e.GetKeyIconPath()}/>` + t;
              this.ShortcutTextComp.SetText(e);
            } else
              Info_1.Info.IsInGamepad()
                ? ((e =
                    this.Nct(
                      InputMappingsDefine_1.actionMappings.玩法放弃,
                      t,
                    ) ?? t),
                  this.ShortcutTextComp.SetText(e))
                : ((e =
                    `<texture=${ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("FightMissionStop")}/>` +
                    t),
                  this.ShortcutTextComp.SetText(e));
            this.ShortcutTextComp.SetAlpha(1),
              this.ShortcutTextComp.SetUIActive(!0),
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
            let t = i.GetGiveUpText();
            if (
              ((t =
                t ||
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "ChallengeAgain",
                )),
              Info_1.Info.IsInKeyBoard())
            ) {
              e = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
                InputMappingsDefine_1.actionMappings.重新挑战,
              );
              if (!e) {
                this.ShortcutTextComp.SetUIActive(!1);
                break;
              }
              e = e.GetPcKey();
              if (!e) {
                this.ShortcutTextComp.SetUIActive(!1),
                  Log_1.Log.CheckError() &&
                    Log_1.Log.Error("GeneralLogicTree", 18, "pcKey为空", [
                      "actionMapping",
                      InputMappingsDefine_1.actionMappings.重新挑战,
                    ]);
                break;
              }
              e = `<texture=${e.GetKeyIconPath()}/>` + t;
              this.ShortcutTextComp.SetText(e);
            } else
              Info_1.Info.IsInGamepad()
                ? ((e =
                    this.Nct(
                      InputMappingsDefine_1.actionMappings.重新挑战,
                      t,
                    ) ?? t),
                  this.ShortcutTextComp.SetText(e))
                : ((e =
                    ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                      "ChallengeAgain_mobile",
                    ) ?? t),
                  this.ShortcutTextComp.SetText(e));
            this.ShortcutTextComp.SetAlpha(1),
              this.ShortcutTextComp.SetUIActive(!0);
            break;
          }
          case 2: {
            e = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
              InputMappingsDefine_1.actionMappings.任务追踪,
            );
            if (!e) {
              this.ShortcutTextComp.SetUIActive(!1),
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "GeneralLogicTree",
                    18,
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
            var s = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              "QuestCommunicateCallback",
            );
            let t = s;
            if (Info_1.Info.IsInKeyBoard()) {
              e = e.GetPcKey();
              if (!e) {
                this.ShortcutTextComp.SetUIActive(!1),
                  Log_1.Log.CheckError() &&
                    Log_1.Log.Error("GeneralLogicTree", 18, "pcKey为空", [
                      "actionMapping",
                      InputMappingsDefine_1.actionMappings.任务追踪,
                    ]);
                break;
              }
              e = e.GetKeyIconPath();
              t = `<texture=${e}/>` + s;
            } else
              Info_1.Info.IsInGamepad() &&
                (t =
                  this.Nct(InputMappingsDefine_1.actionMappings.任务追踪, s) ??
                  s);
            this.ShortcutTextComp.SetText(t),
              this.ShortcutTextComp.SetAlpha(1),
              this.ShortcutTextComp.SetUIActive(!0);
            break;
          }
        }
      });
  }
  get ShowData() {
    return ModelManager_1.ModelManager.BattleUiModel.MissionViewData?.get(
      this.v9a,
    );
  }
  Init(t, i) {
    (this.v9a = t), (this.ShortcutTextComp = i);
  }
  Dispose() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      InputMappingsDefine_1.actionMappings.玩法放弃,
      this.bMe,
    ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.任务追踪,
        this.bMe,
      );
  }
  Nct(e, s) {
    var t =
      InputSettingsManager_1.InputSettingsManager.GetCombinationActionBindingByActionName(
        e,
      );
    if (t) {
      var n = new Map();
      if ((t.GetCurrentPlatformKeyNameMap(n), n)) {
        let t = e,
          i = e;
        for (var [h, r] of n) {
          (h = InputSettings_1.InputSettings.GetKey(h)),
            (r = InputSettings_1.InputSettings.GetKey(r));
          h && (t = h.GetKeyIconPath()), r && (i = r.GetKeyIconPath());
          break;
        }
        return `<texture=${t}/>+<texture=${i}/>` + s;
      }
    }
  }
  OnShortcutKeyClick() {
    if (this.ShowData && 0 === this.ShowData.DataSource && !this.pct) {
      this.pct = !0;
      const i =
        ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
          this.ShowData.Id,
        );
      if (i)
        switch (this.vct) {
          case 1:
            var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(114);
            t.SetCloseFunction(() => {
              i.ContainTag(7) &&
                EventSystem_1.EventSystem.EmitWithTarget(
                  i.GetBlackBoard(),
                  EventDefine_1.EEventName
                    .GeneralLogicTreeRollbackWaitingUpdate,
                );
            }),
              t.FunctionMap.set(1, () => {
                this.pct = !1;
              }),
              t.FunctionMap.set(2, () => {
                !this.ShowData || i.ContainTag(7)
                  ? (this.pct = !1)
                  : GeneralLogicTreeController_1.GeneralLogicTreeController.RequestGiveUp(
                      this.ShowData.Id,
                      () => {
                        this.pct = !1;
                      },
                    );
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                t,
              );
            break;
          case 2:
            t = i.GetBlackBoard().GetCurrentCommunicateId();
            void 0 !== t &&
              (EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.CommunicateAgain,
                t,
              ),
              this.UpdateShortcutButton(),
              (this.pct = !1));
            break;
          case 3:
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ChallengeAgain,
              InputMappingsDefine_1.actionMappings.重新挑战,
            ),
              this.UpdateShortcutButton(),
              (this.pct = !1);
        }
    }
  }
}
class MissionViewItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.OU_ = new ShortcutKeyController()),
      (this.mct = void 0),
      (this.dct = void 0),
      (this.Cct = void 0),
      (this.TotalTitleSequencePlayer = void 0),
      (this.QuestFinishSequencePlayer = void 0),
      (this.fct = void 0),
      (this.GU_ =
        new FishingEntrustNavigationItem_1.FishingEntrustNavigationItem()),
      (this.Zut = 0),
      (this.YOn = 0),
      (this.ViewType = 0),
      (this.$On = !1),
      (this.Idc = !1),
      (this.JF_ = void 0),
      (this.ZF_ = void 0),
      (this.eN_ = void 0),
      (this.tN_ = void 0),
      (this.EM1 = new Queue_1.Queue()),
      (this.Bct = () => {
        0 === this.ShowData?.DataSource &&
          this.ShowData.BtType ===
            Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
            this.ShowData.BtType,
            this.ShowData.Id,
          );
      }),
      (this.wct = () => {
        this.OU_.OnShortcutKeyClick();
      }),
      (this.Uct = (t) => {
        6 === t.Type &&
          t.TreeIncId === this.ShowDataId &&
          this.OU_.UpdateShortcutButton();
      }),
      (this.wQt = (t, i) => {
        6 === t.Type && t.TreeIncId === this.ShowDataId && this.zOn(0);
      }),
      (this.FU_ = (t) => {
        8 === t && this.OU_.UpdateShortcutButton();
      }),
      (this.pqn = (t) => {
        this.ShowDataId !== t ||
          this.GetText(8).IsUIActiveSelf() ||
          this.GetSprite(0)?.SetUIActive(!1);
      }),
      (this.vqn = (t) => {
        this.ShowDataId !== t || this.GetText(8).IsUIActiveSelf() || this.Ost();
      }),
      (this.dxn = (t) => {
        switch (t) {
          case "Start":
            this.JF_?.IsPending() && this.JF_.SetResult(!0);
            break;
          case "Close":
            this.ZF_?.IsPending() && this.ZF_.SetResult(!0);
        }
      }),
      (this.Lct = (t) => {
        switch (t) {
          case "Start":
            this.eN_?.IsPending() && this.eN_.SetResult(!0);
            break;
          case "Close":
            this.tN_?.IsPending() && this.tN_.SetResult(!0);
        }
      }),
      (this.ZOn = (t) => {
        this.WU_(t), this.Ost(), this.OU_.UpdateShortcutButton();
      }),
      (this.fxn = () => {
        var t = this.GetText(8),
          i = this.GetItem(9),
          e = this.sec();
        return (
          t.SetText(e),
          StringUtils_1.StringUtils.IsBlank(e)
            ? (t.SetUIActive(!1), i?.SetUIActive(!1), !1)
            : (t.SetUIActive(!0), i?.SetUIActive(!0), !0)
        );
      }),
      (this.Ect = () => {
        var t;
        0 === this.ShowData?.DataSource &&
          this.ShowData.BtType ===
            Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest &&
          ((t = ModelManager_1.ModelManager.QuestNewModel.GetQuest(
            this.ShowData.TreeConfigId,
          )),
          this.GetText(6).SetText(t?.Name ?? ""));
      }),
      (this.Sct = () => {
        var t, i;
        this.ShowData &&
          (t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMarkConfig(
            this.ShowData.TrackIconConfigId,
          )) &&
          (i = this.GetUiNiagara(7)) &&
          (i.SetColor(UE.Color.FromHex(t.TrackTextStartEffectColor)),
          i.ActivateSystem(!0));
      }),
      (this.Rct = (t) => {
        t === this.ShowData?.Id && this.zOn(0);
      });
  }
  get ShowDataId() {
    return this.ShowData?.Id;
  }
  get ShowData() {
    return ModelManager_1.ModelManager.BattleUiModel.MissionViewData?.get(
      this.ViewType,
    );
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
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.wct]]);
  }
  async OnBeforeStartAsync() {
    (this.ViewType = this.OpenParam),
      this.VU_(),
      this.jU_(),
      await this.HU_(),
      await this.$U_();
  }
  jU_() {
    this.OU_.Init(this.ViewType, this.GetText(2));
  }
  VU_() {
    this.GetText(2).SetAlpha(1),
      this.GetItem(1).SetUIActive(!1),
      (this.mct = this.GetItem(5)),
      this.mct.SetUIActive(!0),
      (this.dct = this.GetItem(4)),
      this.dct.SetUIActive(!1),
      (this.Cct = this.RootItem.GetOwner().GetComponentByClass(
        UE.UIButtonComponent.StaticClass(),
      )),
      this.GetUiNiagara(7).SetNiagaraUIActive(!0, !1);
  }
  async HU_() {
    var t = this.GetItem(1);
    (this.fct = new MissionPanelStep_1.MissionPanelStep(this.ViewType, -1)),
      await this.fct.CreateThenShowByActorAsync(t.GetOwner(), 0);
  }
  async $U_() {
    await this.GU_.CreateByResourceIdAsync(
      "UiItem_MissionNavigation",
      this.GetItem(9),
    ),
      await this.GU_.HideAsync();
  }
  OnStart() {
    this.GetText(6).OnSelfLanguageChange.Bind(this.Ect),
      this.GetText(8).OnSelfLanguageChange.Bind(this.fxn),
      (this.TotalTitleSequencePlayer =
        new LevelSequencePlayer_1.LevelSequencePlayer(this.mct)),
      this.TotalTitleSequencePlayer.BindSequenceCloseEvent(this.dxn),
      (this.QuestFinishSequencePlayer =
        new LevelSequencePlayer_1.LevelSequencePlayer(this.dct)),
      this.QuestFinishSequencePlayer.BindSequenceCloseEvent(this.Lct);
  }
  OnBeforeDestroy() {
    this.OU_.Dispose(),
      this.fct?.Destroy(),
      this.GU_.Destroy(),
      this.RootActor?.OnSequencePlayEvent.Unbind(),
      this.TotalTitleSequencePlayer?.Clear(),
      (this.TotalTitleSequencePlayer = void 0);
  }
  OnPanelShow() {
    (this.$On = !0),
      this.Ore(),
      this.QuestFinishSequencePlayer.ResumeSequence(),
      this.TotalTitleSequencePlayer.ResumeSequence(),
      this.EM1.Push(0),
      this.OU_.UpdateShortcutButton(),
      this.fxn();
  }
  OnPanelHide() {
    (this.$On = !1),
      this.kre(),
      this.QuestFinishSequencePlayer.PauseSequence(),
      this.TotalTitleSequencePlayer.PauseSequence(),
      this.EM1.Push(1);
  }
  IM1() {
    if (!this.EM1.Empty)
      switch (this.EM1.Pop()) {
        case 0:
          this.Idc && this.fct?.Show();
          break;
        case 1:
          (this.Idc = this.fct.IsShowOrShowing), this.fct.Hide();
      }
  }
  Ore() {
    this.Cct?.OnClickCallBack.Bind(this.Bct),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
        this.Uct,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
        this.wQt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.Uct,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeAddTag,
        this.FU_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeRemoveTag,
        this.FU_,
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
          this.OU_.UpdateShortcutButton,
        );
  }
  kre() {
    this.Cct?.OnClickCallBack.Unbind(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeChildQuestNodeStatusChange,
        this.Uct,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeNodeProgressChange,
        this.wQt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.Uct,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeAddTag,
        this.FU_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeRemoveTag,
        this.FU_,
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
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerChange,
        this.OU_.UpdateShortcutButton,
      );
  }
  WU_(t) {
    ModelManager_1.ModelManager.BattleUiModel.MissionViewData.set(
      this.ViewType,
      t,
    );
  }
  Ost() {
    var t, i;
    this.ShowData &&
      (t = this.ShowData.TrackIconConfigId) &&
      ((i = this.GetSprite(0)),
      MissionViewStepTextUtil_1.MissionViewStepTextUtil.CheckShowConfigEmpty(
        this.ShowData,
      )
        ? i.SetUIActive(!1)
        : (i.SetUIActive(!0),
          this.SetSpriteByPath(
            ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMark(t),
            i,
            !1,
          )));
  }
  async StartShow(t, i, e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "BattleUiSet",
        18,
        "MissionPanel:MissionViewItem.StartShow流程开始",
        ["showDataId", i.Id],
      ),
      ModelManager_1.ModelManager.BattleUiModel.IsShowingMissionViewItems?.get(
        this.ViewType,
      ) && (await this.fct?.OnReset()),
      ModelManager_1.ModelManager.BattleUiModel.IsShowingMissionViewItems?.set(
        this.ViewType,
        !0,
      ),
      (this.Zut = t),
      this.ZOn(i);
    let s = e;
    this.CheckVisible() || (s = !0);
    var t = this.fxn(),
      e = i.DataSource;
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "BattleUiSet",
          18,
          "MissionPanel:MissionViewItem.StartShow数据更新完毕",
          ["是否在totalSequence之后播步骤开始动画", t],
          ["DataSource", e],
        ),
      1 === e ? await this.GU_.ShowAsync() : await this.GU_.HideAsync(),
      s || TimerSystem_1.TimerSystem.Next(this.Sct),
      await this.ShowAsync(),
      this.mct?.SetUIActive(!0),
      this.TotalTitleSequencePlayer.PlayLevelSequenceByName("Start"),
      t
        ? (await this.fct.HideAsync(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "BattleUiSet",
              18,
              "MissionPanel:MissionViewItem.StartShow TotalSequence播放开始",
            ),
          (this.JF_ = new CustomPromise_1.CustomPromise()),
          s && this.TotalTitleSequencePlayer.EndSequenceLastFrame("Start"),
          await this.JF_.Promise,
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "BattleUiSet",
              18,
              "MissionPanel:MissionViewItem.StartShow TotalSequence播放结束",
            ),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "BattleUiSet",
              18,
              "MissionPanel:MissionViewItem.StartShow StepSequence播放开始",
            ),
          await this.fct.StartShow(i, s),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "BattleUiSet",
              18,
              "MissionPanel:MissionViewItem.StartShow StepSequence播放结束",
            ))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "BattleUiSet",
              18,
              "MissionPanel:MissionViewItem.StartShow TotalSequence以及StepSequence播放开始",
            ),
          (e = []),
          (this.JF_ = new CustomPromise_1.CustomPromise()),
          s && this.TotalTitleSequencePlayer.EndSequenceLastFrame("Start"),
          e.push(this.JF_.Promise),
          e.push(this.fct.StartShow(i, s)),
          await Promise.all(e),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "BattleUiSet",
              18,
              "MissionPanel:MissionViewItem.StartShow TotalSequence以及StepSequence播放结束",
            )),
      (this.Zut = 0),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "BattleUiSet",
          18,
          "MissionPanel:MissionViewItem.StartShow流程结束",
          ["showDataId", i.Id],
        ),
      !0
    );
  }
  async OnLogicTreeUpdateShow(t, i, e) {
    return (
      (this.Zut = t),
      await this.fct.ExecuteSequenceOnUpdate(i, this.ZOn, e),
      !(this.Zut = 0)
    );
  }
  async EndShow(t, i, e) {
    return (
      ModelManager_1.ModelManager.BattleUiModel.IsShowingMissionViewItems?.set(
        this.ViewType,
        !1,
      ),
      this.IsShowOrShowing
        ? ((this.Zut = t),
          2 === e
            ? (this.Ect(),
              this.mct.SetUIActive(!1),
              this.dct.SetUIActive(!0),
              this.QuestFinishSequencePlayer.PlayLevelSequenceByName("Start"),
              (this.eN_ = new CustomPromise_1.CustomPromise()),
              i && this.QuestFinishSequencePlayer.EndSequenceLastFrame("Start"),
              await this.eN_.Promise,
              this.QuestFinishSequencePlayer.PlayLevelSequenceByName("Close"),
              (this.tN_ = new CustomPromise_1.CustomPromise()),
              i && this.QuestFinishSequencePlayer.EndSequenceLastFrame("Close"),
              await this.tN_.Promise,
              this.mct.SetUIActive(!0),
              this.dct.SetUIActive(!1))
            : (this.TotalTitleSequencePlayer.PlayLevelSequenceByName("Close"),
              (this.ZF_ = new CustomPromise_1.CustomPromise()),
              i && this.TotalTitleSequencePlayer.EndSequenceLastFrame("Close"),
              await this.ZF_.Promise,
              await this.fct.OnReset(),
              await this.HideAsync()),
          (this.Zut = 0),
          this.WU_(void 0))
        : this.WU_(void 0),
      !0
    );
  }
  async ChildStepConditionIndexChange(t, i) {
    return this.fct.ChildStepConditionIndexChange(t, i);
  }
  sec() {
    return this.ShowData && this.ShowData.TitleTextKey
      ? PublicUtil_1.PublicUtil.GetConfigTextByKey(this.ShowData.TitleTextKey)
      : "";
  }
  OnRefresh(t, i) {
    this.IM1(),
      this.$On &&
        (this.fct.OnTick(t),
        this.YOn > BattleUiDefine_1.REFRESH_POSITION_INTERVAL &&
          ((this.YOn -= BattleUiDefine_1.REFRESH_POSITION_INTERVAL),
          this.zOn(i)),
        (this.YOn += t));
  }
  zOn(t) {
    (t && t === this.Zut) ||
      (this.CheckVisible()
        ? (this.fct.Update(), this.mct?.SetUIActive(!0))
        : this.mct?.SetUIActive(!1));
  }
  CheckVisible() {
    if (!ModelManager_1.ModelManager.BattleUiModel.IsMissionPanelVisible)
      return !1;
    if (
      !this.ShowData ||
      !ModelManager_1.ModelManager.BattleUiModel.IsShowingMissionViewItems?.get(
        this.ViewType,
      )
    )
      return !1;
    switch (this.ShowData.DataSource) {
      case 0:
        if (
          this.ShowData.BtType !==
            Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest ||
          !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
        ) {
          var t =
            GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetLogicTreeContainer(
              this.ShowData.BtType,
              this.ShowData.TreeConfigId,
            );
          if (t && t.CanShowTrackExpression()) break;
        }
        return !1;
    }
    return !MissionViewStepTextUtil_1.MissionViewStepTextUtil.CheckShowConfigEmpty(
      this.ShowData,
    );
  }
}
exports.MissionViewItem = MissionViewItem;
//# sourceMappingURL=MissionViewItem.js.map
