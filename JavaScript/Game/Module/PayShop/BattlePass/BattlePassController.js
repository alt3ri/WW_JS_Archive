"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassController = void 0);
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
  InputManager_1 = require("../../../Ui/Input/InputManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  FeatureRestrictionTemplate_1 = require("../../Common/FeatureRestrictionTemplate"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
  RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
class BattlePassController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      InputManager_1.InputManager.RegisterOpenViewFunc(
        "BattlePassMainView",
        BattlePassController._ki,
      ),
      InputManager_1.InputManager.RegisterCloseViewFunc(
        "BattlePassMainView",
        BattlePassController.uki,
      ),
      !0
    );
  }
  static OnClear() {
    return this.cki(), !0;
  }
  static RequestBattlePassDataForTask() {
    var e = Protocol_1.Aki.Protocol.RYn.create();
    Net_1.Net.Call(28922, e, (e) => {
      e &&
        (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
          ? (ModelManager_1.ModelManager.BattlePassModel.SetDataFromBattlePassResponse(
              e,
            ),
            ModelManager_1.ModelManager.BattlePassModel.GetInTimeRange() &&
              BattlePassController.RequestBattlePassTask(),
            this.mki())
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              10902,
            ));
    });
  }
  static OpenBattlePassView() {
    ModelManager_1.ModelManager.BattlePassModel.IsRequiringViewData ||
      UiManager_1.UiManager.IsViewOpen("BattlePassMainView") ||
      UiManager_1.UiManager.IsViewOpen("BattlePassFirstOpenView") ||
      this.dki().finally(() => {
        ModelManager_1.ModelManager.BattlePassModel.IsRequiringViewData = !1;
      });
  }
  static async dki() {
    ModelManager_1.ModelManager.BattlePassModel.IsRequiringViewData = !0;
    var e = Protocol_1.Aki.Protocol.RYn.create(),
      e = await Net_1.Net.CallAsync(28922, e);
    if (e)
      if (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.O4n,
          10902,
        );
      else if (
        (ModelManager_1.ModelManager.BattlePassModel.SetDataFromBattlePassResponse(
          e,
        ),
        ModelManager_1.ModelManager.BattlePassModel.GetInTimeRange())
      ) {
        var t = Protocol_1.Aki.Protocol.GYn.create(),
          t = await Net_1.Net.CallAsync(22377, t);
        if (t)
          if (t.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.O4n,
              16056,
            );
          else {
            ModelManager_1.ModelManager.BattlePassModel.BattlePassTaskMap.clear();
            for (const a of t.nMs)
              ModelManager_1.ModelManager.BattlePassModel.AddTaskDataFromProtocol(
                a,
              );
            ModelManager_1.ModelManager.BattlePassModel.SetDayEndTime(t.YSs),
              ModelManager_1.ModelManager.BattlePassModel.SetWeekEndTime(t.JSs),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ReceiveBattlePassTaskEvent,
                !1,
              ),
              e.XSs.$Ss
                ? e.XSs.QSs
                  ? UiManager_1.UiManager.OpenView("BattlePassMainView")
                  : UiManager_1.UiManager.OpenView("BattlePassFirstOpenView")
                : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                    "BattlePassNotInTime",
                  );
          }
      } else
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          new ConfirmBoxDefine_1.ConfirmBoxDataNew(150),
        );
  }
  static SetBattlePassEnter() {
    var e = Protocol_1.Aki.Protocol.VYn.create();
    Net_1.Net.Send(14721, e),
      (ModelManager_1.ModelManager.BattlePassModel.HadEnter = !0);
  }
  static RequestTakeBattlePassReward(t, a, r, o) {
    var e = Protocol_1.Aki.Protocol.PYn.create();
    (e.Z4n = t),
      (e.P6n = a),
      (e.f8n = r),
      Net_1.Net.Call(25326, e, (e) => {
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ModelManager_1.ModelManager.BattlePassModel.OnResponseTakeReward(
                t,
                a,
                r,
                o,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                11845,
              ));
      });
  }
  static RequestTakeAllRewardResponse() {
    var e = Protocol_1.Aki.Protocol.bYn.create();
    Net_1.Net.Call(23650, e, (e) => {
      e &&
        (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
          ? ModelManager_1.ModelManager.BattlePassModel.UpdateRewardDataFromBattlePassTakeAllRewardResponse(
              e,
            )
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              2374,
            ));
    });
  }
  static RequestBattlePassTask() {
    var e = Protocol_1.Aki.Protocol.GYn.create();
    Net_1.Net.Call(22377, e, (e) => {
      if (e)
        if (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs) {
          ModelManager_1.ModelManager.BattlePassModel.BattlePassTaskMap.clear();
          for (const a of e.nMs)
            ModelManager_1.ModelManager.BattlePassModel.AddTaskDataFromProtocol(
              a,
            );
          var t =
            ModelManager_1.ModelManager.BattlePassModel.GetWeekEndTime() !==
            e.JSs;
          ModelManager_1.ModelManager.BattlePassModel.SetWeekEndTime(e.JSs),
            ModelManager_1.ModelManager.BattlePassModel.SetDayEndTime(e.YSs),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ReceiveBattlePassTaskEvent,
              t,
            );
        } else
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            16056,
          );
    });
  }
  static TryRequestTaskList(e) {
    ModelManager_1.ModelManager.BattlePassModel.TryRequestTaskList(e);
  }
  static RequestBattlePassTaskTake(e) {
    var t = Protocol_1.Aki.Protocol.NYn.create();
    (t.IVn = e),
      Net_1.Net.Call(10694, t, (e) => {
        e &&
          (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
            ? ModelManager_1.ModelManager.BattlePassModel.UpdateTaskDataFromBattlePassTaskTakeResponse(
                e.IVn,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                9464,
              ));
      });
  }
  static RequestBuyBattlePassLevel(e) {
    var t = Protocol_1.Aki.Protocol.$Yn.create();
    (t.P6n = e), Net_1.Net.Call(9660, t, () => {});
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(13414, BattlePassController.Cki),
      Net_1.Net.Register(6319, BattlePassController.gki),
      Net_1.Net.Register(17188, BattlePassController.fki);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(13414),
      Net_1.Net.UnRegister(6319),
      Net_1.Net.UnRegister(17188);
  }
  static mki() {
    BattlePassController.pki ||
      (BattlePassController.pki = TimerSystem_1.TimerSystem.Forever(() => {
        TimeUtil_1.TimeUtil.GetServerTime() >=
          ModelManager_1.ModelManager.BattlePassModel.GetBattlePassEndTime() &&
          (ModelManager_1.ModelManager.BattlePassModel.SetInTimeRange(!1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnBattlePassExpireEvent,
          ),
          this.cki());
      }, 500));
  }
  static ShowTimePassConfirm() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(145);
    e.SetCloseFunction(() => {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ResetToBattleView,
      );
    }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
  static cki() {
    BattlePassController.pki &&
      (TimerSystem_1.TimerSystem.Remove(BattlePassController.pki),
      (BattlePassController.pki = void 0));
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.TJt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.vki,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CrossDay,
        this.oOe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.TJt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.vki,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CrossDay,
        this.oOe,
      );
  }
  static TryShowUpLevelView(e) {
    return !(
      ModelManager_1.ModelManager.BattlePassModel.IncreasedLevelToShow <= 0 ||
      UiManager_1.UiManager.IsViewOpen("BattlePassUnlockView") ||
      ((e = {
        IncreasedLevel:
          ModelManager_1.ModelManager.BattlePassModel.IncreasedLevelToShow,
        FirstUnlockPass: e,
      }),
      UiManager_1.UiManager.OpenView("BattlePassUpLevelView", e),
      (ModelManager_1.ModelManager.BattlePassModel.IncreasedLevelToShow = 0))
    );
  }
  static PopHighUnlockReward() {
    var e,
      t,
      a = CommonParamById_1.configCommonParamById.GetIntConfig(
        "PrimaryBattlePassGiftPack",
      ),
      r = [];
    for ([
      e,
      t,
    ] of ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(a)
      .Content)
      r.push(new RewardItemData_1.RewardItemData(e, t));
    ItemRewardController_1.ItemRewardController.OpenCommonRewardView(
      1009,
      r,
      () => {
        this.TryShowUpLevelView(!0);
      },
    );
  }
  static PayPrimaryBattlePass() {
    var e, t;
    FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check()
      ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165)),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        ))
      : ((e =
          ModelManager_1.ModelManager.BattlePassModel.GetPrimaryBattlePassGoodsId()),
        (t =
          ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
            e,
          ))?.InSellTime()
          ? this.Mki(e) ||
            ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftRequest(
              t.GetGoodsData().Id,
            )
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "BattlePassShopNotInTime",
            ));
  }
  static PayHighBattlePass() {
    var e, t;
    FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check()
      ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165)),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        ))
      : (e = ModelManager_1.ModelManager.BattlePassModel.PayType) ===
          Protocol_1.Aki.Protocol.yNs.Proto_NoPaid
        ? ((t =
            ModelManager_1.ModelManager.BattlePassModel.GetHighBattlePassGoodsId()),
          ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
            t,
          )?.InSellTime()
            ? this.Mki(t) ||
              ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftRequest(
                t,
              )
            : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "BattlePassShopNotInTime",
              ))
        : e === Protocol_1.Aki.Protocol.yNs.Proto_Paid &&
          ((t =
            ModelManager_1.ModelManager.BattlePassModel.GetSupplyBattlePassGoodsId()),
          ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
            t,
          )?.InSellTime()
            ? ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftRequest(
                t,
              )
            : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "BattlePassShopNotInTime",
              ));
  }
  static Mki(e) {
    var t;
    return (
      !!ModelManager_1.ModelManager.BattlePassModel.InBattlePassInWarningTime() &&
      ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(147)).FunctionMap.set(
        2,
        () => {
          ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftRequest(
            e,
          );
        },
      ),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        t,
      ),
      !0)
    );
  }
  static CloseView() {
    UiManager_1.UiManager.IsViewOpen("BattlePassFirstOpenView") ||
      UiManager_1.UiManager.CloseView("BattlePassMainView");
  }
}
((exports.BattlePassController = BattlePassController)._ki = () => {
  BattlePassController.OpenBattlePassView();
}),
  (BattlePassController.uki = () => {
    BattlePassController.CloseView();
  }),
  (BattlePassController.Cki = (e) => {
    for (const t of e.nMs)
      ModelManager_1.ModelManager.BattlePassModel.AddTaskDataFromProtocol(t);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.UpdateBattlePassTaskEvent,
    );
  }),
  (BattlePassController.gki = (e) => {
    ModelManager_1.ModelManager.BattlePassModel.UpdateExpDataFromBattlePassExpUpdateNotify(
      e.P6n,
      e.M8n,
      e.HSs,
    );
  }),
  (BattlePassController.fki = (t) => {
    if (ModelManager_1.ModelManager.BattlePassModel.GetInTimeRange()) {
      var a = ModelManager_1.ModelManager.BattlePassModel.PayType;
      ModelManager_1.ModelManager.BattlePassModel.PayType = t.jSs;
      let e = t.jSs === Protocol_1.Aki.Protocol.yNs.Proto_Paid ? 1 : 3;
      a === Protocol_1.Aki.Protocol.yNs.Proto_NoPaid &&
        a !== t.jSs &&
        (ModelManager_1.ModelManager.BattlePassModel.UpdateRewardDataFormFreeToPay(),
        (e = 3 === e ? 2 : e)),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
        ),
        UiManager_1.UiManager.OpenView("BattlePassUnlockView", e);
    }
  }),
  (BattlePassController.pki = void 0),
  (BattlePassController.vki = (e, t) => {
    10040 === e && t && BattlePassController.RequestBattlePassDataForTask();
  }),
  (BattlePassController.TJt = () => {
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10040) &&
      BattlePassController.RequestBattlePassDataForTask();
  }),
  (BattlePassController.oOe = () => {
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10040) &&
      ModelManager_1.ModelManager.BattlePassModel.GetInTimeRange() &&
      BattlePassController.RequestBattlePassTask();
  });
//# sourceMappingURL=BattlePassController.js.map
