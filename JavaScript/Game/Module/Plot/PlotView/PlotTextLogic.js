"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotTextCommonLogic =
    exports.PlotAudioDelegate =
    exports.PLAY_FLAG =
      void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ExternalSourceSettingById_1 = require("../../../../Core/Define/ConfigQuery/ExternalSourceSettingById");
const InterjectionByTimberIdAndUniversalToneId_1 = require("../../../../Core/Define/ConfigQuery/InterjectionByTimberIdAndUniversalToneId");
const PlotAudioById_1 = require("../../../../Core/Define/ConfigQuery/PlotAudioById");
const SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const PublicUtil_1 = require("../../../Common/PublicUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PlotAudioModel_1 = require("../PlotAudioModel");
const PlotPortraitItem_1 = require("./PlotPortraitItem");
const MAX_LOAD_AUDIO_TIME = 3e3;
const BREAK_TIME = 1e3;
const OptionHeight_Offset = 265;
exports.PLAY_FLAG = 8;
class PlotAudioDelegate {
  constructor() {
    (this.AudioDelegate = void 0),
      (this.AudioDelegateEnable = !1),
      (this.Callback = void 0),
      (this.lzi = (t, i) => {
        this.AudioDelegateEnable
          ? t === 3 &&
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
      ((this.AudioDelegate = (0, puerts_1.toManualReleaseDelegate)(this.lzi)),
      (this.AudioDelegateEnable = !0));
  }
  Disable() {
    void 0 !== this.AudioDelegate &&
      ((0, puerts_1.releaseManualReleaseDelegate)(this.lzi),
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
      (this.ywn = ""),
      (this.OVs = 0),
      (this.PlayDelayTime = void 0),
      (this.Bqn = void 0),
      (this.czi = -1),
      (this.dzi = void 0),
      (this.wqn = 1),
      (this.bqn = !1),
      (this.yXt = !1),
      (this.qqn = !1),
      (this.Gqn = void 0),
      (this.Cwn = 0),
      (this.gwn = 0),
      (this.fwn = void 0),
      (this.pwn = void 0),
      (this.vwn = () => {
        if (((this.Gqn = void 0), this.Mwn(), this.TextScrollView)) {
          let o = this.PlotContent.GetTextRenderSize().Y;
          var s = this.TextScrollView.GetRootComponent();
          if (o <= s.GetHeight())
            s.SetHeight(this.OVs),
              this.OptionAdjustItem?.SetHeight(this.OVs + OptionHeight_Offset);
          else {
            const h = this.PlotContent.GetRenderLineNum();
            const r = this.PlotContent.GetFontSpaceFinal().Y;
            if (h <= 6)
              s.SetHeight(o + r),
                this.OptionAdjustItem?.SetHeight(o + r + OptionHeight_Offset);
            else {
              let i = 0;
              for (let t = 1; t <= 6; t++)
                i += this.PlotContent.GetRenderLineHeight(t) + r;
              s.SetHeight(i),
                this.OptionAdjustItem?.SetHeight(i + OptionHeight_Offset);
              o = this.Swn();
              let t =
                CommonParamById_1.configCommonParamById.GetIntConfig(
                  "PlotAutoScrollDelayCharNum",
                ) ?? 25;
              var s = this.PlotContent.GetDisplayCharLength();
              const l =
                ((t = s <= t ? this.PlotContent.GetRenderLineCharNum(0) : t) /
                  o) *
                1e3;
              var s = s - t;
              let e = s;
              h > 1 && (e = s - this.PlotContent.GetRenderLineCharNum(0)),
                (this.Cwn = (e / o) * 1e3),
                (this.pwn = TimerSystem_1.TimerSystem.Delay(this.Ewn, l));
            }
          }
        }
      }),
      (this.Ewn = () => {
        this.gwn = 0;
        this.fwn = TimerSystem_1.TimerSystem.Forever(() => {
          const t = this.gwn / this.Cwn;
          this.TextScrollView?.SetScrollProgress(t),
            t >= 1 &&
              TimerSystem_1.TimerSystem.Has(this.fwn) &&
              TimerSystem_1.TimerSystem.Remove(this.fwn),
            (this.gwn += 100);
        }, 100);
      }),
      (this.Czi = void 0),
      (this.gzi = void 0),
      (this.SubtitleAnimationTimer = void 0),
      (this.IsInteraction = !1),
      (this.IsTextAnimPlaying = !1),
      (this.fzi = void 0),
      (this.pzi = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 打字机结束"),
          (this.Czi.GetPlayTween().from = 1),
          this.vzi(),
          (this.IsTextAnimPlaying = !1),
          (this.yXt = !0),
          this.fzi?.();
      }),
      (this.Mzi = void 0),
      this.PlotItem.SetUIActive(!1),
      this.LineItem.SetUIActive(!1),
      (this.Czi = this.PlotContent.GetOwner().GetComponentByClass(
        UE.LGUIPlayTweenComponent.StaticClass(),
      )),
      (this.gzi = this.PlotContent.GetOwner().GetComponentByClass(
        UE.UIEffectTextAnimation.StaticClass(),
      )),
      (this.ywn = LanguageSystem_1.LanguageSystem.PackageAudio),
      (this.OVs = h?.GetRootComponent()?.GetHeight() ?? 174);
  }
  Clear() {
    this.vzi(),
      this.ClearCurPlayAudio(),
      ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon &&
        ((ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = !1),
        this.Mzi?.Destroy(),
        (this.Mzi = void 0)),
      this.Gqn?.Remove(),
      (this.Gqn = void 0),
      this.Mwn();
  }
  UpdatePlotSubtitle(t) {
    this.ClearPlotContent(), (this.IsInteraction = !1), this.PlaySubtitle(t);
  }
  ClearPlotContent() {
    (this.dzi = void 0),
      (this.bqn = !1),
      (this.yXt = !1),
      (this.IsInteraction = !1),
      (this.qqn = !1),
      (this.wqn = 1),
      this.vzi(),
      this.ClearCurPlayAudio(),
      this.Mwn(),
      this.Gqn?.Remove(),
      (this.Gqn = void 0),
      (this.CurrentContent = void 0);
  }
  Szi() {
    if (!this.qqn && this.CurrentContent.UniversalTone) {
      const t =
        this.CurrentContent.UniversalTone.TimberId ?? this.dzi?.TimberId;
      const i = this.CurrentContent.UniversalTone.UniversalToneId;
      if (t && i) {
        const e =
          InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.GetConfig(
            t,
            i,
          );
        if (e) return this.Ezi(e), !0;
      }
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Plot",
          27,
          "通用语气配置无法获取，策划检查配置",
          ["timberId", t],
          ["universalToneId", i],
        );
    }
    return !1;
  }
  yzi() {
    let t;
    let i;
    let e = this.CurrentContent.TalkAkEvent;
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
  Izi() {
    if (this.qqn) return !1;
    if (
      (this.ywn !== LanguageSystem_1.LanguageSystem.PackageAudio &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "[PlotTextLogic] 恢复时：音频切换了语言，重播",
          ),
        (this.ywn = LanguageSystem_1.LanguageSystem.PackageAudio),
        this.ClearCurPlayAudio()),
      this.czi !== -1)
    )
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 恢复时：恢复音频播放"),
        AudioSystem_1.AudioSystem.ExecuteAction(this.czi, 2, {
          TransitionDuration: BREAK_TIME,
        }),
        this.uzi();
    else if (this.Bqn) this.Bqn.Resume();
    else {
      let t = this.CurrentContent.PlayVoice
        ? PlotAudioById_1.configPlotAudioById.GetConfig(
            this.CurrentContent.TidTalk,
          )
        : void 0;
      if (!t) return !1;
      const i =
        ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
          t.ExternalSourceSetting,
        );
      const e = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName([
        t.IsCheckSex,
        t.FileName,
      ]);
      t = (0, AudioSystem_1.parseAudioEventPath)(i.AudioEventPath);
      PlotTextCommonLogic.Iwn++;
      const o = PlotTextCommonLogic.Iwn;
      (this.czi = AudioSystem_1.AudioSystem.PostEvent(t, void 0, {
        ExternalSourceName: i.ExternalSrcName,
        ExternalSourceMediaName: e,
        CallbackMask: 1048584,
        CallbackHandler: (t, i) => {
          o !== PlotTextCommonLogic.Iwn
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Plot",
                27,
                "[PlotViewHud] 废弃的音频回调",
                ["id", o],
                ["mediaName", e],
                ["type", t],
              )
            : t === 0
              ? (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 音频播放完毕", [
                    "mediaName",
                    e,
                  ]),
                (this.qqn = !0),
                (this.czi = -1),
                PlotTextCommonLogic.Iwn++)
              : t === 3 &&
                ((this.PlayDelayTime = i.Duration),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Plot",
                    27,
                    "[PlotTextLogic] 音频播放开始",
                    ["mediaName", e],
                    ["duration", this.PlayDelayTime],
                  ),
                this._zi(),
                this.bqn || this.uzi());
        },
      })),
        (this.Bqn = TimerSystem_1.TimerSystem.Delay(() => {
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              27,
              "[PlotTextLogic] 加载剧情音频超时，直接显示剧情文本",
            ),
            this.ClearCurPlayAudio(),
            (this.PlayDelayTime = void 0),
            this.uzi();
        }, MAX_LOAD_AUDIO_TIME));
    }
    return !0;
  }
  Ezi(t) {
    if (this.Bqn) this.Bqn.Resume();
    else if (
      (this.ywn !== LanguageSystem_1.LanguageSystem.PackageAudio &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "[PlotTextLogic] 恢复时：音频切换了语言，重播",
          ),
        (this.ywn = LanguageSystem_1.LanguageSystem.PackageAudio),
        this.ClearCurPlayAudio()),
      this.czi !== -1)
    )
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 恢复时：恢复音频播放"),
        AudioSystem_1.AudioSystem.ExecuteAction(this.czi, 2, {
          TransitionDuration: BREAK_TIME,
        }),
        this.uzi();
    else {
      const e = (0, AudioSystem_1.parseAudioEventPath)(t.AkEvent);
      const o = PlotTextCommonLogic.Iwn;
      (this.czi = AudioSystem_1.AudioSystem.PostEvent(e, void 0, {
        CallbackMask: 1048584,
        CallbackHandler: (t, i) => {
          o !== PlotTextCommonLogic.Iwn
            ? Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Plot",
                27,
                "[PlotViewHud] 废弃的音频回调",
                ["id", o],
                ["eventName", e],
                ["type", t],
              )
            : t === 0
              ? (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 音频播放完毕", [
                    "eventName",
                    e,
                  ]),
                (this.qqn = !0),
                (this.czi = -1),
                PlotTextCommonLogic.Iwn++)
              : t === 3 &&
                ((this.PlayDelayTime = i.Duration),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Plot",
                    27,
                    "[PlotTextLogic] 音频播放开始",
                    ["eventName", e],
                    ["duration", this.PlayDelayTime],
                  ),
                this._zi(),
                this.bqn || this.uzi());
        },
      })),
        (this.Bqn = TimerSystem_1.TimerSystem.Delay(() => {
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              18,
              "加载通用语气音频超时，直接显示剧情文本",
            ),
            this.ClearCurPlayAudio(),
            (this.PlayDelayTime = void 0),
            this.uzi();
        }, MAX_LOAD_AUDIO_TIME));
    }
  }
  ClearCurPlayAudio() {
    this._zi(),
      PlotTextCommonLogic.Iwn++,
      AudioSystem_1.AudioSystem.ExecuteAction(this.czi, 0, {
        TransitionDuration: 0,
      }),
      (this.czi = -1);
  }
  _zi() {
    TimerSystem_1.TimerSystem.Has(this.Bqn) &&
      TimerSystem_1.TimerSystem.Remove(this.Bqn),
      (this.Bqn = void 0);
  }
  PlaySubtitle(t) {
    (this.CurrentContent = t),
      this.yzi(),
      this.CurrentContent.Type === "Option"
        ? this.PlotItem.SetUIActive(!1)
        : ((t = this.CurrentContent.CaptionParams),
          (this.dzi = SpeakerById_1.configSpeakerById.GetConfig(
            this.CurrentContent.WhoId,
          )),
          t
            ? this.uzi(t.TotalTime, t.IntervalTime)
            : this.Izi() || this.Szi() || this.uzi());
  }
  PauseSubtitle() {
    this.CurrentContent &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 暂停字幕"),
      (this.bqn = !0),
      this.Bqn
        ? (this.Bqn.Pause(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 暂停时：音频加载中"))
        : (this.czi !== -1 &&
            (AudioSystem_1.AudioSystem.ExecuteAction(this.czi, 1, {
              TransitionDuration: BREAK_TIME,
            }),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 暂停时：音频播放中"),
          this.Gqn?.Remove(),
          (this.Gqn = void 0),
          this.Mwn(),
          this.SubtitleAnimationTimer &&
            ((this.wqn = this.gzi.GetSelectorOffset()),
            this.Czi.Stop(),
            this.SubtitleAnimationTimer.Pause(),
            Log_1.Log.CheckDebug()) &&
            Log_1.Log.Debug(
              "Plot",
              27,
              "[PlotTextLogic] 暂停时：打字机播放中",
              ["offset", this.wqn],
            )));
  }
  ResumeSubtitle(t) {
    (this.bqn = !1), this.PlaySubtitle(t);
  }
  uzi(t, i) {
    this.Tzi(),
      this.Lzi(),
      this.Dzi(t, i),
      (this.Gqn = TimerSystem_1.TimerSystem.Next(this.vwn));
  }
  Tzi() {
    let t;
    this.PlotItem.SetUIActive(!0),
      (this.CurrentContent.Type && this.CurrentContent.Type !== "Talk") ||
      this.CurrentContent.Style?.Type === "InnerVoice"
        ? (this.LineItem.SetUIActive(!1),
          this.NpcName.SetUIActive(!1),
          this.NpcTitle.SetUIActive(!1))
        : (this.LineItem.SetUIActive(!0),
          (t = PublicUtil_1.PublicUtil.GetConfigTextByTable(0, this.dzi.Id)),
          StringUtils_1.StringUtils.IsEmpty(t)
            ? this.NpcName.SetUIActive(!1)
            : (this.NpcName.SetUIActive(!0), this.NpcName.SetText(t)),
          (t = PublicUtil_1.PublicUtil.GetConfigTextByTable(1, this.dzi.Id)),
          StringUtils_1.StringUtils.IsEmpty(t)
            ? this.NpcTitle.SetUIActive(!1)
            : (this.NpcTitle.SetUIActive(!0), this.NpcTitle.SetText(t)));
  }
  Lzi() {
    let t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(
      this.CurrentContent.TidTalk,
    );
    StringUtils_1.StringUtils.IsEmpty(t) &&
      (ControllerHolder_1.ControllerHolder.FlowController.LogError("字幕为空", [
        "id",
        this.CurrentContent.TidTalk,
      ]),
      (t = this.CurrentContent.TidTalk)),
      (t = ModelManager_1.ModelManager.PlotModel.PlotTextReplacer.Replace(t)),
      this.PlotContent.SetText(t);
  }
  Swn() {
    return this.IsInteraction
      ? ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
          .TextAnimSpeedInteraction
      : ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelC"
        ? ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
            .TextAnimSpeedLevelC
        : ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
            .TextAnimSpeedLevelD;
  }
  Mwn() {
    TimerSystem_1.TimerSystem.Has(this.fwn) &&
      TimerSystem_1.TimerSystem.Remove(this.fwn),
      TimerSystem_1.TimerSystem.Has(this.pwn) &&
        TimerSystem_1.TimerSystem.Remove(this.pwn);
  }
  Dzi(i, e) {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 39, "CD级", [
          "字幕：",
          this.PlotContent.GetText(),
        ]),
      this.Czi)
    )
      if (this.SubtitleAnimationTimer)
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Plot",
            27,
            "[PlotTextLogic] 恢复时：恢复打字机动画",
            ["offset", this.wqn],
          ),
          this.SubtitleAnimationTimer.Resume(),
          (this.Czi.GetPlayTween().from = this.wqn),
          (this.Czi.GetPlayTween().duration *= this.wqn),
          this.Czi.Play();
      else if (this.yXt) this.gzi.SetSelectorOffset(0);
      else {
        const o = this.PlotContent.GetDisplayCharLength();
        this.Czi.Stop();
        let t = 1;
        (t =
          i ||
          (this.IsInteraction
            ? o /
              ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                .TextAnimSpeedInteraction
            : ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel ===
                "LevelC"
              ? o /
                ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                  .TextAnimSpeedLevelC
              : o /
                ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                  .TextAnimSpeedLevelD)),
          this.gzi.SetSelectorOffset(1),
          (this.Czi.GetPlayTween().duration = t),
          this.Czi.Play(),
          (this.IsTextAnimPlaying = !0),
          (t *= CommonDefine_1.MILLIONSECOND_PER_SECOND),
          e
            ? (this.PlayDelayTime = e * CommonDefine_1.MILLIONSECOND_PER_SECOND)
            : this.PlayDelayTime
              ? (this.PlayDelayTime = this.PlayDelayTime - t)
              : (this.PlayDelayTime = 0),
          this.Rzi(t);
      }
    else
      Log_1.Log.CheckWarn() && Log_1.Log.Warn("Plot", 19, "找不到字幕动画组件"),
        this.pzi();
  }
  Rzi(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Plot", 27, "[PlotTextLogic] 打字机开始", [
        "duration",
        t,
      ]),
      this.vzi();
    t = Math.max(t, TimerSystem_1.MIN_TIME);
    this.SubtitleAnimationTimer = TimerSystem_1.TimerSystem.Delay(this.pzi, t);
  }
  vzi() {
    TimerSystem_1.TimerSystem.Has(this.SubtitleAnimationTimer) &&
      TimerSystem_1.TimerSystem.Remove(this.SubtitleAnimationTimer),
      (this.SubtitleAnimationTimer = void 0);
  }
  SetPlotContentAnimFinishCallback(t) {
    this.fzi = t;
  }
  ForceSkipPlotContentAnim() {
    this.Czi.Stop(),
      this.gzi.SetSelectorOffset(0),
      this.Mwn(),
      this.TextScrollView?.SetScrollProgress(1),
      this.pzi();
  }
  GetPlotContentAnimDuration() {
    return this.Czi.GetPlayTween().duration;
  }
  HandlePortraitVisible(t, i, e) {
    i &&
      e &&
      (i.Visible && !ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon
        ? ((ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = !0),
          (this.Mzi = new PlotPortraitItem_1.PlotPortraitItem()),
          this.Mzi.OpenAsync(t, i.HeadStyleConfig).finally(e))
        : i.Visible && ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon
          ? (this.Mzi.CloseAsync(),
            (this.Mzi = new PlotPortraitItem_1.PlotPortraitItem()),
            this.Mzi.OpenAsync(t, i.HeadStyleConfig).finally(e))
          : !i.Visible &&
              ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon
            ? ((ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = !1),
              this.Mzi.CloseAsync().finally(e),
              (this.Mzi = void 0))
            : e());
  }
  async DestroyPortraitItem() {
    ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon &&
      ((ModelManager_1.ModelManager.PlotModel.IsShowingHeadIcon = !1),
      await this.Mzi.CloseAsync(),
      (this.Mzi = void 0));
  }
}
(exports.PlotTextCommonLogic = PlotTextCommonLogic).Iwn = 0;
// # sourceMappingURL=PlotTextLogic.js.map
