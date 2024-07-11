"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiEnvironmentKeyData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
class BattleUiEnvironmentKeyData {
  constructor() {
    (this.jQe = 0), (this.WQe = []);
  }
  GetCurEnvironmentalKey() {
    return this.jQe;
  }
  GetCurKeyText() {
    return BattleUiEnvironmentKeyData.KQe[this.jQe];
  }
  Init() {
    (this.jQe = 0), (this.WQe.length = 0), this.WQe.push(!0);
    for (let e = 1; e < 6; e++) this.WQe.push(!1);
  }
  SetEnvironmentKeyVisible(t, e) {
    if (this.WQe[t] !== e)
      if ((this.WQe[t] = e)) this.jQe < t && ((this.jQe = t), this.QQe());
      else if (!(this.jQe > t))
        for (let e = t - 1; 0 <= e; e--)
          if (this.WQe[e]) return (this.jQe = e), void this.QQe();
  }
  QQe() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 18, "环境特性快捷键类型改变", [
        "type",
        this.jQe,
      ]),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiEnvironmentKeyChanged,
      );
  }
  OnLeaveLevel() {
    this.jQe = 0;
    for (let e = 1; e < 6; e++) this.WQe[e] = !1;
  }
  Clear() {}
}
(exports.BattleUiEnvironmentKeyData = BattleUiEnvironmentKeyData).KQe = [
  void 0,
  "HotKeyText_SilentAreaTips_Name",
  "HotKeyText_EnvironmentBuffTips_Name",
  "HotKeyText_SilentAreaTips_Name",
  "HotKeyText_RogueInfoTips_Name",
  "HotKeyText_VisionLevelTips_Name",
];
//# sourceMappingURL=BattleUiEnvironmentKeyData.js.map
