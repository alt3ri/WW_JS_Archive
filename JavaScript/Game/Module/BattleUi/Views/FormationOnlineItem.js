"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FormationOnlineItem = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class FormationOnlineItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.fht = void 0),
      (this.pht = void 0),
      (this.yrh = void 0),
      (this.vht = !1),
      (this.Mht = !1),
      (this.Eht = !1),
      (this.Sht = void 0),
      this.CreateThenShowByResourceIdAsync("UiItem_FigthRoleHeadOnline", t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    (this.Sht = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(1))),
      this.yht();
  }
  OnBeforeDestroy() {
    this.Sht.Clear(), (this.Sht = void 0);
  }
  SetNameText(t) {
    this.InAsyncLoading() ? (this.fht = t) : ((this.fht = t), this.Erh(t));
  }
  async Erh(t) {
    var i = this.GetText(3);
    return (
      StringUtils_1.StringUtils.IsEmpty(t)
        ? i.SetUIActive(!1)
        : (i.SetUIActive(!0), i.SetText(t)),
      Promise.resolve()
    );
  }
  SetOnlineNumber(t) {
    var i;
    this.InAsyncLoading()
      ? (this.pht = t)
      : ((i = this.GetTexture(2)),
        t < 0
          ? i.SetUIActive(!1)
          : (i.SetUIActive(!0),
            (t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              `FormationOnline${t}PIcon`,
            )),
            this.SetTextureByPath(t, i)));
  }
  SetIsGrayByOtherControl(t) {
    var i;
    this.InAsyncLoading()
      ? (this.vht = t)
      : ((i = this.GetTexture(2)).SetChangeColor(t, i.changeColor),
        (i = this.GetText(3)).SetChangeColor(t, i.changeColor));
  }
  SetNetWeak(t) {
    this.InAsyncLoading() ? (this.Mht = t) : this.GetItem(0).SetUIActive(t);
  }
  RefreshPlayStationItem(t) {
    this.InAsyncLoading()
      ? (this.yrh = t)
      : ((this.yrh = t),
        this.Trh(t),
        this.sPa(t),
        this.fht && this.Erh(this.fht));
  }
  sPa(t) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()
      ? ((t = "" !== t), this.GetItem(5)?.SetUIActive(!t))
      : this.GetItem(5)?.SetUIActive(!1);
  }
  async Trh(t) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()
      ? ((t = "" !== t),
        this.GetItem(4)?.SetUIActive(t),
        await Promise.resolve())
      : this.GetItem(4)?.SetUIActive(!1);
  }
  SetNetDisconnect(t) {
    this.InAsyncLoading() ? (this.Eht = t) : this.Iht(t);
  }
  Iht(t) {
    this.GetItem(1).SetUIActive(t),
      this.Sht.StopCurrentSequence(),
      t && this.Sht.PlayLevelSequenceByName("AutoLoop");
  }
  yht() {
    void 0 !== this.fht && (this.SetNameText(this.fht), (this.fht = void 0)),
      this.pht && (this.SetOnlineNumber(this.pht), (this.pht = void 0)),
      void 0 !== this.yrh &&
        (this.RefreshPlayStationItem(this.yrh), (this.yrh = void 0)),
      this.GetItem(0).SetUIActive(this.Mht),
      this.Iht(this.Eht),
      this.SetIsGrayByOtherControl(this.vht);
  }
}
exports.FormationOnlineItem = FormationOnlineItem;
//# sourceMappingURL=FormationOnlineItem.js.map
