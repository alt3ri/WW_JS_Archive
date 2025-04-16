"use strict";
var SceneItemChessmanComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, n) {
      var s,
        o = arguments.length,
        h =
          o < 3
            ? t
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(t, i))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        h = Reflect.decorate(e, t, i, n);
      else
        for (var r = e.length - 1; 0 <= r; r--)
          (s = e[r]) &&
            (h = (o < 3 ? s(h) : 3 < o ? s(t, i, h) : s(t, i)) || h);
      return 3 < o && h && Object.defineProperty(t, i, h), h;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemChessmanComponent = void 0);
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  SceneItemMoveComponent_1 = require("./Common/Component/SceneItemMoveComponent"),
  SceneItemJigsawBaseComponent_1 = require("./Jigsaw/SceneItemJigsawBaseComponent"),
  CHESSMAN_SETLOCATION_PERFORMANCE_TIME = 1e3;
let SceneItemChessmanComponent =
  (SceneItemChessmanComponent_1 = class SceneItemChessmanComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.DGa = void 0),
        (this.o4o = void 0),
        (this.n$t = void 0),
        (this.Xte = void 0),
        (this.Lo = void 0),
        (this.AGa = void 0),
        (this.RGa = () => {
          var e;
          this.AGa &&
            ((e = this.n$t?.Owner) &&
              (this.AGa(e, this.DGa, this.rwl), (this.rwl = void 0)),
            (this.AGa = void 0)),
            this.Lo?.EndMovingActions &&
              ((e = LevelGeneralContextDefine_1.EntityContext.Create(
                this.Entity.Id,
              )),
              ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
                this.Lo.EndMovingActions,
                e,
              )),
            this.Xte?.RemoveTag(743620444);
        }),
        (this.rwl = void 0),
        (this.Due = void 0),
        (this.GEl = void 0),
        (this.oGa = void 0),
        (this.kEl = () => {
          this.Xte?.RemoveTag(-410700595),
            this.Xte?.AddTag(-1482451496),
            TimerSystem_1.TimerSystem.Delay(() => {
              this.Xte?.RemoveTag(-1482451496);
            }, CHESSMAN_SETLOCATION_PERFORMANCE_TIME),
            this.n$t?.SetActorLocation(this.Due.ToUeVector());
          var e = this.n$t?.Owner;
          e && this.oGa && this.oGa(e),
            (this.GEl = void 0),
            (this.Due = void 0),
            (this.oGa = void 0);
        });
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemChessmanComponent_1)[0];
      return (this.Lo = e), !0;
    }
    OnStart() {
      return (
        (this.DGa = this.Entity.GetComponent(136)),
        (this.o4o = this.Entity.GetComponent(126)),
        (this.n$t = this.Entity.GetComponent(200)),
        (this.Xte = this.Entity.GetComponent(194)),
        this.o4o?.AddStopMoveCallback(this.RGa),
        !0
      );
    }
    OnEnd() {
      return this.o4o?.RemoveStopMoveCallback(this.RGa), !0;
    }
    UGa() {
      var e;
      this.Xte?.AddTag(743620444),
        this.Lo?.StartMovingActions &&
          ((e = LevelGeneralContextDefine_1.EntityContext.Create(
            this.Entity.Id,
          )),
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
            this.Lo.StartMovingActions,
            e,
          ));
    }
    OnTicTacToePieceMove(e, t, i = void 0, n = void 0, s = void 0) {
      var o = this.DGa?.PutDownBase?.GetBlockLocationByIndex(e);
      o &&
        (this.UGa(),
        i && n && s
          ? (this.o4o?.AddMoveTarget(
              new SceneItemMoveComponent_1.MoveTarget(i, 0.25),
            ),
            this.o4o?.AddMoveTarget(
              new SceneItemMoveComponent_1.MoveTarget(n, 0.25),
            ),
            this.o4o?.AddMoveTarget(
              new SceneItemMoveComponent_1.MoveTarget(s, 0.25),
            ),
            this.o4o?.AddMoveTarget(
              new SceneItemMoveComponent_1.MoveTarget(o, 0.25),
            ))
          : this.o4o?.AddMoveTarget(
              new SceneItemMoveComponent_1.MoveTarget(o, 1),
            ),
        (this.AGa = t),
        (this.rwl = new SceneItemJigsawBaseComponent_1.JigsawIndex(
          e.Row,
          e.Col,
        )));
    }
    SetTicTacToePieceLocation(e, t) {
      e = this.DGa?.PutDownBase?.GetBlockLocationByIndex(e);
      e &&
        (this.o4o?.StopMove(),
        this.o4o?.AddStopMoveCallback(this.RGa),
        this.Xte?.RemoveTag(-1482451496),
        this.Xte?.AddTag(-410700595),
        (this.Due = e),
        (this.oGa = t),
        this.GEl ||
          (this.GEl = TimerSystem_1.TimerSystem.Delay(
            this.kEl,
            CHESSMAN_SETLOCATION_PERFORMANCE_TIME,
          )));
    }
    OnTicTacToePieceMovingChange(e) {
      e
        ? (this.Xte?.RemoveTag(1462419867), this.Xte?.RemoveTag(1683487425))
        : this.Xte?.AddTag(1462419867);
    }
    OnTicTacToePieceSelect(e, t) {
      e ? this.Xte?.AddTag(1683487425) : this.Xte?.RemoveTag(1683487425),
        t ? this.Xte?.AddTag(1462419867) : this.Xte?.RemoveTag(1462419867);
    }
  });
(SceneItemChessmanComponent = SceneItemChessmanComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(252)],
    SceneItemChessmanComponent,
  )),
  (exports.SceneItemChessmanComponent = SceneItemChessmanComponent);
//# sourceMappingURL=SceneItemChessmanComponent.js.map
