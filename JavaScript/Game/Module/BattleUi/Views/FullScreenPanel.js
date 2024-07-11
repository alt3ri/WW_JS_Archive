"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FullScreenPanel = void 0);
const puerts_1 = require("puerts");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel/BattleChildViewPanel");
const FullScreenNiagaraItem_1 = require("./FullScreenNiagaraItem");
class FullScreenPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments),
      (this.dat = new Map()),
      (this.Cat = new Set()),
      (this.gat = void 0),
      (this.fat = (s) => {
        const e = s.UniqueId;
        const t = s.NiagaraPath;
        this.pat(e, t).then(
          (e) => {
            if (e)
              for (const [t, i] of s.GetFloatParameterMap())
                e.SetNiagaraFloatValue(t, i);
          },
          () => {},
        );
      }),
      (this.vat = (e) => {
        e = e.UniqueId;
        this.Sat(e), this.Eat(e);
      }),
      (this.yat = () => {
        this.Iat();
      }),
      (this.Tat = (e, t, i) => {
        e = this.Lat(e);
        e && e.SetNiagaraFloatValue(t, i);
      });
  }
  InitializeTemp() {
    this.Dat();
  }
  Reset() {
    this.Iat(), this.Rat(), super.Reset();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAddFullScreenEffect,
      this.fat,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRemoveFullScreenEffect,
        this.vat,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnClearFullScreenEffect,
        this.yat,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeFullScreenNiagaraFloatParameter,
        this.Tat,
      );
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAddFullScreenEffect,
      this.fat,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRemoveFullScreenEffect,
        this.vat,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnClearFullScreenEffect,
        this.yat,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeFullScreenNiagaraFloatParameter,
        this.Tat,
      );
  }
  Uat(e) {
    this.Cat.add(e);
  }
  Sat(e) {
    this.Cat.delete(e);
  }
  Aat(e) {
    return this.Cat.has(e);
  }
  async pat(e, t) {
    let i = this.Lat(e);
    i || (this.Uat(e), (i = await this.Pat(e)));
    const s = this.Aat(e);
    if ((this.Sat(e), s)) {
      if ((this.dat.set(e, i), await i.LoadNiagara(t), i.GetRootItem()))
        return i.SetVisible(!0), i;
    } else i.Destroy();
  }
  Eat(e) {
    const t = this.Lat(e);
    return !!t && (t.Destroy(), this.dat.delete(e), !0);
  }
  async Pat(e) {
    return await this.NewDynamicChildViewByResourceId(
      this.RootItem,
      "UiItem_FullScreenNiagara",
      FullScreenNiagaraItem_1.FullScreenNiagaraItem,
      !0,
    );
  }
  Lat(e) {
    return this.dat.get(e);
  }
  Iat() {
    if (!(this.dat.size <= 0)) {
      for (const e of this.dat.values()) e.Reset();
      this.dat.clear(), this.Cat.clear();
    }
  }
  Dat() {
    const e = (0, puerts_1.$ref)(void 0);
    const t = ScreenEffectSystem_1.ScreenEffectSystem.GetInstance();
    t?.IsValid() &&
      (t.GetScreenEffectFightRoot(e),
      (this.gat = (0, puerts_1.$unref)(e)),
      this.gat?.K2_AttachRootComponentTo(this.RootItem));
  }
  Rat() {
    this.gat?.IsValid() && this.gat.K2_DetachFromActor(), (this.gat = void 0);
  }
}
exports.FullScreenPanel = FullScreenPanel;
// # sourceMappingURL=FullScreenPanel.js.map
