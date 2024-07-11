"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterDetectItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class MonsterDetectItem extends GridProxyAbstract_1.GridProxyAbstract {
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
      [2, UE.UIItem],
      [3, UE.UITexture],
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
    this.Pe = t;
    var s,
      r = this.GetItem(2),
      h = this.GetTexture(3),
      r =
        (t.IsLock
          ? (LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(1),
              "Text_UnDiscovered_Text",
            ),
            r.SetUIActive(!0),
            h.SetUIActive(!1))
          : ((s =
              ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
                t.Conf.MonsterInfoId,
              )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s.Name),
            r.SetUIActive(!1),
            h.SetUIActive(!0),
            this.SetTextureByPath(s.Icon, h)),
        this.RootItem.SetUIActive(!0),
        ModelManager_1.ModelManager.AdventureGuideModel.CurrentMonsterId ===
          t.Conf.Id);
    this.IVe(r, !1), r && this.yVe();
  }
  OnSelected(t) {
    this.IVe(!0);
  }
  OnDeselected(t) {
    this.IVe(!1);
  }
  yVe() {
    this.EVe && this.EVe(this.Pe.Conf.Id, this.b5e);
  }
  IVe(t, i = !0) {
    t ? this.b5e.SetToggleState(1, i) : this.b5e.SetToggleState(0, !1);
  }
}
exports.MonsterDetectItem = MonsterDetectItem;
//# sourceMappingURL=MonsterDetectItem.js.map
