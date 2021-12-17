// Type definitions for @ag-grid-community/core v26.2.1
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { BeanStub } from "../context/beanStub";
export declare class UndoRedoService extends BeanStub {
    private focusService;
    private gridApi;
    private rowModel;
    private pinnedRowModel;
    private cellPositionUtils;
    private rowPositionUtils;
    private cellValueChanges;
    private undoStack;
    private redoStack;
    private activeCellEdit;
    private activeRowEdit;
    private isPasting;
    private isFilling;
    init(): void;
    private onCellValueChanged;
    private clearStacks;
    getCurrentUndoStackSize(): number;
    getCurrentRedoStackSize(): number;
    undo(): void;
    redo(): void;
    private processAction;
    private processRangeAndCellFocus;
    private setLastFocusedCell;
    private addRowEditingListeners;
    private addCellEditingListeners;
    private addPasteListeners;
    private addFillListeners;
    private pushActionsToUndoStack;
    private getRowNode;
}
