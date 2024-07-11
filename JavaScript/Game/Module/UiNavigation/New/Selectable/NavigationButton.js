"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationButton = void 0);
const puerts_1 = require("puerts");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const UiNavigationNewController_1 = require("../UiNavigationNewController");
const NavigationSelectableBase_1 = require("./NavigationSelectableBase");
class NavigationButton extends NavigationSelectableBase_1.NavigationSelectableBase {
  constructor() {
    super(...arguments),
      (this.uwo = void 0),
      (this.j7e = () => {
        this.OnButtonClick();
      });
  }
  OnInit() {
    this.cwo();
  }
  OnClear() {
    this.mwo();
  }
  cwo() {
    let t, i;
    this.NeedAddButtonClick() &&
      ((t = this.Selectable),
      (i = (0, puerts_1.toManualReleaseDelegate)(this.j7e)),
      (this.uwo = t.RegisterClickEvent(i)));
  }
  mwo() {
    this.uwo &&
      (this.Selectable.UnregisterClickEvent(this.uwo),
      (0, puerts_1.releaseManualReleaseDelegate)(this.j7e),
      (this.uwo = void 0));
  }
  OnButtonClick() {}
  NeedAddButtonClick() {
    return this.GetType() !== "Button";
  }
  OnHandlePointerSelect(t) {
    this.Listener.ScrollView &&
      this.Listener.ScrollView.ScrollToSelectableComponent(this.Selectable);
    var i = this.Listener.GetNavigationGroup();
    var i = i ? i.InsideGroupName : "";
    return (
      !StringUtils_1.StringUtils.IsBlank(i) &&
      ((i =
        UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener()),
      UiNavigationNewController_1.UiNavigationNewController.IsInFocusInsideListenerList(
        this.Listener,
        i,
      ))
    );
  }
}
exports.NavigationButton = NavigationButton;
// # sourceMappingURL=NavigationButton.js.map
