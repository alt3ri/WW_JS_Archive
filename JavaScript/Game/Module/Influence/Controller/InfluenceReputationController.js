"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfluenceReputationController = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
  RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class InfluenceReputationController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      InfluenceReputationController.RequestInfluenceInfo,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      InfluenceReputationController.RequestInfluenceInfo,
    );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(23256, InfluenceReputationController.jri);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(23256);
  }
  static RequestInfluenceReward(e) {
    var t = Protocol_1.Aki.Protocol.Aes.create();
    (t.w5n = e),
      Net_1.Net.Call(26578, t, (e) => {
        e.Kms !== Protocol_1.Aki.Protocol.lkn.Sys
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Kms,
              4626,
            )
          : ModelManager_1.ModelManager.InfluenceReputationModel.UpdateInfluenceRewardIndex(
              e.w5n,
              e.b5n,
            ) &&
            (InfluenceReputationController.Wri(e.HRs),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ReceiveReputationReward,
            ));
      });
  }
  static Wri(e) {
    var t = [];
    for (const o of Object.keys(e)) {
      var n = Number.parseInt(o),
        r = e[o],
        n = new RewardItemData_1.RewardItemData(n, r);
      t.push(n);
    }
    ItemRewardController_1.ItemRewardController.OpenCommonRewardView(1009, t);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "InfluenceReputationView",
      InfluenceReputationController.V4e,
      "InfluenceReputationController.CanOpenView",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "InfluenceReputationView",
      InfluenceReputationController.V4e,
    );
  }
}
((exports.InfluenceReputationController = InfluenceReputationController).jri = (
  e,
) => {
  e = e.VRs;
  ModelManager_1.ModelManager.InfluenceReputationModel.SetInfluenceInfoList(e);
}),
  (InfluenceReputationController.RequestInfluenceInfo = () => {
    var e = Protocol_1.Aki.Protocol.Les.create();
    Net_1.Net.Call(10411, e, (e) => {
      e = e.VRs;
      ModelManager_1.ModelManager.InfluenceReputationModel.SetInfluenceInfoList(
        e,
      );
    });
  }),
  (InfluenceReputationController.V4e = (e) =>
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10029));
//# sourceMappingURL=InfluenceReputationController.js.map
