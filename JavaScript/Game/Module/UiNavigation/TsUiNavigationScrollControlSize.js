"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TsUiNavigationScrollControlSize = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log");
class TsUiNavigationScrollControlSize extends UE.LGUIBehaviour {
  constructor() {
    super(...arguments),
      (this.ScrollViewActor = void 0),
      (this.ScrollView = void 0),
      (this.SizeController = void 0),
      (this.ScrollHeight = 0),
      (this.ContentItem = void 0),
      (this.UseScroll = !1);
  }
  AwakeBP() {
    (this.SizeController = this.GetOwner()?.GetComponentByClass(
      UE.UISizeControlByOther.StaticClass(),
    )),
      this.SizeController
        ? ((this.ScrollView = this.ScrollViewActor.GetComponentByClass(
            UE.UIScrollViewWithScrollbarComponent.StaticClass(),
          )),
          (this.ContentItem = this.ScrollView.ContentUIItem),
          (this.ScrollHeight = this.ScrollView.RootUIComp.GetHeight()),
          this.SizeController.SetTargetActor(this.ScrollViewActor),
          (this.UseScroll = !0))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "该组件需要放在有SizeControlByOther的Actor上",
          );
  }
  LateUpdateBP(i) {
    var t = this.ContentItem?.GetHeight() ?? 0;
    t <= this.ScrollHeight && this.UseScroll
      ? ((this.UseScroll = !1),
        this.SizeController?.SetTargetActor(this.ScrollView.Content))
      : t > this.ScrollHeight &&
        !this.UseScroll &&
        ((this.UseScroll = !0),
        this.SizeController?.SetTargetActor(this.ScrollViewActor));
  }
}
(exports.TsUiNavigationScrollControlSize = TsUiNavigationScrollControlSize),
  (exports.default = TsUiNavigationScrollControlSize);
//# sourceMappingURL=TsUiNavigationScrollControlSize.js.map
