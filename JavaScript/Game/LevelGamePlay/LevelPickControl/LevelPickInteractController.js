"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelPickInteractController = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  Global_1 = require("../../Global"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  SceneItemJigsawBaseComponent_1 = require("../../NewWorld/SceneItem/Jigsaw/SceneItemJigsawBaseComponent"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  LguiEventSystemManager_1 = require("../../Ui/LguiEventSystem/LguiEventSystemManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  UiModel_1 = require("../../Ui/UiModel"),
  WaitEntityTask_1 = require("../../World/Define/WaitEntityTask"),
  LevelPickInteractItem_1 = require("./LevelPickInteractItem");
class LevelPickInteractController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      this.PauseTick(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnStartLoadingState,
        this.hMe,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnStartLoadingState,
        this.hMe,
      ),
      !0
    );
  }
  static zla() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.BindTouches(
      [
        InputMappingsDefine_1.touchIdMappings.Touch1,
        InputMappingsDefine_1.touchIdMappings.Touch2,
      ],
      this.Eqt,
    ),
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindActions(
        [
          InputMappingsDefine_1.actionMappings.Ui左键点击,
          InputMappingsDefine_1.actionMappings.UI键盘F手柄A,
        ],
        this.XOa,
      );
  }
  static Jla() {
    ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindTouches(
      [
        InputMappingsDefine_1.touchIdMappings.Touch1,
        InputMappingsDefine_1.touchIdMappings.Touch2,
      ],
      this.Eqt,
    ),
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindActions(
        [
          InputMappingsDefine_1.actionMappings.Ui左键点击,
          InputMappingsDefine_1.actionMappings.UI键盘F手柄A,
        ],
        this.XOa,
      );
  }
  static EnterPickInteractModel(e, t = !1) {
    var i = e.Chessboard,
      r = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(i);
    r
      ? ((this.kHa = void 0),
        (this.zOa = !0),
        (this.A6l = 0),
        (this.JOa = t),
        "Chessboard" ===
          EntitySystem_1.EntitySystem.GetComponent(r.Id, 0)?.GetPbModelConfig()
            ?.EntityType &&
          (r = EntitySystem_1.EntitySystem.GetComponent(r.Id, 135)) &&
          this.YOa(r),
        UiModel_1.UiModel.IsInMainView
          ? (UiManager_1.UiManager.OpenView("PickInteractionView"),
            this.Z7a(e),
            this.zla())
          : ((this.Ikl = e),
            EventSystem_1.EventSystem.Add(
              EventDefine_1.EEventName.ActiveBattleView,
              this.JDe,
            )))
      : this.kHa ||
        (this.kHa = WaitEntityTask_1.WaitEntityTask.CreateWithPbDataId(
          "LevelPickInteractController.EnterPickInteractModel",
          i,
          () => {
            LevelPickInteractController.EnterPickInteractModel(e, t);
          },
          6e4,
          !1,
        ));
  }
  static Z7a(e) {
    var t,
      i,
      e = e.CameraConfig;
    e?.Type === IAction_1.EAdjustPlayerCamera.Fixed &&
      ((this.eHa = IAction_1.EAdjustPlayerCamera.Fixed),
      (t = Vector_1.Vector.Create()),
      (i = Rotator_1.Rotator.Create()),
      t.Set(e.CenterPos.X ?? 0, e.CenterPos.Y ?? 0, e.CenterPos.Z ?? 0),
      i.Set(e.CenterRot.Y ?? 0, e.CenterRot.Z ?? 0, e.CenterRot.X ?? 0),
      ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.EnterFixSceneSubCamera(
        t,
        i,
        e.Fov,
        e.FadeInTime,
        e.FadeOutTime,
        1,
        () => {
          this.tHa();
        },
      ));
  }
  static jPl(e = !1) {
    this.OnClosingView && (this.OnClosingView(), (this.OnClosingView = void 0));
    let t = void 0;
    0 === this.A6l && (t = this.eGa),
      this.eHa === IAction_1.EAdjustPlayerCamera.Fixed
        ? e
          ? (ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.RestoreCameraFromAdjust(),
            this.x6l(t))
          : ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.RestoreCameraFromAdjust(
              void 0,
              () => {
                this.x6l(t);
              },
            )
        : this.x6l(t);
  }
  static x6l(e) {
    var t;
    UiManager_1.UiManager.CloseView("PickInteractionView"),
      this.zOa ||
        0 !== this.A6l ||
        (e instanceof
          SceneItemJigsawBaseComponent_1.SceneItemJigsawBaseComponent &&
          ((t = new Protocol_1.Aki.Protocol.Mv_()),
          (e = e.Entity?.GetComponent(0)?.GetCreatureDataId())) &&
          ((t.F4n = MathUtils_1.MathUtils.NumberToLong(e)),
          Net_1.Net.Call(22509, t, (e) => {
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Level",
                36,
                "CloseInteractionView RenjuExitMatchedActionResponse",
                ["ErrorCode", e.G9n],
              );
          })));
  }
  static ExitPickInteractModel(e = !1) {
    if (
      ((this.$ll = 0),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.Xll,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.PlotNetworkStart,
          this.Xll,
        ),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.Yll,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.PlotNetworkEnd,
          this.Yll,
        ),
      this.zOa)
    ) {
      if (
        ((this.OnClosingView = void 0),
        (this.OnViewPiecePostMoveEventStart = void 0),
        (this.OnViewPiecePostMoveEventEnd = void 0),
        (this.zOa = !1),
        this.jPl(e),
        this.ZOa.clear(),
        this.Jla(),
        this.eGa)
      ) {
        this.eGa.ClearLevelPickSelect(),
          this.eGa.UnregisterPickControllerEvents(),
          this.eGa.ForceResetPieceSelect(!1),
          (this.eGa = void 0);
        e = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
        if (e) {
          var t,
            i = e.GetComponent(29),
            r =
              (i &&
                (i.PreLeaveSitDownAction("ExitPickInteractModel"),
                (e = e.GetComponent(3))) &&
                ((r = Vector_1.Vector.Create()),
                (t = Vector_1.Vector.Create()),
                e.ActorForwardProxy.Multiply(50, r),
                e.ActorLocationProxy.Addition(r, t),
                e.SetActorLocation(
                  t.ToUeVector(),
                  "LevelPickInteract Leave Chair Offset",
                )),
              i?.Chair);
          if (r) {
            const n = r.GetComponent(195);
            n &&
              (n.SetInteractionState(!1, "ExitPickInteractModel.Close"),
              TimerSystem_1.TimerSystem.Delay(() => {
                n.SetInteractionState(!0, "ExitPickInteractModel.Resume");
              }, 2e3));
          }
        }
      }
      ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    }
  }
  static ResetPickInteractGame() {
    this.zOa &&
      (this.eGa &&
        (this.eGa.ClearLevelPickSelect(), this.eGa.ResetTicTacToeGame()),
      (this.WPl = !1),
      this.tHa());
  }
  static get zOa() {
    return this.iEl;
  }
  static set zOa(e) {
    this.iEl !== e && ((this.iEl = e) ? this.ResumeTick() : this.PauseTick());
  }
  static OnTick(e) {
    if (this.zOa) {
      if (this.JOa) for (const t of this.tGa()) t.OnPick();
      0 < this.$ll &&
        ((this.$ll -= e), this.$ll <= 0) &&
        this.ExitPickInteractModel();
    }
  }
  static tGa() {
    this.iGa.length = 0;
    var t = Global_1.Global.CharacterController;
    if (t) {
      let e = void 0;
      if (
        (Info_1.Info.IsInKeyBoard()
          ? ((t = t.GetCursorPosition()) &&
              ((this.rGa.X = t.X), (this.rGa.Y = t.Y)),
            (e = this.rGa))
          : Info_1.Info.IsInTouch()
            ? (e = this.Fdr)
            : Info_1.Info.IsInGamepad() &&
              ((t =
                LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
                  0,
                  !0,
                )),
              (e = new Vector2D_1.Vector2D(
                t.pointerPosition.X,
                t.pointerPosition.Y,
              ))),
        e)
      )
        for (const r of this.ZOa) {
          var i = r[1];
          i.IsValid && i.CheckInside(e) && this.iGa.push(i);
        }
    }
    return this.iGa;
  }
  static tHa() {
    for (const t of this.ZOa) {
      var e = t[0];
      t[1]?.RefreshBox(e);
    }
  }
  static YOa(t) {
    if (
      ((this.eGa = t).RegisterPickControllerEvents(
        this.oGa,
        this.LGa,
        this.vAl,
        this.QPl,
        this.KPl,
      ),
      t.ForceResetPieceSelect(!0),
      t.WaitingInitPiecesComplete)
    ) {
      this.ZOa.clear();
      for (const i of t.GetPickItemActors()) {
        var e = new LevelPickInteractItem_1.LevelPickInteractItem();
        e.Init(i, (e) => {
          this.WPl || t.OnLevelPickClick(e);
        }),
          this.ZOa.set(i, e);
      }
    } else this.MAl = !0;
  }
}
(exports.LevelPickInteractController = LevelPickInteractController),
  ((_a = LevelPickInteractController).JOa = !1),
  (LevelPickInteractController.ZOa = new Map()),
  (LevelPickInteractController.iGa = new Array()),
  (LevelPickInteractController.rGa = Vector2D_1.Vector2D.Create()),
  (LevelPickInteractController.Fdr = Vector2D_1.Vector2D.Create()),
  (LevelPickInteractController.eGa = void 0),
  (LevelPickInteractController.hMe = () => {
    _a.zOa && _a.ExitPickInteractModel(!0);
  }),
  (LevelPickInteractController.XOa = (e, t) => {
    if (1 === t) {
      t = _a.tGa();
      if (0 < t.length) for (const i of t) i.OnClick();
      else _a.eGa?.LevelPickSelectUndefined();
    }
  }),
  (LevelPickInteractController.Eqt = (e, t) => {
    if (1 === t.TouchType) {
      (_a.Fdr.X = t.TouchPosition.X), (_a.Fdr.Y = t.TouchPosition.Y);
      t = _a.tGa();
      if (0 < t.length) for (const i of t) i.OnClick();
      else _a.eGa?.LevelPickSelectUndefined();
    }
  }),
  (LevelPickInteractController.kHa = void 0),
  (LevelPickInteractController.Ikl = void 0),
  (LevelPickInteractController.A6l = 0),
  (LevelPickInteractController.JDe = () => {
    _a.zOa &&
      (UiManager_1.UiManager.OpenView("PickInteractionView"),
      _a.Ikl && _a.Z7a(_a.Ikl),
      _a.zla()),
      (_a.Ikl = void 0),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        _a.JDe,
      );
  }),
  (LevelPickInteractController.eHa = void 0),
  (LevelPickInteractController.OnClosingView = void 0),
  (LevelPickInteractController.OnViewPiecePostMoveEventStart = void 0),
  (LevelPickInteractController.OnViewPiecePostMoveEventEnd = void 0),
  (LevelPickInteractController.$ll = 0),
  (LevelPickInteractController.LGa = (e) => {
    (_a.$ll = 2500),
      _a.zOa &&
        TimerSystem_1.TimerSystem.Delay(() => {
          _a.zOa &&
            !ModelManager_1.ModelManager.PlotModel?.IsInPlot &&
            _a.jPl();
        }, 2 * _a.$ll),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.PlotNetworkStart,
        _a.Xll,
      ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.PlotNetworkStart,
          _a.Xll,
        ),
      TimerSystem_1.TimerSystem.Delay(() => {
        e
          ? UiManager_1.UiManager.OpenView("MazeTipsWinView")
          : UiManager_1.UiManager.OpenView("MazeTipsLoseView");
      }, 1500);
  }),
  (LevelPickInteractController.Xll = (e) => {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlotNetworkStart,
      _a.Xll,
    ),
      "Prompt" === e.PlotLevel || "LevelD" === e.PlotLevel
        ? _a.ExitPickInteractModel()
        : ((_a.$ll = 0),
          EventSystem_1.EventSystem.Add(
            EventDefine_1.EEventName.PlotNetworkEnd,
            _a.Yll,
          ));
  }),
  (LevelPickInteractController.Yll = (e) => {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlotNetworkEnd,
      _a.Yll,
    ),
      _a.ExitPickInteractModel();
  }),
  (LevelPickInteractController.iEl = !1),
  (LevelPickInteractController.oGa = (e) => {
    _a.ZOa.has(e) && _a.ZOa.get(e)?.RefreshBox(e);
  }),
  (LevelPickInteractController.MAl = !1),
  (LevelPickInteractController.vAl = () => {
    _a.eGa && _a.MAl && ((_a.MAl = !1), _a.YOa(_a.eGa));
  }),
  (LevelPickInteractController.WPl = !1),
  (LevelPickInteractController.QPl = () => {
    _a.WPl ||
      ((_a.WPl = !0),
      _a.OnViewPiecePostMoveEventStart && _a.OnViewPiecePostMoveEventStart());
  }),
  (LevelPickInteractController.KPl = () => {
    _a.WPl &&
      ((_a.WPl = !1), _a.OnViewPiecePostMoveEventEnd) &&
      _a.OnViewPiecePostMoveEventEnd();
  });
//# sourceMappingURL=LevelPickInteractController.js.map
