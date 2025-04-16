"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroEffectActorHandle = void 0);
const cpp_1 = require("cpp");
class KuroEffectActorHandle {
  constructor(t) {
    this.xe = t;
  }
  IsValid() {
    return cpp_1.FEffectSystemHandleHelper.ActorHandle_IsValid(this.xe);
  }
  SetActorHiddenInGame(t) {
    cpp_1.FEffectSystemHandleHelper.ActorHandle_SetActorHiddenInGame(
      this.xe,
      t,
    );
  }
  K2_AttachToActor(t, c, o, r, e, p) {
    cpp_1.FEffectSystemHandleHelper.ActorHandle_K2_AttachToActor(
      this.xe,
      t,
      c,
      o,
      r,
      e,
      p,
    );
  }
  K2_AttachToComponent(t, c, o, r, e, p) {
    cpp_1.FEffectSystemHandleHelper.ActorHandle_K2_AttachToComponent(
      this.xe,
      t,
      c,
      o,
      r,
      e,
      p,
    );
  }
  GetActorLocation() {
    return cpp_1.FEffectSystemHandleHelper.ActorHandle_GetActorLocation(
      this.xe,
    );
  }
  D_K2_GetActorLocation() {
    return cpp_1.FEffectSystemHandleHelper.ActorHandle_D_K2_GetActorLocation(
      this.xe,
    );
  }
  K2_GetActorRotation() {
    return cpp_1.FEffectSystemHandleHelper.ActorHandle_K2_GetActorRotation(
      this.xe,
    );
  }
  D_GetActorScale3D() {
    return cpp_1.FEffectSystemHandleHelper.ActorHandle_D_GetActorScale3D(
      this.xe,
    );
  }
  D_K2_SetActorLocation(t, c, o, r) {
    return cpp_1.FEffectSystemHandleHelper.ActorHandle_D_K2_SetActorLocation(
      this.xe,
      t,
      c,
      o,
      r,
    );
  }
  K2_SetActorRotation(t, c) {
    return cpp_1.FEffectSystemHandleHelper.ActorHandle_K2_SetActorRotation(
      this.xe,
      t,
      c,
    );
  }
  D_SetActorScale3D(t) {
    cpp_1.FEffectSystemHandleHelper.ActorHandle_D_SetActorScale3D(this.xe, t);
  }
  D_K2_SetActorLocationAndRotation(t, c, o, r, e) {
    return cpp_1.FEffectSystemHandleHelper.ActorHandle_D_K2_SetActorLocationAndRotation(
      this.xe,
      t,
      c,
      o,
      r,
      e,
    );
  }
  D_K2_AddActorWorldOffset(t, c, o, r) {
    cpp_1.FEffectSystemHandleHelper.ActorHandle_D_K2_AddActorWorldOffset(
      this.xe,
      t,
      c,
      o,
      r,
    );
  }
  D_K2_SetActorTransform(t, c, o, r) {
    return cpp_1.FEffectSystemHandleHelper.ActorHandle_D_K2_SetActorTransform(
      this.xe,
      t,
      c,
      o,
      r,
    );
  }
  D_K2_SetActorRelativeLocation(t, c, o, r) {
    cpp_1.FEffectSystemHandleHelper.ActorHandle_D_K2_SetActorRelativeLocation(
      this.xe,
      t,
      c,
      o,
      r,
    );
  }
  K2_SetActorRelativeRotation(t, c, o, r) {
    cpp_1.FEffectSystemHandleHelper.ActorHandle_K2_SetActorRelativeRotation(
      this.xe,
      t,
      c,
      o,
      r,
    );
  }
  D_K2_SetActorRelativeTransform(t, c, o, r) {
    cpp_1.FEffectSystemHandleHelper.ActorHandle_D_K2_SetActorRelativeTransform(
      this.xe,
      t,
      c,
      o,
      r,
    );
  }
  K2_AddActorLocalTransform(t, c, o, r) {
    cpp_1.FEffectSystemHandleHelper.ActorHandle_K2_AddActorLocalTransform(
      this.xe,
      t,
      c,
      o,
      r,
    );
  }
}
exports.KuroEffectActorHandle = KuroEffectActorHandle;
//# sourceMappingURL=KuroEffectActorHandle.js.map
