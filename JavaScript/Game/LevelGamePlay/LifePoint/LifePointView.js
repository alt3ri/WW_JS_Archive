"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LifePointView = void 0);
const UE = require("ue"),
  ue_1 = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Deque_1 = require("../../../Core/Container/Deque"),
  Pool_1 = require("../../../Core/Container/Pool"),
  Queue_1 = require("../../../Core/Container/Queue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../../Module/ConfirmBox/ConfirmBoxDefine"),
  LguiUtil_1 = require("../../Module/Util/LguiUtil"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  UiViewSequence_1 = require("../../Ui/Base/UiViewSequence"),
  LifePointModel_1 = require("./LifePointModel"),
  TIPS_FAILED = "LNXT_YiCaiHua_Tips0001",
  TIPS_RESET = "LNXT_YiCaiHua_Tips0002",
  TIPS_REPEAT = "LNXT_YiCaiHua_Tips0003",
  HELP_CONFIG_ID = 170;
class AnimTask {
  constructor() {
    (this.Time = 0),
      (this.Color = IAction_1.EPieceColorType.White),
      (this.DirectionParam = 0),
      (this.PlayRate = 1),
      (this.Order = 0);
  }
  static Get(e, i, t, s, o) {
    let r = this.Pool.Get();
    return (
      ((r = r || this.Pool.Create()).Time = e),
      (r.Color = i),
      (r.DirectionParam = t),
      (r.PlayRate = s),
      (r.Order = o),
      r
    );
  }
  Recycle() {
    AnimTask.Pool.Put(this);
  }
}
AnimTask.Pool = new Pool_1.Pool(
  LifePointModel_1.LINE_SIZE * LifePointModel_1.COLUMN_SIZE,
  () => new AnimTask(),
);
class Grid extends UiPanelBase_1.UiPanelBase {
  constructor(e, i, t, s) {
    super(),
      (this.X = e),
      (this.Y = i),
      (this.Color = t),
      (this.Callback = s),
      (this.AnimTask = new Deque_1.Deque()),
      (this.ColorExpressed = IAction_1.EPieceColorType.White),
      (this.IsBlock = !1),
      (this.mMl = void 0),
      (this.eTt = () => {
        this.Callback(this.X, this.Y);
      }),
      (this.ColorExpressed = t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [2, UE.UITexture],
      [1, UE.UITexture],
      [3, UE.UITexture],
      [4, UE.UIItem],
      [5, UE.UITexture],
    ];
  }
  OnBeforeCreate() {
    (this.mMl = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
      this.AddUiBehavior(this.mMl);
  }
  OnStart() {
    (this.IsBlock = this.ColorExpressed === IAction_1.EPieceColorType.Gray),
      this.GetTexture(0).SetTexture(
        ModelManager_1.ModelManager.LifePointModel.GridTextureMap.get(
          this.Color,
        ),
      );
    var e =
      this.Color ===
      ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard.TargetColor;
    this.GetTexture(2).GetParentAsUIItem().SetUIActive(e),
      this.GetTexture(2).SetTexture(
        ModelManager_1.ModelManager.LifePointModel.HitGridTextureMap.get(
          this.Color,
        ),
      ),
      this.GetTexture(1).GetParentAsUIItem().SetUIActive(!1),
      this.GetTexture(3).GetParentAsUIItem().SetUIActive(!1),
      this.GetTexture(5).SetUIActive(this.IsBlock),
      this.GetItem(4).SetUIActive(!this.IsBlock),
      this.IsBlock ||
        this.GetRootActor()
          .GetComponentByClass(UE.UIButtonComponent.StaticClass())
          .OnClickCallBack.Bind(this.eTt);
  }
  OnBeforeDestroy() {
    this.GetRootActor()
      .GetComponentByClass(UE.UIButtonComponent.StaticClass())
      .OnClickCallBack.Unbind(),
      this.mMl.StopSequenceByKey("Change"),
      (this.mMl = void 0);
  }
  Paint(e, i, t) {
    this.Color = e;
    for (
      var s = ModelManager_1.ModelManager.LifePointModel.CalcCountDownTime(i),
        o = AnimTask.Get(
          Time_1.Time.Now + s,
          e,
          ModelManager_1.ModelManager.LifePointModel.DirectionParam.get(t),
          ModelManager_1.ModelManager.LifePointModel.CalPlayRate(s),
          i,
        );
      0 < this.AnimTask.Size && !(this.AnimTask.Rear.Time < o.Time);

    )
      this.AnimTask.RemoveRear();
    this.AnimTask.AddRear(o);
  }
  TryBlendAnim(i, e, t) {
    var s =
      Time_1.Time.Now +
      ModelManager_1.ModelManager.LifePointModel.CalcCountDownTime(e);
    for (let e = 0; e < this.AnimTask.Size; e++) {
      var o = this.AnimTask.Get(e);
      if (o.Color === i && MathUtils_1.MathUtils.IsNearlyEqual(s, o.Time, 1)) {
        o.DirectionParam =
          ModelManager_1.ModelManager.LifePointModel.BlendDirectionParam(
            o.DirectionParam,
            t,
          );
        break;
      }
    }
  }
  BeforeReset() {
    this.AnimTask.Clear();
  }
  Reset(e) {
    if (!this.IsBlock) {
      var i =
          this.ColorExpressed ===
          ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard
            .TargetColor
            ? ModelManager_1.ModelManager.LifePointModel.HitGridTextureMap
            : ModelManager_1.ModelManager.LifePointModel.GridTextureMap,
        t = (this.mMl.StopPrevSequence(!1, !0), this.GetTexture(1)),
        s = this.GetTexture(3);
      t.SetTexture(i.get(this.ColorExpressed)),
        s.SetTexture(i.get(this.ColorExpressed)),
        t.GetParentAsUIItem().SetUIActive(!0),
        s.GetParentAsUIItem().SetUIActive(!0);
      const o =
          e ===
          ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard
            .TargetColor,
        r = ModelManager_1.ModelManager.LifePointModel.GridTextureMap.get(e),
        h = ModelManager_1.ModelManager.LifePointModel.HitGridTextureMap.get(e);
      TimerSystem_1.TimerSystem.Next(() => {
        this.GetTexture(0).SetTexture(r),
          this.GetTexture(2).GetParentAsUIItem().SetUIActive(o),
          this.GetTexture(2).SetTexture(h);
      }),
        (this.Color = e),
        (this.ColorExpressed = this.Color);
    }
  }
  AfterReset() {
    this.GetTexture(1).GetParentAsUIItem().SetUIActive(!1),
      this.GetTexture(3).GetParentAsUIItem().SetUIActive(!1),
      this.GetTexture(1).SetColor(
        ModelManager_1.ModelManager.LifePointModel.InitColor,
      ),
      this.GetTexture(3).SetColor(
        ModelManager_1.ModelManager.LifePointModel.InitColor,
      );
  }
  CheckAnim() {
    var e;
    return 0 === this.AnimTask.Size
      ? this.mMl.IsInSequence()
      : (this.AnimTask.Front.Time > Time_1.Time.Now ||
          ((e = this.AnimTask.RemoveFront()), this.Gti(e), e.Recycle()),
        !0);
  }
  Gti(e) {
    const i =
      e.Color ===
      ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard.TargetColor;
    var t =
      this.ColorExpressed ===
      ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard.TargetColor
        ? ModelManager_1.ModelManager.LifePointModel.HitGridTextureMap
        : ModelManager_1.ModelManager.LifePointModel.GridTextureMap;
    const s = ModelManager_1.ModelManager.LifePointModel.GridTextureMap.get(
        e.Color,
      ),
      o = ModelManager_1.ModelManager.LifePointModel.HitGridTextureMap.get(
        e.Color,
      );
    TimerSystem_1.TimerSystem.Next(() => {
      this.GetTexture(0).SetTexture(s),
        this.GetTexture(2).GetParentAsUIItem().SetUIActive(i),
        this.GetTexture(2).SetTexture(o);
    });
    var r = this.GetTexture(1),
      h = this.GetTexture(3),
      t =
        (r.SetTexture(t.get(this.ColorExpressed)),
        h.SetTexture(t.get(this.ColorExpressed)),
        r.GetParentAsUIItem().SetUIActive(!0),
        h.GetParentAsUIItem().SetUIActive(!0),
        e.DirectionParam < 0
          ? this.mMl.HasSequenceNameInPlaying("PointChange")
            ? this.mMl.ReplaySequence("PointChange")
            : this.mMl.PlaySequence("PointChange", !1)
          : (r.SetCustomMaterialScalarParameter(
              ModelManager_1.ModelManager.LifePointModel.ParamName,
              e.DirectionParam,
            ),
            h.SetCustomMaterialScalarParameter(
              ModelManager_1.ModelManager.LifePointModel.ParamName,
              e.DirectionParam,
            ),
            this.mMl.HasSequenceNameInPlaying("Change")
              ? this.mMl.ReplaySequence("Change")
              : this.mMl.PlaySequence("Change", !1, e.PlayRate)),
        (this.ColorExpressed = e.Color),
        ModelManager_1.ModelManager.LifePointModel.AudioMap.get(e.Order) ?? [
          0, 0,
        ]);
    (t[0] = t[0] + 1),
      (t[1] = e.PlayRate),
      ModelManager_1.ModelManager.LifePointModel.AudioMap.set(e.Order, t);
  }
}
class LifePointView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.HDe = void 0),
      (this.hB = []),
      (this.Alh = void 0),
      (this.Rlh = 0),
      (this.OFl = 0),
      (this.CUl = !1),
      (this.gUl = !1),
      (this.pUl = new Map()),
      (this.$An = (e) => {
        this.GetLayoutBase(2)
          .GetOwner()
          .GetComponentByClass(ue_1.UIInturnAnimController.StaticClass())
          .Play();
      }),
      (this.B_e = () => {
        this.CloseMe();
      }),
      (this.hBi = () => {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          TIPS_RESET,
        ),
          (this.gUl = !0);
        for (let e = 0; e < LifePointModel_1.LINE_SIZE; e++) {
          var i = this.hB[e];
          for (let e = 0; e < LifePointModel_1.COLUMN_SIZE; e++)
            i[e].BeforeReset();
        }
      }),
      (this.NFl = () => {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(
          HELP_CONFIG_ID,
        );
      }),
      (this.FFl = () => {
        for (let e = 0; e < LifePointModel_1.LINE_SIZE; e++) {
          var i = this.hB[e];
          for (let e = 0; e < LifePointModel_1.COLUMN_SIZE; e++)
            i[e].AfterReset();
        }
        var e =
          ModelManager_1.ModelManager.LifePointModel.Config.StepLimit +
          ModelManager_1.ModelManager.LifePointModel.GetStepBonus();
        this.OFl < e
          ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              239,
            )).FunctionMap.set(1, this.Jke),
            e.FunctionMap.set(2, this.Mke),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            ))
          : this.Jke();
      }),
      (this.Mke = () => {
        (this.OFl =
          ModelManager_1.ModelManager.LifePointModel.Config.StepLimit +
          ModelManager_1.ModelManager.LifePointModel.GetStepBonus()),
          (this.Rlh = this.OFl);
        var e = this.GetText(8);
        e.SetText(this.Rlh.toString()),
          e.SetColor(
            ModelManager_1.ModelManager.LifePointModel.NormalStepColor,
          );
      }),
      (this.Jke = () => {
        this.Rlh = this.OFl;
        var e = this.GetText(8);
        e.SetText(this.Rlh.toString()),
          e.SetColor(
            ModelManager_1.ModelManager.LifePointModel.NormalStepColor,
          );
      }),
      (this.xlh = (e, i) => {
        if (!(this.gUl || !this.Alh || this.Rlh <= 0 || this.Rlh > this.OFl)) {
          var t = this.hB[e][i];
          if (t.Color === this.Alh)
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
              TIPS_REPEAT,
            );
          else {
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "LevelPlay",
                26,
                "[LifePoint] 点击",
                ["x", e],
                ["y", i],
              ),
              ModelManager_1.ModelManager.LifePointModel.AddStep(),
              (this.CUl = !0),
              this.Rlh--;
            var e = this.GetText(8),
              s =
                (e.SetText(this.Rlh.toString()),
                1 === this.Rlh &&
                  e.SetColor(
                    ModelManager_1.ModelManager.LifePointModel.DangerStepColor,
                  ),
                t.Color),
              o = new Queue_1.Queue();
            for (t.Paint(this.Alh, 0, 4), o.Push([t, 0]); 0 < o.Size; ) {
              var r,
                h,
                n = o.Pop(),
                a = n[0],
                n = n[1] + 1;
              0 !== a.X &&
                ((r = this.hB[a.X - 1][a.Y]).Color === s
                  ? (r.Paint(this.Alh, n, 0), o.Push([r, n]))
                  : r.Color === this.Alh && r.TryBlendAnim(this.Alh, n, 0)),
                0 !== a.Y &&
                  ((r = this.hB[a.X][a.Y - 1]).Color === s
                    ? (r.Paint(this.Alh, n, 2), o.Push([r, n]))
                    : r.Color === this.Alh && r.TryBlendAnim(this.Alh, n, 2)),
                a.X !== LifePointModel_1.LINE_SIZE - 1 &&
                  ((h = this.hB[a.X + 1][a.Y]).Color === s
                    ? (h.Paint(this.Alh, n, 1), o.Push([h, n]))
                    : h.Color === this.Alh && h.TryBlendAnim(this.Alh, n, 1)),
                a.Y !== LifePointModel_1.COLUMN_SIZE - 1 &&
                  ((h = this.hB[a.X][a.Y + 1]).Color === s
                    ? (h.Paint(this.Alh, n, 3), o.Push([h, n]))
                    : h.Color === this.Alh && h.TryBlendAnim(this.Alh, n, 3));
            }
          }
        }
      });
  }
  get wlh() {
    return ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard
      .TargetColor;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.$An,
    );
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UILayoutBase],
      [3, UE.UIItem],
      [4, UE.UIExtendToggle],
      [5, UE.UIExtendToggle],
      [6, UE.UIExtendToggle],
      [7, UE.UIExtendToggle],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
      [10, UE.UIButtonComponent],
      [11, UE.UIText],
      [12, UE.UINiagara],
      [13, UE.UIButtonComponent],
    ];
    const e = this.pUl;
    e.set(IAction_1.EPieceColorType.Blue, 4),
      e.set(IAction_1.EPieceColorType.Red, 5),
      e.set(IAction_1.EPieceColorType.Yellow, 6),
      e.set(IAction_1.EPieceColorType.Green, 7);
    var i = (i) => [
      e.get(i),
      (e) => {
        this.Blh(e, i);
      },
    ];
    this.BtnBindInfo = [
      [10, this.B_e],
      [9, this.hBi],
      [13, this.NFl],
      i(IAction_1.EPieceColorType.Blue),
      i(IAction_1.EPieceColorType.Red),
      i(IAction_1.EPieceColorType.Yellow),
      i(IAction_1.EPieceColorType.Green),
    ];
  }
  async OnBeforeStartAsync() {
    var t = this.OpenParam,
      s = [],
      o =
        ((this.HDe = t.Callback),
        await ModelManager_1.ModelManager.LifePointModel.LoadDataAsync(
          t.Config,
          t.EntityId,
        ),
        this.GetItem(3)),
      r = this.GetLayoutBase(2).RootUIComp;
    for (let i = 0; i < LifePointModel_1.LINE_SIZE; i++) {
      var h = new Array();
      for (let e = 0; e < LifePointModel_1.COLUMN_SIZE; e++) {
        var n = LguiUtil_1.LguiUtil.CopyItem(o, r),
          a =
            t.Config.ColorBoard.Config[i * LifePointModel_1.COLUMN_SIZE + e]
              .Color,
          a = new Grid(i, e, a, this.xlh);
        h.push(a), s.push(a.CreateThenShowByActorAsync(n.GetOwner()));
      }
      this.hB.push(h);
    }
    s.push(
      this.SetTextureAsync(
        ModelManager_1.ModelManager.LifePointModel.GetFramePath(this.wlh),
        this.GetTexture(1),
      ),
    ),
      await Promise.all(s);
  }
  OnStart() {
    this.GetItem(3).SetUIActive(!1),
      (this.gUl = !1),
      (this.CUl = !1),
      (this.OFl =
        ModelManager_1.ModelManager.LifePointModel.Config.StepLimit +
        ModelManager_1.ModelManager.LifePointModel.GetStepBonus()),
      (this.Rlh = this.OFl),
      this.GetText(8).SetText(this.Rlh.toString()),
      this.GetText(11).ShowTextNew(
        ModelManager_1.ModelManager.LifePointModel.GetText(this.wlh),
      ),
      (this.GetUiNiagara(12).ColorParameter.Get("Color").Constant =
        UE.LinearColor.FromSRGBColor(
          UE.Color.FromHex(
            ModelManager_1.ModelManager.LifePointModel.GetColorHex(this.wlh),
          ),
        ));
    for (var [e, i] of this.pUl) {
      i = this.GetExtendToggle(i);
      ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard.Colors.includes(
        e,
      )
        ? (i.RootUIComp.SetUIActive(!0),
          void 0 === this.Alh && (i.SetToggleStateForce(1), (this.Alh = e)))
        : i.RootUIComp.SetUIActive(!1);
    }
  }
  OnBeforeHide() {
    this.LastHide || this.CloseMe();
  }
  OnBeforeDestroy() {
    for (const e of this.hB) for (const i of e) i.Destroy();
    AnimTask.Pool.Clear(),
      ModelManager_1.ModelManager.LifePointModel.UnloadData();
  }
  av() {
    for (let i = 0; i < LifePointModel_1.LINE_SIZE; i++) {
      var t = this.hB[i];
      for (let e = 0; e < LifePointModel_1.COLUMN_SIZE; e++) {
        var s = t[e],
          o =
            ModelManager_1.ModelManager.LifePointModel.Config.ColorBoard.Config[
              i * LifePointModel_1.COLUMN_SIZE + e
            ].Color;
        s.Reset(o);
      }
    }
    this.PlaySequence("Renew", this.FFl, !0),
      ModelManager_1.ModelManager.LifePointModel.AudioMap.clear();
  }
  Blh(e, i) {
    e &&
      this.Alh !== i &&
      (this.Alh &&
        this.GetExtendToggle(this.pUl.get(this.Alh)).SetToggleStateForce(0),
      (this.Alh = i));
  }
  OnTick(e) {
    if (this.CUl || this.gUl) {
      let e = !1;
      for (const i of this.hB) for (const t of i) e = t.CheckAnim() || e;
      e ? this.Zbl() : this.kxe();
    }
  }
  Zbl() {
    for (var [e, i] of ModelManager_1.ModelManager.LifePointModel.AudioMap)
      AudioSystem_1.AudioSystem.SetRtpcValue(
        ModelManager_1.ModelManager.LifePointModel.RtpcCount,
        e,
        void 0,
      ),
        AudioSystem_1.AudioSystem.SetRtpcValue(
          ModelManager_1.ModelManager.LifePointModel.RtpcGrids,
          i[0],
        ),
        AudioSystem_1.AudioSystem.SetRtpcValue(
          ModelManager_1.ModelManager.LifePointModel.RtpcSpeed,
          i[1],
        ),
        AudioSystem_1.AudioSystem.PostEvent(
          ModelManager_1.ModelManager.LifePointModel.AudioEvent,
          void 0,
        );
    ModelManager_1.ModelManager.LifePointModel.AudioMap.clear();
  }
  kxe() {
    (this.CUl || this.gUl) &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("LevelPlay", 26, "[LifePoint] 检查生命点完成"),
      this.gUl
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("LevelPlay", 26, "[LifePoint] 生命点重置"),
          this.av())
        : this.blh()
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("LevelPlay", 26, "[LifePoint] 生命点成功"),
            ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.RequestFinishUiGameplay(
              Protocol_1.Aki.Protocol.h3s.Proto_LifePoint,
              "",
            ),
            this.HDe?.(),
            this.PlaySequence("Complete", this.B_e))
          : this.Rlh <= 0 &&
            (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
              TIPS_FAILED,
            ),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("LevelPlay", 26, "[LifePoint] 生命点失败"),
            this.av()),
      (this.CUl = !1),
      (this.gUl = !1));
  }
  blh() {
    for (const e of this.hB)
      for (const i of e) if (this.wlh !== i.Color && !i.IsBlock) return !1;
    return !0;
  }
  GmFinish() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("LevelPlay", 26, "[LifePoint] 生命点成功"),
      ControllerHolder_1.ControllerHolder.GeneralLogicTreeController.RequestFinishUiGameplay(
        Protocol_1.Aki.Protocol.h3s.Proto_LifePoint,
        "",
      ),
      this.HDe?.(),
      this.PlaySequence("Complete", this.B_e);
  }
}
exports.LifePointView = LifePointView;
//# sourceMappingURL=LifePointView.js.map
