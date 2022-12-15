section Section1;

shared Table = let
    RosterUrl = "[NFL_ROSTER_URL]",
    Source = Web.Contents(RosterUrl),
    ExtractedHtmlTable = Html.Table(
        Source,
        {
            {"Column1", "th:nth-child(1), td:nth-child(1)"},
            {"Column2", "th:nth-child(2), td:nth-child(2)"},
            {"Column3", "th:nth-child(3), td:nth-child(3)"},
            {"Column4", "th:nth-child(4), td:nth-child(4)"},
            {"Column5", "th:nth-child(5), td:nth-child(5)"},
            {"Column6", "th:nth-child(6), td:nth-child(6)"},
            {"Column7", "th:nth-child(7), td:nth-child(7)"},
            {"Column8", "th:nth-child(8), td:nth-child(8)"}
        },
        [RowSelector="table:has(caption:contains(Active)) > * > tr"]),
    PromotedHeaders = Table.PromoteHeaders(ExtractedHtmlTable, [PromoteAllScalars=true]),
    RenamedColumns = Table.RenameColumns(PromotedHeaders,{{"#", "Number"}, {"HT", "Raw Height"}, {"WT", "Weight"}}),
    ChangedType = Table.TransformColumnTypes(RenamedColumns,{{"Age", Int64.Type}}),
    ReplacedValue = Table.ReplaceValue(ChangedType,"R","0",Replacer.ReplaceText,{"Exp"}),
    RenamedColumns1 = Table.RenameColumns(ReplacedValue,{{"Exp", "Years of Experience"}}),
    SplitColumnByDelimiter = Table.SplitColumn(RenamedColumns1, "Raw Height", Splitter.SplitTextByDelimiter("-", QuoteStyle.Csv), {"HeightInFeet", "HeightInInches"}),
    ChangedType1 = Table.TransformColumnTypes(SplitColumnByDelimiter,{{"HeightInFeet", Int64.Type}, {"HeightInInches", Int64.Type}}),
    AddedCustom = Table.AddColumn(ChangedType1, "Height (Inches)", each ([HeightInFeet]*12) + [HeightInInches]),
    ChangedType2 = Table.TransformColumnTypes(AddedCustom,{{"Height (Inches)", Int64.Type}}),
    RemovedColumns = Table.RemoveColumns(ChangedType2,{"HeightInFeet", "HeightInInches"}),
    RenamedColumns2 = Table.RenameColumns(RemovedColumns,{{"Pos", "Position Code"}, {"Years of Experience", "Experience (Years)"}}),
    ChangedType3 = Table.TransformColumnTypes(RenamedColumns2,{{"Weight", Int64.Type}, {"Experience (Years)", Int64.Type}}),
    Output = Table.RenameColumns(ChangedType3,{{"Weight", "Weight (Pounds)"}})
in
    Output;