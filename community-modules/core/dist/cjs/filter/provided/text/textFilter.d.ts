// Type definitions for @ag-grid-community/core v26.2.1
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { SimpleFilter, ConditionPosition, ISimpleFilterParams, ISimpleFilterModel, ISimpleFilterModelType, Tuple } from '../simpleFilter';
import { AgInputTextField } from '../../../widgets/agInputTextField';
export interface TextFilterModel extends ISimpleFilterModel {
    /** Filter type is always `'text'` */
    filterType?: 'text';
    /**
     * The text value associated with the filter.
     * It's optional as custom filters may not have a text value.
     * */
    filter?: string | null;
    /**
     * The 2nd text value associated with the filter, if supported.
     * */
    filterTo?: string | null;
}
export interface TextComparator {
    (filter: string | null | undefined, gridValue: any, filterText: string | null): boolean;
}
export interface TextFormatter {
    (from?: string | null): string | null;
}
export interface ITextFilterParams extends ISimpleFilterParams {
    /**
     * Used to override how to filter based on the user input.
     */
    textCustomComparator?: TextComparator;
    /**
     * By default, text filtering is case-insensitive. Set this to `true` to make text filtering case-sensitive.
     * Default: `false`
     */
    caseSensitive?: boolean;
    /**
     * Formats the text before applying the filter compare logic.
     * Useful if you want to substitute accented characters, for example.
     */
    textFormatter?: (from: string) => string;
    /**
     * If `true`, the input that the user enters will be trimmed when the filter is applied, so any leading or trailing whitespace will be removed.
     * If only whitespace is entered, it will be left as-is.
     * If you enable `trimInput`, it is best to also increase the `debounceMs` to give users more time to enter text.
     * Default: `false`
     */
    trimInput?: boolean;
}
export declare class TextFilter extends SimpleFilter<TextFilterModel, string> {
    static DEFAULT_FILTER_OPTIONS: string[];
    static DEFAULT_FORMATTER: TextFormatter;
    static DEFAULT_LOWERCASE_FORMATTER: TextFormatter;
    static DEFAULT_COMPARATOR: TextComparator;
    private readonly eValueFrom1;
    private readonly eValueTo1;
    private readonly eValueFrom2;
    private readonly eValueTo2;
    private comparator;
    private formatter;
    private textFilterParams;
    constructor();
    static trimInput(value?: string | null): string | null | undefined;
    protected getDefaultDebounceMs(): number;
    protected setParams(params: ITextFilterParams): void;
    protected createCondition(position: ConditionPosition): TextFilterModel;
    protected getFilterType(): 'text';
    protected areSimpleModelsEqual(aSimple: TextFilterModel, bSimple: TextFilterModel): boolean;
    protected getInputs(): Tuple<AgInputTextField>[];
    protected getValues(position: ConditionPosition): Tuple<string>;
    protected getDefaultFilterOptions(): string[];
    protected createValueTemplate(position: ConditionPosition): string;
    protected mapValuesFromModel(filterModel: TextFilterModel | null): Tuple<string>;
    protected evaluateNullValue(filterType: ISimpleFilterModelType | null): boolean;
    protected evaluateNonNullValue(values: Tuple<string>, cellValue: string, filterModel: TextFilterModel): boolean;
}
