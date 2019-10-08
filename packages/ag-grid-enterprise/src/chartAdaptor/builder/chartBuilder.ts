import {
    _,
    ILabelFormattingOptions,
    AxisOptions,
    BarSeriesOptions,
    AreaSeriesOptions,
    CartesianChartOptions,
    DropShadowOptions,
    LineSeriesOptions,
    ScatterSeriesOptions,
    PieSeriesOptions,
    DoughnutChartOptions,
    ChartOptions,
    BarChartOptions,
    AreaChartOptions,
    LegendOptions,
    PolarChartOptions,
    LineChartOptions,
    ScatterChartOptions,
    PieChartOptions,
    SeriesOptions,
    CaptionOptions,
    CartesianSeriesType,
    PolarSeriesType,
    SeriesType,
    FontWeight,
} from "ag-grid-community";

import { CartesianChart, CartesianChartLayout } from "../../charts/chart/cartesianChart";
import { PolarChart } from "../../charts/chart/polarChart";
import { LineSeries } from "../../charts/chart/series/lineSeries";
import { ScatterSeries } from "../../charts/chart/series/scatterSeries";
import { BarSeries } from "../../charts/chart/series/barSeries";
import { AreaSeries } from "../../charts/chart/series/areaSeries";
import { PieSeries } from "../../charts/chart/series/pieSeries";
import { Chart } from "../../charts/chart/chart";
import { Series } from "../../charts/chart/series/series";
import { DropShadow } from "../../charts/scene/dropShadow";
import { CategoryAxis } from "../../charts/chart/axis/categoryAxis";
import { NumberAxis } from "../../charts/chart/axis/numberAxis";
import { Padding } from "../../charts/util/padding";
import { Legend } from "../../charts/chart/legend";
import { Caption } from "../../charts/caption";
import { GroupedCategoryAxis } from "../../charts/chart/axis/groupedCategoryAxis";
import { GroupedCategoryChart, GroupedCategoryChartAxis } from "../../charts/chart/groupedCategoryChart";
import { Axis } from "../../charts/axis";
import Scale from "../../charts/scale/scale";

export class ChartBuilder {
    private static createCartesianChart(parent: HTMLElement, xAxis: Axis<Scale<any, number>>, yAxis: Axis<Scale<any, number>>, document?: Document): CartesianChart {
        return new CartesianChart({
            parent,
            xAxis,
            yAxis,
            document,
        });
    }

    private static createGroupedCategoryChart(parent: HTMLElement, xAxis: GroupedCategoryChartAxis, yAxis: GroupedCategoryChartAxis, document?: Document): GroupedCategoryChart {
        return new GroupedCategoryChart({
            parent,
            xAxis,
            yAxis,
            document,
        });
    }

    static createBarChart(parent: HTMLElement, options: BarChartOptions): CartesianChart {
        const chart = this.createCartesianChart(
            parent,
            ChartBuilder.createNumberAxis(options.xAxis),
            ChartBuilder.createCategoryAxis(options.yAxis),
            options.document);

        chart.layout = CartesianChartLayout.Horizontal;

        return ChartBuilder.initCartesianChart(chart, options, "bar");
    }

    static createColumnChart(parent: HTMLElement, options: BarChartOptions): CartesianChart {
        const chart = this.createCartesianChart(
            parent,
            ChartBuilder.createCategoryAxis(options.xAxis),
            ChartBuilder.createNumberAxis(options.yAxis),
            options.document);

        return ChartBuilder.initCartesianChart(chart, options, "bar");
    }

    static createLineChart(parent: HTMLElement, options: LineChartOptions): CartesianChart {
        const chart = this.createCartesianChart(
            parent,
            ChartBuilder.createCategoryAxis(options.xAxis),
            ChartBuilder.createNumberAxis(options.yAxis),
            options.document);

        return ChartBuilder.initCartesianChart(chart, options, "line");
    }

    static createScatterChart(parent: HTMLElement, options: ScatterChartOptions): CartesianChart {
        const chart = this.createCartesianChart(
            parent,
            ChartBuilder.createNumberAxis(options.xAxis),
            ChartBuilder.createNumberAxis(options.yAxis),
            options.document);

        return ChartBuilder.initCartesianChart(chart, options, "scatter");
    }

