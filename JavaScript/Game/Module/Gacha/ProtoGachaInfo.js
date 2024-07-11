"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ProtoGachaInfo = exports.ProtoGachaPoolInfo = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager");
class ProtoGachaPoolInfo {
  constructor(t) {
    (this.Id = 0),
      (this.BeginTime = 0),
      (this.EndTime = 0),
      (this.Sort = 0),
      (this.Title = ""),
      (this.Description = ""),
      (this.UiType = 0),
      (this.ThemeColor = ""),
      (this.ShowIdList = []),
      (this.UpList = []),
      (this.PreviewIdList = []),
      (this.Id = t.J4n),
      (this.BeginTime = MathUtils_1.MathUtils.LongToNumber(t.nps)),
      (this.EndTime = MathUtils_1.MathUtils.LongToNumber(t.sps)),
      (this.Title = t.Qxs),
      (this.Description = t.XLa),
      (this.UiType = t.JLa),
      (this.ThemeColor = t.zLa),
      (this.ShowIdList = t.ZLa),
      (this.UpList = t.eRa),
      (this.PreviewIdList = t.tRa);
    t = ConfigManager_1.ConfigManager.GachaConfig.GetGachaPoolConfig(this.Id);
    t && (this.Sort = t.Sort);
  }
}
exports.ProtoGachaPoolInfo = ProtoGachaPoolInfo;
class ProtoGachaInfo {
  constructor(t) {
    (this.Id = 0),
      (this.TodayTimes = 0),
      (this.TotalTimes = 0),
      (this.ItemId = 0),
      (this.GachaConsumes = void 0),
      (this.UsePoolId = 0),
      (this.bKt = []),
      (this.BeginTime = 0),
      (this.EndTime = 0),
      (this.DailyLimitTimes = 0),
      (this.TotalLimitTimes = 0),
      (this.ResourcesId = ""),
      (this.GroupId = 0),
      (this.Sort = 0),
      (this.Id = t.J4n),
      (this.TodayTimes = t.t9n),
      (this.TotalTimes = t.i9n),
      (this.ItemId = t.f8n),
      (this.GachaConsumes = t.kUs),
      (this.UsePoolId = t.NUs);
    var i = t.FUs;
    if (i) for (const s of i) this.bKt.push(new ProtoGachaPoolInfo(s));
    (this.BeginTime = MathUtils_1.MathUtils.LongToNumber(t.nps)),
      (this.EndTime = MathUtils_1.MathUtils.LongToNumber(t.sps)),
      (this.DailyLimitTimes = t.VUs),
      (this.TotalLimitTimes = t.$Us),
      (this.ResourcesId = t.HUs);
    i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaConfig(this.Id);
    i && ((this.Sort = i.Sort), (this.GroupId = i.RuleGroupId));
  }
  GetFirstValidPool() {
    if (this.bKt && 0 < this.bKt.length)
      for (const t of this.bKt) if (this.IsPoolValid(t)) return t;
  }
  GetPoolInfo(t) {
    let i = void 0;
    for (const s of this.bKt) s.Id === t && (i = s);
    return i;
  }
  GetCurrentPoolInfo() {
    if (0 !== this.UsePoolId) return this.GetPoolInfo(this.UsePoolId);
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Gacha",
        35,
        "ProtoGachaInfo.GetCurrentPoolInfo UsePoolId is 0!",
      );
  }
  GetPoolEndTimeByPoolId(t) {
    t = this.GetPoolInfo(t);
    return this.GetPoolEndTimeByPoolInfo(t);
  }
  GetPoolEndTimeByPoolInfo(t) {
    var i = this.EndTime;
    return !t || 0 === (t = t.EndTime) || (0 !== i && i < t) ? i : t;
  }
  GetValidPoolList() {
    var t = this.bKt;
    if (t) {
      var i = [];
      for (const s of t) this.IsPoolValid(s) && i.push(s);
      return i;
    }
  }
  IsPoolValid(t) {
    t = this.GetPoolEndTimeByPoolInfo(t);
    return 0 === t || t >= TimeUtil_1.TimeUtil.GetServerTime();
  }
}
exports.ProtoGachaInfo = ProtoGachaInfo;
//# sourceMappingURL=ProtoGachaInfo.js.map
