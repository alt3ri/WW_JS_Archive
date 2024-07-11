"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExtendedEntityCsv = exports.ExtendedEntityCsvLoader = void 0);
const immer_1 = require("immer"),
  CsvLoader_1 = require("./CsvLoader"),
  extendedEntityBpCsvFields = [
    (0, CsvLoader_1.createCsvField)({ Name: "Id", CnName: "Id", Filter: "1" }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Name",
      CnName: "名字",
      Filter: "1",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Bp",
      CnName: "编辑用外观蓝图",
      RenderType: 9,
      Filter: "1",
      Tip: "用于编辑时的外观显示，在UniverseEditor/Entity文件夹下复制TsEntity蓝图，修改网格体，运行时外观还是读模型表id",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ModelId",
      CnName: "模型ID",
      Type: "Int",
      RenderType: 18,
      Tip: "模型表id：DT/Entity/CDT_ModelConfig",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Icon",
      CnName: "图标",
      Type: "String",
      RenderType: 22,
      Tip: "图标， 大世界编辑器中使用",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "ZoomType",
      CnName: "放缩类型",
      Type: "String",
      RenderType: 23,
      Tip: "放缩等级， 大世界编辑器中使用",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "EntityType",
      CnName: "实体类型",
      RenderType: 6,
      Tip: "决定实体拥有的组件，新类型联系TD创建并设计组件",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "TemplateId",
      CnName: "实体模板",
      Type: "Int",
      RenderType: 18,
      Tip: "关卡实体的Json配置默认值来源于模板，字段没有修改时将采用模板中的配置值",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "MainType",
      CnName: "实体主类型",
      RenderType: 21,
      Tip: "实体主类型，主要用于世界编辑器分类",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "SubType",
      CnName: "实体子类型",
      RenderType: 21,
      Tip: "实体子类型，主要用于世界编辑器分类",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "Tags",
      CnName: "实体标签列表",
      RenderType: 21,
      Tip: "主要用于定制额外的标签，以逗号为分割",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "HalfHeight",
      CnName: "胶囊体半高",
      Type: "Int",
      RenderType: 18,
      Tip: "蓝图中包含的模型半高",
    }),
    (0, CsvLoader_1.createCsvField)({
      Name: "TrackHeight",
      CnName: "追踪高度偏移",
      Type: "Int",
      RenderType: 18,
      Tip: "可以调整当实体被追踪时，追踪点的高度偏移，如果配置0时不生效。",
    }),
  ];
class ExtendedEntityCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("ExtendedEntityCsv", extendedEntityBpCsvFields);
  }
}
exports.ExtendedEntityCsvLoader = ExtendedEntityCsvLoader;
class ExtendedEntityCsv extends CsvLoader_1.GlobalCsv {
  CreateDefault(e) {
    return (0, immer_1.default)(e, (e) => {
      e.TemplateId = 0;
    });
  }
}
exports.ExtendedEntityCsv = ExtendedEntityCsv;
//# sourceMappingURL=ExtendedEntityCsv.js.map
