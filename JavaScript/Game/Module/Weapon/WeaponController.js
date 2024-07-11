"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponController = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  RoleController_1 = require("../RoleUi/RoleController"),
  UiModelUtil_1 = require("../UiModel/UiModelUtil");
class WeaponController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAddWeaponItem,
      this.QCi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnResponseWeaponItem,
        this.vko,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveWeaponItem,
        this.Gdi,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAddWeaponItem,
      this.QCi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnResponseWeaponItem,
        this.vko,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveWeaponItem,
        this.Gdi,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(14571, (e) => {
      e && ModelManager_1.ModelManager.WeaponModel.WeaponRoleLoadEquip(e.Pxs);
    }),
      Net_1.Net.Register(8599, (e) => {
        var o = MathUtils_1.MathUtils.LongToNumber(e.P4n),
          o =
            ModelManager_1.ModelManager.CreatureModel.GetEntity(
              o,
            ).Entity.GetComponent(71);
        o && o.OnEquipWeaponForRoleNotify(e);
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(14571), Net_1.Net.UnRegister(8599);
  }
  static SendPbWeaponLevelUpRequest(e, o) {
    var t = Protocol_1.Aki.Protocol.M0s.create();
    t.T5n = e;
    for (const a of o) {
      var r = Protocol_1.Aki.Protocol.V8s.create();
      (r.o9n = a.SelectedCount),
        (r.T5n = a.IncId),
        (r.f8n = a.ItemId),
        t.K7n.push(r);
    }
    Net_1.Net.Call(29101, t, (e) => {
      e &&
        (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
          ? ModelManager_1.ModelManager.WeaponModel.WeaponLevelUpResponse(e)
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              26619,
            ));
    });
  }
  static SendPbWeaponBreachRequest(t, r) {
    var e = Protocol_1.Aki.Protocol.E0s.create();
    (e.T5n = t),
      Net_1.Net.Call(5805, e, (e) => {
        var o;
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ((o = e.ijn),
              ModelManager_1.ModelManager.WeaponModel.SetWeaponBreachData(t, o),
              r(o),
              UiManager_1.UiManager.OpenView("WeaponBreachSuccessView", t))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                15967,
              ));
      });
  }
  static SendPbResonUpRequest(o, e) {
    if (
      !RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips()
    ) {
      var t = Protocol_1.Aki.Protocol.I0s.create();
      (t.T5n = o), (t.rjn = e);
      const r =
        ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
          o,
        ).GetResonanceLevel();
      Net_1.Net.Call(5842, t, (e) => {
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? (ModelManager_1.ModelManager.WeaponModel.SetWeaponResonanceData(
                e.T5n,
                e.tOs,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WeaponResonanceSuccess,
                o,
                r,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                16492,
              ));
      });
    }
  }
  static SendPbEquipTakeOnRequest(e, o, t) {
    var r;
    RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips() ||
      !e ||
      e <= 0 ||
      (((r = Protocol_1.Aki.Protocol.nss.create()).S5n =
        Protocol_1.Aki.Protocol.u6s.create()),
      (r.S5n.ojn = e),
      (r.S5n.e8n = o),
      (r.S5n.njn = t),
      Net_1.Net.Call(4652, r, (e) => {
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ModelManager_1.ModelManager.WeaponModel.WeaponRoleLoadEquip(e.Pxs)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                5632,
              ));
      }));
  }
  static OnSelectedWeaponChange(e, o, t, a = !1) {
    const n = o.Model;
    if (n) {
      o = e.GetWeaponConfig();
      let r = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
        21,
        e.GetItemId().toString(),
      );
      void 0 === r &&
        (r =
          ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponModelTransformData(
            o.TransformId,
          )),
        n.CheckGetComponent(18)?.SetWeaponData(e);
      const l = n.CheckGetComponent(1);
      l?.SetTransformByTag("WeaponCase");
      n.CheckGetComponent(0)?.SetLoadingIconFollowState(a),
        n.CheckGetComponent(2)?.LoadModelByModelId(o.ModelId, a, () => {
          UiModelUtil_1.UiModelUtil.SetVisible(n, !0);
          var e = Vector_1.Vector.Create(
              r.Location.X,
              r.Location.Y,
              r.Location.Z,
            ),
            o = Rotator_1.Rotator.Create(
              r.Rotation.Y,
              r.Rotation.Z,
              r.Rotation.X,
            ),
            t = Vector_1.Vector.Create(r.Size, r.Size, r.Size),
            e = Transform_1.Transform.Create(o.Quaternion(), e, t),
            t =
              (l?.MainMeshComponent?.K2_SetRelativeTransform(
                e.ToUeTransform(),
                !1,
                void 0,
                !1,
              ),
              UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
                n,
                "WeaponRootWeaponMaterialController",
              ),
              UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(
                n,
                "WeaponRootWeaponShowHideEffect",
              ),
              n.CheckGetComponent(9));
          t.SetRotateParam(r.RotateTime),
            t.StartRotate(),
            o.Set(r.AxisRotate.Y, r.AxisRotate.Z, r.AxisRotate.X),
            l?.Actor?.K2_SetActorRotation(o.ToUeRotator(), !1);
        });
      const i = t.Model;
      if (i) {
        o = i.CheckGetComponent(18);
        if (r.ShowScabbard) {
          a = e.GetWeaponConfig().Models;
          if (1 < a.length) {
            const _ = i.CheckGetComponent(1);
            t = i.CheckGetComponent(2);
            o.SetWeaponData(e);
            t.LoadModelByModelId(a[1], !1, () => {
              _.Actor.K2_AttachToActor(l.Actor, void 0, 2, 1, 1, !1),
                _.SetTransformByTag("WeaponScabbardCase"),
                _.Actor?.K2_SetActorRelativeLocation(
                  Vector_1.Vector.ZeroVector,
                  !1,
                  void 0,
                  !1,
                );
              var e = Transform_1.Transform.Create();
              e.SetLocation(r.ScabbardOffset),
                _.MainMeshComponent?.K2_SetRelativeTransform(
                  e.ToUeTransform(),
                  !1,
                  void 0,
                  !1,
                ),
                UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
                  i,
                  "WeaponRootWeaponMaterialController",
                );
            });
          }
        } else UiModelUtil_1.UiModelUtil.SetVisible(i, !1);
      }
    }
  }
  static PlayWeaponRenderingMaterial(e, o, t) {
    UiModelUtil_1.UiModelUtil.SetRenderingMaterial(o.Model, e),
      t && UiModelUtil_1.UiModelUtil.SetRenderingMaterial(t.Model, e);
  }
  static ApplyWeaponLevelMaterial(e, o, t = 0) {
    UE.BP_CharacterRenderingFunctionLibrary_C.ApplyWeaponLevelMaterial(
      e,
      o,
      t,
      e,
    );
  }
  static RoleFadeIn(e) {
    const t = e.Model.CheckGetComponent(8);
    e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "RoleFadeInCurve",
      );
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, (e) => {
      var o;
      e &&
        ((o =
          CommonParamById_1.configCommonParamById.GetIntConfig(
            "RoleFadeInDuration",
          )),
        t?.Fade(1, 0, o, e));
    });
  }
  static RoleFadeOut(e) {
    const t = e.Model.CheckGetComponent(8);
    e =
      ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "RoleFadeOutCurve",
      );
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.CurveFloat, (e) => {
      var o;
      e &&
        ((o = CommonParamById_1.configCommonParamById.GetIntConfig(
          "RoleFadeOutDuration",
        )),
        t?.Fade(0, 1, o, e));
    });
  }
}
((exports.WeaponController = WeaponController).QCi = (e) => {
  ModelManager_1.ModelManager.WeaponModel.AddWeaponData(e);
}),
  (WeaponController.vko = (e) => {
    ModelManager_1.ModelManager.WeaponModel.AddWeaponData(e);
  }),
  (WeaponController.Gdi = (e) => {
    for (const o of e)
      ModelManager_1.ModelManager.WeaponModel.RemoveWeaponData(o);
  });
//# sourceMappingURL=WeaponController.js.map
