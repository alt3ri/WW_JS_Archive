"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PreloadModelNew = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  PbDataPreloadAll_1 = require("../../../Core/Define/ConfigQuery/PbDataPreloadAll"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  PreCreateEffect_1 = require("../../Effect/PreCreateEffect"),
  GlobalData_1 = require("../../GlobalData"),
  PreloadDefine_1 = require("../../Preload/PreloadDefine");
class PreloadModelNew extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
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
      this.SFa(),
      !0
    );
  }
  SFa() {
    for (const t of PbDataPreloadAll_1.configPbDataPreloadAll.GetConfigList())
      this.PbDataPreloadDataMap.has(t.MapId) ||
        this.PbDataPreloadDataMap.set(t.MapId, new Map()),
        this.PbDataPreloadDataMap.get(t.MapId)?.set(t.PbDataId, t);
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
  AddPreloadResource(t) {
    var e;
    this.PreloadAssetMap.has(t)
      ? ((e = this.PreloadAssetMap.get(t)), this.PreloadAssetMap.set(t, e + 1))
      : this.PreloadAssetMap.set(t, 1);
  }
  RemovePreloadResource(t) {
    if (!this.PreloadAssetMap.has(t)) return !1;
    let e = this.PreloadAssetMap.get(t);
    return (
      0 < e && (e--, this.PreloadAssetMap.set(t, e)),
      0 === e && this.PreloadAssetMap.delete(t),
      !0
    );
  }
  ClearPreloadResource() {
    this.PreloadAssetMap.clear(),
      this.REr.Clear(),
      this.LoadingNeedWaitEntitySet.clear();
  }
  AddEntityAsset(t, e) {
    return (
      !this.AllEntityAssetMap.has(t) && (this.AllEntityAssetMap.set(t, e), !0)
    );
  }
  HasEntityAsset(t) {
    return this.AllEntityAssetMap.has(t);
  }
  GetEntityAssetElement(t) {
    return this.AllEntityAssetMap.get(t);
  }
  RemoveEntityAsset(t) {
    return this.AllEntityAssetMap.delete(t);
  }
  ClearEntityAsset() {
    this.AllEntityAssetMap.clear();
  }
  AddNeedWaitEntity(t) {
    this.LoadingNeedWaitEntitySet.add(t);
  }
  RemoveNeedWaitEntity(t) {
    this.LoadingNeedWaitEntitySet.delete(t);
  }
  AddCommonSkill(t, e, i) {
    return this.PEr.has(t)
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Preload", 4, "[预加载] 重复添加技能", [
            "SkillId",
            t,
          ]),
        !1)
      : (this.PEr.set(t, [e, i]), !0);
  }
  IsCommonSkill(t) {
    return this.PEr.has(t);
  }
  GetCommonSkill(t) {
    return this.PEr.get(t);
  }
}
exports.PreloadModelNew = PreloadModelNew;
//# sourceMappingURL=PreloadModelNew.js.map
