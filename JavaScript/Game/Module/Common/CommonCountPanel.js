"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonItemCountPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("./LevelSequencePlayer"),
  MAX_DIGIT = 4,
  MAX_NUMBER = "9999",
  KEYCOUNT = 9;
class CommonItemCountPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.fTt = ""),
      (this.pTt = void 0),
      (this.vTt = void 0),
      (this.SPe = void 0),
      (this.Tct = (t) => {
        "Close" === t && this.SetActive(!1);
      }),
      (this.m2e = () => {
        this.PlayCloseSequence();
      }),
      (this.Mke = () => {
        this.vTt?.(parseInt(this.t6)), this.PlayCloseSequence();
      }),
      (this.MTt = () => {
        this.t6 = this.t6.substr(0, this.t6.length - 1);
      });
  }
  get t6() {
    return this.fTt;
  }
  set t6(t) {
    (this.fTt = t),
      this.GetText(0).SetText(this.fTt),
      this.GetInteractionGroup(4).SetInteractable(0 < this.fTt.length);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIInteractionGroup],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
      [9, UE.UIButtonComponent],
      [10, UE.UIButtonComponent],
      [11, UE.UIButtonComponent],
      [12, UE.UIButtonComponent],
      [13, UE.UIButtonComponent],
      [14, UE.UIButtonComponent],
      [15, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [1, this.m2e],
        [3, this.Mke],
        [2, this.MTt],
      ]);
  }
  OnStart() {
    this.pTt = [];
    for (let t = 0; t <= KEYCOUNT; t++) {
      var e = this.GetButton(5 + t);
      this.pTt.push(e);
    }
    for (let t = 0; t <= KEYCOUNT; t++)
      this.pTt[t].OnClickCallBack.Bind(() => {
        this.t6.length < MAX_DIGIT ? (this.t6 += t) : (this.t6 = MAX_NUMBER);
      });
    (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SPe.BindSequenceCloseEvent(this.Tct);
  }
  OnBeforeDestroy() {
    this.SPe.Clear(), (this.SPe = void 0);
    for (const t of this.pTt) t.OnClickCallBack.Unbind();
  }
  UpdateView(t) {
    (this.t6 = t.toString()),
      this.RootItem.SetUIActive(!0),
      this.RootItem.SetAsLastHierarchy();
  }
  SetTitleText(t) {
    this.GetText(15).SetText(t);
  }
  PlayStartSequence(t) {
    this.SetActive(!0),
      this.SPe.PlayLevelSequenceByName("Start"),
      this.UpdateView(t);
  }
  PlayCloseSequence() {
    this.SPe.PlayLevelSequenceByName("Close");
  }
  SetConfirmFunction(t) {
    this.vTt = t;
  }
}
exports.CommonItemCountPanel = CommonItemCountPanel;
//# sourceMappingURL=CommonCountPanel.js.map
