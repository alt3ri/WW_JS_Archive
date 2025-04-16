"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfoDisplayTypeFourView = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
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
      (this.lai = (i, e) => {
        for (let e = 0; e < i.Num(); e++) {
          var r, t;
          this.aai.length > e &&
            ((t = this.aai[e].Height),
            (r = i.Get(e).toPrecision(1)),
            (r = this.hai * Number(r)),
            (t = MathUtils_1.MathUtils.Lerp(t, r, LERP_PERCENTAGE)),
            this.aai[e].SetHeight(t));
        }
      }),
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
    var e = this.GetItem(8),
      i =
        (this.sai.Initialize(e.GetOwner()),
        this.sai.SetShowTextComponent(this.GetText(6)),
        this.sai.SetSpectrumCallBack(this.lai),
        (this.aai = new Array()),
        this.GetItem(10));
    for (let e = 0; e < i.UIChildren.Num(); e++)
      this.aai.push(i.UIChildren.Get(e)),
        0 === e && (this.hai = i.UIChildren.Get(e).Height);
    e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
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
    var e =
      ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayPictures(
        e,
      );
    0 < e.length &&
      "" !== (e = e[0]) &&
      this.SetTextureByPath(e, this.GetTexture(1));
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
  OnTick(e) {
    this.sai?.OnTick(e);
  }
  mai(e) {
    "" !==
    ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayAudio(e)
      ? (this.GetItem(8).SetUIActive(!0), this.GetItem(9).SetUIActive(!0))
      : (this.GetItem(8).SetUIActive(!1), this.GetItem(9).SetUIActive(!1));
  }
  OnBeforeDestroy() {
    this.sai.Destroy();
    var e = ModelManager_1.ModelManager.InfoDisplayModel.CurrentInformationId();
    InfoDisplayController_1.InfoDisplayController.RequestReadDisplayInfo(e);
  }
  async OnBeforeHideAsync() {
    this.OpenParam?.FadeBeforeHide &&
      (await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(
        0,
        3,
      ));
  }
}
exports.InfoDisplayTypeFourView = InfoDisplayTypeFourView;
//# sourceMappingURL=InfoDisplayTypeFourView.js.map
