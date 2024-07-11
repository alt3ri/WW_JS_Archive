"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configMenuConfigByFunctionId = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MenuConfig_1 = require("../Config/MenuConfig");
const DB = "db_menu.db";
const FILE = "s.设置系统.xlsx";
const TABLE = "MenuConfig";
const COMMAND = "select BinData from `MenuConfig` where FunctionId=?";
const KEY_PREFIX = "MenuConfigByFunctionId";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigStat = void 0;
const CONFIG_STAT_PREFIX = "configMenuConfigByFunctionId.GetConfig(";
exports.configMenuConfigByFunctionId = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfig: (n, o = !0) => {
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (o) {
        var i = KEY_PREFIX + `#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C) return C;
      }
      if (
        (e =
          ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) &&
          ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, [
            "FunctionId",
            n,
          ]) > 0)
      ) {
        var e;
        var i = void 0;
        if (
          (([e, i] = ConfigCommon_1.ConfigCommon.GetValue(
            handleId,
            0,
            ...logPair,
            ["FunctionId", n],
          )),
          e)
        ) {
          const C = MenuConfig_1.MenuConfig.getRootAsMenuConfig(
            new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)),
          );
          return (
            o &&
              ((e = KEY_PREFIX + `#${n})`),
              ConfigCommon_1.ConfigCommon.SaveConfig(e, C)),
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
            C
          );
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=MenuConfigByFunctionId.js.map
