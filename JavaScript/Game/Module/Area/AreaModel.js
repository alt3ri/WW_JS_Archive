"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaModel = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  MapUtil_1 = require("../Map/MapUtil");
class AreaModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.UWe = void 0),
      (this.AWe = ""),
      (this.PWe = new Map()),
      (this.xWe = new Map()),
      (this.wWe = new Map()),
      (this.BWe = 0),
      (this.Dtc = new Set());
  }
  OnInit() {
    return (
      this.SetAreaInfo(1),
      (this.BWe =
        CommonParamById_1.configCommonParamById.GetIntConfig("AreaTipsShowCd")),
      !0
    );
  }
  OnClear() {
    return (
      this.xWe.clear(), this.PWe.clear(), this.wWe.clear(), this.Dtc.clear(), !0
    );
  }
  get AreaName() {
    if (this.UWe)
      return ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(
        this.UWe.Title,
      );
  }
  get AreaHintName() {
    if (this.UWe) {
      if (this.AWe)
        return ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(
          this.AWe,
        );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Area",
          7,
          "[区域.xlsx]当前需要显示的区域提示没有配置对应文本",
          ["区域id", this.UWe.AreaId],
        );
    }
  }
  get AreaInfo() {
    return this.UWe;
  }
  get AllAreas() {
    return this.PWe;
  }
  GetCurrentAreaId(e) {
    return this.GetAreaId(this.AreaInfo, e);
  }
  GetAreaId(e, r) {
    if (void 0 === r) return e.AreaId;
    var t = ConfigManager_1.ConfigManager.AreaConfig;
    let a = e.AreaId,
      i = t.GetAreaInfo(a);
    for (; i && i.Level !== r; ) (a = i.Father), (i = t.GetAreaInfo(a));
    return a;
  }
  SetAreaInfo(e) {
    0 !== e &&
      ((this.UWe = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e)),
      ModelManager_1.ModelManager.PlayerInfoModel?.SetNumberPropById(6, e));
  }
  SetAreaName(e, r = !1) {
    var t,
      a = this.UWe?.AreaId;
    this.SetAreaInfo(e),
      this.UWe.Tips &&
        ((this.AWe = this.UWe.Title),
        void 0 === (t = this.wWe.get(e)) ||
          r ||
          Time_1.Time.Now - t > this.BWe) &&
        (UiManager_1.UiManager.IsViewOpen("AreaView")
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.UpdateAreaView,
            )
          : UiManager_1.UiManager.OpenView("AreaView"),
        this.wWe.set(e, Time_1.Time.Now)),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeArea, a, e);
  }
  AddArea(e, r) {
    this.PWe.has(e) ||
      (this.Dtc.has(e) &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Area",
            72,
            "传送时应该完成流送的Volume加载完成并触发BeginPlay",
            ["CurAreaId", this.UWe?.AreaId],
            ["BlockedAreaId", e],
            ["StreamingBlockedAreas", this.Dtc],
          ),
        this.Dtc.delete(e)),
      this.PWe.set(e, r));
  }
  AddWatchArea(e) {
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Area",
        72,
        "传送时应该完成流送的Volume实际上没有加载出来",
        ["CurAreaId", this.UWe?.AreaId],
        ["BlockedAreaId", e],
        ["StreamingBlockedAreas", this.Dtc],
      ),
      this.Dtc.add(e);
  }
  GetArea(e) {
    return this.PWe.get(e);
  }
  RemoveArea(e) {
    this.PWe.delete(e),
      this.Dtc.has(e) &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Area",
            72,
            "传送时应该完成流送的Volume触发了EndPlay",
            ["CurAreaId", this.UWe?.AreaId],
            ["BlockedAreaId", e],
            ["StreamingBlockedAreas", this.Dtc],
          ),
        this.Dtc.delete(e));
  }
  GetAreaState(e) {
    return this.xWe.get(e);
  }
  ToggleAreaState(e, r) {
    var t = this.PWe.get(e);
    this.xWe.get(e) !== r && (this.xWe.set(e, r), t?.ToggleArea(r));
  }
  InitAreaStates(e) {
    for (const r of e) this.xWe.set(r.p6n, r.Y4n);
    e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(6);
    e && this.SetAreaInfo(e);
  }
  GetAreaCountryId() {
    if (this.UWe) {
      if (0 !== this.UWe.CountryId) return this.UWe.CountryId;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Area", 10, "[区域.xlsx]当前区域没有配置所属国家id", [
          "区域id",
          this.UWe.AreaId,
        ]);
    } else
      Log_1.Log.CheckError() && Log_1.Log.Error("Area", 10, "区域数据为空");
  }
  GetAreaDangerLevel() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleList();
    let t = 0;
    e.forEach((e, r) => {
      t < e.GetLevelData().GetLevel() && (t = e.GetLevelData().GetLevel());
    });
    var e = CommonParamById_1.configCommonParamById.GetIntConfig(
        "HighDangerLevelOffset",
      ),
      r = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MidDangerLevelOffset",
      ),
      a = this.UWe.WorldMonsterLevelMax.get(
        ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      );
    if (a) {
      a = t - a;
      if (a < r && e <= a) return 1;
      if (a < e) return 0;
    }
    return 2;
  }
  GetAreaDangerText(e) {
    switch (e) {
      case 0:
        return ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          "AreaHighDangerText",
        );
      case 1:
        return ConfigManager_1.ConfigManager.TextConfig.GetTextById(
          "AreaHighMidText",
        );
      default:
        return "";
    }
  }
  IsExistRecommendPlayPoint() {
    return this.GetCurrentExploreAreaData()?.IsShowRecommendPlayPoint() ?? !1;
  }
  GetCurrentExploreAreaData() {
    var e = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId();
    return ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(
      e,
    );
  }
}
exports.AreaModel = AreaModel;
//# sourceMappingURL=AreaModel.js.map
