"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTrialRoleInfoAll = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  TrialRoleInfo_1 = require("../Config/TrialRoleInfo"),
  DB = "db_trial_role.db",
  FILE = "s.试用角色.xlsx",
  TABLE = "TrialRoleInfo",
  COMMAND = "select BinData from `TrialRoleInfo`",
  KEY_PREFIX = "TrialRoleInfoAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND],
  ];
let handleId = 0;
const initStat = void 0,
  getConfigListStat = void 0;
exports.configTrialRoleInfoAll = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o = !0) => {
    var n;
    if (
      (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var e = KEY_PREFIX + ")";
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) return r;
      }
      const r = new Array();
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair))
          break;
        var i = void 0;
        if (
          (([n, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
          )),
          !n)
        )
          return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i = TrialRoleInfo_1.TrialRoleInfo.getRootAsTrialRoleInfo(
          new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
        );
        r.push(i);
      }
      return (
        o &&
          ((e = KEY_PREFIX + ")"),
          ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length)),
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
        r
      );
    }
  },
};
//# sourceMappingURL=TrialRoleInfoAll.js.map
