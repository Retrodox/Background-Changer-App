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