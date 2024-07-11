"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, s) {
    let o;
    const r = arguments.length;
    let n =
      r < 3 ? t : s === null ? (s = Object.getOwnPropertyDescriptor(t, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(e, t, i, s);
    else
      for (let h = e.length - 1; h >= 0; h--)
        (o = e[h]) && (n = (r < 3 ? o(n) : r > 3 ? o(t, i, n) : o(t, i)) || n);
    return r > 3 && n && Object.defineProperty(t, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiRoleHuluLightSequenceComponent = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const CharacterNameDefines_1 = require("../../../../NewWorld/Character/Common/CharacterNameDefines");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiRoleHuluLightSequenceComponent = class UiRoleHuluLightSequenceComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.nXt = void 0),
      (this.EPe = void 0),
      (this.Bkt = void 0),
      (this.hJ = ResourceSystem_1.ResourceSystem.InvalidId),
      (this.$wr = (e) => {
        e || this.StopLightSequence();
      });
  }
  OnInit() {
    this.nXt = this.Owner.CheckGetComponent(1);
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelVisibleChange,
      this.$wr,
    );
  }
  FBr() {
    const e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      "LevelSequence_HuluLight",
    );
    this.hJ = ResourceSystem_1.ResourceSystem.LoadAsync(
      e,
      UE.LevelSequence,
      (e) => {
        let t;
        ObjectUtils_1.ObjectUtils.IsValid(e) &&
          (((t = new UE.MovieSceneSequencePlaybackSettings()).bRestoreState =
            !0),
          (t.bPauseAtEnd = !0),
          (this.Bkt = ActorSystem_1.ActorSystem.Get(
            UE.LevelSequenceActor.StaticClass(),
            MathUtils_1.MathUtils.DefaultTransform,
            void 0,
            !1,
          )),
          (this.Bkt.PlaybackSettings = t),
          this.Bkt.SetSequence(e),
          (this.EPe = this.Bkt.SequencePlayer),
          this.EPe) &&
          this.PlayLightSequence();
      },
    );
  }
  PlayLightSequence() {
    let e, t;
    this.EPe
      ? ((this.Bkt.bOverrideInstanceData = !0),
        (e = this.Bkt.DefaultInstanceData),
        (t = this.nXt.MainMeshComponent.GetSocketTransform(
          CharacterNameDefines_1.CharacterNameDefines.GLIDEING_SOCKETNAME,
        )),
        (t = new UE.Transform(t.GetLocation())),
        (e.TransformOrigin = t),
        this.EPe.Play())
      : this.hJ === ResourceSystem_1.ResourceSystem.InvalidId && this.FBr();
  }
  StopLightSequence() {
    this.EPe
      ? this.EPe.Stop()
      : this.hJ !== ResourceSystem_1.ResourceSystem.InvalidId &&
        (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.hJ),
        (this.hJ = ResourceSystem_1.ResourceSystem.InvalidId));
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelVisibleChange,
      this.$wr,
    ),
      this.StopLightSequence();
    const e = this.Bkt;
    TimerSystem_1.TimerSystem.Next(() => {
      ActorSystem_1.ActorSystem.Put(e);
    }),
      (this.EPe = void 0),
      (this.Bkt = void 0);
  }
};
(UiRoleHuluLightSequenceComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(17)],
  UiRoleHuluLightSequenceComponent,
)),
  (exports.UiRoleHuluLightSequenceComponent = UiRoleHuluLightSequenceComponent);
// # sourceMappingURL=UiRoleHuluLightSequenceComponent.js.map
