"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configAxisRevertByRevertType = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  AxisRevert_1 = require("../Config/AxisRevert"),
  DB = "db_menu.db",
  FILE = "s.设置系统.xlsx",
  TABLE = "AxisRevert",
  COMMAND = "select BinData from `AxisRevert` where RevertType=?",
  KEY_PREFIX = "AxisRevertByRevertType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = void 0,
  getConfigListStat = void 0,
  CONFIG_LIST_STAT_PREFIX = "configAxisRevertByRevertType.GetConfigList(";
exports.configAxisRevertByRevertType = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (e, o = !0) => {
    var i;
    if (
      (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var n = KEY_PREFIX + `#${e})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (t) return t;
      }
      if (
        (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair))
      ) {
        const t = new Array();
        for (;;) {
          if (
            1 !==
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "RevertType",
              e,
            ])
          )
            break;
          var r = void 0;
          if (
            (([i, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["RevertType", e],
            )),
            !i)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          r = AxisRevert_1.AxisRevert.getRootAsAxisRevert(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          t.push(r);
        }
        return (
          o &&
            ((n = KEY_PREFIX + `#${e})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(n, t, t.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          t
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
//# sourceMappingURL=AxisRevertByRevertType.js.map
