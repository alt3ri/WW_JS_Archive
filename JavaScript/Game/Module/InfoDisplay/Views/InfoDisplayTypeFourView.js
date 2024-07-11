"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayTypeFourView = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InfoDisplayController_1 = require("../InfoDisplayController"),
  InfoDisplayAudioPlayer_1 = require("./InfoDisplayAudioPlayer"),
  LERP_PERCENTAGE = 0.3;
class InfoDisplayTypeFourView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.nsi = void 0),
      (this.ssi = void 0),
      (this.asi = 0),
      (this.hsi = (e, i) => {
        for (let i = 0; i < e.Num(); i++) {
          var s, t;
          this.ssi.length > i &&
            ((t = this.ssi[i].Height),
            (s = e.Get(i).toPrecision(1)),
            (s = this.asi * Number(s)),
            (t = MathUtils_1.MathUtils.Lerp(t, s, LERP_PERCENTAGE)),
            this.ssi[i].SetHeight(t));
        }
      }),
      (this.Opt = () => {
        this.CloseMe();
      }),
      (this.lsi = () => {
        var i =
            ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId(),
          i =
            ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
              i,
            );
        0 < i.length &&
          (ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(
            i[0],
          ),
          InfoDisplayController_1.InfoDisplayController.OpenInfoDisplayImgView());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UITexture],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.lsi],
        [3, this.Opt],
      ]);
  }
  OnStart() {
    this.nsi = new InfoDisplayAudioPlayer_1.InfoDisplayAudioPlayer();
    var i = this.GetItem(8),
      e =
        (this.nsi.Initialize(i.GetOwner()),
        this.nsi.SetShowTextComponent(this.GetText(6)),
        this.nsi.SetSpectrumCallBack(this.hsi),
        (this.ssi = new Array()),
        this.GetItem(10));
    for (let i = 0; i < e.UIChildren.Num(); i++)
      this.ssi.push(e.UIChildren.Get(i)),
        0 === i && (this.asi = e.UIChildren.Get(i).Height);
    i = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    this.OPt(i),
      this.nsi.Refresh(
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(
          i,
        ),
      );
  }
  OPt(i) {
    this._si(i), this.$8e(i), this.usi(i), this.msi(i);
  }
  _si(i) {
    var i =
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
        i,
      );
    0 < i.length &&
      "" !== (i = i[0]) &&
      this.SetTextureByPath(i, this.GetTexture(1));
  }
  $8e(i) {
    var e =
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayTitle(
          i,
        ),
      e =
        (this.GetText(2).SetText(e),
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayDesc(
          i,
        ));
    this.GetText(4).SetText(e);
  }
  usi(i) {
    i =
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayBgStamp(
        i,
      );
    "" !== i && this.SetTextureByPath(i, this.GetTexture(7));
  }
  OnTick(i) {
    this.nsi?.OnTick(i);
  }
  msi(i) {
    "" !==
    ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(i)
      ? (this.GetItem(8).SetUIActive(!0), this.GetItem(9).SetUIActive(!0))
      : (this.GetItem(8).SetUIActive(!1), this.GetItem(9).SetUIActive(!1));
  }
  OnBeforeDestroy() {
    this.nsi.Destroy();
    var i = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    InfoDisplayController_1.InfoDisplayController.RequestReadDisplayInfo(i);
  }
}
exports.InfoDisplayTypeFourView = InfoDisplayTypeFourView;
//# sourceMappingURL=InfoDisplayTypeFourView.js.map
