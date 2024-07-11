"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TutorialController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ItemHintController_1 = require("../ItemHint/ItemHintController"),
  TutorialDefine_1 = require("./TutorialDefine");
class TutorialController extends UiControllerBase_1.UiControllerBase {
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
  static OnRegisterNetEvent() {
    Net_1.Net.Register(17135, this.PRo);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17135);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "TutorialView",
      TutorialController.iVe,
      "TutorialController.CanOpenView",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "TutorialView",
      TutorialController.iVe,
    );
  }
  static OnTutorialTipExistChanged(e) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnTutorialTipExistChanged,
      e,
    );
  }
  static GmUnlockOneTutorial(e) {
    var t = Protocol_1.Aki.Protocol.C0s.create();
    (t.J4n = e),
      Net_1.Net.Call(29738, t, (e) => {
        e &&
          e.O4n === Protocol_1.Aki.Protocol.O4n.NRs &&
          ModelManager_1.ModelManager.TutorialModel.UpdateUnlockTutorials(
            e.eOs,
          );
      });
  }
  static RemoveRedDotTutorialId(e) {
    ModelManager_1.ModelManager.TutorialModel.RemoveRedDotTutorialId(e),
      this.xRo(e);
  }
  static xRo(o) {
    var e = Protocol_1.Aki.Protocol.C0s.create();
    (e.J4n = o),
      Net_1.Net.Call(11656, e, (e) => {
        var t;
        e &&
          e.O4n === Protocol_1.Aki.Protocol.O4n.NRs &&
          ((t = Number(Object.keys(e.rvs)[0])),
          (e = e.rvs[t]),
          ModelManager_1.ModelManager.TutorialModel.RewardInfo
            ? (ModelManager_1.ModelManager.TutorialModel.RewardInfo.U9n[0].o9n +=
                e)
            : ((t = {
                y6n: ConfigManager_1.ConfigManager.TutorialConfig.GetTutorial(o)
                  .DropId,
                U9n: [
                  {
                    q9n: TutorialDefine_1.TutorialUtils.FixedDropDropShowPlanId,
                    f8n: t,
                    o9n: e,
                    L9n: 0,
                  },
                ],
                E9n: 0,
                I9n: 1,
              }),
              (ModelManager_1.ModelManager.TutorialModel.RewardInfo = t)));
      });
  }
  static TryOpenAwardUiViewPending() {
    var e;
    ModelManager_1.ModelManager.TutorialModel.RewardInfo &&
      ((e = ModelManager_1.ModelManager.TutorialModel.RewardInfo),
      ItemHintController_1.ItemHintController.AddItemRewardList(e),
      (ModelManager_1.ModelManager.TutorialModel.RewardInfo = void 0));
  }
  static TryUnlockAndOpenTutorialTip(e, t = void 0) {
    var o;
    ModelManager_1.ModelManager.TutorialModel.GetSavedDataById(e)
      ? t(!0)
      : (((o = Protocol_1.Aki.Protocol.C0s.create()).J4n = e),
        Net_1.Net.Call(29738, o, (e) => {
          !e || e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? t(!1)
            : (ModelManager_1.ModelManager.TutorialModel.UpdateUnlockTutorials(
                e.eOs,
              ),
              t(!0));
        }));
  }
}
((exports.TutorialController = TutorialController).PRo = (e) => {
  if (e)
    for (const t of e.ZGs)
      ModelManager_1.ModelManager.TutorialModel.UpdateUnlockTutorials(t);
}),
  (TutorialController.Q5e = () => {
    var e = Protocol_1.Aki.Protocol.c0s.create();
    Net_1.Net.Call(12127, e, (e) => {
      e &&
        (ModelManager_1.ModelManager.TutorialModel.InitUnlockTutorials(e.ZGs),
        (e =
          ModelManager_1.ModelManager.TutorialModel.GetUnlockedTutorialDataByType(
            TutorialDefine_1.ETutorialType.All,
          ))?.length &&
          ModelManager_1.ModelManager.TutorialModel.InvokeTutorialRedDot(
            e[0].SavedData,
          ),
        ModelManager_1.ModelManager.TutorialModel.InitTutorialTotalData());
    });
  }),
  (TutorialController.iVe = (e) =>
    !(
      !ModelManager_1.ModelManager.FunctionModel.IsOpen(10022) ||
      (UiManager_1.UiManager.IsViewOpen("GuideTutorialTipsView") &&
        !UiManager_1.UiManager.IsViewOpen("FunctionView") &&
        !ModelManager_1.ModelManager.GuideModel.HaveCurrentTutorial())
    )),
  (TutorialController.OpenTutorialView = () => {
    UiManager_1.UiManager.OpenView("TutorialView");
  });
//# sourceMappingURL=TutorialController.js.map
