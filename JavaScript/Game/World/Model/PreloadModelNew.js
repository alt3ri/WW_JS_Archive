"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreloadModelNew =
    exports.PreloadSkillSaveData =
    exports.PreloadModelConfigSaveData =
    exports.PreloadSaveData =
      void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  BulletPreloadByActorBlueprintAndBulletId_1 = require("../../../Core/Define/ConfigQuery/BulletPreloadByActorBlueprintAndBulletId"),
  BulletPreloadByAll_1 = require("../../../Core/Define/ConfigQuery/BulletPreloadByAll"),
  CommonSkillPreloadAll_1 = require("../../../Core/Define/ConfigQuery/CommonSkillPreloadAll"),
  EntitySkillPreloadByActorBlueprint_1 = require("../../../Core/Define/ConfigQuery/EntitySkillPreloadByActorBlueprint"),
  EntitySkillPreloadByAll_1 = require("../../../Core/Define/ConfigQuery/EntitySkillPreloadByAll"),
  ModelConfigPreloadByAll_1 = require("../../../Core/Define/ConfigQuery/ModelConfigPreloadByAll"),
  ModelConfigPreloadById_1 = require("../../../Core/Define/ConfigQuery/ModelConfigPreloadById"),
  PbDataPreloadAll_1 = require("../../../Core/Define/ConfigQuery/PbDataPreloadAll"),
  StateMachinePreloadByAll_1 = require("../../../Core/Define/ConfigQuery/StateMachinePreloadByAll"),
  StateMachinePreloadByFsmKey_1 = require("../../../Core/Define/ConfigQuery/StateMachinePreloadByFsmKey"),
  TemplateDataPreloadByAll_1 = require("../../../Core/Define/ConfigQuery/TemplateDataPreloadByAll"),
  TemplateDataPreloadById_1 = require("../../../Core/Define/ConfigQuery/TemplateDataPreloadById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  PreCreateEffect_1 = require("../../Effect/PreCreateEffect"),
  GlobalData_1 = require("../../GlobalData"),
  CloudGameManager_1 = require("../../Manager/CloudGameManager"),
  PreloadDefine_1 = require("../../Preload/PreloadDefine");
class PreloadSaveData {
  constructor() {
    (this.Animations = void 0), (this.Others = []);
  }
}
class PreloadModelConfigSaveData extends (exports.PreloadSaveData =
  PreloadSaveData) {
  constructor() {
    super(...arguments), (this.ActorClassPath = void 0);
  }
}
exports.PreloadModelConfigSaveData = PreloadModelConfigSaveData;
class PreloadSkillSaveData extends PreloadSaveData {
  constructor() {
    super(...arguments), (this.SkillId = void 0);
  }
}
exports.PreloadSkillSaveData = PreloadSkillSaveData;
class PreloadModelNew extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.EnablePreloadLog = !1),
      (this.ProjectPath = void 0),
      (this.JsonExportRootPath = void 0),
      (this.ModelConfigJsonExportPath = void 0),
      (this.SkillJsonExportPath = void 0),
      (this.CommonSkillJsonExportPath = void 0),
      (this.BulletJsonExportPath = void 0),
      (this.StateMachineJsonExportPath = void 0),
      (this.PreCreateEffect = new PreCreateEffect_1.PreCreateEffect()),
      (this.CommonAssetElement = new PreloadDefine_1.CommonAssetElement(
        void 0,
      )),
      (this.PreloadAssetMap = new Map()),
      (this.PbDataPreloadDataMap = new Map()),
      (this.AllEntityAssetMap = new Map()),
      (this.PEr = new Map()),
      (this.REr = void 0),
      (this.BulletPreloadDataMap = new Map()),
      (this.CommonSkillPreloadDataMap = []),
      (this.ModelConfigPreloadDataMap = new Map()),
      (this.StateMachinePreloadDataMap = new Map()),
      (this.TemplatePreloadDataMap = new Map()),
      (this.SkillPreloadDataMap = new Map()),
      (this.LoadingNeedWaitEntitySet = new Set());
  }
  get HoldPreloadObject() {
    return this.REr;
  }
  OnInit() {
    return (
      (this.ProjectPath = UE.KismetSystemLibrary.ConvertToAbsolutePath(
        UE.BlueprintPathsLibrary.ProjectDir(),
      )),
      (this.JsonExportRootPath = UE.KismetSystemLibrary.ConvertToAbsolutePath(
        this.ProjectPath + "../Config/Client/Preload/",
      )),
      (this.ModelConfigJsonExportPath =
        this.JsonExportRootPath + "ModelConfig/"),
      (this.SkillJsonExportPath = this.JsonExportRootPath + "SkillInfo/"),
      (this.CommonSkillJsonExportPath =
        this.JsonExportRootPath + "CommonSkillInfo/"),
      (this.BulletJsonExportPath = this.JsonExportRootPath + "BulletInfo/"),
      (this.StateMachineJsonExportPath =
        this.JsonExportRootPath + "EntityFsm/"),
      (this.REr = UE.NewObject(
        UE.HoldPreloadObject.StaticClass(),
        GlobalData_1.GlobalData.GameInstance,
      )),
      this.PreCreateEffect.RegisterTick(),
      this.PreCreateEffect.Init(),
      (Info_1.Info.IsPs5Platform() ||
        CloudGameManager_1.CloudGameManager.IsCloudGame) &&
        (PreloadDefine_1.PreloadSetting.LoadAllPreloadData = !0),
      this.G4a(),
      this.yFl(),
      PreloadDefine_1.PreloadSetting.LoadAllPreloadData &&
        (this.EFl(), this.IFl(), this.TFl(), this.LFl(), this.UFl()),
      !0
    );
  }
  G4a() {
    for (const e of PbDataPreloadAll_1.configPbDataPreloadAll.GetConfigList())
      this.PbDataPreloadDataMap.has(e.MapId) ||
        this.PbDataPreloadDataMap.set(e.MapId, new Map()),
        this.PbDataPreloadDataMap.get(e.MapId)?.set(e.PbDataId, e);
  }
  EFl() {
    for (const e of BulletPreloadByAll_1.configBulletPreloadByAll.GetConfigList())
      this.BulletPreloadDataMap.has(e.ActorBlueprint) ||
        this.BulletPreloadDataMap.set(e.ActorBlueprint, new Map()),
        this.BulletPreloadDataMap.get(e.ActorBlueprint)?.set(
          e.BulletId,
          this.AFl(e),
        );
  }
  GetBulletPreloadData(e, t) {
    return PreloadDefine_1.PreloadSetting.LoadAllPreloadData
      ? this.BulletPreloadDataMap.get(e)?.get(t)
      : BulletPreloadByActorBlueprintAndBulletId_1.configBulletPreloadByActorBlueprintAndBulletId.GetConfig(
          e,
          t,
        );
  }
  yFl() {
    CommonSkillPreloadAll_1.configCommonSkillPreloadAll
      .GetConfigList()
      ?.forEach((e) => {
        this.CommonSkillPreloadDataMap?.push(e);
      });
  }
  GetCommonSkillPreloadData() {
    return this.CommonSkillPreloadDataMap;
  }
  IFl() {
    var e;
    for (const t of ModelConfigPreloadByAll_1.configModelConfigPreloadByAll.GetConfigList())
      this.ModelConfigPreloadDataMap.has(t.Id) ||
        (((e = this.AFl(t)).ActorClassPath = t.ActorClassPath),
        this.ModelConfigPreloadDataMap.set(t.Id, e));
  }
  GetModelConfigPreloadData(e) {
    return PreloadDefine_1.PreloadSetting.LoadAllPreloadData
      ? this.ModelConfigPreloadDataMap.get(e)
      : ModelConfigPreloadById_1.configModelConfigPreloadById.GetConfig(e);
  }
  TFl() {
    for (const e of StateMachinePreloadByAll_1.configStateMachinePreloadByAll.GetConfigList())
      this.StateMachinePreloadDataMap.has(e.FsmKey) ||
        this.StateMachinePreloadDataMap.set(e.FsmKey, this.AFl(e));
  }
  GetStateMachinePreloadData(e) {
    return PreloadDefine_1.PreloadSetting.LoadAllPreloadData
      ? this.StateMachinePreloadDataMap.get(e)
      : StateMachinePreloadByFsmKey_1.configStateMachinePreloadByFsmKey.GetConfig(
          e,
        );
  }
  LFl() {
    for (const e of TemplateDataPreloadByAll_1.configTemplateDataPreloadByAll.GetConfigList())
      this.TemplatePreloadDataMap.has(e.Id) ||
        this.TemplatePreloadDataMap.set(e.Id, this.AFl(e));
  }
  GetTemplatePreloadData(e) {
    return PreloadDefine_1.PreloadSetting.LoadAllPreloadData
      ? this.TemplatePreloadDataMap.get(e)
      : TemplateDataPreloadById_1.configTemplateDataPreloadById.GetConfig(e);
  }
  UFl() {
    for (const t of EntitySkillPreloadByAll_1.configEntitySkillPreloadByAll.GetConfigList()) {
      var e = this.AFl(t);
      (e.SkillId = t.SkillId),
        this.SkillPreloadDataMap.has(t.ActorBlueprint)
          ? this.SkillPreloadDataMap.get(t.ActorBlueprint)?.push(e)
          : this.SkillPreloadDataMap.set(t.ActorBlueprint, [e]);
    }
  }
  GetSkillPreloadData(e) {
    return PreloadDefine_1.PreloadSetting.LoadAllPreloadData
      ? this.SkillPreloadDataMap.get(e)
      : EntitySkillPreloadByActorBlueprint_1.configEntitySkillPreloadByActorBlueprint.GetConfigList(
          e,
        );
  }
  AFl(e) {
    var t = new PreloadSaveData();
    return (
      0 < e.ActorClass.length &&
        (t.Others = t.Others?.concat(Array.from(e.ActorClass))),
      0 < e.Animations.length && (t.Animations = Array.from(e.Animations)),
      0 < e.Effects.length &&
        (t.Others = t.Others?.concat(Array.from(e.Effects))),
      0 < e.Audios.length &&
        (t.Others = t.Others?.concat(Array.from(e.Audios))),
      0 < e.Materials.length &&
        (t.Others = t.Others?.concat(Array.from(e.Materials))),
      0 < e.Meshes.length &&
        (t.Others = t.Others?.concat(Array.from(e.Meshes))),
      0 < e.AnimationBlueprints.length &&
        (t.Others = t.Others?.concat(Array.from(e.AnimationBlueprints))),
      0 < e.Others.length &&
        (t.Others = t.Others?.concat(Array.from(e.Others))),
      t
    );
  }
  OnClear() {
    return (
      this.REr.Clear(),
      this.REr?.IsValid() && this.REr.Clear(),
      (this.REr = void 0),
      this.PreCreateEffect.UnregisterTick(),
      this.PreCreateEffect.Clear(),
      this.PEr.clear(),
      !0
    );
  }
  AddPreloadResource(e) {
    var t;
    this.PreloadAssetMap.has(e)
      ? ((t = this.PreloadAssetMap.get(e)), this.PreloadAssetMap.set(e, t + 1))
      : this.PreloadAssetMap.set(e, 1);
  }
  RemovePreloadResource(e) {
    if (!this.PreloadAssetMap.has(e)) return !1;
    let t = this.PreloadAssetMap.get(e);
    return (
      0 < t && (t--, this.PreloadAssetMap.set(e, t)),
      0 === t && this.PreloadAssetMap.delete(e),
      !0
    );
  }
  ClearPreloadResource() {
    this.PreloadAssetMap.clear(),
      this.REr.Clear(),
      this.LoadingNeedWaitEntitySet.clear();
  }
  AddEntityAsset(e, t) {
    return (
      !this.AllEntityAssetMap.has(e) && (this.AllEntityAssetMap.set(e, t), !0)
    );
  }
  HasEntityAsset(e) {
    return this.AllEntityAssetMap.has(e);
  }
  GetEntityAssetElement(e) {
    return this.AllEntityAssetMap.get(e);
  }
  RemoveEntityAsset(e) {
    return this.AllEntityAssetMap.delete(e);
  }
  ClearEntityAsset() {
    this.AllEntityAssetMap.clear();
  }
  AddNeedWaitEntity(e) {
    this.LoadingNeedWaitEntitySet.add(e);
  }
  RemoveNeedWaitEntity(e) {
    this.LoadingNeedWaitEntitySet.delete(e);
  }
  AddCommonSkill(e, t, r) {
    return this.PEr.has(e)
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Preload", 4, "[预加载] 重复添加技能", [
            "SkillId",
            e,
          ]),
        !1)
      : (this.PEr.set(e, [t, r]), !0);
  }
  IsCommonSkill(e) {
    return this.PEr.has(e);
  }
  GetCommonSkill(e) {
    return this.PEr.get(e);
  }
}
exports.PreloadModelNew = PreloadModelNew;
//# sourceMappingURL=PreloadModelNew.js.map
