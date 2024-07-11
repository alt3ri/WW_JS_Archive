"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayTypeOneView = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InfoDisplayController_1 = require("../InfoDisplayController"),
  InfoDisplayAudioPlayer_1 = require("./InfoDisplayAudioPlayer");
class InfoDisplayTypeOneView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.sai = void 0),
      (this.Jvt = () => {
        this.CloseMe();
      }),
      (this._ai = () => {
        var e =
            ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId(),
          e =
            ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
              e,
            );
        0 < e.length &&
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
        [0, this._ai],
        [3, this.Jvt],
      ]);
  }
  OnStart() {
    this.sai = new InfoDisplayAudioPlayer_1.InfoDisplayAudioPlayer();
    var e = this.GetItem(8),
      e =
        (this.sai.Initialize(e.GetOwner()),
        this.sai.SetShowTextComponent(this.GetText(6)),
        ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId());
    this.Hxt(e),
      this.sai.Refresh(
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(
          e,
        ),
      );
  }
  Hxt(e) {
    this.uai(e), this.l7e(e), this.cai(e), this.mai(e);
  }
  uai(e) {
    e =
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
        e,
      );
    if (0 !== e.length) {
      e = e[0];
      if ("" !== e) {
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
  l7e(e) {
    var i =
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
          e,
        ),
      i =
        (this.GetText(2).SetText(i),
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
          e,
        ));
    this.GetText(4).SetText(i);
  }
  cai(e) {
    e =
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayBgStamp(
        e,
      );
    "" !== e && this.SetTextureByPath(e, this.GetTexture(7));
  }
  mai(e) {
    "" !==
    ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(e)
      ? (this.GetItem(8).SetUIActive(!0), this.GetItem(9).SetUIActive(!0))
      : (this.GetItem(8).SetUIActive(!1), this.GetItem(9).SetUIActive(!1));
  }
  OnTick(e) {
    this.sai?.OnTick(e);
  }
  OnBeforeDestroy() {
    this.sai.Destroy();
    var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    InfoDisplayController_1.InfoDisplayController.RequestReadDisplayInfo(e);
  }
}
exports.InfoDisplayTypeOneView = InfoDisplayTypeOneView;
//# sourceMappingURL=InfoDisplayTypeOneView.js.map
