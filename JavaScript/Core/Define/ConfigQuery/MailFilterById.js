"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMailFilterById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  MailFilter_1 = require("../Config/MailFilter"),
  DB = "db_mail.db",
  FILE = "y.邮件.xlsx",
  TABLE = "MailFilter",
  COMMAND = "select BinData from `MailFilter` where Id=?",
  KEY_PREFIX = "MailFilterById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = void 0,
  getConfigStat = void 0,
  CONFIG_STAT_PREFIX = "configMailFilterById.GetConfig(";
exports.configMailFilterById = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, i = !0) => {
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (i) {
        var e = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) return r;
      }
      if (
        (n =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        var n,
          e = void 0;
        if (
          (([n, e] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          n)
        ) {
          const r = MailFilter_1.MailFilter.getRootAsMailFilter(
            new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)),
          );
          return (
            i &&
              ((n = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(n, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            r
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
//# sourceMappingURL=MailFilterById.js.map
