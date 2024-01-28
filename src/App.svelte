<script>
	export let name;
	let color1 = getRandomColor();
	let color2 = getRandomColor();
	let color3 = getRandomColor();

	function getRandomColor() {
		return '#' + Math.floor(Math.random()*16777215).toString(16);
	}

	setInterval(() => {
		color1 = getRandomColor();
		setTimeout(() => color2 = getRandomColor(), 500);
		setTimeout(() => color3 = getRandomColor(), 1000);
	}, 1500);

	function exitApp() {
		window.close();
	}
</script>

<main>
	<div class="title-bar">
  		<button class="minimize-btn">-</button>
  		<button class="close-btn" on:click={exitApp}>X</button>
	</div>
	<h1 class="title">Background Changer</h1>
	<div class="line" style="background-color: {color1};"></div>
	<div class="line" style="background-color: {color2};"></div>
	<div class="line" style="background-color: {color3};"></div>
	<div style="margin-top: 20px;">
		<button>Play</button>
		<button>Pause</button>
	</div>
	<button>Select Pictures Folder</button>
	<button on:click={exitApp}>Exit</button>
</main>

<style>
	main {
		-webkit-app-region: drag;
		text-align: center;
		padding: 0; /* Set padding to 0 */
		width: 100%; /* Set width to 100% */
		height: 100%; /* Set height to 100% */
		box-sizing: border-box; /* Include padding in the width and height */
		margin: 0; /* Set margin to 0 */
		background-color: #e8eaf6; /* Light blue background */
		user-select: none; /* Prevent text selection */
		display: flex; /* Use flexbox layout */
		flex-direction: column; /* Stack children vertically */
		justify-content: flex-start; /* Align children to the top */
		align-items: center; /* Center children horizontally */
	}

	.title-bar {
  		display: flex;
  		justify-content: space-between;
  		width: 100%;
  		background-color: #3949ab; /* Indigo background */
  		padding: 2px; /* Reduce padding to make the bar smaller */
	}

	.minimize-btn, .close-btn {
  		background-color: transparent;
  		border: none;
  		color: #ffffff; /* White text */
  		font-size: 0.8em; /* Reduce font size to make the buttons smaller */
  		cursor: pointer;
	}

	.title {
		margin-bottom: 20px;
		color: #3949ab; /* White text */
		text-transform: uppercase;
		font-size: 2.25em;
		font-weight: bold; /* Bold text */
		font-family: 'Roboto', sans-serif;
		text-shadow: 1.5px 1.5px 2.75px #1a237e; /* Add text shadow */
	}

	.line {
		height: 5px;
		width: 100%;
		margin: 5px 0; /* Reduced space to 5px */
		transition: background-color 0.5s ease;
	}

	button {
		-webkit-app-region: no-drag;
		margin: 0.5em;
		padding: 0.5em 1em;
		font-size: 1em;
		border: none;
		border-radius: 5px;
		background-color: #3949ab; /* Indigo background */
		color: #ffffff; /* Light Indigo text */
		cursor: pointer;
		transition: background-color 0.3s ease;
		font-family: 'Roboto', sans-serif;
	}

	button:hover {
		background-color: #1a237e; /* Dark Indigo on hover */
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>