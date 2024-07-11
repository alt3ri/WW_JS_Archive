"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPlotHandBookConfigByQuestId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PlotHandBookConfig_1 = require("../Config/PlotHandBookConfig");
const DB = "db_plothandbook.db";
const FILE = "UniverseEditor/PlotHandBook/剧情图鉴_Json_PlotHandBook.csv";
const TABLE = "PlotHandBookConfig";
const COMMAND = "select BinData from `PlotHandBookConfig` where QuestId=?";
const KEY_PREFIX = "PlotHandBookConfigByQuestId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configPlotHandBookConfigByQuestId.GetConfig(";
exports.configPlotHandBookConfigByQuestId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, n = !0) => {
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var i = KEY_PREFIX + `#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t) return t;
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "QuestId",
            o,
          ]) > 0)
      ) {
        var e;
        var i = void 0;
        if (
          (([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["QuestId", o],
          )),
          e)
        ) {
          const t =
            PlotHandBookConfig_1.PlotHandBookConfig.getRootAsPlotHandBookConfig(
              new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
            );
          return (
            n &&
              ((e = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            t
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=PlotHandBookConfigByQuestId.js.map
