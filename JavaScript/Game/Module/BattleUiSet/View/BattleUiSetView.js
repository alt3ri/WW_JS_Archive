"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiSetView = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerDefine_1 = require("../../../Ui/TouchFinger/TouchFingerDefine");
const TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const EditMobileBattleView_1 = require("./EditMobileBattleView");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class BattleUiSetView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.oCt = void 0),
      (this.SelectedPanelItem = void 0),
      (this.rCt = new Set()),
      (this.nCt = 0),
      (this.wit = new UE.Vector()),
      (this.sCt = void 0),
      (this.aCt = void 0),
      (this.OnTouch = (i, e) => {
        var e = e.TouchType;
        const t = Number(i);
        switch (e) {
          case 0:
            this.hCt(!0, t);
            break;
          case 1:
            this.hCt(!1, t);
            break;
          case 2:
            this.lCt(t);
        }
      }),
      (this._Ct = () => {
        this.nCt = 2;
      }),
      (this.uCt = () => {
        this.nCt = 0;
      }),
      (this.cCt = () => {
        this.nCt = 1;
      }),
      (this.mCt = () => {
        this.nCt = 0;
      }),
      (this.dCt = () => {
        this.nCt = 3;
      }),
      (this.CCt = () => {
        this.nCt = 0;
      }),
      (this.gCt = () => {
        this.nCt = 4;
      }),
      (this.fCt = () => {
        this.nCt = 0;
      }),
      (this.pCt = (i) => {
        const e = i.GetLocalPointInPlane();
        let t = i.dragComponent.GetOwner().GetUIItem().GetDisplayName();
        let s = this.GetItem(11);
        if (t === s.GetDisplayName()) {
          if (this.sCt) {
            (t = i.dragComponent.GetOwner().GetActorScale3D()),
              (s = e.X - this.sCt.X),
              (i = e.Y - this.sCt.Y);
            if (s == 0 || i == 0) return;
            (this.aCt.X += s * t.X),
              (this.aCt.Y += i * t.Y),
              this.SetRelativeLocation(this.aCt);
          }
          this.sCt = e;
        }
      }),
      (this.vCt = () => {
        this.sCt = void 0;
      }),
      (this.MCt = () => {
        this.sCt = void 0;
      }),
      (this.SCt = (i) => {
        this.SelectedPanelItem && this.SelectedPanelItem.SetSelected(!1);
        const e = this.oCt.GetPanelItem(i);
        (this.SelectedPanelItem = e) && (e.SetSelected(!0), this.ECt(i)),
          this.yCt(e),
          this.rCt.add(e),
          e.ApplyTopIndex(),
          this.oCt.RefreshHierarchyIndex();
      }),
      (this.ICt = (i) => {
        this.TCt(i);
      }),
      (this.LCt = (i) => {
        const e =
          ModelManager_1.ModelManager.BattleUiSetModel.SelectedPanelItemData;
        this.SelectedPanelItem &&
          e &&
          e.CanEdit &&
          ((e.EditAlpha = i),
          (this.wit.X = i),
          (this.wit.Y = i),
          (this.wit.Z = i),
          this.SelectedPanelItem.GetRootItem().SetUIItemAlpha(i));
      }),
      (this.DCt = () => {
        const i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(105);
        i.FunctionMap.set(2, () => {
          this.oCt.ResetAllPanelItem();
          const i = ModelManager_1.ModelManager.BattleUiSetModel;
          this.RCt(i.SelectedPanelItemData), i.ResetSettings();
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            i,
          );
      }),
      (this.UCt = () => {
        for (const e of this.rCt) {
          var i = e.PanelItemData;
          if (!i || i.IsCheckOverlap) {
            var i = e.GetRootItem();
            if (this.oCt.IsAnyItemOverlap(i))
              return (
                (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  103,
                )).FunctionMap.set(2, () => {
                  this.oCt.SavePanelItem(),
                    ModelManager_1.ModelManager.BattleUiSetModel.SaveSettings(),
                    UiManager_1.UiManager.CloseView("BattleUiSetView");
                }),
                void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  i,
                )
              );
          }
        }
        this.oCt.SavePanelItem(),
          ModelManager_1.ModelManager.BattleUiSetModel.SaveSettings(),
          UiManager_1.UiManager.CloseView("BattleUiSetView");
      }),
      (this.ACt = () => {
        let i;
        this.PCt()
          ? ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              104,
            )).FunctionMap.set(1, () => {
              ModelManager_1.ModelManager.BattleUiSetModel.ReInitSettings(),
                UiManager_1.UiManager.CloseView("BattleUiSetView");
            }),
            i.FunctionMap.set(2, () => {
              ModelManager_1.ModelManager.BattleUiSetModel.SaveSettings(),
                UiManager_1.UiManager.CloseView("BattleUiSetView");
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              i,
            ))
          : (ModelManager_1.ModelManager.BattleUiSetModel.ReInitSettings(),
            UiManager_1.UiManager.CloseView("BattleUiSetView"));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISliderComponent],
      [2, UE.UISliderComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
      [9, UE.UIButtonComponent],
      [10, UE.UIDraggableComponent],
      [11, UE.UIItem],
      [12, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [7, this.DCt],
        [8, this.UCt],
        [9, this.ACt],
      ]);
  }
  OnBeforeDestroy() {
    (this.SelectedPanelItem = void 0),
      this.rCt.clear(),
      this.oCt?.Destroy(),
      (this.oCt = void 0);
  }
  OnAddEventListener() {
    this.GetSlider(2).OnValueChangeCb.Bind(this.ICt),
      this.GetSlider(1).OnValueChangeCb.Bind(this.LCt);
    var i = this.GetButton(3);
    var i =
      (i.OnPointDownCallBack.Bind(this._Ct),
      i.OnPointUpCallBack.Bind(this.uCt),
      this.GetButton(4));
    var i =
      (i.OnPointDownCallBack.Bind(this.cCt),
      i.OnPointUpCallBack.Bind(this.mCt),
      this.GetButton(6));
    var i =
      (i.OnPointDownCallBack.Bind(this.dCt),
      i.OnPointUpCallBack.Bind(this.CCt),
      this.GetButton(5));
    var i =
      (i.OnPointDownCallBack.Bind(this.gCt),
      i.OnPointUpCallBack.Bind(this.fCt),
      this.GetDraggable(10));
    i.OnPointerBeginDragCallBack.Bind(this.vCt),
      i.OnPointerDragCallBack.Bind(this.pCt),
      i.OnPointerEndDragCallBack.Bind(this.MCt),
      InputDistributeController_1.InputDistributeController.BindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
          InputMappingsDefine_1.touchIdMappings.Touch3,
          InputMappingsDefine_1.touchIdMappings.Touch4,
          InputMappingsDefine_1.touchIdMappings.Touch5,
          InputMappingsDefine_1.touchIdMappings.Touch6,
          InputMappingsDefine_1.touchIdMappings.Touch7,
          InputMappingsDefine_1.touchIdMappings.Touch8,
          InputMappingsDefine_1.touchIdMappings.Touch9,
          InputMappingsDefine_1.touchIdMappings.Touch10,
        ],
        this.OnTouch,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectedEditPanelItem,
        this.SCt,
      );
  }
  OnRemoveEventListener() {
    this.GetSlider(2).OnValueChangeCb.Unbind(),
      this.GetSlider(1).OnValueChangeCb.Unbind();
    var i = this.GetButton(3);
    var i =
      (i.OnPointDownCallBack.Unbind(),
      i.OnPointUpCallBack.Unbind(),
      this.GetButton(4));
    var i =
      (i.OnPointDownCallBack.Unbind(),
      i.OnPointUpCallBack.Unbind(),
      this.GetButton(6));
    var i =
      (i.OnPointDownCallBack.Unbind(),
      i.OnPointUpCallBack.Unbind(),
      this.GetButton(5));
    var i =
      (i.OnPointDownCallBack.Unbind(),
      i.OnPointUpCallBack.Unbind(),
      this.GetDraggable(10));
    i.OnPointerBeginDragCallBack.Unbind(),
      i.OnPointerDragCallBack.Unbind(),
      i.OnPointerEndDragCallBack.Unbind(),
      InputDistributeController_1.InputDistributeController.UnBindTouches(
        [
          InputMappingsDefine_1.touchIdMappings.Touch1,
          InputMappingsDefine_1.touchIdMappings.Touch2,
          InputMappingsDefine_1.touchIdMappings.Touch3,
          InputMappingsDefine_1.touchIdMappings.Touch4,
          InputMappingsDefine_1.touchIdMappings.Touch5,
          InputMappingsDefine_1.touchIdMappings.Touch6,
          InputMappingsDefine_1.touchIdMappings.Touch7,
          InputMappingsDefine_1.touchIdMappings.Touch8,
          InputMappingsDefine_1.touchIdMappings.Touch9,
          InputMappingsDefine_1.touchIdMappings.Touch10,
        ],
        this.OnTouch,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectedEditPanelItem,
        this.SCt,
      );
  }
  hCt(i, e) {
    e = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(e);
    e &&
      (i
        ? ModelManager_1.ModelManager.BattleUiSetModel.AddTouchFingerData(e)
        : ModelManager_1.ModelManager.BattleUiSetModel.RemoveTouchFingerData(
            e,
          ));
  }
  lCt(i) {
    let e;
    let t;
    let s = ModelManager_1.ModelManager.BattleUiSetModel;
    let n = s.SelectedPanelItemData;
    !n ||
      s.GetTouchFingerDataCount() < 2 ||
      ((t = s.GetTouchFingerData(TouchFingerDefine_1.EFingerIndex.One)),
      (e = s.GetTouchFingerData(TouchFingerDefine_1.EFingerIndex.Two)),
      (t = t.GetFingerIndex()),
      (e = e.GetFingerIndex()),
      (t = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseValue(
        t,
        e,
      )),
      (e = MathUtils_1.MathUtils.RangeClamp(
        t,
        s.MinTouchMoveDifference,
        s.MaxTouchMoveDifference,
        s.MinTouchMoveValue,
        s.MaxTouchMoveValue,
      )),
      (t = n.EditSize + e * s.ControlScaleRate),
      (e = (n = this.GetSlider(2)).MinValue),
      (s = n.MaxValue),
      (t = MathUtils_1.MathUtils.Clamp(t, e, s)),
      this.TCt(t),
      n.SetValue(t));
  }
  OnTick(i) {
    if ((super.OnTick(i), this.nCt !== 0)) {
      i = ModelManager_1.ModelManager.BattleUiSetModel.SelectedPanelItemData;
      if (i && i.CanEdit) {
        const e = this.oCt.GetPanelItem(i);
        if (e) {
          const t = e.GetRelativeLocation();
          switch (this.nCt) {
            case 1:
              t.Y++, e.SetRelativeLocation(t);
              break;
            case 2:
              t.Y--, e.SetRelativeLocation(t);
              break;
            case 3:
              t.X--, e.SetRelativeLocation(t);
              break;
            case 4:
              t.X++, e.SetRelativeLocation(t);
          }
        }
      }
    }
  }
  ClampBound(i) {
    var e = this.GetItem(11);
    const t = e.GetOwner().GetActorScale3D().X;
    var s = e.GetPivot();
    const n = s.Y;
    var s = s.X;
    var r = this.RootItem.GetRenderCanvas().GetOwner().GetUIItem();
    const h = r.Width / 2;
    var r = r.Height / 2;
    const a = e.Width * t;
    var e = e.Height * t;
    (i.X = MathUtils_1.MathUtils.Clamp(i.X, a * s - h, h - a * (1 - s))),
      (i.Y = MathUtils_1.MathUtils.Clamp(i.Y, e * n - r, r - e * (1 - n)));
  }
  SetRelativeLocation(i) {
    const e = this.GetItem(11);
    this.ClampBound(i), e.SetUIRelativeLocation(i);
  }
  yCt(i) {
    let e;
    i &&
      ((i = i.GetRootItem()),
      (e = this.GetItem(12))
        .GetOwner()
        .K2_AttachToActor(i.GetOwner(), void 0, 2, 0, 0, !1),
      e.SetAnchorAlign(4, 4),
      e.SetStretchLeft(0),
      e.SetStretchRight(0),
      e.SetStretchTop(0),
      e.SetStretchBottom(0),
      e.SetUIActive(!0));
  }
  TCt(i) {
    const e =
      ModelManager_1.ModelManager.BattleUiSetModel.SelectedPanelItemData;
    this.SelectedPanelItem &&
      e &&
      e.CanEdit &&
      ((e.EditSize = i),
      (this.wit.X = i),
      (this.wit.Y = i),
      (this.wit.Z = i),
      this.SelectedPanelItem.GetRootItem().SetUIItemScale(this.wit));
  }
  OnStart() {
    (this.aCt = this.GetItem(11).RelativeLocation),
      (this.oCt = new EditMobileBattleView_1.EditMobileBattleView(
        this.GetItem(0),
      ));
  }
  PCt() {
    for (const i of ModelManager_1.ModelManager.BattleUiSetModel.GetPanelItemDataMap().values())
      if (i.IsEdited()) return !0;
    return !1;
  }
  ECt(i) {
    let e, t;
    i &&
      ((e = this.GetSlider(2)),
      (t = this.GetSlider(1)),
      e.SetValue(i.EditSize),
      t.SetValue(i.EditAlpha));
  }
  RCt(i) {
    let e, t;
    i &&
      ((e = this.GetSlider(2)),
      (t = this.GetSlider(1)),
      e.SetValue(i.SourceSize),
      t.SetValue(i.SourceAlpha));
  }
}
exports.BattleUiSetView = BattleUiSetView;
// # sourceMappingURL=BattleUiSetView.js.map
