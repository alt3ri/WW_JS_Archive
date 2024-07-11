"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiSetView = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  TouchFingerDefine_1 = require("../../../Ui/TouchFinger/TouchFingerDefine"),
  TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  EditMobileBattleView_1 = require("./EditMobileBattleView"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class BattleUiSetView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Cgt = void 0),
      (this.SelectedPanelItem = void 0),
      (this.ggt = new Set()),
      (this.fgt = 0),
      (this.Xot = new UE.Vector()),
      (this.pgt = void 0),
      (this.vgt = void 0),
      (this.OnTouch = (i, e) => {
        var e = e.TouchType,
          t = Number(i);
        switch (e) {
          case 0:
            this.Mgt(!0, t);
            break;
          case 1:
            this.Mgt(!1, t);
            break;
          case 2:
            this.Egt(t);
        }
      }),
      (this.Sgt = () => {
        this.fgt = 2;
      }),
      (this.ygt = () => {
        this.fgt = 0;
      }),
      (this.Igt = () => {
        this.fgt = 1;
      }),
      (this.Tgt = () => {
        this.fgt = 0;
      }),
      (this.Lgt = () => {
        this.fgt = 3;
      }),
      (this.Dgt = () => {
        this.fgt = 0;
      }),
      (this.Rgt = () => {
        this.fgt = 4;
      }),
      (this.Ugt = () => {
        this.fgt = 0;
      }),
      (this.Agt = (i) => {
        var e = i.GetLocalPointInPlane(),
          t = i.dragComponent.GetOwner().GetUIItem().GetDisplayName(),
          s = this.GetItem(11);
        if (t === s.GetDisplayName()) {
          if (this.pgt) {
            (t = i.dragComponent.GetOwner().GetActorScale3D()),
              (s = e.X - this.pgt.X),
              (i = e.Y - this.pgt.Y);
            if (0 == s || 0 == i) return;
            (this.vgt.X += s * t.X),
              (this.vgt.Y += i * t.Y),
              this.SetRelativeLocation(this.vgt);
          }
          this.pgt = e;
        }
      }),
      (this.Pgt = () => {
        this.pgt = void 0;
      }),
      (this.xgt = () => {
        this.pgt = void 0;
      }),
      (this.wgt = (i) => {
        this.SelectedPanelItem && this.SelectedPanelItem.SetSelected(!1);
        var e = this.Cgt.GetPanelItem(i);
        (this.SelectedPanelItem = e) && (e.SetSelected(!0), this.Bgt(i)),
          this.bgt(e),
          this.ggt.add(e),
          e.ApplyTopIndex(),
          this.Cgt.RefreshHierarchyIndex();
      }),
      (this.qgt = (i) => {
        this.Ggt(i);
      }),
      (this.Ngt = (i) => {
        var e =
          ModelManager_1.ModelManager.BattleUiSetModel.SelectedPanelItemData;
        this.SelectedPanelItem &&
          e &&
          e.CanEdit &&
          ((e.EditAlpha = i),
          (this.Xot.X = i),
          (this.Xot.Y = i),
          (this.Xot.Z = i),
          this.SelectedPanelItem.GetRootItem().SetUIItemAlpha(i));
      }),
      (this.Ogt = () => {
        var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(105);
        i.FunctionMap.set(2, () => {
          this.Cgt.ResetAllPanelItem();
          var i = ModelManager_1.ModelManager.BattleUiSetModel;
          this.kgt(i.SelectedPanelItemData), i.ResetSettings();
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            i,
          );
      }),
      (this.Fgt = () => {
        for (const e of this.ggt) {
          var i = e.PanelItemData;
          if (!i || i.IsCheckOverlap) {
            var i = e.GetRootItem();
            if (this.Cgt.IsAnyItemOverlap(i))
              return (
                (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  103,
                )).FunctionMap.set(2, () => {
                  this.Cgt.SavePanelItem(),
                    ModelManager_1.ModelManager.BattleUiSetModel.SaveSettings(),
                    UiManager_1.UiManager.CloseView("BattleUiSetView");
                }),
                void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  i,
                )
              );
          }
        }
        this.Cgt.SavePanelItem(),
          ModelManager_1.ModelManager.BattleUiSetModel.SaveSettings(),
          UiManager_1.UiManager.CloseView("BattleUiSetView");
      }),
      (this.Vgt = () => {
        var i;
        this.Hgt()
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
        [7, this.Ogt],
        [8, this.Fgt],
        [9, this.Vgt],
      ]);
  }
  OnBeforeDestroy() {
    (this.SelectedPanelItem = void 0),
      this.ggt.clear(),
      this.Cgt?.Destroy(),
      (this.Cgt = void 0);
  }
  OnAddEventListener() {
    this.GetSlider(2).OnValueChangeCb.Bind(this.qgt),
      this.GetSlider(1).OnValueChangeCb.Bind(this.Ngt);
    var i = this.GetButton(3),
      i =
        (i.OnPointDownCallBack.Bind(this.Sgt),
        i.OnPointUpCallBack.Bind(this.ygt),
        this.GetButton(4)),
      i =
        (i.OnPointDownCallBack.Bind(this.Igt),
        i.OnPointUpCallBack.Bind(this.Tgt),
        this.GetButton(6)),
      i =
        (i.OnPointDownCallBack.Bind(this.Lgt),
        i.OnPointUpCallBack.Bind(this.Dgt),
        this.GetButton(5)),
      i =
        (i.OnPointDownCallBack.Bind(this.Rgt),
        i.OnPointUpCallBack.Bind(this.Ugt),
        this.GetDraggable(10));
    i.OnPointerBeginDragCallBack.Bind(this.Pgt),
      i.OnPointerDragCallBack.Bind(this.Agt),
      i.OnPointerEndDragCallBack.Bind(this.xgt),
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
        this.wgt,
      );
  }
  OnRemoveEventListener() {
    this.GetSlider(2).OnValueChangeCb.Unbind(),
      this.GetSlider(1).OnValueChangeCb.Unbind();
    var i = this.GetButton(3),
      i =
        (i.OnPointDownCallBack.Unbind(),
        i.OnPointUpCallBack.Unbind(),
        this.GetButton(4)),
      i =
        (i.OnPointDownCallBack.Unbind(),
        i.OnPointUpCallBack.Unbind(),
        this.GetButton(6)),
      i =
        (i.OnPointDownCallBack.Unbind(),
        i.OnPointUpCallBack.Unbind(),
        this.GetButton(5)),
      i =
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
        this.wgt,
      );
  }
  Mgt(i, e) {
    e = TouchFingerManager_1.TouchFingerManager.GetTouchFingerData(e);
    e &&
      (i
        ? ModelManager_1.ModelManager.BattleUiSetModel.AddTouchFingerData(e)
        : ModelManager_1.ModelManager.BattleUiSetModel.RemoveTouchFingerData(
            e,
          ));
  }
  Egt(i) {
    var e,
      t,
      s = ModelManager_1.ModelManager.BattleUiSetModel,
      n = s.SelectedPanelItemData;
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
      this.Ggt(t),
      n.SetValue(t));
  }
  OnTick(i) {
    if ((super.OnTick(i), 0 !== this.fgt)) {
      i = ModelManager_1.ModelManager.BattleUiSetModel.SelectedPanelItemData;
      if (i && i.CanEdit) {
        var e = this.Cgt.GetPanelItem(i);
        if (e) {
          var t = e.GetRelativeLocation();
          switch (this.fgt) {
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
    var e = this.GetItem(11),
      t = e.GetOwner().GetActorScale3D().X,
      s = e.GetPivot(),
      n = s.Y,
      s = s.X,
      r = this.RootItem.GetRenderCanvas().GetOwner().GetUIItem(),
      h = r.Width / 2,
      r = r.Height / 2,
      a = e.Width * t,
      e = e.Height * t;
    (i.X = MathUtils_1.MathUtils.Clamp(i.X, a * s - h, h - a * (1 - s))),
      (i.Y = MathUtils_1.MathUtils.Clamp(i.Y, e * n - r, r - e * (1 - n)));
  }
  SetRelativeLocation(i) {
    var e = this.GetItem(11);
    this.ClampBound(i), e.SetUIRelativeLocation(i);
  }
  bgt(i) {
    var e;
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
  Ggt(i) {
    var e = ModelManager_1.ModelManager.BattleUiSetModel.SelectedPanelItemData;
    this.SelectedPanelItem &&
      e &&
      e.CanEdit &&
      ((e.EditSize = i),
      (this.Xot.X = i),
      (this.Xot.Y = i),
      (this.Xot.Z = i),
      this.SelectedPanelItem.GetRootItem().SetUIItemScale(this.Xot));
  }
  OnStart() {
    (this.vgt = this.GetItem(11).RelativeLocation),
      (this.Cgt = new EditMobileBattleView_1.EditMobileBattleView(
        this.GetItem(0),
      ));
  }
  Hgt() {
    for (const i of ModelManager_1.ModelManager.BattleUiSetModel.GetPanelItemDataMap().values())
      if (i.IsEdited()) return !0;
    return !1;
  }
  Bgt(i) {
    var e, t;
    i &&
      ((e = this.GetSlider(2)),
      (t = this.GetSlider(1)),
      e.SetValue(i.EditSize),
      t.SetValue(i.EditAlpha));
  }
  kgt(i) {
    var e, t;
    i &&
      ((e = this.GetSlider(2)),
      (t = this.GetSlider(1)),
      e.SetValue(i.SourceSize),
      t.SetValue(i.SourceAlpha));
  }
}
exports.BattleUiSetView = BattleUiSetView;
//# sourceMappingURL=BattleUiSetView.js.map
