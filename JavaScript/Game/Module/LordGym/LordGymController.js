"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ErrorCodeController_1 = require("../ErrorCode/ErrorCodeController"),
  ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
  ItemRewardDefine_1 = require("../ItemReward/ItemRewardDefine"),
  RewardItemData_1 = require("../ItemReward/RewardData/RewardItemData");
class LordGymController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.OnRegisterNetEvent(), this.OnAddEvents(), !0;
  }
  static OnClear() {
    return this.OnUnRegisterNetEvent(), this.OnRemoveEvents(), !0;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(4958, this.PSi), Net_1.Net.Register(23225, this.xSi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(4958), Net_1.Net.UnRegister(23225);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.$5e);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      this.$5e,
    );
  }
  static async LordGymInfoRequest() {
    var e = Protocol_1.Aki.Protocol.Ess.create({}),
      e = await Net_1.Net.CallAsync(16420, e);
    if (
      (0 < e.Oxs?.length &&
        ((ModelManager_1.ModelManager.LordGymModel.UnLockLordGym = e.Oxs),
        ModelManager_1.ModelManager.LordGymModel.UnLockLordGym.sort(
          (e, r) => e - r,
        )),
      e.kxs?.length &&
        (ModelManager_1.ModelManager.LordGymModel.ReadLoadGymIds = e.kxs),
      0 < e.Nxs?.length)
    )
      for (const r of e.Nxs)
        ModelManager_1.ModelManager.LordGymModel.LordGymRecord.set(r.d7n, r);
  }
  static async LordGymBeginRequest(e) {
    var r = Protocol_1.Aki.Protocol.Tss.create(),
      e = ((r.d7n = e), await Net_1.Net.CallAsync(27353, r));
    return !(
      !e ||
      (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
        (ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
          e.O4n,
          27353,
        ),
        1))
    );
  }
  static async OpenLordGymEntrance(e) {
    return (
      await this.LordGymInfoRequest(),
      void 0 !==
        (await UiManager_1.UiManager.OpenViewAsync("LordGymEntranceView", e))
    );
  }
  static OpenGymUnlockTipView(e) {
    UiManager_1.UiManager.OpenView("LordGymUnlockTipView", e),
      (ModelManager_1.ModelManager.LordGymModel.FirstUnLockLordGym = []);
  }
  static async ReadLordGym(e) {
    ModelManager_1.ModelManager.LordGymModel.ReadLordGym(e);
    var r = Protocol_1.Aki.Protocol.Rss.create();
    (r.d7n = e), await Net_1.Net.CallAsync(16495, r);
  }
}
(exports.LordGymController = LordGymController),
  ((_a = LordGymController).$5e = () => {
    _a.LordGymInfoRequest();
  }),
  (LordGymController.PSi = (e) => {
    ModelManager_1.ModelManager.LordGymModel.FirstUnLockLordGym = e.Oxs;
  }),
  (LordGymController.xSi = (r) => {
    if (
      (ModelManager_1.ModelManager.LordGymModel.LordGymRecord.set(
        r.Hxs.d7n,
        r.Hxs,
      ),
      r.dws)
    ) {
      var e = [];
      for (const n of r.jxs) {
        var t = new RewardItemData_1.RewardItemData(
          n.f8n,
          n.o9n,
          0 !== n.Vxs ? n.Vxs : void 0,
        );
        e.push(t);
      }
      var o = {
          ButtonTextId: "ConfirmBox_45_ButtonText_1",
          DescriptionTextId: void 0,
          IsTimeDownCloseView: !1,
          IsClickedCloseView: !0,
        },
        a = {
          TitleTextId: "LordGym_TimeTitle",
          Record: TimeUtil_1.TimeUtil.GetTimeString(r.Hxs.Fxs),
          IsNewRecord: r.$xs,
        };
      ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
        ItemRewardDefine_1.LORD_GYM_RESULT,
        r.dws,
        e,
        a,
        void 0,
        [o],
        void 0,
        void 0,
        () => {
          var e = ModelManager_1.ModelManager.LordGymModel.GetNextGymId(
            r.Hxs.d7n,
          );
          e &&
            !ModelManager_1.ModelManager.LordGymModel.GetLordGymHasRead(e) &&
            ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(e) &&
            UiManager_1.UiManager.OpenView("LordGymUnlockTipView", e);
        },
      );
    }
  });
//# sourceMappingURL=LordGymController.js.map
