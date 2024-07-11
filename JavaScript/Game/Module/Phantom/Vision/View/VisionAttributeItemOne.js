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
      (this.C8i = void 0),
      (this.SPe = void 0),
      (this.kGe = void 0),
      (this.g8i = 0),
      (this.f8i = void 0),
      (this.JGe = (t, e, i) => {
        e = new AttributeSkillStateItem(e);
        return e.Update(this.C8i, t, this.g8i - 1 === i), { Key: i, Value: e };
      }),
      (this.p8i = (t) => {
        t === this.C8i?.GetUniqueId() &&
          this.Refresh(this.C8i.GetUniqueId(), !1);
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
    (this.f8i = new VisionAttributeSkillButton(this.GetItem(0))),
      this.f8i.SetOnClickCall(this.kqe),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(
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
      this.p8i,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PhantomPersonalSkillActive,
      this.p8i,
    );
  }
  RefreshButtonShowState(t) {
    this.GetItem(0).SetUIActive(t);
  }
  v8i() {
    var t = new VisionAttributeVariantOneData();
    return (
      (t.Desc = this.C8i.GetNormalSkillDesc()),
      (t.SkillId = this.C8i.GetNormalSkillId()),
      t
    );
  }
  M8i() {
    var t = new Array();
    return (
      this.C8i.GetUniqueId() < 0
        ? t.push(this.v8i())
        : (0 < this.C8i.GetPersonalSkillId() && 0, t.push(this.v8i())),
      t
    );
  }
  Refresh(t, e = !0) {
    this.C8i =
      ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
    var i =
        ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsEquip(t),
      i =
        (this.RefreshButtonShowState(
          i &&
            0 < t &&
            0 < this.C8i.GetPersonalSkillId() &&
            ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(
              t,
            ) &&
            !1,
        ),
        this.M8i());
    (this.g8i = i.length), this.kGe.RefreshByData(i), this.E8i(e), this.S8i();
  }
  S8i() {
    0 < this.C8i.GetPersonalSkillId() && this.f8i.Update(this.C8i);
  }
  E8i(t = !0) {
    var e = this.C8i.GetUniqueId();
    let i = !1;
    (i =
      0 < this.C8i.GetPersonalSkillId()
        ? ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(e)
          ? this.C8i.GetIfActivePersonalSkill()
          : ModelManager_1.ModelManager.PhantomBattleModel.GetIfVisionSkillState(
              e,
            )
        : i)
      ? this.SPe.PlaySequencePurely("ClickR")
      : this.SPe.PlaySequencePurely("ClickL"),
      t && this.SPe.StopCurrentSequence(!1, t);
  }
  OnBeforeDestroy() {
    this.kGe.ClearChildren(), this.RemoveEventListener();
  }
}
exports.VisionAttributeItemOne = VisionAttributeItemOne;
class VisionAttributeSkillButton extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.y8i = void 0),
      (this.nqe = () => {
        this.y8i?.();
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
    this.y8i = t;
  }
  Update(t) {
    this.I8i(t), this.T2e(t);
  }
  T2e(t) {
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
  I8i(t) {
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
    this.T8i(t, e),
      this.GetItem(5).SetUIActive(!i),
      this.T2e(e),
      this.L8i(t, e);
  }
  T8i(t, e) {
    var i = t.GetUniqueId();
    ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsEquip(i)
      ? this.D8i(t, e)
        ? this.GetItem(0).SetUIActive(!0)
        : ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(i)
          ? this.GetItem(0).SetUIActive(!1)
          : (this.GetItem(0).SetUIActive(!0),
            LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "VisionNotMain"))
      : this.GetItem(0).SetUIActive(!1);
  }
  T2e(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(4),
      t.Desc.MainSkillText,
      ...t.Desc.MainSkillParameter,
    );
  }
  D8i(t, e) {
    return e.SkillId === t.GetPersonalSkillId() && 0 < e.SkillId;
  }
  L8i(t, e) {
    var i = t.GetUniqueId(),
      s = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsEquip(i);
    s &&
    ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(i) &&
    !this.D8i(t, e) &&
    s
      ? (this.GetItem(2).SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "ItemEquiped"))
      : this.GetItem(2).SetUIActive(!1);
  }
}
//# sourceMappingURL=VisionAttributeItemOne.js.map
