"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VoiceLanguageToggle = exports.VoiceLanguageDownloadView = void 0);
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  NetworkDefine_1 = require("../../../../Launcher/NetworkDefine"),
  ResourceUpdateView_1 = require("../../../../Launcher/Ui/HotFix/ResourceUpdateView"),
  AppUtil_1 = require("../../../../Launcher/Update/AppUtil"),
  LanguageUpdateManager_1 = require("../../../../Launcher/Update/LanguageUpdateManager"),
  LauncherTextLib_1 = require("../../../../Launcher/Util/LauncherTextLib"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  MenuTool_1 = require("../MenuTool"),
  LanguageSettingViewBase_1 = require("./LanguageSettingViewBase");
class VoiceLanguageDownloadView extends LanguageSettingViewBase_1.LanguageSettingViewBase {
  constructor() {
    super(...arguments),
      (this.wBi = !1),
      (this.BBi = () => {
        this.RefreshUiBySelect(this.SelectedToggle);
      }),
      (this.bBi = () => {
        this.CloseMe();
      }),
      (this.qBi = () => {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "InUseCanNotDelete",
        );
      }),
      (this.GBi = () => {
        let e = void 0;
        switch (this.SelectedToggle.Updater.Status) {
          case 2:
            (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(72)).SetTextArgs(
              this.SelectedToggle.GetMainText(),
            ),
              e.FunctionMap.set(2, () => {
                this.SelectedToggle.Updater.Delete(
                  GlobalData_1.GlobalData.World,
                ),
                  this.RefreshUiBySelect(this.SelectedToggle);
              });
            break;
          case 0:
          case 1:
            var t;
            this.SelectedToggle.Updater.IsDownloading
              ? (this.SelectedToggle.Updater.Pause(),
                this.RefreshUiBySelect(this.SelectedToggle))
              : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  AppUtil_1.AppUtil.GetNetworkConnectionType() ===
                  NetworkDefine_1.ENetworkType.Cell
                    ? 70
                    : 71,
                )),
                (t =
                  this.SelectedToggle.Updater.TotalDiskSize -
                  this.SelectedToggle.Updater.LocalDiskSize),
                (t = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(t)),
                e.SetTextArgs(this.SelectedToggle.GetMainText(), t),
                e.FunctionMap.set(2, () => {
                  this.SelectedToggle.Updater.Update(
                    this.SelectedToggle,
                    GlobalData_1.GlobalData.World,
                  ).then(
                    () => {
                      Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "HotPatch",
                          31,
                          `Language ${this.SelectedToggle.Updater.LanguageCode} download success`,
                        ),
                        this.RefreshUiBySelect(this.SelectedToggle);
                    },
                    () => {
                      Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "HotPatch",
                          31,
                          `Language ${this.SelectedToggle.Updater.LanguageCode} download fail`,
                        ),
                        this.RefreshUiBySelect(this.SelectedToggle);
                    },
                  ),
                    this.RefreshUiBySelect(this.SelectedToggle);
                }));
        }
        e &&
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      });
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
  }
  OnStart() {
    super.OnStart(),
      this.CancelButton.SetFunction(this.bBi),
      this.ConfirmButton.SetFunction(this.GBi);
  }
  OnBeforeDestroy() {
    this.wBi = !0;
  }
  CreateToggle(e, t, i) {
    var a = new VoiceLanguageToggle();
    return a.Initialize(e, t, i), a;
  }
  OnRefreshView(e) {
    var t = this.MenuDataIns.OptionsNameList[e.GetIndex()];
    e.SetMainText(t), e.SetDownloadStatusCallback(this.BBi);
  }
  InitScrollViewData() {
    var e =
      LanguageUpdateManager_1.LanguageUpdateManager.GetAllLanguageTypeForAudio();
    this.ScrollView.RefreshByData(e.sort((e, t) => e - t));
  }
  OnAfterShow() {
    this.SelectedToggle && this.NBi(this.SelectedToggle);
  }
  NBi(e) {
    e = e.GetUpdater();
    void 0 !== e &&
      (e.IsDownloading
        ? this.ConfirmButton.SetLocalText("PauseDownload")
        : 2 !== e.Status && this.ConfirmButton.SetLocalText("DownloadLanguage"),
      2 === e.Status && this.ConfirmButton.SetLocalText("DeleteLanguage"),
      2 === e.Status &&
      e.LanguageCode === LanguageSystem_1.LanguageSystem.PackageAudio
        ? this.ConfirmButton.SetFunction(this.qBi)
        : this.ConfirmButton.SetFunction(this.GBi));
  }
  OnSelected(e, t) {
    this.RefreshUiBySelect(e);
  }
  RefreshUiBySelect(e) {
    this.wBi || (this.NBi(e), e.RefreshUi());
  }
}
exports.VoiceLanguageDownloadView = VoiceLanguageDownloadView;
class LanguageDownloadTips extends ResourceUpdateView_1.ResourceUpdateViewBase {
  constructor(e, t) {
    super(),
      (this.OBi = void 0),
      (this.kBi = ""),
      (this.OBi = e),
      (this.kBi = t);
  }
  UpdatePatchProgress(e, t, i, a) {
    this.OBi
      ? t === i &&
        (this.OBi.CalculateDownloadStatus(), 2 === this.OBi.Status) &&
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "LanguageDownloadFinished",
          this.kBi,
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "HotPatch",
          8,
          "UpdatePatchProgress时，找不到对应的LanguageUpdater",
        );
  }
}
class VoiceLanguageToggle extends LanguageSettingViewBase_1.LanguageToggleBase {
  constructor() {
    super(...arguments),
      (this.IRn = void 0),
      (this.Updater = void 0),
      (this.FBi = void 0);
  }
  async ShowNotEnoughSpaceConfirmation(a) {
    return new Promise((e) => {
      var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(81),
        i = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(a);
      t.SetTextArgs(i),
        t.FunctionMap.set(2, () => {
          e(!0);
        }),
        t.FunctionMap.set(1, () => {
          e(!1);
        }),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          t,
        );
    });
  }
  UpdatePatchProgress(e, t, i, a) {
    this.Updater
      ? (this.VBi(t, i, a),
        t === i && (this.Updater.CalculateDownloadStatus(), this.FBi?.()))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "HotPatch",
          8,
          "UpdatePatchProgress时，找不到对应的LanguageUpdater",
          ["languageCode", this.IRn],
        );
  }
  SetDownloadStatusCallback(e) {
    this.FBi = e;
  }
  RefreshUi() {
    var i,
      a,
      s = this.GetText(2);
    if (this.Updater) {
      if ((s.SetUIActive(!0), !this.Updater.IsDownloading)) {
        let e = StringUtils_1.EMPTY_STRING,
          t = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(
            this.Updater.TotalDiskSize,
          );
        this.Updater.LanguageCode ===
        LanguageSystem_1.LanguageSystem.PackageAudio
          ? (e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("InUse"))
          : 1 === this.Updater.Status
            ? ((e =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "Pausing",
                )),
              (i = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(
                this.Updater.LocalDiskSize,
              )),
              (a = t),
              this.ProgressBuilder.Clear(),
              this.ProgressBuilder.Append(i, StringUtils_1.SLASH_STRING, a),
              (t = this.ProgressBuilder.ToString()))
            : 0 === this.Updater.Status &&
              ((e =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "NotDownloaded",
                )),
              (t = StringUtils_1.EMPTY_STRING)),
          this.ProgressBuilder.Clear(),
          this.ProgressBuilder.Append(e, StringUtils_1.TAB_STRING, t),
          s.SetText(this.ProgressBuilder.ToString());
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "HotPatch",
          8,
          "RefreshUi时，找不到对应的LanguageUpdater",
          ["languageCode", this.IRn],
        ),
        s.SetUIActive(!1);
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
  }
  OnStart() {
    super.OnStart(),
      (this.IRn = MenuTool_1.MenuTool.GetAudioCodeById(this.Index)),
      this.IRn
        ? ((this.Updater =
            LanguageUpdateManager_1.LanguageUpdateManager.GetUpdater(this.IRn)),
          this.Updater
            ? (this.Updater.UpdateView.SetImplement(this),
              this.Updater.CalculateDownloadStatus(),
              this.RefreshUi())
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "HotPatch",
                8,
                "创建VoiceLanguageToggle时，找不到对应的LanguageUpdater",
                ["languageCode", this.IRn],
              ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "HotPatch",
            8,
            "创建VoiceLanguageToggle时，找不到对应的语言配置",
            ["Index", this.Index],
          );
  }
  GetUpdater() {
    var e = MenuTool_1.MenuTool.GetAudioCodeById(this.Index);
    return LanguageUpdateManager_1.LanguageUpdateManager.GetUpdater(e);
  }
  VBi(e, t, i) {
    (e = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(e)),
      (t = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(t)),
      (i = LauncherTextLib_1.LauncherTextLib.SpaceSizeFormat(i)),
      (e = StringUtils_1.StringUtils.Format(e, StringUtils_1.SLASH_STRING, t));
    this.ProgressBuilder.Clear(),
      this.ProgressBuilder.Append(i, StringUtils_1.SLASH_STRING, e),
      this.GetText(2).SetText(this.ProgressBuilder.ToString());
  }
  OnBeforeDestroy() {
    this.Updater
      ? (this.Updater.UpdateView.SetImplement(void 0),
        this.Updater.UpdateView.SetImplement(
          new LanguageDownloadTips(this.Updater, this.GetMainText()),
        ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "HotPatch",
          8,
          "销毁VoiceLanguageToggle时，找不到对应的LanguageUpdater",
          ["languageCode", this.IRn],
        );
  }
}
exports.VoiceLanguageToggle = VoiceLanguageToggle;
//# sourceMappingURL=VoiceLanguageDownloadView.js.map
