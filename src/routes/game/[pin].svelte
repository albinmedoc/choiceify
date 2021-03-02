<script context="module" lang="ts">
    export function preload({ params }) {
        const pin: string = params.pin;
        return { pin };

        /* 
        We want to check the pin here,
        so the user doesnt need to load
        the page to get a message if
        there is a game with that id
        or not. 
        */
    }
</script>

<script lang="ts">
    import { io } from 'socket.io-client';
    const socket = io();

    export let pin: string;

    let choices = undefined;
    let choices_container: HTMLDivElement;

    socket.emit('playerJoined', pin);

    socket.on('noGameFound', () => {
        console.log('No game was found with that pin');
    });

    socket.on('gameStarted', (gameInfo) => {
        choices = gameInfo.choices;
    });

    const selectChoice = (event: Event) => {
        let choice_btn = event.target as HTMLButtonElement;
        if(choice_btn.classList.contains('selected')){
            choice_btn.classList.remove('selected');
        }
        else {
            choice_btn.classList.add('selected');
        }
    }

    const submitChoices = () => {
        const selected_buttons = Array.from(
            choices_container.querySelectorAll('button.selected')
        ) as HTMLButtonElement[];

        const selected_choices = selected_buttons.map((btn) => {
            return btn.innerText;
        });

        socket.emit('choicesSubmitted', selected_choices);
    }
</script>

{#if !choices}
    <h1>You are in the game!</h1>
    <h3>Waiting for host to start the game</h3>
{:else}
    <div id="choices" bind:this={choices_container}>
        {#each choices as choice}
            <button on:click={selectChoice} class="choice">{choice}</button>
        {/each}
    </div>
    <button on:click={submitChoices}>Submit</button>
{/if}

<style>
    button.selected {
        background-color: green;
    }
</style>
