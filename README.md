# MemoryDifferenceAnalyzer
A tool to analyze memory dumps to pinpoint desired memory locations.

## How to use
Go to http://salgat.net/MemoryDifferenceAnalyzer/ and upload your memory dump text files. The only requirement is that they all be the same length. Once uploaded, select the sequence of comparisons you want to make. For example, if you want to only keep memory locations that have changed value, select "Keep Differences". If for the next comparison, you want to keep all memory locations that are now not changing, then select "Remove Differences". Finally, select the memory settings for the file, including the memory width (how many characters represent one block of memory, such as 8 for binary and 2 for hex for 1 byte memory blocks), the memory size (how many bytes each block of memory takes), and memory offset (the starting memory address for the memory dump). Click the "Process" button to return a list of all memory addresses that match the specified requirements.

## Purpose
This was created to help me compare large memory dumps for GameBoy RAM in order to isolate which memory locations related to certain changes in GameBoy games. For example, I could first create a memory dump, wait a moment, create another, use an item, create another memory dump, then finally wait and create one last memory dump. From this, I could use the following steps, "Remove Differences, Keep Differences, Remove Differences" to determine the memory location of the used item in the game's inventory.

## Notes
All files are only stored locally in memory, and are not uploaded to any servers (you can check the source to see no AJAX requests or Form submissions are made).