"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharMaterialController = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
const CharRuntimeMaterialControllerInfo_1 = require("./CharRuntimeMaterialControllerInfo");
class CharMaterialController extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments),
      (this.MaterialContainer = void 0),
      (this.AllMaterialControlRuntimeDataMap = void 0),
      (this.xhr = 0),
      (this.war = new Array()),
      (this.ihr = ""),
      (this.EnableDebug = !1),
      (this.DebugInfo = void 0),
      (this.whr = void 0);
  }
  PrintCurrentInfo() {
    let t = "";
    for (const e of this.AllMaterialControlRuntimeDataMap.values())
      t += "[" + e.DataCache.Data.GetName() + "]   ";
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "RenderCharacter",
        41,
        "",
        ["当前存在的角色特效DA", t],
        ["Actor", this.ihr],
      );
  }
  Start() {
    super.Start(),
      (this.war.length = 0),
      (this.xhr = 0),
      (this.EnableDebug = !1),
      (this.DebugInfo = new UE.PD_MaterialDebug_C()),
      (this.AllMaterialControlRuntimeDataMap = new Map()),
      (this.ihr = this.GetRenderingComponent().GetOwner().GetName());
    const t = this.RenderComponent.GetComponent(
      RenderConfig_1.RenderConfig.IdMaterialContainer,
    );
    void 0 === t
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "RenderCharacter",
          14,
          "材质控制器初始化失败，不存在CharMaterialContainer",
          ["Actor", this.ihr],
        )
      : ((this.MaterialContainer = t),
        this.ihr,
        (this.whr = void 0),
        this.OnInitSuccess());
  }
  GetRuntimeMaterialControllerInfo(t) {
    return this.AllMaterialControlRuntimeDataMap.get(t);
  }
  Update() {
    const t = this.GetDeltaTime();
    for (const r of this.AllMaterialControlRuntimeDataMap.values()) {
      const e = this.GetRenderingComponent().GetTimeDilation();
      r.UpdateState(t, e),
        r.UpdateEffect(this.MaterialContainer),
        r.IsDead && this.war.push(r.Id);
    }
    if (this.EnableDebug && this.DebugInfo) {
      this.DebugInfo.MaterialControllerList.Empty();
      for (const o of this.AllMaterialControlRuntimeDataMap)
        this.DebugInfo.MaterialControllerList.Set(
          o[0],
          o[1].DataCache.DataName,
        );
    }
    if (this.war.length > 0) {
      for (const i of this.war)
        this.AllMaterialControlRuntimeDataMap.get(i).Destroy(),
          this.AllMaterialControlRuntimeDataMap.delete(i),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.RenderComponent,
            EventDefine_1.EEventName.OnRemoveMaterialController,
            i,
          );
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderCharacter",
          14,
          "自动移除材质控制器",
          ["Actor", this.ihr],
          ["handle array", this.war.join()],
        ),
        (this.war.length = 0);
    }
  }
  SetEffectProgress(t, e) {
    e = this.AllMaterialControlRuntimeDataMap.get(e);
    e && e.SetProgress(t);
  }
  Destroy() {
    for (const t of this.AllMaterialControlRuntimeDataMap.values()) t.Destroy();
    this.AllMaterialControlRuntimeDataMap = new Map();
  }
  RemoveSkeletalMeshMaterialControllerData(t) {
    for (const e of this.AllMaterialControlRuntimeDataMap.values())
      e.SpecifiedMaterialIndexMap?.delete(t),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "RenderCharacter",
            26,
            "移除材质控制器部件",
            ["SkelName", t],
            ["handleId", e.Id],
          );
  }
  RemoveAllMaterialControllerData() {
    this.AllMaterialControlRuntimeDataMap.size > 0 &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("RenderCharacter", 41, "移除全部材质控制器", [
        "Actor",
        this.GetRenderingComponent().GetOwner().GetName(),
      ]);
    for (const t of this.AllMaterialControlRuntimeDataMap.values())
      (t.IsDead = !0), t.UpdateEffect(this.MaterialContainer), t.Destroy();
    this.AllMaterialControlRuntimeDataMap.clear();
  }
  RemoveMaterialControllerData(t) {
    let e;
    const r = this.AllMaterialControlRuntimeDataMap.get(t);
    return (
      !!r &&
      ((e = this.GetRenderingComponent().GetOwner().GetName()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderCharacter",
          14,
          "手动移除材质控制器",
          ["Actor", e],
          ["材质控制器", r.DataCache.DataName],
          ["handle", t],
        ),
      (r.IsDead = !0),
      r.UpdateEffect(this.MaterialContainer),
      r.Destroy(),
      this.AllMaterialControlRuntimeDataMap.delete(t),
      !0)
    );
  }
  RemoveMaterialControllerDataWithEnding(t) {
    let e;
    const r = this.AllMaterialControlRuntimeDataMap.get(t);
    return (
      !!r &&
      ((e = this.GetRenderingComponent().GetOwner().GetName()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderCharacter",
          14,
          "移除材质控制器WithEnding",
          ["Actor", e],
          ["材质控制器", r.DataCache.DataName],
          ["handle", t],
        ),
      r.SetReadyToDie(),
      !0)
    );
  }
  AddMaterialControllerData(t, e) {
    if (!t)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderCharacter", 14, "添加的材质控制器数据为空", [
            "Actor",
            this.GetRenderingComponent().GetOwner().GetName(),
          ]),
        -1
      );
    this.AllMaterialControlRuntimeDataMap.keys.length >
      RenderConfig_1.RenderConfig.RefErrorCount &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "RenderCharacter",
        14,
        "材质控制器添加失败，超过单个角色的材质控制器队列数量，检查是否进行了材质控制器移除和材质控制器特效的持续时间",
        ["Actor", this.GetRenderingComponent().GetOwner().GetName()],
        ["添加的材质控制器名称", t.GetName()],
      ),
      this.xhr++;
    const r = this.xhr;
    const o =
      new CharRuntimeMaterialControllerInfo_1.CharMaterialControlRuntimeData();
    return (
      o.Init(r, t, e),
      o.SetSpecifiedMaterialIndex(this.MaterialContainer),
      this.AllMaterialControlRuntimeDataMap.set(r, o),
      this.RenderComponent.MarkForceUpdateOnce(),
      r
    );
  }
  AddMaterialControllerDataDestroyCallback(t, e) {
    let r;
    var t = this.AllMaterialControlRuntimeDataMap.get(t);
    return (
      !!t &&
      ((r = this.GetRenderingComponent().GetOwner().GetName()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderCharacter",
          41,
          "添加材质控制器DestroyCallback",
          ["Actor", r],
          ["材质控制器", t.DataCache.DataName],
        ),
      t.AddDestroyCallback(e))
    );
  }
  RemoveMaterialControllerDataDestroyCallback(t, e) {
    let r;
    var t = this.AllMaterialControlRuntimeDataMap.get(t);
    return (
      !!t &&
      ((r = this.GetRenderingComponent().GetOwner().GetName()),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "RenderCharacter",
          41,
          "移除材质控制器DestroyCallback",
          ["Actor", r],
          ["材质控制器", t.DataCache.DataName],
        ),
      t.RemoveDestroyCallback(e))
    );
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdMaterialController;
  }
  GetStatName() {
    return "CharMaterialController";
  }
}
exports.CharMaterialController = CharMaterialController;
// # sourceMappingURL=CharMaterialController.js.map
