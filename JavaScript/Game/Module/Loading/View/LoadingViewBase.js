"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoadingViewBase = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
  BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController"),
  HotFixSceneManager_1 = require("../../../../Launcher/Ui/HotFix/HotFixSceneManager"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InputManager_1 = require("../../../Ui/Input/InputManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  BackToGameDefine_1 = require("../../Login/BackToGameDefine"),
  LoadingShowData_1 = require("../Data/LoadingShowData");
class LoadingViewBase extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Uvi = 0),
      (this.ShowData = void 0),
      (this.wvi = !1),
      (this.fla = void 0),
      (this.K11 = (e) => {
        this.OnLevelSequencePlayerBandStateChange(e);
      });
  }
  OnBeforeCreate() {
    ModelManager_1.ModelManager.LoadingModel.SetIsLoadingView(!0);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LevelSequencePlayerBandStateChange,
      this.K11,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LevelSequencePlayerBandStateChange,
      this.K11,
    );
  }
  OnStartImplementImplement() {
    InputManager_1.InputManager.SetShowCursor(!0);
  }
  kAc() {
    (this.ShowData = new LoadingShowData_1.LoadingShowData()),
      this.ShowData.Initialize();
    let e = ConfigManager_1.ConfigManager.LoadingConfig.GetBroadcastImageConfig(
      this.ShowData.GetImageId(),
    ).Image;
    BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip() &&
      (e =
        "/Game/Aki/UI/UIResources/Common/Image/BgCg/T_Bgloadin10_UI.T_Bgloadin10_UI"),
      ModelManager_1.ModelManager.LoadingModel.SetLoadingTexturePath(e),
      this.UpdateBgUi(e);
  }
  UpdateBgUi(e) {}
  OnStart() {
    var e;
    HotFixSceneManager_1.HotFixSceneManager.StopHotPatchBgm(),
      this.kAc(),
      this.Nvi(),
      this.ChangeShowTips(),
      ModelManager_1.ModelManager.LoginModel.HasBackToGameData() &&
        ((e = ModelManager_1.ModelManager.LoginModel.GetBackToGameData()),
        (this.fla = new BackToGameDefine_1.BackToGameLoadingViewData()),
        (this.fla.LoadingWidget = e.LoadingWidget),
        this.fla.RebootFinished(),
        ModelManager_1.ModelManager.LoginModel.RemoveBackToGameData());
  }
  ChangeShowTips() {
    this.Uvi = 0;
    var e = this.ShowData.GetNextTip();
    e &&
      (ModelManager_1.ModelManager.LoadingModel.SetLoadingTitle(e.Title),
      ModelManager_1.ModelManager.LoadingModel.SetLoadingTips(e.TipsText),
      this.UpdateShowTipsUi(e.Title, e.TipsText));
  }
  UpdateShowTipsUi(e, i) {}
  OnAfterShow() {
    this.fla && this.GetRootItem().SetUIActive(!1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.LoadingViewOnAfterShow,
      );
  }
  OnTick(e) {
    e /= TimeUtil_1.TimeUtil.InverseMillisecond;
    this.kvi(e),
      (this.Uvi += e),
      this.Uvi >= ModelManager_1.ModelManager.LoadingModel.TipTime &&
        this.ChangeShowTips();
  }
  kvi(e) {
    if (!this.wvi) {
      var i = ModelManager_1.ModelManager.LoadingModel,
        t = MathCommon_1.MathCommon.ProgressTotalValue,
        e = i.CurrentProgress + i.Speed * i.SpeedRate * e,
        a = Math.min(e, i.NextProgress),
        e = a / t;
      for (i.CurrentProgress = a, this.cEo(e, a); i.ReachHandleQueue.Size; ) {
        var n = i.ReachHandleQueue.Front;
        if (n[0] > a) break;
        i.ReachHandleQueue.Pop(),
          n[1](),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Loading", 16, "TickProgress", ["progress", a]);
      }
      !this.wvi &&
        t <= a &&
        ((this.wvi = !0),
        UiManager_1.UiManager.CloseView(this.Info.Name),
        this.fla?.Close(),
        (this.fla = void 0));
    }
  }
  Nvi() {
    var e = ModelManager_1.ModelManager.LoadingModel.CurrentProgress,
      i = e / MathCommon_1.MathCommon.ProgressTotalValue;
    this.cEo(i, e);
  }
  cEo(e, i) {
    this.fla?.SetProgress(e),
      this.UpdateProgressRate(e),
      this.UpdateProgressValue(i);
  }
  OnLevelSequencePlayerBandStateChange(e) {}
  OnBeforeDestroyImplement() {
    var e = ModelManager_1.ModelManager.LoadingModel;
    if (e)
      for (
        e.SetIsLoadingView(!1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCursor,
          );
        e.ReachHandleQueue.Size;

      )
        e.ReachHandleQueue.Pop()[1](),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Loading", 16, "OnBeforeDestroyImplement", [
              "loadingModel.ReachHandleQueue.Size",
              e.ReachHandleQueue.Size,
            ]);
  }
  OnAfterDestroy() {
    this.fla?.Close();
  }
  SetTextProgressValue(e, i, t = "") {
    i = Math.round(i);
    this.GetText(e).SetText("" + i + t);
  }
  SetTextureProgressRate(e, i) {
    this.GetTexture(e).SetFillAmount(i);
  }
}
exports.LoadingViewBase = LoadingViewBase;
//# sourceMappingURL=LoadingViewBase.js.map
