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
      (this.qft = () => {
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
      (this.BtnBindInfo = [[12, this.qft]]);
  }
  OnRefreshItem(t) {
    var e = t.Level,
      i =
        ModelManager_1.ModelManager.CalabashModel.GetReceiveRewardStateByLevel(
          e,
        ),
      r = e <= ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
      s =
        (this.GetItem(2)?.SetUIActive(r),
        this.GetItem(1)?.SetUIActive(!r),
        this.GetText(3)),
      e =
        (s.SetText(e.toString()),
        s.SetChangeColor(r, s.changeColor),
        this.GetItem(4).SetUIActive(2 === i),
        this.GetItem(10).SetUIActive(3 === i),
        this.GetItem(11).SetUIActive(0 < e && 3 !== i),
        t.IsMaxLevel
          ? this.GetItem(5).SetUIActive(!1)
          : (this.GetItem(5).SetUIActive(!0),
            (r = t.MaxExp),
            (s = t.OverFlowExp),
            this.GetSprite(6).SetFillAmount(s / r),
            this.GetSprite(7).SetFillAmount(t.LimitExp / r)),
        this.GetItem(8)?.SetUIActive(t.HasOverFlowExpReach),
        this.GetItem(9)?.SetUIActive(!t.HasOverFlowExpReach),
        this.GetCurrentSelectedState());
    this.SetSelectState(e);
  }
  OnSelect() {
    this.SetSelectState(!0), this.qft();
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
      (this.Gft = void 0),
      (this.Pe = void 0),
      (this.Nft = !1),
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
      (this.Gft = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.gNe = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(7),
        this.sGe,
      ));
  }
  Oft(t) {
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
  kft(t) {
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
      (t =
        ConfigManager_1.ConfigManager.CalabashConfig.GetIntensifyCaptureGuarantee() -
        ModelManager_1.ModelManager.CalabashModel.GetIdentifyGuaranteeCount()) <=
      0
        ? 0
        : t;
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
  Fft(t) {
    this.GetItem(3)?.SetUIActive(!0),
      this.GetText(4)?.SetText(t.CostCount.toString()),
      this.GetText(2)?.SetUIActive(!1),
      this.GetItem(6)?.SetUIActive(!1);
  }
  Vft(t) {
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
    const r = new Array();
    t?.forEach((t, e) => {
      var i;
      0 < t &&
        (((i = new CalabashAttributeContentData()).Type = 2),
        (i.Key = e),
        (i.Value = t),
        r.push(i));
    }),
      this.gNe?.RefreshByData(r);
  }
  Hft() {
    this.Pe?.CurrentSelect
      ? this.GetExtendToggle(0)?.SetToggleState(1)
      : this.GetExtendToggle(0)?.SetToggleState(0);
  }
  Refresh(t, e, i) {
    switch (
      ((this.Pe = t),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Name),
      this.GetItem(5)?.SetUIActive(2 === t.Type && t.IsUp),
      this.Hft(),
      t.Type)
    ) {
      case 0:
        this.Oft(t);
        break;
      case 1:
        this.kft(t);
        break;
      case 3:
        this.Fft(t);
        break;
      case 2:
        this.Vft(t);
    }
    this.Nft !== t.CurrentSelect &&
      ((this.Nft = t.CurrentSelect), this.jft(this.Nft));
  }
  jft(t) {
    this.Gft?.PlaySequencePurely(t ? "Show" : "Hide");
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
    var r, s;
    0 === t.Type
      ? (this.GetText(0)?.SetText(t.StringKey),
        this.GetText(1)?.SetText(t.StringValue))
      : 2 === t.Type &&
        ((r = t.Key),
        (t = t.Value),
        (r = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(r)),
        (s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r.Name)),
        this.GetText(0)?.SetText(s),
        this.GetText(0)?.SetColor(UE.Color.FromHex(r.DropColor)),
        this.GetText(1)?.SetText(
          StringUtils_1.StringUtils.Format("{0}%", t.toString()),
        ),
        this.GetText(1)?.SetColor(UE.Color.FromHex(r.DropColor)));
  }
}
exports.CalabashAttributeContentItem = CalabashAttributeContentItem;
class CalabashLevelUpTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.Wft = void 0),
      (this.Kft = void 0),
      (this.Qft = void 0),
      (this.Xft = void 0),
      (this.DFe = void 0),
      (this.$ft = []),
      (this.Yft = void 0),
      (this.Jft = 0),
      (this.zft = -1),
      (this._9s = !0),
      (this.ift = () => {
        var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(160);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          t,
        );
      }),
      (this.Zft = (t, e, i) => {
        var r = new CalabashGrid();
        return (
          r.CreateThenShowByActor(t),
          (r.ButtonFunction = this.ept),
          (r.ItemCurve = this.Yft),
          r
        );
      }),
      (this.rOe = () =>
        new CalabashLevelUpRewardItemGrid_1.CalabashLevelUpRewardItemGrid()),
      (this.tpt = () => new CalabashAttributeItem()),
      (this.iVe = () => {
        CalabashController_1.CalabashController.RequestCalabashLevelReward(
          this.Jft,
        );
      }),
      (this.ipt = (e) => {
        if ("CommonRewardView" === e) {
          var i =
            CommonParamById_1.configCommonParamById.GetIntConfig(
              "StrengthItemId",
            );
          let t = !1;
          for (const a of this.$ft)
            if (i === a.ItemData[0].ItemId) {
              t = !0;
              break;
            }
          if (t) {
            e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(i);
            if (e && e.Parameters) {
              let t = 0;
              for (var [, r] of e.Parameters) {
                t = r;
                break;
              }
              if (0 !== t) {
                var s,
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
                    ((s = {
                      Title: "PrefabTextItem_HuluStaminaUp_Text",
                      StrengthUpgradeData: {
                        MaxStrength: (e =
                          FormationAttributeController_1.FormationAttributeController.GetBaseMax(
                            1,
                          )),
                      },
                      AttributeInfo: [
                        {
                          Name: (s =
                            ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
                              RoleDefine_1.STRENGTH_MAX_ID,
                            )).Name,
                          IconPath: s.Icon,
                          ShowArrow: !0,
                          PreText: Math.floor((e - t) / 100).toString(),
                          CurText: Math.floor(e / 100).toString(),
                        },
                      ],
                    }),
                    RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
                      s,
                    ));
                }
              }
            }
          }
        }
      }),
      (this.ept = (t) => {
        (this.Jft = t),
          this.Wft.GetCurrentSelectIndex() !== t && this.Wft.AttachToIndex(t),
          this.opt();
      }),
      (this.rpt = (t) => {
        (this.zft = t.Type === this.zft ? -1 : t.Type), this.npt();
      }),
      (this.spt = () => {
        this.apt(), this.hpt(), this.lpt();
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
    ]),
      (this.BtnBindInfo = [
        [6, this.iVe],
        [2, this.ift],
      ]);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GetCalabashReward,
      this.spt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.ipt,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GetCalabashReward,
      this.spt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.ipt,
      );
  }
  async OnCreateAsync() {
    var t =
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "CalabashCurve",
        ),
      t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat);
    this.Yft = await t.Promise;
  }
  OnStart() {
    (this.zft = -1),
      (this.Wft = new NoCircleAttachView_1.NoCircleAttachView(
        this.GetItem(0).GetOwner(),
      ));
    var t = this.GetItem(1);
    t.SetUIActive(!1),
      this.Wft.CreateItems(t.GetOwner(), 0, this.Zft),
      (this.DFe = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(5),
        this.rOe,
      )),
      (this.Qft = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(4),
        this.tpt,
      ));
  }
  OnBeforeShow() {
    this.apt(this._9s), (this._9s = !1), this.lpt();
  }
  opt() {
    this.hpt();
  }
  hpt() {
    this.jqe(), this._pt(), this.npt();
  }
  lpt() {
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
        this.Jft,
      ).RewardId;
    if (t <= 0) this.DFe?.SetActive(!1);
    else {
      var t =
          ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreview(t),
        i =
          (this.DFe?.SetActive(!0),
          ModelManager_1.ModelManager.CalabashModel.GetReceiveRewardStateByLevel(
            this.Jft,
          ));
      let e = 0;
      for (const r of t) {
        let t = void 0;
        e < this.$ft.length
          ? (t = this.$ft[e])
          : ((t = new CalabashLevelUpRewardItemGrid_1.CalabashRewardItemData()),
            this.$ft.push(t)),
          (t.ReceiveState = i),
          (t.ItemData = [{ ItemId: r[0], IncId: 0 }, r[1]]),
          e++;
      }
      this.DFe?.RefreshByData(this.$ft);
    }
  }
  _pt() {
    var t,
      e =
        ModelManager_1.ModelManager.CalabashModel.GetReceiveRewardStateByLevel(
          this.Jft,
        );
    this.GetButton(6).RootUIComp.SetUIActive(2 === e),
      this.GetItem(8).SetUIActive(1 === e),
      this.GetItem(7).SetUIActive(3 === e),
      1 === e &&
        ((e = this.GetText(9)),
        this.Kft[this.Jft].HasOverFlowExpReach
          ? ((t =
              ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
                this.Jft,
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
  npt() {
    if (!this.Xft) {
      this.Xft = new Array(4);
      for (let t = 0; t < this.Xft.length; t++)
        this.Xft[t] = new CalabashAttributeData();
    }
    var t = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
      e = t >= this.Jft;
    let i = this.Xft[0];
    (i.Type = 0),
      (i.Name = "PrefabTextItem_1948060625_Text"),
      (i.IsCost = !1),
      (i.IsUp = !1);
    var r = ModelManager_1.ModelManager.CalabashModel.GetCatchGainByLevel(
        this.Jft,
      ),
      s =
        ((i.Value = new LguiUtil_1.TableTextArgNew(
          "Text_ExplorationDegree_Text",
          Math.ceil(r / 10),
        )),
        e ||
          ((s =
            ModelManager_1.ModelManager.CalabashModel.GetCatchGainByLevel(t)),
          (i.IsUp = s < r)),
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
          t,
        )),
      t = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
        this.Jft,
      ),
      a =
        (((i = this.Xft[1]).Type = 1),
        (i.Name = "PrefabTextItem_HuluTempCatchGain_Text"),
        (i.IsCost = !1),
        (i.IsUp = !1),
        t.TempCatchGain),
      r =
        (a <= r
          ? (i.Value = new LguiUtil_1.TableTextArgNew(
              "PrefabTextItem_HuluTempCatchGainDisable_Text",
            ))
          : ((i.Value = new LguiUtil_1.TableTextArgNew(
              "Text_ExplorationDegree_Text",
              Math.ceil(a / 10),
            )),
            e || ((r = s.TempCatchGain), (i.IsUp = r < a))),
        ((i = this.Xft[2]).Type = 2),
        (i.Name = "PrefabTextItem_3681645418_Text"),
        (i.IsCost = !1),
        (i.IsUp = !1),
        t.QualityDescription),
      r =
        ((i.Value = new LguiUtil_1.TableTextArgNew(r)),
        e || ((a = s.QualityDescription), (i.IsUp = r !== a)),
        ((i = this.Xft[3]).Type = 3),
        (i.Name = "PrefabTextItem_HuluCostLimit_Text"),
        (i.IsCost = !0),
        (i.IsUp = !1),
        t.Cost);
    (i.CostCount = r),
      e || ((a = s.Cost), (i.IsUp = a < r)),
      this.Xft.forEach((t) => {
        (t.ClickCallBack = this.rpt),
          (t.CurrentSelect = this.zft === t.Type),
          (t.CurrentSelectLevel = this.Jft);
      }),
      this.Qft?.RefreshByData(this.Xft);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e;
    if (1 === t.length || isNaN(Number(t[0])))
      return (e = this.Qft?.GetItemByIndex(Number(t[0]))) ? [e, e] : void 0;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        t,
      ]);
  }
  apt(t = !1) {
    var s = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
      a = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp(),
      h = ModelManager_1.ModelManager.CalabashModel.GetCalabashMaxLevel();
    this.Kft || (this.Kft = new Array(h));
    let o = 0;
    for (let r = 0; r <= h; r++) {
      var n =
        ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashConfigByLevel(
          r,
        ).LevelUpExp;
      let t = 0,
        e = 0,
        i =
          (r < s
            ? ((t = n), (e = n))
            : ((t = Math.min(n, a - o)), (e = 0), (o += n)),
          this.Kft[r]);
      i || ((i = new CalabashGridData()), (this.Kft[r] = i)),
        (i.Level = r),
        (i.OverFlowExp = t),
        (i.LimitExp = e),
        (i.MaxExp = n),
        (i.IsMaxLevel = r === h),
        0 === r
          ? (i.HasOverFlowExpReach = !0)
          : ((n = this.Kft[r - 1]),
            (i.HasOverFlowExpReach = n.OverFlowExp === n.MaxExp));
    }
    if (t)
      this.Wft.ReloadView(this.Kft.length, this.Kft),
        this.Wft.AttachToIndex(s, !0);
    else
      for (const e of this.Wft.GetItems()) e.SetData(this.Kft), e.RefreshItem();
  }
}
exports.CalabashLevelUpTabView = CalabashLevelUpTabView;
//# sourceMappingURL=CalabashLevelUpTabView.js.map
