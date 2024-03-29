<script lang="ts">
    import Table from "./Table.svelte";
    import Form from "./Form.svelte";

    const apiEndpoint = import.meta.env.VITE_PUBLIC_API_URL;

    async function getAllUrls() {
        return fetch(`${apiEndpoint}/`);
    }
    let promise = getAllUrls();
</script>

<svelte:head>
    <title>Url Shortener</title>
    <meta name="description" content="Short your long your" />
</svelte:head>

<main class="w-full overflow-hidden">
    <h1>Shorted urls</h1>
    <Form />
    {#await promise}
        <p>Loading urls...</p>
        <!-- optionally show something while promise is pending -->
    {:then data}
        <!-- promise was fulfilled -->
        {#await data.json()}
            loading...
        {:then d}
            <Table data={d} />
        {/await}
    {:catch error}
        <p>Error loading urls...</p>
        <!-- optionally show something while promise was rejected -->
    {/await}
</main>
