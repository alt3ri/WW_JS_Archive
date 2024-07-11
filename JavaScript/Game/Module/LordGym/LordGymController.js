"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ErrorCodeController_1 = require("../ErrorCode/ErrorCodeController");
const ItemRewardController_1 = require("../ItemReward/ItemRewardController");
const ItemRewardDefine_1 = require("../ItemReward/ItemRewardDefine");
const RewardItemData_1 = require("../ItemReward/RewardData/RewardItemData");
class LordGymController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.OnRegisterNetEvent(), this.OnAddEvents(), !0;
  }
  static OnClear() {
    return this.OnUnRegisterNetEvent(), this.OnRemoveEvents(), !0;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(12594, this.PSi), Net_1.Net.Register(28727, this.xSi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(12594), Net_1.Net.UnRegister(28727);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.b4e);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      this.b4e,
    );
  }
  static async LordGymInfoRequest() {
    var e = Protocol_1.Aki.Protocol.Lis.create({});
    var e = await Net_1.Net.CallAsync(9653, e);
    if (
      (e.pAs?.length > 0 &&
        ((ModelManager_1.ModelManager.LordGymModel.UnLockLordGym = e.pAs),
        ModelManager_1.ModelManager.LordGymModel.UnLockLordGym.sort(
          (e, r) => e - r,
        )),
      e.MAs?.length &&
        (ModelManager_1.ModelManager.LordGymModel.ReadLoadGymIds = e.MAs),
      e.SAs?.length > 0)
    )
      for (const r of e.SAs)
        ModelManager_1.ModelManager.LordGymModel.LordGymRecord.set(r.b6n, r);
  }
  static async LordGymBeginRequest(e) {
    const r = Protocol_1.Aki.Protocol.Ais.create();
    var e = ((r.b6n = e), await Net_1.Net.CallAsync(29694, r));
    return !(
      !e ||
      (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
        (ErrorCodeController_1.ErrorCodeController.OpenErrorCodeTipView(
          e.lkn,
          29694,
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
    const r = Protocol_1.Aki.Protocol.Uis.create();
    (r.b6n = e), await Net_1.Net.CallAsync(29379, r);
  }
}
(exports.LordGymController = LordGymController),
  ((_a = LordGymController).b4e = () => {
    _a.LordGymInfoRequest();
  }),
  (LordGymController.PSi = (e) => {
    ModelManager_1.ModelManager.LordGymModel.FirstUnLockLordGym = e.pAs;
  }),
  (LordGymController.xSi = (r) => {
    if (
      (ModelManager_1.ModelManager.LordGymModel.LordGymRecord.set(
        r.TAs.b6n,
        r.TAs,
      ),
      r.QRs)
    ) {
      const e = [];
      for (const n of r.LAs) {
        const t = new RewardItemData_1.RewardItemData(
          n.G3n,
          n.I5n,
          n.yAs !== 0 ? n.yAs : void 0,
        );
        e.push(t);
      }
      const o = {
        ButtonTextId: "ConfirmBox_45_ButtonText_1",
        DescriptionTextId: void 0,
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !0,
      };
      const a = {
        TitleTextId: "LordGym_TimeTitle",
        Record: TimeUtil_1.TimeUtil.GetTimeString(r.TAs.EAs),
        IsNewRecord: r.IAs,
      };
      ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
        ItemRewardDefine_1.LORD_GYM_RESULT,
        r.QRs,
        e,
        a,
        void 0,
        [o],
        void 0,
        void 0,
        () => {
          const e = ModelManager_1.ModelManager.LordGymModel.GetNextGymId(
            r.TAs.b6n,
          );
          e &&
            !ModelManager_1.ModelManager.LordGymModel.GetLordGymHasRead(e) &&
            ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(e) &&
            UiManager_1.UiManager.OpenView("LordGymUnlockTipView", e);
        },
      );
    }
  });
// # sourceMappingURL=LordGymController.js.map
