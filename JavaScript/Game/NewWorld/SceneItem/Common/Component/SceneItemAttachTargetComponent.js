"use strict";
var SceneItemAttachTargetComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, n, i) {
      var a,
        s = arguments.length,
        o =
          s < 3
            ? e
            : null === i
              ? (i = Object.getOwnPropertyDescriptor(e, n))
              : i;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        o = Reflect.decorate(t, e, n, i);
      else
        for (var c = t.length - 1; 0 <= c; c--)
          (a = t[c]) &&
            (o = (s < 3 ? a(o) : 3 < s ? a(e, n, o) : a(e, n)) || o);
      return 3 < s && o && Object.defineProperty(e, n, o), o;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemAttachTargetComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  SceneItemDynamicAttachTargetComponent_1 = require("./SceneItemDynamicAttachTargetComponent");
let SceneItemAttachTargetComponent =
  (SceneItemAttachTargetComponent_1 = class SceneItemAttachTargetComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.EIe = void 0),
        (this.oln = void 0),
        (this.rln = void 0),
        (this.nln = void 0),
        (this.Iln = void 0),
        (this.eOc = void 0);
    }
    static get Dependencies() {
      return [200, 0];
    }
    OnInitData(t) {
      t = t.GetParam(SceneItemAttachTargetComponent_1)[0];
      if (
        ((this.Lo = t),
        (this.EIe = this.Entity.GetComponent(0)),
        this.Lo?.AttachTarget)
      ) {
        switch (
          ((this.Iln =
            new SceneItemDynamicAttachTargetComponent_1.AttachParam()),
          this.Lo.PosRule)
        ) {
          case "Absolute":
            (this.Iln.PosAbsolute = !0), (this.Iln.PosAttachType = 1);
            break;
          case "AlignTarget":
            (this.Iln.PosAbsolute = !1), (this.Iln.PosAttachType = 2);
            break;
          default:
            (this.Iln.PosAbsolute = !1), (this.Iln.PosAttachType = 3);
        }
        switch (this.Lo.RotRule) {
          case "Absolute":
            (this.Iln.RotAbsolute = !0), (this.Iln.RotAttachType = 1);
            break;
          case "AlignTarget":
            (this.Iln.RotAbsolute = !1), (this.Iln.RotAttachType = 2);
            break;
          default:
            (this.Iln.RotAbsolute = !1), (this.Iln.RotAttachType = 3);
        }
        switch (this.Lo.AttachTarget?.Type) {
          case "Entity":
            (this.oln = this.Lo.AttachTarget.EntityId),
              (this.rln = this.Lo.AttachTarget.AttachPoint);
            break;
          case "Actor":
            var e = this.Lo.AttachTarget.ActorRef.PathName.split(".");
            if (e.length < 3)
              return (
                Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "SceneItem",
                    39,
                    "[SceneItemAttachTargetComponent] Invalid ActorRefConfig",
                    ["PbDataId:", this.EIe?.GetPbDataId()],
                  ),
                !1
              );
            this.nln = e[1] + "." + e[2];
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            7,
            "[SceneItemAttachTargetComponent]附加目标配置无效，请联系对应策划检查配置",
            ["PbDataId:", this.EIe?.GetPbDataId()],
          );
      return !0;
    }
    OnStart() {
      return (
        (this.eOc = this.Entity.GetComponent(123)),
        !!this.eOc ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              7,
              "[SceneItemAttachTargetComponent] Invalid DynamicAttachComp",
              ["PbDataId:", this.EIe?.GetPbDataId()],
            ),
          !1)
      );
    }
    OnActivate() {
      this.fln();
    }
    OnEnd() {
      return (
        this.pln(), EventSystem_1.EventSystem.RemoveAllTargetUseKey(this), !0
      );
    }
    fln() {
      switch (this.Lo?.AttachTarget?.Type) {
        case "Entity":
          this.eOc.RegEntityTarget(
            this.oln,
            this.rln,
            this.Iln,
            "[SceneItemAttachTargetComponent] HandleTargetAttach",
          );
          break;
        case "Actor":
          this.eOc.RegRefActorTarget(
            this.nln,
            this.Iln,
            "[SceneItemAttachTargetComponent] HandleTargetAttach",
          );
      }
    }
    pln() {
      switch (this.Lo?.AttachTarget?.Type) {
        case "Entity":
        case "Actor":
          this.eOc.UnRegTarget(
            "[SceneItemAttachTargetComponent] HandleTargetDetach",
          );
      }
    }
  });
(SceneItemAttachTargetComponent = SceneItemAttachTargetComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(122)],
    SceneItemAttachTargetComponent,
  )),
  (exports.SceneItemAttachTargetComponent = SceneItemAttachTargetComponent);
//# sourceMappingURL=SceneItemAttachTargetComponent.js.map
