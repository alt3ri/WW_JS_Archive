"use strict";
var CreatureDataComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, s) {
      var r,
        o = arguments.length,
        n =
          o < 3
            ? e
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(e, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(t, e, i, s);
      else
        for (var h = t.length - 1; 0 <= h; h--)
          (r = t[h]) &&
            (n = (o < 3 ? r(n) : 3 < o ? r(e, i, n) : r(e, i)) || n);
      return 3 < o && n && Object.defineProperty(e, i, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CreatureDataComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  AdviceData_1 = require("../../../../Module/Advice/AdviceData"),
  BlackboardMap_1 = require("../../../../World/Define/BlackboardMap"),
  CreateEntityData_1 = require("../../CreateEntityData");
let CreatureDataComponent =
  (CreatureDataComponent_1 = class CreatureDataComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Wpo = 0),
        (this.j8 = 0),
        (this.fye = void 0),
        (this.dFe = 0),
        (this.fie = Protocol_1.Aki.Protocol.wks.Proto_Monster),
        (this.QQr = 0),
        (this.XQr = Protocol_1.Aki.Protocol.YTs.Proto_OldEntity),
        (this.E0 = 0),
        (this.$Qr = void 0),
        (this.YQr = 0),
        (this.JQr = 0),
        (this.zQr = 0),
        (this.ZQr = 0),
        (this.eXr = void 0),
        (this.Yre = void 0),
        (this.tXr = new Array()),
        (this.mQt = new Set()),
        (this.yne = !1),
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
        (this.OccupiedGridInfo = new Map()),
        (this.DynamicGridInfo = []),
        (this.rXr = 0),
        (this.nXr = void 0),
        (this.sXr = ""),
        (this.aXr = 0),
        (this.qne = void 0),
        (this.hXr = void 0),
        (this.lXr = 0),
        (this._Xr = void 0),
        (this.ou = !1),
        (this.uXr = void 0),
        (this.cXr = void 0),
        (this.PbInRangeEntityCreatureDataIds = void 0),
        (this.PbInRangePlayerIds = void 0),
        (this.wDe = 0),
        (this.vH = 0),
        (this.mXr = !1),
        (this.dXr = void 0),
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
          Protocol_1.Aki.Protocol.Summon.L3s.Proto_ESummonTypeDefault),
        (this.TXr = void 0),
        (this.LXr = 0),
        (this.DXr = 0),
        (this.RXr = new Array()),
        (this.UXr = new Array()),
        (this.xRn = new Map()),
        (this.ComponentsKey = 0n),
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
      var e,
        i = t,
        s = i.ComponentsKey;
      return i instanceof CreateEntityData_1.CreateEntityData
        ? ((i = i.EntityData),
          (this.E0 = this.Entity.Id),
          (this.ComponentsKey = s),
          (s = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(
            this.Entity,
          )),
          (e = t.CreatureDataId),
          this.SetCreatureDataId(e),
          (s.CreatureDataId = e),
          this.SetPbDataId(i._9n),
          (s.PbDataId = i._9n),
          this.SetPrefabId(i.pEs),
          this.SetEntityConfigType(i.jHn),
          (s.ConfigType = i.jHn),
          this.SetComponentKey(t.ComponentsKey),
          (this.dXr = t.PbEntityInitData),
          (this.gXr = t.PbModelConfigId ?? ""),
          (this.IsConcealed = t.IsConcealed),
          this.SetPbDataByProtocol(i),
          (this.Yre = new BlackboardMap_1.BlackboardMap()),
          (this.IsConcealed = t.IsConcealed),
          this.Uia(),
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
        Protocol_1.Aki.Protocol.Summon.L3s.Proto_ESummonTypeConcomitantVision,
        Protocol_1.Aki.Protocol.Summon.L3s.Proto_ESummonTypeConcomitantCustom,
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
    SetMovementByProtocol(t) {
      void 0 === this.eXr && (this.eXr = Protocol_1.Aki.Protocol.s8n.create()),
        (this.eXr.h8n = t.h8n),
        (this.eXr.GWn = t.GWn),
        (this.eXr.y5n = t.y5n),
        (this.eXr.a8n = t.a8n),
        (this.eXr.OWn = t.OWn),
        (this.eXr.NWn = t.NWn),
        (this.eXr.GVn = t.GVn);
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
      return this.fye;
    }
    SetOwnerId(t) {
      this.fye = t;
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
            29,
            "[清理CDT_EntityConfig]该实体没有对应的Pb表信息Camp",
            ["CreatureDataId", this.GetCreatureDataId()],
            ["TidName", this.GetBaseInfo()?.TidName],
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
    GetEntityType() {
      return this.fie;
    }
    IsRole() {
      return this.fie === Protocol_1.Aki.Protocol.wks.Proto_Player;
    }
    IsMonster() {
      return this.fie === Protocol_1.Aki.Protocol.wks.Proto_Monster;
    }
    IsNpc() {
      return this.fie === Protocol_1.Aki.Protocol.wks.Proto_Npc;
    }
    IsVision() {
      return this.fie === Protocol_1.Aki.Protocol.wks.Proto_Vision;
    }
    IsSceneItem() {
      return this.fie === Protocol_1.Aki.Protocol.wks.Proto_SceneItem;
    }
    IsAnimal() {
      return this.fie === Protocol_1.Aki.Protocol.wks.Proto_Animal;
    }
    IsCustom() {
      return this.fie === Protocol_1.Aki.Protocol.wks.Proto_Custom;
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
    GetLocation() {
      var t, e, i;
      return this.eXr?.y5n
        ? ((t = (i = this.eXr.y5n).X || 0),
          (e = i.Y || 0),
          (i = i.Z || 0),
          new UE.Vector(t, e, i))
        : Vector_1.Vector.ZeroVector;
    }
    SetLocation(t) {
      this.eXr || (this.eXr = Protocol_1.Aki.Protocol.s8n.create()),
        this.eXr.y5n || (this.eXr.y5n = Protocol_1.Aki.Protocol.Pks.create()),
        (this.eXr.y5n.X = t.X ?? 0),
        (this.eXr.y5n.Y = t.Y ?? 0),
        (this.eXr.y5n.Z = t.Z ?? 0);
      t = this.eXr.y5n;
      this.TXr = Vector_1.Vector.Create(t.X, t.Y, t.Z);
    }
    GetRotation() {
      var t, e, i;
      return this.eXr?.a8n
        ? ((t = (i = this.eXr.a8n).Pitch || 0),
          (e = i.Yaw || 0),
          (i = i.Roll || 0),
          new UE.Rotator(t, e, i))
        : new UE.Rotator(0, 0, 0);
    }
    SetRotation(t) {
      this.eXr || (this.eXr = Protocol_1.Aki.Protocol.s8n.create()),
        this.eXr.a8n || (this.eXr.a8n = Protocol_1.Aki.Protocol.S2s.create()),
        (this.eXr.a8n.Pitch = t.Pitch),
        (this.eXr.a8n.Roll = t.Roll),
        (this.eXr.a8n.Yaw = t.Yaw);
    }
    GetTransform() {
      var t = this.GetLocation(),
        e = this.GetRotation();
      return UE.KismetMathLibrary.MakeTransform(
        t,
        e,
        Vector_1.Vector.OneVector,
      );
    }
    GetBlackboard() {
      return this.Yre;
    }
    SetBlackboardsByProtocol(t) {
      if (void 0 !== t) for (const e of t) this.SetBlackboardByProtocol(e);
    }
    SetBlackboardByProtocol(t) {
      void 0 !== t &&
        (t = BlackboardMap_1.BlackboardParam.CreateByProtocol(t)) &&
        this.Yre.SetValue(t.GetKey(), t);
    }
    GetBlackboardByKey(t) {
      return this.Yre.GetValue(t);
    }
    SetBlackboard(t, e) {
      void 0 !== e && this.Yre.SetValue(t, e);
    }
    RemoveBlackboard(t) {
      return this.Yre.RemoveValue(t);
    }
    GetPublicTags() {
      return this.tXr;
    }
    SetPublicTags(t) {
      this.tXr.length = 0;
      for (const e of t)
        this.AddPublicTags(e), this.mQt.has(e) || this.mQt.add(e);
    }
    AddPublicTags(t) {
      this.ContainsPublicTag(t) ||
        (this.tXr.push(t), this.mQt.has(t)) ||
        this.mQt.add(t);
    }
    RemovePublicTag(e) {
      for (let t = 0; t < this.tXr.length; ++t)
        if (this.tXr[t] === e)
          return this.tXr.splice(t, 1), this.mQt.delete(e), !0;
      return !1;
    }
    ClearPublicTags() {
      this.tXr.length = 0;
    }
    ContainsPublicTag(t) {
      for (const e of this.tXr) if (e === t) return !0;
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
    SetIsStaticInit(t) {
      this.iXr = t;
    }
    SetEntityCommonTags(t) {
      this.EntityCommonTags.clear();
      for (const e of t) this.EntityCommonTags.add(e);
    }
    UpdateEntityCommonTags(t) {
      if (0 !== t.length)
        for (const e of t)
          this.EntityCommonTags.has(e.o5n)
            ? e.eWn || this.EntityCommonTags.delete(e.o5n)
            : e.eWn && this.EntityCommonTags.add(e.o5n);
    }
    SetModelConfig(t) {
      var e;
      this.rXr !== t &&
        ((this.rXr = t),
        (e = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
          0,
          t.toString(),
        ))
          ? (this.nXr = e)
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Character", 6, "模型配置不存在", [
              "ModelConfigId",
              t,
            ]));
    }
    GetModelId() {
      let t = 0;
      var e;
      return (
        this.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Player
          ? ((e = this.GetRoleConfig()), (t = e ? e.MeshId : 0))
          : (e = this.GetPbModelConfig())
            ? (t = e.ModelId)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Character",
                29,
                "[清理CDT_EntityConfig]该实体没有对应的Pb表信息",
                ["CreatureDataId", this.GetCreatureDataId()],
                ["TidName", this.GetBaseInfo()?.TidName],
                ["PbDataId", this.GetPbDataId()],
              ),
        t
      );
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
          for (const e of t.PrefabStateList)
            this.nXr.场景交互物状态列表.Add(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                e.LevelTag,
              ),
              e.SceneInteractionState,
            );
          for (const i of t.EffectStateList)
            this.nXr.场景交互物特效列表.Add(
              GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(
                i.LevelTag,
              ),
              i.SceneInteractionEffectState,
            );
          break;
        case "ModelId":
          this.SetModelConfig(t.ModelId);
      }
    }
    GetEntityPropertyConfig() {
      if (this.t4r) return this.t4r;
      let t = "";
      this.fie === Protocol_1.Aki.Protocol.wks.Proto_Player
        ? ((e = this.GetRoleConfig()), (t = e.EntityProperty.toString()))
        : (e = this.GetBaseInfo())?.EntityPropertyId
          ? (t = e.EntityPropertyId.toString())
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              29,
              "[清理CDT_EntityConfig]该实体没有对应的Pb表信息EntityPropertyId",
              ["CreatureDataId", this.GetCreatureDataId()],
              ["TidName", e?.TidName],
              ["PbDataId", this.GetPbDataId()],
            );
      var e = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(1, t);
      if (e) return (this.t4r = e), this.t4r;
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
        (this.cXr = void 0),
        (this.fie = Protocol_1.Aki.Protocol.wks.Proto_Player),
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
      var e = t;
      if (
        ((this.wDe = e._9n),
        (this.vH = e.pEs),
        (this.mXr = e.XEs),
        this.XQr === Protocol_1.Aki.Protocol.YTs.Proto_Character)
      )
        this.SetRoleId(t._9n);
      else {
        if (!this.dXr)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "[CreatureDataComponent.SetPbDataByProtocol] PbEntityInitData数据为空。",
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
                ["PbDataId", this.wDe],
              ),
            !1
          );
        var i = this.GetBaseInfo();
        if (!i)
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "[CreatureData.SetPbDataByProtocol] 实体的BaseInfoComponent空。",
                ["PbDataId", this.wDe],
              ),
            !1
          );
        i.Category?.EntityPlotBindingType &&
          this.AddPublicTags(i.Category.EntityPlotBindingType);
      }
      this.SetEntityType(e.HHn),
        this.SetSubEntityType(e.JEs),
        this.SetPlayerId(e.q5n),
        this.SetVisible(e.X8n),
        (this.LivingStatus = e.HEs);
      i = e.e8n;
      return (
        this.SetLocation(i),
        this.SetRotation(e.t8n),
        this.SetDurabilityValue(e.WEs),
        (this.qne = t.$Es),
        (this.hXr = t.QEs),
        (this.lXr = t.KEs),
        "number" == typeof t.zEs && (this._Xr = t.zEs),
        this.wXr(e.jEs),
        !0
      );
    }
    wXr(t) {
      this.ComponentDataMap.clear();
      for (const s of t) {
        var e = s.h3s;
        switch ((this.ComponentDataMap.set(e, s), e)) {
          case "ZEs":
            this.SetHardnessModeId(s.ZEs.kWn);
            break;
          case "eys":
            this.SetEntityCommonTags(s.eys.iIs);
            break;
          case "sys":
            this.SetBlackboardsByProtocol(s.sys.cIs);
            break;
          case "cys":
            this.CXr = s.cys.gIs;
            break;
          case "iys":
            this.SetSummonerId(MathUtils_1.MathUtils.LongToNumber(s.iys.FWn)),
              this.SetSummonerPlayerId(s.iys.q5n),
              (this.SummonType = s.iys.Z4n);
            break;
          case "gys":
            this.PXr(s.gys);
            break;
          case "fys":
            this.fXr = s.fys.y5n ?? 1;
            break;
          case "Mys":
            (this.RelationId = s.Mys.RIs),
              (this.PbRelationMatchCfgIndex = s.Mys.DIs - 1),
              (this.ControllerId = MathUtils_1.MathUtils.LongToNumber(
                s.Mys.LIs,
              )),
              (this.IsShowingHandFx = s.Mys.D5n);
            break;
          case "$ys":
            this.AutonomousId = MathUtils_1.MathUtils.LongToNumber(s.$ys.TIs);
            break;
          case "Sys":
            (this.VisionSkillServerEntityId =
              MathUtils_1.MathUtils.LongToNumber(s.Sys.j5n)),
              (this.RXr.length = 0);
            for (const r of s.Sys.UIs)
              this.RXr.push(MathUtils_1.MathUtils.LongToNumber(r));
            this.VisionControlCreatureDataId =
              MathUtils_1.MathUtils.LongToNumber(s.Sys.wIs);
            break;
          case "Tys":
            for (const o of s.Tys.bIs) this.OccupiedGridInfo.set(o.XTs, o);
            for (const n of s.Tys.BIs) this.DynamicGridInfo.push(n);
            break;
          case "xys":
            (this.PbInRangeEntityCreatureDataIds = s.xys.Yys.flatMap((t) =>
              MathUtils_1.MathUtils.LongToNumber(t),
            )),
              (this.PbInRangePlayerIds = s.xys.Xys);
            break;
          case "qys":
            var i = s.qys;
            (this.PbDynAttachEntityConfigId = i.AIs),
              (this.PbDynAttachEntityActorKey = i.PIs),
              (this.PbDynAttachRefActorKey = i.t6n),
              this.PbDynAttachRelPos.Set(
                i.$5n?.X ?? 0,
                i.$5n?.Y ?? 0,
                i.$5n?.Z ?? 0,
              );
            break;
          case "Gys":
            i = s.Gys?.tEs;
            i && this.sQt(i);
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
      var t = Protocol_1.Aki.Protocol.wes.create();
      (t.P4n = MathUtils_1.MathUtils.NumberToLong(this.Wpo)),
        (t.VWn = !0),
        Net_1.Net.Call(20248, t, () => {});
    }
    IsRealMonster() {
      var t = this.fie === Protocol_1.Aki.Protocol.wks.Proto_Monster,
        e = void 0 === this.GetMonsterComponent(),
        i = 0 === this.GetMonsterComponent()?.FightConfigId;
      return t && !e && !i;
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
      var e;
      return CreatureDataComponent_1.qXr.has(t)
        ? CreatureDataComponent_1.qXr.get(t)
        : ((e = t.split("_")),
          (e = parseInt(e[2])),
          CreatureDataComponent_1.qXr.set(t, e),
          e);
    }
    BXr(t) {
      return "e" === t.split("_")[0];
    }
    AddDependenceEntity(t, e) {
      if ((this.cXr || (this.cXr = new Array()), 0 === e)) {
        if (t === this.Wpo)
          return void (
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "不能把自己添加到依赖实体",
              ["IdType", e],
              ["CreatureDataId", t],
            )
          );
      } else if (2 === e && t === this.Entity.Id)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "不能把自己添加到依赖实体",
            ["IdType", e],
            ["EntityId", t],
          )
        );
      this.cXr.push([t, e]);
    }
    GetDependenceEntities() {
      return this.cXr;
    }
    sQt(t) {
      for (const i of Object.keys(t)) {
        var e = t[i];
        this.xRn.set(i, e);
      }
    }
    UpdateVar(t, e) {
      this.xRn.set(t, e);
    }
    Uia() {
      this.CustomServerEntityIds.forEach((t) => {
        this.AddDependenceEntity(t, 0);
      }),
        this.VisionSkillServerEntityId &&
          this.AddDependenceEntity(this.VisionSkillServerEntityId, 0),
        this.VisionControlCreatureDataId &&
          this.AddDependenceEntity(this.VisionControlCreatureDataId, 0);
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
