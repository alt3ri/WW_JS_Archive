"use strict";
var SceneItemPickInteractComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, n, o) {
      var c,
        i = arguments.length,
        r =
          i < 3
            ? e
            : null === o
              ? (o = Object.getOwnPropertyDescriptor(e, n))
              : o;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, n, o);
      else
        for (var s = t.length - 1; 0 <= s; s--)
          (c = t[s]) &&
            (r = (i < 3 ? c(r) : 3 < i ? c(e, n, r) : c(e, n)) || r);
      return 3 < i && r && Object.defineProperty(e, n, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemPickInteractComponent = void 0);
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  GlobalData_1 = require("../../GlobalData");
let SceneItemPickInteractComponent =
  (SceneItemPickInteractComponent_1 = class SceneItemPickInteractComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.DGa = void 0),
        (this.xGa = new Array()),
        (this.PGa = void 0);
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemPickInteractComponent_1)[0];
      return t && (this.PGa = t.PickInteractType.AvailablePosEffect), !0;
    }
    OnStart() {
      return (this.DGa = this.Entity.GetComponent(136)), !0;
    }
    get Index() {
      return this.DGa?.PutDownIndex;
    }
    get Item() {
      return this.DGa;
    }
    OnSelect() {
      if (this.DGa) {
        var t = this.DGa.PutDownBase?.OnItemTicTacToeSelect(this);
        if (t && this.PGa)
          for (const n of t) {
            var e = EffectSystem_1.EffectSystem.SpawnEffect(
              GlobalData_1.GlobalData.World,
              MathUtils_1.MathUtils.DefaultTransformDouble,
              this.PGa,
              "PickInteractComponent.OnSelect",
              new EffectContext_1.EffectContext(this.Entity.Id),
            );
            EffectSystem_1.EffectSystem.IsValid(e) &&
              (EffectSystem_1.EffectSystem.GetEffectActor(
                e,
              )?.D_K2_SetActorLocation(n.ToUeVector(), !1, void 0, !0),
              this.xGa.push(e));
          }
      }
    }
    OnSelectEnd() {
      for (const t of this.xGa)
        EffectSystem_1.EffectSystem.StopEffectById(
          t,
          "PickInteractComponent.OnSelectEnd",
          !1,
        );
      this.xGa.length = 0;
    }
  });
(SceneItemPickInteractComponent = SceneItemPickInteractComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(251)],
    SceneItemPickInteractComponent,
  )),
  (exports.SceneItemPickInteractComponent = SceneItemPickInteractComponent);
//# sourceMappingURL=SceneItemPickInteractComponent.js.map
