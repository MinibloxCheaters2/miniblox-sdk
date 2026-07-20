export var SlotActionType;
(function (SlotActionType) {
    /**
     * Left-click pickup/place (clickedButton == 0).
     * - If slot is empty: places held item
     * - If slot has item and held item is same type: combines stacks
     * - If slot has item and held item is different: swaps them
     * - If slot ID is -999 (outside container): drops entire held stack
     */
    SlotActionType[SlotActionType["PICKUP_LEFT"] = 0] = "PICKUP_LEFT";
    /**
     * Right-click pickup/place (clickedButton == 1).
     * - SPECIAL: Acts as QUICK_MOVE in this JS version (shift-click behavior)
     * - transferStackInSlot() is called to move item to player inventory
     * - If same item type exists in slot, retries the action
     * - If slot ID is -999: drops 1 item from held stack
     */
    SlotActionType[SlotActionType["PICKUP_RIGHT"] = 1] = "PICKUP_RIGHT";
    /**
     * Number key swap (0-9 for hotbar slots).
     * - Swaps clicked slot with hotbar slot specified by clickedButton
     * - If hotbar slot is empty and slot is valid: places item there
     * - If both slot and hotbar have items: exchanges them
     * - If hotbar inventory is different player: adds to empty slots first
     */
    SlotActionType[SlotActionType["SWAP"] = 2] = "SWAP";
    /**
     * Creative mode item duplication.
     * - Requires: player.abilities.creative == true AND held stack is null
     * - Clones clicked slot's item to full max stack size
     * - Places cloned full-size stack in cursor
     */
    SlotActionType[SlotActionType["CLONE"] = 3] = "CLONE";
    /**
     * Drop key action.
     * - Requires: held stack is null AND slot ID >= 0
     * - clickedButton == 0: drops 1 item
     * - clickedButton == 1: drops entire slot stack
     * - Calls onPickupFromSlot() before dropping
     */
    SlotActionType[SlotActionType["THROW"] = 4] = "THROW";
    /**
     * Drag to distribute items across multiple slots.
     * - dragEvent 0: Start drag, validates drag mode
     *   - dragMode 0: even split across slots
     *   - dragMode 1: one item per slot
     *   - dragMode 2: creative fill (creative mode only)
     * - dragEvent 1: Collecting phase, adds valid slots to dragSlots set
     *   - Requires: slot stackSize > dragSlots.size
     * - dragEvent 2: Distribution phase, splits held stack across collected slots
     *   - Uses dragMode to compute distribution
     *   - Requires: held stackSize >= dragSlots.size
     */
    SlotActionType[SlotActionType["QUICK_CRAFT"] = 5] = "QUICK_CRAFT";
    /**
     * Shift-click to auto-move items (double-click in Java, mode 6 in JS).
     * - Scans through slots in two passes:
     *   - Pass 1 (if clickedButton==0): forward scan, prioritizes partially-filled stacks
     *   - Pass 2: continues to fill stacks to max capacity
     *   - If clickedButton==1: reverse scan (from end to start)
     * - Merges with existing stacks or finds empty slots
     * - Respects canMergeSlot() and canAddItemToSlot() checks
     * - Calls detectAndSendChanges() at end
     */
    SlotActionType[SlotActionType["QUICK_MOVE"] = 6] = "QUICK_MOVE";
})(SlotActionType || (SlotActionType = {}));
