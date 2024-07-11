"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FullScreenPanel = void 0);
const puerts_1 = require("puerts"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
  BattleChildViewPanel_1 = require("./BattleChildViewPanel/BattleChildViewPanel"),
  FullScreenNiagaraItem_1 = require("./FullScreenNiagaraItem");
class FullScreenPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.Dht = new Map()),
      (this.Rht = new Set()),
      (this.Uht = void 0),
      (this.Aht = (s) => {
        var e = s.UniqueId,
          t = s.NiagaraPath;
        this.Pht(e, t).then(
          (e) => {
            if (e)
              for (var [t, i] of s.GetFloatParameterMap())
                e.SetNiagaraFloatValue(t, i);
          },
          () => {},
        );
      }),
      (this.xht = (e) => {
        e = e.UniqueId;
        this.wht(e), this.Bht(e);
      }),
      (this.bht = () => {
        this.qht();
      }),
      (this.Ght = (e, t, i) => {
        e = this.Nht(e);
        e && e.SetNiagaraFloatValue(t, i);
      });
  }
  InitializeTemp() {
    this.Oht();
  }
  Reset() {
    this.qht(), this.kht(), super.Reset();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAddFullScreenEffect,
      this.Aht,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveFullScreenEffect,
        this.xht,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnClearFullScreenEffect,
        this.bht,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeFullScreenNiagaraFloatParameter,
        this.Ght,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAddFullScreenEffect,
      this.Aht,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveFullScreenEffect,
        this.xht,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnClearFullScreenEffect,
        this.bht,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeFullScreenNiagaraFloatParameter,
        this.Ght,
      );
  }
  Fht(e) {
    this.Rht.add(e);
  }
  wht(e) {
    this.Rht.delete(e);
  }
  Vht(e) {
    return this.Rht.has(e);
  }
  async Pht(e, t) {
    let i = this.Nht(e);
    i || (this.Fht(e), (i = await this.Hht(e)));
    var s = this.Vht(e);
    if ((this.wht(e), s)) {
      if ((this.Dht.set(e, i), await i.LoadNiagara(t), i.GetRootItem()))
        return i.SetVisible(!0), i;
    } else i.Destroy();
  }
  Bht(e) {
    var t = this.Nht(e);
    return !!t && (t.Destroy(), this.Dht.delete(e), !0);
  }
  async Hht(e) {
    return await this.NewDynamicChildViewByResourceId(
      this.RootItem,
      "UiItem_FullScreenNiagara",
      FullScreenNiagaraItem_1.FullScreenNiagaraItem,
      !0,
    );
  }
  Nht(e) {
    return this.Dht.get(e);
  }
  qht() {
    if (!(this.Dht.size <= 0)) {
      for (const e of this.Dht.values()) e.Reset();
      this.Dht.clear(), this.Rht.clear();
    }
  }
  Oht() {
    var e = (0, puerts_1.$ref)(void 0),
      t = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
    t?.IsValid() &&
      (t.GetScreenEffectFightRoot(e),
      (this.Uht = (0, puerts_1.$unref)(e)),
      this.Uht?.K2_AttachRootComponentTo(this.RootItem));
  }
  kht() {
    this.Uht?.IsValid() && this.Uht.K2_DetachFromActor(), (this.Uht = void 0);
  }
}
exports.FullScreenPanel = FullScreenPanel;
//# sourceMappingURL=FullScreenPanel.js.map
