"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponSkinController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../../Ui/Base/UiControllerBase"),
  WeaponSkinDefine_1 = require("./WeaponSkinDefine");
class WeaponSkinController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.Q5e,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.Q5e,
    );
  }
  static Wil() {
    var e = new Protocol_1.Aki.Protocol._ss();
    Net_1.Net.Call(15375, Protocol_1.Aki.Protocol._ss.create(e), (e) => {
      e &&
        ModelManager_1.ModelManager.WeaponSkinModel.NotifyWeaponSkinData(e.qxs);
    });
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(25097, (e) => {
      e &&
        (e.wVn
          ? ModelManager_1.ModelManager.WeaponSkinModel.NotifyAllUnlockSkinData(
              e.bBs,
            )
          : ModelManager_1.ModelManager.WeaponSkinModel.SetUnlockSkinData(
              e.bBs,
            ));
    }),
      Net_1.Net.Register(17799, (e) => {
        e &&
          (ModelManager_1.ModelManager.WeaponSkinModel.DeleteWeaponSkinData(
            e.Q6n,
          ),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("WeaponSkin,", 10, "武器皮肤卸载成功", [
            "roleId",
            e.Q6n,
          ]);
      }),
      Net_1.Net.Register(29114, (e) => {
        var o = MathUtils_1.MathUtils.LongToNumber(e.F4n);
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            4,
            "服务器下发武器皮肤",
            ["WeaponSkinId", e.lI_?.yI_],
            ["ServerEntityId", o],
          );
        o =
          ModelManager_1.ModelManager.CreatureModel.GetEntity(
            o,
          ).Entity.GetComponent(79);
        o && o.OnEntityEquipSkinChangeNotify(e);
      }),
      Net_1.Net.Register(26443, (e) => {
        for (const t of e.iDc) {
          var o = MathUtils_1.MathUtils.LongToNumber(t.F4n);
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Character",
              4,
              "服务器下发翱翔与滑翔翼皮肤",
              ["FlySkinId", t.gGc],
              ["ServerEntityId", o],
            );
          o =
            ModelManager_1.ModelManager.CreatureModel.GetEntity(
              o,
            ).Entity.GetComponent(79);
          if (!o) return;
          o.OnEntitySoarWingOrParaglidingSkinChangeNotify(t);
        }
      });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25097), Net_1.Net.UnRegister(17799);
  }
  static Jsl(o, t) {
    var e = Protocol_1.Aki.Protocol.tg_.create();
    (e.R5n = Protocol_1.Aki.Protocol.kR_.create()),
      (e.R5n.mjn = o),
      (e.R5n.Zsl = t),
      Net_1.Net.Call(23490, e, (e) => {
        e &&
          (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ModelManager_1.ModelManager.WeaponSkinModel.EquipWeaponSkinData(
                e.Gxs,
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "WeaponSkin,",
                  10,
                  "武器皮肤装备成功",
                  ["roleId", o],
                  ["skinId", t],
                ))
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                28104,
              ));
      });
  }
  static eal(e) {
    var o;
    !e ||
      e <= 0 ||
      (((o = Protocol_1.Aki.Protocol.rg_.create()).mjn = e),
      Net_1.Net.Call(27648, o, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            19536,
          );
      }));
  }
  static SendEquipSkinRequest(e, o) {
    !e ||
      e <= 0 ||
      (o === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID
        ? WeaponSkinController.eal(e)
        : WeaponSkinController.Jsl(e, o));
  }
}
(exports.WeaponSkinController = WeaponSkinController).Q5e = () => {
  WeaponSkinController.Wil();
};
//# sourceMappingURL=WeaponSkinController.js.map
