"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationGroupInsideComponent =
    exports.NavigationGroupPrevComponent =
    exports.NavigationGroupNextComponent =
      void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiNavigationJoystickInput_1 = require("../Module/UiNavigationJoystickInput");
const UiNavigationLogic_1 = require("../New/UiNavigationLogic");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class NavigationGroupNextComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments),
      (this.Ubo = (t) => {
        t === 3 &&
          UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroupByTag(
            this.GetHotKeyConfig().BindButtonTag,
          );
      });
  }
  OnRelease(t) {
    UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroupByTag(
      t.BindButtonTag,
    );
  }
  OnStartInputAxis(t) {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.RegisterLeftJoystickFunction(
      this.Ubo,
    );
  }
  OnFinishInputAxis(t) {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.UnRegisterLeftJoystickFunction(
      this.Ubo,
    );
  }
  OnClear() {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.UnRegisterLeftJoystickFunction(
      this.Ubo,
    );
  }
  OnRefreshSelfHotKeyState(i) {
    var o = i.GetFocusListener();
    if (o) {
      var o = o.GetNavigationGroup();
      let e = this.GetBindButtonTag();
      let t = void 0;
      (t = e ? o.GroupNameMap.Get(e) : o.NextGroupName),
        !StringUtils_1.StringUtils.IsEmpty(t) &&
        (e = i.GetActiveNavigationGroupByNameCheckAll(t))
          ? ((o =
              UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(
                e,
              )),
            this.SetVisibleMode(2, o))
          : this.SetVisibleMode(2, !1);
    } else this.SetVisibleMode(2, !1);
  }
}
exports.NavigationGroupNextComponent = NavigationGroupNextComponent;
class NavigationGroupPrevComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments),
      (this.Abo = (t) => {
        t === 2 &&
          UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroup(
            6,
          );
      });
  }
  OnPress() {
    UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroup(
      6,
    );
  }
  OnStartInputAxis(t) {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.RegisterLeftJoystickFunction(
      this.Abo,
    );
  }
  OnFinishInputAxis(t) {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.UnRegisterLeftJoystickFunction(
      this.Abo,
    );
  }
  OnClear() {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.UnRegisterLeftJoystickFunction(
      this.Abo,
    );
  }
  OnRefreshSelfHotKeyState(t) {
    let i = t.GetFocusListener();
    i &&
    ((i = i.GetNavigationGroup()),
    !StringUtils_1.StringUtils.IsEmpty(i.PrevGroupName)) &&
    (t = t.GetActiveNavigationGroupByNameCheckAll(i.PrevGroupName))
      ? ((i =
          UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(t)),
        this.SetVisibleMode(2, i))
      : this.SetVisibleMode(2, !1);
  }
}
exports.NavigationGroupPrevComponent = NavigationGroupPrevComponent;
class NavigationGroupInsideComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRelease() {
    UiNavigationNewController_1.UiNavigationNewController.JumpInsideNavigationGroup();
  }
  OnRefreshSelfHotKeyState(t) {
    t = t.GetFocusListener();
    t &&
    UiNavigationNewController_1.UiNavigationNewController.GetCanFocusInsideListener(
      t,
    )
      ? this.SetVisibleMode(2, !0)
      : this.SetVisibleMode(2, !1);
  }
}
exports.NavigationGroupInsideComponent = NavigationGroupInsideComponent;
// # sourceMappingURL=NavigationGroupComponent.js.map
