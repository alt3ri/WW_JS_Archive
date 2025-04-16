"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldLevelController = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
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
    for (const t of e) {
      var o, r;
      t.Z4n === Protocol_1.Aki.Protocol.LNs.uSs &&
        (ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel = t.jSs),
        t.Z4n === Protocol_1.Aki.Protocol.LNs.cSs &&
          (ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel = t.jSs),
        t.Z4n === Protocol_1.Aki.Protocol.LNs.uOs &&
          (ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp =
            t.jSs),
        t.Z4n === Protocol_1.Aki.Protocol.LNs.v7n &&
          ((ModelManager_1.ModelManager.WorldLevelModel.Sex = t.jSs),
          ModelManager_1.ModelManager.PersonalModel.SetSex(t.jSs)),
        t.Z4n === Protocol_1.Aki.Protocol.LNs.Proto_Sign &&
          ModelManager_1.ModelManager.PersonalModel.SetSignature(t.j8n),
        t.Z4n === Protocol_1.Aki.Protocol.LNs.Proto_PlayerTitle &&
          ((r = 2 === (o = t.j8n.split("_")).length ? parseInt(o[1]) : void 0),
          ModelManager_1.ModelManager.PersonalModel.SetDressedPlayerTitle(
            parseInt(o[0]),
            r,
          ));
    }
  }
  static SendWorldLevelDownRequest() {
    var e = Protocol_1.Aki.Protocol.q0s.create();
    Net_1.Net.Call(23999, e, (e) => {
      e &&
        (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
          ? ((ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel =
              e.uSs),
            (ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel = e.cSs),
            (ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp =
              e.uOs),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              WorldLevelController.GetLocalText(
                "WorldLevelAdjustTo",
                ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel.toString(),
              ),
            ))
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              16017,
            ));
    });
  }
  static SendWorldLevelRegainRequest() {
    var e = Protocol_1.Aki.Protocol.O0s.create();
    Net_1.Net.Call(20990, e, (e) => {
      e &&
        (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs
          ? ((ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel =
              e.uSs),
            (ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel = e.cSs),
            (ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp =
              e.uOs),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              WorldLevelController.GetLocalText(
                "WorldLevelAdjustTo",
                ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel.toString(),
              ),
            ))
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              17562,
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
