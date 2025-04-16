"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.XiaKongQteBar = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
class XiaKongQteBar extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.SPe = void 0),
      (this.lat = void 0),
      (this.hBa = void 0),
      (this.Lrt = !0),
      (this.zTc = !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
    ];
  }
  Init(i) {
    (this.lat = i), this.lat.SetEnable(this.zTc);
  }
  Refresh(i) {
    this.hBa = i;
  }
  OnStart() {
    (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.GetTexture(1).SetFillAmount(1),
      this.GetTexture(1).SetUIActive(!1),
      (this.zTc = !1);
  }
  OnBeforeDestroy() {
    this.SPe && (this.SPe?.Clear(), (this.SPe = void 0));
  }
  Tick(i) {
    var e;
    this.hBa &&
      (this.hBa.GetNextEndCircleIndex() >= this.hBa.GetNextGenCircleIndex()
        ? this.ehr(!1)
        : (this.ehr(!0),
          1 <=
          (e =
            this.hBa.GetNextEndCircleAttrValue() / this.hBa.GetMinAttrValue())
            ? this.ZTc(!0)
            : (this.GetTexture(0)?.SetFillAmount((e - 0.5) / 0.5),
              this.ZTc(!1))));
  }
  ehr(i) {
    this.Lrt !== i &&
      ((this.Lrt = i), this.SetActive(i), this.lat?.SetActive(i));
  }
  ZTc(i) {
    this.zTc !== i &&
      ((this.zTc = i),
      this.GetTexture(1).SetUIActive(i),
      this.lat?.SetEnable(i),
      i
        ? this.SPe?.PlayLevelSequenceByName("Full")
        : this.SPe?.PlayLevelSequenceByName("Use"));
  }
}
exports.XiaKongQteBar = XiaKongQteBar;
//# sourceMappingURL=XiaKongQteBar.js.map
