"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConfigMarkItem = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ConfigMarkItemView_1 = require("../MarkItemView/ConfigMarkItemView"),
  MarkItem_1 = require("./MarkItem");
class ConfigMarkItem extends MarkItem_1.MarkItem {
  constructor(t, e, i, s, r, n = 1) {
    super(i, s, r, n),
      (this.MarkConfig = void 0),
      (this.InnerMarkId = 0),
      (this.IsServerSaveShowState = !1),
      (this.ConditionShouldShow = !0),
      (this.OnSubMapChanged = (t) => {
        var e = this.LocateInGround();
        let i = !1;
        (i =
          e && 0 === t
            ? 0 === t
            : this.GetMultiMapId() ===
              ModelManager_1.ModelManager.WorldMapModel
                .WorldMapCurrentMultiMapId),
          this.IsSelectThisFloor !== i &&
            ((this.IsSelectThisFloor = i), this.UpdateViewIcon());
      }),
      (this.InnerMarkId = t),
      (this.ShowPriority = e.ShowPriority),
      (this.MarkConfig = e),
      (this.IconPath = this.MarkConfig.LockMarkPic);
  }
  get IsFogUnlock() {
    return ModelManager_1.ModelManager.MapModel.IsMarkFogUnlock(this.MarkId);
  }
  get IsLocked() {
    return this.MarkItemEntity.GamePlay.IsTeleportLocked;
  }
  get MarkItemType() {
    return 1;
  }
  IsMultiMap() {
    return 0 !== this.GetMultiMapId() || this.LocateInGround();
  }
  LocateInGround() {
    return (
      0 === this.MarkConfig.MultiMapFloorId &&
      0 < this.GetConnectMultiMapIds().length
    );
  }
  ConnectGround() {
    if (this.IsMultiMap()) {
      var t = this.MarkConfig.MultiMapFloorId;
      if (0 !== t)
        if (
          0 ===
          ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(t)?.Floor
        )
          return !0;
      for (const e of this.GetConnectMultiMapIds())
        if (
          0 ===
          ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(e)?.Floor
        )
          return !0;
      return !1;
    }
    return !0;
  }
  GetMultiMapId() {
    return 0 === this.MarkConfig.MultiMapFloorId &&
      0 < this.GetConnectMultiMapIds().length
      ? this.GetConnectMultiMapIds()[0]
      : this.MarkConfig.MultiMapFloorId;
  }
  GetConnectMultiMapIds() {
    return this.MarkConfig.ConnetMultiMapFloorId;
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
  get MapId() {
    return this.MarkConfig.MapId;
  }
  get InstanceDungeonId() {
    return this.MarkConfig.InstanceDungeonId;
  }
  get RelativeInstanceDungeonId() {
    return this.MarkConfig.RelativeDungeonId;
  }
  OnInitialize() {
    this.MarkConfig.Scale && this.SetConfigScale(this.MarkConfig.Scale),
      this.MarkConfig.CornerScale &&
        this.SetCornerScale(this.MarkConfig.CornerScale),
      this.InitShowCondition(),
      this.InitPosition(),
      this.InitIcon(),
      2 === this.MapType &&
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.WorldMapSubMapChangedFromUpdate,
          this.OnSubMapChanged,
        );
  }
  OnDestroy() {
    2 === this.MapType &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldMapSubMapChangedFromUpdate,
        this.OnSubMapChanged,
      );
  }
  InitPosition() {
    this.SetTrackData(
      ModelManager_1.ModelManager.MapModel.GetConfigMarkTrackTarget(
        this.MarkId,
      ),
    ),
      this.UpdateVisibleRelativeState();
  }
  InitIcon() {
    this.MarkConfig.RelativeSubType <= 0 ||
      (this.IconPath = this.MarkConfig.LockMarkPic);
  }
  IsRelativeFunctionOpen() {
    var t;
    return (
      this.MarkConfig.RelativeSubType <= 0 ||
      !(
        (t =
          ConfigManager_1.ConfigManager.MapConfig?.GetMapMarkFuncTypeConfigById(
            this.MarkConfig.RelativeSubType,
          )) && 0 < t.FunctionId
      ) ||
      ModelManager_1.ModelManager.FunctionModel.IsOpen(t.FunctionId)
    );
  }
  GetMarkItemViewType() {
    return 3;
  }
  CreateView() {
    return new ConfigMarkItemView_1.ConfigMarkItemView(this);
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
    if ("number" == typeof this.TrackTarget)
      return ModelManager_1.ModelManager.MapModel.GetMarkAreaText(
        this.MapId,
        this.TrackTarget,
      );
  }
  GDi(t) {
    return this.MarkConfig.ShowRange[0] < t && this.MarkConfig.ShowRange[1] > t;
  }
  get IsConditionShouldShow() {
    return (
      !(
        !this.ConditionShouldShow ||
        (this.IsServerSaveShowState &&
          !ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(
            this.MarkId,
          ).IsShow)
      ) && this.ConditionShouldShow
    );
  }
  InitShowCondition() {
    var t = this.MarkConfig.ShowCondition;
    t < 0
      ? (this.IsServerSaveShowState = !0)
      : 0 === t
        ? (this.ConditionShouldShow = !0)
        : ((this.IsServerSaveShowState = !1),
          (this.ConditionShouldShow =
            ModelManager_1.ModelManager.MapModel.IsMarkUnlockedByServer(
              this.MarkId,
            )));
  }
  CheckCanShowView() {
    var t;
    return this.CanConditionShowView()
      ? ((t = this.GetCurrentMapShowScale()),
        (t = this.GDi(t) || this.IsTracked),
        2 !== this.MapType ||
          (this.IsCanShowViewIntermediately !==
            (t = t || this.IsIgnoreScaleShow) &&
            (this.NeedPlayShowOrHideSeq = t ? "ShowView" : "HideView"),
          t))
      : this.IsTracked;
  }
  R3l() {
    return (
      !this.GamePlayIsFinish() ||
      1 === this.MarkConfig?.FinishIsShow ||
      !!ModelManager_1.ModelManager.WorldMapModel.CompletedPlayPointMarkIsShow
    );
  }
  GamePlayIsFinish() {
    return this.MarkItemEntity.GamePlay.IsFinish;
  }
  GamePlayIsDiscover() {
    var t = this.MarkConfig?.RelativeDungeonId ?? 0,
      e = this.MarkConfig?.RelativeId ?? 0;
    return ModelManager_1.ModelManager.LevelPlayReportModel.IsCommonLevelPlayDiscover(
      t,
      e,
    );
  }
  CanConditionShowView() {
    var t = this.MapType;
    return !(
      (1 === this.MarkConfig.MapShow && 1 !== t) ||
      (2 === this.MarkConfig.MapShow && 1 === t) ||
      ((!this.MarkItemEntity.IsTempMapMark || !this.IsTempMapMarkShow()) &&
        (this.InitShowCondition(),
        !this.ConditionShouldShow ||
          (this.IsServerSaveShowState &&
            !ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(
              this.MarkId,
            ).IsShow) ||
          !this.IsFogUnlock ||
          !this.R3l()))
    );
  }
  GetShowScale() {
    return this.MarkConfig.ShowRange[0] + this.MarkConfig.ShowRange[1] / 2;
  }
  IsLordGym() {
    return 3 === this.MarkConfig.RelativeSubType;
  }
  IsNewLordGym() {
    return 8 === this.MarkConfig.RelativeSubType;
  }
  UpdateViewIcon() {
    var t;
    this.InnerView && (t = this.InnerView) && t.UpdateIcon();
  }
}
exports.ConfigMarkItem = ConfigMarkItem;
//# sourceMappingURL=ConfigMarkItem.js.map
