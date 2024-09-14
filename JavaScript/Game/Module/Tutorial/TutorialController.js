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
    Net_1.Net.Register(20918, this.PRo);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20918);
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
    var t = Protocol_1.Aki.Protocol.E0s.create();
    (t.s5n = e),
      Net_1.Net.Call(18457, t, (e) => {
        e &&
          e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
          ModelManager_1.ModelManager.TutorialModel.UpdateUnlockTutorials(
            e.aOs,
          );
      });
  }
  static RemoveRedDotTutorialId(e) {
    ModelManager_1.ModelManager.TutorialModel.RemoveRedDotTutorialId(e),
      this.xRo(e);
  }
  static xRo(o) {
    var e = Protocol_1.Aki.Protocol.E0s.create();
    (e.s5n = o),
      Net_1.Net.Call(27821, e, (e) => {
        var t;
        e &&
          e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
          ((t = Number(Object.keys(e._vs)[0])),
          (e = e._vs[t]),
          ModelManager_1.ModelManager.TutorialModel.RewardInfo
            ? (ModelManager_1.ModelManager.TutorialModel.RewardInfo.O9n[0].m9n +=
                e)
            : ((t = {
                P6n: ConfigManager_1.ConfigManager.TutorialConfig.GetTutorial(o)
                  .DropId,
                O9n: [
                  {
                    W9n: TutorialDefine_1.TutorialUtils.FixedDropDropShowPlanId,
                    L8n: t,
                    m9n: e,
                    b9n: 0,
                  },
                ],
                x9n: 0,
                B9n: 1,
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
      : (((o = Protocol_1.Aki.Protocol.E0s.create()).s5n = e),
        Net_1.Net.Call(18457, o, (e) => {
          !e || e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? t(!1)
            : (ModelManager_1.ModelManager.TutorialModel.UpdateUnlockTutorials(
                e.aOs,
              ),
              t(!0));
        }));
  }
}
((exports.TutorialController = TutorialController).PRo = (e) => {
  if (e)
    for (const t of e.sOs)
      ModelManager_1.ModelManager.TutorialModel.UpdateUnlockTutorials(t);
}),
  (TutorialController.Q5e = () => {
    var e = Protocol_1.Aki.Protocol.p0s.create();
    Net_1.Net.Call(21138, e, (e) => {
      e &&
        (ModelManager_1.ModelManager.TutorialModel.InitUnlockTutorials(e.sOs),
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
