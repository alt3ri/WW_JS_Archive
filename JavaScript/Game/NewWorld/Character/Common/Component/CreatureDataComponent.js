"use strict";
var CreatureDataComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, i, e, o) {
      var r,
        s = arguments.length,
        n =
          s < 3
            ? i
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(i, e))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, i, e, o);
      else
        for (var h = t.length - 1; 0 <= h; h--)
          (r = t[h]) &&
            (n = (s < 3 ? r(n) : 3 < s ? r(i, e, n) : r(i, e)) || n);
      return 3 < s && n && Object.defineProperty(i, e, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CreatureDataComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  MonsterBattleConfById_1 = require("../../../../../Core/Define/ConfigQuery/MonsterBattleConfById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  AdviceData_1 = require("../../../../Module/Advice/AdviceData"),
  CreatureGroupController_1 = require("../../../../World/Controller/CreatureGroupController"),
  BlackboardMap_1 = require("../../../../World/Define/BlackboardMap"),
  CreateEntityData_1 = require("../../CreateEntityData"),
  PROFILE_IK_GROUND_TRACE = "CreatureDataComponent_IkGround",
  PROFILE_WATER_TRACE = "CreatureDataComponent_Water",
  IK_GROUND_TRACE_HEIGHT = 400,
  IK_GROUND_TRACE_RADIUS = 300,
  WATER_TRACE_HEIGHT = 200;
let CreatureDataComponent =
  (CreatureDataComponent_1 = class CreatureDataComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Wpo = 0),
        (this.j8 = 0),
        (this.Ehh = 0),
        (this.dFe = 0),
        (this.fie = Protocol_1.Aki.Protocol.kks.Proto_Monster),
        (this.QQr = 0),
        (this.XQr = Protocol_1.Aki.Protocol.rLs.Proto_OldEntity),
        (this.E0 = 0),
        (this.$Qr = void 0),
        (this.zZa = !1),
        (this.JZa = void 0),
        (this.irl = void 0),
        (this.rrl = void 0),
        (this.nGl = 0),
        (this.BIl = 0),
        (this.vFc = 0),
        (this.yFc = 0),
        (this.YQr = 0),
        (this.JQr = 0),
        (this.zQr = 0),
        (this.ZQr = 0),
        (this.eXr = void 0),
        (this.Yre = void 0),
        (this.tXr = new Array()),
        (this.mQt = new Set()),
        (this.yne = !1),
        (this.ActorVisible = !1),
        (this.iXr = !1),
        (this.LivingStatus = void 0),
        (this.oXr = 0),
        (this.EntityCommonTags = new Set()),
        (this.RelationId = 0),
        (this.PbRelationMatchCfgIndex = -1),
        (this.ControllerId = 0),
        (this.PbDynAttachEntityConfigId = 0),
        (this.PbDynAttachEntityActorKey = ""),
        (this.PbDynAttachRefActorKey = ""),
        (this.PbDynAttachRelPos = Vector_1.Vector.Create()),
        (this.PbDynAttachRelRot = Rotator_1.Rotator.Create()),
        (this.IsShowingHandFx = !1),
        (this.AutonomousId = 0),
        (this.nxl = 0),
        (this.OccupiedGridInfo = new Map()),
        (this.DynamicGridInfo = []),
        (this.BoardCanMove = !0),
        (this.rXr = 0),
        (this.nXr = void 0),
        (this.sXr = ""),
        (this.aXr = 0),
        (this.qne = void 0),
        (this.hXr = void 0),
        (this.lXr = 0),
        (this.PIl = void 0),
        (this._Xr = void 0),
        (this.ou = !1),
        (this.uXr = void 0),
        (this.PbInRangeEntityCreatureDataIds = void 0),
        (this.PbInRangePlayerIds = void 0),
        (this.PbSceneItemAttributeIds = void 0),
        (this.PbPullingFoundationEntityId = void 0),
        (this.PbSceneAiEnabled = !1),
        (this.PbPatrolInfoPb = void 0),
        (this.PbAnimalInitialPartIds = void 0),
        (this.PbCombinePartInfoList = void 0),
        (this.PbCombineTargetServerId = void 0),
        (this.PbHookLockPointDisabled = !1),
        (this.PbHackingEntities = []),
        (this.PbHackedByEntities = void 0),
        (this.PbGravityFlipDirection = void 0),
        (this.PbMoveSplineId = 0),
        (this.PbMoveSplineConfig = void 0),
        (this.PbMoveSplineSceneItemRuntimeData = void 0),
        (this.wDe = 0),
        (this.vH = 0),
        (this.mXr = !1),
        (this.dXr = void 0),
        (this.d7a = void 0),
        (this.CXr = !1),
        (this.gXr = ""),
        (this.ger = void 0),
        (this.fXr = 0),
        (this.pXr = void 0),
        (this.vXr = !1),
        (this.MXr = void 0),
        (this.EXr = void 0),
        (this.SXr = void 0),
        (this.t4r = void 0),
        (this.ComponentDataMap = new Map()),
        (this.yXr = !1),
        (this.Dne = !1),
        (this.IXr = void 0),
        (this.IsConcealed = !1),
        (this.SummonType =
          Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeDefault),
        (this.SummonCfgId = 0),
        (this.TXr = void 0),
        (this.$c1 = !1),
        (this.LXr = 0),
        (this.DXr = 0),
        (this.RXr = new Array()),
        (this.UXr = new Array()),
        (this.xRn = new Map()),
        (this.ComponentsKey = 0n),
        (this.yd1 = void 0),
        (this.Sd1 = void 0),
        (this.Md1 = void 0),
        (this.Wc1 = () => {
          var t =
              ModelManager_1.ModelManager.TraceElementModel.GetTraceTypeElement(
                UE.TraceSphereElement.StaticClass(),
                QueryTypeDefine_1.KuroTraceTypeQuery.IkGround,
                GlobalData_1.GlobalData.World,
              ),
            i = ((t.Radius = IK_GROUND_TRACE_RADIUS), this.GetPbLocation());
          if (
            (ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation.DeepCopy(
              i,
            ),
            ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation.DeepCopy(
              i,
            ),
            MathUtils_1.MathUtils.CommonTempVector.DeepCopy(this.PIl),
            MathUtils_1.MathUtils.CommonTempVector.Normalize(),
            MathUtils_1.MathUtils.CommonTempVector.MultiplyEqual(
              IK_GROUND_TRACE_HEIGHT,
            ),
            ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation.AdditionEqual(
              MathUtils_1.MathUtils.CommonTempVector,
            ),
            TraceElementCommon_1.TraceElementCommon.SetStartLocation(
              t,
              ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation,
            ),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
              t,
              ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation,
            ),
            TraceElementCommon_1.TraceElementCommon.SphereTrace(
              t,
              PROFILE_IK_GROUND_TRACE,
            ))
          ) {
            i = t.HitResult;
            if (i?.bBlockingHit)
              return (
                TraceElementCommon_1.TraceElementCommon.GetImpactPoint(
                  i,
                  0,
                  MathUtils_1.MathUtils.CommonTempVector,
                ),
                MathUtils_1.MathUtils.CommonTempVector.ToUeVector()
              );
          }
        }),
        (this.Qc1 = () => {
          var t =
              ModelManager_1.ModelManager.TraceElementModel.GetTraceTypeElement(
                UE.TraceLineElement.StaticClass(),
                QueryTypeDefine_1.KuroTraceTypeQuery.Water,
                GlobalData_1.GlobalData.World,
              ),
            i = this.GetPbLocation();
          if (
            (ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation.DeepCopy(
              i,
            ),
            ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation.DeepCopy(
              i,
            ),
            MathUtils_1.MathUtils.CommonTempVector.DeepCopy(this.PIl),
            MathUtils_1.MathUtils.CommonTempVector.Normalize(),
            MathUtils_1.MathUtils.CommonTempVector.MultiplyEqual(
              WATER_TRACE_HEIGHT,
            ),
            ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation.SubtractionEqual(
              MathUtils_1.MathUtils.CommonTempVector,
            ),
            ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation.AdditionEqual(
              MathUtils_1.MathUtils.CommonTempVector,
            ),
            TraceElementCommon_1.TraceElementCommon.SetStartLocation(
              t,
              ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation,
            ),
            TraceElementCommon_1.TraceElementCommon.SetEndLocation(
              t,
              ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation,
            ),
            TraceElementCommon_1.TraceElementCommon.LineTrace(
              t,
              PROFILE_WATER_TRACE,
            ))
          ) {
            i = t.HitResult;
            if (i?.bBlockingHit)
              return (
                TraceElementCommon_1.TraceElementCommon.GetHitLocation(
                  i,
                  0,
                  MathUtils_1.MathUtils.CommonTempVector,
                ),
                MathUtils_1.MathUtils.CommonTempVector.ToUeVector()
              );
          }
        }),
        (this.AXr = -1n);
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RemoveCreatureDataComponentCache,
          this.E0,
        ),
        !0
      );
    }
    OnInitData(t) {
      var i,
        e = t,
        o = e.ComponentsKey;
      return e instanceof CreateEntityData_1.CreateEntityData
        ? ((e = e.EntityData),
          (this.E0 = this.Entity.Id),
          (this.ComponentsKey = o),
          (o = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
            this.Entity,
          )),
          (i = t.CreatureDataId),
          this.SetCreatureDataId(i),
          (o.CreatureDataId = i),
          this.SetPbDataId(e.v9n),
          (o.PbDataId = e.v9n),
          this.SetPrefabId(e.LEs),
          this.SetOwnerIncId(MathUtils_1.MathUtils.LongToNumber(e.JE_)),
          this.SetEntityConfigType(e.ZHn),
          (o.ConfigType = e.ZHn),
          this.SetComponentKey(t.ComponentsKey),
          (o.EntityType = e.zHn),
          (this.dXr = t.PbEntityInitData),
          (this.d7a = t.TemplateData),
          (this.gXr = t.PbModelConfigId ?? ""),
          (this.IsConcealed = t.IsConcealed),
          this.SetPbDataByProtocol(e),
          (this.Yre = new BlackboardMap_1.BlackboardMap()),
          (this.IsConcealed = t.IsConcealed),
          this.nTa(),
          (i = this.Entity?.EntityData?.GetCreatureDataComponent()) &&
            (i.EntityType = this.fie),
          !0)
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "[CreatureDataComponent.OnCreate] createEntityData无效。",
            ),
          !1);
    }
    get ModelBlueprintPath() {
      return this.sXr;
    }
    SetServerCamp(t) {
      this._Xr = t;
    }
    get IsPosAbnormal() {
      return this.mXr;
    }
    SetPosAbnormal(t) {
      this.mXr = t;
    }
    get EntityPbModelConfigId() {
      return this.gXr;
    }
    get LiftFloor() {
      return this.fXr;
    }
    get IsPlotPlayerOwned() {
      return (
        !!this.pXr &&
        this.pXr === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
      );
    }
    ClearPlotPlayerInfo() {
      (this.pXr = void 0), (this.vXr = !1);
    }
    get IsConcomitantEntity() {
      return [
        Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision,
        Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom,
      ].includes(this.SummonType);
    }
    get VisionControlCreatureDataId() {
      return this.LXr;
    }
    set VisionControlCreatureDataId(t) {
      this.LXr = t;
    }
    get VisionSkillServerEntityId() {
      return this.DXr;
    }
    set VisionSkillServerEntityId(t) {
      this.DXr = t;
    }
    get CustomServerEntityIds() {
      return this.RXr;
    }
    get SummonEntityIds() {
      return this.UXr;
    }
    set SummonEntityIds(t) {
      this.UXr = t;
    }
    get ServerStartLocation() {
      return this.TXr;
    }
    GetEntityVar(t) {
      return this.xRn.get(t);
    }
    SetEntityConditionalName(t) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Entity",
          26,
          "实体名称改变",
          ["id", this.wDe],
          ["name", t],
        ),
        StringUtils_1.StringUtils.IsEmpty(t)
          ? (this.yd1 = void 0)
          : (this.yd1 = t);
    }
    SetEntityEntityConditionSecondName(t) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Entity",
          26,
          "实体称号改变",
          ["id", this.wDe],
          ["name", t],
        ),
        StringUtils_1.StringUtils.IsEmpty(t)
          ? (this.Sd1 = void 0)
          : (this.Sd1 = t);
    }
    SetEntityEntityConditionFunctionPath(t) {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Entity",
          26,
          "实体图标改变",
          ["id", this.wDe],
          ["name", t],
        ),
        StringUtils_1.StringUtils.IsEmpty(t)
          ? (this.Md1 = void 0)
          : (this.Md1 = t);
    }
    SetMovementByProtocol(t) {
      void 0 === this.eXr && (this.eXr = Protocol_1.Aki.Protocol.C8n.create()),
        (this.eXr.f8n = t.f8n),
        (this.eXr.KWn = t.KWn),
        (this.eXr.P5n = t.P5n),
        (this.eXr.g8n = t.g8n),
        (this.eXr.QWn = t.QWn),
        (this.eXr.XWn = t.XWn),
        (this.eXr.KVn = t.KVn);
    }
    SetCreatureDataId(t) {
      this.Wpo = t;
    }
    GetCreatureDataId() {
      return this.Wpo;
    }
    GetPlayerId() {
      return this.j8;
    }
    SetPlayerId(t) {
      this.j8 = t;
    }
    GetOwnerId() {
      return MathUtils_1.MathUtils.LongToBigInt(
        MathUtils_1.MathUtils.NumberToLong(this.Ehh),
      );
    }
    GetOwnerIncId() {
      return this.Ehh;
    }
    SetOwnerIncId(t) {
      this.Ehh = t;
    }
    GetRoleId() {
      return this.dFe;
    }
    SetRoleId(t) {
      this.dFe = t;
    }
    GetTrackingIsEnable() {
      return this.CXr;
    }
    GetEntityCamp() {
      if (void 0 !== this._Xr) return this._Xr;
      if (this.GetPbEntityInitData()) {
        var t = this.GetBaseInfo()?.Camp;
        if (void 0 !== t) return t;
      }
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            28,
            "[清理CDT_EntityConfig]该实体没有对应的Pb表信息Camp",
            ["CreatureDataId", this.GetCreatureDataId()],
            ["TidName", this.GetEntityTidName()],
            ["PbDataId", this.GetPbDataId()],
          ),
        0
      );
    }
    GetRoleConfig() {
      return (
        this.$Qr ||
          (this.$Qr = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
            this.dFe,
          )),
        this.$Qr
      );
    }
    GetAutoRoleConfig() {
      return (
        this.JZa ||
          (this.JZa =
            ConfigManager_1.ConfigManager.RoleConfig.GetAutoRoleConfig(
              this.dFe,
            )),
        this.JZa
      );
    }
    GetSkinModelId() {
      return this.nGl;
    }
    GetSkinId() {
      return this.BIl;
    }
    GetParaglidingSkinId() {
      return this.vFc;
    }
    SetParaglidingSkinId(t) {
      this.vFc = t;
    }
    GetSoarWingSkinId() {
      return this.yFc;
    }
    SetSoarWingSkinId(t) {
      this.yFc = t;
    }
    GetEntityType() {
      return this.fie;
    }
    IsRole() {
      return this.fie === Protocol_1.Aki.Protocol.kks.Proto_Player;
    }
    IsAutoRole() {
      return this.fie === Protocol_1.Aki.Protocol.kks.Proto_Player && this.zZa;
    }
    IsPlayer() {
      return this.fie === Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity;
    }
    IsMonster() {
      return this.fie === Protocol_1.Aki.Protocol.kks.Proto_Monster;
    }
    IsNpc() {
      return this.fie === Protocol_1.Aki.Protocol.kks.Proto_Npc;
    }
    IsVision() {
      return this.fie === Protocol_1.Aki.Protocol.kks.Proto_Vision;
    }
    IsSceneItem() {
      return this.fie === Protocol_1.Aki.Protocol.kks.Proto_SceneItem;
    }
    IsAnimal() {
      return this.fie === Protocol_1.Aki.Protocol.kks.Proto_Animal;
    }
    IsCustom() {
      return this.fie === Protocol_1.Aki.Protocol.kks.Proto_Custom;
    }
    IsCharacter() {
      return (
        this.IsRole() ||
        this.IsMonster() ||
        this.IsNpc() ||
        this.IsVision() ||
        this.IsAnimal()
      );
    }
    IsVehicle() {
      return this.fie === Protocol_1.Aki.Protocol.kks.HI_;
    }
    GetSubEntityType() {
      return this.QQr;
    }
    SetEntityType(t) {
      this.fie = t;
    }
    SetSubEntityType(t) {
      this.QQr = t;
    }
    GetEntityConfigType() {
      return this.XQr;
    }
    SetEntityConfigType(t) {
      this.XQr = t;
    }
    GetLife() {
      return 0;
    }
    GetMaxLife() {
      return 0;
    }
    GetHardnessModeId() {
      return this.YQr;
    }
    SetAiWeaponId(t) {
      this.oXr = t;
    }
    GetAiWeaponId() {
      return this.oXr;
    }
    SetDurabilityValue(t) {
      (this.aXr = t),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemDurabilityChange,
          t,
        );
    }
    GetDurabilityValue() {
      return this.aXr;
    }
    SetHardnessModeId(t) {
      this.YQr = t;
    }
    PXr(t) {
      (this.MXr = new AdviceData_1.AdviceEntityData()), this.MXr.Phrase(t);
    }
    GetAdviceInfo() {
      return this.MXr;
    }
    SetSummonerId(t) {
      this.JQr = t;
    }
    GetSummonerId() {
      return this.JQr;
    }
    SetSummonerPlayerId(t) {
      this.zQr = t;
    }
    GetSummonerPlayerId() {
      return this.zQr;
    }
    SetSummonsVersion(t) {
      this.ZQr = t;
    }
    GetSummonsVersion() {
      return this.ZQr;
    }
    GetMovementInfo() {
      return this.eXr;
    }
    SetMovementInfo(t) {
      this.eXr = t;
    }
    GetPbLocation() {
      var t, i, e;
      return this.eXr?.P5n
        ? ((t = (e = this.eXr.P5n).X || 0),
          (i = e.Y || 0),
          (e = e.Z || 0),
          new UE.VectorDouble(t, i, e))
        : Vector_1.Vector.ZeroVectorDouble;
    }
    GetLocation() {
      if (this.$c1) {
        var t = this.D_GetLocationIsSnap();
        if (t) return t;
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Entity",
            72,
            "寻找实体最近吸附的合法位置失败",
            ["MovementInfo", this.eXr],
            ["InitData", this.dXr],
          );
      }
      return this.GetPbLocation();
    }
    D_GetLocationIsSnap() {
      for (const i of [this.Wc1, this.Qc1]) {
        var t = i();
        if (t) return t;
      }
    }
    SetLocation(t) {
      this.eXr || (this.eXr = Protocol_1.Aki.Protocol.C8n.create()),
        this.eXr.P5n || (this.eXr.P5n = Protocol_1.Aki.Protocol.Gks.create()),
        (this.eXr.P5n.X = t.X ?? 0),
        (this.eXr.P5n.Y = t.Y ?? 0),
        (this.eXr.P5n.Z = t.Z ?? 0);
      t = this.eXr.P5n;
      this.TXr = Vector_1.Vector.Create(t.X, t.Y, t.Z);
    }
    GetRotation() {
      var t, i, e;
      return this.eXr?.g8n
        ? ((t = (e = this.eXr.g8n).Pitch || 0),
          (i = e.Yaw || 0),
          (e = e.Roll || 0),
          new UE.Rotator(t, i, e))
        : new UE.Rotator(0, 0, 0);
    }
    SetRotation(t) {
      this.eXr || (this.eXr = Protocol_1.Aki.Protocol.C8n.create()),
        this.eXr.g8n || (this.eXr.g8n = Protocol_1.Aki.Protocol.D2s.create()),
        (this.eXr.g8n.Pitch = t.Pitch),
        (this.eXr.g8n.Roll = t.Roll),
        (this.eXr.g8n.Yaw = t.Yaw);
    }
    D_GetTransform() {
      var t = this.GetLocation(),
        i = this.GetRotation();
      return UE.KismetMathLibrary.MakeTransformDouble(
        t,
        i,
        Vector_1.Vector.OneVector,
      );
    }
    GetBlackboard() {
      return this.Yre;
    }
    SetBlackboardsByProtocol(t) {
      if (void 0 !== t) for (const i of t) this.SetBlackboardByProtocol(i);
    }
    SetBlackboardByProtocol(t) {
      void 0 !== t &&
        (t = BlackboardMap_1.BlackboardParam.CreateByProtocol(t)) &&
        this.Yre.SetValue(t.GetKey(), t);
    }
    SetBlackboardsByConfig(t) {
      if (void 0 !== t)
        for (const e of t) {
          var i = BlackboardMap_1.BlackboardParam.CreateByConfig(e);
          i && this.Yre.SetValue(i.GetKey(), i);
        }
    }
    GetBlackboardByKey(t) {
      return this.Yre.GetValue(t);
    }
    SetBlackboard(t, i) {
      void 0 !== i && this.Yre.SetValue(t, i);
    }
    RemoveBlackboard(t) {
      return this.Yre.RemoveValue(t);
    }
    GetPublicTags() {
      return this.tXr;
    }
    SetPublicTags(t) {
      this.tXr.length = 0;
      for (const i of t)
        this.AddPublicTags(i), this.mQt.has(i) || this.mQt.add(i);
    }
    AddPublicTags(t) {
      this.ContainsPublicTag(t) ||
        (this.tXr.push(t), this.mQt.has(t)) ||
        this.mQt.add(t);
    }
    RemovePublicTag(i) {
      for (let t = 0; t < this.tXr.length; ++t)
        if (this.tXr[t] === i)
          return this.tXr.splice(t, 1), this.mQt.delete(i), !0;
      return !1;
    }
    ClearPublicTags() {
      this.tXr.length = 0;
    }
    ContainsPublicTag(t) {
      for (const i of this.tXr) if (i === t) return !0;
      return !1;
    }
    ContainsTag(t) {
      return this.mQt.has(t);
    }
    GetVisible() {
      return (!this.pXr || !this.vXr) && this.yne;
    }
    SetVisible(t) {
      this.yne = t;
    }
    GetComponentKey() {
      return this.AXr;
    }
    SetComponentKey(t) {
      this.AXr = t;
    }
    GetIsStaticInit() {
      return this.iXr;
    }
    SetWeaponSkinId(t) {
      this.nxl = t;
    }
    GetWeaponSkinId() {
      return this.nxl;
    }
    SetIsStaticInit(t) {
      this.iXr = t;
    }
    SetEntityCommonTags(t) {
      this.EntityCommonTags.clear();
      for (const i of t) this.EntityCommonTags.add(i);
    }
    UpdateEntityCommonTags(t) {
      if (0 !== t.length)
        for (const i of t)
          this.EntityCommonTags.has(i.m5n)
            ? i.lWn || this.EntityCommonTags.delete(i.m5n)
            : i.lWn && this.EntityCommonTags.add(i.m5n);
    }
    SetModelConfig(t) {
      var i;
      this.rXr !== t &&
        ((this.rXr = t),
        (i = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
          0,
          t.toString(),
        ))
          ? (this.nXr = i)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Character", 6, "模型配置不存在", [
              "ModelConfigId",
              t,
            ]));
    }
    GetModelId() {
      if (this.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
        if (this.zZa) {
          var t = this.GetAutoRoleConfig();
          if (t) return t.ModelId;
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              48,
              "Ai角色缺少配置",
              ["CreatureDataId", this.GetCreatureDataId()],
              ["RoleId", this.dFe],
            );
        }
        var t = this.GetRoleConfig(),
          i = this.GetSkinModelId();
        return 0 < i ? i : t ? t.MeshId : 0;
      }
      i = this.GetPbModelConfig();
      return i
        ? i.ModelId
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              28,
              "[清理CDT_EntityConfig]该实体没有对应的Pb表信息",
              ["CreatureDataId", this.GetCreatureDataId()],
              ["TidName", this.GetEntityTidName()],
              ["PbDataId", this.GetPbDataId()],
            ),
          0);
    }
    GetModelConfig() {
      if (!this.nXr) {
        let t = void 0;
        (t = this.dXr
          ? (0, IComponent_1.getComponent)(
              this.dXr.ComponentsData,
              "ModelComponent",
            )
          : t)
          ? this.xXr(t.ModelType)
          : (this.nXr = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
              0,
              this.GetModelId().toString(),
            ));
      }
      return this.nXr;
    }
    xXr(t) {
      switch (t.Type) {
        case "LevelPrefab":
          (this.nXr = new UE.SModelConfig()),
            (this.sXr = IComponent_1.levelPrefabBpPathConfig[t.BlueprintPath]),
            (this.nXr.场景交互物 = new UE.SoftObjectPath(
              FNameUtil_1.FNameUtil.GetDynamicFName(t.PrefabPath),
              "",
            ));
          for (const o of t.PrefabStateList)
            this.nXr.场景交互物状态列表.Add(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                o.LevelTag,
              ),
              o.SceneInteractionState,
            );
          for (const r of t.EffectStateList)
            this.nXr.场景交互物特效列表.Add(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                r.LevelTag,
              ),
              r.SceneInteractionEffectState,
            );
          break;
        case "ModelId":
          this.SetModelConfig(t.ModelId);
          break;
        case "Npc":
          (this.nXr = new UE.SModelConfig()), (this.sXr = t.BlueprintPath);
          var i = UE.KismetSystemLibrary.MakeSoftClassPath(t.BlueprintPath),
            i = UE.KismetSystemLibrary.Conv_SoftClassPathToSoftClassRef(i),
            i =
              ((this.nXr.蓝图 = i),
              UE.KismetSystemLibrary.MakeSoftClassPath(t.Abp)),
            i = UE.KismetSystemLibrary.Conv_SoftClassPathToSoftClassRef(i);
          if (((this.nXr.动画蓝图 = i), t.NpcModel))
            switch (t.NpcModel.Type) {
              case "Da":
                var e = UE.KismetSystemLibrary.MakeSoftClassPath(t.NpcModel.Da);
                this.nXr.DA = e;
                break;
              case "Mesh":
                (e = UE.KismetSystemLibrary.MakeSoftObjectPath(
                  t.NpcModel.Mesh,
                )),
                  (e = UE.KismetSystemLibrary.Conv_SoftObjPathToSoftObjRef(e));
                this.nXr.网格体 = e;
            }
          if (t.BattleSockets)
            for (const s of t.BattleSockets) this.nXr.BattleSockets.Add(s);
          if (t.NormalSockets)
            for (const n of t.NormalSockets) this.nXr.NormalSockets.Add(n);
          t.BodyType && (this.nXr.体型类型 = t.BodyType),
            t.LookingUpAngle && (this.nXr.注释时的抬升角度 = t.LookingUpAngle),
            t.NameZaxisOffset && (this.nXr.名字Z偏移 = t.NameZaxisOffset);
      }
    }
    GetEntityPropertyConfig() {
      if (this.t4r) return this.t4r;
      let t = "";
      this.fie === Protocol_1.Aki.Protocol.kks.Proto_Player
        ? ((i = this.GetRoleConfig()), (t = i.EntityProperty.toString()))
        : (i = this.GetBaseInfo())?.EntityPropertyId
          ? (t = i.EntityPropertyId.toString())
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              28,
              "[清理CDT_EntityConfig]该实体没有对应的Pb表信息EntityPropertyId",
              ["CreatureDataId", this.GetCreatureDataId()],
              ["TidName", this.GetEntityTidName()],
              ["PbDataId", this.GetPbDataId()],
            );
      var i = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(1, t);
      if (i) return (this.t4r = i), this.t4r;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          3,
          "[CreatureController.LoadActorByTypeAndId] 不存在实体配置表。",
          ["roleName", t],
        );
    }
    GetRemoveState() {
      return this.ou;
    }
    SetRemoveState(t) {
      this.ou = t;
    }
    SetInitLocation(t) {
      this.qne = t;
    }
    GetInitLocation() {
      return this.qne;
    }
    GetInitGravityDirection() {
      return this.PIl;
    }
    GetInitLinearVelocity() {
      return this.hXr;
    }
    GetInitCharacterState() {
      return this.lXr;
    }
    Reset() {
      this.ClearPublicTags(),
        this.mQt.clear(),
        this.SetHardnessModeId(0),
        this.SetPlayerId(0),
        this.SetVisible(!1),
        this.Yre.Clear(),
        (this.fie = Protocol_1.Aki.Protocol.kks.Proto_Player),
        (this.nXr = void 0);
    }
    SetPbDataId(t) {
      this.wDe = t;
    }
    GetPbDataId() {
      return this.wDe;
    }
    SetPrefabId(t) {
      this.vH = t;
    }
    GetPrefabId() {
      return this.vH;
    }
    GetMonsterMatchType() {
      if (this.dXr) {
        var t = this.GetBaseInfo();
        if (t) return t.Category.MonsterMatchType;
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[CreatureData.GetMonsterMatchType] 实体的BaseInfoComponent空。",
            ["PbDataId", this.wDe],
          );
      }
    }
    SetPbDataByProtocol(t) {
      var i = t;
      if (
        ((this.wDe = i.v9n),
        (this.vH = i.LEs),
        (this.mXr = i.iys),
        this.SetOwnerIncId(MathUtils_1.MathUtils.LongToNumber(i.JE_)),
        this.XQr === Protocol_1.Aki.Protocol.rLs.Proto_Character)
      )
        this.SetRoleId(t.v9n);
      else if (this.XQr !== Protocol_1.Aki.Protocol.rLs.Proto_OldEntity) {
        if (!this.dXr)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "[CreatureDataComponent.SetPbDataByProtocol] PbEntityInitData数据为空。",
                ["EntityConfigType", this.XQr],
                ["PbDataId", this.wDe],
              ),
            !1
          );
        if (!this.dXr.ComponentsData)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "[CreatureDataComponent.SetPbDataByProtocol] ComponentsData",
                ["EntityConfigType", this.XQr],
                ["PbDataId", this.wDe],
              ),
            !1
          );
        var e = this.GetBaseInfo();
        if (!e)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "[CreatureData.SetPbDataByProtocol] 实体的BaseInfoComponent空。",
                ["EntityConfigType", this.XQr],
                ["PbDataId", this.wDe],
              ),
            !1
          );
        e.Category?.EntityPlotBindingType &&
          this.AddPublicTags(e.Category.EntityPlotBindingType);
      }
      this.SetEntityType(i.zHn),
        this.SetSubEntityType(i.oys),
        this.SetPlayerId(i.W5n),
        this.SetVisible(i.rVn),
        (this.LivingStatus = i.JEs),
        (this.PIl = i.ZE_);
      var e = i.l8n;
      return (
        this.SetLocation(e),
        (this.$c1 = i.tc1),
        this.SetRotation(i._8n),
        this.SetDurabilityValue(i.ZEs),
        (this.qne = t.YEs),
        (this.hXr = t.tys),
        (this.lXr = t.eys),
        "number" == typeof t.nys && (this._Xr = t.nys),
        this.wXr(i.zEs),
        0 < i.eI_ &&
          ((e = ModelManager_1.ModelManager.RoleSkinModel?.GetRoleSkinData(
            i.eI_,
          )),
          (this.nGl = e?.GetRoleMeshId() ?? 0),
          (this.BIl = i.eI_)),
        0 < i.Vsc && (this.vFc = i.Vsc),
        0 < i.Nsc && (this.yFc = i.Nsc),
        (this.ActorVisible = i.oVn),
        !0
      );
    }
    wXr(t) {
      this.ComponentDataMap.clear();
      for (const _ of t) {
        var i = _.C3s;
        switch ((this.ComponentDataMap.set(i, _), i)) {
          case "sys":
            this.SetHardnessModeId(_.sys.$Wn);
            break;
          case "ays":
            this.SetEntityCommonTags(_.ays.lIs);
            break;
          case "dys":
            this.SetBlackboardsByProtocol(_.dys.pIs);
            break;
          case "pys":
            this.CXr = _.pys.yIs;
            break;
          case "lys":
            this.SetSummonerId(MathUtils_1.MathUtils.LongToNumber(_.lys.YWn)),
              this.SetSummonerPlayerId(_.lys.W5n),
              (this.SummonType = _.lys.h5n),
              (this.SummonCfgId = _.lys.dIs);
            break;
          case "yys":
            this.PXr(_.yys);
            break;
          case "Iys":
            this.fXr = _.Iys.P5n ?? 1;
            break;
          case "Rys":
            (this.RelationId = _.Rys.bIs),
              (this.PbRelationMatchCfgIndex = _.Rys.BIs - 1),
              (this.ControllerId = MathUtils_1.MathUtils.LongToNumber(
                _.Rys.xIs,
              )),
              (this.IsShowingHandFx = _.Rys.q5n);
            break;
          case "Yys":
            this.AutonomousId = MathUtils_1.MathUtils.LongToNumber(_.Yys.wIs);
            break;
          case "Dys":
            (this.VisionSkillServerEntityId =
              MathUtils_1.MathUtils.LongToNumber(_.Dys.Z5n)),
              (this.RXr.length = 0);
            for (const l of _.Dys.OIs)
              this.RXr.push(MathUtils_1.MathUtils.LongToNumber(l));
            this.VisionControlCreatureDataId =
              MathUtils_1.MathUtils.LongToNumber(_.Dys.kIs);
            break;
          case "wys":
            for (const u of _.wys.FIs) this.OccupiedGridInfo.set(u.iLs, u);
            for (const d of _.wys.VIs) this.DynamicGridInfo.push(d);
            this.BoardCanMove = _.wys.gI_;
            break;
          case "Nys":
            (this.PbInRangeEntityCreatureDataIds = _.Nys.rIs.flatMap((t) =>
              MathUtils_1.MathUtils.LongToNumber(t),
            )),
              (this.PbInRangePlayerIds = _.Nys.iIs);
            break;
          case "$ys":
            var e = _.$ys;
            (this.PbDynAttachEntityConfigId = e.qIs),
              (this.PbDynAttachEntityActorKey = e.GIs),
              (this.PbDynAttachRefActorKey = e._6n),
              this.PbDynAttachRelPos.Set(
                e.o6n?.X ?? 0,
                e.o6n?.Y ?? 0,
                e.o6n?.Z ?? 0,
              );
            break;
          case "Hys":
            e = _.Hys?.hEs;
            e && this.sQt(e);
            break;
          case "oI_":
            this.zZa = _.oI_?.fI_ ?? !1;
            break;
          case "lI_":
            var o = _.lI_;
            this.nxl = o.yI_;
            break;
          case "sI_":
            o = _.sI_;
            this.PbSceneItemAttributeIds = o.II_;
            break;
          case "aI_":
            var r = _.aI_;
            this.PbPullingFoundationEntityId = r.bIs;
            break;
          case "cI_":
            r = _.cI_;
            (this.PbSceneAiEnabled = r.tWn), (this.PbPatrolInfoPb = r.tVn?.RI_);
            break;
          case "uI_":
            var s = _.uI_;
            this.PbAnimalInitialPartIds = s.PI_;
            break;
          case "_I_":
            s = _._I_;
            (this.PbCombinePartInfoList = s.SI_),
              (this.PbCombineTargetServerId =
                MathUtils_1.MathUtils.LongToNumber(s.TVn));
            break;
          case "mI_":
            var n = _.mI_;
            this.PbHookLockPointDisabled = n.UI_;
            break;
          case "Tx_":
            n = _.Tx_;
            this.PbHackingEntities = n.PSs;
            break;
          case "N7_":
            var h = _.N7_;
            this.PbHackedByEntities = MathUtils_1.MathUtils.LongToNumber(h.V7_);
            break;
          case "TY_":
            h = _.TY_;
            this.PbGravityFlipDirection = h.RY_;
            break;
          case "ERc":
            var a = _.ERc;
            (this.PbMoveSplineId = a.dTs),
              (this.PbMoveSplineConfig = a.IRc),
              (this.PbMoveSplineSceneItemRuntimeData = a.TRc);
        }
      }
    }
    GetPbEntityInitData() {
      return this.dXr;
    }
    GetPbModelConfig() {
      if (this.gXr && 0 !== this.gXr.length)
        return (
          this.ger ||
            (this.ger =
              ModelManager_1.ModelManager.CreatureModel.GetEntityModel(
                this.gXr,
              )),
          this.ger
        );
    }
    GetLoading() {
      return this.Dne;
    }
    SetLoading(t) {
      this.Dne = t;
    }
    GetPreloadFinished() {
      return this.yXr;
    }
    SetPreloadFinished(t) {
      this.yXr = t;
    }
    GetEntityCommonTags() {
      return this.EntityCommonTags;
    }
    SetLivingStatus(t) {
      this.LivingStatus = t;
    }
    GetLivingStatus() {
      return this.LivingStatus;
    }
    SetEnterComponent(t) {
      this.IXr = t;
    }
    GetEntityEnterComponentState() {
      return this.IXr;
    }
    GetBaseInfo() {
      return (
        this.EXr ||
        (this.dXr
          ? ((this.EXr = (0, IComponent_1.getComponent)(
              this.dXr.ComponentsData,
              "BaseInfoComponent",
            )),
            this.EXr)
          : void 0)
      );
    }
    GetEntityTidName() {
      return this.yd1 || this.GetBaseInfo()?.TidName;
    }
    GetEntitySecondName() {
      return this.Sd1;
    }
    GetEntityFunctionIcon() {
      return this.Md1;
    }
    GetMonsterComponent() {
      if (this.dXr)
        return (0, IComponent_1.getComponent)(
          this.dXr.ComponentsData,
          "MonsterComponent",
        );
    }
    GetAttributeComponent() {
      if (this.dXr)
        return (0, IComponent_1.getComponent)(
          this.dXr.ComponentsData,
          "AttributeComponent",
        );
    }
    GetVisionComponent() {
      if (this.dXr)
        return (0, IComponent_1.getComponent)(
          this.dXr.ComponentsData,
          "VisionComponent",
        );
    }
    GetEntityOnlineInteractType() {
      if (this.GetPbEntityInitData()) {
        var t = this.GetBaseInfo()?.OnlineInteractType;
        if (void 0 !== t) return t;
      }
      return 1;
    }
    GetEntityTimeScaleModifyStrategy() {
      if (this.GetPbEntityInitData()) {
        var t = this.GetBaseInfo()?.TimeScaleModifyStrategy;
        if (void 0 !== t) return t;
      }
      return 0;
    }
    GetFightInterConfig() {
      return (
        this.SXr ||
        (this.dXr
          ? ((this.SXr = (0, IComponent_1.getComponent)(
              this.dXr.ComponentsData,
              "FightInteractComponent",
            )),
            this.SXr)
          : void 0)
      );
    }
    GetModelComponent() {
      if (this.dXr)
        return (0, IComponent_1.getComponent)(
          this.dXr.ComponentsData,
          "ModelComponent",
        );
    }
    RequestPosAbnormal() {
      this.mXr = !0;
      var t = Protocol_1.Aki.Protocol.kes.create();
      (t.F4n = MathUtils_1.MathUtils.NumberToLong(this.Wpo)),
        (t.JWn = !0),
        Net_1.Net.Call(25734, t, () => {});
    }
    IsRealMonster() {
      var t = this.fie === Protocol_1.Aki.Protocol.kks.Proto_Monster,
        i = void 0 === this.GetMonsterComponent(),
        e = 0 === this.GetMonsterComponent()?.FightConfigId;
      return t && !i && !e;
    }
    IsCharacterMonster() {
      var t;
      return (
        void 0 === this.irl &&
          ((this.irl = !1),
          this.IsAutoRole() ||
            (this.IsMonster() &&
              (t = this.GetMonsterComponent()?.FightConfigId) &&
              (t =
                MonsterBattleConfById_1.configMonsterBattleConfById.GetConfig(
                  t,
                )) &&
              0 < t.RoleMappingId)) &&
          (this.irl = !0),
        this.irl
      );
    }
    IsSummonByCharacterMonster() {
      var t;
      return (
        void 0 === this.rrl &&
          ((this.rrl = !1),
          this.IsMonster() &&
            (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              this.GetSummonerId(),
            ))?.Valid &&
            (t = t.Entity.GetComponent(0))?.Valid &&
            t.IsCharacterMonster()) &&
          (this.rrl = !0),
        this.rrl
      );
    }
    IsLowFrequencyUpdateStrategy() {
      return 1 === this.EXr?.EntityUpdateStrategy;
    }
    IsHighFrequencyUpdateStrategy() {
      return 2 === this.EXr?.EntityUpdateStrategy;
    }
    GetAwakedEntities() {
      return (
        this.uXr ||
          ((this.uXr = []),
          this.dXr &&
            this.dXr.Children &&
            0 < this.dXr.Children.length &&
            this.dXr.Children.forEach((t) => {
              this.BXr(t) && this.uXr.push(this.bXr(t));
            })),
        this.uXr
      );
    }
    bXr(t) {
      var i;
      return CreatureDataComponent_1.qXr.has(t)
        ? CreatureDataComponent_1.qXr.get(t)
        : ((i = t.split("_")),
          (i = parseInt(i[2])),
          CreatureDataComponent_1.qXr.set(t, i),
          i);
    }
    BXr(t) {
      return "e" === t.split("_")[0];
    }
    sQt(t) {
      for (const e of Object.keys(t)) {
        var i = t[e];
        this.xRn.set(e, i);
      }
    }
    UpdateVar(t, i) {
      this.xRn.set(t, i),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.EntityVarUpdate,
          t,
          i,
        );
    }
    nTa() {
      this.CustomServerEntityIds.forEach((t) => {
        CreatureGroupController_1.CreatureGroupController.AddBindEntity(
          t,
          this.Wpo,
        );
      }),
        this.VisionSkillServerEntityId &&
          CreatureGroupController_1.CreatureGroupController.AddBindEntity(
            this.VisionSkillServerEntityId,
            this.Wpo,
          ),
        this.VisionControlCreatureDataId &&
          CreatureGroupController_1.CreatureGroupController.AddBindEntity(
            this.VisionControlCreatureDataId,
            this.Wpo,
          ),
        this.JQr &&
          CreatureGroupController_1.CreatureGroupController.AddBindEntity(
            this.Wpo,
            this.JQr,
          ),
        this.PbCombinePartInfoList &&
          this.PbCombinePartInfoList.forEach((t) => {
            CreatureGroupController_1.CreatureGroupController.AddBindEntity(
              this.Wpo,
              MathUtils_1.MathUtils.LongToNumber(t.Tql),
            );
          });
    }
    GetTemplateId() {
      return this.d7a?.Id ?? 0;
    }
  });
(CreatureDataComponent.qXr = new Map()),
  (CreatureDataComponent = CreatureDataComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(0)],
      CreatureDataComponent,
    )),
  (exports.CreatureDataComponent = CreatureDataComponent);
//# sourceMappingURL=CreatureDataComponent.js.map