    static createAreaChart(parent: HTMLElement, options: AreaChartOptions): CartesianChart {
        const chart = this.createCartesianChart(
            parent,
            ChartBuilder.createCategoryAxis(options.xAxis),
            ChartBuilder.createNumberAxis(options.yAxis),
            options.document);

        return ChartBuilder.initCartesianChart(chart, options, "area");
    }

    private static createPolarChart(parent: HTMLElement, options: PolarChartOptions): PolarChart {
        return ChartBuilder.initPolarChart(new PolarChart({ parent }), options);
    }

    static createDoughnutChart(parent: HTMLElement, options: DoughnutChartOptions): PolarChart {
        return this.createPolarChart(parent, options);
    }

    static createPieChart(parent: HTMLElement, options: PieChartOptions): PolarChart {
        return this.createPolarChart(parent, options);
    }

    static createGroupedColumnChart(parent: HTMLElement, options: BarChartOptions): GroupedCategoryChart {
        const chart = this.createGroupedCategoryChart(
            parent,
            ChartBuilder.createGroupedAxis(options.xAxis),
            ChartBuilder.createNumberAxis(options.yAxis),
            options.document
        );

        return ChartBuilder.initGroupedCategoryChart(chart, options, "bar");
    }

    static createGroupedBarChart(parent: HTMLElement, options: BarChartOptions): GroupedCategoryChart {
        const chart = this.createGroupedCategoryChart(
            parent,
            ChartBuilder.createNumberAxis(options.xAxis),
            ChartBuilder.createGroupedAxis(options.yAxis),
            options.document
        );

        chart.layout = CartesianChartLayout.Horizontal;

        return ChartBuilder.initGroupedCategoryChart(chart, options, "bar");
    }

    static createGroupedLineChart(parent: HTMLElement, options: BarChartOptions): GroupedCategoryChart {
        const chart = this.createGroupedCategoryChart(
            parent,
            ChartBuilder.createGroupedAxis(options.xAxis),
            ChartBuilder.createNumberAxis(options.yAxis),
            options.document,
        );

        return ChartBuilder.initGroupedCategoryChart(chart, options, "line");
    }

    static createGroupedAreaChart(parent: HTMLElement, options: AreaChartOptions): GroupedCategoryChart {
        const chart = this.createGroupedCategoryChart(
            parent,
            ChartBuilder.createGroupedAxis(options.xAxis),
            ChartBuilder.createNumberAxis(options.yAxis),
            options.document
        );

        return ChartBuilder.initGroupedCategoryChart(chart, options, "area");
    }

    static createLineSeries = (options: LineSeriesOptions): LineSeries => new LineSeries();

    static createScatterSeries = (options: ScatterSeriesOptions): ScatterSeries => new ScatterSeries();

    static createSeries(options: { type?: SeriesType }, type?: SeriesType) {
        switch (type || options && options.type) {
            case "line":
                return ChartBuilder.initLineSeries(new LineSeries(), options);
            case "scatter":
                return ChartBuilder.initScatterSeries(new ScatterSeries(), options);
            case "bar":
                return ChartBuilder.initBarSeries(new BarSeries(), options);
            case "area":
                return ChartBuilder.initAreaSeries(new AreaSeries(), options);
            case "pie":
                return ChartBuilder.initPieSeries(new PieSeries(), options);
            default:
                return null;
        }
    }

    static initChart<C extends Chart>(chart: C, options: ChartOptions, seriesType?: SeriesType) {
        _.copyPropertiesIfPresent(options, chart, "width", "height", "legendPosition", "legendPadding", "data", "tooltipClass");
        _.copyPropertyIfPresent(options, chart, "title", t => ChartBuilder.createTitle(t!));
        _.copyPropertyIfPresent(options, chart, "subtitle", t => ChartBuilder.createSubtitle(t!));
        _.copyPropertyIfPresent(options, chart, "series", s => s!.map(series => ChartBuilder.createSeries(series, seriesType)).filter(x => x));
        _.copyPropertyIfPresent(options, chart, "padding", p => new Padding(p!.top, p!.right, p!.bottom, p!.left));

        if (options.background !== undefined) {
            _.copyPropertiesIfPresent(options.background, chart.background, "fill", "visible");
        }

        if (options.legend !== undefined) {
            ChartBuilder.initLegend(chart.legend, options.legend);
        }

        return chart;
    }

