"use strict";
var DynamicPortalCreatorComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, o, i) {
      var r,
        n = arguments.length,
        s =
          n < 3
            ? e
            : null === i
              ? (i = Object.getOwnPropertyDescriptor(e, o))
              : i;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(t, e, o, i);
      else
        for (var a = t.length - 1; 0 <= a; a--)
          (r = t[a]) &&
            (s = (n < 3 ? r(s) : 3 < n ? r(e, o, s) : r(e, o)) || s);
      return 3 < n && s && Object.defineProperty(e, o, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DynamicPortalCreatorComponent = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder");
let DynamicPortalCreatorComponent =
  (DynamicPortalCreatorComponent_1 = class DynamicPortalCreatorComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.EIe = void 0),
        (this.Lo = void 0),
        (this.Xln = void 0),
        (this.jla = []),
        (this.Wla = void 0),
        (this.Qla = (t) => {
          t = t.BulletId;
          return this.jla.includes(t);
        }),
        (this.Kla = (t) => {
          var e = Protocol_1.Aki.Protocol.Jha.create();
          (e.F4n = MathUtils_1.MathUtils.NumberToLong(
            this.EIe.GetCreatureDataId(),
          )),
            (e.Mjn = t.BulletId),
            (e.ila = !0),
            Net_1.Net.Call(23790, e, (t) => {
              switch (t?.Q4n) {
                case Protocol_1.Aki.Protocol.Q4n.KRs:
                case Protocol_1.Aki.Protocol.Q4n.Proto_ErrPortalCreatorActive:
                  break;
                default:
                  ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    t.Q4n,
                    22719,
                  );
              }
            });
        });
    }
    OnInitData(t) {
      t = t.GetParam(DynamicPortalCreatorComponent_1)[0];
      return (
        (this.Lo = t),
        "Bullet" === this.Lo.Model.Type &&
          ((this.Wla = this.Lo.Model),
          this.jla.push(this.Wla.TypeA.BulletId),
          this.jla.push(this.Wla.TypeB.BulletId)),
        !0
      );
    }
    OnStart() {
      return (
        (this.EIe = this.Entity.GetComponent(0)),
        "Bullet" === this.Lo.Model.Type &&
          (this.Xln = this.Entity.GetComponent(152)),
        !0
      );
    }
    OnActivate() {
      "Bullet" === this.Lo.Model.Type && this.$la();
    }
    OnEnd() {
      return "Bullet" === this.Lo.Model.Type && this.Xla(), !0;
    }
    GetPortalRenderConfig() {
      return this.Lo?.Model.RenderConfig;
    }
    $la() {
      void 0 !== this.Xln &&
        (this.Xln.AddComponentHitCondition(this, this.Qla),
        EventSystem_1.EventSystem.AddWithTarget(
          this,
          EventDefine_1.EEventName.OnSceneItemHitByHitData,
          this.Kla,
        ));
    }
    Xla() {
      void 0 !== this.Xln &&
        (this.Xln.RemoveComponentHitCondition(this, this.Qla),
        EventSystem_1.EventSystem.HasWithTarget(
          this,
          EventDefine_1.EEventName.OnSceneItemHitByHitData,
          this.Kla,
        )) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this,
          EventDefine_1.EEventName.OnSceneItemHitByHitData,
          this.Kla,
        );
    }
  });
(DynamicPortalCreatorComponent = DynamicPortalCreatorComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(225)],
    DynamicPortalCreatorComponent,
  )),
  (exports.DynamicPortalCreatorComponent = DynamicPortalCreatorComponent);
//# sourceMappingURL=DynamicPortalCreatorComponent.js.map
