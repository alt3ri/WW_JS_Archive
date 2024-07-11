"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, s) {
    var n,
      r = arguments.length,
      o =
        r < 3
          ? t
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(t, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(e, t, i, s);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (n = e[a]) && (o = (r < 3 ? n(o) : 3 < r ? n(t, i, o) : n(t, i)) || o);
    return 3 < r && o && Object.defineProperty(t, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelRenderingMaterialComponent = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EffectUtil_1 = require("../../../../Utils/EffectUtil"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelRenderingMaterialComponent = class UiModelRenderingMaterialComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.ActorComponent = void 0),
      (this.UiModelDataComponent = void 0),
      (this.tBr = new Map()),
      (this.iBr = 0),
      (this.oBr = new Set()),
      (this.OnModelLoadComplete = () => {
        this.m8();
      });
  }
  get rKt() {
    return this.iBr++;
  }
  OnInit() {
    (this.ActorComponent = this.Owner.CheckGetComponent(1)),
      (this.UiModelDataComponent = this.Owner.CheckGetComponent(0));
  }
  OnStart() {
    EventSystem_1.EventSystem.AddWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.OnModelLoadComplete,
    );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.OnModelLoadComplete,
    );
    for (const t of this.tBr.values()) {
      var e = t.HandleId;
      e &&
        e !== ResourceSystem_1.ResourceSystem.InvalidId &&
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e);
    }
    this.tBr.clear(),
      this.ActorComponent.CharRenderingComponent?.ResetAllRenderingState();
  }
  SetRenderingMaterial(e) {
    var t = this.rKt,
      e = {
        EffectId: e,
        HandleId: ResourceSystem_1.ResourceSystem.InvalidId,
        RenderingId: ResourceSystem_1.ResourceSystem.InvalidId,
      };
    return this.tBr.set(t, e), this.oBr.add(t), this.m8(), t;
  }
  AddRenderingMaterialByData(e) {
    var t = this.rKt,
      e = {
        MaterialAssetData: e,
        HandleId: ResourceSystem_1.ResourceSystem.InvalidId,
        RenderingId: ResourceSystem_1.ResourceSystem.InvalidId,
      };
    return this.tBr.set(t, e), this.oBr.add(t), this.m8(), t;
  }
  m8() {
    if (2 === this.UiModelDataComponent?.GetModelLoadState()) {
      for (const e of this.oBr) this.rBr(e);
      this.oBr.clear();
    }
  }
  rBr(e) {
    const t = this.tBr.get(e);
    var i,
      e = (e) => {
        t.RenderingId =
          this.ActorComponent.CharRenderingComponent.AddMaterialControllerData(
            e,
          );
      };
    t.EffectId
      ? ((i = EffectUtil_1.EffectUtil.GetEffectPath(t.EffectId)),
        (t.HandleId = ResourceSystem_1.ResourceSystem.LoadAsync(
          i,
          UE.Object,
          e,
        )))
      : t.MaterialAssetData && e(t.MaterialAssetData);
  }
  RemoveRenderingMaterial(e) {
    var t,
      i = this.tBr.get(e);
    i &&
      ((t = i.HandleId) &&
        t !== ResourceSystem_1.ResourceSystem.InvalidId &&
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t),
      (t = i.RenderingId) &&
        t !== ResourceSystem_1.ResourceSystem.InvalidId &&
        this.ActorComponent.CharRenderingComponent.RemoveMaterialControllerData(
          t,
        ),
      this.tBr.delete(e));
  }
  RemoveRenderingMaterialWithEnding(e) {
    var t,
      i = this.tBr.get(e);
    i &&
      ((t = i.HandleId) &&
        t !== ResourceSystem_1.ResourceSystem.InvalidId &&
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t),
      (t = i.RenderingId) &&
        t !== ResourceSystem_1.ResourceSystem.InvalidId &&
        this.ActorComponent.CharRenderingComponent.RemoveMaterialControllerDataWithEnding(
          t,
        ),
      this.tBr.delete(e));
  }
};
(UiModelRenderingMaterialComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(5)],
  UiModelRenderingMaterialComponent,
)),
  (exports.UiModelRenderingMaterialComponent =
    UiModelRenderingMaterialComponent);
//# sourceMappingURL=UiModelRenderingMaterialComponent.js.map