    static initCartesianChart(chart: CartesianChart, options: CartesianChartOptions, seriesType?: CartesianSeriesType) {
        ChartBuilder.initChart(chart, options, seriesType);

        return chart;
    }

    static initPolarChart(chart: PolarChart, options: PolarChartOptions, seriesType?: PolarSeriesType) {
        ChartBuilder.initChart(chart, options, seriesType);


        return chart;
    }

    static initGroupedCategoryChart(chart: GroupedCategoryChart, options: CartesianChartOptions, seriesType?: CartesianSeriesType) {
        ChartBuilder.initChart(chart, options, seriesType);

        return chart;
    }

    static initSeries<S extends Series<any>>(series: S, options: SeriesOptions) {
        _.copyPropertiesIfPresent(options, series, "visible", "showInLegend", "tooltipEnabled", "data");

        return series;
    }

    static initLineSeries(series: LineSeries, options: LineSeriesOptions) {
        ChartBuilder.initSeries(series, options);

        _.copyPropertiesIfPresent(
            options,
            series,
            "title",
            "xField",
            "yField",
            "fill",
            "stroke",
            "strokeWidth",
            "highlightStyle",
            "marker",
            "markerSize",
            "markerStrokeWidth",
            "tooltipRenderer");

        return series;
    }

    static initScatterSeries(series: ScatterSeries, options: ScatterSeriesOptions) {
        ChartBuilder.initSeries(series, options);

        _.copyPropertiesIfPresent(
            options,
            series,
            "title",
            "xField",
            "yField",
            "radiusField",
            "labelField",
            "xFieldName",
            "yFieldName",
            "radiusFieldName",
            "labelFieldName",
            "fill",
            "stroke",
            "fillOpacity",
            "strokeOpacity",
            "highlightStyle",
            "markerSize",
            "minMarkerSize",
            "markerStrokeWidth",
            "tooltipRenderer");

        return series;
    }

    static initLabelFormatting<T extends ILabelFormattingOptions>(series: T, options: ILabelFormattingOptions) {
        _.copyPropertiesIfPresent(options, series, "labelFontStyle", "labelFontWeight", "labelFontSize", "labelFontFamily", "labelColor");
    }

    static initBarSeries(series: BarSeries, options: BarSeriesOptions) {
        ChartBuilder.initSeries(series, options);
        ChartBuilder.initLabelFormatting(series, options);

        _.copyPropertiesIfPresent(
            options,
            series,
            "xField",
            "yFields",
            "yFieldNames",
            "grouped",
            "normalizedTo",
            "fills",
            "strokes",
            "fillOpacity",
            "strokeOpacity",
            "strokeWidth",
            "highlightStyle",
            "labelEnabled",
            "labelFormatter",
            "tooltipRenderer");

        _.copyPropertyIfPresent(options, series, "shadow", s => ChartBuilder.createDropShadow(s));

        return series;
    }

    static initAreaSeries(series: AreaSeries, options: AreaSeriesOptions) {
        ChartBuilder.initSeries(series, options);

        _.copyPropertiesIfPresent(
            options,
            series,
            "xField",
            "yFields",
            "yFieldNames",
            "normalizedTo",
            "fills",
            "strokes",
            "fillOpacity",
            "strokeOpacity",
            "strokeWidth",
            "highlightStyle",
            "marker",
            "markerSize",
            "markerStrokeWidth",
            "tooltipRenderer");

        _.copyPropertyIfPresent(options, series, "shadow", s => ChartBuilder.createDropShadow(s));

        return series;
    }

