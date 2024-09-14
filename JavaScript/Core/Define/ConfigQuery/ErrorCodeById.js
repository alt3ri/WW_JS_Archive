"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configErrorCodeById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  ErrorCode_1 = require("../Config/ErrorCode"),
  DB = "db_error_code.db",
  FILE = "c.错误码/ErrorCode*",
  TABLE = "ErrorCode",
  COMMAND = "select BinData from `ErrorCode` where Id=?",
  KEY_PREFIX = "ErrorCodeById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = Stats_1.Stat.Create("configErrorCodeById.Init"),
  getConfigStat = Stats_1.Stat.Create("configErrorCodeById.GetConfig"),
  CONFIG_STAT_PREFIX = "configErrorCodeById.GetConfig(";
exports.configErrorCodeById = {
  Init: () => {
    initStat.Start(),
      (handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
        handleId,
        DB,
        COMMAND,
      )),
      initStat.Stop();
  },
  GetConfig: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(),
      getConfigStat.Start();
    var r = Stats_1.Stat.Create(CONFIG_STAT_PREFIX + `#${o})`),
      e =
        (r.Start(),
        ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (n) {
        var i = KEY_PREFIX + `#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t)
          return (
            r.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
          );
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        i = void 0;
        if (
          (([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          e)
        ) {
          const t = ErrorCode_1.ErrorCode.getRootAsErrorCode(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            n &&
              ((e = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, t)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            r.Stop(),
            getConfigStat.Stop(),
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(),
            t
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    r.Stop(),
      getConfigStat.Stop(),
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  },
};
//# sourceMappingURL=ErrorCodeById.js.map
