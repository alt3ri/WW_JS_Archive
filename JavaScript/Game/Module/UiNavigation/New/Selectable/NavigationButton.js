"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NavigationButton = void 0);
const puerts_1 = require("puerts"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  UiNavigationNewController_1 = require("../UiNavigationNewController"),
  NavigationSelectableBase_1 = require("./NavigationSelectableBase");
class NavigationButton extends NavigationSelectableBase_1.NavigationSelectableBase {
  constructor() {
    super(...arguments),
      (this.lBo = void 0),
      (this.ije = () => {
        this.OnButtonClick();
      });
  }
  OnInit() {
    this._Bo();
  }
  OnClear() {
    this.uBo();
  }
  _Bo() {
    var t, i;
    this.NeedAddButtonClick() &&
      ((t = this.Selectable),
      (i = (0, puerts_1.toManualReleaseDelegate)(this.ije)),
      (this.lBo = t.RegisterClickEvent(i)));
  }
  uBo() {
    this.lBo &&
      (this.Selectable.UnregisterClickEvent(this.lBo),
      (0, puerts_1.releaseManualReleaseDelegate)(this.ije),
      (this.lBo = void 0));
  }
  OnButtonClick() {}
  NeedAddButtonClick() {
    return "Button" !== this.GetType();
  }
  OnHandlePointerSelect(t) {
    this.Listener.ScrollView &&
      this.Listener.ScrollView.ScrollToSelectableComponent(this.Selectable);
    var i = this.Listener.GetNavigationGroup(),
      i = i ? i.InsideGroupName : "";
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
//# sourceMappingURL=NavigationButton.js.map
