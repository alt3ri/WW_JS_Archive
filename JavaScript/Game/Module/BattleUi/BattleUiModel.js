"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiModel = void 0);
const puerts_1 = require("puerts"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiManager_1 = require("../../Ui/UiManager"),
  BattleUiAudioData_1 = require("./BattleUiAudioData"),
  BattleUiChildViewData_1 = require("./BattleUiChildViewData"),
  BattleUiEnvironmentKeyData_1 = require("./BattleUiEnvironmentKeyData"),
  BattleUiExploreModeData_1 = require("./BattleUiExploreModeData"),
  BattleUiFloatTipsData_1 = require("./BattleUiFloatTipsData"),
  BattleUiFormationData_1 = require("./BattleUiFormationData"),
  BattleUiFormationPanelData_1 = require("./BattleUiFormationPanelData"),
  BattleUiMergeHeadStateData_1 = require("./BattleUiMergeHeadStateData"),
  BattleUiPureModeData_1 = require("./BattleUiPureModeData"),
  BattleUiRoleData_1 = require("./BattleUiRoleData"),
  BattleUiSpecialEnergyBarData_1 = require("./BattleUiSpecialEnergyBarData"),
  FullScreenEffectHandle_1 = require("./FullScreenEffectHandle"),
  LevelUpCacheData_1 = require("./LevelUpCacheData"),
  HeadStateCommonParam_1 = require("./Views/HeadState/HeadStateCommonParam");
class BattleUiModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.pXe = new Map()),
      (this.vXe = void 0),
      (this.FormationData = void 0),
      (this.SpecialEnergyBarData = void 0),
      (this.ChildViewData = void 0),
      (this.FloatTipsData = void 0),
      (this.AudioData = void 0),
      (this.ExploreModeData = void 0),
      (this.MergeHeadStateData = void 0),
      (this.EnvironmentKeyData = void 0),
      (this.FormationPanelData = void 0),
      (this.PureModeData = void 0),
      (this.MXe = []),
      (this.EXe = []),
      (this.SXe = !0),
      (this.IsMissionPanelVisible = !0),
      (this.yXe = void 0),
      (this.IXe = new Map()),
      (this.HeadStateCommonParam = void 0),
      (this.TXe = void 0),
      (this.ThreatLevel1 = 0),
      (this.ThreatLevel3 = 0),
      (this.ThreatLevelColor1 = ""),
      (this.ThreatLevelColor2 = ""),
      (this.ThreatLevelColor3 = ""),
      (this.IsOpenJoystickLog = !1),
      (this.ConcertoChangeEffectDelay = 0),
      (this.LXe = void 0),
      (this.CursorCameraRotatorOffset = Rotator_1.Rotator.Create(0, 0, 0)),
      (this.ResetAddRotator = Rotator_1.Rotator.Create(0, 0, 0)),
      (this.CursorCameraRotationTime = 0),
      (this.DXe = (0, puerts_1.$ref)(0)),
      (this.RXe = (0, puerts_1.$ref)(0)),
      (this.ViewportSize = Vector2D_1.Vector2D.Create()),
      (this.ScreenPositionScale = 0),
      (this.ScreenPositionOffset = Vector2D_1.Vector2D.Create()),
      (this.IsLongPressExploreButton = !1),
      (this.IsPressJoyStick = !1),
      (this.UXe = !1),
      (this.AXe = !1),
      (this.PXe = !1),
      (this.IsInBattleSettlement = !1),
      (this.xXe = !1),
      (this.VKa = !1),
      (this.IsShowingMissionViewItems = void 0),
      (this.MissionViewData = void 0),
      (this.TrackDatas = new Map()),
      (this.TreeIncIdHandle = void 0),
      (this.TreeHandle = void 0),
      (this.Yo1 = new Map()),
      (this.wXe = void 0),
      (this.BXe = !1),
      (this.bXe = void 0),
      (this.qXe = void 0),
      (this.GXe = () => {
        (this.wXe = void 0),
          this.BXe &&
            (this.NXe(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
              this.bXe,
              this.qXe,
            ),
            (this.BXe = !1),
            (this.bXe = void 0),
            (this.qXe = void 0));
      }),
      (this.WHa = 1),
      (this.JZe = (t, e) => {
        this.TreeIncIdHandle === t &&
          ((this.TreeIncIdHandle = void 0), (this.TreeHandle = void 0));
      }),
      (this.eet = (t) => {
        var e;
        0 === t.DataSource &&
          (e =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(
              t.Id,
            )) &&
          e.GetSilentAreaShowInfo() &&
          ((this.TreeIncIdHandle = t.Id), (this.TreeHandle = e));
      }),
      (this.HQe = (t) => {
        if (this.MissionViewData) {
          var e,
            i,
            a = [];
          for ([e, i] of this.MissionViewData)
            i && 0 === i.DataSource && i.Id === t && a.push(e);
          for (const s of a) this.MissionViewData.delete(s);
        }
      }),
      (this.GuestId = 0),
      (this.GuestEffect = !1);
  }
  OnInit() {
    (this.HeadStateCommonParam =
      new HeadStateCommonParam_1.HeadStateCommonParam()),
      this.HeadStateCommonParam.Init(),
      (this.TXe = new Array());
    for (let t = 0; t <= 6; t++)
      this.TXe[t] = CommonParamById_1.configCommonParamById.GetStringConfig(
        "MonsterBarColor" + t,
      );
    return (
      (this.ThreatLevel1 =
        CommonParamById_1.configCommonParamById.GetIntConfig("ThreatLevel1")),
      (this.ThreatLevel3 =
        CommonParamById_1.configCommonParamById.GetIntConfig("ThreatLevel3")),
      (this.ThreatLevelColor1 =
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "ThreatLevelColor1",
        )),
      (this.ThreatLevelColor2 =
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "ThreatLevelColor2",
        )),
      (this.ThreatLevelColor3 =
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "ThreatLevelColor3",
        )),
      (this.ConcertoChangeEffectDelay =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "ConcertoChangeEffectDelay",
        )),
      (this.LXe = new Map([
        [
          0,
          CommonParamById_1.configCommonParamById.GetStringConfig(
            "PlayerHeadStateHpColor",
          ),
        ],
        [
          1,
          CommonParamById_1.configCommonParamById.GetStringConfig(
            "MonsterHeadStateHpColor",
          ),
        ],
        [
          2,
          CommonParamById_1.configCommonParamById.GetStringConfig(
            "CommonFriendHeadStateHpColor",
          ),
        ],
        [
          3,
          CommonParamById_1.configCommonParamById.GetStringConfig(
            "LiuFangZheEnemyHeadStateHpColor",
          ),
        ],
        [
          4,
          CommonParamById_1.configCommonParamById.GetStringConfig(
            "LiuFangZheFriendHeadStateHpColor",
          ),
        ],
        [
          5,
          CommonParamById_1.configCommonParamById.GetStringConfig(
            "AttackAnimyHeadStateHpColor",
          ),
        ],
        [
          6,
          CommonParamById_1.configCommonParamById.GetStringConfig(
            "UnAttackAnimyHeadStateHpColor",
          ),
        ],
        [
          7,
          CommonParamById_1.configCommonParamById.GetStringConfig(
            "CommonEnemyHeadStateHpColor",
          ),
        ],
        [
          14,
          CommonParamById_1.configCommonParamById.GetStringConfig(
            "YeguiHeadStateHpColor",
          ),
        ],
        [
          16,
          CommonParamById_1.configCommonParamById.GetStringConfig(
            "MonsterHeadStateHpColor",
          ),
        ],
      ])),
      (this.CursorCameraRotatorOffset.Yaw =
        CommonParamById_1.configCommonParamById.GetIntConfig("YawOffset")),
      (this.CursorCameraRotatorOffset.Pitch =
        CommonParamById_1.configCommonParamById.GetIntConfig("PitchOffset")),
      (this.CursorCameraRotatorOffset.Roll =
        CommonParamById_1.configCommonParamById.GetIntConfig("RollOffset")),
      (this.CursorCameraRotationTime =
        CommonParamById_1.configCommonParamById.GetIntConfig("RotationTime") /
        CommonDefine_1.MILLIONSECOND_PER_SECOND),
      (this.yXe = BigInt(0)),
      this.InitHeadIconEnergyBarConfig(),
      (this.FormationData =
        new BattleUiFormationData_1.BattleUiFormationData()),
      this.FormationData.Init(),
      (this.SpecialEnergyBarData =
        new BattleUiSpecialEnergyBarData_1.BattleUiSpecialEnergyBarData()),
      this.SpecialEnergyBarData.Init(),
      (this.ChildViewData =
        new BattleUiChildViewData_1.BattleUiChildViewData()),
      this.ChildViewData.Init(),
      (this.FloatTipsData =
        new BattleUiFloatTipsData_1.BattleUiFloatTipsData()),
      this.FloatTipsData.Init(),
      (this.AudioData = new BattleUiAudioData_1.BattleUiAudioData()),
      this.AudioData.Init(),
      (this.ExploreModeData =
        new BattleUiExploreModeData_1.BattleUiExploreModeData()),
      this.ExploreModeData.Init(),
      (this.MergeHeadStateData =
        new BattleUiMergeHeadStateData_1.BattleUiMergeHeadStateData()),
      this.MergeHeadStateData.Init(),
      (this.EnvironmentKeyData =
        new BattleUiEnvironmentKeyData_1.BattleUiEnvironmentKeyData()),
      this.EnvironmentKeyData.Init(),
      (this.FormationPanelData =
        new BattleUiFormationPanelData_1.BattleUiFormationPanelData()),
      this.FormationPanelData.Init(),
      (this.PureModeData = new BattleUiPureModeData_1.BattleUiPureModeData()),
      this.PureModeData.Init(),
      (this.IsShowingMissionViewItems = new Map()),
      (this.MissionViewData = new Map()),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText,
        this.JZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
        this.eet,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeRemove,
        this.HQe,
      ),
      !0
    );
  }
  async Preload() {
    return (
      this.UXe || (await this.SpecialEnergyBarData.Preload(), (this.UXe = !0)),
      !0
    );
  }
  GetHeadStateHpColor(t) {
    return this.LXe.get(t);
  }
  GetPropertyColor(t) {
    return this.TXe[t];
  }
  OnLeaveLevel() {
    return (
      (this.UXe = !1),
      this.FormationData.OnLeaveLevel(),
      this.SpecialEnergyBarData.OnLeaveLevel(),
      this.ChildViewData.OnLeaveLevel(),
      this.FloatTipsData.OnLeaveLevel(),
      this.AudioData.OnLeaveLevel(),
      this.ExploreModeData.OnLeaveLevel(),
      this.MergeHeadStateData.OnLeaveLevel(),
      this.EnvironmentKeyData.OnLeaveLevel(),
      (this.UXe = !1),
      (this.IsInBattleSettlement = !1),
      !(this.xXe = !1)
    );
  }
  OnClear() {
    return (
      this.OXe(),
      this.kXe(),
      this.ClearAllLevelUpCacheData(),
      this.IXe.clear(),
      (this.HeadStateCommonParam = void 0),
      (this.TXe = void 0),
      this.FormationData.Clear(),
      (this.FormationData = void 0),
      this.SpecialEnergyBarData.Clear(),
      (this.SpecialEnergyBarData = void 0),
      this.ChildViewData.Clear(),
      (this.ChildViewData = void 0),
      this.FloatTipsData.Clear(),
      (this.FloatTipsData = void 0),
      this.AudioData.Clear(),
      (this.AudioData = void 0),
      this.ExploreModeData.Clear(),
      (this.ExploreModeData = void 0),
      this.MergeHeadStateData.Clear(),
      (this.MergeHeadStateData = void 0),
      this.EnvironmentKeyData.Clear(),
      (this.EnvironmentKeyData = void 0),
      this.FormationPanelData.Clear(),
      (this.FormationPanelData = void 0),
      this.PureModeData.Clear(),
      (this.PureModeData = void 0),
      this.IsShowingMissionViewItems?.clear(),
      this.MissionViewData?.clear(),
      this.TrackDatas?.clear(),
      this.Yo1.clear(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeEndShowTrackText,
        this.JZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeStartShowTrackText,
        this.eet,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeRemove,
        this.HQe,
      ),
      !0
    );
  }
  OnWorldDone() {
    this.ExploreModeData?.UpdateDungeonState();
  }
  TryBroadcastRoleLevelUpData(t, e, i) {
    UiManager_1.UiManager.IsViewShow("BattleView")
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnFormationPlayLevelUp,
          t,
          e,
          i,
        )
      : this.AddLevelUpCacheData(t, e, i);
  }
  TryBroadcastCacheRoleLevelUpData() {
    if (UiManager_1.UiManager.IsViewShow("BattleView")) {
      for (const a of this.MXe) {
        var t = a.ConfigId,
          e = a.Exp,
          i = a.Level;
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnFormationPlayLevelUp,
          t,
          e,
          i,
        );
      }
      this.ClearAllLevelUpCacheData();
    }
  }
  AddLevelUpCacheData(t, e, i) {
    t = new LevelUpCacheData_1.LevelUpCacheData(t, e, i);
    this.MXe.push(t);
  }
  ClearAllLevelUpCacheData() {
    this.MXe.length = 0;
  }
  TryBroadcastRevive(t) {
    UiManager_1.UiManager.IsViewShow("BattleView")
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnFormationPlayRevive,
          [t],
        )
      : this.AddReviveEntityIdList(t);
  }
  TryBroadcastCacheRevive() {
    UiManager_1.UiManager.IsViewShow("BattleView") &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFormationPlayRevive,
        this.EXe,
      ),
      this.ClearReviveEntityIdList());
  }
  AddReviveEntityIdList(t) {
    this.EXe.push(t);
  }
  ClearReviveEntityIdList() {
    this.EXe.length = 0;
  }
  GetIsBossStateVisible() {
    return this.SXe;
  }
  GetFullScreenEffect(t) {
    return this.IXe.get(t);
  }
  AddFullScreenEffect(t, e) {
    let i = void 0;
    i = void 0 === e ? this.yXe-- : e;
    e = this.GetFullScreenEffect(i);
    return (
      e ||
        ((e = new FullScreenEffectHandle_1.FullScreenEffectHandle(i, t)),
        this.IXe.set(i, e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnAddFullScreenEffect,
          e,
        )),
      e
    );
  }
  RemoveFullScreenEffect(t) {
    t &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRemoveFullScreenEffect,
        t,
      ),
      (t = t.UniqueId),
      this.IXe.delete(t));
  }
  RemoveFullScreenEffectByUniqueId(t) {
    t = this.IXe.get(t);
    this.RemoveFullScreenEffect(t);
  }
  ClearFullScreenEffect() {
    this.IXe.clear(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnClearFullScreenEffect,
      );
  }
  UpdateViewPortSize() {
    Global_1.Global.CharacterController.GetViewportSize(this.DXe, this.RXe);
    var t = (0, puerts_1.$unref)(this.DXe),
      e = (0, puerts_1.$unref)(this.RXe),
      e = (this.ViewportSize.Set(t, e), UiLayer_1.UiLayer.UiRootItem);
    e &&
      ((this.ScreenPositionScale = e.GetWidth() / t),
      this.ScreenPositionOffset.Set(0.5 * -e.GetWidth(), 0.5 * -e.GetHeight()));
  }
  GetRoleData(t) {
    return this.pXe.get(t);
  }
  GetCurRoleData() {
    return this.vXe;
  }
  OnChangeRole(t, e) {
    let i = !1;
    for (const a of this.pXe.values())
      t === a.EntityHandle
        ? (a.OnChangeRole(!0), (this.vXe = a), (i = !0))
        : a.OnChangeRole(!1);
    i || (this.vXe = this.FXe(t, !0)),
      (this.BXe = !0),
      (this.bXe = t?.Id),
      (this.qXe = e?.Id),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
        this.bXe,
        this.qXe ?? 0,
      ),
      this.VXe();
  }
  OnFormationLoaded() {
    this.FormationPanelData.UpdateFormationPanelData(),
      this.HXe(),
      this.ClearFullScreenEffect(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
      );
  }
  OnAddEntity(t) {
    this.MergeHeadStateData.OnAddEntity(t);
  }
  OnRemoveEntity(t) {
    var e = this.pXe.get(t.Id);
    e &&
      (this.pXe.delete(t.Id),
      e.Clear(),
      this.vXe === e && (this.vXe = void 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiRemoveRoleData,
        t.Entity,
      )),
      this.MergeHeadStateData.OnRemoveEntity(t);
  }
  HXe() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    for (const a of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities())
      a === t ? (this.vXe = this.FXe(a, !0)) : this.FXe(a, !1);
    var e = this.FormationPanelData?.PositionItemMap?.values();
    if (e)
      for (const s of e) {
        var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(
          s.CreatureDataId,
        );
        i?.Valid && this.FXe(i, !1, !1);
      }
  }
  FXe(t, e, i = !0) {
    let a = this.pXe.get(t.Id);
    return (
      a
        ? i && a.IsCurEntity !== e && a.OnChangeRole(e)
        : ((a = new BattleUiRoleData_1.BattleUiRoleData()).Init(t, e),
          this.pXe.set(t.Id, a)),
      a
    );
  }
  kXe() {
    for (const t of this.pXe.values()) t.Clear();
    this.pXe.clear();
  }
  VXe() {
    this.wXe ||
      (this.wXe = TimerSystem_1.TimerSystem.Next(this.GXe, BattleUiModel.jXe));
  }
  OXe() {
    this.wXe ||
      (TimerSystem_1.TimerSystem.Has(this.wXe) &&
        TimerSystem_1.TimerSystem.Remove(this.wXe),
      (this.wXe = void 0),
      (this.BXe = !1),
      (this.bXe = void 0),
      (this.qXe = void 0));
  }
  NXe() {
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    t?.RoleBattleViewInfo
      ? (this.ChildViewData.SetChildVisible(
          3,
          4,
          t.RoleBattleViewInfo.MiniMapVisible,
        ),
        this.ChildViewData.SetChildVisible(
          3,
          3,
          t.RoleBattleViewInfo.TopButtonVisible,
        ),
        this.ChildViewData.SetChildVisible(
          3,
          2,
          t.RoleBattleViewInfo.HomeButtonVisible,
        ),
        this.ChildViewData.SetChildVisible(
          3,
          11,
          t.RoleBattleViewInfo.RoleStateVisible,
        ),
        this.ChildViewData.SetChildVisible(
          3,
          6,
          t.RoleBattleViewInfo.ChatVisible,
        ),
        this.ChildViewData.SetChildVisible(
          3,
          7,
          t.RoleBattleViewInfo.FormationVisible,
        ),
        this.ChildViewData.SetChildVisible(
          3,
          8,
          t.RoleBattleViewInfo.FormationVisible,
        ),
        this.ChildViewData.SetChildVisible(
          3,
          10,
          1 !== t.RoleBattleViewInfo.JoystickType,
        ))
      : (this.ChildViewData.SetChildVisible(3, 4, !0),
        this.ChildViewData.SetChildVisible(3, 3, !0),
        this.ChildViewData.SetChildVisible(3, 2, !0),
        this.ChildViewData.SetChildVisible(3, 11, !0),
        this.ChildViewData.SetChildVisible(3, 6, !0),
        this.ChildViewData.SetChildVisible(3, 7, !0),
        this.ChildViewData.SetChildVisible(3, 8, !0),
        this.ChildViewData.SetChildVisible(3, 10, !0));
  }
  SetIsDynamicJoystick(t) {
    (this.AXe = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSetJoystickMode,
        t,
      );
  }
  GetIsDynamicJoystick() {
    return this.AXe;
  }
  SetIsAutoSwitchSkillButtonMode(t) {
    (this.PXe = t), this.ExploreModeData?.SetAutoSwitch(t);
  }
  GetIsAutoSwitchSkillButtonMode() {
    return this.PXe;
  }
  SetExecutionInteractEnable(t) {
    (this.xXe = t),
      ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.SwitchInteractData.SetInteractExist(
        t,
        1,
      ),
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
  }
  ExistBattleInteract() {
    return this.xXe;
  }
  get ChatScrollViewVisible() {
    return this.VKa;
  }
  set ChatScrollViewVisible(t) {
    this.VKa !== t &&
      ((this.VKa = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiChatScrollViewVisibleChanged,
      ));
  }
  IsEnableChangeInputControllerOnMobile() {
    return !ModelManager_1.ModelManager.PanelQteModel.IsInQte;
  }
  SetBattleUiAlpha(t) {
    this.WHa !== t &&
      ((this.WHa = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiAlphaChanged,
        t,
      ));
  }
  GetBattleUiAlpha() {
    return this.WHa;
  }
  ShowTypeChange(t, e) {
    this.PureModeData?.ShowTypeChange(t, e);
  }
  AddGuest(t) {
    (this.GuestId = t),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshGuest);
  }
  RemoveGuest(t) {
    0 !== this.GuestId &&
      (this.GuestId !== t
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Plot",
            26,
            "GuestId不匹配，移除失败",
            ["guestId", t],
            ["curGuestId", this.GuestId],
          )
        : ((this.GuestId = 0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshGuest,
          )));
  }
  InitHeadIconEnergyBarConfig() {
    var t =
      ConfigManager_1.ConfigManager.BattleUiConfig.GetAllHeadIconEnergyBarConfig();
    if (t) for (const e of t) this.Yo1.set(e.Id, e);
  }
  GetHeadIconEnergyBarConfig(t) {
    return this.Yo1.get(t);
  }
}
(exports.BattleUiModel = BattleUiModel).jXe = Stats_1.Stat.Create(
  "SkillButtonEntityDataNextTick",
);
//# sourceMappingURL=BattleUiModel.js.map
