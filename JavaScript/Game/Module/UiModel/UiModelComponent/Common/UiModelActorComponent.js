"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, s) {
    let o;
    const n = arguments.length;
    let r =
      n < 3 ? t : s === null ? (s = Object.getOwnPropertyDescriptor(t, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(e, t, i, s);
    else
      for (let h = e.length - 1; h >= 0; h--)
        (o = e[h]) && (r = (n < 3 ? o(r) : n > 3 ? o(t, i, r) : o(t, i)) || r);
    return n > 3 && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelActorComponent = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const CharacterNameDefines_1 = require("../../../../NewWorld/Character/Common/CharacterNameDefines");
const RoleDefine_1 = require("../../../RoleUi/RoleDefine");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelActorComponent = class UiModelActorComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.Actor = void 0),
      (this.MainMeshComponent = void 0),
      (this.ChildMeshComponentList = void 0),
      (this.CharRenderingComponent = void 0),
      (this.Qwr = void 0),
      (this.Xwr = void 0),
      (this.$wr = (e) => {
        let t;
        if (
          (this.MainMeshComponent &&
            (this.Ywr(this.MainMeshComponent, e),
            e ||
              ((t = this.MainMeshComponent.GetAnimInstance()),
              UE.KuroAnimLibrary.EndAnimNotifyStates(t))),
          this.ChildMeshComponentList && this.ChildMeshComponentList.length > 0)
        )
          for (const i of this.ChildMeshComponentList) this.Ywr(i, e);
      }),
      (this.Jwr = (e) => {
        this.CharRenderingComponent?.SetDitherEffect(e, 0);
      });
  }
  OnInit() {
    switch (
      ((this.Qwr = this.Owner.CheckGetComponent(0)), this.Qwr.ModelActorType)
    ) {
      case 1:
      case 0:
        this.CharRenderingComponent = this.zwr();
    }
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelVisibleChange,
      this.$wr,
    ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelSetDitherEffect,
        this.Jwr,
      );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelVisibleChange,
      this.$wr,
    ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelSetDitherEffect,
        this.Jwr,
      );
  }
  Zwr() {
    const e = this.Actor.AddComponentByClass(
      UE.SkeletalMeshComponent.StaticClass(),
      !1,
      MathUtils_1.MathUtils.DefaultTransform,
      !1,
    );
    return (
      e.SetTickableWhenPaused(!0),
      e.SetForcedLOD(1),
      this.Ywr(e, this.Qwr.GetVisible()),
      e
    );
  }
  zwr() {
    const e = this.Actor.AddComponentByClass(
      UE.CharRenderingComponent_C.StaticClass(),
      !1,
      MathUtils_1.MathUtils.DefaultTransform,
      !1,
    );
    return e.Init(5), e.SetTickableWhenPaused(!0), e;
  }
  eBr() {
    switch (this.Qwr.ModelType) {
      case 1:
        this.CharRenderingComponent.AddComponent(
          "WeaponCase0",
          this.MainMeshComponent,
        );
        break;
      case 0:
      case 2:
        this.CharRenderingComponent.AddComponent(
          "CharacterMesh0",
          this.MainMeshComponent,
        );
        break;
      case 3:
        this.CharRenderingComponent.AddComponent(
          "HuluCase",
          this.MainMeshComponent,
        );
    }
  }
  ChangeMesh(e, t, i) {
    switch (this.Qwr.ModelType) {
      case 0:
        this.tBr(e, t, i);
        break;
      case 1:
      case 2:
      case 3:
        this.iBr(e, t);
    }
  }
  iBr(e, t) {
    this.CharRenderingComponent.ResetAllRenderingState(), this.oBr();
    const i = this.MainMeshComponent;
    var s = i?.GetAnimInstance();
    var s = (s && UE.KuroAnimLibrary.EndAnimNotifyStates(s), this.Zwr());
    s?.SetSkeletalMesh(e),
      s?.SetAnimClass(t),
      (this.MainMeshComponent = s),
      i && this.rBr(i),
      this.eBr();
  }
  tBr(i, s, e) {
    if (this.Qwr?.ModelActorType !== 0)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 44, "actor类型必须为TsUiSceneRoleActor");
    else {
      this.CharRenderingComponent.ResetAllRenderingState(), this.oBr();
      const o = this.MainMeshComponent;
      let t = void 0;
      o &&
        (t = this.GetAnimInstanceFromSkeletalMesh(o)) &&
        UE.KuroAnimLibrary.EndAnimNotifyStates(t);
      const n = this.Zwr();
      var i =
        (n?.SetSkeletalMesh(i),
        n?.SetAnimClass(s),
        this.GetAnimInstanceFromSkeletalMesh(n));
      if (t) {
        let e = !1;
        s = t.StateInternal;
        (e = s && ((s >= 13 && s <= 15) || s === 7) ? !0 : e) &&
          i &&
          i.SyncAnimInstance(t);
      }
      if (((this.MainMeshComponent = n), o && this.rBr(o), e && e.length > 0))
        for (const r of e) this.nBr(r);
      this.eBr();
    }
  }
  nBr(e) {
    this.ChildMeshComponentList || (this.ChildMeshComponentList = []);
    const t = this.Zwr();
    var e =
      (t.SetSkeletalMesh(e),
      t.SetMasterPoseComponent(this.MainMeshComponent),
      this.ChildMeshComponentList.push(t),
      this.ChildMeshComponentList.length - 1);
    return this.CharRenderingComponent.AddComponent("OtherCase" + e, t), t;
  }
  oBr() {
    if (this.ChildMeshComponentList)
      for (const e of this.ChildMeshComponentList) this.rBr(e);
  }
  rBr(e) {
    e.K2_DestroyComponent(this.Actor);
  }
  SetTransformByTag(e) {
    const t = UE.KuroCollectActorComponent.GetActorWithTag(
      FNameUtil_1.FNameUtil.GetDynamicFName(e),
      1,
    );
    t
      ? this.Actor.K2_SetActorTransform(t.GetTransform(), !1, void 0, !1)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiSceneRoleActor", 44, "查找不到标签对象", [
          "标签Tag",
          e,
        ]);
  }
  GetAnimInstanceFromSkeletalMesh(e) {
    let t = e.GetAnimInstance();
    if (t) {
      t = t.GetLinkedAnimGraphInstanceByTag(
        CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
      );
      if (t) {
        if (
          this.Xwr ||
          ((this.Xwr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            RoleDefine_1.UI_ABP_PATH,
            UE.Class,
          )),
          this.Xwr)
        )
          return t.IsA(this.Xwr)
            ? t
            : void (
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "UiComponent",
                  44,
                  "Ui场景以下网格体动画蓝图 LinkedAnimGraph节点父类配置错误，应该为ABP_Performance_{角色}",
                  ["Mesh:", e.SkeletalMesh.GetName()],
                )
              );
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiComponent",
            44,
            "Ui场景 基本路径网格体动画蓝图错误",
            [
              "现错误Path:",
              "/Game/Aki/Character/Role/Common/ABP_PerformanceRole.ABP_PerformanceRole_C",
            ],
          );
      } else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "UiComponent",
            44,
            "Ui场景以下网格体动画状态机ABP_Performance_{角色}_PC需要重新生成",
            ["Mesh:", e.SkeletalMesh.GetName()],
          );
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "UiComponent",
          44,
          "Ui场景以下网格体AnimInstance获取失败",
          ["Mesh:", e.SkeletalMesh?.GetName()],
        );
  }
  Ywr(e, t) {
    e.SetHiddenInGame(!t),
      e.SetComponentTickEnabled(t),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Character",
          44,
          "Mesh显隐",
          ["MeshName", e.GetName()],
          ["enable", t],
        );
  }
};
(UiModelActorComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(1)],
  UiModelActorComponent,
)),
  (exports.UiModelActorComponent = UiModelActorComponent);
// # sourceMappingURL=UiModelActorComponent.js.map
