"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, n) {
    var o,
      s = arguments.length,
      h =
        s < 3
          ? e
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(e, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, e, i, n);
    else
      for (var r = t.length - 1; 0 <= r; r--)
        (o = t[r]) && (h = (s < 3 ? o(h) : 3 < s ? o(e, i, h) : o(e, i)) || h);
    return 3 < s && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelAnimationComponent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  CharacterNameDefines_1 = require("../../../../NewWorld/Character/Common/CharacterNameDefines"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelAnimationComponent = class UiModelAnimationComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.ywr = void 0),
      (this.n$t = void 0),
      (this.qwr = void 0),
      (this.Gwr = void 0),
      (this.Nwr = void 0),
      (this.Owr = !0),
      (this.kwr = void 0),
      (this.Fwr = () => {
        this.UpdateAnimInstance(),
          this.Gwr && (this.PlayMontage(this.Gwr), (this.Gwr = void 0)),
          this.Nwr &&
            (this.PlayAnimation(this.Nwr, this.Owr), (this.Nwr = void 0)),
          this.kwr && (this.SetAnimationMode(this.kwr), (this.kwr = void 0));
      });
  }
  OnInit() {
    (this.n$t = this.Owner.CheckGetComponent(1)),
      (this.ywr = this.Owner.CheckGetComponent(0));
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
  Vwr() {
    var t = this.n$t?.MainMeshComponent;
    t?.GetLinkedAnimGraphInstanceByTag(FNameUtil_1.FNameUtil.NONE) &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Character",
        44,
        "检测出该Actor有空的动画LinkGraph节点,将会影响同步,GAS等功能,请找对应策划修复",
        ["Actor", this.n$t?.Actor?.GetName()],
        ["AnimInstance", t?.GetAnimInstance()?.GetName()],
      );
  }
  UpdateAnimInstance() {
    var t = this.n$t?.MainMeshComponent;
    t &&
      (this.Vwr(),
      (this.qwr = t.GetLinkedAnimGraphInstanceByTag(
        CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
      )),
      this.qwr || (this.qwr = t.GetAnimInstance()));
  }
  IsMontagePlaying() {
    return this.qwr?.IsAnyMontagePlaying() ?? !1;
  }
  PlayMontage(t) {
    2 !== this.ywr?.GetModelLoadState()
      ? (this.Gwr = t)
      : this.qwr.Montage_Play(t);
  }
  StopMontage(t = 0) {
    2 !== this.ywr?.GetModelLoadState()
      ? (this.Gwr = void 0)
      : this.qwr.Montage_Stop(t);
  }
  GetCurrentSection() {
    return this.qwr?.Montage_GetCurrentSection();
  }
  IsAnimationPlaying() {
    return this.n$t?.MainMeshComponent?.IsPlaying() ?? !1;
  }
  PlayAnimation(t, e = !0) {
    2 !== this.ywr?.GetModelLoadState()
      ? ((this.Nwr = t), (this.Owr = e))
      : this.n$t.MainMeshComponent.PlayAnimation(t, e);
  }
  StopAnimation() {
    2 !== this.ywr?.GetModelLoadState()
      ? (this.Nwr = void 0)
      : this.n$t.MainMeshComponent.Stop();
  }
  SetAnimationMode(t) {
    2 !== this.ywr?.GetModelLoadState()
      ? (this.kwr = t)
      : this.n$t.MainMeshComponent.SetAnimationMode(t);
  }
};
(UiModelAnimationComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(10)],
  UiModelAnimationComponent,
)),
  (exports.UiModelAnimationComponent = UiModelAnimationComponent);
//# sourceMappingURL=UiModelAnimationComponent.js.map
