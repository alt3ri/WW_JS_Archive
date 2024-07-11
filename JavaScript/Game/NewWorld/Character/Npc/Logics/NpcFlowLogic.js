"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcFlowLogic = exports.AudioDelegate = void 0);
const puerts_1 = require("puerts");
const AudioController_1 = require("../../../../../Core/Audio/AudioController");
const Log_1 = require("../../../../../Core/Common/Log");
const ExternalSourceSettingById_1 = require("../../../../../Core/Define/ConfigQuery/ExternalSourceSettingById");
const InterjectionByTimberIdAndUniversalToneId_1 = require("../../../../../Core/Define/ConfigQuery/InterjectionByTimberIdAndUniversalToneId");
const PlotAudioById_1 = require("../../../../../Core/Define/ConfigQuery/PlotAudioById");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../../../UniverseEditor/Interface/IAction");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PlotAudioModel_1 = require("../../../../Module/Plot/PlotAudioModel");
const CharacterFlowLogic_1 = require("../../Common/Component/Flow/CharacterFlowLogic");
const NpcRedDotFlowLogic_1 = require("./NpcRedDotFlowLogic");
const DEFAULT_WAIT_TIME = 3;
const LOAD_AUDIO_TIME = 1;
const PLAY_FLAG = 8;
const BREAK_TIME = 1;
class AudioDelegate {
  constructor() {
    (this.AudioDelegate = void 0),
      (this.AudioDelegateEnable = !1),
      (this.Callback = void 0),
      (this.Entity = void 0),
      (this.Config = void 0),
      (this.lzi = (i, t) => {
        this.AudioDelegateEnable
          ? i === 3 && this.Callback(t.Duration, this.Entity, this.Config)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Level", 27, "冒泡音频回调没移除成功");
      });
  }
  Init(i, t, e) {
    (this.Callback = i), (this.Entity = t), (this.Config = e);
  }
  Clear() {
    this.Disable(),
      (this.Callback = void 0),
      (this.Entity = void 0),
      (this.Config = void 0);
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
  ManualExec(i) {
    this.Callback(i, this.Entity, this.Config);
  }
}
exports.AudioDelegate = AudioDelegate;
class NpcFlowLogic extends CharacterFlowLogic_1.CharacterFlowLogic {
  constructor() {
    super(...arguments),
      (this.BZo = new AudioController_1.PlayResult()),
      (this.Yzt = new AudioDelegate()),
      (this.bZo = !1),
      (this.qZo = void 0),
      (this.lZt = (i, t, e) => {
        (this.bZo = !1),
          (this.WaitSecondsRemain =
            i > 0 ? TimeUtil_1.TimeUtil.SetTimeSecond(i) : DEFAULT_WAIT_TIME);
        i = this.GetFlowText(e.TidTalk);
        StringUtils_1.StringUtils.IsEmpty(i) ||
          ((e =
            e.WaitTime && e.WaitTime > 0
              ? e.WaitTime + 0.05
              : this.WaitSecondsRemain + 0.05),
          t.GetComponent(70).SetDialogueText(i, e));
      });
  }
  get RedDotLogic() {
    return (
      this.qZo || (this.qZo = new NpcRedDotFlowLogic_1.NpcRedDotFlowLogic()),
      this.qZo
    );
  }
  ResetFlowState() {
    super.ResetFlowState(), this.RedDotLogic.ManualControlRedDotActive(!1, !1);
  }
  PlayTalk(i) {
    i < this.CurrentTalkItems.length &&
      this.DynamicFlowData &&
      void 0 !== this.DynamicFlowData.RedDot &&
      this.RedDotLogic.ManualControlRedDotActive(
        !0,
        this.DynamicFlowData.RedDot,
      ),
      super.PlayTalk(i);
  }
  HandleTalkAction(i, t) {
    if (!i) return !1;
    this.yzi(t?.TalkAkEvent),
      (this.bZo = !1),
      t.Montage &&
        i.GetComponent(167)?.TryPlayMontage(t.Montage.ActionMontage.Path);
    var e = t.PlayVoice
      ? PlotAudioById_1.configPlotAudioById.GetConfig(t.TidTalk)
      : void 0;
    if (e) this.GZo(e, t, i);
    else {
      if (t.UniversalTone) {
        var e = t.UniversalTone.UniversalToneId;
        var o = t.UniversalTone.TimberId ?? i.GetComponent(167)?.GetTimberId();
        if (o && e) {
          var r =
            InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.GetConfig(
              o,
              e,
            );
          if (r) return this.NZo(r, t, i), !0;
        }
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Plot",
            27,
            "通用语气配置无法获取，策划检查配置捏",
            ["entity", i.Id],
            ["timberId", o],
            ["universalToneId", e],
          );
      }
      (r = this.GetFlowText(t.TidTalk)),
        (o =
          ((this.WaitSecondsRemain = this.GetWaitSeconds(t)),
          this.WaitSecondsRemain + 0.05));
      i.GetComponent(70).SetDialogueText(
        r,
        o,
        this.RedDotLogic.GetRedDotActive(),
      );
    }
    return !0;
  }
  GZo(i, t, e) {
    (this.bZo = !0), (this.WaitSecondsRemain = LOAD_AUDIO_TIME);
    const o =
      ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
        i.ExternalSourceSetting,
      );
    var i = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName([
      i.IsCheckSex,
      i.FileName,
    ]);
    var t =
      (this.Yzt.Init(this.lZt, e, t),
      this.Yzt.Enable(),
      e.GetComponent(3)?.Actor);
    AudioController_1.AudioController.PostEventByExternalSources(
      o.AudioEventPath,
      t,
      i,
      o.ExternalSrcName,
      this.BZo,
      void 0,
      PLAY_FLAG,
      this.Yzt.AudioDelegate,
    );
  }
  NZo(i, t, e) {
    (this.bZo = !0),
      (this.WaitSecondsRemain = LOAD_AUDIO_TIME),
      this.Yzt.Init(this.lZt, e, t),
      this.Yzt.Enable();
    t = e.GetComponent(3)?.Actor;
    AudioController_1.AudioController.PostEvent(
      i.AkEvent,
      t,
      this.BZo,
      PLAY_FLAG,
      this.Yzt.AudioDelegate,
    );
  }
  yzi(i) {
    let t, e, o;
    i &&
      (i.Type === IAction_1.EPostAkEvent.Global
        ? ((t = i.AkEvent),
          AudioController_1.AudioController.PostEvent(t, void 0),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Event", 27, "[NpcFlowLogic][FlowAudio][Global]", [
              "AkEvent",
              i?.AkEvent,
            ]))
        : i.Type === IAction_1.EPostAkEvent.Target &&
          ((t = i.AkEvent),
          (e = i.EntityId),
          (o =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)) ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 27, "实体不存在", ["entityId", e])),
          (o = o.Entity.GetComponent(1)?.Owner)?.IsValid()
            ? (AudioController_1.AudioController.PostEvent(t, o),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Event",
                  27,
                  "[NpcFlowLogic][FlowAudio][Entity]",
                  ["EntityID", e],
                  ["AkEvent", i?.AkEvent],
                ))
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error("Event", 27, "未能获取到该实体对应的有效Actor", [
                "entityId",
                e,
              ])));
  }
  Tick(i) {
    this.EnableUpdate &&
      ((this.WaitSecondsRemain -= i), this.WaitSecondsRemain <= 0) &&
      (this.bZo
        ? (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Level", 27, "冒泡音频加载超时"),
          (this.bZo = !1),
          this.ClearAudio(),
          this.Yzt.ManualExec(0))
        : this.IsExecuteFlowEnd
          ? this.IsPause
            ? (this.EnableUpdate = !1)
            : this.StartFlow()
          : this.PlayTalk(this.CurrentTalkId + 1));
  }
  ClearAudio() {
    (this.bZo = !1),
      this.Yzt && this.Yzt.Disable(),
      this.BZo &&
        AudioController_1.AudioController.StopEvent(
          this.BZo,
          !0,
          BREAK_TIME * TimeUtil_1.TimeUtil.InverseMillisecond,
        );
  }
}
exports.NpcFlowLogic = NpcFlowLogic;
// # sourceMappingURL=NpcFlowLogic.js.map
