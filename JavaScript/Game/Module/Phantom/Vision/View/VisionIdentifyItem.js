"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionIdentifyItem = void 0);
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const NORMALCOLOR = "EBE5D7FF";
const GREENCOLOR = "63FF9CFF";
const WHITECOLOR = "FFFFFFFF";
const GRAYCOLOR = "ADADADFF";
class VisionIdentifyItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.L7i = ""),
      (this.Y6i = void 0),
      (this.bPe = void 0),
      (this.R7i = void 0),
      (this.Wpt = void 0),
      (this.nqe = () => {
        UiManager_1.UiManager.IsViewShow("VisionIntensifyView")
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnClickVisionIntensifyItemJump,
            )
          : this.Wpt &&
            UiManager_1.UiManager.OpenView(
              "VisionIntensifyView",
              this.Wpt.GetIncrId(),
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
    (this.R7i = new CustomPromise_1.CustomPromise()),
      e > 0
        ? TimerSystem_1.TimerSystem.Delay(() => {
            this.bPe?.PlaySequencePurely("Update");
          }, e)
        : this.bPe?.PlaySequencePurely("Update"),
      TimerSystem_1.TimerSystem.Delay(() => {
        this.R7i?.SetResult();
      }, e + t),
      await this.R7i.Promise;
    e = this.Y6i;
    e &&
      (this.U7i(e),
      this.A7i(e),
      this.P7i(e),
      this.x7i(e),
      this.wxt(e),
      this.w7i(e));
  }
  Update(e, t) {
    const i = e.Data;
    (this.L7i = t),
      (this.Wpt = e.CurrentVisionData),
      (this.Y6i = i),
      e.IfPreCache ||
        (this.U7i(i),
        this.A7i(i),
        this.P7i(i),
        this.x7i(i),
        this.wxt(i),
        this.w7i(i));
  }
  x7i(e) {
    this.GetButton(5).RootUIComp.SetRaycastTarget(
      e.SlotState === 1 && this.B7i(),
    ),
      this.GetItem(2).SetUIActive(e.SlotState === 1 && this.B7i());
  }
  Rh(e) {
    let t = "";
    return (
      e.SlotState === 0
        ? (t = GRAYCOLOR)
        : e.SlotState === 1
          ? (t = this.B7i() ? GREENCOLOR : WHITECOLOR)
          : e.SlotState === 3
            ? (t = NORMALCOLOR)
            : e.SlotState === 2
              ? (t = WHITECOLOR)
              : (e.SlotState !== 5 && e.SlotState !== 4) || (t = GREENCOLOR),
      t
    );
  }
  U7i(e) {
    e = UE.Color.FromHex(this.Rh(e));
    this.GetText(0).SetColor(e),
      this.GetText(4).SetColor(e),
      this.GetItem(2).SetColor(e);
  }
  w7i(e) {
    var e = UE.Color.FromHex(this.Rh(e));
    var t = this.GetUiSpriteTransition(7).TransitionInfo;
    var t =
      ((t.HighlightedTransition.Color = e),
      (t.NormalTransition.Color = e),
      (t.DisabledTransition.Color = e),
      this.GetUITextTransition(6).TransitionInfo);
    var t =
      ((t.HighlightedTransition.FontColor = e),
      (t.DisabledTransition.FontColor = e),
      (t.NormalTransition.FontColor = e),
      this.GetUITextTransition(8).TransitionInfo);
    (t.HighlightedTransition.FontColor = e),
      (t.DisabledTransition.FontColor = e),
      (t.NormalTransition.FontColor = e);
  }
  A7i(e) {
    this.GetText(0).SetText(e.GetLevelUpViewName());
  }
  P7i(e) {
    const t = e.SlotState === 3;
    this.GetText(1).SetUIActive(t),
      t && this.GetText(1).SetText(e.GetAttributeValueString());
  }
  B7i() {
    return (
      this.L7i === "VisionLevelUpView" || this.L7i === "VisionEquipmentView"
    );
  }
  wxt(e) {
    this.GetItem(3).SetUIActive(e.SlotState === 1 && this.B7i());
  }
}
exports.VisionIdentifyItem = VisionIdentifyItem;
// # sourceMappingURL=VisionIdentifyItem.js.map
