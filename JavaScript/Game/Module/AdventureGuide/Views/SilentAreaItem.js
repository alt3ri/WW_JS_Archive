"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SilentAreaItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class SilentAreaItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.$Ve = void 0),
      (this.q6e = void 0);
  }
  BindCallback(t) {
    this.q6e = t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UISprite],
    ];
  }
  OnStart() {
    (this.$Ve = this.GetExtendToggle(0)),
      this.$Ve.OnStateChange.Add((t) => {
        this.G6e();
      }),
      this.$Ve.SetToggleState(0),
      this.$Ve.OnPostAudioEvent.Bind((t) => {
        t && this.PostClickAudioEvent(t);
      }),
      this.$Ve.OnPostAudioStateEvent.Bind((t, i) => {
        i && this.PostClickAudioEvent(i);
      });
  }
  OnBeforeDestroy() {
    this.$Ve.OnStateChange.Clear(),
      this.$Ve.OnPostAudioEvent.Unbind(),
      this.$Ve.OnPostAudioStateEvent.Unbind();
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
    var t = this.GetSprite(2),
      s = (t.SetUIActive(!0), this.Pe.Conf.DangerType),
      s =
        ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(
          s,
        ),
      s =
        (this.SetSpriteByPath(s.Icon, t, !1),
        this.RootItem.SetUIActive(!0),
        ModelManager_1.ModelManager.AdventureGuideModel.CurrentSilentId ===
          this.Pe.Conf.Id);
    this.N6e(s, !1), s && this.G6e();
  }
  OnSelected(t) {
    this.N6e(!0);
  }
  OnDeselected(t) {
    this.N6e(!1);
  }
  G6e() {
    this.q6e && this.Pe && this.q6e(this.Pe.Conf.Id, this.$Ve);
  }
  N6e(t, i = !0) {
    t ? this.$Ve.SetToggleState(1, i) : this.$Ve.SetToggleState(0, !1);
  }
}
exports.SilentAreaItem = SilentAreaItem;
//# sourceMappingURL=SilentAreaItem.js.map
