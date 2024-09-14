"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configFlowTextByIdAndFlowListId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  FlowText_1 = require("../Config/FlowText"),
  DB = "db_flow_text.db",
  FILE = "k.可视化编辑/j.剧情/Text_剧情*",
  TABLE = "FlowText",
  COMMAND = "select BinData from `FlowText` where Id=? AND FlowListId=?",
  KEY_PREFIX = "FlowTextByIdAndFlowListId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configFlowTextByIdAndFlowListId.Init"),
  getConfigStat = Stats_1.Stat.Create(
    "configFlowTextByIdAndFlowListId.GetConfig",
  ),
  CONFIG_STAT_PREFIX = "configFlowTextByIdAndFlowListId.GetConfig(";
exports.configFlowTextByIdAndFlowListId = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, t, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var i = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o}#${t})`),
      e =
        (i.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (n) {
        var C = KEY_PREFIX + `#${o}#${t})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (f)
          return (
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.BindString(handleId, 2, t, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(
              handleId,
              !0,
              ...logPair,
              ["Id", o],
              ["FlowListId", t],
            ))
      ) {
        C = void 0;
        if (
          (([e, C] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
            ["FlowListId", t],
          )),
          e)
        ) {
          const f = FlowText_1.FlowText.getRootAsFlowText(
            new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)),
          );
          return (
            n &&
              ((e = KEY_PREFIX + `#${o}#${t})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, f)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            f
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=FlowTextByIdAndFlowListId.js.map
