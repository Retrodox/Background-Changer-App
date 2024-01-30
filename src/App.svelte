<script>
	import Topbar from './Topbar.svelte'
	let colors = ['#b259e4', '#4d1bf2', '#f2c803', '#1749c3', '#c81d75', '#97f006', '#b2501c', '#d9e526', '#c1f268', '#dd7738', '#fcee4e', '#0ec990', '#977a08', '#72cf36', '#10c272', '#febd2b', '#5d01bc', '#21df13', '#e7fa14', '#1cb223', '#f707f7', '#ea634a', '#0a9868', '#434acc', '#99076b', '#d84f8a', '#d10be1', '#3974f5', '#2664f2', '#9fa005', '#2501e8', '#9e05a2', '#3cb3dc', '#18bd35', '#9641db', '#d60e6b', '#25ec2d', '#df5b4f', '#edd102', '#1685ac', '#1934e5', '#b808c1', '#30e074', '#084398', '#fb2d63', '#2af922', '#288aee', '#ffce4f', '#4609a1', '#1bf23b']; // Array of 50 vibrant colors
	let index = 0;

	function getNextColor() {
		const color = colors[index];
		index = (index + 1) % colors.length; // Cycle through the array
		return color;
	}

	let color1 = getNextColor();
	let color2 = getNextColor();
	let color3 = getNextColor();

	setInterval(() => {
		color1 = getNextColor();
		setTimeout(() => color2 = getNextColor(), 500);
		setTimeout(() => color3 = getNextColor(), 1000);
	}, 1500);

	function exitApp() {
		window.close();
	}
</script>

<div class="app-background">
	<Topbar />
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
</div>

<style>
	.app-background {
		border-radius: 10px;
		position: fixed; /* Position it relative to the viewport */
		top: 0; /* Stick it to the top */
		left: 0; /* Stick it to the left */
		right: 0; /* Stick it to the right */
		bottom: 0; /* Stick it to the bottom */
		text-align: center;
		padding: 0; /* Set padding to 0 */
		margin: 0; /* Set margin to 0 */
		background-color:#C4E1F1;  /* Updated Light blue background */
		user-select: none; /* Prevent text selection */
		display: flex; /* Use flexbox layout */
		flex-direction: column; /* Stack children vertically */
		justify-content: flex-start; /* Align children to the top */
		align-items: center; /* Center children horizontally */
		box-sizing: border-box; /* Include padding in the width and height */
		border: 5px solid #3949ab; /* Add border line with color #3949ab and size 1px */
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
		.app-background {
			max-width: none;
		}
	}
</style>