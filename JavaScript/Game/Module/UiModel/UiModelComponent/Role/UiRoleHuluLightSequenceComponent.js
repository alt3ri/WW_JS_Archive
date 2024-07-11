"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, s) {
    var o,
      r = arguments.length,
      n =
        r < 3
          ? t
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(t, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, t, i, s);
    else
      for (var h = e.length - 1; 0 <= h; h--)
        (o = e[h]) && (n = (r < 3 ? o(n) : 3 < r ? o(t, i, n) : o(t, i)) || n);
    return 3 < r && n && Object.defineProperty(t, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiRoleHuluLightSequenceComponent = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  CharacterNameDefines_1 = require("../../../../NewWorld/Character/Common/CharacterNameDefines"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleHuluLightSequenceComponent = class UiRoleHuluLightSequenceComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.n$t = void 0),
      (this.SPe = void 0),
      (this.b2t = void 0),
      (this.hJ = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.Twr = (e) => {
        e || this.StopLightSequence();
      });
  }
  OnInit() {
    this.n$t = this.Owner.CheckGetComponent(1);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelVisibleChange,
      this.Twr,
    );
  }
  fBr() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      "LevelSequence_HuluLight",
    );
    this.hJ = ResourceSystem_1.ResourceSystem.LoadAsync(
      e,
      UE.LevelSequence,
      (e) => {
        var t;
        ObjectUtils_1.ObjectUtils.IsValid(e) &&
          (((t = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState =
            !0),
          (t.bPauseAtEnd = !0),
          (this.b2t = ActorSystem_1.ActorSystem.Get(
            UE.LevelSequenceActor.StaticClass(),
            MathUtils_1.MathUtils.DefaultTransform,
            void 0,
            !1,
          )),
          (this.b2t.PlaybackSettings = t),
          this.b2t.SetSequence(e),
          (this.SPe = this.b2t.SequencePlayer),
          this.SPe) &&
          this.PlayLightSequence();
      },
    );
  }
  PlayLightSequence() {
    var e, t;
    this.SPe
      ? ((this.b2t.bOverrideInstanceData = !0),
        (e = this.b2t.DefaultInstanceData),
        (t = this.n$t.MainMeshComponent.GetSocketTransform(
          CharacterNameDefines_1.CharacterNameDefines.GLIDEING_SOCKETNAME,
        )),
        (t = new UE.Transform(t.GetLocation())),
        (e.TransformOrigin = t),
        this.SPe.Play())
      : this.hJ === ResourceSystem_1.ResourceSystem.InvalidId && this.fBr();
  }
  StopLightSequence() {
    this.SPe
      ? this.SPe.Stop()
      : this.hJ !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ),
        (this.hJ = ResourceSystem_1.ResourceSystem.InvalidId));
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelVisibleChange,
      this.Twr,
    ),
      this.StopLightSequence();
    const e = this.b2t;
    TimerSystem_1.TimerSystem.Next(() => {
      ActorSystem_1.ActorSystem.Put(e);
    }),
      (this.SPe = void 0),
      (this.b2t = void 0);
  }
};
(UiRoleHuluLightSequenceComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(17)],
  UiRoleHuluLightSequenceComponent,
)),
  (exports.UiRoleHuluLightSequenceComponent = UiRoleHuluLightSequenceComponent);
//# sourceMappingURL=UiRoleHuluLightSequenceComponent.js.map
