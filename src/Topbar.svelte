<script>

function closeApp() {
    window.close();
}

function minimizeApp() {
    console.log('minimize');
    window.api.minimize();
}

</script>
<div class="title-bar">
    <div class="button-container">
        <button class="minimize-btn" on:click={minimizeApp}>-</button>
    </div>
    <div class="button-container">
        <button class="close-btn" on:click={closeApp}>X</button>
    </div>
</div>
<style>
.title-bar {
    -webkit-app-region: drag;
    display: flex;
    justify-content: right;
    width: 100%;
    background-color: #3949ab; /* Indigo background */
    padding: .01px; /* Reduce padding to make the bar smaller */
    border-top-left-radius: 10px; /* Rounded border for the top left corner */
    border-top-right-radius: 10px; /* Rounded border for the top right corner */
	border: 7px solid #3949ab;
}

.button-container {
    -webkit-app-region: no-drag;
  	display: flex;
  	justify-content: center;
  	align-items: center;
}

.title-bar .minimize-btn, .close-btn {
    -webkit-app-region: no-drag;
  	background-color: transparent;
  	border: none;
  	color: #ffffff; /* White text */
  	font-size: 0.8em; /* Reduce font size to make the buttons smaller */
  	cursor: pointer;
}
.close-btn:hover {
		background-color: #1a237e; /* Dark Indigo on hover */
	}
.minimize-btn:hover {
		background-color: #1a237e; /* Dark Indigo on hover */
	}
</style>
