function addTableHighlighter() {
  (function($) {

    jQuery("tr").click(function() {
      changeRowColour(jQuery(this));
    });
    jQuery("th").click(function() {
      changeColumnColour(jQuery(this));
    });

    alert("Click on table row to change table row color\n or \nclick on cell in table header to change table column color");

    var colors = [ "red", "yellow", "green", "blue", "brown" ];

    function changeRowColour($tr) {
      changeAndGetColor($tr);
    }

    function changeAndGetColor($elem) {
      var colorIndex = $elem.attr("data-color");
      if (colorIndex) {
        colorIndex++;
        colorIndex = colorIndex % colors.length;
        if (colorIndex == 0) {
          $elem.removeAttr("data-color");
          $elem.css("background-color", "");
          return "";
        }
      } else {
        colorIndex = 0;
      }
      $elem.attr("data-color", colorIndex);
      var color = colors[colorIndex];
      $elem.css("background-color", color);
      return color;
    }

    function changeColumnColour($th) {
      var color = changeAndGetColor($th);
      var minCellIndex = getColumnIndex($th);
      var maxCellIndex = minCellIndex + getColspan($th) - 1;
      var rows = $th.parent().nextAll();
      jQuery.each(rows, function(index, row) {
        var cellIndex = -1;
        var cells = jQuery(row).children();
        jQuery.each(cells, function(index2, cell) {
          cellIndex = cellIndex + getColspan(cell);
          //index2 = parseInt(index2);
          if (minCellIndex <= cellIndex && cellIndex <= maxCellIndex) {
            jQuery(cell).css("background-color", color);
          }
        });
      });
    }

    function getColumnIndex($th) {
      var cellIndex = 0;
      var previousCells = $th.prevAll("th");
      jQuery.each(previousCells, function(index, prevTh) {
        cellIndex = cellIndex + getColspan(prevTh);
      });
      return cellIndex;
    }

    function getColspan(cell) {
      var colspan = jQuery(cell).attr("colspan");
      return (colspan ? parseInt(colspan) : 1);
    }
  })(jQuery.noConflict());
}
