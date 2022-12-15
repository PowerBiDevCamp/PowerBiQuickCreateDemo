section Section1; 

shared Table = let    
  Source = Web.Contents("https://en.wikipedia.org/wiki/List_of_highest-grossing_films"),
  ExtractedTableFromHtml = Html.Table(Source, 
    {
      {"Column1", "TABLE.wikitable.sortable.plainrowheaders > * > TR > :nth-child(1)"}, 
      {"Column2", "TABLE.wikitable.sortable.plainrowheaders > * > TR > :nth-child(2)"}, 
      {"Column3", "TABLE.wikitable.sortable.plainrowheaders > * > TR > :nth-child(3)"}, 
      {"Column4", "TABLE.wikitable.sortable.plainrowheaders > * > TR > :nth-child(4)"}, 
      {"Column5", "TABLE.wikitable.sortable.plainrowheaders > * > TR > :nth-child(5)"}
    }, 
    [RowSelector="TABLE.wikitable.sortable.plainrowheaders > * > TR"]),
  PromotedHeaders = Table.PromoteHeaders(ExtractedTableFromHtml, [PromoteAllScalars=true]),
  ChangedType = Table.TransformColumnTypes(PromotedHeaders,
    {
      {"Rank", Int64.Type}, 
      {"Worldwide gross", Currency.Type}, 
      {"Year", Int64.Type}
    }),
  QueryOutput = Table.RemoveRowsWithErrors(ChangedType, {"Worldwide gross"}) 
in
  QueryOutput;