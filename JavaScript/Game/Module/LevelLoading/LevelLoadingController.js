"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelLoadingController = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const LoadingController_1 = require("../Loading/LoadingController");
const WorldMapController_1 = require("../WorldMap/WorldMapController");
const CameraFadeLoading_1 = require("./CameraFadeLoading");
class PendingProcess {
  constructor(e) {
    (this.ProcessType = e),
      (this.ProcessId = 0),
      (this.ProcessId = ++PendingProcess.Id);
  }
}
PendingProcess.Id = 0;
class OpenLoadingProcess extends PendingProcess {
  constructor(e, o, a, ...n) {
    super(0),
      (this.Reason = 0),
      (this.Perform = void 0),
      (this.Callback = void 0),
      (this.Params = void 0),
      (this.Reason = e),
      (this.Perform = o),
      (this.Callback = a),
      (this.Params = n);
  }
}
class CloseLoadingProcess extends PendingProcess {
  constructor(e, o, a) {
    super(1),
      (this.Reason = 0),
      (this.Callback = void 0),
      (this.Duration = 0),
      (this.Reason = e),
      (this.Callback = o),
      (this.Duration = a ?? 1);
  }
}
class LevelLoadingController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      (LevelLoadingController.CameraFade =
        new CameraFadeLoading_1.CameraFadeLoading()),
      (LevelLoadingController.U$t = []),
      !0
    );
  }
  static OnClear() {
    return (
      (LevelLoadingController.CameraFade = void 0),
      !(LevelLoadingController.U$t = void 0)
    );
  }
  static OnTick(e) {
    if (
      LevelLoadingController.U$t &&
      LevelLoadingController.U$t.length !== 0 &&
      !LevelLoadingController.bze
    )
      switch (
        ((LevelLoadingController.bze = LevelLoadingController.U$t[0]),
        LevelLoadingController.bze.ProcessType)
      ) {
        case 0:
          LevelLoadingController.hfi(
            LevelLoadingController.bze.Reason,
            LevelLoadingController.bze.Perform,
            ...LevelLoadingController.bze.Params,
          ).finally(LevelLoadingController.bze.Callback);
          break;
        case 1:
          LevelLoadingController.lfi(
            LevelLoadingController.bze.Reason,
            LevelLoadingController.bze.Duration,
          ).finally(LevelLoadingController.bze.Callback);
      }
  }
  static OpenLoading(e, o, a, ...n) {
    LevelLoadingController.U$t.push(
      new OpenLoadingProcess(
        e,
        o,
        () => {
          LevelLoadingController.HDe(), a?.();
        },
        ...n,
      ),
    );
  }
  static CloseLoading(e, o, a) {
    LevelLoadingController.U$t.push(
      new CloseLoadingProcess(
        e,
        () => {
          LevelLoadingController.HDe(), o?.();
        },
        a,
      ),
    );
  }
  static async WaitOpenLoading(e, o, ...a) {
    const n = new CustomPromise_1.CustomPromise();
    LevelLoadingController.U$t.push(
      new OpenLoadingProcess(
        e,
        o,
        () => {
          LevelLoadingController.HDe(), n.SetResult();
        },
        ...a,
      ),
    ),
      await n.Promise;
  }
  static async WaitCloseLoading(e, o) {
    const a = new CustomPromise_1.CustomPromise();
    LevelLoadingController.U$t.push(
      new CloseLoadingProcess(
        e,
        () => {
          LevelLoadingController.HDe(), a.SetResult();
        },
        o,
      ),
    ),
      await a.Promise;
  }
  static async hfi(e, o, ...a) {
    const n = ModelManager_1.ModelManager.LevelLoadingModel;
    const r = n.GetPerformByReason(e);
    if (void 0 === r) {
      if (
        (n.SetLoadingState(!0),
        n.AddLoadingReason(e, o),
        e === 16 &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.LevelLoadingLockTimeDilation,
          ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Loading", 19, "LevelLoading:打开流程开始", [
            "perfrom",
            o,
          ]),
        !LevelLoadingController._fi(o))
      )
        switch (o) {
          case 1:
            await this.ufi();
            break;
          case 2:
            await this.cfi();
            break;
          case 3:
            await this.mfi(...a);
            break;
          case 0:
            await this.dfi();
        }
      ControllerHolder_1.ControllerHolder.WorldController.ManuallyGarbageCollection(
        4,
      ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Loading", 19, "LevelLoading:打开流程结束", [
            "perfrom",
            o,
          ]);
    }
    return !0;
  }
  static async ufi() {
    const e = new CustomPromise_1.CustomPromise();
    LoadingController_1.LoadingController.OpenLoadingView(void 0, () => {
      e.SetResult(!0), WorldMapController_1.WorldMapController.CloseWorldMap();
    }),
      await e.Promise;
  }
  static async cfi() {
    const e = new CustomPromise_1.CustomPromise();
    LoadingController_1.LoadingController.OpenFadeLoadingView(() => {
      e.SetResult(!0), WorldMapController_1.WorldMapController.CloseWorldMap();
    }),
      await e.Promise;
  }
  static async mfi(e, o, a, n, r) {
    const i = new CustomPromise_1.CustomPromise();
    this.CameraFade.EnterInterlude(e, a, n, r, o, () => {
      i.SetResult(!0);
    }),
      await i.Promise;
  }
  static async dfi() {
    const e = new CustomPromise_1.CustomPromise();
    LoadingController_1.LoadingController.OpenVideoCenterView(() => {
      e.SetResult(!0), WorldMapController_1.WorldMapController.CloseWorldMap();
    }),
      await e.Promise;
  }
  static _fi(e) {
    let o = !1;
    switch (e) {
      case 1:
        o = UiManager_1.UiManager.IsViewOpen("LoadingView");
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
  static async lfi(e, o) {
    const a = ModelManager_1.ModelManager.LevelLoadingModel;
    const n = a.GetPerformByReason(e);
    a.RemoveLoadingReason(e),
      a.CheckCanDoClose(n) &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Loading", 19, "LevelLoading:关闭流程开始"),
        await LevelLoadingController.Cfi(n, o),
        a.CheckLoadingPerformsEmpty() &&
          (a.SetLoadingState(!1), e === 16) &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.LevelLoadingUnlockDilation,
          ),
        Log_1.Log.CheckInfo()) &&
        Log_1.Log.Info("Loading", 19, "LevelLoading:关闭流程结束");
  }
  static async Cfi(e, o) {
    if (LevelLoadingController._fi(e))
      switch (e) {
        case 1:
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Loading", 19, "LevelLoading:关闭Loading界面(开始)"),
            await this.gfi(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Loading",
                19,
                "LevelLoading:关闭Loading界面(完成)",
              );
          break;
        case 2:
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Loading", 19, "LevelLoading:关闭黑幕Loading(开始)"),
            await this.ffi(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Loading",
                19,
                "LevelLoading:关闭黑幕Loading(完成)",
              );
          break;
        case 3:
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Loading", 19, "LevelLoading:相机淡出(开始)"),
            await this.pfi(o),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Loading", 19, "LevelLoading:相机淡出(完成)");
          break;
        case 0:
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Loading",
              19,
              "LevelLoading:关闭黑底白字Loading(开始)",
            ),
            await this.vfi(),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Loading",
                19,
                "LevelLoading:关闭黑底白字Loading(完成)",
              );
      }
  }
  static async gfi() {
    await LoadingController_1.LoadingController.CloseLoadingView();
  }
  static async ffi() {
    const e = new CustomPromise_1.CustomPromise();
    LoadingController_1.LoadingController.CloseFadeLoadingView(() => {
      e.SetResult(!0);
    }),
      await e.Promise;
  }
  static async pfi(e) {
    const o = new CustomPromise_1.CustomPromise();
    this.CameraFade.ExitInterlude(e, () => {
      o.SetResult(!0);
    }),
      await o.Promise;
  }
  static async vfi() {
    const e = new CustomPromise_1.CustomPromise();
    LoadingController_1.LoadingController.CloseVideoCenterView(() => {
      e.SetResult(!0);
    }),
      await e.Promise;
  }
  static CloseAllBlackScreenLoading() {
    LevelLoadingController.CloseLoading(0),
      LevelLoadingController.CloseLoading(3),
      LevelLoadingController.CloseLoading(9),
      LevelLoadingController.CloseLoading(1),
      ModelManager_1.ModelManager.LevelLoadingModel.FinishCameraShowPromise();
  }
}
((exports.LevelLoadingController =
  LevelLoadingController).IsTickEvenPausedInternal = !0),
  (LevelLoadingController.CameraFade = void 0),
  (LevelLoadingController.U$t = void 0),
  (LevelLoadingController.bze = void 0),
  (LevelLoadingController.HDe = () => {
    LevelLoadingController.U$t.shift(), (LevelLoadingController.bze = void 0);
  });
// # sourceMappingURL=LevelLoadingController.js.map
