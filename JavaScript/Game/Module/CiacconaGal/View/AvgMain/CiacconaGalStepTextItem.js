"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalStepTextItem = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  PlotAudioById_1 = require("../../../../../Core/Define/ConfigQuery/PlotAudioById"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  PlotAudioModel_1 = require("../../../Plot/PlotAudioModel"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CiacconaGalDefine_1 = require("../../CiacconaGalDefine"),
  CiacconaGalUtils_1 = require("../../CiacconaGalUtils");
class CiacconaGalTextAnimHandler {
  constructor(i) {
    (this.Z11 = i), (this.Pe = void 0), (this.r1t = 0), (this.ae = 0);
  }
  get oRe() {
    if (this.Z11 && this.Z11.IsValid()) return this.Z11;
  }
  SetData(i) {
    this.Pe = i;
  }
  Play() {
    this.Jqc();
    var i,
      t = PlotAudioById_1.configPlotAudioById.GetConfig(this.Pe.TalkTid);
    t
      ? ((t = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(t)),
        (i = CiacconaGalDefine_1.CIACCONA_VOICE_AUDIO_EVENT),
        (CiacconaGalTextAnimHandler.Zwc = AudioSystem_1.AudioSystem.PostEvent(
          i,
          void 0,
          {
            ExternalSourceName:
              CiacconaGalDefine_1.CIACCONA_VOICE_EXTN_SRC_NAME,
            ExternalSourceMediaName: t,
            CallbackMask: 8,
            CallbackHandler: (i, t) => {
              var e;
              3 === i &&
                ((i = t.Duration),
                (this.r1t = i),
                (t = this.oRe.GetPlayTween()),
                (e =
                  CiacconaGalUtils_1.CiacconaGalUtils.GetAvgTextAnimShortenTime()),
                (t.duration = Math.max(
                  i / MathUtils_1.MathUtils.SecondToMillisecond - e,
                  1,
                )),
                (t.from = 0.9),
                (t.to = 0.05),
                this.oRe.Play(),
                (this.ae = Time_1.Time.NowSeconds));
            },
          },
        )))
      : this.EPc();
  }
  EPc() {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "CiacconaGal",
        74,
        "剧情步骤没有语音配置，使用默认速率播放",
        ["StepId", this.Pe.Id],
      );
    var i = this.Pe.TextAnimDefaultDuration;
    (this.r1t = i),
      (this.oRe.GetPlayTween().duration = i),
      this.oRe.Play(),
      (this.ae = TimeUtil_1.TimeUtil.GetServerTime());
  }
  Stop() {
    this.Jqc(), this.oRe?.GetPlayTween()?.GetTweener()?.Kill();
  }
  Skip() {
    var i,
      t,
      e,
      s = this.oRe.GetPlayTween().GetTweener();
    s &&
      ((e = Time_1.Time.NowSeconds - this.ae),
      (e = this.r1t * TimeUtil_1.TimeUtil.Millisecond - e),
      (i = CiacconaGalUtils_1.CiacconaGalUtils.GetAvgSkippingTime()),
      (t = s.GetSpeed()),
      (e = Math.max(e / i, 1)),
      s.SetSpeed(t * e));
  }
  Jqc() {
    CiacconaGalTextAnimHandler.Zwc &&
      (AudioSystem_1.AudioSystem.ExecuteAction(
        CiacconaGalTextAnimHandler.Zwc,
        0,
        {
          TransitionDuration:
            CiacconaGalDefine_1.CIACCONA_VO_CROSSFADE_DURATION,
        },
      ),
      (CiacconaGalTextAnimHandler.Zwc = 0));
  }
}
CiacconaGalTextAnimHandler.Zwc = 0;
class CiacconaGalStepTextItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.oRe = void 0),
      (this.Gbc = void 0),
      (this.Fbc = void 0),
      (this.Nbc = void 0),
      (this.Vbc = void 0),
      (this.AS1 = void 0),
      (this.W_c = () => {
        ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.OnAnimEnd();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    (this.Gbc = this.GetText(0)),
      (this.oRe = this.Gbc.GetOwner().GetComponentByClass(
        UE.LGUIPlayTweenComponent.StaticClass(),
      )),
      (this.Fbc = (0, puerts_1.toManualReleaseDelegate)(this.W_c)),
      (this.Nbc = this.oRe.GetPlayTween().RegisterOnComplete(this.Fbc)),
      (this.Vbc = new CiacconaGalTextAnimHandler(this.oRe));
  }
  OnBeforeDestroy() {
    this.oRe?.GetPlayTween()?.UnregisterOnComplete(this.Nbc),
      (0, puerts_1.releaseManualReleaseDelegate)(this.W_c),
      (this.Nbc = void 0),
      this.oRe?.Stop(),
      this.AS1 &&
        TimerSystem_1.TimerSystem.Has(this.AS1) &&
        (TimerSystem_1.TimerSystem.Remove(this.AS1), (this.AS1 = void 0));
  }
  Refresh(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.Gbc, i.TalkTid),
      i.Id ===
      ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer
        .CurHandlingStepId
        ? (this.Gbc.SetChangeColor(!1, this.Gbc.changeColor),
          ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.HasPlayedStepAnim(
            i.Id,
          ) ||
            (this.Gbc.SetUIActive(!1),
            this.Vbc.SetData(i),
            ControllerHolder_1.ControllerHolder.CiacconaGalController.GalPlayer.SetAnimHandler(
              this.Vbc,
            ),
            this.Vbc.Play(),
            this.AS1 &&
              TimerSystem_1.TimerSystem.Has(this.AS1) &&
              (TimerSystem_1.TimerSystem.Remove(this.AS1), (this.AS1 = void 0)),
            (this.AS1 = TimerSystem_1.TimerSystem.Delay(() => {
              this.Gbc && this.Gbc.IsValid() && this.Gbc.SetUIActive(!0);
            }, CiacconaGalDefine_1.DELAY_SHOW_FOR_TEXT_ANIM))))
        : (this.Gbc.SetUIActive(!0),
          this.Gbc.SetChangeColor(!0, this.Gbc.changeColor));
  }
}
exports.CiacconaGalStepTextItem = CiacconaGalStepTextItem;
//# sourceMappingURL=CiacconaGalStepTextItem.js.map
