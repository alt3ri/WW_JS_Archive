"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldLevelController = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder");
class WorldLevelController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OriginWorldLevelUp,
      this.OnOriginWorldLevelUp,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BackLoginView,
        this.loo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OriginWorldLevelUp,
      this.OnOriginWorldLevelUp,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BackLoginView,
        this.loo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  static OnRegisterNetEvent() {}
  static OnUnRegisterNetEvent() {}
  static OnBasicInfoNotify(e) {
    this.SetWorldLevelAttributes(e);
  }
  static OnPlayerAttrNotify(e) {
    this.SetWorldLevelAttributes(e);
  }
  static SetWorldLevelAttributes(e) {
    for (const o of e)
      o.j4n === Protocol_1.Aki.Protocol.pNs.oSs &&
        (ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel = o.OSs),
        o.j4n === Protocol_1.Aki.Protocol.pNs.nSs &&
          (ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel = o.OSs),
        o.j4n === Protocol_1.Aki.Protocol.pNs.oOs &&
          (ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp =
            o.OSs),
        o.j4n === Protocol_1.Aki.Protocol.pNs._7n &&
          (ModelManager_1.ModelManager.WorldLevelModel.Sex = o.OSs),
        o.j4n === Protocol_1.Aki.Protocol.pNs.Proto_Sign &&
          ModelManager_1.ModelManager.PersonalModel.SetSignature(o.b8n);
  }
  static SendWorldLevelDownRequest() {
    var e = Protocol_1.Aki.Protocol.A0s.create();
    Net_1.Net.Call(2700, e, (e) => {
      e &&
        (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
          ? ((ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel =
              e.oSs),
            (ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel = e.nSs),
            (ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp =
              e.oOs),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              WorldLevelController.GetLocalText(
                "WorldLevelAdjustTo",
                ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel.toString(),
              ),
            ))
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              1868,
            ));
    });
  }
  static SendWorldLevelRegainRequest() {
    var e = Protocol_1.Aki.Protocol.U0s.create();
    Net_1.Net.Call(1413, e, (e) => {
      e &&
        (e.O4n === Protocol_1.Aki.Protocol.O4n.NRs
          ? ((ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel =
              e.oSs),
            (ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel = e.nSs),
            (ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp =
              e.oOs),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              WorldLevelController.GetLocalText(
                "WorldLevelAdjustTo",
                ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel.toString(),
              ),
            ))
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              13199,
            ));
    });
  }
  static GetLocalText(e, o) {
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e),
      r = UE.NewArray(UE.BuiltinString);
    return r.Add(o), UE.KuroStaticLibrary.KuroFormatText(e ?? "", r);
  }
}
((exports.WorldLevelController = WorldLevelController).OnOriginWorldLevelUp =
  () => {
    UiManager_1.UiManager.IsViewShow("WorldLevelUpView")
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WorldLevelUpViewRefresh,
        )
      : UiManager_1.UiManager.OpenView("WorldLevelUpView");
  }),
  (WorldLevelController.OpenWorldLevelInfoView = () => {
    UiManager_1.UiManager.IsViewShow("WorldLevelInfoView") ||
      UiManager_1.UiManager.OpenView("WorldLevelInfoView");
  }),
  (WorldLevelController.$Ge = (e) => {
    "FunctionView" === e &&
      UiManager_1.UiManager.IsViewShow("WorldLevelInfoView") &&
      UiManager_1.UiManager.CloseView("WorldLevelInfoView");
  }),
  (WorldLevelController.loo = () => {
    UiManager_1.UiManager.IsViewShow("WorldLevelInfoView") &&
      UiManager_1.UiManager.CloseView("WorldLevelInfoView");
  });
//# sourceMappingURL=WorldLevelController.js.map
