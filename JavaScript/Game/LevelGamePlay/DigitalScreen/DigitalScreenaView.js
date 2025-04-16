"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DigitalScreenaView = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
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
      (this.Dga = 1),
      (this.v6t = ""),
      (this.E6t = ""),
      (this.Apa = 0),
      (this.Upa = ""),
      (this.xpa = ""),
      (this.Ppa = ""),
      (this.wpa = ""),
      (this.HFo = !1),
      (this.Bpa = !1),
      (this.xXt = 0),
      (this.bpa = 0),
      (this.qpa = ""),
      (this.Gpa = 0),
      (this.LevelSequencePlayer = void 0),
      (this.L7a = void 0),
      (this.A7a = void 0),
      (this.Tg1 = void 0),
      (this.bg1 = (i) => {
        var t = this.XYt.GetPlayTween(),
          i = Math.round(i * (t.to - t.from)) + t.from;
        this.xXt < i &&
          ((this.xXt = i),
          (t =
            this.qpa +
            ModelManager_1.ModelManager.DigitalScreenModel?.Text?.substring(
              this.bpa,
              this.xXt,
            ) +
            FONTSUFFIX),
          (i =
            this.qpa +
            ModelManager_1.ModelManager.DigitalScreenModel?.Text?.substring(
              this.bpa,
              this.xXt,
            ) +
            "_" +
            FONTSUFFIX),
          1 === this.Apa
            ? ((this.Upa = this.v6t + i),
              (this.xpa = this.v6t + t),
              this.GetText(1)?.SetText(this.Upa))
            : 0 === this.Apa &&
              ((this.Ppa = this.E6t + i),
              (this.wpa = this.E6t + t),
              this.GetText(2)?.SetText(this.Ppa)));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UITexture],
      [4, UE.UISprite],
    ];
  }
  OnStart() {
    (ModelManager_1.ModelManager.PlotModel.InDigitalScreen = !0),
      this.Opa(),
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
        : (this.A7a = TimerSystem_1.TimerSystem.Delay(
            () => {
              this.YZi();
            },
            TimeUtil_1.TimeUtil.SetTimeMillisecond(
              ModelManager_1.ModelManager.DigitalScreenModel?.StartTimes[0] ??
                1,
            ),
          )),
      (this.L7a = TimerSystem_1.TimerSystem.Delay(
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
      this.Lfa();
  }
  Lfa() {
    this.L7a &&
      TimerSystem_1.TimerSystem.Has(this.L7a) &&
      TimerSystem_1.TimerSystem.Remove(this.L7a),
      this.A7a &&
        TimerSystem_1.TimerSystem.Has(this.A7a) &&
        TimerSystem_1.TimerSystem.Remove(this.A7a);
  }
  OnTick(i) {
    this.HFo ||
      ((this.Gpa += i),
      300 <= this.Gpa &&
        (0 === this.Apa
          ? this.Bpa
            ? (this.GetText(1)?.SetText(this.xpa), (this.Bpa = !1))
            : (this.GetText(1)?.SetText(this.Upa), (this.Bpa = !0))
          : 1 === this.Apa &&
            (this.Bpa
              ? (this.GetText(2)?.SetText(this.wpa), (this.Bpa = !1))
              : (this.GetText(2)?.SetText(this.Ppa), (this.Bpa = !0))),
        (this.Gpa = 0)));
  }
  Opa() {
    (this.wZi = -1),
      (this.BZi =
        ModelManager_1.ModelManager.DigitalScreenModel?.StartTimes.length ?? 1),
      (this.Dga = 0),
      StringUtils_1.StringUtils.IsBlank(
        ModelManager_1.ModelManager.DigitalScreenModel.BackgroundPicture,
      ) ||
        this.SetTextureByPath(
          ModelManager_1.ModelManager.DigitalScreenModel.BackgroundPicture,
          this.GetTexture(3),
        ),
      0 !== ModelManager_1.ModelManager.DigitalScreenModel.ViewType ||
        StringUtils_1.StringUtils.IsBlank(
          ModelManager_1.ModelManager.DigitalScreenModel.LogoIcon,
        ) ||
        this.SetSpriteByPath(
          ModelManager_1.ModelManager.DigitalScreenModel.LogoIcon,
          this.GetSprite(4),
          !1,
        ),
      (this.xpa = ""),
      (this.Upa = "_"),
      (this.wpa = ""),
      (this.Ppa = "_"),
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
    var h = this.XYt.GetPlayTween(),
      i =
        ((h.from = i),
        (h.to = t),
        (h.duration = e),
        (h.startDelay = s),
        this.XYt.Play(),
        (this.Dga = t),
        (this.HFo = !0),
        h?.GetTweener());
    i &&
      ((this.Tg1 = (0, puerts_1.toManualReleaseDelegate)(this.bg1)),
      i.OnUpdate(this.Tg1));
  }
  oeo() {
    this.A7a = TimerSystem_1.TimerSystem.Delay(
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
    var i;
    this.wZi >= this.BZi ||
      ((this.HFo = !1),
      (i = this.XYt.GetPlayTween()?.GetTweener()) &&
        (i.OnUpdate(void 0), this.Tg1) &&
        ((0, puerts_1.releaseManualReleaseDelegate)(this.bg1),
        (this.Tg1 = void 0)),
      0 === ModelManager_1.ModelManager.DigitalScreenModel?.DelayTimes[this.wZi]
        ? this.YZi()
        : (this.A7a = TimerSystem_1.TimerSystem.Delay(
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
    this.GetText(1)?.SetText(this.xpa),
      this.GetText(2)?.SetText(this.wpa),
      (this.wZi = this.wZi + 1),
      this.wZi >= ModelManager_1.ModelManager.DigitalScreenModel.Size ||
        ((this.Apa =
          0 ===
          ModelManager_1.ModelManager.DigitalScreenModel.ContentPos[this.wZi]
            ? 0
            : 1),
        (this.bpa = this.xXt),
        (this.v6t = this.xpa),
        (this.E6t = this.wpa),
        (this.qpa =
          "<size=" +
          ModelManager_1.ModelManager.DigitalScreenModel.Font[
            this.wZi
          ].toString() +
          ">"),
        this.VZi(
          this.Dga,
          this.Dga +
            ModelManager_1.ModelManager.DigitalScreenModel.TextLength[this.wZi],
          ModelManager_1.ModelManager.DigitalScreenModel.DuringTimes[this.wZi],
          0,
        ),
        this.oeo());
  }
  async OnBeforeHideAsync() {
    this.OpenParam?.FadeBeforeHide &&
      (await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(
        0,
        3,
      ));
  }
  OnBeforeDestroy() {
    this.Tg1 &&
      ((0, puerts_1.releaseManualReleaseDelegate)(this.bg1),
      (this.Tg1 = void 0));
  }
}
exports.DigitalScreenaView = DigitalScreenaView;
//# sourceMappingURL=DigitalScreenaView.js.map
