"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardQteSkipPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil");
class DockyardQteSkipPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.LevelSequencePlayer = void 0),
      (this.ContinueFunc = void 0),
      (this.ExitFunc = void 0),
      (this.LockState = !1),
      (this.ei_ = () => {
        this.ContinueFunc?.();
      }),
      (this.ti_ = () => {
        this.ExitFunc?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [1, this.ei_],
        [2, this.ti_],
      ]);
  }
  OnStart() {
    (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    )),
      this.LevelSequencePlayer.BindSequenceCloseEvent((e) => {
        "Hide" === e && this.SetActive(!1);
      });
  }
  SetPanelVisible(e) {
    this.LockState ||
      (e
        ? (this.LevelSequencePlayer.StopCurrentSequence(!0, !0),
          this.LevelSequencePlayer.PlaySequencePurely("Show"),
          this.SetActive(!0))
        : (this.LevelSequencePlayer.StopCurrentSequence(!0, !0),
          this.LevelSequencePlayer.PlaySequencePurely("Hide")));
  }
  SetQtePanelText(e, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(0),
      "Fishing_QTE_Unfish",
      i - e,
    );
  }
  SetQtePanelTextVisible(e) {
    this.GetText(0).SetUIActive(e);
  }
  SetButtonContinueVisible(e) {
    this.GetButton(1).RootUIComp.SetUIActive(e);
  }
  SetButtonExitVisible(e) {
    this.GetButton(2).RootUIComp.SetUIActive(e);
  }
}
exports.DockyardQteSkipPanel = DockyardQteSkipPanel;
//# sourceMappingURL=DockyardQteSkipPanel.js.map
