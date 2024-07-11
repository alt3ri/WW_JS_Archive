"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PrepareCountdownFloatTips = void 0);
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const DEFAULT_TIME = 3;
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
          let e;
          this.RemainTime--,
            this.RemainTime < 0
              ? this.CloseMe()
              : this.RemainTime === 0
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
// # sourceMappingURL=PrepareCountdownFloatTips.js.map
