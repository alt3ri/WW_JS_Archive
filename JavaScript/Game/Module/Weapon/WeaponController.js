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
  WeaponSkinDefine_1 = require("../Skin/Tab/Weapon/WeaponSkinDefine"),
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
    Net_1.Net.Register(25149, (e) => {
      e && ModelManager_1.ModelManager.WeaponModel.WeaponRoleLoadEquip(e.Gxs);
    }),
      Net_1.Net.Register(17281, (e) => {
        var o = MathUtils_1.MathUtils.LongToNumber(e.F4n),
          o =
            ModelManager_1.ModelManager.CreatureModel.GetEntity(
              o,
            ).Entity.GetComponent(79);
        o && o.OnEquipWeaponForRoleNotify(e);
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25149), Net_1.Net.UnRegister(17281);
  }
  static SendPbWeaponLevelUpRequest(e, o) {
    var t = Protocol_1.Aki.Protocol.R0s.create();
    t.w5n = e;
    for (const n of o) {
      var r = Protocol_1.Aki.Protocol.X8s.create();
      (r.m9n = n.SelectedCount),
        (r.w5n = n.IncId),
        (r.L8n = n.ItemId),
        t.tHn.push(r);
    }
    Net_1.Net.Call(22453, t, (e) => {
      e &&
        (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
          ? ModelManager_1.ModelManager.WeaponModel.WeaponLevelUpResponse(e)
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              15461,
            ));
    });
  }
  static SendPbWeaponBreachRequest(t, r) {
    var e = Protocol_1.Aki.Protocol.A0s.create();
    (e.w5n = t),
      Net_1.Net.Call(22247, e, (e) => {
        var o;
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ((o = e.ujn),
              ModelManager_1.ModelManager.WeaponModel.SetWeaponBreachData(t, o),
              r(o),
              UiManager_1.UiManager.OpenView("WeaponBreachSuccessView", t),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WeaponBreakUp,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                25382,
              ));
      });
  }
  static SendPbResonUpRequest(o, e) {
    if (
      !RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips()
    ) {
      var t = Protocol_1.Aki.Protocol.U0s.create();
      (t.w5n = o), (t.cjn = e);
      const r =
        ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
          o,
        ).GetResonanceLevel();
      Net_1.Net.Call(15131, t, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ModelManager_1.ModelManager.WeaponModel.SetWeaponResonanceData(
                e.w5n,
                e.hOs,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WeaponResonanceSuccess,
                o,
                r,
              ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                29805,
              ));
      });
    }
  }
  static SendPbEquipTakeOnRequest(e, o, t) {
    var r;
    RoleController_1.RoleController.CheckCharacterInBattleTagAndShowTips() ||
      !e ||
      e <= 0 ||
      (((r = Protocol_1.Aki.Protocol.css.create()).R5n =
        Protocol_1.Aki.Protocol.v5s.create()),
      (r.R5n.mjn = e),
      (r.R5n.l8n = o),
      (r.R5n.djn = t),
      Net_1.Net.Call(23402, r, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? ModelManager_1.ModelManager.WeaponModel.WeaponRoleLoadEquip(e.Gxs)
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                17231,
              ));
      }));
  }
  static Qil(e, o, t, n, a, i, l, _ = !1) {
    if (i) {
      var s = i.CheckGetComponent(20);
      let r = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(
        21,
        s.WeaponConfigId.toString(),
      );
      void 0 === r &&
        (r =
          ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponModelTransformData(
            t,
          ));
      const d = i.CheckGetComponent(1);
      d?.SetTransformByTag(n);
      if (
        (i.CheckGetComponent(2)?.LoadModelByModelId(e, _, () => {
          UiModelUtil_1.UiModelUtil.SetVisible(i, !0);
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
              (d?.MainMeshComponent?.D_K2_SetRelativeTransform(
                e.ToUeTransform(),
                !1,
                void 0,
                !1,
              ),
              UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
                i,
                "WeaponRootWeaponMaterialController",
              ),
              UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(
                i,
                "WeaponRootWeaponShowHideEffect",
              ),
              i.CheckGetComponent(9));
          t.SetRotateParam(r.RotateTime),
            t.StartRotate(),
            o.Set(r.AxisRotate.Y, r.AxisRotate.Z, r.AxisRotate.X),
            d?.Actor?.K2_SetActorRotation(o.ToUeRotator(), !1);
        }),
        l)
      )
        if (r.ShowScabbard) {
          if (1 < o.length) {
            const M = l.CheckGetComponent(1);
            l.CheckGetComponent(2).LoadModelByModelId(o[1], !1, () => {
              UiModelUtil_1.UiModelUtil.SetVisible(l, !0),
                M.Actor.K2_AttachToActor(d.Actor, void 0, 2, 1, 1, !1),
                M.SetTransformByTag(a),
                M.Actor?.D_K2_SetActorRelativeLocation(
                  Vector_1.Vector.ZeroVectorDouble,
                  !1,
                  void 0,
                  !1,
                );
              var e = Vector_1.Vector.Create(
                  r.ScabbardOffset.X,
                  r.ScabbardOffset.Y,
                  r.ScabbardOffset.Z,
                ),
                o = Rotator_1.Rotator.Create(
                  r.Rotation.Y,
                  r.Rotation.Z,
                  r.Rotation.X,
                ),
                t = Vector_1.Vector.Create(r.Size, r.Size, r.Size),
                o = Transform_1.Transform.Create(o.Quaternion(), e, t);
              M.MainMeshComponent?.D_K2_SetRelativeTransform(
                o.ToUeTransform(),
                !1,
                void 0,
                !1,
              ),
                UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
                  l,
                  "WeaponRootWeaponMaterialController",
                );
            });
          }
        } else UiModelUtil_1.UiModelUtil.SetVisible(l, !1);
    }
  }
  static SelectedWeaponSkinChange(e, o, t, r, n = !1) {
    o === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID
      ? ((e =
          ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
            e,
          ).GetWeaponConfig()),
        WeaponController.Qil(
          e.ModelId,
          e.Models,
          e.TransformId,
          "WeaponSkinCase",
          "WeaponSkinCase",
          t.Model,
          r.Model,
          n,
        ))
      : ((e = ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(o)),
        WeaponController.Qil(
          e.ModelId,
          e.Models,
          e.TransformId,
          "WeaponSkinCase",
          "WeaponSkinCase",
          t.Model,
          r.Model,
          n,
        ));
  }
  static OnSelectedWeaponChange(
    e,
    o,
    t,
    r = WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID,
    n = !1,
  ) {
    var a;
    o.Model &&
      ((a = o.Model).CheckGetComponent(20)?.SetWeaponData(e),
      a.CheckGetComponent(0)?.SetLoadingIconFollowState(n)),
      t.Model && t.Model.CheckGetComponent(20).SetWeaponData(e),
      WeaponController.Qil(
        e.GetModelId(r),
        e.GetModels(r),
        e.GetTransformId(r),
        "WeaponCase",
        "WeaponScabbardCase",
        o.Model,
        t.Model,
        n,
      );
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
  static RoleFadeIn(e, o = "RoleFadeInCurve") {
    const t = e.Model.CheckGetComponent(8);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o);
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
  static RoleFadeOut(e, o = "RoleFadeOutCurve") {
    const t = e.Model.CheckGetComponent(8);
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o);
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
