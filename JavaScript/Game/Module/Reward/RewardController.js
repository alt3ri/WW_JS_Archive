"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardController = void 0);
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  RewardModel_1 = require("./RewardModel");
class RewardController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      (RewardController.Model = RewardModel_1.RewardModel),
      Log_1.Log.CheckInfo() && Log_1.Log.Info("Reward", 9, "初始化"),
      !0
    );
  }
  static OnClear() {
    return Log_1.Log.CheckInfo() && Log_1.Log.Info("Reward", 9, "初始化"), !0;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19684, this.fao);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19684);
  }
  static PickUpFightDrop(o, t, n) {
    var e;
    return RewardController.pao.has(o)
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Interaction", 37, "Pick up drop has locked", [
            "creatureDataId",
            o,
          ]),
        !1)
      : (((e = Protocol_1.Aki.Protocol.GZn.create()).pHn =
          MathUtils_1.MathUtils.NumberToLong(o)),
        RewardController.pao.add(o),
        Net_1.Net.Call(19732, Protocol_1.Aki.Protocol.GZn.create(e), (e) => {
          if ((RewardController.pao.delete(o), e))
            if (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
              n && n(!1),
                ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.O4n,
                  7427,
                ),
                e.O4n ===
                  Protocol_1.Aki.Protocol.O4n.Proto_ErrPkgCapacityNotEnough &&
                  AudioSystem_1.AudioSystem.PostEvent(
                    "ui_pickup_capacity_full",
                  );
            else {
              n && n(!0);
              e =
                ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
                  t,
                );
              if (e) {
                e = (0, IComponent_1.getComponent)(
                  e.ComponentsData,
                  "RewardComponent",
                );
                if (e) {
                  (e = e.RewardId),
                    (e =
                      ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(
                        e,
                      ).DropPreview);
                  if (0 < e.size)
                    for (const r of e.keys())
                      EventSystem_1.EventSystem.Emit(
                        EventDefine_1.EEventName.OnDropItemSuccess,
                        r,
                      );
                }
              }
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnInteractDropItemSuccess,
              ),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Reward", 9, "拾取掉落返回", [
                    "掉落物实体Id",
                    o,
                  ]);
            }
          else
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Interaction",
                37,
                "Pick up drop call send failed",
                ["creatureDataId", o],
              ),
              n && n(!1);
        }),
        !0);
  }
}
((exports.RewardController = RewardController).Model =
  RewardModel_1.RewardModel),
  (RewardController.pao = new Set()),
  (RewardController.fao = (e) => {
    RewardController.HandleDropInBagInfo(e.yPs, e.y6n);
  }),
  (RewardController.HandleDropInBagInfo = (e, r) => {});
//# sourceMappingURL=RewardController.js.map
