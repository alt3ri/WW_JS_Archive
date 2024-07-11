"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ToggleActionItem = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Global_1 = require("../../../Global"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../LevelSequencePlayer"),
  DELAY_REFRESH_TIME = 100,
  FONT_SIZE = 38;
class ToggleActionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Toggle = void 0),
      (this.Maa = void 0),
      (this.eZi = void 0),
      (this.Text = void 0),
      (this.ToggleIndexInline = 0),
      (this.LevelSequencePlayer = void 0),
      (this.j5e = void 0),
      (this.zXs = 0),
      (this.DefaultToggleItemHeight = 0),
      (this.xia = void 0),
      (this.Rqe = void 0),
      (this.Y0a = void 0),
      (this.Saa = !0),
      (this.J0a = void 0),
      (this.J_ = () => {
        var t = this.mla();
        (this.Y0a?.X === t.X && this.Y0a?.Y === t.Y) ||
          ((this.Y0a = t), this.Eaa());
      }),
      (this.mla = () => {
        var t = Global_1.Global.CharacterController,
          i = (0, puerts_1.$ref)(0),
          s = (0, puerts_1.$ref)(0),
          t = (t.GetViewportSize(i, s), (0, puerts_1.$unref)(i)),
          i = (0, puerts_1.$unref)(s);
        return new UE.IntPoint(t, i);
      }),
      (this.ToggleClick = (t) => {
        this.j5e && this.j5e(t);
      });
  }
  get ToggleIndex() {
    return this.ToggleIndexInline;
  }
  set ToggleIndex(t) {
    this.ToggleIndexInline = t;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
      [2, UE.UITexture],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.ToggleClick]]);
  }
  OnStart() {
    this.Toggle = this.GetExtendToggle(1);
    var t = this.Toggle.GetOwner(),
      t =
        ((this.Maa = t.GetUIItem()),
        (this.eZi = this.GetText(0)),
        (this.LevelSequencePlayer =
          new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
        this.Toggle.SetToggleStateForce(0, !1, !0),
        (this.xia = this.GetRootActor().GetComponentByClass(
          UE.UISizeControlByOther.StaticClass(),
        )),
        this.GetText(0));
    (this.zXs = t.GetSize()),
      (this.DefaultToggleItemHeight = this.Maa.GetHeight()),
      (this.Rqe = TickSystem_1.TickSystem.Add(this.J_, "ToggleActionItemTick")),
      (this.Y0a = this.mla());
  }
  OnBeforeDestroy() {
    (this.Toggle = void 0),
      (this.Text = void 0),
      (this.eZi = void 0),
      (this.Maa = void 0),
      this.LevelSequencePlayer && this.LevelSequencePlayer.Clear(),
      (this.LevelSequencePlayer = void 0),
      (this.xia = void 0),
      this.Rqe &&
        (TickSystem_1.TickSystem.Remove(this.Rqe.Id), (this.Rqe = void 0)),
      this.J0a &&
        TimerSystem_1.TimerSystem.Has(this.J0a) &&
        (TimerSystem_1.TimerSystem.Remove(this.J0a), (this.J0a = void 0));
  }
  ShowSequenceOnBegin() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("show");
  }
  async PlayReleaseSequence() {
    await this.LevelSequencePlayer.PlaySequenceAsync(
      "Select",
      new CustomPromise_1.CustomPromise(),
    );
  }
  PlayAppearSequence() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Start");
  }
  SetPanelAlpha(t) {
    this.GetItem(3)?.SetAlpha(t);
  }
  async PlayDisappearSequence() {
    await this.LevelSequencePlayer.PlaySequenceAsync(
      "Close",
      new CustomPromise_1.CustomPromise(),
    );
  }
  SetFunction(t) {
    this.j5e = t;
  }
  GetToggleItem() {
    return this.Toggle;
  }
  SetToggleText(t) {
    (this.Text = t),
      this.GetText(0).SetText(t),
      this.eZi &&
        (this.eZi.SetText(t),
        this.J0a ||
          (this.J0a = TimerSystem_1.TimerSystem.Delay(() => {
            this.Eaa(), (this.J0a = void 0);
          }, DELAY_REFRESH_TIME)));
  }
  Eaa() {
    var t;
    this.eZi &&
      this.Maa &&
      (this.eZi.GetRealSize(),
      (t = this.eZi.GetRenderLineNum() < 2),
      this.Saa !== t) &&
      ((this.Saa = t),
      this.Saa
        ? (this.xia?.SetControlHeight(!1),
          this.eZi.SetFontSize(this.zXs),
          this.eZi.GetRealSize(),
          this.eZi.GetRenderLineNum() < 2 || this.eZi.SetFontSize(FONT_SIZE),
          this.Maa?.SetHeight(this.DefaultToggleItemHeight))
        : (this.eZi.SetFontSize(FONT_SIZE),
          this.xia?.SetControlHeight(!0),
          this.eZi.SetFontSize(FONT_SIZE),
          this.eZi.GetRealSize(),
          this.eZi.GetRenderLineNum() < 2
            ? this.xia?.SetControlHeight(!1)
            : this.xia?.SetControlHeight(!0)));
  }
  SetToggleTexture(t) {
    this.SetTextureByPath(t, this.GetTexture(2));
  }
  SetToggleTextGray(t) {
    this.GetText(0).SetIsGray(t);
  }
  GetToggleText() {
    return this.GetText(0);
  }
}
exports.ToggleActionItem = ToggleActionItem;
//# sourceMappingURL=ToggleActionItem.js.map
