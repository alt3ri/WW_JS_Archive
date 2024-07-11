"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getAkiExcelPath =
    exports.getAkiExcelExportJsonFileName =
    exports.getAkiExcelPairConfig =
    exports.akiExcelToKeyValuePairConfigs =
    exports.EAkiExcelType =
      void 0);
const File_1 = require("../Misc/File");
const Util_1 = require("../Misc/Util");
let EAkiExcelType;
function getAkiExcelPairConfig(e) {
  return exports.akiExcelToKeyValuePairConfigs[e];
}
function getAkiExcelExportJsonFileName(e) {
  var e = getAkiExcelPairConfig(e);
  const t = e.SheetName.split("|");
  if (t.length < 1)
    throw new Error(
      `配置表${e.ExcelRelativePath}的Sheet名${e.SheetName}不合法`,
    );
  return t[1];
}
function getAkiExcelPath(e) {
  e = exports.akiExcelToKeyValuePairConfigs[e];
  return e.SheetWorkspace === "AkiBase"
    ? (0, File_1.getAbsolutePath)(
        `${(0, Util_1.getAkiBaseLocalPath)()}/Source/Config/Raw/BaseTables/${e.ExcelRelativePath}.xlsx`,
      )
    : (0, File_1.getAbsolutePath)(
        `${(0, File_1.getProjectPath)("")}/../Config/Raw/Tables/${e.ExcelRelativePath}.xlsx`,
      );
}
!(function (e) {
  (e.ItemInfo = "ItemInfo"),
    (e.FunctionCondition = "FunctionCondition"),
    (e.GmAddRoleConfig = "GmAddRoleConfig"),
    (e.TeleporterForGM = "TeleporterForGM"),
    (e.Teleporter = "Teleporter"),
    (e.PhantomItemSkillId = "VisionSkillId"),
    (e.MapMark = "MapMark"),
    (e.Weather = "Weather"),
    (e.TrialRoleInfo = "TrialRoleInfo"),
    (e.TrialRoleGroupInfo = "TrialRoleGroupInfo"),
    (e.PhantomFormation = "PhantomFormation"),
    (e.Role = "Role"),
    (e.ScanType = "ScanType"),
    (e.DungeonEntrance = "DungeonEntrance"),
    (e.ExploreTools = "ExploreTools"),
    (e.Damage = "Damage"),
    (e.TimePeriod = "TimePeriod"),
    (e.DropPackage = "DropPackage"),
    (e.AreaLevel = "AreaLevel"),
    (e.PhotoMemoryCollect = "PhotoMemoryCollect");
})((EAkiExcelType = exports.EAkiExcelType || (exports.EAkiExcelType = {}))),
  (exports.akiExcelToKeyValuePairConfigs = {
    [EAkiExcelType.ItemInfo]: {
      KeyName: "Id",
      ExcelRelativePath: "d.道具",
      SheetName: "道具|ItemInfo",
      PromptKeyList: ["Id", "Desc"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.FunctionCondition]: {
      KeyName: "FunctionId",
      ExcelRelativePath: "g.功能开启",
      SheetName: "功能条件|FunctionCondition",
      PromptKeyList: ["FunctionId", "Name"],
      SeparatorInPrompt: " - ",
      ExtraValidValue: [{ Key: 0, Prompt: "开启全部" }],
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.GmAddRoleConfig]: {
      KeyName: "Id",
      ExcelRelativePath: "g.GM添加配置角色",
      SheetName: "GM指令|GmAddRoleConfig",
      PromptKeyList: ["Id", "字段名", "RoleLevel"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.TeleporterForGM]: {
      KeyName: "Id",
      ExcelRelativePath: "c.传送",
      SheetName: "传送|Teleporter",
      PromptKeyList: ["Id", "Desc"],
      SeparatorInPrompt: " - ",
      ExtraValidValue: [{ Key: 0, Prompt: "开启全部" }],
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.Teleporter]: {
      KeyName: "Id",
      ExcelRelativePath: "c.传送",
      SheetName: "传送|Teleporter",
      PromptKeyList: ["Id", "Desc"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.PhantomItemSkillId]: {
      KeyName: "SkillId",
      ExcelRelativePath: "h.幻象",
      SheetName: "幻象道具|PhantomItem",
      PromptKeyList: ["SkillId"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.MapMark]: {
      KeyName: "MarkId",
      ExcelRelativePath: "d.地图标记",
      SheetName: "地图标记|MapMark",
      PromptKeyList: ["MarkId", "Desc", "MarkVector", "MapId", "MarkTitle"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.Weather]: {
      KeyName: "Id",
      ExcelRelativePath: "t.天气系统",
      SheetName: "天气|Weather",
      PromptKeyList: ["Id", "Desc"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.TrialRoleInfo]: {
      KeyName: "Id",
      ExcelRelativePath: "s.试用角色",
      SheetName: "试用角色信息|TrialRoleInfo",
      PromptKeyList: ["Id", "字段名"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.TrialRoleGroupInfo]: {
      KeyName: "GroupId",
      ExcelRelativePath: "s.试用角色",
      SheetName: "试用角色信息|TrialRoleInfo",
      PromptKeyList: ["字段名", "GroupId"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.PhantomFormation]: {
      KeyName: "Id",
      ExcelRelativePath: "b.编队",
      SheetName: "声骸编队|PhantomFormation",
      PromptKeyList: ["Id", "字段名"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.Role]: {
      KeyName: "Id",
      ExcelRelativePath: "j.角色",
      SheetName: "角色总表|RoleInfo",
      PromptKeyList: ["Id", "字段名"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.ScanType]: {
      KeyName: "UId",
      ExcelRelativePath: "g.关卡玩法数据",
      SheetName: "扫描组合|GamePlayScanComposite",
      PromptKeyList: ["UId", "字段名"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.DungeonEntrance]: {
      KeyName: "Id",
      ExcelRelativePath: "f.副本",
      SheetName: "副本入口|InstanceDungeonEntrance",
      PromptKeyList: ["Id", "字段名"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.ExploreTools]: {
      KeyName: "PhantomSkillId",
      ExcelRelativePath: "t.探索工具",
      SheetName: "探索工具|ExploreTools",
      PromptKeyList: ["字段名"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.Damage]: {
      KeyName: "Id",
      ExcelRelativePath: "j.结算",
      SheetName: "结算表|Damage",
      PromptKeyList: ["Id", "字段名"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.TimePeriod]: {
      KeyName: "TimeId",
      ExcelRelativePath: "s.时间表/q.区间时间",
      SheetName: "区间时间|TimeQuantum",
      PromptKeyList: ["TimeId", "BeginTime"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.DropPackage]: {
      KeyName: "Id",
      ExcelRelativePath: "d.掉落",
      SheetName: "掉落包|DropPackage",
      PromptKeyList: ["Id"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.AreaLevel]: {
      KeyName: "AreaId",
      ExcelRelativePath: "q.区域",
      SheetName: "区域|Area",
      PromptKeyList: ["Title", "Level"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
    [EAkiExcelType.PhotoMemoryCollect]: {
      KeyName: "Id",
      ExcelRelativePath: "j.记忆手册",
      SheetName: "记忆收集|PhotoMemoryCollect",
      PromptKeyList: ["Id", "Title"],
      SeparatorInPrompt: " - ",
      IsFilterByWell: !0,
      SheetWorkspace: "AkiBase",
    },
  }),
  (exports.getAkiExcelPairConfig = getAkiExcelPairConfig),
  (exports.getAkiExcelExportJsonFileName = getAkiExcelExportJsonFileName),
  (exports.getAkiExcelPath = getAkiExcelPath);
// # sourceMappingURL=AkiExcelDefine.js.map
