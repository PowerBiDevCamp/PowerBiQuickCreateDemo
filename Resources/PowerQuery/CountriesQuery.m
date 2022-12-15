section Section1; 
shared Table = let
    Source = Csv.Document(Web.Contents("https://github.com/PowerBiDevCamp/PowerBiQuickCreateDemo/raw/main/Data/Countries.csv"),[Delimiter=",", Columns=7, Encoding=65001, QuoteStyle=QuoteStyle.None]),
    PromotedHeaders = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    ChangedType = Table.TransformColumnTypes(PromotedHeaders,{{"Population", Int64.Type}, {"Urban Population", Percentage.Type}, {"Land Size", Int64.Type}, {"Poupulation Density", type number}, {"Yearly GNP", Currency.Type}})
in
    ChangedType;