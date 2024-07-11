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
  UiManager_1 = require("../../Ui/UiManager");
class AreaModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.UWe = void 0),
      (this.AWe = ""),
      (this.PWe = new Map()),
      (this.xWe = new Map()),
      (this.wWe = new Map()),
      (this.BWe = 0);
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
    return this.xWe.clear(), this.PWe.clear(), this.wWe.clear(), !0;
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
    if (void 0 === e) return this.AreaInfo.AreaId;
    var r = ConfigManager_1.ConfigManager.AreaConfig;
    let t = this.AreaInfo.AreaId,
      i = r.GetAreaInfo(t);
    for (; i && i.Level !== e; ) (t = i.Father), (i = r.GetAreaInfo(t));
    return t;
  }
  SetAreaInfo(e) {
    0 !== e &&
      (this.UWe = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e));
  }
  SetAreaName(e, r = !1) {
    var t;
    0 !== e &&
      ((this.UWe = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e)),
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
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeArea));
  }
  AddArea(e, r) {
    this.PWe.has(e) || this.PWe.set(e, r);
  }
  RemoveArea(e) {
    this.PWe.delete(e);
  }
  GetAreaState(e) {
    return this.xWe.get(e);
  }
  ToggleAreaState(e, r) {
    var t = this.PWe.get(e);
    this.xWe.get(e) !== r && (this.xWe.set(e, r), t?.ToggleArea(r));
  }
  InitAreaStates(e) {
    for (const r of e) this.xWe.set(r.l6n, r.F4n);
    e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(6);
    e && this.SetAreaInfo(e);
  }
  GetAreaCountryId() {
    if (this.UWe) {
      if (0 !== this.UWe.CountryId) return this.UWe.CountryId;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Area", 11, "[区域.xlsx]当前区域没有配置所属国家id", [
          "区域id",
          this.UWe.AreaId,
        ]);
    } else
      Log_1.Log.CheckError() && Log_1.Log.Error("Area", 11, "区域数据为空");
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
      i = this.UWe.WorldMonsterLevelMax.get(
        ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      );
    if (i) {
      i = t - i;
      if (i < r && e <= i) return 1;
      if (i < e) return 0;
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
}
exports.AreaModel = AreaModel;
//# sourceMappingURL=AreaModel.js.map
