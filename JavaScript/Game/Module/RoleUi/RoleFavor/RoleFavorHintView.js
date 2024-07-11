"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorHintView = exports.initFavorExpItem = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const RoleFavorHintItem_1 = require("./RoleFavorHintItem");
const initFavorExpItem = (e, t, i) => {
  return { Key: i, Value: new RoleFavorHintItem_1.RoleFavorHintItem(e, t) };
};
exports.initFavorExpItem = initFavorExpItem;
class RoleFavorHintView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.O1o = []),
      (this.k1o = void 0),
      (this.F1o = 0),
      (this.V1o = (e) => {
        let t;
        const i = this.H1o(e);
        const r = i.length;
        for (let e = 0; e < r; e++) {
          const s = i[e];
          this.O1o.push(s);
        }
        this.k1o.ClearChildren(),
          this.k1o.RebuildLayoutByDataNew(this.O1o),
          (this.F1o = this.O1o.length);
        for ([, t] of this.k1o.GetLayoutItemMap())
          t.SetSequenceFinishCallBack(this.q1o);
      }),
      (this.q1o = () => {
        (this.F1o = this.F1o - 1),
          this.F1o === 0 &&
            UiManager_1.UiManager.CloseView("RoleFavorHintView");
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
    ];
  }
  OnStart() {
    (this.O1o = this.OpenParam),
      (this.O1o = this.H1o(this.O1o)),
      (this.k1o = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetVerticalLayout(1),
        exports.initFavorExpItem,
      )),
      this.k1o.RebuildLayoutByDataNew(this.O1o),
      (this.F1o = this.O1o.length);
    for (const [, e] of this.k1o.GetLayoutItemMap())
      e.SetSequenceFinishCallBack(this.q1o);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UpdateRoleFavorHintView,
      this.V1o,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.UpdateRoleFavorHintView,
      this.V1o,
    );
  }
  H1o(n) {
    if (
      ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData
    ) {
      const o =
        ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData
          .GetRoleIdList;
      if (o.length !== 0) {
        const _ = o.length;
        const a = new Set();
        let i = 0;
        let r = !0;
        let s = void 0;
        for (let e = 0; e < _; e++) {
          const h = o[e];
          const v = n.length;
          let t = !1;
          for (let e = 0; e < v; e++) {
            const u = n[e];
            if (u.RoleConfig.Id === h) {
              i === 0 ? ((i = u.Exp), (t = !0), (s = u)) : (t = u.Exp === i),
                a.add(e);
              break;
            }
          }
          t || (r = !1);
        }
        if (r) {
          const _ = n.length;
          let t;
          const l = [];
          l.push(s);
          for (let e = 0; e < _; e++) a.has(e) || ((t = n[e]), l.push(t));
          return l;
        }
      }
    }
    return n;
  }
  OnBeforeDestroy() {
    (this.O1o = []),
      this.k1o && (this.k1o.ClearChildren(), (this.k1o = void 0)),
      (this.F1o = 0);
  }
}
exports.RoleFavorHintView = RoleFavorHintView;
// # sourceMappingURL=RoleFavorHintView.js.map
