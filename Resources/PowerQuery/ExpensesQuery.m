section Section1;

shared Table = let
    Source = Csv.Document(Web.Contents("https://github.com/PowerBiDevCamp/PowerBiQuickCreateDemo/raw/main/Data/Expenses.csv"),[Delimiter=",", Columns=4, Encoding=65001, QuoteStyle=QuoteStyle.None]),
    PromotedHeaders = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    ChangedType = Table.TransformColumnTypes(PromotedHeaders,{{"Expense", type text}, {"Category", type text}, {"Date", type date}, {"Amount", Currency.Type}})
in
    ChangedType;