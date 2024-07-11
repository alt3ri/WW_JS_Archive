"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimeOfDayConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  DaySelectPresetAll_1 = require("../../../Core/Define/ConfigQuery/DaySelectPresetAll"),
  DaySelectPresetById_1 = require("../../../Core/Define/ConfigQuery/DaySelectPresetById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimeOfDayById_1 = require("../../../Core/Define/ConfigQuery/TimeOfDayById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  TimeOfDayDefine_1 = require("./TimeOfDayDefine"),
  TimeOfDayModel_1 = require("./TimeOfDayModel");
class TimeOfDayConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.iTo = []), (this.oTo = []);
  }
  rTo() {
    return TimeOfDayById_1.configTimeOfDayById.GetConfig(1);
  }
  GetInitTimeSecond() {
    return (
      (this.rTo()?.InitTime ?? 0) * TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE
    );
  }
  GetMaxV() {
    return TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE * (this.rTo()?.V ?? 0);
  }
  GetA() {
    return TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE * (this.rTo()?.A ?? 0);
  }
  GetRate() {
    var e = this.rTo()?.Rate;
    return (
      e ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("TimeOfDay", 17, "时间流速比未配置"),
      0)
    );
  }
  InitDayStateTimeSpanList() {
    var e = this.rTo()?.StateSpan;
    return !(
      !e ||
      e.size <= 0 ||
      ((this.iTo = Array.from(e)),
      this.iTo.sort((e, i) => (e[0] < i[0] ? 1 : 0)),
      0)
    );
  }
  GetDayStateByGameTimeMinute(t) {
    if (0 === this.iTo.length && !this.InitDayStateTimeSpanList())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("TimeOfDay", 17, "时间区间配置错误"),
        0
      );
    let r = 0;
    return (
      this.iTo.every(
        (e, i) =>
          !TimeOfDayModel_1.TodDayTime.CheckInMinuteSpan(t, e) || ((r = i), !1),
      ),
      4 <= r
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error("TimeOfDay", 17, "时间区间配置超出范围"),
          0)
        : r
    );
  }
  GetBanGamePlayTags() {
    if (!(0 < this.oTo.length)) {
      var e = this.rTo()?.BanTag;
      if (e)
        for (const t of e) {
          var i = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(t);
          i && this.oTo.push(i);
        }
    }
    return this.oTo;
  }
  GetTimePresets() {
    return this.rTo()?.TimePreset ?? void 0;
  }
  GetDayTimeChangePresets() {
    return DaySelectPresetAll_1.configDaySelectPresetAll.GetConfigList();
  }
  GetDayTimeChangeConfig(e) {
    e = DaySelectPresetById_1.configDaySelectPresetById.GetConfig(e);
    if (e) return e;
  }
  GetTimeChangeText(e) {
    e = this.GetDayTimeChangeConfig(e);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Title) ?? "";
  }
}
exports.TimeOfDayConfig = TimeOfDayConfig;
//# sourceMappingURL=TimeOfDayConfig.js.map
