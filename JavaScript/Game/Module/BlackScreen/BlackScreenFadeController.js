"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BlackScreenFadeController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiConfig_1 = require("../../Ui/Define/UiConfig");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController");
const BlackScreenFadeView_1 = require("./BlackScreenFadeView");
class BlackScreenFadeController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UiManagerInit,
      this.QCt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerDead,
        this.XCt,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UiManagerInit,
      this.QCt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerDead,
        this.XCt,
      );
  }
  static AddFadeBlackScreen(e, r, n, t, i) {
    if (
      ((ModelManager_1.ModelManager.LevelLoadingModel.CameraFadeShowPromise =
        new CustomPromise_1.CustomPromise()),
      ModelManager_1.ModelManager.DeadReviveModel.AllDead)
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
        (this.n8s = t),
          EventSystem_1.EventSystem.Has(
            EventDefine_1.EEventName.GeneralLogicTreeRemove,
            this.s8s,
          ) ||
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.GeneralLogicTreeRemove,
              this.s8s,
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
      this.$Ct(!0),
        this.YCt(e),
        this.KCt.ShowItem(),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("BlackScreen", 46, "开始显示黑幕", ["标签", i]);
    }
  }
  static RemoveFadeBlackScreen(e, r) {
    this.KCt &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BlackScreen", 46, "触发结束黑屏", ["标签", r]),
      this.$Ct(!1),
      this.YCt(e),
      this.KCt.HideItem(),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.GeneralLogicTreeRemove,
        this.s8s,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.GeneralLogicTreeRemove,
          this.s8s,
        ),
      (this.n8s = void 0));
  }
  static OnClear() {
    return this.KCt && (this.KCt.Destroy(), (this.KCt = void 0)), !0;
  }
  static ChangeColor(e) {
    this.KCt &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("BlackScreen", 46, "尝试改变黑幕的颜色"),
      this.KCt.UpdateScreenColor(e));
  }
  static YCt(e) {
    this.KCt &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("BlackScreen", 46, "改变黑幕的FadeTime"),
      this.KCt.SetFadeTime(e));
  }
  static $Ct(e) {
    this.KCt &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("BlackScreen", 46, "改变Fade变量"),
      this.KCt.SetIsFadeIn(e));
  }
}
(exports.BlackScreenFadeController = BlackScreenFadeController),
  ((_a = BlackScreenFadeController).KCt = void 0),
  (BlackScreenFadeController.NeedInputDis = !1),
  (BlackScreenFadeController.n8s = void 0),
  (BlackScreenFadeController.JCt = new Set(["GuideTutorialView"])),
  (BlackScreenFadeController.QCt = () => {
    _a.KCt ||
      ((_a.KCt = new BlackScreenFadeView_1.BlackScreenFadeView()),
      _a.KCt.CreateByResourceIdAsync(
        "UiView_BlackFadeScreen_Prefab",
        UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Loading),
        !0,
      ));
  }),
  (BlackScreenFadeController.XCt = () => {
    LevelLoadingController_1.LevelLoadingController.CloseAllBlackScreenLoading(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BlackScreen", 46, "OnAllDead关闭黑幕");
  }),
  (BlackScreenFadeController.CheckCanOpen = (e) => {
    const r = UiConfig_1.UiConfig.TryGetViewInfo(e);
    return !(
      !r ||
      (r.Type === UiLayerType_1.ELayerType.Normal && _a.JCt.has(e))
    );
  }),
  (BlackScreenFadeController.s8s = (e, r) => {
    r &&
      _a.n8s === r &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("BlackScreen", 46, "监听玩法结束销毁黑幕"),
      LevelLoadingController_1.LevelLoadingController.CloseAllBlackScreenLoading());
  });
// # sourceMappingURL=BlackScreenFadeController.js.map
