"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotTextCommonLogic =
    exports.PlotAudioDelegate =
    exports.PLAY_FLAG =
      void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ExternalSourceSettingById_1 = require("../../../../Core/Define/ConfigQuery/ExternalSourceSettingById"),
  InterjectionByTimberIdAndUniversalToneId_1 = require("../../../../Core/Define/ConfigQuery/InterjectionByTimberIdAndUniversalToneId"),
  PlotAudioById_1 = require("../../../../Core/Define/ConfigQuery/PlotAudioById"),
  SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  PublicUtil_1 = require("../../../Common/PublicUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  PlotAudioModel_1 = require("../PlotAudioModel"),
  PlotPortraitItem_1 = require("./PlotPortraitItem"),
  MAX_LOAD_AUDIO_TIME = 3e3,
  BREAK_TIME = 1e3,
  OPTIONHEIGHT_OFFSET = 265;
exports.PLAY_FLAG = 8;
class PlotAudioDelegate {
  constructor() {
    (this.AudioDelegate = void 0),
      (this.AudioDelegateEnable = !1),
      (this.Callback = void 0),
      (this.sZi = (t, i) => {
        this.AudioDelegateEnable
          ? 3 === t &&
            ((t = i),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Plot", 22, "回调音频时长", ["", t.Duration]),
            this.Callback(t.Duration))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Plot", 18, "回调没移除成功");
      });
  }
  Init(t) {
    this.Callback = t;
  }
  Clear() {
    this.Disable(), (this.Callback = void 0);
  }
  Enable() {
    this.AudioDelegateEnable ||
      ((this.AudioDelegate = (0, puerts_1.toManualReleaseDelegate)(this.sZi)),
      (this.AudioDelegateEnable = !0));
  }
  Disable() {
    void 0 !== this.AudioDelegate &&
      ((0, puerts_1.releaseManualReleaseDelegate)(this.sZi),
      (this.AudioDelegate = void 0)),
      (this.AudioDelegateEnable = !1);
  }
}
exports.PlotAudioDelegate = PlotAudioDelegate;
class PlotTextCommonLogic {
  constructor(t, i, e, o, s, h, r) {
    (this.PlotItem = t),
      (this.NpcName = i),
      (this.NpcTitle = e),
      (this.PlotContent = o),
      (this.LineItem = s),
      (this.TextScrollView = h),
      (this.OptionAdjustItem = r),
      (this.CurrentContent = void 0),
      (this.$bn = ""),
      (this.Nra = 0),
      (this.PlayDelayTime = void 0),
      (this.K2n = void 0),
      (this.lZi = -1),
      (this.uZi = void 0),
      (this.Q2n = 1),
      (this.X2n = !1),
      (this.y$t = !1),
      (this.$2n = !1),
      (this.Y2n = void 0),
      (this.Fbn = 0),
      (this.Vbn = 0),
      (this.Hbn = void 0),
      (this.jbn = void 0),
      (this.Wbn = () => {
        if (((this.Y2n = void 0), this.Kbn(), this.TextScrollView)) {
          var o = this.PlotContent.GetTextRenderSize().Y,
            s = this.TextScrollView.GetRootComponent();
          if (o <= this.Nra)
            s.SetHeight(this.Nra),
              this.OptionAdjustItem?.SetHeight(this.Nra + OPTIONHEIGHT_OFFSET);
          else {
            var h = this.PlotContent.GetRenderLineNum(),
              r = this.PlotContent.GetFontSpaceFinal().Y;
            if (h <= 6)
              s.SetHeight(o + r),
                this.OptionAdjustItem?.SetHeight(o + r + OPTIONHEIGHT_OFFSET);
            else {
              let i = 0;
              for (let t = 1; t <= 6; t++)
                i += this.PlotContent.GetRenderLineHeight(t) + r;
              s.SetHeight(i),
                this.OptionAdjustItem?.SetHeight(i + OPTIONHEIGHT_OFFSET);
              o = this.Qbn();
              let t =
                CommonParamById_1.configCommonParamById.GetIntConfig(
                  "PlotAutoScrollDelayCharNum",
                ) ?? 25;
              var s = this.PlotContent.GetDisplayCharLength(),
                l =
                  ((t = s <= t ? this.PlotContent.GetRenderLineCharNum(0) : t) /
                    o) *
                  1e3,
                s = s - t;
              let e = s;
              1 < h && (e = s - this.PlotContent.GetRenderLineCharNum(0)),
                (this.Fbn = (e / o) * 1e3),
                (this.jbn = TimerSystem_1.TimerSystem.Delay(this.Xbn, l));
            }
          }
        }
      }),
      (this.Xbn = () => {
        this.Vbn = 0;
        this.Hbn = TimerSystem_1.TimerSystem.Forever(() => {
          var t = this.Vbn / this.Fbn;
          this.TextScrollView?.SetScrollProgress(t),
            1 <= t &&
              TimerSystem_1.TimerSystem.Has(this.Hbn) &&
              TimerSystem_1.TimerSystem.Remove(this.Hbn),
            (this.Vbn += 100);
        }, 100);
      }),
      (this.cZi = void 0),
      (this.mZi = void 0),
      (this.SubtitleAnimationTimer = void 0),
      (this.IsInteraction = !1),
      (this.IsTextAnimPlaying = !1),
      (this.dZi = void 0),
      (this.CZi = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 打字机结束"),
          (this.cZi.GetPlayTween().from = 1),
          this.gZi(),
          (this.IsTextAnimPlaying = !1),
          (this.y$t = !0),
          this.dZi?.();
      }),
      (this.fZi = void 0),
      this.PlotItem.SetUIActive(!1),
      this.LineItem.SetUIActive(!1),
      (this.cZi = this.PlotContent.GetOwner().GetComponentByClass(
        UE.LGUIPlayTweenComponent.StaticClass(),
      )),
      (this.mZi = this.PlotContent.GetOwner().GetComponentByClass(
        UE.UIEffectTextAnimation.StaticClass(),
      )),
      (this.$bn = LanguageSystem_1.LanguageSystem.PackageAudio),
      (this.Nra = h?.GetRootComponent()?.GetHeight() ?? 174);
  }
  Clear() {
    this.gZi(),
      this.ClearCurPlayAudio(),
      ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon &&
        ((ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = !1),
        this.fZi?.Destroy(),
        (this.fZi = void 0)),
      this.Y2n?.Remove(),
      (this.Y2n = void 0),
      this.Kbn();
  }
  UpdatePlotSubtitle(t) {
    let i = !1;
    (i =
      "SystemOption" === t.Type ? (t.OptionConfig.KeepPreTalkItem ?? !1) : i) ||
      this.ClearPlotContent(),
      (this.IsInteraction = !1),
      this.PlaySubtitle(t);
  }
  ClearPlotContent() {
    (this.uZi = void 0),
      (this.X2n = !1),
      (this.y$t = !1),
      (this.IsInteraction = !1),
      (this.$2n = !1),
      (this.Q2n = 1),
      this.gZi(),
      this.ClearCurPlayAudio(),
      this.Kbn(),
      this.Y2n?.Remove(),
      (this.Y2n = void 0),
      (this.CurrentContent = void 0);
  }
  pZi(t = !0) {
    if (!this.$2n && this.CurrentContent.UniversalTone) {
      var i = this.CurrentContent.UniversalTone.TimberId ?? this.uZi?.TimberId,
        e = this.CurrentContent.UniversalTone.UniversalToneId;
      if (i && e) {
        var o =
          InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.GetConfig(
            i,
            e,
          );
        if (o) return this.vZi(o, t), !0;
      }
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Plot",
          27,
          "通用语气配置无法获取，策划检查配置",
          ["timberId", i],
          ["universalToneId", e],
        );
    }
    return !1;
  }
  MZi() {
    var t,
      i,
      e = this.CurrentContent.TalkAkEvent;
    e &&
      (t = (0, AudioSystem_1.parseAudioEventPath)(e.AkEvent)) &&
      (e.Type === IAction_1.EPostAkEvent.Global
        ? AudioSystem_1.AudioSystem.PostEvent(t)
        : e.Type === IAction_1.EPostAkEvent.Target &&
          ((e = e.EntityId),
          (i =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 27, "实体不存在", ["entityId", e])),
          (i = i.Entity.GetComponent(1)?.Owner)?.IsValid()
            ? AudioSystem_1.AudioSystem.PostEvent(t, i)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 27, "未能获取到该实体对应的有效Actor", [
                "entityId",
                e,
              ])));
  }
  EZi() {
    if (this.$2n) return !1;
    if (
      (this.$bn !== LanguageSystem_1.LanguageSystem.PackageAudio &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "[PlotTextLogic] 恢复时：音频切换了语言，重播",
          ),
        (this.$bn = LanguageSystem_1.LanguageSystem.PackageAudio),
        this.ClearCurPlayAudio()),
      -1 !== this.lZi)
    )
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 恢复时：恢复音频播放"),
        AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 2, {
          TransitionDuration: BREAK_TIME,
        }),
        this.hZi();
    else if (this.K2n) this.K2n.Resume();
    else {
      var t = this.CurrentContent.PlayVoice
        ? PlotAudioById_1.configPlotAudioById.GetConfig(
            this.CurrentContent.TidTalk,
          )
        : void 0;
      if (!t) return !1;
      var i =
        ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
          t.ExternalSourceSetting,
        );
      const e = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(t);
      t = (0, AudioSystem_1.parseAudioEventPath)(i.AudioEventPath);
      PlotTextCommonLogic.Ybn++;
      const o = PlotTextCommonLogic.Ybn;
      (this.lZi = AudioSystem_1.AudioSystem.PostEvent(t, void 0, {
        ExternalSourceName: i.ExternalSrcName,
        ExternalSourceMediaName: e,
        CallbackMask: 1048584,
        CallbackHandler: (t, i) => {
          o !== PlotTextCommonLogic.Ybn
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Plot",
                27,
                "[PlotViewHud] 废弃的音频回调",
                ["id", o],
                ["mediaName", e],
                ["type", t],
              )
            : 0 === t
              ? (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 音频播放完毕", [
                    "mediaName",
                    e,
                  ]),
                (this.$2n = !0),
                (this.lZi = -1),
                PlotTextCommonLogic.Ybn++)
              : 3 === t &&
                ((this.PlayDelayTime = i.Duration),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Plot",
                    27,
                    "[PlotTextLogic] 音频播放开始",
                    ["mediaName", e],
                    ["duration", this.PlayDelayTime],
                  ),
                this.aZi(),
                ModelManager_1.ModelManager.PlotModel.PlotTemplate.HandleMouthAnim(
                  this.CurrentContent,
                ),
                this.X2n || this.hZi());
        },
      })),
        (this.K2n = TimerSystem_1.TimerSystem.Delay(() => {
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              27,
              "[PlotTextLogic] 加载剧情音频超时，直接显示剧情文本",
            ),
            this.ClearCurPlayAudio(),
            (this.PlayDelayTime = void 0),
            this.hZi();
        }, MAX_LOAD_AUDIO_TIME));
    }
    return !0;
  }
  vZi(t, e) {
    if (this.K2n) this.K2n.Resume();
    else if (
      (this.$bn !== LanguageSystem_1.LanguageSystem.PackageAudio &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "[PlotTextLogic] 恢复时：音频切换了语言，重播",
          ),
        (this.$bn = LanguageSystem_1.LanguageSystem.PackageAudio),
        this.ClearCurPlayAudio()),
      -1 !== this.lZi)
    )
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 恢复时：恢复音频播放"),
        AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 2, {
          TransitionDuration: BREAK_TIME,
        }),
        e && this.hZi();
    else {
      const o = (0, AudioSystem_1.parseAudioEventPath)(t.AkEvent),
        s = PlotTextCommonLogic.Ybn;
      (this.lZi = AudioSystem_1.AudioSystem.PostEvent(o, void 0, {
        CallbackMask: 1048584,
        CallbackHandler: (t, i) => {
          s !== PlotTextCommonLogic.Ybn
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Plot",
                27,
                "[PlotViewHud] 废弃的音频回调",
                ["id", s],
                ["eventName", o],
                ["type", t],
              )
            : 0 === t
              ? (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 音频播放完毕", [
                    "eventName",
                    o,
                  ]),
                (this.$2n = !0),
                (this.lZi = -1),
                PlotTextCommonLogic.Ybn++)
              : 3 === t &&
                ((this.PlayDelayTime = i.Duration),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Plot",
                    27,
                    "[PlotTextLogic] 音频播放开始",
                    ["eventName", o],
                    ["duration", this.PlayDelayTime],
                  ),
                this.aZi(),
                !this.X2n) &&
                e &&
                this.hZi();
        },
      })),
        e &&
          (this.K2n = TimerSystem_1.TimerSystem.Delay(() => {
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Plot",
                18,
                "加载通用语气音频超时，直接显示剧情文本",
              ),
              this.ClearCurPlayAudio(),
              (this.PlayDelayTime = void 0),
              this.hZi();
          }, MAX_LOAD_AUDIO_TIME));
    }
  }
  ClearCurPlayAudio() {
    this.aZi(),
      PlotTextCommonLogic.Ybn++,
      AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 0, {
        TransitionDuration: 0,
      }),
      (this.lZi = -1);
  }
  aZi() {
    TimerSystem_1.TimerSystem.Has(this.K2n) &&
      TimerSystem_1.TimerSystem.Remove(this.K2n),
      (this.K2n = void 0);
  }
  PlaySubtitle(t) {
    var i;
    (this.CurrentContent = t),
      this.MZi(),
      "Option" === this.CurrentContent.Type ||
      "SystemOption" === this.CurrentContent.Type
        ? (this.ClearCurPlayAudio(), this.pZi(!1))
        : ((i = this.CurrentContent.CaptionParams),
          (this.uZi = SpeakerById_1.configSpeakerById.GetConfig(
            this.CurrentContent.WhoId,
          )),
          i && !i.StartTime
            ? (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Plot",
                  27,
                  "配置了字幕参数的无法播放语音",
                  ["id", t?.Id],
                  ["param", t?.CaptionParams],
                ),
              this.hZi(i.TotalTime, i.IntervalTime))
            : this.EZi() || this.pZi() || this.hZi());
  }
  PauseSubtitle() {
    this.CurrentContent &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 暂停字幕"),
      (this.X2n = !0),
      this.K2n
        ? (this.K2n.Pause(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 暂停时：音频加载中"))
        : (-1 !== this.lZi &&
            (AudioSystem_1.AudioSystem.ExecuteAction(this.lZi, 1, {
              TransitionDuration: BREAK_TIME,
            }),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 暂停时：音频播放中"),
          this.Y2n?.Remove(),
          (this.Y2n = void 0),
          this.Kbn(),
          this.SubtitleAnimationTimer &&
            ((this.Q2n = this.mZi.GetSelectorOffset()),
            this.cZi.Stop(),
            this.SubtitleAnimationTimer.Pause(),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "Plot",
              27,
              "[PlotTextLogic] 暂停时：打字机播放中",
              ["offset", this.Q2n],
            )));
  }
  ResumeSubtitle(t) {
    (this.X2n = !1), this.PlaySubtitle(t);
  }
  hZi(t, i) {
    this.SZi(),
      this.yZi(),
      this.IZi(t, i),
      (this.Y2n = TimerSystem_1.TimerSystem.Next(this.Wbn));
  }
  SZi() {
    var t;
    this.PlotItem.SetUIActive(!0),
      (this.CurrentContent.Type && "Talk" !== this.CurrentContent.Type) ||
      "InnerVoice" === this.CurrentContent.Style?.Type
        ? (this.LineItem.SetUIActive(!1),
          this.NpcName.SetUIActive(!1),
          this.NpcTitle.SetUIActive(!1))
        : (this.LineItem.SetUIActive(!0),
          (t = PublicUtil_1.PublicUtil.GetConfigTextByTable(0, this.uZi.Id)),
          StringUtils_1.StringUtils.IsEmpty(t)
            ? this.NpcName.SetUIActive(!1)
            : (this.NpcName.SetUIActive(!0), this.NpcName.SetText(t)),
          (t = PublicUtil_1.PublicUtil.GetConfigTextByTable(1, this.uZi.Id)),
          StringUtils_1.StringUtils.IsEmpty(t)
            ? this.NpcTitle.SetUIActive(!1)
            : (this.NpcTitle.SetUIActive(!0), this.NpcTitle.SetText(t)));
  }
  yZi() {
    let t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(
      this.CurrentContent.TidTalk,
    );
    StringUtils_1.StringUtils.IsEmpty(t) &&
      (ControllerHolder_1.ControllerHolder.FlowController.LogError("字幕为空", [
        "id",
        this.CurrentContent.TidTalk,
      ]),
      (t = this.CurrentContent.TidTalk));
    var i =
      "LevelD" === ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel;
    (t = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t, i)),
      this.PlotContent.SetText(t);
  }
  Qbn() {
    return this.IsInteraction
      ? ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
          .TextAnimSpeedInteraction
      : "LevelC" === ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel
        ? ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
            .TextAnimSpeedLevelC
        : ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
            .TextAnimSpeedLevelD;
  }
  Kbn() {
    TimerSystem_1.TimerSystem.Has(this.Hbn) &&
      TimerSystem_1.TimerSystem.Remove(this.Hbn),
      TimerSystem_1.TimerSystem.Has(this.jbn) &&
        TimerSystem_1.TimerSystem.Remove(this.jbn);
  }
  IZi(i, e) {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 39, "CD级", [
          "字幕：",
          this.PlotContent.GetText(),
        ]),
      this.cZi)
    )
      if (this.SubtitleAnimationTimer)
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "[PlotTextLogic] 恢复时：恢复打字机动画",
            ["offset", this.Q2n],
          ),
          this.SubtitleAnimationTimer.Resume(),
          (this.cZi.GetPlayTween().from = this.Q2n),
          (this.cZi.GetPlayTween().duration *= this.Q2n),
          this.cZi.Play();
      else if (this.y$t) this.mZi.SetSelectorOffset(0);
      else {
        var o = this.PlotContent.GetDisplayCharLength();
        this.cZi.Stop();
        let t = 1;
        (t =
          i ||
          (this.IsInteraction
            ? o /
              ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                .TextAnimSpeedInteraction
            : "LevelC" ===
                ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel
              ? o /
                ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                  .TextAnimSpeedLevelC
              : o /
                ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                  .TextAnimSpeedLevelD)),
          this.mZi.SetSelectorOffset(1),
          (this.cZi.GetPlayTween().duration = t),
          this.cZi.Play(),
          (this.IsTextAnimPlaying = !0),
          (t *= CommonDefine_1.MILLIONSECOND_PER_SECOND),
          e
            ? (this.PlayDelayTime = e * CommonDefine_1.MILLIONSECOND_PER_SECOND)
            : this.PlayDelayTime
              ? (this.PlayDelayTime = this.PlayDelayTime - t)
              : (this.PlayDelayTime = 0),
          this.TZi(t);
      }
    else
      Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 19, "找不到字幕动画组件"),
        this.CZi();
  }
  TZi(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 打字机开始", [
        "duration",
        t,
      ]),
      this.gZi();
    t = Math.max(t, TimerSystem_1.MIN_TIME);
    this.SubtitleAnimationTimer = TimerSystem_1.TimerSystem.Delay(this.CZi, t);
  }
  gZi() {
    TimerSystem_1.TimerSystem.Has(this.SubtitleAnimationTimer) &&
      TimerSystem_1.TimerSystem.Remove(this.SubtitleAnimationTimer),
      (this.SubtitleAnimationTimer = void 0);
  }
  SetPlotContentAnimFinishCallback(t) {
    this.dZi = t;
  }
  ForceSkipPlotContentAnim() {
    this.cZi.Stop(),
      this.mZi.SetSelectorOffset(0),
      this.Kbn(),
      this.TextScrollView?.SetScrollProgress(1),
      this.CZi();
  }
  GetPlotContentAnimDuration() {
    return this.cZi.GetPlayTween().duration;
  }
  HandlePortraitVisible(t, i, e) {
    i &&
      e &&
      (i.Visible && !ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon
        ? ((ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = !0),
          (this.fZi = new PlotPortraitItem_1.PlotPortraitItem()),
          this.fZi.OpenAsync(t, i.HeadStyleConfig).finally(e))
        : i.Visible && ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon
          ? (this.fZi.CloseAsync(),
            (this.fZi = new PlotPortraitItem_1.PlotPortraitItem()),
            this.fZi.OpenAsync(t, i.HeadStyleConfig).finally(e))
          : !i.Visible &&
              ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon
            ? ((ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = !1),
              this.fZi.CloseAsync().finally(e),
              (this.fZi = void 0))
            : e());
  }
  async DestroyPortraitItem() {
    ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon &&
      ((ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = !1),
      await this.fZi.CloseAsync(),
      (this.fZi = void 0));
  }
}
(exports.PlotTextCommonLogic = PlotTextCommonLogic).Ybn = 0;
//# sourceMappingURL=PlotTextLogic.js.map
