"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotTransitionView = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioController_1 = require("../../../../Core/Audio/AudioController");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const ExternalSourceSettingById_1 = require("../../../../Core/Define/ConfigQuery/ExternalSourceSettingById");
const InterjectionByTimberIdAndUniversalToneId_1 = require("../../../../Core/Define/ConfigQuery/InterjectionByTimberIdAndUniversalToneId");
const PlotAudioById_1 = require("../../../../Core/Define/ConfigQuery/PlotAudioById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const PlotAudioModel_1 = require("../PlotAudioModel");
const TYPEWRITERRANGE = 0.01;
const FADEOUTRANGE = 9999;
const FADEMAXTIME = 30;
const PLAY_FLAG = 8;
class PlotTransitionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Q$t = void 0),
      (this.X$t = void 0),
      (this.Uzi = void 0),
      (this.Azi = void 0),
      (this.Pzi = void 0),
      (this.xzi = void 0),
      (this.zNe = 0),
      (this.wzi = void 0),
      (this.B7 = void 0),
      (this.czi = new AudioController_1.PlayResult()),
      (this.Bzi = 0),
      (this.bzi = 0),
      (this.W1e = 0),
      (this.qzi = 1),
      (this.Gzi = 1),
      (this.unt = 0),
      (this.Nzi = void 0),
      (this.Ozi = void 0),
      (this.kzi = void 0),
      (this.Fzi = void 0),
      (this.Vzi = () => {
        let i;
        this.Bzi !== 4 &&
          this.Bzi !== 3 &&
          ((i =
            this.zNe ||
            ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
              .EndWaitTimeCenterText),
          this.Hzi(i));
      }),
      (this.jzi = () => {
        if (this.Bzi === 4 || this.Bzi === 3) {
          let i =
            ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
              .EndWaitTimeCenterText;
          this.W1e > 0 &&
            ((this.Q$t.GetSelector().lineByLine = !1),
            this.Wzi(!1, this.W1e),
            (i = this.W1e)),
            this.Hzi(i);
        }
      }),
      (this.Kzi = () => {
        this.B7 = void 0;
      }),
      (this.Qzi = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            46,
            "PlotTransitionView:OnUpdatePlotCenterText",
          );
        let i;
        let t;
        const e = ModelManager_1.ModelManager.PlotModel.CenterText;
        (this.wzi = e).Text &&
          ((i = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(
            e.Text,
          )),
          (t = this.GetText(0)).SetText(i),
          t.SetUIActive(!0),
          this.Xzi(),
          this.$zi(),
          this.Yzi(i.length)),
          e.Config?.BgImageId &&
            ((t =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                e.Config.BgImageId,
              )),
            ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture, (i) => {
              i?.IsValid() &&
                (this.GetTexture(2).SetTexture(i),
                this.GetTexture(2).SetUIActive(!0));
            })),
          ModelManager_1.ModelManager.GameModeModel.UseShowCenterText
            ? ((this.zNe = 999),
              this.Jzi(),
              this.GetTexture(2).SetUIActive(!0),
              (this.B7 = e.Callback),
              this.ExecuteCallBack())
            : (this.GetButton(3)
                .GetRootComponent()
                .SetUIActive(e.Config?.IsManualNext ?? !1),
              this.ExecuteCallBack(),
              (this.B7 = e.Callback),
              e.AutoClose &&
                (this.zNe || (this.zNe = e.Config?.TotalTime), this.Vzi()),
              this.wzi.AudioId ? this.Jzi() : this.Szi(),
              this.yzi()),
          ModelManager_1.ModelManager.PlotModel.CenterText.Clear();
      }),
      (this.zzi = () => {
        void 0 === this.xzi && this.Ozi && ((this.Ozi = void 0), this.Zzi());
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.zzi]]);
  }
  OnStart() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Plot", 46, "PlotTransitionView:OnStart"),
      (this.X$t = this.GetText(0)
        .GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      (this.Uzi = this.GetTexture(1)
        .GetOwner()
        .GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
      (this.Q$t = this.GetText(0)
        .GetOwner()
        .GetComponentByClass(UE.UIEffectTextAnimation.StaticClass())),
      (this.kzi = (0, puerts_1.toManualReleaseDelegate)(this.jzi)),
      (this.Fzi = this.X$t.GetPlayTween().RegisterOnComplete(this.kzi)),
      this.GetTexture(2).SetUIActive(!1),
      (ModelManager_1.ModelManager.TeleportModel.IsTeleport ||
      ModelManager_1.ModelManager.GameModeModel.UseShowCenterText ||
      ModelManager_1.ModelManager.GameModeModel.PlayTravelMp4
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Plot",
              46,
              "PlotTransitionView:FadeLoading子界面开启",
            ),
          this.GetItem(5).SetUIActive(!0),
          this.GetButton(3).GetRootComponent())
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Plot", 46, "PlotTransitionView:字幕子界面开启"),
          this.GetItem(5))
      ).SetUIActive(!1);
  }
  async OnPlayingStartSequenceAsync() {
    this.Info?.Name === "FadeLoadingView" &&
      (await this.PlaySequenceAsync("Start01"));
  }
  async OnPlayingCloseSequenceAsync() {
    this.Info?.Name === "FadeLoadingView" &&
      (await this.PlaySequenceAsync("Close01"));
  }
  ExecuteCallBack() {
    let i;
    this.B7 && ((i = this.B7), (this.B7 = void 0), i());
  }
  Hzi(i) {
    void 0 !== this.Azi && TimerSystem_1.TimerSystem.Remove(this.Azi),
      (this.Azi = TimerSystem_1.TimerSystem.Delay(() => {
        (this.Azi = void 0),
          this.eZi(),
          this.GetText(0).SetUIActive(!1),
          this.GetTexture(2).SetUIActive(!1),
          this.ExecuteCallBack();
      }, TimeUtil_1.TimeUtil.SetTimeMillisecond(i)));
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPlotTransitionRemoveCallback,
      this.Kzi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdatePlotCenterText,
        this.Qzi,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlotTransitionRemoveCallback,
      this.Kzi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdatePlotCenterText,
        this.Qzi,
      );
  }
  Szi() {
    if (this.wzi.UniversalTone) {
      const i = this.wzi.UniversalTone.TimberId;
      const t = this.wzi.UniversalTone.UniversalToneId;
      if (i && t) {
        const e =
          InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.GetConfig(
            i,
            t,
          );
        if (e) return void this.Ezi(e);
      }
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Plot",
          27,
          "通用语气配置无法获取，策划检查配置",
          ["timberId", i],
          ["universalToneId", t],
        );
    }
  }
  Ezi(i) {
    AudioController_1.AudioController.PostEventByUi(
      i.AkEvent,
      this.czi,
      PLAY_FLAG,
    );
  }
  yzi() {
    let i;
    let t;
    let e = this.wzi.TalkAkEvent;
    e &&
      (i = (0, AudioSystem_1.parseAudioEventPath)(e.AkEvent)) &&
      (e.Type === IAction_1.EPostAkEvent.Global
        ? AudioSystem_1.AudioSystem.PostEvent(i)
        : e.Type === IAction_1.EPostAkEvent.Target &&
          ((e = e.EntityId),
          (t =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 27, "实体不存在", ["entityId", e])),
          (t = t.Entity.GetComponent(1)?.Owner)?.IsValid()
            ? AudioSystem_1.AudioSystem.PostEvent(i, t)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 27, "未能获取到该实体对应的有效Actor", [
                "entityId",
                e,
              ])));
  }
  OnBeforeDestroy() {
    this.X$t.GetPlayTween().UnregisterOnComplete(this.Fzi),
      (0, puerts_1.releaseManualReleaseDelegate)(this.jzi),
      (this.kzi = void 0) !== this.Azi &&
        (TimerSystem_1.TimerSystem.Remove(this.Azi), (this.Azi = void 0)),
      void 0 !== this.Pzi &&
        (TimerSystem_1.TimerSystem.Remove(this.Pzi), (this.Pzi = void 0)),
      void 0 !== this.Ozi &&
        (TimerSystem_1.TimerSystem.Remove(this.Ozi), (this.Ozi = void 0)),
      this.ExecuteCallBack(),
      (this.wzi = void 0),
      (this.Nzi = void 0);
  }
  Wzi(i, t) {
    const e = this.X$t.GetPlayTween();
    (e.from = i ? 1 : 0), (e.to = i ? 0 : 1), (e.duration = t), this.X$t.Play();
  }
  tZi(i) {
    const t = this.X$t.GetPlayTween()?.GetTweener();
    t && (i ? (t.Pause(), this.iZi(!0)) : (t.Resume(), this.iZi(!1)));
  }
  oZi(i, t) {
    const e = this.Uzi.GetPlayTween();
    (e.from = i ? this.GetTexture(1).GetAlpha() : 0),
      (e.to = i ? 0 : 1),
      (e.duration = t),
      this.Uzi.Play();
  }
  Jzi() {
    const i = StringUtils_1.StringUtils.IsEmpty(this.wzi.AudioId)
      ? void 0
      : PlotAudioById_1.configPlotAudioById.GetConfig(this.wzi.AudioId);
    i && this.rZi(i);
  }
  rZi(i) {
    const t =
      ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
        i.ExternalSourceSetting,
      );
    var i = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName([
      i.IsCheckSex,
      i.FileName,
    ]);
    AudioController_1.AudioController.PostEventByExternalSourcesByUi(
      t.AudioEventPath,
      i,
      t.ExternalSrcName,
      this.czi,
      void 0,
      PLAY_FLAG,
    );
  }
  iZi(i) {
    if (this.PlayEventResult)
      if (i)
        for (const t of this.czi.PlayingIds)
          AudioController_1.AudioController.PauseAudioByPlayId(t);
      else
        for (const e of this.czi.PlayingIds)
          AudioController_1.AudioController.ResumeAudioByPlayId(e);
  }
  eZi() {
    AudioController_1.AudioController.StopEvent(this.czi);
  }
  Xzi() {
    const i = this.wzi;
    const t = this.GetText(0);
    var e = i.Config?.TextStyle?.TextAlign;
    var e =
      (e === IAction_1.ETextAlign.Bottom
        ? (t.SetAnchorVAlign(3),
          t.SetPivot(Vector2D_1.Vector2D.Create(0.5, -1).ToUeVector2D()))
        : e === IAction_1.ETextAlign.Top
          ? (t.SetAnchorVAlign(1),
            t.SetPivot(Vector2D_1.Vector2D.Create(0.5, 2).ToUeVector2D()))
          : (t.SetAnchorVAlign(2),
            t.SetPivot(Vector2D_1.Vector2D.Create(0.5, 0.5).ToUeVector2D())),
      i.Config?.TextStyle?.TextHorizontal);
    e === IAction_1.ETextHorizontal.Left
      ? t.SetParagraphHorizontalAlignment(0)
      : e === IAction_1.ETextHorizontal.Right
        ? t.SetParagraphHorizontalAlignment(2)
        : t.SetParagraphHorizontalAlignment(1),
      t.SetAnchorOffsetX(0),
      t.SetAnchorOffsetY(0);
  }
  $zi() {
    const t = this.wzi.Config?.TextStyle?.FontSize;
    if (t) {
      const e = this.GetText(0);
      let i = -1;
      t === IAction_1.EFontSize.Big
        ? (i =
            ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
              .CenterTextFontSizeBig)
        : t === IAction_1.EFontSize.Middle
          ? (i =
              ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                .CenterTextFontSizeMiddle)
          : t === IAction_1.EFontSize.Small &&
            (i =
              ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                .CenterTextFontSizeSmall),
        i > 0 && e.SetFontSize(i);
    }
  }
  Yzi(i) {
    const t = this.wzi;
    const e = t.Config?.TextStyle?.ShowAnim;
    if (e) {
      (this.zNe = void 0), this.Q$t.SetSelectorOffset(1);
      let s = t.Config?.IsMulLine ?? !1;
      var o = this.Q$t.GetSelector();
      if (
        ((o.lineByLine = s && e.Type === IAction_1.ECenterTextShowAnim.FadeOut),
        (o.flipDirection = !o.lineByLine),
        o.SetRange(
          e.Type === IAction_1.ECenterTextShowAnim.FadeOut
            ? FADEOUTRANGE
            : TYPEWRITERRANGE,
        ),
        s && e.Type === IAction_1.ECenterTextShowAnim.TypeWriter)
      ) {
        this.Bzi = 3;
        var o =
          e.TextCountPerSecond > 0
            ? e.TextCountPerSecond
            : ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                .TextAnimSpeedSeq;
        var r = (this.Wzi(!0, i / o), this.nZi());
        (this.unt = o),
          r > 1 &&
            ((this.qzi = 1),
            (this.bzi = this.Nzi.Get(this.qzi - 1) / this.unt),
            (this.Gzi = r),
            this.sZi());
      } else if (s && e.Type === IAction_1.ECenterTextShowAnim.FadeOut) {
        this.Q$t.SetSelectorOffset(0), (this.Bzi = 4);
        (o = e.FadeInTime), (r = this.nZi());
        this.Wzi(!1, o * r),
          r > 1 &&
            ((this.qzi = 1),
            (this.bzi = o),
            (this.W1e = e.FadeOutTime),
            (this.Gzi = r),
            this.sZi());
      } else if (e.Type === IAction_1.ECenterTextShowAnim.TypeWriter) {
        this.Bzi = 1;
        (s =
          i /
          (e.TextCountPerSecond > 0
            ? e.TextCountPerSecond
            : ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                .TextAnimSpeedSeq)),
          (o = (this.Wzi(!0, s), t.Config?.TotalTime ?? 0));
        this.zNe = o + s;
      } else if (e.Type === IAction_1.ECenterTextShowAnim.FadeOut) {
        this.Bzi = 2;
        r = e.FadeInTime;
        const h = e.FadeOutTime;
        this.Wzi(!0, r);
        i = t.Config?.TotalTime ?? 0;
        (this.Pzi = TimerSystem_1.TimerSystem.Delay(
          () => {
            this.Wzi(!1, h), (this.Pzi = void 0);
          },
          TimeUtil_1.TimeUtil.SetTimeMillisecond(r + i),
        )),
          (this.zNe = r + i + h);
      } else this.Q$t.SetSelectorOffset(0);
    } else this.Q$t.SetSelectorOffset(0);
  }
  sZi() {
    this.qzi >= this.Gzi ||
      (this.Pzi = TimerSystem_1.TimerSystem.Delay(() => {
        this.tZi(!0), (this.Pzi = void 0), this.aZi();
      }, TimeUtil_1.TimeUtil.SetTimeMillisecond(this.bzi)));
  }
  aZi() {
    this.Ozi = TimerSystem_1.TimerSystem.Delay(() => {
      (this.Ozi = void 0), this.Zzi();
    }, TimeUtil_1.TimeUtil.SetTimeMillisecond(ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig.EndWaitTimeCenterText));
  }
  Zzi() {
    this.tZi(!1),
      (this.qzi = this.qzi + 1),
      this.Bzi === 3 && (this.bzi = this.Nzi.Get(this.qzi - 1) / this.unt),
      this.sZi();
  }
  nZi() {
    if (!this.Nzi) {
      const i = this.GetText(0);
      const t = (0, puerts_1.$ref)(void 0);
      i.GetTextLineNumArray(t), (this.Nzi = (0, puerts_1.$unref)(t));
      for (let i = 0; i < this.Nzi.Num(); i++) {
        const e = this.Nzi.Get(i);
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Temp", 36, "LineNumArray", ["element", e]);
      }
    }
    return this.Nzi.Num();
  }
  FadeInScreen(i, t) {
    this.GetButton(3).GetRootComponent().SetUIActive(!1);
    const e = i?.Ease?.Duration
      ? MathUtils_1.MathUtils.Clamp(i.Ease.Duration, 0, FADEMAXTIME)
      : 1;
    i?.ScreenType === IAction_1.EFadeInScreenShowType.White &&
      this.GetTexture(1).SetColor(ColorUtils_1.ColorUtils.ColorWhile),
      this.oZi(!1, e),
      this.ExecuteCallBack(),
      (this.B7 = t),
      void 0 !== this.xzi && TimerSystem_1.TimerSystem.Remove(this.xzi),
      (this.xzi = TimerSystem_1.TimerSystem.Delay(() => {
        this.ExecuteCallBack(), (this.xzi = void 0);
      }, TimeUtil_1.TimeUtil.SetTimeMillisecond(e)));
  }
  FadeOutScreen(i, t) {
    this.GetButton(3).GetRootComponent().SetUIActive(!1);
    i = i?.Ease?.Duration
      ? MathUtils_1.MathUtils.Clamp(i.Ease.Duration, 0, FADEMAXTIME)
      : 1;
    this.oZi(!0, i),
      this.ExecuteCallBack(),
      (this.B7 = t),
      void 0 !== this.xzi && TimerSystem_1.TimerSystem.Remove(this.xzi),
      (this.xzi = TimerSystem_1.TimerSystem.Delay(() => {
        this.ExecuteCallBack(), (this.xzi = void 0);
      }, TimeUtil_1.TimeUtil.SetTimeMillisecond(i)));
  }
}
exports.PlotTransitionView = PlotTransitionView;
// # sourceMappingURL=PlotTransitionView.js.map
