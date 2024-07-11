"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getBulletConfigs =
    exports.getBulletMapConfigFromCsv =
    exports.getTagConfigs =
    exports.getTagsConfigFromCsv =
    exports.getBuffConfigs =
    exports.getMapConfigFromCsv =
      void 0);
const BuffCsv_1 = require("../CsvConfig/BuffCsv");
const BulletCsv_1 = require("../CsvConfig/BulletCsv");
const CsvRegistry_1 = require("../CsvConfig/CsvRegistry");
const TagCsv_1 = require("../CsvConfig/TagCsv");
function getMapConfigFromCsv() {
  const e = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(BuffCsv_1.BuffCsv);
  const s = [];
  return (
    e.forEach((e) => {
      s.push({ Id: e.BuffId, Name: e.Description });
    }),
    { Buffs: s }
  );
}
function getBuffConfigs() {
  return getMapConfigFromCsv().Buffs;
}
function getTagsConfigFromCsv() {
  const e = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(TagCsv_1.TagCsv);
  const s = [];
  return (
    e.forEach((e) => {
      s.push({ Tag: e.Tag, Name: e.Description });
    }),
    { Tags: s }
  );
}
function getTagConfigs() {
  return getTagsConfigFromCsv().Tags;
}
function getBulletMapConfigFromCsv() {
  const e = CsvRegistry_1.CsvRegistry.Instance.GetAllCsvRows(
    BulletCsv_1.BulletCsv,
  );
  const s = [];
  return (
    e.forEach((e) => {
      s.push({ Id: e.BulletId, Name: e.Description });
    }),
    { Bullets: s }
  );
}
function getBulletConfigs() {
  return getBulletMapConfigFromCsv().Bullets;
}
(exports.getMapConfigFromCsv = getMapConfigFromCsv),
  (exports.getBuffConfigs = getBuffConfigs),
  (exports.getTagsConfigFromCsv = getTagsConfigFromCsv),
  (exports.getTagConfigs = getTagConfigs),
  (exports.getBulletMapConfigFromCsv = getBulletMapConfigFromCsv),
  (exports.getBulletConfigs = getBulletConfigs);
// # sourceMappingURL=Combat.js.map
