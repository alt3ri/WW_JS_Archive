"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueMapModule = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../../../Core/Common/Info"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Macro_1 = require("../../../../../Core/Preprocessor/Macro"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  BuildingMapMoveComponent_1 = require("../../../Activity/ActivityContent/MoonChasing/Main/Build/BuildingMapMoveComponent"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LongPressButton_1 = require("../../../Util/LongPressButton"),
  MapRogueGrid_1 = require("./Grid/MapRogueGrid"),
  MapRogueGridEvent_1 = require("./Grid/MapRogueGridEvent"),
  MapRogueGridFog_1 = require("./Grid/MapRogueGridFog"),
  MapRogueGridPath_1 = require("./Grid/MapRogueGridPath"),
  MapRoguePanelRole_1 = require("./MapRoguePanelRole"),
  X_BIAS = 110,
  Y_BIAS = 64,
  CENTER_Y_BIAS = 16,
  RANGE_X = 110,
  RANGE_Y = 62,
  [BG_MIN_SCALE, BG_MAX_SCALE] = [1, 1.3],
  THOUSANDTH_RATIO = 1e3;
class MapRogueMapModule extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super(),
      (this.GameInfo = i),
      (this.LevelSequencePlayer = void 0),
      (this.MoveComponent = void 0),
      (this.RolePanel = void 0),
      (this.GridItemMap = new Map()),
      (this.GridEventItemMap = new Map()),
      (this.GridPathItemMap = new Map()),
      (this.GridFogItemMap = new Map()),
      (this.CachedPathItemList = []),
      (this.PosTempVector = Vector2D_1.Vector2D.Create()),
      (this.MapTempPos = Vector2D_1.Vector2D.Create()),
      (this.MapTempScaleVector = Vector_1.Vector.Create()),
      (this.dp1 =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "MapRogueClickOffsetTolerance",
        ) ?? 10),
      (this.AI1 =
        ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig()
          .FocusTime / THOUSANDTH_RATIO),
      (this.lqt = () => {
        this.aS1();
      }),
      (this.mp1 = CommonParamById_1.configCommonParamById.GetIntConfig(
        "MapRogueDoubleClickInterval",
      )),
      (this.fp1 = void 0),
      (this.gp1 = -1),
      (this.Cp1 = !1),
      (this.pp1 = !1),
      (this.vp1 = !1),
      (this.XTt = () => {}),
      (this.bMe = (i, t) => {
        this.yp1 &&
          this.GameInfo.IsStageAvailable &&
          (0 === t
            ? this.Sp1
              ? (this.pp1 && this.GameInfo.OnMove(this.gp1), this.Mp1())
              : (this.Mp1(),
                (this.gp1 = this.GameInfo.CurHoverIndex),
                (this.Cp1 = !1),
                (this.fp1 = TimerSystem_1.TimerSystem.Delay(() => {
                  this.Sp1 &&
                    (this.Cp1 && this.SetMapGridBgState(this.gp1, !0, !0),
                    (this.fp1 = void 0),
                    (this.gp1 = -1));
                }, this.mp1)))
            : (this.Cp1 = !0));
      }),
      (this.g2c = (i, t) => !this.Sp1 && !this.Ep1() && !i && this.vp1),
      (this.C2c = (i, t) => {
        this.MapTempPos.FromUeVector2D(
          this.MoveComponent.GetMapItem().GetAnchorOffset(),
        ),
          this.MoveComponent.EmitPointerDown();
      }),
      (this.p2c = (i, t) => {
        this.GameInfo.OnCheck(t.GridIndex);
      }),
      (this.v2c = (i) => {
        this.Sp1 && this.Mp1(),
          this.MoveComponent.IsInDrag ||
            this.GameInfo.HoverOnTarget(i.GridIndex);
      }),
      (this.y2c = (i) => {
        this.GameInfo.UnHoverOnTarget(i.GridIndex);
      }),
      (this.ym1 = () => {
        this.Sp1 && this.Mp1(), this.GameInfo.BlankPlaneEnter();
      }),
      (this.Sm1 = () => {
        this.MoveComponent.EmitPointerDown();
      }),
      (this.Vy1 = () => {
        this.GetButton(16).RootUIComp.SetUIActive(!0),
          this.GetItem(12).SetUIActive(!1);
      }),
      (this.jy1 = () => {
        this.GetButton(16).RootUIComp.SetUIActive(!1),
          this.SetInteractState(
            this.pp1,
            this.vp1,
            this.GameInfo.CurHoverIndex,
          );
      }),
      (this.ScaleUp = void 0),
      (this.ScaleDown = void 0),
      (this.S2c = () => {
        this.MoveComponent.LongPressScroll(-this.MoveComponent.ScaleStep);
      }),
      (this.M2c = () => {
        this.MoveComponent.LongPressScroll(this.MoveComponent.ScaleStep);
      }),
      (this.CHs = (i) => {
        this.MoveComponent.SliderScroll(i);
      }),
      (this.Ip1 = (i) => {
        var t = this.GetSlider(9),
          i =
            (3 !== i && t.SetValue(this.MoveComponent.MapScale, !1),
            this.MoveComponent.MapScaleSafeArea.Min),
          t = this.MoveComponent.MapScaleSafeArea.Max,
          t = (this.MoveComponent.MapScale - i) / (t - i),
          i = MathUtils_1.MathUtils.Lerp(BG_MIN_SCALE, BG_MAX_SCALE, t),
          t =
            (this.MapTempScaleVector.Set(i, i, i),
            this.GetTexture(11).SetUIItemScale(
              this.MapTempScaleVector.ToUeVectorOld(),
            ),
            1 / this.MoveComponent.MapScale);
        this.MapTempScaleVector.Set(t, t, t),
          this.GetItem(12).SetUIItemScale(
            this.MapTempScaleVector.ToUeVectorOld(),
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIDraggableComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
      [9, UE.UISliderComponent],
      [10, UE.UIButtonComponent],
      [11, UE.UITexture],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[5, this.XTt]]);
  }
  async OnBeforeStartAsync() {
    var e = [];
    for (let t = 0; t < this.GameInfo.MapHeight; t++)
      for (let i = this.GameInfo.MapWidth - 1; 0 <= i; i--) {
        var s = this.GameInfo.GetGridIndex(i, t),
          s = this.GameInfo.MapGrids[s];
        e.push(this.CreateMapGridBg(s));
      }
    e.push(this.CreateMapGridPath(0, 34, !1, !0)),
      e.push(this.OKs()),
      this.GetButton(5).RootUIComp.SetUIActive(!1),
      await Promise.all(e),
      this.ResetPath(0);
    var i = this.GetButton(10);
    i.OnPointEnterCallBack.Bind(this.ym1),
      i.OnPointDownCallBack.Bind(this.Sm1),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      this.S7s(),
      this.E2c();
  }
  S7s() {
    var i,
      t = ConfigManager_1.ConfigManager.MapRogueConfig.GetInsGridConfigByInstId(
        this.GameInfo.InstanceId,
      );
    t &&
      ((i = this.GetDraggable(0)).RootUIComp.SetHeight(t.MapHeight),
      i.RootUIComp.SetWidth(t.MapWidth),
      (this.MoveComponent =
        new BuildingMapMoveComponent_1.BuildingMapMoveComponent(
          this.GetDraggable(0),
          !0,
          !0,
          !0,
        )),
      this.aS1(),
      (this.MoveComponent.PointerBeginDragExtraCallBack = this.Vy1),
      (this.MoveComponent.PointerUpExtraCallBack = this.jy1),
      this.MoveComponent.SetScaleSafeArea(
        t.MapScaleMin / THOUSANDTH_RATIO,
        t.MapScaleMax / THOUSANDTH_RATIO,
      ),
      this.SetTextureByPath(t.MapBackground, this.GetTexture(11)),
      this.MoveComponent.SetChangeScaleCallback(this.Ip1),
      this.MoveComponent.SetScale(t.MapInitScale / THOUSANDTH_RATIO, 4));
  }
  aS1() {
    Info_1.Info.IsInGamepad()
      ? (this.MoveComponent.MoveSpeed =
          CommonParamById_1.configCommonParamById.GetFloatConfig(
            "MapRogueMapMoveSpeedGamepad",
          ))
      : Info_1.Info.IsInKeyBoard() &&
        (this.MoveComponent.MoveSpeed =
          CommonParamById_1.configCommonParamById.GetFloatConfig(
            "MapRogueMapMoveSpeedKeyboard",
          ));
  }
  MapShow() {
    this.ResetAllPath(),
      this.MoveComponent.BindTouch(),
      this.MoveComponent.AddGamepadEvent(),
      this.MoveComponent.AddMoveListener(this.GameInfo.CanInteract),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.lqt,
      ),
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.Ui左键点击,
        this.bMe,
      );
  }
  MapHide() {
    this.MoveComponent.UnbindTouch(),
      this.MoveComponent.RemoveGamepadEvent(),
      this.MoveComponent.RemoveMoveListener(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerChange,
        this.lqt,
      ),
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.Ui左键点击,
        this.bMe,
      );
  }
  OnBeforeDestroy() {
    this.MoveComponent.Destroy(), this.Mp1();
  }
  async PlaySequence(i) {
    await this.LevelSequencePlayer?.PlaySequenceAsync(
      i,
      new CustomPromise_1.CustomPromise(),
    );
  }
  OnTick(i) {
    this.RolePanel?.OnTick(i), this.MoveComponent.TickMove();
  }
  Ep1() {
    var i = Vector2D_1.Vector2D.Create(
      this.MoveComponent.GetMapItem().GetAnchorOffset(),
    );
    return !this.MapTempPos.Equals(i, this.dp1);
  }
  I2c(i, t) {
    var [i, e] = this.$r1(i);
    this.PosTempVector.Set(i, e),
      t.SetAnchorOffset(this.PosTempVector.ToUeVector2D());
  }
  $r1(i) {
    var i = this.GameInfo.GetGridPos(i),
      t = i.Y,
      i = i.X,
      e = this.GetItem(1).RelativeLocation,
      t = t - this.GameInfo.Center.Y,
      i = i - this.GameInfo.Center.X;
    return [e.X + X_BIAS * (i + t), e.Y - Y_BIAS * (t - i)];
  }
  FocusOnGrid(i, t = !0, e) {
    i = this.GridItemMap.get(i);
    i &&
      ((t = t ? this.AI1 : 0),
      this.MoveComponent.MoveToTarget(i.GetRootItem(), 12, t, e));
  }
  SetInteractAvailable(i) {
    this.GetButton(5).RootUIComp.SetUIActive(!i),
      this.MoveComponent.SwitchOnMove(i);
  }
  SetInteractState(i, t, e) {
    (this.pp1 = i),
      (this.vp1 = t),
      void 0 !== e && this.I2c(e, this.GetItem(12)),
      this.GetItem(13).SetUIActive(i),
      this.GetItem(14).SetUIActive(t),
      this.GetItem(12).SetUIActive((i || t) && !this.MoveComponent.IsInDrag);
  }
  async CreateMapGridBg(i) {
    var t, e;
    i.IsValid() &&
      ((t = []),
      (e = new MapRogueGrid_1.MapRogueGrid()),
      t.push(
        e.CreateThenShowByResourceIdAsync("UiItem_MapBlockBg", this.GetItem(1)),
      ),
      i.HasVision || t.push(this.CreateMapGridFog(i.GridIndex)),
      await Promise.all(t),
      e.Refresh(i),
      (e.OnCanExecuteChangeFunc = this.g2c),
      (e.OnExtendToggleStateChanged = this.p2c),
      (e.OnExtendTogglePointerDown = this.C2c),
      (e.OnHoverFunc = this.v2c),
      (e.OnUnHoverFunc = this.y2c),
      this.I2c(i.GridIndex, e.GetRootItem()),
      this.GridItemMap.set(i.GridIndex, e),
      i.HasEvent()) &&
      (await this.CreateMapGridEvent(i));
  }
  async CreateMapGridFog(i) {
    var t = new MapRogueGridFog_1.MapRogueGridFog();
    this.GridFogItemMap.set(i, t),
      await t.CreateThenShowByResourceIdAsync(
        "UiItem_MapBlockFog",
        this.GetItem(2),
      ),
      this.I2c(i, t.GetRootItem());
  }
  async RefreshMapGridFogVision(i, t) {
    var e = this.GridFogItemMap.get(i);
    e ? e.SetVision(t, !0) : t || (await this.CreateMapGridFog(i));
  }
  RefreshMapGrid(t) {
    this.GridItemMap.get(t.GridIndex).Refresh(t);
    var i = new UiAsyncTask_1.UiAsyncTask(
      "MapRogueMapModule.RefreshMapGridTask",
      async () => {
        var i = [];
        i.push(this.RefreshMapGridFogVision(t.GridIndex, t.HasVision)),
          i.push(this.RefreshMapGridEventVision(t, t.HasVision)),
          await Promise.all(i);
      },
    );
    this.RunAsyncTask(i);
  }
  SetMapGridBgVision(e, s) {
    var i = new UiAsyncTask_1.UiAsyncTask(
      "MapRogueMapModule.SetMapGridBgVision",
      async () => {
        var i = this.GameInfo.MapGrids[e],
          t = (this.GridItemMap.get(i.GridIndex).SetVision(s), []);
        t.push(this.RefreshMapGridFogVision(e, s)),
          t.push(this.RefreshMapGridEventVision(i, s)),
          await Promise.all(t);
      },
    );
    this.RunAsyncTask(i);
  }
  SetMapGridBgState(i, t, e) {
    this.GridItemMap.get(i)?.SetGridToggleState(t, e);
  }
  SetMapGridMoveEnable(i, t) {
    this.GridItemMap.get(i)?.SetToggleMoveEnable(t);
  }
  SetPerspectiveMode(i, t) {
    this.MoveComponent.IsInDrag ||
      this.GridItemMap.get(i)?.SetPerspectiveMode(t);
  }
  GetGridRangeInfo(i) {
    var t,
      i = this.GridItemMap.get(i);
    if (i)
      return (
        (i = i.GetOriginalItem().GetLGUISpaceAbsolutePosition()),
        (t =
          (ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig()
            .GridValidRangeTolerance /
            THOUSANDTH_RATIO) *
          this.MoveComponent.MapScale),
        {
          CenterX: i.X,
          CenterY: i.Y + CENTER_Y_BIAS * this.MoveComponent.MapScale,
          RadiusX: RANGE_X * this.MoveComponent.MapScale + t,
          RadiusY: RANGE_Y * this.MoveComponent.MapScale + t,
        }
      );
  }
  get yp1() {
    return Info_1.Info.IsInKeyBoard();
  }
  get Sp1() {
    return 0 <= this.gp1;
  }
  Mp1() {
    this.fp1 &&
      (TimerSystem_1.TimerSystem.Remove(this.fp1), (this.fp1 = void 0)),
      (this.gp1 = -1);
  }
  async CreateMapGridEvent(i, t = i.HasVision) {
    var e = new MapRogueGridEvent_1.MapRogueGridEvent(),
      s =
        (this.GridEventItemMap.set(i.GridIndex, e),
        this.GridItemMap.get(i.GridIndex).GetPanelEvent());
    await e.CreateByResourceIdAsync("UiItem_MapBlockEvent", s),
      e.Refresh(i),
      e.SetVision(t);
  }
  async RefreshMapGridEventVision(i, t) {
    var e = this.GridEventItemMap.get(i.GridIndex);
    e
      ? (e.Refresh(i), e.SetVision(i.HasEvent(t)))
      : i.HasEvent(t) && (await this.CreateMapGridEvent(i, t));
  }
  CreateAllMapGridPath(i, t) {
    var e = new UiAsyncTask_1.UiAsyncTask(
      "MapRogueMapModule.CreateAllMapGridPath",
      async () => {
        await this.CreateAllMapGridPathAsync(i, t);
      },
    );
    this.RunAsyncTask(e);
  }
  async CreateAllMapGridPathAsync(t, e) {
    var s = [],
      i = e[e.length - 1];
    this.ResetPath(i);
    for (let i = 1; i < t.length - 1; i++) {
      var h = t[i];
      e.includes(h) || this.ResetPath(h);
    }
    var r = this.CachedPathItemList.length;
    for (let i = 1; i < e.length - 1; i++) {
      var a = e[i],
        o = e[i - 1],
        n = e[i + 1],
        _ = r < i + 1,
        M = this.GridPathItemMap.get(a);
      M
        ? M.SetShape(this.GetShapeType(a, o, n), i === e.length - 2)
        : s.push(
            this.CreateMapGridPath(
              a,
              this.GetShapeType(a, o, n),
              i === e.length - 2,
              _,
            ),
          );
    }
    await Promise.all(s);
  }
  async CreateMapGridPath(i, t, e, s) {
    let h = void 0;
    s
      ? ((h = new MapRogueGridPath_1.MapRogueGridPath()),
        this.GridPathItemMap.set(i, h),
        await h.CreateByResourceIdAsync("UiItem_MapBlockSign", this.GetItem(3)))
      : ((h = this.CachedPathItemList.pop()), this.GridPathItemMap.set(i, h)),
      this.I2c(i, h.GetRootItem()),
      h.SetShape(t, e),
      h.SetUiActive(!0);
  }
  GetShapeType(i, t, e) {
    var s = (i, t) => (i < t ? (i + 1 === t ? 2 : 4) : i - 1 === t ? 1 : 3);
    return 10 * s(i, t) + s(i, e);
  }
  ResetPath(i) {
    var t = this.GridPathItemMap.get(i);
    t &&
      (t.SetUiActive(!1),
      this.CachedPathItemList.push(t),
      this.GridPathItemMap.delete(i));
  }
  ResetAllPath() {
    for (const i of this.GridPathItemMap.values())
      i.SetUiActive(!1), this.CachedPathItemList.push(i);
    this.GridPathItemMap.clear();
  }
  async OKs() {
    (this.RolePanel = new MapRoguePanelRole_1.MapRoguePanelRole(this.GameInfo)),
      await this.RolePanel.CreateThenShowByActorAsync(
        this.GetItem(4).GetOwner(),
      );
  }
  SetRolePos(i) {
    var t = this.GetItem(4);
    this.I2c(i, t);
  }
  SetRolePosByGrid(i, t, e) {
    var s = this.GetItem(4),
      [t, h] = this.$r1(t),
      [e, r] = this.$r1(e),
      t = MathUtils_1.MathUtils.Lerp(t, e, i),
      e = MathUtils_1.MathUtils.Lerp(h, r, i);
    this.PosTempVector.Set(t, e),
      s.SetAnchorOffset(this.PosTempVector.ToUeVector2D());
  }
  E2c() {
    var i = this.GetSlider(9);
    i.SetMinValue(this.MoveComponent.MapScaleSafeArea.Min, !1, !1),
      i.SetMaxValue(this.MoveComponent.MapScaleSafeArea.Max, !1, !1),
      i.SetValue(this.MoveComponent.MapScale, !0),
      i.OnValueChangeCb.Bind(this.CHs),
      (this.ScaleUp = new LongPressButton_1.LongPressButton(
        this.GetButton(7),
        this.M2c,
      )),
      (this.ScaleDown = new LongPressButton_1.LongPressButton(
        this.GetButton(8),
        this.S2c,
      ));
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (0 !== i.length) {
      var t = i[0];
      if ("MapRougeGrid" === t && 2 === i.length) {
        t = Number(i[1]);
        if (t && !isNaN(t) && 0 < t) return this.$T1(t);
      }
    }
  }
  $T1(i) {
    var i = this.GridItemMap.get(i);
    return (i = i && i.GetRootItem()) ? [i, i] : void 0;
  }
}
exports.MapRogueMapModule = MapRogueMapModule;
//# sourceMappingURL=MapRogueMapModule.js.map
