
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.InventoryModel=void 0;const ModelBase_1=require("../../../Core/Framework/ModelBase"),TimerSystem_1=require("../../../Core/Timer/TimerSystem"),StringUtils_1=require("../../../Core/Utils/StringUtils"),EventDefine_1=require("../../Common/Event/EventDefine"),EventSystem_1=require("../../Common/Event/EventSystem"),LocalStorageDefine_1=require("../../Common/LocalStorageDefine"),TimeUtil_1=require("../../Common/TimeUtil"),ConfigManager_1=require("../../Manager/ConfigManager"),ControllerHolder_1=require("../../Manager/ControllerHolder"),ModelManager_1=require("../../Manager/ModelManager"),ItemDefines_1=require("../Item/Data/ItemDefines"),CommonItemData_1=require("./ItemData/CommonItemData"),PhantomItemData_1=require("./ItemData/PhantomItemData"),WeaponItemData_1=require("./ItemData/WeaponItemData"),ItemMainTypeMapping_1=require("./ItemMainTypeMapping"),CD_TIME_REASON="限时物品主动添加倒计时 [ConfigId:{0}, UniqueId:{1}]";class InventoryModel extends ModelBase_1.ModelBase{constructor(){super(...arguments),this.Hui=0,this.jui=void 0,this.Wui=0,this.Kui=void 0,this.Qui=void 0,this.Xui=new Map,this.djt=new Map,this.$ui=new Map,this.Yui=new Map,this.Jui=new Map,this.Zui=void 0,this.eci=new Set,this.tci=new Map,this.IsConfirmDestruction=!1}OnInit(){return!(ConfigManager_1.ConfigManager.InventoryConfig.GetAllMainTypeConfig().length<=0||(this.SetSelectedTypeIndex(0),0))}OnClear(){this.ClearAllItemData();for(const e of this.tci.values())TimerSystem_1.RealTimeTimerSystem.Remove(e);return this.tci.clear(),!0}SetInventoryTabOpenIdList(e){var t=e.indexOf(0);-1<t&&e.splice(t,1),this.Qui=e}GetOpenIdMainTypeConfig(){var e=[];for(const r of this.Qui){var t=ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(r);e.push(t)}return e}ici(e){var t=e.GetType();let r=this.Yui.get(t);r||(r=new Set,this.Yui.set(t,r)),r.add(e)}oci(e){var t=e.GetType(),t=this.Yui.get(t);t&&t.delete(e)}rci(e){this.Yui.delete(e)}nci(e){var t=e.GetMainType();let r=this.Jui.get(t);r||(r=new ItemMainTypeMapping_1.ItemMainTypeMapping(t),this.Jui.set(t,r)),r.Add(e)}sci(e){var t=e.GetMainType(),t=this.Jui.get(t);t&&t.Remove(e)}aci(e){this.Jui.delete(e)}NewCommonItemData(e,t,r=0,a){t=new CommonItemData_1.CommonItemData(e,r,t,0,a);let o=this.Xui.get(e);(o=o||new Map).set(r,t),this.Xui.set(e,o),this.ici(t),this.nci(t),this.hci(t)}RemoveCommonItemData(e,t=0){var r,a=this.Xui.get(e);a&&(r=a.get(t))&&(a.delete(t),0===a.size&&this.Xui.delete(e),this.oci(r),this.sci(r))}RemoveCommonItemDataAndSaveNewList(e){for(const t of e)this.RemoveCommonItemData(t.ItemId,t.IncId),this.RemoveNewCommonItem(t.ItemId,t.IncId),this.RemoveRedDotCommonItem(t.ItemId,t.IncId);this.SaveNewCommonItemConfigIdList(),this.SaveNewAttributeItemUniqueIdList(),this.SaveRedDotCommonItemConfigIdList(),this.SaveRedDotAttributeItemUniqueIdList()}hci(e){if(0<e.GetEndTime())if(e.IsOverTime())ControllerHolder_1.ControllerHolder.InventoryController.InvalidItemRemoveRequest();else{const r=e.GetEndTime();var t;this.eci.has(r)||(t=Math.max(r-TimeUtil_1.TimeUtil.GetServerTimeStamp(),TimerSystem_1.MIN_TIME),e=StringUtils_1.StringUtils.Format(CD_TIME_REASON,e.GetConfigId().toString(),e.GetUniqueId().toString()),(t=TimerSystem_1.RealTimeTimerSystem.Delay(()=>{this.lci(r)},t,void 0,e))&&(this.eci.add(r),this.tci.set(r,t)))}}lci(e){ControllerHolder_1.ControllerHolder.InventoryController.InvalidItemRemoveRequest();var t=this.tci.get(e);t&&(TimerSystem_1.RealTimeTimerSystem.Remove(t),this.tci.delete(e)),this.eci.delete(e)}GetCommonItemData(e,t=0){e=this.Xui.get(e);if(e){e=e.get(t);if(!e||e.IsValid())return e}}GetAllCommonItemDataByConfigId(e){var t=[],e=this.Xui.get(e);if(e)for(const r of Array.from(e.values()))r.IsValid()&&t.push(r);return t}GetItemDataBaseByConfigId(e){switch(ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e)){case 2:return this.GetAllWeaponItemDataByConfigId(e);case 3:return this.GetAllPhantomItemDataByConfigId(e);default:return this.GetAllCommonItemDataByConfigId(e)}}GetAllPhantomItemDataByConfigId(e){var t=[];for(const r of this.GetAllPhantomItemDataIterator())r.GetConfigId()===e&&t.push(r);return t}GetAllWeaponItemDataByConfigId(e){var t=[];for(const r of this.GetWeaponItemDataList())r.GetConfigId()===e&&t.push(r);return t}GetAllWeaponItemDataByQualityAndType(e,t){var r=[];for(const a of this.GetWeaponItemDataList())0!==e&&a.GetQuality()!==e||0!==t&&a.GetConfig().WeaponType!==t||r.push(a);return r}GetCommonItemCount(e,t=0){e=this.GetCommonItemData(e,t);return e?e.GetCount():0}NewWeaponItemData(e,t,r){e=new WeaponItemData_1.WeaponItemData(e,t,r,2);this.djt.set(t,e),this.ici(e),this.nci(e)}RemoveWeaponItemData(e){var t=this.djt.get(e);t&&(this.djt.delete(e),this.oci(t),this.sci(t))}RemoveWeaponItemDataAndSaveNewList(e){for(const t of e)this.RemoveWeaponItemData(t),this.RemoveNewAttributeItem(t),this.RemoveRedDotAttributeItem(t);this.SaveNewAttributeItemUniqueIdList(),this.SaveRedDotAttributeItemUniqueIdList()}GetWeaponItemData(e){return this.djt.get(e)}NewPhantomItemData(e,t,r){e=new PhantomItemData_1.PhantomItemData(e,t,r,3);this.$ui.set(t,e),this.ici(e),this.nci(e)}RemovePhantomItemData(e){var t=this.$ui.get(e);t&&(this.$ui.delete(e),this.oci(t),this.sci(t))}RemovePhantomItemDataAndSaveNewList(e){for(const t of e)this.RemovePhantomItemData(t),this.RemoveNewAttributeItem(t),this.RemoveRedDotAttributeItem(t);this.SaveNewAttributeItemUniqueIdList(),this.SaveRedDotAttributeItemUniqueIdList()}GetPhantomItemData(e){return this.$ui.get(e)}ClearCommonItemData(){for(const r of this.Xui.values())for(const a of r.values()){var e=a.GetMainType(),t=a.GetType();this.aci(e),this.rci(t)}this.Xui.clear()}ClearWeaponItemData(){for(const r of this.djt.values()){var e=r.GetMainType(),t=r.GetType();this.aci(e),this.rci(t)}this.djt.clear()}ClearPhantomItemData(){for(const r of this.$ui.values()){var e=r.GetMainType(),t=r.GetType();this.aci(e),this.rci(t)}this.$ui.clear()}ClearAllItemData(){this.ClearCommonItemData(),this.ClearWeaponItemData(),this.ClearPhantomItemData(),this.Yui.clear(),this.Jui.clear()}GetAttributeItemData(e){let t=this.GetWeaponItemData(e);return t=t||this.GetPhantomItemData(e)}GetWeaponItemDataList(){var e=[];for(const t of this._ci())ModelManager_1.ModelManager.WeaponModel.IsWeaponUsedByUncommonRole(t.GetUniqueId())||e.push(t);return e}GetPhantomItemDataList(){var e=[];for(const t of this.$ui.values())e.push(t);return e}GetUnEquipPhantomItemDataList(){var e=this.GetPhantomItemDataList();const t=[];return e.forEach(e=>{ControllerHolder_1.ControllerHolder.PhantomBattleController.CheckIsEquip(e.GetUniqueId())||t.push(e)}),t}GetPhantomItemDataListByPhantomItemId(e){var t=[];for(const r of this.$ui.values())r.GetConfigId()===e&&t.push(r);return t}GetPhantomItemDataListByPhantomItem(e){const t=[];return e.forEach(e=>{e=new PhantomItemData_1.PhantomItemData(e.Ekn,e.Q5n,e.gDs,3);t.push(e)}),t}GetPhantomItemDataListByAddCountItemInfo(e){const t=[];return e.forEach(e=>{e=new PhantomItemData_1.PhantomItemData(e.Ekn,e.Q5n,0,3);t.push(e)}),t}GetCommonItemDataList(){var e=[];for(const t of this.Xui.values())for(const r of t.values())r.IsValid()&&e.push(r);return e}GetCommonItemByItemType(e){var t=[];for(const r of this.Xui.values())for(const a of r.values())a.GetType()===e&&a.IsValid()&&t.push(a);return t}GetCommonItemByShowType(e){var t=[];for(const r of this.Xui.values())for(const a of r.values())a.GetShowTypeList().includes(e)&&a.IsValid()&&t.push(a);return t}GetWeaponItemByItemType(e){var t=[];for(const r of this.GetWeaponItemDataList())r.GetType()===e&&t.push(r);return t}GetPhantomItemByItemType(e){var t=[];for(const r of this.$ui.values())r.GetType()===e&&t.push(r);return t}GetItemDataBase(e){var t=e.IncId;return 0<t?[this.GetAttributeItemData(t)]:this.GetItemDataBaseByConfigId(e.ItemId)}GetItemMainTypeMapping(e){return this.Jui.get(e)}GetItemDataBaseByMainType(e){var t=new Set,e=this.Jui.get(e);if(e)for(const r of e.GetSet())r.IsValid()&&t.add(r);return t}GetInventoryItemGridCountByMainType(e){var t;let r=0;for(const a of this.GetItemDataBaseByMainType(e))0!==a.GetType()&&(a instanceof CommonItemData_1.CommonItemData?(t=a.GetMaxStackCount())<=0||(r+=Math.ceil(a.GetCount()/t)):r+=1);return r}GetItemDataBaseByItemType(e){var t=new Set,e=this.Yui.get(e);if(e)for(const r of e)r.IsValid()&&t.add(r);return t}_ci(){return this.djt.values()}GetAllPhantomItemDataIterator(){return this.$ui.values()}SetSelectedItemViewData(e){this.Kui=e}SetCurrentLockItemUniqueId(e){this.Wui=e}GetSelectedItemData(){return this.Kui}get GetCurrentLockItemUniqueId(){return this.Wui}SetSelectedTypeIndex(e){this.Hui=e}GetSelectedTypeIndex(){return this.Hui}SetOutsideUniqueId(e){this.jui=e}GetOutsideUniqueId(){return this.jui}ClearOutsideUniqueId(){this.jui=void 0}GetItemCountByConfigId(e,t=0){if(e in ItemDefines_1.EItemId)return ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(e);switch(ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e)){case 2:return this.uci(e);case 3:return this.cci(e);case 6:return this.mci(e);case 8:return this.dci(e);default:return this.GetCommonItemCount(e,t)}}uci(e){let t=0;for(const r of this.GetWeaponItemDataList())r.GetConfigId()===e&&t++;return t}dci(e){return ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeCurrency(e)??0}cci(e){let t=0;for(const r of this.GetAllPhantomItemDataIterator())r.GetConfigId()===e&&t++;return t}mci(t){var r=ModelManager_1.ModelManager.PersonalModel.GetCardUnlockList(),a=r.length;for(let e=0;e<a;e++)if(r[e].CardId===t)return 1;return 0}TryAddNewCommonItem(e,t=0){return 0!==t?this.TryAddNewAttributeItem(t):!ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,e)&&(ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,e),EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGetNewItem,e),!0)}TryAddNewAttributeItem(e){return!ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,e)&&(ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,e),EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGetNewItem,e),!0)}RemoveNewCommonItem(e,t=0){return 0!==t?this.RemoveNewAttributeItem(t):ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,e)}RemoveNewAttributeItem(e){return ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,e)}SaveNewCommonItemConfigIdList(){return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem)}SaveNewAttributeItemUniqueIdList(){return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem)}IsNewCommonItem(e,t=0){return 0!==t?this.IsNewAttributeItem(t):ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItem,e)}IsNewAttributeItem(e){return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem,e)}GetNewAttributeItemUniqueIdList(){return ModelManager_1.ModelManager.NewFlagModel.GetNewFlagSet(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItem)}TryAddRedDotCommonItem(e,t=0){var r;return!ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,e)&&!!(r=this.GetCommonItemData(e,t))&&0!==r.GetRedDotDisableRule()&&(0!==t?ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot,t):ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,e),!0)}TryAddRedDotAttributeItem(e){var t;return!ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot,e)&&!!(t=this.GetAttributeItemData(e))&&0!==t.GetRedDotDisableRule()&&(ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot,e),!0)}HasRedDot(){var e=ModelManager_1.ModelManager.NewFlagModel,t=e.GetNewFlagSet(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot).size,e=e.GetNewFlagSet(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot).size;return 0<t||0<e}IsMainTypeHasRedDot(e){return this.GetItemMainTypeMapping(e)?.HasRedDot()??!1}IsCommonItemHasRedDot(e,t=0){return 0!==t?this.IsAttributeItemHasRedDot(t):ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,e)}IsAttributeItemHasRedDot(e){return ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot,e)}RemoveRedDotCommonItem(e,t=0){return 0!==t?this.RemoveRedDotAttributeItem(t):!!ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot,e)&&(EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveItemRedDot),!0)}RemoveRedDotAttributeItem(e){return!!ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot,e)&&(EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRemoveItemRedDot),!0)}SaveRedDotCommonItemConfigIdList(){return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryCommonItemRedDot)}SaveRedDotAttributeItemUniqueIdList(){return ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.InventoryAttributeItemRedDot)}SetAcquireData(e){this.Zui=e}GetAcquireData(){return this.Zui}CheckIsCoinEnough(e,t){for(const r of t)if(r.ItemId===e)return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e)>=r.Count;return!0}}exports.InventoryModel=InventoryModel;
//# sourceMappingURL=InventoryModel.js.map