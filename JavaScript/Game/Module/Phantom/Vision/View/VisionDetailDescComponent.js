"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionDetailDescComponent = exports.VisionDetailDesc = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  HelpController_1 = require("../../../Help/HelpController"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  VisionFetterSuitItem_1 = require("./VisionFetterSuitItem"),
  NORMALCOLOR = "EBE5D7FF",
  GREENCOLOR = "97FF86FF",
  GRAYCOLOR = "ADADADFF",
  COUNTERHELPID = 59;
class VisionDetailDesc {
  constructor() {
    (this.Title = ""),
      (this.TitleItemShowState = !0),
      (this.JumpCallBack = void 0),
      (this.NeedActiveState = !1),
      (this.GreenActiveState = !1),
      (this.NewState = !1),
      (this.FetterId = 0),
      (this.FetterData = void 0),
      (this.IfMainPosition = !1),
      (this.EmptyState = !1),
      (this.EmptyText = ""),
      (this.EmptyContentText = ""),
      (this.SkillConfig = void 0),
      (this.Level = 0),
      (this.FetterGroupId = 0),
      (this.$6i = !0),
      (this.DoNotNeedCheckSimplyState = !1),
      (this.NeedSimplyStateChangeAnimation = !1),
      (this.AnimationState = !0),
      (this.Quality = 0),
      (this.TitleType = -1),
      (this.EquipSameMonster = !1),
      (this.CompareState = !1);
  }
  SetNeedCheckChangeColor(t) {
    this.$6i = t;
  }
  GetNeedCheckChangeColor() {
    return this.$6i;
  }
  static CreateEmptySkillDescData() {
    var t = new Array(),
      i = new VisionDetailDesc();
    return (
      (i.TitleItemShowState = !0),
      (i.Title =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "VisionSkillTitle",
        ) ?? ""),
      (i.EmptyState = !0),
      (i.EmptyText =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "MainVisionEmpty",
        ) ?? ""),
      (i.TitleType = 0),
      t.push(i),
      t
    );
  }
  static CreateEmptyFetterDescData() {
    var t = new Array(),
      i = new VisionDetailDesc();
    return (
      (i.TitleItemShowState = !0),
      (i.Title =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "VisionFetterTitle",
        ) ?? ""),
      (i.EmptyState = !0),
      (i.EmptyText =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FetterEmpty") ??
        ""),
      (i.TitleType = 1),
      t.push(i),
      t
    );
  }
  static CreateSameMonsterTips() {
    var t = new Array(),
      i = new VisionDetailDesc();
    return (
      (i.Title =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "VisionFetterTitle",
        ) ?? ""),
      (i.EquipSameMonster = !0),
      (i.TitleItemShowState = !1),
      t.push(i),
      t
    );
  }
  static ConvertVisionSkillDescToDescData(t, i, e, s, n) {
    var h = new Array(),
      r = new VisionDetailDesc(),
      i =
        ((r.TitleItemShowState = !0),
        (r.SkillConfig = t),
        (r.Level = i),
        (r.Quality = n),
        (r.IfMainPosition = e && !s),
        (r.NeedActiveState = !0),
        (r.GreenActiveState = !(!e || s)),
        t.IfCounterSkill);
    return (
      i
        ? ((r.JumpCallBack = () => {
            HelpController_1.HelpController.OpenHelpById(COUNTERHELPID);
          }),
          (r.Title =
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "VisionCounterSkillText",
            ) ?? ""))
        : (r.Title =
            MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              "VisionSkillTitle",
            ) ?? ""),
      h.push(r),
      h
    );
  }
  static ConvertVisionFetterDataToDetailDescData(i, e, s = void 0) {
    var n = new Array(),
      h = i.length;
    for (let t = 0; t < h; t++) {
      var r = new VisionDetailDesc();
      1 <= t && (r.TitleItemShowState = !1),
        (r.Title =
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "VisionFetterTitle",
          ) ?? ""),
        (r.NeedActiveState = !0),
        (r.NewState = i[t].NewAdd),
        (r.EquipSameMonster = e),
        i[t].ActiveState || i[t].NewAdd
          ? (r.GreenActiveState = !0)
          : (r.GreenActiveState = !1),
        (r.FetterGroupId = i[t].FetterGroupId),
        (r.FetterId = i[t].FetterId),
        (r.FetterData = i[t]),
        (r.JumpCallBack = s),
        n.push(r);
    }
    return n;
  }
}
exports.VisionDetailDesc = VisionDetailDesc;
class VisionDetailDescComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.wqe = void 0),
      (this.Y6i = void 0),
      (this.J6i = void 0),
      (this.z6i = void 0),
      (this.Z6i = !1),
      (this.e8i = () => {
        this.Z6i &&
          this.GetScrollViewWithScrollbar(0)?.ScrollTo(this.GetItem(2));
      }),
      (this.t8i = () => {
        this.Y6i &&
          (this.Y6i.forEach((t) => {
            t.NeedSimplyStateChangeAnimation = !0;
          }),
          this.Refresh(this.Y6i, !0));
      }),
      (this.i8i = () => {
        this.Z6i = !1;
      }),
      (this.wqe = t);
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIVerticalLayout],
    ];
  }
  async OnBeforeStartAsync() {
    (this.J6i = new VisionDetailDescItem(this.GetItem(1))),
      await this.J6i.Init(),
      this.J6i.SetActive(!0),
      (this.z6i = new VisionDetailDescItem(this.GetItem(2))),
      await this.z6i.Init(),
      this.z6i.SetActive(!0),
      this.GetVerticalLayout(3)?.OnRebuildLayoutDelegate.Bind(this.e8i);
  }
  OnStart() {
    this.mEe();
  }
  GetTxtItemByIndex(t) {
    return 0 === t
      ? this.GetItem(1)
      : 1 === t
        ? ((this.Z6i = !0), this.GetItem(2))
        : void 0;
  }
  mEe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ChangeVisionSimplyState,
      this.t8i,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.GuideGroupFinished,
        this.i8i,
      );
  }
  dEe() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ChangeVisionSimplyState,
      this.t8i,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.GuideGroupFinished,
        this.i8i,
      );
  }
  Refresh(t, i = 0) {
    this.Y6i = t;
    const e = new Array(),
      s = new Array();
    t.forEach((t) => {
      (t.SkillConfig || (t.TitleItemShowState && 0 === t.TitleType)) &&
        e.push(t),
        (0 < t.FetterId ||
          (t.TitleItemShowState && 1 === t.TitleType) ||
          t.EquipSameMonster) &&
          s.push(t);
    }),
      this.J6i?.Update(e),
      this.z6i?.Update(s),
      t.forEach((t) => {
        t.NeedSimplyStateChangeAnimation = !1;
      });
  }
  OnBeforeDestroy() {
    this.dEe();
  }
}
exports.VisionDetailDescComponent = VisionDetailDescComponent;
class VisionDetailDescItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.wqe = void 0),
      (this.CurrentData = void 0),
      (this.Pe = void 0),
      (this.eGe = void 0),
      (this.sGe = () => new VisionDetailDescContentItem()),
      (this.o8i = () => {
        this.Pe && this.Pe.JumpCallBack && this.Pe.JumpCallBack();
      }),
      (this.wqe = t);
  }
  Clear() {}
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner()), this.SetUiActive(!0);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UIVerticalLayout],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.o8i]]);
  }
  OnStart() {
    (this.eGe = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(7),
      this.sGe,
    )),
      this.GetItem(3).SetUIActive(!1);
  }
  Update(t) {
    let i = void 0;
    const e = new Array();
    t.forEach((t) => {
      (t.SkillConfig || (t.TitleItemShowState && 0 === t.TitleType)) &&
        (i = t).SkillConfig &&
        e.push(i),
        (0 < t.FetterId ||
          (t.TitleItemShowState && 1 === t.TitleType) ||
          t.EquipSameMonster) &&
          (t.TitleItemShowState && (i = t),
          0 < t.FetterId || t.EquipSameMonster) &&
          e.push(t);
    }),
      (this.Pe = i) &&
        (this.mGe(i),
        this.r8i(i),
        this.bPt(i),
        this.qPt(i),
        this.NPt(i),
        this.Pqe(e));
  }
  Pqe(t) {
    this.eGe?.RefreshByData(t);
  }
  mGe(t) {
    this.GetText(0).SetText(t.Title);
  }
  r8i(t) {
    this.GetButton(1).RootUIComp.SetUIActive(
      void 0 !== t.JumpCallBack && !t.CompareState,
    );
  }
  bPt(t) {
    this.GetItem(2).SetUIActive(t.EmptyState),
      t.EmptyState && this.GetItem(8).SetUIActive(0 === t.TitleType);
  }
  NPt(t) {
    this.GetText(5).SetText(t.EmptyText);
  }
  qPt(t) {
    this.GetItem(4).SetUIActive(t.TitleItemShowState);
  }
}
class VisionDetailDescContentItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.EPe = void 0),
      (this.n8i = !0),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.CurrentData = void 0),
      (this.PPt = void 0),
      (this.Pe = void 0);
  }
  Refresh(t, i, e) {
    this.Update(t);
  }
  Clear() {
    this.OnClear();
  }
  OnClear() {}
  OnSelected(t) {}
  OnDeselected(t) {}
  GetKey(t, i) {
    return this.GridIndex;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [6, UE.UIText],
      [5, UE.UIItem],
      [1, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.PPt = new VisionFetterSuitItem_1.VisionFetterSuitItem(
      this.GetItem(5),
    )),
      await this.PPt.Init(),
      this.PPt.SetActive(!0),
      this.SetUiActive(!0);
  }
  OnStart() {
    this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(7));
  }
  Update(t) {
    (this.Pe = t),
      this.Pe &&
        (this.s8i(t),
        this.a8i(t),
        this.L4e(t),
        this.OPt(t),
        this.h8i(t),
        this.l8i(t),
        this._8i(t));
  }
  _8i(t) {
    t.NeedSimplyStateChangeAnimation &&
      t.AnimationState &&
      (this.EPe.StopSequenceByKey("Switch", !1, !0),
      this.EPe.PlayLevelSequenceByName("Switch"));
  }
  l8i(e) {
    if (this.n8i && e.AnimationState) {
      let t = void 0,
        i = !1;
      e.GreenActiveState &&
        e.NewState &&
        0 < e.FetterId &&
        ((t = "Choose"), (i = !0)),
        0 < e.FetterId && !i && e.FetterData.ActiveState && (t = "Activate");
      var s = this.EPe.GetCurrentSequence();
      void 0 !== s && t !== s && this.EPe.StopSequenceByKey(s, !1, !0),
        void 0 !== t &&
          (t !== s
            ? this.EPe.PlayLevelSequenceByName(t)
            : this.EPe.ReplaySequenceByKey(t)),
        this.GetItem(10)?.SetUIActive(e.EquipSameMonster && void 0 === t);
    } else this.GetItem(10)?.SetUIActive(e.EquipSameMonster);
  }
  a8i(t) {
    this.GetItem(0).SetUIActive(t.NeedActiveState || t.EquipSameMonster);
  }
  s8i(t) {
    t.NeedActiveState
      ? this.GetItem(2).SetUIActive(t.GreenActiveState)
      : t.EquipSameMonster && this.GetItem(2).SetUIActive(!1);
  }
  h8i(t) {
    (t.GreenActiveState && !t.NewState && 0 < t.FetterId) ||
    t.EquipSameMonster ||
    (t.GreenActiveState && t.SkillConfig)
      ? this.GetItem(1).SetUIActive(!1)
      : this.GetItem(1).SetUIActive(!0);
  }
  OPt(i) {
    if (0 < i.FetterId) {
      this.GetItem(5).SetUIActive(!0);
      var e =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(
            i.FetterGroupId,
          ),
        e =
          (this.PPt.Update(e),
          i.FetterData.ActiveFetterGroupNum > i.FetterData.NeedActiveNum
            ? i.FetterData.NeedActiveNum
            : i.FetterData.ActiveFetterGroupNum),
        e = StringUtils_1.StringUtils.Format(
          "({0}/{1})",
          e.toString(),
          i.FetterData.NeedActiveNum.toString(),
        );
      let t = NORMALCOLOR;
      (t = i.FetterData.ActiveState ? GREENCOLOR : GRAYCOLOR),
        this.GetText(9).SetText(e),
        this.GetText(9).SetColor(UE.Color.FromHex(t));
    } else this.GetItem(5).SetUIActive(!1);
  }
  L4e(i) {
    if (!i.EquipSameMonster || 0 < i.FetterId) {
      let t =
        ModelManager_1.ModelManager.PhantomBattleModel.GetIfSimpleState(1);
      if (((t = !t), i.DoNotNeedCheckSimplyState && (t = !0), 0 < i.FetterId)) {
        var e =
            ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(
              i.FetterId,
            ),
          s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name) ?? "";
        if (
          (this.GetText(4).SetText(s),
          t
            ? StringUtils_1.StringUtils.IsEmpty(e.SimplyEffectDesc)
              ? this.GetText(6).SetText("")
              : LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(6),
                  e.SimplyEffectDesc,
                )
            : LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(6),
                e.EffectDescription,
                ...e.EffectDescriptionParam,
              ),
          this.GetText(4).SetUIActive(!0),
          this.GetText(6).SetUIActive(!0),
          i.GetNeedCheckChangeColor())
        ) {
          let t = NORMALCOLOR;
          (t = i.FetterData.ActiveState ? GREENCOLOR : GRAYCOLOR),
            this.GetText(4).SetColor(UE.Color.FromHex(t)),
            this.GetText(6).SetColor(UE.Color.FromHex(t));
        }
      } else if (i.SkillConfig)
        if (
          (t
            ? StringUtils_1.StringUtils.IsEmpty(i.SkillConfig.SimplyDescription)
              ? this.GetText(6).SetText("")
              : LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(6),
                  i.SkillConfig.SimplyDescription,
                )
            : ((s =
                ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExBySkillIdAndQuality(
                  i.SkillConfig.Id,
                  i.Quality,
                )),
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(6),
                i.SkillConfig.DescriptionEx,
                ...s,
              )),
          this.GetItem(8).SetUIActive(!1),
          this.GetText(6).SetUIActive(!0),
          i.GetNeedCheckChangeColor())
        ) {
          let t = GRAYCOLOR;
          i.IfMainPosition && (t = GREENCOLOR),
            this.GetText(6).SetColor(UE.Color.FromHex(t));
        }
    } else
      (e = this.GetText(6)),
        this.GetItem(8).SetUIActive(!1),
        e.SetUIActive(!0),
        this.GetText(4).SetUIActive(!1),
        e.SetColor(UE.Color.FromHex(GRAYCOLOR)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "SameVisionNoCountValue");
  }
  OnBeforeHide() {
    this.EPe.StopCurrentSequence();
  }
}
//# sourceMappingURL=VisionDetailDescComponent.js.map
