"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TopPanel = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  BaseConfigController_1 = require("../../../../../Launcher/BaseConfig/BaseConfigController"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityMowingRiskController_1 = require("../../../Activity/ActivityContent/MowingRisk/Controller/ActivityMowingRiskController"),
  MowingRiskInBattleView_1 = require("../../../Activity/ActivityContent/MowingRisk/View/MowingRiskInBattleView"),
  ActivityController_1 = require("../../../Activity/ActivityController"),
  FunctionController_1 = require("../../../Functional/FunctionController"),
  InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController"),
  InstanceDungeonGuideController_1 = require("../../../InstanceDungeon/InstanceDungeonGuideController"),
  OnlineController_1 = require("../../../Online/OnlineController"),
  RoguelikeController_1 = require("../../../Roguelike/RoguelikeController"),
  TowerDefenceController_1 = require("../../../TowerDefence/TowerDefenceController"),
  TowerDefenceInBattleView_1 = require("../../../TowerDefence/View/TowerDefenceInBattleView"),
  TowerController_1 = require("../../../TowerDetailUi/TowerController"),
  BattleDungeonGuideButton_1 = require("../BattleChildView/BattleDungeonGuideButton"),
  BattleEntranceButton_1 = require("../BattleChildView/BattleEntranceButton"),
  BattleOnlineButton_1 = require("../BattleChildView/BattleOnlineButton"),
  BattleQuestButton_1 = require("../BattleChildView/BattleQuestButton"),
  BattleTowerButton_1 = require("../BattleChildView/BattleTowerButton"),
  MiniMapView_1 = require("../MiniMapView"),
  SilentAreaInfoView_1 = require("../SilentAreaView/SilentAreaInfoView"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel"),
  battleUiChildren = [4, 3, 2, 1];
class TopPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.Vet = void 0),
      (this.Het = void 0),
      (this.jet = void 0),
      (this.Wet = void 0),
      (this.Ket = void 0),
      (this.Qet = void 0),
      (this.Xet = void 0),
      (this.$et = void 0),
      (this.Yet = void 0),
      (this.Jet = void 0),
      (this.zet = void 0),
      (this.fCa = void 0),
      (this.n8a = void 0),
      (this.Zet = void 0),
      (this.fDn = void 0),
      (this.Oze = !1),
      (this.eet = (t) => {
        var e =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
            t.TreeIncId,
          );
        e && e.GetSilentAreaShowInfo() && this.zet.StartShow(t.TreeIncId, e);
      }),
      (this.oet = (t, e) => {
        this.zet?.Id === t && this.zet.EndShow();
      }),
      (this.ett = () => {
        this.Zet?.SetOtherHide(!1), this.zet.EndShow();
      }),
      (this.pCa = (t) => {
        t ? this.fCa?.StartShow() : this.fCa?.EndShow();
      }),
      (this.s8a = (t) => {
        this.n8a?.CustomSetActive(t),
          t &&
            ((t =
              ModelManager_1.ModelManager.MowingRiskModel.BuildInBattleRootData()),
            this.n8a?.RefreshByCustomData(t));
      }),
      (this.ttt = (t) => {
        for (const e of this.Het) e.SetGmHide(!t);
        this.jet.SetGmHide(!t), this.Ket.SetGmHide(!t);
      }),
      (this.XBo = () => {
        (this.Oze = Info_1.Info.IsInGamepad()),
          this.Vet && this.Vet.RefreshOnPlatformChanged();
        for (const t of this.Het) t.SetGamepadHide(this.Oze);
        this.Qet.RefreshButtonState();
      }),
      (this.itt = () => {
        this.ott();
      }),
      (this.ntt = () => {
        var t =
            ModelManager_1.ModelManager.InstanceDungeonGuideModel.GetHaveGuide(),
          e =
            (t
              ? (this.Xet.SetOtherHide(!0), this.$et.SetOtherHide(!1))
              : (this.Xet.SetOtherHide(!1), this.$et.SetOtherHide(!0)),
            ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike());
        e && (this.Xet.SetOtherHide(!0), this.$et.SetOtherHide(!0)),
          ModelManager_1.ModelManager.BattleUiModel.EnvironmentKeyData.SetEnvironmentKeyVisible(
            3,
            t && !e,
          );
      }),
      (this.xie = () => {
        this.Qet.RefreshButtonState();
      }),
      (this.RQe = (t, e) => {
        for (const i of this.Het) i.SetFunctionOpen(t, e);
      }),
      (this.stt = () => {
        UiManager_1.UiManager.OpenView("FunctionView");
      }),
      (this.att = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10009);
      }),
      (this.htt = () =>
        !ModelManager_1.ModelManager.ActivityModel.GetIfShowActivity()),
      (this.ltt = () => {
        InstanceDungeonController_1.InstanceDungeonController.OnClickInstanceDungeonExitButton();
      }),
      (this.KYe = () => {
        var t = ModelManager_1.ModelManager.GameModeModel.IsMulti,
          e = ModelManager_1.ModelManager.OnlineModel.IsOnlineDisabled();
        !t && e
          ? OnlineController_1.OnlineController.ShowTipsWhenOnlineDisabled()
          : UiManager_1.UiManager.OpenView("OnlineWorldHallView");
      }),
      (this._tt = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10002);
      }),
      (this.utt = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10040);
      }),
      (this.ctt = () => {
        ActivityController_1.ActivityController.OpenActivityById(0, 1);
      }),
      (this.mtt = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10001);
      }),
      (this.dtt = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10023);
      }),
      (this.Ctt = () => {
        UiManager_1.UiManager.OpenView("QuestView");
      }),
      (this.gtt = () => {
        InstanceDungeonGuideController_1.InstanceDungeonGuideController.StartReplayGuide();
      }),
      (this.ftt = () => {
        TowerController_1.TowerController.OpenTowerGuide();
      }),
      (this.ptt = () => {
        RoguelikeController_1.RoguelikeController.OpenRogueInfoView();
      }),
      (this.vtt = () =>
        ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike()),
      (this.pDn = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10019);
      }),
      (this.vDn = () =>
        ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike()),
      (this.Mtt = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10007);
      }),
      (this.Ett = () => {
        var t = this.GetExtendToggle(18).ToggleState;
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "BattleUiSet",
            28,
            "当前背景播放音乐按钮 ToggleState",
            ["currentToggleState", t],
          ),
          0 === t
            ? (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("BattleUiSet", 28, "停止背景音乐"),
              UE.KuroBgPlayerStatic.Stop())
            : 1 === t &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("BattleUiSet", 28, "背景播放音乐"),
              UE.KuroBgPlayerStatic.Play());
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
      [12, UE.UIItem],
      [13, UE.UIItem],
      [17, UE.UIItem],
      [16, UE.UIItem],
      [15, UE.UIItem],
      [18, UE.UIExtendToggle],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[18, this.Ett]]);
  }
  async InitializeAsync() {
    (this.Het = []),
      await Promise.all([
        this.Stt(),
        this.ytt(),
        this.Itt(),
        this.Ttt(),
        this.Ltt(),
        this.Dtt(),
        this.Rtt(),
        this.Utt(),
        this.Att(),
        this.Ptt(),
        this.xtt(),
        this.wtt(),
        this.Btt(),
        this.MDn(),
        this.btt(),
        this.qtt(),
        this.Gtt(),
        this.vCa(),
        this.a8a(),
      ]),
      this.Ntt();
  }
  OnSeamlessTravelFinish() {
    this.Ntt();
  }
  OnShowBattleChildViewPanel() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
      0,
      battleUiChildren,
      !0,
    ),
      this.Vet.ShowBattleVisibleChildView();
    for (const t of this.Het) t.ShowBattleVisibleChildView();
    this.zet.ShowBattleVisibleChildView(),
      this.Zet.ShowBattleVisibleChildView(),
      this.fCa.ShowBattleVisibleChildView(),
      this.n8a.ShowBattleVisibleChildView();
  }
  OnHideBattleChildViewPanel() {
    ModelManager_1.ModelManager.BattleUiModel?.ChildViewData.SetChildrenVisible(
      0,
      battleUiChildren,
      !1,
    ),
      this.Vet.HideBattleVisibleChildView();
    for (const t of this.Het) t.HideBattleVisibleChildView();
    this.zet.HideBattleVisibleChildView(),
      this.fCa.HideBattleVisibleChildView(),
      this.n8a.HideBattleVisibleChildView();
  }
  Ntt() {
    this.Oze = Info_1.Info.IsInGamepad();
    for (const t of this.Het) t.SetGamepadHide(this.Oze);
    this.Ott(),
      this.ott(),
      this.ktt(),
      this.MCa(),
      this.l8a(),
      this.Ftt(),
      this.EDn(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BattleUiSet", 28, "IOS 审核音乐Toggle", [
          " BaseConfigController.GetIosAuditFirstDownloadTip()",
          BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip(),
        ]),
      1 === Info_1.Info.PlatformType &&
        BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip() &&
        (this.GetExtendToggle(18)?.RootUIComp.SetUIActive(!0),
        this.GetExtendToggle(18)?.SetToggleState(0),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("BattleUiSet", 28, "初始化IOS 背景播放按钮");
  }
  Reset() {
    this.Vet.Reset(), (this.Vet = void 0), (this.Het = void 0), super.Reset();
  }
  OnTickBattleChildViewPanel(t) {
    TopPanel.vJe.Start(), this.Vet.RefreshShow(), TopPanel.vJe.Stop();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.InputControllerChange,
      this.XBo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivityUpdate,
        this.itt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DungeonGuideChange,
        this.ntt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.RQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.RQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GmOnlyShowMiniMap,
        this.ttt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
        this.eet,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText,
        this.oet,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnShowTowerGuideButton,
        this.ett,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TowerDefenseShowInBattleView,
        this.pCa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.MowingRiskInBattleViewSetActive,
        this.s8a,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.InputControllerChange,
      this.XBo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivityUpdate,
        this.itt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DungeonGuideChange,
        this.ntt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
        this.xie,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.RQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.RQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GmOnlyShowMiniMap,
        this.ttt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
        this.eet,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText,
        this.oet,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnShowTowerGuideButton,
        this.ett,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TowerDefenseShowInBattleView,
        this.pCa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.MowingRiskInBattleViewSetActive,
        this.s8a,
      );
  }
  Ott() {
    this.jet.SetOtherHide(
      !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance(),
    );
  }
  ott() {
    this.Ket.SetOtherHide(
      !ModelManager_1.ModelManager.ActivityModel.GetIfShowActivity(),
    );
  }
  ktt() {
    this.Zet.SetOtherHide(
      !ModelManager_1.ModelManager.TowerModel.CheckInTower(),
    );
  }
  MCa() {
    TowerDefenceController_1.TowerDefenseController.CheckInInstanceDungeon()
      ? this.fCa?.StartShow()
      : this.fCa?.EndShow();
  }
  l8a() {
    var t =
      ActivityMowingRiskController_1.ActivityMowingRiskController.Instance.CheckInInstanceDungeon();
    this.s8a(t);
  }
  Ftt() {
    var t = ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike();
    t &&
      (this.Het.forEach((t) => {
        t.SetOtherHide(!0);
      }),
      this.jet.SetOtherHide(!1)),
      this.Vet.SetRoguelikeVisible(!t),
      this.Yet.SetOtherHide(!t);
  }
  EDn() {
    var t = ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike();
    this.fDn.SetOtherHide(!t);
  }
  async Stt() {
    var t = this.GetItem(1);
    (this.Wet = await this.Vtt(t, "BattleViewMenu", void 0, !1, !0, 2)),
      this.Wet.BindOnClicked(this.stt);
  }
  async ytt() {
    var t = this.GetItem(3);
    (await this.Vtt(t, "BattleViewGachaButton", 10009)).BindOnClicked(this.att);
  }
  async Itt() {
    var t = this.GetItem(2);
    (this.jet = await this.Vtt(t, void 0, void 0, !1, !1, 1)),
      this.jet.BindOnClicked(this.ltt);
  }
  async Ptt() {
    var t = this.GetItem(10);
    (this.Ket = await this.Vtt(t, "ActivityEntrance", 10053)),
      this.Ket.SetGetOtherHideCallCall(this.htt),
      this.Ket.BindOnClicked(this.ctt);
  }
  async Ttt() {
    var t = this.GetItem(4),
      e = {
        RedDotName: void 0,
        FunctionType: 10021,
        ChildType: 3,
        HideInGamepad: !0,
        HideByRoleConfig: !0,
      };
    (this.Qet = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      BattleOnlineButton_1.BattleOnlineButton,
      e,
    )),
      this.Het.push(this.Qet),
      this.Qet.BindOnClicked(this.KYe);
  }
  async Dtt() {
    var t = this.GetItem(6);
    (await this.Vtt(t, "FunctionInventory", void 0, !0)).BindOnClicked(
      this._tt,
    );
  }
  async Rtt() {
    var t = this.GetItem(7);
    (await this.Vtt(t, "BattlePass", 10040)).BindOnClicked(this.utt);
  }
  async Utt() {
    var t = this.GetItem(8);
    (await this.Vtt(t, "FunctionRole", 10001, !0)).BindOnClicked(this.mtt);
  }
  async Att() {
    var t = this.GetItem(9);
    (await this.Vtt(t, "AdventureBattleButton", 10023, !1)).BindOnClicked(
      this.dtt,
    );
  }
  async Ltt() {
    var t = this.GetItem(0);
    this.Vet = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      MiniMapView_1.MiniMapView,
    );
  }
  async qtt() {
    var t = this.GetItem(15);
    this.zet = await this.NewDynamicChildViewAsync(
      t.GetOwner(),
      SilentAreaInfoView_1.SilentAreaView,
    );
  }
  async vCa() {
    var t = this.GetItem(20);
    this.fCa = await this.NewDynamicChildViewAsync(
      t.GetOwner(),
      TowerDefenceInBattleView_1.TowerDefenseInBattleView,
    );
  }
  async a8a() {
    var t = this.GetItem(21);
    this.n8a = await this.NewDynamicChildViewAsync(
      t.GetOwner(),
      MowingRiskInBattleView_1.MowingRiskInBattleView,
    );
  }
  async Gtt() {
    var t = this.GetItem(16),
      e = {
        RedDotName: void 0,
        FunctionType: void 0,
        ChildType: 3,
        HideInGamepad: !1,
        HideByRoleConfig: !0,
      };
    (this.Zet = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      BattleTowerButton_1.BattleTowerButton,
      e,
    )),
      this.Zet.BindOnClicked(this.ftt);
  }
  async Vtt(t, e = void 0, i = void 0, n = !1, s = !0, o = 3) {
    (e = {
      RedDotName: e,
      FunctionType: i,
      ChildType: o,
      HideInGamepad: n,
      HideByRoleConfig: s,
    }),
      (i = await this.NewStaticChildViewAsync(
        t.GetOwner(),
        BattleEntranceButton_1.BattleEntranceButton,
        e,
      ));
    return this.Het.push(i), i;
  }
  async xtt() {
    var t = this.GetItem(11);
    (this.Xet = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      BattleQuestButton_1.BattleQuestButton,
      {
        RedDotName: "BattleViewQuestButton",
        FunctionType: 10004,
        ChildType: 3,
        HideInGamepad: !1,
        HideByRoleConfig: !0,
      },
    )),
      this.Het.push(this.Xet),
      this.Xet.BindOnClicked(this.Ctt);
  }
  async wtt() {
    var t = this.GetItem(12),
      e = {
        RedDotName: void 0,
        FunctionType: void 0,
        HideInGamepad: !1,
        HideByRoleConfig: !0,
        ChildType: 3,
      };
    (this.$et = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      BattleDungeonGuideButton_1.BattleDungeonGuideButton,
      e,
    )),
      this.Het.push(this.$et),
      this.$et.BindOnClicked(this.gtt),
      this.$et.SetOtherHide(!0);
  }
  async Btt() {
    var t = this.GetItem(13);
    (this.Yet = await this.Vtt(t, void 0, void 0)),
      this.Yet.BindOnClicked(this.ptt),
      this.Yet.SetGetOtherHideCallCall(this.vtt);
  }
  async MDn() {
    var t = this.GetItem(19);
    (this.fDn = await this.Vtt(t, void 0, void 0)),
      this.fDn.BindOnClicked(this.pDn),
      this.fDn.SetGetOtherHideCallCall(this.vDn);
  }
  async btt() {
    var t = this.GetItem(17);
    (this.Jet = await this.Vtt(t, void 0, 10007, !0)),
      this.Jet.BindOnClicked(this.Mtt);
  }
}
(exports.TopPanel = TopPanel).vJe = Stats_1.Stat.Create(
  "[BattleView]TopPanelTick",
);
//# sourceMappingURL=TopPanel.js.map
