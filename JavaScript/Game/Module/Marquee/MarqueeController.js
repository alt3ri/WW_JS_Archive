"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarqueeController = void 0);
const Json_1 = require("../../../Core/Common/Json"),
  Log_1 = require("../../../Core/Common/Log"),
  Http_1 = require("../../../Core/Http/Http"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  CdnServerDebugConfig_1 = require("../Debug/CdnServerDebugConfig"),
  LoginDefine_1 = require("../Login/Data/LoginDefine"),
  MarqueeModel_1 = require("./MarqueeModel"),
  INTERVAL_OFFSET = 5;
class MarqueeController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LocalStorageInitPlayerId,
      MarqueeController.VAi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        MarqueeController.HAi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BeforeLoadMap,
        MarqueeController.jAi,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LocalStorageInitPlayerId,
      MarqueeController.VAi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        MarqueeController.HAi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BeforeLoadMap,
        MarqueeController.jAi,
      );
  }
  static TestMarquee(e) {
    e =
      '[{"contents":[{"language":"zh-Hans","content":"10047跑马灯已上架"},{"language":"en","content":"10047跑马灯已上架"},{"language":"ja","content":""},{"language":"ko","content":""},{"language":"ru","content":""},{"language":"zh-Hant","content":""},{"language":"de","content":""},{"language":"es","content":""},{"language":"pt","content":""},{"language":"id","content":""},{"language":"fr","content":""},{"language":"vi","content":""},{"language":"th","content":""}],"id":10048,"startTimeMs":1698313421000,"endTimeMs":1703148916000,"timeInterval":0,"times":999,"platform":[1,2,3],"channel":["0","18"]},{"contents":[{"language":"zh-Hans","content":"第二条跑马灯5444545454545445454545454"},{"language":"en","content":"en 第二条跑马灯"},{"language":"ja","content":""},{"language":"ko","content":""},{"language":"ru","content":""},{"language":"zh-Hant","content":""},{"language":"de","content":""},{"language":"es","content":""},{"language":"pt","content":""},{"language":"id","content":""},{"language":"fr","content":""},{"language":"vi","content":""},{"language":"th","content":""}],"id":{0},"startTimeMs":1701846026000,"endTimeMs":1708142026000,"timeInterval":10,"times":2,"platform":[1,3],"channel":[]}]'.replace(
        "{0}",
        e,
      );
    this.WAi(200, e), MarqueeController.CloseMarqueeView(!0);
  }
  static WAi(e, n) {
    const a = ModelManager_1.ModelManager.MarqueeModel;
    200 !== e && 404 === e
      ? MarqueeController.KAi()
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Marquee", 9, "接收到跑马灯数据", ["marquee", n]),
        n?.includes("contents")
          ? (e = Json_1.Json.Parse(n))
            ? (e.forEach((e) => {
                var n = new MarqueeModel_1.MarqueeData();
                n.Phrase(e), a.AddOrUpdateMarqueeDate(n);
              }),
              a.CurMarquee &&
                !PublicUtil_1.PublicUtil.IsInIpWhiteList(
                  a.CurMarquee.WhiteLists,
                ) &&
                MarqueeController.CloseMarqueeView(!1))
            : MarqueeController.KAi()
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Marquee",
              28,
              "跑马灯数据不正确未包含 contents 字段，需要检查跑马灯数据",
            ));
  }
  static KAi() {
    UiManager_1.UiManager.IsViewShow("MarqueeView") &&
      UiManager_1.UiManager.CloseView("MarqueeView"),
      ModelManager_1.ModelManager.MarqueeModel.RemoveAllMarqueeData();
  }
  static CloseMarqueeView(e = !0) {
    var n = ModelManager_1.ModelManager.MarqueeModel.CurMarquee;
    ModelManager_1.ModelManager.MarqueeModel.RemoveMarqueeData(n?.Id) ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Marquee", 28, "跑马灯数据异常, 数据重复删除", [
          "incId",
          n?.Id,
        ])),
      (ModelManager_1.ModelManager.MarqueeModel.CurMarquee = void 0),
      UiManager_1.UiManager.IsViewShow("MarqueeView")
        ? UiManager_1.UiManager.CloseView("MarqueeView", () => {
            e &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("Marquee", 28, "关闭跑马灯检查下一个跑马灯"),
              MarqueeController.QAi());
          })
        : e &&
          (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Marquee", 28, "检查下一个跑马灯"),
          MarqueeController.QAi());
  }
  static QAi() {
    var e;
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Marquee", 28, "检查跑马灯"),
      UiManager_1.UiManager.IsViewShow("MarqueeView") ||
      UiManager_1.UiManager.IsViewOpen("MarqueeView")
        ? Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Marquee",
            28,
            "CheckMarquee",
            ["IsViewShow", UiManager_1.UiManager.IsViewShow("MarqueeView")],
            ["IsViewOpen", UiManager_1.UiManager.IsViewOpen("MarqueeView")],
          )
        : (ModelManager_1.ModelManager.MarqueeModel.SortMarqueeQueue(),
          (e = ModelManager_1.ModelManager.MarqueeModel.PeekMarqueeData())
            ? this.CheckCurMarqueeValid(e) &&
              PublicUtil_1.PublicUtil.IsInIpWhiteList(e.WhiteLists)
              ? UiManager_1.UiManager.OpenView("MarqueeView")
              : (ModelManager_1.ModelManager.MarqueeModel.RemoveMarqueeData(
                  e.Id,
                ),
                MarqueeController.QAi())
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("Marquee", 28, "获取队列的第一个跑马灯数据空"));
  }
  static CheckCurMarqueeValid(e) {
    var n, a;
    return !(
      !e ||
      ((n = TimeUtil_1.TimeUtil.GetServerTime()),
      (a = ModelManager_1.ModelManager.MarqueeModel.GetScrollingTime(e)),
      n > e.EndTime) ||
      n < e.BeginTime ||
      a >= e.ScrollTimes
    );
  }
}
((exports.MarqueeController = MarqueeController).VAi = () => {
  ModelManager_1.ModelManager.MarqueeModel.InitMarqueeStorageDataMap();
}),
  (MarqueeController.jAi = () => {
    void 0 !== MarqueeModel_1.MarqueeModel.TimerId &&
      (TimerSystem_1.TimerSystem.Remove(MarqueeModel_1.MarqueeModel.TimerId),
      (MarqueeModel_1.MarqueeModel.TimerId = void 0));
  }),
  (MarqueeController.HAi = () => {
    ModelManager_1.ModelManager.LoginModel.IsLoginStatus(
      LoginDefine_1.ELoginStatus.EnterGameRet,
    ) &&
      void 0 === MarqueeModel_1.MarqueeModel.TimerId &&
      (MarqueeModel_1.MarqueeModel.TimerId = TimerSystem_1.TimerSystem.Forever(
        MarqueeController.XAi,
        TimeUtil_1.TimeUtil.Minute * TimeUtil_1.TimeUtil.InverseMillisecond -
          Math.random() *
            INTERVAL_OFFSET *
            TimeUtil_1.TimeUtil.InverseMillisecond,
      ));
  }),
  (MarqueeController.XAi = () => {
    var e =
      ModelManager_1.ModelManager.LoginServerModel.GetCurrentLoginServerId();
    !StringUtils_1.StringUtils.IsEmpty(e) &&
      ((e = PublicUtil_1.PublicUtil.GetMarqueeUrl2(
        PublicUtil_1.PublicUtil.GetGameId(),
        e,
      )),
      (e =
        CdnServerDebugConfig_1.CdnServerDebugConfig.Singleton.TryGetMarqueeDebugUrl(
          e,
        ))) &&
      Http_1.Http.Get(e, void 0, (e, n, a) => {
        MarqueeController.WAi(n, a), MarqueeController.QAi();
      });
  });
//# sourceMappingURL=MarqueeController.js.map
