"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattlePassController = void 0);
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const InputManager_1 = require("../../../Ui/Input/InputManager");
const UiManager_1 = require("../../../Ui/UiManager");
const FeatureRestrictionTemplate_1 = require("../../Common/FeatureRestrictionTemplate");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
class BattlePassController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      InputManager_1.InputManager.RegisterOpenViewFunc(
        "BattlePassMainView",
        BattlePassController.lOi,
      ),
      InputManager_1.InputManager.RegisterCloseViewFunc(
        "BattlePassMainView",
        BattlePassController._Oi,
      ),
      !0
    );
  }
  static OnClear() {
    return this.uOi(), !0;
  }
  static RequestBattlePassDataForTask() {
    const e = Protocol_1.Aki.Protocol.xWn.create();
    Net_1.Net.Call(5160, e, (e) => {
      e &&
        (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
          ? (ModelManager_1.ModelManager.BattlePassModel.SetDataFromBattlePassResponse(
              e,
            ),
            ModelManager_1.ModelManager.BattlePassModel.GetInTimeRange() &&
              BattlePassController.RequestBattlePassTask(),
            this.cOi())
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              9101,
            ));
    });
  }
  static OpenBattlePassView() {
    ModelManager_1.ModelManager.BattlePassModel.IsRequiringViewData ||
      UiManager_1.UiManager.IsViewOpen("BattlePassMainView") ||
      UiManager_1.UiManager.IsViewOpen("BattlePassFirstOpenView") ||
      this.mOi().finally(() => {
        ModelManager_1.ModelManager.BattlePassModel.IsRequiringViewData = !1;
      });
  }
  static async mOi() {
    ModelManager_1.ModelManager.BattlePassModel.IsRequiringViewData = !0;
    var e = Protocol_1.Aki.Protocol.xWn.create();
    var e = await Net_1.Net.CallAsync(5160, e);
    if (e)
      if (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.lkn,
          9101,
        );
      else if (
        (ModelManager_1.ModelManager.BattlePassModel.SetDataFromBattlePassResponse(
          e,
        ),
        ModelManager_1.ModelManager.BattlePassModel.GetInTimeRange())
      ) {
        var t = Protocol_1.Aki.Protocol.$Wn.create();
        var t = await Net_1.Net.CallAsync(6375, t);
        if (t)
          if (t.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              t.lkn,
              24907,
            );
          else {
            ModelManager_1.ModelManager.BattlePassModel.BattlePassTaskMap.clear();
            for (const a of t.V0s)
              ModelManager_1.ModelManager.BattlePassModel.AddTaskDataFromProtocol(
                a,
              );
            ModelManager_1.ModelManager.BattlePassModel.SetDayEndTime(t.xfs),
              ModelManager_1.ModelManager.BattlePassModel.SetWeekEndTime(t.bfs),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ReceiveBattlePassTaskEvent,
                !1,
              ),
              e.wfs.Lfs
                ? e.wfs.Ufs
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
    const e = Protocol_1.Aki.Protocol.QWn.create();
    Net_1.Net.Send(29467, e),
      (ModelManager_1.ModelManager.BattlePassModel.HadEnter = !0);
  }
  static RequestTakeBattlePassReward(t, a, r, o) {
    const e = Protocol_1.Aki.Protocol.qWn.create();
    (e.Ikn = t),
      (e.r3n = a),
      (e.G3n = r),
      Net_1.Net.Call(5030, e, (e) => {
        e &&
          (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ModelManager_1.ModelManager.BattlePassModel.OnResponseTakeReward(
                t,
                a,
                r,
                o,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                11502,
              ));
      });
  }
  static RequestTakeAllRewardResponse() {
    const e = Protocol_1.Aki.Protocol.NWn.create();
    Net_1.Net.Call(1368, e, (e) => {
      e &&
        (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
          ? ModelManager_1.ModelManager.BattlePassModel.UpdateRewardDataFromBattlePassTakeAllRewardResponse(
              e,
            )
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              28483,
            ));
    });
  }
  static RequestBattlePassTask() {
    const e = Protocol_1.Aki.Protocol.$Wn.create();
    Net_1.Net.Call(6375, e, (e) => {
      if (e)
        if (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys) {
          ModelManager_1.ModelManager.BattlePassModel.BattlePassTaskMap.clear();
          for (const a of e.V0s)
            ModelManager_1.ModelManager.BattlePassModel.AddTaskDataFromProtocol(
              a,
            );
          const t =
            ModelManager_1.ModelManager.BattlePassModel.GetWeekEndTime() !==
            e.bfs;
          ModelManager_1.ModelManager.BattlePassModel.SetWeekEndTime(e.bfs),
            ModelManager_1.ModelManager.BattlePassModel.SetDayEndTime(e.xfs),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.ReceiveBattlePassTaskEvent,
              t,
            );
        } else
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            24907,
          );
    });
  }
  static TryRequestTaskList(e) {
    ModelManager_1.ModelManager.BattlePassModel.TryRequestTaskList(e);
  }
  static RequestBattlePassTaskTake(e) {
    const t = Protocol_1.Aki.Protocol.WWn.create();
    (t.j4n = e),
      Net_1.Net.Call(21235, t, (e) => {
        e &&
          (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
            ? ModelManager_1.ModelManager.BattlePassModel.UpdateTaskDataFromBattlePassTaskTakeResponse(
                e.j4n,
              )
            : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                7724,
              ));
      });
  }
  static RequestBuyBattlePassLevel(e) {
    const t = Protocol_1.Aki.Protocol.XWn.create();
    (t.r3n = e), Net_1.Net.Call(13606, t, () => {});
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(16849, BattlePassController.dOi),
      Net_1.Net.Register(17630, BattlePassController.COi),
      Net_1.Net.Register(25363, BattlePassController.gOi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16849),
      Net_1.Net.UnRegister(17630),
      Net_1.Net.UnRegister(25363);
  }
  static cOi() {
    BattlePassController.fOi ||
      (BattlePassController.fOi = TimerSystem_1.TimerSystem.Forever(() => {
        TimeUtil_1.TimeUtil.GetServerTime() >=
          ModelManager_1.ModelManager.BattlePassModel.GetBattlePassEndTime() &&
          (ModelManager_1.ModelManager.BattlePassModel.SetInTimeRange(!1),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnBattlePassExpireEvent,
          ),
          this.uOi());
      }, 500));
  }
  static ShowTimePassConfirm() {
    const e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(145);
    e.SetCloseFunction(() => {
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ResetToBattleView,
      );
    }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
  static uOi() {
    BattlePassController.fOi &&
      (TimerSystem_1.TimerSystem.Remove(BattlePassController.fOi),
      (BattlePassController.fOi = void 0));
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.TYt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.pOi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CrossDay,
        this.oOe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.TYt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFunctionOpenUpdate,
        this.pOi,
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
    let e;
    let t;
    const a = CommonParamById_1.configCommonParamById.GetIntConfig(
      "PrimaryBattlePassGiftPack",
    );
    const r = [];
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
    let e, t;
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
          ? this.vOi(e) ||
            ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftRequest(
              t.GetGoodsData().Id,
            )
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "BattlePassShopNotInTime",
            ));
  }
  static PayHighBattlePass() {
    let e, t;
    FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check()
      ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(165)),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          e,
        ))
      : (e = ModelManager_1.ModelManager.BattlePassModel.PayType) ===
          Protocol_1.Aki.Protocol.B2s.Proto_NoPaid
        ? ((t =
            ModelManager_1.ModelManager.BattlePassModel.GetHighBattlePassGoodsId()),
          ModelManager_1.ModelManager.PayGiftModel.GetPayShopGoodsById(
            t,
          )?.InSellTime()
            ? this.vOi(t) ||
              ControllerHolder_1.ControllerHolder.PayGiftController.SendPayGiftRequest(
                t,
              )
            : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "BattlePassShopNotInTime",
              ))
        : e === Protocol_1.Aki.Protocol.B2s.Proto_Paid &&
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
  static vOi(e) {
    let t;
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
((exports.BattlePassController = BattlePassController).lOi = () => {
  BattlePassController.OpenBattlePassView();
}),
  (BattlePassController._Oi = () => {
    BattlePassController.CloseView();
  }),
  (BattlePassController.dOi = (e) => {
    for (const t of e.V0s)
      ModelManager_1.ModelManager.BattlePassModel.AddTaskDataFromProtocol(t);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.UpdateBattlePassTaskEvent,
    );
  }),
  (BattlePassController.COi = (e) => {
    ModelManager_1.ModelManager.BattlePassModel.UpdateExpDataFromBattlePassExpUpdateNotify(
      e.r3n,
      e.k3n,
      e.Rfs,
    );
  }),
  (BattlePassController.gOi = (t) => {
    if (ModelManager_1.ModelManager.BattlePassModel.GetInTimeRange()) {
      const a = ModelManager_1.ModelManager.BattlePassModel.PayType;
      ModelManager_1.ModelManager.BattlePassModel.PayType = t.Dfs;
      let e = t.Dfs === Protocol_1.Aki.Protocol.B2s.Proto_Paid ? 1 : 3;
      a === Protocol_1.Aki.Protocol.B2s.Proto_NoPaid &&
        a !== t.Dfs &&
        (ModelManager_1.ModelManager.BattlePassModel.UpdateRewardDataFormFreeToPay(),
        (e = e === 3 ? 2 : e)),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ReceiveBattlePassDataEvent,
        ),
        UiManager_1.UiManager.OpenView("BattlePassUnlockView", e);
    }
  }),
  (BattlePassController.fOi = void 0),
  (BattlePassController.pOi = (e, t) => {
    e === 10040 && t && BattlePassController.RequestBattlePassDataForTask();
  }),
  (BattlePassController.TYt = () => {
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10040) &&
      BattlePassController.RequestBattlePassDataForTask();
  }),
  (BattlePassController.oOe = () => {
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10040) &&
      ModelManager_1.ModelManager.BattlePassModel.GetInTimeRange() &&
      BattlePassController.RequestBattlePassTask();
  });
// # sourceMappingURL=BattlePassController.js.map
