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
      (this.fje = void 0),
      (this.pje = ""),
      (this.vje = new Map()),
      (this.Mje = new Map()),
      (this.Sje = new Map()),
      (this.Eje = 0);
  }
  OnInit() {
    return (
      this.SetAreaInfo(1),
      (this.Eje =
        CommonParamById_1.configCommonParamById.GetIntConfig("AreaTipsShowCd")),
      !0
    );
  }
  OnClear() {
    return this.Mje.clear(), this.vje.clear(), this.Sje.clear(), !0;
  }
  get AreaName() {
    if (this.fje)
      return ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(
        this.fje.Title,
      );
  }
  get AreaHintName() {
    if (this.fje) {
      if (this.pje)
        return ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(
          this.pje,
        );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Area",
          7,
          "[区域.xlsx]当前需要显示的区域提示没有配置对应文本",
          ["区域id", this.fje.AreaId],
        );
    }
  }
  get AreaInfo() {
    return this.fje;
  }
  get AllAreas() {
    return this.vje;
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
      (this.fje = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e));
  }
  SetAreaName(e, r = !1) {
    var t;
    0 !== e &&
      ((this.fje = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e)),
      this.fje.Tips &&
        ((this.pje = this.fje.Title),
        void 0 === (t = this.Sje.get(e)) ||
          r ||
          Time_1.Time.Now - t > this.Eje) &&
        (UiManager_1.UiManager.IsViewOpen("AreaView")
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.UpdateAreaView,
            )
          : UiManager_1.UiManager.OpenView("AreaView"),
        this.Sje.set(e, Time_1.Time.Now)),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeArea));
  }
  AddArea(e, r) {
    this.vje.has(e) || this.vje.set(e, r);
  }
  RemoveArea(e) {
    this.vje.delete(e);
  }
  GetAreaState(e) {
    return this.Mje.get(e);
  }
  ToggleAreaState(e, r) {
    var t = this.vje.get(e);
    this.Mje.get(e) !== r && (this.Mje.set(e, r), t?.ToggleArea(r));
  }
  InitAreaStates(e) {
    for (const r of e) this.Mje.set(r.wFn, r.ckn);
    e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(6);
    e && this.SetAreaInfo(e);
  }
  GetAreaCountryId() {
    if (this.fje) {
      if (0 !== this.fje.CountryId) return this.fje.CountryId;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Area", 11, "[区域.xlsx]当前区域没有配置所属国家id", [
          "区域id",
          this.fje.AreaId,
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
      i = this.fje.WorldMonsterLevelMax.get(
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
