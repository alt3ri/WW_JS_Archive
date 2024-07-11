"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiAudioModel = void 0);
const AudioController_1 = require("../../Core/Audio/AudioController"),
  AudioDefine_1 = require("../../Core/Audio/AudioDefine"),
  Log_1 = require("../../Core/Common/Log");
class UiAudioModel {
  static AddAudioStateData(o) {
    this.nCr.add(o);
  }
  static RemoveAudioStateData(o) {
    return this.nCr.delete(o);
  }
  static sCr() {
    let o = 0;
    for (const e of this.nCr.values()) o < e.Level && (o = e.Level);
    return o;
  }
  static aCr() {
    let o = 0;
    for (const e of this.nCr.values()) o = o + e.Alpha - o * e.Alpha;
    return o;
  }
  static SetRTPCLevelOpening(o) {
    AudioController_1.AudioController.SetRTPCValue(
      o,
      AudioDefine_1.RPTC_COVER_LEVEL_OPENING,
    ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Audio", 11, "Audio计算结果", [
          AudioDefine_1.RPTC_COVER_LEVEL_OPENING,
          o,
        ]);
  }
  static SetRTPCLevelClosing(o) {
    AudioController_1.AudioController.SetRTPCValue(
      o,
      AudioDefine_1.RPTC_COVER_LEVEL_CLOSING,
    ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Audio", 11, "Audio计算结果", [
          AudioDefine_1.RPTC_COVER_LEVEL_CLOSING,
          o,
        ]);
  }
  static CalculateRTPCValueAndApply() {
    var o = this.sCr(),
      e =
        (AudioController_1.AudioController.SetRTPCValue(
          o,
          AudioDefine_1.RTPC_COVER_LEVEL,
          void 0,
          500,
        ),
        this.aCr()),
      i =
        (AudioController_1.AudioController.SetRTPCValue(
          e,
          AudioDefine_1.RTPC_COVER_ALPHA,
          void 0,
          500,
        ),
        o - this.hCr);
    (this.hCr = o),
      AudioController_1.AudioController.SetRTPCValue(
        i,
        AudioDefine_1.RTPC_COVER_LEVEL_DELTA,
      ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Audio",
          11,
          "Audio计算结果",
          [AudioDefine_1.RTPC_COVER_LEVEL, o],
          [AudioDefine_1.RTPC_COVER_ALPHA, e],
          [AudioDefine_1.RTPC_COVER_LEVEL_DELTA, i],
        );
  }
}
((exports.UiAudioModel = UiAudioModel).nCr = new Set()), (UiAudioModel.hCr = 0);
//# sourceMappingURL=UiAudioModel.js.map
