"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackScreenFadeController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiConfig_1 = require("../../Ui/Define/UiConfig"),
  UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiManager_1 = require("../../Ui/UiManager"),
  LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController"),
  BlackScreenFadeView_1 = require("./BlackScreenFadeView");
class BlackScreenFadeController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UiManagerInit,
      this.n0t,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnTeamLivingStateChange,
        this.M7s,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UiManagerInit,
      this.n0t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnTeamLivingStateChange,
        this.M7s,
      );
  }
  static AddFadeBlackScreen(e, r, n, t, i) {
    ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeShowPromise =
      new CustomPromise_1.CustomPromise();
    var a = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (
      2 === ModelManager_1.ModelManager.SceneTeamModel.GetGroupLivingState(a, 1)
    )
      LevelLoadingController_1.LevelLoadingController.CloseAllBlackScreenLoading(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("BlackScreen", 46, "因复活界面打开,黑幕关闭");
    else {
      if (void 0 !== t) {
        if (
          !ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
            t,
          )
        )
          return (
            LevelLoadingController_1.LevelLoadingController.CloseAllBlackScreenLoading(),
            void (
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "BlackScreen",
                46,
                "此玩法已经被销毁，不执行进入黑幕：",
                ["treeId", t],
              )
            )
          );
        (this.gQs = t),
          EventSystem_1.EventSystem.Has(
            EventDefine_1.EEventName.GeneralLogicTreeRemove,
            this.fQs,
          ) ||
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.GeneralLogicTreeRemove,
              this.fQs,
            );
      }
      (BlackScreenFadeController.NeedInputDis = !0),
        ModelManager_1.ModelManager.InputDistributeModel.RefreshInputDistributeTag(),
        r && UiManager_1.UiManager.ResetToBattleView(),
        n &&
          UiManager_1.UiManager.AddOpenViewCheckFunction(
            "All",
            this.CheckCanOpen,
            "黑幕期间禁止打开部分界面",
          );
      this.a0t(!0),
        this.h0t(e),
        this.r0t.ShowItem(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("BlackScreen", 46, "开始显示黑幕", ["标签", i]);
    }
  }
  static RemoveFadeBlackScreen(e, r) {
    this.r0t &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BlackScreen", 46, "触发结束黑屏", ["标签", r]),
      this.a0t(!1),
      this.h0t(e),
      this.r0t.HideItem(),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.GeneralLogicTreeRemove,
        this.fQs,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.GeneralLogicTreeRemove,
          this.fQs,
        ),
      (this.gQs = void 0));
  }
  static OnClear() {
    return this.r0t && (this.r0t.Destroy(), (this.r0t = void 0)), !0;
  }
  static ChangeColor(e) {
    this.r0t &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("BlackScreen", 46, "尝试改变黑幕的颜色"),
      this.r0t.UpdateScreenColor(e));
  }
  static h0t(e) {
    this.r0t &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("BlackScreen", 46, "改变黑幕的FadeTime"),
      this.r0t.SetFadeTime(e));
  }
  static a0t(e) {
    this.r0t &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("BlackScreen", 46, "改变Fade变量"),
      this.r0t.SetIsFadeIn(e));
  }
}
(exports.BlackScreenFadeController = BlackScreenFadeController),
  ((_a = BlackScreenFadeController).r0t = void 0),
  (BlackScreenFadeController.NeedInputDis = !1),
  (BlackScreenFadeController.gQs = void 0),
  (BlackScreenFadeController.l0t = new Set(["GuideTutorialView"])),
  (BlackScreenFadeController.n0t = () => {
    _a.r0t ||
      ((_a.r0t = new BlackScreenFadeView_1.BlackScreenFadeView()),
      _a.r0t.CreateByResourceIdAsync(
        "UiView_BlackFadeScreen_Prefab",
        UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Loading),
        !0,
      ));
  }),
  (BlackScreenFadeController.M7s = (e, r, n) => {
    e &&
      1 === r &&
      2 === n &&
      (LevelLoadingController_1.LevelLoadingController.CloseAllBlackScreenLoading(),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info("BlackScreen", 46, "OnAllDead关闭黑幕");
  }),
  (BlackScreenFadeController.CheckCanOpen = (e) => {
    var r = UiConfig_1.UiConfig.TryGetViewInfo(e);
    return !(
      !r ||
      (r.Type === UiLayerType_1.ELayerType.Normal && _a.l0t.has(e))
    );
  }),
  (BlackScreenFadeController.fQs = (e, r) => {
    r &&
      _a.gQs === r &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BlackScreen", 46, "监听玩法结束销毁黑幕"),
      LevelLoadingController_1.LevelLoadingController.CloseAllBlackScreenLoading());
  });
//# sourceMappingURL=BlackScreenFadeController.js.map
