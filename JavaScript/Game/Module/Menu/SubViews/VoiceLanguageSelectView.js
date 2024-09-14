"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VoiceLanguageSelectToggle = exports.VoiceLanguageSelectView =
    void 0);
const LanguageUpdateManager_1 = require("../../../../Launcher/Update/LanguageUpdateManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MenuTool_1 = require("../MenuTool"),
  LanguageSettingViewBase_1 = require("./LanguageSettingViewBase");
class VoiceLanguageSelectView extends LanguageSettingViewBase_1.LanguageSettingViewBase {
  constructor() {
    super(...arguments),
      (this.bBi = () => {
        this.CloseMe();
      }),
      (this.GBi = () => {
        switch (this.SelectedToggle.Updater.Status) {
          case 2:
            (this.IsConfirm = !0), this.bBi();
            break;
          case 0:
          case 1:
            UiManager_1.UiManager.OpenView("VoiceLanguageDownloadView", [
              ModelManager_1.ModelManager.MenuModel.GetMenuDataByFunctionId(
                53,
              )[0],
              void 0,
            ]),
              this.bBi();
        }
      });
  }
  InitScrollViewData() {
    var e =
      LanguageUpdateManager_1.LanguageUpdateManager.GetAllLanguageTypeForAudio();
    this.ScrollView.RefreshByData(e.sort((e, a) => e - a)),
      this.CancelButton.SetFunction(this.bBi),
      this.ConfirmButton.SetFunction(this.GBi),
      this.ConfirmButton.SetLocalText("PowerConfirm");
  }
  CreateToggle(e, a, t) {
    var i = new VoiceLanguageSelectToggle();
    return i.Initialize(e, a, t), i;
  }
  OnRefreshView(e) {
    var a = this.MenuDataIns.OptionsNameList[e.GetIndex()];
    e.SetMainText(a);
  }
  OnSelected(e, a) {
    2 === e.Updater.Status
      ? this.ConfirmButton.SetLocalText("PowerConfirm")
      : this.ConfirmButton.SetLocalText("GoToDownload");
  }
}
exports.VoiceLanguageSelectView = VoiceLanguageSelectView;
class VoiceLanguageSelectToggle extends LanguageSettingViewBase_1.LanguageToggleBase {
  constructor() {
    super(...arguments), (this.Updater = void 0);
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
  }
  OnStart() {
    super.OnStart();
    var e = MenuTool_1.MenuTool.GetAudioCodeById(this.Index),
      e =
        ((this.Updater =
          LanguageUpdateManager_1.LanguageUpdateManager.GetUpdater(e)),
        this.GetText(2));
    e.SetUIActive(!0),
      this.PreToggled
        ? LguiUtil_1.LguiUtil.SetLocalText(e, "InUse")
        : 2 !== this.Updater.Status
          ? LguiUtil_1.LguiUtil.SetLocalText(e, "NotDownloaded")
          : e.SetText(""),
      this.Updater.CalculateDownloadStatus();
  }
}
exports.VoiceLanguageSelectToggle = VoiceLanguageSelectToggle;
//# sourceMappingURL=VoiceLanguageSelectView.js.map
