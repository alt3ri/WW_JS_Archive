"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HandBookConfig = void 0);
const AnimalHandBookAll_1 = require("../../../Core/Define/ConfigQuery/AnimalHandBookAll");
const AnimalHandBookById_1 = require("../../../Core/Define/ConfigQuery/AnimalHandBookById");
const AnimalHandBookByMeshId_1 = require("../../../Core/Define/ConfigQuery/AnimalHandBookByMeshId");
const ChipHandBookAll_1 = require("../../../Core/Define/ConfigQuery/ChipHandBookAll");
const ChipHandBookById_1 = require("../../../Core/Define/ConfigQuery/ChipHandBookById");
const ChipHandBookByType_1 = require("../../../Core/Define/ConfigQuery/ChipHandBookByType");
const ChipTypeAll_1 = require("../../../Core/Define/ConfigQuery/ChipTypeAll");
const ChipTypeById_1 = require("../../../Core/Define/ConfigQuery/ChipTypeById");
const GeographyHandBookAll_1 = require("../../../Core/Define/ConfigQuery/GeographyHandBookAll");
const GeographyHandBookById_1 = require("../../../Core/Define/ConfigQuery/GeographyHandBookById");
const GeographyHandBookByType_1 = require("../../../Core/Define/ConfigQuery/GeographyHandBookByType");
const GeographyTypeAll_1 = require("../../../Core/Define/ConfigQuery/GeographyTypeAll");
const GeographyTypeById_1 = require("../../../Core/Define/ConfigQuery/GeographyTypeById");
const HandBookEntranceAll_1 = require("../../../Core/Define/ConfigQuery/HandBookEntranceAll");
const HandBookEntranceById_1 = require("../../../Core/Define/ConfigQuery/HandBookEntranceById");
const HandBookQuestTabAll_1 = require("../../../Core/Define/ConfigQuery/HandBookQuestTabAll");
const ItemHandBookAll_1 = require("../../../Core/Define/ConfigQuery/ItemHandBookAll");
const ItemHandBookById_1 = require("../../../Core/Define/ConfigQuery/ItemHandBookById");
const ItemHandBookByType_1 = require("../../../Core/Define/ConfigQuery/ItemHandBookByType");
const ItemHandBookTypeAll_1 = require("../../../Core/Define/ConfigQuery/ItemHandBookTypeAll");
const ItemHandBookTypeById_1 = require("../../../Core/Define/ConfigQuery/ItemHandBookTypeById");
const MonsterHandBookAll_1 = require("../../../Core/Define/ConfigQuery/MonsterHandBookAll");
const MonsterHandBookById_1 = require("../../../Core/Define/ConfigQuery/MonsterHandBookById");
const MonsterHandBookByType_1 = require("../../../Core/Define/ConfigQuery/MonsterHandBookByType");
const MonsterHandBookTypeAll_1 = require("../../../Core/Define/ConfigQuery/MonsterHandBookTypeAll");
const PhantomFetterHandBookAll_1 = require("../../../Core/Define/ConfigQuery/PhantomFetterHandBookAll");
const PhantomHandBookAll_1 = require("../../../Core/Define/ConfigQuery/PhantomHandBookAll");
const PhantomHandBookById_1 = require("../../../Core/Define/ConfigQuery/PhantomHandBookById");
const PhantomHandBookPageAll_1 = require("../../../Core/Define/ConfigQuery/PhantomHandBookPageAll");
const PhotographHandBookAll_1 = require("../../../Core/Define/ConfigQuery/PhotographHandBookAll");
const PhotographHandBookById_1 = require("../../../Core/Define/ConfigQuery/PhotographHandBookById");
const PhotographHandBookByType_1 = require("../../../Core/Define/ConfigQuery/PhotographHandBookByType");
const PlotHandBookConfigByQuestId_1 = require("../../../Core/Define/ConfigQuery/PlotHandBookConfigByQuestId");
const PlotTypeAll_1 = require("../../../Core/Define/ConfigQuery/PlotTypeAll");
const PlotTypeById_1 = require("../../../Core/Define/ConfigQuery/PlotTypeById");
const WeaponHandBookAll_1 = require("../../../Core/Define/ConfigQuery/WeaponHandBookAll");
const WeaponHandBookById_1 = require("../../../Core/Define/ConfigQuery/WeaponHandBookById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class HandBookConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.RZt = void 0);
  }
  GetPhantomHandBookConfig() {
    return PhantomHandBookAll_1.configPhantomHandBookAll.GetConfigList();
  }
  GetPhantomFetterHandBookConfig() {
    return PhantomFetterHandBookAll_1.configPhantomFetterHandBookAll.GetConfigList();
  }
  GetPhantomHandBookConfigById(o) {
    return PhantomHandBookById_1.configPhantomHandBookById.GetConfig(o);
  }
  GetPhantomHandBookPageConfig() {
    return PhantomHandBookPageAll_1.configPhantomHandBookPageAll.GetConfigList();
  }
  GetHandBookEntranceConfig(o) {
    return HandBookEntranceById_1.configHandBookEntranceById.GetConfig(o);
  }
  GetHandBookEntranceConfigList() {
    return HandBookEntranceAll_1.configHandBookEntranceAll.GetConfigList();
  }
  GetWeaponHandBookConfig(o) {
    return WeaponHandBookById_1.configWeaponHandBookById.GetConfig(o);
  }
  GetWeaponHandBookConfigList() {
    return WeaponHandBookAll_1.configWeaponHandBookAll.GetConfigList();
  }
  GetMonsterHandBookConfigById(o) {
    return MonsterHandBookById_1.configMonsterHandBookById.GetConfig(o);
  }
  GetMonsterHandBookConfigByType(o) {
    return MonsterHandBookByType_1.configMonsterHandBookByType.GetConfigList(o);
  }
  GetMonsterHandBookTypeConfig() {
    return MonsterHandBookTypeAll_1.configMonsterHandBookTypeAll.GetConfigList();
  }
  GetMonsterHandBookConfigList() {
    return MonsterHandBookAll_1.configMonsterHandBookAll.GetConfigList();
  }
  GetItemHandBookConfigById(o) {
    return ItemHandBookById_1.configItemHandBookById.GetConfig(o);
  }
  GetItemHandBookConfigList() {
    return ItemHandBookAll_1.configItemHandBookAll.GetConfigList();
  }
  GetItemHandBookConfigByType(o) {
    return ItemHandBookByType_1.configItemHandBookByType.GetConfigList(o);
  }
  GetItemHandBookTypeConfigList() {
    return ItemHandBookTypeAll_1.configItemHandBookTypeAll.GetConfigList();
  }
  GetItemHandBookTypeConfig(o) {
    return ItemHandBookTypeById_1.configItemHandBookTypeById.GetConfig(o);
  }
  GetAnimalHandBookConfigList() {
    return AnimalHandBookAll_1.configAnimalHandBookAll.GetConfigList();
  }
  GetAnimalHandBookConfigById(o) {
    return AnimalHandBookById_1.configAnimalHandBookById.GetConfig(o);
  }
  GetAnimalHandBookConfigByMeshId(o) {
    if (!this.RZt) {
      this.RZt = new Map();
      for (const e of AnimalHandBookAll_1.configAnimalHandBookAll.GetConfigList())
        this.RZt.set(e.MeshId, e.Id);
    }
    if (this.RZt.get(o))
      return AnimalHandBookByMeshId_1.configAnimalHandBookByMeshId.GetConfig(o);
  }
  GetAllChipHandBookConfig() {
    return ChipHandBookAll_1.configChipHandBookAll.GetConfigList();
  }
  GetChipHandBookConfigList(o) {
    return ChipHandBookByType_1.configChipHandBookByType.GetConfigList(o);
  }
  GetChipHandBookConfig(o) {
    return ChipHandBookById_1.configChipHandBookById.GetConfig(o);
  }
  GetChipTypeConfigList() {
    return ChipTypeAll_1.configChipTypeAll.GetConfigList();
  }
  GetChipTypeConfig(o) {
    return ChipTypeById_1.configChipTypeById.GetConfig(o);
  }
  GetGeographyHandBookConfig(o) {
    return GeographyHandBookById_1.configGeographyHandBookById.GetConfig(o);
  }
  GetAllGeographyHandBookConfig() {
    return GeographyHandBookAll_1.configGeographyHandBookAll.GetConfigList();
  }
  GetGeographyHandBookConfigByType(o) {
    return GeographyHandBookByType_1.configGeographyHandBookByType.GetConfigList(
      o,
    );
  }
  GetGeographyTypeConfig(o) {
    return GeographyTypeById_1.configGeographyTypeById.GetConfig(o);
  }
  GetGeographyTypeConfigList() {
    return GeographyTypeAll_1.configGeographyTypeAll.GetConfigList();
  }
  GetAllPlotHandBookConfig() {
    return PhotographHandBookAll_1.configPhotographHandBookAll.GetConfigList();
  }
  GetPlotHandBookConfig(o) {
    return PhotographHandBookById_1.configPhotographHandBookById.GetConfig(o);
  }
  GetPlotHandBookConfigByType(o) {
    return PhotographHandBookByType_1.configPhotographHandBookByType.GetConfigList(
      o,
    );
  }
  GetPlotTypeConfig(o) {
    return PlotTypeById_1.configPlotTypeById.GetConfig(o);
  }
  GetPlotTypeConfigList() {
    return PlotTypeAll_1.configPlotTypeAll.GetConfigList();
  }
  GetQuestTabList() {
    return HandBookQuestTabAll_1.configHandBookQuestTabAll.GetConfigList();
  }
  GetQuestTab(o) {
    for (const e of HandBookQuestTabAll_1.configHandBookQuestTabAll.GetConfigList())
      if (e.Type === o) return e;
  }
  GetQuestPlotConfig(o) {
    return PlotHandBookConfigByQuestId_1.configPlotHandBookConfigByQuestId.GetConfig(
      o,
    );
  }
}
exports.HandBookConfig = HandBookConfig;
// # sourceMappingURL=HandBookConfig.js.map
