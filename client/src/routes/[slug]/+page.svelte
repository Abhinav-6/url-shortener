<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    // The slug is accessed via $page.params.slug
    const slug = $page.params.slug;
    // export let slug;
    async function getUrl() {
        let response = await fetch(
            `${import.meta.env.VITE_PUBLIC_API_URL}/${slug}`
        );
        let data = await response.json();
        return data;
    }
</script>

{#await getUrl()}
    <p>Redirecting...</p>
{:then data}
    {console.log(data)}
{/await}
