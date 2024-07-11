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
      (this.sai = void 0),
      (this.aai = void 0),
      (this.hai = 0),
      (this.lai = (e, i) => {
        for (let i = 0; i < e.Num(); i++) {
          var s, t;
          this.aai.length > i &&
            ((t = this.aai[i].Height),
            (s = e.Get(i).toPrecision(1)),
            (s = this.hai * Number(s)),
            (t = MathUtils_1.MathUtils.Lerp(t, s, LERP_PERCENTAGE)),
            this.aai[i].SetHeight(t));
        }
      }),
      (this.Jvt = () => {
        this.CloseMe();
      }),
      (this._ai = () => {
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
        [0, this._ai],
        [3, this.Jvt],
      ]);
  }
  OnStart() {
    this.sai = new InfoDisplayAudioPlayer_1.InfoDisplayAudioPlayer();
    var i = this.GetItem(8),
      e =
        (this.sai.Initialize(i.GetOwner()),
        this.sai.SetShowTextComponent(this.GetText(6)),
        this.sai.SetSpectrumCallBack(this.lai),
        (this.aai = new Array()),
        this.GetItem(10));
    for (let i = 0; i < e.UIChildren.Num(); i++)
      this.aai.push(e.UIChildren.Get(i)),
        0 === i && (this.hai = e.UIChildren.Get(i).Height);
    i = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    this.Hxt(i),
      this.sai.Refresh(
        ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(
          i,
        ),
      );
  }
  Hxt(i) {
    this.uai(i), this.l7e(i), this.cai(i), this.mai(i);
  }
  uai(i) {
    var i =
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
        i,
      );
    0 < i.length &&
      "" !== (i = i[0]) &&
      this.SetTextureByPath(i, this.GetTexture(1));
  }
  l7e(i) {
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
  cai(i) {
    i =
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayBgStamp(
        i,
      );
    "" !== i && this.SetTextureByPath(i, this.GetTexture(7));
  }
  OnTick(i) {
    this.sai?.OnTick(i);
  }
  mai(i) {
    "" !==
    ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(i)
      ? (this.GetItem(8).SetUIActive(!0), this.GetItem(9).SetUIActive(!0))
      : (this.GetItem(8).SetUIActive(!1), this.GetItem(9).SetUIActive(!1));
  }
  OnBeforeDestroy() {
    this.sai.Destroy();
    var i = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    InfoDisplayController_1.InfoDisplayController.RequestReadDisplayInfo(i);
  }
}
exports.InfoDisplayTypeFourView = InfoDisplayTypeFourView;
//# sourceMappingURL=InfoDisplayTypeFourView.js.map
