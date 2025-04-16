"use strict";
var AiGearStrategyComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, r) {
      var n,
        o = arguments.length,
        s =
          o < 3
            ? t
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(t, i))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        s = Reflect.decorate(e, t, i, r);
      else
        for (var a = e.length - 1; 0 <= a; a--)
          (n = e[a]) &&
            (s = (o < 3 ? n(s) : 3 < o ? n(t, i, s) : n(t, i)) || s);
      return 3 < o && s && Object.defineProperty(t, i, s), s;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiGearStrategyComponent = void 0);
const UE = require("ue"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager");
let AiGearStrategyComponent =
  (AiGearStrategyComponent_1 = class AiGearStrategyComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.R5a = ""),
        (this.U5a = void 0),
        (this.lK_ = void 0),
        (this.A5a = void 0),
        (this.D5a = 0),
        (this._K_ = void 0),
        (this.cK_ = 0);
    }
    OnInitData(e) {
      var t = e.GetParam(AiGearStrategyComponent_1)[0];
      if (t)
        switch (((this.lK_ = t.StrategyType.Type), t.StrategyType.Type)) {
          case IComponent_1.EAiGearStrategy.RenjuStrategy:
            var i = t.StrategyType.Chessboard;
            if (!i) return !1;
            (this.D5a = i),
              (this.R5a = t.StrategyType.CommonConfig),
              (this.U5a = t.StrategyType.Condition);
            break;
          case IComponent_1.EAiGearStrategy.RaceStrategy:
            if (((this.cK_ = t.StrategyType.SplineEntityId), !this.cK_))
              return !1;
            (this.R5a = t.StrategyType.CommonConfig),
              (this.U5a = t.StrategyType.Condition);
            break;
          default:
            return !1;
        }
      return !0;
    }
    OnStart() {
      return !0;
    }
    OnActivate() {
      switch (this.lK_) {
        case IComponent_1.EAiGearStrategy.RenjuStrategy:
          var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            this.D5a,
          );
          e?.IsInit && this.x5a(e);
          break;
        case IComponent_1.EAiGearStrategy.RaceStrategy:
          this.uK_(this.cK_);
      }
    }
    x5a(e) {
      (this.A5a = EntitySystem_1.EntitySystem.GetComponent(e.Id, 135)),
        this.A5a &&
          ResourceSystem_1.ResourceSystem.LoadAsync(
            this.R5a,
            UE.BP_AIGearStrategy_C,
            (e) => {
              this.A5a?.RegisterAiInfo(e);
            },
          );
    }
    uK_(e) {
      (this._K_ = this.Entity.GetComponent(277)),
        this._K_ &&
          ResourceSystem_1.ResourceSystem.LoadAsync(
            this.R5a,
            UE.BP_AIRaceStrategy_C,
            (e) => {
              this._K_?.RegisterAiInfo(e, this.cK_);
            },
          );
    }
    CheckAiCondition() {
      return (
        !this.U5a ||
        ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(
          this.U5a,
          void 0,
          LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id),
        )
      );
    }
    OnTick(e) {
      switch (this.lK_) {
        case IComponent_1.EAiGearStrategy.RenjuStrategy:
          if (0 !== this.D5a && !this.A5a) {
            var t =
              ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
                this.D5a,
              );
            if (!t?.Valid || !t.Entity || !t.IsInit) return;
            this.x5a(t);
          }
          this.A5a?.RefreshAiEnable(this.CheckAiCondition());
          break;
        case IComponent_1.EAiGearStrategy.RaceStrategy:
          this._K_ || this.uK_(this.cK_),
            this._K_?.RefreshAiEnable(this.CheckAiCondition());
      }
    }
  });
(AiGearStrategyComponent = AiGearStrategyComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(253)],
    AiGearStrategyComponent,
  )),
  (exports.AiGearStrategyComponent = AiGearStrategyComponent);
//# sourceMappingURL=AiGearStrategyComponent.js.map
