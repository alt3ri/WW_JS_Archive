"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiControl = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  ObjectSystem_1 = require("../../../Core/Object/ObjectSystem"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  InputSettingsManager_1 = require("../../InputSettings/InputSettingsManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiManager_1 = require("../../Ui/UiManager"),
  DamageUiManager_1 = require("../DamageUi/DamageUiManager"),
  SceneTeamController_1 = require("../SceneTeam/SceneTeamController"),
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
        this.aEa,
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
        EventDefine_1.EEventName.OnPlayerFollowerCreate,
        this.mDn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerFollowerDestroy,
        this.dDn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerFollowerEnableChange,
        this.Nza,
      );
    var e =
        ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetActionNames(),
      e =
        (InputDistributeController_1.InputDistributeController.BindActions(
          e,
          this.bMe,
        ),
        ModelManager_1.ModelManager.BattleUiModel.FormationPanelData.GetActionNames());
    InputDistributeController_1.InputDistributeController.BindActions(
      e,
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
        this.aEa,
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
        EventDefine_1.EEventName.OnPlayerFollowerCreate,
        this.mDn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerFollowerDestroy,
        this.dDn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerFollowerEnableChange,
        this.Nza,
      );
    var e =
        ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.GetActionNames(),
      e =
        (InputDistributeController_1.InputDistributeController.UnBindActions(
          e,
          this.bMe,
        ),
        ModelManager_1.ModelManager.BattleUiModel.FormationPanelData.GetActionNames());
    InputDistributeController_1.InputDistributeController.UnBindActions(
      e,
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
  static async PreloadBattleViewFromLoading() {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "battleView preload start"),
      await this.Pool.Init(),
      await ModelManager_1.ModelManager.BattleUiModel.Preload(),
      (BattleUiControl.bQe =
        await UiManager_1.UiManager.PreOpenViewAsync("BattleView")),
      DamageUiManager_1.DamageUiManager.PreloadDamageView(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "battleView preload end"),
      !0
    );
  }
  static async OpenBattleViewFromLoading() {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "battleView open start"),
      (await UiManager_1.UiManager.OpenViewAfterPreOpenedAsync(
        BattleUiControl.bQe,
      )) || (await UiManager_1.UiManager.OpenViewAsync("BattleView")),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 18, "battleView open end"),
      !0
    );
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
  static SetBattleViewDisable() {
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
    e?.Valid && e.Entity.GetComponent(29).ResetFocus();
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
  (BattleUiControl.aEa = (e, t) => {
    UiManager_1.UiManager.IsViewOpen("BattleView") &&
      !Info_1.Info.IsMobilePlatform() &&
      UiManager_1.UiManager.CloseView("BattleView", () => {
        UiManager_1.UiManager.OpenView("BattleView");
      });
  }),
  (BattleUiControl.DQe = (e, t) => {
    (10016 !== e && !t) ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Battle",
          8,
          "当唤鸣者招募处解锁状态登录设置时，广播红点时间检查红点",
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFirstOpenShopChanged,
      ));
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
    var a = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    a?.Valid &&
      a.Id === e &&
      ((a = t.Id),
      n
        ? (e = BattleUiControl.AddFullScreenEffect(t.Path, a)) &&
          ((n = UiLayer_1.UiLayer.UiRootItem),
          e.SetFloatParameter("Sprite_X", n.Width),
          e.SetFloatParameter("Sprite_Y", n.Height))
        : BattleUiControl.RemoveFullScreenEffectByUniqueId(a));
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
  (BattleUiControl.Nza = (e) => {
    ModelManager_1.ModelManager.BattleUiModel.FormationData.ChangePlayerFollowerEnable(
      e,
    );
  }),
  (BattleUiControl.bMe = (e, t) => {
    ModelManager_1.ModelManager.BattleUiModel.ExploreModeData.InputAction(
      e,
      0 === t,
    );
  }),
  (BattleUiControl.gTn = (t, n) => {
    if (0 === n) {
      let e = -1;
      switch (t) {
        case InputMappingsDefine_1.actionMappings.切换角色1:
          e = 1;
          break;
        case InputMappingsDefine_1.actionMappings.切换角色2:
          e = 2;
          break;
        case InputMappingsDefine_1.actionMappings.切换角色3:
          e = 3;
          break;
        case InputMappingsDefine_1.actionMappings.切换角色4:
          e = 4;
      }
      e < 0 ||
        ((n =
          ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetItemData(
            e,
          )?.CreatureDataId ?? 0),
        SceneTeamController_1.SceneTeamController.TryChangeRoleOrQte(n));
    }
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
  });
//# sourceMappingURL=BattleUiControl.js.map
