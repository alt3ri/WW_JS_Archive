"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiModel = void 0);
const puerts_1 = require("puerts"),
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
  BattleUiRoleData_1 = require("./BattleUiRoleData"),
  BattleUiSpecialEnergyBarData_1 = require("./BattleUiSpecialEnergyBarData"),
  FullScreenEffectHandle_1 = require("./FullScreenEffectHandle"),
  LevelUpCacheData_1 = require("./LevelUpCacheData"),
  HeadStateCommonParam_1 = require("./Views/HeadState/HeadStateCommonParam");
class BattleUiModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.sQe = new Map()),
      (this.aQe = void 0),
      (this.FormationData = void 0),
      (this.SpecialEnergyBarData = void 0),
      (this.ChildViewData = void 0),
      (this.FloatTipsData = void 0),
      (this.AudioData = void 0),
      (this.ExploreModeData = void 0),
      (this.MergeHeadStateData = void 0),
      (this.EnvironmentKeyData = void 0),
      (this.FormationPanelData = void 0),
      (this.hQe = []),
      (this.lQe = []),
      (this._Qe = !0),
      (this.uQe = void 0),
      (this.cQe = new Map()),
      (this.HeadStateCommonParam = void 0),
      (this.mQe = void 0),
      (this.ThreatLevel1 = 0),
      (this.ThreatLevel3 = 0),
      (this.ThreatLevelColor1 = ""),
      (this.ThreatLevelColor2 = ""),
      (this.ThreatLevelColor3 = ""),
      (this.IsOpenJoystickLog = !1),
      (this.ConcertoChangeEffectDelay = 0),
      (this.dQe = void 0),
      (this.CursorCameraRotatorOffset = Rotator_1.Rotator.Create(0, 0, 0)),
      (this.ResetAddRotator = Rotator_1.Rotator.Create(0, 0, 0)),
      (this.CursorCameraRotationTime = 0),
      (this.CQe = (0, puerts_1.$ref)(0)),
      (this.gQe = (0, puerts_1.$ref)(0)),
      (this.ViewportSize = Vector2D_1.Vector2D.Create()),
      (this.ScreenPositionScale = 0),
      (this.ScreenPositionOffset = Vector2D_1.Vector2D.Create()),
      (this.IsLongPressExploreButton = !1),
      (this.IsPressJoyStick = !1),
      (this.fQe = !1),
      (this.pQe = !1),
      (this.vQe = !1),
      (this.IsInBattleSettlement = !1),
      (this.MQe = !1),
      (this.SQe = void 0),
      (this.EQe = !1),
      (this.yQe = void 0),
      (this.IQe = void 0),
      (this.TQe = () => {
        (this.SQe = void 0),
          this.EQe &&
            (this.LQe(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.BattleUiCurRoleDataChangedNextTick,
              this.yQe,
              this.IQe,
            ),
            (this.EQe = !1),
            (this.yQe = void 0),
            (this.IQe = void 0));
      });
  }
  OnInit() {
    (this.HeadStateCommonParam =
      new HeadStateCommonParam_1.HeadStateCommonParam()),
      this.HeadStateCommonParam.Init(),
      (this.mQe = new Array());
    for (let t = 0; t <= 6; t++)
      this.mQe[t] = CommonParamById_1.configCommonParamById.GetStringConfig(
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
      (this.dQe = new Map([
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
      (this.uQe = BigInt(0)),
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
      !0
    );
  }
  async Preload() {
    return (
      this.fQe || (await this.SpecialEnergyBarData.Preload(), (this.fQe = !0)),
      !0
    );
  }
  GetHeadStateHpColor(t) {
    return this.dQe.get(t);
  }
  GetPropertyColor(t) {
    return this.mQe[t];
  }
  OnLeaveLevel() {
    return (
      (this.fQe = !1),
      this.FormationData.OnLeaveLevel(),
      this.SpecialEnergyBarData.OnLeaveLevel(),
      this.ChildViewData.OnLeaveLevel(),
      this.FloatTipsData.OnLeaveLevel(),
      this.AudioData.OnLeaveLevel(),
      this.ExploreModeData.OnLeaveLevel(),
      this.MergeHeadStateData.OnLeaveLevel(),
      this.EnvironmentKeyData.OnLeaveLevel(),
      (this.fQe = !1),
      (this.IsInBattleSettlement = !1),
      !(this.MQe = !1)
    );
  }
  OnClear() {
    return (
      this.DQe(),
      this.RQe(),
      this.ClearAllLevelUpCacheData(),
      this.cQe.clear(),
      (this.HeadStateCommonParam = void 0),
      (this.mQe = void 0),
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
      !(this.FormationPanelData = void 0)
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
      for (const a of this.hQe) {
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
    this.hQe.push(t);
  }
  ClearAllLevelUpCacheData() {
    this.hQe.length = 0;
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
        this.lQe,
      ),
      this.ClearReviveEntityIdList());
  }
  AddReviveEntityIdList(t) {
    this.lQe.push(t);
  }
  ClearReviveEntityIdList() {
    this.lQe.length = 0;
  }
  GetIsBossStateVisible() {
    return this._Qe;
  }
  GetFullScreenEffect(t) {
    return this.cQe.get(t);
  }
  AddFullScreenEffect(t, e) {
    let i = void 0;
    i = void 0 === e ? this.uQe-- : e;
    e = this.GetFullScreenEffect(i);
    return (
      e ||
        ((e = new FullScreenEffectHandle_1.FullScreenEffectHandle(i, t)),
        this.cQe.set(i, e),
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
      this.cQe.delete(t));
  }
  RemoveFullScreenEffectByUniqueId(t) {
    t = this.cQe.get(t);
    this.RemoveFullScreenEffect(t);
  }
  ClearFullScreenEffect() {
    this.cQe.clear(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnClearFullScreenEffect,
      );
  }
  UpdateViewPortSize() {
    Global_1.Global.CharacterController.GetViewportSize(this.CQe, this.gQe);
    var t = (0, puerts_1.$unref)(this.CQe),
      e = (0, puerts_1.$unref)(this.gQe),
      e = (this.ViewportSize.Set(t, e), UiLayer_1.UiLayer.UiRootItem);
    e &&
      ((this.ScreenPositionScale = e.GetWidth() / t),
      this.ScreenPositionOffset.Set(0.5 * -e.GetWidth(), 0.5 * -e.GetHeight()));
  }
  GetRoleData(t) {
    return this.sQe.get(t);
  }
  GetCurRoleData() {
    return this.aQe;
  }
  OnChangeRole(t, e) {
    let i = !1;
    for (const a of this.sQe.values())
      t === a.EntityHandle
        ? (a.OnChangeRole(!0), (this.aQe = a), (i = !0))
        : a.OnChangeRole(!1);
    i || (this.aQe = this.UQe(t, !0)),
      (this.EQe = !0),
      (this.yQe = t?.Id),
      (this.IQe = e?.Id),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiCurRoleDataChanged,
        this.yQe,
        this.IQe ?? 0,
      ),
      this.AQe();
  }
  OnFormationLoaded() {
    this.FormationPanelData.UpdateFormationPanelData(),
      this.PQe(),
      this.ClearFullScreenEffect(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiAllRoleDataChanged,
      );
  }
  OnAddEntity(t) {
    this.MergeHeadStateData.OnAddEntity(t);
  }
  OnRemoveEntity(t) {
    var e = this.sQe.get(t.Id);
    e &&
      (this.sQe.delete(t.Id),
      e.Clear(),
      this.aQe === e && (this.aQe = void 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiRemoveRoleData,
        t.Entity,
      )),
      this.MergeHeadStateData.OnRemoveEntity(t);
  }
  PQe() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    for (const e of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities())
      e === t ? (this.aQe = this.UQe(e, !0)) : this.UQe(e, !1);
  }
  UQe(t, e) {
    let i = this.sQe.get(t.Id);
    return (
      i
        ? i.IsCurEntity !== e && i.OnChangeRole(e)
        : ((i = new BattleUiRoleData_1.BattleUiRoleData()).Init(t, e),
          this.sQe.set(t.Id, i)),
      i
    );
  }
  RQe() {
    for (const t of this.sQe.values()) t.Clear();
    this.sQe.clear();
  }
  AQe() {
    this.SQe ||
      (this.SQe = TimerSystem_1.TimerSystem.Next(this.TQe, BattleUiModel.xQe));
  }
  DQe() {
    this.SQe ||
      (TimerSystem_1.TimerSystem.Has(this.SQe) &&
        TimerSystem_1.TimerSystem.Remove(this.SQe),
      (this.SQe = void 0),
      (this.EQe = !1),
      (this.yQe = void 0),
      (this.IQe = void 0));
  }
  LQe() {
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
    (this.pQe = t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSetJoystickMode,
        t,
      );
  }
  GetIsDynamicJoystick() {
    return this.pQe;
  }
  SetIsAutoSwitchSkillButtonMode(t) {
    (this.vQe = t), this.ExploreModeData?.SetAutoSwitch(t);
  }
  GetIsAutoSwitchSkillButtonMode() {
    return this.vQe;
  }
  SetExecutionInteractEnable(t) {
    (this.MQe = t),
      InputDistributeController_1.InputDistributeController.RefreshInputTag();
  }
  ExistBattleInteract() {
    return this.MQe;
  }
}
(exports.BattleUiModel = BattleUiModel).xQe = void 0;
//# sourceMappingURL=BattleUiModel.js.map
