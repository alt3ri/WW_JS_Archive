"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SdkPayProductInformationView = void 0);
const UE = require("ue"),
  PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase");
class SdkPayProductInformationView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.C0t = void 0),
      (this.Awe = () => {
        this.CloseMe(),
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkPayEnd, 0);
      }),
      (this.L3e = () => {
        this.C0t && this.C0t.OnClickConfirmBtn(this.C0t.ProductId),
          this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [2, this.Awe],
        [3, this.L3e],
      ]);
  }
  OnStart() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.HidePlayStationStoreIcon(),
      (this.C0t = this.OpenParam);
  }
  OnBeforeShow() {
    this.mGe(), this.Dke();
  }
  mGe() {
    this.C0t && this.GetText(0)?.SetText(this.C0t.ProductName);
  }
  Dke() {
    this.C0t && this.GetText(1)?.SetText(this.C0t.ContentName);
  }
}
exports.SdkPayProductInformationView = SdkPayProductInformationView;
//# sourceMappingURL=SdkPayProductInformationView.js.map
