"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingButtonItem = void 0);
const UE = require("ue"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  LevelSequencePlayer_1 = require("../../../../../Module/Common/LevelSequencePlayer"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  FIXED_DIGITS = 1,
  ANIM_BUTTON_PAUSE = "BtnChange",
  ANIM_BUTTON_START = "BtnChangeBack";
class FishingButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.LevelSequencePlayer = void 0),
      (this.Gke = void 0),
      (this.CurrentCdTime = 0),
      (this.TotalCdTime = 0),
      (this.ije = () => {
        this.Gke?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UISprite],
      [5, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.ije]]);
  }
  OnStart() {
    (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    )),
      this.GetItem(3).SetUIActive(!1);
  }
  OnTick(t) {
    this.TotalCdTime <= 0 ||
      ((this.CurrentCdTime += t),
      this.sc_(),
      this.CurrentCdTime >= this.TotalCdTime && this.ac_());
  }
  OnBeforeDestroy() {
    this.Gke = void 0;
  }
  SetEnableClick(t) {
    this.GetButton(0)?.SetSelfInteractive(t);
  }
  IsButtonEnable() {
    return this.GetButton(0).GetEnable();
  }
  SetFunction(t) {
    this.Gke = t;
  }
  SetPauseWithoutAnim(t) {
    this.GetSprite(1).SetUIActive(!t), this.GetSprite(2).SetUIActive(t);
  }
  SetPause(t) {
    t = t ? ANIM_BUTTON_PAUSE : ANIM_BUTTON_START;
    this.LevelSequencePlayer.StopPlayingSequence(!1, !0),
      this.LevelSequencePlayer.PlayLevelSequenceByName(t);
  }
  sc_() {
    var t = (this.TotalCdTime - this.CurrentCdTime) / this.TotalCdTime,
      e =
        (this.TotalCdTime - this.CurrentCdTime) /
        TimeUtil_1.TimeUtil.InverseMillisecond;
    this.GetSprite(4).SetFillAmount(t),
      this.GetText(5).SetText("" + e.toFixed(FIXED_DIGITS));
  }
  SetForbiddenStart(t) {
    t <= 0 ||
      (this.SetEnableClick(!1),
      (this.CurrentCdTime = 0),
      (this.TotalCdTime = t),
      this.sc_(),
      this.GetItem(3).SetUIActive(!0));
  }
  ac_() {
    this.SetEnableClick(!0),
      (this.TotalCdTime = 0),
      this.GetItem(3).SetUIActive(!1);
  }
}
exports.FishingButtonItem = FishingButtonItem;
//# sourceMappingURL=FishingButtonItem.js.map
