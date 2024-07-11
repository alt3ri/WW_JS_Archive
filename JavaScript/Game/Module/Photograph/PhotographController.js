"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographController = exports.ENTITYCAMERA = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  GlobalConfigFromCsvByName_1 = require("../../../Core/Define/ConfigQuery/GlobalConfigFromCsvByName"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputDistributeController_1 = require("../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../Ui/UiManager"),
  FormationDataController_1 = require("../Abilities/FormationDataController"),
  FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate"),
  EntityPhotoBehaviorNode_1 = require("../GeneralLogicTree/BehaviorNode/ChildQuestNode/EntityPhotoBehaviorNode"),
  LevelLoadingController_1 = require("../LevelLoading/LevelLoadingController"),
  LogReportController_1 = require("../LogReport/LogReportController"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  UiCameraManager_1 = require("../UiCamera/UiCameraManager"),
  RangeCheck_1 = require("../Util/RangeCheck"),
  PhotographDefine_1 = require("./PhotographDefine"),
  TsPhotographer_1 = require("./TsPhotographer");
exports.ENTITYCAMERA = 70140001;
class PhotoMission {
  constructor(t, e, o, i) {
    (this.ItsMissionType = void 0),
      (this.IsFinished = !1),
      (this.EntityId = void 0),
      (this.Description = ""),
      (this.ItsMissionType = t),
      (this.IsFinished = e),
      (this.EntityId = o),
      (this.Description = i);
  }
}
class PhotoThing {
  constructor(t, e, o) {
    (this.BehaviorNode = void 0),
      (this.PhotoMissions = void 0),
      (this.Type = void 0),
      (this.BehaviorNode = t),
      (this.PhotoMissions = e),
      (this.Type = o);
  }
}
class PhotographController extends UiControllerBase_1.UiControllerBase {
  static Init() {
    var t = super.Init();
    return (
      (this.uWi = new RangeCheck_1.RangeCheck()),
      (this.CameraCaptureType = 0),
      (this.Missions = new Array()),
      (this.IsLastChecked = !1),
      (this.ffa = !1),
      (this.XTn = !1),
      (this.cWi = !1),
      this.mWi ||
        ((this.mWi = UE.NewObject(UE.TraceLineElement.StaticClass())),
        (this.mWi.bIsSingle = !1),
        (this.mWi.bIgnoreSelf = !0),
        (this.mWi.bIsProfile = !1),
        this.mWi.AddObjectTypeQuery(
          QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
        ),
        this.mWi.AddObjectTypeQuery(
          QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic,
        ),
        this.mWi.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
        this.mWi.AddObjectTypeQuery(
          QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
        ),
        this.mWi.AddObjectTypeQuery(
          QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
        ),
        this.mWi.AddObjectTypeQuery(
          QueryTypeDefine_1.KuroObjectTypeQuery.PhysicsBody,
        ),
        this.mWi.SetDrawDebugTrace(0),
        this.mWi.SetTraceColor(1, 0, 0, 1),
        this.mWi.SetTraceHitColor(0, 1, 0, 1)),
      (this.MinFov =
        GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
          "Photo.EntityCameraFovRangeMin",
        )),
      (this.MaxFov =
        GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
          "Photo.EntityCameraFovRangeMax",
        )),
      t
    );
  }
  static Clear() {
    return (
      this.dWi(),
      this.EndEntityPhotographMission(),
      (this.Missions = void 0),
      (this.IsLastChecked = !1),
      (this.ffa = !1),
      (this.cWi = !1),
      (this.XTn = !1),
      (this.mWi = void 0),
      this.uWi?.OnClear(),
      (this.uWi = void 0),
      (this.pfa = !1),
      this.vfa.clear(),
      super.Clear()
    );
  }
  static OnLeaveLevel() {
    return this.dWi(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeRole,
      this.xie,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.$Ct,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.Gre,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CurTrackQuestUnTrackedCheck,
        this.CWi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
        this.gWi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.fWi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSpecialItemNotAllow,
        this.pWi,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiMoveForward,
        this.vWi,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiMoveRight,
        this.MWi,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiLookUp,
        this.q8i,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiTurn,
        this.G8i,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeRole,
      this.xie,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.$Ct,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.fWi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CurTrackQuestUnTrackedCheck,
        this.CWi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.Gre,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
        this.gWi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSpecialItemNotAllow,
        this.pWi,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiMoveForward,
        this.vWi,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiMoveRight,
        this.MWi,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiLookUp,
        this.q8i,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiTurn,
        this.G8i,
      ),
      this.m$e();
  }
  static OnTick(t) {
    this.cWi &&
      (this.Mfa() &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.EquipAndSwitchSpecialItem,
          exports.ENTITYCAMERA,
          !0,
        ),
      ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn &&
      ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId() ===
        exports.ENTITYCAMERA &&
      this.dDr(661863530)
        ? this.URe(-119194461)
        : this.ARe(-119194461));
    var e,
      o = ModelManager_1.ModelManager.PhotographModel,
      i = o.GetPhotographerStructure();
    i &&
      this.EWi &&
      (0 !== (e = o.RightValue) && i.AddSourceYawInput(e),
      0 !== (e = o.UpValue) && i.AddSourcePitchInput(e),
      UiManager_1.UiManager.IsViewShow("PhotographView")) &&
      this.XTn &&
      1 === this.CameraCaptureType &&
      (this.Sfa()
        ? this.IsLastChecked ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Photo", 46, "拍照:实体相机拍摄所有检查条件都符合"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnEntityCameraSearchGreat,
          ),
          (this.IsLastChecked = !0))
        : (this.IsLastChecked = !1));
  }
  static PhotographFastScreenShot(t = 0) {
    ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid &&
      ((this.CameraCaptureType = t),
      this.ScreenShot({
        ScreenShot: !0,
        IsHiddenBattleView: !0,
        HandBookPhotoData: void 0,
        GachaData: void 0,
        FragmentMemory: void 0,
      }));
  }
  static CouldRequestPhotoPermission() {
    return (
      TimeUtil_1.TimeUtil.GetServerTime() >
      LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey
          .RequestPhotoPermissionMinTime,
        0,
      )
    );
  }
  static TryOpenPhotograph(t) {
    return !!this.csa(t) && (this.c7t(t), !0);
  }
  static async TryOpenTogetherPhotograph() {
    return !!this.csa(2) && (await this.c7t(2), !0);
  }
  static csa(t) {
    var e,
      o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return !(
      !o?.Valid ||
      (ModelManager_1.ModelManager.PlotModel.IsInPlot
        ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "NotAllowOpenPhotograph",
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Photo", 46, "无法拍照:在剧情中"),
          1)
        : !(e = o.Entity.GetComponent(188)) ||
          (e.HasTag(40422668)
            ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "NotAllowOpenPhotograph",
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Photo", 46, "无法拍照:在空中"),
              1)
            : e.HasTag(855966206)
              ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "NotAllowOpenPhotograph",
                ),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Photo", 46, "无法拍照:在水中"),
                1)
              : e.HasTag(504239013)
                ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                    "NotAllowOpenPhotograph",
                  ),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("Photo", 46, "无法拍照:在攀爬"),
                  1)
                : e.HasTag(1996802261)
                  ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                      "NotAllowOpenPhotograph",
                    ),
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info("Photo", 46, "无法拍照:在战斗中"),
                    1)
                  : e.HasTag(-1371021686)
                    ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                        "NotAllowOpenPhotograph",
                      ),
                      Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info("Photo", 46, "无法拍照:在技能中"),
                      1)
                    : 1 !== t || UiManager_1.UiManager.IsViewOpen("BattleView")
                      ? UiManager_1.UiManager.IsViewOpen("PhotographView")
                        ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                            "NotAllowOpenPhotograph",
                          ),
                          Log_1.Log.CheckInfo() &&
                            Log_1.Log.Info(
                              "Photo",
                              46,
                              "无法拍照:已经在拍照界面",
                            ),
                          1)
                        : ModelManager_1.ModelManager.SceneTeamModel
                              .IsPhantomTeam
                          ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                              "NotAllowOpenPhotograph",
                            ),
                            Log_1.Log.CheckInfo() &&
                              Log_1.Log.Info(
                                "Photo",
                                46,
                                "无法拍照:在声骸编队",
                              ),
                            1)
                          : !o.Entity.GetComponent(162)?.MainAnimInstance &&
                            (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                              "NotAllowOpenPhotograph",
                            ),
                            Log_1.Log.CheckInfo() &&
                              Log_1.Log.Info(
                                "Photo",
                                46,
                                "无法拍照:实体状态机找不到",
                              ),
                            1)
                      : (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                          "NotAllowOpenPhotograph",
                        ),
                        Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "Photo",
                            46,
                            "无法拍照:不在BattleView中",
                          ),
                        1)))
    );
  }
  static Efa(t, e, o) {
    this.vfa.has(t) ||
      (this.yfa(o) && this.Ifa(o),
      this.Tfa(t),
      this.vfa.set(t, new PhotoThing(e, this.SWi(e), o)));
  }
  static yfa(o) {
    let i = !1;
    return (
      this.vfa.forEach((t, e) => {
        t.Type === o && (i = !0);
      }),
      i
    );
  }
  static Ifa(o) {
    let i = 0;
    this.vfa.forEach((t, e) => {
      t.Type === o && (i = e);
    }),
      0 !== i && (this.vfa.delete(i), this.uWi?.Remove(i));
  }
  static InitPhotographRelativeContent() {
    var t, e, o;
    (this.EWi = this.yWi()),
      this.EWi &&
        ((this.IWi = this.GetFightCameraActor()), this.IWi) &&
        ((this.TWi = this.LWi()),
        this.DWi().SetIsDitherEffectEnable(!1),
        (t = Global_1.Global.BaseCharacter)?.SetDitherEffect(1, 1),
        (t = t?.Mesh.GetSocketLocation(PhotographDefine_1.SPAWN_SOCKET_NAME)),
        (o = ModelManager_1.ModelManager.PhotographModel),
        (e = this.IWi.GetTransform()),
        (o = o.SpawnPhotographerStructure(t, e.GetRotation(), e.GetScale3D())),
        (this.TWi.FocusSettings.ManualFocusDistance =
          PhotographDefine_1.DEFAULT_MANUAL_FOCUS_DISTANCE),
        o?.SetPlayerSourceLocation(t),
        o?.SetCameraInitializeTransform(e),
        2 === this.CameraCaptureType && o?.ResetCamera(),
        UiCameraManager_1.UiCameraManager.Get().Enter(0.5),
        this.InitializeDefaultPhotographOption());
  }
  static async c7t(t) {
    const e = new CustomPromise_1.CustomPromise(),
      o = (t) => {
        e.SetResult(t);
      };
    return (
      (this.EWi = this.yWi()),
      this.EWi
        ? ((this.IWi = this.GetFightCameraActor()),
          this.IWi
            ? (this.c$e(),
              (ModelManager_1.ModelManager.PhotographModel.IsOpenPhotograph =
                !0),
              (this.CameraCaptureType = t),
              await this.Lfa(),
              UiManager_1.UiManager.OpenView("PhotographView", void 0, (t) => {
                t ? o(!0) : ((this.CameraCaptureType = 0), o(!1));
              }))
            : o(!1))
        : o(!1),
      e.Promise
    );
  }
  static async Lfa() {
    (this.XTn = !1),
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
        12,
        3,
        0.5,
      );
  }
  static async CloseBlackScreen() {
    await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
      12,
      0.5,
    ),
      LevelLoadingController_1.LevelLoadingController.CloseLoading(0),
      (this.XTn = !0);
  }
  static Mfa() {
    var t;
    return (
      !!ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid &&
      ((t = this.uWi?.MapCheckReached())
        ? !this.ffa &&
          ((this.Dfa = t),
          this.URe(661863530),
          (this.ffa = !0),
          PhotographController.UpdatePhotoWindow(t),
          !0)
        : (this.ARe(661863530), (this.ffa = !1)))
    );
  }
  static UpdatePhotoWindow(t) {
    this.Missions = this.vfa.get(t)?.PhotoMissions;
  }
  static Rfa() {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti)
      return (
        (this.Missions = void 0),
        this.uWi?.OnClear(),
        (this.uWi = void 0),
        this.vfa.clear(),
        !1
      );
    let t = void 0,
      e = !1;
    return (
      ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.GetCurrentActiveChildQuestNode() instanceof
        EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode &&
      (t =
        ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.GetCurrentActiveChildQuestNode()) &&
      t.TakePlace
        ? (this.Efa(t.TakePlace.RangeEntity, t, 0), (e = !0))
        : this.Ifa(0),
      ModelManager_1.ModelManager.LevelPlayModel.GetTrackLevelPlayInfo()?.GetCurrentActiveChildQuestNode() instanceof
        EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode &&
      (t =
        ModelManager_1.ModelManager.LevelPlayModel.GetTrackLevelPlayInfo()?.GetCurrentActiveChildQuestNode()) &&
      t.TakePlace
        ? (this.Efa(t.TakePlace.RangeEntity, t, 1), (e = !0))
        : this.Ifa(1),
      ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()?.GetCurrentActiveChildQuestNode() instanceof
        EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode &&
      (t =
        ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()?.GetCurrentActiveChildQuestNode()) &&
      t.TakePlace
        ? (this.Efa(t.TakePlace.RangeEntity, t, 2), (e = !0))
        : this.Ifa(2),
      e
    );
  }
  static CheckIfInMission() {
    return 1 === this.CameraCaptureType && this.pfa;
  }
  static async ReturnPhotograph() {
    await this.Lfa(), this.dWi(), await this.CloseBlackScreen();
  }
  static async ClosePhotograph() {
    var t = ModelManager_1.ModelManager.PhotographModel;
    t.IsOpenPhotograph &&
      (await this.Lfa(),
      this.dWi(),
      (t.MontageId = 0),
      UiManager_1.UiManager.IsViewOpen("PhotographSetupView") &&
        UiManager_1.UiManager.CloseView("PhotographSetupView"),
      UiManager_1.UiManager.IsViewOpen("PhotoSaveView") &&
        UiManager_1.UiManager.CloseView("PhotoSaveView"),
      UiManager_1.UiManager.NormalResetToView("BattleView", () => {
        this.CloseBlackScreen();
      }));
  }
  static dWi() {
    var t = ModelManager_1.ModelManager.PhotographModel;
    this.ResetPhotoMontage(),
      t.DestroyUiCamera(),
      t.ResetEntityEnable(),
      t.ClearPhotographOption(),
      this.m$e(),
      (this.IsLastChecked = !1),
      (this.IWi = void 0),
      (this.EWi = void 0),
      (this.TWi = void 0),
      (t.IsOpenPhotograph = !1),
      this.DWi().SetIsDitherEffectEnable(!0),
      Global_1.Global.BaseCharacter?.SetDitherEffect(0, 1),
      2 === this.CameraCaptureType && this.SetNpcFocusPhotograph(!1),
      (this.CameraCaptureType = 0);
  }
  static EndEntityPhotographMission() {
    (this.Missions = void 0),
      this.uWi?.Remove(this.Dfa),
      this.vfa.delete(this.Dfa),
      (this.Dfa = 0);
  }
  static ScreenShot(t) {
    var e =
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorLocationProxy,
      o = ModelManager_1.ModelManager.PhotographModel,
      i = ModelManager_1.ModelManager.SceneTeamModel,
      r = ModelManager_1.ModelManager.AreaModel,
      i = i.GetCurrentEntity.Entity.GetComponent(0).GetRoleId(),
      a = o.GetPhotographOption(0),
      n = LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.PhotoAndShareShowPlayerName,
        !0,
      ),
      s = o.GetPhotographOption(3),
      h = new LogReportDefine_1.PhotographerLogData();
    (h.event_id = "1009"),
      (h.i_area_id = r.AreaInfo.AreaId),
      (h.i_father_area_id = r.AreaInfo.Father),
      (h.f_pos_x = e.X),
      (h.f_pos_y = e.Y),
      (h.f_pos_z = e.Z),
      (h.i_motion = o.MontageId),
      (h.i_expression = 0),
      (h.i_role_id = i),
      (h.i_shot_option = o.GetPhotographOption(2)),
      (h.i_self_option = a ? 0 : 1),
      (h.i_info_option = n ? 0 : 1),
      (h.i_dof_option = s ? 1 : 0),
      LogReportController_1.LogReportController.LogReport(h),
      UiManager_1.UiManager.OpenView("PhotoSaveView", t, () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnScreenShotDone,
        ),
          1 === this.CameraCaptureType &&
            (this.IsLastChecked
              ? EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnEntityCameraFinished,
                  !0,
                )
              : EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnEntityCameraFinished,
                  !1,
                ));
      });
  }
  static c$e() {
    this.RWi(1996802261, this.UWi),
      this.RWi(40422668, this.UWi),
      this.RWi(855966206, this.UWi);
  }
  static m$e() {
    for (const t of this.AWi) t.EndTask();
    this.AWi.length = 0;
  }
  static RWi(t, e) {
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    o?.Valid &&
      o.Entity?.Valid &&
      ((o = o.Entity.GetComponent(188).ListenForTagAddOrRemove(t, e)),
      this.AWi.push(o));
  }
  static dDr(t) {
    var e;
    return (
      !!t &&
      ((e = FormationDataController_1.FormationDataController.GetPlayerEntity(
        ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      )?.GetComponent(188))
        ? e.HasTag(t)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Photo", 46, "拍照:无法获得PlayerEntity"),
          !1))
    );
  }
  static URe(t) {
    var e;
    t &&
      ((e = FormationDataController_1.FormationDataController.GetPlayerEntity(
        ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      )?.GetComponent(188))
        ? this.dDr(t) || e.AddTag(t)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Photo", 46, "拍照:无法获得PlayerEntity"));
  }
  static ARe(t) {
    var e;
    t &&
      ((e = FormationDataController_1.FormationDataController.GetPlayerEntity(
        ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      )?.GetComponent(188))
        ? this.dDr(t) && e.RemoveTag(t)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Photo", 46, "拍照:无法获得PlayerEntity"));
  }
  static yWi() {
    var t = CameraController_1.CameraController.WidgetCamera;
    if (t) {
      t = t.GetComponent(12);
      if (t.Valid) return t.CineCamera;
    }
  }
  static LWi() {
    var t = this.EWi;
    if (t?.IsValid()) return t.GetCineCameraComponent();
  }
  static GetFightCameraActor() {
    var t = CameraController_1.CameraController.FightCamera;
    if (t) {
      t = t.GetComponent(4);
      if (t.Valid) return t.CameraActor;
    }
  }
  static DWi() {
    var t = CameraController_1.CameraController.FightCamera;
    if (t) return t.GetComponent(5);
  }
  static SetFov(t) {
    var e =
      ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
    e && e.SetFov(t);
  }
  static GetFov() {
    var t =
      ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
    return t ? t.GetFov() : 0;
  }
  static ResetCamera() {
    var t = ModelManager_1.ModelManager.PhotographModel,
      e = t.GetPhotographerStructure();
    e &&
      (this.PWi(t.PlayMontageEntity),
      e.ResetCamera(),
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid) &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnResetPhotographCamera,
      );
  }
  static PlayPhotoMontage(e, t) {
    var o =
      ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoMontageConfig(t);
    if (o) {
      var i = o.MontagePath;
      const r = o.IsLoop;
      o = ModelManager_1.ModelManager.PhotographModel;
      this.PWi(o.PlayMontageEntity),
        (o.PlayMontageEntity = e),
        (o.MontageId = t),
        ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.AnimMontage, (o) => {
          if (o?.IsValid() && e.Valid) {
            const i = e.Entity;
            var t = i.GetComponent(26);
            t.IsSitDown
              ? (t.PreLeaveSitDownAction(),
                this.RWi(-2104691392, (t, e) => {
                  e ||
                    ((e = i.GetComponent(162).MainAnimInstance),
                    r && e.OnMontageEnded.Add(this.Kue),
                    e.Montage_Play(o));
                }))
              : ((t = i.GetComponent(162).MainAnimInstance),
                r && t.OnMontageEnded.Add(this.Kue),
                t.Montage_Play(o));
          }
        });
    }
  }
  static PWi(t) {
    ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure() &&
      t?.Valid &&
      (t.Entity.GetComponent(162).StopMontage(),
      (ModelManager_1.ModelManager.PhotographModel.MontageId = 0));
  }
  static ResetPhotoMontage() {
    var t = ModelManager_1.ModelManager.PhotographModel,
      t =
        (this.PWi(t.PlayMontageEntity),
        (t.PlayMontageEntity = void 0),
        ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Id);
    t &&
      (t = EntitySystem_1.EntitySystem.Get(t))?.Valid &&
      t.GetComponent(162).MainAnimInstance.设置头部转向状态(1);
  }
  static InitializeDefaultPhotographOption() {
    for (const o of ConfigManager_1.ConfigManager.PhotographConfig.GetAllPhotoSetupConfig()) {
      let t = -1;
      var e = o.Type;
      0 === e ? (t = o.DefaultOptionIndex) : 1 === e && (t = o.ValueRange[2]),
        this.SetPhotographOption(o.ValueType, t);
    }
    2 === this.CameraCaptureType && this.SetNpcFocusPhotograph(!0);
  }
  static SetPhotographOption(t, e) {
    var o = ModelManager_1.ModelManager.PhotographModel;
    switch ((o.SetPhotographOption(t, e), t)) {
      case 3:
        1 === e
          ? ((i = o.GetPhotographOption(4)),
            (r = o.GetPhotographOption(5)),
            (this.TWi.FocusSettings.ManualFocusDistance = i),
            (this.TWi.CurrentAperture = r))
          : ((this.TWi.FocusSettings.ManualFocusDistance =
              PhotographDefine_1.DEFAULT_FOCAL_LENTGH),
            (this.TWi.CurrentAperture = PhotographDefine_1.DEFAULT_APERTURE));
        break;
      case 4:
        1 === o.GetPhotographOption(3) &&
          (this.TWi.FocusSettings.ManualFocusDistance = e);
        break;
      case 5:
        1 === o.GetPhotographOption(3) && (this.TWi.CurrentAperture = e);
        break;
      case 0:
        var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        1 === e ? o.SetEntityEnable(i, !0) : o.SetEntityEnable(i, !1);
        break;
      case 2:
        var r =
          ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Id;
        if (!r) return;
        i = EntitySystem_1.EntitySystem.Get(r);
        if (!i?.Valid) return;
        i.GetComponent(162).MainAnimInstance.设置头部转向状态(1);
    }
  }
  static IsPlayerLookAtCamera() {
    return (
      1 === ModelManager_1.ModelManager.PhotographModel.GetPhotographOption(2)
    );
  }
  static SetNpcFocusPhotograph(t) {
    if (this.PhotoTargets && !(this.PhotoTargets.length <= 0))
      for (const o of this.PhotoTargets) {
        var e = o;
        e &&
          ((e =
            ModelManager_1.ModelManager.CreatureModel.GetEntityIdByPbDataId(e)),
          (e = EntitySystem_1.EntitySystem.Get(e))?.Valid) &&
          (e = e.GetComponent(171)) &&
          (e.NeedLookAtCamera = t);
      }
  }
  static IsOpenPhotograph() {
    return ModelManager_1.ModelManager.PhotographModel.IsOpenPhotograph;
  }
  static GetAllCheckPoints(t) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    if (e) {
      t = (0, IComponent_1.getComponent)(
        e.ComponentsData,
        "PhotoTargetComponent",
      );
      if (t) {
        var o = new Array();
        for (const i of t.RequiredPoints)
          o.push(
            Vector_1.Vector.Create(
              (i.X ?? 0) + e.Transform.Pos.X ?? 0,
              (i.Y ?? 0) + e.Transform.Pos.Y ?? 0,
              (i.Z ?? 0) + e.Transform.Pos.Z ?? 0,
            ),
          );
        return o;
      }
    }
  }
  static GetCheckEntityPosition(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    if (t)
      return Vector_1.Vector.Create(
        t.Transform?.Pos.X ?? 0,
        t.Transform?.Pos.Y ?? 0,
        t.Transform?.Pos.Z ?? 0,
      );
  }
  static xWi(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    if (t) {
      var e = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "PhotoTargetComponent",
      );
      if (e && e.RayCastIgnoreEntities) {
        var o = new Array();
        for (let t = 0; t < e.RayCastIgnoreEntities.length; t++) {
          var i = e.RayCastIgnoreEntities[t];
          o.push(i);
        }
        return o;
      }
    }
  }
  static wWi(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetEntityIdByPbDataId(t);
    if (t) return t;
  }
  static GetPointType(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    if (t) {
      t = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "PhotoTargetComponent",
      );
      if (t && t.TargetCapturePromptUi) return t.TargetCapturePromptUi;
    }
  }
  static Tfa(t) {
    this.uWi || (this.uWi = new RangeCheck_1.RangeCheck()),
      this.uWi.GetOrAdd(t);
  }
  static CheckInUi(t) {
    var e = this.BWi();
    return !(!e || !t || !this.Afa(t, e));
  }
  static CheckInUi2D(t) {
    var e = this.BWi();
    return !(!e || !t || !this.Ufa(t, e));
  }
  static Afa(t, e) {
    var o = Global_1.Global.CharacterController,
      i = (0, puerts_1.$ref)(void 0);
    return (
      !!UE.GameplayStatics.ProjectWorldToScreen(o, t.ToUeVector(), i, !1) &&
      ((o = (0, puerts_1.$unref)(i)), this.Ufa(o, e))
    );
  }
  static xfa(t, e) {
    return Math.pow(Math.pow(t.X - e.X, 2) + Math.pow(t.Y - e.Y, 2), 0.5);
  }
  static Ufa(t, e) {
    return this.xfa(t, this.Pfa()) <= e;
  }
  static Sfa() {
    let e = 0;
    var t = this.GetNowBehaviorNode();
    if (!t) return !1;
    var o,
      i = t.TakeTime,
      i =
        (i && i.TimeRange
          ? void 0 !== (o = this.bWi(t)) &&
            this.qWi(
              Math.floor(
                ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Hour,
              ),
              Math.floor(
                ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Minute -
                  60 *
                    Math.floor(
                      ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Hour,
                    ),
              ),
              i.TimeRange.Start.Hour,
              i.TimeRange.Start.Min,
              i.TimeRange.End.Hour,
              i.TimeRange.End.Min,
              o,
            )
            ? this.GWi(0, void 0, !0)
            : (this.GWi(0, void 0, !1), e--)
          : this.GWi(0, void 0, !1),
        t.TakeTargetArray);
    if (i)
      for (const a of i) {
        var r = this.GetAllCheckPoints(a.EntityId);
        if (!r || 0 === r.length) {
          e--;
          break;
        }
        let t = !0;
        for (const n of r)
          if (!this.CheckInUi(n) || !this.CheckLineTrace(n.ToUeVector())) {
            this.GWi(1, a.EntityId, !1), e--, (t = !1);
            break;
          }
        t && this.GWi(1, a.EntityId, !0);
      }
    else e--;
    return 0 === e;
  }
  static Pfa() {
    var t = Global_1.Global.CharacterController,
      e = (0, puerts_1.$ref)(void 0),
      o = (0, puerts_1.$ref)(void 0),
      t = (t.GetViewportSize(e, o), (0, puerts_1.$unref)(e)),
      e = (0, puerts_1.$unref)(o);
    return new UE.Vector2D(t / 2, e / 2);
  }
  static BWi() {
    var t,
      e,
      o,
      i = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
        "Photo.TargetFinderFrameSize",
      );
    if (i)
      return (
        (t = Global_1.Global.CharacterController),
        (i = parseFloat(i.Value)),
        (e = (0, puerts_1.$ref)(void 0)),
        (o = (0, puerts_1.$ref)(void 0)),
        t.GetViewportSize(e, o),
        ((0, puerts_1.$unref)(o) * i) / 2
      );
  }
  static SWi(e) {
    var t,
      o = new Array();
    if (
      e &&
      (e.TakeTime &&
        ((t = new PhotoMission(0, !1, void 0, e.TakeTime.TidDescription)),
        o.push(t)),
      e.TakeTargetArray)
    )
      for (let t = 0; t < e.TakeTargetArray.length; t++) {
        var i = new PhotoMission(
          1,
          !1,
          e.TakeTargetArray[t].EntityId,
          e.TakeTargetArray[t].TidDescription,
        );
        o.push(i);
      }
    return o;
  }
  static GWi(e, o, i) {
    var r = this.Missions.length;
    for (let t = 0; t < r; t++)
      if (this.Missions[t].ItsMissionType === e) {
        if (1 !== e)
          return (
            (this.Missions[t].IsFinished = i),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnEntityCameraOneSituationChanged,
              this.Missions[t].Description,
              i,
            ),
            this.Missions[t]
          );
        if (this.Missions[t].EntityId === o)
          return (
            (this.Missions[t].IsFinished = i),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnEntityCameraOneSituationChanged,
              this.Missions[t].Description,
              i,
            ),
            this.Missions[t]
          );
      }
  }
  static bWi(t) {
    if (t?.TakeTime)
      switch (t.TakeTime.Compare) {
        case "Eq":
          return !0;
        case "Ne":
          return !1;
      }
  }
  static qWi(t, e, o, i, r, a, n) {
    if (r < o)
      return o <= t
        ? t !== o || i <= e
          ? n
          : !n
        : t <= r && (t !== r || e <= a)
          ? n
          : !n;
    if (o < r) {
      if (o <= t && t <= r)
        return t === o ? (i <= e ? n : !n) : t !== r || e <= a ? n : !n;
    } else if (t === o) return i <= e && e <= a ? n : !n;
    return !n;
  }
  static CheckLineTrace(t) {
    if (!t) return !1;
    let e = !0;
    var o;
    if (
      (this.mWi
        ? ((this.mWi.WorldContextObject = GlobalData_1.GlobalData.World),
          (o = this.EWi.K2_GetActorLocation()),
          (this.mWi.StartX = o.X),
          (this.mWi.StartY = o.Y),
          (this.mWi.StartZ = o.Z),
          (this.mWi.EndX = t.X),
          (this.mWi.EndY = t.Y),
          (this.mWi.EndZ = t.Z),
          (e = TraceElementCommon_1.TraceElementCommon.LineTrace(
            this.mWi,
            "PhotographCheck",
          )))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Photo", 46, "拍照:射线检测失败："),
      e)
    )
      for (let t = 0; t < this.mWi.HitResult.Actors.Num(); t++) {
        var i = this.mWi.HitResult.Actors.Get(t);
        if (
          i &&
          !(
            i instanceof TsPhotographer_1.default ||
            i instanceof UE.AkReverbVolume
          )
        ) {
          if (i instanceof UE.BP_BaseVision_C) {
            var r = this.mWi.HitResult.Components.Get(t);
            if (r && r.ComponentTags?.Contains(this.NWi)) {
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Photo", 46, "拍照:", ["名称：", i.GetName()]);
              continue;
            }
          }
          if (
            UE.KuroStaticLibrary.IsImplementInterface(
              i.GetClass(),
              UE.BPI_CreatureInterface_C.StaticClass(),
            )
          ) {
            r = i.GetEntityId();
            if (this.wfa(r)) continue;
          }
          return (
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Photo", 46, "拍照:视野中有物品遮挡：", [
                "名称：",
                i.GetName(),
              ]),
            !1
          );
        }
      }
    return !0;
  }
  static SubmitQuest() {
    (this.cWi = !1),
      this.ARe(661863530),
      this.ARe(-119194461),
      (this.ffa = !1),
      this.GetNowBehaviorNode()
        ? (this.GetNowBehaviorNode().UseSubmitNode(),
          this.EndEntityPhotographMission())
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Photo", 46, "拍照:没找到要提交的BehaviorNode", [
            "ID:",
            this.Dfa,
          ]);
  }
  static GetPosition2D(t) {
    var e = Global_1.Global.CharacterController,
      o = (0, puerts_1.$ref)(void 0);
    if (UE.GameplayStatics.ProjectWorldToScreen(e, t.ToUeVector(), o, !1))
      return (0, puerts_1.$unref)(o);
  }
  static wfa(t) {
    var e = this.GetNowBehaviorNode()?.TakeTargetArray;
    if (e)
      for (const r of e) {
        var o = this.xWi(r.EntityId);
        if (!o) return !1;
        for (const a of o) {
          var i =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a);
          if (i)
            if (this.wWi(a) === t)
              return (
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Photo",
                    46,
                    "拍照:实体拍照检测到需要忽略的实体",
                    ["ID:", t],
                  ),
                !0
              );
        }
      }
    return !1;
  }
  static CheckHasSpecifiedFeatureForSave() {
    return FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check();
  }
  static GetEntityFinishSituation(t) {
    if (this.Missions)
      for (const e of this.Missions) if (e.EntityId === t) return e.IsFinished;
    return !1;
  }
  static GetNowBehaviorNode() {
    if (0 !== this.Dfa && this.vfa.has(this.Dfa))
      return this.vfa.get(this.Dfa)?.BehaviorNode;
  }
  static GetPointToFinishTask() {
    var e = this.GetNowBehaviorNode()?.TakeTargetArray;
    if (e) {
      let t = new UE.Vector(0, 0, 0);
      for (const r of e) {
        var o = this.GetAllCheckPoints(r.EntityId);
        if (o && 0 !== o.length)
          for (const a of o) {
            var i = a.ToUeVector();
            t = t.IsZero() ? i : t.op_Addition(i).op_Division(2);
          }
      }
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Photo", 46, "拍照:GetPointToFinishTask", [
            "finalPoint:",
            t,
          ]),
        !t.IsZero())
      )
        return t;
    }
  }
}
(exports.PhotographController = PhotographController),
  ((_a = PhotographController).AWi = []),
  (PhotographController.EWi = void 0),
  (PhotographController.TWi = void 0),
  (PhotographController.IWi = void 0),
  (PhotographController.CameraCaptureType = 0),
  (PhotographController.uWi = void 0),
  (PhotographController.vfa = new Map()),
  (PhotographController.Missions = void 0),
  (PhotographController.IsLastChecked = !1),
  (PhotographController.ffa = !1),
  (PhotographController.cWi = !1),
  (PhotographController.XTn = !1),
  (PhotographController.mWi = void 0),
  (PhotographController.Dfa = 0),
  (PhotographController.MaxFov = void 0),
  (PhotographController.MinFov = void 0),
  (PhotographController.pfa = !1),
  (PhotographController.NWi = new UE.FName("EntityPhotoIgnore")),
  (PhotographController.PhotoTargets = void 0),
  (PhotographController.$Ct = () => {
    _a.Rfa()
      ? ((_a.ffa = !1), (_a.cWi = !0), (_a.pfa = !0))
      : ((_a.pfa = !1), (_a.cWi = !1), _a.ARe(661863530), _a.ARe(-119194461));
  }),
  (PhotographController.Gre = () => {
    _a.Rfa()
      ? ((_a.ffa = !1), (_a.cWi = !0), (_a.pfa = !0))
      : ((_a.pfa = !1), (_a.cWi = !1), _a.ARe(661863530), _a.ARe(-119194461));
  }),
  (PhotographController.CWi = () => {
    _a.Rfa()
      ? ((_a.ffa = !1), (_a.cWi = !0), (_a.pfa = !0))
      : ((_a.pfa = !1), (_a.cWi = !1), _a.ARe(661863530), _a.ARe(-119194461));
  }),
  (PhotographController.gWi = () => {
    _a.Rfa()
      ? ((_a.ffa = !1), (_a.cWi = !0), (_a.pfa = !0))
      : ((_a.pfa = !1), (_a.cWi = !1), _a.ARe(661863530), _a.ARe(-119194461));
  }),
  (PhotographController.pWi = () => {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
      "NotAllowOpenPhotograph",
    ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Photo", 46, "无法拍照:不在使用范围内");
  }),
  (PhotographController.fWi = (t) => {
    _a.EWi && _a.ReturnPhotograph();
  }),
  (PhotographController.xie = (t, e) => {
    _a.PWi(e);
  }),
  (PhotographController.vWi = (t, e) => {
    var o;
    0 === e ||
      !(o =
        ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()) ||
      (0 === _a.CameraCaptureType &&
        UiManager_1.UiManager.IsViewShow("PhotographSetupView")) ||
      UiManager_1.UiManager.IsViewShow("PhotoSaveView") ||
      (1 === _a.CameraCaptureType &&
        UiManager_1.UiManager.IsViewShow("PhotoSaveView")) ||
      (1 === _a.CameraCaptureType
        ? o.AddSourcePitchInput(-e)
        : o.AddSourcePitchInput(e));
  }),
  (PhotographController.MWi = (t, e) => {
    var o;
    0 === e ||
      !(o =
        ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()) ||
      (0 === _a.CameraCaptureType &&
        UiManager_1.UiManager.IsViewShow("PhotographSetupView")) ||
      UiManager_1.UiManager.IsViewShow("PhotoSaveView") ||
      (1 === _a.CameraCaptureType &&
        UiManager_1.UiManager.IsViewShow("PhotoSaveView")) ||
      (1 === _a.CameraCaptureType
        ? o.AddCameraArmYawInput(e)
        : o.AddSourceYawInput(e));
  }),
  (PhotographController.q8i = (t, e) => {
    var o;
    0 === e ||
      !(o =
        ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()) ||
      !Info_1.Info.IsInGamepad() ||
      (0 === _a.CameraCaptureType &&
        UiManager_1.UiManager.IsViewShow("PhotographSetupView")) ||
      UiManager_1.UiManager.IsViewShow("PhotoSaveView") ||
      (1 === _a.CameraCaptureType &&
        UiManager_1.UiManager.IsViewShow("PhotoSaveView")) ||
      o.AddCameraArmPitchInput(e);
  }),
  (PhotographController.G8i = (t, e) => {
    var o;
    0 === e ||
      !(o =
        ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()) ||
      !Info_1.Info.IsInGamepad() ||
      (0 === _a.CameraCaptureType &&
        UiManager_1.UiManager.IsViewShow("PhotographSetupView")) ||
      UiManager_1.UiManager.IsViewShow("PhotoSaveView") ||
      (1 === _a.CameraCaptureType &&
        UiManager_1.UiManager.IsViewShow("PhotoSaveView")) ||
      (o.AddPhotographerYawInput(e), o.AddCameraArmYawInput(e));
  }),
  (PhotographController.UWi = (t, e) => {
    e && _a.ClosePhotograph();
  }),
  (PhotographController.Kue = (t, e) => {
    e ||
      ((e = ModelManager_1.ModelManager.PhotographModel.PlayMontageEntity)
        ?.Valid &&
        e.Entity.GetComponent(162).MainAnimInstance.Montage_Play(t));
  });
//# sourceMappingURL=PhotographController.js.map
