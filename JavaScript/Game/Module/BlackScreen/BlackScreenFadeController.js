"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackScreenFadeController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GameSettingsDeviceRender_1 = require("../../GameSettings/GameSettingsDeviceRender"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiConfig_1 = require("../../Ui/Define/UiConfig"),
  UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiManager_1 = require("../../Ui/UiManager"),
  LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController"),
  BlackScreenFadeView_1 = require("./BlackScreenFadeView");
class BlackScreenFadeController extends UiControllerBase_1.UiControllerBase {
  static set NeedGuarantee(e) {
    this.rc1 = e;
  }
  static get NeedGuarantee() {
    return this.rc1;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UiManagerInit,
      this.n0t,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnTeamLivingStateChange,
        this.t$s,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UiManagerInit,
      this.n0t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnTeamLivingStateChange,
        this.t$s,
      );
  }
  static AddFadeBlackScreen(e, r, t, a, n) {
    ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeShowPromise =
      new CustomPromise_1.CustomPromise();
    var i = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    2 === ModelManager_1.ModelManager.SceneTeamModel.GetGroupLivingState(i, 1)
      ? (LevelLoadingController_1.LevelLoadingController.CloseAllBlackScreenLoading(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("BlackScreen", 45, "因复活界面打开,黑幕关闭"))
      : void 0 === a ||
          ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
            a,
          )
        ? ((BlackScreenFadeController.NeedInputDis = !0),
          ModelManager_1.ModelManager.InputDistributeModel.RefreshInputDistributeTag(),
          GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableDLSSG(
            "BlackScreen",
          ),
          r && UiManager_1.UiManager.ResetToBattleView(),
          t &&
            UiManager_1.UiManager.AddOpenViewCheckFunction(
              "All",
              this.CheckCanOpen,
              "黑幕期间禁止打开部分界面",
            ),
          this.a0t(!0),
          this.h0t(e),
          this.r0t.ShowItem(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("BlackScreen", 45, "开始显示黑幕", ["标签", n]))
        : (LevelLoadingController_1.LevelLoadingController.CloseAllBlackScreenLoading(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "BlackScreen",
              45,
              "此玩法已经被销毁，不执行进入黑幕：",
              ["treeId", a],
            ));
  }
  static RemoveFadeBlackScreen(e, r) {
    this.r0t &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BlackScreen", 45, "触发结束黑屏", ["标签", r]),
      this.a0t(!1),
      this.h0t(e),
      this.r0t.HideItem());
  }
  static OnClear() {
    return this.r0t && (this.r0t.Destroy(), (this.r0t = void 0)), !0;
  }
  static ChangeColor(e) {
    this.r0t &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("BlackScreen", 45, "尝试改变黑幕的颜色", ["颜色", e]),
      this.r0t.UpdateScreenColor(e));
  }
  static ChangeColorByForce(e) {
    this.r0t &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "BlackScreen",
          45,
          "尝试在已有黑幕的情况下改变黑幕的颜色",
          ["颜色", e],
        ),
      this.r0t.UpdateScreenColorAndChangeVisible(e));
  }
  static ChangeAspect(e, r) {
    return !!this.r0t && this.r0t.ChangeAspect(e, r);
  }
  static h0t(e) {
    this.r0t &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("BlackScreen", 45, "改变黑幕的FadeTime"),
      this.r0t.SetFadeTime(e));
  }
  static a0t(e) {
    this.r0t &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("BlackScreen", 45, "改变Fade变量"),
      this.r0t.SetIsFadeIn(e));
  }
  static GetIsFadeIn() {
    return this.r0t?.GetActive() ?? !1;
  }
}
(exports.BlackScreenFadeController = BlackScreenFadeController),
  ((_a = BlackScreenFadeController).r0t = void 0),
  (BlackScreenFadeController.NeedInputDis = !1),
  (BlackScreenFadeController.l0t = new Set(["GuideTutorialView"])),
  (BlackScreenFadeController.rc1 = !0),
  (BlackScreenFadeController.n0t = () => {
    _a.r0t ||
      ((_a.r0t = new BlackScreenFadeView_1.BlackScreenFadeView()),
      _a.r0t.CreateByResourceIdAsync(
        "UiView_BlackFadeScreen_Prefab",
        UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Loading),
        !0,
      ));
  }),
  (BlackScreenFadeController.t$s = (e, r, t) => {
    e &&
      1 === r &&
      2 === t &&
      (LevelLoadingController_1.LevelLoadingController.CloseAllBlackScreenLoading(),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("BlackScreen", 45, "OnAllDead关闭黑幕");
  }),
  (BlackScreenFadeController.CheckCanOpen = (e) => {
    var r = UiConfig_1.UiConfig.TryGetViewInfo(e);
    return !(
      !r ||
      (r.Type === UiLayerType_1.ELayerType.Normal && _a.l0t.has(e))
    );
  });
//# sourceMappingURL=BlackScreenFadeController.js.map
