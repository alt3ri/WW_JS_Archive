"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleResetComponent =
    exports.RoleZoomComponent =
    exports.RoleTurnComponent =
    exports.RoleLookUpComponent =
    exports.RoleInteractComponentBase =
      void 0);
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const HotKeyComponent_1 = require("./HotKeyComponent");
class RoleInteractComponentBase extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    this.SetVisibleMode(2, !0);
  }
}
class RoleLookUpComponent extends (exports.RoleInteractComponentBase =
  RoleInteractComponentBase) {
  OnInputAxis(e, t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.NavigationTriggerRoleLookUp,
      t,
    );
  }
}
exports.RoleLookUpComponent = RoleLookUpComponent;
class RoleTurnComponent extends RoleInteractComponentBase {
  OnInputAxis(e, t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.NavigationTriggerRoleTurn,
      t,
    );
  }
}
exports.RoleTurnComponent = RoleTurnComponent;
class RoleZoomComponent extends RoleInteractComponentBase {
  OnInputAxis(e, t) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.NavigationTriggerRoleZoom,
      e,
      t,
    );
  }
}
exports.RoleZoomComponent = RoleZoomComponent;
class RoleResetComponent extends RoleInteractComponentBase {
  OnPress(e) {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.NavigationTriggerRoleReset,
    );
  }
}
exports.RoleResetComponent = RoleResetComponent;
// # sourceMappingURL=RoleInteractComponent.js.map
