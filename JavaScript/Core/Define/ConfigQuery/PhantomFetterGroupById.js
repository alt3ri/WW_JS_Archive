"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configPhantomFetterGroupById = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhantomFetterGroup_1 = require("../Config/PhantomFetterGroup"),
  DB = "db_phantom.db",
  FILE = "h.幻象.xlsx",
  TABLE = "PhantomFetterGroup",
  COMMAND = "select BinData from `PhantomFetterGroup` where Id=?",
  KEY_PREFIX = "PhantomFetterGroupById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = void 0,
  getConfigStat = void 0,
  CONFIG_STAT_PREFIX = "configPhantomFetterGroupById.GetConfig(";
exports.configPhantomFetterGroupById = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (o, e = !0) => {
    if (
      (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (e) {
        var n = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (r) return r;
      }
      if (
        (t =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) &&
          0 <
            ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
              "Id",
              o,
            ]))
      ) {
        var t,
          n = void 0;
        if (
          (([t, n] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["Id", o],
          )),
          t)
        ) {
          const r =
            PhantomFetterGroup_1.PhantomFetterGroup.getRootAsPhantomFetterGroup(
              new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)),
            );
          return (
            e &&
              ((t = KEY_PREFIX + `#${o})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(t, r)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            r
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
//# sourceMappingURL=PhantomFetterGroupById.js.map
