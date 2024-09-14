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
    Net_1.Net.Register(16838, this.PSi), Net_1.Net.Register(15920, this.xSi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16838), Net_1.Net.UnRegister(15920);
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
    var e = Protocol_1.Aki.Protocol.Ass.create({}),
      e = await Net_1.Net.CallAsync(29019, e);
    if (
      (0 < e.jxs?.length &&
        ((ModelManager_1.ModelManager.LordGymModel.UnLockLordGym = e.jxs),
        ModelManager_1.ModelManager.LordGymModel.UnLockLordGym.sort(
          (e, r) => e - r,
        )),
      e.Wxs?.length &&
        (ModelManager_1.ModelManager.LordGymModel.ReadLoadGymIds = e.Wxs),
      0 < e.Kxs?.length)
    )
      for (const r of e.Kxs)
        ModelManager_1.ModelManager.LordGymModel.LordGymRecord.set(r.y7n, r);
  }
  static async LordGymBeginRequest(e) {
    var r = Protocol_1.Aki.Protocol.wss.create(),
      e = ((r.y7n = e), await Net_1.Net.CallAsync(19459, r));
    return !(
      !e ||
      (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        (ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          19459,
        ),
        1))
    );
  }
  static async OpenLordGymEntrance(e, r = 0) {
    return (
      await this.LordGymInfoRequest(),
      (ModelManager_1.ModelManager.LordGymModel.EntranceEntityId = r),
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
    var r = Protocol_1.Aki.Protocol.bss.create();
    (r.y7n = e), await Net_1.Net.CallAsync(25823, r);
  }
  static IsInEntranceEntity() {
    var e = ModelManager_1.ModelManager.LordGymModel.EntranceEntityId;
    return (
      !e ||
      !(e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e))
        ?.IsInit ||
      (e.Entity?.GetComponent(107)?.IsInInteractRange ?? !1)
    );
  }
}
(exports.LordGymController = LordGymController),
  ((_a = LordGymController).$5e = () => {
    _a.LordGymInfoRequest();
  }),
  (LordGymController.PSi = (e) => {
    ModelManager_1.ModelManager.LordGymModel.FirstUnLockLordGym = e.jxs;
  }),
  (LordGymController.xSi = (r) => {
    if (
      (ModelManager_1.ModelManager.LordGymModel.LordGymRecord.set(
        r.Jxs.y7n,
        r.Jxs,
      ),
      r.Mws)
    ) {
      var e = [];
      for (const n of r.zxs) {
        var t = new RewardItemData_1.RewardItemData(
          n.L8n,
          n.m9n,
          0 !== n.Xxs ? n.Xxs : void 0,
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
          Record: TimeUtil_1.TimeUtil.GetTimeString(r.Jxs.Qxs),
          IsNewRecord: r.Yxs,
        };
      ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
        ItemRewardDefine_1.LORD_GYM_RESULT,
        r.Mws,
        e,
        a,
        void 0,
        [o],
        void 0,
        void 0,
        () => {
          var e = ModelManager_1.ModelManager.LordGymModel.GetNextGymId(
            r.Jxs.y7n,
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
