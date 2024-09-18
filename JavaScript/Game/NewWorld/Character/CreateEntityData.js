"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CreateEntityData = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  IEntity_1 = require("../../../UniverseEditor/Interface/IEntity"),
  ModelManager_1 = require("../../Manager/ModelManager");
class CreateEntityData {
  constructor() {
    (this.CreatureDataId = 0),
      (this.EntityType = 0),
      (this.PbDataId = 0),
      (this.ConfigType = void 0),
      (this.PrefabId = 0),
      (this.EntityData = void 0),
      (this.PbEntityInitData = void 0),
      (this.PbModelConfigId = void 0),
      (this.IsConcealed = !1),
      (this.ger = void 0),
      (this.Priority = 0),
      (this.ComponentParamMap = void 0),
      (this.RegisterToGameBudgetController = !0),
      (this.ComponentsKey = 0n),
      (this.EnableMovement = !1),
      (this.TemplateData = void 0),
      (this.ComponentDataMap = new Map()),
      (this.Components = new Array()),
      (this.ComponentSet = new Set());
  }
  Init(t) {
    return (
      (this.EntityData = t),
      (this.CreatureDataId = MathUtils_1.MathUtils.LongToNumber(t.s5n)),
      (this.EntityType = this.EntityData.zHn),
      (this.PbDataId = this.EntityData.v9n),
      (this.ConfigType = this.EntityData.ZHn),
      (this.PrefabId = this.EntityData.LEs),
      this.InitPbEntityData()
        ? !!this.InitComponentData()
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              3,
              "[CreateEntityData.Init] InitPbEntityData数据初始化失败。",
              ["CreatureDataId", this.CreatureDataId],
              ["EntityType", this.EntityType],
              ["ConfigType", this.ConfigType],
              ["PbDataId", this.PbDataId],
            ),
          !1)
    );
  }
  InitPbEntityData() {
    let t = void 0,
      e = void 0;
    switch (this.ConfigType) {
      case Protocol_1.Aki.Protocol.rLs.Proto_Global:
        (t = ModelManager_1.ModelManager.CreatureModel.GetDynamicEntityData(
          this.PbDataId,
        )),
          (e = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
            t.BlueprintType,
          ));
        break;
      case Protocol_1.Aki.Protocol.rLs.F6n:
        if (
          !(t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(
            this.PbDataId,
          ))
        )
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "[CreatureDataComponent.InitPbEntityData]找不到实体配置数据。",
                ["PbDataId", this.PbDataId],
              ),
            !1
          );
        e = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
          t.BlueprintType,
        );
        break;
      case Protocol_1.Aki.Protocol.rLs.Proto_Template:
        if (
          !(e = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(
            this.PbDataId,
          ))
        )
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                3,
                "[CreatureDataComponent.InitPbEntityData] Template为空，请检查Template表是否包含该Id。",
                ["CreatureDataId", this.CreatureDataId],
                ["EntityType", this.EntityType],
                ["EntityConfigType", this.ConfigType],
                ["PbDataId", this.PbDataId],
                ["TemplateId", this.PbDataId],
              ),
            !1
          );
        t = { BlueprintType: e.BlueprintType, Name: e.Name, Id: e.Id };
        break;
      case Protocol_1.Aki.Protocol.rLs.lTs:
        if (
          (t = ModelManager_1.ModelManager.CreatureModel.GetEntityPrefab(
            this.PrefabId,
            this.PbDataId,
          ))
        )
          break;
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "[CreatureDataComponent.InitPbEntityData] 找不到Prefab的实体配置数据。",
              ["PrefabId", this.PrefabId],
              ["ConfigId", this.PbDataId],
            ),
          !1
        );
    }
    return (
      (this.TemplateData = e)
        ? (this.PbEntityInitData = (0, IEntity_1.decompressEntityData)(t, e))
        : (this.PbEntityInitData = t),
      this.PbEntityInitData?.ComponentsData &&
        ((this.PbModelConfigId = this.PbEntityInitData.BlueprintType),
        (this.IsConcealed =
          !!CreateEntityData.GetBaseInfo(this)?.ScanFunction?.IsConcealed)),
      !0
    );
  }
  InitComponentData() {
    this.ComponentDataMap.clear();
    var t = this.EntityData.zEs;
    if (t)
      for (const i of t) {
        var e = i.C3s;
        this.ComponentDataMap.set(e, i);
      }
    return !0;
  }
  AddComponent(t) {
    var e = t.Id;
    return e < 0
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Entity", 3, "组件没有在RegisterComponent注册", [
            "Type",
            t.name,
          ]),
        !1)
      : this.ComponentSet.has(t)
        ? (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "重复注册组件",
              ["Type", t.name],
              ["Id", e],
            ),
          !1)
        : (this.Components.push(t),
          this.ComponentSet.add(t),
          (this.ComponentsKey |= 1n << BigInt(e)),
          !0);
  }
  AddDebugComponent(t) {
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      var e = t.Id;
      if (e < 0)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 3, "组件没有在RegisterComponent注册", [
              "Type",
              t.name,
            ]),
          !1
        );
      if (this.ComponentSet.has(t))
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "重复注册组件",
              ["Type", t.name],
              ["Id", e],
            ),
          !1
        );
      this.Components.push(t),
        this.ComponentSet.add(t),
        (this.ComponentsKey |= 1n << BigInt(e));
    }
    return !0;
  }
  HasComponent(t) {
    return this.ComponentSet.has(t);
  }
  SetParam(t, ...e) {
    this.ComponentParamMap || (this.ComponentParamMap = new Map()),
      this.ComponentParamMap.set(t, e);
  }
  GetParam(t) {
    if (this.ComponentParamMap) return this.ComponentParamMap.get(t);
  }
  GetPbModelConfig() {
    if (this.PbModelConfigId)
      return (
        this.ger ||
          (this.ger = ModelManager_1.ModelManager.CreatureModel.GetEntityModel(
            this.PbModelConfigId,
          )),
        this.ger
      );
  }
  static GetBaseInfo(t) {
    if (t.PbEntityInitData)
      return (0, IComponent_1.getComponent)(
        t.PbEntityInitData.ComponentsData,
        "BaseInfoComponent",
      );
  }
  static GetAnimalComponentConfig(t) {
    if (t.PbEntityInitData)
      return (0, IComponent_1.getComponent)(
        t.PbEntityInitData.ComponentsData,
        "AnimalComponent",
      );
  }
  static IsRobot(t) {
    var t = t.PbEntityInitData,
      e = (0, IComponent_1.getComponent)(t.ComponentsData, "InteractComponent"),
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "BubbleComponent");
    return !(!e || !t);
  }
  static IsFollowShooter(t) {
    return !!t.ComponentDataMap.get("$ih");
  }
  static GetMonsterComponent(t) {
    if (t.PbEntityInitData)
      return (0, IComponent_1.getComponent)(
        t.PbEntityInitData.ComponentsData,
        "MonsterComponent",
      );
  }
  static HasScanInfo(t) {
    t = this.GetBaseInfo(t)?.ScanFunction?.ScanId;
    return !!t && 0 !== t;
  }
}
exports.CreateEntityData = CreateEntityData;
//# sourceMappingURL=CreateEntityData.js.map
