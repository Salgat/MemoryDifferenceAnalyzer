var OptionsEnum = Object.freeze({KEEP_DIFFERENCES: 1, KEEP_CHANGES: 2});

var memoryFiles = [];
var comparisonSteps = [];

$("document").ready(function(){
    /**
     * Adds uploaded file to memoryFiles array.
     */
    $("#memory-file").change(function() {
        var reader = new FileReader();
        var file = $('#memory-file')[0].files[0];
        
        reader.onload = function(e) {
            memoryFiles.push({fileName: file.name, data: reader.result})
            updateFileList();
        }

        reader.readAsText(file);
    });
    
    /**
     * Updates displayed list of files to be compared.
     */
    function updateFileList() {
        $("#file-list li").remove();
        memoryFiles.forEach(function(entry) {
            $("#file-list").append("<li>" + entry.fileName + "</li>");
        });
    }
    
    /**
     * Removes all loaded files.
     */
    $("#clear-data").click(function() {
       memoryFiles = []; 
    });
    
    /**
     * Add a comparison step.
     */
    $("#difference-select").change(function() {
       var selection = $(this).val();
       if (selection == "keep-differences") {
           comparisonSteps.push(OptionsEnum.KEEP_DIFFERENCES);
       } else if (selection == "keep-changes") {
           comparisonSteps.push(OptionsEnum.KEEP_CHANGES);
       } else {
           
       }
       $(this).val('');
       
       updateComparisonDisplay();
    });
    
    /**
     * Updates displayed list of comparison steps.
     */
    function updateComparisonDisplay() {
        $("#comparison-list li").remove();
        comparisonSteps.forEach(function(entry) {
            var comparisonType = "";
            if (entry == OptionsEnum.KEEP_DIFFERENCES) {
                comparisonType = "Keep Differences";
            } else if (entry == OptionsEnum.KEEP_CHANGES) {
                comparisonType = "Keep Changes";
            }
            
            $("#comparison-list").append("<li>"+ comparisonType +"</li>");
        });
    }
    
    /**
     * Resets comparison steps.
     */
    $("#reset-comparison").click(function() {
        comparisonSteps = [];
        updateComparisonDisplay();
    });
    
    /**
     * Process file differences.
     */
    $("#process-diff").click(function() {
        if (comparisonSteps.length != memoryFiles.length-1) {
            $("#results-errors").text("Error: The number of comparison steps(" + comparisonSteps.length + ") should be equal to one less than the number of files("+ memoryFiles.length +").")
            return;
        }
    });
});