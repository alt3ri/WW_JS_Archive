"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionIdentifyItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  NORMALCOLOR = "EBE5D7FF",
  GREENCOLOR = "63FF9CFF",
  WHITECOLOR = "FFFFFFFF",
  GRAYCOLOR = "ADADADFF";
class VisionIdentifyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.THi = ""),
      (this.$8i = void 0),
      (this.bPe = void 0),
      (this.DHi = void 0),
      (this.oMt = void 0),
      (this.nqe = () => {
        UiManager_1.UiManager.IsViewShow("VisionIntensifyView")
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnClickVisionIntensifyItemJump,
            )
          : this.oMt &&
            UiManager_1.UiManager.OpenView(
              "VisionIntensifyView",
              this.oMt.GetIncrId(),
              () => {
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnClickVisionIntensifyItemJump,
                );
              },
            );
      });
  }
  Refresh(e, t, i) {
    e && this.Update(e, e.SourceView);
  }
  GetKey(e, t) {
    return this.GridIndex;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UITextTransition],
      [7, UE.UISpriteTransition],
      [8, UE.UITextTransition],
    ]),
      (this.BtnBindInfo = [[5, this.nqe]]);
  }
  OnStart() {
    this.bPe = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.GetRootItem(),
    );
  }
  async PlaySequenceAndUpdate(e, t) {
    (this.DHi = new CustomPromise_1.CustomPromise()),
      0 < e
        ? TimerSystem_1.TimerSystem.Delay(() => {
            this.bPe?.PlaySequencePurely("Update");
          }, e)
        : this.bPe?.PlaySequencePurely("Update"),
      TimerSystem_1.TimerSystem.Delay(() => {
        this.DHi?.SetResult();
      }, e + t),
      await this.DHi.Promise;
    e = this.$8i;
    e &&
      (this.RHi(e),
      this.UHi(e),
      this.AHi(e),
      this.PHi(e),
      this.qwt(e),
      this.xHi(e));
  }
  Update(e, t) {
    var i = e.Data;
    (this.THi = t),
      (this.oMt = e.CurrentVisionData),
      (this.$8i = i),
      e.IfPreCache ||
        (this.RHi(i),
        this.UHi(i),
        this.AHi(i),
        this.PHi(i),
        this.qwt(i),
        this.xHi(i));
  }
  PHi(e) {
    this.GetButton(5).RootUIComp.SetRaycastTarget(
      1 === e.SlotState && this.wHi(),
    ),
      this.GetItem(2).SetUIActive(1 === e.SlotState && this.wHi());
  }
  Rh(e) {
    let t = "";
    return (
      0 === e.SlotState
        ? (t = GRAYCOLOR)
        : 1 === e.SlotState
          ? (t = this.wHi() ? GREENCOLOR : WHITECOLOR)
          : 3 === e.SlotState
            ? (t = NORMALCOLOR)
            : 2 === e.SlotState
              ? (t = WHITECOLOR)
              : (5 !== e.SlotState && 4 !== e.SlotState) || (t = GREENCOLOR),
      t
    );
  }
  RHi(e) {
    e = UE.Color.FromHex(this.Rh(e));
    this.GetText(0).SetColor(e),
      this.GetText(4).SetColor(e),
      this.GetItem(2).SetColor(e);
  }
  xHi(e) {
    var e = UE.Color.FromHex(this.Rh(e)),
      t = this.GetUiSpriteTransition(7).TransitionInfo,
      t =
        ((t.HighlightedTransition.Color = e),
        (t.NormalTransition.Color = e),
        (t.DisabledTransition.Color = e),
        this.GetUITextTransition(6).TransitionInfo),
      t =
        ((t.HighlightedTransition.FontColor = e),
        (t.DisabledTransition.FontColor = e),
        (t.NormalTransition.FontColor = e),
        this.GetUITextTransition(8).TransitionInfo);
    (t.HighlightedTransition.FontColor = e),
      (t.DisabledTransition.FontColor = e),
      (t.NormalTransition.FontColor = e);
  }
  UHi(e) {
    this.GetText(0).SetText(e.GetLevelUpViewName());
  }
  AHi(e) {
    var t = 3 === e.SlotState;
    this.GetText(1).SetUIActive(t),
      t && this.GetText(1).SetText(e.GetAttributeValueString());
  }
  wHi() {
    return (
      "VisionLevelUpView" === this.THi || "VisionEquipmentView" === this.THi
    );
  }
  qwt(e) {
    this.GetItem(3).SetUIActive(1 === e.SlotState && this.wHi());
  }
}
exports.VisionIdentifyItem = VisionIdentifyItem;
//# sourceMappingURL=VisionIdentifyItem.js.map
