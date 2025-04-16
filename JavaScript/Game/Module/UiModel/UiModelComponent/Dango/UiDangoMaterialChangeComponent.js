"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, i) {
    var o,
      r = arguments.length,
      s =
        r < 3
          ? t
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(t, n))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, n, i);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (o = e[a]) && (s = (r < 3 ? o(s) : 3 < r ? o(t, n, s) : o(t, n)) || s);
    return 3 < r && s && Object.defineProperty(t, n, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiDangoMaterialChangeComponent = void 0);
const UE = require("ue"),
  ue_1 = require("ue"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase"),
  SELECT_MATERIAL_PATH =
    "/Game/Aki/Character/NPC/Tuanzi/HYtuanzi_jinxi/Model/MI_Tuanzi_Stroke_90001.MI_Tuanzi_Stroke_90001";
let UiDangoMaterialChangeComponent = class UiDangoMaterialChangeComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.UiModelActorComponent = void 0),
      (this.Lxc = void 0),
      (this.wxc = new Map()),
      (this.Rxc = [
        new UE.FName("OL_Hair"),
        new UE.FName("OL_Face"),
        new UE.FName("OL_Item"),
      ]),
      (this.Fwr = () => {
        this.Axc();
      });
  }
  OnInit() {
    (this.UiModelActorComponent = this.Owner.CheckGetComponent(1)),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        SELECT_MATERIAL_PATH,
        ue_1.MaterialInstance,
        (e) => {
          e && e.IsValid() && (this.Lxc = e);
        },
      );
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
  Axc() {
    this.wxc.clear();
    var e = this.UiModelActorComponent.MainMeshComponent;
    for (const i of this.Rxc) {
      var t,
        n = e.GetMaterialIndex(i);
      n < 0 || ((t = e.GetMaterial(n)) && this.wxc.set(n, t));
    }
  }
  ReplaceSelectMaterial(e) {
    var t = this.UiModelActorComponent.CharRenderingComponent;
    e
      ? t.SetMaterialReplaceV2(this.Lxc, 0, 3, 17)
      : t.RemoveExternalMaterialReplaceV2(0, 3, 17);
  }
};
(UiDangoMaterialChangeComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(28)],
  UiDangoMaterialChangeComponent,
)),
  (exports.UiDangoMaterialChangeComponent = UiDangoMaterialChangeComponent);
//# sourceMappingURL=UiDangoMaterialChangeComponent.js.map
