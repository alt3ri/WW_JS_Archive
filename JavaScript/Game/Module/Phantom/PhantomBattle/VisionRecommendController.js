"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecommendController = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
class VisionRecommendController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRoleChangeEnd,
      VisionRecommendController.Io_,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleInfoUpdate,
        VisionRecommendController.Io_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveRole,
        VisionRecommendController.To_,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRoleChangeEnd,
      VisionRecommendController.Io_,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleInfoUpdate,
        VisionRecommendController.Io_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveRole,
        VisionRecommendController.To_,
      );
  }
  static RequestRoleVisionRecommendData(o) {
    var e = new Protocol_1.Aki.Protocol.Qv_();
    (e.Q6n = o),
      Net_1.Net.Call(20746, Protocol_1.Aki.Protocol.Qv_.create(e), (e) => {
        ModelManager_1.ModelManager.VisionRecommendModel.OnRoleRecommendData(
          o,
          e,
        );
      });
  }
  static RequestRoleVisionRecommendAttr(o) {
    var e = new Protocol_1.Aki.Protocol.Xv_();
    (e.Q6n = o),
      Net_1.Net.Call(19840, Protocol_1.Aki.Protocol.Xv_.create(e), (e) => {
        ModelManager_1.ModelManager.VisionRecommendModel.OnRoleRecommendAttrData(
          o,
          e,
        );
      });
  }
}
((exports.VisionRecommendController = VisionRecommendController).Io_ = () => {
  for (const e of ModelManager_1.ModelManager.RoleModel.GetRoleList())
    VisionRecommendController.RequestRoleVisionRecommendData(e.GetRoleId()),
      VisionRecommendController.RequestRoleVisionRecommendAttr(e.GetRoleId());
}),
  (VisionRecommendController.To_ = (e) => {
    VisionRecommendController.RequestRoleVisionRecommendData(e),
      VisionRecommendController.RequestRoleVisionRecommendAttr(e);
  });
//# sourceMappingURL=VisionRecommendController.js.map
