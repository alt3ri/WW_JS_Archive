"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelLoadingController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  GameAudioController_1 = require("../Audio/GameAudioController"),
  BlackScreenFadeController_1 = require("../BlackScreen/BlackScreenFadeController"),
  LoadingController_1 = require("../Loading/LoadingController"),
  WorldMapController_1 = require("../WorldMap/WorldMapController"),
  CameraFadeLoading_1 = require("./CameraFadeLoading");
class PendingProcess {
  constructor(e) {
    (this.ProcessType = e),
      (this.ProcessId = 0),
      (this.ProcessId = ++PendingProcess.Id);
  }
}
PendingProcess.Id = 0;
class OpenLoadingProcess extends PendingProcess {
  constructor(e, o, r, ...a) {
    super(0),
      (this.Reason = 0),
      (this.Perform = void 0),
      (this.Callback = void 0),
      (this.Params = void 0),
      (this.Reason = e),
      (this.Perform = o),
      (this.Callback = r),
      (this.Params = a);
  }
}
class CloseLoadingProcess extends PendingProcess {
  constructor(e, o, r) {
    super(1),
      (this.Reason = 0),
      (this.Callback = void 0),
      (this.Duration = 0),
      (this.Reason = e),
      (this.Callback = o),
      (this.Duration = r ?? 1);
  }
}
class LevelLoadingController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      (LevelLoadingController.CameraFade =
        new CameraFadeLoading_1.CameraFadeLoading()),
      (LevelLoadingController.UYt = []),
      !0
    );
  }
  static OnClear() {
    return (
      (LevelLoadingController.CameraFade = void 0),
      !(LevelLoadingController.UYt = void 0)
    );
  }
  static OnTick(e) {
    if (
      LevelLoadingController.UYt &&
      0 !== LevelLoadingController.UYt.length &&
      !LevelLoadingController.QZe
    )
      switch (
        ((LevelLoadingController.QZe = LevelLoadingController.UYt[0]),
        LevelLoadingController.QZe.ProcessType)
      ) {
        case 0:
          LevelLoadingController.hpi(
            LevelLoadingController.QZe.Reason,
            LevelLoadingController.QZe.Perform,
            ...LevelLoadingController.QZe.Params,
          ).finally(LevelLoadingController.QZe.Callback);
          break;
        case 1:
          LevelLoadingController.lpi(
            LevelLoadingController.QZe.Reason,
            LevelLoadingController.QZe.Duration,
          ).finally(LevelLoadingController.QZe.Callback);
      }
  }
  static OpenLoading(e, o, r, ...a) {
    LevelLoadingController.UYt.push(
      new OpenLoadingProcess(
        e,
        o,
        () => {
          LevelLoadingController.HDe(), r?.();
        },
        ...a,
      ),
    );
  }
  static CloseLoading(e, o, r) {
    LevelLoadingController.UYt.push(
      new CloseLoadingProcess(
        e,
        () => {
          LevelLoadingController.HDe(), o?.();
        },
        r,
      ),
    );
  }
  static async WaitOpenLoading(e, o, ...r) {
    const a = new CustomPromise_1.CustomPromise();
    LevelLoadingController.UYt.push(
      new OpenLoadingProcess(
        e,
        o,
        () => {
          LevelLoadingController.HDe(), a.SetResult();
        },
        ...r,
      ),
    ),
      await a.Promise;
  }
  static async WaitCloseLoading(e, o) {
    const r = new CustomPromise_1.CustomPromise();
    LevelLoadingController.UYt.push(
      new CloseLoadingProcess(
        e,
        () => {
          LevelLoadingController.HDe(), r.SetResult();
        },
        o,
      ),
    ),
      await r.Promise;
  }
  static async hpi(e, o, ...r) {
    var a = ModelManager_1.ModelManager.LevelLoadingModel,
      n = a.GetPerformByReason(e);
    if (void 0 === n) {
      a.SetLoadingState(!0),
        a.AddLoadingReason(e, o),
        15 === e &&
          ((this.Xpl = !0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RogueLevelLoadingLockTimeDilation,
          )),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Loading", 18, "LevelLoading:打开流程开始", [
            "perfrom",
            o,
          ]),
        GameAudioController_1.GameAudioController.UpdateLoadingType(o);
      n = LevelLoadingController._pi(o);
      if (n)
        3 === o &&
          !0 === (a = r)[5] &&
          BlackScreenFadeController_1.BlackScreenFadeController.ChangeColorByForce(
            a[1],
          );
      else
        switch (
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Loading", 45, "LevelLoading:打开流程准备开启黑幕", [
              "perfrom",
              o,
            ]),
          o)
        ) {
          case 1:
            await this.upi();
            break;
          case 2:
            await this.cpi();
            break;
          case 3:
            await this.mpi(...r);
            break;
          case 0:
            await this.Cpi();
        }
      ControllerHolder_1.ControllerHolder.WorldController.ManuallyGarbageCollection(
        4,
      ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Loading", 18, "LevelLoading:打开流程结束", [
            "perfrom",
            o,
          ]);
    }
    return !0;
  }
  static async upi() {
    const e = new CustomPromise_1.CustomPromise();
    LoadingController_1.LoadingController.OpenLoadingView(void 0, () => {
      e.SetResult(!0), WorldMapController_1.WorldMapController.CloseWorldMap();
    }),
      await e.Promise;
  }
  static async cpi() {
    const e = new CustomPromise_1.CustomPromise();
    LoadingController_1.LoadingController.OpenFadeLoadingView(() => {
      e.SetResult(!0), WorldMapController_1.WorldMapController.CloseWorldMap();
    }),
      await e.Promise;
  }
  static async mpi(e, o, r, a, n, i) {
    const t = new CustomPromise_1.CustomPromise();
    this.CameraFade.EnterInterlude(e, r, a, n, o, () => {
      t.SetResult(!0);
    }),
      await t.Promise;
  }
  static async Cpi() {
    const e = new CustomPromise_1.CustomPromise();
    LoadingController_1.LoadingController.OpenVideoCenterView(() => {
      e.SetResult(!0), WorldMapController_1.WorldMapController.CloseWorldMap();
    }),
      await e.Promise;
  }
  static _pi(e) {
    let o = !1;
    switch (e) {
      case 1:
        o = ModelManager_1.ModelManager.LoadingModel.IsLoadingView;
        break;
      case 2:
        o = UiManager_1.UiManager.IsViewOpen("FadeLoadingView");
        break;
      case 3:
        o = this.CameraFade.IsInFade();
        break;
      case 0:
        o = UiManager_1.UiManager.IsViewOpen("PlotTransitionView");
    }
    return o;
  }
  static async lpi(e, o) {
    var r = ModelManager_1.ModelManager.LevelLoadingModel,
      a = r.GetPerformByReason(e);
    r.RemoveLoadingReason(e),
      r.CheckCanDoClose(a) &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Loading", 18, "LevelLoading:关闭流程开始"),
        await LevelLoadingController.gpi(a, o),
        r.CheckLoadingPerformsEmpty() &&
          (r.SetLoadingState(!1), this.Xpl) &&
          ((this.Xpl = !1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RogueLevelLoadingUnlockTimeDilation,
          )),
        GameAudioController_1.GameAudioController.UpdateLoadingType(void 0),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("Loading", 18, "LevelLoading:关闭流程结束");
  }
  static async gpi(e, o) {
    if (LevelLoadingController._pi(e))
      switch (e) {
        case 1:
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Loading", 18, "LevelLoading:关闭Loading界面(开始)"),
            await this.fpi(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Loading",
                18,
                "LevelLoading:关闭Loading界面(完成)",
              );
          break;
        case 2:
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Loading", 18, "LevelLoading:关闭黑幕Loading(开始)"),
            await this.ppi(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Loading",
                18,
                "LevelLoading:关闭黑幕Loading(完成)",
              );
          break;
        case 3:
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Loading", 18, "LevelLoading:相机淡出(开始)"),
            await this.vpi(o),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Loading", 18, "LevelLoading:相机淡出(完成)");
          break;
        case 0:
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Loading",
              18,
              "LevelLoading:关闭黑底白字Loading(开始)",
            ),
            await this.Mpi(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Loading",
                18,
                "LevelLoading:关闭黑底白字Loading(完成)",
              );
      }
  }
  static async fpi() {
    await LoadingController_1.LoadingController.CloseLoadingView();
  }
  static async ppi() {
    const e = new CustomPromise_1.CustomPromise();
    LoadingController_1.LoadingController.CloseFadeLoadingView(() => {
      e.SetResult(!0);
    }),
      await e.Promise;
  }
  static async vpi(e) {
    const o = new CustomPromise_1.CustomPromise();
    this.CameraFade.ExitInterlude(e, () => {
      o.SetResult(!0);
    }),
      await o.Promise;
  }
  static async Mpi() {
    const e = new CustomPromise_1.CustomPromise();
    LoadingController_1.LoadingController.CloseVideoCenterView(() => {
      e.SetResult(!0);
    }),
      await e.Promise;
  }
  static CloseAllBlackScreenLoading() {
    LevelLoadingController.CloseLoading(0),
      LevelLoadingController.CloseLoading(2),
      LevelLoadingController.CloseLoading(8),
      ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraShowPromise();
  }
}
((exports.LevelLoadingController =
  LevelLoadingController).IsTickEvenPausedInternal = !0),
  (LevelLoadingController.CameraFade = void 0),
  (LevelLoadingController.UYt = void 0),
  (LevelLoadingController.QZe = void 0),
  (LevelLoadingController.Xpl = !1),
  (LevelLoadingController.HDe = () => {
    LevelLoadingController.UYt.shift(), (LevelLoadingController.QZe = void 0);
  });
//# sourceMappingURL=LevelLoadingController.js.map
