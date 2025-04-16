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
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
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
  SeamlessTravelController_1 = require("../SeamlessTravel/SeamlessTravelController"),
  UiCameraManager_1 = require("../UiCamera/UiCameraManager"),
  RangeCheck_1 = require("../Util/RangeCheck"),
  PhotographDefine_1 = require("./PhotographDefine"),
  TsPhotographer_1 = require("./TsPhotographer");
exports.ENTITYCAMERA = 70140001;
class PhotoMission {
  constructor(t, e, o, i, r, a) {
    (this.Node = void 0),
      (this.ItsMissionType = void 0),
      (this.IsFinished = !1),
      (this.EntityId = void 0),
      (this.Description = ""),
      (this.IsOptional = !1),
      (this.IsOptionalFinished = void 0),
      (this.Node = t),
      (this.ItsMissionType = e),
      (this.IsFinished = o),
      (this.EntityId = i),
      (this.Description = r),
      (this.IsOptional = a),
      this.IsOptional && (this.IsOptionalFinished = !1);
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
  static HFa(t) {
    (this.b1n = t) ? this.URe(661863530) : this.ARe(661863530);
  }
  static jFa(t) {
    (this.WFa = t) ? this.URe(-119194461) : this.ARe(-119194461);
  }
  static Init() {
    var t = super.Init();
    return (
      (this.uWi = new RangeCheck_1.RangeCheck()),
      (this.CameraCaptureType = 0),
      (this.Missions = new Array()),
      (this.IsLastChecked = !1),
      (this.AMa = !1),
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
      this.ResetPhotograph(),
      (this.Missions = void 0),
      (this.IsLastChecked = !1),
      (this.AMa = !1),
      (this.cWi = !1),
      (this.XTn = !1),
      (this.mWi = void 0),
      this.uWi?.OnClear(),
      (this.uWi = void 0),
      (this.UMa = !1),
      this.PhotoMissionFinishMap.clear(),
      this.xMa.clear(),
      (this.Ea1 = void 0),
      super.Clear()
    );
  }
  static OnLeaveLevel() {
    return this.ResetPhotograph(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeRole,
      this.xie,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CharOnRoleDead,
        this.Jze,
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
        EventDefine_1.EEventName.OnSpecialItemNotAllow,
        this.pWi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SpawnPlayer,
        this.QFa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.nye,
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
        EventDefine_1.EEventName.CharOnRoleDead,
        this.Jze,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLogicTreeNodeStatusChange,
        this.$Ct,
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
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SpawnPlayer,
        this.QFa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.nye,
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
      (this.PMa() &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.EquipAndSwitchSpecialItem,
          exports.ENTITYCAMERA,
          !0,
        ),
      this.jFa(
        ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn &&
          ModelManager_1.ModelManager.SpecialItemModel.GetEquipSpecialItemId() ===
            exports.ENTITYCAMERA &&
          this.b1n,
      ));
    var o = ModelManager_1.ModelManager.PhotographModel,
      e = o.GetPhotographerStructure();
    if (e && this.EWi) {
      var i = o.RightValue,
        i = (0 !== i && e.MoveRight(i), o.UpValue);
      if (
        (0 !== i && e.MoveUp(i),
        UiManager_1.UiManager.IsViewShow("PhotographView") &&
          this.XTn &&
          1 === this.CameraCaptureType)
      ) {
        o = this.GetNowBehaviorNodes();
        if (o && !(o.length <= 0)) {
          let e = 0;
          o.forEach((t) => {
            t &&
              (this.wMa(t)
                ? (e++,
                  this.PhotoMissionFinishMap.get(t.TakePlace.RangeEntity) ||
                    (this.PhotoMissionFinishMap.set(
                      t.TakePlace.RangeEntity,
                      !0,
                    ),
                    EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.OnEntityCameraSearchGreat,
                    ),
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info(
                        "Photo",
                        45,
                        "拍照:实体相机拍摄所有检查条件都符合",
                        ["id", t.TakePlace?.RangeEntity],
                      )),
                  (this.IsLastChecked = !0))
                : t.TakePlace?.RangeEntity &&
                  this.PhotoMissionFinishMap.set(t.TakePlace?.RangeEntity, !1));
          }),
            0 === e &&
              (EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnEntityCameraMissTarget,
              ),
              (this.IsLastChecked = !1));
        }
      }
    }
  }
  static Om1() {
    this.NMa()
      ? ((this.AMa = !1), (this.cWi = !0), (this.UMa = !0))
      : ((this.UMa = !1), (this.cWi = !1), this.HFa(!1), this.jFa(!1));
  }
  static PhotographFastScreenShot(t = 0) {
    ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid &&
      ((this.CameraCaptureType = t),
      this.ScreenShot({
        ScreenShot: !0,
        PrepareFullScreenShot: !1,
        IsHiddenBattleView: !0,
        HandBookPhotoData: void 0,
        GachaData: void 0,
        FragmentMemory: void 0,
        RoleSkinData: void 0,
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
    return !!this.$ha(t) && (this.c7t(t), !0);
  }
  static async TryOpenTogetherPhotograph() {
    return !!this.$ha(2) && (await this.c7t(2), !0);
  }
  static $ha(t) {
    var e,
      o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return !(
      !o?.Valid ||
      (ModelManager_1.ModelManager.PlotModel.IsInPlot
        ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "NotAllowOpenPhotograph",
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Photo", 45, "无法拍照:在剧情中"),
          1)
        : !(e = o.Entity.GetComponent(203)) ||
          (e.HasTag(40422668)
            ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "NotAllowOpenPhotograph",
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Photo", 45, "无法拍照:在空中"),
              1)
            : e.HasTag(855966206)
              ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "NotAllowOpenPhotograph",
                ),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info("Photo", 45, "无法拍照:在水中"),
                1)
              : e.HasTag(504239013)
                ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                    "NotAllowOpenPhotograph",
                  ),
                  Log_1.Log.CheckInfo() &&
                    Log_1.Log.Info("Photo", 45, "无法拍照:在攀爬"),
                  1)
                : e.HasTag(1996802261)
                  ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                      "NotAllowOpenPhotograph",
                    ),
                    Log_1.Log.CheckInfo() &&
                      Log_1.Log.Info("Photo", 45, "无法拍照:在战斗中"),
                    1)
                  : e.HasTag(-1371021686)
                    ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                        "NotAllowOpenPhotograph",
                      ),
                      Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info("Photo", 45, "无法拍照:在技能中"),
                      1)
                    : e.HasTag(525255941)
                      ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                          "NotAllowOpenPhotograph",
                        ),
                        Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info("Photo", 45, "无法拍照:在驾驶载具"),
                        1)
                      : 1 !== t ||
                          UiManager_1.UiManager.IsViewOpen("BattleView")
                        ? UiManager_1.UiManager.IsViewOpen("PhotographView")
                          ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                              "NotAllowOpenPhotograph",
                            ),
                            Log_1.Log.CheckInfo() &&
                              Log_1.Log.Info(
                                "Photo",
                                45,
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
                                  45,
                                  "无法拍照:在声骸编队",
                                ),
                              1)
                            : !o.Entity.GetComponent(175)?.MainAnimInstance &&
                              (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                                "NotAllowOpenPhotograph",
                              ),
                              Log_1.Log.CheckInfo() &&
                                Log_1.Log.Info(
                                  "Photo",
                                  45,
                                  "无法拍照:实体状态机找不到",
                                ),
                              1)
                        : (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                            "NotAllowOpenPhotograph",
                          ),
                          Log_1.Log.CheckInfo() &&
                            Log_1.Log.Info(
                              "Photo",
                              45,
                              "无法拍照:不在BattleView中",
                            ),
                          1)))
    );
  }
  static BMa(t, e, o) {
    return (
      e.GetDungeonId() === ModelManager_1.ModelManager.GameModeModel.MapId &&
      (this.GMa(t)
        ? (this.xMa.has(t)
            ? this.xMa.get(t)?.BehaviorNode !== e &&
              (this.xMa.set(t, new PhotoThing(e, this.SWi(e), o)),
              this.PhotoMissionFinishMap.set(t, !1),
              Log_1.Log.CheckInfo()) &&
              Log_1.Log.Info(
                "Photo",
                45,
                "拍照:重进了拍照范围",
                ["OldBehaviorTree", this.xMa.get(t)?.BehaviorNode?.NodeId],
                ["NewBehaviorTree", e?.NodeId],
              )
            : (this.xMa.set(t, new PhotoThing(e, this.SWi(e), o)),
              this.PhotoMissionFinishMap.set(t, !1)),
          !0)
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Photo", 45, "拍照:UpdateNewRangeCheckById失败"),
          !1))
    );
  }
  static qMa(o, i) {
    let r = 0;
    this.xMa.forEach((t, e) => {
      t.Type !== i || o.includes(e) || (r = e);
    }),
      0 !== r &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Photo", 45, "拍照:RemovePhotoEntityThings", [
            "id",
            r,
          ]),
        this.xMa.delete(r),
        this.PhotoMissionFinishMap.delete(r),
        this.uWi?.Remove(r));
  }
  static InitPhotographRelativeContent() {
    var t, e, o;
    (this.EWi = this.yWi()),
      this.EWi &&
        ((this.IWi = this.GetFightCameraActor()), this.IWi) &&
        ((this.TWi = this.LWi()),
        this.DWi().SetIsDitherEffectEnable(!1),
        (t = Global_1.Global.BaseCharacter)?.SetDitherEffect(1, 1),
        (t = t?.Mesh.D_GetSocketLocation(PhotographDefine_1.SPAWN_SOCKET_NAME)),
        (o = ModelManager_1.ModelManager.PhotographModel),
        (e = this.IWi.D_GetTransform()),
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
            ? (this.jn1(),
              this.c$e(),
              (ModelManager_1.ModelManager.PhotographModel.IsOpenPhotograph =
                !0),
              (this.CameraCaptureType = t),
              await this.OMa(),
              UiManager_1.UiManager.OpenView("PhotographView", void 0, (t) => {
                t ? o(!0) : o(!1);
              }))
            : o(!1))
        : o(!1),
      e.Promise
    );
  }
  static jn1() {
    Global_1.Global.BaseCharacter &&
      ModelManager_1.ModelManager.CreatureModel.GetEntityById(
        Global_1.Global.BaseCharacter.EntityId,
      )
        ?.Entity?.GetComponent(61)
        ?.InterruptAutoMoving("打开拍照界面");
  }
  static async OMa() {
    (this.XTn = !1),
      await LevelLoadingController_1.LevelLoadingController.WaitOpenLoading(
        11,
        3,
        0.5,
      );
  }
  static async CloseBlackScreen() {
    await LevelLoadingController_1.LevelLoadingController.WaitCloseLoading(
      11,
      0.5,
    ),
      LevelLoadingController_1.LevelLoadingController.CloseLoading(0),
      (this.XTn = !0);
  }
  static PMa() {
    var t;
    return (
      !!ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Valid &&
      (!(t = this.uWi?.MapCheckReached()) || t.length <= 0
        ? (this.HFa(!1), (this.AMa = !1))
        : !(
            (this.AMa && this.Ia1(t, this.Ta1)) ||
            ((this.Ta1 = t),
            this.ba1(),
            this.HFa(!0),
            (this.AMa = !0),
            this.UpdatePhotoWindow(t),
            0)
          ))
    );
  }
  static UpdatePhotoWindow(t) {
    if (this.Missions) {
      for (; 0 < this.Missions.length; ) this.Missions.pop();
      t.forEach((t) => {
        t = this.xMa.get(t)?.PhotoMissions;
        !t ||
          t.length <= 0 ||
          t.forEach((t) => {
            this.Missions.push(t);
          });
      });
    }
  }
  static NMa() {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti)
      return (this.cWi = !1);
    let t = void 0,
      e = !1;
    var o =
        ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.GetCurrentActiveChildQuestNodes(),
      i =
        ModelManager_1.ModelManager.LevelPlayModel.GetTrackLevelPlayInfo()?.GetCurrentActiveChildQuestNodes(),
      r =
        ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()?.GetCurrentActiveChildQuestNodes(),
      a = new Array();
    if (o) {
      for (const n of o)
        n instanceof EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode &&
          (t = n) &&
          t.TakePlace &&
          this.BMa(t.TakePlace.RangeEntity, t, 0) &&
          ((e = !0), a.push(t.TakePlace.RangeEntity));
      this.qMa(a, 0);
    }
    if (i) {
      for (const s of i)
        s instanceof EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode &&
          (t = s) &&
          t.TakePlace &&
          this.BMa(t.TakePlace.RangeEntity, t, 1) &&
          ((e = !0), a.push(t.TakePlace.RangeEntity));
      this.qMa(a, 1);
    }
    if (r) {
      for (const h of r)
        h instanceof EntityPhotoBehaviorNode_1.EntityPhotoBehaviorNode &&
          (t = h) &&
          t.TakePlace &&
          this.BMa(t.TakePlace.RangeEntity, t, 2) &&
          ((e = !0), a.push(t.TakePlace.RangeEntity));
      this.qMa(a, 2);
    }
    return e;
  }
  static CheckIfInMission() {
    return 1 === this.CameraCaptureType && this.UMa;
  }
  static async ReturnPhotograph() {
    this.x5_(), await this.OMa(), this.U5_(), await this.CloseBlackScreen();
  }
  static ResetPhotograph() {
    this.x5_(), this.U5_();
  }
  static async ClosePhotograph(t = !1) {
    var e = ModelManager_1.ModelManager.PhotographModel;
    e.IsOpenPhotograph &&
      (t || this.x5_(),
      await this.OMa(),
      t
        ? ((ModelManager_1.ModelManager.PhotographModel.IsOpenPhotograph = !1),
          this.UpdateMissionOptionToFinished(!0))
        : this.U5_(),
      (e.MontageId = 0),
      UiManager_1.UiManager.IsViewOpen("PhotographSetupView") &&
        UiManager_1.UiManager.CloseView("PhotographSetupView"),
      UiManager_1.UiManager.IsViewOpen("PhotoSaveView") &&
        UiManager_1.UiManager.CloseView("PhotoSaveView"),
      ModelManager_1.ModelManager.PlotModel.IsInPlot
        ? (UiManager_1.UiManager.NormalResetToView("BattleView"),
          this.CloseBlackScreen())
        : UiManager_1.UiManager.GetViewByName("ReviveView")
          ? this.CloseBlackScreen()
          : UiManager_1.UiManager.NormalResetToView("BattleView", () => {
              this.CloseBlackScreen();
            }));
  }
  static x5_() {
    (this.CameraCaptureType = 0),
      (this.IWi = void 0),
      (this.EWi = void 0),
      (this.TWi = void 0);
  }
  static U5_() {
    ModelManager_1.ModelManager.PhotographModel.IsOpenPhotograph = !1;
    var t = ModelManager_1.ModelManager.PhotographModel;
    this.ResetPhotoMontage(),
      t.ClearPhotographFilter(),
      t.DestroyUiCamera(),
      t.ResetEntityEnable(),
      t.ClearPhotographOption(),
      this.m$e();
    this.DWi().SetIsDitherEffectEnable(!0);
    t = Global_1.Global.BaseCharacter;
    void 0 === t ||
      SeamlessTravelController_1.SeamlessTravelController.WasRoleEntityInSeamlessTraveling(
        t.CharacterActorComponent?.Entity,
      ) ||
      t?.SetDitherEffect(0, 1),
      this.SetNpcFocusPhotograph(!1),
      (this.IsLastChecked = !1);
  }
  static Ra1(t) {
    this.uWi?.Remove(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Photo", 45, "拍照:EndEntityPhotographMission", [
          "delete",
          t,
        ]),
      this.xMa.delete(t),
      this.PhotoMissionFinishMap.delete(t),
      (this.AMa = !1),
      (this.Ta1 = void 0),
      this.ba1();
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
      h = o.GetPhotographFilter(),
      _ = new LogReportDefine_1.PhotographerLogData();
    (_.event_id = "1009"),
      (_.i_area_id = r.AreaInfo.AreaId),
      (_.i_father_area_id = r.AreaInfo.Father),
      (_.f_pos_x = e.X),
      (_.f_pos_y = e.Y),
      (_.f_pos_z = e.Z),
      (_.i_motion = o.MontageId),
      (_.i_expression = 0),
      (_.i_role_id = i),
      (_.i_shot_option = o.GetPhotographOption(2)),
      (_.i_self_option = a ? 0 : 1),
      (_.i_info_option = n ? 0 : 1),
      (_.i_dof_option = s ? 1 : 0),
      (_.i_filter_id = h),
      LogReportController_1.LogReportController.LogReport(_),
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
      ((o = o.Entity.GetComponent(203).ListenForTagAddOrRemove(t, e)),
      this.AWi.push(o));
  }
  static URe(t) {
    var e;
    t &&
      ((e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
      FormationDataController_1.FormationDataController.IsPlayerExist(e)) &&
      !FormationDataController_1.FormationDataController.HasPlayerTag(e, t) &&
      FormationDataController_1.FormationDataController.AddPlayerTag(e, t);
  }
  static ARe(t) {
    var e;
    t &&
      ((e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
      FormationDataController_1.FormationDataController.IsPlayerExist(e)) &&
      FormationDataController_1.FormationDataController.HasPlayerTag(e, t) &&
      FormationDataController_1.FormationDataController.RemovePlayerTag(e, t);
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
          if (e.Valid) {
            const i = e.Entity;
            var t = i.GetComponent(29);
            t.IsSitDown
              ? (t.PreLeaveSitDownAction(),
                this.RWi(-2104691392, (t, e) => {
                  e ||
                    ((e = i.GetComponent(175).MainAnimInstance),
                    r && e.OnMontageEnded.Add(this.Kue),
                    e.Montage_Play(o));
                }))
              : ((t = i.GetComponent(175).MainAnimInstance),
                r && t.OnMontageEnded.Add(this.Kue),
                t.Montage_Play(o));
          }
        });
    }
  }
  static PWi(t) {
    ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure() &&
      t?.Valid &&
      (t.Entity.GetComponent(175).MainAnimInstance?.Montage_Stop(0),
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
      t.GetComponent(175).MainAnimInstance.设置头部转向状态(1);
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
        i.GetComponent(175).MainAnimInstance.设置头部转向状态(1);
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
          (e = e.GetComponent(185)) &&
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
  static GMa(t) {
    return (
      this.uWi || (this.uWi = new RangeCheck_1.RangeCheck()),
      void 0 !== this.uWi.GetOrAdd(t)
    );
  }
  static CheckInUi(t) {
    var e = this.BWi();
    return !(!e || !t || !this.FMa(t, e));
  }
  static CheckInUi2D(t) {
    var e = this.BWi();
    return !(!e || !t || !this.VMa(t, e));
  }
  static FMa(t, e) {
    var o = Global_1.Global.CharacterController,
      i = (0, puerts_1.$ref)(void 0);
    return (
      !!UE.GameplayStatics.D_ProjectWorldToScreen(o, t.ToUeVector(), i, !1) &&
      ((o = (0, puerts_1.$unref)(i)), this.VMa(o, e))
    );
  }
  static HMa(t, e) {
    return Math.pow(Math.pow(t.X - e.X, 2) + Math.pow(t.Y - e.Y, 2), 0.5);
  }
  static VMa(t, e) {
    return this.HMa(t, this.jMa()) <= e;
  }
  static wMa(e) {
    let o = 0;
    var t,
      i = e.TakeTime,
      r =
        (i && i.TimeRange
          ? void 0 !== (t = this.bWi(e)) &&
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
              t,
            )
            ? this.GWi(e, 0, void 0, !0)
            : (this.GWi(e, 0, void 0, !1), o--)
          : this.GWi(e, 0, void 0, !1),
        e.TakeTargetArray);
    if (r)
      for (const n of r) {
        var a = this.GetAllCheckPoints(n.EntityId);
        if (!a || 0 === a.length) {
          o--;
          break;
        }
        let t = !0;
        for (const s of a)
          if (
            !this.CheckInUi(s) ||
            !this.CheckLineTrace(s.ToUeVectorOld(), r)
          ) {
            this.GWi(e, 1, n.EntityId, !1),
              (t = !1),
              this.Ihl(n.EntityId) || o--;
            break;
          }
        t && this.GWi(e, 1, n.EntityId, !0);
      }
    else o--;
    return 0 === o;
  }
  static jMa() {
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
        ((t = new PhotoMission(
          e,
          0,
          !1,
          void 0,
          e.TakeTime.TidDescription,
          !1,
        )),
        o.push(t)),
      e.TakeTargetArray)
    )
      for (let t = 0; t < e.TakeTargetArray.length; t++) {
        var i = new PhotoMission(
          e,
          1,
          !1,
          e.TakeTargetArray[t].EntityId,
          e.TakeTargetArray[t].TidDescription,
          e.TakeTargetArray[t].IsOptionalTarget ?? !1,
        );
        o.push(i);
      }
    return o;
  }
  static GWi(e, o, i, r) {
    var a = this.Missions.length;
    for (let t = 0; t < a; t++)
      if (
        this.Missions[t].ItsMissionType === o &&
        e === this.Missions[t].Node
      ) {
        if (1 !== o)
          return (
            (this.Missions[t].IsFinished = r),
            void EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnEntityCameraOneSituationChanged,
              this.Missions[t].Description,
              r,
              this.Missions[t].IsOptional,
            )
          );
        if (
          this.Missions[t].EntityId === i &&
          !this.Missions[t].IsOptionalFinished &&
          e === this.Missions[t].Node
        )
          return (
            (this.Missions[t].IsFinished = r),
            void EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnEntityCameraOneSituationChanged,
              this.Missions[t].Description,
              r,
              this.Missions[t].IsOptional,
            )
          );
      }
  }
  static Ihl(e) {
    var o = this.Missions.length;
    for (let t = 0; t < o; t++)
      if (this.Missions[t].EntityId === e && this.Missions[t].IsOptional)
        return !0;
    return !1;
  }
  static UpdateMissionOptionToFinished(o = !1) {
    if (this.GetNowBehaviorNodes())
      if (this.Missions) {
        const i = [];
        var e = this.Missions.length;
        for (let t = 0; t < e; t++)
          this.Missions[t].IsOptional &&
            this.Missions[t].IsFinished &&
            !this.Missions[t].IsOptionalFinished &&
            i.push(this.Missions[t].EntityId);
        this.PhotographShotRequest(i, (t) => {
          if (t) {
            if (this.Missions) {
              var e = this.Missions.length;
              for (let t = 0; t < e; t++)
                i.includes(this.Missions[t].EntityId) &&
                  ((this.Missions[t].IsOptionalFinished = !0),
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName
                      .OnEntityCameraOptionalSituationChanged,
                    this.Missions[t].Description,
                  ));
            }
          } else
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Photo",
                45,
                "拍照:UpdateMissionOptionToFinished失败：",
              );
          this.SubmitQuest(o);
        });
      } else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Photo",
            45,
            "拍照:UpdateMissionOptionToFinished Mission为空",
          );
    else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Photo", 45, "拍照:没找到要提交的BehaviorNode");
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
  static CheckLineTrace(t, e) {
    if (!t) return !1;
    let o = !0;
    var i;
    if (
      (this.mWi
        ? ((this.mWi.WorldContextObject = GlobalData_1.GlobalData.World),
          (i = this.EWi.D_K2_GetActorLocation()),
          (this.mWi.StartX = i.X),
          (this.mWi.StartY = i.Y),
          (this.mWi.StartZ = i.Z),
          (this.mWi.EndX = t.X),
          (this.mWi.EndY = t.Y),
          (this.mWi.EndZ = t.Z),
          (o = TraceElementCommon_1.TraceElementCommon.LineTrace(
            this.mWi,
            "PhotographCheck",
          )))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Photo", 45, "拍照:射线检测失败："),
      o)
    )
      for (let t = 0; t < this.mWi.HitResult.Actors.Num(); t++) {
        var r = this.mWi.HitResult.Actors.Get(t);
        if (
          r &&
          !(
            r instanceof TsPhotographer_1.default ||
            r instanceof UE.AkReverbVolume
          )
        ) {
          if (r instanceof UE.BP_BaseVision_C) {
            var a = this.mWi.HitResult.Components.Get(t);
            if (a && a.ComponentTags?.Contains(this.NWi)) {
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Photo", 45, "拍照:", ["名称：", r.GetName()]);
              continue;
            }
          }
          if (
            UE.KuroStaticLibrary.IsImplementInterface(
              r.GetClass(),
              UE.BPI_CreatureInterface_C.StaticClass(),
            )
          ) {
            a = r.GetEntityId();
            if (this.WMa(a, e, !0)) continue;
          }
          var n =
            ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(
              r,
            );
          if (!n || !this.WMa(n.PbDataId, e, !1))
            return (
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Photo", 45, "拍照:视野中有物品遮挡：", [
                  "名称：",
                  r.GetName(),
                ]),
              !1
            );
        }
      }
    return !0;
  }
  static SubmitQuest(t = !1) {
    var e;
    this.IsLastChecked &&
      (e = this.PhotoMissionFinishMap) &&
      0 < e.size &&
      e.forEach((t, e) => {
        var o = this.xMa.get(e);
        o && t
          ? (o.BehaviorNode?.UseSubmitNode(), this.Ra1(e))
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Photo", 45, "拍照:提交请求但并没有完成：", [
              "其中第一个任务的名称：",
              o?.PhotoMissions ? o.PhotoMissions[0]?.Description : void 0,
            ]);
      }),
      t && this.ResetPhotograph();
  }
  static GetPosition2D(t) {
    var e = Global_1.Global.CharacterController,
      o = (0, puerts_1.$ref)(void 0);
    if (UE.GameplayStatics.D_ProjectWorldToScreen(e, t.ToUeVector(), o, !1))
      return (0, puerts_1.$unref)(o);
  }
  static WMa(t, e, o) {
    if (e)
      for (const a of e) {
        var i = this.xWi(a.EntityId);
        if (!i) return !1;
        for (const n of i)
          if (o) {
            var r =
              ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n);
            if (r) if (this.wWi(n) === t) return !0;
          } else if (n === t) return !0;
      }
    return !1;
  }
  static CheckHasSpecifiedFeatureForSave() {
    return FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check();
  }
  static GetEntityFinishSituation(t) {
    if (this.Missions)
      for (const e of this.Missions)
        if (e.EntityId === t) return !!e.IsOptionalFinished || e.IsFinished;
    return !1;
  }
  static GetEntityOptionalFinished(t) {
    if (this.Missions)
      for (const e of this.Missions)
        if (e.EntityId === t) return e.IsOptionalFinished ?? !1;
    return !1;
  }
  static GetPhotoMissionById(t) {
    if (this.Missions)
      for (const e of this.Missions) if (e.EntityId === t) return e;
  }
  static ba1() {
    const e = new Array();
    !this.Ta1 || this.Ta1.length <= 0
      ? (this.Ea1 = void 0)
      : (this.Ta1.forEach((t) => {
          t = this.xMa.get(t)?.BehaviorNode;
          t && e.push(t);
        }),
        0 < (this.Ea1 = e).length ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Photo", 45, "拍照:GetNowBehaviorNodes为空")));
  }
  static GetNowBehaviorNodes() {
    return this.Ea1;
  }
  static PhotographShotRequest(o, i) {
    var t = this.GetNowBehaviorNodes();
    !t ||
      t.length <= 0 ||
      t.forEach((t) => {
        var e;
        t &&
          (((e = Protocol_1.Aki.Protocol.ng_.create()).d9n =
            ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTreeOwnerId(
              t?.TreeIncId,
            )),
          (e.C9n = MathUtils_1.MathUtils.BigIntToLong(t?.TreeIncId)),
          (e.b5n = t?.NodeId),
          (e.PSs = o),
          Net_1.Net.Call(15283, e, (t) => {
            !t || t.BEs !== Protocol_1.Aki.Protocol.Q4n.KRs
              ? i && i(!1)
              : i && i(!0);
          }));
      });
  }
  static GetPointToFinishTask() {
    var e = this.GetNowBehaviorNodes();
    if (e && !(e.length <= 0)) {
      e = e[0]?.TakeTargetArray;
      if (e) {
        let t = new UE.Vector(0, 0, 0);
        for (const r of e) {
          var o = this.GetAllCheckPoints(r.EntityId);
          if (o && 0 !== o.length)
            for (const a of o) {
              var i = a.ToUeVectorOld();
              t = t.IsZero() ? i : t.op_Addition(i).op_Division(2);
            }
        }
        if (
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Photo", 45, "拍照:GetPointToFinishTask", [
              "finalPoint:",
              t,
            ]),
          !t.IsZero())
        )
          return t;
      }
    }
  }
  static SetCameraLUT(t) {
    var e =
      ModelManager_1.ModelManager.PhotographModel.GetPhotographerStructure();
    e && e.SetCameraLUT(t);
  }
  static InitPostProcessVolBlendWeight(
    o = PhotographDefine_1.DEFAULT_FILTER_CONFIGID,
  ) {
    const i =
      ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoFilterConfigById(
        o,
      )?.PPVName;
    ModelManager_1.ModelManager.PhotographModel.GetFilterPostProcessVolumeMap().forEach(
      (t, e) => {
        t.IsValid() &&
          (e === i
            ? ((e =
                ModelManager_1.ModelManager.PhotographModel.GetFilterStrengthByFilterId(
                  o,
                )),
              (t.BlendWeight = e))
            : (t.BlendWeight = 0));
      },
    );
  }
  static SetSingleFilterStrength(t, e) {
    ModelManager_1.ModelManager.PhotographModel.SetFilterStrength(t, e);
    var t =
      ConfigManager_1.ConfigManager.PhotographConfig.GetPhotoFilterConfigById(
        t,
      );
    t &&
      ((t = t.PPVName),
      (t =
        ModelManager_1.ModelManager.PhotographModel.GetFilterPostProcessVolumeMap().get(
          t,
        ))) &&
      (t.BlendWeight = e);
  }
  static Ia1(t, e) {
    if (!t || !e) return !1;
    if (t.length !== e.length) return !1;
    let o = !0;
    return (
      t.forEach((t) => {
        e.includes(t) || (o = !1);
      }),
      o
    );
  }
  static CheckIfInNormalCamera() {
    return 0 === this.CameraCaptureType;
  }
  static CheckIfInEntityCamera() {
    return 1 === this.CameraCaptureType;
  }
  static CheckIfInTogetherCamera() {
    return 2 === this.CameraCaptureType;
  }
}
(exports.PhotographController = PhotographController),
  ((_a = PhotographController).AWi = []),
  (PhotographController.EWi = void 0),
  (PhotographController.TWi = void 0),
  (PhotographController.IWi = void 0),
  (PhotographController.CameraCaptureType = 0),
  (PhotographController.uWi = void 0),
  (PhotographController.xMa = new Map()),
  (PhotographController.PhotoMissionFinishMap = new Map()),
  (PhotographController.Missions = void 0),
  (PhotographController.Ea1 = void 0),
  (PhotographController.IsLastChecked = !1),
  (PhotographController.AMa = !1),
  (PhotographController.cWi = !1),
  (PhotographController.XTn = !1),
  (PhotographController.mWi = void 0),
  (PhotographController.Ta1 = void 0),
  (PhotographController.MaxFov = void 0),
  (PhotographController.MinFov = void 0),
  (PhotographController.UMa = !1),
  (PhotographController.b1n = !1),
  (PhotographController.WFa = !1),
  (PhotographController.NWi = new UE.FName("EntityPhotoIgnore")),
  (PhotographController.PhotoTargets = void 0),
  (PhotographController.$Ct = () => {
    _a.Om1();
  }),
  (PhotographController.Gre = () => {
    _a.Om1();
  }),
  (PhotographController.CWi = () => {
    _a.Om1();
  }),
  (PhotographController.gWi = () => {
    _a.Om1();
  }),
  (PhotographController.pWi = () => {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
      "NotAllowOpenPhotograph",
    ),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Photo", 45, "无法拍照:不在使用范围内");
  }),
  (PhotographController.xie = (t, e) => {
    _a.ClosePhotograph();
  }),
  (PhotographController.Jze = (t) => {
    _a.ClosePhotograph();
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
      (1 === _a.CameraCaptureType ? o.AddCameraArmPitchInput(e) : o.MoveUp(e));
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
      (1 === _a.CameraCaptureType ? o.AddCameraArmYawInput(e) : o.MoveRight(e));
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
      o.AddCameraArmPitchInput(-e);
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
      o.AddCameraArmYawInput(e);
  }),
  (PhotographController.QFa = (t, e) => {
    _a.HFa(_a.b1n), _a.jFa(_a.WFa);
  }),
  (PhotographController.nye = () => {
    _a.Om1();
  }),
  (PhotographController.UWi = (t, e) => {
    e && _a.ClosePhotograph();
  }),
  (PhotographController.Kue = (t, e) => {
    e ||
      ((e = ModelManager_1.ModelManager.PhotographModel.PlayMontageEntity)
        ?.Valid &&
        e.Entity.GetComponent(175).MainAnimInstance.Montage_Play(t));
  });
//# sourceMappingURL=PhotographController.js.map
