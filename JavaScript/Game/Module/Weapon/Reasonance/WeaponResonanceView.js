"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponResonanceView = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../../UiModel/UiModelUtil"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  WeaponController_1 = require("../WeaponController"),
  SingleItemSelect_1 = require("./SingleItemSelect");
class WeaponResonanceView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.B1o = !1),
      (this.p9t = void 0),
      (this.zOo = void 0),
      (this.DOo = 0),
      (this.N2i = void 0),
      (this.O2i = void 0),
      (this.ZOo = (e, i) => {
        var t;
        e === this.DOo &&
          ((this.N2i = UiSceneManager_1.UiSceneManager.GetWeaponObserver()),
          (this.O2i =
            UiSceneManager_1.UiSceneManager.GetWeaponScabbardObserver()),
          WeaponController_1.WeaponController.PlayWeaponRenderingMaterial(
            "WeaponResonanceUpMaterialController",
            this.N2i,
            this.O2i,
          ),
          (t = this.N2i.Model),
          UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(
            t,
            "WeaponResonanceUpEffect",
          ),
          this.zOo.ClearSelectData(),
          this.pmt(),
          (t = { WeaponIncId: e, LastLevel: i }),
          UiManager_1.UiManager.OpenView("WeaponResonanceSuccessView", t));
      }),
      (this.LNt = () =>
        ModelManager_1.ModelManager.WeaponModel.GetResonanceMaterialList(
          this.DOo,
        )),
      (this.jOo = () => {
        this.pmt();
      }),
      (this.eko = () => {
        const t = this.zOo.GetCurrentSelectedData();
        if (t)
          if (this.B1o) {
            var i =
              ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
                this.DOo,
              );
            let e = 21;
            var n = t.IncId,
              r =
                (0 < n &&
                  ((r =
                    ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
                      n,
                    )),
                  (o =
                    ModelManager_1.ModelManager.WeaponModel.IsWeaponHighLevel(
                      r,
                    )),
                  (r =
                    ModelManager_1.ModelManager.WeaponModel.HasWeaponResonance(
                      r,
                    )),
                  o && r ? (e = 27) : r ? (e = 25) : o && (e = 26)),
                ConfigManager_1.ConfigManager.WeaponConfig),
              o =
                0 < n
                  ? r.GetWeaponName(
                      r.GetWeaponConfigByItemId(t.ItemId).WeaponName,
                    )
                  : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                      ConfigManager_1.ConfigManager.ItemConfig.GetConfig(
                        t.ItemId,
                      ).Name,
                    ),
              n = r.GetWeaponName(i.GetWeaponConfig().WeaponName),
              r = this.tko();
            const a = i.GetIncId();
            i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e);
            i.SetTextArgs(o, n, r.toString()),
              i.FunctionMap.set(2, () => {
                var e = [],
                  i = { T5n: t.IncId, o9n: 1, f8n: t.ItemId };
                e.push(i),
                  WeaponController_1.WeaponController.SendPbResonUpRequest(
                    a,
                    e,
                  );
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                i,
              );
          } else
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "WeaponResonanceNoEnoughMoneyText",
            );
        else
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "WeaponSelectMaterialTipsText",
          );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UITexture],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIText],
      [13, UE.UIText],
    ];
  }
  OnStart() {
    (this.DOo = this.ExtraParams),
      (this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(6))),
      this.p9t.SetFunction(this.eko),
      this.iko(),
      this.oko();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WeaponResonanceSuccess,
      this.ZOo,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WeaponResonanceSuccess,
      this.ZOo,
    );
  }
  iko() {
    (this.zOo = new SingleItemSelect_1.SingleItemSelect()),
      this.zOo.Init(this.GetItem(5)),
      this.zOo.SetUseWayId(28),
      this.zOo.SetInitSortToggleState(!0),
      this.zOo.SetGetItemListFunction(this.LNt),
      this.zOo.SetItemSelectChangeCallBack(this.jOo);
  }
  oko() {
    this.SetItemIcon(this.GetTexture(7), ItemDefines_1.EItemId.Gold);
  }
  rko(e, i) {
    let t = 0;
    this.zOo.GetCurrentSelectedData() &&
      ((n = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        this.DOo,
      ).GetWeaponConfig()),
      (t = ModelManager_1.ModelManager.WeaponModel.GetResonanceNeedMoney(
        n.ResonId,
        e,
        i,
      )));
    var n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      ItemDefines_1.EItemId.Gold,
    );
    this.GetText(8).SetText(t.toString()),
      (this.B1o = n >= t),
      (this.GetText(8).useChangeColor = !this.B1o);
  }
  pmt() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        this.DOo,
      ),
      i = e.GetWeaponConfig(),
      e = e.GetResonanceLevel(),
      t = this.tko(),
      n = e === i.ResonLevelLimit,
      r =
        (this.GetItem(3).SetUIActive(!n),
        this.GetText(1).SetUIActive(!n),
        this.GetItem(10).SetUIActive(!n),
        this.GetItem(4).SetUIActive(!n),
        this.p9t.GetRootItem().SetUIActive(!n),
        this.GetItem(9).SetUIActive(n),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(0),
          "WeaponResonanceLevelText",
          e,
        ),
        ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
          i,
          e,
        ));
    let o = void 0;
    if (!n) {
      LguiUtil_1.LguiUtil.SetLocalText(
        this.GetText(1),
        "WeaponResonanceLevelText",
        t,
      ),
        this.rko(e, t);
      var a = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(
          i,
          t,
        ),
        s =
          ((o = []),
          CommonParamById_1.configCommonParamById.GetStringConfig(
            "HighlightColor",
          ));
      for (let i = 0; i < r.length; i++) {
        var l = r[i],
          h = a[i];
        let e = void 0;
        (e =
          l === h
            ? l.toString()
            : StringUtils_1.StringUtils.Format(
                "{0}-><color=#{1}>{2}</color>",
                l,
                s,
                h,
              )),
          o.push(e);
      }
    }
    (o = o ?? r),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Desc, ...o);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(3),
      this.Refresh();
  }
  Refresh() {
    this.RefreshName(), this.pmt();
  }
  RefreshName() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        this.DOo,
      ),
      i = e.GetWeaponConfig(),
      t = i.WeaponName,
      n = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
        i.QualityId,
      ),
      n = UE.Color.FromHex(n.DropColor),
      n =
        (this.GetText(12).SetColor(n),
        this.GetText(12).ShowTextNew(t),
        e.GetResonanceLevel()),
      t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(
        i.ResonId,
        n,
      );
    t &&
      this.GetText(13).SetText(
        ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceDesc(
          t.Name,
        ),
      );
  }
  tko() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        this.DOo,
      ),
      i = e.GetResonanceLevel(),
      t = this.zOo.GetCurrentSelectedData();
    return t && 0 !== t.IncId
      ? ((t =
          ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
            t.IncId,
          ).GetResonanceLevel() + e.GetResonanceLevel()),
        (e = e.GetWeaponConfig().ResonLevelLimit) < t ? e : t)
      : i + 1;
  }
}
exports.WeaponResonanceView = WeaponResonanceView;
//# sourceMappingURL=WeaponResonanceView.js.map
