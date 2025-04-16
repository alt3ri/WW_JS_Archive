"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BirthdayController = void 0);
const BirthDayByItemId_1 = require("../../../Core/Define/ConfigQuery/BirthDayByItemId"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  SplashScreenController_1 = require("../SplashScreen/SplashScreenController"),
  SplashScreenTask_1 = require("../SplashScreen/SplashScreenTask"),
  BirthdayDefine_1 = require("./BirthdayDefine");
class BirthdayController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDone,
      this.OnWorldDone,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CrossDayZone,
        this.OnCrossDayZone,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      this.OnWorldDone,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CrossDayZone,
        this.OnCrossDayZone,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(15717, (e) => {
      ModelManager_1.ModelManager.BirthdayModel.UpdateBirthdayInfo(e);
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15717);
  }
  static TrySelectBirthDayCardRoleRequest(r, t) {
    var e;
    ModelManager_1.ModelManager.BirthdayModel.GetSelectedRoleId(t) ||
      (((e = Protocol_1.Aki.Protocol.s01.create()).mjn = r),
      (e.c01 = t),
      Net_1.Net.Call(29539, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                29525,
              )
            : ModelManager_1.ModelManager.BirthdayModel.SetSelectedRole(r, t));
      }));
  }
  static TryBirthDayRewardRequest(e) {
    var r;
    return (
      void 0 ===
        ModelManager_1.ModelManager.BirthdayModel.GetSelectedRoleId(e) &&
      (((r = Protocol_1.Aki.Protocol.h01.create()).c01 = e),
      Net_1.Net.Call(23328, r, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                22833,
              )
            : ModelManager_1.ModelManager.BirthdayModel.SetIsReceiveBirthdayReward(
                !0,
              ));
      }),
      !0)
    );
  }
  static TryOpenBirthdayView() {
    var e;
    ModelManager_1.ModelManager.BirthdayModel.GetBirthdayIsReset() &&
      ModelManager_1.ModelManager.FunctionModel.IsOpen(10084) &&
      ((e = new SplashScreenTask_1.SplashScreenTask(2, 0, () => {
        var e = ModelManager_1.ModelManager.BirthdayModel.ThisBirthdayYear;
        UiManager_1.UiManager.OpenView(
          "BirthdayRoleSelectView",
          new BirthdayDefine_1.BirthdayInfo(0, e),
        );
      })),
      SplashScreenController_1.SplashScreenController.PushSplashScreenTask(e));
  }
  static UseBirthdayItem(e) {
    var r,
      e = BirthDayByItemId_1.configBirthDayByItemId.GetConfig(e).LimitYear,
      t = ModelManager_1.ModelManager.BirthdayModel.GetSelectedRoleId(e);
    t
      ? (((r =
          new LogReportDefine_1.BirthdayRepeatEnterEvent()).i_trigger_type = 1),
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(r),
        UiManager_1.UiManager.OpenView(
          "BirthdayLetterView",
          new BirthdayDefine_1.BirthdayInfo(1, e, t),
        ))
      : UiManager_1.UiManager.OpenView(
          "BirthdayRoleSelectView",
          new BirthdayDefine_1.BirthdayInfo(1, e),
        );
  }
}
(exports.BirthdayController = BirthdayController),
  ((_a = BirthdayController).OnWorldDone = () => {
    var e = ModelManager_1.ModelManager.BirthdayModel.IsDuringBirthday();
    !ModelManager_1.ModelManager.BirthdayModel.IsReceiveBirthdayReward &&
      e &&
      _a.TryOpenBirthdayView();
  }),
  (BirthdayController.OnCrossDayZone = () => {
    var e = ModelManager_1.ModelManager.BirthdayModel.IsDuringBirthday();
    !ModelManager_1.ModelManager.BirthdayModel.IsReceiveBirthdayReward &&
      e &&
      _a.TryOpenBirthdayView();
  });
//# sourceMappingURL=BirthdayController.js.map
