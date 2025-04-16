"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResolutionToggle = exports.ResolutionListView = void 0);
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine"),
  GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MenuController_1 = require("../MenuController"),
  LanguageSettingViewBase_1 = require("./LanguageSettingViewBase");
class ResolutionListView extends LanguageSettingViewBase_1.LanguageSettingViewBase {
  constructor() {
    super(...arguments),
      (this.Hve = []),
      (this.DoRefreshScrollView = (e, t) => {
        var i =
            MenuController_1.MenuController.GetTargetConfig(
              GameSettingsDefine_1.EFunction.RESOLUTION,
            ) === e,
          t = this.CreateToggle(t, e, i);
        t &&
          (i ? (this.SelectedToggle = t) : t.UnSelect(),
          t.SetSelectedCallBack(this.DoSelected),
          this.OnRefreshView(t));
      });
  }
  CreateToggle(e, t, i) {
    var s = new ResolutionToggle();
    return s.Initialize(e, t, i), s;
  }
  OnRefreshView(e) {
    var t = this.Hve[e.GetIndex()];
    e.SetMainRawText(t.X + "x" + t.Y);
  }
  OnSelected(e, t) {}
  InitScrollViewData() {
    var i = ModelManager_1.ModelManager.MenuModel.AllowResolutionList;
    if (i) {
      let e = 0,
        t = 1;
      for (var s = new Set(); t < i.length; ) {
        var n = i[e],
          r = i[t];
        s.add(n / r), (e += 2), (t += 2);
      }
      this.Hve =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender.GetResolutionList();
      var a = [];
      for (let e = 0; e < this.Hve.length; e++) {
        var o = this.Hve[e],
          o = o.X / o.Y;
        s.has(o) && a.push(e);
      }
      this.ScrollView.RefreshByData(a);
    }
  }
}
exports.ResolutionListView = ResolutionListView;
class ResolutionToggle extends LanguageSettingViewBase_1.LanguageToggleBase {
  OnRegisterComponent() {
    super.OnRegisterComponent();
  }
  SetMainRawText(e) {
    this.MainText.SetText(e);
  }
  OnStart() {
    super.OnStart(), this.GetText(2).SetUIActive(!1);
  }
}
exports.ResolutionToggle = ResolutionToggle;
//# sourceMappingURL=ResolutionListView.js.map
