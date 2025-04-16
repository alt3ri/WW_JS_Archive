"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VoiceLanguageSelectToggle = exports.VoiceLanguageSelectView =
    void 0);
const LanguageUpdateManager_1 = require("../../../../Launcher/Update/LanguageUpdateManager"),
  GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine"),
  GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LanguageSettingViewBase_1 = require("./LanguageSettingViewBase");
class VoiceLanguageSelectView extends LanguageSettingViewBase_1.LanguageSettingViewBase {
  constructor() {
    super(...arguments),
      (this.bBi = () => {
        this.CloseMe();
      }),
      (this.GBi = () => {
        if (void 0 === this.SelectedToggle) this.bBi();
        else
          switch (this.SelectedToggle.Updater.Status) {
            case 2:
              (this.IsConfirm = !0), this.bBi();
              break;
            case 0:
            case 1:
              (LanguageSettingViewBase_1.LanguageSettingViewBase.BackToPrevLangSettingViewName =
                "VoiceLanguageSelectView"),
                UiManager_1.UiManager.OpenView("VoiceLanguageDownloadView", [
                  ModelManager_1.ModelManager.MenuModel.GetMenuDataByFunctionId(
                    GameSettingsDefine_1.EFunction.VOICEPACKMANAGER,
                  ),
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
    super.OnRefreshView(e);
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
    var e = GameSettingsManager_1.GameSettingsManager.GetAudioCodeById(
        this.Index,
      ),
      e =
        ((this.Updater =
          LanguageUpdateManager_1.LanguageUpdateManager.GetUpdater(e)),
        this.Updater.CalculateDownloadStatus(
          "VoiceLanguageSelectToggle OnStart before set ui",
        ),
        this.GetText(2));
    e.SetUIActive(!0),
      this.PreToggled
        ? LguiUtil_1.LguiUtil.SetLocalText(e, "InUse")
        : 2 !== this.Updater.Status
          ? LguiUtil_1.LguiUtil.SetLocalText(e, "NotDownloaded")
          : e.SetText(""),
      this.Updater.CalculateDownloadStatus(
        "VoiceLanguageSelectToggle OnStart after set ui",
      );
  }
}
exports.VoiceLanguageSelectToggle = VoiceLanguageSelectToggle;
//# sourceMappingURL=VoiceLanguageSelectView.js.map
