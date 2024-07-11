"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VoiceLanguageSelectToggle = exports.VoiceLanguageSelectView =
    void 0);
const LanguageUpdateManager_1 = require("../../../../Launcher/Update/LanguageUpdateManager");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MenuController_1 = require("../MenuController");
const MenuTool_1 = require("../MenuTool");
const LanguageSettingViewBase_1 = require("./LanguageSettingViewBase");
class VoiceLanguageSelectView extends LanguageSettingViewBase_1.LanguageSettingViewBase {
  constructor() {
    super(...arguments),
      (this.bwi = () => {
        this.CloseMe();
      }),
      (this.Gwi = () => {
        switch (this.SelectedToggle.Updater.Status) {
          case 2:
            (this.IsConfirm = !0), this.bwi();
            break;
          case 0:
          case 1:
            UiManager_1.UiManager.OpenView("VoiceLanguageDownloadView", [
              MenuController_1.MenuController.GetTargetMenuData(53),
              void 0,
            ]),
              this.bwi();
        }
      });
  }
  InitScrollViewData() {
    const e =
      LanguageUpdateManager_1.LanguageUpdateManager.GetAllLanguageTypeForAudio();
    this.ScrollView.RefreshByData(e.sort((e, t) => e - t)),
      this.CancelButton.SetFunction(this.bwi),
      this.ConfirmButton.SetFunction(this.Gwi),
      this.ConfirmButton.SetLocalText("PowerConfirm");
  }
  CreateToggle(e, t, a) {
    const i = new VoiceLanguageSelectToggle();
    return i.Initialize(e, t, a), i;
  }
  OnRefreshView(e) {
    const t = this.MenuDataIns.MenuDataOptionsNameList[e.GetIndex()];
    e.SetMainText(t);
  }
  OnSelected(e, t) {
    e.Updater.Status === 2
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
    var e = MenuTool_1.MenuTool.GetAudioCodeById(this.Index);
    var e =
      ((this.Updater =
        LanguageUpdateManager_1.LanguageUpdateManager.GetUpdater(e)),
      this.GetText(2));
    e.SetUIActive(!0),
      this.PreToggled
        ? LguiUtil_1.LguiUtil.SetLocalText(e, "InUse")
        : this.Updater.Status !== 2
          ? LguiUtil_1.LguiUtil.SetLocalText(e, "NotDownloaded")
          : e.SetText(""),
      this.Updater.CalculateDownloadStatus();
  }
}
exports.VoiceLanguageSelectToggle = VoiceLanguageSelectToggle;
// # sourceMappingURL=VoiceLanguageSelectView.js.map
