"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionAssembleStaticItem = exports.VisionAssembleView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  ButtonItem_1 = require("../../../../Common/Button/ButtonItem"),
  CommonDropDown_1 = require("../../../../Common/DropDown/CommonDropDown"),
  FilterEntrance_1 = require("../../../../Common/FilterSort/Filter/View/FilterEntrance"),
  CommonInputViewController_1 = require("../../../../Common/InputView/Controller/CommonInputViewController"),
  ConfirmBoxDefine_1 = require("../../../../ConfirmBox/ConfirmBoxDefine"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew"),
  LoopScrollView_1 = require("../../../../Util/ScrollView/LoopScrollView"),
  VisionEquipmentDropDownTitleItem_1 = require("../VisionEquipmentDropDownTitleItem"),
  VisionAssembleAttrScrollItem_1 = require("./VisionAssembleAttrScrollItem"),
  VisionAssembleDropDownItem_1 = require("./VisionAssembleDropDownItem"),
  VisionAssembleItem_1 = require("./VisionAssembleItem"),
  VisionAssembleScrollItem_1 = require("./VisionAssembleScrollItem"),
  VisionAssembleSuitItem_1 = require("./VisionAssembleSuitItem"),
  EMPTYSELECTINDEX = 999,
  STATICINDEX = -1;
class VisionAssembleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Z6i = 36),
      (this.ll_ = new Array()),
      (this.ko_ = 0),
      (this.lqe = void 0),
      (this._l_ = void 0),
      (this.cl_ = void 0),
      (this.ul_ = void 0),
      (this.vpt = void 0),
      (this.i7i = new Array()),
      (this.Z9i = 0),
      (this.h8e = void 0),
      (this.nvt = void 0),
      (this.dl_ = void 0),
      (this.p9t = void 0),
      (this.Yja = EMPTYSELECTINDEX),
      (this.ml_ = !1),
      (this.f4_ = void 0),
      (this.g4_ = void 0),
      (this.dY_ = void 0),
      (this.WCo = () => {
        this.Cl_(),
          this.gl_(),
          this.pl_(),
          this.fl_(),
          this.vl_(),
          this.yl_(),
          this.bqe(!0);
      }),
      (this.CU_ = () => {
        this.a7i(), this.mY_(), this.fY_();
        var t =
          ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionEquipGroupList()
            .length;
        (this.Yja = t - 1),
          this.bqe(),
          this.Ml_(),
          this.El_(),
          this.pl_(),
          this.fl_(),
          this.vl_(),
          this.Ul_();
      }),
      (this.pU_ = () => {
        var t =
          ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionEquipGroupList()
            .length;
        (this.Yja = 0 < t ? 0 : STATICINDEX), this.vU_();
      }),
      (this.yU_ = () => {
        var t =
          ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionEquipGroupList()
            .length;
        (this.Yja = 0 < t ? 0 : STATICINDEX),
          this.vU_(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnVisionAssembleNavigationRefresh,
            !1,
          );
      }),
      (this.SU_ = () => {
        this.vl_(), this.Cl_(), this.bqe(!0);
      }),
      (this.g8e = (t) => {
        return Number(t);
      }),
      (this.C8e = (t) => {
        (this.Z9i = t), this.a7i();
      }),
      (this.m8e = (t) => {
        return new VisionAssembleDropDownItem_1.VisionAssembleDropDownItem(t);
      }),
      (this.c8e = (t) =>
        new VisionEquipmentDropDownTitleItem_1.VisionEquipmentDropDownTitleItem(
          t,
        )),
      (this.Il_ = () => {
        this.ml_ = !this.ml_;
        var t = !!this.ml_;
        this.Ml_(t),
          this.fl_(),
          this.gl_(),
          ModelManager_1.ModelManager.UiNavigationModel.TrySetCursorActive(!1),
          this.ml_
            ? (this.Cl_(),
              this.PlaySequence(
                "Start_B",
                () => {
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.OnVisionAssembleNavigationRefresh,
                    !0,
                  );
                },
                !0,
              ))
            : (this.Cl_(),
              this.PlaySequence(
                "Close_B",
                () => {
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.OnVisionAssembleNavigationRefresh,
                    !0,
                  );
                },
                !0,
              )),
          this.gY_();
      }),
      (this.Tl_ = () => {
        this.Yja === STATICINDEX
          ? (this.Yja = EMPTYSELECTINDEX)
          : (this.Yja = STATICINDEX),
          this.bl_(),
          this.fl_(),
          this.pl_(),
          this.Ml_(),
          this.Ul_();
      }),
      (this.sOt = () => {
        var t = this.RNr();
        2 === t
          ? (this.Ll_(), this.fY_())
          : 1 === t
            ? this.Al_()
            : 3 === t &&
              ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                "VisionAssembleHasUseTips",
              );
      }),
      (this.xl_ = () => {
        var t = StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "VisionAssembleCurrentIndex",
            ),
            (this.Yja + 1).toString(),
          ),
          e =
            ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionEquipGroupDataByIndex(
              this.Yja,
            )?.GetName();
        CommonInputViewController_1.CommonInputViewController.OpenSetVisionEquipGroupName(
          t,
          async (t) =>
            ControllerHolder_1.ControllerHolder.VisionEquipGroupController.RequestChangeVisionGroupName(
              this.Yja,
              t,
            ),
          e,
        );
      }),
      (this.Rl_ = () => {
        var t;
        ModelManager_1.ModelManager.VisionEquipGroupModel.GetLocalTipsState()
          ? ControllerHolder_1.ControllerHolder.VisionEquipGroupController.RequestPutVisionGroupToTop(
              this.Yja,
            )
          : (((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(242)).HasToggle =
              !0),
            (t.ToggleText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "VisionAssembleTopNeverTips",
            )),
            t.SetToggleFunction(this.RMt),
            t.FunctionMap.set(2, () => {
              ControllerHolder_1.ControllerHolder.VisionEquipGroupController.RequestPutVisionGroupToTop(
                this.Yja,
              );
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              t,
            ));
      }),
      (this.RMt = (t) => {
        ModelManager_1.ModelManager.VisionEquipGroupModel.SaveLocalTopTipState(
          t,
        );
      }),
      (this.qHe = () => {
        var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(243);
        t.FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.VisionEquipGroupController.RequestDeleteVisionEquipGroup(
            this.Yja,
          );
        }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            t,
          );
      }),
      (this.Pl_ = () => {
        return new VisionAssembleScrollItem_1.VisionAssembleScrollItem();
      }),
      (this.sGe = () => {
        return new VisionAssembleAttrScrollItem_1.VisionAssembleAttrScrollItem();
      }),
      (this.Qvt = (t, e, i) => {
        this.ll_ = t;
        t = this.Bl_();
        0 === t.length
          ? (this.Yja = STATICINDEX)
          : (this.Yja = t[0].GetIndex()),
          this.bl_(!1),
          this.mP_(),
          this.fY_();
      }),
      (this.AMo = () => {
        this.CloseMe();
      }),
      (this.Qq_ = () => !0),
      (this.wl_ = (t) => {
        t = t.GetIndex();
        t === this.Yja
          ? ((this.Yja = EMPTYSELECTINDEX), (this.ml_ = !1))
          : (this.Yja = t),
          this.bl_(),
          this.Ul_(),
          this.Cl_();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [9, UE.UIItem],
      [8, UE.UIItem],
      [10, UE.UIScrollViewWithScrollbarComponent],
      [11, UE.UIButtonComponent],
      [12, UE.UIButtonComponent],
      [13, UE.UIExtendToggle],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [13, this.Il_],
        [11, this.Rl_],
        [12, this.qHe],
      ]);
  }
  async OnCreateAsync() {
    await ControllerHolder_1.ControllerHolder.VisionEquipGroupController.RequestVisionEquipGroupInfo();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnVisionGroupDataAdd,
      this.CU_,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnVisionGroupDataDelete,
        this.pU_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnVisionGroupDataToTop,
        this.yU_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnVisionGroupDataChangeName,
        this.SU_,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PhantomEquip,
        this.WCo,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnVisionGroupDataAdd,
      this.CU_,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnVisionGroupDataDelete,
        this.pU_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnVisionGroupDataToTop,
        this.yU_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnVisionGroupDataChangeName,
        this.SU_,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PhantomEquip,
        this.WCo,
      );
  }
  async OnBeforeStartAsync() {
    (this.ko_ = this.OpenParam),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.AMo),
      (this._l_ = new VisionAssembleStaticItem()),
      await this._l_.CreateByActorAsync(this.GetItem(1).GetOwner()),
      this._l_.BindClickCallBack(this.Tl_),
      this._l_.SetActive(!0),
      (this.cl_ = new VisionAssembleTopItem()),
      await this.cl_.CreateByActorAsync(this.GetItem(9).GetOwner()),
      this.cl_.BindClickReNameCallBack(this.xl_),
      (this.ul_ = new VisionAssembleTopItem()),
      await this.ul_.CreateByActorAsync(this.GetItem(8).GetOwner()),
      this.ul_.SetReBtnActive(!1),
      (this.nvt = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(10),
        this.sGe,
      )),
      (this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(15))),
      this.p9t.SetFunction(this.sOt),
      (this.dl_ = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(2),
        this.GetItem(3).GetOwner(),
        this.Pl_,
      )),
      (this.vpt = new FilterEntrance_1.FilterEntrance(
        this.GetItem(5),
        this.Qvt,
      )),
      await this.aHi();
    var e = this.GetItem(19)
      ?.GetOwner()
      ?.K2_GetComponentsByClass(UE.UIInturnAnimController.StaticClass());
    if (e)
      for (let t = 0; t < e.Num(); t++) {
        var i = e.Get(t);
        "Start_R" === i.AnimName &&
          ((this.f4_ = i), (this.f4_.PlayFromIndex = 1)),
          "Start_L" === i.AnimName &&
            ((this.g4_ = i), (this.g4_.PlayFromIndex = 1));
      }
  }
  async aHi() {
    (this.h8e = new CommonDropDown_1.CommonDropDown(
      this.GetItem(6),
      this.m8e,
      this.c8e,
    )),
      await this.h8e.Init();
    var t =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupArray();
    this.i7i.push(0),
      t.forEach((t) => {
        this.i7i.push(t.Id);
      }),
      this.h8e.SetOnSelectCall(this.C8e),
      this.h8e.SetShowType(1),
      this.h8e.InitScroll(this.i7i, this.g8e, this.Z9i);
  }
  vU_() {
    this.bqe(),
      this.Ml_(),
      this.El_(),
      this.pl_(),
      this.fl_(),
      this.vl_(),
      this.a7i();
  }
  gY_(t = !1) {
    var e;
    this.Yja !== STATICINDEX &&
      this.dY_?.length &&
      ((e = this.dY_.findIndex((t) => t.CurrentSelectState)),
      this.dl_?.ScrollToGridIndex(0 <= e ? e : 0, t));
  }
  fY_() {
    return !!this.ml_ && (this.Il_(), !0);
  }
  mY_() {
    let t = !1;
    return (
      0 !== this.Z9i && (this.h8e.SetSelectedIndex(0), (t = !0)),
      (t = this.vpt.TryClearData() ? !0 : t)
    );
  }
  Al_() {
    var t, e;
    let i = !0;
    for (const s of ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
      this.ko_,
    )
      .GetPhantomData()
      .GetIncrIdList())
      if (0 !== s) {
        i = !1;
        break;
      }
    i
      ? ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          "VisionAssembleSaveNone",
        )
      : ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomEquipGroupCountMax() <=
          (t =
            ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionEquipGroupList()
              .length)
        ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(245)),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          ))
        : ((e = StringUtils_1.StringUtils.Format(
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "VisionAssembleCurrentIndex",
            ),
            (t + 1).toString(),
          )),
          CommonInputViewController_1.CommonInputViewController.OpenSetVisionEquipGroupName(
            e,
            async (t) =>
              ControllerHolder_1.ControllerHolder.VisionEquipGroupController.RequestAddVisionEquipGroup(
                this.ko_,
                t,
              ),
          ));
  }
  Ll_() {
    var t;
    let e = !1;
    for (const s of ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionEquipGroupDataByIndex(
      this.Yja,
    ).GetVisionUniqueIdList()) {
      var i =
        ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomEquipOnRoleId(
          s,
        );
      if (i && i !== this.ko_) {
        e = !0;
        break;
      }
    }
    e
      ? ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(244)).FunctionMap.set(
          2,
          () => {
            ControllerHolder_1.ControllerHolder.VisionEquipGroupController.RequestApplyVisionGroup(
              this.Yja,
              this.ko_,
            );
          },
        ),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          t,
        ))
      : ControllerHolder_1.ControllerHolder.VisionEquipGroupController.RequestApplyVisionGroup(
          this.Yja,
          this.ko_,
        );
  }
  a7i() {
    var t =
        ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionEquipGroupList(),
      e = new Array();
    for (const i of t) e.push(i.GetIndex());
    this.vpt.UpdateData(this.Z6i, e, this.ko_);
  }
  OnBeforeShow() {
    this.a7i(),
      (this.Yja = STATICINDEX),
      this.bqe(!1, !0),
      this.Dl_(),
      this.yl_(),
      this.Cl_(),
      this.Ml_(!1, () => {
        for (const t of this.nvt?.GetScrollItemList()) t.SetRightItemAlpha(0);
        this.f4_?.Play();
      }),
      this.El_(),
      this.gl_(),
      this.pl_(),
      this.fl_(),
      this.vl_(),
      this.Ul_(),
      this.mP_(),
      this.iq_();
  }
  Dl_() {
    var e =
        ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionEquipGroupList(),
      i = e.length;
    this.ll_ = new Array();
    for (let t = 0; t < i; t++) {
      var s = e[t];
      this.ll_.push(s.GetIndex());
    }
  }
  yl_() {
    this._l_?.Refresh(this.ko_);
  }
  Bl_() {
    var s =
        ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionEquipGroupList(),
      r = new Array();
    const n = 0 < this.Z9i ? this.i7i[this.Z9i] : 0;
    var t = s.length,
      o = this.Q7_();
    for (let i = 0; i < t; i++) {
      var h = s[i];
      let t = !1,
        e =
          ((0 < n &&
            !ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionFetterDataByIncIdList(
              h.GetVisionUniqueIdList(),
            ).find((t) => t.FetterGroupId === n)) ||
            (t = !0),
          !o);
      0 < this.ll_.length
        ? (e = this.ll_.includes(h.GetIndex()))
        : o || (e = !0),
        t && e && r.push(h);
    }
    return r;
  }
  bqe(t = !1, e = !1) {
    var i = this.Q7_() || 0 < this.Z9i,
      s = this.Bl_(),
      r = s.length,
      n =
        ((ModelManager_1.ModelManager.VisionEquipGroupModel.FilterDataLength =
          r),
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomEquipGroupCountMax()),
      o = new Array(),
      n = i ? s.length : n;
    for (let t = 0; t < n; t++) {
      var h = new VisionAssembleScrollItem_1.VisionAssembleScrollItemData(),
        a = t < r ? s[t] : void 0;
      (h.GroupIndex = t),
        (h.ClickCallback = this.wl_),
        (h.CurrentSelectState = a?.GetIndex() === this.Yja),
        (h.VisionEquipGroupData = a),
        (h.CheckIfCanSelect = this.Qq_),
        o.push(h);
    }
    (this.dY_ = o),
      this.dl_?.RefreshByData(o, t, () => {
        t ? e && this.dl_?.GetUiAnimController()?.Play() : this.gY_(e);
      });
  }
  gl_() {
    this._l_?.RefreshSelectState(this.Yja === STATICINDEX, this.ml_);
  }
  bl_(t = !0) {
    this.bqe(t),
      this.gl_(),
      this.vl_(),
      this.pl_(),
      this.fl_(),
      this.Ul_(),
      this.Ml_(!1, () => {
        for (const t of this.nvt?.GetScrollItemList()) t.SetRightItemAlpha(0);
        this.f4_?.Play();
      });
  }
  pl_() {
    var t = this.RNr();
    this.ql_(t);
  }
  ql_(e) {
    var t = 2 === e || 1 === e || 3 === e;
    if ((this.p9t.SetActive(t), t)) {
      let t = "";
      (t = 2 === e || 3 === e ? "VisionAssembleUse" : "VisionAssembleSave"),
        this.p9t?.SetShowText(t);
    }
  }
  RNr() {
    if (this.Yja === EMPTYSELECTINDEX) return 0;
    if (this.Yja === STATICINDEX) return 1;
    var e =
        ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionEquipGroupDataByIndex(
          this.Yja,
        ).GetVisionUniqueIdList(),
      i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.ko_)
        .GetPhantomData()
        .GetIncrIdList();
    let s = !0;
    for (let t = 0; t < e.length; t++)
      if (e[t] !== i[t]) {
        s = !1;
        break;
      }
    return s ? 3 : 2;
  }
  fl_() {
    var t =
      !this.ml_ && this.Yja !== STATICINDEX && this.Yja !== EMPTYSELECTINDEX;
    this.kl_(t), this.Ol_(t);
  }
  kl_(t) {
    this.GetButton(12).RootUIComp.SetUIActive(t);
  }
  Ol_(t) {
    this.GetButton(11).RootUIComp.SetUIActive(t);
  }
  Cl_() {
    var t = this.ml_;
    this.ul_?.SetActive(t), t && this.ul_?.Refresh(this.Gl_());
  }
  K7_() {
    var t = ConfigManager_1.ConfigManager.FilterConfig.GetFilterId(this.Z6i);
    return ModelManager_1.ModelManager.FilterModel.GetFilterResultData(t);
  }
  Q7_() {
    var t = this.K7_();
    if (t)
      for (const e of t.GetSelectRuleData().values()) if (0 < e.size) return !0;
    return !1;
  }
  mP_() {
    var t =
      (this.Q7_() && 0 === this.Bl_().length) ||
      (0 < this.Z9i && 0 === this.Bl_().length);
    this.GetItem(18).SetUIActive(t);
  }
  Ml_(e = !1, i = void 0) {
    if (this.Yja === EMPTYSELECTINDEX)
      this.GetScrollViewWithScrollbar(10).RootUIComp.SetUIActive(!1),
        this.GetItem(14).SetUIActive(!0);
    else {
      var t = this.fP_();
      this.GetScrollViewWithScrollbar(10).RootUIComp.SetUIActive(!t),
        this.GetItem(14).SetUIActive(t);
      const s =
        ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionAssembleViewAttrData(
          this.Yja,
          this.ml_,
          this.ko_,
        );
      this.nvt?.RefreshByData(s, () => {
        if ((0 < s.length && this.nvt?.ScrollToTop(0), i?.(), e)) {
          for (const t of this.nvt?.GetScrollItemList()) t.SetLeftItemAlpha(0);
          this.g4_?.Play();
        }
      });
    }
  }
  El_() {
    var t =
        ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionEquipGroupList()
          .length,
      e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomEquipGroupCountMax();
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(7),
      "VisionAssembleHasSave",
      t,
      e,
    );
  }
  iq_() {
    this.PlaySequence("Start_InfR", void 0, !0),
      this.f4_?.OnFinish.Bind(() => {
        this.f4_?.SetItemDefaultAlphaZero(!1);
      }),
      this.f4_?.Play("Start_R");
  }
  vl_() {
    var t = this.cl_?.GetActive();
    this.cl_?.Refresh(this.Fl_()),
      !0 !== t &&
        (this.cl_?.SetActive(!0),
        this.Ml_(),
        this.PlaySequence("Start_InfR", void 0, !0));
  }
  Ul_() {
    var t = this.Yja !== EMPTYSELECTINDEX && this.Yja !== STATICINDEX;
    this.GetExtendToggle(13)?.RootUIComp.SetUIActive(t);
  }
  fP_() {
    if (this.Yja !== EMPTYSELECTINDEX)
      if (this.Yja === STATICINDEX) {
        for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
          this.ko_,
        )
          .GetPhantomData()
          .GetIncrIdList())
          if (0 !== t) return !1;
      } else
        for (const e of ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionEquipGroupDataByIndex(
          this.Yja,
        ).GetVisionUniqueIdList())
          if (0 !== e) return !1;
    return !0;
  }
  Fl_() {
    if (this.Yja !== EMPTYSELECTINDEX) {
      let t = [];
      var i = new VisionAssembleTopData();
      (t =
        this.Yja === STATICINDEX
          ? ((i.Name = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "VisionAssembleCurrentEquip",
            )),
            Array.from(
              ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.ko_)
                .GetPhantomData()
                .GetIncrIdList(),
            ))
          : ((s =
              ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionEquipGroupDataByIndex(
                this.Yja,
              )),
            (i.Name = s.GetName()),
            s.GetVisionUniqueIdList())),
        (i.Index = this.Yja === STATICINDEX ? STATICINDEX : this.Yja);
      let e = 0;
      var s = this.CP_(
        ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionFetterDataByIncIdList(
          t,
        ),
      );
      for (const h of t) {
        var r =
          ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(h);
        r && (e += r.GetCost());
      }
      i.Cost = e;
      var n = new Array();
      for (const a of s) {
        var o = new VisionAssembleSuitItem_1.VisionAssembleSuitItemData();
        o.Phrase(a), n.push(o);
      }
      return (i.SuitList = n), i;
    }
  }
  Gl_() {
    const e = new VisionAssembleTopData();
    (e.Name = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      "VisionAssembleCurrentEquip",
    )),
      (e.Index = -1);
    let i = 0;
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.ko_),
      s = t.GetPhantomData().GetDataMap(),
      r = s.size;
    for (let t = 0; t < r; t++) {
      const e = s.get(t);
      e && (i += e.GetCost());
    }
    e.Cost = i;
    var t = t.GetPhantomData().GetIncrIdList(),
      t = this.CP_(
        ModelManager_1.ModelManager.VisionEquipGroupModel.GetVisionFetterDataByIncIdList(
          Array.from(t),
        ),
      ),
      n = new Array();
    for (const h of t) {
      var o = new VisionAssembleSuitItem_1.VisionAssembleSuitItemData();
      o.Phrase(h), n.push(o);
    }
    return (e.SuitList = n), e;
  }
  CP_(t) {
    var e = new Array(),
      i = new Map();
    for (const s of t) i.set(s.FetterGroupId, s);
    for (const r of i.values()) e.push(r);
    return e;
  }
}
exports.VisionAssembleView = VisionAssembleView;
class VisionAssembleStaticItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.sl_ = []),
      (this.Nji = void 0),
      (this.kqe = () => {
        this.Nji?.();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  BindClickCallBack(t) {
    this.Nji = t;
  }
  async OnBeforeStartAsync() {
    var e = [];
    for (let t = 0; t < 5; t++) {
      var i = new VisionAssembleItem_1.VisionAssembleItem();
      this.sl_.push(i),
        e.push(i.CreateByActorAsync(this.GetItem(1 + t).GetOwner()));
    }
    await Promise.all(e);
    for (const t of this.sl_) t.SetActive(!0);
  }
  RefreshSelectState(t, e) {
    e
      ? (this.GetExtendToggle(0).SetToggleState(2),
        this.GetExtendToggle(0).SetSelfInteractive(!1))
      : (this.GetExtendToggle(0).SetToggleState(t ? 1 : 0),
        this.GetExtendToggle(0).SetSelfInteractive(!0));
  }
  Refresh(t) {
    for (const r of this.sl_) r.Reset();
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t)
        .GetPhantomData()
        .GetDataMap(),
      i = e.size;
    for (let t = 0; t < i; t++) {
      var s = e.get(t);
      s && this.sl_[t].Update(s.GetIncrId());
    }
  }
}
exports.VisionAssembleStaticItem = VisionAssembleStaticItem;
class VisionAssembleTopData {
  constructor() {
    (this.Name = ""), (this.Index = 0), (this.Cost = 0), (this.SuitList = []);
  }
}
class VisionAssembleTopItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.eGe = void 0),
      (this.Nl_ = void 0),
      (this.Vl_ = !0),
      (this.xl_ = () => {
        this.Nl_?.();
      }),
      (this.sGe = () => {
        return new VisionAssembleSuitItem_1.VisionAssembleSuitItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[5, this.xl_]]);
  }
  OnStart() {
    (this.eGe = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(3),
      this.sGe,
    )),
      ModelManager_1.ModelManager.VisionEquipGroupModel.SaveVisionGroupFirstOpenState(
        !1,
      );
  }
  SetReBtnActive(t) {
    this.Vl_ = t;
  }
  BindClickReNameCallBack(t) {
    this.Nl_ = t;
  }
  Refresh(e) {
    if (e) {
      this.GetButton(5).RootUIComp.SetUIActive(this.Vl_ && 0 <= e.Index),
        this.SetActive(!0),
        this.GetText(0).SetText(e.Name);
      let t = 0 <= e.Index ? (e.Index + 1).toString() : "";
      -1 === e.Index ? (t = "") : t.length < 2 && (t = "0" + t),
        this.GetText(1).SetText(t);
      var i = ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
      this.GetText(2).SetText(e.Cost + "/" + i),
        this.eGe?.RefreshByData(e.SuitList);
    } else this.SetActive(!1);
  }
}
//# sourceMappingURL=VisionAssembleView.js.map
