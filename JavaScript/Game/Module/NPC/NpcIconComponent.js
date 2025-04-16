"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcIconComponent = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  GameBudgetInterfaceController_1 = require("../../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiActorPool_1 = require("../../Ui/UiActorPool"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiManager_1 = require("../../Ui/UiManager"),
  UiModel_1 = require("../../Ui/UiModel"),
  GameBudgetAllocatorConfigCreator_1 = require("../../World/Define/GameBudgetAllocatorConfigCreator"),
  MarkItemUtil_1 = require("../Map/Marks/MarkItemUtil"),
  TrackController_1 = require("../Track/TrackController"),
  NpcIconComponentView_1 = require("./NpcIconComponentView");
class NpcIconComponent {
  constructor(t) {
    (this.Eqi = void 0),
      (this.n8 = ""),
      (this.HeadView = void 0),
      (this.Pe = void 0),
      (this.Sqi = -1),
      (this.yqi = 0),
      (this.MaxShowQuestDisSquared = 0),
      (this.Tqi = 0),
      (this.Lqi = void 0),
      (this.Dqi = void 0),
      (this.Rqi = 0),
      (this.Kr = !1),
      (this.yW = void 0),
      (this.Uqi = 0),
      (this.Aqi = !1),
      (this.Lz = Vector_1.Vector.Create()),
      (this.G1l = !1),
      (this.k1l = !0),
      (this.LocationProxyFunction = void 0),
      (this.Pe = t),
      (this.yqi =
        ConfigManager_1.ConfigManager.NpcIconConfig.NpcIconHeadInfoLimitMaxDistanceSquared);
  }
  RegisterTick() {
    this.yW &&
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "HudUnit",
          36,
          "NpcIconComponent RegisterTick: 重复注册Tick",
          ["NpcIconComponent", this.constructor.name],
          ["Path", this.n8],
        ),
      this.UnregisterTick());
    var t =
      GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
        .TsHUDTickConfig;
    this.yW =
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(
        t.GroupName,
        t.SignificanceGroup,
        this,
        this.Eqi?.Actor,
      );
  }
  UnregisterTick() {
    this.yW &&
      (GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(
        this,
      ),
      (this.yW = void 0));
  }
  ScheduledTick(t, e, i) {}
  ScheduledAfterTick(t, e, i) {
    this.Tick(t * CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  OnEnabledChange(t, e) {
    this.SetRootItemState(t);
  }
  get Pqi() {
    return this.G1l;
  }
  set Pqi(t) {
    this.G1l = t;
  }
  get xqi() {
    return this.k1l;
  }
  set xqi(t) {
    this.k1l = t;
  }
  get Lrt() {
    return this.Pqi || this.xqi;
  }
  OnWasRecentlyRenderedOnScreenChange(t) {
    this.Pqi = t;
  }
  OnNpcWasRecentlyRenderedOnScreenChange(t) {
    this.xqi = t;
  }
  SetupCheckRange(t) {
    this.yqi = t;
  }
  async AddNpcIconAsync() {
    return (
      UiManager_1.UiManager.IsInited ||
        ((this.Lqi = new CustomPromise_1.CustomPromise()),
        (this.Dqi = () => {
          this.Lqi.SetResult(void 0),
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.UiManagerInit,
              this.Dqi,
            );
        }),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.UiManagerInit,
          this.Dqi,
        ),
        await this.Lqi.Promise),
      this.CreateNpcIcon()
    );
  }
  async CreateNpcIcon() {
    var t;
    return (
      (this.n8 = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "UiItem_NPCIcon_Prefab",
      )),
      (this.Eqi = await UiActorPool_1.UiActorPool.GetAsync(
        this.n8,
        UiLayer_1.UiLayer.WorldSpaceUiRootItem,
      )),
      this.Kr
        ? (UiActorPool_1.UiActorPool.RecycleAsync(this.Eqi, this.n8), !1)
        : ((t = this.Pe.GetAttachToMeshComponent()),
          this.Eqi.Actor.K2_AttachToComponent(t, void 0, 2, 0, 1, !1),
          this.Eqi.Actor.SetActorHiddenInGame(!1),
          (this.HeadView = new NpcIconComponentView_1.NpcIconComponentView()),
          UiModel_1.UiModel.AddNpcIconViewUnit(this.HeadView),
          await this.HeadView.CreateByActorAsync(this.Eqi.Actor),
          !this.Kr &&
            (this.HeadView.SetHeadInfoNameState(!1),
            this.HeadView.SetDialogueActive(!1),
            this.RegisterTick(),
            this.Tick(
              Time_1.Time.DeltaTime * CommonDefine_1.MILLIONSECOND_PER_SECOND,
              !0,
            ),
            !0))
    );
  }
  SetCharacterIconLocation() {
    var t = this.Pe.GetAttachToMeshComponent(),
      t =
        (t.IsA(UE.StaticMeshComponent.StaticClass())
          ? this.Lz.FromUeVector(t.D_K2_GetComponentLocation())
          : this.Pe.GetAttachToLocation(this.Lz),
        this.Pe.GetAddOffsetZ()),
      t =
        ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconLocationOffsetZ() +
        t;
    this.HeadView.InitItemLocation(this.Lz.ToUeVector(), t);
  }
  SetCharacterName(t) {
    this.HeadView?.SetNpcName(t);
  }
  SetCharacterSecondName(t) {
    this.HeadView?.SetNpcSecondName(t);
  }
  SetCharacterFunctionIcon(t) {
    this.HeadView?.SetFunctionIcon(t);
  }
  SetNpcQuest(t) {
    this.HeadView?.SetNpcQuestIcon(t);
  }
  SetHeadItemState(t) {
    this.HeadView?.SetHeadItemState(t);
  }
  SetQuestTrackCellState(t) {
    this.HeadView?.SetQuestTrackCellState(t);
  }
  SetRootItemState(t) {
    this.HeadView?.SetRootItemState(t);
  }
  GetRootItemState() {
    return !!this.HeadView?.GetRootItemState();
  }
  SetHeadInfoNameState(t) {
    this.HeadView?.SetHeadInfoNameState(t);
  }
  SetQuestInfoState(t) {
    this.HeadView?.SetNpcQuestIconState(t);
  }
  SetQuestTrackEffectState(t) {
    this.HeadView?.SetTrackEffectState(t);
  }
  SetEntityPbDataId(t) {
    this.Uqi = t;
  }
  SetDialogueText(t, e = -1, i = !1) {
    (this.Sqi = e * CommonDefine_1.MILLIONSECOND_PER_SECOND),
      this.HeadView?.SetDialogueActive(!0, i),
      this.HeadView?.SetDialogueText(t),
      i && this.wqi(!0);
  }
  HideDialogueText() {
    (this.Sqi = -1), this.HeadView?.SetDialogueActive(!1), this.wqi(!1);
  }
  IsDialogueTextActive() {
    return this.HeadView?.GetDialogueActive() ?? !1;
  }
  IsHeadIconActive() {
    return this.HeadView?.GetHeadIconActive() ?? !1;
  }
  IsHeadItemActive() {
    return this.HeadView?.GetHeadItemState() ?? !1;
  }
  wqi(t) {
    var e = ModelManager_1.ModelManager.TrackModel.IsTargetTracking(this.Uqi);
    e &&
      this.Aqi &&
      (TrackController_1.TrackController.SetTrackMarkOccupied(5, e.Id, t),
      (this.Aqi = t));
  }
  TickDialogueText(t) {
    this.Sqi < 0 || ((this.Sqi -= t), this.Sqi <= 0 && this.HideDialogueText());
  }
  Tick(t, e = !1) {
    this.Pe.CanTick(t) &&
      (e || this.Lrt) &&
      (this.Bqi(), this.TickDialogueText(t));
  }
  Bqi() {
    var t;
    ModelManager_1.ModelManager.CameraModel &&
      ((t = Vector_1.Vector.DistSquared(
        ModelManager_1.ModelManager.CameraModel.CameraLocation,
        this.Pe.GetSelfLocation(),
      )),
      this.bqi(t),
      this.qqi());
  }
  qqi() {
    var t;
    this.HeadView &&
      (t = CameraController_1.CameraController.CameraRotator) &&
      this.HeadView.UpdateRotation(t.Yaw, t.Pitch);
  }
  Gqi(t) {
    var e = this.Pe.IsInHeadItemShowRange(
      t,
      this.yqi,
      ConfigManager_1.ConfigManager.NpcIconConfig
        .NpcIconHeadInfoLimitMinDistanceSquared,
    );
    this.$1l(),
      this.SetHeadItemState(e),
      0 < this.Sqi &&
        (this.Rqi <
          ConfigManager_1.ConfigManager.NpcIconConfig
            .NpcIconHeadInfoLimitMinDistanceSquared ||
          this.Rqi > this.yqi) &&
        this.HideDialogueText(),
      e && this.Nqi(t);
  }
  $1l() {
    var t = ModelManager_1.ModelManager.TrackModel.IsTargetTracking(this.Uqi),
      e = MarkItemUtil_1.MarkItemUtil.CanShowTrackMark(t),
      t = !!t && 5 === t.TrackSource;
    this.SetQuestTrackCellState(t),
      t ||
        (this.HeadView &&
          ((this.HeadView.ForceHideDialog = e),
          (this.HeadView.ForceHideRootItem = e)));
  }
  Oqi(t) {
    var e =
      ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconHeadInfoNameLimitDistance();
    return t <= e * e;
  }
  kqi(t) {
    this.Pe.IsShowNameInfo() &&
      ((t = this.Oqi(t)), this.SetHeadInfoNameState(t));
  }
  Fqi(t) {
    return (
      0 === this.MaxShowQuestDisSquared ||
      t <= this.MaxShowQuestDisSquared * this.MaxShowQuestDisSquared
    );
  }
  Vqi(t) {
    return 0 === this.Tqi || t <= this.Tqi * this.Tqi;
  }
  Hqi(t) {
    var e;
    this.Pe.IsShowQuestInfo() &&
      ((e = this.Fqi(t)),
      this.SetQuestInfoState(e),
      (e = this.Vqi(t)),
      this.SetQuestTrackEffectState(e));
  }
  bqi(t) {
    this.Rqi !== t && ((this.Rqi = t), this.Gqi(t), this.kqi(t), this.Hqi(t));
  }
  Nqi(t) {
    t = ConfigManager_1.ConfigManager.NpcIconConfig.GetHeadStateScaleValue(t);
    this.HeadView?.SetHeadWorldScale3D(t);
  }
  Destroy() {
    (this.Kr = !0),
      this.HeadView &&
        (UiModel_1.UiModel.RemoveNpcIconViewUnit(this.HeadView),
        this.HeadView.Destroy(),
        (this.HeadView = void 0)),
      this.Eqi &&
        (this.Eqi.Actor?.DetachRootComponentFromParent(),
        UiActorPool_1.UiActorPool.RecycleAsync(this.Eqi, this.n8),
        (this.Eqi = void 0),
        (this.Pe = void 0)),
      this.UnregisterTick();
  }
}
exports.NpcIconComponent = NpcIconComponent;
//# sourceMappingURL=NpcIconComponent.js.map
