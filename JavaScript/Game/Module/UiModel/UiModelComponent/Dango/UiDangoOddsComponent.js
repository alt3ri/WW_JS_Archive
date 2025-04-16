"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    var s,
      n = arguments.length,
      r =
        n < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, i, o);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (s = e[h]) && (r = (n < 3 ? s(r) : 3 < n ? s(t, i, r) : s(t, i)) || r);
    return 3 < n && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiDangoOddsComponent = void 0);
const Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiLayerType_1 = require("../../../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  RacingBetsOddsItem_1 = require("../../../RacingBets/View/Item/RacingBetsOddsItem"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelUtil_1 = require("../../UiModelUtil"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiDangoOddsComponent = class UiDangoOddsComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.UiModelActorComponent = void 0),
      (this.UiModelDataComponent = void 0),
      (this.UiOddsItem = void 0),
      (this.Pxc = Vector_1.Vector.Create(0, 0, 120)),
      (this.xzi = Vector_1.Vector.Create(0, 0, 120)),
      (this.Fwr = () => {
        this.Fjs();
      });
  }
  OnInit() {
    (this.UiOddsItem = new RacingBetsOddsItem_1.RacingBetsOddsItem()),
      this.UiOddsItem.CreateByResourceIdAsync(
        "UiItem_RoleBetNum",
        UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop),
      ),
      (this.NeedTick = !0),
      (this.UiModelActorComponent = this.Owner.CheckGetComponent(1)),
      (this.UiModelDataComponent = this.Owner.CheckGetComponent(0));
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.Fwr,
    );
  }
  OnTick(e) {
    this.Fjs();
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.Fwr,
    ),
      this.UiOddsItem.Destroy();
  }
  Fjs() {
    var e, t;
    this.UiModelActorComponent &&
      ((e = this.UiModelActorComponent.GetActor()),
      (t = this.UiModelActorComponent.Actor.GetActorScale3D().Z),
      this.Pxc.Multiply(t, this.xzi),
      (t = UiModelUtil_1.UiModelUtil.GetActorLguiPos(e, this.xzi)),
      this.UiOddsItem.SetItemOffset(t));
  }
  SetOffset(e) {
    this.Pxc.Z = e;
  }
  Refresh(e, t, i) {
    this.UiOddsItem.RefreshUi(e, t, i);
  }
  SetVisible(e) {
    this.UiOddsItem.SetVisible(e);
  }
};
(UiDangoOddsComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(24)],
  UiDangoOddsComponent,
)),
  (exports.UiDangoOddsComponent = UiDangoOddsComponent);
//# sourceMappingURL=UiDangoOddsComponent.js.map
