"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardQuicklySellPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  FishingDefine_1 = require("../../FishingDefine");
class DockyardQuicklySellPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ConfirmBtnClick = void 0),
      (this.CloseBtnClick = void 0),
      (this.SequencePlayer = void 0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [2, this.ConfirmBtnClick],
        [5, this.CloseBtnClick],
      ]);
  }
  OnStart() {
    (this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    )),
      this.SequencePlayer.BindSequenceCloseEvent((e) => {
        "Close" === e && this.SetActive(!1);
      });
  }
  OnBeforeDestroy() {
    this.SequencePlayer.Clear();
  }
  SetPanelVisible(e) {
    e
      ? (this.SequencePlayer.StopCurrentSequence(!1, !0),
        this.SequencePlayer.PlaySequencePurely("Start"),
        this.SetActive(!0))
      : (this.SequencePlayer.StopCurrentSequence(!1, !0),
        this.SequencePlayer.PlaySequencePurely("Close"));
  }
  RefreshPanel(e, i) {
    var s = 0 === i;
    this.GetButton(2)?.RootUIComp.SetUIActive(s),
      this.GetItem(3)?.SetUIActive(!s),
      this.GetText(0)?.SetText(e.toString()),
      this.SetItemIcon(
        this.GetTexture(1),
        FishingDefine_1.FISHING_CURRENCY_ITEMID,
      ),
      s ||
        (1 === i
          ? LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(4),
              "Fishing_ShapeNotMatch",
            )
          : 2 === i &&
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(4),
              "Fishing_ShapeCantSell",
            ));
  }
}
exports.DockyardQuicklySellPanel = DockyardQuicklySellPanel;
//# sourceMappingURL=DockyardQuicklySellPanel.js.map
