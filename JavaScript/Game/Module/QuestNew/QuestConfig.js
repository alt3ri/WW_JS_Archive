"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestNewConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById");
const GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName");
const ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const NewOccupationConfigById_1 = require("../../../Core/Define/ConfigQuery/NewOccupationConfigById");
const OccupationConfigById_1 = require("../../../Core/Define/ConfigQuery/OccupationConfigById");
const QuestChapterById_1 = require("../../../Core/Define/ConfigQuery/QuestChapterById");
const QuestDataById_1 = require("../../../Core/Define/ConfigQuery/QuestDataById");
const QuestMainTypeById_1 = require("../../../Core/Define/ConfigQuery/QuestMainTypeById");
const QuestNodeDataByKey_1 = require("../../../Core/Define/ConfigQuery/QuestNodeDataByKey");
const QuestTypeAll_1 = require("../../../Core/Define/ConfigQuery/QuestTypeAll");
const QuestTypeById_1 = require("../../../Core/Define/ConfigQuery/QuestTypeById");
const QuestTypeByMainId_1 = require("../../../Core/Define/ConfigQuery/QuestTypeByMainId");
const TaskMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TaskMarkByMarkId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const PublicUtil_1 = require("../../Common/PublicUtil");
class QuestNewConfig extends ConfigBase_1.ConfigBase {
  OnInit() {
    return !0;
  }
  GetTrackEffectPath(e) {
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      const r = `Name = 'ETrackEffect.${e}'`;
      var e =
        GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
          "ETrackEffect." + e,
        );
      if (e) return e.Value;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Quest",
          19,
          "找不到全局配置表的配置",
          ["全局表路径", "Source/Config/Raw/Tables/q.全局配置"],
          ["查询条件", r],
        );
    }
  }
  GetGlobalConfig(e) {
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      const r = `Name = '${e}'`;
      var e =
        GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
          e,
        );
      if (e) return e.Value;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Quest",
          19,
          "找不到全局配置表的配置",
          ["全局表路径", "Source/Config/Raw/Tables/q.全局配置"],
          ["查询条件", r],
        );
    }
  }
  GetDropConfig(e) {
    let r;
    if (e)
      return (
        (r = DropPackageById_1.configDropPackageById.GetConfig(e)) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Quest", 19, "DropPackage表配置没找到", [
              "rewardId",
              e,
            ])),
        r
      );
  }
  GetItemInfoConfig(e) {
    const r = ItemInfoById_1.configItemInfoById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Quest", 19, "ItemInfo表配置没找到", ["Id", e])),
      r
    );
  }
  GetQuestTypeConfigs() {
    return QuestTypeAll_1.configQuestTypeAll.GetConfigList();
  }
  GetQuestTypeConfig(e) {
    const r = QuestTypeById_1.configQuestTypeById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Quest", 19, "QuestType表配置没找到", ["Id", e])),
      r
    );
  }
  GetQuestMainTypeConfig(e) {
    const r = QuestMainTypeById_1.configQuestMainTypeById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Quest", 19, "QuestMainType表配置没找到", ["Id", e])),
      r
    );
  }
  GetQuesTypesByMainType(e) {
    return QuestTypeByMainId_1.configQuestTypeByMainId.GetConfigList(e);
  }
  GetQuestMainTypeName(e) {
    e = this.GetQuestMainTypeConfig(e);
    return e
      ? MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MainTypeName) ??
          ""
      : "";
  }
  GetQuestTabIcon(e) {
    e = this.GetQuestMainTypeConfig(e);
    return e ? e.QuestTabIcon : "";
  }
  GetQuestTypeMark(e) {
    const r = TaskMarkByMarkId_1.configTaskMarkByMarkId.GetConfig(e);
    return r
      ? r.MarkPic
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Quest",
            19,
            "地图标记表TaskMark：MarkId = 的配置找不到",
            ["markId", e],
          ),
        "");
  }
  GetQuestMarkConfig(e) {
    const r = TaskMarkByMarkId_1.configTaskMarkByMarkId.GetConfig(e);
    if (r) return r;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Quest",
        19,
        "地图标记表TaskMark：MarkId = 的配置找不到",
        ["markId", e],
      );
  }
  GetQuestTypeMarkId(e) {
    e = this.GetQuestMainTypeConfig(e);
    if (e) return e.TrackIconId;
  }
  GetChapterConfig(e) {
    const r = QuestChapterById_1.configQuestChapterById.GetConfig(e);
    if (r) return r;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Quest", 19, "任务章节表：id = 的配置找不到", [
        "chapterId",
        e,
      ]);
  }
  GetOccupationConfig(e) {
    const r = OccupationConfigById_1.configOccupationConfigById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Quest",
            19,
            "找不到占用配置表的配置",
            [
              "全局表路径",
              "Source/Config/Raw/Tables/k.可视化编辑/z.占用组配置",
            ],
            ["Id", e],
          )),
      r
    );
  }
  GetNewOccupationConfig(e) {
    const r =
      NewOccupationConfigById_1.configNewOccupationConfigById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Quest",
            19,
            "找不到占用配置表的配置",
            [
              "全局表路径",
              "Source/Config/Raw/Tables/k.可视化编辑/z.占用组配置",
            ],
            ["Id", e],
          )),
      r
    );
  }
  GetOccupationResourceName(e) {
    e = this.GetOccupationConfig(e);
    return e ? PublicUtil_1.PublicUtil.GetConfigTextByTable(4, e.Id) : "";
  }
  GetQuestConfig(e) {
    const r = QuestDataById_1.configQuestDataById.GetConfig(e, !1);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Quest", 19, "找不到任务配置", ["questId", e])),
      r
    );
  }
  GetQuestNodeConfig(e, r) {
    const t = QuestNodeDataByKey_1.configQuestNodeDataByKey.GetConfig(
      e + "_" + r,
      !1,
    );
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Quest",
            19,
            "找不到任务节点配置",
            ["questId", e],
            ["nodeId", r],
          )),
      t
    );
  }
  GetQuestTypeColor(e) {
    const r = this.GetQuestTypeConfig(e);
    if (r) return r.TypeColor;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Quest", 19, "任务类型表：id = 的配置找不到", [
        "questType",
        e,
      ]);
  }
  GetQuestTypeTextColor(e) {
    const r = this.GetQuestTypeConfig(e);
    if (r) return r.TextColor;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Quest", 19, "任务类型表：id = 的配置找不到", [
        "questType",
        e,
      ]);
  }
  GetNewTipsShowTime(e) {
    e = this.GetQuestMainTypeConfig(e);
    return e ? e.NewQuestTipTime : 0;
  }
  GetQuestUpdateShowTime(e) {
    e = this.GetQuestMainTypeConfig(e);
    return e ? e.QuestUpdateTipsTime : 0;
  }
}
exports.QuestNewConfig = QuestNewConfig;
// # sourceMappingURL=QuestConfig.js.map
