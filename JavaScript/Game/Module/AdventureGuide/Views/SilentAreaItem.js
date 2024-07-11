"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SilentAreaItem = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class SilentAreaItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.b5e = void 0),
      (this.EVe = void 0);
  }
  BindCallback(t) {
    this.EVe = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UISprite],
    ];
  }
  OnStart() {
    (this.b5e = this.GetExtendToggle(0)),
      this.b5e.OnStateChange.Add((t) => {
        this.yVe();
      }),
      this.b5e.SetToggleState(0),
      this.b5e.OnPostAudioEvent.Bind((t) => {
        t && this.PostClickAudioEvent(t);
      }),
      this.b5e.OnPostAudioStateEvent.Bind((t, i) => {
        i && this.PostClickAudioEvent(i);
      });
  }
  OnBeforeDestroy() {
    this.b5e.OnStateChange.Clear(),
      this.b5e.OnPostAudioEvent.Unbind(),
      this.b5e.OnPostAudioStateEvent.Unbind();
  }
  Refresh(t, i, e) {
    (this.Pe = t.SilentAreaDetectionData),
      this.Pe.IsLock
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(1),
            "Text_UnDiscovered_Text",
          )
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(1),
            this.Pe.Conf.Name,
          );
    var t = this.GetSprite(2);
    var s = (t.SetUIActive(!0), this.Pe.Conf.DangerType);
    var s =
      ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(
        s,
      );
    var s =
      (this.SetSpriteByPath(s.Icon, t, !1),
      this.RootItem.SetUIActive(!0),
      ModelManager_1.ModelManager.AdventureGuideModel.CurrentSilentId ===
        this.Pe.Conf.Id);
    this.IVe(s, !1), s && this.yVe();
  }
  OnSelected(t) {
    this.IVe(!0);
  }
  OnDeselected(t) {
    this.IVe(!1);
  }
  yVe() {
    this.EVe && this.Pe && this.EVe(this.Pe.Conf.Id, this.b5e);
  }
  IVe(t, i = !0) {
    t ? this.b5e.SetToggleState(1, i) : this.b5e.SetToggleState(0, !1);
  }
}
exports.SilentAreaItem = SilentAreaItem;
// # sourceMappingURL=SilentAreaItem.js.map
