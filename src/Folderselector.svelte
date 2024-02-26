<script>
    import { onMount } from 'svelte';
    export let onFolderSelect; // Accept a callback function as a prop
  
    let folderPath = '';
    let errorMessage = ''; // A variable to hold an error message if no images are found
  
    onMount(() => {
        window.api.receive('select-folder-response', (path, isEmpty, isInvalid) => {
            if (isEmpty) {
              errorMessage = 'Empty';
            } else if (isInvalid) {
              errorMessage = 'Invalid';
            } else {
              errorMessage = '';
              folderPath = path;
            }
        });
    });
  
    function openFolderDialog() {
        window.api.send('select-folder');
    };
  
    function handleFolderSelection(event) {
      const files = event.target.files;
      if (files.length > 0) {
        folderPath = files[0].webkitRelativePath.split('/')[0];
        
        let hasImageFiles = false;
        let hasNonImageFiles = false;
  
        for (let file of files) {
          const extension = file.name.split('.').pop().toLowerCase();
          if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg'].includes(extension)) {
            hasImageFiles = true;
          } else {
            hasNonImageFiles = true;
          }
  
          if (hasImageFiles && hasNonImageFiles) break; // Both types of files found, no need to continue checking
        }
  
        if (!hasImageFiles && !hasNonImageFiles) {
          errorMessage = 'Empty'; // Folder is empty
        } else if (hasImageFiles && !hasNonImageFiles) {
          errorMessage = ''; // Valid folder with only image files
        } else {
          errorMessage = 'Invalid'; // Folder contains non-image files or is mixed
        }
      } else {
        errorMessage = 'No folder was selected';
      }
    }
  
    // Add a function to reset the input value
    function resetInput() {
      document.getElementById('folderSelector').value = '';
    }
  </script>
  
  <button class="app-button" on:click={openFolderDialog}>Select Pictures Folder</button>
  <input type="file" id="folderSelector" webkitdirectory directory style="display: none;" on:change={handleFolderSelection} />
  
  <div class="scroll-container">
<p class="folder-path"><span class="folder-name-selected">Folder Name Selected: </span>{#if errorMessage === 'Empty' || errorMessage === 'Invalid'}
    {errorMessage}
{:else if folderPath}
    {folderPath}
{:else}
    
{/if}
</p>
  </div>

