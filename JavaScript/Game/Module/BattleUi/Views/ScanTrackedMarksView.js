"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScanTrackedMarksView = void 0);
const UE = require("ue"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  GravityUtils_1 = require("../../../Utils/GravityUtils"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView"),
  ScanTrackedMarks_1 = require("./ScanTrackedMarks");
class ScanTrackedMarksView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.wmt = new Map()),
      (this.Bmt = new Set()),
      (this.bmt = (s, e) => {
        if (e && !(e.ScanInfos.length <= 0)) {
          const r = EntitySystem_1.EntitySystem.Get(s);
          if (r) {
            this.Bmt.add(s);
            const n = r.GetComponent(1)?.Owner,
              a = e.ScanCompositeConfig.ShowDistance,
              o = e.ScanCompositeConfig.ClampToEllipse;
            for (const _ of e.ScanInfos) {
              const c = _.Color;
              if (0 !== _.IconPath.length) {
                ResourceSystem_1.ResourceSystem.LoadAsync(
                  _.IconPath,
                  UE.LGUISpriteData_BaseObject,
                  (e) => {
                    var t, i;
                    e &&
                      e.IsValid() &&
                      n &&
                      this.Bmt.has(s) &&
                      ((t = Vector_1.Vector.Create(_.Offset)),
                      (i = r.GetComponent(1)),
                      GravityUtils_1.GravityUtils.RotatedVectorByActorInitGravity(
                        i,
                        t,
                      ),
                      this.qmt(
                        s,
                        e,
                        0,
                        "",
                        void 0,
                        n,
                        Vector_1.Vector.Create(t),
                        c,
                        a,
                        o,
                      ));
                  },
                );
                break;
              }
            }
          }
        }
      }),
      (this.Gmt = (e) => {
        this.Bmt.has(e) && this.Bmt.delete(e);
        var t = this.wmt.get(e);
        t && (t.ToClose(), this.wmt.delete(e));
      });
  }
  Initialize(e) {
    super.Initialize(e), this.yWe();
  }
  Reset() {
    super.Reset(), this.Nmt(), this.wmt.clear();
  }
  Update() {
    for (var [, e] of this.wmt) e.Update();
  }
  qmt(e, t, i, s, r, n, a, o, _, c) {
    this.wmt.has(e) ||
      ((t = new ScanTrackedMarks_1.ScanTrackedMarks(
        this.RootItem,
        t,
        i,
        s,
        r,
        n,
        a,
        o,
        _,
        c,
      )),
      this.wmt.set(e, t));
  }
  yWe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ScanTrackedStart,
      this.bmt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ScanTrackedEnd,
        this.Gmt,
      );
  }
  Nmt() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ScanTrackedStart,
      this.bmt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ScanTrackedEnd,
        this.Gmt,
      );
  }
  DestroyOverride() {
    return !0;
  }
}
exports.ScanTrackedMarksView = ScanTrackedMarksView;
//# sourceMappingURL=ScanTrackedMarksView.js.map
