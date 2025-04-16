"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkItemView = void 0);
const UE = require("ue"),
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
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  MarkSpritePool_1 = require("../../Container/MarkSpritePool"),
  MarkItemChildIconHandle_1 = require("./Handles/MarkItemChildIconHandle"),
  MarkItemGravityReverseIconHandle_1 = require("./Handles/MarkItemGravityReverseIconHandle"),
  MarkItemNameHandle_1 = require("./Handles/MarkItemNameHandle"),
  MarkItemOutOfBoundHandle_1 = require("./Handles/MarkItemOutOfBoundHandle"),
  MarkItemRangeHandle_1 = require("./Handles/MarkItemRangeHandle"),
  MarkItemSelectHandle_1 = require("./Handles/MarkItemSelectHandle"),
  MarkItemTopRightIconHandle_1 = require("./Handles/MarkItemTopRightIconHandle"),
  MarkItemTrackHandle_1 = require("./Handles/MarkItemTrackHandle"),
  MarkItemVerticlePointerHandle_1 = require("./Handles/MarkItemVerticlePointerHandle"),
  MarkPanelBase_1 = require("./MarkPanelBase"),
  SCALE_TWEEN_DURATION = 0.2,
  MARK_ITEM_VIEW_PATH = "UiItem_WorldMapMark_Prefab";
