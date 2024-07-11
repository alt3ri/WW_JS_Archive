"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymConfig = void 0);
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const LordGymAll_1 = require("../../../Core/Define/ConfigQuery/LordGymAll");
const LordGymByDifficulty_1 = require("../../../Core/Define/ConfigQuery/LordGymByDifficulty");
const LordGymById_1 = require("../../../Core/Define/ConfigQuery/LordGymById");
const LordGymEntranceAll_1 = require("../../../Core/Define/ConfigQuery/LordGymEntranceAll");
const LordGymEntranceById_1 = require("../../../Core/Define/ConfigQuery/LordGymEntranceById");
const LordGymEntranceByMarkId_1 = require("../../../Core/Define/ConfigQuery/LordGymEntranceByMarkId");
const LordGymFilterTypeAll_1 = require("../../../Core/Define/ConfigQuery/LordGymFilterTypeAll");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LordGymConfig extends ConfigBase_1.ConfigBase {
  GetLordGymConfig(r) {
    return LordGymById_1.configLordGymById.GetConfig(r);
  }
  GetLordGymAllConfig() {
    return LordGymAll_1.configLordGymAll.GetConfigList();
  }
  GetLordGymAllConfigByDifficulty(r) {
    return LordGymByDifficulty_1.configLordGymByDifficulty.GetConfigList(r);
  }
  GetLordGymEntranceAllConfig() {
    return LordGymEntranceAll_1.configLordGymEntranceAll.GetConfigList();
  }
  GetLordGymEntranceConfig(r) {
    return LordGymEntranceById_1.configLordGymEntranceById.GetConfig(r);
  }
  GetLordGymEntranceConfigByMarkId(r) {
    return LordGymEntranceByMarkId_1.configLordGymEntranceByMarkId.GetConfig(r);
  }
  GetLordGymEntranceLordList(r) {
    return LordGymEntranceById_1.configLordGymEntranceById.GetConfig(r)
      ?.LordGymList;
  }
  GetLordGymEntranceName(r) {
    return LordGymEntranceById_1.configLordGymEntranceById.GetConfig(r)
      ?.EntranceTitle;
  }
  GetAllLordGymFilterTypeConfig() {
    const r = ConfigCommon_1.ConfigCommon.ToList(
      LordGymFilterTypeAll_1.configLordGymFilterTypeAll.GetConfigList(),
    );
    return r && r.sort((r, e) => r.Id - e.Id), r;
  }
}
exports.LordGymConfig = LordGymConfig;
// # sourceMappingURL=LordGymConfig.js.map
