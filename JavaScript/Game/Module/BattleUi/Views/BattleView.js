"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  DangoWorldMainPanel_1 = require("../../Dango/DangoAbyss/View/DangoWorldMainPanel"),
  BattleLinkEnergyButton_1 = require("./BattleChildView/BattleLinkEnergyButton"),
  BottomPanel_1 = require("./BattleChildViewPanel/BottomPanel"),
  CenterPanel_1 = require("./BattleChildViewPanel/CenterPanel"),
  ChatPanel_1 = require("./BattleChildViewPanel/ChatPanel"),
  FormationPanel_1 = require("./BattleChildViewPanel/FormationPanel"),
  GamepadSkillButtonPanel_1 = require("./BattleChildViewPanel/GamepadSkillButtonPanel"),
  MissionPanel_1 = require("./BattleChildViewPanel/MissionPanel"),
  PositionPanel_1 = require("./BattleChildViewPanel/PositionPanel"),
  ScorePanel_1 = require("./BattleChildViewPanel/ScorePanel"),
  SkillButtonPanel_1 = require("./BattleChildViewPanel/SkillButtonPanel"),
  TopPanel_1 = require("./BattleChildViewPanel/TopPanel"),
  BossStatePanel_1 = require("./BossState/BossStatePanel"),
  FullScreenPanel_1 = require("./FullScreenPanel"),
  BattleHeadStatePanel_1 = require("./HeadState/BattleHeadStatePanel"),
  PartStatePanel_1 = require("./PartStatePanel"),
  CHECK_DESTROY_TIME = 5e3,
  battleUiChildren = [0, 14, 15, 16, 17, 18, 19, 20, 27];
