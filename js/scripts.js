var OptionsEnum = Object.freeze({KEEP_DIFFERENCES: 1, REMOVE_DIFFERENCES: 2});

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
       } else if (selection == "remove-differences") {
           comparisonSteps.push(OptionsEnum.REMOVE_DIFFERENCES);
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
            } else if (entry == OptionsEnum.REMOVE_DIFFERENCES) {
                comparisonType = "Ignore Differences";
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
        $("#results-errors li").remove();
        
        var errorCount = 0;
        
        var memoryWidth = 0;
        if ($("#memory-width").val() <= 0) {
            displayError("Error: Memory width must be at least 1 character.");
            errorCount++;
        } else {
            memoryWidth = $("#memory-width").val();
        }
        
        if (memoryFiles.length < 2) {
            displayError("Error: The number of files to compare must be at least 2.");
            errorCount++;
        }
        
        if (comparisonSteps.length != memoryFiles.length-1) {
            displayError("Error: The number of comparison steps(" + comparisonSteps.length + ") should be equal to one less than the number of files("+ memoryFiles.length +").");
            errorCount++;
        }
        
        // Go through each file to make sure they are the same length
        var initialLength = memoryFiles[0].data.length;
        for (var index = 1; index < memoryFiles.length; ++index) {
            if (memoryFiles[index].data.length != initialLength) {
                displayError("Error: The length of each file must be the same.");
                errorCount++;
                break;
            }
        }
        
        if (errorCount > 0) {
            return;
        }
        
        // Go through each comparison step, setting non-matching values to null
        var resultFile = memoryFiles[0].data;
        for (var index = 1; index < memoryFiles.length; ++index) {
            var comparisonType = comparisonSteps[index-1];
            if (comparisonType == OptionsEnum.KEEP_DIFFERENCES) {
                resultFile = keepDifferences(resultFile, memoryFiles[index], memoryWidth); 
            } else if (comparisonType == OptionsEnum.REMOVE_DIFFERENCES) {
                resultFile = removeDifferences(resultFile, memoryFiles[index], memoryWidth);
            }
        }
        
        // Finally, display non-null values with their offsets
    });
    
    /**
     * Sets any memory values that haven't changed to null and returns the resulting file.
     */
    function keepDifferences(originalFile, nextFile, memoryWidth) {
        var resultFile = originalFile;
        
        return resultFile;
    }
    
    /**
     * Sets any memory values that have changed to null and returns the resulting file.
     */
    function removeDifferences(originalFile, nextFile, memoryWidth) {
        var resultFile = originalFile;
        
        return resultFile;
    }
    
    /**
     * Displays an error message under Process.
     */
    function displayError(message) {
        $("#results-errors").append("<li>" + message + "</li>");
    }
});