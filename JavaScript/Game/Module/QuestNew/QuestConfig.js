"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestNewConfig = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  AreaQuestTrackingById_1 = require("../../../Core/Define/ConfigQuery/AreaQuestTrackingById"),
  DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById"),
  GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
  ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  NewOccupationConfigById_1 = require("../../../Core/Define/ConfigQuery/NewOccupationConfigById"),
  OccupationConfigById_1 = require("../../../Core/Define/ConfigQuery/OccupationConfigById"),
  QuestChapterById_1 = require("../../../Core/Define/ConfigQuery/QuestChapterById"),
  QuestDataById_1 = require("../../../Core/Define/ConfigQuery/QuestDataById"),
  QuestMainTypeById_1 = require("../../../Core/Define/ConfigQuery/QuestMainTypeById"),
  QuestNodeDataByKey_1 = require("../../../Core/Define/ConfigQuery/QuestNodeDataByKey"),
  QuestTypeAll_1 = require("../../../Core/Define/ConfigQuery/QuestTypeAll"),
  QuestTypeById_1 = require("../../../Core/Define/ConfigQuery/QuestTypeById"),
  QuestTypeByMainId_1 = require("../../../Core/Define/ConfigQuery/QuestTypeByMainId"),
  TaskMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/TaskMarkByMarkId"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal"),
  PublicUtil_1 = require("../../Common/PublicUtil");
class QuestNewConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.W1_ = new Map());
  }
  OnInit() {
    return this.Q1_(), !0;
  }
  Q1_() {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      var e = UE.KismetSystemLibrary.ConvertToAbsolutePath(
          UE.BlueprintPathsLibrary.ProjectDir(),
        ),
        e = UE.KismetSystemLibrary.ConvertToAbsolutePath(
          "" + e + IGlobal_1.globalConfig.AreaQuestTracking,
        );
      if (UE.BlueprintPathsLibrary.FileExists(e)) {
        var r = (0, puerts_1.$ref)(""),
          r =
            (UE.KuroStaticLibrary.LoadFileToString(r, e),
            (r = (0, puerts_1.$unref)(r)),
            JSON.parse(r));
        for (const t of r) this.W1_.set(t.QuestId + "_" + t.NodeId, t.AreaIds);
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("Editor", 18, "globalConfigTemp文件不存在", [
            "Path",
            e,
          ]);
    }
  }
  GetTrackEffectPath(e) {
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      var r = `Name = 'ETrackEffect.${e}'`,
        e =
          GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
            "ETrackEffect." + e,
          );
      if (e) return e.Value;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Quest",
          18,
          "找不到全局配置表的配置",
          ["全局表路径", "Source/Config/Raw/Tables/q.全局配置"],
          ["查询条件", r],
        );
    }
  }
  GetGlobalConfig(e) {
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      var r = `Name = '${e}'`,
        e =
          GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
            e,
          );
      if (e) return e.Value;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Quest",
          18,
          "找不到全局配置表的配置",
          ["全局表路径", "Source/Config/Raw/Tables/q.全局配置"],
          ["查询条件", r],
        );
    }
  }
  GetDropConfig(e) {
    var r;
    if (e)
      return (
        (r = DropPackageById_1.configDropPackageById.GetConfig(e)) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Quest", 18, "DropPackage表配置没找到", [
              "rewardId",
              e,
            ])),
        r
      );
  }
  GetItemInfoConfig(e) {
    var r = ItemInfoById_1.configItemInfoById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Quest", 18, "ItemInfo表配置没找到", ["Id", e])),
      r
    );
  }
  GetQuestTypeConfigs() {
    return QuestTypeAll_1.configQuestTypeAll.GetConfigList();
  }
  GetQuestTypeConfig(e) {
    var r = QuestTypeById_1.configQuestTypeById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Quest", 18, "QuestType表配置没找到", ["Id", e])),
      r
    );
  }
  GetQuestMainTypeConfig(e) {
    var r = QuestMainTypeById_1.configQuestMainTypeById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Quest", 18, "QuestMainType表配置没找到", ["Id", e])),
      r
    );
  }
  GetQuesTypesByMainType(e) {
    return QuestTypeByMainId_1.configQuestTypeByMainId.GetConfigList(e);
  }
  GetQuestMainTypeName(e) {
    e = this.GetQuestMainTypeConfig(e);
    return e
      ? (MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.MainTypeName) ??
          "")
      : "";
  }
  GetQuestTabIcon(e) {
    e = this.GetQuestMainTypeConfig(e);
    return e ? e.QuestTabIcon : "";
  }
  GetQuestTypeMark(e) {
    var r = TaskMarkByMarkId_1.configTaskMarkByMarkId.GetConfig(e);
    return r
      ? (StringUtils_1.StringUtils.IsBlank(r.MarkPic) &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Quest", 65, "地图标记表MarkPic为空", ["markId", e]),
        r.MarkPic)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Quest",
            18,
            "地图标记表TaskMark：MarkId = 的配置找不到",
            ["markId", e],
          ),
        "");
  }
  GetQuestMarkConfig(e) {
    var r = TaskMarkByMarkId_1.configTaskMarkByMarkId.GetConfig(e);
    if (r) return r;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Quest",
        18,
        "地图标记表TaskMark：MarkId = 的配置找不到",
        ["markId", e],
      );
  }
  GetQuestTypeMarkId(e) {
    e = this.GetQuestMainTypeConfig(e);
    if (e) return e.TrackIconId;
  }
  GetChapterConfig(e) {
    var r = QuestChapterById_1.configQuestChapterById.GetConfig(e);
    if (r) return r;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Quest", 18, "任务章节表：id = 的配置找不到", [
        "chapterId",
        e,
      ]);
  }
  GetOccupationConfig(e) {
    var r = OccupationConfigById_1.configOccupationConfigById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Quest",
            18,
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
    var r =
      NewOccupationConfigById_1.configNewOccupationConfigById.GetConfig(e);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Quest",
            18,
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
  GetOccupationType(e) {
    e = this.GetOccupationConfig(e);
    return e ? e.OccupationType : "";
  }
  GetQuestConfig(e) {
    var r = QuestDataById_1.configQuestDataById.GetConfig(e, !1);
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Quest", 18, "找不到任务配置", ["questId", e])),
      r
    );
  }
  GetQuestNodeConfig(e, r) {
    var t = QuestNodeDataByKey_1.configQuestNodeDataByKey.GetConfig(
      e + "_" + r,
      !1,
    );
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Quest",
            18,
            "找不到任务节点配置",
            ["questId", e],
            ["nodeId", r],
          )),
      t
    );
  }
  GetQuestTypeColor(e) {
    var r = this.GetQuestTypeConfig(e);
    if (r) return r.TypeColor;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Quest", 18, "任务类型表：id = 的配置找不到", [
        "questType",
        e,
      ]);
  }
  GetQuestTypeTextColor(e) {
    var r = this.GetQuestTypeConfig(e);
    if (r) return r.TextColor;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Quest", 18, "任务类型表：id = 的配置找不到", [
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
  GetQuestNodeAreaInfo(e, r) {
    var t,
      o = e + "_" + r;
    return PublicUtil_1.PublicUtil.UseDbConfig()
      ? (t = AreaQuestTrackingById_1.configAreaQuestTrackingById.GetConfig(o))
        ? t.AreaList
        : void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Quest",
              18,
              "找不到任务节点所在的区域信息",
              ["questId", e],
              ["nodeId", r],
            )
          )
      : this.W1_.get(o);
  }
}
exports.QuestNewConfig = QuestNewConfig;
//# sourceMappingURL=QuestConfig.js.map
