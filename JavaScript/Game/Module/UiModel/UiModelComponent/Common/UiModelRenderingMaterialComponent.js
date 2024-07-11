"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, s) {
    let n;
    const r = arguments.length;
    let o =
      r < 3 ? t : s === null ? (s = Object.getOwnPropertyDescriptor(t, i)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      o = Reflect.decorate(e, t, i, s);
    else
      for (let a = e.length - 1; a >= 0; a--)
        (n = e[a]) && (o = (r < 3 ? n(o) : r > 3 ? n(t, i, o) : n(t, i)) || o);
    return r > 3 && o && Object.defineProperty(t, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelRenderingMaterialComponent = void 0);
const UE = require("ue");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectUtil_1 = require("../../../../Utils/EffectUtil");
const UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../UiModelComponentBase");
let UiModelRenderingMaterialComponent = class UiModelRenderingMaterialComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.ActorComponent = void 0),
      (this.UiModelDataComponent = void 0),
      (this.TBr = new Map()),
      (this.LBr = 0),
      (this.DBr = new Set()),
      (this.OnModelLoadComplete = () => {
        this.m8();
      });
  }
  get rWt() {
    return this.LBr++;
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
    for (const t of this.TBr.values()) {
      const e = t.HandleId;
      e &&
        e !== ResourceSystem_1.ResourceSystem.InvalidId &&
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e);
    }
    this.TBr.clear(),
      this.ActorComponent.CharRenderingComponent?.ResetAllRenderingState();
  }
  SetRenderingMaterial(e) {
    const t = this.rWt;
    var e = {
      EffectId: e,
      HandleId: ResourceSystem_1.ResourceSystem.InvalidId,
      RenderingId: ResourceSystem_1.ResourceSystem.InvalidId,
    };
    return this.TBr.set(t, e), this.DBr.add(t), this.m8(), t;
  }
  AddRenderingMaterialByData(e) {
    const t = this.rWt;
    var e = {
      MaterialAssetData: e,
      HandleId: ResourceSystem_1.ResourceSystem.InvalidId,
      RenderingId: ResourceSystem_1.ResourceSystem.InvalidId,
    };
    return this.TBr.set(t, e), this.DBr.add(t), this.m8(), t;
  }
  m8() {
    if (this.UiModelDataComponent?.GetModelLoadState() === 2) {
      for (const e of this.DBr) this.RBr(e);
      this.DBr.clear();
    }
  }
  RBr(e) {
    const t = this.TBr.get(e);
    let i;
    var e = (e) => {
      t.RenderingId =
        this.ActorComponent.CharRenderingComponent.AddMaterialControllerData(e);
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
    let t;
    const i = this.TBr.get(e);
    i &&
      ((t = i.HandleId) &&
        t !== ResourceSystem_1.ResourceSystem.InvalidId &&
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t),
      (t = i.RenderingId) &&
        t !== ResourceSystem_1.ResourceSystem.InvalidId &&
        this.ActorComponent.CharRenderingComponent.RemoveMaterialControllerData(
          t,
        ),
      this.TBr.delete(e));
  }
  RemoveRenderingMaterialWithEnding(e) {
    let t;
    const i = this.TBr.get(e);
    i &&
      ((t = i.HandleId) &&
        t !== ResourceSystem_1.ResourceSystem.InvalidId &&
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t),
      (t = i.RenderingId) &&
        t !== ResourceSystem_1.ResourceSystem.InvalidId &&
        this.ActorComponent.CharRenderingComponent.RemoveMaterialControllerDataWithEnding(
          t,
        ),
      this.TBr.delete(e));
  }
};
(UiModelRenderingMaterialComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(5)],
  UiModelRenderingMaterialComponent,
)),
  (exports.UiModelRenderingMaterialComponent =
    UiModelRenderingMaterialComponent);
// # sourceMappingURL=UiModelRenderingMaterialComponent.js.map
