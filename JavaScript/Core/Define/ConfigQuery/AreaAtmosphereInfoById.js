"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAreaAtmosphereInfoById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AreaAtmosphereInfo_1 = require("../Config/AreaAtmosphereInfo");
const DB = "db_area.db";
const FILE = "q.区域.xlsx";
const TABLE = "AreaAtmosphereInfo";
const COMMAND = "select BinData from `AreaAtmosphereInfo` where Id=?";
const KEY_PREFIX = "AreaAtmosphereInfoById";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configAreaAtmosphereInfoById.GetConfig(";
exports.configAreaAtmosphereInfoById = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, e = !0) => {
    if (
      (r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var n = KEY_PREFIX + `#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (i) return i;
      }
      if (
        (r =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "Id",
            o,
          ]) > 0)
      ) {
        var r;
        var n = void 0;
        if (
          (([r, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          r)
        ) {
          const i =
            AreaAtmosphereInfo_1.AreaAtmosphereInfo.getRootAsAreaAtmosphereInfo(
              new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
            );
          return (
            e &&
              ((r = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(r, i)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            i
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=AreaAtmosphereInfoById.js.map
