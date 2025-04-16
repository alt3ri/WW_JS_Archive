"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, n, o) {
    var i,
      s = arguments.length,
      f =
        s < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, n))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      f = Reflect.decorate(e, t, n, o);
    else
      for (var r = e.length - 1; 0 <= r; r--)
        (i = e[r]) && (f = (s < 3 ? i(f) : 3 < s ? i(t, n, f) : i(t, n)) || f);
    return 3 < s && f && Object.defineProperty(t, n, f), f;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiRoleBuffComponent = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelBuffComponent_1 = require("../Common/UiModelBuffComponent");
let UiRoleBuffComponent = class UiRoleBuffComponent extends UiModelBuffComponent_1.UiModelBuffComponent {
  constructor() {
    super(...arguments),
      (this.mBr = void 0),
      (this.$6c = () => {
        this.RemoveAllBuffId();
      }),
      (this.r6l = () => {
        var e = this.mBr.RoleDataId,
          e =
            ModelManager_1.ModelManager.BuffItemModel.GetEquippedBuffsByRoleId(
              e,
            );
        if (e && 0 !== e.length) for (const t of e) this.AddBuffByBuffId(t);
      });
  }
  OnInit() {
    super.OnInit(), (this.mBr = this.Owner.CheckGetComponent(12));
  }
  OnStart() {
    super.OnStart(),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnUiModelLoadComplete,
        this.r6l,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner,
        EventDefine_1.EEventName.BeforeUiModelLoadStart,
        this.$6c,
      );
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnUiModelLoadComplete,
      this.r6l,
    ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Owner,
        EventDefine_1.EEventName.BeforeUiModelLoadStart,
        this.$6c,
      ),
      super.OnEnd();
  }
};
(UiRoleBuffComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(19)],
  UiRoleBuffComponent,
)),
  (exports.UiRoleBuffComponent = UiRoleBuffComponent);
//# sourceMappingURL=UiRoleBuffComponent.js.map
