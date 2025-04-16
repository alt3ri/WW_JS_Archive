"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreDownloadModel = exports.PreDownloadNoView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../Core/Common/Info"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  NetworkDefine_1 = require("../../../Launcher/NetworkDefine"),
  PreDownloadManager_1 = require("../../../Launcher/PreDownload/PreDownloadManager"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  PreDownloadDefine_1 = require("./PreDownloadDefine");
class PreDownloadNoView {
  async UpdatePatchDownProgress(e, r, o, n, t, i) {
    return (
      ModelManager_1.ModelManager.PreDownloadModel?.OnUpdateDownData(
        e,
        r,
        o,
        n,
        t,
        i,
      ),
      new Promise((e) => {
        e();
      })
    );
  }
  async BinPatchProgress(e, r, o, ...n) {
    return (
      ModelManager_1.ModelManager.PreDownloadModel?.OnBinPatch(e, r, o, ...n),
      new Promise((e) => {
        e();
      })
    );
  }
  async ShowDialog(e, r, o, n, t, i, ...a) {
    (r =
      ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(
        r,
      )),
      (o =
        ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(
          o,
          ...a,
        ));
    const s = new CustomPromise_1.CustomPromise();
    return (
      i
        ? ((a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(274)).SetTitle(r),
          a.SetTextArgs(o),
          a.SetBtnText(
            1,
            ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(
              i,
            ),
          ),
          a.FunctionMap.set(1, () => {
            s.SetResult(!0);
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            a,
          ))
        : ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(275)).SetTitle(r),
          i.SetTextArgs(o),
          i.SetBtnText(
            1,
            ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(
              n,
            ),
          ),
          i.SetBtnText(
            2,
            ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(
              t,
            ),
          ),
          i.FunctionMap.set(1, () => {
            s.SetResult(!1);
          }),
          i.FunctionMap.set(2, () => {
            s.SetResult(!0);
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            i,
          )),
      s.Promise
    );
  }
}
exports.PreDownloadNoView = PreDownloadNoView;
class PreDownloadModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.L0c = !1),
      (this.w0c = 0),
      (this.R0c = !1),
      (this.BinPatch = void 0),
      (this.UpdateData = void 0),
      (this.HLc = void 0),
      (this.cso = (e) => {
        var r = PreDownloadManager_1.PreDownloadManager.Get();
        this.IsPreDownloadAvailable() &&
          r.IsDownloading() &&
          e === NetworkDefine_1.ENetworkType.Cell &&
          (this.PausePreDownload(3),
          ControllerHolder_1.ControllerHolder.PreDownloadController.OnCellNetTypeChanged());
      }),
      (this.A0c = () => {
        this.PausePreDownload(2);
      }),
      (this.P0c = () => {
        var e = new LogReportDefine_1.PreDownloadDownloadModeSuccessRecord(
          1 === this.w0c ? 1 : 2,
        );
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e),
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
            "PreDownload_Complete",
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PreDownloadStateUpdate,
          ),
          PreDownloadManager_1.PreDownloadManager.Get().RemoveCompleteEvent(
            this.P0c,
          );
      });
  }
  GetHasStartDownload() {
    return this.L0c;
  }
  SetDownloadMode(e) {
    this.w0c = e;
  }
  GetDownloadMode() {
    return this.w0c;
  }
  OnInit() {
    return this.AddEvents(), (this.HLc = new PreDownloadNoView()), !0;
  }
  OnClear() {
    this.RemoveEvents();
    var e = PreDownloadManager_1.PreDownloadManager.Get();
    return e.RemoveCompleteEvent(this.P0c), e.Stop(), !(this.HLc = void 0);
  }
  AddEvents() {
    ModelManager_1.ModelManager.ReConnectModel.NetworkListener.NetworkChangeDelegate.Add(
      this.cso,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ReConnectSuccess,
        this.A0c,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ReConnectFail,
        this.A0c,
      );
  }
  RemoveEvents() {
    ModelManager_1.ModelManager.ReConnectModel.NetworkListener.NetworkChangeDelegate.Remove(
      this.cso,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ReConnectSuccess,
        this.A0c,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ReConnectFail,
        this.A0c,
      );
  }
  IsPreDownloadAvailable() {
    var e = PreDownloadManager_1.PreDownloadManager.Get();
    return (
      (Info_1.Info.IsMobilePlatform() || Info_1.Info.IsPlayInEditor) &&
      e.IsPreDownloadEnabled()
    );
  }
  IsComplete() {
    return PreDownloadManager_1.PreDownloadManager.Get().IsComplete();
  }
  HasClickBtnCheck() {
    return this.IsPreDownloadAvailable() && !this.L0c;
  }
  StartPreDownload() {
    var e = PreDownloadManager_1.PreDownloadManager.Get(),
      r =
        (this.L0c || e.AddCompleteEvent(this.P0c), (this.L0c = !0), this.D0c());
    r
      ? (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PreDownloadStateUpdate,
        ),
        e.Start(0))
      : (this.B0c(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PreDownloadStateUpdate,
        ));
  }
  ResumePreDownload() {
    var e = PreDownloadManager_1.PreDownloadManager.Get();
    this.L0c
      ? ((this.L0c = !0),
        e.Resume(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PreDownloadStateUpdate,
        ))
      : this.StartPreDownload();
  }
  PausePreDownload(e) {
    0 < e &&
      ((e = new LogReportDefine_1.PreDownloadPauseRecord(e)),
      ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e)),
      PreDownloadManager_1.PreDownloadManager.Get().Stop(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PreDownloadStateUpdate,
      );
  }
  SwitchResumeOrPause() {
    PreDownloadManager_1.PreDownloadManager.Get().IsDownloading()
      ? this.PausePreDownload(1)
      : this.D0c()
        ? this.ResumePreDownload()
        : (this.B0c(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PreDownloadStateUpdate,
          ));
  }
  SwitchDownloadMode() {
    var e;
    0 === this.w0c
      ? UiManager_1.UiManager.IsViewShow("PreDownloadView") &&
        this.SetDownloadMode(1)
      : this.SetDownloadMode(0),
      UiManager_1.UiManager.IsViewShow("PreDownloadView") &&
        ((e = new LogReportDefine_1.PreDownloadDownloadModeSwitchRecord(
          1 === this.w0c ? 1 : 2,
        )),
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PreDownloadStateUpdate,
        ));
  }
  D0c() {
    var e = PreDownloadManager_1.PreDownloadManager.Get(),
      r = UE.KuroLauncherLibrary.GameSavedDir(),
      o = (0, puerts_1.$ref)(0n),
      r =
        (UE.KuroLauncherLibrary.GetTotalAndFreeSpace(r, o),
        (0, puerts_1.$unref)(o));
    return e.GetNeedSpace() + 10n * 1024n * 1024n <= r;
  }
  B0c() {
    var e,
      r = PreDownloadManager_1.PreDownloadManager.Get();
    UiManager_1.UiManager.IsViewShow("PreDownloadView")
      ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(268)),
        (r = (r.GetNeedSpace() / BigInt(1048576)).toString() + "MB"),
        e.SetTextArgs(r),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        ))
      : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          "PreDownload_NoSpace",
        );
  }
  IsBinPatching() {
    return this.R0c;
  }
  ClearView() {
    PreDownloadManager_1.PreDownloadManager.Get().SetView(this.HLc);
  }
  OnUpdateDownData(e, r, o, n, t, i) {
    (this.R0c = !1),
      this.UpdateData ||
        (this.UpdateData = new PreDownloadDefine_1.UpdateDownData()),
      (this.UpdateData.NeedWait = e),
      (this.UpdateData.Rate = r),
      (this.UpdateData.FileName = o),
      (this.UpdateData.SpeedText = n),
      (this.UpdateData.SizeCurrent = t),
      (this.UpdateData.SizeTotal = i);
  }
  OnBinPatch(e, r, o, ...n) {
    this.BinPatch || (this.BinPatch = new PreDownloadDefine_1.BinPatchData()),
      (this.BinPatch.NeedWait = e),
      (this.BinPatch.Rate = r),
      (this.BinPatch.TextId = o),
      (this.BinPatch.Args = n),
      (this.R0c = !0);
  }
}
exports.PreDownloadModel = PreDownloadModel;
//# sourceMappingURL=PreDownloadModel.js.map
