"use strict";
var LevelQteComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, o, n) {
      var r,
        l = arguments.length,
        i =
          l < 3
            ? t
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(t, o))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        i = Reflect.decorate(e, t, o, n);
      else
        for (var s = e.length - 1; 0 <= s; s--)
          (r = e[s]) &&
            (i = (l < 3 ? r(i) : 3 < l ? r(t, o, i) : r(t, o)) || i);
      return 3 < l && i && Object.defineProperty(t, o, i), i;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelQteComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  LevelGeneralController_1 = require("../../../LevelGamePlay/LevelGeneralController"),
  LevelGeneralNetworks_1 = require("../../../LevelGamePlay/LevelGeneralNetworks"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  CommonQteController_1 = require("../../../Module/Qte/CommonQte/CommonQteController");
let LevelQteComponent = (LevelQteComponent_1 = class LevelQteComponent extends (
  EntityComponent_1.EntityComponent
) {
  constructor() {
    super(...arguments),
      (this.EIe = void 0),
      (this.wxl = void 0),
      (this.Bxl = void 0),
      (this.$El = () => {
        let e = (this.Bxl = void 0),
          t = void 0;
        "SingleBtn" === this.wxl?.Type &&
          ((e = this.wxl.SuccessCallback.Actions),
          (t = this.wxl.SuccessCallback.SendSelfEvent),
          e &&
            LevelGeneralController_1.LevelGeneralController.ExecuteActionsNew(
              e,
              this.UUe(),
            ),
          t) &&
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(
            this.EIe.GetCreatureDataId(),
            t,
          );
      }),
      (this.bxl = () => {
        let e = (this.Bxl = void 0),
          t = void 0;
        "SingleBtn" === this.wxl?.Type &&
          ((e = this.wxl.FailureCallback.Actions),
          (t = this.wxl.FailureCallback.SendSelfEvent),
          e &&
            LevelGeneralController_1.LevelGeneralController.ExecuteActionsNew(
              e,
              this.UUe(),
            ),
          t) &&
          LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(
            this.EIe.GetCreatureDataId(),
            t,
          );
      });
  }
  OnInitData(e) {
    e = e.GetParam(LevelQteComponent_1)[0];
    return (
      (this.wxl = e.QteConfig), (this.EIe = this.Entity.GetComponent(0)), !0
    );
  }
  StartQte(e = !1) {
    return (
      this.Bxl?.IsActive() &&
        e &&
        ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(
          this.Bxl.HandleId,
        ),
      "SingleBtn" === this.wxl?.Type &&
        ((this.Bxl =
          ControllerHolder_1.ControllerHolder.CommonQteController.StartQte(
            this.wxl.QteId,
            this.$El,
            this.bxl,
            1,
          )),
        !this.Bxl)
    );
  }
  StopQte() {
    this.Bxl?.IsActive() &&
      CommonQteController_1.CommonQteController.StopQte(this.Bxl.HandleId);
  }
  IsQteActive() {
    return this.Bxl?.IsActive() ?? !1;
  }
  UUe() {
    var e = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
    return (e.ClientExecuteActions = !0), e;
  }
});
(LevelQteComponent = LevelQteComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(263)],
    LevelQteComponent,
  )),
  (exports.LevelQteComponent = LevelQteComponent);
//# sourceMappingURL=LevelQteComponent.js.map
