"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicConfigMarkItem = void 0);
const Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  DynamicConfigMarkItemView_1 = require("../MarkItemView/DynamicConfigMarkItemView"),
  MarkItem_1 = require("./MarkItem");
class DynamicConfigMarkItem extends MarkItem_1.MarkItem {
  constructor(t, e, i, r, s, n = 1) {
    super(i, r, s, n),
      (this.MarkConfig = void 0),
      (this.ODi = 0),
      (this.ConditionShouldShow = !0),
      (this.ODi = t),
      (this.ShowPriority = e.ShowPriority),
      (this.MarkConfig = e),
      (this.IconPath = this.MarkConfig.LockMarkPic),
      (this.MapId = this.MarkConfig.MapId);
  }
  get IsFogUnlock() {
    return (
      1 === this.MarkConfig.FogShow ||
      0 === this.MarkConfig.FogHide ||
      (ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(
        this.MarkConfig.FogHide,
      ) ??
        !1)
    );
  }
  get MarkId() {
    return this.ODi;
  }
  get MarkConfigId() {
    return this.MarkConfig.MarkId;
  }
  get MarkType() {
    return this.MarkConfig.ObjectType;
  }
  Initialize() {
    this.MarkConfig.Scale && this.SetConfigScale(this.MarkConfig.Scale),
      this.InitPosition(this.MarkConfig),
      this.InitShowCondition();
  }
  InitPosition(t) {
    t.EntityConfigId
      ? (this.SetTrackData(t.EntityConfigId), this.UpdateTrackState())
      : t.MarkVector &&
        (this.SetTrackData(Vector_1.Vector.Create(t.MarkVector)),
        this.UpdateTrackState());
  }
  OnCreateView() {
    this.InnerView = new DynamicConfigMarkItemView_1.DynamicConfigMarkItemView(
      this,
    );
  }
  GetLocaleDesc() {
    return this.MarkConfig.MarkDesc;
  }
  GetTitleText() {
    return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(
      this.MarkConfig.MarkTitle,
    );
  }
  GetAreaText() {
    var t, e, i;
    if ("number" == typeof this.TrackTarget)
      return (
        (t = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(
          this.TrackTarget,
        )),
        (i = ConfigManager_1.ConfigManager.AreaConfig.GetParentAreaId(t)),
        (e = (t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t))
          ? ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(t.Title)
          : ""),
        (i = (i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(i))
          ? ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(i.Title)
          : ""),
        (t
          ? ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryTitle(
              t.CountryId,
            )
          : "") +
          `-${i}-` +
          e
      );
  }
  GDi(t) {
    return this.MarkConfig.ShowRange[0] < t && this.MarkConfig.ShowRange[1] > t;
  }
  InitShowCondition() {
    this.ConditionShouldShow = !0;
  }
  CheckCanShowView() {
    var t,
      e = this.MapType;
    return (
      !(
        (1 === this.MarkConfig.MapShow && 1 !== e) ||
        (2 === this.MarkConfig.MapShow && 1 === e) ||
        !this.ConditionShouldShow ||
        !this.IsFogUnlock
      ) &&
      ((t = this.GetCurrentMapShowScale()),
      (t = this.GDi(t) || this.IsTracked),
      2 !== e ||
        (this.IsCanShowViewIntermediately !==
          (e = t || this.IsIgnoreScaleShow) &&
          (this.NeedPlayShowOrHideSeq = e ? "ShowView" : "HideView"),
        e))
    );
  }
  GetShowScale() {
    return this.MarkConfig.ShowRange[0] + this.MarkConfig.ShowRange[1] / 2;
  }
}
exports.DynamicConfigMarkItem = DynamicConfigMarkItem;
//# sourceMappingURL=DynamicConfigMarkItem.js.map
