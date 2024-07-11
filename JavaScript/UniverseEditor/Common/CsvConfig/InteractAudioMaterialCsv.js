"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractAudioMaterialCsv = exports.InteractAudioMaterialCsvLoader =
    void 0);
const CsvLoader_1 = require("./CsvLoader"),
  interactAudioMaterialCsvFields = [
    (0, CsvLoader_1.createCsvField)({
      Name: "CollisionMaterial",
      CnName: "材质类型",
      Type: "String",
      Filter: "1",
      Condition: "notEmpty && unique",
      RenderType: 32,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "IsActiveImpacter",
      CnName: "是否开启碰撞音效",
      Type: "Bool",
      RenderType: 1,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "AudioEvent",
      CnName: "音频路径",
      Type: "String",
      RenderType: 33,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ImpactMass",
      CnName: "冲击质量",
      Type: "Float",
      RenderType: 10,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Maxforce",
      CnName: "最大动量",
      Type: "Float",
      RenderType: 10,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "MinimumPosteventForce",
      CnName: "最小动量",
      Type: "Float",
      RenderType: 10,
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "MinimumTimeBetweenAkevent",
      CnName: "最小触发间隔",
      Type: "Float",
      RenderType: 10,
    }),
  ];
class InteractAudioMaterialCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("InteractAudioMaterialCsv", interactAudioMaterialCsvFields);
  }
}
exports.InteractAudioMaterialCsvLoader = InteractAudioMaterialCsvLoader;
class InteractAudioMaterialCsv extends CsvLoader_1.GlobalCsv {}
exports.InteractAudioMaterialCsv = InteractAudioMaterialCsv;
//# sourceMappingURL=InteractAudioMaterialCsv.js.map
