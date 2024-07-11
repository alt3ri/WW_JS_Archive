"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DigitalScreenaView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../Module/Common/LevelSequencePlayer"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  factor = new UE.FName("factor"),
  FONTSUFFIX = "</size>",
  LOOP_DIGITAL_SCREEN = "play_ui_digital_screen";
class DigitalScreenaView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.XYt = void 0),
      (this.wZi = 0),
      (this.BZi = 1),
      (this.Vda = 1),
      (this.v6t = ""),
      (this.E6t = ""),
      (this.Bga = 0),
      (this.bga = ""),
      (this.qga = ""),
      (this.Gga = ""),
      (this.Oga = ""),
      (this.HFo = !1),
      (this.kga = !1),
      (this.xXt = 0),
      (this.Nga = 0),
      (this.Fga = ""),
      (this.Vga = 0),
      (this.LevelSequencePlayer = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UITexture],
    ];
  }
  OnStart() {
    this.Hga(),
      AudioSystem_1.AudioSystem.PostEvent(LOOP_DIGITAL_SCREEN),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      (this.XYt = this.GetText(2)
        .GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      this.LevelSequencePlayer.PlayLevelSequenceByName("Start", !0),
      this.LevelSequencePlayer.PlayLevelSequenceByName("Loop", !0),
      0 === ModelManager_1.ModelManager.DigitalScreenModel?.StartTimes[0]
        ? this.YZi()
        : TimerSystem_1.TimerSystem.Delay(
            () => {
              this.YZi();
            },
            TimeUtil_1.TimeUtil.SetTimeMillisecond(
              ModelManager_1.ModelManager.DigitalScreenModel?.StartTimes[0] ??
                1,
            ),
          ),
      TimerSystem_1.TimerSystem.Delay(
        () => {
          AudioSystem_1.AudioSystem.ExecuteAction(LOOP_DIGITAL_SCREEN, 0),
            this.LevelSequencePlayer.PlayLevelSequenceByName("Close", !0),
            this.CloseMe();
        },
        TimeUtil_1.TimeUtil.SetTimeMillisecond(
          ModelManager_1.ModelManager.DigitalScreenModel?.ExistTime ?? 1,
        ),
      );
  }
  OnTick(i) {
    if (this.HFo) {
      const e = this.XYt.GetPlayTween();
      var t = e?.GetTweener();
      t &&
        t.OnUpdate(
          (0, puerts_1.toManualReleaseDelegate)((i) => {
            var t,
              i = Math.round(i * (e.to - e.from)) + e.from;
            this.xXt < i &&
              ((this.xXt = i),
              (i =
                this.Fga +
                ModelManager_1.ModelManager.DigitalScreenModel?.Text?.substring(
                  this.Nga,
                  this.xXt,
                ) +
                FONTSUFFIX),
              (t =
                this.Fga +
                ModelManager_1.ModelManager.DigitalScreenModel?.Text?.substring(
                  this.Nga,
                  this.xXt,
                ) +
                "_" +
                FONTSUFFIX),
              1 === this.Bga
                ? ((this.bga = this.v6t + t),
                  (this.qga = this.v6t + i),
                  this.GetText(1)?.SetText(this.bga))
                : 0 === this.Bga &&
                  ((this.Gga = this.E6t + t),
                  (this.Oga = this.E6t + i),
                  this.GetText(2)?.SetText(this.Gga)));
          }),
        );
    } else
      (this.Vga += i),
        300 <= this.Vga &&
          (0 === this.Bga
            ? this.kga
              ? (this.GetText(1)?.SetText(this.qga), (this.kga = !1))
              : (this.GetText(1)?.SetText(this.bga), (this.kga = !0))
            : 1 === this.Bga &&
              (this.kga
                ? (this.GetText(2)?.SetText(this.Oga), (this.kga = !1))
                : (this.GetText(2)?.SetText(this.Gga), (this.kga = !0))),
          (this.Vga = 0));
  }
  Hga() {
    (this.wZi = -1),
      (this.BZi =
        ModelManager_1.ModelManager.DigitalScreenModel?.StartTimes.length ?? 1),
      void (this.Vda = 0) !==
        ModelManager_1.ModelManager.DigitalScreenModel?.BackgroundPicture &&
        this.SetTextureByPath(
          ModelManager_1.ModelManager.DigitalScreenModel?.BackgroundPicture,
          this.GetTexture(3),
        ),
      (this.qga = ""),
      (this.bga = "_"),
      (this.Oga = ""),
      (this.Gga = "_"),
      this.GetText(2)?.SetText(""),
      this.GetText(1)?.SetText(""),
      this.GetText(2)?.SetCustomMaterialScalarParameter(
        factor,
        ModelManager_1.ModelManager.DigitalScreenModel?.TextFactor ?? 0.2,
      ),
      this.GetText(1)?.SetCustomMaterialScalarParameter(
        factor,
        ModelManager_1.ModelManager.DigitalScreenModel?.TextFactor ?? 0.2,
      );
  }
  VZi(i, t, e, s) {
    var h = this.XYt.GetPlayTween();
    (h.from = i),
      (h.to = t),
      (h.duration = e),
      (h.startDelay = s),
      this.XYt.Play(),
      (this.Vda = t),
      (this.HFo = !0);
  }
  oeo() {
    TimerSystem_1.TimerSystem.Delay(
      () => {
        this.reo();
      },
      TimeUtil_1.TimeUtil.SetTimeMillisecond(
        ModelManager_1.ModelManager.DigitalScreenModel?.DuringTimes[this.wZi] ??
          1,
      ),
    );
  }
  reo() {
    this.wZi >= this.BZi ||
      ((this.HFo = !1),
      0 === ModelManager_1.ModelManager.DigitalScreenModel?.DelayTimes[this.wZi]
        ? this.YZi()
        : TimerSystem_1.TimerSystem.Delay(
            () => {
              this.YZi();
            },
            TimeUtil_1.TimeUtil.SetTimeMillisecond(
              ModelManager_1.ModelManager.DigitalScreenModel?.DelayTimes[
                this.wZi
              ] ?? 1,
            ),
          ));
  }
  YZi() {
    this.GetText(1)?.SetText(this.qga),
      this.GetText(2)?.SetText(this.Oga),
      (this.wZi = this.wZi + 1),
      (this.Bga =
        0 ===
        ModelManager_1.ModelManager.DigitalScreenModel.ContentPos[this.wZi]
          ? 0
          : 1),
      (this.Nga = this.xXt),
      (this.v6t = this.qga),
      (this.E6t = this.Oga),
      (this.Fga =
        "<size=" +
        ModelManager_1.ModelManager.DigitalScreenModel.Font[
          this.wZi
        ].toString() +
        ">"),
      this.VZi(
        this.Vda,
        this.Vda +
          ModelManager_1.ModelManager.DigitalScreenModel.TextLength[this.wZi] ??
          1,
        ModelManager_1.ModelManager.DigitalScreenModel?.DuringTimes[this.wZi] ??
          1,
        0,
      ),
      this.oeo();
  }
}
exports.DigitalScreenaView = DigitalScreenaView;
//# sourceMappingURL=DigitalScreenaView.js.map
