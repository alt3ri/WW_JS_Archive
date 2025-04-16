"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPlayReportConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  HiddenBossWindowById_1 = require("../../../Core/Define/ConfigQuery/HiddenBossWindowById"),
  LevelPlayInfoMappingConfigAll_1 = require("../../../Core/Define/ConfigQuery/LevelPlayInfoMappingConfigAll"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LevelPlayReportConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.CLl = new Map());
  }
  OnInit() {
    var e =
      LevelPlayInfoMappingConfigAll_1.configLevelPlayInfoMappingConfigAll.GetConfigList();
    if (e)
      for (const i of e) {
        var o,
          r,
          n = JSON.parse(i.Data);
        this.CLl.has(n.LevelPlayId)
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelPlayReport",
              63,
              "玩法信息映射设置失败,重复玩法Id,请联系策划检查",
              ["LevelPlayId", n.LevelPlayId],
            )
          : (1 < n.Vars.length &&
              ((o = n.Vars.length - 1),
              (r = n.Vars[o]),
              (n.GetBoxNumKey = r),
              (n.Vars = n.Vars.slice(0, o))),
            this.CLl.set(n.LevelPlayId, n));
      }
    return !0;
  }
  GetLevelPlayReportConfig(e) {
    var o = this.CLl.get(e);
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelPlayReport",
            63,
            "获取玩法信息映设配置失败,请联系策划检查",
            ["LevelPlayId", e],
          )),
      o
    );
  }
  GetHiddenBossWindowConfig(e) {
    var o = HiddenBossWindowById_1.configHiddenBossWindowById.GetConfig(e);
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelPlayReport", 63, "找不到隐藏Boss窗口配置", [
            "界面Id",
            e,
          ])),
      o
    );
  }
}
exports.LevelPlayReportConfig = LevelPlayReportConfig;
//# sourceMappingURL=LevelPlayReportConfig.js.map
