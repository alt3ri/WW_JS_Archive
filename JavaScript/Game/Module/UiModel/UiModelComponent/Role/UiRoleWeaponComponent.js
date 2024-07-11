"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    var s,
      n = arguments.length,
      r =
        n < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, i, o);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (s = e[h]) && (r = (n < 3 ? s(r) : 3 < n ? s(t, i, r) : s(t, i)) || r);
    return 3 < n && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiRoleWeaponComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SkeletalObserverManager_1 = require("../../../SkeletalObserver/SkeletalObserverManager"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelUtil_1 = require("../../UiModelUtil"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleWeaponComponent = class UiRoleWeaponComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.Qwr = void 0),
      (this.GBr = void 0),
      (this.nXt = void 0),
      (this.SBr = void 0),
      (this.QBr = void 0),
      (this.XBr = new Array()),
      (this.$Br = 0),
      (this.YBr = new Array()),
      (this.JBr = new Array()),
      (this.Jwr = (e) => {
        this.SetDitherEffect(e);
      }),
      (this.OnRoleIdChange = () => {
        this.RefreshWeaponCase(), this.HideAllWeapon();
        var e = this.GBr.RoleDataId,
          t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
        t &&
          (t.IsTrialRole()
            ? ((t =
                ModelManager_1.ModelManager.RoleModel.GetRoleRobotData(
                  e,
                ).GetWeaponData()),
              this.SetWeaponByWeaponData(t))
            : ((t =
                ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
                  e,
                )),
              this.SetWeaponByWeaponData(t)));
      }),
      (this.OnRoleMeshLoadComplete = () => {
        this.zBr();
      }),
      (this.OnAnsBegin = (e) => {
        var t = e.Index;
        this.ShowWeaponByIndex(t, e.ShowMaterialController),
          e.Transform && this.SetWeaponTransformByIndex(t, e.Transform);
      }),
      (this.OnAnsEnd = (e) => {
        this.HideWeaponByIndex(e.Index, e.HideEffect);
      });
  }
  OnInit() {
    (this.GBr = this.Owner.CheckGetComponent(11)),
      (this.Qwr = this.Owner.CheckGetComponent(0)),
      (this.nXt = this.Owner.CheckGetComponent(1)),
      (this.SBr = this.Owner.CheckGetComponent(6));
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.OnRoleMeshLoadComplete,
    ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelRoleDataIdChange,
        this.OnRoleIdChange,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelSetDitherEffect,
        this.Jwr,
      ),
      this.SBr?.RegisterAnsTrigger(
        "UiWeaponAnsContext",
        this.OnAnsBegin,
        this.OnAnsEnd,
      );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.OnRoleMeshLoadComplete,
    ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelRoleDataIdChange,
        this.OnRoleIdChange,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelSetDitherEffect,
        this.Jwr,
      );
    for (const e of this.XBr)
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        e,
      );
  }
  Refresh() {
    var t = this.QBr.GetItemConfig().Models;
    this.$Br = t.length;
    for (let e = this.XBr.length; e < this.$Br; e++) {
      var i =
        SkeletalObserverManager_1.SkeletalObserverManager.NewSkeletalObserver(
          2,
        );
      this.XBr.push(i), this.JBr.push(0), this.HideWeaponByIndex(e);
    }
    for (let e = 0; e < this.$Br; e++) {
      var o = this.XBr[e].Model;
      o.CheckGetComponent(18)?.SetWeaponData(this.QBr),
        o.CheckGetComponent(2)?.LoadModelByModelId(t[e]);
    }
  }
  ShowAllWeapon(t = !1) {
    for (let e = 0; e < this.XBr.length; e++) this.ShowWeaponByIndex(e, t);
  }
  HideAllWeapon(t = !1) {
    for (let e = 0; e < this.XBr.length; e++) this.HideWeaponByIndex(e, t);
  }
  ShowWeaponByIndex(e, t = !1) {
    var i, o;
    e < 0 || e >= this.XBr.length
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Weapon", 44, "显示武器索引错误", ["index", e])
      : (o = (i = this.XBr[e].Model).CheckGetComponent(0))?.GetVisible() ||
        ((this.JBr[e] = 2),
        o?.SetVisible(!0),
        t &&
          UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
            i,
            "ChangeWeaponMaterialController",
          ));
  }
  HideWeaponByIndex(e, t = !1) {
    var i, o;
    e < 0 || e >= this.XBr.length
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Weapon", 44, "隐藏武器索引错误", ["index", e])
      : (o = (i = this.XBr[e].Model).CheckGetComponent(0))?.GetVisible() &&
        ((this.JBr[e] = 1), o?.SetVisible(!1), t) &&
        UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(i, "ShowHideWeaponEffect");
  }
  RefreshWeaponCase() {
    var e = this.GBr.RoleConfigId,
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e),
      e = ModelUtil_1.ModelUtil.GetModelConfig(e.UiMeshId);
    if (e) {
      var t = e.BattleSockets;
      for (let e = (this.YBr.length = 0); e < t.Num(); e++) {
        var i = t.Get(e);
        this.YBr.push(i);
      }
    }
  }
  RefreshWeaponDa() {
    var e = this.QBr.GetBreachLevel();
    for (const t of this.XBr)
      t.Model?.CheckGetComponent(19)?.RefreshWeaponBreachDa(e);
  }
  zBr() {
    if (2 === this.Qwr.GetModelLoadState()) {
      var t = this.nXt.MainMeshComponent;
      for (let e = 0; e < this.$Br; e++) {
        var i = this.XBr[e],
          o = FNameUtil_1.FNameUtil.GetDynamicFName(this.YBr[e]),
          i = i.Model?.CheckGetComponent(1);
        i?.Actor?.K2_AttachToComponent(t, o, 0, 0, 0, !1),
          i?.Actor?.K2_SetActorRelativeTransform(
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
            void 0,
            !1,
          );
      }
    }
  }
  SetWeaponByWeaponData(e) {
    e && ((this.QBr = e), this.Refresh());
  }
  HasWeapon() {
    return void 0 !== this.QBr;
  }
  SetWeaponTransformByIndex(e, t) {
    e < 0 || e >= this.XBr.length
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Weapon", 44, "设置武器偏移索引错误", ["index", e])
      : this.XBr[e].Model?.CheckGetComponent(
          1,
        )?.MainMeshComponent?.K2_SetRelativeTransform(t, !1, void 0, !1);
  }
  SetDitherEffect(e) {
    for (const t of this.XBr) t.Model?.CheckGetComponent(0)?.SetDitherEffect(e);
  }
  GetWeaponCount() {
    return this.$Br;
  }
  OnRoleActiveChange() {
    this.nXt.Actor.bHidden && this.HideAllWeapon();
  }
};
(UiRoleWeaponComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(14)],
  UiRoleWeaponComponent,
)),
  (exports.UiRoleWeaponComponent = UiRoleWeaponComponent);
//# sourceMappingURL=UiRoleWeaponComponent.js.map
