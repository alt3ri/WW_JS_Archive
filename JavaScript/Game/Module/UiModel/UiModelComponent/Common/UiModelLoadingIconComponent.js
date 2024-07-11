"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    var n,
      s = arguments.length,
      r =
        s < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, i, o);
    else
      for (var d = e.length - 1; 0 <= d; d--)
        (n = e[d]) && (r = (s < 3 ? n(r) : 3 < s ? n(t, i, r) : n(t, i)) || r);
    return 3 < s && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelLoadingIconComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiLayerType_1 = require("../../../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  RoleModelLoadingItem_1 = require("../../../RoleUi/Component/RoleModelLoadingItem"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelUtil_1 = require("../../UiModelUtil"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelLoadingIconComponent = class UiModelLoadingIconComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.UiModelActorComponent = void 0),
      (this.UiModelDataComponent = void 0),
      (this.LoadingItem = void 0),
      (this.eBr = () => {
        (this.NeedTick = !0), this.Mjs(), this.LoadingItem.SetLoadingActive(!0);
      }),
      (this.Fwr = () => {
        (this.NeedTick = !1), this.LoadingItem.SetLoadingActive(!1);
      });
  }
  OnInit() {
    (this.LoadingItem = new RoleModelLoadingItem_1.RoleModelLoadingItem()),
      this.LoadingItem.CreateByResourceIdAsync(
        "UiItem_Loading_Prefab",
        UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop),
      ),
      (this.UiModelActorComponent = this.Owner.CheckGetComponent(1)),
      (this.UiModelDataComponent = this.Owner.CheckGetComponent(0));
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.BeforeUiModelLoadStart,
      this.eBr,
    ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelLoadComplete,
        this.Fwr,
      );
  }
  OnTick(e) {
    this.Mjs();
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.BeforeUiModelLoadStart,
      this.eBr,
    ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelLoadComplete,
        this.Fwr,
      ),
      this.LoadingItem.Destroy();
  }
  SetLoadingOpen(e) {
    this.LoadingItem.SetLoadingOpen(e);
  }
  SetLoadingActive(e) {
    this.LoadingItem.SetLoadingActive(e);
  }
  Mjs() {
    var e;
    this.UiModelDataComponent?.GetLoadingIconFollowState() &&
      this.UiModelActorComponent &&
      ((e = UiModelUtil_1.UiModelUtil.GetActorLguiPos(
        this.UiModelActorComponent.GetActor(),
      )),
      this.LoadingItem.SetIconPosition(e));
  }
};
(UiModelLoadingIconComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(3)],
  UiModelLoadingIconComponent,
)),
  (exports.UiModelLoadingIconComponent = UiModelLoadingIconComponent);
//# sourceMappingURL=UiModelLoadingIconComponent.js.map
