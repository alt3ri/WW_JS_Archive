"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, s) {
    var o,
      n = arguments.length,
      r =
        n < 3
          ? t
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(t, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, i, s);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (o = e[h]) && (r = (n < 3 ? o(r) : 3 < n ? o(t, i, r) : o(t, i)) || r);
    return 3 < n && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelActorComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  CharacterNameDefines_1 = require("../../../../NewWorld/Character/Common/CharacterNameDefines"),
  RoleDefine_1 = require("../../../RoleUi/RoleDefine"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelActorComponent = class UiModelActorComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.Actor = void 0),
      (this.MainMeshComponent = void 0),
      (this.ChildMeshComponentList = void 0),
      (this.CharRenderingComponent = void 0),
      (this.ywr = void 0),
      (this.Iwr = void 0),
      (this.Twr = (e) => {
        var t;
        if (
          (this.MainMeshComponent &&
            (this.Lwr(this.MainMeshComponent, e),
            e ||
              ((t = this.MainMeshComponent.GetAnimInstance()),
              UE.KuroAnimLibrary.EndAnimNotifyStates(t))),
          this.ChildMeshComponentList && 0 < this.ChildMeshComponentList.length)
        )
          for (const i of this.ChildMeshComponentList) this.Lwr(i, e);
      }),
      (this.Dwr = (e) => {
        this.CharRenderingComponent?.SetDitherEffect(e, 0);
      });
  }
  OnInit() {
    switch (
      ((this.ywr = this.Owner.CheckGetComponent(0)), this.ywr.ModelActorType)
    ) {
      case 1:
      case 0:
        this.CharRenderingComponent = this.Rwr();
    }
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelVisibleChange,
      this.Twr,
    ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelSetDitherEffect,
        this.Dwr,
      );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelVisibleChange,
      this.Twr,
    ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelSetDitherEffect,
        this.Dwr,
      );
  }
  Uwr() {
    var e = this.Actor.AddComponentByClass(
      UE.SkeletalMeshComponent.StaticClass(),
      !1,
      MathUtils_1.MathUtils.DefaultTransform,
      !1,
    );
    return (
      e.SetTickableWhenPaused(!0),
      e.SetForcedLOD(1),
      this.Lwr(e, this.ywr.GetVisible()),
      e
    );
  }
  Rwr() {
    var e = this.Actor.AddComponentByClass(
      UE.CharRenderingComponent_C.StaticClass(),
      !1,
      MathUtils_1.MathUtils.DefaultTransform,
      !1,
    );
    return e.Init(5), e.SetTickableWhenPaused(!0), e;
  }
  Awr() {
    switch (this.ywr.ModelType) {
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
    switch (this.ywr.ModelType) {
      case 0:
        this.Pwr(e, t, i);
        break;
      case 1:
      case 2:
      case 3:
        this.xwr(e, t);
    }
  }
  xwr(e, t) {
    this.CharRenderingComponent.ResetAllRenderingState(), this.wwr();
    var i = this.MainMeshComponent,
      s = i?.GetAnimInstance(),
      s = (s && UE.KuroAnimLibrary.EndAnimNotifyStates(s), this.Uwr());
    s?.SetSkeletalMesh(e),
      s?.SetAnimClass(t),
      (this.MainMeshComponent = s),
      i && this.Bwr(i),
      this.Awr();
  }
  Pwr(i, s, e) {
    if (0 !== this.ywr?.ModelActorType)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 44, "actor类型必须为TsUiSceneRoleActor");
    else {
      this.CharRenderingComponent.ResetAllRenderingState(), this.wwr();
      var o = this.MainMeshComponent;
      let t = void 0;
      o &&
        (t = this.GetAnimInstanceFromSkeletalMesh(o)) &&
        UE.KuroAnimLibrary.EndAnimNotifyStates(t);
      var n = this.Uwr(),
        i =
          (n?.SetSkeletalMesh(i),
          n?.SetAnimClass(s),
          this.GetAnimInstanceFromSkeletalMesh(n));
      if (t) {
        let e = !1;
        s = t.StateInternal;
        (e = s && ((13 <= s && s <= 15) || 7 === s) ? !0 : e) &&
          i &&
          i.SyncAnimInstance(t);
      }
      if (((this.MainMeshComponent = n), o && this.Bwr(o), e && 0 < e.length))
        for (const r of e) this.bwr(r);
      this.Awr();
    }
  }
  bwr(e) {
    this.ChildMeshComponentList || (this.ChildMeshComponentList = []);
    var t = this.Uwr(),
      e =
        (t.SetSkeletalMesh(e),
        t.SetMasterPoseComponent(this.MainMeshComponent),
        this.ChildMeshComponentList.push(t),
        this.ChildMeshComponentList.length - 1);
    return this.CharRenderingComponent.AddComponent("OtherCase" + e, t), t;
  }
  wwr() {
    if (this.ChildMeshComponentList)
      for (const e of this.ChildMeshComponentList) this.Bwr(e);
  }
  Bwr(e) {
    e.K2_DestroyComponent(this.Actor);
  }
  SetTransformByTag(e) {
    var t = UE.KuroCollectActorComponent.GetActorWithTag(
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
    var t = e.GetAnimInstance();
    if (t) {
      t = t.GetLinkedAnimGraphInstanceByTag(
        CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
      );
      if (t) {
        if (
          this.Iwr ||
          ((this.Iwr = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            RoleDefine_1.UI_ABP_PATH,
            UE.Class,
          )),
          this.Iwr)
        )
          return t.IsA(this.Iwr)
            ? t
            : void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "UiComponent",
                  44,
                  "Ui场景以下网格体动画蓝图 LinkedAnimGraph节点父类配置错误，应该为ABP_Performance_{角色}",
                  ["Mesh:", e.SkeletalMesh.GetName()],
                )
              );
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiComponent",
            44,
            "Ui场景 基本路径网格体动画蓝图错误",
            [
              "现错误Path:",
              "/Game/Aki/Character/Role/Common/ABP_PerformanceRole.ABP_PerformanceRole_C",
            ],
          );
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiComponent",
            44,
            "Ui场景以下网格体动画状态机ABP_Performance_{角色}_PC需要重新生成",
            ["Mesh:", e.SkeletalMesh.GetName()],
          );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiComponent",
          44,
          "Ui场景以下网格体AnimInstance获取失败",
          ["Mesh:", e.SkeletalMesh?.GetName()],
        );
  }
  Lwr(e, t) {
    e.SetHiddenInGame(!t), e.SetComponentTickEnabled(t);
  }
  GetActor() {
    return this.Actor;
  }
};
(UiModelActorComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(1)],
  UiModelActorComponent,
)),
  (exports.UiModelActorComponent = UiModelActorComponent);
//# sourceMappingURL=UiModelActorComponent.js.map
