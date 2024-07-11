"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhotographController = exports.ENTITYCAMERA = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
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
  constructor(t, e, o, r) {
    (this.ItsMissionType = void 0),
      (this.IsFinished = !1),
      (this.EntityId = void 0),
      (this.Description = ""),
      (this.ItsMissionType = t),
      (this.IsFinished = e),
      (this.EntityId = o),
      (this.Description = r);
  }
}
class PhotographController extends UiControllerBase_1.UiControllerBase {
  static Init() {
    var t = super.Init();
    return (
      (this.mji = this.GetNewRangeCheck()),
      (this.CameraCaptureType = 0),
      (this.Missions = new Array()),
      (this.IsLastChecked = !1),
      (this.AlreadyChanged = !1),
      (this.AIn = !1),
      (this.dji = !1),
      this.Cji ||
        ((this.Cji = UE.NewObject(UE.TraceLineElement.StaticClass())),
        (this.Cji.bIsSingle = !1),
        (this.Cji.bIgnoreSelf = !0),
        (this.Cji.bIsProfile = !1),
        this.Cji.AddObjectTypeQuery(
          QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic,
        ),
        this.Cji.AddObjectTypeQuery(
          QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic,
        ),
        this.Cji.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn),
        this.Cji.AddObjectTypeQuery(
          QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster,
        ),
        this.Cji.AddObjectTypeQuery(
          QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer,
        ),
        this.Cji.AddObjectTypeQuery(
          QueryTypeDefine_1.KuroObjectTypeQuery.PhysicsBody,
        ),
        this.Cji.SetDrawDebugTrace(0),
        this.Cji.SetTraceColor(1, 0, 0, 1),
        this.Cji.SetTraceHitColor(0, 1, 0, 1)),
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
      this.gji(),
      this.EndEntityPhotographMission(),
      (this.Missions = void 0),
      (this.IsLastChecked = !1),
      (this.AlreadyChanged = !1),
      (this.dji = !1),
      (this.AIn = !1),
      (this.Cji = void 0),
      super.Clear()
    );
  }
  static OnLeaveLevel() {
    return this.gji(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeRole,
      this.xie,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.Gdt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.Gre,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CurTrackQuestUnTrackedCheck,
        this.fji,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
        this.pji,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.vji,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSpecialItemNotAllow,
        this.Mji,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiMoveForward,
        this.Sji,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiMoveRight,
        this.Eji,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiLookUp,
        this.G6i,
      ),
      InputDistributeController_1.InputDistributeController.BindAxis(
        InputMappingsDefine_1.axisMappings.UiTurn,
        this.N6i,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeRole,
      this.xie,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.Gdt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.vji,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CurTrackQuestUnTrackedCheck,
        this.fji,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeTrackUpdate,
        this.Gre,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
        this.pji,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSpecialItemNotAllow,
        this.Mji,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiMoveForward,
        this.Sji,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiMoveRight,
        this.Eji,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiLookUp,
        this.G6i,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAxis(
        InputMappingsDefine_1.axisMappings.UiTurn,
        this.N6i,
      ),
      this.tXe();
  }
  static OnTick(t) {
    this.dji &&
      (this.CheckInRange() &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.EquipAndSwitchSpecialItem,
          exports.ENTITYCAMERA,
          !0,
        ),
      ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn &&
      ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId() ===
        exports.ENTITYCAMERA &&
      this.fLr(661863530)
        ? this.URe(-119194461)
        : this.ARe(-119194461));
    var e,
      o = ModelManager_1.ModelManager.PhotographModel,
      r = o.GetPhotographerStructure();
    r &&
      this.yji &&
      (0 !== (e = o.RightValue) && r.AddSourceYawInput(e),
      0 !== (e = o.UpValue) && r.AddSourcePitchInput(e),
      UiManager_1.UiManager.IsViewShow("PhotographView")) &&
      this.AIn &&
      1 === this.CameraCaptureType &&
      (this.TickSearchForEntityPoints()
        ? this.IsLastChecked ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Photo", 46, "实体相机拍摄所有检查条件都符合"),
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
        : !(e = o.Entity.GetComponent(185)) ||
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
                          : o.Entity.GetComponent(160)?.MainAnimInstance
                            ? (this.c9t(t), 0)
                            : (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
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
  static InitPhotoEntityThings() {
    this.mji?.OnClear(),
      (this.mji = void 0),
      this.Iji(),
      this.BehaviorNode?.TakePlace &&
        this.GetNewRangeCheck()?.GetOrAdd(
          this.BehaviorNode.TakePlace.RangeEntity,
        );
  }
  static InitPhotographRelativeContent() {
    var t, e, o;
    (this.yji = this.Tji()),
      this.yji &&
        ((this.Lji = this.GetFightCameraActor()), this.Lji) &&
        ((this.Dji = this.Rji()),
        this.Uji().SetIsDitherEffectEnable(!1),
        (t = Global_1.Global.BaseCharacter)?.SetDitherEffect(1, 1),
        (t = t?.Mesh.GetSocketLocation(PhotographDefine_1.SPAWN_SOCKET_NAME)),
        (o = ModelManager_1.ModelManager.PhotographModel),
        (e = this.Lji.GetTransform()),
        (o = o.SpawnPhotographerStructure(t, e.GetRotation(), e.GetScale3D())),
        (this.Dji.FocusSettings.ManualFocusDistance =
          PhotographDefine_1.DEFAULT_MANUAL_FOCUS_DISTANCE),
        o?.SetPlayerSourceLocation(t),
        o?.SetCameraInitializeTransform(e),
        UiCameraManager_1.UiCameraManager.Get().Enter(0.5),
        this.InitializeDefaultPhotographOption());
  }
  static async c9t(t) {
    (this.CameraCaptureType = t),
      (this.yji = this.Tji()),
      this.yji &&
        ((this.Lji = this.GetFightCameraActor()), this.Lji) &&
        (this.eXe(),
        (ModelManager_1.ModelManager.PhotographModel.IsOpenPhotograph = !0),
        await this.OpenBlackScreen(),
        UiManager_1.UiManager.OpenView("PhotographView"));
  }
  static async OpenBlackScreen() {
    (this.AIn = !1),
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
      (this.AIn = !0);
  }
  static CheckInRange() {
    if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid)
      if (
        this.GetNewRangeCheck()?.CheckReached(
          this.BehaviorNode?.TakePlace?.RangeEntity ?? 0,
        )
      ) {
        if (!this.AlreadyChanged)
          return this.URe(661863530), (this.AlreadyChanged = !0);
      } else this.ARe(661863530), (this.AlreadyChanged = !1);
    return !1;
  }
  static UpdateMission() {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      this.BehaviorNode = void 0;
      for (let t = this.Missions.length; 0 < t; t--) this.Missions.pop();
    } else {
      let t = !1,
        e = void 0;
      if (
        (ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.GetCurrentActiveChildQuestNode() instanceof
          EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode &&
          ((t = !0),
          (this.IsMission = 0),
          (e =
            ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.GetCurrentActiveChildQuestNode())),
        ModelManager_1.ModelManager.LevelPlayModel.GetTrackLevelPlayInfo()?.GetCurrentActiveChildQuestNode() instanceof
          EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode &&
          ((t = !0),
          (this.IsMission = 1),
          (e =
            ModelManager_1.ModelManager.LevelPlayModel.GetTrackLevelPlayInfo()?.GetCurrentActiveChildQuestNode())),
        ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()?.GetCurrentActiveChildQuestNode() instanceof
          EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode &&
          ((t = !0),
          (this.IsMission = 2),
          (e =
            ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()?.GetCurrentActiveChildQuestNode())),
        !this.BehaviorNode && t)
      )
        return (this.BehaviorNode = e), this.InitPhotoEntityThings(), !0;
      if (t) return !0;
      this.BehaviorNode = void 0;
      for (let t = this.Missions.length; 0 < t; t--) this.Missions.pop();
    }
    return !1;
  }
  static CheckIfInMission() {
    switch (this.IsMission) {
      case 0:
        return (
          !(
            !ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.GetCurrentActiveChildQuestNode() ||
            !this.BehaviorNode
          ) &&
          ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.GetCurrentActiveChildQuestNode() instanceof
            EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode
        );
      case 1:
        return (
          !(
            !ModelManager_1.ModelManager.LevelPlayModel.GetTrackLevelPlayInfo()?.GetCurrentActiveChildQuestNode() ||
            !this.BehaviorNode
          ) &&
          ModelManager_1.ModelManager.LevelPlayModel.GetTrackLevelPlayInfo()?.GetCurrentActiveChildQuestNode() instanceof
            EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode
        );
      case 2:
        return (
          !(
            !ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()?.GetCurrentActiveChildQuestNode() ||
            !this.BehaviorNode
          ) &&
          ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()?.GetCurrentActiveChildQuestNode() instanceof
            EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode
        );
    }
    return !1;
  }
  static async ReturnPhotograph() {
    await this.OpenBlackScreen(), this.gji(), await this.CloseBlackScreen();
  }
  static async ClosePhotograph() {
    await this.OpenBlackScreen(),
      this.gji(),
      (ModelManager_1.ModelManager.PhotographModel.MontageId = 0),
      UiManager_1.UiManager.NormalResetToView("BattleView", () => {
        this.CloseBlackScreen();
      });
  }
  static gji() {
    var t = ModelManager_1.ModelManager.PhotographModel;
    this.ResetPhotoMontage(),
      t.DestroyUiCamera(),
      t.ResetEntityEnable(),
      t.ClearPhotographOption(),
      this.tXe(),
      (this.IsLastChecked = !1),
      (this.Lji = void 0),
      (this.yji = void 0),
      (this.Dji = void 0),
      (t.IsOpenPhotograph = !1),
      this.Uji().SetIsDitherEffectEnable(!0),
      Global_1.Global.BaseCharacter?.SetDitherEffect(0, 1),
      (this.CameraCaptureType = 0);
  }
  static EndEntityPhotographMission() {
    if (this.Missions)
      for (let t = this.Missions.length; 0 < t; t--) this.Missions.pop();
    this.mji?.OnClear(), (this.mji = void 0);
  }
  static ScreenShot(t) {
    var e =
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorLocationProxy,
      o = ModelManager_1.ModelManager.PhotographModel,
      r = ModelManager_1.ModelManager.SceneTeamModel,
      i = ModelManager_1.ModelManager.AreaModel,
      r = r.GetCurrentEntity.Entity.GetComponent(0).GetRoleId(),
      a = o.GetPhotographOption(0),
      n = LocalStorage_1.LocalStorage.GetGlobal(
        LocalStorageDefine_1.ELocalStorageGlobalKey.PhotoAndShareShowPlayerName,
        !0,
      ),
      s = o.GetPhotographOption(3),
      h = new LogReportDefine_1.PhotographerLogData();
    (h.event_id = "1009"),
      (h.i_area_id = i.AreaInfo.AreaId),
      (h.i_father_area_id = i.AreaInfo.Father),
      (h.f_pos_x = e.X),
      (h.f_pos_y = e.Y),
      (h.f_pos_z = e.Z),
      (h.i_motion = o.MontageId),
      (h.i_expression = 0),
      (h.i_role_id = r),
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
  static eXe() {
    this.Aji(1996802261, this.Pji),
      this.Aji(40422668, this.Pji),
      this.Aji(855966206, this.Pji);
  }
  static tXe() {
    for (const t of this.xji) t.EndTask();
    this.xji.length = 0;
  }
  static Aji(t, e) {
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    o?.Valid &&
      o.Entity?.Valid &&
      ((o = o.Entity.GetComponent(185).ListenForTagAddOrRemove(t, e)),
      this.xji.push(o));
  }
  static fLr(t) {
    var e;
    return (
      !!t &&
      ((e = FormationDataController_1.FormationDataController.GetPlayerEntity(
        ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      )?.GetComponent(185))
        ? e.HasTag(t)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("Photo", 46, "无法获得PlayerEntity"),
          !1))
    );
  }
  static URe(t) {
    var e;
    t &&
      ((e = FormationDataController_1.FormationDataController.GetPlayerEntity(
        ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      )?.GetComponent(185))
        ? this.fLr(t) || e.AddTag(t)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Photo", 46, "无法获得PlayerEntity"));
  }
  static ARe(t) {
    var e;
    t &&
      ((e = FormationDataController_1.FormationDataController.GetPlayerEntity(
        ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
      )?.GetComponent(185))
        ? this.fLr(t) && e.RemoveTag(t)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Photo", 46, "无法获得PlayerEntity"));
  }
  static Tji() {
    var t = CameraController_1.CameraController.WidgetCamera;
    if (t) {
      t = t.GetComponent(12);
      if (t.Valid) return t.CineCamera;
    }
  }
  static Rji() {
    var t = this.yji;
    if (t?.IsValid()) return t.GetCineCameraComponent();
  }
  static GetFightCameraActor() {
    var t = CameraController_1.CameraController.FightCamera;
    if (t) {
      t = t.GetComponent(4);
      if (t.Valid) return t.CameraActor;
    }
  }
  static Uji() {
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
      (this.wji(t.PlayMontageEntity),
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
      var r = o.MontagePath;
      const i = o.IsLoop;
      o = ModelManager_1.ModelManager.PhotographModel;
      this.wji(o.PlayMontageEntity),
        (o.PlayMontageEntity = e),
        (o.MontageId = t),
        ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.AnimMontage, (o) => {
          if (o?.IsValid() && e.Valid) {
            const r = e.Entity;
            var t = r.GetComponent(26);
            t.IsSitDown
              ? (t.PreLeaveSitDownAction(),
                this.Aji(-2104691392, (t, e) => {
                  e ||
                    ((e = r.GetComponent(160).MainAnimInstance),
                    i && e.OnMontageEnded.Add(this.Kue),
                    e.Montage_Play(o));
                }))
              : ((t = r.GetComponent(160).MainAnimInstance),
                i && t.OnMontageEnded.Add(this.Kue),
                t.Montage_Play(o));
          }
        });
    }
  }
  static wji(t) {
    ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure() &&
      t?.Valid &&
      (t.Entity.GetComponent(160).StopMontage(),
      (ModelManager_1.ModelManager.PhotographModel.MontageId = 0));
  }
  static ResetPhotoMontage() {
    var t = ModelManager_1.ModelManager.PhotographModel,
      t =
        (this.wji(t.PlayMontageEntity),
        (t.PlayMontageEntity = void 0),
        ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Id);
    t &&
      (t = EntitySystem_1.EntitySystem.Get(t))?.Valid &&
      t.GetComponent(160).MainAnimInstance.设置头部转向状态(1);
  }
  static InitializeDefaultPhotographOption() {
    for (const o of ConfigManager_1.ConfigManager.PhotographConfig.GetAllPhotoSetupConfig()) {
      let t = -1;
      var e = o.Type;
      0 === e ? (t = o.DefaultOptionIndex) : 1 === e && (t = o.ValueRange[2]),
        this.SetPhotographOption(o.ValueType, t);
    }
  }
  static SetPhotographOption(t, e) {
    var o = ModelManager_1.ModelManager.PhotographModel;
    switch ((o.SetPhotographOption(t, e), t)) {
      case 3:
        1 === e
          ? ((r = o.GetPhotographOption(4)),
            (i = o.GetPhotographOption(5)),
            (this.Dji.FocusSettings.ManualFocusDistance = r),
            (this.Dji.CurrentAperture = i))
          : ((this.Dji.FocusSettings.ManualFocusDistance =
              PhotographDefine_1.DEFAULT_FOCAL_LENTGH),
            (this.Dji.CurrentAperture = PhotographDefine_1.DEFAULT_APERTURE));
        break;
      case 4:
        1 === o.GetPhotographOption(3) &&
          (this.Dji.FocusSettings.ManualFocusDistance = e);
        break;
      case 5:
        1 === o.GetPhotographOption(3) && (this.Dji.CurrentAperture = e);
        break;
      case 0:
        var r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
        1 === e ? o.SetEntityEnable(r, !0) : o.SetEntityEnable(r, !1);
        break;
      case 2:
        var i =
          ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Id;
        if (!i) return;
        r = EntitySystem_1.EntitySystem.Get(i);
        if (!r?.Valid) return;
        r.GetComponent(160).MainAnimInstance.设置头部转向状态(1);
    }
  }
  static IsPlayerLookAtCamera() {
    return (
      1 === ModelManager_1.ModelManager.PhotographModel.GetPhotographOption(2)
    );
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
        for (const r of t.RequiredPoints)
          o.push(
            Vector_1.Vector.Create(
              (r.X ?? 0) + e.Transform.Pos.X ?? 0,
              (r.Y ?? 0) + e.Transform.Pos.Y ?? 0,
              (r.Z ?? 0) + e.Transform.Pos.Z ?? 0,
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
  static Bji(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    if (t) {
      var e = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "PhotoTargetComponent",
      );
      if (e && e.RayCastIgnoreEntities) {
        var o = new Array();
        for (let t = 0; t < e.RayCastIgnoreEntities.length; t++) {
          var r = e.RayCastIgnoreEntities[t];
          o.push(r);
        }
        return o;
      }
    }
  }
  static bji(t) {
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
  static GetNewRangeCheck() {
    return this.mji || (this.mji = new RangeCheck_1.RangeCheck()), this.mji;
  }
  static CheckInUi(t) {
    var e = this.qji();
    return !(!e || !t || !this.CheckPositionInScreen(t, e));
  }
  static CheckInUi2D(t) {
    var e = this.qji();
    return !(!e || !t || !this.GetScreenPositionIsInRange(t, e));
  }
  static CheckPositionInScreen(t, e) {
    var o = Global_1.Global.CharacterController,
      r = (0, puerts_1.$ref)(void 0);
    return (
      !!UE.GameplayStatics.ProjectWorldToScreen(o, t.ToUeVector(), r, !1) &&
      ((o = (0, puerts_1.$unref)(r)), this.GetScreenPositionIsInRange(o, e))
    );
  }
  static GetDistance(t, e) {
    return Math.pow(Math.pow(t.X - e.X, 2) + Math.pow(t.Y - e.Y, 2), 0.5);
  }
  static GetScreenPositionIsInRange(t, e) {
    return this.GetDistance(t, this.GetPhotoViewportCenter()) <= e;
  }
  static TickSearchForEntityPoints() {
    let e = 0;
    var t,
      o = this.BehaviorNode?.TakeTime,
      o =
        (o && o.TimeRange
          ? void 0 !== (t = this.Gji()) &&
            this.Nji(
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
              o.TimeRange.Start.Hour,
              o.TimeRange.Start.Min,
              o.TimeRange.End.Hour,
              o.TimeRange.End.Min,
              t,
            )
            ? this.Oji(0, void 0, !0)
            : (this.Oji(0, void 0, !1), e--)
          : this.Oji(0, void 0, !1),
        this.BehaviorNode?.TakeTargetArray);
    if (o)
      for (const i of o) {
        var r = this.GetAllCheckPoints(i.EntityId);
        if (!r || 0 === r.length) {
          e--;
          break;
        }
        let t = !0;
        for (const a of r)
          if (!this.CheckInUi(a) || !this.CheckLineTrace(a.ToUeVector())) {
            this.Oji(1, i.EntityId, !1), e--, (t = !1);
            break;
          }
        t && this.Oji(1, i.EntityId, !0);
      }
    else e--;
    return 0 === e;
  }
  static GetPhotoViewportCenter() {
    var t = Global_1.Global.CharacterController,
      e = (0, puerts_1.$ref)(void 0),
      o = (0, puerts_1.$ref)(void 0),
      t = (t.GetViewportSize(e, o), (0, puerts_1.$unref)(e)),
      e = (0, puerts_1.$unref)(o);
    return new UE.Vector2D(t / 2, e / 2);
  }
  static qji() {
    var t,
      e,
      o,
      r = GlobalConfigFromCsvByName_1.configGlobalConfigFromCsvByName.GetConfig(
        "Photo.TargetFinderFrameSize",
      );
    if (r)
      return (
        (t = Global_1.Global.CharacterController),
        (r = parseFloat(r.Value)),
        (e = (0, puerts_1.$ref)(void 0)),
        (o = (0, puerts_1.$ref)(void 0)),
        t.GetViewportSize(e, o),
        ((0, puerts_1.$unref)(o) * r) / 2
      );
  }
  static Iji() {
    for (let t = this.Missions.length; 0 < t; t--) this.Missions.pop();
    var t,
      e = this.BehaviorNode;
    if (
      e &&
      (e.TakeTime &&
        ((t = new PhotoMission(0, !1, void 0, e.TakeTime.TidDescription)),
        this.Missions.push(t)),
      e.TakeTargetArray)
    )
      for (let t = 0; t < e.TakeTargetArray.length; t++) {
        var o = new PhotoMission(
          1,
          !1,
          e.TakeTargetArray[t].EntityId,
          e.TakeTargetArray[t].TidDescription,
        );
        this.Missions.push(o);
      }
  }
  static Oji(e, o, r) {
    var i = this.Missions.length;
    for (let t = 0; t < i; t++)
      if (this.Missions[t].ItsMissionType === e) {
        if (1 !== e)
          return (
            (this.Missions[t].IsFinished = r),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnEntityCameraOneSituationChanged,
              this.Missions[t].Description,
              r,
            ),
            this.Missions[t]
          );
        if (this.Missions[t].EntityId === o)
          return (
            (this.Missions[t].IsFinished = r),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnEntityCameraOneSituationChanged,
              this.Missions[t].Description,
              r,
            ),
            this.Missions[t]
          );
      }
  }
  static Gji() {
    if (this.BehaviorNode?.TakeTime)
      switch (this.BehaviorNode?.TakeTime.Compare) {
        case "Eq":
          return !0;
        case "Ne":
          return !1;
      }
  }
  static Nji(t, e, o, r, i, a, n) {
    if (i < o)
      return o <= t
        ? t !== o || r <= e
          ? n
          : !n
        : t <= i && (t !== i || e <= a)
          ? n
          : !n;
    if (o < i) {
      if (o <= t && t <= i)
        return t === o ? (r <= e ? n : !n) : t !== i || e <= a ? n : !n;
    } else if (t === o) return r <= e && e <= a ? n : !n;
    return !n;
  }
  static CheckLineTrace(t) {
    if (!t) return !1;
    let e = !0;
    var o;
    if (
      (this.Cji
        ? ((this.Cji.WorldContextObject = GlobalData_1.GlobalData.World),
          (o = this.yji.K2_GetActorLocation()),
          (this.Cji.StartX = o.X),
          (this.Cji.StartY = o.Y),
          (this.Cji.StartZ = o.Z),
          (this.Cji.EndX = t.X),
          (this.Cji.EndY = t.Y),
          (this.Cji.EndZ = t.Z),
          (e = TraceElementCommon_1.TraceElementCommon.LineTrace(
            this.Cji,
            "PhotographCheck",
          )))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Photo", 46, "射线检测失败："),
      e)
    )
      for (let t = 0; t < this.Cji.HitResult.Actors.Num(); t++) {
        var r = this.Cji.HitResult.Actors.Get(t);
        if (
          r &&
          !(
            r instanceof TsPhotographer_1.default ||
            r instanceof UE.AkReverbVolume
          )
        ) {
          if (r instanceof UE.BP_BaseVision_C) {
            var i = this.Cji.HitResult.Components.Get(t);
            if (i && i.ComponentTags?.Contains(this.kji)) {
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Photo", 46, "：", ["名称：", r.GetName()]);
              continue;
            }
          }
          if (
            UE.KuroStaticLibrary.IsImplementInterface(
              r.GetClass(),
              UE.BPI_CreatureInterface_C.StaticClass(),
            )
          ) {
            i = r.GetEntityId();
            if (this.CheckInRayCastIgnoreArray(i)) continue;
          }
          return (
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Photo", 46, "视野中有物品遮挡：", [
                "名称：",
                r.GetName(),
              ]),
            !1
          );
        }
      }
    return !0;
  }
  static SubmitQuest() {
    (this.dji = !1),
      this.ARe(661863530),
      this.ARe(-119194461),
      (this.AlreadyChanged = !1),
      this.BehaviorNode.UseSubmitNode(),
      this.EndEntityPhotographMission();
  }
  static GetPosition2D(t) {
    var e = Global_1.Global.CharacterController,
      o = (0, puerts_1.$ref)(void 0);
    if (UE.GameplayStatics.ProjectWorldToScreen(e, t.ToUeVector(), o, !1))
      return (0, puerts_1.$unref)(o);
  }
  static CheckInRayCastIgnoreArray(t) {
    var e = this.BehaviorNode?.TakeTargetArray;
    if (e)
      for (const i of e) {
        var o = this.Bji(i.EntityId);
        if (!o) return !1;
        for (const a of o) {
          var r =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a);
          if (r) if (this.bji(a) === t) return !0;
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
  static GetPointToFinishTask() {
    var e = this.BehaviorNode?.TakeTargetArray;
    if (e) {
      let t = new UE.Vector(0, 0, 0);
      for (const i of e) {
        var o = this.GetAllCheckPoints(i.EntityId);
        if (o && 0 !== o.length)
          for (const a of o) {
            var r = a.ToUeVector();
            t = t.IsZero() ? r : t.op_Addition(r).op_Division(2);
          }
      }
      if (
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Photo", 46, "GetPointToFinishTask", [
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
  ((_a = PhotographController).xji = []),
  (PhotographController.yji = void 0),
  (PhotographController.Dji = void 0),
  (PhotographController.Lji = void 0),
  (PhotographController.CameraCaptureType = 0),
  (PhotographController.mji = void 0),
  (PhotographController.BehaviorNode = void 0),
  (PhotographController.Missions = void 0),
  (PhotographController.IsLastChecked = !1),
  (PhotographController.AlreadyChanged = !1),
  (PhotographController.dji = !1),
  (PhotographController.AIn = !1),
  (PhotographController.Cji = void 0),
  (PhotographController.MaxFov = void 0),
  (PhotographController.MinFov = void 0),
  (PhotographController.IsMission = 0),
  (PhotographController.kji = new UE.FName("EntityPhotoIgnore")),
  (PhotographController.Gdt = () => {
    _a.UpdateMission()
      ? ((_a.AlreadyChanged = !1), (_a.dji = !0))
      : ((_a.dji = !1), _a.ARe(661863530), _a.ARe(-119194461));
  }),
  (PhotographController.Gre = () => {
    _a.UpdateMission()
      ? ((_a.AlreadyChanged = !1), (_a.dji = !0))
      : ((_a.dji = !1), _a.ARe(661863530), _a.ARe(-119194461));
  }),
  (PhotographController.fji = () => {
    _a.UpdateMission()
      ? ((_a.AlreadyChanged = !1), (_a.dji = !0))
      : ((_a.dji = !1), _a.ARe(661863530), _a.ARe(-119194461));
  }),
  (PhotographController.pji = () => {
    _a.UpdateMission()
      ? ((_a.AlreadyChanged = !1), (_a.dji = !0))
      : ((_a.dji = !1), _a.ARe(661863530), _a.ARe(-119194461));
  }),
  (PhotographController.Mji = () => {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
      "NotAllowOpenPhotograph",
    ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Photo", 46, "无法拍照:不在使用范围内");
  }),
  (PhotographController.vji = (t) => {
    _a.yji && _a.ReturnPhotograph();
  }),
  (PhotographController.xie = (t, e) => {
    _a.wji(e);
  }),
  (PhotographController.Sji = (t, e) => {
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
  (PhotographController.Eji = (t, e) => {
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
  (PhotographController.G6i = (t, e) => {
    var o;
    0 === e ||
      !(o =
        ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()) ||
      !ModelManager_1.ModelManager.PlatformModel.IsGamepad() ||
      (0 === _a.CameraCaptureType &&
        UiManager_1.UiManager.IsViewShow("PhotographSetupView")) ||
      UiManager_1.UiManager.IsViewShow("PhotoSaveView") ||
      (1 === _a.CameraCaptureType &&
        UiManager_1.UiManager.IsViewShow("PhotoSaveView")) ||
      o.AddCameraArmPitchInput(e);
  }),
  (PhotographController.N6i = (t, e) => {
    var o;
    0 === e ||
      !(o =
        ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure()) ||
      !ModelManager_1.ModelManager.PlatformModel.IsGamepad() ||
      (0 === _a.CameraCaptureType &&
        UiManager_1.UiManager.IsViewShow("PhotographSetupView")) ||
      UiManager_1.UiManager.IsViewShow("PhotoSaveView") ||
      (1 === _a.CameraCaptureType &&
        UiManager_1.UiManager.IsViewShow("PhotoSaveView")) ||
      (o.AddPhotographerYawInput(e), o.AddCameraArmYawInput(e));
  }),
  (PhotographController.Pji = (t, e) => {
    e && _a.ClosePhotograph();
  }),
  (PhotographController.Kue = (t, e) => {
    e ||
      ((e = ModelManager_1.ModelManager.PhotographModel.PlayMontageEntity)
        ?.Valid &&
        e.Entity.GetComponent(160).MainAnimInstance.Montage_Play(t));
  });
//# sourceMappingURL=PhotographController.js.map
