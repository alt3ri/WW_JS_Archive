"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiAudioData = exports.BattleUiAudioInfo = void 0);
const Time_1 = require("../../../Core/Common/Time");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const DEFAULT_COOL_DOWN = 500;
const audioIds = ["play_ui_fb_concerto_energy"];
class BattleUiAudioInfo {
  constructor() {
    (this.AudioType = 0), (this.CoolDownEndTime = 0), (this.UiChildType = 0);
  }
  PlayAudio() {
    Time_1.Time.Now < this.CoolDownEndTime ||
      (ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
        this.UiChildType,
      ) &&
        this.aKe());
  }
  aKe() {
    (this.CoolDownEndTime = Time_1.Time.Now + DEFAULT_COOL_DOWN),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiPlayAudio,
        audioIds[this.AudioType],
      );
  }
  Reset() {
    this.CoolDownEndTime = 0;
  }
}
exports.BattleUiAudioInfo = BattleUiAudioInfo;
class BattleUiAudioData {
  constructor() {
    this.hKe = new Map();
  }
  Init() {}
  OnLeaveLevel() {
    for (const e of this.hKe.values()) e.Reset();
  }
  Clear() {}
  PlayAudio(e) {
    let t = this.hKe.get(e);
    t ||
      (((t = new BattleUiAudioInfo()).AudioType = e) === 0 &&
        (t.UiChildType = 7),
      this.hKe.set(e, t)),
      t.PlayAudio();
  }
}
exports.BattleUiAudioData = BattleUiAudioData;
// # sourceMappingURL=BattleUiAudioData.js.map