class BattleView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Fot = void 0),
      (this.Vot = void 0),
      (this.sza = void 0),
      (this.aza = void 0),
      (this.Hot = void 0),
      (this.jot = void 0),
      (this.cf1 = void 0),
      (this.hza = !1),
      (this.Wot = !1),
      (this.Kot = new Map()),
      (this.Qot = []),
      (this.Xot = new UE.Vector()),
      (this.Yot = 0),
      (this.Jot = !1),
      (this.EEl = !1),
      (this.F6c = void 0),
      (this.zot = void 0),
      (this.Zot = () => {
        this.Fot.RefreshCurrentRole();
      }),
      (this.ert = () => {
        var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
        e?.RoleConfig && this.trt(2 === e.RoleConfig.RoleType);
      }),
      (this.IEl = () => {
        ControllerHolder_1.ControllerHolder.BattleUiControl.TryClosePureMode();
      }),
      (this.fHe = () => {
        this.Fot.RefreshCurrentRole();
      }),
      (this.irt = () => {
        this.IsShow && this.SetActive(!0);
      }),
      (this.Jpe = (e, t, i) => {
        t?.Valid &&
          (this.Fot.OnCreateEntity(t.Entity),
          this.Vot.OnCreateEntity(t.Entity));
      }),
      (this.zpe = (e, t) => {
        t?.Valid &&
          (this.Fot.OnRemoveEntity(t.Entity),
          this.Vot.DestroyPartStateFromRole(t.Entity));
      }),
      (this.FJe = (e) => {
        var t = this.ort(6).GetRootItem(),
          i = this.ort(7).GetRootItem(),
          s = t.GetHierarchyIndex(),
          i = i.GetHierarchyIndex();
        (e && i <= s) ||
          (void 0 !== (s = e ? i : this.Yot) && t.SetHierarchyIndex(s),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "BattleUiSet",
              37,
              "轮盘界面显隐，调整摇杆面板层级",
              ["bVisible", e],
              ["panelUiIndex", s],
            ));
      }),
      (this.Yoh = () => {
        for (const e of this.Kot.values())
          void 0 !== e && e.OnSeamlessTravelFinish();
      }),
      (this.rrt = (e) => {
        AudioSystem_1.AudioSystem.PostEvent(e);
      }),
      (this.KHa = (e) => {
        this.RootItem?.SetAlpha(e);
      }),
      (this.TEl = () => {
        this.LEl();
      }),
      (this.fIl = (e, t) => {
        0 === t &&
          (this.EEl
            ? ControllerHolder_1.ControllerHolder.BattleUiControl.TryClosePureMode()
            : ControllerHolder_1.ControllerHolder.BattleUiControl.TryOpenPureMode());
      }),
      (this.XBo = () => {
        Info_1.Info.IsInGamepad()
          ? (this.Wot ||
              this.lza().then(() => {
                this.IsDestroyOrDestroying ||
                  (this.Hot.ShowBattleChildViewPanel(),
                  this.Hot.RefreshOnDelayShow(),
                  this.jot.ShowBattleChildViewPanel());
              }),
            this.F6c &&
              this.Hot.AddChildToRoleHeadPanel(this.F6c.GetRootItem()))
          : Info_1.Info.IsInKeyBoard() &&
            (this.hza ||
              this._za().then(() => {
                this.IsDestroyOrDestroying ||
                  (this.sza.ShowBattleChildViewPanel(),
                  this.sza.RefreshOnDelayShow(),
                  this.aza.ShowBattleChildViewPanel());
              }),
            this.F6c) &&
            this.sza.AddChildToRoleHeadPanel(this.F6c.GetRootItem());
      }),
      (this.ttt = (e) => {
        for (var [t, i] of this.Kot)
          5 !== t &&
            (e
              ? i.GetVisible() && i.GetRootItem().SetUIActive(!0)
              : i.GetRootItem().SetUIActive(!1));
      }),
      (this.HJe = (e) => {
        for (var [t, i] of this.Kot)
          6 !== t &&
            (e
              ? i.GetVisible() && i.GetRootItem().SetUIActive(!0)
              : i.GetRootItem().SetUIActive(!1));
      }),
      (this._F_ = (e) => {
        this.GetItem(1)?.SetUIActive(e),
          (ModelManager_1.ModelManager.BattleUiModel.IsMissionPanelVisible = e);
      }),
      (this.Tla = () => {
        var e = this.Kot.get(6);
        return (e = e && e.GetExecutionItem()) ? [e, e] : void 0;
      }),
      (this.Lla = (e) => {
        var t = this.Kot.get(3);
        if (t)
          return t.GetBattleSkillItemByButtonType(Number(e[1]))?.GetGuideItem();
      }),
      (this.Dla = (t) => {
        var i = this.Kot.get(Number(t[0]))
          ?.GetUiActorForGuide()
          ?.GetComponentByClass(UE.GuideHookRegistry.StaticClass());
        if (i) {
          var s = t[2],
            n = i.GuideHookComponents.Get(s),
            n =
              (n ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Guide",
                    16,
                    "战斗界面挂接组件(GuideHookRegistry)不存在该挂接点名称，请检查聚焦引导配置或挂接组件",
                  )),
              n.GetUIItem());
          let e = t[1];
          StringUtils_1.StringUtils.IsEmpty(e) && (e = s);
          (t = i.GuideHookComponents.Get(e)),
            (s =
              (t ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Guide",
                    16,
                    "战斗界面挂接组件(GuideHookRegistry)不存在该挂接点（展示用）名称，请检查聚焦引导配置或挂接组件",
                  )),
              t.GetUIItem()));
          return [n, s];
        }
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Guide",
            16,
            "战斗界面挂接组件(GuideHookRegistry)缺失",
          );
      }),
      (this.Ala = () => {
        var e,
          t = this.ort(2);
        if (t)
          for (const i of t.GetFormationItemList())
            if (!i.IsMyRole) return (e = i.GetRootItem()) ? [e, e] : void 0;
      }),
      (this.MF_ = (e) => {
        return this.ort(5)?.GetGuideUiItemAndUiItemForShowEx(e);
      }),
      (this.NE1 = (e) => this.cf1?.GetGuideUiItemAndUiItemForShowEx(e)),
      (this.HT1 = (e) => {
        var t = this.F6c?.GetRootItem();
        return t ? [t, t] : void 0;
      }),
      (this.Ula = new Map([
        ["Execution", this.Tla],
        ["Skill", this.Lla],
        ["Default", this.Dla],
        ["Teammate", this.Ala],
        ["FishingViewBtn", this.MF_],
        ["DangoViewBtn", this.NE1],
        ["LinkBtn", this.HT1],
      ])),
      (this.cah = (e, t, i, s) => {
        var n = Info_1.Info.IsInGamepad() ? this.Hot : this.sza;
        void 0 !== n && n.RefreshFormationCooldownExternal(e, t, i, s);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIButtonComponent],
    ]),
      Info_1.Info.IsInTouch() ||
        (this.ComponentRegisterInfos.push([12, UE.UIItem]),
        this.ComponentRegisterInfos.push([13, UE.UIItem])),
      (this.BtnBindInfo = [[16, this.IEl]]);
  }
  async OnBeforeStartAsync() {
    await Promise.all([
      this.uza(),
      this.art(),
      this.hrt(0, BossStatePanel_1.BossStatePanel, !0, 13),
      this.hrt(5, TopPanel_1.TopPanel, !0, 25),
      this.hrt(4, BottomPanel_1.BottomPanel, !0, 11),
      this.hrt(1, MissionPanel_1.MissionPanel, !0, 5),
      this.hrt(6, CenterPanel_1.CenterPanel, !0, 25),
      this.hrt(7, ChatPanel_1.ChatPanel, !1, 6),
      this.hrt(8, FullScreenPanel_1.FullScreenPanel, !0, 23),
      this.hrt(9, PositionPanel_1.PositionPanel, !0, 25),
      this.hrt(11, ScorePanel_1.ScorePanel, !0, 24),
      this.O2c(),
      this.lrt(),
    ]),
      this._rt(),
      this.N6c(),
      this.Ore(),
      this.UiViewSequence.AddSequenceStartEvent("ShowView", this.irt),
      ModelManager_1.ModelManager.BattleUiModel.UpdateViewPortSize(),
      this.urt(),
      this.LEl();
  }
  async O2c() {
    var e,
      t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    1 ===
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(t)
        ?.WorldDungeonSubType &&
      ((t = this.GetItem(14)),
      (this.cf1 = new DangoWorldMainPanel_1.DangoWorldMainPanel()),
      (e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "UiView_CelebrationPark",
      )),
      await this.cf1.CreateByPathAsync(e, t),
      this.Qot.push(this.cf1));
  }
  uf1() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    1 ===
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
        ?.WorldDungeonSubType &&
      (this.GetItem(4)?.SetUIActive(!1),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(
        9,
        5,
        !1,
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(
        9,
        7,
        !1,
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(
        9,
        8,
        !1,
      ));
  }
  async uza() {
    Info_1.Info.IsInGamepad()
      ? (this.GetItem(2)?.SetUIActive(!1), this.GetItem(3)?.SetUIActive(!1))
      : this.hza || (await this._za());
  }
  async _za() {
    (this.hza = !0),
      (this.sza = await this.hrt(2, FormationPanel_1.FormationPanel, !0, 7)),
      (this.aza = await this.hrt(
        3,
        SkillButtonPanel_1.SkillButtonPanel,
        !0,
        9,
      ));
  }
  async art() {
    Info_1.Info.IsInGamepad()
      ? this.Wot || (await this.lza())
      : (this.GetItem(12)?.SetUIActive(!1), this.GetItem(13)?.SetUIActive(!1));
  }
  async lza() {
    ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData?.RefreshButtonData(),
      (this.Wot = !0),
      (this.Hot = await this.hrt(12, FormationPanel_1.FormationPanel, !0, 8)),
      this.Hot.SetIsGamepad(),
      (this.jot = await this.hrt(
        13,
        GamepadSkillButtonPanel_1.GamepadSkillButtonPanel,
        !0,
        10,
      )),
      this.EEl && (this.Hot.RefreshPureMode(!0), this.jot.RefreshPureMode(!0));
  }
  OnTick(e) {
    BattleView.vJe.Start();
    for (const t of this.Qot) t.GetVisible() && t.OnTickBattleChildViewPanel(e);
    this.Fot.Tick(e),
      this.Vot.Tick(e),
      this.F6c?.Tick(e),
      BattleView.vJe.Stop();
  }
  OnAfterTick(e) {
    for (const t of this.Qot)
      t.GetVisible() && t.OnAfterTickBattleChildViewPanel(e);
  }
  OnBeforeShow() {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "[battleView]OnBeforeShow"),
      this.IsDestroyOrDestroying)
    )
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          17,
          "[battleView]OnBeforeShow Cancel Because Destroy",
        );
    else {
      this.REl(), this.crt();
      for (const e of this.Kot.values())
        this.Rm1(e)
          ? e.ShowBattleChildViewPanel()
          : e.HideBattleChildViewPanel();
      this.uf1();
    }
  }
  OnAfterShow() {
    var e;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "[battleView]OnAfterShow"),
      this.IsDestroyOrDestroying
        ? Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            17,
            "[battleView]OnAfterShow Cancel Because Destroy",
          )
        : (this.UEl(),
          ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
            0,
            battleUiChildren,
            !0,
          ),
          (e =
            ModelManager_1.ModelManager
              .BattleUiModel).TryBroadcastCacheRoleLevelUpData(),
          e.TryBroadcastCacheRevive(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.BattleViewActiveSequenceFinish,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ActiveBattleView,
          ),
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotStart));
  }
  OnBeforeHide() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "[battleView]OnBeforeHide"),
      this.DEl(),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
        0,
        battleUiChildren,
        !1,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.DisActiveBattleView,
      );
  }
  OnAfterHide() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "[battleView]OnAfterHide");
    for (const e of this.Kot.values()) e.HideBattleChildViewPanel();
  }
  OnBeforeDestroy() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "[battleView]OnBeforeDestroy"),
      this.kre(),
      this.mrt(),
      this.drt(),
      this.Crt(),
      this.ResetFormationCooldownExternal(),
      this.V6c(),
      (this.Xot = void 0),
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        (this.zot = TimerSystem_1.TimerSystem.Forever(() => {
          ModelManager_1.ModelManager.GameModeModel.WorldDone &&
            (TimerSystem_1.TimerSystem.Remove(this.zot),
            (this.zot = void 0),
            Log_1.Log.CheckError()) &&
            Log_1.Log.Error(
              "Battle",
              17,
              "[battleView]主界面销毁超时，请将本次日志提交给测试",
            );
        }, CHECK_DESTROY_TIME));
  }
  OnAfterDestroy() {
    this.zot &&
      (TimerSystem_1.TimerSystem.Remove(this.zot), (this.zot = void 0)),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "[battleView]OnAfterDestroy");
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeRole,
      this.fHe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.Zot,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
        this.ert,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddEntity,
        this.Jpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GmOnlyShowMiniMap,
        this.ttt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GmOnlyShowJoyStick,
        this.HJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GmHideMissionAndBossName,
        this._F_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
        this.FJe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView,
        this.cah,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SeamlessTravelFinishBeforeShowUI,
        this.Yoh,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiPlayAudio,
        this.rrt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiAlphaChanged,
        this.KHa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiPureModeChanged,
        this.TEl,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.退出精简模式,
        this.fIl,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.退出精简模式PC触摸板,
        this.fIl,
      ),
      Info_1.Info.IsInTouch() ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.InputControllerChange,
          this.XBo,
        );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeRole,
      this.fHe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.Zot,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
        this.ert,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddEntity,
        this.Jpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GmOnlyShowMiniMap,
        this.ttt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GmOnlyShowJoyStick,
        this.HJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GmHideMissionAndBossName,
        this._F_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRouletteViewVisibleChanged,
        this.FJe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView,
        this.cah,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SeamlessTravelFinishBeforeShowUI,
        this.Yoh,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiPlayAudio,
        this.rrt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiAlphaChanged,
        this.KHa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiPureModeChanged,
        this.TEl,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.退出精简模式,
        this.fIl,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.退出精简模式PC触摸板,
        this.fIl,
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
  trt(e) {
    this.Jot !== e &&
      ((this.Jot = e), this.IsShow) &&
      !this.EEl &&
      this.UiViewSequence?.PlaySequencePurely("Switch");
  }
  async lrt() {
    (this.Fot = new BattleHeadStatePanel_1.BattleHeadStatePanel()),
      await this.Fot.Preload(),
      this.Fot.Init();
  }
  drt() {
    this.Fot && (this.Fot.ResetAllHeadStates(), (this.Fot = void 0));
  }
  _rt() {
    (this.Vot = new PartStatePanel_1.PartStatePanel()),
      this.Vot.InitializePartStatePanel();
  }
  Crt() {
    this.Vot && (this.Vot.ResetPartStatePanel(), (this.Vot = void 0));
  }
  N6c() {
    this.F6c ||
      (ModelManager_1.ModelManager.BattleLinkModel?.CheckInNewBattleLink() &&
        ((this.F6c = new BattleLinkEnergyButton_1.BattleLinkEnergyButton()),
        this.F6c.CreateByResourceIdAsync("UiItem_RogueScoreE").then(() => {
          this.sza?.AddChildToRoleHeadPanel(this.F6c.GetRootItem());
        })));
  }
  V6c() {
    this.F6c && (this.F6c.Destroy(), (this.F6c = void 0));
  }
  ShowLinkButton(e) {
    e
      ? this.F6c
        ? (this.sza?.AddChildToRoleHeadPanel(this.F6c.GetRootItem()),
          this.F6c?.SetUiActive(!0))
        : ((this.F6c = new BattleLinkEnergyButton_1.BattleLinkEnergyButton()),
          this.F6c.CreateThenShowByResourceIdAsync("UiItem_RogueScoreE").then(
            () => {
              this.sza?.AddChildToRoleHeadPanel(this.F6c.GetRootItem()),
                this.F6c?.SetUiActive(!0);
            },
          ))
      : (this.F6c?.GetRootItem().DetachFromParent(), this.F6c?.SetUiActive(!1));
  }
  async hrt(e, t, i = !1, s = 0) {
    var n = this.GetItem(e),
      t = new t();
    return (
      await t.CreateThenShowByActorAsync(n.GetOwner(), s),
      this.Kot.set(e, t),
      i && this.Qot.push(t),
      t
    );
  }
  ort(e) {
    return this.Kot.get(e);
  }
  urt() {
    var e = this.ort(6).GetRootItem();
    this.Yot = e.GetHierarchyIndex();
  }
  LEl() {
    (this.EEl =
      ModelManager_1.ModelManager.BattleUiModel.PureModeData?.IsOpen ?? !1),
      this.GetItem(15)?.SetUIActive(this.EEl);
    for (const e of this.Kot.values()) e?.RefreshPureMode(this.EEl);
    this.EEl || this.GetItem(14)?.SetUIActive(!0);
  }
  REl() {
    this.EEl && this.GetItem(14)?.SetUIActive(!1);
  }
  UEl() {
    if (this.EEl) {
      this.GetItem(14)?.SetUIActive(!0);
      for (const e of this.Kot.values()) e?.RefreshPureMode(this.EEl);
    }
  }
  DEl() {
    this.EEl && this.GetItem(14)?.SetUIActive(!1);
  }
  mrt() {
    for (const e of this.Kot.values()) void 0 !== e && e.Reset();
    this.Kot.clear(), (this.Qot.length = 0);
  }
  crt() {
    if (Info_1.Info.IsInTouch()) {
      var e = ModelManager_1.ModelManager.BattleUiSetModel.GetPanelDataMap();
      if (e)
        for (var [t, i] of e) {
          var s = this.ort(t);
          if (s) {
            var n,
              a,
              h,
              r,
              i = i.GetPanelItemDataMap();
            if (i)
              for (var [o, _] of i)
                if (_.IsInitialized()) {
                  let e = s.GetItem(o);
                  (e = -1 === o ? s.GetRootItem() : e)
                    ? ((n = _.Size),
                      (a = _.Alpha),
                      (h = _.OffsetX),
                      (r = _.OffsetY),
                      (_ = _.HierarchyIndex),
                      (this.Xot.X = n),
                      (this.Xot.Y = n),
                      (this.Xot.Z = n),
                      e.SetUIItemScale(this.Xot),
                      e.SetAnchorOffsetX(h),
                      e.SetAnchorOffsetY(r),
                      e.SetUIItemAlpha(a),
                      e.SetHierarchyIndex(_))
                    : Log_1.Log.CheckError() &&
                      Log_1.Log.Error(
                        "BattleUiSet",
                        17,
                        "刷新移动端主界面设置时，找不到对应按钮",
                        ["panelIndex", t],
                        ["panelItemIndex", o],
                      );
                }
          }
        }
    }
  }
  Rm1(e) {
    return !(
      e.IsChildType(5) &&
      !ModelManager_1.ModelManager.BattleUiModel.IsMissionPanelVisible
    );
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (0 !== e.length)
      return (this.Ula.get(e[0]) || this.Ula.get("Default"))(e);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Guide",
        64,
        "BattleView相关的引导Extra参数设置错误，不能为空",
      );
  }
  ResetFormationCooldownExternal() {
    this.Hot?.ResetFormationCooldownExternal(),
      this.sza?.ResetFormationCooldownExternal();
  }
}
(exports.BattleView = BattleView).vJe = Stats_1.Stat.Create(
  "[BattleView]BattleViewTick",
);
//# sourceMappingURL=BattleView.js.map
