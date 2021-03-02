<script lang="ts">
    import { io } from 'socket.io-client';
    const socket = io();

    let choices_container: Element;
    let title: string;
    let pin: string = undefined;

    const createGame = () => {
        const inputs = Array.from(
            choices_container.querySelectorAll('input[type=text]')
        ) as HTMLInputElement[];
        const choices = inputs.map((input) => {
            return input.value;
        });
        socket.emit('createGame', { title, choices });
    };

    const addInput = () => {
        const input_template = document.createElement('input');
        input_template.type = 'text';
        choices_container.appendChild(input_template);
    };

    const startGame = () => {
        socket.emit('startGame', pin);
    }

    socket.on('gameCreated', (_pin: string) => {
        pin = _pin;
        console.log('Game was created with pin:' + pin);
    });
</script>

{#if !pin}
    <input bind:value={title} id="title" type="text" />
    <div id="choices" bind:this={choices_container}>
        <input type="text" />
    </div>
    <button on:click={addInput}>Add</button>

    <button on:click={createGame}>Submit</button>
{:else}
    <h1>Waiting for players to join</h1>

    <button on:click={startGame}>Start game</button>
{/if}
