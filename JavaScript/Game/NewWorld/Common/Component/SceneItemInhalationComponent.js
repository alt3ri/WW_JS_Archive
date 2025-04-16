"use strict";
var SceneItemInhalationComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, n) {
      var o,
        s = arguments.length,
        r =
          s < 3
            ? e
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(e, i))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, n);
      else
        for (var h = t.length - 1; 0 <= h; h--)
          (o = t[h]) &&
            (r = (s < 3 ? o(r) : 3 < s ? o(e, i, r) : o(e, i)) || r);
      return 3 < s && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemInhalationComponent = void 0);
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  IUtil_1 = require("../../../../UniverseEditor/Interface/IUtil"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem");
let SceneItemInhalationComponent =
  (SceneItemInhalationComponent_1 = class SceneItemInhalationComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Lo = void 0),
        (this.Ear = void 0),
        (this.vtn = void 0),
        (this.mBe = void 0),
        (this._ii = void 0),
        (this.Jel = new Map()),
        (this.Zel = new Set()),
        (this.g_n = (t, e) => {
          if (
            void 0 !== this.vtn &&
            void 0 !== this.mBe &&
            void 0 !== this.Ear &&
            t !== this._ii
          ) {
            this._ii = t;
            t = this.vtn.GetEntitiesInRangeLocal();
            if (void 0 !== t)
              for (var [, i] of t) {
                i = i.Entity;
                void 0 !== i &&
                  (this.zel(i)
                    ? this.Zel.has(i) ||
                      (i.GetComponent(258).StartInhalation(this.Entity),
                      this.Zel.add(i))
                    : this.Zel.has(i) &&
                      (i.GetComponent(258).StopInhalation(),
                      this.Zel.delete(i)));
              }
          }
        });
    }
    OnInitData(t) {
      this.Lo = t.GetParam(SceneItemInhalationComponent_1)[0];
      var n = this.Lo.InhalationConfigs;
      for (let i = 0; i < n.length; i++) {
        var o = n[i];
        if (
          o.InhalationPerformance.Type !==
          IComponent_1.EInhalationPerformanceType.SceneItem
        )
          return !1;
        o = o.InhalationMatching.EntityMatch.SelfState;
        let t = -1,
          e =
            (void 0 !== o &&
              (t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(o)),
            this.Jel.get(t));
        void 0 === e && ((e = new Set()), this.Jel.set(t, e)), e.add(i);
      }
      return !0;
    }
    OnStart() {
      return (
        (this.Ear = this.Entity.GetComponent(200)),
        (this.vtn = this.Entity.GetComponent(84)),
        (this.mBe = this.Entity.GetComponent(131)),
        (this._ii = this.mBe?.StateTagId),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.g_n,
        ),
        !0
      );
    }
    OnActivate() {
      if (void 0 !== this.vtn && void 0 !== this.mBe && void 0 !== this.Ear) {
        var t = this.vtn.GetEntitiesInRangeLocal();
        if (void 0 !== t)
          for (var [, e] of t) {
            e = e.Entity;
            void 0 !== e &&
              this.zel(e) &&
              (e.GetComponent(258).StartInhalation(this.Entity),
              this.Zel.add(e));
          }
      }
    }
    OnEnd() {
      return (
        (this.vtn = void 0),
        (this.mBe = void 0),
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.g_n,
        ),
        !1
      );
    }
    zel(t) {
      var e = t.GetComponent(258),
        i = t.GetComponent(0)?.GetBaseInfo(),
        n = e?.InhaledStrength;
      if (void 0 !== e && void 0 !== i && void 0 !== n && !e.IsHaling) {
        t = this.Jel.get(this._ii);
        if (void 0 !== t && 0 !== t.size)
          for (const v of t) {
            var o = this.Lo.InhalationConfigs[v];
            if (void 0 !== o) {
              var s = o.InhalationMatching.EntityMatch.EntityMatch;
              if (
                (void 0 === s || (0, IUtil_1.isEntitiyMatch)(s, i.Category)) &&
                !(n > o.InhalationMatching.InhalationStrength)
              )
                return !0;
            }
          }
        if (void 0 !== (t = this.Jel.get(-1)) && 0 !== t.size)
          for (const a of t) {
            var r = this.Lo.InhalationConfigs[a];
            if (void 0 !== r) {
              var h = r.InhalationMatching.EntityMatch.EntityMatch;
              if (
                (void 0 === h || (0, IUtil_1.isEntitiyMatch)(h, i.Category)) &&
                !(n > r.InhalationMatching.InhalationStrength)
              )
                return !0;
            }
          }
      }
      return !1;
    }
  });
(SceneItemInhalationComponent = SceneItemInhalationComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(259)],
    SceneItemInhalationComponent,
  )),
  (exports.SceneItemInhalationComponent = SceneItemInhalationComponent);
//# sourceMappingURL=SceneItemInhalationComponent.js.map
