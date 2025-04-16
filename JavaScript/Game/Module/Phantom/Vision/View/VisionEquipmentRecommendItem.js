"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AttrContent = exports.VisionEquipmentRecommendItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  VisionRecommendModel_1 = require("../../PhantomBattle/VisionRecommendModel");
class VisionEquipmentRecommendItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Oo_ = new Array()),
      (this.Go_ = new Array()),
      (this.Fo_ = new Array()),
      (this.No_ = new Array()),
      (this.Vo_ = void 0),
      (this.jo_ = void 0),
      (this.O5t = 0),
      (this.ko_ = 0),
      (this.Ho_ = void 0),
      (this.jl_ = () => {
        var t =
          ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRecommendHelpGroupId();
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(t);
      }),
      (this.Yko = () => {
        (this.Oo_ = []), (this.Go_ = []), this.Wo_();
      }),
      (this.Qo_ = (s) => {
        if (1 === s.Type) {
          let e = !1,
            i = -1;
          for (let t = 0; t < this.Oo_.length; t++)
            if (
              this.Oo_[t].AttrId === s.AttrId &&
              this.Oo_[t].AddType === s.AddType
            ) {
              (e = !0), (i = t);
              break;
            }
          e
            ? this.Oo_.splice(i, 1)
            : (((t =
                new VisionRecommendModel_1.VisionSelectRecommendData()).AttrId =
                s.AttrId),
              (t.AddType = s.AddType),
              this.Oo_.push(t));
        } else {
          let e = !1,
            i = -1;
          for (let t = 0; t < this.Go_.length; t++)
            if (
              this.Go_[t].AttrId === s.AttrId &&
              this.Go_[t].AddType === s.AddType
            ) {
              (e = !0), (i = t);
              break;
            }
          var t;
          e
            ? this.Go_.splice(i, 1)
            : (((t =
                new VisionRecommendModel_1.VisionSelectRecommendData()).AttrId =
                s.AttrId),
              (t.AddType = s.AddType),
              this.Go_.push(t));
        }
        this.Wo_();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [4, this.Yko],
        [1, this.jl_],
      ]);
  }
  async OnCreateAsync() {
    (this.Vo_ = new RecommendAttrItem()),
      await this.Vo_.CreateByActorAsync(this.GetItem(2).GetOwner()),
      this.Vo_.SetActive(!0),
      (this.jo_ = new RecommendAttrItem()),
      await this.jo_.CreateByActorAsync(this.GetItem(3).GetOwner()),
      this.jo_.SetActive(!0);
  }
  BindOnChangeAttrCallBack(t) {
    this.Ho_ = t;
  }
  ChangeCost(t, e) {
    (this.O5t = t), (this.ko_ = e);
    e =
      ModelManager_1.ModelManager.VisionRecommendModel.GetRoleCostAttrRecommendInfo(
        e,
        t,
      );
    if (e) {
      var i = e.GetMainAttrRecommendInfo();
      for (let e = this.Oo_.length - 1; 0 <= e; e--) {
        let t = !1;
        for (const r of i)
          if (
            r.GetAttrId() === this.Oo_[e].AttrId &&
            r.GetAddType() === this.Oo_[e].AddType
          ) {
            t = !0;
            break;
          }
        t || this.Oo_.splice(e, 1);
      }
      var s = e.GetSubAttrRecommendInfo();
      for (let e = this.Go_.length - 1; 0 <= e; e--) {
        let t = !1;
        for (const n of s)
          if (
            n.GetAttrId() === this.Go_[e].AttrId &&
            n.GetAddType() === this.Go_[e].AddType
          ) {
            t = !0;
            break;
          }
        t || this.Go_.splice(e, 1);
      }
    }
    this.Wo_(), this.Pd_(t);
  }
  Pd_(t) {
    0 === t
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "PrefabTextItem_PhantomRecommendTarget_Text",
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "Text_FilterTextAll_Text",
          ),
        )
      : LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(0),
          "PrefabTextItem_PhantomRecommendTarget_Text",
          "COST" + t,
        );
  }
  Wo_() {
    var t =
      ModelManager_1.ModelManager.VisionRecommendModel.GetRoleCostAttrRecommendInfo(
        this.ko_,
        this.O5t,
      );
    if (
      ((ModelManager_1.ModelManager.VisionRecommendModel.CurrentSelectMainAttrArray =
        this.Oo_),
      (ModelManager_1.ModelManager.VisionRecommendModel.CurrentSelectSubAttrArray =
        this.Go_),
      t)
    ) {
      var e = t.GetMainAttrRecommendInfo();
      this.Fo_ = new Array();
      for (const r of e) {
        var i = new RecommendItemData();
        (i.AttrId = r.GetAttrId()),
          (i.AddType = r.GetAddType()),
          (i.CurrentSelectArray = this.Oo_),
          (i.UsageText = r.GetUsageText()),
          (i.Type = 1),
          (i.OnSelectCallBack = this.Qo_),
          this.Fo_.push(i);
      }
      this.Vo_?.Refresh(this.Fo_);
      e = t.GetSubAttrRecommendInfo();
      this.No_ = new Array();
      for (const n of e) {
        var s = new RecommendItemData();
        (s.AttrId = n.GetAttrId()),
          (s.AddType = n.GetAddType()),
          (s.CurrentSelectArray = this.Go_),
          (s.UsageText = n.GetUsageText()),
          (s.Type = 2),
          (s.OnSelectCallBack = this.Qo_),
          this.No_.push(s);
      }
      this.jo_?.Refresh(this.No_);
    }
    void 0 !== this.Ho_ && this.Ho_();
  }
  OnBeforeDestroy() {
    (ModelManager_1.ModelManager.VisionRecommendModel.CurrentSelectMainAttrArray =
      []),
      (ModelManager_1.ModelManager.VisionRecommendModel.CurrentSelectSubAttrArray =
        []);
  }
}
exports.VisionEquipmentRecommendItem = VisionEquipmentRecommendItem;
class RecommendItemData {
  constructor() {
    (this.AttrId = 0),
      (this.AddType = 0),
      (this.CurrentSelectArray = new Array()),
      (this.UsageText = ""),
      (this.Type = 0),
      (this.OnSelectCallBack = void 0);
  }
}
class RecommendAttrItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.eGe = void 0),
      (this.sGe = () => {
        return new AttrContent();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIVerticalLayout],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(0),
      this.sGe,
    );
  }
  Refresh(t) {
    this.eGe?.RefreshByData(t);
  }
}
class AttrContent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.$8i = void 0),
      (this.OnClickTogOption = () => {
        void 0 !== this.$8i &&
          void 0 !== this.$8i.OnSelectCallBack &&
          this.$8i.OnSelectCallBack(this.$8i);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.OnClickTogOption]]);
  }
  Refresh(t, e, i) {
    this.$8i = t;
    var s =
        ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
          t.AttrId,
        ),
      r =
        (this.SetTextureByPath(s.Icon, this.GetTexture(1)),
        2 === this.$8i.AddType),
      r = r && "" !== s.AnotherName ? s.AnotherName : s.Name,
      s = (this.GetText(2).ShowTextNew(r), t.UsageText);
    this.GetText(3).SetText(s);
    let n = !1;
    for (const o of t.CurrentSelectArray)
      if (o.AttrId === t.AttrId && o.AddType === t.AddType) {
        n = !0;
        break;
      }
    r = n ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(r);
  }
}
exports.AttrContent = AttrContent;
//# sourceMappingURL=VisionEquipmentRecommendItem.js.map
