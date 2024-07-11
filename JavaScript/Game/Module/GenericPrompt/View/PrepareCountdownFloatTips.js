"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PrepareCountdownFloatTips = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  DEFAULT_TIME = 3;
class PrepareCountdownFloatTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.RemainTime = 0), (this.TimerId = void 0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UIText]]), (this.BtnBindInfo = []);
  }
  OnStart() {
    const i = this.GetText(0);
    (this.RemainTime = DEFAULT_TIME),
      i.SetText(this.RemainTime.toString()),
      AudioSystem_1.AudioSystem.PostEvent("play_ui_fx_com_count_number"),
      this.TimerId &&
        TimerSystem_1.TimerSystem.Has(this.TimerId) &&
        TimerSystem_1.TimerSystem.Remove(this.TimerId),
      (this.TimerId = TimerSystem_1.TimerSystem.Loop(
        () => {
          var e;
          this.RemainTime--,
            this.RemainTime < 0
              ? this.CloseMe()
              : 0 === this.RemainTime
                ? ((e =
                    ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                      "Start",
                    )),
                  i.ShowTextNew(e),
                  AudioSystem_1.AudioSystem.PostEvent(
                    "play_ui_fx_com_count_start",
                  ))
                : (i.SetText(this.RemainTime.toString()),
                  AudioSystem_1.AudioSystem.PostEvent(
                    "play_ui_fx_com_count_number",
                  ));
        },
        CommonDefine_1.MILLIONSECOND_PER_SECOND,
        this.RemainTime + 1,
      ));
  }
  OnBeforeDestroy() {
    TimerSystem_1.TimerSystem.Has(this.TimerId) &&
      TimerSystem_1.TimerSystem.Remove(this.TimerId),
      (this.TimerId = void 0);
  }
}
exports.PrepareCountdownFloatTips = PrepareCountdownFloatTips;
//# sourceMappingURL=PrepareCountdownFloatTips.js.map
