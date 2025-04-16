"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreDownloadView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Time_1 = require("../../../Core/Common/Time"),
  NetworkDefine_1 = require("../../../Launcher/NetworkDefine"),
  PreDownloadManager_1 = require("../../../Launcher/PreDownload/PreDownloadManager"),
  LauncherLog_1 = require("../../../Launcher/Util/LauncherLog"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  PreDownloadDefine_1 = require("./PreDownloadDefine"),
  BTN_INTERVAL = 1e3;
class PreDownloadView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.L6e = void 0),
      (this.nn1 = 0),
      (this.Qz = ""),
      (this.sn1 = ""),
      (this.an1 = ""),
      (this.I5t = () => {
        var e;
        PreDownloadManager_1.PreDownloadManager.Get().IsDownloading()
          ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              307,
            )).FunctionMap.set(2, () => {
              ControllerHolder_1.ControllerHolder.PreDownloadController.ClosePreDownloadView();
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            ))
          : ControllerHolder_1.ControllerHolder.PreDownloadController.ClosePreDownloadView();
      }),
      (this.O0c = () => {
        var e;
        !PreDownloadManager_1.PreDownloadManager.Get().IsComplete() &&
          ((e = BTN_INTERVAL), !this.L6e || Time_1.Time.Now - this.L6e >= e) &&
          ((this.L6e = Time_1.Time.Now),
          ModelManager_1.ModelManager.PreDownloadModel.SwitchResumeOrPause());
      }),
      (this.q0c = (e = !1) => {
        var o = PreDownloadManager_1.PreDownloadManager.Get(),
          r = o.IsComplete(),
          n = this.GetText(7),
          o = o.IsDownloading();
        if (
          (LauncherLog_1.LauncherLog.Info(
            "get pre download state update",
            ["is complete", r],
            ["is downloading", o],
          ),
          r)
        ) {
          const i = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
            PreDownloadDefine_1.COMPLETE_TXT,
          );
          n?.SetText(i),
            void this.UpdatePatchDownProgress(
              !1,
              this.nn1,
              "",
              "0B/s",
              this.an1,
              this.an1,
            ).then(() => {
              var e =
                ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
                  PreDownloadDefine_1.COMPLETE_TXT,
                );
              this.GetText(6)?.SetText(e);
            });
        } else {
          const i = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
            o
              ? PreDownloadDefine_1.PAUSING_TXT
              : PreDownloadDefine_1.DOWNLOADING_TXT,
          );
          n?.SetText(i),
            e ||
              o ||
              ModelManager_1.ModelManager.PreDownloadModel.IsBinPatching() ||
              this.UpdatePatchDownProgress(
                !1,
                this.nn1,
                this.Qz,
                "0B/s",
                this.sn1,
                this.an1,
              );
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UITexture],
      [6, UE.UIText],
      [7, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this.I5t],
        [1, this.O0c],
      ]);
  }
  OnStart() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      PreDownloadDefine_1.PREVIEW_BGID,
    );
    this.SetTextureByPath(e, this.GetTexture(5)),
      PreDownloadManager_1.PreDownloadManager.Get().SetView(this);
  }
  OnBeforeShow() {
    (this.L6e = void 0), this.G0c();
  }
  OnAfterShow() {
    PreDownloadManager_1.PreDownloadManager.Get().IsDownloading() ||
      (UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
      NetworkDefine_1.ENetworkType.Cell
        ? ControllerHolder_1.ControllerHolder.PreDownloadController.OnCellNetTypeChanged()
        : ModelManager_1.ModelManager.PreDownloadModel.GetHasStartDownload() ||
          (ModelManager_1.ModelManager.PreDownloadModel.StartPreDownload(),
          this.q0c()));
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.PreDownloadModel.ClearView();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PreDownloadStateUpdate,
      this.q0c,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PreDownloadStateUpdate,
      this.q0c,
    );
  }
  async UpdatePatchDownProgress(e, o, r, n, i, a) {
    var t = PreDownloadManager_1.PreDownloadManager.Get().IsDownloading(),
      e =
        (ModelManager_1.ModelManager.PreDownloadModel?.OnUpdateDownData(
          e,
          o,
          r,
          t ? n : "0B/s",
          i,
          a,
        ),
        (this.nn1 = o),
        (this.Qz = r),
        (this.sn1 = i),
        (this.an1 = a),
        ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
          t ? "PreDownload_Downloading" : "PreDownload_IsPausing",
        ));
    this.GetText(6)?.SetText(e), this.GetTexture(2)?.SetFillAmount(o);
    this.GetText(4)?.SetText(r);
    e = `${t ? n : "0B/s"}(${i}/${a})  ${(100 * o).toFixed(2).toString()}%`;
    return (
      this.GetText(3)?.SetText(e),
      new Promise((e) => {
        e();
      })
    );
  }
  async BinPatchProgress(e, o, r, ...n) {
    ModelManager_1.ModelManager.PreDownloadModel?.OnBinPatch(e, o, r, ...n),
      (this.nn1 = o);
    e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
      "PreDownload_BinPatch",
    );
    this.GetText(6)?.SetText(e), this.GetTexture(2)?.SetFillAmount(o);
    this.GetText(4)?.SetText("");
    r = (100 * o).toFixed(2).toString() + "%";
    return (
      this.GetText(3)?.SetText(r),
      new Promise((e) => {
        e();
      })
    );
  }
  async ShowDialog(e, o, r, n, i, a, ...t) {
    if (
      (LauncherLog_1.LauncherLog.Info("PreDownload Get ShowDialog with ", [
        "contentId",
        r,
      ]),
      LauncherLog_1.LauncherLog.Info("PreDownload Get ShowDialog with Args", [
        "contentId",
        t,
      ]),
      "HotFixUseNetworkDownload" === i)
    )
      return PreDownloadManager_1.PreDownloadManager.Get().IsDownloading();
    (o =
      ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(
        o,
      )),
      (t =
        ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(
          r,
          ...t,
        ));
    const s = new CustomPromise_1.CustomPromise();
    var r = "HotFixNotEnoughSpace" === r;
    return (
      ModelManager_1.ModelManager.PreDownloadModel.PausePreDownload(r ? 4 : 3),
      a
        ? ((r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(274)).SetTitle(o),
          r.SetTextArgs(t),
          r.SetBtnText(
            0,
            ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(
              a,
            ),
          ),
          r.FunctionMap.set(1, () => {
            s.SetResult(!0);
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            r,
          ))
        : ((a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(275)).SetTitle(o),
          a.SetTextArgs(t),
          a.SetBtnText(
            0,
            ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(
              n,
            ),
          ),
          a.SetBtnText(
            1,
            ControllerHolder_1.ControllerHolder.PreDownloadController.GetLocalText(
              i,
            ),
          ),
          a.FunctionMap.set(1, () => {
            s.SetResult(!1),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.PreDownloadStateUpdate,
              );
          }),
          a.FunctionMap.set(2, () => {
            s.SetResult(!0),
              ModelManager_1.ModelManager.PreDownloadModel.ResumePreDownload();
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            a,
          )),
      s.Promise
    );
  }
  G0c() {
    this.q0c(!0);
    var e,
      o = ModelManager_1.ModelManager.PreDownloadModel.IsBinPatching(),
      r = this.GetText(6),
      n = this.GetTexture(2),
      i = this.GetText(4),
      a = this.GetText(3);
    o && ModelManager_1.ModelManager.PreDownloadModel.BinPatch
      ? ((o = ModelManager_1.ModelManager.PreDownloadModel.BinPatch),
        (e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(
          "PreDownload_BinPatch",
        )),
        r?.SetText(e),
        n?.SetFillAmount(o.Rate),
        i?.SetText(""),
        (e = (100 * o.Rate).toFixed(2).toString() + "%"),
        a?.SetText(e))
      : ModelManager_1.ModelManager.PreDownloadModel.UpdateData
        ? ((o = ModelManager_1.ModelManager.PreDownloadModel.UpdateData),
          this.UpdatePatchDownProgress(
            !1,
            o.Rate,
            o.FileName,
            o.SpeedText,
            o.SizeCurrent,
            o.SizeTotal,
          ))
        : (r?.SetText(""), n?.SetFillAmount(0), i?.SetText(""), a?.SetText(""));
  }
}
exports.PreDownloadView = PreDownloadView;
//# sourceMappingURL=PreDownloadView.js.map
