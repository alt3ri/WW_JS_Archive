"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TutorialController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
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
    Net_1.Net.Register(27351, this.PRo);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27351);
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
    var o = Protocol_1.Aki.Protocol.E0s.create();
    (o.s5n = e),
      Net_1.Net.Call(25338, o, (e) => {
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
  static xRo(n) {
    var e;
    ConfigManager_1.ConfigManager.TutorialConfig.HasUnlockReward(n) &&
      (((e = Protocol_1.Aki.Protocol.E0s.create()).s5n = n),
      Net_1.Net.Call(18851, e, (e) => {
        var o, t, r;
        e &&
          e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
          ((o = Number(Object.keys(e._vs)[0])),
          (e = e._vs[o]),
          (t = ModelManager_1.ModelManager.TutorialModel.RewardInfo)
            ? !(t = t.gws) ||
              !(r = Object.keys(t)) ||
              r.length <= 0 ||
              !(t = t[r[0]]?.O9n) ||
              t.length <= 0 ||
              (t[0].m9n += e)
            : ((r = {
                P6n: ConfigManager_1.ConfigManager.TutorialConfig.GetTutorial(n)
                  .DropId,
                x9n: 0,
                B9n: 1,
                gws: {
                  0: {
                    O9n: [
                      {
                        W9n: TutorialDefine_1.TutorialUtils
                          .FixedDropDropShowPlanId,
                        L8n: o,
                        m9n: e,
                        b9n: 0,
                      },
                    ],
                  },
                },
              }),
              (ModelManager_1.ModelManager.TutorialModel.RewardInfo = r)));
      }));
  }
  static TryOpenAwardUiViewPending() {
    var e;
    ModelManager_1.ModelManager.TutorialModel.RewardInfo &&
      ((e = ModelManager_1.ModelManager.TutorialModel.RewardInfo),
      ItemHintController_1.ItemHintController.AddItemRewardList(e),
      (ModelManager_1.ModelManager.TutorialModel.RewardInfo = void 0));
  }
  static TryUnlockAndOpenTutorialTip(e, o = void 0) {
    var t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(e),
      r = t?.CopiedFrom || e;
    const n = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorial(r);
    t?.PageId?.length !== n?.PageId?.length ||
    t?.PageId?.some((e, o) => e !== n?.PageId[o])
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Tutorial",
            74,
            "复制图文引导和源图文引导内容不一致",
            ["Id", e],
          ),
        o(!1))
      : ModelManager_1.ModelManager.TutorialModel.GetSavedDataById(r)
        ? o(!0)
        : (((t = Protocol_1.Aki.Protocol.E0s.create()).s5n = r),
          Net_1.Net.Call(25338, t, (e) => {
            !e || e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
              ? o(!1)
              : (ModelManager_1.ModelManager.TutorialModel.UpdateUnlockTutorials(
                  e.aOs,
                ),
                o(!0));
          }));
  }
}
((exports.TutorialController = TutorialController).PRo = (e) => {
  if (e)
    for (const o of e.sOs)
      ModelManager_1.ModelManager.TutorialModel.UpdateUnlockTutorials(o);
}),
  (TutorialController.Q5e = () => {
    var e = Protocol_1.Aki.Protocol.p0s.create();
    Net_1.Net.Call(20738, e, (e) => {
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
