"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConfigMarkItem = void 0);
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConfigMarkItemView_1 = require("../MarkItemView/ConfigMarkItemView");
const MarkItem_1 = require("./MarkItem");
class ConfigMarkItem extends MarkItem_1.MarkItem {
  constructor(t, i, e, r, s, h = 1) {
    super(e, r, s, h),
      (this.MarkConfig = void 0),
      (this.InnerMarkId = 0),
      (this.IsServerSaveShowState = !1),
      (this.ConditionShouldShow = !0),
      (this.InnerMarkId = t),
      (this.ShowPriority = i.ShowPriority),
      (this.MarkConfig = i),
      (this.IconPath = this.MarkConfig.LockMarkPic),
      (this.MapId = this.MarkConfig.MapId);
  }
  get IsFogUnlock() {
    return (
      this.MarkConfig.FogShow === 1 ||
      this.MarkConfig.FogHide === 0 ||
      ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(
        this.MarkConfig.FogHide,
      )
    );
  }
  get MarkId() {
    return this.InnerMarkId;
  }
  get MarkConfigId() {
    return this.MarkConfig.MarkId;
  }
  get MarkType() {
    return this.MarkConfig.ObjectType;
  }
  Initialize() {
    this.MarkConfig.Scale && this.SetConfigScale(this.MarkConfig.Scale),
      this.InitShowCondition(),
      this.InitPosition(this.MarkConfig),
      this.InitIcon();
  }
  InitPosition(t) {
    t.EntityConfigId
      ? this.SetTrackData(t.EntityConfigId)
      : t.MarkVector && this.SetTrackData(Vector_1.Vector.Create(t.MarkVector)),
      this.UpdateTrackState();
  }
  InitIcon() {
    this.MarkConfig.RelativeSubType <= 0 ||
      (this.IconPath = this.MarkConfig.LockMarkPic);
  }
  IsRelativeFunctionOpen() {
    let t;
    return (
      this.MarkConfig.RelativeSubType <= 0 ||
      !(
        (t =
          ConfigManager_1.ConfigManager.MapConfig?.GetMapMarkFuncTypeConfigById(
            this.MarkConfig.RelativeSubType,
          )) && t.FunctionId > 0
      ) ||
      ModelManager_1.ModelManager.FunctionModel.IsOpen(t.FunctionId)
    );
  }
  OnCreateView() {
    this.InnerView = new ConfigMarkItemView_1.ConfigMarkItemView(this);
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
    let t, i, e, r;
    if (typeof this.TrackTarget === "number")
      return (
        (r =
          ConfigManager_1.ConfigManager.MapConfig.GetEntityConfigByMapIdAndEntityId(
            this.MapId,
            this.TrackTarget,
          )?.AreaId ?? 0),
        (i = ConfigManager_1.ConfigManager.AreaConfig.GetParentAreaId(r)),
        (t = (r = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(r))
          ? ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(r.Title)
          : ""),
        (e = (i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(i))
          ? ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(i.Title)
          : ""),
        (r = r
          ? ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryTitle(
              r.CountryId,
            )
          : ""),
        i?.Father === 0 ? r + "-" + t : r + `-${e}-` + t
      );
  }
  GLi(t) {
    return this.MarkConfig.ShowRange[0] < t && this.MarkConfig.ShowRange[1] > t;
  }
  get IsConditionShouldShow() {
    return this.ConditionShouldShow;
  }
  InitShowCondition() {
    const t = this.MarkConfig.ShowCondition;
    t < 0
      ? (this.IsServerSaveShowState = !0)
      : t === 0
        ? (this.ConditionShouldShow = !0)
        : ((this.IsServerSaveShowState = !1),
          (this.ConditionShouldShow =
            ModelManager_1.ModelManager.MapModel.IsMarkUnlockedByServer(
              this.MarkId,
            )));
  }
  CheckCanShowView() {
    let t;
    let i = this.MapType;
    return (
      !(
        (this.MarkConfig.MapShow === 1 && i !== 1) ||
        (this.MarkConfig.MapShow === 2 && i === 1) ||
        (this.InitShowCondition(), !this.ConditionShouldShow) ||
        (this.IsServerSaveShowState &&
          !ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(
            this.MarkId,
          ).IsShow) ||
        !this.IsFogUnlock
      ) &&
      ((t = this.GetCurrentMapShowScale()),
      (t = this.GLi(t)),
      i !== 2 ||
        (this.IsCanShowViewIntermediately !==
          (i = t || this.IsIgnoreScaleShow) &&
          (this.NeedPlayShowOrHideSeq = i ? "ShowView" : "HideView"),
        i))
    );
  }
  GetShowScale() {
    return this.MarkConfig.ShowRange[0] + this.MarkConfig.ShowRange[1] / 2;
  }
  IsLordGym() {
    return this.MarkConfig.RelativeSubType === 3;
  }
}
exports.ConfigMarkItem = ConfigMarkItem;
// # sourceMappingURL=ConfigMarkItem.js.map
