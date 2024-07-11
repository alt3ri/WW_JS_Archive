"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CalabashLevelUpTabView = exports.CalabashAttributeContentItem =
    void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  ConditionGroupById_1 = require("../../../../../Core/Define/ConfigQuery/ConditionGroupById"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  PropRewardConfById_1 = require("../../../../../Core/Define/ConfigQuery/PropRewardConfById"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  FormationAttributeController_1 = require("../../../Abilities/FormationAttributeController"),
  AutoAttachItem_1 = require("../../../AutoAttach/AutoAttachItem"),
  NoCircleAttachView_1 = require("../../../AutoAttach/NoCircleAttachView"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  RoleDefine_1 = require("../../../RoleUi/RoleDefine"),
  RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
  LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CalabashController_1 = require("../../CalabashController"),
  CalabashLevelUpRewardItemGrid_1 = require("./CalabashLevelUpRewardItemGrid");
class CalabashGridData {
  constructor() {
    (this.Level = 0),
      (this.OverFlowExp = 0),
      (this.LimitExp = 0),
      (this.MaxExp = 0),
      (this.IsMaxLevel = !1),
      (this.HasOverFlowExpReach = !1);
  }
}
const tempVector = new UE.Vector();
class CalabashGrid extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments),
      (this.ButtonFunction = void 0),
      (this.ItemCurve = void 0),
      (this.Xpt = () => {
        this.ButtonFunction?.(this.CurrentShowItemIndex);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[12, this.Xpt]]);
  }
  OnRefreshItem(t) {
    var e = t.Level,
      i =
        ModelManager_1.ModelManager.CalabashModel.GetReceiveRewardStateByLevel(
          e,
        ),
      s = e <= ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
      r =
        (this.GetItem(2)?.SetUIActive(s),
        this.GetItem(1)?.SetUIActive(!s),
        this.GetText(3)),
      e =
        (r.SetText(e.toString()),
        r.SetChangeColor(s, r.changeColor),
        this.GetItem(4).SetUIActive(2 === i),
        this.GetItem(10).SetUIActive(3 === i),
        this.GetItem(11).SetUIActive(0 < e && 3 !== i),
        t.IsMaxLevel
          ? this.GetItem(5).SetUIActive(!1)
          : (this.GetItem(5).SetUIActive(!0),
            (s = t.MaxExp),
            (r = t.OverFlowExp),
            this.GetSprite(6).SetFillAmount(r / s),
            this.GetSprite(7).SetFillAmount(t.LimitExp / s)),
        this.GetItem(8)?.SetUIActive(t.HasOverFlowExpReach),
        this.GetItem(9)?.SetUIActive(!t.HasOverFlowExpReach),
        this.GetCurrentSelectedState());
    this.SetSelectState(e);
  }
  OnSelect() {
    this.SetSelectState(!0), this.Xpt();
  }
  OnUnSelect() {
    this.SetSelectState(!1);
  }
  SetSelectState(t) {}
  OnMoveItem() {
    var t = this.GetCurrentMovePercentage(),
      t = this.ItemCurve.GetFloatValue(t);
    (tempVector.X = t),
      (tempVector.Y = t),
      (tempVector.Z = 1),
      this.GetItem(0)?.SetUIItemScale(tempVector),
      (tempVector.X = 1 / t),
      (tempVector.Y = 1 / t),
      (tempVector.Z = 1),
      this.GetItem(4)?.SetUIItemScale(tempVector);
  }
}
class CalabashAttributeData {
  constructor() {
    (this.Type = -1),
      (this.Name = void 0),
      (this.Value = void 0),
      (this.IsUp = !1),
      (this.IsCost = !1),
      (this.CostCount = 0),
      (this.CurrentSelect = !1),
      (this.CurrentSelectLevel = 0),
      (this.ClickCallBack = void 0);
  }
}
class CalabashAttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.gNe = void 0),
      (this.$pt = void 0),
      (this.Pe = void 0),
      (this.Ypt = !1),
      (this.kqe = () => {
        this.Pe?.ClickCallBack?.(this.Pe);
      }),
      (this.sGe = () => {
        return new CalabashAttributeContentItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIVerticalLayout],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.kqe]]);
  }
  OnStart() {
    this.GetVerticalLayout(7).RootUIComp.SetUIActive(!1),
      (this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.gNe = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(7),
        this.sGe,
      ));
  }
  Jpt(t) {
    this.GetItem(3)?.SetUIActive(!1);
    var e = this.GetText(2);
    e?.SetUIActive(!0),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        e,
        t.Value.TextKey,
        ...t.Value.Params,
      ),
      this.GetItem(6)?.SetUIActive(!1),
      this.GetExtendToggle(0)?.RootUIComp.SetRaycastTarget(!1);
  }
  zpt(t) {
    this.GetItem(3)?.SetUIActive(!1);
    var e = this.GetText(2),
      e =
        (e?.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          e,
          t.Value.TextKey,
          ...t.Value.Params,
        ),
        new Array());
    let i = new CalabashAttributeContentData();
    (i.Type = 0),
      (i.StringKey =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "UpAbsorptionTarget",
        )),
      (i.StringValue = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "UpAbsorptionTargetName",
      )),
      e.push(i),
      ((i = new CalabashAttributeContentData()).Type = 0),
      (i.StringKey = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "UpAbsorptionTimeText",
      ));
    t =
      ModelManager_1.ModelManager.CalabashModel.GetLeftIntensifyCaptureGuarantee();
    (i.StringValue = StringUtils_1.StringUtils.Format(
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "UpAbsorptionTimeDescText",
      ),
      t.toString(),
      ConfigManager_1.ConfigManager.CalabashConfig.GetIntensifyCaptureGuarantee().toString(),
    )),
      e.push(i),
      this.gNe?.RefreshByData(e);
  }
  Zpt(t) {
    this.GetItem(3)?.SetUIActive(!0),
      this.GetText(4)?.SetText(t.CostCount.toString()),
      this.GetText(2)?.SetUIActive(!1),
      this.GetItem(6)?.SetUIActive(!1);
  }
  evt(t) {
    this.GetItem(3)?.SetUIActive(!1);
    var e = this.GetText(2),
      e =
        (e?.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          e,
          t.Value.TextKey,
          ...t.Value.Params,
        ),
        t.CurrentSelectLevel),
      t =
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
          e,
        )?.QualityDropWeight;
    this.GetItem(6)?.SetUIActive(!0),
      this.GetExtendToggle(0)?.RootUIComp.SetRaycastTarget(!0);
    const s = new Array();
    t?.forEach((t, e) => {
      var i;
      0 < t &&
        (((i = new CalabashAttributeContentData()).Type = 2),
        (i.Key = e),
        (i.Value = t),
        s.push(i));
    }),
      this.gNe?.RefreshByData(s);
  }
  tvt() {
    this.Pe?.CurrentSelect
      ? this.GetExtendToggle(0)?.SetToggleState(1)
      : this.GetExtendToggle(0)?.SetToggleState(0);
  }
  Refresh(t, e, i) {
    switch (
      ((this.Pe = t),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Name),
      this.GetItem(5)?.SetUIActive(2 === t.Type && t.IsUp),
      this.tvt(),
      t.Type)
    ) {
      case 0:
        this.Jpt(t);
        break;
      case 1:
        this.zpt(t);
        break;
      case 3:
        this.Zpt(t);
        break;
      case 2:
        this.evt(t);
    }
    this.Ypt !== t.CurrentSelect &&
      ((this.Ypt = t.CurrentSelect), this.ivt(this.Ypt));
  }
  ivt(t) {
    this.$pt?.PlaySequencePurely(t ? "Show" : "Hide");
  }
}
class CalabashAttributeContentData {
  constructor() {
    (this.Type = -1),
      (this.Key = 0),
      (this.Value = 0),
      (this.StringKey = ""),
      (this.StringValue = "");
  }
}
class CalabashAttributeContentItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  Refresh(t, e, i) {
    var s, r;
    0 === t.Type
      ? (this.GetText(0)?.SetText(t.StringKey),
        this.GetText(1)?.SetText(t.StringValue))
      : 2 === t.Type &&
        ((s = t.Key),
        (t = t.Value),
        (s = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(s)),
        (r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(s.Name)),
        this.GetText(0)?.SetText(r),
        this.GetText(0)?.SetColor(UE.Color.FromHex(s.DropColor)),
        this.GetText(1)?.SetText(
          StringUtils_1.StringUtils.Format("{0}%", t.toString()),
        ),
        this.GetText(1)?.SetColor(UE.Color.FromHex(s.DropColor)));
  }
}
exports.CalabashAttributeContentItem = CalabashAttributeContentItem;
class CalabashLevelUpTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.ovt = void 0),
      (this.rvt = void 0),
      (this.nvt = void 0),
      (this.svt = void 0),
      (this.H3e = void 0),
      (this.avt = []),
      (this.hvt = void 0),
      (this.lvt = 0),
      (this._vt = -1),
      (this.Ita = !0),
      (this.dpt = () => {
        var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(160);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          t,
        );
      }),
      (this.uvt = (t, e, i) => {
        var s = new CalabashGrid();
        return (
          s.CreateThenShowByActor(t),
          (s.ButtonFunction = this.cvt),
          (s.ItemCurve = this.hvt),
          s
        );
      }),
      (this.rOe = () =>
        new CalabashLevelUpRewardItemGrid_1.CalabashLevelUpRewardItemGrid()),
      (this.mvt = () => new CalabashAttributeItem()),
      (this.g6e = () => {
        CalabashController_1.CalabashController.RequestCalabashLevelReward(
          this.lvt,
        );
      }),
      (this.dvt = (e) => {
        if ("CommonRewardView" === e) {
          var i =
            CommonParamById_1.configCommonParamById.GetIntConfig(
              "StrengthItemId",
            );
          let t = !1;
          for (const a of this.avt)
            if (i === a.ItemData[0].ItemId) {
              t = !0;
              break;
            }
          if (t) {
            e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(i);
            if (e && e.Parameters) {
              let t = 0;
              for (var [, s] of e.Parameters) {
                t = s;
                break;
              }
              if (0 !== t) {
                var r,
                  e =
                    PropRewardConfById_1.configPropRewardConfById.GetConfig(t);
                if (e) {
                  let t = 0;
                  for (const h of e.Props)
                    if (h.Id === RoleDefine_1.STRENGTH_MAX_ID) {
                      t = h.Value;
                      break;
                    }
                  0 !== t &&
                    ((r = {
                      Title: "PrefabTextItem_HuluStaminaUp_Text",
                      StrengthUpgradeData: {
                        MaxStrength: (e =
                          FormationAttributeController_1.FormationAttributeController.GetBaseMax(
                            1,
                          )),
                      },
                      AttributeInfo: [
                        {
                          Name: (r =
                            ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
                              RoleDefine_1.STRENGTH_MAX_ID,
                            )).Name,
                          IconPath: r.Icon,
                          ShowArrow: !0,
                          PreText: Math.floor((e - t) / 100).toString(),
                          CurText: Math.floor(e / 100).toString(),
                        },
                      ],
                    }),
                    RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
                      r,
                    ));
                }
              }
            }
          }
        }
      }),
      (this.cvt = (t) => {
        (this.lvt = t),
          this.ovt.GetCurrentSelectIndex() !== t && this.ovt.AttachToIndex(t),
          this.Cvt();
      }),
      (this.gvt = (t) => {
        (this._vt = t.Type === this._vt ? -1 : t.Type), this.fvt();
      }),
      (this.pvt = () => {
        this.vvt(), this.Mvt(), this.Evt();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIVerticalLayout],
      [5, UE.UIHorizontalLayout],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIText],
      [12, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [6, this.g6e],
        [2, this.dpt],
      ]);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GetCalabashReward,
      this.pvt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.dvt,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GetCalabashReward,
      this.pvt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.dvt,
      );
  }
  async OnCreateAsync() {
    var t =
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "CalabashCurve",
        ),
      t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    this.hvt = await t.Promise;
  }
  OnStart() {
    (this._vt = -1),
      (this.ovt = new NoCircleAttachView_1.NoCircleAttachView(
        this.GetItem(0).GetOwner(),
      ));
    var t = this.GetItem(1);
    t.SetUIActive(!1),
      this.ovt.CreateItems(t.GetOwner(), 0, this.uvt),
      (this.H3e = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(5),
        this.rOe,
      )),
      (this.nvt = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(4),
        this.mvt,
      ));
  }
  OnBeforeShow() {
    this.vvt(this.Ita), (this.Ita = !1), this.Evt();
  }
  Cvt() {
    this.Mvt();
  }
  Mvt() {
    this.jqe(), this.Svt(), this.fvt();
  }
  Evt() {
    var t = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
      e = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp(),
      i =
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
          t,
        )?.LevelUpExp,
      e =
        (this.GetText(3)?.SetText(e + "/" + i),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(10),
          "PrefabTextItem_HuluCurrentLv_Text",
          t,
        ),
        ModelManager_1.ModelManager.CalabashModel.GetCalabashAllSchedule()),
      i = ModelManager_1.ModelManager.CalabashModel.GetCalabashOwnSchedule();
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(11),
      "Phanton_CollectNum",
      i,
      e,
    );
  }
  jqe() {
    var t =
      ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
        this.lvt,
      ).RewardId;
    if (t <= 0) this.H3e?.SetActive(!1), this.GetItem(12).SetUIActive(!0);
    else {
      var t =
          ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(t),
        i =
          (this.H3e?.SetActive(!0),
          this.GetItem(12).SetUIActive(!1),
          ModelManager_1.ModelManager.CalabashModel.GetReceiveRewardStateByLevel(
            this.lvt,
          ));
      let e = 0;
      for (const s of t) {
        let t = void 0;
        e < this.avt.length
          ? (t = this.avt[e])
          : ((t = new CalabashLevelUpRewardItemGrid_1.CalabashRewardItemData()),
            this.avt.push(t)),
          (t.ReceiveState = i),
          (t.ItemData = [{ ItemId: s[0], IncId: 0 }, s[1]]),
          e++;
      }
      this.H3e?.RefreshByData(this.avt);
    }
  }
  Svt() {
    var t,
      e =
        ModelManager_1.ModelManager.CalabashModel.GetReceiveRewardStateByLevel(
          this.lvt,
        );
    this.GetButton(6).RootUIComp.SetUIActive(2 === e),
      this.GetItem(8).SetUIActive(1 === e),
      this.GetItem(7).SetUIActive(3 === e),
      1 === e &&
        ((e = this.GetText(9)),
        this.rvt[this.lvt].HasOverFlowExpReach
          ? ((t =
              ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
                this.lvt,
              )),
            (t = ConditionGroupById_1.configConditionGroupById.GetConfig(
              t.LevelUpCondition,
            )),
            LguiUtil_1.LguiUtil.SetLocalTextNew(e, t.HintText))
          : LguiUtil_1.LguiUtil.SetLocalTextNew(
              e,
              "PrefabTextItem_HuluLvNotEnough_Text",
            ));
  }
  fvt() {
    if (!this.svt) {
      this.svt = new Array(4);
      for (let t = 0; t < this.svt.length; t++)
        this.svt[t] = new CalabashAttributeData();
    }
    var t = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
      e = t >= this.lvt;
    let i = this.svt[0];
    (i.Type = 0),
      (i.Name = "PrefabTextItem_1948060625_Text"),
      (i.IsCost = !1),
      (i.IsUp = !1);
    var s = ModelManager_1.ModelManager.CalabashModel.GetCatchGainByLevel(
        this.lvt,
      ),
      r =
        ((i.Value = new LguiUtil_1.TableTextArgNew(
          "Text_ExplorationDegree_Text",
          Math.ceil(s / 10),
        )),
        e ||
          ((r =
            ModelManager_1.ModelManager.CalabashModel.GetCatchGainByLevel(t)),
          (i.IsUp = r < s)),
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
          t,
        )),
      t = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
        this.lvt,
      ),
      a =
        (((i = this.svt[1]).Type = 1),
        (i.Name = "PrefabTextItem_HuluTempCatchGain_Text"),
        (i.IsCost = !1),
        (i.IsUp = !1),
        t.TempCatchGain),
      s =
        (a <= s
          ? (i.Value = new LguiUtil_1.TableTextArgNew(
              "PrefabTextItem_HuluTempCatchGainDisable_Text",
            ))
          : ((i.Value = new LguiUtil_1.TableTextArgNew(
              "Text_ExplorationDegree_Text",
              Math.ceil(a / 10),
            )),
            e || ((s = r.TempCatchGain), (i.IsUp = s < a))),
        ((i = this.svt[2]).Type = 2),
        (i.Name = "PrefabTextItem_3681645418_Text"),
        (i.IsCost = !1),
        (i.IsUp = !1),
        t.QualityDescription),
      s =
        ((i.Value = new LguiUtil_1.TableTextArgNew(s)),
        e || ((a = r.QualityDescription), (i.IsUp = s !== a)),
        ((i = this.svt[3]).Type = 3),
        (i.Name = "PrefabTextItem_HuluCostLimit_Text"),
        (i.IsCost = !0),
        (i.IsUp = !1),
        t.Cost);
    (i.CostCount = s),
      e || ((a = r.Cost), (i.IsUp = a < s)),
      this.svt.forEach((t) => {
        (t.ClickCallBack = this.gvt),
          (t.CurrentSelect = this._vt === t.Type),
          (t.CurrentSelectLevel = this.lvt);
      }),
      this.nvt?.RefreshByData(this.svt);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e;
    if (1 === t.length || isNaN(Number(t[0])))
      return (e = this.nvt?.GetItemByIndex(Number(t[0]))) ? [e, e] : void 0;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        t,
      ]);
  }
  vvt(t = !1) {
    var r = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
      a = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp(),
      h = ModelManager_1.ModelManager.CalabashModel.GetCalabashMaxLevel();
    this.rvt || (this.rvt = new Array(h));
    let o = 0;
    for (let s = 0; s <= h; s++) {
      var n =
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
          s,
        ).LevelUpExp;
      let t = 0,
        e = 0,
        i =
          (s < r
            ? ((t = n), (e = n))
            : ((t = Math.min(n, a - o)), (e = 0), (o += n)),
          this.rvt[s]);
      i || ((i = new CalabashGridData()), (this.rvt[s] = i)),
        (i.Level = s),
        (i.OverFlowExp = t),
        (i.LimitExp = e),
        (i.MaxExp = n),
        (i.IsMaxLevel = s === h),
        0 === s
          ? (i.HasOverFlowExpReach = !0)
          : ((n = this.rvt[s - 1]),
            (i.HasOverFlowExpReach = n.OverFlowExp === n.MaxExp));
    }
    if (t)
      this.ovt.ReloadView(this.rvt.length, this.rvt),
        this.ovt.AttachToIndex(r, !0);
    else
      for (const e of this.ovt.GetItems()) e.SetData(this.rvt), e.RefreshItem();
  }
}
exports.CalabashLevelUpTabView = CalabashLevelUpTabView;
//# sourceMappingURL=CalabashLevelUpTabView.js.map
