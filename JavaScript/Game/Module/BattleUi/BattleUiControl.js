"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiControl = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Net_1 = require("../../../Core/Net/Net"),
  ObjectSystem_1 = require("../../../Core/Object/ObjectSystem"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiManager_1 = require("../../Ui/UiManager"),
  CooperationController_1 = require("../Battle/Cooperation/CooperationController"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  DamageUiManager_1 = require("../DamageUi/DamageUiManager"),
  BattleUiModel_1 = require("./BattleUiModel"),
  BattleUiPool_1 = require("./BattleUiPool");
class BattleUiControl extends UiControllerBase_1.UiControllerBase {
  static OnClear() {
    return this.Pool.Clear(), !0;
  }
  static OnLeaveLevel() {
    return this.Pool.Clear(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.AddEntity,
        this.GUe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleLevelUp,
        this.TQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShowTypeChange,
        this.lEa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.DQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.RQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRevive,
        this.UQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharOnBuffAddUIPrefab,
        this.AQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.mWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshOnlineTeamList,
        this.mWe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeWalkOrRun,
        this.PQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetImageQuality,
        this.xQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetResolution,
        this.xQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetDisplayMode,
        this.xQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UIViewPortSizeChanged,
        this.xQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerFollowerCreate,
        this.mDn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerFollowerDestroy,
        this.dDn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerFollowerEnableChange,
        this.xrh,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GuideGroupOpening,
        this.IJt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.DriveFishingShipStateChanged,
        this.Gd_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged,
        this.QTc,
      );
    var e =
        ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetActionNames(),
      e =
        (InputDistributeController_1.InputDistributeController.BindActions(
          e,
          this.bMe,
        ),
        ModelManager_1.ModelManager.BattleUiModel.FormationPanelData);
    e.RegisterInputHandler(
      0,
      CooperationController_1.CooperationController.FormationInputHandler,
    ),
      e.RegisterInputHandler(
        1,
        ControllerHolder_1.ControllerHolder.FishingController
          .FishingInputHandler,
      ),
      e.SetInputType(0),
      InputDistributeController_1.InputDistributeController.BindActions(
        e.GetActionNames(),
        this.gTn,
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(
        0,
        this.wQe,
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.AddCallback(
        18,
        this.BQe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      this.nye,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AddEntity,
        this.GUe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleLevelUp,
        this.TQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShowTypeChange,
        this.lEa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenSet,
        this.DQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.RQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRevive,
        this.UQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CharOnBuffAddUIPrefab,
        this.AQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
        this.mWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshOnlineTeamList,
        this.mWe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeWalkOrRun,
        this.PQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetImageQuality,
        this.xQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetResolution,
        this.xQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetDisplayMode,
        this.xQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UIViewPortSizeChanged,
        this.xQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerFollowerCreate,
        this.mDn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerFollowerDestroy,
        this.dDn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerFollowerEnableChange,
        this.xrh,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GuideGroupOpening,
        this.IJt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.DriveFishingShipStateChanged,
        this.Gd_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged,
        this.QTc,
      );
    var e =
      ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetActionNames();
    InputDistributeController_1.InputDistributeController.UnBindActions(
      e,
      this.bMe,
    ),
      InputDistributeController_1.InputDistributeController.UnBindActions(
        ModelManager_1.ModelManager.BattleUiModel.FormationPanelData.GetActionNames(),
        this.gTn,
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(
        0,
        this.wQe,
      ),
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.RemoveCallback(
        18,
        this.BQe,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(28385, this.Yuc), Net_1.Net.Register(29691, this.zuc);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28385), Net_1.Net.UnRegister(29691);
  }
  static async PreloadBattleViewFromLoading(e) {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "battleView preload start"),
      await this.Pool.Init(),
      await ModelManager_1.ModelManager.BattleUiModel.Preload(),
      e ||
        (BattleUiControl.bQe =
          await UiManager_1.UiManager.PreOpenViewAsync("BattleView")),
      DamageUiManager_1.DamageUiManager.PreloadDamageView(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "battleView preload end"),
      !0
    );
  }
  static async OpenBattleViewFromLoading() {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "battleView open start"),
      (await UiManager_1.UiManager.OpenViewAfterPreOpenedAsync(
        BattleUiControl.bQe,
      )) || (await UiManager_1.UiManager.OpenViewAsync("BattleView")),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 17, "battleView open end"),
      await this.CheckOpenDungeonMainView(),
      !0
    );
  }
  static async CheckOpenDungeonMainView() {
    var e = this.GetDungeonToViewName();
    return !!e && (await UiManager_1.UiManager.OpenViewAsync(e), !0);
  }
  static GetDungeonToViewName() {
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
        e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
      if (e?.InstSubType) {
        e = this.X4c.get(e.InstSubType);
        if (e) return e;
      }
    }
  }
  static qQe() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ShowHUD);
  }
  static GQe() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HideHUD);
  }
  static AddFullScreenEffect(e, t) {
    return ModelManager_1.ModelManager.BattleUiModel.AddFullScreenEffect(e, t);
  }
  static RemoveFullScreenEffect(e) {
    ModelManager_1.ModelManager.BattleUiModel.RemoveFullScreenEffect(e);
  }
  static RemoveFullScreenEffectByUniqueId(e) {
    ModelManager_1.ModelManager.BattleUiModel.RemoveFullScreenEffectByUniqueId(
      e,
    );
  }
  static SetBattleViewVisible(e) {
    !this.NQe.delete(e) ||
      0 < this.NQe.size ||
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(9);
  }
  static SetBattleViewInvisible() {
    return (
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.HideBattleView(9),
      this.OQe++,
      this.NQe.add(this.OQe),
      this.OQe
    );
  }
  static FocusToTargetLocation(e) {
    var t =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(
          3,
        ).ActorLocationProxy,
      n = ModelManager_1.ModelManager.BattleUiModel;
    CameraController_1.CameraController.FightCamera.LogicComponent.PlayCameraRotatorWithCurve(
      t,
      e,
      n.CursorCameraRotatorOffset,
      n.CursorCameraRotationTime,
    );
  }
  static ResetFocus() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    e?.Valid && e.Entity.GetComponent(32).ResetFocus();
  }
  static TryOpenPureMode() {
    const t = ModelManager_1.ModelManager.BattleUiModel?.PureModeData;
    var e;
    t &&
      !t.IsOpen &&
      (t.IsSkipConfirmBox
        ? (t.IsOpen = !0)
        : ((t.IsSkipConfirmBoxTmp = !1),
          ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(230)).HasToggle = !0),
          (e.ToggleText = ConfigManager_1.ConfigManager.TextConfig.GetTextById(
            "PlotSkipConfirmToggle",
          )),
          e.SetToggleFunction((e) => {
            t.IsSkipConfirmBoxTmp = e;
          }),
          e.FunctionMap.set(2, () => {
            (t.IsSkipConfirmBox = t.IsSkipConfirmBoxTmp), (t.IsOpen = !0);
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          )));
  }
  static TryClosePureMode() {
    var e = ModelManager_1.ModelManager.BattleUiModel?.PureModeData;
    return !!e && !!e.IsOpen && !(e.IsOpen = !1);
  }
}
(exports.BattleUiControl = BattleUiControl),
  ((_a = BattleUiControl).kQe = Stats_1.Stat.Create(
    "[ChangeRole]BattleUiControl",
  )),
  (BattleUiControl.Model = BattleUiModel_1.BattleUiModel),
  (BattleUiControl.Pool = new BattleUiPool_1.BattleUiPool()),
  (BattleUiControl.OQe = 0),
  (BattleUiControl.NQe = new Set()),
  (BattleUiControl.X4c = new Map([
    [35, "DangoMonopolyMainView"],
    [34, "MapRogueMainView"],
    [31, "RacingBetsMainView"],
  ])),
  (BattleUiControl.nye = () => {
    ModelManager_1.ModelManager.BattleUiModel.OnWorldDone();
  }),
  (BattleUiControl.xie = (e, t) => {
    BattleUiControl.kQe.Start(),
      ModelManager_1.ModelManager.BattleUiModel.OnChangeRole(e, t),
      BattleUiControl.kQe.Stop();
  }),
  (BattleUiControl.GUe = (e, t) => {
    ModelManager_1.ModelManager.BattleUiModel.OnAddEntity(t);
  }),
  (BattleUiControl.zpe = (e, t) => {
    ModelManager_1.ModelManager.BattleUiModel.OnRemoveEntity(t);
  }),
  (BattleUiControl.UQe = (e) => {
    ObjectSystem_1.ObjectSystem.IsValid(e) &&
      ModelManager_1.ModelManager.BattleUiModel.TryBroadcastRevive(e.Id);
  }),
  (BattleUiControl.TQe = (e, t, n) => {
    ModelManager_1.ModelManager.BattleUiModel.TryBroadcastRoleLevelUpData(
      e,
      t,
      n,
    );
  }),
  (BattleUiControl.lEa = (e, t) => {
    UiManager_1.UiManager.IsViewOpen("BattleView") &&
      !Info_1.Info.IsMobilePlatform() &&
      UiManager_1.UiManager.CloseView("BattleView", () => {
        UiManager_1.UiManager.OpenView("BattleView");
      }),
      ModelManager_1.ModelManager.BattleUiModel.ShowTypeChange(e, t);
  }),
  (BattleUiControl.DQe = (e, t) => {
    (10016 !== e && !t) ||
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFirstOpenShopChanged,
      );
  }),
  (BattleUiControl.RQe = (e, t) => {
    (10016 !== e && !t) ||
      (LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.FirstOpenShop,
        !0,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFirstOpenShopChanged,
      ));
  }),
  (BattleUiControl.AQe = (e, t, n) => {
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    i?.Valid &&
      i.Id === e &&
      ((i = t.Id),
      n
        ? (e = BattleUiControl.AddFullScreenEffect(t.Path, BigInt(i))) &&
          ((n = UiLayer_1.UiLayer.UiRootItem),
          e.SetFloatParameter("Sprite_X", n.Width),
          e.SetFloatParameter("Sprite_Y", n.Height))
        : BattleUiControl.RemoveFullScreenEffectByUniqueId(BigInt(i)));
  }),
  (BattleUiControl.mWe = () => {
    ModelManager_1.ModelManager.BattleUiModel.OnFormationLoaded();
  }),
  (BattleUiControl.PQe = (e, t) => {
    ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid &&
      Info_1.Info.IsInKeyBoard() &&
      e !== t &&
      ((e = InputSettingsManager_1.InputSettingsManager.GetActionBinding(
        InputMappingsDefine_1.actionMappings.走跑切换,
      )
        ?.GetCurrentPlatformKey()
        ?.GetKeyIconPath()),
      t
        ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "ChangeWalk",
            `<texture=${e}/>`,
          )
        : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "ChangeRun",
            `<texture=${e}/>`,
          ));
  }),
  (BattleUiControl.xQe = () => {
    ModelManager_1.ModelManager.BattleUiModel.UpdateViewPortSize();
  }),
  (BattleUiControl.mDn = (e) => {
    ModelManager_1.ModelManager.BattleUiModel.FormationData.AddFollower(e);
  }),
  (BattleUiControl.dDn = () => {
    ModelManager_1.ModelManager.BattleUiModel.FormationData.RemoveFollower();
  }),
  (BattleUiControl.xrh = (e) => {
    ModelManager_1.ModelManager.BattleUiModel.FormationData.ChangePlayerFollowerEnable(
      e,
    );
  }),
  (BattleUiControl.IJt = (e) => {
    e !== ModelManager_1.ModelManager.BattleUiModel?.PureModeData?.GuideId &&
      BattleUiControl.TryClosePureMode();
  }),
  (BattleUiControl.Gd_ = (e) => {
    var t = ModelManager_1.ModelManager.BattleUiModel.FormationPanelData;
    t && (e ? t.SetInputType(1) : t.SetInputType(0));
  }),
  (BattleUiControl.QTc = (e, t, n) => {
    1407 === t && n && UiManager_1.UiManager.OpenView("XiaKongQteView", e);
  }),
  (BattleUiControl.bMe = (e, t) => {
    ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.InputAction(
      e,
      0 === t,
    );
  }),
  (BattleUiControl.gTn = (e, t) => {
    0 === t &&
      ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetInputHandler()?.(
        e,
      );
  }),
  (BattleUiControl.bQe = void 0),
  (BattleUiControl.wQe = () => {
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(0)
      ? _a.qQe()
      : _a.GQe();
  }),
  (BattleUiControl.BQe = () => {
    var e =
      ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
        18,
      );
    UiLayer_1.UiLayer.GetFloatUnit(
      UiLayerType_1.ELayerType.BattleFloat,
      0,
    ).SetUIActive(e),
      UiLayer_1.UiLayer.GetFloatUnit(
        UiLayerType_1.ELayerType.BattleFloat,
        1,
      ).SetUIActive(e);
  }),
  (BattleUiControl.Yuc = (e) => {
    ModelManager_1.ModelManager.BattleUiModel.AddGuest(e.Fsc);
  }),
  (BattleUiControl.zuc = (e) => {
    ModelManager_1.ModelManager.BattleUiModel.RemoveGuest(e.Fsc);
  });
//# sourceMappingURL=BattleUiControl.js.map
