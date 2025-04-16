"use strict";
var CustomAudioControlComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, o, n) {
      var i,
        s = arguments.length,
        r =
          s < 3
            ? e
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(e, o))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, o, n);
      else
        for (var h = t.length - 1; 0 <= h; h--)
          (i = t[h]) &&
            (r = (s < 3 ? i(r) : 3 < s ? i(e, o, r) : i(e, o)) || r);
      return 3 < s && r && Object.defineProperty(e, o, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomAudioControlComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  PhonographController_1 = require("../../../Module/Phonograph/PhonographController");
let CustomAudioControlComponent =
  (CustomAudioControlComponent_1 = class CustomAudioControlComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.ji_ = void 0),
        (this.G1n = IComponent_1.EAudioRangeType.AOI),
        (this.EIe = void 0),
        (this.Hi_ = void 0),
        (this.Wi_ = !1),
        (this.Q1n = (t) => {
          t !== this.Wi_ &&
            ((this.Wi_ = t), "Gramophone" === this.ji_?.Type) &&
            this.Qi_(t);
        });
    }
    OnInitData(t) {
      t = t.GetParam(CustomAudioControlComponent_1)[0];
      return (
        (this.G1n = t.AudioRangeType),
        (this.ji_ = t.AudioControlType),
        (this.EIe = this.Entity.GetComponent(0)),
        !0
      );
    }
    OnStart() {
      switch (this.G1n) {
        case IComponent_1.EAudioRangeType.RangeComp:
          if (!this.Entity.GetComponent(84))
            return (
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("Entity", 39, "RangeComponent不存在", [
                  "ConfigId",
                  this.EIe?.GetPbDataId(),
                ]),
              !1
            );
          EventSystem_1.EventSystem.HasWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
            this.Q1n,
          ) ||
            EventSystem_1.EventSystem.AddWithTargetUseHoldKey(
              this,
              this.Entity,
              EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
              this.Q1n,
            );
          break;
        case IComponent_1.EAudioRangeType.AOI:
          this.Q1n(!0);
          break;
        case IComponent_1.EAudioRangeType.SceneActorRefComp:
          if (((this.Hi_ = this.Entity.GetComponent(161)), !this.Hi_))
            return (
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  39,
                  "SceneItemReferenceComponent不存在",
                  ["ConfigId", this.EIe?.GetPbDataId()],
                ),
              !1
            );
          this.Hi_.AddOnPlayerOverlapCallback(this.Q1n);
      }
      return !0;
    }
    OnEnd() {
      switch (this.G1n) {
        case IComponent_1.EAudioRangeType.RangeComp:
          EventSystem_1.EventSystem.HasWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
            this.Q1n,
          ) &&
            EventSystem_1.EventSystem.RemoveWithTargetUseKey(
              this,
              this.Entity,
              EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal,
              this.Q1n,
            );
          break;
        case IComponent_1.EAudioRangeType.AOI:
          this.Q1n(!1);
          break;
        case IComponent_1.EAudioRangeType.SceneActorRefComp:
          this.Hi_ &&
            (this.Hi_.RemoveOnPlayerOverlapCallback(this.Q1n),
            (this.Hi_ = void 0)),
            this.Wi_ && this.Q1n(!1);
      }
      return !0;
    }
    OnDisable(t) {
      "Gramophone" === this.ji_?.Type && this.Ki_(t);
    }
    OnEnable() {
      "Gramophone" === this.ji_?.Type && this.$i_();
    }
    Qi_(t) {
      t
        ? PhonographController_1.PhonographController.PlayMusicByEntityId(
            this.Entity.Id,
          )
        : PhonographController_1.PhonographController.StopMusicByEntityId(
            this.Entity.Id,
          );
    }
    Ki_(t) {
      this.Wi_ && this.Qi_(!1);
    }
    $i_() {
      this.Wi_ && this.Qi_(!0);
    }
  });
(CustomAudioControlComponent = CustomAudioControlComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(130)],
    CustomAudioControlComponent,
  )),
  (exports.CustomAudioControlComponent = CustomAudioControlComponent);
//# sourceMappingURL=CustomAudioControlComponent.js.map
