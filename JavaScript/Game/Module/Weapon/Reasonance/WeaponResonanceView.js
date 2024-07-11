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
      (this.Nlo = !1),
      (this.p8t = void 0),
      (this.tOo = void 0),
      (this.ANo = 0),
      (this.Nki = void 0),
      (this.Oki = void 0),
      (this.iOo = (e, i) => {
        var t;
        e === this.ANo &&
          ((this.Nki = UiSceneManager_1.UiSceneManager.GetWeaponObserver()),
          (this.Oki =
            UiSceneManager_1.UiSceneManager.GetWeaponScabbardObserver()),
          WeaponController_1.WeaponController.PlayWeaponRenderingMaterial(
            "WeaponResonanceUpMaterialController",
            this.Nki,
            this.Oki,
          ),
          (t = this.Nki.Model),
          UiModelUtil_1.UiModelUtil.PlayEffectOnRoot(
            t,
            "WeaponResonanceUpEffect",
          ),
          this.tOo.ClearSelectData(),
          this.sct(),
          (t = { WeaponIncId: e, LastLevel: i }),
          UiManager_1.UiManager.OpenView("WeaponResonanceSuccessView", t));
      }),
      (this.TGt = () =>
        ModelManager_1.ModelManager.WeaponModel.GetResonanceMaterialList(
          this.ANo,
        )),
      (this.QNo = () => {
        this.sct();
      }),
      (this.oOo = () => {
        const t = this.tOo.GetCurrentSelectedData();
        if (t)
          if (this.Nlo) {
            var i =
              ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
                this.ANo,
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
              r = this.rOo();
            const a = i.GetIncId();
            i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(e);
            i.SetTextArgs(o, n, r.toString()),
              i.FunctionMap.set(2, () => {
                var e = [],
                  i = { Ykn: t.IncId, I5n: 1, G3n: t.ItemId };
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
    (this.ANo = this.ExtraParams),
      (this.p8t = new ButtonItem_1.ButtonItem(this.GetItem(6))),
      this.p8t.SetFunction(this.oOo),
      this.nOo(),
      this.sOo();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WeaponResonanceSuccess,
      this.iOo,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WeaponResonanceSuccess,
      this.iOo,
    );
  }
  nOo() {
    (this.tOo = new SingleItemSelect_1.SingleItemSelect()),
      this.tOo.Init(this.GetItem(5)),
      this.tOo.SetUseWayId(28),
      this.tOo.SetInitSortToggleState(!0),
      this.tOo.SetGetItemListFunction(this.TGt),
      this.tOo.SetItemSelectChangeCallBack(this.QNo);
  }
  sOo() {
    this.SetItemIcon(this.GetTexture(7), ItemDefines_1.EItemId.Gold);
  }
  aOo(e, i) {
    let t = 0;
    this.tOo.GetCurrentSelectedData() &&
      ((n = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        this.ANo,
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
      (this.Nlo = n >= t),
      (this.GetText(8).useChangeColor = !this.Nlo);
  }
  sct() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        this.ANo,
      ),
      i = e.GetWeaponConfig(),
      e = e.GetResonanceLevel(),
      t = this.rOo(),
      n = e === i.ResonLevelLimit,
      r =
        (this.GetItem(3).SetUIActive(!n),
        this.GetText(1).SetUIActive(!n),
        this.GetItem(10).SetUIActive(!n),
        this.GetItem(4).SetUIActive(!n),
        this.p8t.GetRootItem().SetUIActive(!n),
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
        this.aOo(e, t);
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
    this.RefreshName(), this.sct();
  }
  RefreshName() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        this.ANo,
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
  rOo() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
        this.ANo,
      ),
      i = e.GetResonanceLevel(),
      t = this.tOo.GetCurrentSelectedData();
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