class MarkItemView extends MarkPanelBase_1.MarkPanelBase {
  constructor(e) {
    super(),
      (this.Holder = void 0),
      (this.u1a = !1),
      (this.c1a = 0),
      (this.GOe = void 0),
      (this.IsShowIcon = !0),
      (this.pRi = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.ERi = void 0),
      (this.Oua = void 0),
      (this.yRi = !1),
      (this.MarkComponentContext = void 0),
      (this.MarkItemComponentHandleMap = new Map()),
      (this.OnLevelSequenceStart = (e) => {
        this.Holder.OnLevelSequenceStart(e);
      }),
      (this.OnLevelSequenceStop = (e) => {
        this.Holder.OnLevelSequenceStop(e),
          "HideView" === e &&
            ((e =
              this.Holder.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(0)),
            this.SetUiActive(e),
            this.ERi?.SetAlpha(1));
      }),
      (this.kOe = () => {
        var e, t, i;
        void 0 === this.Holder
          ? this.jm()
          : ((t = CommonParamById_1.configCommonParamById.GetFloatConfig(
              "MapMarkSelectedAdditionScale",
            )),
            (t = this.Holder.MarkScale + t),
            this.m1a()
              ? ((e =
                  (Time_1.Time.NowSeconds - this.c1a) / SCALE_TWEEN_DURATION),
                (i = this.u1a ? this.Holder.MarkScale : t),
                (t = this.u1a ? t : this.Holder.MarkScale),
                (i = MathUtils_1.MathUtils.Lerp(i, t, e)),
                this.SetScale(i))
              : (this.jm(), this.d1a(this.u1a)));
      }),
      (this.Holder = e),
      (this.pRi = new UE.Vector());
  }
  get MarkItemTopRightIconHandle() {
    return this.MarkItemComponentHandleMap.get(1);
  }
  get MarkItemRangeHandle() {
    return this.MarkItemComponentHandleMap.get(2);
  }
  get MarkItemNameHandle() {
    return this.MarkItemComponentHandleMap.get(3);
  }
  get MarkItemOutOfBoundHandle() {
    return this.MarkItemComponentHandleMap.get(4);
  }
  get MarkItemSelectHandle() {
    return this.MarkItemComponentHandleMap.get(5);
  }
  get MarkItemTrackHandle() {
    return this.MarkItemComponentHandleMap.get(6);
  }
  get MarkItemChildIconHandle() {
    return this.MarkItemComponentHandleMap.get(7);
  }
  get MarkItemVerticalPointerHandle() {
    return this.MarkItemComponentHandleMap.get(8);
  }
  get MarkItemGravityReverseIconHandle() {
    return this.MarkItemComponentHandleMap.get(9);
  }
  get IsSelected() {
    return this.Holder.MarkItemEntity.ViewLifeCircle.IsSelected;
  }
  set IsSelected(e) {
    this.Holder.MarkItemEntity.ViewLifeCircle.IsSelectedDirty &&
      this.OnSelectedStateChange(e);
  }
  async InitializeMarkItemViewAsync() {
    (this.LoadingPromiseInner = this.CreateThenShowByPoolResourceIdAsync(
      MARK_ITEM_VIEW_PATH,
      this.Holder.ViewRoot,
    )),
      await this.LoadingPromiseInner,
      (this.LoadingPromiseInner = void 0),
      this.bRi(this.yRi);
  }
  OnSelectedStateChange(e) {}
  OnInitialize() {
    this.OnIconPathChanged(this.Holder.IconPath);
  }
  GetIconItem() {
    return this.GetSprite(1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UISprite],
    ];
  }
  OnStart() {
    this.RefreshActorLabel();
    var e = this.RootItem.GetAttachSocketName(),
      t = this.RootItem.GetAttachParent();
    (this.Oua = t.D_GetSocketTransform(e)),
      (this.ERi = this.GetItem(0)),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.LevelSequencePlayer.BindSequenceStartEvent(
        this.OnLevelSequenceStart,
      ),
      this.LevelSequencePlayer.BindSequenceCloseEvent(this.OnLevelSequenceStop),
      this.GetSprite(1).SetUIActive(!1),
      this.GetSprite(2).SetUIActive(!1),
      this.Xd(),
      this.Ph_(),
      this.ApplyRootAnchorOffset(),
      this.OnInitialize(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnMarkItemViewCreate,
        this,
      );
  }
  RefreshActorLabel() {
    GlobalData_1.GlobalData.IsPlayInEditor &&
      this.RootActor.SetActorLabel(
        `MarkId:${this.Holder.MarkId},MarkType:${this.Holder.MarkType},MapType:${this.Holder.MapType},ComponentId:` +
          this.ComponentId,
      );
  }
  OnAfterHide() {
    this.jm();
  }
  OnBeforeDestroy() {
    this.En_(),
      this.LevelSequencePlayer?.Clear(),
      (this.LevelSequencePlayer = void 0),
      (this.LoadingPromiseInner = void 0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnMarkItemViewDestroy,
        this,
      ),
      (this.Oua = void 0),
      (this.Holder = void 0);
  }
  SetScale(e) {
    var t, i;
    this.IsHolderValid() &&
      ((t =
        1 /
        ((i = 1 === this.Holder.MapType)
          ? 1
          : ModelManager_1.ModelManager.WorldMapModel.MapScale)),
      (i = i ? this.Oua.GetScale3D() : Vector_1.Vector.OneVectorProxy),
      this.pRi.Set((e * t) / i.X, (e * t) / i.Y, (e * t) / i.Z),
      this.RootItem.SetUIRelativeScale3D(this.pRi));
  }
  IsHolderValid() {
    return void 0 !== this.Holder && void 0 !== this.Oua;
  }
  get IsViewReady() {
    return (
      !this.IsCreating && !this.IsDestroyOrDestroying && !this.IsHideOrHiding
    );
  }
  OnUpdate(e, t = !1, i = !1) {
    var s;
    void 0 === this.Holder || this.IsRegister
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Map",
          63,
          "Holder is undefined",
          ["IsDestroyOrDestroying", this.IsDestroyOrDestroying],
          ["IsRegister", this.IsRegister],
          ["isCreating", this.IsCreating],
        )
      : ((this.yRi = i),
        this.bRi(this.yRi),
        (s = this.Holder.IsCanShowView) &&
          (s && !this.RootItem?.bIsUIActive && this.SetUiActive(!0),
          2 === this.Holder.MapType && this.d1a(this.IsSelected),
          void 0 === this.MarkComponentContext ||
            (this.gth(e, t),
            this.OnSafeUpdate(e, t, i),
            this.OnLateUpdate(),
            s) ||
            this.Holder.NeedPlayShowOrHideSeq ||
            this.SetUiActive(!1)));
  }
  ApplyOutOfBoundActive() {
    this.MarkItemOutOfBoundHandle?.ApplyModified();
  }
  gth(e, t = !1) {
    this.MarkItemTrackHandle?.SetVisible(this.Holder.IsTracked && !t),
      this.MarkItemSelectHandle?.SetVisible(this.IsSelected),
      this.MarkItemVerticalPointerHandle?.UpdateVerticalPointerType(
        this.Holder.WorldPosition,
        e,
      ),
      this.wh_();
  }
  OnSafeUpdate(e, t = 0, i) {}
  OnLateUpdate() {
    this.KCc(), this.Uh_();
  }
  bRi(e) {
    if (void 0 === this.Holder)
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Map",
          63,
          "Holder is undefined",
          ["ComponentState", this.IsDestroyOrDestroying],
          ["isCreating", this.IsCreating],
        );
    else {
      if (e) {
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
  OnStartTrack() {}
  OnEndTrack() {}
  xW_() {
    this.OnIconPathChanged(this.Holder.IconPath), this.KCc();
  }
  KCc() {
    var e, t;
    this.Holder.MarkItemEntity.ViewLifeCircle.IsChildViewStateDirty(9) &&
      ((e = this.GetSprite(1)),
      (t = this.Holder.MarkItemEntity.GamePlay.InGravityLayer),
      e.SetAlpha(t ? 1 : 0.4));
  }
  OnIconPathChanged(e) {
    var t = this.GetSprite(1);
    this.LoadIcon(t, e);
  }
  LoadIcon(e, t) {
    e &&
      (StringUtils_1.StringUtils.IsEmpty(t)
        ? e.SetUIActive(!1)
        : this.SetSpriteByPath(t, e, !1, void 0, () => {
            e.IsValid() && e.SetUIActive(this.IsShowIcon);
          }));
  }
  GetInteractiveFlag() {
    return this.Holder?.IsCanShowView ?? !1;
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
  d1a(e) {
    var t;
    if (this.u1a === e)
      return this.m1a()
        ? void 0
        : ((t = CommonParamById_1.configCommonParamById.GetFloatConfig(
            "MapMarkSelectedAdditionScale",
          )),
          (t = this.u1a ? t : 0),
          (t = this.Holder.MarkScale + t),
          void this.SetScale(t));
    (this.u1a = e),
      (this.c1a = Time_1.Time.NowSeconds),
      this.jm(),
      (this.GOe = TimerSystem_1.TimerSystem.Forever(this.kOe, 50));
  }
  m1a() {
    return (
      0 < this.c1a && this.c1a + SCALE_TWEEN_DURATION >= Time_1.Time.NowSeconds
    );
  }
  jm() {
    TimerSystem_1.TimerSystem.Has(this.GOe) &&
      (TimerSystem_1.TimerSystem.Remove(this.GOe), (this.GOe = void 0));
  }
  Reset() {
    (this.IsShowIcon = !0),
      this.RefreshActorLabel(),
      this.ApplyRootAnchorOffset(),
      this.SetScale(this.Holder.MarkScale),
      this.ERi?.SetAlpha(1),
      (this.MarkComponentContext.MarkItemEntity = this.Holder.MarkItemEntity),
      (this.MarkComponentContext.MarkItem = this.Holder),
      (this.MarkComponentContext.MarkParentItem =
        this.RootItem.GetParentAsUIItem()),
      (this.MarkComponentContext.MarkRootItem = this.RootItem),
      this.Xd(),
      this.xW_(),
      this.OnReset();
  }
  OnReset() {}
  OnRecycle() {
    this.XCc(),
      this.LevelSequencePlayer.StopCurrentSequence(),
      MarkSpritePool_1.MarkSpritePool.UnRef(this.ComponentId),
      this.jm();
  }
  ApplyRootAnchorOffset() {
    this.RootItem.SetAnchorOffset(
      Vector2D_1.Vector2D.Create(
        this.Holder.InitUiPosition.X,
        this.Holder.InitUiPosition.Y,
      ).ToUeVector2D(!0),
    );
  }
  Xd() {
    this.SetScale(this.Holder.MarkScale);
    var e = new UE.Vector(this.Holder.ConfigScale);
    this.GetSprite(1).SetUIItemScale(e),
      this.GetSprite(4).SetUIItemScale(this.Holder.CornerScaleVector);
  }
  Ph_() {
    this.CreateComponentHandles();
    for (const e of this.MarkItemComponentHandleMap.values()) e.Init();
  }
  CreateComponentHandles() {
    (this.MarkComponentContext = {
      MarkItemEntity: this.Holder.MarkItemEntity,
      TopRightIconSprite: this.GetSprite(4),
      SetSpriteByPathAction: (e, t, i, s = void 0, r = void 0) => {
        this.SetSpriteByPath(e, t, i, s, r);
      },
      MarkComponentContainer: this.GetItem(0),
      MarkParentItem: this.RootItem.GetParentAsUIItem(),
      MarkRootItem: this.RootItem,
      MarkItem: this.Holder,
    }),
      this.MarkItemComponentHandleMap.set(
        1,
        this.CreateTopRightHandle(this.MarkComponentContext),
      ),
      this.MarkItemComponentHandleMap.set(
        2,
        this.CreateRangeHandle(this.MarkComponentContext),
      ),
      this.MarkItemComponentHandleMap.set(
        3,
        this.CreateNameHandle(this.MarkComponentContext),
      ),
      this.MarkItemComponentHandleMap.set(
        4,
        this.CreateOutOfBoundHandle(this.MarkComponentContext),
      ),
      this.MarkItemComponentHandleMap.set(
        5,
        this.CreateSelectHandle(this.MarkComponentContext),
      ),
      this.MarkItemComponentHandleMap.set(
        6,
        this.CreateTrackHandle(this.MarkComponentContext),
      ),
      this.MarkItemComponentHandleMap.set(
        7,
        this.CreateChildIconHandle(this.MarkComponentContext),
      ),
      this.MarkItemComponentHandleMap.set(
        8,
        this.CreateVerticalPointerHandle(this.MarkComponentContext),
      ),
      this.MarkItemComponentHandleMap.set(
        9,
        this.CreateGravityReverseIconHandle(this.MarkComponentContext),
      );
  }
  wh_() {
    for (const e of this.MarkItemComponentHandleMap.values()) e.Update();
  }
  Uh_() {
    for (const e of this.MarkItemComponentHandleMap.values()) e.ApplyModified();
  }
  XCc() {
    for (const e of this.MarkItemComponentHandleMap.values())
      e.SetVisible(!1), e.ApplyModified();
  }
  En_() {
    for (const e of this.MarkItemComponentHandleMap.values()) e.Dispose();
    this.MarkItemComponentHandleMap.clear();
  }
  CreateTopRightHandle(e) {
    return new MarkItemTopRightIconHandle_1.MarkItemTopRightIconHandle(e);
  }
  CreateRangeHandle(e) {
    return new MarkItemRangeHandle_1.MarkItemRangeHandle(e);
  }
  CreateNameHandle(e) {
    return new MarkItemNameHandle_1.MarkItemNameHandle(e);
  }
  CreateOutOfBoundHandle(e) {
    return new MarkItemOutOfBoundHandle_1.MarkItemOutOfBoundHandle(e);
  }
  CreateSelectHandle(e) {
    return new MarkItemSelectHandle_1.MarkItemSelectHandle(e);
  }
  CreateTrackHandle(e) {
    return new MarkItemTrackHandle_1.MarkItemTrackHandle(e);
  }
  CreateChildIconHandle(e) {
    return new MarkItemChildIconHandle_1.MarkItemChildIconHandle(e);
  }
  CreateVerticalPointerHandle(e) {
    return new MarkItemVerticlePointerHandle_1.MarkItemVerticalPointerHandle(e);
  }
  CreateGravityReverseIconHandle(e) {
    return new MarkItemGravityReverseIconHandle_1.MarkItemGravityReverseIconHandle(
      e,
    );
  }
}
exports.MarkItemView = MarkItemView;
//# sourceMappingURL=MarkItemView.js.map
