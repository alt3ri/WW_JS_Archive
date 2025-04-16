"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ToggleActionItem = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
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
      (this.S1a = void 0),
      (this.eZi = void 0),
      (this.Text = void 0),
      (this.ToggleIndexInline = 0),
      (this.LevelSequencePlayer = void 0),
      (this.j5e = void 0),
      (this.$Js = 0),
      (this.DefaultToggleItemHeight = 0),
      (this.Qoa = void 0),
      (this.Rqe = void 0),
      (this.hMa = void 0),
      (this.E1a = !0),
      (this.lMa = void 0),
      (this.IsPlayingReleaseSequence = !1),
      (this.J_ = () => {
        var t = this.dua();
        (this.hMa?.X === t.X && this.hMa?.Y === t.Y) ||
          ((this.hMa = t), this.y1a());
      }),
      (this.dua = () => {
        var t = Global_1.Global.CharacterController,
          i = (0, puerts_1.$ref)(0),
          e = (0, puerts_1.$ref)(0),
          t = (t.GetViewportSize(i, e), (0, puerts_1.$unref)(i)),
          i = (0, puerts_1.$unref)(e);
        return new UE.IntPoint(t, i);
      }),
      (this.ToggleClick = (t) => {
        this.IsPlayingReleaseSequence || (this.j5e && this.j5e(t));
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
        ((this.S1a = t.GetUIItem()),
        (this.eZi = this.GetText(0)),
        (this.LevelSequencePlayer =
          new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
        this.Toggle.SetToggleStateForce(0, !1, !0),
        (this.Qoa = this.GetRootActor().GetComponentByClass(
          UE.UISizeControlByOther.StaticClass(),
        )),
        this.GetText(0));
    (this.$Js = t.GetSize()),
      (this.DefaultToggleItemHeight = this.S1a.GetHeight()),
      (this.Rqe = TickSystem_1.TickSystem.Add(this.J_, "ToggleActionItemTick")),
      (this.hMa = this.dua());
  }
  OnBeforeDestroy() {
    (this.Toggle = void 0),
      (this.Text = void 0),
      (this.eZi = void 0),
      (this.S1a = void 0),
      (this.IsPlayingReleaseSequence = !1),
      this.LevelSequencePlayer && this.LevelSequencePlayer.Clear(),
      (this.LevelSequencePlayer = void 0),
      (this.Qoa = void 0),
      this.Rqe &&
        (TickSystem_1.TickSystem.Remove(this.Rqe.Id), (this.Rqe = void 0)),
      this.lMa &&
        TimerSystem_1.TimerSystem.Has(this.lMa) &&
        (TimerSystem_1.TimerSystem.Remove(this.lMa), (this.lMa = void 0));
  }
  ShowSequenceOnBegin() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("show");
  }
  async PlayReleaseSequence() {
    (this.IsPlayingReleaseSequence = !0),
      this.SetRaycastTarget(!1),
      await this.LevelSequencePlayer.PlaySequenceAsync(
        "Select",
        new CustomPromise_1.CustomPromise(),
      ),
      this.SetRaycastTarget(!0),
      (this.IsPlayingReleaseSequence = !1);
  }
  SetRaycastTarget(t) {
    this.GetRootItem().SetRaycastTarget(t);
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
        this.lMa ||
          (this.lMa = TimerSystem_1.TimerSystem.Delay(() => {
            this.y1a(), (this.lMa = void 0);
          }, DELAY_REFRESH_TIME)));
  }
  y1a() {
    var t;
    this.eZi && this.S1a
      ? (this.eZi.GetRealSize(),
        (t = this.eZi.GetRenderLineNum() < 2),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiCommon",
            26,
            "[RefreshTextHeight] IsSingleRow",
            ["isSingleRow", t],
            ["this.IsSingleRow", this.E1a],
            ["text", this.Text],
          ),
        this.E1a !== t &&
          ((this.E1a = t),
          this.E1a
            ? (this.Qoa?.SetControlHeight(!1),
              this.eZi.SetFontSize(this.$Js),
              this.eZi.GetRealSize(),
              this.eZi.GetRenderLineNum() < 2 ||
                (this.eZi.SetFontSize(FONT_SIZE),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "UiCommon",
                    26,
                    "[RefreshTextHeight] Enlarge fail",
                    ["text", this.Text],
                  )),
              this.S1a?.SetHeight(this.DefaultToggleItemHeight),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "UiCommon",
                  26,
                  "[RefreshTextHeight] Single height set",
                  ["text", this.Text],
                ))
            : (this.eZi.SetFontSize(FONT_SIZE),
              this.Qoa?.SetControlHeight(!0),
              this.eZi.SetFontSize(FONT_SIZE),
              this.eZi.GetRealSize(),
              this.eZi.GetRenderLineNum() < 2
                ? (this.Qoa?.SetControlHeight(!1),
                  (this.E1a = !0),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "UiCommon",
                      26,
                      "[RefreshTextHeight] Single after reduce size",
                      ["text", this.Text],
                    ))
                : (this.Qoa?.SetControlHeight(!0),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info(
                      "UiCommon",
                      26,
                      "[RefreshTextHeight] Not single after reduce size",
                      ["text", this.Text],
                    )))))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("UiCommon", 26, "[RefreshTextHeight] Refresh Invalid", [
          "text",
          this.Text,
        ]);
  }
  SetToggleTexture(i) {
    const e = this.GetTexture(2);
    if (e) {
      const s = this.GetTexture(2)
        .GetOwner()
        ?.GetComponentByClass(UE.UIExtendToggleTextureTransition.StaticClass());
      let t = void 0;
      s &&
        (t = () => {
          s?.SetAllTransitionStateTexture(e.GetTexture());
        }),
        this.SetTextureByPath(i, e, void 0, t);
    }
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
