"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DigitalScreenaView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
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
      (this.Lga = 1),
      (this.v6t = ""),
      (this.E6t = ""),
      (this.Rpa = 0),
      (this.Apa = ""),
      (this.Upa = ""),
      (this.xpa = ""),
      (this.Ppa = ""),
      (this.HFo = !1),
      (this.wpa = !1),
      (this.xXt = 0),
      (this.Bpa = 0),
      (this.bpa = ""),
      (this.qpa = 0),
      (this.LevelSequencePlayer = void 0),
      (this.N8a = void 0),
      (this.F8a = void 0);
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
    (ModelManager_1.ModelManager.PlotModel.InDigitalScreen = !0),
      this.Gpa(),
      AudioSystem_1.AudioSystem.PostEvent(LOOP_DIGITAL_SCREEN),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      (this.XYt = this.GetText(2)
        .GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      this.LevelSequencePlayer.PlayLevelSequenceByName("Start"),
      this.LevelSequencePlayer.PlayLevelSequenceByName("Loop"),
      0 === ModelManager_1.ModelManager.DigitalScreenModel?.StartTimes[0]
        ? this.YZi()
        : (this.F8a = TimerSystem_1.TimerSystem.Delay(
            () => {
              this.YZi();
            },
            TimeUtil_1.TimeUtil.SetTimeMillisecond(
              ModelManager_1.ModelManager.DigitalScreenModel?.StartTimes[0] ??
                1,
            ),
          )),
      (this.N8a = TimerSystem_1.TimerSystem.Delay(
        () => {
          this.CloseMe();
        },
        TimeUtil_1.TimeUtil.SetTimeMillisecond(
          ModelManager_1.ModelManager.DigitalScreenModel?.ExistTime ?? 1,
        ),
      ));
  }
  OnBeforeHide() {
    (ModelManager_1.ModelManager.PlotModel.InDigitalScreen = !1),
      this.LevelSequencePlayer.PlayLevelSequenceByName("Close"),
      AudioSystem_1.AudioSystem.ExecuteAction(LOOP_DIGITAL_SCREEN, 0),
      this.Ufa();
  }
  Ufa() {
    this.N8a &&
      TimerSystem_1.TimerSystem.Has(this.N8a) &&
      TimerSystem_1.TimerSystem.Remove(this.N8a),
      this.F8a &&
        TimerSystem_1.TimerSystem.Has(this.F8a) &&
        TimerSystem_1.TimerSystem.Remove(this.F8a);
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
                this.bpa +
                ModelManager_1.ModelManager.DigitalScreenModel?.Text?.substring(
                  this.Bpa,
                  this.xXt,
                ) +
                FONTSUFFIX),
              (t =
                this.bpa +
                ModelManager_1.ModelManager.DigitalScreenModel?.Text?.substring(
                  this.Bpa,
                  this.xXt,
                ) +
                "_" +
                FONTSUFFIX),
              1 === this.Rpa
                ? ((this.Apa = this.v6t + t),
                  (this.Upa = this.v6t + i),
                  this.GetText(1)?.SetText(this.Apa))
                : 0 === this.Rpa &&
                  ((this.xpa = this.E6t + t),
                  (this.Ppa = this.E6t + i),
                  this.GetText(2)?.SetText(this.xpa)));
          }),
        );
    } else
      (this.qpa += i),
        300 <= this.qpa &&
          (0 === this.Rpa
            ? this.wpa
              ? (this.GetText(1)?.SetText(this.Upa), (this.wpa = !1))
              : (this.GetText(1)?.SetText(this.Apa), (this.wpa = !0))
            : 1 === this.Rpa &&
              (this.wpa
                ? (this.GetText(2)?.SetText(this.Ppa), (this.wpa = !1))
                : (this.GetText(2)?.SetText(this.xpa), (this.wpa = !0))),
          (this.qpa = 0));
  }
  Gpa() {
    (this.wZi = -1),
      (this.BZi =
        ModelManager_1.ModelManager.DigitalScreenModel?.StartTimes.length ?? 1),
      (this.Lga = 0),
      StringUtils_1.StringUtils.IsBlank(
        ModelManager_1.ModelManager.DigitalScreenModel.BackgroundPicture,
      ) ||
        this.SetTextureByPath(
          ModelManager_1.ModelManager.DigitalScreenModel.BackgroundPicture,
          this.GetTexture(3),
        ),
      (this.Upa = ""),
      (this.Apa = "_"),
      (this.Ppa = ""),
      (this.xpa = "_"),
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
      (this.Lga = t),
      (this.HFo = !0);
  }
  oeo() {
    this.F8a = TimerSystem_1.TimerSystem.Delay(
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
        : (this.F8a = TimerSystem_1.TimerSystem.Delay(
            () => {
              this.YZi();
            },
            TimeUtil_1.TimeUtil.SetTimeMillisecond(
              ModelManager_1.ModelManager.DigitalScreenModel?.DelayTimes[
                this.wZi
              ] ?? 1,
            ),
          )));
  }
  YZi() {
    this.GetText(1)?.SetText(this.Upa),
      this.GetText(2)?.SetText(this.Ppa),
      (this.wZi = this.wZi + 1),
      (this.Rpa =
        0 ===
        ModelManager_1.ModelManager.DigitalScreenModel.ContentPos[this.wZi]
          ? 0
          : 1),
      (this.Bpa = this.xXt),
      (this.v6t = this.Upa),
      (this.E6t = this.Ppa),
      (this.bpa =
        "<size=" +
        ModelManager_1.ModelManager.DigitalScreenModel.Font[
          this.wZi
        ].toString() +
        ">"),
      this.VZi(
        this.Lga,
        this.Lga +
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
