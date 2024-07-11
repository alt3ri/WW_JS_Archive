"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotTipsView = void 0);
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const ExternalSourceSettingById_1 = require("../../../../Core/Define/ConfigQuery/ExternalSourceSettingById");
const InterjectionByTimberIdAndUniversalToneId_1 = require("../../../../Core/Define/ConfigQuery/InterjectionByTimberIdAndUniversalToneId");
const PlotAudioById_1 = require("../../../../Core/Define/ConfigQuery/PlotAudioById");
const SpeakerById_1 = require("../../../../Core/Define/ConfigQuery/SpeakerById");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const PlotAudioModel_1 = require("../PlotAudioModel");
const BREAK_TIME = 1e3;
class PlotTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.BPn = void 0),
      (this.bPn = void 0),
      (this.yeo = !1),
      (this.czi = -1),
      (this.OPn = new Map()),
      (this.ywn = ""),
      (this.Ieo = (e) => {
        (this.BPn = e),
          this.yzi(),
          this.GetText(1)?.ShowTextNew(this.BPn.TidTalk);
        e = this.OPn.get(this.BPn.WhoId);
        e && this.GetTexture(0)?.SetTexture(e),
          this.bPn
            ? (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Plot",
                  27,
                  "[PlotTips] 语音完成或没有语音，恢复提交字幕定时",
                ),
              this.bPn.Resume())
            : (this.ywn !== LanguageSystem_1.LanguageSystem.PackageAudio &&
                (this.czi !== -1 &&
                  (PlotTipsView.Iwn++,
                  AudioSystem_1.AudioSystem.ExecuteAction(this.czi, 0, {
                    TransitionDuration: 0,
                  }),
                  (this.czi = -1)),
                (this.ywn = LanguageSystem_1.LanguageSystem.PackageAudio)),
              this.Izi() ||
                this.Szi() ||
                this.NPn(
                  this.BPn.CaptionParams?.TotalTime ??
                    ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                      .DefaultDurationPrompt,
                ));
      }),
      (this.$Ji = (e) => {
        this.SetUiActive(!e);
      }),
      (this.Teo = (e = !1) => {
        this.yeo === e ||
          (!e && this.IsHideOrHiding) ||
          ((this.yeo = e)
            ? (this.SetUiActive(!1),
              this.kPn(),
              ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(
                !0,
              ))
            : (this.SetUiActive(!0),
              ModelManager_1.ModelManager.PlotModel.CurTalkItem &&
                this.Ieo(ModelManager_1.ModelManager.PlotModel.CurTalkItem),
              ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(
                !1,
              )));
      }),
      (this.Leo = (e) => {
        (this.OpenParam = e), this.Deo();
      }),
      (this.heo = () => {
        PlotTipsView.Iwn++,
          this.bPn?.Remove(),
          (this.bPn = void 0),
          (this.BPn = void 0),
          this.czi !== -1 &&
            (AudioSystem_1.AudioSystem.ExecuteAction(this.czi, 0, {
              TransitionDuration: BREAK_TIME,
            }),
            (this.czi = -1));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdatePlotSubtitle,
      this.Ieo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.HidePlotUi,
        this.$Ji,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.HangPlotViewHud,
        this.Teo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UpdatePlotUiParam,
        this.Leo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ClearPlotSubtitle,
        this.heo,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdatePlotSubtitle,
      this.Ieo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.HidePlotUi,
        this.$Ji,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.HangPlotViewHud,
        this.Teo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UpdatePlotUiParam,
        this.Leo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ClearPlotSubtitle,
        this.heo,
      );
  }
  async OnCreateAsync() {
    const e = new Array();
    const t = this.OpenParam;
    if (t.TipsTalkTexturePaths) {
      for (const i of t.TipsTalkTexturePaths) {
        const o = new CustomPromise_1.CustomPromise();
        e.push(o.Promise),
          ResourceSystem_1.ResourceSystem.LoadAsync(i[1], UE.Texture, (e) => {
            ObjectUtils_1.ObjectUtils.IsValid(e) && this.OPn.set(i[0], e),
              o.SetResult();
          });
      }
      await Promise.all(e);
    }
  }
  OnStart() {
    ModelManager_1.ModelManager.PlotModel.CurTalkItem &&
      this.Ieo(ModelManager_1.ModelManager.PlotModel.CurTalkItem),
      (this.ywn = LanguageSystem_1.LanguageSystem.PackageAudio);
  }
  OnAfterPlayStartSequence() {
    this.Deo();
  }
  OnAfterShow() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.PlotViewChange,
      this.Info.Name,
      !0,
    ),
      this.Teo(ModelManager_1.ModelManager.PlotModel.HangViewHud);
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.PlotViewChange,
      this.Info.Name,
      !1,
    ),
      this.Teo(!0);
  }
  OnBeforeDestroy() {
    this.OPn.clear(),
      this.heo(),
      ControllerHolder_1.ControllerHolder.FlowController.CountDownSkip(!1);
  }
  NPn(e, t = !1) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Plot",
        27,
        "[PlotTips] 开始延迟完成字幕",
        ["delay", e],
        ["isPause", t],
      ),
      (this.bPn = TimerSystem_1.TimerSystem.Delay(() => {
        const e = this.BPn;
        this.heo(),
          ControllerHolder_1.ControllerHolder.FlowController.FlowShowTalk.SubmitSubtitle(
            e,
          );
      }, e * CommonDefine_1.MILLIONSECOND_PER_SECOND)),
      t && this.bPn.Pause();
  }
  kPn() {
    this.bPn?.Pause(),
      this.czi !== -1 &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Plot", 27, "[PlotTips] 暂停语音"),
        AudioSystem_1.AudioSystem.ExecuteAction(this.czi, 1, {
          TransitionDuration: BREAK_TIME,
        }));
  }
  Deo() {
    let e;
    const t = this.OpenParam;
    t?.ViewName &&
      ((e = UiManager_1.UiManager.GetViewByName(t.ViewName))
        ? (e.AddChild(this),
          e.IsHideOrHiding &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Plot",
                27,
                "[PlotTips] 父界面已经隐藏，attach时子界面主动隐藏",
              ),
            this.Hide()))
        : (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Plot",
              27,
              "[PlotTips] 父界面已经不在，子界面直接关闭",
              ["parent", t.ViewName],
            ),
          this.CloseMe()));
  }
  Izi() {
    let e = this.BPn.PlayVoice
      ? PlotAudioById_1.configPlotAudioById.GetConfig(this.BPn.TidTalk)
      : void 0;
    if (!e) return !1;
    const t =
      ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
        e.ExternalSourceSetting,
      );
    const i = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName([
      e.IsCheckSex,
      e.FileName,
    ]);
    e = (0, AudioSystem_1.parseAudioEventPath)(t.AudioEventPath);
    if (this.czi === -1) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[PlotTips] 语音播放", ["mediaName", i]),
        PlotTipsView.Iwn++;
      const o = PlotTipsView.Iwn;
      this.czi = AudioSystem_1.AudioSystem.PostEvent(e, void 0, {
        ExternalSourceName: t.ExternalSrcName,
        ExternalSourceMediaName: i,
        CallbackMask: 1,
        CallbackHandler: (e, t) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "[PlotTips] 语音播放完成回调", [
              "mediaName",
              i,
            ]),
            e === 0 &&
              o === PlotTipsView.Iwn &&
              ((this.czi = -1),
              this.NPn(
                this.BPn.CaptionParams?.IntervalTime ??
                  ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                    .AudioEndWaitTimePrompt,
                this.yeo,
              ));
        },
      });
    } else
      AudioSystem_1.AudioSystem.ExecuteAction(this.czi, 2, {
        TransitionDuration: BREAK_TIME,
      });
    return !0;
  }
  Szi() {
    if (!this.BPn?.UniversalTone) return !1;
    const e =
      this.BPn.UniversalTone.TimberId ??
      SpeakerById_1.configSpeakerById.GetConfig(this.BPn.WhoId)?.TimberId;
    const t = this.BPn.UniversalTone.UniversalToneId;
    if (!e || !t)
      return (
        ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "语气配置无效",
        ),
        !1
      );
    const i =
      InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.GetConfig(
        e,
        t,
      );
    if (!i)
      return (
        ControllerHolder_1.ControllerHolder.FlowController.LogError(
          "无法获取语气配置",
          ["timberId", e],
          ["tone", t],
        ),
        !1
      );
    const o = (0, AudioSystem_1.parseAudioEventPath)(i.AkEvent);
    if (this.czi === -1) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Plot", 27, "[PlotTips] 语气播放", ["event", o]),
        PlotTipsView.Iwn++;
      const s = PlotTipsView.Iwn;
      this.czi = AudioSystem_1.AudioSystem.PostEvent(o, void 0, {
        CallbackMask: 1,
        CallbackHandler: (e, t) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 27, "[PlotTips] 语气播放完成回调", [
              "event",
              o,
            ]),
            e === 0 &&
              s === PlotTipsView.Iwn &&
              ((this.czi = -1),
              this.NPn(
                this.BPn?.CaptionParams?.IntervalTime ??
                  ModelManager_1.ModelManager.PlotModel.PlotGlobalConfig
                    .AudioEndWaitTimePrompt,
                this.yeo,
              ));
        },
      });
    } else
      AudioSystem_1.AudioSystem.ExecuteAction(this.czi, 2, {
        TransitionDuration: BREAK_TIME,
      });
    return !0;
  }
  yzi() {
    let e;
    let t;
    let i = this.BPn.TalkAkEvent;
    i &&
      (e = (0, AudioSystem_1.parseAudioEventPath)(i.AkEvent)) &&
      (i.Type === IAction_1.EPostAkEvent.Global
        ? AudioSystem_1.AudioSystem.PostEvent(e)
        : i.Type === IAction_1.EPostAkEvent.Target &&
          ((i = i.EntityId),
          (t =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i)) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 27, "实体不存在", ["entityId", i])),
          (t = t.Entity.GetComponent(1)?.Owner)?.IsValid()
            ? AudioSystem_1.AudioSystem.PostEvent(e, t)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 27, "未能获取到该实体对应的有效Actor", [
                "entityId",
                i,
              ])));
  }
}
(exports.PlotTipsView = PlotTipsView).Iwn = 0;
// # sourceMappingURL=PlotTipsView.js.map
