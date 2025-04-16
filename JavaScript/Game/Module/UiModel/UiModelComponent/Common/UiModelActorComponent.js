"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, s) {
    var o,
      h = arguments.length,
      n =
        h < 3
          ? t
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(t, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, t, i, s);
    else
      for (var r = e.length - 1; 0 <= r; r--)
        (o = e[r]) && (n = (h < 3 ? o(n) : 3 < h ? o(t, i, n) : o(t, i)) || n);
    return 3 < h && n && Object.defineProperty(t, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelActorComponent = void 0);
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
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
      (this.D_r = void 0),
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
      ((this.ywr = this.Owner.CheckGetComponent(0)),
      (this.D_r = this.Owner.GetComponent(4)),
      this.ywr.ModelActorType)
    ) {
      case 1:
      case 0:
        this.CharRenderingComponent = this.Rwr(5);
        break;
      case 2:
        this.CharRenderingComponent = this.Rwr(7);
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
      this.Lwr(e, this.ywr.GetVisible()),
      Info_1.Info.IsPlayInEditor &&
        UE.LGUIBPLibrary.AddInstanceComponent(this.Actor, e),
      e
    );
  }
  Rwr(e) {
    var t = this.Actor.AddComponentByClass(
      UE.CharRenderingComponent_C.StaticClass(),
      !1,
      MathUtils_1.MathUtils.DefaultTransform,
      !1,
    );
    return t.Init(e), t.SetTickableWhenPaused(!0), t;
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
        break;
      case 4:
        this.CharRenderingComponent.AddComponent(
          "CharacterMesh0",
          this.MainMeshComponent,
        );
        break;
      case 5:
        this.CharRenderingComponent.AddComponentByCase(
          7,
          this.MainMeshComponent,
        );
    }
  }
  ChangeMesh(e, t, i, s = 0) {
    switch (this.ywr.ModelType) {
      case 0:
        this.Pwr(e, t, i, s);
        break;
      case 2:
        this.xwr(e, t, i, s);
        break;
      case 1:
      case 3:
      case 4:
      case 5:
        this.xwr(e, t, void 0, s);
    }
  }
  xwr(e, t, i, s = 0) {
    this.CharRenderingComponent?.ResetAllRenderingState(),
      this.wwr(),
      this.D_r?.DestroyAllEffect();
    var o = this.MainMeshComponent,
      h = o?.GetAnimInstance(),
      h = (h && UE.KuroAnimLibrary.EndAnimNotifyStates(h), this.Uwr());
    if (
      (this.WR1(h, e, s),
      h?.SetAnimClass(t),
      (this.MainMeshComponent = h),
      o && this.Bwr(o),
      i && 0 < i.length)
    )
      for (const n of i) this.bwr(n);
    this.Awr();
  }
  WR1(e, t, i = 0) {
    e.SetSkeletalMesh(t), e.SetForcedLOD(i);
  }
  Pwr(i, e, s, o = 0) {
    if (0 !== this.ywr?.ModelActorType)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 43, "actor类型必须为TsUiSceneRoleActor");
    else {
      this.CharRenderingComponent.ResetAllRenderingState(),
        this.wwr(),
        this.D_r?.DestroyAllEffect();
      var h = this.MainMeshComponent;
      let t = void 0;
      h &&
        0 === h.GetAnimationMode() &&
        (t = this.GetAnimInstanceFromSkeletalMesh(h)) &&
        UE.KuroAnimLibrary.EndAnimNotifyStates(t);
      var n = this.Uwr(),
        i =
          (this.WR1(n, i, o),
          n?.SetAnimClass(e),
          this.GetAnimInstanceFromSkeletalMesh(n));
      if (t) {
        let e = !1;
        o = t.StateInternal;
        (e = o && ((13 <= o && o <= 15) || 7 === o) ? !0 : e) &&
          i &&
          i.SyncAnimInstance(t);
      }
      if (((this.MainMeshComponent = n), h && this.Bwr(h), s && 0 < s.length))
        for (const r of s) this.bwr(r);
      this.Awr();
    }
  }
  bwr(e) {
    this.ChildMeshComponentList || (this.ChildMeshComponentList = []);
    var t = this.Uwr(),
      e =
        (this.WR1(t, e),
        t.SetMasterPoseComponent(this.MainMeshComponent),
        this.ChildMeshComponentList.push(t),
        this.ChildMeshComponentList.length - 1);
    return this.CharRenderingComponent.AddComponent("OtherCase" + e, t), t;
  }
  wwr() {
    if (this.ChildMeshComponentList) {
      for (const e of this.ChildMeshComponentList) this.Bwr(e);
      this.ChildMeshComponentList.length = 0;
    }
  }
  Bwr(e) {
    e.K2_DestroyComponent(this.Actor),
      Info_1.Info.IsPlayInEditor &&
        UE.LGUIBPLibrary.RemoveInstanceComponent(this.Actor, e);
  }
  SetTransformByTag(e) {
    var t = UE.KuroCollectActorComponent.GetActorWithTag(
      FNameUtil_1.FNameUtil.GetDynamicFName(e),
      1,
    );
    t
      ? this.Actor.D_K2_SetActorTransform(t.D_GetTransform(), !1, void 0, !1)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("UiSceneRoleActor", 43, "查找不到标签对象", [
          "标签Tag",
          e,
        ]);
  }
  SetAllMeshComponentRelativeTransform(e, t = !1, i, s = !1) {
    if (
      (this.MainMeshComponent?.K2_SetRelativeTransform(e, t, i, s),
      this.ChildMeshComponentList && 0 !== this.ChildMeshComponentList.length)
    )
      for (const o of this.ChildMeshComponentList)
        o.K2_SetRelativeTransform(e, t, i, s);
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
                  43,
                  "Ui场景以下网格体动画蓝图 LinkedAnimGraph节点父类配置错误，应该为ABP_Performance_{角色}",
                  ["Mesh:", e.SkeletalMesh.GetName()],
                )
              );
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiComponent",
            43,
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
            43,
            "Ui场景以下网格体动画状态机ABP_Performance_{角色}_PC需要重新生成",
            ["Mesh:", e.SkeletalMesh.GetName()],
          );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiComponent",
          43,
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
  GetDangoAnimInstanceFromSkeletalMesh(e) {
    var t = e.GetAnimInstance();
    if (t) return t;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("UiComponent", 58, "Ui团子获取网格体AnimInstance失败", [
        "Mesh:",
        e.SkeletalMesh?.GetName(),
      ]);
  }
};
(UiModelActorComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(1)],
  UiModelActorComponent,
)),
  (exports.UiModelActorComponent = UiModelActorComponent);
//# sourceMappingURL=UiModelActorComponent.js.map
