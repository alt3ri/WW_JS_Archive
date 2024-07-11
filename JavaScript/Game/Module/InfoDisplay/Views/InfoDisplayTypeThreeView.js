"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayTypeThreeView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InfoDisplayController_1 = require("../InfoDisplayController"),
  InfoDisplayAudioPlayer_1 = require("./InfoDisplayAudioPlayer");
class InfoDisplayTypeThreeView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.sai = void 0),
      (this.Jvt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.Jvt]]);
  }
  OnStart() {
    this.sai = new InfoDisplayAudioPlayer_1.InfoDisplayAudioPlayer();
    var e = this.GetItem(5),
      e =
        (this.sai.Initialize(e.GetOwner()),
        this.sai.SetShowTextComponent(this.GetText(3)),
        ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId());
    this.Hxt(e),
      this.sai.Refresh(
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(
          e,
        ),
      );
  }
  Hxt(e) {
    this.l7e(e), this.cai(e), this.mai(e);
  }
  mai(e) {
    "" !==
    ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(e)
      ? (this.GetItem(5).SetUIActive(!0), this.GetItem(7).SetUIActive(!0))
      : (this.GetItem(5).SetUIActive(!1), this.GetItem(7).SetUIActive(!1));
  }
  l7e(e) {
    var i =
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
          e,
        ),
      i =
        (this.GetText(0).SetText(i),
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
          e,
        ));
    this.GetText(2).SetText(i);
  }
  cai(e) {
    e =
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayBgStamp(
        e,
      );
    "" !== e && this.SetTextureByPath(e, this.GetTexture(1));
  }
  OnBeforeDestroy() {
    this.sai.Destroy();
    var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    InfoDisplayController_1.InfoDisplayController.RequestReadDisplayInfo(e);
  }
  OnTick(e) {
    this.sai?.OnTick(e);
  }
}
exports.InfoDisplayTypeThreeView = InfoDisplayTypeThreeView;
//# sourceMappingURL=InfoDisplayTypeThreeView.js.map
