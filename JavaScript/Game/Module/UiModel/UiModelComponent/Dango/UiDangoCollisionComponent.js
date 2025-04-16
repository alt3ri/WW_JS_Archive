"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, o) {
    var i,
      s = arguments.length,
      r =
        s < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, n, o);
    else
      for (var _ = e.length - 1; 0 <= _; _--)
        (i = e[_]) && (r = (s < 3 ? i(r) : 3 < s ? i(t, n, r) : i(t, n)) || r);
    return 3 < s && r && Object.defineProperty(t, n, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiDangoCollisionComponent = void 0);
const ue_1 = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase"),
  DANGO_COLLISION_SIZE = 35;
let UiDangoCollisionComponent = class UiDangoCollisionComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.UiModelActorComponent = void 0),
      (this.CollisionComponent = void 0),
      (this.Fwr = () => {
        this.bxc();
      });
  }
  OnInit() {
    this.UiModelActorComponent = this.Owner.CheckGetComponent(1);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.Fwr,
    );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.Fwr,
    );
  }
  bxc() {
    (this.CollisionComponent =
      this.UiModelActorComponent.Actor.AddComponentByClass(
        ue_1.BoxComponent.StaticClass(),
        !0,
        this.UiModelActorComponent.Actor.GetTransform(),
        !1,
      )),
      this.CollisionComponent.SetTickableWhenPaused(!0);
    var e = DANGO_COLLISION_SIZE,
      t =
        (this.CollisionComponent.SetBoxExtent(new ue_1.Vector(e, e, e), !1),
        this.UiModelActorComponent.Actor.D_K2_GetActorLocation()),
      n = this.UiModelActorComponent.Actor.GetActorScale3D().Z;
    (t.Z += e * n),
      this.CollisionComponent.D_K2_SetWorldLocation(t, !1, void 0, !1),
      this.CollisionComponent.SetCollisionEnabled(1),
      this.CollisionComponent.SetCollisionObjectType(3),
      this.CollisionComponent.SetCollisionResponseToAllChannels(2),
      Info_1.Info.IsPlayInEditor &&
        ue_1.LGUIBPLibrary.AddInstanceComponent(
          this.UiModelActorComponent.Actor,
          this.CollisionComponent,
        );
  }
};
(UiDangoCollisionComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(27)],
  UiDangoCollisionComponent,
)),
  (exports.UiDangoCollisionComponent = UiDangoCollisionComponent);
//# sourceMappingURL=UiDangoCollisionComponent.js.map
