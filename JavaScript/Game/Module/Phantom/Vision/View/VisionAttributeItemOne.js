"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionAttributeItemOne = exports.VisionAttributeVariantOneData =
    void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView");
class VisionAttributeVariantOneData {
  constructor() {
    (this.Title = ""), (this.Desc = void 0), (this.SkillId = 0);
  }
}
exports.VisionAttributeVariantOneData = VisionAttributeVariantOneData;
class VisionAttributeItemOne extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.LoadingPromise = new CustomPromise_1.CustomPromise()),
      (this.g6i = void 0),
      (this.EPe = void 0),
      (this.kGe = void 0),
      (this.f6i = 0),
      (this.p6i = void 0),
      (this.JGe = (t, e, i) => {
        e = new AttributeSkillStateItem(e);
        return e.Update(this.g6i, t, this.f6i - 1 === i), { Key: i, Value: e };
      }),
      (this.v6i = (t) => {
        t === this.g6i?.GetUniqueId() &&
          this.Refresh(this.g6i.GetUniqueId(), !1);
      }),
      (this.kqe = () => {}),
      this.CreateThenShowByResourceIdAsync("UiItem_VisionIAttriItemA", t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIScrollViewWithScrollbarComponent],
    ];
  }
  OnStart() {
    (this.p6i = new VisionAttributeSkillButton(this.GetItem(0))),
      this.p6i.SetOnClickCall(this.kqe),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetItem(0),
      )),
      this.AddEventListener(),
      (this.kGe = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(1),
        this.JGe,
      ));
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PhantomPersonalSkillActive,
      this.v6i,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PhantomPersonalSkillActive,
      this.v6i,
    );
  }
  RefreshButtonShowState(t) {
    this.GetItem(0).SetUIActive(t);
  }
  M6i() {
    var t = new VisionAttributeVariantOneData();
    return (
      (t.Desc = this.g6i.GetNormalSkillDesc()),
      (t.SkillId = this.g6i.GetNormalSkillId()),
      t
    );
  }
  S6i() {
    var t = new Array();
    return (
      this.g6i.GetUniqueId() < 0
        ? t.push(this.M6i())
        : (0 < this.g6i.GetPersonalSkillId() && 0, t.push(this.M6i())),
      t
    );
  }
  Refresh(t, e = !0) {
    this.g6i =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
    var i =
        ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsEquip(t),
      i =
        (this.RefreshButtonShowState(
          i &&
            0 < t &&
            0 < this.g6i.GetPersonalSkillId() &&
            ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(
              t,
            ) &&
            !1,
        ),
        this.S6i());
    (this.f6i = i.length), this.kGe.RefreshByData(i), this.E6i(e), this.y6i();
  }
  y6i() {
    0 < this.g6i.GetPersonalSkillId() && this.p6i.Update(this.g6i);
  }
  E6i(t = !0) {
    var e = this.g6i.GetUniqueId();
    let i = !1;
    (i =
      0 < this.g6i.GetPersonalSkillId()
        ? ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(e)
          ? this.g6i.GetIfActivePersonalSkill()
          : ModelManager_1.ModelManager.PhantomBattleModel.GetIfVisionSkillState(
              e,
            )
        : i)
      ? this.EPe.PlaySequencePurely("ClickR")
      : this.EPe.PlaySequencePurely("ClickL"),
      t && this.EPe.StopCurrentSequence(!1, t);
  }
  OnBeforeDestroy() {
    this.kGe.ClearChildren(), this.RemoveEventListener();
  }
}
exports.VisionAttributeItemOne = VisionAttributeItemOne;
class VisionAttributeSkillButton extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.I6i = void 0),
      (this.nqe = () => {
        this.I6i?.();
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.nqe]]);
  }
  SetOnClickCall(t) {
    this.I6i = t;
  }
  Update(t) {
    this.T6i(t), this.hke(t);
  }
  hke(t) {
    var e = t.GetUniqueId();
    ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(e)
      ? ((t = t.GetIfActivePersonalSkill()),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(4),
          t ? "VisionSpecialSkill" : "VisionNormalSkill",
        ))
      : ((t =
          ModelManager_1.ModelManager.PhantomBattleModel.GetIfVisionSkillState(
            e,
          )),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(4),
          t ? "VisionSpecialSkill" : "VisionNormalSkill",
        ));
  }
  T6i(t) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "VisionNormalSkill"),
      this.GetItem(1).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!1);
  }
}
class AttributeSkillStateItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(), this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIItem],
    ];
  }
  Update(t, e, i) {
    this.L6i(t, e),
      this.GetItem(5).SetUIActive(!i),
      this.hke(e),
      this.D6i(t, e);
  }
  L6i(t, e) {
    var i = t.GetUniqueId();
    ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsEquip(i)
      ? this.R6i(t, e)
        ? this.GetItem(0).SetUIActive(!0)
        : ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(i)
          ? this.GetItem(0).SetUIActive(!1)
          : (this.GetItem(0).SetUIActive(!0),
            LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "VisionNotMain"))
      : this.GetItem(0).SetUIActive(!1);
  }
  hke(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(4),
      t.Desc.MainSkillText,
      ...t.Desc.MainSkillParameter,
    );
  }
  R6i(t, e) {
    return e.SkillId === t.GetPersonalSkillId() && 0 < e.SkillId;
  }
  D6i(t, e) {
    var i = t.GetUniqueId(),
      s = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsEquip(i);
    s &&
    ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(i) &&
    !this.R6i(t, e) &&
    s
      ? (this.GetItem(2).SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "ItemEquiped"))
      : this.GetItem(2).SetUIActive(!1);
  }
}
//# sourceMappingURL=VisionAttributeItemOne.js.map
