"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MView = void 0);
const UE = require("ue"),
  BaseConfigController_1 = require("../../../../Launcher/BaseConfig/BaseConfigController"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  CHECK_INTERVAL = 1e3;
class MView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.OQl = !1),
      (this.FQl = ""),
      (this.NQl = 0),
      (this.Xy = 0),
      (this.KTc = () => {
        this.VQl();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MReady, this.KTc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MReady, this.KTc);
  }
  OnStart() {
    BaseConfigController_1.BaseConfigController.GetRptIsOpen()
      ? ((this.FQl = ModelManager_1.ModelManager.LoginModel.GetWaterMarkPath()),
        this.VQl())
      : (this.OQl = !0);
  }
  OnTick(e) {
    this.OQl ||
      (this.NQl > CHECK_INTERVAL
        ? ((this.NQl = 0), this.VQl())
        : (this.NQl += e));
  }
  VQl() {
    var e, t;
    UE.KuroStaticLibrary.FileExists(this.FQl) &&
      ((this.OQl = !0),
      (e = this.GetTexture(0)),
      (t = UE.LGUIBPLibrary.CreateTexture2DFromPath(
        this.FQl,
        "Mask" + this.Xy,
        0,
      )),
      this.Xy++,
      t) &&
      (e?.SetTexture(t), e?.SetUIActive(!0));
  }
}
exports.MView = MView;
//# sourceMappingURL=MView.js.map