    static initPieSeries(series: PieSeries, options: PieSeriesOptions) {
        ChartBuilder.initSeries(series, options);
        ChartBuilder.initLabelFormatting(series, options);

        _.copyPropertyIfPresent(options, series, "title", t => ChartBuilder.createPieTitle(t!));

        _.copyPropertiesIfPresent(
            options,
            series,
            "calloutColors",
            "calloutStrokeWidth",
            "calloutLength",
            "labelMinAngle",
            "angleField",
            "radiusField",
            "labelField",
            "labelEnabled",
            "fills",
            "strokes",
            "fillOpacity",
            "strokeOpacity",
            "highlightStyle",
            "rotation",
            "outerRadiusOffset",
            "innerRadiusOffset",
            "strokeWidth",
            "tooltipRenderer");

        _.copyPropertyIfPresent(options, series, "shadow", s => ChartBuilder.createDropShadow(s));

        return series;
    }

    static initLegend(legend: Legend, options: LegendOptions) {
        ChartBuilder.initLabelFormatting(legend, options);

        _.copyPropertiesIfPresent(
            options,
            legend,
            "enabled",
            "markerStrokeWidth",
            "markerSize",
            "markerPadding",
            "itemPaddingX",
            "itemPaddingY");
    }

    static setDefaultFontOptions(options: CaptionOptions, fontSize = 16, fontWeight: FontWeight = "bold", fontFamily = "Verdana, sans-serif") {
        if (options.fontSize === undefined) {
            options.fontSize = fontSize;
        }

        if (options.fontWeight === undefined) {
            options.fontWeight = fontWeight;
        }

        if (options.fontFamily === undefined) {
            options.fontFamily = fontFamily;
        }
    }

    static createTitle(options: CaptionOptions) {
        options = Object.create(options);

        if (options.text === undefined) {
            options.text = "Title";
        }

        this.setDefaultFontOptions(options);

        return ChartBuilder.createCaption(options);
    }


    static createSubtitle(options: CaptionOptions) {
        options = Object.create(options);

        if (options.text === undefined) {
            options.text = 'Subtitle';
        }

        this.setDefaultFontOptions(options, 12);

        return ChartBuilder.createCaption(options);
    }

    static createPieTitle(options: CaptionOptions) {
        options = Object.create(options);

        this.setDefaultFontOptions(options, 12);

        return ChartBuilder.createCaption(options);
    }

    static createCaption(options: CaptionOptions) {
        const caption = new Caption();

        _.copyPropertiesIfPresent(
            options, caption, "text", "fontStyle", "fontWeight", "fontSize", "fontFamily", "color", "enabled");

        return caption;
    }

    static createDropShadow = (options: DropShadowOptions = {}): DropShadow => new DropShadow(options);

    static populateAxisProperties<T extends { title?: Caption }>(axis: T, options: AxisOptions) {
        for (const name in options) {
            if (name === 'type') {
                continue;
            }

            if (name === 'title' && options.title) {
                axis.title = ChartBuilder.createTitle(options.title);
                continue;
            }

            _.copyPropertyIfPresent(options, axis, name as keyof AxisOptions);
        }
    }

    static createAxis(options: AxisOptions): CategoryAxis | NumberAxis {
        let axis: CategoryAxis | NumberAxis | undefined = undefined;

        switch (options.type) {
            case "category":
                axis = new CategoryAxis();
                break;
            case "number":
                axis = new NumberAxis();
                break;
        }

        if (!axis) {
            throw new Error("Unknown axis type.");
        }

        this.populateAxisProperties(axis, options);

        return axis;
    }

    static createNumberAxis(options: AxisOptions): NumberAxis {
        const axis = new NumberAxis();

        this.populateAxisProperties(axis, options);

        return axis;
    }

    static createCategoryAxis(options: AxisOptions): CategoryAxis {
        const axis = new CategoryAxis();

        this.populateAxisProperties(axis, options);

        return axis;
    }

    static createGroupedAxis(options: AxisOptions): GroupedCategoryAxis {
        const axis = new GroupedCategoryAxis();

        this.populateAxisProperties(axis, options);

        return axis;
    }
}
