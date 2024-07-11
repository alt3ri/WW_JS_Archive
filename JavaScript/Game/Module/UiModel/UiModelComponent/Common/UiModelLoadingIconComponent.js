"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, n, i) {
    let o;
    const s = arguments.length;
    let r =
      s < 3 ? t : i === null ? (i = Object.getOwnPropertyDescriptor(t, n)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(e, t, n, i);
    else
      for (let d = e.length - 1; d >= 0; d--)
        (o = e[d]) && (r = (s < 3 ? o(r) : s > 3 ? o(t, n, r) : o(t, n)) || r);
    return s > 3 && r && Object.defineProperty(t, n, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelLoadingIconComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiLayerType_1 = require("../../../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const RoleModelLoadingItem_1 = require("../../../RoleUi/Component/RoleModelLoadingItem");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelLoadingIconComponent = class UiModelLoadingIconComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.LoadingItem = void 0),
      (this.IBr = () => {
        this.LoadingItem.SetLoadingActive(!0);
      }),
      (this.uBr = () => {
        this.LoadingItem.SetLoadingActive(!1);
      });
  }
  OnInit() {
    (this.LoadingItem = new RoleModelLoadingItem_1.RoleModelLoadingItem()),
      this.LoadingItem.CreateByResourceIdAsync(
        "UiItem_Loading_Prefab",
        UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop),
      );
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.BeforeUiModelLoadStart,
      this.IBr,
    ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelLoadComplete,
        this.uBr,
      );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.BeforeUiModelLoadStart,
      this.IBr,
    ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelLoadComplete,
        this.uBr,
      ),
      this.LoadingItem.Destroy();
  }
  SetLoadingOpen(e) {
    this.LoadingItem.SetLoadingOpen(e);
  }
};
(UiModelLoadingIconComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(3)],
  UiModelLoadingIconComponent,
)),
  (exports.UiModelLoadingIconComponent = UiModelLoadingIconComponent);
// # sourceMappingURL=UiModelLoadingIconComponent.js.map
