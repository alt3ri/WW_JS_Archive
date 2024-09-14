"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LoadingView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon"),
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
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoadingShowData_1 = require("../Data/LoadingShowData"),
  LoadingDefine_1 = require("../LoadingDefine");
class LoadingView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Uvi = 0),
      (this.Avi = void 0),
      (this.Pvi = void 0),
      (this.xvi = void 0),
      (this.wvi = !1),
      (this.fla = void 0),
      (this.Bvi = () => {
        this.bvi();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UIButtonComponent],
      [5, UE.UIText],
      [6, UE.UISprite],
      [7, UE.UILayoutBase],
    ]),
      (this.BtnBindInfo = [[4, this.Bvi]]);
  }
  OnStartImplementImplement() {
    InputManager_1.InputManager.SetShowCursor(!0),
      ModelManager_1.ModelManager.LoadingModel.SetIsLoadingView(!0),
      ModelManager_1.ModelManager.LoadingModel.SetIsLoading(!0),
      AudioSystem_1.AudioSystem.PostEvent(LoadingDefine_1.MUSIC_EVENT),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Audio", 57, "[Game.Loading] Loading 音乐播放");
  }
  OnStart() {
    var e;
    (this.Pvi = this.GetTexture(0)),
      (this.xvi = this.GetText(5)),
      (this.Avi = new LoadingShowData_1.LoadingShowData()),
      this.Avi.Initialize(),
      this.RootItem?.SetAlpha(1),
      this.qvi(),
      this.bvi(),
      this.Gvi(),
      this.Nvi(),
      HotFixSceneManager_1.HotFixSceneManager.StopHotPatchBgm(),
      ModelManager_1.ModelManager.LoginModel.HasBackToGameData() &&
        ((e = ModelManager_1.ModelManager.LoginModel.GetBackToGameData()),
        (this.fla = new BackToGameDefine_1.BackToGameLoadingViewData()),
        (this.fla.LoadingWidget = e.LoadingWidget),
        this.fla.RebootFinished(),
        ModelManager_1.ModelManager.LoginModel.RemoveBackToGameData());
  }
  OnAfterShow() {
    this.Ovi(), this.fla && this.GetRootItem().SetUIActive(!1);
  }
  OnTick(e) {
    e /= TimeUtil_1.TimeUtil.InverseMillisecond;
    this.kvi(e),
      (this.Uvi += e),
      this.Uvi >= ModelManager_1.ModelManager.LoadingModel.TipTime &&
        this.bvi();
  }
  kvi(e) {
    var i = ModelManager_1.ModelManager.LoadingModel,
      t = i.CurrentProgress + i.Speed * i.SpeedRate * e,
      t = Math.min(t, i.NextProgress),
      e = (i.CurrentProgress = t) / MathCommon_1.MathCommon.ProgressTotalValue;
    for (
      this.Pvi.SetFillAmount(e), this.Qbe(t), this.fla?.SetProgress(e);
      i.ReachHandleQueue.Size;

    ) {
      var a = i.ReachHandleQueue.Front;
      if (a[0] > t) break;
      i.ReachHandleQueue.Pop(),
        a[1](),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Loading", 17, "TickProgress", ["progress", t]);
    }
    !this.wvi &&
      t >= MathCommon_1.MathCommon.ProgressTotalValue &&
      ((this.wvi = !0),
      UiManager_1.UiManager.CloseView(this.Info.Name),
      this.fla?.Close(),
      (this.fla = void 0));
  }
  qvi() {
    var e = ConfigManager_1.ConfigManager.LoadingConfig.GetBroadcastImageConfig(
      this.Avi.GetImageId(),
    );
    ModelManager_1.ModelManager.LoadingModel.SetLoadingTexturePath(e.Image),
      this.SetTextureByPath(e.Image, this.GetTexture(3), this.Info.Name);
  }
  Gvi() {
    var e = ConfigManager_1.ConfigManager.LoadingConfig.GetBroadcastImageConfig(
      this.Avi.GetImageId(),
    );
    this.SetSpriteByPath(e.Icon, this.GetSprite(6), !0, this.Info.Name);
  }
  Ovi() {
    const e = this.GetLayoutBase(7);
    e?.GetRootComponent()?.SetAlpha(0),
      e?.OnLateUpdate.Bind(() => {
        e?.OnLateUpdate.Unbind(), e?.GetRootComponent()?.SetAlpha(1);
      });
  }
  bvi() {
    this.Uvi = 0;
    var e = this.Avi.GetNextTip();
    e &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.TipsText),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Title),
      ModelManager_1.ModelManager.LoadingModel.SetLoadingTitle(e.Title),
      ModelManager_1.ModelManager.LoadingModel.SetLoadingTips(e.TipsText));
  }
  Nvi() {
    var e =
      ModelManager_1.ModelManager.LoadingModel.CurrentProgress /
      MathCommon_1.MathCommon.ProgressTotalValue;
    this.Pvi.SetFillAmount(e),
      this.Qbe(ModelManager_1.ModelManager.LoadingModel.CurrentProgress),
      this.fla?.SetProgress(e);
  }
  Qbe(e) {
    e = Math.round(e);
    this.xvi.SetText(e.toString());
  }
  OnBeforeDestroyImplement() {
    AudioSystem_1.AudioSystem.ExecuteAction(LoadingDefine_1.MUSIC_EVENT, 0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Audio", 57, "[Game.Loading] Loading 音乐停止");
    var e = ModelManager_1.ModelManager.LoadingModel;
    if (e)
      for (
        e.SetIsLoading(!1),
          e.SetIsLoadingView(!1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCursor,
          );
        e.ReachHandleQueue.Size;

      )
        e.ReachHandleQueue.Pop()[1](),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Loading", 17, "OnBeforeDestroyImplement", [
              "loadingModel.ReachHandleQueue.Size",
              e.ReachHandleQueue.Size,
            ]);
  }
  OnAfterDestroy() {
    this.fla?.Close();
  }
}
exports.LoadingView = LoadingView;
//# sourceMappingURL=LoadingView.js.map
