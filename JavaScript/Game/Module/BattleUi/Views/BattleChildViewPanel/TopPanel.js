"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TopPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  BaseConfigController_1 = require("../../../../../Launcher/BaseConfig/BaseConfigController"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityController_1 = require("../../../Activity/ActivityController"),
  FunctionController_1 = require("../../../Functional/FunctionController"),
  InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController"),
  InstanceDungeonGuideController_1 = require("../../../InstanceDungeon/InstanceDungeonGuideController"),
  OnlineController_1 = require("../../../Online/OnlineController"),
  RoguelikeController_1 = require("../../../Roguelike/RoguelikeController"),
  TowerController_1 = require("../../../TowerDetailUi/TowerController"),
  BattleEntranceButton_1 = require("../BattleChildView/BattleEntranceButton"),
  BattleOnlineButton_1 = require("../BattleChildView/BattleOnlineButton"),
  BattleTowerButton_1 = require("../BattleChildView/BattleTowerButton"),
  MiniMapView_1 = require("../MiniMapView"),
  SilentAreaInfoView_1 = require("../SilentAreaView/SilentAreaInfoView"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel"),
  BattleQuestButton_1 = require("../BattleChildView/BattleQuestButton"),
  battleUiChildren = [4, 3, 2, 1];
class TopPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.TZe = void 0),
      (this.LZe = void 0),
      (this.DZe = void 0),
      (this.RZe = void 0),
      (this.UZe = void 0),
      (this.AZe = void 0),
      (this.PZe = void 0),
      (this.xZe = void 0),
      (this.wZe = void 0),
      (this.BZe = void 0),
      (this.bZe = void 0),
      (this.qZe = void 0),
      (this.DLn = void 0),
      (this.DJe = !1),
      (this.Vze = (t) => {
        var e =
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
            t.TreeIncId,
          );
        e && e.GetSilentAreaShowInfo() && this.bZe.StartShow(t.TreeIncId, e);
      }),
      (this.Wze = (t, e) => {
        this.bZe?.Id === t && this.bZe.EndShow();
      }),
      (this.GZe = () => {
        this.qZe?.SetOtherHide(!1), this.bZe.EndShow();
      }),
      (this.NZe = (t) => {
        for (const e of this.LZe) e.SetGmHide(!t);
        this.DZe.SetGmHide(!t), this.UZe.SetGmHide(!t);
      }),
      (this.dKe = (t, e, i) => {
        (this.DJe = ModelManager_1.ModelManager.PlatformModel.IsGamepad()),
          this.TZe && this.TZe.RefreshOnPlatformChanged();
        for (const n of this.LZe) n.SetGamepadHide(this.DJe);
        this.AZe.RefreshButtonState();
      }),
      (this.OZe = () => {
        this.kZe();
      }),
      (this.FZe = () => {
        ModelManager_1.ModelManager.InstanceDungeonGuideModel.GetHaveGuide()
          ? (this.PZe.SetOtherHide(!0), this.xZe.SetOtherHide(!1))
          : (this.PZe.SetOtherHide(!1), this.xZe.SetOtherHide(!0));
        var t = ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike();
        t && (this.PZe.SetOtherHide(!0), this.xZe.SetOtherHide(!0));
      }),
      (this.xie = () => {
        this.AZe.RefreshButtonState();
      }),
      (this.gKe = (t, e) => {
        for (const i of this.LZe) i.SetFunctionOpen(t, e);
      }),
      (this.VZe = () => {
        UiManager_1.UiManager.OpenView("FunctionView");
      }),
      (this.HZe = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10009);
      }),
      (this.jZe = () =>
        !ModelManager_1.ModelManager.ActivityModel.GetIfShowActivity()),
      (this.WZe = () => {
        InstanceDungeonController_1.InstanceDungeonController.OnClickInstanceDungeonExitButton();
      }),
      (this.B$e = () => {
        var t = ModelManager_1.ModelManager.GameModeModel.IsMulti,
          e = ModelManager_1.ModelManager.OnlineModel.IsOnlineDisabled();
        !t && e
          ? OnlineController_1.OnlineController.ShowTipsWhenOnlineDisabled()
          : UiManager_1.UiManager.OpenView("OnlineWorldHallView");
      }),
      (this.KZe = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10002);
      }),
      (this.QZe = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10040);
      }),
      (this.XZe = () => {
        ActivityController_1.ActivityController.OpenActivityById(0, 1);
      }),
      (this.$Ze = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10001);
      }),
      (this.YZe = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10023);
      }),
      (this.JZe = () => {
        UiManager_1.UiManager.OpenView("QuestView");
      }),
      (this.zZe = () => {
        InstanceDungeonGuideController_1.InstanceDungeonGuideController.StartReplayGuide();
      }),
      (this.ZZe = () => {
        TowerController_1.TowerController.OpenTowerGuide();
      }),
      (this.eet = () => {
        RoguelikeController_1.RoguelikeController.OpenRogueInfoView();
      }),
      (this.tet = () =>
        ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike()),
      (this.RLn = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10019);
      }),
      (this.ALn = () =>
        ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike()),
      (this.iet = () => {
        FunctionController_1.FunctionController.OpenFunctionRelateView(10007);
      }),
      (this.oet = () => {
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
    ]),
      (this.BtnBindInfo = [[18, this.oet]]);
  }
  async InitializeAsync() {
    (this.LZe = []),
      await Promise.all([
        this.ret(),
        this.net(),
        this.aet(),
        this.het(),
        this.let(),
        this._et(),
        this.uet(),
        this.cet(),
        this.met(),
        this.det(),
        this.Cet(),
        this.fet(),
        this.pet(),
        this.ULn(),
        this.vet(),
        this.Met(),
        this.Eet(),
      ]),
      this.yet();
  }
  OnShowBattleChildViewPanel() {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.SetChildrenVisible(
      0,
      battleUiChildren,
      !0,
    ),
      this.TZe.ShowBattleVisibleChildView();
    for (const t of this.LZe) t.ShowBattleVisibleChildView();
    this.bZe.ShowBattleVisibleChildView(),
      this.qZe.ShowBattleVisibleChildView();
  }
  OnHideBattleChildViewPanel() {
    ModelManager_1.ModelManager.BattleUiModel?.ChildViewData.SetChildrenVisible(
      0,
      battleUiChildren,
      !1,
    ),
      this.TZe.HideBattleVisibleChildView();
    for (const t of this.LZe) t.HideBattleVisibleChildView();
    this.bZe.HideBattleVisibleChildView();
  }
  yet() {
    this.DJe = ModelManager_1.ModelManager.PlatformModel.IsGamepad();
    for (const t of this.LZe) t.SetGamepadHide(this.DJe);
    this.Iet(),
      this.kZe(),
      this.Tet(),
      this.Let(),
      this.PLn(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BattleUiSet", 28, "IOS 审核音乐Toggle", [
          " BaseConfigController.GetIosAuditFirstDownloadTip()",
          BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip(),
        ]),
      1 === ModelManager_1.ModelManager.PlatformModel.PlatformType &&
        BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTip() &&
        (this.GetExtendToggle(18)?.RootUIComp.SetUIActive(!0),
        this.GetExtendToggle(18)?.SetToggleState(0),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("BattleUiSet", 28, "初始化IOS 背景播放按钮");
  }
  Reset() {
    this.TZe.Reset(), (this.TZe = void 0), (this.LZe = void 0), super.Reset();
  }
  OnTickBattleChildViewPanel(t) {
    this.TZe.RefreshShow();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPlatformChanged,
      this.dKe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivityUpdate,
        this.OZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DungeonGuideChange,
        this.FZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.gKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.gKe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GmOnlyShowMiniMap,
        this.NZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
        this.Vze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText,
        this.Wze,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnShowTowerGuideButton,
        this.GZe,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlatformChanged,
      this.dKe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivityUpdate,
        this.OZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DungeonGuideChange,
        this.FZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
        this.xie,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.gKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.gKe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GmOnlyShowMiniMap,
        this.NZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
        this.Vze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText,
        this.Wze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnShowTowerGuideButton,
        this.GZe,
      );
  }
  Iet() {
    this.DZe.SetOtherHide(
      !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance(),
    );
  }
  kZe() {
    this.UZe.SetOtherHide(
      !ModelManager_1.ModelManager.ActivityModel.GetIfShowActivity(),
    );
  }
  Tet() {
    this.qZe.SetOtherHide(
      !ModelManager_1.ModelManager.TowerModel.CheckInTower(),
    );
  }
  Let() {
    var t = ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike();
    t &&
      (this.LZe.forEach((t) => {
        t.SetOtherHide(!0);
      }),
      this.DZe.SetOtherHide(!1)),
      this.TZe.SetRoguelikeVisible(!t),
      this.wZe.SetOtherHide(!t);
  }
  PLn() {
    var t = ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike();
    this.DLn.SetOtherHide(!t);
  }
  async ret() {
    var t = this.GetItem(1);
    (this.RZe = await this.Det(t, "BattleViewMenu", void 0, !1, !0, 2)),
      this.RZe.BindOnClicked(this.VZe);
  }
  async net() {
    var t = this.GetItem(3);
    (await this.Det(t, "BattleViewGachaButton", 10009)).BindOnClicked(this.HZe);
  }
  async aet() {
    var t = this.GetItem(2);
    (this.DZe = await this.Det(t, void 0, void 0, !1, !1, 1)),
      this.DZe.BindOnClicked(this.WZe);
  }
  async det() {
    var t = this.GetItem(10);
    (this.UZe = await this.Det(t, "ActivityEntrance", 10053)),
      this.UZe.SetGetOtherHideCallCall(this.jZe),
      this.UZe.BindOnClicked(this.XZe);
  }
  async het() {
    var t = this.GetItem(4),
      e = {
        RedDotName: void 0,
        FunctionType: 10021,
        ChildType: 3,
        HideInGamepad: !0,
        HideByRoleConfig: !0,
      };
    (this.AZe = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      BattleOnlineButton_1.BattleOnlineButton,
      e,
    )),
      this.LZe.push(this.AZe),
      this.AZe.BindOnClicked(this.B$e);
  }
  async _et() {
    var t = this.GetItem(6);
    (await this.Det(t, "FunctionInventory", void 0, !0)).BindOnClicked(
      this.KZe,
    );
  }
  async uet() {
    var t = this.GetItem(7);
    (await this.Det(t, "BattlePass", 10040)).BindOnClicked(this.QZe);
  }
  async cet() {
    var t = this.GetItem(8);
    (await this.Det(t, "FunctionRole", 10001, !0)).BindOnClicked(this.$Ze);
  }
  async met() {
    var t = this.GetItem(9);
    (await this.Det(t, "AdventureBattleButton", 10023, !0)).BindOnClicked(
      this.YZe,
    );
  }
  async let() {
    var t = this.GetItem(0);
    this.TZe = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      MiniMapView_1.MiniMapView,
    );
  }
  async Met() {
    var t = this.GetItem(15);
    this.bZe = await this.NewDynamicChildViewAsync(
      t.GetOwner(),
      SilentAreaInfoView_1.SilentAreaView,
    );
  }
  async Eet() {
    var t = this.GetItem(16),
      e = {
        RedDotName: void 0,
        FunctionType: void 0,
        ChildType: 3,
        HideInGamepad: !1,
        HideByRoleConfig: !0,
      };
    (this.qZe = await this.NewStaticChildViewAsync(
      t.GetOwner(),
      BattleTowerButton_1.BattleTowerButton,
      e,
    )),
      this.qZe.BindOnClicked(this.ZZe);
  }
  async Det(t, e = void 0, i = void 0, n = !1, s = !0, o = 3) {
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
    return this.LZe.push(i), i;
  }
  async Cet() {
    var t = this.GetItem(11);
    (this.PZe = await this.NewStaticChildViewAsync(
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
      this.LZe.push(this.PZe),
      this.PZe.BindOnClicked(this.JZe);
  }
  async fet() {
    var t = this.GetItem(12);
    (this.xZe = await this.Det(t, void 0, void 0)),
      this.xZe.BindOnClicked(this.zZe);
  }
  async pet() {
    var t = this.GetItem(13);
    (this.wZe = await this.Det(t, void 0, void 0)),
      this.wZe.BindOnClicked(this.eet),
      this.wZe.SetGetOtherHideCallCall(this.tet);
  }
  async ULn() {
    var t = this.GetItem(19);
    (this.DLn = await this.Det(t, void 0, void 0)),
      this.DLn.BindOnClicked(this.RLn),
      this.DLn.SetGetOtherHideCallCall(this.ALn);
  }
  async vet() {
    var t = this.GetItem(17);
    (this.BZe = await this.Det(t, void 0, 10007, !0)),
      this.BZe.BindOnClicked(this.iet);
  }
}
(exports.TopPanel = TopPanel).aYe = void 0;
//# sourceMappingURL=TopPanel.js.map
