"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.configTowerConfigBySeason = void 0);
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TowerConfig_1 = require("../Config/TowerConfig");
const DB = "db_tower.db";
const FILE = "p.爬塔新.xlsx";
const TABLE = "TowerConfig";
const COMMAND = "select BinData from `TowerConfig` where Season = ?";
const KEY_PREFIX = "TowerConfigBySeason";
const logPair = [
  ["数据库", DB],
  ["文件", FILE],
  ["表名", TABLE],
  ["语句", COMMAND],
];
let handleId = 0;
const initStat = void 0;
const getConfigListStat = void 0;
const CONFIG_LIST_STAT_PREFIX = "configTowerConfigBySeason.GetConfigList(";
exports.configTowerConfigBySeason = {
  Init: () => {
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(
      handleId,
      DB,
      COMMAND,
    );
  },
  GetConfigList: (o, n = !0) => {
    let e;
    if (
      (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair))
    ) {
      if (n) {
        var i = KEY_PREFIX + `#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (f) return f;
      }
      if (
        (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair))
      ) {
        const f = new Array();
        for (;;) {
          if (
            ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, [
              "Season",
              o,
            ]) !== 1
          )
            break;
          let r = void 0;
          if (
            (([e, r] = ConfigCommon_1.ConfigCommon.GetValue(
              handleId,
              0,
              ...logPair,
              ["Season", o],
            )),
            !e)
          )
            return void ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          r = TowerConfig_1.TowerConfig.getRootAsTowerConfig(
            new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)),
          );
          f.push(r);
        }
        return (
          n &&
            ((i = KEY_PREFIX + `#${o})`),
            ConfigCommon_1.ConfigCommon.SaveConfig(i, f, f.length)),
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair),
          f
        );
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
  },
};
// # sourceMappingURL=TowerConfigBySeason.js.map
