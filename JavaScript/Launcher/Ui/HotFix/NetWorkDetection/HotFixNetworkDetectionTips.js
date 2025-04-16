"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixNetworkDetectionTips = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  LaunchComponentsAction_1 = require("../../LaunchComponentsAction"),
  HotFixManager_1 = require("../HotFixManager");
class HotFixNetworkDetectionTips extends LaunchComponentsAction_1.LaunchComponentsAction {
  constructor() {
    super(...arguments),
      (this.Cve = void 0),
      (this.jIc = void 0),
      (this.Uwc = 0);
  }
  InitTickManager(t) {
    this.Cve = new UE.KuroTickManager(t, "HotFixNetworkDetectionTips");
  }
  OnShow() {
    this.SetTextureIconActive(!0), this.SequencePlayer?.PlaySequence("Loop");
  }
  OnBeforeDestroy() {
    this.Cve && (this.Bwc(), (this.Cve = void 0));
  }
  SetTextureIconActive(t) {
    this.GetTexture(1)?.SetUIActive(t);
  }
  SetTipsText(t) {
    this.GetText(0)?.SetText(t);
  }
  SetTipsLocalText(t) {
    HotFixManager_1.HotFixManager.SetLocalText(this.GetText(0), t);
  }
  ShowTip(t) {
    this.SetTipsLocalText(t),
      this.SetActive(!0),
      this.SetTextureIconActive(!1),
      this.Bwc(),
      (this.jIc = (t) => {
        (this.Uwc += t), 1.2 < this.Uwc && (this.SetActive(!1), this.Bwc());
      }),
      this.Cve.AddTick(0, (0, puerts_1.toManualReleaseDelegate)(this.jIc));
  }
  Bwc() {
    void 0 !== this.jIc &&
      (this.Cve.RemoveTick(0),
      (0, puerts_1.releaseManualReleaseDelegate)(this.jIc),
      (this.jIc = void 0)),
      (this.Uwc = -1);
  }
}
exports.HotFixNetworkDetectionTips = HotFixNetworkDetectionTips;
//# sourceMappingURL=HotFixNetworkDetectionTips.js.map
