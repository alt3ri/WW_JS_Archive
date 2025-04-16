"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingQteTipsItem = void 0);
const UE = require("ue"),
  LevelSequencePlayer_1 = require("../../../../Module/Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../../Module/Util/LguiUtil"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class FishingQteTipsItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.LevelSequencePlayer = void 0),
      (this.InProgressType = 0),
      (this.SequenceCallback = void 0),
      (this.yct = (e) => {
        let i = 0;
        switch (e) {
          case "Fail":
            i = 1;
            break;
          case "QteSuccess":
            i = 2;
            break;
          case "Success":
            i = 3;
        }
        i === this.InProgressType &&
          (this.SequenceCallback?.(),
          (this.SequenceCallback = void 0),
          this.SetActive(!1));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    )),
      this.LevelSequencePlayer.BindSequenceCloseEvent(this.yct);
  }
  OnBeforeShow() {}
  OnBeforeHide() {
    this.InProgressType = 0;
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer?.Clear(), (this.LevelSequencePlayer = void 0);
  }
  jt_(e) {
    this.LevelSequencePlayer.GetCurrentSequence() === e
      ? this.LevelSequencePlayer.ReplaySequenceByKey(e)
      : (this.LevelSequencePlayer.StopPlayingSequence(!1, !0),
        this.LevelSequencePlayer.PlayLevelSequenceByName(e, !1)),
      this.SetActive(!0);
  }
  ShowTip(e, i, s) {
    let t = "Success";
    switch (e) {
      case 1:
        this.Wt_(), (t = "Fail");
        break;
      case 2:
        this.Qt_(), (t = "QteSuccess");
        break;
      case 3:
        this.Kt_(i), (t = "Success");
    }
    this.SequenceCallback && this.SequenceCallback?.(),
      (this.SequenceCallback = s),
      (this.InProgressType = e),
      this.jt_(t);
  }
  Wt_() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Fishing_QTE_Miss");
  }
  Qt_() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "Fishing_QTE_Success");
  }
  Kt_(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(0),
      "Fishing_QTE_Catch",
      e,
    );
  }
}
exports.FishingQteTipsItem = FishingQteTipsItem;
//# sourceMappingURL=FishingQteTipsItem.js.map
