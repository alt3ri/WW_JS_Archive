"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponController = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
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
      this.Qdi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnResponseWeaponItem,
        this.EOo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveWeaponItem,
        this.Gmi,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAddWeaponItem,
      this.Qdi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnResponseWeaponItem,
        this.EOo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveWeaponItem,
        this.Gmi,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(24360, (e) => {
      e && ModelManager_1.ModelManager.WeaponModel.WeaponRoleLoadEquip(e.uAs);
    }),
      Net_1.Net.Register(28145, (e) => {
        var o = MathUtils_1.MathUtils.LongToNumber(e.rkn),
          o =
            ModelManager_1.ModelManager.CreatureModel.GetEntity(
              o,
            ).Entity.GetComponent(69);
        o && o.OnEquipWeaponForRoleNotify(e);
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24360), Net_1.Net.UnRegister(28145);
  }
  static SendPbWeaponLevelUpRequest(e, o) {
    var t = Protocol_1.Aki.Protocol.Tcs.create();
    t.Ykn = e;
    for (const n of o) {
      var r = Protocol_1.Aki.Protocol.Y3s.create();
      (r.I5n = n.SelectedCount),
        (r.Ykn = n.IncId),
        (r.G3n = n.ItemId),
        t.m8n.push(r);
    }
    Net_1.Net.Call(25449, t, (e) => {
      e &&
        (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
          ? ModelManager_1.ModelManager.WeaponModel.WeaponLevelUpResponse(e)
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              21506,
            ));
    });
  }
  static SendPbWeaponBreachRequest(t, r) {
    var e = Protocol_1.Aki.Protocol.Rcs.create();
    (e.Ykn = t),
      Net_1.Net.Call(28957, e, (e) => {
        var o;
        e &&
          (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ((o = e.TVn),
              ModelManager_1.ModelManager.WeaponModel.SetWeaponBreachData(t, o),
              r(o),
              UiManager_1.UiManager.OpenView("WeaponBreachSuccessView", t))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                1225,
              ));
      });
  }
  static SendPbResonUpRequest(o, e) {
    if (
      !RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips()
    ) {
      var t = Protocol_1.Aki.Protocol.Acs.create();
      (t.Ykn = o), (t.LVn = e);
      const r =
        ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
          o,
        ).GetResonanceLevel();
      Net_1.Net.Call(19174, t, (e) => {
        e &&
          (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? (ModelManager_1.ModelManager.WeaponModel.SetWeaponResonanceData(
                e.Ykn,
                e.dbs,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WeaponResonanceSuccess,
                o,
                r,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                27374,
              ));
      });
    }
  }
  static SendPbEquipTakeOnRequest(e, o, t) {
    var r;
    RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips() ||
      !e ||
      e <= 0 ||
      (((r = Protocol_1.Aki.Protocol.lis.create()).Kkn =
        Protocol_1.Aki.Protocol.ENs.create()),
      (r.Kkn.DVn = e),
      (r.Kkn.M3n = o),
      (r.Kkn.AVn = t),
      Net_1.Net.Call(22138, r, (e) => {
        e &&
          (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ModelManager_1.ModelManager.WeaponModel.WeaponRoleLoadEquip(e.uAs)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                22403,
              ));
      }));
  }
  static OnSelectedWeaponChange(e, o, t) {
    const r = o.Model;
    if (r) {
      o = e.GetWeaponConfig();
      const a =
          ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponModelTransformData(
            o.TransformId,
          ),
        l = (r.CheckGetComponent(18)?.SetWeaponData(e), r.CheckGetComponent(1));
      l?.SetTransformByTag("WeaponCase");
      r.CheckGetComponent(2)?.LoadModelByModelId(o.ModelId, !1, () => {
        UiModelUtil_1.UiModelUtil.SetVisible(r, !0);
        var e = Vector_1.Vector.Create(
            a.Location.X,
            a.Location.Y,
            a.Location.Z,
          ),
          o = Rotator_1.Rotator.Create(
            a.Rotation.Y,
            a.Rotation.Z,
            a.Rotation.X,
          ),
          t = Vector_1.Vector.Create(a.Size, a.Size, a.Size),
          e = Transform_1.Transform.Create(o.Quaternion(), e, t),
          t =
            (l?.MainMeshComponent?.K2_SetRelativeTransform(
              e.ToUeTransform(),
              !1,
              void 0,
              !1,
            ),
            UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
              r,
              "WeaponRootWeaponMaterialController",
            ),
            UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(
              r,
              "WeaponRootWeaponShowHideEffect",
            ),
            r.CheckGetComponent(9));
        t.SetRotateParam(a.RotateTime),
          t.StartRotate(),
          o.Set(a.AxisRotate.Y, a.AxisRotate.Z, a.AxisRotate.X),
          l?.Actor?.K2_SetActorRotation(o.ToUeRotator(), !1);
      });
      const i = t.Model;
      if (i) {
        o = i.CheckGetComponent(18);
        if (a.ShowScabbard) {
          t = e.GetWeaponConfig().Models;
          if (1 < t.length) {
            const _ = i.CheckGetComponent(1);
            var n = i.CheckGetComponent(2);
            o.SetWeaponData(e);
            n.LoadModelByModelId(t[1], !1, () => {
              _.Actor.K2_AttachToActor(l.Actor, void 0, 2, 1, 1, !1),
                _.SetTransformByTag("WeaponScabbardCase"),
                _.Actor?.K2_SetActorRelativeLocation(
                  Vector_1.Vector.ZeroVector,
                  !1,
                  void 0,
                  !1,
                );
              var e = Transform_1.Transform.Create();
              e.SetLocation(a.ScabbardOffset),
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
((exports.WeaponController = WeaponController).Qdi = (e) => {
  ModelManager_1.ModelManager.WeaponModel.AddWeaponData(e);
}),
  (WeaponController.EOo = (e) => {
    ModelManager_1.ModelManager.WeaponModel.AddWeaponData(e);
  }),
  (WeaponController.Gmi = (e) => {
    for (const o of e)
      ModelManager_1.ModelManager.WeaponModel.RemoveWeaponData(o);
  });
//# sourceMappingURL=WeaponController.js.map
