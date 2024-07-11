"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemView = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  MarkChildIconComponent_1 = require("./Components/MarkChildIconComponent"),
  MarkNameComponent_1 = require("./Components/MarkNameComponent"),
  MarkOutOfBoundComponent_1 = require("./Components/MarkOutOfBoundComponent"),
  MarkRangeImageComponent_1 = require("./Components/MarkRangeImageComponent"),
  MarkSelectComponent_1 = require("./Components/MarkSelectComponent"),
  MarkTrackComponent_1 = require("./Components/MarkTrackComponent"),
  MarkVerticalPointerComponent_1 = require("./Components/MarkVerticalPointerComponent"),
  POINTER_RANGE = 2e3,
  SCALE_TWEEN_DURATION = 0.2;
class MarkItemView extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Holder = void 0),
      (this.IsSelectedInternal = !1),
      (this._aa = !1),
      (this.uaa = 0),
      (this.GOe = void 0),
      (this.IsShowIcon = !0),
      (this.pRi = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.OutOfBoundComponentInternal = void 0),
      (this.SelectComponentInternal = void 0),
      (this.TrackComponentInternal = void 0),
      (this.RangeComponentInternal = void 0),
      (this.NameComponentInternal = void 0),
      (this.VerticalPointerComponentInternal = void 0),
      (this.ChildIconComponentInternal = void 0),
      (this.vRi = void 0),
      (this.MRi = void 0),
      (this.ERi = void 0),
      (this.Gla = void 0),
      (this.SRi = void 0),
      (this.yRi = !1),
      (this.IRi = void 0),
      (this.TRi = void 0),
      (this.LRi = void 0),
      (this.DRi = void 0),
      (this.RRi = void 0),
      (this.URi = void 0),
      (this.ARi = void 0),
      (this.PRi = !1),
      (this.xRi = !1),
      (this.wRi = void 0),
      (this.BRi = 0),
      (this.OnLevelSequenceStart = (t) => {
        this.Holder.OnLevelSequenceStart(t);
      }),
      (this.OnLevelSequenceStop = (t) => {
        this.Holder.OnLevelSequenceStop(t),
          "HideView" === t &&
            ((t = this.Holder.IsCanShowView),
            this.SetUiActive(t),
            this.ERi?.SetAlpha(1));
      }),
      (this.kOe = () => {
        var t,
          i,
          e = CommonParamById_1.configCommonParamById.GetFloatConfig(
            "MapMarkSelectedAdditionScale",
          ),
          e = this.Holder.MarkScale + e;
        this.caa()
          ? ((t = (Time_1.Time.NowSeconds - this.uaa) / SCALE_TWEEN_DURATION),
            (i = this._aa ? this.Holder.MarkScale : e),
            (e = this._aa ? e : this.Holder.MarkScale),
            (i = MathUtils_1.MathUtils.Lerp(i, e, t)),
            this.SetScale(i))
          : (this.jm(), this.maa(this._aa));
      }),
      (this.Holder = t),
      (this.pRi = new UE.Vector());
  }
  get LoadingPromise() {
    return this.vRi;
  }
  get IsSelected() {
    return this.IsSelectedInternal;
  }
  set IsSelected(t) {
    this.IsSelectedInternal !== t &&
      ((this.IsSelectedInternal = t), this.OnSelectedStateChange(t));
  }
  async GetNameComponentAsync() {
    return (
      this.NameComponentInternal ||
        (this.NameComponentInternal =
          new MarkNameComponent_1.MarkNameComponent()),
      this.IRi ||
        ((this.IRi = this.NameComponentInternal.CreateThenShowByResourceIdAsync(
          "UiItem_MarkMapName_Prefab",
          this.ERi,
          !0,
        )),
        this.AddChild(this.NameComponentInternal)),
      await this.IRi,
      this.NameComponentInternal
    );
  }
  async GetRangeComponentAsync() {
    return (
      this.RangeComponentInternal ||
        (this.RangeComponentInternal =
          new MarkRangeImageComponent_1.MarkRangeImageComponent()),
      this.TRi ||
        ((this.TRi =
          this.RangeComponentInternal.CreateThenShowByResourceIdAsync(
            "UiItem_MarkArea_Prefab",
            this.ERi,
            !0,
          )),
        this.AddChild(this.RangeComponentInternal)),
      await this.TRi,
      this.RangeComponentInternal
    );
  }
  async GetOutOfBoundComponentAsync() {
    return (
      this.OutOfBoundComponentInternal ||
        (this.OutOfBoundComponentInternal =
          new MarkOutOfBoundComponent_1.MarkOutOfBoundComponent()),
      this.LRi ||
        ((this.LRi =
          this.OutOfBoundComponentInternal.CreateThenShowByResourceIdAsync(
            "UiItem_MarkOut_Prefab",
            this.ERi,
            !0,
          )),
        this.AddChild(this.OutOfBoundComponentInternal)),
      await this.LRi,
      this.OutOfBoundComponentInternal
    );
  }
  async GetSelectComponentAsync() {
    return (
      this.SelectComponentInternal ||
        (this.SelectComponentInternal =
          new MarkSelectComponent_1.MarkSelectComponent()),
      this.DRi ||
        ((this.DRi =
          this.SelectComponentInternal.CreateThenShowByResourceIdAsync(
            "UiItem_MarkChoose_Prefab",
            this.ERi,
            !0,
          )),
        this.AddChild(this.SelectComponentInternal)),
      await this.DRi,
      this.SelectComponentInternal
    );
  }
  async GetTrackComponentAsync() {
    return (
      this.TrackComponentInternal ||
        ((this.TrackComponentInternal =
          new MarkTrackComponent_1.MarkTrackComponent()),
        (this.TrackComponentInternal.MapType = this.Holder.MapType)),
      this.RRi ||
        ((this.RRi =
          this.TrackComponentInternal.CreateThenShowByResourceIdAsync(
            "UiItem_MarkTrackNia_Prefab",
            this.ERi,
            !0,
          )),
        this.AddChild(this.TrackComponentInternal)),
      await this.RRi,
      this.TrackComponentInternal
    );
  }
  async GetVerticalPointerComponentAsync() {
    return (
      this.VerticalPointerComponentInternal ||
        (this.VerticalPointerComponentInternal =
          new MarkVerticalPointerComponent_1.MarkVerticalPointerComponent()),
      this.URi ||
        ((this.URi =
          this.VerticalPointerComponentInternal.CreateThenShowByResourceIdAsync(
            "UiItem_MarkArrow_Prefab",
            this.ERi,
            !0,
          )),
        this.AddChild(this.VerticalPointerComponentInternal)),
      await this.URi,
      this.VerticalPointerComponentInternal
    );
  }
  async GetChildIconComponentAsync() {
    return (
      this.ChildIconComponentInternal ||
        (this.ChildIconComponentInternal =
          new MarkChildIconComponent_1.MarkChildIconComponent()),
      this.ARi ||
        ((this.ARi =
          this.ChildIconComponentInternal.CreateThenShowByResourceIdAsync(
            "UiItem_MarkChildNode_Prefab",
            this.ERi,
            !0,
          )),
        this.AddChild(this.ChildIconComponentInternal)),
      await this.ARi,
      this.ChildIconComponentInternal
    );
  }
  async InitializeMarkItemViewAsync() {
    (this.vRi = this.CreateThenShowByResourceIdAsync(
      "UiItem_WorldMapMark_Prefab",
      this.Holder.ViewRoot,
      !0,
    )),
      await this.vRi,
      this.bRi(this.yRi);
  }
  OnSelectedStateChange(t) {}
  OnInitialize() {}
  GetIconItem() {
    return this.GetSprite(1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    GlobalData_1.GlobalData.IsPlayInEditor &&
      this.RootActor.SetActorLabel(
        `MarkId:${this.Holder.MarkId},MarkType:${this.Holder.MarkType},ShowPriority:` +
          this.Holder.ShowPriority,
      );
    var t = this.RootItem.GetAttachSocketName(),
      i = this.RootItem.GetAttachParent(),
      i =
        ((this.Gla = i.GetSocketTransform(t)),
        (this.ERi = this.GetItem(0)),
        (this.LevelSequencePlayer =
          new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
        this.LevelSequencePlayer.BindSequenceStartEvent(
          this.OnLevelSequenceStart,
        ),
        this.LevelSequencePlayer.BindSequenceCloseEvent(
          this.OnLevelSequenceStop,
        ),
        this.GetSprite(1).SetUIActive(!1),
        new UE.Vector(this.Holder.ConfigScale));
    this.GetSprite(1).SetUIItemScale(i),
      this.SetScale(this.Holder.MarkScale),
      this.OnInitialize(),
      void 0 !== this.SRi && (this.SRi(), (this.SRi = void 0)),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnMarkItemViewCreate,
        this,
      );
  }
  OnAfterHide() {
    this.jm();
  }
  OnBeforeDestroy() {
    (this.OutOfBoundComponentInternal = void 0),
      (this.SelectComponentInternal = void 0),
      (this.TrackComponentInternal = void 0),
      (this.RangeComponentInternal = void 0),
      (this.NameComponentInternal = void 0),
      (this.VerticalPointerComponentInternal = void 0),
      (this.ChildIconComponentInternal = void 0),
      this.LevelSequencePlayer?.Clear(),
      (this.LevelSequencePlayer = void 0),
      (this.vRi = void 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnMarkItemViewDestroy,
        this,
      ),
      (this.Gla = void 0),
      (this.Holder = void 0);
  }
  SetScale(t) {
    var i, e;
    void 0 !== this.Holder &&
      void 0 !== this.Gla &&
      ((i = 1 / this.Holder.LogicWorldScale),
      (e =
        1 === this.Holder.MapType
          ? this.Gla.GetScale3D()
          : Vector_1.Vector.OneVectorProxy),
      this.pRi.Set((t * i) / e.X, (t * i) / e.Y, (t * i) / e.Z),
      this.RootItem.SetUIRelativeScale3D(this.pRi));
  }
  OnUpdate(t, i = !1, e = !1) {
    if (void 0 === this.Holder)
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Map",
          35,
          "Holder is undefined",
          ["ComponentState", this.IsDestroyOrDestroying],
          ["isCreating", this.IsCreating],
        );
    else if (
      ((this.yRi = e),
      this.IsCreating || this.IsDestroyOrDestroying || this.IsHideOrHiding)
    )
      this.SRi = () => {
        this.OnUpdate(t, i, e);
      };
    else {
      this.bRi(this.yRi);
      var s = this.Holder.IsCanShowView;
      if ((this.SetUiActive(s), s)) {
        2 === this.Holder.MapType && this.maa(this.IsSelected);
        s = this.Holder.IsOutOfBound;
        (this.PRi === s && void 0 !== this.PRi) ||
          ((this.PRi = s),
          this.PRi
            ? this.GetOutOfBoundComponentAsync().then((t) => {
                t.SetActive(!0);
              })
            : this.OutOfBoundComponentInternal?.SetActive(!1)),
          (s = this.Holder.IsTracked && !i),
          (this.xRi === s && void 0 !== this.xRi) ||
            ((this.xRi = s),
            this.xRi
              ? this.GetTrackComponentAsync().then((t) => {
                  t.SetActive(!0);
                })
              : this.TrackComponentInternal?.SetActive(!1)),
          (s = this.IsSelected),
          (this.wRi === s && void 0 !== this.wRi) ||
            (this.IsSelected
              ? this.GetSelectComponentAsync().then((t) => {
                  t.SetActive(!0);
                })
              : this.SelectComponentInternal?.SetActive(!1),
            (this.wRi = s));
        const h = this.qRi(this.Holder.WorldPosition, t);
        this.BRi !== h &&
          ((this.BRi = h),
          this.GetVerticalPointerComponentAsync().then((t) => {
            switch (h) {
              case 0:
                t.HideSelf();
                break;
              case 1:
                t.ShowUp();
                break;
              case 2:
                t.ShowDown();
            }
          })),
          this.OnSafeUpdate(t, i, e);
      }
    }
  }
  OnSafeUpdate(t, i = 0, e) {}
  bRi(t) {
    if (void 0 === this.Holder)
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Map",
          35,
          "Holder is undefined",
          ["ComponentState", this.IsDestroyOrDestroying],
          ["isCreating", this.IsCreating],
        );
    else {
      if (t) {
        if (this.Holder.NeedPlayShowOrHideSeq) {
          switch (this.Holder.NeedPlayShowOrHideSeq) {
            case "ShowView":
              this.PlayInShowScaleRangeSequence();
              break;
            case "HideView":
              this.PlayOutShowScaleRangeSequence();
          }
          this.Holder.NeedPlayShowOrHideSeq = void 0;
        }
      } else
        (this.Holder.NeedPlayShowOrHideSeq = void 0),
          this.Holder.OnLevelSequenceStop("HideView");
      this.yRi = !1;
    }
  }
  SetOutOfBoundDirection(e) {
    this.GetOutOfBoundComponentAsync().then((t) => {
      var i = this.Holder.UiPosition,
        i = Vector2D_1.Vector2D.Create(i.X, i.Y);
      i.SubtractionEqual(e), t.SetOutOfBoundDirection(i);
    });
  }
  OnStartTrack() {}
  OnEndTrack() {}
  OnIconPathChanged(t) {
    var i = this.GetSprite(1);
    this.LoadIcon(i, t);
  }
  LoadIcon(t, i) {
    t &&
      !StringUtils_1.StringUtils.IsEmpty(i) &&
      this.SetSpriteByPath(i, t, !1, void 0, () => {
        t.SetUIActive(this.IsShowIcon);
      });
  }
  async LoadIconAsync(t, i) {
    await this.vRi;
    const e = new CustomPromise_1.CustomPromise();
    (this.MRi = e.Promise),
      t && !StringUtils_1.StringUtils.IsEmpty(i)
        ? this.SetSpriteByPath(i, t, !1, void 0, () => {
            t.SetUIActive(this.IsShowIcon), e.SetResult();
          })
        : (e.SetResult(),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Map",
              50,
              "标记设置失败,检查传入的参数是否有空值",
            )),
      await this.MRi;
  }
  GetInteractiveFlag() {
    return this.Holder?.IsCanShowView ?? !1;
  }
  GetMarkPriorityKey(t, i = 0) {
    let e = 0;
    switch (t) {
      case 9:
        e = 1e3;
        break;
      case 11:
        e = 3e3;
        break;
      case 12:
        e = 2e3;
        break;
      default:
        e = i;
    }
    return e;
  }
  qRi(t, i) {
    return 2 === this.Holder.MapType ||
      ((t = t.Z - i.Z), Math.abs(t) < POINTER_RANGE)
      ? 0
      : t < 0
        ? 1
        : 2;
  }
  PlayInShowScaleRangeSequence() {
    this.LevelSequencePlayer.StopCurrentSequence(),
      this.LevelSequencePlayer.PlayLevelSequenceByName("ShowView");
  }
  PlayOutShowScaleRangeSequence() {
    this.LevelSequencePlayer.StopCurrentSequence(),
      this.LevelSequencePlayer.PlayLevelSequenceByName("HideView");
  }
  async PlayUnlockSequence() {}
  maa(t) {
    var i;
    if (this._aa === t)
      return this.caa()
        ? void 0
        : ((i = CommonParamById_1.configCommonParamById.GetFloatConfig(
            "MapMarkSelectedAdditionScale",
          )),
          (i = this._aa ? i : 0),
          (i = this.Holder.MarkScale + i),
          void this.SetScale(i));
    (this._aa = t),
      (this.uaa = Time_1.Time.NowSeconds),
      this.jm(),
      (this.GOe = TimerSystem_1.TimerSystem.Forever(this.kOe, 50));
  }
  caa() {
    return (
      0 < this.uaa && this.uaa + SCALE_TWEEN_DURATION >= Time_1.Time.NowSeconds
    );
  }
  jm() {
    TimerSystem_1.TimerSystem.Has(this.GOe) &&
      (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
  }
}
exports.MarkItemView = MarkItemView;
//# sourceMappingURL=MarkItemView.js.map
