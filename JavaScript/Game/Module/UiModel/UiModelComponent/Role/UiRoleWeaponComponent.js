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
      for (var a = e.length - 1; 0 <= a; a--)
        (o = e[a]) && (r = (n < 3 ? o(r) : 3 < n ? o(t, i, r) : o(t, i)) || r);
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
  WeaponSkinDefine_1 = require("../../../Skin/Tab/Weapon/WeaponSkinDefine"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelUtil_1 = require("../../UiModelUtil"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleWeaponComponent = class UiRoleWeaponComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.ywr = void 0),
      (this.mBr = void 0),
      (this.n$t = void 0),
      (this.Jwr = void 0),
      (this.yBr = void 0),
      (this.nxl = WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID),
      (this.IBr = new Array()),
      (this.TBr = 0),
      (this.LBr = new Array()),
      (this.DBr = new Array()),
      (this.Dwr = (e) => {
        this.SetDitherEffect(e);
      }),
      (this.OnRoleIdChange = () => {
        this.RefreshWeaponCase(), this.HideAllWeapon();
        var e = this.mBr.RoleDataId,
          t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e),
          i = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(e);
        t &&
          (t.IsTrialRole()
            ? ((t =
                ModelManager_1.ModelManager.RoleModel.GetRoleRobotData(
                  e,
                ).GetWeaponData()),
              this.SetWeaponByWeaponData(t, i))
            : ((t =
                ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
                  e,
                )),
              this.SetWeaponByWeaponData(t, i)));
      }),
      (this.OnRoleMeshLoadComplete = () => {
        this.AttachWeaponToRole();
      }),
      (this.OnAnsBegin = (e) => {
        var t = e.Index;
        this.ShowWeaponByIndex(t, e.ShowMaterialController),
          FNameUtil_1.FNameUtil.IsEmpty(e.HangSocketName) ||
            this.fMl(t, e.HangSocketName),
          e.Transform && this.SetWeaponTransformByIndex(t, e.Transform);
      }),
      (this.OnAnsEnd = (e) => {
        this.HideWeaponByIndex(e.Index, e.HideEffect),
          FNameUtil_1.FNameUtil.IsEmpty(e.HangSocketName) ||
            this.fMl(e.Index, void 0);
      });
  }
  OnInit() {
    (this.mBr = this.Owner.CheckGetComponent(12)),
      (this.ywr = this.Owner.CheckGetComponent(0)),
      (this.n$t = this.Owner.CheckGetComponent(1)),
      (this.Jwr = this.Owner.CheckGetComponent(6));
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
        this.Dwr,
      ),
      this.Jwr?.RegisterAnsTrigger(
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
        this.Dwr,
      );
    for (const e of this.IBr)
      SkeletalObserverManager_1.SkeletalObserverManager.DestroySkeletalObserver(
        e,
      );
  }
  Refresh() {
    var t = this.yBr.GetModels(this.nxl);
    this.TBr = t.length;
    for (let e = this.IBr.length; e < this.TBr; e++) {
      var i =
        SkeletalObserverManager_1.SkeletalObserverManager.NewSkeletalObserver(
          2,
        );
      this.IBr.push(i), this.DBr.push(0), this.HideWeaponByIndex(e);
    }
    for (let e = 0; e < this.TBr; e++) {
      var s = this.IBr[e].Model;
      s.CheckGetComponent(20)?.SetWeaponData(this.yBr),
        s.CheckGetComponent(2)?.LoadModelByModelId(t[e]);
    }
  }
  ShowAllWeapon(t = !1) {
    for (let e = 0; e < this.IBr.length; e++) this.ShowWeaponByIndex(e, t);
  }
  HideAllWeapon(t = !1) {
    for (let e = 0; e < this.IBr.length; e++) this.HideWeaponByIndex(e, t);
  }
  ShowWeaponByIndex(e, t = !1) {
    var i, s;
    e < 0 || e >= this.IBr.length
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Weapon", 43, "显示武器索引错误", ["index", e])
      : (s = (i = this.IBr[e].Model).CheckGetComponent(0))?.GetVisible() ||
        ((this.DBr[e] = 2),
        s?.SetVisible(!0),
        t &&
          UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
            i,
            "ChangeWeaponMaterialController",
          ));
  }
  HideWeaponByIndex(e, t = !1) {
    var i, s;
    e < 0 || e >= this.IBr.length
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Weapon", 43, "隐藏武器索引错误", ["index", e])
      : (s = (i = this.IBr[e].Model).CheckGetComponent(0))?.GetVisible() &&
        ((this.DBr[e] = 1), s?.SetVisible(!1), t) &&
        UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(i, "ShowHideWeaponEffect");
  }
  RefreshWeaponCase() {
    var e = this.mBr.RoleConfigId,
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e),
      e = ModelUtil_1.ModelUtil.GetModelConfig(e.UiMeshId);
    if (e) {
      var t = e.BattleSockets;
      for (let e = (this.LBr.length = 0); e < t.Num(); e++) {
        var i = t.Get(e);
        this.LBr.push(i);
      }
    }
  }
  RefreshWeaponDa() {
    var e = this.yBr.GetBreachLevel();
    for (const t of this.IBr)
      t.Model?.CheckGetComponent(21)?.RefreshWeaponBreachDa(
        e,
        this.yBr.GetRoleId(),
      );
  }
  AttachWeaponToRole() {
    if (2 === this.ywr.GetModelLoadState()) {
      var t = this.n$t.MainMeshComponent;
      for (let e = 0; e < this.TBr; e++) {
        var i = this.IBr[e],
          s = FNameUtil_1.FNameUtil.GetDynamicFName(this.LBr[e]),
          i = i.Model?.CheckGetComponent(1);
        i?.Actor?.K2_AttachToComponent(t, s, 0, 0, 0, !1),
          i?.Actor?.D_K2_SetActorRelativeTransform(
            MathUtils_1.MathUtils.DefaultTransformDouble,
            !1,
            void 0,
            !1,
          );
      }
    }
  }
  fMl(e, t) {
    this.IBr[e].Model?.CheckGetComponent(1)?.Actor?.K2_AttachToComponent(
      this.n$t.MainMeshComponent,
      t ?? FNameUtil_1.FNameUtil.GetDynamicFName(this.LBr[e]),
      0,
      0,
      0,
      !1,
    );
  }
  SetWeaponByWeaponData(e, t) {
    e && ((this.yBr = e), (this.nxl = t), this.Refresh());
  }
  ReplaceWeaponModel(t, e) {
    this.TBr = t.length;
    for (let e = this.IBr.length; e < this.TBr; e++) {
      var i =
        SkeletalObserverManager_1.SkeletalObserverManager.NewSkeletalObserver(
          2,
        );
      this.IBr.push(i), this.DBr.push(0), this.HideWeaponByIndex(e);
    }
    let s = 0;
    var o = () => {
      ++s >= this.TBr && e?.();
    };
    for (let e = 0; e < this.TBr; e++) {
      var n = this.IBr[e].Model;
      n.CheckGetComponent(0)?.ModelConfigId !== t[e] &&
        n.CheckGetComponent(2)?.LoadModelByModelId(t[e], !1, o);
    }
  }
  HasWeapon() {
    return void 0 !== this.yBr;
  }
  SetWeaponTransformByIndex(e, t) {
    e < 0 || e >= this.IBr.length
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Weapon", 43, "设置武器偏移索引错误", ["index", e])
      : this.IBr[e].Model?.CheckGetComponent(
          1,
        )?.MainMeshComponent?.K2_SetRelativeTransform(t, !1, void 0, !1);
  }
  SetDitherEffect(e) {
    for (const t of this.IBr) t.Model?.CheckGetComponent(0)?.SetDitherEffect(e);
  }
  GetWeaponCount() {
    return this.TBr;
  }
  OnRoleActiveChange() {
    this.n$t.Actor.bHidden && this.HideAllWeapon();
  }
};
(UiRoleWeaponComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(15)],
  UiRoleWeaponComponent,
)),
  (exports.UiRoleWeaponComponent = UiRoleWeaponComponent);
//# sourceMappingURL=UiRoleWeaponComponent.js.map
