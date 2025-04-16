"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipInterfaceController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SkipTaskManager_1 = require("./SkipTaskManager");
class SkipInterfaceController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.Ore(), !0;
  }
  static OnClear() {
    return this.kre(), SkipTaskManager_1.SkipTaskManager.Clear(), !0;
  }
  static Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OpenViewBegined,
      this.vIo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.EnterGameSuccess,
        this.GFl,
      );
  }
  static kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OpenViewBegined,
      this.vIo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EnterGameSuccess,
        this.GFl,
      );
  }
  static async gFl() {
    var e = Protocol_1.Aki.Protocol.pv_.create(),
      e = await Net_1.Net.CallAsync(25394, e);
    e &&
      ModelManager_1.ModelManager.SkipInterfaceModel.FullUpdateAccessPathTimeServerConfig(
        e.Pb_,
      );
  }
}
(exports.SkipInterfaceController = SkipInterfaceController),
  ((_a = SkipInterfaceController).vIo = (e) => {
    SkipTaskManager_1.SkipTaskManager.CheckContainRingView(e);
  }),
  (SkipInterfaceController.GFl = () => {
    _a.gFl();
  });
//# sourceMappingURL=SkipInterfaceController.js.map
