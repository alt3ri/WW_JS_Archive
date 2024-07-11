"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayTypeOneView = void 0);
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InfoDisplayController_1 = require("../InfoDisplayController");
const InfoDisplayAudioPlayer_1 = require("./InfoDisplayAudioPlayer");
class InfoDisplayTypeOneView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.nsi = void 0),
      (this.Opt = () => {
        this.CloseMe();
      }),
      (this.lsi = () => {
        var e =
          ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
        var e =
          ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
            e,
          );
        e.length > 0 &&
          (ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(
            e[0],
          ),
          InfoDisplayController_1.InfoDisplayController.OpenInfoDisplayImgView());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITextureTransitionComponent],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UITexture],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UITexture],
    ]),
      (this.BtnBindInfo = [
        [0, this.lsi],
        [3, this.Opt],
      ]);
  }
  OnStart() {
    this.nsi = new InfoDisplayAudioPlayer_1.InfoDisplayAudioPlayer();
    var e = this.GetItem(8);
    var e =
      (this.nsi.Initialize(e.GetOwner()),
      this.nsi.SetShowTextComponent(this.GetText(6)),
      ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId());
    this.OPt(e),
      this.nsi.Refresh(
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(
          e,
        ),
      );
  }
  OPt(e) {
    this._si(e), this.$8e(e), this.usi(e), this.msi(e);
  }
  _si(e) {
    e =
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
        e,
      );
    if (e.length !== 0) {
      e = e[0];
      if (e !== "") {
        const r = this.GetUiTextureTransitionComponent(1);
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, (e, i) => {
          e.IsValid() &&
            r.IsValid() &&
            (r.SetAllStateTexture(e),
            this.GetTexture(10).SetTexture(e),
            this.GetTexture(10).SetSizeFromTexture());
        });
      }
    }
  }
  $8e(e) {
    var i =
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
        e,
      );
    var i =
      (this.GetText(2).SetText(i),
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
        e,
      ));
    this.GetText(4).SetText(i);
  }
  usi(e) {
    e =
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayBgStamp(
        e,
      );
    e !== "" && this.SetTextureByPath(e, this.GetTexture(7));
  }
  msi(e) {
    ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(
      e,
    ) !== ""
      ? (this.GetItem(8).SetUIActive(!0), this.GetItem(9).SetUIActive(!0))
      : (this.GetItem(8).SetUIActive(!1), this.GetItem(9).SetUIActive(!1));
  }
  OnTick(e) {
    this.nsi?.OnTick(e);
  }
  OnBeforeDestroy() {
    this.nsi.Destroy();
    const e =
      ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    InfoDisplayController_1.InfoDisplayController.RequestReadDisplayInfo(e);
  }
}
exports.InfoDisplayTypeOneView = InfoDisplayTypeOneView;
// # sourceMappingURL=InfoDisplayTypeOneView.js.map
