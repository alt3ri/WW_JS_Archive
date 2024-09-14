"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcFlowLogic = exports.AudioDelegate = void 0);
const puerts_1 = require("puerts"),
  AudioController_1 = require("../../../../../Core/Audio/AudioController"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ExternalSourceSettingById_1 = require("../../../../../Core/Define/ConfigQuery/ExternalSourceSettingById"),
  InterjectionByTimberIdAndUniversalToneId_1 = require("../../../../../Core/Define/ConfigQuery/InterjectionByTimberIdAndUniversalToneId"),
  PlotAudioById_1 = require("../../../../../Core/Define/ConfigQuery/PlotAudioById"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  IAction_1 = require("../../../../../UniverseEditor/Interface/IAction"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PlotAudioModel_1 = require("../../../../Module/Plot/PlotAudioModel"),
  CharacterFlowLogic_1 = require("../../Common/Component/Flow/CharacterFlowLogic"),
  NpcRedDotFlowLogic_1 = require("./NpcRedDotFlowLogic"),
  DEFAULT_WAIT_TIME = 3,
  LOAD_AUDIO_TIME = 1,
  PLAY_FLAG = 8,
  BREAK_TIME = 1;
class AudioDelegate {
  constructor() {
    (this.AudioDelegate = void 0),
      (this.AudioDelegateEnable = !1),
      (this.Callback = void 0),
      (this.Entity = void 0),
      (this.Config = void 0),
      (this.sZi = (i, t) => {
        this.AudioDelegateEnable
          ? 3 === i && this.Callback(t.Duration, this.Entity, this.Config)
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
      ((this.AudioDelegate = (0, puerts_1.toManualReleaseDelegate)(this.sZi)),
      (this.AudioDelegateEnable = !0));
  }
  Disable() {
    void 0 !== this.AudioDelegate &&
      ((0, puerts_1.releaseManualReleaseDelegate)(this.sZi),
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
      (this.Per = new AudioController_1.PlayResult()),
      (this.YZt = new AudioDelegate()),
      (this.xer = !1),
      (this.wer = void 0),
      (this.lei = (i, t, e) => {
        (this.xer = !1),
          (this.WaitSecondsRemain =
            0 < i ? TimeUtil_1.TimeUtil.SetTimeSecond(i) : DEFAULT_WAIT_TIME);
        i = this.GetFlowText(e.TidTalk);
        StringUtils_1.StringUtils.IsEmpty(i) ||
          ((e =
            e.WaitTime && 0 < e.WaitTime
              ? e.WaitTime + 0.05
              : this.WaitSecondsRemain + 0.05),
          t.GetComponent(73).SetDialogueText(i, e));
      });
  }
  get RedDotLogic() {
    return (
      this.wer || (this.wer = new NpcRedDotFlowLogic_1.NpcRedDotFlowLogic()),
      this.wer
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
    this.MZi(t?.TalkAkEvent),
      (this.xer = !1),
      t.Montage &&
        i.GetComponent(170)?.TryPlayMontage(t.Montage.ActionMontage.Path);
    var e = t.PlayVoice
      ? PlotAudioById_1.configPlotAudioById.GetConfig(t.TidTalk)
      : void 0;
    if (e) this.Ber(e, t, i);
    else {
      if (t.UniversalTone) {
        var e = t.UniversalTone.UniversalToneId,
          o = t.UniversalTone.TimberId ?? i.GetComponent(170)?.GetTimberId();
        if (o && e) {
          var r =
            InterjectionByTimberIdAndUniversalToneId_1.configInterjectionByTimberIdAndUniversalToneId.GetConfig(
              o,
              e,
            );
          if (r) return this.ber(r, t, i), !0;
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
      i.GetComponent(73).SetDialogueText(
        r,
        o,
        this.RedDotLogic.GetRedDotActive(),
      );
    }
    return !0;
  }
  Ber(i, t, e) {
    (this.xer = !0), (this.WaitSecondsRemain = LOAD_AUDIO_TIME);
    var o =
        ExternalSourceSettingById_1.configExternalSourceSettingById.GetConfig(
          i.ExternalSourceSetting,
        ),
      i = PlotAudioModel_1.PlotAudioModel.GetExternalSourcesMediaName(i),
      t =
        (this.YZt.Init(this.lei, e, t),
        this.YZt.Enable(),
        e.GetComponent(3)?.Actor);
    AudioController_1.AudioController.PostEventByExternalSources(
      o.AudioEventPath,
      t,
      i,
      o.ExternalSrcName,
      this.Per,
      void 0,
      PLAY_FLAG,
      this.YZt.AudioDelegate,
    );
  }
  ber(i, t, e) {
    (this.xer = !0),
      (this.WaitSecondsRemain = LOAD_AUDIO_TIME),
      this.YZt.Init(this.lei, e, t),
      this.YZt.Enable();
    t = e.GetComponent(3)?.Actor;
    AudioController_1.AudioController.PostEvent(
      i.AkEvent,
      t,
      this.Per,
      PLAY_FLAG,
      this.YZt.AudioDelegate,
    );
  }
  MZi(i) {
    var t, e, o;
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
      (this.xer
        ? (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Level", 27, "冒泡音频加载超时"),
          (this.xer = !1),
          this.ClearAudio(),
          this.YZt.ManualExec(0))
        : this.IsExecuteFlowEnd
          ? this.IsPause
            ? (this.EnableUpdate = !1)
            : this.StartFlow()
          : this.PlayTalk(this.CurrentTalkId + 1));
  }
  ClearAudio() {
    (this.xer = !1),
      this.YZt && this.YZt.Disable(),
      this.Per &&
        AudioController_1.AudioController.StopEvent(
          this.Per,
          !0,
          BREAK_TIME * TimeUtil_1.TimeUtil.InverseMillisecond,
        );
  }
}
exports.NpcFlowLogic = NpcFlowLogic;
//# sourceMappingURL=NpcFlowLogic.js.map
