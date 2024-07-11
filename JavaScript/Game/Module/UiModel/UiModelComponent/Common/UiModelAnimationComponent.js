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
      (this.Qwr = void 0),
      (this.nXt = void 0),
      (this.sBr = void 0),
      (this.aBr = void 0),
      (this.hBr = void 0),
      (this.lBr = !0),
      (this._Br = void 0),
      (this.uBr = () => {
        this.UpdateAnimInstance(),
          this.aBr && (this.PlayMontage(this.aBr), (this.aBr = void 0)),
          this.hBr &&
            (this.PlayAnimation(this.hBr, this.lBr), (this.hBr = void 0)),
          this._Br && (this.SetAnimationMode(this._Br), (this._Br = void 0));
      });
  }
  OnInit() {
    (this.nXt = this.Owner.CheckGetComponent(1)),
      (this.Qwr = this.Owner.CheckGetComponent(0));
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.uBr,
    );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.uBr,
    );
  }
  cBr() {
    var t = this.nXt?.MainMeshComponent;
    t?.GetLinkedAnimGraphInstanceByTag(FNameUtil_1.FNameUtil.NONE) &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Character",
        44,
        "检测出该Actor有空的动画LinkGraph节点,将会影响同步,GAS等功能,请找对应策划修复",
        ["Actor", this.nXt?.Actor?.GetName()],
        ["AnimInstance", t?.GetAnimInstance()?.GetName()],
      );
  }
  UpdateAnimInstance() {
    var t = this.nXt?.MainMeshComponent;
    t &&
      (this.cBr(),
      (this.sBr = t.GetLinkedAnimGraphInstanceByTag(
        CharacterNameDefines_1.CharacterNameDefines.ABP_BASE,
      )),
      this.sBr || (this.sBr = t.GetAnimInstance()));
  }
  IsMontagePlaying() {
    return this.sBr?.IsAnyMontagePlaying() ?? !1;
  }
  PlayMontage(t) {
    2 !== this.Qwr?.GetModelLoadState()
      ? (this.aBr = t)
      : this.sBr.Montage_Play(t);
  }
  StopMontage(t = 0) {
    2 !== this.Qwr?.GetModelLoadState()
      ? (this.aBr = void 0)
      : this.sBr.Montage_Stop(t);
  }
  GetCurrentSection() {
    return this.sBr?.Montage_GetCurrentSection();
  }
  IsAnimationPlaying() {
    return this.nXt?.MainMeshComponent?.IsPlaying() ?? !1;
  }
  PlayAnimation(t, e = !0) {
    2 !== this.Qwr?.GetModelLoadState()
      ? ((this.hBr = t), (this.lBr = e))
      : this.nXt.MainMeshComponent.PlayAnimation(t, e);
  }
  StopAnimation() {
    2 !== this.Qwr?.GetModelLoadState()
      ? (this.hBr = void 0)
      : this.nXt.MainMeshComponent.Stop();
  }
  SetAnimationMode(t) {
    2 !== this.Qwr?.GetModelLoadState()
      ? (this._Br = t)
      : this.nXt.MainMeshComponent.SetAnimationMode(t);
  }
};
(UiModelAnimationComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(10)],
  UiModelAnimationComponent,
)),
  (exports.UiModelAnimationComponent = UiModelAnimationComponent);
//# sourceMappingURL=UiModelAnimationComponent.js.map
